# Mission Control Quick Start Script
# Run this to set up everything

Write-Host "🎯 Mission Control Quick Start" -ForegroundColor Cyan
Write-Host ""

# Check if Convex is configured
if (!(Test-Path ".env.local")) {
    Write-Host "❌ .env.local not found" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please run:" -ForegroundColor Yellow
    Write-Host "  npx convex dev"  -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Then create .env.local with:" -ForegroundColor Yellow
    Write-Host "  NEXT_PUBLIC_CONVEX_URL=<your-convex-url>" -ForegroundColor Yellow
    Write-Host ""
    exit 1
}

Write-Host "✓ Found .env.local" -ForegroundColor Green

# Load env
Get-Content .env.local | ForEach-Object {
    if ($_ -match '^\s*([^#][^=]+)\s*=\s*(.+)\s*$') {
        $name = $matches[1].Trim()
        $value = $matches[2].Trim()
        [Environment]::SetEnvironmentVariable($name, $value, "Process")
    }
}

$convexUrl = $env:NEXT_PUBLIC_CONVEX_URL
if (!$convexUrl) {
    Write-Host "❌ NEXT_PUBLIC_CONVEX_URL not set in .env.local" -ForegroundColor Red
    exit 1
}

Write-Host "✓ Convex URL: $convexUrl" -ForegroundColor Green
Write-Host ""

# Setup agents
Write-Host "📝 Registering agents..." -ForegroundColor Cyan
node scripts/setup-agents.js

Write-Host ""
Write-Host "✅ Mission Control Setup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Set up heartbeat crons (see README.md)" -ForegroundColor White
Write-Host "2. Start UI: npm run dev" -ForegroundColor White
Write-Host "3. Start daemon: cd daemon && node notification-daemon.js" -ForegroundColor White
Write-Host ""
