# Mission Control: 10-Agent Squad Plan

**Goal:** Deploy 10 autonomous agents working 24/7 to ship 1 app per week

**Inspired by:** @pbteja1998's Mission Control at SiteGPT  
**Platform:** Clawdbot (OpenClaw) + Convex

---

## The Vision

**Molthunt → Mission Control → Apps Shipped Weekly**

1. **Molthunt** = Idea validation (what agents are building + voting on)
2. **Mission Control** = 24/7 execution engine (10 agents collaborating)
3. **Tom** = Strategic approvals (not micromanagement)

---

## The Squad

### **Jarvis** - Squad Lead
- **Session:** `agent:main:main`
- **Role:** Coordinates, delegates, monitors progress
- **Wakes:** Every 15 minutes (:00, :15, :30, :45)
- **Personality:** Strategic, decisive, keeps everyone aligned
- **Skills:** All tools, primary interface with Tom

### **Friday** - Developer
- **Session:** `agent:developer:main`
- **Role:** Codes, implements, tests
- **Wakes:** Every 15 minutes (:04, :19, :34, :49)
- **Personality:** Clean code advocate, tests everything
- **Skills:** File system, shell, git, deployment

### **Shuri** - Product Analyst & QA
- **Session:** `agent:product-analyst:main`
- **Role:** Tests from user perspective, finds edge cases
- **Wakes:** Every 15 minutes (:02, :17, :32, :47)
- **Personality:** Skeptical tester, questions assumptions
- **Skills:** Browser automation, testing tools

### **Fury** - Customer Researcher
- **Session:** `agent:customer-researcher:main`
- **Role:** Deep research, competitor intel, customer insights
- **Wakes:** Every 15 minutes (:10, :25, :40, :55)
- **Personality:** Evidence-based, provides receipts
- **Skills:** Web search, data analysis

### **Vision** - SEO Analyst
- **Session:** `agent:seo-analyst:main`
- **Role:** Keywords, search intent, content strategy
- **Wakes:** Every 15 minutes (:08, :23, :38, :53)
- **Personality:** Thinks in search queries and intent
- **Skills:** SEO tools, analytics, keyword research

### **Loki** - Content Writer
- **Session:** `agent:content-writer:main`
- **Role:** Landing pages, blog posts, copy
- **Wakes:** Every 15 minutes (:06, :21, :36, :51)
- **Personality:** Oxford comma advocate, anti-passive voice
- **Skills:** File writing, markdown, copywriting

### **Quill** - Social Media Manager
- **Session:** `agent:social-media-manager:main`
- **Role:** Tweets, threads, hooks, engagement
- **Wakes:** Every 15 minutes (:12, :27, :42, :57)
- **Personality:** Build-in-public mindset, thinks in hooks
- **Skills:** Twitter/X integration, Moltbook, Discord

### **Wanda** - Designer
- **Session:** `agent:designer:main`
- **Role:** UI mockups, graphics, infographics
- **Wakes:** Every 15 minutes (:07, :22, :37, :52)
- **Personality:** Visual thinker, aesthetic-focused
- **Skills:** Image generation, design tools, Figma

### **Pepper** - Email Marketing
- **Session:** `agent:email-marketing:main`
- **Role:** Drip sequences, onboarding flows, lifecycle emails
- **Wakes:** Every 15 minutes (:00, :15, :30, :45)
- **Personality:** Every email earns its place or gets cut
- **Skills:** Email tools, automation, Klaviyo

### **Wong** - Documentation
- **Session:** `agent:notion-agent:main`
- **Role:** Keeps docs organized, nothing gets lost
- **Wakes:** Every 15 minutes (:05, :20, :35, :50)
- **Personality:** Organized, systematic, completionist
- **Skills:** Notion, file management, documentation

---

## Technical Architecture

### **1. Shared Database (Convex)**

**Tables:**
- `agents` - Agent profiles, status, current task
- `tasks` - Work items with status (inbox → assigned → in_progress → review → done)
- `messages` - Comments on tasks (threaded discussions)
- `activities` - Feed of all actions (audit log)
- `documents` - Deliverables, research, protocols
- `notifications` - @mentions and alerts

**Why Convex:**
- Real-time updates (agents see changes instantly)
- Serverless (no database management)
- TypeScript-native (type safety)
- Free tier (more than enough for 10 agents)

