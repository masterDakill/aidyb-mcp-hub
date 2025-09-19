import os
import logging
import time
from datetime import datetime
import httpx
from apscheduler.schedulers.blocking import BlockingScheduler
from apscheduler.triggers.interval import IntervalTrigger

from imap_reader import IMAPReader
from models import EmailData, ParseResult
from utils import format_raw_email

# Configuration des logs
log_level = os.getenv("LOG_LEVEL", "INFO").upper()
logging.basicConfig(
    level=log_level,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger("mail-fetcher")

class MailFetcher:
    """Service de récupération et envoi d'emails au parser"""

    def __init__(self):
        self.mail_parser_url = os.getenv("MAIL_PARSER_URL", "http://mail-parser:8000")
        self.poll_interval = int(os.getenv("POLL_INTERVAL_SECONDS", "300"))
        self.imap_reader = IMAPReader()

    def process_emails(self):
        """Traiter les emails non lus"""
        logger.info("Début du cycle de traitement des emails")

        # Connexion IMAP
        if not self.imap_reader.connect():
            logger.warning("Impossible de se connecter à IMAP - saut du cycle")
            return

        try:
            # Récupérer les emails non lus
            emails = self.imap_reader.fetch_unread_emails()

            if not emails:
                logger.info("Aucun nouvel email à traiter")
                return

            logger.info(f"Traitement de {len(emails)} emails")

            # Traiter chaque email
            processed_count = 0
            for email_msg in emails:
                try:
                    if self._send_to_parser(email_msg):
                        # Marquer comme lu si traitement réussi
                        self.imap_reader.mark_email_as_seen(email_msg.uid)
                        processed_count += 1
                        logger.info(f"Email traité: {email_msg.subject}")
                    else:
                        logger.warning(f"Échec traitement: {email_msg.subject}")

                except Exception as e:
                    logger.error(f"Erreur traitement email UID {email_msg.uid}: {e}")
                    continue

            logger.info(f"Cycle terminé: {processed_count}/{len(emails)} emails traités")

        finally:
            # Déconnexion IMAP
            self.imap_reader.disconnect()

    def _send_to_parser(self, email_msg) -> bool:
        """Envoyer un email au service mail-parser"""
        try:
            # Préparer les données pour l'API
            raw_email = format_raw_email(email_msg.raw_headers, email_msg.raw_body)

            email_data = EmailData(
                raw_email=raw_email,
                provider=email_msg.provider,
                external_id=str(email_msg.uid),
                mailbox=email_msg.mailbox
            )

            # Envoyer au mail-parser
            with httpx.Client(timeout=30.0) as client:
                response = client.post(
                    f"{self.mail_parser_url}/parse",
                    json=email_data.model_dump(),
                    headers={"Content-Type": "application/json"}
                )

                if response.status_code == 200:
                    result = ParseResult(**response.json())
                    logger.debug(f"Parser response: ID={result.id}, status={result.status}")
                    return True
                else:
                    logger.error(f"Erreur API parser: {response.status_code} - {response.text}")
                    return False

        except Exception as e:
            logger.error(f"Erreur envoi au parser: {e}")
            return False

    def run(self):
        """Démarrer le scheduler"""
        logger.info(f"Démarrage Mail Fetcher - cycle toutes les {self.poll_interval}s")

        # Vérifier la configuration
        if not os.getenv("EMAIL_USER") or not os.getenv("EMAIL_PASSWORD"):
            logger.error("EMAIL_USER et EMAIL_PASSWORD requis")
            return

        # Tester la connexion au parser
        try:
            with httpx.Client(timeout=10.0) as client:
                response = client.get(f"{self.mail_parser_url}/health")
                if response.status_code == 200:
                    logger.info("Mail parser accessible")
                else:
                    logger.warning(f"Mail parser inaccessible: {response.status_code}")
        except Exception as e:
            logger.warning(f"Mail parser non accessible: {e}")

        # Premier traitement immédiat
        logger.info("Traitement initial...")
        self.process_emails()

        # Configuration du scheduler
        scheduler = BlockingScheduler()
        scheduler.add_job(
            func=self.process_emails,
            trigger=IntervalTrigger(seconds=self.poll_interval),
            id='email_processing',
            name='Traitement emails IMAP',
            replace_existing=True
        )

        try:
            logger.info("Scheduler démarré")
            scheduler.start()
        except KeyboardInterrupt:
            logger.info("Arrêt du scheduler")
            scheduler.shutdown()

if __name__ == "__main__":
    fetcher = MailFetcher()
    fetcher.run()