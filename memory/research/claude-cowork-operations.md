# Claude Code / Cowork Operational Setup for Agencies

*Research compiled: 2025-02-06*

## Executive Summary

Claude Code (and Cowork, which is bundled into Team/Enterprise plans) is a powerful AI coding assistant that can be used to run an agency model. This document covers the technical architecture, rate limits, account structure, costs, concurrent sessions, and best practices for multi-client management.

---

## 1. How Does Claude Code/Cowork Work Technically?

### Architecture: Hybrid (Cloud + Local)

Claude Code operates as a **hybrid system**:

**Local Terminal/CLI Component:**
- Runs on developer's local machine (macOS, Linux, Windows, WSL)
- Reads/writes files directly on your filesystem
- Executes bash commands locally
- Connects to IDEs (VS Code, JetBrains)

**Cloud API Backend:**
- All AI inference happens on Anthropic's servers
- Uses the Claude API (same models as API: Sonnet 4.5, Opus 4.6, etc.)
- Subscription billing through Claude.ai accounts
- Optional: Can use AWS Bedrock or Google Vertex AI for enterprise compliance

**Claude Code on the Web:**
- Full cloud execution on Anthropic-managed VMs
- Repository cloned to isolated virtual machine
- Network access configured based on settings
- Good for parallel tasks - can kick off multiple from terminal with `&` prefix
- Accessible via claude.ai/code or Claude iOS app

### Technical Flow:
1. User runs `claude` command locally or starts web session
2. Claude Code analyzes codebase context (reads files, git status, etc.)
3. Sends prompts + context to Claude API
4. Receives responses and executes actions (with permission prompts)
5. All token usage billed through account subscription + extra usage

### Key Technical Points:
- **No local compute for inference** - all AI processing is cloud-based
- **Local file system access** - Claude Code reads/writes files directly
- **Permission-based architecture** - user approves actions before execution
- **Context window**: 200K tokens (≈500 pages)
- **Automatic context management** - long conversations are automatically summarized

---

## 2. Rate Limits and Maximizing Throughput

### Plan-Based Usage Limits

Usage limits are **per-user** and **time-based** (reset every 5 hours for session limits, 7 days for weekly limits).

| Plan | Usage Multiplier vs Pro | Weekly Limits | Session Reset |
|------|------------------------|---------------|---------------|
| Pro | 1x baseline | Yes | 5 hours |
| Max 5x | 5x Pro | Cross-model + Sonnet-specific | 7 days |
| Max 20x | 20x Pro | Cross-model + Sonnet-specific | 7 days |
| Team Standard | 1.25x Pro | Yes | 7 days |
| Team Premium | 6.25x Pro | Cross-model + Sonnet-specific | 7 days |
| Enterprise Standard | Similar to Team Standard | Configurable | Configurable |
| Enterprise Premium | Higher than Team Premium | Configurable | Configurable |

### Factors Affecting Limits:
- Conversation length and complexity
- Features used (extended thinking, research mode consume more)
- Model selection (Opus uses more than Sonnet)
- **Shared across** Claude.ai, Claude Code, and Claude Desktop

### Maximizing Throughput:

1. **Enable Extra Usage** (pay-as-you-go at API rates when limits hit)
   - Pro/Max: Individual setting in claude.ai/settings/usage
   - Teams/Enterprise: Organization Owner enables with spend caps

2. **Use Multiple Accounts Strategically**
   - Each seat has independent usage limits
   - Premium seats get 5x-6.25x more than Standard

3. **Leverage Claude Code on the Web for Parallel Work**
   - Use `&` prefix to send tasks to web sessions
   - Run multiple independent tasks simultaneously
   - Each web session runs autonomously

4. **Prompt Optimization**
   - Use Projects for caching (significant benefits)
   - Batch similar requests in one message
   - Be specific and concise
   - Use CLAUDE.md for project-specific context (reduces back-and-forth)

5. **API-Based Approach for Heavy Workloads**
   - Claude Console account with API credits
   - No session limits, only rate limits (tokens/minute)
   - Batch processing at 50% discount

### API Rate Limits (for Console/API users):
Rate limits vary by tier and increase with usage/spend. Contact Anthropic for enterprise tier limits.

---

## 3. Account Structure for Agencies

### Recommended Models:

#### Option A: Centralized Agency Account (Team Plan)
**Best for:** Agencies managing work internally

```
Agency Team Plan ($25/seat/month)
├── Agency Owner (Primary Owner)
├── Developer 1 (Premium Seat - $125/month)
├── Developer 2 (Premium Seat - $125/month)
├── Developer 3 (Standard Seat - $25/month)
└── ... up to 75 seats
```

**Pros:**
- Centralized billing and administration
- SSO and domain capture
- Admin controls for permissions
- Usage analytics across team
- Organization-wide spend controls

**Cons:**
- Usage shared within org limits
- Need Enterprise for >75 seats
- Client isolation requires careful project management

