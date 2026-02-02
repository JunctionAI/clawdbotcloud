# Meta Ads Automation - Quick Reference Card

**Keep this handy for daily operations! 📋**

## 🚀 Common Commands

```bash
# Launch campaign (interactive)
npm run launch

# Launch campaign (CLI)
node scripts/meta-ads-automation.js launch '{"appName":"MyApp","appType":"gaming","budget":100}'

# Monitor all campaigns
npm run monitor

# Generate daily report
npm run report

# Check status
npm run status

# Set up automation (one-time)
npm run setup-cron
```

## 📊 App Types

| Type | Use For | Target CPA | Target ROAS |
|------|---------|------------|-------------|
| `gaming` | Games | $5-20 | 2.5x |
| `productivity` | Tools, utilities | $10-50 | 3.0x |
| `ecommerce` | Shopping apps | $15-75 | 4.0x |
| `social` | Social networks | $3-15 | 2.0x |
| `health` | Fitness, wellness | $8-40 | 3.5x |
| `finance` | Banking, investing | $20-100 | 5.0x |
| `default` | Everything else | $10-50 | 3.0x |

## 💰 Budget Guidelines

| Phase | Duration | Budget/Day | Goal |
|-------|----------|------------|------|
| Test | 3 days | $50 | Validate |
| Learn | 7 days | $75-100 | Gather data |
| Optimize | 14 days | $100-200 | Find winners |
| Scale | 30+ days | $200-500 | Maximize ROAS |

## ⚡ Optimization Rules (Default)

```
✅ Auto-Scale:  ROAS > 3x  +  CPA < $10  →  +20% budget
⏸️  Auto-Pause: CPA > $50  →  PAUSE campaign
⚠️  Warning:    CPA > $10  →  Monitor closely
⚠️  Warning:    CTR < 0.5% →  Refresh creatives
```

## 📁 Important Files

```
.env                              # Your API credentials (SECRET!)
config/meta-ads-templates.json    # Campaign templates
data/meta-campaigns.json          # Active campaigns
reports/meta-ads/report-*.md      # Daily reports
logs/meta-ads-monitor.log         # Monitoring log
```

## 🔑 Environment Variables

```bash
META_ACCESS_TOKEN=...       # From Graph API Explorer
META_AD_ACCOUNT_ID=...      # From Business Settings
META_BUSINESS_ID=...        # From Business Settings
META_PIXEL_ID=...           # From Events Manager
META_PAGE_ID=...            # From Page Settings
```

## 🎯 Quick Launch Template

```bash
node scripts/meta-ads-automation.js launch '{
  "appName": "REPLACE_ME",
  "appType": "gaming",
  "targetUrl": "https://apps.apple.com/app/YOUR_APP",
  "description": "Brief description here",
  "budget": 100
}'
```

## 📈 Daily Workflow

### Morning (8 AM)
```bash
# Check daily report (auto-generated)
cat reports/meta-ads/report-$(date +%Y-%m-%d).md

# Or view in browser
open reports/meta-ads/report-$(date +%Y-%m-%d).md
```

### Throughout Day (Every 2 hours)
```bash
# Auto-monitoring runs via cron
# Check logs if needed:
tail -f logs/meta-ads-monitor.log
```

### Evening
```bash
# Quick status check
npm run status

# Check for alerts
grep "PAUSE\|SCALE" logs/meta-ads-monitor.log
```

## 🔍 Troubleshooting Quick Fixes

### "Invalid access token"
```bash
# Regenerate at: https://developers.facebook.com/tools/explorer/
# Update .env file with new token
```

### "No campaigns found"
```bash
# Launch first campaign
npm run launch
```

### "High CPA"
```bash
# 1. Wait 3-7 days (learning phase)
# 2. Check targeting (too broad/narrow?)
# 3. Refresh creatives
# 4. Review in Meta Ads Manager
```

### "Low impressions"
```bash
# 1. Check budget (increase if too low)
# 2. Broaden targeting
# 3. Verify payment method active
# 4. Wait 24-48 hours for delivery
```

## 📊 Metrics to Watch

### Good Performance 🟢
- CTR > 2%
- CPA < $10
- ROAS > 3x
- Impressions growing daily

### Warning Signs 🟡
- CTR 1-2%
- CPA $10-30
- ROAS 2-3x
- Stagnant impressions

### Poor Performance 🔴
- CTR < 1%
- CPA > $30
- ROAS < 2x
- Declining impressions

## 🎓 When to Scale

Scale when ALL these are true:
- ✅ ROAS > 3x
- ✅ CPA < $10
- ✅ Spent at least $50
- ✅ Campaign active 7+ days
- ✅ Consistent performance (not just one good day)

## 🎨 When to Refresh Creatives

Refresh if ANY of these:
- ⚠️ CTR dropping over time
- ⚠️ CTR < 0.5%
- ⚠️ Running same ads 3+ weeks
- ⚠️ Relevance score low (check Ads Manager)

## 🔐 Security Checklist

- [ ] `.env` file NOT committed to git
- [ ] Access token is long-lived (60-day)
- [ ] Spending limits set in Meta Business Manager
- [ ] Daily budget caps configured
- [ ] Payment method valid and has limits

## 📞 Quick Help

```bash
# View full documentation
cat docs/META-ADS-AUTOMATION.md

# View testing guide
cat docs/META-ADS-TESTING-GUIDE.md

# View this reference
cat QUICK-REFERENCE.md

# Get command help
node scripts/meta-ads-automation.js
```

## 🎯 Success Indicators

### Week 1
- ✅ Campaigns launched successfully
- ✅ Impressions > 5,000/day
- ✅ No API errors
- ✅ Monitoring running automatically

### Week 2
- ✅ CPA stabilizing
- ✅ Some campaigns paused (poor performers)
- ✅ Some campaigns scaled (winners)
- ✅ ROAS > 2x on best performers

### Week 4
- ✅ Profitable campaigns running
- ✅ ROAS > 3x on scaled campaigns
- ✅ Portfolio of winning creatives
- ✅ Predictable performance

## 💡 Pro Tips

1. **Start small:** $50-100/day for first campaigns
2. **Test creatives:** Always run 3+ variations
3. **Wait for data:** Need 7 days minimum before judging
4. **Scale gradually:** +20% at a time, not double
5. **Refresh regularly:** New creatives every 2-3 weeks
6. **Monitor daily:** Check reports, don't just set and forget
7. **Trust the system:** Let auto-pause and auto-scale do their job

## 📅 Recommended Schedule

```
Daily:      Check report (morning)
Every 2h:   Auto-monitoring runs
Weekly:     Review performance trends
Bi-weekly:  Refresh creatives
Monthly:    Review templates, adjust budgets
```

---

**Need more details?** Read `docs/META-ADS-AUTOMATION.md`

**Ready to launch?** Run `npm run launch`

🚀 **Let's get those installs!**
