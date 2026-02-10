# Clawdbot Analytics Dashboard Specification

> Key metrics and visualizations for tracking business health and growth.

---

## Dashboard Overview

The analytics dashboard is organized into 5 main sections:
1. **Executive Summary** - High-level KPIs at a glance
2. **Acquisition & Funnel** - User signup and conversion metrics
3. **Engagement & Usage** - Feature usage and session data
4. **Revenue & Subscription** - MRR, churn, and financial metrics
5. **Health & Alerts** - System health and anomaly detection

---

## 1. Executive Summary Dashboard

### Layout
```
┌──────────────────────────────────────────────────────────────────────────┐
│  EXECUTIVE SUMMARY                                    Last 30 Days  [▼] │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │    MRR      │  │    Users    │  │   Churn     │  │    NPS      │     │
│  │   $4,250    │  │     127     │  │    2.3%     │  │     42      │     │
│  │   ↑ 12%     │  │   ↑ 8       │  │   ↓ 0.5%   │  │   ↑ 3       │     │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘     │
│                                                                          │
│  ┌────────────────────────────────────┐  ┌────────────────────────────┐ │
│  │     MRR Trend (12 months)          │  │    Active Users (30 days) │ │
│  │  $5k ┤                        ╭──  │  │  150┤            ╭──────   │ │
│  │      │                   ╭────╯    │  │     │       ╭────╯         │ │
│  │  $3k ┤              ╭────╯         │  │  100┤  ╭────╯              │ │
│  │      │         ╭────╯              │  │     │──╯                   │ │
│  │  $1k ┤    ╭────╯                   │  │   50┤                      │ │
│  │      ├────╯                        │  │     ├──────────────────────│ │
│  │      └─────────────────────────────│  │     └──────────────────────│ │
│  └────────────────────────────────────┘  └────────────────────────────┘ │
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │  QUICK ALERTS                                                     │   │
│  │  ⚠️ 3 users at risk of churn (no activity 7+ days)               │   │
│  │  ✅ Conversion rate up 15% this week                              │   │
│  │  📈 "Email" skill seeing 40% increase in usage                    │   │
│  └──────────────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────────┘
```

### Key Metrics

| Metric | Formula | Goal | Alert Threshold |
|--------|---------|------|-----------------|
| **MRR** | Sum of all active subscription values | Growing 10%+ MoM | < 5% growth |
| **Active Users** | Users with ≥1 message in period | Growing | < 60% of total |
| **Churn Rate** | Cancelled / Total at start of period | < 5% monthly | > 7% |
| **NPS Score** | % Promoters - % Detractors | > 40 | < 20 |

---

## 2. Acquisition & Funnel Dashboard

### Conversion Funnel Visualization

```
┌──────────────────────────────────────────────────────────────────────────┐
│  CONVERSION FUNNEL                                    This Week  [▼]    │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  Landing Page Visits                                                     │
│  ████████████████████████████████████████████████████████  2,450        │
│                                                                          │
│  Pricing Page Views                                    ─────────────────│
│  ██████████████████████████████████████                    890 (36.3%)  │
│                                                                          │
│  Checkout Started                                      ─────────────────│
│  ████████████████████████                                  234 (26.3%)  │
│                                                                          │
│  Signup Completed                                      ─────────────────│
│  ███████████████████                                       187 (79.9%)  │
│                                                                          │
│  Onboarding Completed                                  ─────────────────│
│  ████████████████                                          156 (83.4%)  │
│                                                                          │
│  First Message Sent                                    ─────────────────│
│  █████████████████                                         163 (87.2%)  │
│                                                                          │
│  OVERALL CONVERSION: 6.65%                                               │
└──────────────────────────────────────────────────────────────────────────┘
```

### Acquisition Breakdown

