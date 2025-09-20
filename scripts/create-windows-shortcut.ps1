# create-windows-shortcut.ps1 - Creates Windows shortcut for AIDYN MCP-Hub

param(
    [string]$DesktopPath = [Environment]::GetFolderPath("Desktop"),
    [string]$StartMenuPath = [Environment]::GetFolderPath("Programs")
)

$ErrorActionPreference = "Stop"

Write-Host "🪟 Creating Windows shortcuts for AIDYN MCP-Hub" -ForegroundColor Green

# Get script and project directories
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectDir = Split-Path -Parent $scriptDir
$iconSource = Join-Path $projectDir "frontend\public\icons\icon-512x512.png"
$batchScript = Join-Path $scriptDir "start-mcphub.bat"

# Check if batch script exists
if (-not (Test-Path $batchScript)) {
    Write-Host "❌ Batch script not found: $batchScript" -ForegroundColor Red
    exit 1
}

# Function to create ICO from PNG (requires ImageMagick or similar)
function Convert-PngToIco {
    param([string]$PngPath, [string]$IcoPath)

    if (Test-Path $PngPath) {
        # Try using ImageMagick if available
        if (Get-Command "magick" -ErrorAction SilentlyContinue) {
            Write-Host "🎨 Converting PNG to ICO using ImageMagick..." -ForegroundColor Cyan
            magick "$PngPath" -define icon:auto-resize=256,128,64,48,32,16 "$IcoPath"
            return $true
        }
        # Try using PowerShell with .NET (limited functionality)
        else {
            Write-Host "⚠️ ImageMagick not found. Using fallback method..." -ForegroundColor Yellow
            # Copy PNG as ICO (not ideal but works)
            Copy-Item $PngPath $IcoPath
            return $true
        }
    }
    return $false
}

# Create icon
$iconPath = Join-Path $projectDir "dist\aidyn-mcphub.ico"
$iconCreated = Convert-PngToIco $iconSource $iconPath

if (-not $iconCreated) {
    Write-Host "⚠️ Could not create icon, shortcuts will use default icon" -ForegroundColor Yellow
    $iconPath = $null
}

# Function to create shortcut
function New-Shortcut {
    param(
        [string]$ShortcutPath,
        [string]$TargetPath,
        [string]$Description,
        [string]$IconPath = $null,
        [string]$Arguments = ""
    )

    $WshShell = New-Object -ComObject WScript.Shell
    $Shortcut = $WshShell.CreateShortcut($ShortcutPath)
    $Shortcut.TargetPath = $TargetPath
    $Shortcut.Description = $Description
    $Shortcut.WorkingDirectory = Split-Path $TargetPath

    if ($Arguments) {
        $Shortcut.Arguments = $Arguments
    }

    if ($IconPath -and (Test-Path $IconPath)) {
        $Shortcut.IconLocation = $IconPath
    }

    $Shortcut.Save()
    Write-Host "✅ Created: $ShortcutPath" -ForegroundColor Green
}

# Create desktop shortcut
$desktopShortcut = Join-Path $DesktopPath "AIDYN MCP-Hub.lnk"
New-Shortcut -ShortcutPath $desktopShortcut -TargetPath $batchScript -Description "AIDYN MCP-Hub - AI-powered email management platform" -IconPath $iconPath

# Create start menu shortcut
$startMenuDir = Join-Path $StartMenuPath "AIDYN Technologies"
if (-not (Test-Path $startMenuDir)) {
    New-Item -Path $startMenuDir -ItemType Directory -Force | Out-Null
}

$startMenuShortcut = Join-Path $startMenuDir "AIDYN MCP-Hub.lnk"
New-Shortcut -ShortcutPath $startMenuShortcut -TargetPath $batchScript -Description "AIDYN MCP-Hub - AI-powered email management platform" -IconPath $iconPath

# Create additional shortcuts for different modes
$startMenuShortcutRemote = Join-Path $startMenuDir "AIDYN MCP-Hub (Remote).lnk"
$psScript = Join-Path $scriptDir "start-mcphub.ps1"
New-Shortcut -ShortcutPath $startMenuShortcutRemote -TargetPath "powershell.exe" -Arguments "-ExecutionPolicy Bypass -File `"$psScript`" -Remote" -Description "AIDYN MCP-Hub - Connect to remote production app" -IconPath $iconPath

Write-Host ""
Write-Host "✅ Windows shortcuts created successfully!" -ForegroundColor Green
Write-Host "📍 Desktop: $desktopShortcut" -ForegroundColor Cyan
Write-Host "📍 Start Menu: $startMenuShortcut" -ForegroundColor Cyan
Write-Host "📍 Start Menu (Remote): $startMenuShortcutRemote" -ForegroundColor Cyan

if ($iconCreated -and $iconPath) {
    Write-Host "🎨 Icon: $iconPath" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "📋 Usage:" -ForegroundColor Yellow
Write-Host "  • Double-click desktop shortcut to launch" -ForegroundColor White
Write-Host "  • Find 'AIDYN MCP-Hub' in Start Menu" -ForegroundColor White
Write-Host "  • Use 'AIDYN MCP-Hub (Remote)' for production app" -ForegroundColor White
Write-Host ""
Write-Host "🗑️ To uninstall shortcuts:" -ForegroundColor Yellow
Write-Host "  Remove-Item '$desktopShortcut'" -ForegroundColor White
Write-Host "  Remove-Item '$startMenuDir' -Recurse" -ForegroundColor White