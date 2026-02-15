# Junction Media Operating Model

*Documented: 2026-02-12*
*Source: Tom voice memo insight*

---

## Core Philosophy

**"The human literally just solves the bottlenecks. That's it."**

AI conducts the process daily. Human only unblocks what prevents moving to the next stage.

---

## The Process (For Any Service)

### 1. Install World-Class Skill
- AI must be world-class in the specific skill (Meta Ads, SEO, Google Ads, Klaviyo, CRO, etc.)
- Skills need **regular updates** with latest knowledge, tactics, platform changes
- Operator needs awareness of what's inside the skill and what's working

### 2. Load Brand Context
- Client brand understanding
- All relevant context for executing that skill
- Historical performance data
- Goals, constraints, budget

### 3. Use Best Available Model
- Currently: Opus 4.5 (or latest)
- Full Claude Code for hands-on client work
- Accept the VM bundle issues for now (delete to reset, copy context first)

### 4. Master Spreadsheet = Source of Truth
Each client gets a master spreadsheet containing:
- **Action plans** — What needs to happen
- **Accountability** — Who owns what, deadlines
- **Goals** — Clear targets and KPIs
- **Results tracking** — Updated daily
- **Decision rules** — When to scale, pause, pivot (no improvising)
- **Timeline** — Historical record of all actions and outcomes

### 5. Daily Execution Loop

```
Morning:
1. AI pulls latest results (via API ideally, manual if needed)
2. AI updates master spreadsheet
3. AI reviews against decision rules
4. AI recommends/executes actions within rules
5. AI flags bottlenecks that need human decision

Human review:
- Check flagged bottlenecks
- Make decisions AI can't make
- Unblock and move to next stage
```

---

## Applies To All Services

| Service | Spreadsheet Tracks | Key Metrics |
|---------|-------------------|-------------|
| Meta Ads | Campaigns, spend, results, scaling rules | ROAS, CPA, CTR |
| Google Ads | Keywords, bids, quality scores | CPC, conversions |
| SEO | Rankings, content, backlinks | Positions, traffic, DA |
| Klaviyo | Flows, campaigns, segments | Open rate, revenue/email |
| CRO | Tests, variants, results | Conversion rate, revenue |

Same model, different metrics. One spreadsheet per client per service.

---

## Why This Works

1. **No improvisation** — Decision rules are pre-defined based on leading indicators
2. **Daily compounding** — Small improvements every day = massive gains over time
3. **Human leverage** — Human time only spent on actual bottlenecks
4. **Full documentation** — Complete audit trail, nothing lost between sessions
5. **Scalable** — Same process works whether 1 client or 50

---

## Current Tooling Approach

### For Now: Claude Code (Full)
- Best for hands-on client work where human is in the loop daily
- Accept VM bundle issues (workaround: copy context, delete bundle, restart)
- More secure than custom solutions (for now)

### Future: Clawdbot / Own System
- Prove the process works first
- Then potentially move to own infrastructure
- Keep researching options

### Data Gathering Approaches

**Browser-Based (Current - Actually Good):**
- Claude Code uses browser to pull data from platforms
- Key benefit: AI **interprets** the data immediately
- Generates recommendations in-context
- Enables ongoing strategic conversation with human
- Not just fetching — it's the **reasoning layer**

**API Integration (Future Option):**
- Pull results directly via API (Meta, Google, Klaviyo, etc.)
- Faster/more reliable than browser scraping
- But still needs AI interpretation layer
- Much simpler than n8n/Zapier field shuffling

**Key Insight:** Browser approach forces the synthesis step:
```
Data → AI Analysis → Recommendations → Strategy Discussion → Decision
```
This human-AI strategy loop is actually the valuable part, not just the data pull.

---

## Open Questions / Research Areas

1. **Can this run on Clawdbot alone?** Or does it need Claude Code's full capabilities?
2. **API integrations** — Which platforms can we pull from directly?
3. **Automation level** — Every day vs every second day?
4. **Team handoff** — How do we onboard others to manage clients with this system?
5. **Security** — Full Claude Code vs own system trade-offs

---

## The Summary

```
Skill (world-class) + Context (brand) + Spreadsheet (source of truth) + Daily Loop (AI executes) + Human (solves bottlenecks only) = Scalable Service Delivery
```

**That's literally it.**
