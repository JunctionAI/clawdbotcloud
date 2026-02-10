# CCPM + Clawdbot Subagent Integration

This document explains how to use CCPM (Claude Code PM) with Clawdbot's existing subagent system for parallel task execution.

## Overview

CCPM provides structured project management (PRDs → Epics → Tasks). Clawdbot's subagent system provides parallel execution. Together they enable:

1. **Structured planning** via CCPM commands
2. **Parallel execution** via subagent spawning
3. **Progress tracking** via CCPM status commands

## Quick Start

### Create a PRD
```
/pm:prd-new <feature-name>
```
Interactive brainstorming session → creates `.claude/prds/<feature-name>.md`

### Convert PRD to Epic
```
/pm:prd-parse <feature-name>
```
Creates technical implementation plan → `.claude/epics/<feature-name>/epic.md`

### Break Epic into Tasks
```
/pm:epic-decompose <feature-name>
```
Creates task files → `.claude/epics/<feature-name>/001.md`, `002.md`, etc.

### Start Work with Subagents
```
/pm:epic-start <feature-name>
```
Or manually spawn subagents for parallel tasks.

## Subagent Work Patterns

### Pattern 1: Single Task Assignment

Spawn one subagent per task:
```markdown
Spawn subagent for Task 002:
- Label: ally-launch-002
- Task: Implement landing page per .claude/epics/ally-launch/002.md
- Report back when complete
```

### Pattern 2: Stream-Based Assignment

Group related tasks by work stream:
```markdown
Spawn subagent for Frontend Stream:
- Label: ally-launch-frontend
- Tasks: 002 (Landing), 007 (PWA)
- Files: /web/*, /components/*
- Coordinate via progress files
```

### Pattern 3: Parallel Batch Processing

Spawn multiple agents simultaneously:
```markdown
Spawning 3 subagents for ally-launch:

Agent 1 (Brand/Design):
- Task 001: Brand identity
- Task 010: Marketing materials

Agent 2 (Backend):  
- Task 003: Stripe pricing
- Task 009: Family plan

Agent 3 (Frontend):
- Task 002: Landing page
- Task 004: Onboarding
- Task 007: PWA
```

## Task File Format

Each task file includes:

```yaml
---
name: Task Title
status: open | in-progress | completed | blocked
created: ISO-8601 datetime
updated: ISO-8601 datetime
github: # Synced GitHub issue URL
depends_on: [001, 002]  # Blocking tasks
parallel: true | false   # Can run alongside others
conflicts_with: [003]    # Same-file conflicts
---
```

## Status Updates

### Subagent → Main Agent

When a subagent completes work:
1. Update task status in frontmatter
2. Update `updated` timestamp
3. Report completion to main agent

### Checking Progress

Main agent can check status:
```
/pm:epic-status ally-launch
/pm:in-progress
/pm:blocked
```

## File Ownership

To avoid conflicts, assign file patterns to agents:

| Stream | Agent | File Patterns |
|--------|-------|---------------|
| Brand | Designer | `/brand/*`, `/design/*` |
| Frontend | FE Dev | `/web/*`, `/components/*` |
| Backend | BE Dev | `/api/*`, `/services/*` |
| Mobile | Mobile Dev | `/mobile/*`, `/pwa/*` |

## Coordination Rules

1. **Never modify files outside your assigned patterns**
2. **Commit early and often** — smaller commits = fewer conflicts
3. **Update progress files** when completing milestones
4. **Report blockers immediately** — don't wait
5. **Pull before pushing** — stay synchronized

## Progress File Convention

Each stream maintains:
```markdown
# .claude/epics/<epic>/updates/stream-<name>.md
---
stream: Frontend
agent: fe-subagent
started: 2026-02-04T20:00:00Z
status: in-progress
---

## Completed
- Landing page hero section
- Navigation component

## Working On
- Features page
- Pricing page

## Blocked
- Need final brand colors (waiting on 001)
```

## Commands Reference

| Command | Purpose |
|---------|---------|
| `/pm:prd-new <name>` | Create new PRD |
| `/pm:prd-parse <name>` | Convert PRD to Epic |
| `/pm:epic-decompose <name>` | Break into tasks |
| `/pm:epic-start <name>` | Begin work |
| `/pm:epic-status <name>` | Check progress |
| `/pm:epic-sync <name>` | Sync to GitHub |
| `/pm:issue-start <number>` | Start specific task |
| `/pm:in-progress` | List active work |
| `/pm:blocked` | List blocked items |
| `/pm:standup` | Generate status report |

## Example: Working on Ally Launch

```markdown
# Main Agent Session

1. Review epic:
   /pm:epic-show ally-launch

2. Identify parallel tasks:
   - 001 must complete first (brand)
   - Then 002, 003, 006, 010 can run in parallel

3. Spawn subagent for 001:
   "Start task 001 - Brand identity. Read .claude/epics/ally-launch/001.md 
    and deliver all brand assets."

4. Once 001 completes, spawn parallel agents:
   - Agent A: Tasks 002 + 007 (Landing + PWA)
   - Agent B: Tasks 003 + 009 (Pricing + Family)
   - Agent C: Tasks 004 + 005 (Onboarding + Integrations)
   - Agent D: Task 010 (Marketing)

5. Monitor progress:
   /pm:epic-status ally-launch

6. Handle blockers and coordinate as needed
```

## Tips

- **Start with blocking tasks** — identify and complete them first
- **Batch independent tasks** — spawn multiple agents for parallel work
- **Use labels** — name subagents clearly (e.g., `ally-launch-frontend`)
- **Check conflicts_with** — avoid assigning conflicting tasks to same agent
- **Sync regularly** — run `/pm:epic-sync` to update GitHub issues
