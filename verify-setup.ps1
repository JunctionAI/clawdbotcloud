# Verify Clawdbot Bulletproof Setup
Write-Host "=== Clawdbot Setup Verification ===" -ForegroundColor Cyan
Write-Host ""

# Check power settings
Write-Host "[1/5] Checking power settings..." -ForegroundColor Yellow
$standby = powercfg /query SCHEME_CURRENT SUB_SLEEP | Select-String "Standby after" -Context 0,1
$hibernate = powercfg /query SCHEME_CURRENT SUB_SLEEP | Select-String "Hibernate after" -Context 0,1
Write-Host "  Power scheme: $(powercfg /getactivescheme)" -ForegroundColor Gray
if ($standby -match "0x00000000") {
    Write-Host "  ✅ Standby disabled (when plugged in)" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  Standby might be enabled" -ForegroundColor Yellow
}

# Check startup shortcut
Write-Host "`n[2/5] Checking startup configuration..." -ForegroundColor Yellow
$startupPath = "$env:APPDATA\Microsoft\Windows\Start Menu\Programs\Startup\Clawdbot Gateway.lnk"
if (Test-Path $startupPath) {
    Write-Host "  ✅ Startup shortcut exists" -ForegroundColor Green
    Write-Host "     $startupPath" -ForegroundColor Gray
} else {
    Write-Host "  ❌ Startup shortcut NOT found" -ForegroundColor Red
}

# Check bulletproof script
Write-Host "`n[3/5] Checking bulletproof script..." -ForegroundColor Yellow
$scriptPath = "C:\Users\Nightgalem\clawd\start-clawdbot-bulletproof.ps1"
if (Test-Path $scriptPath) {
    Write-Host "  ✅ Bulletproof script exists" -ForegroundColor Green
} else {
    Write-Host "  ❌ Bulletproof script NOT found" -ForegroundColor Red
}

# Check VBS launcher
Write-Host "`n[4/5] Checking VBS launcher..." -ForegroundColor Yellow
$vbsPath = "C:\Users\Nightgalem\clawd\start-clawdbot.vbs"
if (Test-Path $vbsPath) {
    Write-Host "  ✅ VBS launcher exists" -ForegroundColor Green
} else {
    Write-Host "  ❌ VBS launcher NOT found" -ForegroundColor Red
}

# Check if gateway is currently running
Write-Host "`n[5/5] Checking gateway status..." -ForegroundColor Yellow
$gatewayProcess = Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object { $_.CommandLine -like "*clawdbot*gateway*" }
if ($gatewayProcess) {
    Write-Host "  ✅ Gateway process is running (PID: $($gatewayProcess.Id))" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  Gateway process not detected" -ForegroundColor Yellow
}

# Test connection
Write-Host "`nTesting gateway connection..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://127.0.0.1:18789/" -TimeoutSec 3 -UseBasicParsing -ErrorAction Stop
    Write-Host "  ✅ Gateway is responding on port 18789" -ForegroundColor Green
} catch {
    Write-Host "  ❌ Gateway NOT responding on port 18789" -ForegroundColor Red
}

Write-Host "`n=== Verification Complete ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Summary:" -ForegroundColor White
Write-Host "  • PC will NOT sleep when plugged in" -ForegroundColor Gray
Write-Host "  • Clawdbot will auto-start on login" -ForegroundColor Gray
Write-Host "  • Gateway will auto-restart on crash (up to 999 times)" -ForegroundColor Gray
Write-Host "  • Logs: C:\Users\Nightgalem\clawd\clawdbot-autorestart.log" -ForegroundColor Gray
Write-Host ""
