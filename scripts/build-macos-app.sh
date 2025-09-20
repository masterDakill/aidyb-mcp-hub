#!/bin/bash
# build-macos-app.sh - Creates macOS app bundle for AIDYN MCP-Hub

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
APP_NAME="AIDYN MCP-Hub"
APP_DIR="$PROJECT_DIR/dist/$APP_NAME.app"
ICON_SOURCE="$PROJECT_DIR/frontend/public/icons/icon-512x512.png"

echo "🍎 Building macOS app bundle: $APP_NAME"

# Check if we're on macOS
if [[ "$OSTYPE" != "darwin"* ]]; then
    echo "❌ This script only works on macOS"
    exit 1
fi

# Check dependencies
if ! command -v sips >/dev/null 2>&1; then
    echo "❌ sips command not found (required for icon conversion)"
    exit 1
fi

if ! command -v iconutil >/dev/null 2>&1; then
    echo "❌ iconutil command not found (required for icns creation)"
    exit 1
fi

# Create app bundle structure
echo "📁 Creating app bundle structure..."
mkdir -p "$APP_DIR/Contents/MacOS"
mkdir -p "$APP_DIR/Contents/Resources"

# Create Info.plist
echo "📄 Creating Info.plist..."
cat > "$APP_DIR/Contents/Info.plist" << EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleDevelopmentRegion</key>
    <string>en</string>
    <key>CFBundleDisplayName</key>
    <string>AIDYN MCP-Hub</string>
    <key>CFBundleExecutable</key>
    <string>aidyn-mcphub</string>
    <key>CFBundleIconFile</key>
    <string>app.icns</string>
    <key>CFBundleIdentifier</key>
    <string>ai.aidyn.mcphub</string>
    <key>CFBundleInfoDictionaryVersion</key>
    <string>6.0</string>
    <key>CFBundleName</key>
    <string>AIDYN MCP-Hub</string>
    <key>CFBundlePackageType</key>
    <string>APPL</string>
    <key>CFBundleShortVersionString</key>
    <string>1.0.0</string>
    <key>CFBundleSignature</key>
    <string>????</string>
    <key>CFBundleVersion</key>
    <string>1</string>
    <key>LSMinimumSystemVersion</key>
    <string>10.15</string>
    <key>NSHighResolutionCapable</key>
    <true/>
    <key>LSUIElement</key>
    <false/>
    <key>NSRequiresAquaSystemAppearance</key>
    <false/>
    <key>CFBundleDocumentTypes</key>
    <array>
        <dict>
            <key>CFBundleTypeRole</key>
            <string>Viewer</string>
            <key>LSHandlerRank</key>
            <string>Owner</string>
            <key>LSItemContentTypes</key>
            <array>
                <string>public.url</string>
            </array>
        </dict>
    </array>
</dict>
</plist>
EOF

# Create executable script
echo "⚙️ Creating executable launcher..."
cat > "$APP_DIR/Contents/MacOS/aidyn-mcphub" << 'EOF'
#!/bin/bash
# AIDYN MCP-Hub macOS launcher

# Get the directory containing this app bundle
APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
PROJECT_DIR="$(dirname "$(dirname "$APP_DIR")")"

# Source the main launcher script
exec "$PROJECT_DIR/scripts/start-mcphub.sh" "$@"
EOF

chmod +x "$APP_DIR/Contents/MacOS/aidyn-mcphub"

# Create icon
if [ -f "$ICON_SOURCE" ]; then
    echo "🎨 Creating app icon..."
    ICONSET_DIR="$APP_DIR/Contents/Resources/app.iconset"
    mkdir -p "$ICONSET_DIR"

    # Generate all required icon sizes
    sips -z 16 16 "$ICON_SOURCE" --out "$ICONSET_DIR/icon_16x16.png" >/dev/null 2>&1
    sips -z 32 32 "$ICON_SOURCE" --out "$ICONSET_DIR/icon_16x16@2x.png" >/dev/null 2>&1
    sips -z 32 32 "$ICON_SOURCE" --out "$ICONSET_DIR/icon_32x32.png" >/dev/null 2>&1
    sips -z 64 64 "$ICON_SOURCE" --out "$ICONSET_DIR/icon_32x32@2x.png" >/dev/null 2>&1
    sips -z 128 128 "$ICON_SOURCE" --out "$ICONSET_DIR/icon_128x128.png" >/dev/null 2>&1
    sips -z 256 256 "$ICON_SOURCE" --out "$ICONSET_DIR/icon_128x128@2x.png" >/dev/null 2>&1
    sips -z 256 256 "$ICON_SOURCE" --out "$ICONSET_DIR/icon_256x256.png" >/dev/null 2>&1
    sips -z 512 512 "$ICON_SOURCE" --out "$ICONSET_DIR/icon_256x256@2x.png" >/dev/null 2>&1
    sips -z 512 512 "$ICON_SOURCE" --out "$ICONSET_DIR/icon_512x512.png" >/dev/null 2>&1
    cp "$ICON_SOURCE" "$ICONSET_DIR/icon_512x512@2x.png"

    # Convert to icns
    iconutil -c icns "$ICONSET_DIR" -o "$APP_DIR/Contents/Resources/app.icns"
    rm -rf "$ICONSET_DIR"

    echo "✅ Icon created successfully"
else
    echo "⚠️ Icon source not found at $ICON_SOURCE, using default icon"
fi

# Set bundle bit
echo "🔧 Setting bundle bit..."
if command -v SetFile >/dev/null 2>&1; then
    SetFile -a B "$APP_DIR"
else
    echo "⚠️ SetFile not available, bundle bit not set (app will still work)"
fi

echo "✅ macOS app bundle created successfully!"
echo "📍 Location: $APP_DIR"
echo ""
echo "📋 Usage:"
echo "  • Double-click to launch"
echo "  • Drag to Applications folder to install"
echo "  • Right-click → Open first time (if security warning)"
echo ""
echo "🚀 Test the app:"
echo "  open '$APP_DIR'"