# MEMORY-STRATEGY.md - Optimal Hybrid Memory Architecture

**Designed:** 2026-02-02  
**Status:** Active  
**Goal:** Most perfect, accurate, and persistent memory possible with current tech

---

## Architecture: Three-Tier Hybrid System

### Tier 1: Supermemory (Fast, Automatic, Temporal) ⚡

**What:** AI-powered semantic memory with automatic fact extraction and graph relationships

**Stores:**
- User profile (static + dynamic facts)
- Temporal facts (auto-expires: "meeting at 3pm today")
- Derived insights (inferred patterns)
- Relationship graph (updates/extends/derives)

**Strengths:**
- Sub-300ms recall (faster than file reads + embedding search)
- Automatic fact extraction from unstructured text
- Temporal awareness (auto-forgets expired facts)
- Contradiction resolution (tracks `isLatest` while preserving history)
- State-of-the-art benchmarks (LongMemEval, LoCoMo)

**Use For:**
- Session-start context injection (who is Tom, what's he working on)
- Fast recall of user preferences, patterns, habits
- Temporal tracking (current focus, recent events)
- Automatic relationship discovery

**API Calls:**
- `add()` - Send content for automatic fact extraction
- `profile()` - Fetch static + dynamic user profile
- `search()` - Semantic search across memory graph

---

### Tier 2: STATE.json (Operational State) 🎯

**What:** Fast-access operational state file (JSON format)

**Stores:**
- Connected services (what's configured RIGHT NOW)
- Last checks (when was email/calendar/wise last checked)
- Active projects (current work in progress)
- Pending items (action items, follow-ups)
- Recent decisions (last 5-10 strategic choices)

**Strengths:**
- Instant load (no API call, no search)
- Machine-readable (easy to query/update programmatically)
- Prevents "do you have X?" questions when X is already configured
- Always current (updated immediately when state changes)

**Use For:**
- Session-start operational context (what's connected, what's pending)
- Heartbeat checks (what accounts to monitor)
- Preventing redundant questions
- Tracking configuration changes

**Update Triggers:**
- User configures a new service → update `connectedServices`
- Complete a project → move from `activeProjects` to archive
- Make a decision → add to `recentDecisions`

---

### Tier 3: Local Files (Audit Trail, Sensitive Data, Manual Curation) 📝

**What:** Human-readable markdown files (local, private, transparent)

**Structure:**
```
memory/
  ├── YYYY-MM-DD.md         # Daily audit trail (raw logs)
  ├── people/               # Entity files (Jakob, Elliott, etc.)
  ├── projects/             # Project tracking (PG Investments, apps)
  └── business/             # Business plans, financials
MEMORY.md                   # Curated long-term insights (manual)
STATE.json                  # Operational state (automatic)
```

**Strengths:**
- Full control (you decide what's remembered)
- Privacy (never leaves your machine)
- Transparency (cat MEMORY.md = readable by humans)
- Audit trail (complete history, no black box)
- Sensitive data safe (no API dependency)

**Use For:**
- Daily audit trail (complete session transcripts)
- Sensitive information (passwords, API keys, private notes)
- Manual curation (high-level insights you want to preserve)
- Backup/recovery (if Supermemory fails, files are source of truth)
- Historical deep-dive (when you need full context, not just facts)

---

## Workflow Integration

### Session Start (Every Session)

**Order matters:**
1. **Load STATE.json** → Know what's connected/configured
2. **Pull Supermemory profile** → Get user context (static + dynamic)
3. **Read MEMORY.md** (if main session) → Long-term curated insights
4. **Read today + yesterday daily files** → Recent context

**Result:** Full context in <5 seconds, no redundant questions

---

### During Session

**Write to BOTH systems in parallel:**

| Event Type | Local Files | Supermemory |
|------------|-------------|-------------|
| User configures new service | Update STATE.json + daily log | Send: "Tom configured Wise API on 2026-02-01" |
| User shares preference | Daily log | Send: "Tom prefers morning meetings" |
| Strategic decision | STATE.json + daily log + MEMORY.md | Send: "Tom chose PG marketing role over setupclaw.com" |
| Casual chat | Daily log (if significant) | Skip (noise filtering) |
| Sensitive data | Daily log ONLY | Never send to Supermemory |

**Key Principle:** Supermemory gets facts, local files get everything (audit trail)

---

### Session End (After Each Session)

1. **Write daily log:** Document significant events to `memory/YYYY-MM-DD.md`
2. **Send highlights to Supermemory:** Auto-extract 3-5 key facts from session
3. **Update STATE.json** (if state changed): New connections, completed tasks, etc.

**Automation:** `scripts/session-end-sync.js` handles this automatically

---

### Heartbeat (9pm Daily)

1. **Check accounts** (based on STATE.json connectedServices)
2. **Run spending tracker** (`.\scripts\wise-daily-tracker.ps1`)
3. **Send daily summary to Supermemory:** Top 3-5 events from today

**Result:** Supermemory builds temporal understanding, local files have complete record

---

### Weekly Review (Sunday 8pm)

1. **Read daily files** (past 7 days)
2. **Update STATE.json:**
   - Archive completed projects
   - Add new active projects
   - Verify connectedServices still accurate
   - Prune old pendingItems
3. **Update MEMORY.md:** Extract key learnings from week
4. **Let Supermemory handle cleanup:** Temporal facts auto-expire
5. **Commit changes:** `git add . && git commit -m "Weekly review YYYY-MM-DD"`

---

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      SESSION START                          │
│  1. STATE.json (what's connected?)                          │
│  2. Supermemory profile (who is Tom? what's current focus?) │
│  3. MEMORY.md (curated long-term insights)                  │
│  4. Today + yesterday daily logs                            │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    DURING SESSION                           │
│  User says: "I just configured Wise API"                    │
│    → STATE.json: Update connectedServices.wise             │
│    → Daily log: Document event with timestamp               │
│    → Supermemory: Send fact for extraction                  │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                     SESSION END                             │
│  1. Write daily log (audit trail)                           │
│  2. Send 3-5 key facts to Supermemory                       │
│  3. Update STATE.json (if state changed)                    │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                  HEARTBEAT (9pm daily)                      │
│  1. Check accounts (based on STATE.json)                    │
│  2. Run spending tracker                                    │
│  3. Send daily summary to Supermemory                       │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                WEEKLY REVIEW (Sunday 8pm)                   │
│  1. Read past 7 days                                        │
│  2. Update STATE.json (archive/add projects)                │
│  3. Update MEMORY.md (key learnings)                        │
│  4. Supermemory auto-expires temporal facts                 │
│  5. Git commit                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Privacy & Security Rules

### Always Local (Never Send to Supermemory):
- Passwords, API keys, tokens
- Bank account numbers, financial credentials
- Personal identifiable information (addresses, phone numbers) - **unless explicitly allowed**
- Private conversations with sensitive content
- Medical information

### Safe to Send to Supermemory:
- User preferences ("Tom prefers morning meetings")
- Work patterns ("Tom focuses on DBH M-F 2-6:30pm")
- Project context ("Tom is preparing for PG chairman meeting")
- Strategic decisions ("Tom chose PG path over setupclaw.com")
- Public facts ("Tom lives in Auckland, runs Junction Media")

**When in doubt:** Write to local files only, ask user before sending to Supermemory

---

## Migration Plan (One-Time Setup)

### Step 1: Prepare Current Knowledge
1. Read MEMORY.md (curated long-term insights)
2. Read STATE.json (current operational state)
3. Read recent daily files (2026-01-25 through 2026-02-01)
4. Extract key facts for migration

### Step 2: Send to Supermemory
**Content blocks to send:**
- User identity (Tom Hall-Taylor, Junction Media, Auckland NZ)
- 2026 goals ($1M revenue, live fully, understand system)
- Life philosophy (Maslow-aligned strategy, compounding creation)
- Active projects (PG Investments, TWG, DBH, apps portfolio)
- Connected services (Wise, Gmail, Xero, Discord, Telegram, WhatsApp)
- Key entities (Jakob, Elliott, Andi Garnett, PG Investments, TWG, DBH)
- Recent decisions (PG path chosen, email formatting rules, security principles)
- Preferences (HTML email formatting, reply-all default, risk scoring for actions)

**Method:** Use `scripts/supermemory-sync.js add` to batch-send prepared content

### Step 3: Verify Profile
```bash
node scripts/supermemory-sync.js profile
```
**Expected output:**
- Static: Tom's identity, goals, business model, key relationships
- Dynamic: Current focus (PG meeting prep), recent decisions, active projects

### Step 4: Update AGENTS.md
Add Supermemory to session start routine:
```markdown
## Every Session

Before doing anything else:
1. **Read STATE.json** — operational state (what's connected, last checks)
2. **Pull Supermemory profile** — user context (static + dynamic)
3. Read SOUL.md — who you are
4. Read USER.md — who you're helping
5. Read memory/YYYY-MM-DD.md (today + yesterday) for recent context
6. **If in MAIN SESSION:** Also read MEMORY.md
```

### Step 5: Create Auto-Sync Scripts
- `scripts/session-end-sync.js` - Send session highlights to Supermemory
- `scripts/heartbeat-sync.js` - Send daily summary at 9pm
- `scripts/weekly-review-sync.js` - Update STATE.json + MEMORY.md from past week

---

## Success Metrics

**You'll know the system is working when:**
1. ✅ No more "do you have X configured?" when X is in STATE.json
2. ✅ User profile loads in <300ms at session start
3. ✅ Temporal facts auto-expire (e.g., "meeting at 3pm" forgotten after today)
4. ✅ Contradictions resolved automatically (latest info returned, history preserved)
5. ✅ Daily logs written consistently (audit trail complete)
6. ✅ Weekly reviews happen on schedule (STATE.json + MEMORY.md stay current)

---

## Maintenance

**Daily:**
- Write to daily logs (automatic during sessions)
- 9pm heartbeat sync to Supermemory

**Weekly:**
- Sunday 8pm review (update STATE.json + MEMORY.md)
- Verify Supermemory profile accuracy

**Monthly:**
- Archive old daily logs (move YYYY-MM-DD.md to memory/archive/)
- Prune outdated facts from MEMORY.md
- Review Supermemory profile for drift

---

**This is version 1.0 of the memory strategy. As we learn what works, we'll evolve it.**
