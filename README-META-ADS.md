# Meta Ads Automation System 🚀

**Launch and manage Meta (Facebook/Instagram) ad campaigns automatically.**

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Meta API

Copy `.env.example` to `.env` and add your credentials:

```bash
cp .env.example .env
nano .env
```

Get credentials from:
- **Access Token:** https://developers.facebook.com/tools/explorer/
- **Ad Account ID:** Business Settings → Ad Accounts
- **Pixel ID:** Events Manager

### 3. Launch Your First Campaign

**Interactive Mode (Easiest):**
```bash
npm run launch
```

**Command Line:**
```bash
node scripts/meta-ads-automation.js launch '{
  "appName": "My Awesome App",
  "appType": "gaming",
  "targetUrl": "https://apps.apple.com/app/myapp",
  "description": "Best puzzle game in NZ!",
  "budget": 100
}'
```

**App Types:** `gaming`, `productivity`, `ecommerce`, `social`, `health`, `finance`, `default`

### 4. Monitor Performance

```bash
npm run monitor
```

### 5. Generate Reports

```bash
npm run report
```

## Autonomous Operation

Set up automatic monitoring and reporting:

```bash
npm run setup-cron
```

This adds:
- **Every 2 hours:** Campaign monitoring & optimization
- **Daily at 8 AM:** Performance report generation

## Features

### ✅ What It Does Automatically

1. **Campaign Creation**
   - Multiple audience segments
   - 3-4 ad creative variations per campaign
   - A/B testing from day one

2. **Performance Monitoring**
   - Checks metrics every 2 hours
   - Evaluates against optimization rules
   - Takes action automatically

3. **Auto-Optimization**
   - **Pause** if CPA > $50 (too expensive)
   - **Scale** if ROAS > 3x (performing well)
   - **Alert** if CTR < 0.5% (creative refresh needed)

4. **Reporting**
   - Daily performance summaries
   - JSON data for integrations
   - Markdown reports for humans

### 💰 Budget Management

- **Minimum:** $50/day
- **Maximum:** $500/day
- **Default:** $100/day
- **Testing Period:** 3 days before scaling
- **Auto-Scaling:** +20% when ROAS > 3x

### 🎯 NZ-Focused Targeting

Pre-configured audiences for New Zealand:
- Major cities (Auckland, Wellington, Christchurch)
- Age/gender segments
- Interest-based targeting
- Behavioral targeting

## Campaign Templates

Located in `config/meta-ads-templates.json`.

### Available Templates

| Template | Audiences | Creatives | Best For |
|----------|-----------|-----------|----------|
| Gaming | Casual, Hardcore, Female | 4 variations | Games |
| Productivity | Professionals, Students | 3 variations | Tools |
| E-commerce | Shoppers, Deal Seekers | 3 variations | Shopping |
| Social | Young, Broad | 3 variations | Social apps |
| Health | Fitness, Wellness | 3 variations | Health apps |
| Finance | Savvy, Professionals | 3 variations | Finance apps |

### Customize Templates

Edit `config/meta-ads-templates.json` to:
- Add new audience segments
- Create custom creative variations
- Adjust targeting parameters
- Test different messaging

## Optimization Rules

Default rules (configurable in `scripts/meta-ads-automation.js`):

```javascript
{
  minCpaThreshold: 10,        // Warning at $10 CPA
  maxCpaThreshold: 50,        // Pause at $50 CPA
  roasScaleThreshold: 3.0,    // Scale at 3x ROAS
  budgetIncreasePercent: 20,  // Increase 20%
  minSpendBeforeOptimization: 50  // Wait for $50 spend
}
```

### Recommended CPA Targets by Type

| App Type | Target CPA | Max CPA | Target ROAS |
|----------|------------|---------|-------------|
| Gaming | $5 | $20 | 2.5x |
| Productivity | $10 | $50 | 3.0x |
| E-commerce | $15 | $75 | 4.0x |
| Social | $3 | $15 | 2.0x |
| Health | $8 | $40 | 3.5x |
| Finance | $20 | $100 | 5.0x |

