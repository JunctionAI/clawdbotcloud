# Verify bulletproof Clawdbot setup

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "CLAWDBOT BULLETPROOF SETUP VERIFICATION" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check 1: Power settings
Write-Host "1. Power Settings:" -ForegroundColor Yellow
$sleepAC = powercfg /query SCHEME_CURRENT SUB_SLEEP STANDBYIDLE | Select-String "Current AC Power Setting Index:" | ForEach-Object { $_.Line -replace '.*: 0x', '' }
$hibernateAC = powercfg /query SCHEME_CURRENT SUB_SLEEP HIBERNATEIDLE | Select-String "Current AC Power Setting Index:" | ForEach-Object { $_.Line -replace '.*: 0x', '' }

if ($sleepAC -eq "00000000") {
    Write-Host "   ✅ Sleep disabled (AC)" -ForegroundColor Green
} else {
    Write-Host "   ❌ Sleep is enabled! Run Step 1 commands." -ForegroundColor Red
}

if ($hibernateAC -eq "00000000") {
    Write-Host "   ✅ Hibernate disabled (AC)" -ForegroundColor Green
} else {
    Write-Host "   ❌ Hibernate is enabled! Run Step 1 commands." -ForegroundColor Red
}

Write-Host ""

# Check 2: Scheduled task
Write-Host "2. Scheduled Task:" -ForegroundColor Yellow
$task = Get-ScheduledTask -TaskName "Clawdbot Gateway Bulletproof" -ErrorAction SilentlyContinue
if ($task) {
    Write-Host "   ✅ Task exists" -ForegroundColor Green
    Write-Host "   State: $($task.State)" -ForegroundColor White
    if ($task.State -eq "Running") {
        Write-Host "   ✅ Task is running" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️  Task not running. Start with: Start-ScheduledTask -TaskName 'Clawdbot Gateway Bulletproof'" -ForegroundColor Yellow
    }
} else {
    Write-Host "   ❌ Task not found! Run create-bulletproof-startup.ps1" -ForegroundColor Red
}

Write-Host ""

# Check 3: Clawdbot process
Write-Host "3. Clawdbot Process:" -ForegroundColor Yellow
$process = Get-CimInstance Win32_Process | Where-Object {$_.CommandLine -like "*clawdbot*gateway*start*"}
if ($process) {
    $uptime = (Get-Date) - $process.CreationDate
    Write-Host "   ✅ Clawdbot is running" -ForegroundColor Green
    Write-Host "   PID: $($process.ProcessId)" -ForegroundColor White
    Write-Host "   Uptime: $($uptime.Hours)h $($uptime.Minutes)m $($uptime.Seconds)s" -ForegroundColor White
} else {
    Write-Host "   ❌ Clawdbot not running!" -ForegroundColor Red
}

Write-Host ""

# Check 4: Log file
Write-Host "4. Log File:" -ForegroundColor Yellow
$logFile = "C:\Users\Nightgalem\clawd\clawdbot-autorestart.log"
if (Test-Path $logFile) {
    $lastLines = Get-Content $logFile -Tail 5
    Write-Host "   ✅ Log file exists" -ForegroundColor Green
    Write-Host "   Last 5 lines:" -ForegroundColor White
    $lastLines | ForEach-Object { Write-Host "      $_" -ForegroundColor Gray }
} else {
    Write-Host "   ⚠️  Log file not created yet (normal if just started)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "SUMMARY" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

$allGood = ($sleepAC -eq "00000000") -and ($hibernateAC -eq "00000000") -and $task -and $process

if ($allGood) {
    Write-Host "✅ EVERYTHING LOOKS GOOD!" -ForegroundColor Green
    Write-Host "Your PC is configured for 24/7 operation." -ForegroundColor Green
} else {
    Write-Host "⚠️  SOME ISSUES FOUND" -ForegroundColor Yellow
    Write-Host "Review the checks above and fix any red items." -ForegroundColor Yellow
}

Write-Host ""
