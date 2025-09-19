# MCP Hub

## Services
- **MetaMCP** : point d’accès unifié
- **Ports exposés** :
  - 12008 : API MCP
  - 3001 : interface web

## Volumes
- `metamcp-data` : stocke la base SQLite et les namespaces

## Fichiers
- `docker-compose.yml` → orchestrateur
- `.env` → secrets API
- `backup.sh` → sauvegarde volume
- `README.md` → doc interne

## Démarrage
```bash
docker compose up -d
docker compose ps