```
┌────────────────────────────────┐  ┌────────────────────────────────┐
│  SIGNUPS BY SOURCE             │  │  SIGNUPS BY TIER               │
│                                │  │                                │
│  Organic Search    42%  ████   │  │  Starter        67%  ██████   │
│  Paid Ads          28%  ███    │  │  Professional   28%  ███      │
│  Referral          18%  ██     │  │  Enterprise      5%  █        │
│  Direct            12%  █      │  │                                │
│                                │  │                                │
└────────────────────────────────┘  └────────────────────────────────┘
```

### Key Metrics

| Metric | Definition | Target |
|--------|------------|--------|
| **Visitor → Pricing** | % who view pricing page | > 30% |
| **Pricing → Checkout** | % who start checkout | > 20% |
| **Checkout → Signup** | % who complete signup | > 75% |
| **Signup → Onboarding** | % who complete onboarding | > 80% |
| **CAC** | Marketing spend / New customers | < $50 |
| **Payback Period** | CAC / Average MRR | < 3 months |

---

## 3. Engagement & Usage Dashboard

### Session Overview

```
┌──────────────────────────────────────────────────────────────────────────┐
│  ENGAGEMENT METRICS                                   Last 30 Days  [▼] │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │  Sessions   │  │ Msg/Session │  │ Avg Session │  │ DAU/MAU     │     │
│  │   3,847     │  │    12.4     │  │   18 min    │  │    34%      │     │
│  │   ↑ 15%     │  │   ↑ 2.1     │  │   ↑ 3 min   │  │   ↑ 5%      │     │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘     │
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │  DAILY ACTIVE USERS                                               │   │
│  │  50┤     ╭╮    ╭╮                           ╭╮   ╭╮  ╭─╮         │   │
│  │    │ ╭─╮╭╯╰╮╭╮╭╯╰╮    ╭╮╭╮   ╭╮   ╭─╮ ╭╮  ╭╯╰╮╭╯╰──╯ ╰╮        │   │
│  │  30┤ │ ╰╯  ╰╯╰╯  ╰─╮╭─╯╰╯╰─╮╭╯╰─╮╭╯ ╰─╯╰──╯  ╰╯       ╰╮       │   │
│  │    │─╯             ╰╯      ╰╯   ╰╯                      ╰─      │   │
│  │  10┤                                                             │   │
│  │    └─────────────────────────────────────────────────────────────│   │
│  │      Mon  Tue  Wed  Thu  Fri  Sat  Sun  Mon  Tue  Wed  Thu  Fri  │   │
│  └──────────────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────────┘
```

### Skill Usage Rankings

```
┌──────────────────────────────────────────────────────────────────────────┐
│  TOP SKILLS BY USAGE                                                     │
├──────────────────────────────────────────────────────────────────────────┤
│  Rank │ Skill            │ Users │ Daily Uses │ Satisfaction │ Trend    │
│ ──────┼──────────────────┼───────┼────────────┼──────────────┼────────  │
│   1   │ 📧 Email         │  89   │    234     │    4.5/5     │  ↑ 12%   │
│   2   │ 📅 Calendar      │  76   │    189     │    4.3/5     │  ↑ 8%    │
│   3   │ 🔍 Web Search    │  72   │    156     │    4.1/5     │  ↔ 0%    │
│   4   │ 📁 File Manager  │  54   │    98      │    4.2/5     │  ↑ 23%   │
│   5   │ 💬 Discord       │  48   │    87      │    4.4/5     │  ↓ 5%    │
│   6   │ 🐦 Twitter       │  31   │    45      │    3.9/5     │  ↑ 15%   │
│   7   │ 🔗 Browser       │  28   │    34      │    4.0/5     │  ↑ 40%   │
│   8   │ 📊 Analytics     │  19   │    23      │    4.6/5     │  NEW     │
└──────────────────────────────────────────────────────────────────────────┘
```

### Channel Distribution

```
┌────────────────────────────────────────┐
│  MESSAGES BY CHANNEL                   │
│                                        │
│  Discord       45%  █████████          │
│  Telegram      32%  ██████             │
│  WhatsApp      15%  ███                │
│  Slack          8%  ██                 │
│                                        │
└────────────────────────────────────────┘
```

