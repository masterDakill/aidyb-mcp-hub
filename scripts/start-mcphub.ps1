# start-mcphub.ps1 - AIDYN MCP-Hub Launcher for Windows
# Starts Docker stack and opens the app in browser

param(
    [switch]$Remote,
    [switch]$Quiet,
    [switch]$Help
)

# Configuration
$LOCAL_URL = "http://localhost"
$LOCAL_HEALTH = "$LOCAL_URL/health"
$REMOTE_URL = "https://app.aidyn.ai"
$REMOTE_HEALTH = "$REMOTE_URL/health"
$TIMEOUT = 90
$SCRIPT_DIR = Split-Path -Parent $MyInvocation.MyCommand.Path
$PROJECT_DIR = Split-Path -Parent $SCRIPT_DIR

# Show help
if ($Help) {
    Write-Host "🚀 AIDYN MCP-Hub Launcher" -ForegroundColor Green
    Write-Host ""
    Write-Host "Usage: .\start-mcphub.ps1 [OPTIONS]"
    Write-Host ""
    Write-Host "Options:"
    Write-Host "  -Remote      Connect to remote production app (https://app.aidyn.ai)"
    Write-Host "  -Quiet       Suppress non-error output"
    Write-Host "  -Help        Show this help message"
    Write-Host ""
    Write-Host "Default: Launch local Docker stack and open http://localhost"
    exit 0
}

# Logging function
function Write-Log {
    param([string]$Message)
    if (-not $Quiet) {
        Write-Host $Message -ForegroundColor Cyan
    }
}

# Error function
function Write-Error-Exit {
    param([string]$Message)
    Write-Host "❌ $Message" -ForegroundColor Red
    exit 1
}

# Wait for URL function
function Wait-ForUrl {
    param(
        [string]$Url,
        [int]$TimeoutSeconds = 90,
        [int]$IntervalSeconds = 2
    )

    $startTime = Get-Date
    Write-Log "🔍 Waiting for $Url to be ready (timeout: ${TimeoutSeconds}s)..."

    while ($true) {
        $elapsed = (Get-Date) - $startTime

        if ($elapsed.TotalSeconds -ge $TimeoutSeconds) {
            Write-Error-Exit "Timeout after ${TimeoutSeconds}s waiting for $Url"
        }

        try {
            $response = Invoke-WebRequest -Uri $Url -Method Head -TimeoutSec 5 -ErrorAction Stop
            if ($response.StatusCode -eq 200) {
                Write-Log "✅ $Url is ready! (took $([int]$elapsed.TotalSeconds)s)"
                return $true
            }
        }
        catch {
            # Continue waiting
        }

        Write-Log "⏳ Still waiting... ($([int]$elapsed.TotalSeconds)s/${TimeoutSeconds}s)"
        Start-Sleep $IntervalSeconds
    }
}

Write-Log "🚀 Starting AIDYN MCP-Hub..."

if ($Remote) {
    Write-Log "🌐 Remote mode: Connecting to production app"
    $TARGET_URL = $REMOTE_URL
    $HEALTH_URL = $REMOTE_HEALTH

    Write-Log "🔍 Checking remote app availability..."
    if (-not (Wait-ForUrl $HEALTH_URL 10 1)) {
        Write-Error-Exit "Remote app is not available at $REMOTE_URL"
    }
} else {
    Write-Log "🐳 Local mode: Starting Docker stack"
    $TARGET_URL = $LOCAL_URL
    $HEALTH_URL = $LOCAL_HEALTH

    # Check if Docker is available
    try {
        docker --version | Out-Null
    }
    catch {
        Write-Error-Exit "Docker is not installed or not in PATH"
    }

    # Check if Docker is running
    try {
        docker info | Out-Null
    }
    catch {
        Write-Log "🔄 Docker is not running. Attempting to start Docker Desktop..."

        # Try to start Docker Desktop
        $dockerDesktopPath = "${env:ProgramFiles}\Docker\Docker\Docker Desktop.exe"
        if (Test-Path $dockerDesktopPath) {
            Start-Process $dockerDesktopPath
            Write-Log "⏳ Please wait for Docker Desktop to start, then run this script again."
        } else {
            Write-Log "🔄 Please start Docker Desktop manually and try again."
        }

        Write-Error-Exit "Docker is not running"
    }

    # Navigate to project directory
    Set-Location $PROJECT_DIR

    # Check if docker-compose.yml exists
    if (-not (Test-Path "docker-compose.yml")) {
        Write-Error-Exit "docker-compose.yml not found in $PROJECT_DIR"
    }

    Write-Log "📦 Starting Docker Compose stack..."
    try {
        docker compose up -d
        if ($LASTEXITCODE -ne 0) {
            throw "Docker compose failed"
        }
    }
    catch {
        Write-Error-Exit "Failed to start Docker Compose stack"
    }

    Write-Log "🔍 Waiting for health check..."
    if (-not (Wait-ForUrl $HEALTH_URL $TIMEOUT)) {
        Write-Log "🔧 Checking container status..."
        docker compose ps
        Write-Error-Exit "Health check failed after ${TIMEOUT}s"
    }
}

Write-Log "✅ AIDYN MCP-Hub is ready!"
Write-Log "🌐 Opening $TARGET_URL in browser..."

# Open URL in default browser
Start-Process $TARGET_URL

Write-Log "🎉 AIDYN MCP-Hub launched successfully!"

if (-not $Remote) {
    Write-Log ""
    Write-Log "📋 Quick commands:"
    Write-Log "  • Stop:  .\scripts\stop-mcphub.ps1"
    Write-Log "  • Logs:  docker compose logs -f"
    Write-Log "  • Status: docker compose ps"
}