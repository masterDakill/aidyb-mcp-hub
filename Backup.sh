#!/bin/bash
set -e
DATE=$(date +%F_%H-%M)
OUT="metamcp-backup-$DATE.tgz"
VOLUME_NAME="metamcp-data"

echo "🔒 Sauvegarde du volume $VOLUME_NAME -> $OUT"
docker run --rm -v "$VOLUME_NAME:/data" alpine \
  sh -c "cd /data && tar czf - ." > "$OUT"
echo "✅ Sauvegarde créée: $OUT"