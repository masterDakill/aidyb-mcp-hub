FROM python:3.11-slim

WORKDIR /app

# Installer curl pour les healthchecks
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Copier les dépendances
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copier le code source
COPY . .

# Exposer le port 8000
EXPOSE 8000

# Commande de démarrage
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]