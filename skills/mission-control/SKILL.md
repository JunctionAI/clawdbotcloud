# Mission Control Dashboard - Kanban Task Tracking

## Purpose
Kanban board tracking all autonomous tasks with activity feed, status columns (To Do → In Progress → Review → Complete), web interface accessible locally, auto-updates as tasks progress.

## How It Works

1. **Task Tracking**
   - All autonomous tasks logged to `data/mission-control/tasks.json`
   - Status: To Do, In Progress, Review, Complete
   - Metadata: priority, estimated time, tags, assignee

2. **Web Dashboard**
   - Real-time Kanban board at `http://localhost:3100`
   - Drag-and-drop task management
   - Activity feed showing completed work
   - Filter by project, priority, date

3. **Auto-Updates**
   - Scripts log progress automatically
   - Heartbeat updates status
   - Morning brief shows daily summary

4. **Integration**
   - All automation scripts report to Mission Control
   - Sub-agents register tasks automatically
   - Email/calendar/project updates feed activity stream

## Usage

**Start Dashboard:**
```bash
node scripts/mission-control.cjs
```

Then visit: `http://localhost:3100`

**Add Task:**
```bash
node scripts/mission-control.cjs add --title="Task name" --priority=high
```

**Update Status:**
```bash
node scripts/mission-control.cjs update --id=123 --status=in-progress
```

**Activity Log:**
```bash
node scripts/mission-control.cjs activity
```

## Dashboard Features

- **Kanban Board**: Drag-and-drop columns
- **Activity Feed**: Real-time updates
- **Task Details**: Click to expand
- **Filters**: By project, priority, date range
- **Search**: Full-text search
- **Stats**: Tasks completed today/week/month

## Integration Points

- **Morning Brief**: Daily task summary
- **Heartbeat**: Auto-update task status
- **Sub-agents**: Register tasks on spawn
- **Scripts**: Log progress via API
- **STATE.json**: Sync active tasks

## Task Schema

```json
{
  "id": "task-123",
  "title": "Build trend monitoring system",
  "status": "in-progress",
  "priority": "high",
  "tags": ["automation", "AI"],
  "project": "Clawdbot",
  "assignee": "autonomous-agent",
  "estimatedHours": 4,
  "createdAt": "2026-02-03T10:00:00Z",
  "updatedAt": "2026-02-03T12:00:00Z",
  "completedAt": null
}
```

## API

The dashboard exposes a REST API:

- `GET /api/tasks` - List all tasks
- `POST /api/tasks` - Create task
- `PATCH /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/activity` - Activity feed
- `GET /api/stats` - Dashboard stats

## Dependencies

- Node.cjs + Express for server
- Simple HTML/CSS/JS frontend (no build step)
- JSON file storage (no database needed)

