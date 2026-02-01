#!/usr/bin/env pwsh
# Setup Clawdbot Gateway as 24/7 Windows Service via PM2

Write-Host "🚀 Setting up Clawdbot Gateway as 24/7 Service with PM2" -ForegroundColor Cyan
Write-Host ""

# Create logs directory
Write-Host "📁 Creating logs directory..."
New-Item -ItemType Directory -Force -Path "logs" | Out-Null

# Stop existing PM2 processes (if any)
Write-Host "🛑 Stopping any existing Clawdbot processes..."
pm2 delete clawdbot-gateway 2>$null

# Start gateway with PM2
Write-Host "▶️  Starting Clawdbot Gateway with PM2..."
pm2 start ecosystem.config.cjs

# Save PM2 process list
Write-Host "💾 Saving PM2 process list..."
pm2 save

# Setup PM2 to auto-start on Windows boot
Write-Host "🔧 Configuring PM2 auto-startup on Windows boot..."
Write-Host ""
Write-Host "⚠️  This requires admin privileges. If you see errors, run PowerShell as Administrator." -ForegroundColor Yellow
Write-Host ""

pm2 startup

Write-Host ""
Write-Host "✅ Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📊 Useful commands:" -ForegroundColor Cyan
Write-Host "  pm2 status              - Check gateway status"
Write-Host "  pm2 logs                - View live logs"
Write-Host "  pm2 restart all         - Restart gateway"
Write-Host "  pm2 stop all            - Stop gateway"
Write-Host "  pm2 start all           - Start gateway"
Write-Host "  pm2 monit               - Live monitoring dashboard"
Write-Host ""
Write-Host "🔍 Current status:"
pm2 status