### Key Metrics

| Metric | Definition | Target |
|--------|------------|--------|
| **DAU/MAU Ratio** | Daily active / Monthly active | > 25% |
| **Messages per Session** | Avg messages in a session | > 10 |
| **Session Length** | Avg time from first to last msg | > 15 min |
| **Skill Activation Rate** | % of installed skills used | > 60% |
| **Response Time** | Avg latency for agent response | < 3 seconds |

---

## 4. Revenue & Subscription Dashboard

### MRR Breakdown

```
┌──────────────────────────────────────────────────────────────────────────┐
│  MRR ANALYSIS                                         February 2025     │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────┐     │
│  │  MRR WATERFALL                                                  │     │
│  │                                                                 │     │
│  │  Starting MRR          ████████████████████████████  $3,800    │     │
│  │  + New                 ████████                      + $650     │     │
│  │  + Expansion           ███                           + $180     │     │
│  │  - Contraction         █                             - $80      │     │
│  │  - Churn               ██                            - $300     │     │
│  │  ──────────────────────────────────────────────────────────────│     │
│  │  Ending MRR            █████████████████████████████ $4,250    │     │
│  │                                                                 │     │
│  └────────────────────────────────────────────────────────────────┘     │
│                                                                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │   ARPU      │  │    LTV      │  │  Net Rev    │  │ Quick Ratio │     │
│  │   $33.46    │  │   $401      │  │  Retention  │  │    2.8      │     │
│  │   ↑ 5%      │  │   ↑ 8%      │  │   104%      │  │   Good      │     │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘     │
└──────────────────────────────────────────────────────────────────────────┘
```

### Revenue by Tier

```
┌────────────────────────────────────────┐  ┌────────────────────────────────┐
│  MRR BY TIER                           │  │  CUSTOMERS BY TIER             │
│                                        │  │                                │
│  Enterprise    $1,500  35%  ███████    │  │  Starter        85  67%  █████ │
│  Professional  $1,700  40%  ████████   │  │  Professional   34  27%  ██    │
│  Starter       $1,050  25%  █████      │  │  Enterprise      8   6%  █     │
│                                        │  │                                │
│  Total: $4,250                         │  │  Total: 127                    │
└────────────────────────────────────────┘  └────────────────────────────────┘
```

### Churn Analysis

```
┌──────────────────────────────────────────────────────────────────────────┐
│  CHURN BREAKDOWN                                      Last 30 Days      │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  Churned Customers: 3                    Churned MRR: $300               │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────┐     │
│  │  CHURN REASONS                                                  │     │
│  │                                                                 │     │
│  │  Cost too high           33%  ██████████                       │     │
│  │  Not using enough        33%  ██████████                       │     │
│  │  Found alternative       17%  █████                            │     │
│  │  Business closed         17%  █████                            │     │
│  └────────────────────────────────────────────────────────────────┘     │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────┐     │
│  │  CHURN BY TENURE                                                │     │
│  │                                                                 │     │
│  │  0-30 days       1 customer   (Didn't activate)                │     │
│  │  31-90 days      1 customer   (Cost concern)                   │     │
│  │  90+ days        1 customer   (Business closed)                │     │
│  └────────────────────────────────────────────────────────────────┘     │
└──────────────────────────────────────────────────────────────────────────┘
```

### Key Revenue Metrics

| Metric | Formula | Target | Alert |
|--------|---------|--------|-------|
| **MRR** | Sum of recurring revenue | Growing 10%+ MoM | < 5% |
| **ARPU** | MRR / Active customers | > $30 | < $25 |
| **LTV** | ARPU × Avg lifetime months | > $300 | < $200 |
| **CAC:LTV Ratio** | LTV / CAC | > 3:1 | < 2:1 |
| **Net Revenue Retention** | (Start MRR + Expansion - Churn) / Start MRR | > 100% | < 95% |
| **Quick Ratio** | (New + Expansion) / (Contraction + Churn) | > 2 | < 1.5 |
| **Gross Margin** | (Revenue - COGS) / Revenue | > 70% | < 60% |

