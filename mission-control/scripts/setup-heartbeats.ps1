# Setup Heartbeat Crons for All Agents

Write-Host "💓 Setting up agent heartbeats..." -ForegroundColor Cyan
Write-Host ""

$workspace = "C:\Users\Nightgalem\clawd"

# Jarvis - Squad Lead (wakes :00, :15, :30, :45)
Write-Host "Setting up Jarvis heartbeat..." -ForegroundColor Yellow
clawdbot cron add `
  --name "jarvis-heartbeat" `
  --cron "0,15,30,45 * * * *" `
  --session "isolated" `
  --workspace "$workspace\agents\jarvis" `
  --message "Read HEARTBEAT.md. Follow it strictly. If nothing needs attention, reply HEARTBEAT_OK."

Write-Host "✓ Jarvis heartbeat configured (every 15min at :00, :15, :30, :45)" -ForegroundColor Green
Write-Host ""

# Shuri - Product Analyst (wakes :02, :17, :32, :47)
Write-Host "Setting up Shuri heartbeat..." -ForegroundColor Yellow
clawdbot cron add `
  --name "shuri-heartbeat" `
  --cron "2,17,32,47 * * * *" `
  --session "isolated" `
  --workspace "$workspace\agents\shuri" `
  --message "Read HEARTBEAT.md. Follow it strictly. If nothing needs attention, reply HEARTBEAT_OK."

Write-Host "✓ Shuri heartbeat configured (every 15min at :02, :17, :32, :47)" -ForegroundColor Green
Write-Host ""

# Fury - Customer Researcher (wakes :04, :19, :34, :49)
Write-Host "Setting up Fury heartbeat..." -ForegroundColor Yellow
clawdbot cron add `
  --name "fury-heartbeat" `
  --cron "4,19,34,49 * * * *" `
  --session "isolated" `
  --workspace "$workspace\agents\fury" `
  --message "Read HEARTBEAT.md. Follow it strictly. If nothing needs attention, reply HEARTBEAT_OK."

Write-Host "✓ Fury heartbeat configured (every 15min at :04, :19, :34, :49)" -ForegroundColor Green
Write-Host ""

Write-Host "✅ All heartbeats configured!" -ForegroundColor Green
Write-Host ""
Write-Host "Verify with: clawdbot cron list" -ForegroundColor Cyan
Write-Host ""
