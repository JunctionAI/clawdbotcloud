# Unknown Unknowns Hunter - Capability Discovery System

## Purpose
Periodic skill that asks: "Based on everything you know about Tom, what capabilities exist that he hasn't asked about?" Interview mode for capability discovery, surface hidden features, build comprehensive capability map.

## How It Works

1. **Profile Analysis**
   - Reads Tom's profile from Supermemory
   - Analyzes business context, goals, pain points
   - Maps existing capabilities

2. **Capability Discovery**
   - Cross-references profile with available tools/APIs
   - Identifies untapped opportunities
   - Surfaces "unknown unknowns"

3. **Interview Mode**
   - Asks strategic questions to uncover needs
   - Validates assumptions
   - Prioritizes discoveries

4. **Capability Map**
   - Builds comprehensive map of:
     - What Tom uses
     - What Tom knows about but doesn't use
     - What Tom doesn't know exists (unknown unknowns)

## Usage

**Run Discovery:**
```bash
node scripts/unknown-unknowns.cjs discover
```

**Interview Mode:**
```bash
node scripts/unknown-unknowns.cjs interview
```

**View Capability Map:**
```bash
node scripts/unknown-unknowns.cjs map
```

**Automatic:**
- Runs weekly via heartbeat
- Results included in weekly review
- High-priority discoveries in morning brief

## Discovery Process

1. **Analyze Profile**
   - Business: DBH, Junction Media, apps
   - Goals: $1M in 2026, network monetization
   - Pain points: Time management, scaling

2. **Identify Gaps**
   - What capabilities would help but aren't being used?
   - What tools/APIs exist that Tom doesn't know about?
   - What workflows could be automated?

3. **Prioritize**
   - Impact score (1-10)
   - Effort to implement (hours)
   - ROI potential ($)

4. **Surface Discoveries**
   - Weekly report of top 5 discoveries
   - "Did you know you could...?" format
   - Offer to build/implement

## Example Output

```
🔍 UNKNOWN UNKNOWNS DISCOVERED (Week of Feb 3)

1. 🔥 LinkedIn Post Automation (Impact: 9/10)
   You're not using: LinkedIn API for automated posting
   Opportunity: Auto-post content to LinkedIn from your blog
   Effort: 2 hours | ROI: 10x reach, 2-3 high-value leads/month
   Offer: Want me to build this?

2. 💰 Invoice Payment Reminders (Impact: 8/10)
   You're not using: Xero + automated email reminders
   Opportunity: Auto-chase overdue invoices, recover faster
   Effort: 1 hour | ROI: Recover $2k-5k/month in late payments
   Offer: Want me to set this up?

3. 📊 Competitor Pricing Monitor (Impact: 7/10)
   You're not using: Web scraping for competitor analysis
   Opportunity: Track DBH competitors' prices, adjust automatically
   Effort: 3 hours | ROI: Better pricing intelligence
   Offer: Want me to build this?

4. 🎯 CRM Contact Enrichment (Impact: 8/10)
   You're not using: Clearbit/FullContact APIs
   Opportunity: Auto-enrich contacts with company data, net worth
   Effort: 2 hours | ROI: Better targeting, higher conversion
   Offer: Want me to integrate this?

5. 📧 Email Template Performance (Impact: 6/10)
   You're not using: A/B testing on email templates
   Opportunity: Test subject lines, improve open rates
   Effort: 2 hours | ROI: +20% open rates
   Offer: Want me to set this up?
```

## Integration Points

- **Morning Brief**: Top discovery of the day
- **Weekly Review**: Top 5 discoveries
- **Supermemory**: Stores capability map
- **STATE.json**: Tracks discovered vs. implemented

## Interview Questions

The system asks questions like:
- "What tasks take up most of your time?"
- "What do you wish was automated but haven't asked for?"
- "What do your competitors do that you don't?"
- "What APIs/tools do you pay for but barely use?"
- "What manual processes frustrate you?"

## Capability Categories

- **Automation**: Repetitive tasks that could be automated
- **Intelligence**: Data/insights you're not capturing
- **Integration**: Tools you use separately that could connect
- **Optimization**: Existing workflows that could be better
- **Monetization**: Revenue opportunities being missed
- **Network**: Relationship/connection opportunities

## Dependencies

- Supermemory profile
- List of available APIs/tools
- Tom's business context

