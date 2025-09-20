@echo off
REM start-mcphub.bat - AIDYN MCP-Hub Launcher for Windows (Double-click friendly)
REM Simple batch file that calls the PowerShell script

title AIDYN MCP-Hub Launcher

echo 🚀 AIDYN MCP-Hub Launcher
echo.

REM Get the directory where this batch file is located
set "SCRIPT_DIR=%~dp0"

REM Check if PowerShell is available
powershell -Command "exit 0" >nul 2>&1
if errorlevel 1 (
    echo ❌ PowerShell is not available
    echo Please install PowerShell or use start-mcphub.ps1 directly
    pause
    exit /b 1
)

REM Ask user for mode selection
echo Select launch mode:
echo [1] Local (Docker stack)
echo [2] Remote (https://app.aidyn.ai)
echo.
set /p mode="Enter choice (1 or 2): "

if "%mode%"=="1" (
    echo.
    echo 🐳 Starting local Docker stack...
    powershell -ExecutionPolicy Bypass -File "%SCRIPT_DIR%start-mcphub.ps1"
) else if "%mode%"=="2" (
    echo.
    echo 🌐 Connecting to remote app...
    powershell -ExecutionPolicy Bypass -File "%SCRIPT_DIR%start-mcphub.ps1" -Remote
) else (
    echo.
    echo ❌ Invalid choice. Please select 1 or 2.
    pause
    exit /b 1
)

echo.
echo ✅ Launch completed!
echo Press any key to close this window...
pause >nul