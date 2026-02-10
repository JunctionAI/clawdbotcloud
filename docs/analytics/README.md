# Clawdbot Analytics System

> Privacy-first event tracking and business metrics for understanding user behavior and driving growth.

## Quick Start

### 1. Install Dependencies

```bash
cd automation-system
npm install pg crypto
```

### 2. Set Environment Variables

```bash
# Required
export DATABASE_URL="postgresql://user:pass@localhost:5432/clawdbot"
export ANALYTICS_SALT="your-secret-salt-here"  # For hashing customer IDs

# Optional
export NODE_ENV="production"
export APP_VERSION="1.0.0"
```

### 3. Create Database Schema

```bash
psql $DATABASE_URL -f automation-system/analytics/schema.sql
```

### 4. Start Tracking

```javascript
const analytics = require('./analytics');

// Track a signup
analytics.trackSignup({
  customerId: 'customer-uuid',
  tier: 'starter',
  source: 'organic'
});

// Track skill usage
analytics.trackSkillUsed({
  customerId: 'customer-uuid',
  skillId: 'email',
  skillName: 'Email Manager',
  success: true
});
```

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        ANALYTICS SYSTEM                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐          │
│  │   tracker    │    │ integrations │    │  aggregator  │          │
│  │              │    │              │    │              │          │
│  │ • track()    │    │ • wrappers   │    │ • daily job  │          │
│  │ • identify() │    │ • middleware │    │ • churn calc │          │
│  │ • flush()    │    │ • hooks      │    │ • cleanup    │          │
│  └──────────────┘    └──────────────┘    └──────────────┘          │
│         │                   │                   │                   │
│         └───────────────────┼───────────────────┘                   │
│                             │                                        │
│                             ▼                                        │
│                    ┌──────────────┐                                 │
│                    │   PostgreSQL │                                 │
│                    │  (TimescaleDB)│                                │
│                    └──────────────┘                                 │
│                             │                                        │
│                             ▼                                        │
│                    ┌──────────────┐                                 │
│                    │     API      │ ──▶ Dashboard                   │
│                    │   /summary   │                                 │
│                    │   /mrr       │                                 │
│                    │   /funnel    │                                 │
│                    └──────────────┘                                 │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Privacy-First Design

### What We Track
- Anonymized customer IDs (SHA256 hashed)
- Event timestamps
- Feature usage patterns (aggregated)
- Revenue metrics (amounts only, no card details)

### What We DON'T Track
- Email addresses
- Names or personal info
- IP addresses
- User agent strings
- Exact message content

### How IDs Are Hashed

```javascript
const crypto = require('crypto');

function hashCustomerId(customerId) {
  const salt = process.env.ANALYTICS_SALT;
  return crypto
    .createHmac('sha256', salt)
    .update(customerId)
    .digest('hex')
    .substring(0, 16);
}

// Input: "550e8400-e29b-41d4-a716-446655440000"
// Output: "a3f8b2c1d4e5f6a7" (can't reverse to original)
```

---

## Integration Guide

### Stripe Webhooks

Wrap your existing handlers to add analytics:

```javascript
const { integrations } = require('./analytics');

// Before
async function handleCheckoutCompleted(session) {
  // Your existing code
}

// After
const handleCheckoutCompleted = integrations.wrapCheckoutCompleted(
  async function(session) {
    // Your existing code
  }
);
```

### Message Handler

Add the message tracking middleware:

```javascript
const { integrations } = require('./analytics');

const messageMiddleware = integrations.createMessageMiddleware();

// In your message handler
async function handleMessage(context) {
  await messageMiddleware(context, async () => {
    // Your existing message handling logic
    return { tokenCount: 500, skillsUsed: ['email', 'calendar'] };
  });
}
```

### Skill Installation

```javascript
const { integrations } = require('./analytics');

function installSkill(customerId, skill) {
  // Your existing installation logic
  
  // Add tracking
  integrations.trackSkillInstallation({
    customerId,
    skill: {
      id: skill.id,
      name: skill.name,
      category: skill.category,
      premium: skill.isPremium,
    },
    source: 'marketplace',
  });
}
```

### Landing Page (Client-Side)

