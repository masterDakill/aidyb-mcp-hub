from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class EmailData(BaseModel):
    """Structure d'un email pour l'API mail-parser"""
    raw_email: str
    provider: str
    external_id: str
    mailbox: str = "INBOX"

class ParseResult(BaseModel):
    """Résultat du parsing depuis mail-parser"""
    id: int
    from_addr: str
    to_addr: str
    subject: str
    category: Optional[str] = None
    sentiment: Optional[str] = None
    summary: Optional[str] = None
    processed: bool
    status: str

class EmailMessage(BaseModel):
    """Métadonnées d'un email IMAP"""
    uid: int
    from_addr: str
    to_addr: str
    cc_addr: str = ""
    subject: str
    date: datetime
    raw_headers: str
    raw_body: str
    provider: str
    mailbox: str