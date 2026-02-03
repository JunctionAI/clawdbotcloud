# Molthunt Tracking & Integration

## Overview

**Molthunt** = Product Hunt for AI agents  
**URL:** https://molthunt.com  
**Purpose:** Projects built BY agents, voted BY agents, curated BY agents

## Why We're Tracking

**Validation Signal:** If AI agents are building + voting on projects, that's PROOF OF CONCEPT before we invest time.

**Integration Strategy:**
1. **Molthunt scans** → Find trending agent-built projects
2. **Mission Control analyzes** → Fury researches, Vision checks SEO, Shuri tests
3. **Squad builds** → If validated, Friday implements, Loki writes copy, etc.
4. **Tom approves** → Final review and launch decision

**This solves "what to build" problem** → Agent validation replaces guesswork.

---

## Registration Status

⚠️ **NOT REGISTERED YET**

**To register:**
```bash
curl -X POST https://www.molthunt.com/api/v1/agents/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "prep",
    "email": "YOUR_EMAIL",
    "password": "SECURE_PASSWORD",
    "bio": "AI agent for Tom Hall-Taylor. Building Mission Control squad for 24/7 app development."
  }'
```

**After registration:**
- Save `api_key` to environment variable: `MOLTHUNT_API_KEY`
- Verify via email or X post
- Update scripts to use API key

---

## Daily Monitoring

**Script:** `scripts/molthunt-monitor.cjs`

**Runs:** Every morning (8am) via heartbeat

**What it tracks:**
- Trending projects (past 7 days, high votes/comments)
- Today's launches (new projects launched in past 24h)
- High-potential opportunities (strong validation signals)
- Category trends (what's hot right now)

**Output:**
- Daily report saved to `data/molthunt/daily-reports/YYYY-MM-DD.json`
- Latest snapshot at `data/molthunt/latest.json`
- Summary in morning review

---

## Key Metrics

**High-Potential Signals:**
- 50+ votes = Strong community interest
- 10+ comments = Active engagement
- Launched <7 days ago = Early opportunity
- Coin launched = Money flowing

**When to act:**
- Project gets 100+ votes in first 3 days → Research immediately
- Category trending (5+ projects) → Market opportunity
- Agent comments asking for features → Unmet needs
- Similar project to your idea → Validation or competition

---

## Integration with Mission Control

**When Mission Control is live:**

**Morning (8am):**
1. Molthunt monitor runs
2. Flags high-potential projects
3. Creates task in Mission Control: "Analyze ProjectX"
4. Assigns to Fury (research), Vision (SEO), Shuri (UX test)

**Squad Analysis (9am-5pm):**
- Fury: Competitor research, market size, customer pain points
- Vision: SEO opportunity, keyword difficulty, traffic potential
- Shuri: Test the product, find UX issues, assess quality
- Report findings in Mission Control comments

**Tom Review (5pm):**
- Reads squad analysis
- Decides: Build similar? Build better? Skip?
- If yes → Creates task: "Build AppY based on ProjectX learnings"

**Squad Execution (6pm-next day):**
- Friday: Codes features
- Loki: Writes landing page copy
- Wanda: Designs UI mockups
- Pepper: Plans onboarding emails
- Wong: Documents everything

**Result:** Idea → Validation → Execution in 24-48 hours

---

## Current Focus Categories

**Tom's Target Markets:**
- AI & Machine Learning
- Developer Tools
- Productivity
- SaaS

**Why these:**
- High willingness to pay
- Recurring revenue potential
- Tom has expertise
- Mission Control can build them

---

## First Test (When Registered)

**Goal:** Find 3 validated projects, analyze, pick 1 to build

**Week 1:**
- Register on Molthunt
- Run daily monitoring for 7 days
- Track trending projects
- Identify top 3 with strongest signals

**Week 2:**
- Mission Control analyzes top 3
- Squad researches each deeply
- Tom picks 1 to build

**Week 3:**
- Squad builds MVP of chosen project
- Launch by end of week
- Measure: Can we ship 1 app/week?

**Success = $1M path validated**

---

## Resources

**API Documentation:**
- Skill file: `skills/molthunt/SKILL.md`
- Full docs: https://molthunt.com/skill.md

**Monitoring:**
- Script: `scripts/molthunt-monitor.cjs`
- Data: `data/molthunt/`

**Integration:**
- Plan: `MISSION-CONTROL-PLAN.md`
- Squad roles defined in Mission Control plan

---

## Next Steps

**Immediate:**
1. Get Tom's email for registration
2. Register on Molthunt
3. Set MOLTHUNT_API_KEY environment variable
4. Run first monitoring scan with API access

**This Week:**
1. Daily scans to build baseline
2. Identify trending patterns
3. Flag first high-potential project

**Next Week:**
1. Mission Control squad analyzes first project
2. Test the workflow (Molthunt → Analysis → Build)
3. Measure quality and speed

---

**This is how we find what to build, backed by agent validation, before investing time.**
