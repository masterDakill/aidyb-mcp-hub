# Makefile pour MCP-Hub
# Commandes de gestion Docker Compose

.PHONY: help up down logs ps build clean status health

# Commande par défaut
help:
	@echo "=== MCP-Hub Docker Management ==="
	@echo "make up     - Démarrer tous les services (build + start)"
	@echo "make down   - Arrêter tous les services"
	@echo "make logs   - Afficher les logs des services principaux"
	@echo "make ps     - Statut des conteneurs"
	@echo "make build  - Rebuild tous les services"
	@echo "make clean  - Nettoyer containers/images/volumes"
	@echo "make status - Vérifier l'état complet"
	@echo "make health - Tester les endpoints de santé"

# Démarrer tous les services
up:
	@echo "🚀 Démarrage de MCP-Hub..."
	docker compose up -d --build
	@echo "✅ Services démarrés. Utilisez 'make logs' pour suivre les logs."

# Arrêter tous les services
down:
	@echo "🛑 Arrêt de MCP-Hub..."
	docker compose down
	@echo "✅ Services arrêtés."

# Afficher les logs des services principaux
logs:
	@echo "📋 Logs des services principaux..."
	docker compose logs -f --tail=100 nginx mail-parser mail-fetcher metamcp

# Statut des conteneurs
ps:
	@echo "📊 Statut des conteneurs:"
	docker compose ps

# Rebuilder tous les services
build:
	@echo "🔨 Rebuild des services..."
	docker compose build --no-cache
	@echo "✅ Build terminé."

# Nettoyer complètement
clean:
	@echo "🧹 Nettoyage complet..."
	docker compose down -v --remove-orphans
	docker system prune -f
	@echo "✅ Nettoyage terminé."

# Vérifier l'état complet
status:
	@echo "=== État MCP-Hub ==="
	@echo "📊 Conteneurs:"
	@docker compose ps
	@echo ""
	@echo "💾 Volumes:"
	@docker volume ls | grep mcphub
	@echo ""
	@echo "🌐 Réseau:"
	@docker network ls | grep mcphub

# Tests de santé
health:
	@echo "🏥 Tests de santé..."
	@./tools/health-check.sh