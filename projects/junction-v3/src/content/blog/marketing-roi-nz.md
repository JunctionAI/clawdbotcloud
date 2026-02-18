---
title: "How to Measure Marketing ROI in New Zealand (2026 Guide)"
slug: "marketing-roi-nz"
date: "2026-02-19"
excerpt: "Most NZ businesses are measuring the wrong marketing metrics — or not measuring at all. Here's how to set up proper ROI tracking, understand CAC and LTV, and use AI-assisted reporting to make better decisions."
readingTime: 6
keywords: ["marketing roi nz", "measure marketing roi", "marketing analytics nz", "roi tracking new zealand", "marketing metrics nz", "marketing measurement nz", "cac ltv new zealand"]
---

Most New Zealand businesses know they should be measuring marketing ROI. Very few actually do it properly.

The result: marketing budgets allocated based on gut feel, campaigns run without clear success metrics, and the perpetual question — "is this actually working?" — left unanswered.

This guide covers how to measure marketing ROI properly in 2026 — what to track, how to build attribution frameworks, and where AI tools change what's possible for NZ businesses.

---

## The Problem with How NZ Businesses Measure Marketing

Before getting into the framework, it's worth naming what's broken.

**Vanity metrics masquerading as performance.** Follower counts, page impressions, email open rates — these are activity metrics, not outcome metrics. They might indicate something useful, but they don't tell you whether marketing is generating revenue.

**Last-click attribution.** The default in most analytics tools (including Google Analytics 4) is to attribute a conversion to the last channel the customer touched before converting. This systematically undercredits brand-building channels (SEO, content, social) and overcredits bottom-funnel channels (Google Search ads, retargeting). It leads to poor budget allocation.

**No baseline.** Many NZ businesses start measuring only after they start spending — which means they have no baseline to compare against. You can't calculate ROI without knowing what baseline revenue looked like.

**Measuring channels in isolation.** A customer might discover your brand on Instagram, read a blog post for trust, search your brand name on Google, and convert via an email. Which channel gets credit? All of them, to varying degrees. Siloed measurement misses this.

**Confusing correlation with causation.** Revenue went up the month you started running ads. Did the ads cause the growth? Or were there other factors (seasonality, a PR mention, a competitor closing)? Proper measurement requires controlling for other variables.

Getting this right is one of the highest-leverage things an NZ business can do. Better measurement leads to better decisions, which leads to better ROI. It compounds.

---

## What to Track: The Core Marketing Metrics for NZ Businesses

### 1. Customer Acquisition Cost (CAC)

**Formula:** Total marketing + sales spend ÷ number of new customers acquired

CAC is the single most important marketing metric for most NZ businesses. It tells you how much it costs to acquire a customer — and whether your marketing economics make sense.

**Calculate CAC by channel.** Not just overall. Google ads CAC. Meta ads CAC. Organic (content + SEO) CAC. This tells you which channels are efficient and which are wasteful.

**Example:** You spent $10,000 on Google Ads in March and acquired 50 new customers. Your Google CAC is $200. Is that good? Depends on...

### 2. Customer Lifetime Value (LTV)

**Formula:** Average order value × purchase frequency per year × average customer lifespan

LTV tells you how much a customer is worth to your business over their lifetime. It's the number that contextualises CAC.

**Example:** Your customers purchase twice a year, average order is $150, and they stay customers for 3 years. LTV = $150 × 2 × 3 = $900.

With a $200 CAC and $900 LTV, you have a 4.5:1 LTV:CAC ratio — healthy. You can afford to acquire customers at $200.

**Target LTV:CAC ratio:**
- Below 1:1 — You're losing money on every customer. Stop and fix.
- 1:1–2:1 — Marginal. Likely unsustainable.
- 2:1–3:1 — Acceptable but not optimised.
- 3:1+ — Healthy. You have room to invest in growth.
- 5:1+ — You're likely under-investing in marketing. Leave money on the table.

**LTV calculation nuances for NZ businesses:**
- Include gross margin, not revenue (a 20% margin business has very different economics than a 60% margin one)
- Factor in churn rate (not all customers stay for 3 years)
- Segment by cohort — your most recent customers may have different LTV than customers from 3 years ago

### 3. Return on Ad Spend (ROAS)

**Formula:** Revenue attributed to ads ÷ ad spend

ROAS is specific to paid advertising. A ROAS of 4x means you generated $4 in revenue for every $1 spent on ads.

**Caution:** ROAS is often misleading because it uses revenue, not profit. A business with 30% margins needs a minimum ROAS of 3.3x just to break even (before accounting for other costs). Know your breakeven ROAS before setting targets.

**NZ-specific ROAS benchmarks (approximate):**
- E-commerce (physical products): Target 3–6x ROAS at scale
- Services (high-margin): Lower ROAS is acceptable because higher LTV — even 2x ROAS can be profitable
- SaaS/subscriptions: ROAS is a poor metric; focus on CAC vs. LTV

### 4. Marketing Efficiency Ratio (MER)

**Formula:** Total revenue ÷ total marketing spend

MER is a blended view of marketing efficiency across all channels — useful when attribution is unclear (which it often is). If you spent $50k on marketing in Q1 and generated $400k in revenue, your MER is 8x.

