# Clawdbot PM2 Setup Script (Windows PowerShell)
# Run this script to set up Clawdbot to run 24/7 in the background

Write-Host "🚀 Setting up Clawdbot with PM2..." -ForegroundColor Green
Write-Host ""

# Install PM2 if not already installed
try {
    $null = Get-Command pm2 -ErrorAction Stop
    Write-Host "✅ PM2 already installed" -ForegroundColor Green
} catch {
    Write-Host "📦 Installing PM2..." -ForegroundColor Yellow
    npm install -g pm2
}

# Create ecosystem.config.js in workspace
$WorkspaceDir = Join-Path $env:USERPROFILE "clawd"
New-Item -ItemType Directory -Force -Path $WorkspaceDir | Out-Null

Write-Host "📝 Creating PM2 configuration..." -ForegroundColor Yellow

$configContent = @'
const os = require('os');
const path = require('path');

module.exports = {
  apps: [{
    name: 'clawdbot-gateway',
    script: path.join(os.homedir(), 'AppData', 'Roaming', 'npm', 'node_modules', 'clawdbot', 'dist', 'entry.js'),
    args: 'gateway start',
    cwd: path.join(os.homedir(), 'clawd'),
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
'@

$configPath = Join-Path $WorkspaceDir "ecosystem.config.js"
Set-Content -Path $configPath -Value $configContent

# Navigate to workspace
Set-Location $WorkspaceDir

# Stop existing instance if running
pm2 delete clawdbot-gateway 2>$null

# Start Clawdbot with PM2
Write-Host "🎯 Starting Clawdbot..." -ForegroundColor Yellow
pm2 start ecosystem.config.js

# Save PM2 process list
pm2 save

# Show status
Write-Host ""
Write-Host "✅ Clawdbot is now running!" -ForegroundColor Green
Write-Host ""
pm2 status

Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Cyan
Write-Host "  1. Run: pm2 startup" -ForegroundColor White
Write-Host "  2. Follow the command PM2 gives you (may require admin)" -ForegroundColor White
Write-Host "  3. This will make Clawdbot start automatically on boot" -ForegroundColor White
Write-Host ""
Write-Host "💡 Useful commands:" -ForegroundColor Cyan
Write-Host "  pm2 status                    # Check if running" -ForegroundColor White
Write-Host "  pm2 logs clawdbot-gateway     # View live logs" -ForegroundColor White
Write-Host "  pm2 restart clawdbot-gateway  # Restart" -ForegroundColor White
Write-Host ""
