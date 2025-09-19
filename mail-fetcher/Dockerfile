FROM python:3.11-slim

ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Copier les dépendances
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copier le code source
COPY . .

# Commande de démarrage
CMD ["python", "app.py"]