Track MER month-over-month. If it's trending down while you're spending more, something is breaking down. If it's trending up, your marketing is getting more efficient.

### 5. Conversion Rate by Channel

For NZ businesses with a website, conversion rate — the percentage of visitors who take a desired action (purchase, enquiry, sign-up) — is a critical diagnostic metric.

Track conversion rate by:
- Traffic channel (organic, paid, email, direct)
- Device (mobile vs. desktop — often dramatically different)
- Landing page
- Traffic quality (new vs. returning visitors)

A drop in conversion rate at constant traffic usually signals a product or UX problem. An improvement in conversion rate multiplies the ROI of every other marketing channel.

---

## Attribution: The Hard Problem

Attribution — figuring out which marketing touchpoints deserve credit for a conversion — is genuinely difficult, and the tools available to NZ businesses are all imperfect.

### The Models

**Last-click attribution (default):** The final touchpoint before conversion gets all the credit. Overcredits bottom-funnel channels. Use with caution.

**First-click attribution:** The first touchpoint gets all credit. Overcredits awareness channels. Useful for understanding discovery.

**Linear attribution:** Credit is distributed equally across all touchpoints. Blunt but unbiased.

**Time-decay attribution:** More recent touchpoints get more credit. Reflects the recency bias in purchase decisions. Often a reasonable model.

**Data-driven attribution (GA4 default):** GA4's machine learning model attempts to assign credit based on actual conversion path data. Best available model for most NZ businesses, but requires sufficient data volume (1,000+ conversions) to be reliable.

### The Practical Approach for NZ Businesses

**Use multiple attribution lenses.** No single model is right. Use last-click for tactical decisions (is this specific ad performing?), first-click to understand where customers discover you, and MER as the blended health metric.

**Run incrementality tests.** If you want to know if a channel is truly driving sales, turn it off for a period and measure what happens to revenue. This is the gold standard for attribution — often impractical, but worth doing for your highest-spend channels.

**Build a simple tracking spreadsheet.** For many NZ businesses, a monthly spreadsheet tracking spend per channel, attributed conversions per channel, and overall MER is more actionable than over-engineered analytics setups. Start simple.

---

## AI-Assisted Reporting: What's Now Possible

The combination of better data tools and AI has significantly changed what's possible for NZ businesses in marketing analytics.

### GA4 + Looker Studio

Google Analytics 4 combined with Looker Studio (free data visualisation) lets NZ businesses build custom dashboards that surface the metrics that matter — not the default GA4 reports that are often cluttered and hard to interpret.

Build a Looker Studio dashboard that shows, on one screen:
- Revenue by channel (this week vs. last week vs. last year)
- Conversion rate by channel
- CAC by paid channel
- Top-performing landing pages

This is a 2-hour setup that saves hours of manual reporting weekly.

### AI for Pattern Recognition

AI tools can now:
- Analyse months of Google Analytics data and surface non-obvious patterns ("Your Meta ads convert better on weekends among 25–34-year-olds")
- Flag anomalies in real time ("Your cart abandonment rate increased 15% this week — likely related to a checkout page change on Tuesday")
- Generate natural-language summaries of performance data that non-technical stakeholders can act on
- Build predictive models for CAC and LTV based on historical cohort data

These capabilities are available now — not in some future AI world. NZ businesses using them have a genuine analytics advantage over competitors still relying on manual spreadsheet analysis.

### Automated Reporting

Weekly manual reporting is a tax on your time. Set up automated reporting:
- GA4 can email scheduled reports
- Looker Studio dashboards refresh automatically
- Most CRMs and email tools generate weekly digest reports automatically
- Connect tools via Zapier or Make to build cross-channel summary reports

The goal: spend 30 minutes reviewing automated reports each week, not 3 hours building them.

---

## The Junction Approach to Marketing Measurement

At Junction Media, we build measurement frameworks before we build campaigns. Every engagement starts with:

1. **Baseline establishment:** What are current conversion rates, revenue per channel, and CAC (even rough estimates)?
2. **Success metrics definition:** What does good look like in 90 days? Specific, measurable targets for each channel.
3. **Attribution setup:** GA4 configured correctly, UTM parameters standardised, Shopify/CRM integration if applicable.
4. **Reporting infrastructure:** A single dashboard that the client and I both look at weekly. No guessing about what's working.

This is the difference between marketing that feels productive and marketing that is demonstrably productive.

If you're a NZ business spending on marketing without a clear measurement framework — you're flying blind. The good news: this is fixable, and fixing it is one of the highest-ROI things you can do before spending another dollar on ads.

Ready to build a proper marketing system with real accountability? [Apply to work with Junction Media](/#apply).

---

*Tom Hall-Taylor is an AI marketing consultant and fractional CMO based in Auckland, New Zealand. Junction Media works with select businesses to build AI-native marketing systems. [Apply to work with us](/#apply).*

---

**Related reading:** [Facebook advertising New Zealand: a 2026 guide](/blog/facebook-ads-nz) · [Shopify marketing NZ: grow your ecommerce store in 2026](/blog/shopify-marketing-nz) · [What is a fractional CMO? (And do NZ businesses need one?)](/blog/what-is-a-fractional-cmo-nz)
