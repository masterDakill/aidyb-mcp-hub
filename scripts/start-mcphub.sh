#!/bin/bash
# start-mcphub.sh - AIDYN MCP-Hub Launcher
# Starts Docker stack and opens the app in browser

set -e

# Configuration
LOCAL_URL="http://localhost"
LOCAL_HEALTH="$LOCAL_URL/health"
REMOTE_URL="https://app.aidyn.ai"
REMOTE_HEALTH="$REMOTE_URL/health"
TIMEOUT=90
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

# Parse arguments
REMOTE_MODE=false
QUIET_MODE=false

for arg in "$@"; do
    case $arg in
        --remote|-r)
            REMOTE_MODE=true
            shift
            ;;
        --quiet|-q)
            QUIET_MODE=true
            shift
            ;;
        --help|-h)
            echo "🚀 AIDYN MCP-Hub Launcher"
            echo ""
            echo "Usage: $0 [OPTIONS]"
            echo ""
            echo "Options:"
            echo "  --remote, -r    Connect to remote production app (https://app.aidyn.ai)"
            echo "  --quiet, -q     Suppress non-error output"
            echo "  --help, -h      Show this help message"
            echo ""
            echo "Default: Launch local Docker stack and open http://localhost"
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

log "🚀 Starting AIDYN MCP-Hub..."

if [ "$REMOTE_MODE" = true ]; then
    log "🌐 Remote mode: Connecting to production app"
    TARGET_URL="$REMOTE_URL"
    HEALTH_URL="$REMOTE_HEALTH"

    log "🔍 Checking remote app availability..."
    if ! "$SCRIPT_DIR/wait-for-url.sh" "$HEALTH_URL" 10 1; then
        error "Remote app is not available at $REMOTE_URL"
    fi
else
    log "🐳 Local mode: Starting Docker stack"
    TARGET_URL="$LOCAL_URL"
    HEALTH_URL="$LOCAL_HEALTH"

    # Check if Docker is available
    if ! command -v docker >/dev/null 2>&1; then
        error "Docker is not installed or not in PATH"
    fi

    # Check if Docker is running
    if ! docker info >/dev/null 2>&1; then
        log "🔄 Docker is not running. Please start Docker Desktop and try again."

        # Try to start Docker Desktop on macOS
        if [[ "$OSTYPE" == "darwin"* ]]; then
            log "🍎 Attempting to start Docker Desktop on macOS..."
            open -a "Docker Desktop" 2>/dev/null || true
            log "⏳ Please wait for Docker Desktop to start, then run this script again."
        fi

        error "Docker is not running"
    fi

    # Navigate to project directory
    cd "$PROJECT_DIR"

    # Check if docker-compose.yml exists
    if [ ! -f "docker-compose.yml" ]; then
        error "docker-compose.yml not found in $PROJECT_DIR"
    fi

    log "📦 Starting Docker Compose stack..."
    if ! docker compose up -d; then
        error "Failed to start Docker Compose stack"
    fi

    log "🔍 Waiting for health check..."
    if ! "$SCRIPT_DIR/wait-for-url.sh" "$HEALTH_URL" "$TIMEOUT"; then
        log "🔧 Checking container status..."
        docker compose ps
        error "Health check failed after ${TIMEOUT}s"
    fi
fi

log "✅ AIDYN MCP-Hub is ready!"
log "🌐 Opening $TARGET_URL in browser..."

# Open URL in default browser (cross-platform)
if command -v open >/dev/null 2>&1; then
    # macOS
    open "$TARGET_URL"
elif command -v xdg-open >/dev/null 2>&1; then
    # Linux
    xdg-open "$TARGET_URL"
elif command -v start >/dev/null 2>&1; then
    # Windows (Git Bash/MSYS2)
    start "$TARGET_URL"
else
    log "🌐 Please open $TARGET_URL in your browser"
fi

log "🎉 AIDYN MCP-Hub launched successfully!"

if [ "$REMOTE_MODE" = false ]; then
    log ""
    log "📋 Quick commands:"
    log "  • Stop:  $SCRIPT_DIR/stop-mcphub.sh"
    log "  • Logs:  docker compose logs -f"
    log "  • Status: docker compose ps"
fi