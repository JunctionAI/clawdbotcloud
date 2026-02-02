# Meta Ads Automation - System Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     Meta Ads Automation System                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────┐
│   User Interface    │
│                     │
│  • CLI Commands     │
│  • Interactive UI   │
│  • Integration API  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Campaign Manager                            │
│                                                                  │
│  • Campaign Creation      • Budget Allocation                   │
│  • Ad Set Generation      • Conversion Tracking                 │
│  • Creative Assembly      • Data Persistence                    │
└──────────┬───────────────────────────────────────┬──────────────┘
           │                                       │
           ▼                                       ▼
┌──────────────────────┐              ┌────────────────────────┐
│  Meta Ads API Client │              │  Template Engine       │
│                      │              │                        │
│  • Graph API v18.0   │              │  • 7 App Templates     │
│  • Authentication    │              │  • Audience Presets    │
│  • Error Handling    │              │  • Creative Variations │
│  • Rate Limiting     │              │  • NZ Targeting        │
└──────────┬───────────┘              └────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Meta Marketing API (Graph API)                 │
│                                                                  │
│  Endpoints:  /campaigns  /adsets  /ads  /insights               │
└─────────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────┐
│              Meta Ads Platform (Facebook/Instagram)              │
└─────────────────────────────────────────────────────────────────┘


┌─────────────────────┐
│ Performance Monitor │
│                     │
│  • Fetch Insights   │
│  • Calculate Metrics│
│  • Evaluate Rules   │
│  • Execute Actions  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Optimization Engine                           │
│                                                                  │
│  Rules:                                                          │
│  • Auto-Pause:  CPA > $50                                       │
│  • Auto-Scale:  ROAS > 3x + CPA < $10                          │
│  • Warning:     CTR < 0.5% or CPA > $10                        │
│                                                                  │
│  Actions:                                                        │
│  • Pause Campaign      • Increase Budget (+20%)                 │
│  • Send Alert          • Log Action                             │
└─────────────────────────────────────────────────────────────────┘


┌─────────────────────┐
│  Report Generator   │
│                     │
│  • Daily Reports    │
│  • JSON + Markdown  │
│  • Summary Stats    │
│  • Action Log       │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────┐
│                       Data Storage                               │
│                                                                  │
│  • data/meta-campaigns.json      (Campaign state)               │
│  • reports/meta-ads/report-*.md  (Daily reports)                │
│  • logs/meta-ads-*.log           (Operation logs)               │
└─────────────────────────────────────────────────────────────────┘
```

## Component Breakdown

### 1. Campaign Manager
**File:** `scripts/meta-ads-automation.js` (CampaignManager class)

**Responsibilities:**
- Campaign creation and configuration
- Ad set generation with targeting
- Ad creative assembly
- Conversion tracking setup
- Data persistence

**Key Methods:**
```javascript
launchCampaign(appConfig)      // Main entry point
createCampaign(campaign, template)
createAdSet(campaign, audiencePreset, template)
createAd(campaign, adSet, creative)
setupConversionTracking(campaign)
```

**Data Flow:**
```
App Config → Load Template → Create Campaign → Create Ad Sets → Create Ads → Save
```

### 2. Performance Monitor
**File:** `scripts/meta-ads-automation.js` (PerformanceMonitor class)

**Responsibilities:**
- Fetch campaign insights from Meta API
- Calculate performance metrics (CPA, ROAS, CTR)
- Evaluate against optimization rules
- Execute optimization actions
- Send alerts and notifications

**Key Methods:**
```javascript
monitorCampaigns()             // Monitor all active campaigns
getCampaignInsights(campaign)  // Fetch metrics from API
evaluatePerformance(campaign, insights)  // Apply rules
executeActions(campaign, actions)        // Pause, scale, alert
```

**Optimization Loop:**
```
Fetch Insights → Calculate Metrics → Evaluate Rules → Execute Actions → Log
```

### 3. Report Generator
**File:** `scripts/meta-ads-automation.js` (ReportGenerator class)

**Responsibilities:**
- Generate daily performance reports
- Calculate summary statistics
- Create human-readable markdown
- Export machine-readable JSON

**Key Methods:**
```javascript
generateDailyReport()          // Main report generation
buildSummary(results)          // Aggregate statistics
generateMarkdownReport(report) // Human-readable output
```

**Report Structure:**
```json
{
  "date": "2024-01-01",
  "summary": {
    "totalCampaigns": 5,
    "totalSpend": 500,
    "totalInstalls": 100,
    "averageCPA": 5
  },
  "campaigns": [...]
}
```

### 4. Meta Ads API Client
**File:** `scripts/meta-ads-automation.js` (MetaAdsClient class)

**Responsibilities:**
- HTTP communication with Meta API
- Authentication handling
- Error handling and retry logic
- Request/response formatting

**Key Methods:**
```javascript
request(method, endpoint, data) // Generic API call
get(endpoint, params)           // GET request
post(endpoint, data)            // POST request
delete(endpoint)                // DELETE request
```

**Error Handling:**
```
API Call → Try → Catch Error → Log → Throw (with context)
```

### 5. Template Engine
**File:** `config/meta-ads-templates.json`

**Structure:**
```json
{
  "gaming": {
    "audiences": [
      {
        "name": "NZ Gamers - Casual",
        "ageMin": 18,
        "ageMax": 45,
        "interests": [...],
        "behaviors": [...]
      }
    ],
    "creatives": [
      {
        "variation": "Challenge",
        "template": "...",
        "cta": "Play Now"
      }
    ]
  }
}
```

**Template Variables:**
- `{appName}` - App name
- `{description}` - App description
- `{cta}` - Call to action

## Data Flow

### Campaign Launch Flow
```
1. User Input
   ↓
