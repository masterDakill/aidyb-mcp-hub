#!/bin/bash
# update-app-icon.sh - Update AIDYN MCP-Hub app icon across all platforms

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
NEW_ICON="$1"
ICON_TARGET="$PROJECT_DIR/frontend/public/icons/icon-512x512.png"

echo "🎨 AIDYN MCP-Hub Icon Updater"
echo "============================="

# Check if new icon file is provided
if [ -z "$NEW_ICON" ]; then
    echo "Usage: $0 <path-to-new-icon.png>"
    echo ""
    echo "Examples:"
    echo "  $0 ~/Downloads/new-aidyn-icon.png"
    echo "  $0 /path/to/aidyn-logo-512.png"
    echo ""
    echo "Current icon: $ICON_TARGET"
    echo "Icon requirements:"
    echo "  • Format: PNG with transparency"
    echo "  • Size: 512x512px (minimum)"
    echo "  • Quality: High resolution for best results"
    exit 1
fi

# Check if new icon exists
if [ ! -f "$NEW_ICON" ]; then
    echo "❌ Icon file not found: $NEW_ICON"
    exit 1
fi

echo "📁 Source: $NEW_ICON"
echo "📁 Target: $ICON_TARGET"

# Backup current icon
echo "💾 Creating backup of current icon..."
cp "$ICON_TARGET" "$ICON_TARGET.backup.$(date +%Y%m%d_%H%M%S)"

# Copy new icon
echo "📥 Installing new icon..."
cp "$NEW_ICON" "$ICON_TARGET"

# Regenerate all PWA icon sizes
echo "🔄 Regenerating PWA icon sizes..."
cd "$PROJECT_DIR"

if command -v sips >/dev/null 2>&1; then
    for size in 72 96 128 144 152 192 384 512; do
        sips -z $size $size "$ICON_TARGET" --out "frontend/public/icons/icon-${size}x${size}.png" >/dev/null 2>&1
        echo "  ✅ Generated ${size}x${size}"
    done
else
    echo "  ⚠️ sips not available, PWA icons not regenerated"
fi

# Update app bundle if it exists
APP_BUNDLE="$PROJECT_DIR/dist/AIDYN MCP-Hub.app"
if [ -d "$APP_BUNDLE" ]; then
    echo "🍎 Updating macOS app bundle..."
    cp "$ICON_TARGET" "$APP_BUNDLE/Contents/Resources/app.png"
    echo "  ✅ macOS app icon updated"
else
    echo "📝 macOS app bundle not found (run ./scripts/build-macos-app.sh to create)"
fi

# Check icon properties
echo "🔍 New icon properties:"
if command -v sips >/dev/null 2>&1; then
    sips -g pixelWidth -g pixelHeight -g format "$ICON_TARGET" | tail -3
else
    ls -lh "$ICON_TARGET" | awk '{print "Size:", $5}'
fi

echo ""
echo "✅ Icon update completed!"
echo ""
echo "📋 Next steps:"
echo "1. Rebuild macOS app:     ./scripts/build-macos-app.sh"
echo "2. Update Windows icons:  .\scripts\create-windows-shortcut.ps1"
echo "3. Reinstall Linux entry: ./scripts/install-desktop-entry.sh"
echo "4. Test the app:          make app"
echo ""
echo "🔄 To revert to previous icon:"
echo "   Find backup at: $ICON_TARGET.backup.*"
echo "   Then run: $0 <backup-file>"