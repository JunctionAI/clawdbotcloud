# AUTONOMOUS.md - 24/7 AI Workforce System

## Overview

This system enables PREP (Claude) to work autonomously 24/7 on Tom's PC, executing tasks from a queue without constant human oversight.

## Architecture

**CEO:** Tom — Sets direction, reviews output, approves external actions
**Orchestrator:** PREP (Claude Opus) — Strategy, task management, execution
**Workers:** Sub-agents, browser automation, local scripts

## How It Works

1. **Tasks are queued** in `task-queue.json`
2. **Heartbeats trigger** PREP to check the queue
3. **PREP picks up tasks** and executes them
4. **Results are logged** and reported
5. **External actions** (posting, emailing) require approval unless pre-authorized

## Task Types

### Higgsfield (Video/Image Generation)
- Navigate to Higgsfield
- Input prompts
- Generate content
- Download results
- Save to output folder

### Content (Writing)
- Generate copy, prompts, scripts
- Save to files
- No external dependencies

### Research
- Web searches
- Competitive analysis
- Data gathering
- Spawn sub-agents for parallel work

### Social (Drafts)
- Prepare social media posts
- Queue for approval
- Schedule when approved

## File Structure

```
autonomous/
├── AUTONOMOUS.md        # This file
├── task-queue.json      # The task queue
├── worker-log.json      # Execution log
├── output/              # Generated content
│   ├── higgsfield/      # Videos/images
│   ├── content/         # Written content
│   └── social/          # Social drafts
└── scripts/             # Automation scripts
```

## Triggering Work

PREP checks for work during:
1. Regular heartbeats
2. Explicit "check queue" commands
3. Scheduled cron jobs

## Safety

- External posts require approval
- Financial actions require approval
- Deletions require approval
- Content generation is autonomous
- Research is autonomous

## Commands

Tom can say:
- "Check the queue" — PREP processes pending tasks
- "Add task: [description]" — Adds to appropriate queue
- "Status" — Shows queue status
- "Pause autonomous" — Stops auto-execution
- "Resume autonomous" — Resumes auto-execution

## Current Status

**System:** ACTIVE
**Auto-execute:** ENABLED
**Last check:** Never (just created)
