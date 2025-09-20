# 🚀 AIDYN MCP-Hub App Launcher

Cross-platform desktop launcher for AIDYN MCP-Hub with support for local Docker and remote production modes.

## 📋 Quick Start

### 🍎 macOS
```bash
# Build and install the app
make build-macos-app

# Launch from command line
make app                    # Local Docker mode
make app-remote            # Remote production mode

# Or double-click: dist/AIDYN MCP-Hub.app
```

### 🪟 Windows
```powershell
# Create desktop shortcuts
.\scripts\create-windows-shortcut.ps1

# Launch from command line
.\scripts\start-mcphub.bat  # Interactive mode selection
.\scripts\start-mcphub.ps1  # Local Docker mode
.\scripts\start-mcphub.ps1 -Remote  # Remote production mode
```

### 🐧 Linux
```bash
# Install desktop entry
scripts/install-desktop-entry.sh

# Launch from command line
make app                    # Local Docker mode
make app-remote            # Remote production mode

# Or find "AIDYN MCP-Hub" in your application menu
```

## 🎯 Launcher Modes

### 🐳 Local Mode (Default)
- Starts local Docker Compose stack
- Waits for health check on `http://localhost/health`
- Opens `http://localhost/` in browser
- Full development environment with all services

### 🌐 Remote Mode
- Connects directly to production app at `https://app.aidyn.ai`
- No Docker required
- Quick health check and browser launch
- Perfect for end-users

## 📁 File Structure

```
scripts/
├── start-mcphub.sh         # Main launcher (macOS/Linux)
├── start-mcphub.ps1        # PowerShell launcher (Windows)
├── start-mcphub.bat        # Batch launcher (Windows)
├── stop-mcphub.sh          # Stop local Docker stack
├── wait-for-url.sh         # Health check utility
├── build-macos-app.sh      # macOS app builder
├── install-desktop-entry.sh # Linux desktop installer
└── create-windows-shortcut.ps1 # Windows shortcut creator

dist/
├── AIDYN MCP-Hub.app/      # macOS app bundle
├── aidyn-mcphub.ico        # Windows icon
└── aidyn-mcphub.desktop    # Linux desktop entry

Makefile                    # Cross-platform commands
```

## ⚙️ Configuration

### Environment Variables

You can customize the launcher behavior with environment variables:

```bash
# URLs (can be overridden)
export AIDYN_LOCAL_URL="http://localhost"
export AIDYN_REMOTE_URL="https://app.aidyn.ai"

# Timeouts
export AIDYN_HEALTH_TIMEOUT="90"  # seconds
export AIDYN_CHECK_INTERVAL="2"   # seconds
```

### URL Customization

To change the remote URL (e.g., for staging or custom deployment):

1. **Temporary override:**
   ```bash
   AIDYN_REMOTE_URL="https://staging.aidyn.ai" ./scripts/start-mcphub.sh --remote
   ```

2. **Permanent change - edit scripts:**
   ```bash
   # In start-mcphub.sh and start-mcphub.ps1
   REMOTE_URL="https://your-custom-domain.com"
   ```

3. **For production deployment:**
   ```bash
   # Update all scripts to point to your domain
   find scripts/ -name "*.sh" -o -name "*.ps1" | xargs sed -i 's|https://app.aidyn.ai|https://your-domain.com|g'
   ```

## 🛠️ Building Platform-Specific Apps

### 🍎 macOS App Bundle

```bash
# Build the app
./scripts/build-macos-app.sh

# Result: dist/AIDYN MCP-Hub.app
# - Proper Info.plist with bundle ID ai.aidyn.mcphub
# - ICNS icon generated from PNG source
# - Executable launcher script
# - Ready for distribution or App Store

# Install to Applications
cp -R "dist/AIDYN MCP-Hub.app" /Applications/

# Test
open "dist/AIDYN MCP-Hub.app"
```

### 🪟 Windows Shortcuts

```powershell
# Create shortcuts with icons
.\scripts\create-windows-shortcut.ps1

# Creates:
# - Desktop shortcut
# - Start Menu shortcuts (Local + Remote)
# - ICO icon (requires ImageMagick for best results)

# Manual icon creation (if needed)
magick frontend\public\icons\icon-512x512.png -define icon:auto-resize=256,128,64,48,32,16 dist\aidyn-mcphub.ico
```

### 🐧 Linux Desktop Entry

```bash
# Install for current user
./scripts/install-desktop-entry.sh

# Manual installation
cp scripts/aidyn-mcphub.desktop ~/.local/share/applications/
cp frontend/public/icons/icon-512x512.png ~/.local/share/icons/aidyn-mcphub.png
update-desktop-database ~/.local/share/applications/

# System-wide installation (requires sudo)
sudo cp scripts/aidyn-mcphub.desktop /usr/share/applications/
sudo cp frontend/public/icons/icon-512x512.png /usr/share/pixmaps/aidyn-mcphub.png
sudo update-desktop-database
```

## 🔧 Development Commands

### Make Targets