## Integration with App Deployment

Add to your app deployment script:

```javascript
const { CampaignManager } = require('./scripts/meta-ads-automation.js');

async function deployApp(config) {
  // Deploy app...
  
  // Launch ads
  if (config.enableAds) {
    const manager = new CampaignManager();
    await manager.launchCampaign({
      appName: config.appName,
      appType: config.appType,
      targetUrl: config.storeUrl,
      description: config.description,
      budget: config.adBudget || 100
    });
  }
}
```

Run the integration helper:
```bash
node scripts/integrate-meta-ads.js
```

## File Structure

```
├── scripts/
│   ├── meta-ads-automation.js       # Main automation system
│   ├── meta-ads-quickstart.js       # Interactive launcher
│   ├── integrate-meta-ads.js        # Integration helper
│   └── meta-ads-cron-setup.sh       # Cron setup script
├── config/
│   └── meta-ads-templates.json      # Campaign templates
├── data/
│   └── meta-campaigns.json          # Campaign data (auto-created)
├── reports/
│   └── meta-ads/                    # Daily reports
│       ├── report-YYYY-MM-DD.json
│       └── report-YYYY-MM-DD.md
├── docs/
│   └── META-ADS-AUTOMATION.md       # Full documentation
├── .env.example                     # Environment template
└── package.json                     # Dependencies
```

## Commands

```bash
# Launch campaign (interactive)
npm run launch

# Launch campaign (CLI)
node scripts/meta-ads-automation.js launch '{"appName":"App","budget":100}'

# Monitor all campaigns
npm run monitor

# Generate daily report
npm run report

# Check status
npm run status

# Set up automation
npm run setup-cron
```

## Conversion Tracking

### Meta Pixel

1. Install pixel on your website/app
2. Track these events:
   - `Install` - App installation
   - `CompleteRegistration` - User signup
   - `Purchase` - In-app purchase

### Conversion API (Server-Side)

For better tracking, send events from your backend:

```javascript
const axios = require('axios');

async function trackInstall(userData) {
  await axios.post(
    `https://graph.facebook.com/v18.0/${process.env.META_PIXEL_ID}/events`,
    {
      data: [{
        event_name: 'Install',
        event_time: Math.floor(Date.now() / 1000),
        user_data: {
          client_ip_address: userData.ip,
          client_user_agent: userData.userAgent
        }
      }],
      access_token: process.env.META_ACCESS_TOKEN
    }
  );
}
```

## Troubleshooting

### Campaign Won't Launch

**Check credentials:**
```bash
node -e "console.log(process.env.META_ACCESS_TOKEN ? '✅ Token set' : '❌ Token missing')"
```

**Test API access:**
```bash
curl -G \
  -d "access_token=$META_ACCESS_TOKEN" \
  "https://graph.facebook.com/v18.0/act_$META_AD_ACCOUNT_ID"
```

### Poor Performance

1. **High CPA:** Narrow targeting or refresh creatives
2. **Low CTR:** Test new ad copy and images
3. **Low ROAS:** Check conversion tracking setup

### View Logs

```bash
# Monitor log
tail -f logs/meta-ads-monitor.log

# Report log
tail -f logs/meta-ads-report.log
```

## Security

- ✅ Keep `.env` file secret (added to `.gitignore`)
- ✅ Use long-lived access tokens (60-day expiry)
- ✅ Rotate tokens regularly
- ✅ Monitor spending daily
- ✅ Set spending limits in Meta Business Manager

## Support

- **Full Documentation:** `docs/META-ADS-AUTOMATION.md`
- **Meta API Docs:** https://developers.facebook.com/docs/marketing-apis
- **Test API:** https://developers.facebook.com/tools/explorer/

## What's Next?

- [ ] Automated creative generation
- [ ] Retargeting campaigns
- [ ] Cross-platform tracking (iOS + Android)
- [ ] Machine learning optimization
- [ ] Real-time dashboard
- [ ] Slack/Discord alerts

---

**Ready to launch?**

```bash
npm run launch
```

🚀 **Let's get those installs!**
