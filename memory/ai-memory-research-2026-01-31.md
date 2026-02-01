# AI Agent Memory & State Management Research
## 2026-01-31

### Problem Statement
Current Clawdbot issues:
1. **State blindness** - Asks "do you have Wise API?" even though we configured it minutes ago
2. **Memory is reactive, not proactive** - Only searches when uncertain, not by default
3. **No session-persistent context** - Doesn't maintain "what's connected" map within conversation
4. **Not "on the pulse"** - Can't proactively monitor connected accounts for changes

### Key Research Findings

#### 1. MemGPT/Letta - OS-Inspired Memory Management
**Paper:** "MemGPT: Towards LLMs as Operating Systems" (arXiv:2310.08560)
**URL:** https://www.letta.com / https://github.com/letta-ai/letta

**Core Concept:** Treat LLM memory like an operating system's hierarchical memory
- **Virtual context management** - Move data between fast/slow memory tiers
- **Interrupts** - Manage control flow between agent and user
- **Stateful agents** - Learn and self-improve over time

**Key Quote:** "Drawing inspiration from hierarchical memory systems in traditional operating systems that provide the appearance of large memory resources through data movement between fast and slow memory."

**Implementation:**
- Memory blocks (human, persona, context)
- Continual learning in token space
- Conversations API - shared memory across parallel experiences

**Why it matters for Clawdbot:**
- We need memory TIERS, not just memory search
- Fast tier = "what's connected right now" (always-loaded state)
- Slow tier = historical context (retrieved when needed)

#### 2. Generative Agents - Stanford Architecture
**Paper:** "Generative Agents: Interactive Simulacra of Human Behavior" (arXiv:2304.03442)

**Three-Component Architecture:**
1. **Observation** - Complete record of experiences in natural language
2. **Reflection** - Synthesize memories into higher-level reflections over time
3. **Retrieval** - Dynamically retrieve relevant memories to plan behavior

**Key Insight:** "Store a complete record of the agent's experiences using natural language, synthesize those memories over time into higher-level reflections"

**Why it matters:**
- We have observation (daily logs) and retrieval (memory_search)
- **MISSING:** Reflection layer that synthesizes daily logs into persistent state knowledge
- Example: "Wise API is connected" should be in a REFLECTION, not buried in daily logs

### Proposed Architecture Changes for Clawdbot

#### Tier 1: Fast Memory (Always-Loaded State)
**File:** `memory/STATE.md` (new)
**Content:**
```
## Connected Services & APIs
- Wise API: ✅ Connected (token in wise-credentials.json, profile ID 28947642)
- Gmail/Calendar (gog): ✅ Connected (OAuth configured)
- Discord: ✅ Connected (current session)

## Active Projects
- Style Swap app (projects/style-swap/)
- Clawdbot services setup for Jakob

## Current Context (Last 24h)
- Set up Wise spending tracker (scripts/wise-daily-tracker.ps1)
- PG Investments meeting scheduled for next week (Chairman introduction)
- TWG discovery call pending (waiting for Andi response)
```

**Rule:** Read STATE.md FIRST in EVERY session, before answering ANY question about what's connected/configured.

#### Tier 2: Reflection Layer (Synthesized Memory)
**Process:** Weekly review (Sundays) that:
1. Reads all daily logs from past week
2. Extracts significant STATE CHANGES (new connections, configs, decisions)
3. Updates STATE.md with current reality
4. Prunes outdated info from STATE.md

**Example Reflection:**
```
Daily log: "Set up Wise API token, created wise-credentials.json"
→ Reflection to STATE.md: "Wise API: ✅ Connected (token in wise-credentials.json)"
```

#### Tier 3: Archival Memory (Historical Context)
**Current system:** memory/YYYY-MM-DD.md + memory_search
**Keep as-is** - this works for historical recall

### Implementation Steps

1. **Create STATE.md** - Fast-access current state file
2. **Add to AGENTS.md** - Read STATE.md FIRST, always
3. **Build reflection script** - Weekly STATE.md update from daily logs
4. **Add state tracking** - When user configures something, update STATE.md immediately
5. **Proactive monitoring** - Heartbeat checks STATE.md for what to monitor

### Key Principle: "Check State Before Asking"
Before asking "do you have X configured?":
1. Check STATE.md
2. Check file system (e.g., wise-credentials.json exists?)
3. ONLY THEN ask if truly unknown

### References
- MemGPT paper: https://arxiv.org/abs/2310.08560
- Letta (formerly MemGPT): https://www.letta.com
- Generative Agents: https://arxiv.org/abs/2304.03442
- Letta GitHub: https://github.com/letta-ai/letta
