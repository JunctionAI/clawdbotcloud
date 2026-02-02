#!/bin/bash

# Meta Ads Automation Cron Setup
# Adds automated monitoring and reporting to crontab

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

echo "═══════════════════════════════════════════"
echo "  Meta Ads Automation - Cron Setup"
echo "═══════════════════════════════════════════"
echo ""
echo "This will add the following cron jobs:"
echo ""
echo "1. Monitor campaigns: Every 2 hours"
echo "2. Generate reports: Daily at 8 AM"
echo ""
echo "Project directory: $PROJECT_DIR"
echo ""

read -p "Continue? (y/n): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Setup cancelled"
    exit 1
fi

# Create cron jobs
CRON_MONITOR="0 */2 * * * cd $PROJECT_DIR && /usr/bin/node scripts/meta-ads-automation.js monitor >> logs/meta-ads-monitor.log 2>&1"
CRON_REPORT="0 8 * * * cd $PROJECT_DIR && /usr/bin/node scripts/meta-ads-automation.js report >> logs/meta-ads-report.log 2>&1"

# Add to crontab
(crontab -l 2>/dev/null; echo "$CRON_MONITOR") | crontab -
(crontab -l 2>/dev/null; echo "$CRON_REPORT") | crontab -

echo "✅ Cron jobs added successfully!"
echo ""
echo "Current crontab:"
crontab -l | grep meta-ads
echo ""
echo "Logs will be saved to:"
echo "  - logs/meta-ads-monitor.log"
echo "  - logs/meta-ads-report.log"
echo ""
echo "To remove cron jobs later:"
echo "  crontab -e"
echo "  (Delete the meta-ads lines)"
echo ""
echo "To view logs:"
echo "  tail -f logs/meta-ads-monitor.log"
echo ""

# Create logs directory
mkdir -p "$PROJECT_DIR/logs"

echo "✅ Setup complete!"
