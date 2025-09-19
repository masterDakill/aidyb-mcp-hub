import os
import logging
from datetime import datetime, timedelta
from typing import List, Optional
import imaplib
from imapclient import IMAPClient
import email
from email.utils import parsedate_to_datetime

from models import EmailMessage
from utils import parse_email_date, clean_header_value, extract_text_body

logger = logging.getLogger("mail-fetcher.imap_reader")

class IMAPReader:
    """Lecteur IMAP pour récupérer les emails"""

    def __init__(self):
        self.host = os.getenv("IMAP_HOST", "imap.gmail.com")
        self.port = int(os.getenv("IMAP_PORT", "993"))
        self.use_ssl = os.getenv("IMAP_SSL", "true").lower() == "true"
        self.username = os.getenv("EMAIL_USER")
        self.password = os.getenv("EMAIL_PASSWORD")
        self.provider = os.getenv("EMAIL_PROVIDER", "gmail")
        self.mailbox = os.getenv("MAILBOX", "INBOX")
        self.fetch_since_days = int(os.getenv("FETCH_SINCE_DAYS", "3"))
        self.mark_as_seen = os.getenv("MARK_AS_SEEN", "true").lower() == "true"

        self.client: Optional[IMAPClient] = None

    def connect(self) -> bool:
        """Connexion au serveur IMAP"""
        try:
            if not self.username or not self.password:
                logger.error("EMAIL_USER et EMAIL_PASSWORD requis")
                return False

            logger.info(f"Connexion IMAP à {self.host}:{self.port} (SSL={self.use_ssl})")

            self.client = IMAPClient(
                host=self.host,
                port=self.port,
                ssl=self.use_ssl
            )

            self.client.login(self.username, self.password)
            self.client.select_folder(self.mailbox)

            logger.info(f"Connecté à la boîte {self.mailbox}")
            return True

        except Exception as e:
            logger.error(f"Erreur connexion IMAP: {e}")
            return False

    def disconnect(self):
        """Déconnexion IMAP"""
        if self.client:
            try:
                self.client.logout()
                logger.debug("Déconnexion IMAP réussie")
            except:
                pass
            self.client = None

    def fetch_unread_emails(self) -> List[EmailMessage]:
        """Récupérer les emails non lus depuis N jours"""
        if not self.client:
            logger.error("Pas de connexion IMAP active")
            return []

        try:
            # Date de début (maintenant - FETCH_SINCE_DAYS)
            since_date = datetime.now() - timedelta(days=self.fetch_since_days)

            # Recherche des messages non lus depuis cette date
            criteria = ['UNSEEN', 'SINCE', since_date.strftime('%d-%b-%Y')]
            messages = self.client.search(criteria)

            logger.info(f"Trouvé {len(messages)} emails non lus depuis {self.fetch_since_days} jours")

            emails = []
            for uid in messages:
                try:
                    email_msg = self._fetch_email_data(uid)
                    if email_msg:
                        emails.append(email_msg)
                except Exception as e:
                    logger.warning(f"Erreur traitement email UID {uid}: {e}")
                    continue

            return emails

        except Exception as e:
            logger.error(f"Erreur récupération emails: {e}")
            return []

    def _fetch_email_data(self, uid: int) -> Optional[EmailMessage]:
        """Récupérer les données d'un email spécifique"""
        try:
            # Récupérer headers et body
            response = self.client.fetch([uid], ['ENVELOPE', 'BODY[]'])
            data = response[uid]

            # Parser le message complet
            raw_message = data[b'BODY[]'].decode('utf-8', errors='ignore')
            msg = email.message_from_string(raw_message)

            # Extraire les métadonnées
            envelope = data[b'ENVELOPE']

            # Construire les en-têtes bruts
            raw_headers = []
            for header_name, header_value in msg.items():
                raw_headers.append(f"{header_name}: {header_value}")

            email_data = EmailMessage(
                uid=uid,
                from_addr=clean_header_value(msg.get('From', '')),
                to_addr=clean_header_value(msg.get('To', '')),
                cc_addr=clean_header_value(msg.get('Cc', '')),
                subject=clean_header_value(msg.get('Subject', '')),
                date=parse_email_date(msg.get('Date')),
                raw_headers="\n".join(raw_headers),
                raw_body=extract_text_body(raw_message),
                provider=self.provider,
                mailbox=self.mailbox
            )

            logger.debug(f"Email UID {uid} traité: {email_data.subject}")
            return email_data

        except Exception as e:
            logger.error(f"Erreur fetch email UID {uid}: {e}")
            return None

    def mark_email_as_seen(self, uid: int) -> bool:
        """Marquer un email comme lu"""
        if not self.mark_as_seen or not self.client:
            return True

        try:
            self.client.add_flags([uid], [b'\\Seen'])
            logger.debug(f"Email UID {uid} marqué comme lu")
            return True
        except Exception as e:
            logger.warning(f"Erreur marquage email UID {uid}: {e}")
            return False