```javascript
// In your landing page JavaScript
import { trackPageView, trackCTAClick, trackCheckoutStart } from './analytics/client';

// Track page view
trackPageView({
  page: 'landing',
  referrer: document.referrer,
  utmParams: getUTMParams(),
  deviceType: detectDevice(),
});

// Track CTA click
document.querySelector('.cta-button').addEventListener('click', () => {
  trackCTAClick({
    location: 'hero',
    text: 'Get Started',
    tierSelected: 'starter',
  });
});
```

---

## Cron Jobs

Set up these scheduled tasks for aggregations:

```bash
# Daily aggregations (run at 2am)
0 2 * * * cd /path/to/clawdbot && node automation-system/analytics/aggregator.js daily

# Hourly updates (for real-time dashboards)
0 * * * * cd /path/to/clawdbot && node automation-system/analytics/aggregator.js hourly

# Churn risk calculation (twice daily)
0 6,18 * * * cd /path/to/clawdbot && node automation-system/analytics/aggregator.js churn

# Cleanup old events (weekly)
0 3 * * 0 cd /path/to/clawdbot && node automation-system/analytics/aggregator.js cleanup
```

---

## API Endpoints

### GET /api/analytics/summary
Executive summary with key KPIs.

```json
{
  "mrr_cents": 425000,
  "mrr_formatted": "$4,250",
  "total_customers": 127,
  "active_users_30d": 98,
  "churn_rate": 2.3,
  "dau": 42,
  "mau": 98,
  "dau_mau_ratio": 42.9
}
```

### GET /api/analytics/mrr
MRR history and breakdown.

### GET /api/analytics/funnel
Conversion funnel metrics.

### GET /api/analytics/skills
Skill usage rankings.

### GET /api/analytics/engagement
User engagement metrics.

### GET /api/analytics/churn-risk
At-risk customers list.

### GET /api/analytics/events
Raw event query (admin only).

---

## Key Metrics Explained

| Metric | Formula | Target | Why It Matters |
|--------|---------|--------|----------------|
| **MRR** | Sum of monthly subscription revenue | Growing 10%+ MoM | Primary revenue indicator |
| **ARPU** | MRR / Active customers | > $30 | Revenue efficiency |
| **Churn Rate** | Cancelled / Total (monthly) | < 5% | Customer retention health |
| **DAU/MAU** | Daily active / Monthly active | > 25% | Product stickiness |
| **Activation Rate** | Completed onboarding / Signups | > 80% | Onboarding effectiveness |
| **Net Revenue Retention** | (Start + Expansion - Churn) / Start | > 100% | Growth from existing customers |

---

## Files Overview

```
automation-system/analytics/
├── index.js        # Main entry point
├── tracker.js      # Core event tracking
├── integrations.js # Wrappers for existing code
├── aggregator.js   # Daily/hourly rollup jobs
├── api.js          # REST API endpoints
└── schema.sql      # Database schema

docs/analytics/
├── README.md           # This file
├── EVENT-SCHEMA.md     # Complete event reference
└── DASHBOARD-SPEC.md   # Dashboard design specs
```

---

## Troubleshooting

### Events Not Appearing

1. Check database connection:
```javascript
const analytics = require('./analytics');
// Events should appear in console in development
analytics.track('test_event', { test: true });
```

2. Force flush:
```javascript
await analytics.flush(true);
```

3. Check database:
```sql
SELECT * FROM analytics_events ORDER BY timestamp DESC LIMIT 10;
```

### High Memory Usage

Increase batch size or decrease flush interval:

```javascript
// In tracker.js CONFIG
batchSize: 100,      // Flush more often
flushIntervalMs: 5000, // Every 5 seconds
maxQueueSize: 500,   // Limit memory
```

### Missing Aggregations

Run aggregations manually:
```bash
node aggregator.js daily
node aggregator.js churn
```

Check for errors:
```sql
SELECT * FROM analytics_daily_metrics ORDER BY date DESC LIMIT 10;
```

---

## Next Steps

1. **Set up PostHog** (optional) - For visual funnel builder and feature flags
2. **Add alerting** - Slack/email alerts for churn spikes
3. **Build dashboard UI** - React dashboard with charts
4. **Implement cohort analysis** - Track retention by signup week
5. **Add A/B testing** - Feature flag integration

---

## Questions?

Check the detailed specs:
- [Event Schema](./EVENT-SCHEMA.md) - All trackable events
- [Dashboard Spec](./DASHBOARD-SPEC.md) - Dashboard designs

Or reach out in #engineering on Discord.
