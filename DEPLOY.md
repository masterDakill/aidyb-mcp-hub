# Guide de Déploiement MCP-Hub

Ce guide détaille l'installation complète de MCP-Hub sur un serveur de production.

## 📋 Pré-requis Serveur

### Système
- **OS**: Ubuntu 20.04+ / Debian 11+ / CentOS 8+ (ou compatible)
- **RAM**: Minimum 4GB, recommandé 8GB+
- **Stockage**: Minimum 50GB libre
- **CPU**: 2 cores minimum, 4+ recommandé

### Logiciels
- **Docker**: Version 20.10+
- **Docker Compose**: Version 2.0+
- **Git**: Pour cloner le repository

### Ports réseau
Les ports suivants doivent être ouverts :
- **Port 80**: Interface web principale (HTTP)
- **Port 443**: HTTPS (si certificat SSL configuré)
- **Port 3001**: MetaMCP (optionnel, pour accès direct)
- **Port 12008**: MetaMCP UI (optionnel, pour accès direct)

## 🚀 Installation Pas-à-Pas

### 1. Installation des dépendances

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install -y docker.io docker-compose-plugin git curl

# Démarrer Docker
sudo systemctl enable docker
sudo systemctl start docker

# Ajouter l'utilisateur au groupe docker
sudo usermod -aG docker $USER
newgrp docker
```

### 2. Clonage du projet

```bash
# Cloner le repository
git clone https://github.com/votre-repo/MCP-Hub.git
cd MCP-Hub

# Vérifier la structure
ls -la
```

### 3. Configuration des variables d'environnement

```bash
# Copier le template d'environnement
cp .env.example .env

# Éditer les variables d'environnement
nano .env
```

**Variables importantes à configurer :**

```bash
# Base de données PostgreSQL
POSTGRES_PASSWORD=VotreMotDePasseSecurise123

# Authentification MetaMCP
BETTER_AUTH_SECRET=VotreSecretAuth64CaracteresMinimum

# OpenAI pour l'analyse des emails
OPENAI_API_KEY=sk-votre-cle-openai

# Configuration email (pour mail-fetcher)
EMAIL_PROVIDER=gmail
IMAP_HOST=imap.gmail.com
IMAP_PORT=993
IMAP_SSL=true
EMAIL_USER=votre-email@gmail.com
EMAIL_PASSWORD=votre-mot-de-passe-app
```

### 4. Configuration frontend

```bash
# Copier la configuration frontend
cp frontend/.env.frontend.example frontend/.env.frontend

# Éditer si nécessaire (les valeurs par défaut conviennent)
nano frontend/.env.frontend
```

### 5. Déploiement

```bash
# Option 1: Utiliser make (recommandé)
make up

# Option 2: Docker Compose direct
docker compose up -d --build
```

### 6. Vérification

```bash
# Vérifier l'état des services
make ps

# Tester la santé des services
make health

# Voir les logs si nécessaire
make logs
```

## 🔍 Vérification Post-Installation

### Tests d'accès
1. **Interface web**: http://votre-serveur/
2. **API Health**: http://votre-serveur/api/health
3. **MetaMCP**: http://votre-serveur:3001/health

### Commandes utiles
```bash
# État des conteneurs
docker compose ps

# Logs en temps réel
docker compose logs -f

# Redémarrer un service
docker compose restart nginx

# Reconstruire après modifications
docker compose up -d --build
```

## 💾 Persistance et Backup

### Volumes persistants
MCP-Hub utilise les volumes Docker suivants :
- `mcphub-postgres-data`: Base de données PostgreSQL
- `mcphub-metamcp-data`: Données MetaMCP
- `mcphub-frontend-dist`: Build de l'interface

### Backup PostgreSQL
```bash
# Backup complet
docker exec mcphub-postgres pg_dump -U mcphub_user -d mcphub -Fc > backup-$(date +%Y%m%d).sql

# Restauration
docker exec -i mcphub-postgres pg_restore -U mcphub_user -d mcphub -c < backup.sql
```

### Backup volumes
```bash
# Sauvegarder tous les volumes
docker run --rm -v mcphub-postgres-data:/data -v $(pwd):/backup alpine tar czf /backup/postgres-backup.tar.gz -C /data .
docker run --rm -v mcphub-metamcp-data:/data -v $(pwd):/backup alpine tar czf /backup/metamcp-backup.tar.gz -C /data .
```

## 🔐 Configuration HTTPS (Production)

### Option 1: Traefik (Recommandé)
```yaml
# Ajouter à docker-compose.yml
labels:
  - "traefik.enable=true"
  - "traefik.http.routers.mcphub.rule=Host(\`votre-domaine.com\`)"
  - "traefik.http.routers.mcphub.tls.certresolver=letsencrypt"
```

### Option 2: Nginx + Certbot
```bash
# Installer certbot
sudo apt install certbot python3-certbot-nginx

# Obtenir le certificat
sudo certbot --nginx -d votre-domaine.com

# Renouvellement automatique
sudo crontab -e
# Ajouter: 0 12 * * * /usr/bin/certbot renew --quiet
```

## 🌐 Configuration DNS

Pour un déploiement public, configurez votre DNS :

```
Type    Nom                 Valeur
A       votre-domaine.com   IP-DE-VOTRE-SERVEUR
CNAME   www                 votre-domaine.com
```

## 🛠️ Maintenance

### Mise à jour
```bash
# Arrêter les services
make down

# Mettre à jour le code
git pull origin main

# Redémarrer avec rebuild
make up
```

### Monitoring
```bash
# Espace disque
df -h

# Utilisation ressources
docker stats

# Logs d'erreurs
docker compose logs --tail=100 | grep -i error
```

## 🔄 Procédure de Rollback

En cas de problème après une mise à jour :

```bash
# 1. Arrêter les services
make down

# 2. Retourner à la version précédente
git checkout <commit-precedent>

# 3. Restaurer la base de données si nécessaire
docker exec -i mcphub-postgres pg_restore -U mcphub_user -d mcphub -c < backup-precedent.sql

# 4. Redémarrer
make up

# 5. Vérifier
make health
```

## ⚠️ Dépannage Courant

### Services qui ne démarrent pas
```bash
# Vérifier les logs
make logs

# Reconstruire complètement
make clean
make build
make up
```

### Base de données corrompue
```bash
# Redémarrer PostgreSQL
docker compose restart postgres

# Si nécessaire, restaurer depuis backup
docker exec -i mcphub-postgres pg_restore -U mcphub_user -d mcphub -c < backup-recent.sql
```

### Frontend ne charge pas
```bash
# Vérifier nginx
docker compose logs nginx

# Reconstruire le frontend
docker compose up -d --build frontend-build nginx
```

## 📞 Support

En cas de problème :
1. Consulter les logs : `make logs`
2. Vérifier l'état : `make health`
3. Consulter la documentation technique
4. Ouvrir une issue sur le repository

---

**Version du guide**: 1.0
**Dernière mise à jour**: $(date +%Y-%m-%d)
**Testé sur**: Ubuntu 22.04, Docker 24.0+