# DBH Model: Ops Analysis & Service Structure

**Date:** 2026-02-10  
**Context:** Tom's breakdown of actual service delivery for DBH  
**Question:** How to structure ops? Should services be more defined?

---

## The Reality Matrix

Let me reframe Tom's breakdown into an ops-useful model:

| Service | Execution Model | Dependency | Predictability |
|---------|----------------|------------|----------------|
| Retailer listings | AI End-to-End | None | ⬤⬤⬤ High |
| SEO/GEO/AEO | AI End-to-End | None | ⬤⬤⬤ High |
| Google Ads | AI End-to-End | None | ⬤⬤⬤ High |
| Strategy | AI End-to-End | None | ⬤⬤⬤ High |
| Shopify updates | AI + Human polish | Minor human | ⬤⬤◯ Medium-High |
| Email/Loyalty | AI + Design | Designer (templates) | ⬤⬤◯ Medium |
| Meta Ads | AI + Design | Designer (creatives) | ⬤◯◯ Medium-Low |
| DLE production | AI Brief → Human | Designer | ⬤◯◯ Low |
| Website dev | AI Brief → Human | Developer | ⬤◯◯ Low |
| Branding | AI Assist | Designer | ◯◯◯ Low |
| Video | AI Prompt → External | Agency | ◯◯◯ Variable |
| Influencer mgmt | Coordination | Relationship | ◯◯◯ Variable |

**The Pattern:** 
- 4 services = fully autonomous (high margin, predictable)
- 4 services = AI + design dependency (medium margin, design bottleneck)
- 4 services = coordination/external (lower margin, variable)

---

## The Core Ops Question

> "Should services be more defined for measurability?"

**My take: Yes for capacity, No for tasks.**

Here's why:

### The Problem with "Loose Employee Model"
1. **No baseline for value** — Client can't see what they're getting vs. paying
2. **Scope creep is invisible** — Until you're drowning
3. **Hard to replicate** — Every client becomes custom
4. **Burnout risk** — "Always on" without boundaries
5. **Pricing conversations are awkward** — "Can you do more?" has no framework

### The Problem with "Rigid Service Packages"
1. **Kills flexibility** — Client's actual needs don't fit boxes
2. **Breeds adversarial scoping** — "Is this in scope?" becomes a thing
3. **Misses the value prop** — They're buying a fractional CMO, not a task list
4. **Slow response** — Every new need requires negotiation

---

## The Solution: Capacity-Based Retainer with Output Tracking

### Structure

```
┌────────────────────────────────────────────────────────────────┐
│  MONTHLY CAPACITY AGREEMENT                                    │
│                                                                │
│  "You get [X] hours of Junction capacity per month.            │
│   You direct priorities. We track and report outputs.          │
│   AI multiplies the hours. Design hours are separate."         │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**What This Looks Like:**

| Component | Definition | Example (DBH) |
|-----------|------------|---------------|
| **Strategic Hours** | AM/Tom time for strategy, calls, oversight | 10 hrs/month |
| **AI Execution Capacity** | What AI agents produce (unlimited in theory, bounded by oversight) | ~100 hrs equivalent output |
| **Design Hours** | External designer allocation | 15 hrs/month |
| **External Budget** | Video shoots, influencer fees, etc. | Pass-through + 15% |

### Monthly Rhythm

**Week 1: Priority Setting**
- Client sets top 3-5 priorities for the month
- AM translates to sprint plan
- Design hours allocated to priorities

**Weeks 2-3: Execution**
- AI agents run against priorities
- AM reviews/approves outputs
- Designer executes briefs from AI

**Week 4: Review + Reset**
- Output report delivered
- Results reviewed
- Next month priorities discussed

---

## Output Tracking (The Measurability Layer)

**Track outputs, not hours.** Client sees value, you see workload.

### Monthly Output Report Template

```
# DBH — February 2026 Output Report

## What We Shipped

### Content & Creative
- Blog posts published: 4
- Social posts created: 47
- Email campaigns sent: 3
- DLE assets created: 8

### Advertising
- Google Ads campaigns managed: 3
- Meta Ads campaigns managed: 2
- Ad spend managed: $X
- ROAS achieved: X.X

### Technical
- Shopify updates: 12
- Retailer listings updated: 24
- Website changes: 6

### Strategic
- Strategy sessions: 2
- Competitor analyses: 1
- Performance reviews: 4

## Results
- Website traffic: +X%
- Conversion rate: X%
- Revenue influenced: $X

## Capacity Used
- Strategic hours: 10/10
- Design hours: 14/15
- AI execution: ~95 task completions

