# Stripe Revenue Tracking Integration

Real-time revenue metrics and subscription event tracking for the ops dashboard.

## Quick Start

```bash
# Set your Stripe API key
export STRIPE_SECRET_KEY=sk_live_... # or sk_test_... for testing

# Optional: Webhook secret for signature verification
export STRIPE_WEBHOOK_SECRET=whsec_...

# Start the metrics server
node scripts/stripe-metrics.js --port 3456
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Server health check |
| `/metrics` | GET | All metrics (cached 60s) |
| `/metrics?refresh=true` | GET | Force cache refresh |
| `/metrics/mrr` | GET | MRR/ARR only |
| `/metrics/revenue` | GET | Revenue breakdown |
| `/metrics/subscriptions` | GET | Subscription stats |
| `/events` | GET | Recent webhook events |
| `/events?limit=N` | GET | Limit event count |
| `/webhook` | POST | Stripe webhook receiver |

## Sample Response

```json
{
  "timestamp": "2026-02-04T10:30:00.000Z",
  "mrr": {
    "value": 4250.00,
    "currency": "USD",
    "formatted": "$4,250.00"
  },
  "arr": {
    "value": 51000.00,
    "formatted": "$51,000.00"
  },
  "subscriptions": {
    "total": 127,
    "active": 120,
    "trialing": 7,
    "byPlan": [
      {
        "name": "Pro Monthly",
        "count": 85,
        "active": 82,
        "trialing": 3,
        "revenue": 2550.00
      }
    ]
  },
  "revenue": {
    "today": 125.00,
    "thisWeek": 890.00,
    "thisMonth": 3200.00
  },
  "churn": {
    "rate": 2.35,
    "formatted": "2.35%",
    "period": "30 days"
  },
  "customers": {
    "newThisMonth": 15,
    "returningThisMonth": 45,
    "totalActiveThisMonth": 60
  },
  "cached": true
}
```

## Webhook Setup

1. In Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://your-domain.com/stripe/webhook`
3. Select events:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
4. Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET`

## Event Log

Events are logged to `logs/stripe-events.jsonl` in JSON Lines format:

```json
{"timestamp":"2026-02-04T10:30:00.000Z","type":"new_subscription","data":{...}}
{"timestamp":"2026-02-04T11:15:00.000Z","type":"cancellation","data":{...}}
```

### Reading Events

```bash
# Summary of all events
node scripts/stripe-events-reader.js

# Today's events
node scripts/stripe-events-reader.js --today

# This week's events
node scripts/stripe-events-reader.js --week

# Filter by type
node scripts/stripe-events-reader.js --type cancellation

# JSON output for dashboard
node scripts/stripe-events-reader.js --json
```

### Event Types

| Type | Description |
|------|-------------|
| `new_subscription` | New subscription created |
| `subscription_change` | Plan upgrade/downgrade |
| `cancellation` | Subscription canceled |
| `payment_succeeded` | Invoice paid successfully |
| `payment_failed` | Payment attempt failed |

## Dashboard Integration

```javascript
// Fetch from ops dashboard
const response = await fetch('http://localhost:3456/metrics');
const metrics = await response.json();

// Display MRR
console.log(`MRR: ${metrics.mrr.formatted}`);

// Get recent events
const events = await fetch('http://localhost:3456/events?limit=10');
const { events: recentEvents } = await events.json();
```

## Running as Service

### Windows (Task Scheduler)

```powershell
# Create scheduled task
$action = New-ScheduledTaskAction -Execute "node" -Argument "C:\path\to\scripts\stripe-metrics.js"
$trigger = New-ScheduledTaskTrigger -AtStartup
Register-ScheduledTask -TaskName "StripeMetrics" -Action $action -Trigger $trigger
```

### PM2

```bash
pm2 start scripts/stripe-metrics.js --name stripe-metrics
pm2 save
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `STRIPE_SECRET_KEY` | Yes | Stripe API secret key |
| `STRIPE_WEBHOOK_SECRET` | No | Webhook signing secret |
| `PORT` | No | Server port (default: 3456) |

## Testing

```bash
# Run integration tests
node scripts/test-stripe-metrics.js

# Test with Stripe CLI
stripe listen --forward-to localhost:3456/webhook
stripe trigger customer.subscription.created
```
