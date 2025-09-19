import logging
import os
from datetime import datetime
from typing import Optional
import json

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import psycopg2
from psycopg2.extras import RealDictCursor

from parser.email_analyzer import EmailAnalyzer
from parser.ai_agent import AIAgent

# Configuration des logs
log_level = os.getenv("LOG_LEVEL", "INFO").upper()
logging.basicConfig(level=log_level)
logger = logging.getLogger("mail-parser")

app = FastAPI(title="MCP-Hub Mail Parser", version="1.0.0")

# Modèles Pydantic
class ParseEmailRequest(BaseModel):
    raw_email: str
    provider: str = "manual"  # 'gmail' | 'outlook' | 'imap' | 'manual'
    external_id: Optional[str] = None
    mailbox: str = "INBOX"

class ParseEmailResponse(BaseModel):
    id: int
    from_addr: str
    to_addr: str
    subject: str
    category: Optional[str] = None
    sentiment: Optional[str] = None
    summary: Optional[str] = None
    processed: bool
    status: str

# Connexion PostgreSQL
def get_db_connection():
    """Connexion à PostgreSQL"""
    try:
        database_url = os.getenv("MAIL_PARSER_DATABASE_URL")
        if not database_url:
            raise ValueError("MAIL_PARSER_DATABASE_URL non définie")

        conn = psycopg2.connect(database_url)
        return conn
    except Exception as e:
        logger.error(f"Erreur connexion DB: {e}")
        raise HTTPException(status_code=500, detail="Erreur base de données")

def init_database():
    """Créer les tables selon votre schéma"""
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            # Table emails avec votre schéma exact
            cur.execute("""
                CREATE TABLE IF NOT EXISTS emails (
                  id            BIGSERIAL PRIMARY KEY,
                  provider      TEXT NOT NULL,
                  external_id   TEXT UNIQUE,
                  from_addr     TEXT,
                  to_addr       TEXT,
                  cc_addr       TEXT,
                  subject       TEXT,
                  sent_at       TIMESTAMPTZ,
                  received_at   TIMESTAMPTZ DEFAULT NOW(),
                  raw_headers   TEXT,
                  raw_body      TEXT,
                  mailbox       TEXT DEFAULT 'INBOX',
                  processed     BOOLEAN DEFAULT FALSE,
                  processed_at  TIMESTAMPTZ,
                  error         TEXT
                );
            """)

            # Table analyses
            cur.execute("""
                CREATE TABLE IF NOT EXISTS analyses (
                  id            BIGSERIAL PRIMARY KEY,
                  email_id      BIGINT NOT NULL REFERENCES emails(id) ON DELETE CASCADE,
                  summary       TEXT,
                  category      TEXT,
                  sentiment     TEXT,
                  score         NUMERIC,
                  created_at    TIMESTAMPTZ DEFAULT NOW()
                );
            """)

            # Table attachments
            cur.execute("""
                CREATE TABLE IF NOT EXISTS attachments (
                  id            BIGSERIAL PRIMARY KEY,
                  email_id      BIGINT NOT NULL REFERENCES emails(id) ON DELETE CASCADE,
                  filename      TEXT,
                  mime_type     TEXT,
                  size_bytes    BIGINT,
                  storage_uri   TEXT
                );
            """)

            # Index utiles
            cur.execute("CREATE INDEX IF NOT EXISTS idx_emails_provider_extid ON emails(provider, external_id);")
            cur.execute("CREATE INDEX IF NOT EXISTS idx_emails_processed ON emails(processed);")
            cur.execute("CREATE INDEX IF NOT EXISTS idx_analyses_email_id ON analyses(email_id);")

            conn.commit()
            logger.info("Base de données initialisée avec votre schéma")
    except Exception as e:
        logger.error(f"Erreur init DB: {e}")
        conn.rollback()
    finally:
        conn.close()