## Next Month Focus
1. [Priority 1]
2. [Priority 2]
3. [Priority 3]
```

**Why This Works:**
- Client sees tangible output (not "we worked on stuff")
- You can benchmark across clients
- Scope creep becomes visible ("We shipped 2x last month, capacity maxed")
- Upsell conversations have data ("To add video, we need +X design hours")

---

## The Design Bottleneck: Three Options

Design is your consistent external dependency. Options:

### Option 1: Fractional In-House Designer
**Model:** 20-30 hrs/week across all clients  
**Cost:** $3-5k/month  
**Pros:** Faster turnaround, learns brand, always available  
**Cons:** Fixed cost regardless of demand  
**When:** At 4+ clients with consistent design needs

### Option 2: AI-First Design Pipeline
**Model:** Push everything possible to AI tools first  
**Tools:** 
- Midjourney/DALL-E for concepts
- Figma AI for layouts
- Canva AI for social graphics
- Human designer for finals only

**Pros:** Reduces designer hours 40-60%  
**Cons:** Quality ceiling, brand consistency harder  
**When:** Now — test and expand

### Option 3: Productized Design Briefs
**Model:** AI creates production-ready briefs, external designers execute  
**Structure:**
```
AI Output → Brief Package:
- Detailed visual description
- Reference images
- Exact copy/text
- Size specifications
- Brand guideline extract
- Expected turnaround
```

**Pros:** Any designer can execute, less back-and-forth  
**Cons:** Still external dependency  
**When:** Now — improves current workflow

**Recommendation:** Option 2 + 3 now, Option 1 at scale.

---

## Service Definition: The Hybrid Approach

Don't sell "SEO" and "Google Ads" separately. Sell **outcomes with capacity.**

### Reframe the Services

**Old Way (Task-Based):**
- SEO: $X/month
- Google Ads: $X/month
- Email: $X/month
- etc.

**New Way (Outcome + Capacity):**
```
DBH Growth Partnership — $X/month

OUTCOMES WE DRIVE:
→ Organic traffic growth (SEO, content)
→ Paid acquisition efficiency (Google, Meta)
→ Customer retention (Email, loyalty)
→ Brand presence (Social, retailer listings)

CAPACITY INCLUDED:
→ 10 strategic hours (calls, planning, oversight)
→ Unlimited AI execution against priorities
→ 15 design hours
→ Weekly reporting

YOU CONTROL:
→ Monthly priorities (we execute)
→ Budget allocation across channels
→ Creative direction

WE HANDLE:
→ Strategy, execution, optimization
→ Coordination with external vendors
→ Continuous improvement
```

**Why This Works:**
- Client understands value (outcomes)
- Flexibility preserved (they set priorities)
- Boundaries exist (capacity limits)
- Measurable (outputs tracked)
- Upsell path clear (more capacity = more $)

---

## Measurability Framework

### What to Measure (Weekly/Monthly)

**Output Metrics (Activity):**
| Metric | Target | Actual |
|--------|--------|--------|
| Content pieces shipped | 15 | |
| Campaigns managed | 5 | |
| Optimizations made | 20 | |
| Strategic hours used | 10 | |
| Design hours used | 15 | |

**Outcome Metrics (Results):**
| Metric | Baseline | Current | Change |
|--------|----------|---------|--------|
| Organic traffic | | | |
| Paid ROAS | | | |
| Email open rate | | | |
| Conversion rate | | | |
| Revenue | | | |

**Health Metrics (Relationship):**
| Metric | Score |
|--------|-------|
| Client responsiveness | /5 |
| Satisfaction (implicit) | /5 |
| Scope stability | /5 |
| Payment on time | Y/N |

### Monthly Review Cadence

1. **Output report sent** (Monday, Week 1)
2. **Review call scheduled** (within 5 days)
3. **Priorities confirmed** for next month
4. **Capacity check** — are we at limit? Over? Under?

---

## The "Employee Model" — Preserved But Bounded

Tom's instinct about "employee model" is right for relationship feel. Here's how to keep it while adding structure:

### What Stays Loose
- Client can shift priorities anytime
- No "is this in scope?" friction on day-to-day
- AM acts like internal team member
- Responsive Slack/email culture
- Proactive suggestions welcome

### What Gets Defined
- Monthly capacity limits (so you can say "we're at capacity this month")
- Output tracking (so value is visible)
- Design hours (hard external cost)
- External budget (pass-through)
- Priority setting cadence (weekly/monthly)

### The Magic Phrase
> "We have capacity for everything you need this month. Let's prioritize together so the most important stuff ships first."

This preserves flexibility while creating natural boundaries.

---

## Recommendations

### Immediate (This Week)
1. **Create output tracking template** — Start measuring what ships for DBH
2. **Define design hours** — What's the actual monthly burn? Make it visible
3. **Monthly priority ritual** — Formalize the "what matters this month" conversation

### Near-Term (This Month)
4. **Test AI-first design** — Push 3-5 design tasks through AI tools first
5. **Productize brief format** — Create standard AI→Designer handoff template
6. **Build monthly report** — First version for DBH

### For Scale (Before Next Client)
7. **Define capacity tiers** — What does $3k, $5k, $10k, $15k look like?
8. **Standardize onboarding** — Priority-setting conversation on Day 1
9. **Capacity planning tool** — Know when you're full before you're drowning

---

## TL;DR

| Question | Answer |
|----------|--------|
| Should services be defined? | Yes for capacity, no for tasks |
| How to structure? | Capacity-based retainer with output tracking |
| Design bottleneck? | AI-first pipeline + better briefs now; fractional designer at scale |
| Keep "employee model"? | Yes for feel, add boundaries for sustainability |
| Measurability? | Track outputs monthly, report to client, benchmark internally |

**The Frame Shift:**

> "We don't sell services. We sell a fractional growth team with AI superpowers. You set direction, we execute at scale."

---

*This analysis should feed into the client-playbook-template.md service structure.*
