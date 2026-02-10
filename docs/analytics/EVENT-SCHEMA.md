# Clawdbot Analytics Event Schema

> Privacy-first event tracking for understanding user behavior and business metrics.

## Design Principles

### Privacy-First Approach
1. **No PII in events** - Never include email, name, or identifying info in event properties
2. **Anonymized IDs** - Use hashed customer IDs, not raw database IDs
3. **Minimal data collection** - Only track what's essential for business decisions
4. **User control** - Events can be opted out via customer settings
5. **Data retention** - Raw events auto-delete after 90 days; aggregates kept longer

### Event Naming Convention
- Format: `{noun}_{verb}` (e.g., `user_signup`, `skill_activated`)
- All lowercase with underscores
- Past tense for completed actions (e.g., `upgraded`, `cancelled`)
- Present tense for states (e.g., `session_active`)

---

## 1. User Acquisition & Conversion Funnel

### Landing Page Events

```typescript
// Visitor arrives at landing page
event: 'page_viewed'
properties: {
  page: 'landing' | 'pricing' | 'features' | 'about',
  referrer_type: 'organic' | 'paid' | 'social' | 'direct' | 'email',
  utm_source?: string,
  utm_medium?: string,
  utm_campaign?: string,
  device_type: 'desktop' | 'mobile' | 'tablet'
}

// CTA button clicked
event: 'cta_clicked'
properties: {
  cta_location: 'hero' | 'pricing_card' | 'features' | 'footer',
  cta_text: string,
  tier_selected?: 'starter' | 'professional' | 'enterprise'
}

// Pricing page interaction
event: 'pricing_viewed'
properties: {
  tier_focused?: 'starter' | 'professional' | 'enterprise',
  time_on_pricing_seconds: number
}

// Checkout initiated
event: 'checkout_started'
properties: {
  tier: 'starter' | 'professional' | 'enterprise',
  price_cents: number,
  currency: 'USD' | 'NZD',
  billing_period: 'monthly' | 'yearly'
}

// Checkout abandoned
event: 'checkout_abandoned'
properties: {
  tier: 'starter' | 'professional' | 'enterprise',
  step_abandoned: 'email' | 'payment' | 'review',
  time_in_checkout_seconds: number
}
```

### Signup Events

```typescript
// User completes checkout
event: 'user_signup'
properties: {
  customer_id_hash: string,  // SHA256 of customer ID
  tier: 'starter' | 'professional' | 'enterprise',
  signup_source: 'organic' | 'paid' | 'referral',
  trial: boolean,
  referral_code?: string
}

// Account setup completed
event: 'onboarding_started'
properties: {
  customer_id_hash: string,
  tier: string
}

// Onboarding step completed
event: 'onboarding_step_completed'
properties: {
  customer_id_hash: string,
  step: 'connect_channel' | 'first_message' | 'install_skill' | 'setup_memory',
  step_number: number,
  time_since_signup_minutes: number
}

// Onboarding fully completed
event: 'onboarding_completed'
properties: {
  customer_id_hash: string,
  tier: string,
  total_onboarding_time_minutes: number,
  skills_installed_count: number
}
```

---

## 2. Feature Usage Events

### Skill Events

```typescript
// Skill installed
event: 'skill_installed'
properties: {
  customer_id_hash: string,
  skill_id: string,
  skill_name: string,
  skill_category: 'productivity' | 'communication' | 'integration' | 'ai' | 'automation',
  is_premium: boolean,
  install_source: 'onboarding' | 'marketplace' | 'recommendation' | 'manual'
}

// Skill activated (first real use)
event: 'skill_activated'
properties: {
  customer_id_hash: string,
  skill_id: string,
  skill_name: string,
  days_since_install: number
}

// Skill used
event: 'skill_used'
properties: {
  customer_id_hash: string,
  skill_id: string,
  skill_name: string,
  usage_context: 'manual' | 'scheduled' | 'triggered',
  success: boolean,
  error_type?: string  // Only error category, no details
}

// Skill uninstalled
event: 'skill_uninstalled'
properties: {
  customer_id_hash: string,
  skill_id: string,
  skill_name: string,
  days_active: number,
  total_uses: number,
  reason?: 'not_useful' | 'too_complex' | 'found_alternative' | 'unknown'
}
```

### Session Events

