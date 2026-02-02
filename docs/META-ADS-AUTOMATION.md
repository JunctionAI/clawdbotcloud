# Meta Ads Automation System

**Autonomous campaign creation, management, and optimization for app launches**

## Overview

This system provides fully automated Meta (Facebook/Instagram) advertising for your app launches. Launch campaigns with a single command, then let the system monitor, optimize, and scale automatically.

## Features

### 🚀 One-Command Campaign Launch
- Launch complete campaigns in seconds
- Auto-generated ad creative variations (3-4 per campaign)
- Multiple audience segments tested simultaneously
- A/B testing built-in from day one

### 🎯 NZ-Focused Targeting
- Pre-configured audience segments for New Zealand market
- Templates for different app categories:
  - Gaming (casual, hardcore, female gamers)
  - Productivity (professionals, students)
  - E-commerce (shoppers, deal seekers)
  - Social (young adults, broad audience)
  - Health & Fitness
  - Finance

### 💰 Smart Budget Management
- Testing budgets: $50-500/day
- Automatic budget allocation across ad sets
- Daily spend limits with monthly caps
- Budget scaling based on performance

### 📊 Performance Monitoring
- Real-time campaign tracking
- Automatic optimization rules
- Daily performance reports
- Integration with financial dashboard

### ⚡ Auto-Optimization Rules

**Auto-Pause:**
- CPA > $50 → Hard pause (immediate)
- CPA > $10 → Warning + monitor closely

**Auto-Scale:**
- ROAS > 3x + CPA < $10 → Increase budget 20%
- Maximum budget: $500/day per campaign

**Creative Optimization:**
- CTR < 0.5% → Flag for creative refresh
- A/B test winners automatically get more budget

### 📈 Conversion Tracking
- Meta Pixel integration
- Conversion API support
- Track: Installs, Registrations, Purchases
- Attribution window: 7-day click, 1-day view

## Installation

### Prerequisites

```bash
npm install axios
```

### Environment Variables

Create `.env` file:

```bash
# Meta API Credentials
META_ACCESS_TOKEN=your_access_token_here
META_AD_ACCOUNT_ID=your_ad_account_id
META_BUSINESS_ID=your_business_id
META_PIXEL_ID=your_pixel_id
META_PAGE_ID=your_page_id
```

### Getting Meta API Credentials

1. **Create Meta Business Account:** https://business.facebook.com/
2. **Create Meta App:** https://developers.facebook.com/apps/
3. **Generate Access Token:**
   - Go to Graph API Explorer
   - Select your app
   - Grant permissions: `ads_management`, `ads_read`, `business_management`
   - Generate token (use long-lived token for production)
4. **Get Ad Account ID:**
   - Go to Business Settings → Ad Accounts
   - Copy account ID (remove `act_` prefix)
5. **Install Pixel:**
   - Go to Events Manager
   - Create pixel
   - Install on your app/website

## Usage

### Launch a Campaign

```bash
node scripts/meta-ads-automation.js launch '{
  "appName": "My Awesome App",
  "appType": "gaming",
  "appId": "1234567890",
  "targetUrl": "https://apps.apple.com/app/myapp",
  "description": "The best puzzle game in NZ!",
  "budget": 100
}'
```

**Parameters:**
- `appName` - Your app name (used in ad copy)
- `appType` - Template type: `gaming`, `productivity`, `ecommerce`, `social`, `health`, `finance`, `default`
- `appId` - Meta app ID (for app install tracking)
- `targetUrl` - App Store or Google Play URL
- `description` - Brief description (used in ad copy)
- `budget` - Daily budget in USD ($50-500)

### Monitor Campaigns

Run monitoring (checks all active campaigns):

```bash
node scripts/meta-ads-automation.js monitor
```

This will:
- Fetch performance data from Meta API
- Evaluate against optimization rules
- Execute actions (pause/scale/alert)
- Log all changes

**Set up automatic monitoring (recommended):**

