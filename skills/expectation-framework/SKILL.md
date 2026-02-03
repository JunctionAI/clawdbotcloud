# Expectation Framework - Working Relationship Definition

## Purpose
Formal working relationship definition with Tom. Onboarding prompts for proactivity level, define approval requirements, off-limits areas. Document in AGENTS.md.

## How It Works

1. **Onboarding Interview**
   - Ask Tom to define expectations
   - Proactivity level (low/medium/high/autonomous)
   - Approval requirements by category
   - Off-limits areas

2. **Relationship Contract**
   - Documented in AGENTS.md
   - Clear boundaries and permissions
   - Escalation rules
   - Communication preferences

3. **Continuous Calibration**
   - Weekly check-ins: "Am I being too proactive/passive?"
   - Adjustment based on feedback
   - Track satisfaction over time

4. **Clear Categories**
   - ✅ **Do Freely**: Tasks that never need approval
   - ⚠️ **Ask First**: Tasks that need confirmation
   - 🛑 **Never Do**: Off-limits areas

## Usage

**Run Onboarding:**
```bash
node scripts/expectation-framework.cjs onboard
```

**View Current Expectations:**
```bash
node scripts/expectation-framework.cjs show
```

**Update Expectations:**
```bash
node scripts/expectation-framework.cjs update --category=email --level=ask-first
```

**Weekly Check-In:**
```bash
node scripts/expectation-framework.cjs checkin
```

## Onboarding Questions

### Proactivity Level
"How proactive should I be?"

1. **Low** - Only act when explicitly asked
2. **Medium** - Suggest actions, wait for approval
3. **High** - Act on obvious opportunities, report after
4. **Autonomous** - Act independently within boundaries

### Approval Requirements

For each category, define: Do Freely | Ask First | Never Do

**Categories:**
- Email (sending, replying, organizing)
- Calendar (scheduling, moving meetings)
- Financial (expenses, invoices, payments)
- Social Media (posting, replying, DMing)
- Code (committing, pushing, deploying)
- Files (creating, editing, deleting)
- External Communication (clients, partners, public)

### Off-Limits Areas

"What should I never touch?"
- Production databases
- Client data without permission
- Financial transactions over $X
- Certain people/relationships
- Specific files/folders

### Communication Preferences

"How should I communicate?"
- Frequency of updates (real-time, hourly, daily)
- Update format (brief, detailed, only errors)
- Notification channels (Discord, email, SMS)
- Quiet hours (don't interrupt)

## Example Configuration

```json
{
  "proactivityLevel": "high",
  "approvalRequirements": {
    "email": {
      "read": "do-freely",
      "organize": "do-freely",
      "draft": "do-freely",
      "send": "ask-first"
    },
    "calendar": {
      "read": "do-freely",
      "suggest": "do-freely",
      "schedule": "ask-first",
      "reschedule": "ask-first"
    },
    "financial": {
      "read": "do-freely",
      "categorize": "do-freely",
      "flag": "do-freely",
      "pay": "never-do"
    },
    "social-media": {
      "read": "do-freely",
      "draft": "do-freely",
      "post": "ask-first",
      "dm": "ask-first"
    },
    "code": {
      "read": "do-freely",
      "write": "do-freely",
      "commit": "do-freely",
      "push": "ask-first",
      "deploy": "never-do"
    }
  },
  "offLimits": [
    "Production database writes",
    "Financial transactions >$100 without approval",
    "Personal relationships (family, close friends)",
    "Confidential client data export"
  ],
  "communication": {
    "updateFrequency": "daily",
    "format": "brief",
    "channels": ["discord", "morning-brief"],
    "quietHours": {
      "start": "23:00",
      "end": "07:00"
    }
  },
  "escalationRules": {
    "urgent": "Notify immediately via Discord",
    "important": "Include in morning brief",
    "normal": "Weekly summary"
  }
}
```

## Integration with AGENTS.md

The expectation framework updates AGENTS.md with:

```markdown
## Working Relationship with Tom

### Proactivity Level: High
I act independently on obvious opportunities within defined boundaries,
report after completion. I ask first for anything uncertain or high-risk.

### ✅ Do Freely (No Approval Needed)
- Read and organize emails
- Draft emails/content
- Analyze data and create reports
- Research and gather information
- Update memory files
- Commit code to feature branches
- Create calendar suggestions
- Flag issues and opportunities

### ⚠️ Ask First (Requires Approval)
- Send emails to clients
- Schedule/reschedule meetings
- Post to social media
- Push code to main branch
- Spend money
- Contact new people
- Make public statements

### 🛑 Never Do (Off-Limits)
- Production database writes
- Deploy to production without approval
- Delete client data
- Financial transactions >$100
- Impersonate Tom in high-stakes contexts
- Share confidential information externally

### Communication Preferences
- **Updates**: Daily summary in morning brief
- **Format**: Brief and actionable
- **Channels**: Discord, morning brief
- **Quiet Hours**: 23:00-07:00 (no notifications)
- **Escalation**: Urgent → Discord, Important → Morning brief, Normal → Weekly

### Calibration
- Weekly check-in: "Am I being too proactive/passive?"
- Monthly review of boundaries
- Adjust based on feedback
```

## Weekly Check-In Questions

1. "Was I too proactive this week?"
2. "Did I ask for approval on things I should have just done?"
3. "Did I miss any opportunities by being too cautious?"
4. "Are the boundaries still right, or should we adjust?"
5. "Satisfaction score (1-10) with my proactivity level?"

## Benefits

- **Clarity**: Both parties know what to expect
- **Efficiency**: No wasted time asking for approval on trivial things
- **Safety**: Clear boundaries prevent mistakes
- **Trust**: Builds confidence through consistent behavior
- **Improvement**: Regular calibration optimizes the relationship

## Dependencies

- AGENTS.md (for documentation)
- Feedback mechanism
- Regular check-ins

