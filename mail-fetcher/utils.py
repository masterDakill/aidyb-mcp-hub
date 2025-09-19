import email
from email.utils import parsedate_to_datetime
from datetime import datetime
import logging

logger = logging.getLogger("mail-fetcher.utils")

def parse_email_date(date_str: str) -> datetime:
    """Parse une date d'email RFC 2822"""
    if not date_str:
        return datetime.now()

    try:
        return parsedate_to_datetime(date_str)
    except Exception as e:
        logger.warning(f"Date invalide: {date_str}, erreur: {e}")
        return datetime.now()

def extract_text_body(raw_message: str) -> str:
    """Extraire le corps texte d'un email"""
    try:
        msg = email.message_from_string(raw_message)

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

def clean_header_value(value: str) -> str:
    """Nettoyer une valeur d'en-tête email"""
    if not value:
        return ""

    try:
        # Décoder les en-têtes encodés
        from email.header import decode_header
        decoded_parts = decode_header(value)
        cleaned = ""

        for part, encoding in decoded_parts:
            if isinstance(part, bytes):
                part = part.decode(encoding or 'utf-8', errors='ignore')
            cleaned += part

        return cleaned.strip()
    except Exception as e:
        logger.warning(f"Erreur nettoyage header: {e}")
        return str(value).strip()

def format_raw_email(headers: str, body: str) -> str:
    """Reformater un email pour l'API mail-parser"""
    return f"{headers}\n\n{body}"