---

## 5. Health & Alerts Dashboard

### At-Risk Customers

```
┌──────────────────────────────────────────────────────────────────────────┐
│  🚨 AT-RISK CUSTOMERS                                                    │
├──────────────────────────────────────────────────────────────────────────┤
│  ID Hash  │ Tier    │ Risk Level │ Last Active │ Risk Factors           │
│ ──────────┼─────────┼────────────┼─────────────┼─────────────────────── │
│  a3f8...  │ Pro     │ 🔴 High    │ 14 days ago │ No login, low usage    │
│  b2e1...  │ Starter │ 🟠 Medium  │ 7 days ago  │ Payment failed (2x)    │
│  c9d4...  │ Pro     │ 🟠 Medium  │ 5 days ago  │ Usage dropped 60%      │
│  d7a2...  │ Starter │ 🟡 Low     │ 3 days ago  │ Onboarding incomplete  │
└──────────────────────────────────────────────────────────────────────────┘
```

### System Health

```
┌──────────────────────────────────────────────────────────────────────────┐
│  SYSTEM HEALTH                                        Real-time         │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │  Uptime     │  │  Avg Resp   │  │ Error Rate  │  │ Queue Depth │     │
│  │   99.9%     │  │   1.8s      │  │   0.3%      │  │     12      │     │
│  │   ✅ Good   │  │   ✅ Good   │  │   ✅ Good   │  │   ✅ Good   │     │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘     │
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │  RESPONSE TIME DISTRIBUTION (Last Hour)                          │   │
│  │                                                                   │   │
│  │  < 1s     ████████████████████████████████████████████  78%     │   │
│  │  1-3s     ██████████████                                18%     │   │
│  │  3-10s    ███                                            3%     │   │
│  │  > 10s    █                                              1%     │   │
│  └──────────────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────────┘
```

### Alert Configuration

| Alert | Condition | Severity | Action |
|-------|-----------|----------|--------|
| High Churn | > 5% monthly churn | 🔴 Critical | Slack + Email |
| Payment Failure | 3+ failed attempts | 🟠 Warning | Email customer |
| Usage Drop | > 50% week-over-week | 🟠 Warning | Check-in email |
| No Login 7d | Pro/Enterprise customer | 🟡 Info | Engagement email |
| Error Spike | > 5% error rate | 🔴 Critical | Slack + PagerDuty |
| Slow Response | Avg > 5s for 10min | 🟠 Warning | Slack |

---

## Implementation Notes

### Data Sources
- **Events Database**: TimescaleDB (time-series optimized)
- **Aggregations**: Pre-computed daily/weekly rollups
- **Real-time**: WebSocket for live metrics
- **Caching**: Redis for dashboard queries (5-minute TTL)

### Refresh Rates
| Dashboard Section | Refresh Rate |
|-------------------|--------------|
| Executive Summary | 5 minutes |
| Funnel Metrics | 15 minutes |
| Engagement | 5 minutes |
| Revenue | 1 hour |
| Health/Alerts | Real-time |

### Access Levels
| Role | Access |
|------|--------|
| Admin | Full access |
| Finance | Revenue dashboard only |
| Support | Health + At-risk customers |
| Marketing | Acquisition funnel only |

---

## Dashboard Tech Stack Recommendation

### Option 1: PostHog (Recommended for MVP)
- Self-hosted or cloud
- Built-in funnels, retention, feature flags
- Privacy-compliant
- Generous free tier

### Option 2: Custom with Metabase
- Self-hosted Metabase on PostgreSQL
- Full control over queries
- More setup, more flexibility

### Option 3: Grafana + TimescaleDB
- Best for real-time operational dashboards
- Requires more SQL expertise
- Excellent alerting system

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-02-04 | Initial dashboard specification |
