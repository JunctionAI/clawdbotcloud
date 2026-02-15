# Agent Schedules

Each agent has their own schedule file in this directory.
Format: `{agent-name}.json`

## Structure

```json
{
  "agent": "FURY",
  "role": "Design & Creative",
  "status": "active",
  "currentTask": null,
  "queue": [
    {
      "id": "task-001",
      "title": "Create LinkedIn post graphics",
      "priority": "high",
      "blockedBy": null,
      "estimatedMinutes": 30,
      "status": "pending"
    }
  ],
  "completed": [],
  "lastActive": "2026-02-12T11:00:00Z"
}
```

## Blocked vs Autonomous

- `blockedBy: null` = Agent can work on this NOW
- `blockedBy: "tom"` = Needs Tom's input/approval
- `blockedBy: "agent-name"` = Waiting on another agent

## The Goal

Agents should have FULL queues of autonomous work.
Only escalate to Tom when absolutely necessary.
