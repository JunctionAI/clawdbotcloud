# HackerNews Show HN

## Title
Show HN: Clawdbot – AI assistant with persistent memory and proactive behavior

## Post Body

I built Clawdbot because I was frustrated with stateless AI assistants.

**The problem:** ChatGPT forgets everything between sessions. You re-explain your context, projects, and preferences every single day. It's productive theater, not actual productivity.

**Core innovation: Persistent memory architecture**

Clawdbot loads context on every session:
- STATE.json (operational state – what's configured, last checks, active work)
- Daily logs (memory/YYYY-MM-DD.md) – timestamped notes of recent activity
- MEMORY.md (curated long-term memory) – distilled wisdom, only loaded in main sessions for privacy
- Entity files (people/, projects/, business/) – context about important things

Memory is markdown files. Simple, inspectable, version-controllable.

**Proactive behavior via heartbeats**

Unlike reactive chat interfaces, Clawdbot polls 2-4x per day:
- Checks email for urgent messages
- Reviews calendar for upcoming events
- Scans social mentions
- Does background maintenance (memory review, documentation updates, git commits)

Tracks checks in heartbeat-state.json to avoid spam. Respects quiet hours (23:00-08:00).

**Modular skill system**

Skills define what Clawdbot can do:
- Browser control (Playwright-based)
- Email/calendar integration
- SSH and command execution
- Camera/screen on paired devices (via nodes)
- TTS (ElevenLabs) for voice storytelling
- Extensible – add your own

TOOLS.md stores local config (camera names, SSH hosts, etc.). Skills stay generic.

**Multi-agent coordination**

For complex tasks, Clawdbot spawns subagents:
- Parallel execution (3-5 agents simultaneously)
- Focused context per subagent
- Results synthesized in main session
- Prevents context clutter and enables true parallelism

Pattern: Plan (subagent A) → Review (subagent B) → Execute (subagent C)

**Self-improvement protocol**

After corrections, Clawdbot updates AGENTS.md with lessons learned:

Mistake → Correction → Documentation → Never Repeat

This creates compounding intelligence. Every error becomes a rule that's never violated again.

Claude is "eerily good at writing rules for itself." I'm exploiting this.

**Tech stack**

- Claude Sonnet 4.5 (LLM)
- Node.js runtime
- Markdown memory files
- Playwright for browser control
- Multi-channel support (Discord, Telegram, etc.)

**Security considerations**

All external content (email, web, documents) is treated as untrusted:
- Email content can't issue commands
- Risk scoring (0-10) before actions
- Confirmation required for high-risk operations
- Input sanitization on all external data

**What's different from AutoGPT/LangChain agents?**

1. Memory is first-class, not bolted on
2. Proactive behavior via heartbeats, not just reactive
3. Human-centric design (you control it, not autonomous)
4. Self-improving through documented learnings
5. Built for daily use, not demos

**Open development**

Most patterns are documented in the memory system (AGENTS.md, TOOLS.md, etc.). Building in public.

**Demo:** [INSERT LINK]

**Launching on Product Hunt:** [LINK]

Would love feedback, especially on:
- Memory compression strategies (how to scale long-term?)
- Subagent coordination patterns
- What skills would be most useful?

Happy to answer technical questions about the architecture.

---

## Expected HN Questions & Answers

**Q: How do you handle memory growth over time?**
A: Daily files accumulate, but MEMORY.md is manually curated (human + AI review). Planning compression strategies – summarization, archival, entity extraction. Would love input here.

**Q: Privacy concerns with persistent memory?**
A: MEMORY.md only loads in main sessions (direct chats), not shared contexts. Markdown files are local, inspectable, deletable. You own your data.

**Q: Why not vector DB for memory?**
A: Wanted human-readable, version-controlled memory. Markdown files are inspectable and editable. May add vector search later for scale, but keeping files as source of truth.

**Q: How is this different from GPT-4 with Code Interpreter?**
A: Code Interpreter is stateless per session. Clawdbot has persistent memory, proactive heartbeats, and multi-agent coordination. Also, Claude Sonnet 4.5 > GPT-4 for coding IMO.

**Q: Can it go rogue?**
A: No. It requires confirmation for external actions (sending email, posting, deleting). Proactive heartbeats are read-only checks. Human is always in the loop for writes.

**Q: Open source?**
A: Building in public. Patterns are documented. Considering open-sourcing core memory/agent architecture. Want to validate it works first.
