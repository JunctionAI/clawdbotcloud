# Model Orchestrator - Multi-Model Orchestration System

## Purpose
Route tasks to the cheapest viable model automatically. Opus for strategic/planning work, cheaper models (GPT-4o-mini, etc.) for coding and data processing. Track token usage per model and optimize costs.

## How It Works

1. **Intelligent Routing**
   - Analyzes task complexity and requirements
   - Routes to optimal model based on cost/capability trade-off
   - Tracks success rates per model/task-type

2. **Model Tiers**
   - **Strategic (Opus/Sonnet-4)**: Planning, architecture, complex reasoning
   - **Tactical (GPT-4, Claude-3)**: Code review, mid-complexity tasks
   - **Operational (GPT-4o-mini, GPT-3.5)**: Code generation, data processing, simple tasks

3. **Cost Optimization**
   - Real-time token usage tracking
   - Automatic downgrade suggestions
   - Monthly budget alerts
   - ROI analysis per model

4. **Quality Monitoring**
   - Track output quality per model
   - Auto-escalate if quality drops
   - Learn optimal routing over time

## Usage

**Route a Task:**
```javascript
const orchestrator = require('./scripts/model-orchestrator.js');

const result = await orchestrator.route({
  task: 'Generate API endpoint code',
  context: { language: 'Node.js', complexity: 'medium' }
});

console.log(`Used model: ${result.model}`);
console.log(`Cost: $${result.cost}`);
console.log(`Output: ${result.output}`);
```

**View Usage Stats:**
```bash
node scripts/model-orchestrator.cjs stats
```

**Optimize Routing:**
```bash
node scripts/model-orchestrator.cjs optimize
```

## Configuration

Edit `data/model-orchestrator/config.json`:
```json
{
  "models": {
    "strategic": {
      "primary": "anthropic/claude-opus-4",
      "fallback": "anthropic/claude-sonnet-4-5",
      "costPerMillion": 60.00
    },
    "tactical": {
      "primary": "openai/gpt-4",
      "fallback": "anthropic/claude-3-opus",
      "costPerMillion": 30.00
    },
    "operational": {
      "primary": "openai/gpt-4o-mini",
      "fallback": "openai/gpt-3.5-turbo",
      "costPerMillion": 0.15
    }
  },
  "routing": {
    "strategic": ["planning", "architecture", "complex reasoning"],
    "tactical": ["code review", "debugging", "analysis"],
    "operational": ["code generation", "data processing", "simple queries"]
  },
  "budgets": {
    "daily": 10.00,
    "monthly": 250.00
  }
}
```

## Integration Points

- **Scripts**: Use orchestrator for all AI calls
- **Morning Brief**: Daily cost report
- **STATE.json**: Track monthly spend
- **Alerts**: Budget threshold warnings

## Routing Logic

```javascript
// Example: Strategic task
orchestrator.route({
  task: 'Design system architecture for new feature',
  taskType: 'planning'
});
// → Routes to Opus/Sonnet-4

// Example: Operational task
orchestrator.route({
  task: 'Generate CRUD endpoint code',
  taskType: 'code-generation'
});
// → Routes to GPT-4o-mini (80% cheaper)
```

## Cost Tracking

Tracks:
- Tokens per model
- Cost per model
- Cost per task type
- Daily/weekly/monthly totals
- Potential savings from optimal routing

## Output Example

```
📊 MODEL USAGE STATS (Last 7 Days)

Strategic Tier (Opus/Sonnet-4):
  Requests: 45
  Tokens: 1.2M
  Cost: $72.00
  Avg per request: $1.60

Tactical Tier (GPT-4):
  Requests: 120
  Tokens: 2.8M
  Cost: $84.00
  Avg per request: $0.70

Operational Tier (GPT-4o-mini):
  Requests: 340
  Tokens: 8.5M
  Cost: $1.28
  Avg per request: $0.004

💰 COST SAVINGS:
  If all used Opus: $1,215.00
  Actual cost: $157.28
  Savings: $1,057.72 (87%)

✅ RECOMMENDATION:
  Consider using GPT-4o-mini for more code generation tasks.
  Current: 65% | Optimal: 85% | Potential savings: $12/month
```

## Dependencies

- OpenAI API
- Anthropic API
- Usage tracking database