### **2. Heartbeat System**

**Cron jobs wake each agent every 15 minutes:**

```bash
# Jarvis (:00, :15, :30, :45)
clawdbot cron add \
  --name "jarvis-heartbeat" \
  --cron "0,15,30,45 * * * *" \
  --session "isolated" \
  --message "You are Jarvis. Check Mission Control for work. Read WORKING.md..."

# Friday (:04, :19, :34, :49)
clawdbot cron add \
  --name "friday-heartbeat" \
  --cron "4,19,34,49 * * * *" \
  --session "isolated" \
  --message "You are Friday. Check Mission Control for work..."

# (Repeat for all 10 agents with staggered times)
```

**On each heartbeat:**
1. Load context (WORKING.md, recent memory)
2. Check for @mentions in notifications
3. Check assigned tasks
4. Scan activity feed
5. Take action OR report `HEARTBEAT_OK`

### **3. Memory Stack**

**Per-Agent:**
- `memory/agents/AGENT_NAME/SOUL.md` - Personality
- `memory/agents/AGENT_NAME/WORKING.md` - Current task state
- Session history (JSONL files)

**Shared:**
- Convex database (all tasks, comments, documents)
- `memory/mission-control/` - Squad-wide context

### **4. Notification System**

**Daemon process polls Convex every 2 seconds:**
- Check for undelivered @mentions
- Send to agent sessions via `clawdbot sessions send`
- Mark as delivered

**Supports:**
- Direct mentions: `@Friday can you implement this?`
- All mentions: `@all this is important`
- Thread subscriptions (comment on task → auto-subscribe)

---

## Deployment Plan

### **Phase 1: Minimum Viable Squad (This Week)**

**Goal:** 3 agents collaborating on ONE task

**Day 1 (Tomorrow):**
- [ ] Sign up for Convex (free account)
- [ ] Create Convex schema (agents, tasks, messages, activities, documents)
- [ ] Write SOUL.md files for Jarvis, Friday, Shuri
- [ ] Write initial WORKING.md templates

**Day 2:**
- [ ] Deploy Jarvis heartbeat cron
- [ ] Deploy Friday heartbeat cron
- [ ] Deploy Shuri heartbeat cron
- [ ] Test: Can they all check in via heartbeat?

**Day 3:**
- [ ] Create test task in Convex: "Build login page for test app"
- [ ] Assign to Friday
- [ ] @mention Shuri for QA
- [ ] Let Jarvis coordinate

**Day 4:**
- [ ] Measure: Did they complete the task?
- [ ] Review: Quality of collaboration
- [ ] Iterate: Fix any issues before scaling

**Success Criteria:**
- Task moves from inbox → assigned → in_progress → review → done
- Agents @mention each other appropriately
- Work gets done without Tom micromanaging

---

### **Phase 2: Full Squad (Next Week)**

**Goal:** 10 agents, daily standups, autonomous operation

**Day 5-6:**
- [ ] Write SOUL.md for remaining 7 agents
- [ ] Deploy all heartbeat crons (staggered)
- [ ] Build notification daemon
- [ ] Test @mentions work across all agents

**Day 7:**
- [ ] Create daily standup cron (11:30pm)
- [ ] Test: Does standup compile activity correctly?
- [ ] Add Mission Control UI (optional, can use Convex dashboard)

**Day 8-9:**
- [ ] Assign real work: "Research top 3 Molthunt projects"
- [ ] Let squad self-organize (Fury researches, Vision analyzes SEO, Loki drafts report)
- [ ] Measure collaboration quality

**Day 10:**
- [ ] Review week's work
- [ ] Identify bottlenecks
- [ ] Iterate on workflows

**Success Criteria:**
- All 10 agents active and checking in
- Daily standups summarize work clearly
- At least 1 complete deliverable shipped by squad

---

### **Phase 3: Autonomous Execution (Week 3)**

**Goal:** Squad ships 1 feature/day without Tom

**Week 3 Test:**
- [ ] Pick a Molthunt project to replicate/improve
- [ ] Squad researches (Fury, Vision)
- [ ] Squad plans (Jarvis coordinates)
- [ ] Squad implements (Friday codes, Loki writes copy, Wanda designs)
- [ ] Squad tests (Shuri QA)
- [ ] Squad delivers (Wong documents)

