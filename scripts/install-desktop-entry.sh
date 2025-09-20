#!/bin/bash
# install-desktop-entry.sh - Install Linux desktop entry for AIDYN MCP-Hub

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
DESKTOP_FILE="aidyn-mcphub.desktop"
ICON_SOURCE="$PROJECT_DIR/frontend/public/icons/icon-512x512.png"
INSTALL_DIR="$HOME/.local/share/applications"
ICON_DIR="$HOME/.local/share/icons"

echo "🐧 Installing AIDYN MCP-Hub desktop entry for Linux"

# Check if we're on Linux
if [[ "$OSTYPE" != "linux-gnu"* ]]; then
    echo "❌ This script only works on Linux"
    exit 1
fi

# Create directories
echo "📁 Creating directories..."
mkdir -p "$INSTALL_DIR"
mkdir -p "$ICON_DIR"

# Copy icon
if [ -f "$ICON_SOURCE" ]; then
    echo "🎨 Installing icon..."
    cp "$ICON_SOURCE" "$ICON_DIR/aidyn-mcphub.png"
    ICON_PATH="aidyn-mcphub"
else
    echo "⚠️ Icon not found at $ICON_SOURCE, using default"
    ICON_PATH="application-x-executable"
fi

# Create desktop entry
echo "📄 Creating desktop entry..."
cat > "$INSTALL_DIR/$DESKTOP_FILE" << EOF
[Desktop Entry]
Version=1.0
Type=Application
Name=AIDYN MCP-Hub
Comment=AI-powered email management and MCP server platform
GenericName=MCP Hub
Exec=$SCRIPT_DIR/start-mcphub.sh
Icon=$ICON_PATH
Terminal=false
StartupNotify=true
Categories=Office;Network;Development;
Keywords=email;ai;mcp;aidyn;productivity;
MimeType=x-scheme-handler/http;x-scheme-handler/https;

Actions=Remote;Stop;

[Desktop Action Remote]
Name=Connect to Remote App
Exec=$SCRIPT_DIR/start-mcphub.sh --remote

[Desktop Action Stop]
Name=Stop Local Server
Exec=$SCRIPT_DIR/stop-mcphub.sh
EOF

# Make desktop file executable
chmod +x "$INSTALL_DIR/$DESKTOP_FILE"

# Update desktop database if available
if command -v update-desktop-database >/dev/null 2>&1; then
    echo "🔄 Updating desktop database..."
    update-desktop-database "$INSTALL_DIR" 2>/dev/null || true
fi

# Update icon cache if available
if command -v gtk-update-icon-cache >/dev/null 2>&1; then
    echo "🎨 Updating icon cache..."
    gtk-update-icon-cache "$ICON_DIR" 2>/dev/null || true
fi

echo "✅ Desktop entry installed successfully!"
echo "📍 Location: $INSTALL_DIR/$DESKTOP_FILE"
echo ""
echo "📋 Usage:"
echo "  • Find 'AIDYN MCP-Hub' in your application menu"
echo "  • Right-click for additional actions (Remote, Stop)"
echo "  • Pin to taskbar/favorites for quick access"
echo ""
echo "🗑️ To uninstall:"
echo "  rm '$INSTALL_DIR/$DESKTOP_FILE'"
echo "  rm '$ICON_DIR/aidyn-mcphub.png'"
echo ""
echo "🚀 Test the installation:"
echo "  gtk-launch aidyn-mcphub"