```typescript
// Agent session started
event: 'session_started'
properties: {
  customer_id_hash: string,
  channel: 'discord' | 'telegram' | 'slack' | 'whatsapp' | 'api',
  tier: string
}

// Message sent to agent
event: 'message_sent'
properties: {
  customer_id_hash: string,
  channel: string,
  message_length_bucket: 'short' | 'medium' | 'long',  // <50, 50-200, 200+ chars
  is_command: boolean,
  has_attachment: boolean
}

// Agent response generated
event: 'response_generated'
properties: {
  customer_id_hash: string,
  channel: string,
  response_time_ms: number,
  token_count_bucket: 'small' | 'medium' | 'large',  // <500, 500-2000, 2000+ tokens
  skills_invoked: string[],  // Skill IDs used in response
  model_used: 'opus' | 'sonnet' | 'haiku'
}

// Session ended
event: 'session_ended'
properties: {
  customer_id_hash: string,
  channel: string,
  session_duration_seconds: number,
  message_count: number,
  skills_used_count: number
}

// Feedback received
event: 'feedback_received'
properties: {
  customer_id_hash: string,
  feedback_type: 'thumbs_up' | 'thumbs_down' | 'report' | 'suggestion',
  context: 'response' | 'skill' | 'general'
}
```

### Channel Events

```typescript
// Channel connected
event: 'channel_connected'
properties: {
  customer_id_hash: string,
  channel_type: 'discord' | 'telegram' | 'slack' | 'whatsapp',
  is_first_channel: boolean
}

// Channel disconnected
event: 'channel_disconnected'
properties: {
  customer_id_hash: string,
  channel_type: string,
  reason: 'user_action' | 'error' | 'token_expired' | 'account_deleted'
}
```

---

## 3. Subscription & Revenue Events

### Upgrade/Downgrade Events

```typescript
// Plan upgraded
event: 'plan_upgraded'
properties: {
  customer_id_hash: string,
  previous_tier: 'starter' | 'professional',
  new_tier: 'professional' | 'enterprise',
  mrr_change_cents: number,  // Positive number
  upgrade_trigger: 'limit_hit' | 'feature_need' | 'proactive' | 'promo',
  days_on_previous_tier: number
}

// Plan downgraded
event: 'plan_downgraded'
properties: {
  customer_id_hash: string,
  previous_tier: 'professional' | 'enterprise',
  new_tier: 'starter' | 'professional',
  mrr_change_cents: number,  // Negative number
  downgrade_reason?: 'cost' | 'features_unused' | 'temporary' | 'unknown',
  days_on_previous_tier: number
}

// Trial started
event: 'trial_started'
properties: {
  customer_id_hash: string,
  tier: string,
  trial_days: number
}

// Trial converted
event: 'trial_converted'
properties: {
  customer_id_hash: string,
  tier: string,
  converted_day: number  // Which day of trial they converted
}

// Trial expired (no conversion)
event: 'trial_expired'
properties: {
  customer_id_hash: string,
  tier: string,
  message_count_during_trial: number,
  skills_tried_count: number
}
```

### Payment Events

```typescript
// Payment succeeded
event: 'payment_succeeded'
properties: {
  customer_id_hash: string,
  amount_cents: number,
  currency: string,
  payment_type: 'subscription' | 'skill_purchase' | 'overage',
  billing_period: 'monthly' | 'yearly'
}

// Payment failed
event: 'payment_failed'
properties: {
  customer_id_hash: string,
  failure_reason: 'card_declined' | 'insufficient_funds' | 'expired' | 'other',
  attempt_number: number,
  amount_cents: number
}

// Subscription cancelled
event: 'subscription_cancelled'
properties: {
  customer_id_hash: string,
  tier: string,
  tenure_days: number,
  total_paid_cents: number,
  cancellation_reason?: 'cost' | 'not_using' | 'competitor' | 'business_closed' | 'other',
  cancellation_source: 'user' | 'payment_failure' | 'admin'
}

// Subscription reactivated
event: 'subscription_reactivated'
properties: {
  customer_id_hash: string,
  tier: string,
  days_inactive: number,
  reactivation_source: 'win_back_email' | 'user_initiated' | 'promo'
}
```

---

## 4. Churn & Engagement Indicators

### Activity Events

