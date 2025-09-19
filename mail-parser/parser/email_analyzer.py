import email
from email.parser import Parser
from datetime import datetime
from email.utils import parsedate_to_datetime
import logging

logger = logging.getLogger("mail-parser.analyzer")

class EmailAnalyzer:
    """Analyseur d'emails bruts"""

    def parse_raw_email(self, raw_email: str) -> dict:
        """Parse un email brut selon votre schéma"""
        try:
            # Parser l'email
            msg = email.message_from_string(raw_email)

            # Extraire métadonnées selon votre schéma
            parsed_data = {
                'from': msg.get('From', ''),
                'to': msg.get('To', ''),
                'cc': msg.get('Cc', ''),
                'subject': msg.get('Subject', ''),
                'sent_at': self._parse_date(msg.get('Date')),
                'raw_headers': self._extract_headers(msg),
                'body': self._extract_body(msg),
                'attachments': self._extract_attachments(msg)
            }

            logger.debug(f"Email parsé: {parsed_data['subject']}")
            return parsed_data

        except Exception as e:
            logger.error(f"Erreur parsing email: {e}")
            raise

    def _parse_date(self, date_str: str) -> str:
        """Parse la date RFC 2822 vers TIMESTAMPTZ"""
        if not date_str:
            return datetime.now().isoformat()

        try:
            dt = parsedate_to_datetime(date_str)
            return dt.isoformat()
        except:
            logger.warning(f"Date invalide: {date_str}")
            return datetime.now().isoformat()

    def _extract_headers(self, msg) -> str:
        """Extraire tous les en-têtes bruts"""
        try:
            headers = []
            for key, value in msg.items():
                headers.append(f"{key}: {value}")
            return "\n".join(headers)
        except Exception as e:
            logger.warning(f"Erreur extraction headers: {e}")
            return ""

    def _extract_body(self, msg) -> str:
        """Extraire le corps du message"""
        try:
            if msg.is_multipart():
                for part in msg.walk():
                    if part.get_content_type() == "text/plain":
                        return part.get_payload(decode=True).decode('utf-8', errors='ignore')
                return ""
            else:
                return msg.get_payload(decode=True).decode('utf-8', errors='ignore')
        except Exception as e:
            logger.warning(f"Erreur extraction body: {e}")
            return ""

    def _extract_attachments(self, msg) -> list:
        """Extraire métadonnées des pièces jointes"""
        attachments = []
        try:
            if msg.is_multipart():
                for part in msg.walk():
                    if part.get_content_disposition() == 'attachment':
                        filename = part.get_filename()
                        if filename:
                            attachments.append({
                                'filename': filename,
                                'content_type': part.get_content_type(),
                                'size': len(part.get_payload())
                            })
        except Exception as e:
            logger.warning(f"Erreur extraction pièces jointes: {e}")

        return attachments