@app.on_event("startup")
async def startup_event():
    """Initialisation au démarrage"""
    logger.info("Démarrage Mail Parser service...")
    init_database()

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"ok": True}

@app.post("/parse", response_model=ParseEmailResponse)
async def parse_email(request: ParseEmailRequest):
    """Analyser un email brut"""
    logger.info(f"Début parsing email provider={request.provider}")

    try:
        # Parse l'email avec EmailAnalyzer
        analyzer = EmailAnalyzer()
        parsed_data = analyzer.parse_raw_email(request.raw_email)

        # Connexion DB
        conn = get_db_connection()

        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            # Insérer l'email dans la table emails
            cur.execute("""
                INSERT INTO emails (
                    provider, external_id, from_addr, to_addr, cc_addr,
                    subject, sent_at, raw_headers, raw_body, mailbox
                )
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING id;
            """, (
                request.provider,
                request.external_id,
                parsed_data['from'],
                parsed_data['to'],
                parsed_data.get('cc', ''),
                parsed_data['subject'],
                parsed_data['sent_at'],
                parsed_data['raw_headers'],
                parsed_data['body'],
                request.mailbox
            ))

            email_id = cur.fetchone()['id']

            # Traiter les pièces jointes
            for attachment in parsed_data.get('attachments', []):
                cur.execute("""
                    INSERT INTO attachments (email_id, filename, mime_type, size_bytes)
                    VALUES (%s, %s, %s, %s);
                """, (
                    email_id,
                    attachment['filename'],
                    attachment['content_type'],
                    attachment['size']
                ))

            # Analyse IA si clé OpenAI présente
            analysis_result = None
            if os.getenv("OPENAI_API_KEY"):
                try:
                    ai_agent = AIAgent()
                    analysis = ai_agent.analyze_email(parsed_data)

                    # Sauvegarder l'analyse
                    cur.execute("""
                        INSERT INTO analyses (email_id, summary, category, sentiment, score)
                        VALUES (%s, %s, %s, %s, %s);
                    """, (
                        email_id,
                        analysis.get('summary'),
                        analysis.get('category'),
                        analysis.get('sentiment'),
                        analysis.get('score', 0.5)
                    ))

                    analysis_result = analysis
                    logger.info(f"Email {email_id} analysé avec IA: {analysis.get('category')}")
                except Exception as e:
                    logger.warning(f"Erreur analyse IA: {e}")
                    analysis_result = {"error": "Analyse IA indisponible"}
            else:
                logger.info("Pas de clé OpenAI - analyse IA désactivée")

            # Marquer comme traité
            cur.execute("""
                UPDATE emails SET processed = TRUE, processed_at = NOW() WHERE id = %s;
            """, (email_id,))

            conn.commit()

        conn.close()

        return ParseEmailResponse(
            id=email_id,
            from_addr=parsed_data['from'],
            to_addr=parsed_data['to'],
            subject=parsed_data['subject'],
            category=analysis_result.get('category') if analysis_result else None,
            sentiment=analysis_result.get('sentiment') if analysis_result else None,
            summary=analysis_result.get('summary') if analysis_result else None,
            processed=True,
            status="success"
        )

    except Exception as e:
        logger.error(f"Erreur parsing: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/stats")
async def get_stats():
    """Statistiques du parser"""
    conn = get_db_connection()
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("SELECT COUNT(*) as total_emails FROM emails;")
            total = cur.fetchone()['total_emails']

            cur.execute("SELECT COUNT(*) as analyzed FROM analyses;")
            analyzed = cur.fetchone()['analyzed']

            cur.execute("SELECT COUNT(*) as processed FROM emails WHERE processed = TRUE;")
            processed = cur.fetchone()['processed']

        conn.close()
        return {
            "total_emails": total,
            "analyzed_emails": analyzed,
            "processed_emails": processed
        }
    except Exception as e:
        logger.error(f"Erreur stats: {e}")
        raise HTTPException(status_code=500, detail=str(e))