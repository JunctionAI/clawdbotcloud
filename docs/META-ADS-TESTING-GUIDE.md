# Meta Ads Automation - Testing Guide

**Test your setup before spending real money!**

## Pre-Testing Checklist

### 1. Verify Meta API Access

```bash
# Test access token
curl -G \
  -d "access_token=YOUR_TOKEN" \
  "https://graph.facebook.com/v18.0/me"

# Should return your user info
```

### 2. Check Ad Account

```bash
# Test ad account access
curl -G \
  -d "access_token=YOUR_TOKEN" \
  "https://graph.facebook.com/v18.0/act_YOUR_ACCOUNT_ID"

# Should return account details
```

### 3. Verify Permissions

Required permissions:
- ✅ `ads_management` - Create and manage ads
- ✅ `ads_read` - Read campaign data
- ✅ `business_management` - Access business resources

Check in Graph API Explorer: https://developers.facebook.com/tools/explorer/

## Test Mode Setup

### Option 1: Use Test Ad Account

Meta provides test ad accounts that won't spend real money:

1. Go to Business Settings → Ad Accounts
2. Create a test ad account
3. Use test account ID in `.env`

```bash
META_AD_ACCOUNT_ID=test_1234567890  # Test account
META_TEST_MODE=true
```

### Option 2: Very Low Budget Test

Use real account with minimal spend:

```bash
# Launch with $1/day budget
node scripts/meta-ads-automation.js launch '{
  "appName": "Test App",
  "appType": "default",
  "targetUrl": "https://example.com",
  "description": "Test campaign",
  "budget": 1
}'
```

**Note:** Meta requires minimum $1/day per ad set, so limit to 1 audience.

## Testing Steps

### Step 1: Validate Configuration

```bash
# Check environment variables
node -e "
const missing = [];
if (!process.env.META_ACCESS_TOKEN) missing.push('META_ACCESS_TOKEN');
if (!process.env.META_AD_ACCOUNT_ID) missing.push('META_AD_ACCOUNT_ID');
if (!process.env.META_PIXEL_ID) missing.push('META_PIXEL_ID');
if (!process.env.META_PAGE_ID) missing.push('META_PAGE_ID');

if (missing.length > 0) {
  console.log('❌ Missing:', missing.join(', '));
  process.exit(1);
} else {
  console.log('✅ All environment variables set');
}
"
```

### Step 2: Test Template Loading

```bash
# Verify templates are valid JSON
node -e "
const fs = require('fs');
const templates = JSON.parse(fs.readFileSync('config/meta-ads-templates.json', 'utf-8'));
console.log('✅ Templates loaded:', Object.keys(templates).join(', '));
"
```

### Step 3: Dry Run (No API Calls)

Create a test script to validate logic without API calls:

```javascript
// test-dry-run.js
const { CampaignManager } = require('./scripts/meta-ads-automation.js');

async function test() {
  const manager = new CampaignManager();
  const templates = await manager.loadTemplates();
  
  console.log('✅ Templates loaded');
  console.log('Available types:', Object.keys(templates).join(', '));
  
  // Test targeting builder
  const targeting = manager.buildTargeting(templates.gaming.audiences[0]);
  console.log('✅ Targeting built:', JSON.stringify(targeting, null, 2));
  
  // Test ad copy generation
  const copy = manager.generateAdCopy(
    { appName: 'Test App', description: 'Cool app' },
    templates.gaming.creatives[0]
  );
  console.log('✅ Ad copy generated:', copy);
}

test().catch(console.error);
```

Run:
```bash
node test-dry-run.js
```

### Step 4: Test Campaign Creation (Small Budget)

```bash
# Launch minimal test campaign
node scripts/meta-ads-automation.js launch '{
  "appName": "Test Campaign",
  "appType": "default",
  "targetUrl": "https://example.com",
  "description": "Testing automation",
  "budget": 5
}'
```

**Watch for:**
- ✅ Campaign created successfully
- ✅ Ad sets created (should be 2 for default template)
- ✅ Ads created (should be 3 per ad set = 6 total)
- ✅ Campaign saved to `data/meta-campaigns.json`

### Step 5: Test Monitoring

```bash
# Wait a few minutes after campaign launch, then monitor
node scripts/meta-ads-automation.js monitor
```

**Expected output:**
- ✅ Fetches campaign insights
- ✅ Evaluates performance (may show "insufficient spend")
- ✅ No actions taken (too early for data)

### Step 6: Test Reporting

```bash
# Generate test report
node scripts/meta-ads-automation.js report
```

**Check:**
- ✅ Report created in `reports/meta-ads/report-YYYY-MM-DD.json`
- ✅ Markdown version created
- ✅ Summary includes campaign data

### Step 7: Test Status Command

```bash
node scripts/meta-ads-automation.js status
```

**Should show:**
- Total campaigns: 1
- Active: 1
- Paused: 0

## Verification Checklist

After testing, verify in Meta Ads Manager:

### Campaign Level
- [ ] Campaign created with correct name
- [ ] Objective set to APP_INSTALLS
- [ ] Status is ACTIVE
- [ ] Spending limit set correctly

### Ad Set Level
- [ ] Multiple ad sets created (2+ for most templates)
- [ ] Budget split correctly across ad sets
- [ ] Targeting configured:
  - [ ] Geographic: New Zealand
  - [ ] Age range matches template
  - [ ] Interests/behaviors applied
- [ ] Platforms: Facebook + Instagram
- [ ] Placements: Feed + Stories

### Ad Level
- [ ] Multiple ads per ad set (3+ variations)
- [ ] Ad copy includes app name
- [ ] Call-to-action set correctly
- [ ] Status is ACTIVE

## Common Issues & Fixes

### Issue: "Invalid access token"

**Fix:**
1. Regenerate token in Graph API Explorer
2. Ensure all permissions granted
3. Use long-lived token (60-day)

```bash
# Convert short-lived to long-lived token
curl -G \
  -d "grant_type=fb_exchange_token" \
  -d "client_id=YOUR_APP_ID" \
  -d "client_secret=YOUR_APP_SECRET" \
  -d "fb_exchange_token=SHORT_LIVED_TOKEN" \
  "https://graph.facebook.com/v18.0/oauth/access_token"
```

### Issue: "Insufficient permissions"

**Fix:** Add missing permissions in Meta for Developers:
1. Go to your app → App Dashboard
2. Add Marketing API permissions
3. Submit for review if needed (for production)

### Issue: "Ad account spending limit reached"

**Fix:**
1. Go to Business Settings → Payments
2. Add payment method
3. Increase spending limit

### Issue: "Campaign created but no impressions"

**Possible causes:**
- ✅ Targeting too narrow (audience size < 1,000)
- ✅ Budget too low (< $5/day)
- ✅ Ad needs review (check Ad Review status)
- ✅ Payment method issue

**Fix:**
1. Check audience size in Ads Manager
2. Increase budget if too low
3. Wait 24-48 hours for learning phase
4. Verify payment method is active

### Issue: "High CPA immediately"

**Expected in testing phase:**
- First 50 conversions = learning phase
- CPA will be high initially
- Wait for optimization to kick in

**If persists after learning:**
- Review targeting (too broad or too narrow?)
- Test new creatives
- Adjust budget

## Performance Baseline

Expected metrics after 7 days:

| Metric | Good | Average | Poor |
|--------|------|---------|------|
| CTR | >2% | 1-2% | <1% |
| CPA | <$10 | $10-30 | >$30 |
| ROAS | >3x | 2-3x | <2x |
| Impressions | >10k | 5-10k | <5k |

**Note:** Performance varies by app type and audience.

## Budget Recommendations for Testing

| Phase | Duration | Budget/Day | Goal |
|-------|----------|------------|------|
| Initial Test | 3 days | $50 | Validate setup |
| Learning | 7 days | $75-100 | Gather data |
| Optimization | 14 days | $100-200 | Find winners |
| Scaling | 30+ days | $200-500 | Maximize ROAS |

## Next Steps After Successful Test

1. **Pause test campaign:**
   ```bash
   # In Meta Ads Manager, pause the test campaign
   # Or via API (add to automation script)
   ```

2. **Review data:**
   ```bash
   # Check report
   cat reports/meta-ads/report-$(date +%Y-%m-%d).md
   ```

3. **Adjust templates:**
   - Edit `config/meta-ads-templates.json`
   - Refine audience targeting
   - Update ad copy based on performance

4. **Launch production campaigns:**
   - Use learnings from test
   - Start with proven templates
   - Scale gradually

5. **Set up automation:**
   ```bash
   npm run setup-cron
   ```

## Monitoring Setup (Post-Test)

Once comfortable with the system:

1. **Daily monitoring:**
   ```bash
   # Add to crontab: Every 2 hours
   0 */2 * * * cd /path/to/clawd && node scripts/meta-ads-automation.js monitor
   ```

2. **Daily reports:**
   ```bash
   # Add to crontab: 8 AM daily
   0 8 * * * cd /path/to/clawd && node scripts/meta-ads-automation.js report
   ```

3. **Set up alerts:**
   - Configure Slack/Discord webhooks
   - Get notified of paused campaigns
   - Track high performers

## Testing Checklist Summary

- [ ] Environment variables configured
- [ ] Meta API access verified
- [ ] Templates loaded successfully
- [ ] Test campaign launched (small budget)
- [ ] Campaign visible in Ads Manager
- [ ] Monitoring runs without errors
- [ ] Reports generated correctly
- [ ] Status command works
- [ ] Understanding of optimization rules
- [ ] Ready for production use

## Support

If tests fail:
1. Check logs: `reports/meta-ads/` and console output
2. Verify API credentials
3. Test in Graph API Explorer
4. Review Meta Ads Manager for errors
5. Check Meta's Marketing API documentation

---

**Ready for production?** Launch your first real campaign with confidence! 🚀