```bash
# Add to crontab (runs every 2 hours)
0 */2 * * * cd /path/to/clawd && node scripts/meta-ads-automation.js monitor

# Or run daily at 9 AM
0 9 * * * cd /path/to/clawd && node scripts/meta-ads-automation.js monitor
```

### Generate Reports

```bash
node scripts/meta-ads-automation.js report
```

Generates:
- `reports/meta-ads/report-YYYY-MM-DD.json` - Machine-readable data
- `reports/meta-ads/report-YYYY-MM-DD.md` - Human-readable report

**Automatic daily reports:**

```bash
# Add to crontab (runs daily at 8 AM)
0 8 * * * cd /path/to/clawd && node scripts/meta-ads-automation.js report
```

### Check Status

```bash
node scripts/meta-ads-automation.js status
```

Shows:
- Total campaigns
- Active campaigns
- Paused campaigns

## Campaign Templates

Templates are defined in `config/meta-ads-templates.json`.

### Template Structure

Each template includes:

**Audiences** - Different targeting segments:
```json
{
  "name": "NZ Gamers - Casual",
  "ageMin": 18,
  "ageMax": 45,
  "interests": [...],
  "behaviors": [...]
}
```

**Creatives** - Ad copy variations:
```json
{
  "variation": "Challenge",
  "template": "Can you beat level 10? {appName} - {description} {cta}",
  "cta": "Play Now"
}
```

### Customizing Templates

