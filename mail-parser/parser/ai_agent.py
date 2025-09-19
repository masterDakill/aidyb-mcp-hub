import os
import logging
from typing import Dict, Optional

logger = logging.getLogger("mail-parser.ai_agent")

class AIAgent:
    """Agent IA pour l'analyse sémantique des emails"""

    def __init__(self):
        self.openai_api_key = os.getenv("OPENAI_API_KEY")
        if self.openai_api_key:
            try:
                import openai
                self.client = openai.OpenAI(api_key=self.openai_api_key)
                logger.info("Client OpenAI initialisé")
            except ImportError:
                logger.error("Bibliothèque OpenAI non installée")
                self.client = None
        else:
            logger.info("Pas de clé OpenAI - mode mock")
            self.client = None

    def analyze_email(self, parsed_email: Dict) -> Dict:
        """Analyser un email avec l'IA"""
        if not self.client:
            return self._mock_analysis(parsed_email)

        try:
            # Préparer le prompt
            email_content = f"""
            From: {parsed_email['from']}
            To: {parsed_email['to']}
            Subject: {parsed_email['subject']}

            Body:
            {parsed_email['body']}
            """

            prompt = f"""
            Analyse cet email et fournis une réponse JSON avec:
            - sentiment: "positif", "negatif", "neutre"
            - category: catégorie principale (ex: "facture", "commande", "support", "commercial")
            - summary: résumé en 1-2 phrases
            - score: score de confiance entre 0 et 1

            Email à analyser:
            {email_content}
            """

            response = self.client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[{"role": "user", "content": prompt}],
                max_tokens=300,
                temperature=0.3
            )

            # Parser la réponse JSON
            import json
            result = json.loads(response.choices[0].message.content)
            logger.info(f"Analyse IA complétée: {result.get('category', 'unknown')}")
            return result

        except Exception as e:
            logger.error(f"Erreur analyse OpenAI: {e}")
            return self._mock_analysis(parsed_email)

    def _mock_analysis(self, parsed_email: Dict) -> Dict:
        """Analyse mock si pas d'IA disponible"""
        logger.debug("Utilisation analyse mock")

        # Logique simple basée sur le subject
        subject = parsed_email.get('subject', '').lower()

        # Détection de catégorie simple
        if any(word in subject for word in ['facture', 'invoice', 'bill']):
            category = "facture"
            sentiment = "neutre"
        elif any(word in subject for word in ['commande', 'order']):
            category = "commande"
            sentiment = "positif"
        elif any(word in subject for word in ['support', 'help', 'problème']):
            category = "support"
            sentiment = "neutre"
        elif any(word in subject for word in ['urgent', 'important']):
            category = "urgent"
            sentiment = "neutre"
        else:
            category = "general"
            sentiment = "neutre"

        return {
            "sentiment": sentiment,
            "category": category,
            "summary": f"Email de {parsed_email.get('from', 'unknown')} concernant: {parsed_email.get('subject', 'N/A')}",
            "score": 0.7,
            "analysis_type": "mock"
        }