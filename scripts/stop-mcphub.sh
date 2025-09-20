#!/bin/bash
# stop-mcphub.sh - AIDYN MCP-Hub Shutdown
# Cleanly stops the Docker stack

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

# Parse arguments
QUIET_MODE=false

for arg in "$@"; do
    case $arg in
        --quiet|-q)
            QUIET_MODE=true
            shift
            ;;
        --help|-h)
            echo "🛑 AIDYN MCP-Hub Shutdown"
            echo ""
            echo "Usage: $0 [OPTIONS]"
            echo ""
            echo "Options:"
            echo "  --quiet, -q     Suppress non-error output"
            echo "  --help, -h      Show this help message"
            echo ""
            echo "Cleanly stops the Docker Compose stack"
            exit 0
            ;;
        *)
            echo "❌ Unknown option: $arg"
            echo "Use --help for usage information"
            exit 1
            ;;
    esac
done

# Logging function
log() {
    if [ "$QUIET_MODE" = false ]; then
        echo "$1"
    fi
}

# Error function
error() {
    echo "❌ $1" >&2
    exit 1
}

log "🛑 Stopping AIDYN MCP-Hub..."

# Check if Docker is available
if ! command -v docker >/dev/null 2>&1; then
    error "Docker is not installed or not in PATH"
fi

# Navigate to project directory
cd "$PROJECT_DIR"

# Check if docker-compose.yml exists
if [ ! -f "docker-compose.yml" ]; then
    error "docker-compose.yml not found in $PROJECT_DIR"
fi

log "📦 Stopping Docker Compose stack..."
if ! docker compose down --remove-orphans; then
    error "Failed to stop Docker Compose stack"
fi

log "✅ AIDYN MCP-Hub stopped successfully!"
log "🔧 All containers and networks have been cleaned up"