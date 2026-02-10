# Email to Tom's Network

**Subject:** I built the AI assistant I always wanted (launching today)

---

Hey [First Name],

Quick one – I'm launching something today and wanted to share with you first.

**The problem I had:**

Every morning, I'd open ChatGPT and explain my entire context again. My projects, my preferences, my setup. It was like talking to someone with amnesia.

I kept thinking: "Why doesn't my AI remember me?"

**So I built Clawdbot.**

It's Claude Sonnet 4.5, but with real memory:
- Persistent knowledge across all conversations
- Proactive heartbeats (checks email, calendar, mentions 2-4x/day)
- Real skills (browser control, email, SSH, cameras, voice)
- Spawns subagents for complex work
- Self-improves by documenting learnings

**The difference:**

With ChatGPT, every conversation starts from zero.

With Clawdbot, it knows:
- Your ongoing projects
- Your preferences and style
- Important people and context
- What you worked on yesterday

It's the AI assistant I always wanted but couldn't find.

**Launching on Product Hunt today:**
[PRODUCT HUNT LINK]

Would mean a lot if you could check it out and share any feedback. Also happy to answer questions if you're curious about the architecture.

Building this in public – it's been a wild ride.

Thanks,
Tom

P.S. - Clawdbot actually drafted most of this email. Then I edited it. That's the workflow: AI does heavy lifting, I add the human touch. 🤖

---

## Variation: For Technical Audience

**Subject:** Built an AI assistant with real memory architecture (launching today)

Hey [First Name],

Launching Clawdbot today – thought you might find the architecture interesting.

**Core innovation: Persistent memory system**

Unlike ChatGPT's stateless sessions, Clawdbot has:
- STATE.json (fast-tier operational state)
- Daily logs (memory/YYYY-MM-DD.md)
- Long-term curated memory (MEMORY.md)
- Entity files (people/, projects/, business/)

On every session startup, it loads relevant context. It actually remembers.

**Proactive behavior via heartbeats:**

Most AI is reactive. Clawdbot is proactive:
- Polls 2-4x per day
- Checks email, calendar, mentions
- Does background maintenance
- Reaches out when something needs attention

Tracks checks in heartbeat-state.json to avoid spam.

**Modular skill system:**

Browser control, email/calendar, SSH, cameras, TTS, etc.
Skills define capabilities, TOOLS.md stores local config.
Extensible – add your own.

**Subagent coordination:**

For complex tasks, spawns focused subagents:
- Parallel execution (3-5 agents at once)
- Clean context separation
- Results synthesized in main session

**Self-improvement protocol:**

After corrections, updates AGENTS.md with lessons learned.
Mistake → Correction → Documentation → Never Repeat
Compounding intelligence.

**Launching on Product Hunt today:**
[PRODUCT HUNT LINK]

Would love your technical feedback. Happy to discuss the architecture if you're interested.

Tom

P.S. - Built on Claude Sonnet 4.5. Open development – most patterns are documented in the memory system.
