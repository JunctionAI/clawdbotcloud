# 🚀 ONE-CLICK DEPLOY SCRIPT FOR SALES PAGE
# Run this script to deploy your sales page in 30 seconds

Write-Host "🚀 CLAWDBOT SALES PAGE DEPLOYMENT" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

# Check if we're in the right directory
if (-not (Test-Path "index.html")) {
    Write-Host "❌ Error: index.html not found. Make sure you're in the sales-page directory." -ForegroundColor Red
    exit 1
}

Write-Host "📋 Deployment Options:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. 🌐 Start Local Server (Test Immediately)"
Write-Host "2. 📤 Netlify Drop Instructions (Fastest Deploy)"
Write-Host "3. 🔧 GitHub Pages (Automated)"
Write-Host ""

$choice = Read-Host "Enter your choice (1-3)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "🌐 Starting local server..." -ForegroundColor Green
        Write-Host "Your sales page will be available at: http://localhost:8000" -ForegroundColor Cyan
        Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
        Write-Host ""
        python -m http.server 8000 2>$null
        if ($LASTEXITCODE -ne 0) {
            Write-Host "Python not found, trying Node.js..." -ForegroundColor Yellow
            npx http-server -p 8000
        }
    }
    
    "2" {
        Write-Host ""
        Write-Host "📤 NETLIFY DROP DEPLOYMENT (30 seconds)" -ForegroundColor Green
        Write-Host "========================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "1. Open this URL in your browser:" -ForegroundColor Cyan
        Write-Host "   https://app.netlify.com/drop" -ForegroundColor White
        Write-Host ""
        Write-Host "2. Drag and drop THIS FOLDER onto the Netlify page:" -ForegroundColor Cyan
        Write-Host "   $PWD" -ForegroundColor White
        Write-Host ""
        Write-Host "3. Done! Netlify will give you a live URL instantly." -ForegroundColor Green
        Write-Host ""
        Write-Host "💡 TIP: Open Explorer to this folder for easy drag-and-drop" -ForegroundColor Yellow
        
        $openExplorer = Read-Host "Open folder in Explorer now? (Y/N)"
        if ($openExplorer -eq "Y" -or $openExplorer -eq "y") {
            explorer.exe .
            Start-Process "https://app.netlify.com/drop"
        }
    }
    
    "3" {
        Write-Host ""
        Write-Host "🔧 GITHUB PAGES DEPLOYMENT" -ForegroundColor Green
        Write-Host "===========================" -ForegroundColor Green
        Write-Host ""
        
        # Create a new repo directory
        $repoName = "clawdbot-sales"
        $tempDir = "$env:TEMP\$repoName"
        
        Write-Host "Creating deployment repo..." -ForegroundColor Cyan
        
        if (Test-Path $tempDir) {
            Remove-Item -Recurse -Force $tempDir
        }
        
        New-Item -ItemType Directory -Path $tempDir | Out-Null
        Copy-Item "index.html" -Destination $tempDir
        Copy-Item "README.md" -Destination $tempDir
        Copy-Item "DEPLOY-CHECKLIST.md" -Destination $tempDir
        
        Set-Location $tempDir
        git init
        git add .
        git commit -m "Initial commit: Clawdbot sales page"
        
        Write-Host ""
        Write-Host "✅ Repo created at: $tempDir" -ForegroundColor Green
        Write-Host ""
        Write-Host "📋 NEXT STEPS:" -ForegroundColor Yellow
        Write-Host "1. Create a new GitHub repo named 'clawdbot-sales'"
        Write-Host "2. Run these commands:"
        Write-Host ""
        Write-Host "   cd $tempDir" -ForegroundColor White
        Write-Host "   git remote add origin https://github.com/YOUR-USERNAME/clawdbot-sales.git" -ForegroundColor White
        Write-Host "   git push -u origin main" -ForegroundColor White
        Write-Host ""
        Write-Host "3. Go to repo Settings → Pages → Source: main branch"
        Write-Host "4. Your site will be live at: https://YOUR-USERNAME.github.io/clawdbot-sales"
        Write-Host ""
    }
    
    default {
        Write-Host "❌ Invalid choice. Please run the script again and choose 1, 2, or 3." -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "🎉 Deployment process complete!" -ForegroundColor Green
Write-Host ""
