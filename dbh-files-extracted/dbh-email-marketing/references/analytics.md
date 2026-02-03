# Email Analytics & Performance

## Key Metrics

### Primary KPIs

| Metric | Formula | Good | Excellent | Notes |
|--------|---------|------|-----------|-------|
| Open Rate | Opens / Delivered | 25-35% | 35%+ | Industry avg ~21% |
| Click Rate | Clicks / Delivered | 2-4% | 4%+ | Industry avg ~2.5% |
| Click-to-Open Rate | Clicks / Opens | 10-15% | 15%+ | Content quality indicator |
| Conversion Rate | Purchases / Delivered | 0.5-2% | 2%+ | Revenue driver |
| Revenue per Recipient | Revenue / Recipients | Track trend | - | Most important for ROI |
| Unsubscribe Rate | Unsubs / Delivered | <0.5% | <0.2% | Health indicator |
| Bounce Rate | Bounces / Sent | <2% | <1% | List hygiene |
| Spam Complaint Rate | Complaints / Delivered | <0.1% | <0.05% | Critical to monitor |

### Supplements Industry Benchmarks (2026)

Based on eCommerce health/wellness vertical:
- **Open Rate:** 22-28% average, 35%+ for engaged segments
- **Click Rate:** 2.5-3.5% average
- **Revenue per Email:** $0.10-0.25 for campaigns
- **Flow Revenue:** 30-50% of total email revenue

---

## Reporting Framework

### Campaign Analysis

When analysing a campaign, report on:

```
CAMPAIGN: [Name]
SENT: [Date] to [Segment] ([X] recipients)

PERFORMANCE:
- Open Rate: X% (vs benchmark Y%)
- Click Rate: X% (vs benchmark Y%)
- Conversions: X ($X revenue)
- Revenue per Recipient: $X

INSIGHTS:
- [What worked / didn't work]
- [Subject line performance if A/B tested]
- [Segment performance differences]

RECOMMENDATIONS:
- [What to do differently next time]
```

### Flow Analysis

```
FLOW: [Name]
PERIOD: [Date range]

PERFORMANCE BY EMAIL:
| Email | Recipients | Opens | Clicks | Revenue |
|-------|------------|-------|--------|---------|
| E1    | X          | X%    | X%     | $X      |
| E2    | X          | X%    | X%     | $X      |

TOTAL REVENUE: $X
REVENUE/RECIPIENT: $X

INSIGHTS:
- [Drop-off points]
- [Best performing email]
- [Optimisation opportunities]
```

---

## API Calls for Reporting

### Campaign Performance

```python
klaviyo_get_campaign_report(
    statistics=[
        "recipients",
        "unique_opens", "open_rate",
        "unique_clicks", "click_rate",
        "conversions", "conversion_rate",
        "revenue", "revenue_per_recipient",
        "unsubscribes", "bounces", "spam_complaints"
    ],
    timeframe={"key": "last_30_days"}
)
```

### Flow Performance

```python
klaviyo_get_flow_report(
    statistics=[
        "recipients",
        "unique_opens", "open_rate",
        "unique_clicks", "click_rate",
        "conversions", "revenue"
    ],
    timeframe={
        "start": "2026-01-01",
        "end": "2026-01-31"
    }
)
```

### Timeframe Options

```python
# Preset timeframes
{"key": "today"}
{"key": "yesterday"}
{"key": "last_7_days"}
{"key": "last_30_days"}
{"key": "last_90_days"}
{"key": "last_365_days"}

# Custom range
{
    "start": "2026-01-01",
    "end": "2026-01-31"
}
```

---

## Analysis Checklist

### Weekly Review
- [ ] Check overall open and click rates
- [ ] Review any campaigns sent
- [ ] Monitor unsubscribe/spam rates
- [ ] Check flow performance
- [ ] Identify top and bottom performers

### Monthly Review
- [ ] Revenue attribution (campaigns vs flows)
- [ ] List growth rate
- [ ] Segment performance comparison
- [ ] A/B test learnings
- [ ] Deliverability check

### Quarterly Review
- [ ] Overall email revenue trend
- [ ] Customer lifetime value from email
- [ ] Flow optimisation opportunities
- [ ] Content themes that performed best
- [ ] Segment strategy review

---

## Segmentation for Analysis

### Engagement Segments

| Segment | Definition | Typical % |
|---------|------------|-----------|
| Highly Engaged | Opened/clicked in last 30 days | 15-25% |
| Engaged | Opened/clicked in last 60 days | 25-40% |
| Semi-Engaged | Opened/clicked in last 90 days | 10-20% |
| Disengaged | No opens in 90+ days | 20-40% |
| Never Engaged | Never opened any email | 5-15% |

### Value Segments

| Segment | Definition |
|---------|------------|
| VIP | Top 10% by spend |
| Repeat Customers | 2+ orders |
| One-Time Buyers | 1 order only |
| Prospects | Subscribed, never purchased |

---

## Optimisation Opportunities

### Low Open Rate (<20%)
- Test subject lines more aggressively
- Check send time (try 10am vs 2pm vs 7pm)
- Clean list of disengaged subscribers
- Check sender name/email
- Verify not hitting spam folders

### Low Click Rate (<2%)
- Improve email content relevance
- Clearer CTA (bigger button, better copy)
- Better content-to-CTA alignment
- Reduce distractions (single focus)
- Add urgency where appropriate

### High Unsubscribe Rate (>0.5%)
- Sending too frequently?
- Content not matching expectations?
- Wrong segment?
- Add preference centre option

### Revenue Not Growing
- Test offers/incentives
- Improve product recommendations
- Better segmentation
- Add more conversion-focused flows
- Improve landing page experience

---

## DBH Specific Metrics to Track

### Product Performance
- Which products drive most email revenue?
- Which products have highest repeat purchase rate?
- Seasonal patterns by product category?

### Customer Journey
- Average time from signup to first purchase
- Average time between purchases
- Products that lead to repeat purchases

### Geographic
- Performance by market (NZ vs AU vs International)
- Currency conversion impact on AOV