1. Edit `config/meta-ads-templates.json`
2. Add new audience segments (use Meta's interest IDs)
3. Add new creative variations
4. Test with small budget first

**Finding Interest IDs:**

Use Meta's Targeting Search API:
```bash
curl -G \
  -d 'type=adinterest' \
  -d 'q=gaming' \
  -d 'access_token=YOUR_TOKEN' \
  'https://graph.facebook.com/v18.0/search'
```

## Integration with App Deployment

Add to `scripts/app-deployment-automation.js`:

```javascript
const { CampaignManager } = require('./meta-ads-automation.js');

async function deployApp(config) {
  // ... existing deployment code ...
  
  // Launch Meta Ads campaign
  if (config.enableAds) {
    const manager = new CampaignManager();
    const campaign = await manager.launchCampaign({
      appName: config.appName,
      appType: config.appType,
      appId: config.metaAppId,
      targetUrl: config.storeUrl,
      description: config.marketingDescription,
      budget: config.adBudget || 100
    });
    
    console.log(`✅ Ads campaign launched: ${campaign.campaignId}`);
  }
}
```

## Financial Tracking Integration

Campaign data is saved to `data/meta-campaigns.json` with:
- Campaign ID
- Daily budget
- Spend tracking
- Install/conversion data

**Export to financial dashboard:**

```javascript
const campaigns = require('./data/meta-campaigns.json');

const totalAdSpend = campaigns
  .filter(c => c.status === 'ACTIVE')
  .reduce((sum, c) => sum + c.budget, 0);

console.log(`Monthly ad budget: $${totalAdSpend * 30}`);
```

## Optimization Rules (Configurable)

Edit rules in `scripts/meta-ads-automation.js`:

```javascript
const CONFIG = {
  rules: {
    minCpaThreshold: 10,        // Warning if CPA > $10
    maxCpaThreshold: 50,        // Pause if CPA > $50
    roasScaleThreshold: 3.0,    // Scale if ROAS > 3x
    budgetIncreasePercent: 20,  // Increase by 20%
    minSpendBeforeOptimization: 50  // Wait for $50 spend
  }
};
```

### Recommended Thresholds by App Type

| App Type | Min CPA | Max CPA | ROAS Target |
|----------|---------|---------|-------------|
| Gaming | $5 | $20 | 2.5x |
| Productivity | $10 | $50 | 3.0x |
| E-commerce | $15 | $75 | 4.0x |
| Social | $3 | $15 | 2.0x |
| Health | $8 | $40 | 3.5x |
| Finance | $20 | $100 | 5.0x |

## Monitoring Dashboard (Coming Soon)

Real-time dashboard showing:
- Active campaigns
- Live performance metrics
- Budget utilization
- Optimization actions
- Revenue attribution

## Conversion API Setup

For better tracking, set up Conversion API:

1. **Server-side events** - More reliable than Pixel alone
2. **Send from your backend:**

```javascript
const axios = require('axios');

async function trackInstall(userData) {
  await axios.post(
    `https://graph.facebook.com/v18.0/${META_PIXEL_ID}/events`,
    {
      data: [{
        event_name: 'Install',
        event_time: Math.floor(Date.now() / 1000),
        user_data: {
          client_ip_address: userData.ip,
          client_user_agent: userData.userAgent,
          fbc: userData.fbclid,
          fbp: userData.fbp
        },
        custom_data: {
          app_name: userData.appName
        }
      }],
      access_token: META_ACCESS_TOKEN
    }
  );
}
```

## Troubleshooting

### Campaign Not Launching

**Error:** `Missing Meta API credentials`
- Check `.env` file has all required variables
- Verify access token is valid (not expired)
- Ensure token has correct permissions

**Error:** `Ad account spending limit reached`
- Check your Meta ad account billing settings
- Increase spending limit or add payment method

### Poor Performance

**High CPA:**
- Check targeting (too broad or too narrow?)
- Review ad creatives (test new variations)
- Consider lowering budget to reduce learning phase
- Try different audience segments

**Low CTR:**
- Refresh ad creatives
- Test different headlines/images
- Check if audience is too broad
- Review relevance score in Meta Ads Manager

**Low ROAS:**
- Review conversion tracking setup
- Check if attribution window is appropriate
- Consider retargeting engaged users
- Test different optimization goals

### API Errors

**Error 190:** Token expired
- Generate new access token
- Use long-lived token (60-day expiry)

**Error 100:** Invalid parameter
- Check campaign configuration
- Verify targeting IDs are valid
- Ensure budget meets minimum ($1/day)

## Best Practices

### 1. Start Small
- Launch with $50-100/day budget
- Test for 3-7 days before scaling
- Wait for campaigns to exit learning phase

### 2. Test Creatives
- Always run 3+ creative variations
- Refresh creatives every 2-3 weeks
- A/B test headlines, images, CTAs

### 3. Audience Segmentation
- Create 2-3 audience segments per campaign
- Test broad vs. narrow targeting
- Use Lookalike audiences after getting 100+ conversions

### 4. Monitor Regularly
- Check dashboard daily
- Review weekly performance trends
- Adjust budgets based on ROAS

### 5. Attribution
- Use 7-day click attribution
- Track full funnel (install → registration → purchase)
- Compare Meta-attributed vs. actual conversions

## Security Notes

- **Never commit** `.env` file (add to `.gitignore`)
- **Use read-only tokens** for monitoring scripts
- **Rotate tokens** every 60 days
- **Limit API access** to necessary permissions only
- **Monitor spending** with daily alerts

## Roadmap

- [ ] Automated creative generation (images + copy)
- [ ] Dynamic product ads support
- [ ] Retargeting campaign automation
- [ ] Cross-platform tracking (iOS + Android)
- [ ] Machine learning bid optimization
- [ ] Real-time dashboard with alerts
- [ ] Slack/Discord notifications
- [ ] Multi-account management

## Support

For issues or questions:
1. Check Meta Ads API documentation: https://developers.facebook.com/docs/marketing-apis
2. Review error logs in `reports/meta-ads/`
3. Test API access with Graph API Explorer
4. Verify billing settings in Business Manager

## License

Proprietary - Tom's App Empire 2024

---

**Ready to scale? Launch your first campaign:**

```bash
node scripts/meta-ads-automation.js launch '{
  "appName": "Test App",
  "appType": "gaming",
  "budget": 50
}'
```

🚀 **Let's get those installs!**