```bash
# App Management
make app                    # Launch local app
make app-remote            # Launch remote app
make setup-launchers       # Set up cross-platform scripts

# Docker Management
make up                     # Start Docker stack
make down                   # Stop Docker stack
make health                 # Check health status
make logs                   # View live logs
make status                 # Container status
make clean                  # Full cleanup

# Development
make install-deps          # Install frontend deps
make build                 # Build frontend
make dev                   # Start dev server
make check-docker          # Verify Docker setup
make check-deps            # Verify dependencies

# Platform Builds
make build-macos-app       # Build macOS app
make install-linux-desktop # Install Linux desktop entry
```

### Direct Script Usage

```bash
# Bash scripts (macOS/Linux)
./scripts/start-mcphub.sh --help
./scripts/start-mcphub.sh                    # Local mode
./scripts/start-mcphub.sh --remote          # Remote mode
./scripts/start-mcphub.sh --quiet           # Silent mode
./scripts/stop-mcphub.sh                    # Stop local stack

# PowerShell (Windows)
.\scripts\start-mcphub.ps1 -Help
.\scripts\start-mcphub.ps1                  # Local mode
.\scripts\start-mcphub.ps1 -Remote         # Remote mode
.\scripts\start-mcphub.ps1 -Quiet          # Silent mode

# Utilities
./scripts/wait-for-url.sh http://localhost/health 60 2
```

## 🎨 Icon Management

### Source Icon
- **Location:** `frontend/public/icons/icon-512x512.png`
- **Size:** 512x512px AIDYN logo
- **Format:** PNG with transparency

### Generated Icons
- **macOS:** `dist/AIDYN MCP-Hub.app/Contents/Resources/app.icns`
- **Windows:** `dist/aidyn-mcphub.ico`
- **Linux:** Copied to `~/.local/share/icons/aidyn-mcphub.png`

### Regenerating Icons

```bash
# macOS (automatic in build script)
./scripts/build-macos-app.sh

# Windows (requires ImageMagick)
magick frontend/public/icons/icon-512x512.png -define icon:auto-resize=256,128,64,48,32,16 dist/aidyn-mcphub.ico

# Linux (direct copy)
cp frontend/public/icons/icon-512x512.png ~/.local/share/icons/aidyn-mcphub.png
```

## 🚨 Troubleshooting

### Docker Issues

```bash
# Check Docker status
make check-docker

# Docker not running
# macOS: open -a "Docker Desktop"
# Windows: Start-Process "Docker Desktop"
# Linux: sudo systemctl start docker

# Permission issues (Linux)
sudo usermod -aG docker $USER  # Then logout/login
```

### Health Check Failures

```bash
# Debug health endpoint
curl -v http://localhost/health

# Check container logs
make logs

# Check container status
make status
docker compose ps
```

### App Launch Issues

```bash
# macOS: Security warning
# Right-click app → Open → Confirm

# Windows: PowerShell execution policy
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Linux: Desktop entry not showing
update-desktop-database ~/.local/share/applications/
```

### Icon Issues

```bash
# macOS: Icon not showing
# Rebuild app bundle: ./scripts/build-macos-app.sh

# Windows: No icon in shortcut
# Install ImageMagick and re-run: .\scripts\create-windows-shortcut.ps1

# Linux: Icon not in menu
gtk-update-icon-cache ~/.local/share/icons/
```

## 📦 Distribution

### For End Users

1. **Package the launcher scripts:**
   ```bash
   # Create distribution package
   tar -czf aidyn-mcphub-launcher.tar.gz \
     scripts/ \
     Makefile \
     README-APP-LAUNCHER.md \
     frontend/public/icons/icon-512x512.png
   ```

2. **Include setup instructions:**
   - macOS: Run `./scripts/build-macos-app.sh`
   - Windows: Run `.\scripts\create-windows-shortcut.ps1`
   - Linux: Run `./scripts/install-desktop-entry.sh`

3. **For remote-only usage:**
   ```bash
   # Edit scripts to default to remote mode
   sed -i 's/REMOTE_MODE=false/REMOTE_MODE=true/' scripts/start-mcphub.sh
   ```

### For Developers

- Include full repository with Docker setup
- Use `make setup` for initial environment setup
- Use `make app` for local development
- Use `make app-remote` to test against production

## 🔐 Security Notes

- Scripts validate Docker availability before launching
- Health checks ensure services are ready before opening browser
- No sensitive data is stored in launcher scripts
- Icons are embedded in platform-specific formats
- Desktop entries follow platform security guidelines

## 📞 Support

### Common Issues
1. **Docker not starting:** Check Docker Desktop installation
2. **Health check timeout:** Increase timeout or check container logs
3. **Icon not showing:** Regenerate with appropriate tools
4. **Permission denied:** Check script execute permissions

### Debug Mode
```bash
# Enable verbose output
./scripts/start-mcphub.sh --help
bash -x ./scripts/start-mcphub.sh  # Full debug trace
```

---

**Version:** 1.0.0
**Compatible with:** AIDYN MCP-Hub v1.0+
**Last updated:** $(date +%Y-%m-%d)
**Platforms:** macOS 10.15+, Windows 10+, Ubuntu 18.04+