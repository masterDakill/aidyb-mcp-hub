#!/bin/bash
# wait-for-url.sh - Utility to wait for HTTP endpoint to be ready
# Usage: ./wait-for-url.sh <URL> [timeout_seconds] [check_interval]

set -e

URL="${1:-http://localhost/health}"
TIMEOUT="${2:-90}"
INTERVAL="${3:-2}"
START_TIME=$(date +%s)

echo "🔍 Waiting for $URL to be ready (timeout: ${TIMEOUT}s)..."

while true; do
    CURRENT_TIME=$(date +%s)
    ELAPSED=$((CURRENT_TIME - START_TIME))

    if [ $ELAPSED -ge $TIMEOUT ]; then
        echo "❌ Timeout after ${TIMEOUT}s waiting for $URL"
        exit 1
    fi

    # Check URL with curl (silent, fail on error, follow redirects)
    if curl -sf -m 5 "$URL" >/dev/null 2>&1; then
        echo "✅ $URL is ready! (took ${ELAPSED}s)"
        exit 0
    fi

    echo "⏳ Still waiting... (${ELAPSED}s/${TIMEOUT}s)"
    sleep $INTERVAL
done