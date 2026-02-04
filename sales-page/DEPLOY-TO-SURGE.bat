@echo off
echo.
echo ========================================
echo   CLAWDBOT SALES PAGE - SURGE DEPLOY
echo ========================================
echo.
echo This will deploy your sales page to:
echo https://clawdbot-premium.surge.sh
echo.
echo First time? Surge will ask for:
echo - Email address
echo - Password (create one)
echo.
pause
echo.
echo Deploying...
echo.
surge . clawdbot-premium.surge.sh
echo.
echo ========================================
echo   DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo Your sales page is live at:
echo https://clawdbot-premium.surge.sh
echo.
echo Next steps:
echo 1. Test the URL in your browser
echo 2. Share on social media
echo 3. Update payment/booking links when ready
echo.
pause