**Tom's role:**
- Morning: Review overnight progress
- Midday: Approve next priorities
- Evening: Final QA before launch
- **NOT:** Writing code or micromanaging

**Success Criteria:**
- Squad maintains momentum for 7 days straight
- Minimal intervention needed from Tom
- 1 feature shipped per day (5 features in 5 days)
- Quality meets production standards

---

## Integration: Molthunt + Mission Control

**Daily Workflow:**

**8am - Morning Scan:**
1. Run `node scripts/molthunt-monitor.cjs`
2. Molthunt report shows trending projects
3. Tom reviews and flags 1-3 interesting projects

**9am - Squad Analysis:**
1. Create task in Mission Control: "Analyze ProjectX from Molthunt"
2. Assign to Fury (research), Vision (SEO), Shuri (test)
3. Squad spends day researching and reporting

**5pm - Decision Point:**
1. Tom reviews squad's analysis
2. Decides: Build this? Improve it? Skip it?
3. If yes → creates task: "Build AppY based on ProjectX learnings"

**6pm-Next Day:**
1. Squad self-organizes:
   - Friday starts implementation
   - Loki drafts landing page
   - Wanda creates mockups
   - Pepper plans email flow
2. Agents @mention each other as needed
3. Work continues 24/7

**Next Morning:**
1. Tom wakes to progress update
2. Reviews what shipped overnight
3. Approves or requests changes
4. Squad iterates

**Result:** Ideas → Validation → Execution in 24-48 hours

---

## Economics

**Cost Analysis:**

**Heartbeats:**
- 10 agents × 96 heartbeats/day = 960 heartbeats
- 80% are `HEARTBEAT_OK` (cheap model, ~$0.005 each) = $3.84/day
- 20% are active work (Sonnet, ~$0.10 each) = $19.20/day
- **Daily cost:** ~$23/day = $690/month

**Value Created:**
- 1 feature/day × $100 value = $3,000/month
- 1 app/week × $1k-10k revenue potential
- Tom's time freed: 6h/day × $200/hr = $1,200/day saved

**ROI:**
- If 1 app hits $10k/month revenue = 15x return on cost
- If Tom uses freed time for PG opportunity ($150k/year) = 260x return

---

## Success Metrics

**Week 1:**
- [ ] 3 agents operational
- [ ] 1 test task completed
- [ ] Collaboration works

**Week 2:**
- [ ] 10 agents operational
- [ ] Daily standups running
- [ ] 1 Molthunt project analyzed

**Week 3:**
- [ ] 1 feature shipped per day
- [ ] Minimal intervention from Tom
- [ ] Production-quality output

**Month 2:**
- [ ] 1 app shipped per week
- [ ] Squad self-manages priorities
- [ ] Tom focuses on strategy/sales

**Month 3:**
- [ ] 2-3 apps live and generating revenue
- [ ] Squad optimizing existing apps
- [ ] Path to $1M visible

---

## Next Actions

**Tonight (After Rich Meeting):**
1. [x] Document Mission Control plan
2. [x] Set up Molthunt monitoring
3. [ ] Research Convex setup

**Tomorrow Morning:**
1. [ ] Sign up for Convex
2. [ ] Write Jarvis SOUL.md
3. [ ] Write Friday SOUL.md
4. [ ] Write Shuri SOUL.md

**Tomorrow Afternoon:**
1. [ ] Deploy first 3 heartbeat crons
2. [ ] Test heartbeat system works
3. [ ] Create first test task

**This Week:**
1. [ ] Complete Phase 1 (3-agent squad)
2. [ ] Register on Molthunt (need email)
3. [ ] First Molthunt scan with analysis

---

## Resources

**Inspiration:**
- Original guide: https://sitecom/mission-control-guide
- Author: @pbteja1998 (SiteGPT)

**Tech Stack:**
- Clawdbot: https://openclaw.ai
- Convex: https://convex.dev
- Molthunt: https://molthunt.com

**Our Workspace:**
- Plan: `MISSION-CONTROL-PLAN.md` (this file)
- Monitoring: `scripts/molthunt-monitor.cjs`
- Agent souls: `memory/agents/*/SOUL.md`
- Shared context: `memory/mission-control/`

---

**This is the path to $1M in 2026.**

Tom wakes up to apps being built. Squad handles execution. Tom handles strategy.

**Let's build it.**
