# Local Models - Local Model Integration Framework

## Purpose
Framework for integrating local models (Ollama, etc.), defining when to use local vs. API models, cost/privacy trade-off logic. Prepare for Mac Studio setup.

## How It Works

1. **Model Management**
   - Install and manage local models (Ollama, LLaMA, etc.)
   - Track available models and capabilities
   - Auto-download models on demand

2. **Routing Logic**
   - **Local**: Sensitive data, high-volume, development/testing
   - **API**: Complex reasoning, production, time-critical

3. **Privacy-First**
   - Automatically route sensitive data to local models
   - Detect PII and financial data
   - Never send private data to API models

4. **Cost Optimization**
   - Track local vs. API costs
   - Recommend optimal routing
   - Simulate cost savings

## Usage

**Check Local Models:**
```bash
node scripts/local-models.cjs list
```

**Route Task:**
```javascript
const localModels = require('./scripts/local-models.js');

const result = await localModels.route({
  task: 'Analyze customer data',
  containsPII: true  // Force local
});
```

**Install Model:**
```bash
node scripts/local-models.cjs install llama3
```

## Configuration

Edit `data/local-models/config.json`:
```json
{
  "provider": "ollama",
  "endpoint": "http://localhost:11434",
  "models": {
    "llama3": {
      "useCases": ["code-generation", "analysis", "chat"],
      "maxContextTokens": 8192,
      "speedRating": 8
    },
    "codellama": {
      "useCases": ["code-generation", "code-review"],
      "maxContextTokens": 16384,
      "speedRating": 7
    },
    "mistral": {
      "useCases": ["general", "chat", "analysis"],
      "maxContextTokens": 32768,
      "speedRating": 9
    }
  },
  "routing": {
    "preferLocal": [
      "development",
      "testing",
      "sensitive-data",
      "high-volume"
    ],
    "preferAPI": [
      "production",
      "complex-reasoning",
      "time-critical"
    ]
  },
  "privacy": {
    "piiDetection": true,
    "financialDataDetection": true,
    "autoRouteLocal": true
  }
}
```

## Privacy Detection

Automatically detects:
- Email addresses
- Phone numbers
- Credit card numbers
- SSN, passport numbers
- Financial data
- Health information

→ Routes to local models automatically

## Cost Comparison

```
📊 LOCAL vs API COST ANALYSIS (30 days)

Local Models (Ollama):
  Requests: 450
  Tokens: 12M
  Cost: $0.00 (electricity: ~$5/month)
  Avg latency: 1.2s

API Models (if used instead):
  Estimated requests: 450
  Estimated tokens: 12M
  Estimated cost: $72.00
  Avg latency: 0.8s

💰 SAVINGS: $67.00/month
⚡ TRADEOFF: +0.4s latency per request
✅ PRIVACY: 450 requests kept private
```

## Mac Studio Setup

Optimized for Mac Studio:
- Utilizes M2/M3 Ultra GPU
- Metal acceleration
- Large RAM for big models
- Local inference at API speeds

**Setup Script:**
```bash
node scripts/local-models.cjs setup-mac-studio
```

## Integration Points

- **Model Orchestrator**: Routes to local when appropriate
- **Prompt Injection Protection**: Scans locally, no data leak
- **Development**: All dev tasks use local models
- **Morning Brief**: Local model usage stats

## Dependencies

- Ollama (or LM Studio, LocalAI)
- 16GB+ RAM recommended
- Apple Silicon for best performance