#### Option B: Client-Dedicated Accounts
**Best for:** Agencies with compliance requirements or client-owned repos

```
Per Client:
├── Client 1: Max 20x ($200/month) or Team Plan
├── Client 2: Pro ($20/month)
├── Client 3: Enterprise (custom)
```

**Pros:**
- Complete client isolation
- Client-specific billing
- Different security postures per client

**Cons:**
- More administrative overhead
- No centralized management
- Harder to share resources

#### Option C: API-Based (Claude Console)
**Best for:** Building custom automation, high-volume workflows

```
Agency Console Account
├── Workspace per Client (cost center tracking)
├── API keys per project
└── Pay-per-use billing
```

**Pros:**
- Most flexible for custom tooling
- Granular cost tracking per workspace
- No seat limits
- Batch processing discounts (50% off)

**Cons:**
- No interactive Claude Code features
- Requires more technical setup
- Must build own interfaces

### Hybrid Recommendation:
- **Team Plan** for agency staff doing interactive development
- **API Console** workspaces for automated pipelines, CI/CD, batch processing
- **Client-specific accounts** only when compliance requires isolation

---

## 4. Actual Costs Breakdown

### Subscription Tiers (February 2025)

| Plan | Monthly Cost | Annual Discount | Included |
|------|-------------|-----------------|----------|
| Free | $0 | - | Limited usage, web chat only |
| Pro | $20/mo ($17 annual) | 15% | Claude Code access, 1x usage |
| Max 5x | $100/mo | None | 5x usage, priority access |
| Max 20x | $200/mo | None | 20x usage, early features |
| Team Standard | $25/seat/mo ($20 annual) | 20% | Claude Code + Cowork, SSO |
| Team Premium | $125/seat/mo ($100 annual) | 20% | 5x usage, higher limits |
| Enterprise | Custom | Custom | Enhanced features, compliance |

### Extra Usage (Pay-As-You-Go) Pricing

When subscription limits are exhausted, usage continues at standard API rates:

| Model | Input | Output | Cache Write | Cache Read |
|-------|-------|--------|-------------|------------|
| **Opus 4.6** | $5/MTok (≤200K), $10/MTok (>200K) | $25/MTok (≤200K), $37.50/MTok (>200K) | $6.25/MTok | $0.50/MTok |
| **Sonnet 4.5** | $3/MTok (≤200K), $6/MTok (>200K) | $15/MTok (≤200K), $22.50/MTok (>200K) | $3.75/MTok | $0.30/MTok |
| **Haiku 4.5** | $1/MTok | $5/MTok | $1.25/MTok | $0.10/MTok |

*MTok = Million tokens. ~750 words per 1K tokens.*

### Additional Tool Costs:
- **Web search**: $10/1K searches
- **Code execution**: $0.05/hour/container (50 free hours/day/org)

### Example Agency Cost Scenarios:

**Small Agency (3 developers, moderate use):**
```
2x Team Premium seats: $250/month
1x Team Standard seat: $25/month
Extra usage buffer: ~$100/month
────────────────────────────
Total: ~$375/month
```

**Medium Agency (10 developers, heavy use):**
```
5x Team Premium seats: $625/month
5x Team Standard seats: $125/month
Extra usage: ~$500/month
────────────────────────────
Total: ~$1,250/month
```

**Enterprise/API-Heavy Agency:**
```
Enterprise base: Custom (contact sales)
API usage: Variable based on volume
Batch processing: 50% discount on regular API rates
```

---

## 5. Concurrent Agent Sessions

### Realistic Concurrent Session Limits

**Per Account (Subscription-based):**
- No hard limit on concurrent sessions
- Practical limit: **1-3 active sessions per seat** before hitting usage limits
- Claude Code on web: Can run **multiple parallel tasks** from terminal
- Each user can only be in one active interactive session at a time

**Per Organization (Team/Enterprise):**
- Sessions are per-seat, not shared
- 10 Premium seats = 10 concurrent interactive sessions possible
- Web sessions can multiply this for async work

**API-Based Concurrent Sessions:**
- Limited by rate limits (requests/minute, tokens/minute)
- Scale with tier increases
- No hard session cap - limited by API capacity

### Parallel Work Patterns:

**From Terminal (Claude Code on Web):**
```bash
# Start multiple web sessions
& Fix the flaky test in auth.spec.ts
& Update the API documentation  
& Refactor the logger to use structured output

# Monitor with /tasks
/tasks
```

**From CI/CD (GitHub Actions):**
- Each workflow run is independent
- Limited by GitHub Actions minutes + API costs
- Can run multiple workflows in parallel

**Headless/Programmatic:**
```bash
# Multiple parallel processes
claude -p "Task 1" --output-format json &
claude -p "Task 2" --output-format json &
claude -p "Task 3" --output-format json &
wait
```