```typescript
// Daily active signal (sent once per day per active user)
event: 'daily_active'
properties: {
  customer_id_hash: string,
  tier: string,
  days_since_signup: number,
  consecutive_active_days: number
}

// Weekly engagement summary (internal metric)
event: 'weekly_engagement_summary'
properties: {
  customer_id_hash: string,
  tier: string,
  active_days: number,  // 0-7
  message_count: number,
  skills_used: number,
  response_satisfaction_avg: number  // 1-5 if rated
}

// Usage anomaly detected (potential churn signal)
event: 'usage_anomaly'
properties: {
  customer_id_hash: string,
  anomaly_type: 'drop_off' | 'sudden_increase' | 'pattern_change',
  previous_weekly_messages: number,
  current_weekly_messages: number,
  drop_percentage?: number
}
```

### Engagement Milestones

```typescript
// First week milestone
event: 'milestone_first_week'
properties: {
  customer_id_hash: string,
  tier: string,
  messages_sent: number,
  skills_used: number,
  channels_connected: number,
  engagement_score: number  // 0-100
}

// Power user identified
event: 'power_user_identified'
properties: {
  customer_id_hash: string,
  tier: string,
  weekly_message_avg: number,
  skills_active: number,
  days_since_signup: number
}

// At-risk user identified
event: 'at_risk_identified'
properties: {
  customer_id_hash: string,
  tier: string,
  risk_level: 'low' | 'medium' | 'high',
  risk_factors: string[],  // e.g., ['no_login_7d', 'payment_failed', 'support_ticket']
  days_since_last_active: number
}
```

---

## 5. Technical & Quality Events

### Performance Events

```typescript
// Response latency
event: 'response_latency'
properties: {
  customer_id_hash: string,
  latency_bucket: 'fast' | 'normal' | 'slow' | 'timeout',  // <1s, 1-5s, 5-30s, 30s+
  model_used: string,
  skills_count: number
}

// Error occurred
event: 'error_occurred'
properties: {
  customer_id_hash: string,
  error_category: 'rate_limit' | 'api_error' | 'skill_error' | 'connection' | 'unknown',
  channel: string,
  was_user_notified: boolean
}
```

---

## Event Property Reference

### Standard Properties (Auto-Attached)

These properties are automatically added to every event:

| Property | Type | Description |
|----------|------|-------------|
| `event_id` | string | UUID for deduplication |
| `timestamp` | ISO 8601 | When event occurred |
| `environment` | string | `production` / `staging` / `development` |
| `app_version` | string | Current Clawdbot version |
| `event_source` | string | Which service emitted the event |

### Customer ID Hashing

```javascript
// How customer IDs are hashed for privacy
const crypto = require('crypto');

function hashCustomerId(customerId) {
  const salt = process.env.ANALYTICS_SALT; // Secret, rotated quarterly
  return crypto
    .createHmac('sha256', salt)
    .update(customerId)
    .digest('hex')
    .substring(0, 16); // Shortened for efficiency
}
```

---

## Data Flow

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Application   │────▶│  Event Buffer   │────▶│   TimescaleDB   │
│   (Clawdbot)    │     │   (In-Memory)   │     │   (Time-series) │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                        │
                                                        ▼
                                               ┌─────────────────┐
                                               │  Aggregation    │
                                               │  Worker (cron)  │
                                               └─────────────────┘
                                                        │
                              ┌──────────────────────────┼──────────────────────────┐
                              ▼                          ▼                          ▼
                     ┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
                     │   Dashboard     │       │   Alerts        │       │   Reports       │
                     │   (Real-time)   │       │   (Anomaly)     │       │   (Weekly)      │
                     └─────────────────┘       └─────────────────┘       └─────────────────┘
```

---

## Retention & Compliance

| Data Type | Retention | Notes |
|-----------|-----------|-------|
| Raw events | 90 days | Auto-deleted via cron |
| Aggregated metrics | 2 years | Daily/weekly rollups |
| Customer-level metrics | Account lifetime + 30 days | Deleted on account deletion request |

### GDPR/Privacy Compliance
- Events contain no PII
- Customer ID hashing prevents reverse lookup
- Data export includes customer's event history on request
- "Right to deletion" removes all customer events within 72 hours

---

## Quick Reference: Key Conversion Events

For funnel analysis, track these events in sequence:

1. `page_viewed` (landing)
2. `cta_clicked`
3. `checkout_started`
4. `user_signup`
5. `onboarding_started`
6. `onboarding_step_completed` (×N)
7. `onboarding_completed`
8. `skill_installed` (first)
9. `message_sent` (first)
10. `daily_active` (retention)

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-02-04 | Initial schema design |