2. Load Template (based on appType)
   ↓
3. Create Campaign (Meta API)
   ↓ (campaignId)
4. For each Audience:
   ↓
   4a. Create Ad Set (with targeting)
   ↓ (adSetId)
   4b. For each Creative:
       ↓
       Create Ad Creative (with copy/image)
       ↓ (creativeId)
       Create Ad (link creative to ad set)
       ↓ (adId)
5. Setup Conversion Tracking
   ↓
6. Save Campaign Data
   ↓
7. Return Campaign Object
```

### Monitoring Flow
```
1. Cron Trigger (every 2 hours)
   ↓
2. Load Active Campaigns
   ↓
3. For each Campaign:
   ↓
   3a. Fetch Insights (Meta API)
   ↓
   3b. Calculate Metrics (CPA, ROAS, CTR)
   ↓
   3c. Evaluate Rules
   ↓
   3d. IF rule triggered:
       ↓
       Execute Action (pause/scale/alert)
       ↓
       Log Action
   ↓
4. Generate Summary
   ↓
5. Log Results
```

### Reporting Flow
```
1. Cron Trigger (daily at 8 AM)
   ↓
2. Monitor Campaigns (get latest data)
   ↓
3. Build Summary Statistics
   ↓
4. Format Reports:
   ↓
   4a. JSON (machine-readable)
   ↓
   4b. Markdown (human-readable)
   ↓
5. Save Reports
   ↓
6. (Optional) Send Notifications
```

## Integration Points

### 1. App Deployment Integration
```javascript
// In app-deployment-automation.js
const { CampaignManager } = require('./meta-ads-automation.js');

async function deployApp(config) {
  // Deploy app...
  
  if (config.enableAds) {
    const manager = new CampaignManager();
    const campaign = await manager.launchCampaign(config);
    config.metaCampaignId = campaign.campaignId;
  }
}
```

### 2. Financial Tracking Integration
```javascript
// Track ad spend
const campaigns = require('./data/meta-campaigns.json');
const activeCampaigns = campaigns.filter(c => c.status === 'ACTIVE');
const monthlyAdSpend = activeCampaigns.reduce((sum, c) => sum + c.budget * 30, 0);