### Practical Limits for Agencies:
- **Interactive development**: 1 session per developer actively working
- **Background/async tasks**: 3-5 web sessions per developer
- **CI/CD automation**: Unlimited (constrained by API rate limits)
- **Batch processing**: High volume, 50% discount, async

---

## 6. Best Practices for Multi-Client Agent Management

### Project Organization

**1. Use CLAUDE.md per Repository**
```
repo/
├── CLAUDE.md           # Project context, standards, conventions
├── .claude/
│   ├── settings.json   # Project-specific permissions
│   └── agents/         # Custom subagents for this project
└── ...
```

**2. Standardize CLAUDE.md Templates**
Create agency-wide templates for:
- Code style guidelines
- Review criteria
- Security requirements
- Client-specific rules

### Permissions & Security

**1. Managed Settings for Agency Policies**
Deploy `managed-settings.json` to standardize:
```json
{
  "permissions": {
    "deny": ["Bash(curl *)", "Bash(wget *)"],
    "allow": ["Read", "Edit", "Bash(npm *)"]
  },
  "disableBypassPermissionsMode": "disable"
}
```

**2. Per-Project Permission Overrides**
In `.claude/settings.json`:
```json
{
  "permissions": {
    "deny": ["Read(./.env)", "Read(./secrets/**)"]
  }
}
```

**3. MCP Server Controls**
Allowlist approved MCP servers in managed settings:
```json
{
  "allowedMcpServers": [{"serverName": "github"}],
  "deniedMcpServers": [{"serverName": "filesystem"}]
}
```

### Cost Management

**1. Organization-Wide Spend Caps**
Set in Admin Settings > Usage:
- Organization monthly cap
- Per-seat-tier caps
- Per-user individual caps

**2. Monitor Usage with OpenTelemetry**
Enable telemetry for detailed tracking:
```json
{
  "env": {
    "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
    "OTEL_METRICS_EXPORTER": "otlp",
    "OTEL_EXPORTER_OTLP_ENDPOINT": "http://collector.agency.com:4317"
  }
}
```

Track metrics:
- `claude_code.cost.usage` - Cost per session
- `claude_code.token.usage` - Token consumption by type
- `claude_code.session.count` - Adoption tracking

**3. Use Batch Processing for Bulk Work**
- 50% discount on API rates
- Async processing (up to 24h delivery)
- Ideal for: code reviews, documentation updates, translations

### Client Isolation

**1. Separate Workspaces (API Console)**
Create per-client workspaces for:
- Cost tracking and billing
- API key isolation
- Usage analytics per client

**2. Git-Based Isolation**
- Each client = separate repository
- Project settings isolated in `.claude/`
- Use `.claude/settings.local.json` for developer-specific config (gitignored)

**3. Enterprise Features for Strict Isolation**
- SCIM for user provisioning
- Audit logs
- Custom data retention
- Network-level access controls

### Automation & CI/CD

**1. GitHub Actions Integration**
```yaml
- uses: anthropics/claude-code-action@v1
  with:
    anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
    claude_args: "--max-turns 10"
```

**2. Custom Hooks for Standardization**
```json
{
  "hooks": {
    "SessionStart": [{
      "matcher": "startup",
      "hooks": [{"type": "command", "command": "npm install"}]
    }]
  }
}
```

**3. Headless Mode for Scripts**
```bash
claude -p "Generate changelog for v1.2.0" \
  --allowedTools "Bash(git *),Read" \
  --output-format json
```

### Team Training & Standards

1. **Create Agency-Wide AGENTS.md**
   - Standard workflows
   - Security protocols
   - Cost awareness guidelines

2. **Document Common Patterns**
   - Code review workflows
   - Bug fix protocols
   - Feature implementation patterns

3. **Regular Usage Reviews**
   - Monitor per-developer usage
   - Identify optimization opportunities
   - Adjust seat allocations

---

## Summary Recommendations

| Need | Recommendation |
|------|---------------|
| **Small agency (<5 devs)** | Team Plan with Premium seats |
| **Medium agency (5-20 devs)** | Team Plan, mix Premium/Standard |
| **Large agency (>20 devs)** | Enterprise with Premium seats |
| **High automation needs** | API Console + Team Plan hybrid |
| **Client compliance required** | Per-client accounts or Enterprise |
| **Cost control critical** | Set spend caps, use Standard seats, enable batch processing |
| **Maximum throughput** | Premium seats + Extra Usage enabled |

---

## Key Takeaways

1. **Claude Code is cloud-based AI inference with local execution** - no local compute for inference
2. **Rate limits are per-user, time-based** - 5-hour session resets, 7-day weekly resets
3. **Extra Usage enables pay-as-you-go** at standard API rates when subscription limits exhausted
4. **Team Plan best for agencies** - centralized management, up to 75 seats
5. **Concurrent sessions limited practically by usage** - plan for 1-3 active sessions per seat
6. **Use managed settings, CLAUDE.md, and monitoring** for multi-client management

---

*Sources: code.claude.com/docs, support.claude.com, claude.com/pricing - February 2025*
