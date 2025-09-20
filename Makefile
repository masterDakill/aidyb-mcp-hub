# Makefile for AIDYN MCP-Hub
# Cross-platform development and launcher commands

.PHONY: help up down logs health status app app-remote stop clean install-deps

# Default target
help:
	@echo "🚀 AIDYN MCP-Hub - Available Commands"
	@echo ""
	@echo "Docker Management:"
	@echo "  make up          Start Docker Compose stack"
	@echo "  make down        Stop Docker Compose stack"
	@echo "  make logs        Show live logs from all containers"
	@echo "  make health      Check application health status"
	@echo "  make status      Show container status"
	@echo "  make stop        Alias for 'down'"
	@echo "  make clean       Stop and remove all containers, networks, volumes"
	@echo ""
	@echo "App Launcher:"
	@echo "  make app         Launch AIDYN MCP-Hub (local Docker)"
	@echo "  make app-remote  Launch AIDYN MCP-Hub (remote production)"
	@echo ""
	@echo "Development:"
	@echo "  make install-deps Install frontend dependencies"
	@echo "  make build       Build frontend for production"
	@echo "  make dev         Start frontend in development mode"
	@echo ""
	@echo "Platform-specific launchers:"
	@echo "  • macOS:    Open 'dist/AIDYN MCP-Hub.app'"
	@echo "  • Windows:  Double-click 'scripts/start-mcphub.bat'"
	@echo "  • Linux:    Run 'scripts/install-desktop-entry.sh'"

# Docker Management
up:
	@echo "📦 Starting Docker Compose stack..."
	@docker compose up -d
	@echo "✅ Stack started! Access: http://localhost/"

down:
	@echo "🛑 Stopping Docker Compose stack..."
	@docker compose down --remove-orphans
	@echo "✅ Stack stopped!"

stop: down

logs:
	@echo "📋 Showing live logs (Ctrl+C to exit)..."
	@docker compose logs -f

health:
	@echo "💚 Checking application health..."
	@curl -sf http://localhost/health > /dev/null && echo "✅ Application is healthy!" || echo "❌ Application is not responding"

status:
	@echo "📊 Container Status:"
	@docker compose ps

clean:
	@echo "🧹 Cleaning up all Docker resources..."
	@docker compose down --remove-orphans --volumes --rmi local
	@echo "✅ Cleanup completed!"

# App Launcher
app:
	@echo "🚀 Launching AIDYN MCP-Hub (local)..."
	@chmod +x scripts/start-mcphub.sh
	@./scripts/start-mcphub.sh

app-remote:
	@echo "🌐 Launching AIDYN MCP-Hub (remote)..."
	@chmod +x scripts/start-mcphub.sh
	@./scripts/start-mcphub.sh --remote

# Development
install-deps:
	@echo "📦 Installing frontend dependencies..."
	@cd frontend && npm ci

build:
	@echo "🏗️ Building frontend for production..."
	@cd frontend && npm run build

dev:
	@echo "🔧 Starting frontend in development mode..."
	@cd frontend && npm run dev

# Assets and launcher setup
setup-launchers:
	@echo "🛠️ Setting up cross-platform launchers..."
	@chmod +x scripts/*.sh
	@echo "✅ Launchers ready!"

# Platform-specific targets
build-macos-app:
	@echo "🍎 Building macOS app bundle..."
	@scripts/build-macos-app.sh

install-linux-desktop:
	@echo "🐧 Installing Linux desktop entry..."
	@scripts/install-desktop-entry.sh

# Environment checks
check-docker:
	@echo "🔍 Checking Docker availability..."
	@command -v docker >/dev/null 2>&1 || (echo "❌ Docker not found" && exit 1)
	@docker info >/dev/null 2>&1 || (echo "❌ Docker not running" && exit 1)
	@echo "✅ Docker is ready"

check-deps:
	@echo "🔍 Checking dependencies..."
	@command -v node >/dev/null 2>&1 || (echo "❌ Node.js not found" && exit 1)
	@command -v npm >/dev/null 2>&1 || (echo "❌ npm not found" && exit 1)
	@command -v curl >/dev/null 2>&1 || (echo "❌ curl not found" && exit 1)
	@echo "✅ All dependencies available"

# Quick setup for new environments
setup: check-deps check-docker install-deps build setup-launchers
	@echo "🎉 AIDYN MCP-Hub setup completed!"
	@echo "Run 'make app' to launch the application"