// Track vs revenue
const roi = revenue / monthlyAdSpend;
```

### 3. Notification Integration
```javascript
// In executeActions()
async function sendAlert(campaign, action) {
  await notificationSystem.send({
    channel: 'slack',
    title: `Campaign ${action.type}`,
    message: `${campaign.appName}: ${action.reason}`,
    severity: action.severity
  });
}
```

## Configuration

### Environment Variables
```bash
META_ACCESS_TOKEN       # Meta API access token
META_AD_ACCOUNT_ID      # Ad account ID (without act_ prefix)
META_BUSINESS_ID        # Business Manager ID
META_PIXEL_ID           # Meta Pixel ID
META_PAGE_ID            # Facebook Page ID
```

### Optimization Rules
```javascript
CONFIG.rules = {
  minCpaThreshold: 10,              // Warning threshold
  maxCpaThreshold: 50,              // Hard pause threshold
  roasScaleThreshold: 3.0,          // Scale trigger
  budgetIncreasePercent: 20,        // Scale amount
  minSpendBeforeOptimization: 50    // Minimum spend
}
```

### Budget Settings
```javascript
CONFIG.budgets = {
  min: 50,           // Minimum daily budget
  max: 500,          // Maximum daily budget
  default: 100,      // Default budget
  testingDays: 3     // Days before optimization
}
```

## Automation Schedule

```
┌─────────────────────────────────────────────────────────┐
│                    Cron Schedule                        │
└─────────────────────────────────────────────────────────┘

Every 2 hours:  Monitor campaigns & optimize
  ↓
  • Fetch insights
  • Evaluate performance
  • Execute actions (pause/scale)
  • Log changes

Daily at 8 AM:  Generate report
  ↓
  • Run monitoring
  • Calculate summary
  • Generate JSON + Markdown
  • Save to reports/

On demand:      Launch campaign
  ↓
  • User triggers via CLI
  • Or via app deployment integration
  • Creates campaign immediately
```

## Security Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   Security Layers                       │
└─────────────────────────────────────────────────────────┘

1. Credential Storage
   • Environment variables (.env)
   • Not committed to git (.gitignore)
   • Long-lived tokens (60-day expiry)

2. Access Control
   • Minimum required permissions
   • Read-only for monitoring (optional)
   • Write access only when needed

3. Spending Protection
   • Daily budget caps
   • Monthly spending limits
   • Auto-pause on high CPA
   • Manual review option

4. Data Protection
   • Campaign data in local files
   • Reports include no secrets
   • Logs sanitized of tokens
```

## Scalability Considerations

### Current Capacity
- **Campaigns:** Unlimited (limited by Meta account)
- **Monitoring:** Every 2 hours (adjustable)
- **API Rate Limits:** Meta's default limits apply

### Scaling Options

**Horizontal Scaling:**
- Multiple ad accounts
- Parallel campaign creation
- Distributed monitoring

**Vertical Scaling:**
- More frequent monitoring (hourly)
- Real-time optimization
- Predictive analytics

**Future Enhancements:**
- Queue-based campaign creation
- Redis for campaign state
- Webhooks for instant notifications
- Multi-region deployment

## Error Handling & Resilience

```
┌─────────────────────────────────────────────────────────┐
│               Error Handling Strategy                   │
└─────────────────────────────────────────────────────────┘

API Errors:
  • Catch and log with context
  • Continue with remaining campaigns
  • Retry logic (future enhancement)

Data Errors:
  • Validate inputs before API calls
  • Graceful degradation
  • Default to safe values

Network Errors:
  • Timeout handling
  • Connection retry
  • Fail gracefully

State Errors:
  • File system checks
  • JSON validation
  • Backup/restore (future)
```

## Testing Strategy

```
┌─────────────────────────────────────────────────────────┐
│                  Testing Layers                         │
└─────────────────────────────────────────────────────────┘

1. Configuration Testing
   • Validate .env variables
   • Check template JSON structure
   • Verify file paths

2. API Testing
   • Test authentication
   • Validate permissions
   • Check account access

3. Integration Testing
   • Launch test campaign (small budget)
   • Monitor test campaign
   • Generate test report

4. End-to-End Testing
   • Full workflow with test account
   • Verify in Meta Ads Manager
   • Check data persistence

5. Production Monitoring
   • Daily report review
   • Log analysis
   • Performance tracking
```

## Performance Metrics

### System Performance
- **Campaign Launch Time:** ~30-60 seconds
- **Monitoring Cycle:** ~5-10 seconds per campaign
- **Report Generation:** ~10-20 seconds
- **API Response Time:** ~200-500ms per request

### Campaign Performance
- **Learning Phase:** 7-14 days
- **Optimization Frequency:** Every 2 hours
- **Data Freshness:** Real-time to 24 hours
- **Reporting Lag:** Daily

---

**This architecture supports 24/7 autonomous operation with minimal human intervention.**

🏗️ **Built for scale, optimized for performance, designed for Tom's app empire!**
