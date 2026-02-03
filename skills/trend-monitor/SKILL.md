# Trend Monitor - Proactive Trend Monitoring + Autonomous Feature Building

## Purpose
Monitor X/Twitter for trending topics relevant to Tom's business, autonomously design and build features based on trends, create GitHub pull requests, and include in morning brief with demos/prototypes.

## How It Works

1. **Trend Detection**
   - Monitors X/Twitter for supplement industry, e-commerce, AI trends
   - Tracks hashtags, influencers, and viral topics
   - Scores relevance to Tom's businesses (DBH, apps portfolio, Junction Media)

2. **Autonomous Feature Design**
   - Analyzes trend → business opportunity mapping
   - Generates feature specs, wireframes, and implementation plans
   - Estimates ROI and effort

3. **Autonomous Building**
   - Creates working prototypes/demos
   - Writes clean, production-ready code
   - Never pushes to production - always creates PR

4. **Morning Brief Integration**
   - Summarizes trends found overnight
   - Shows demos/prototypes with screenshots
   - Recommends top 3 opportunities

## Usage

**Manual Run:**
```bash
node scripts/trend-monitor.cjs
```

**Automatic:**
- Runs every 6 hours via heartbeat
- Results cached in `data/trends/`
- Morning brief shows overnight discoveries

**Commands:**
- `node scripts/trend-monitor.cjs scan` - Scan for trends now
- `node scripts/trend-monitor.cjs build --trend-id=123` - Build feature for specific trend
- `node scripts/trend-monitor.cjs report` - Generate trend report

## Configuration

Edit `data/trends/config.json`:
```json
{
  "monitoredTopics": [
    "supplement industry",
    "e-commerce optimization",
    "AI automation",
    "health tech",
    "SaaS marketing"
  ],
  "twitterAccounts": [
    "@naval",
    "@levelsio",
    "@gregisenberg"
  ],
  "buildThreshold": 8.5,
  "autoCreatePR": true
}
```

## Integration Points

- **Morning Brief**: Trend summary section
- **STATE.json**: Last scan time, active trends
- **GitHub**: Auto-creates PRs with demos
- **Supermemory**: Logs trends and decisions

## Output

Generates:
- `data/trends/YYYY-MM-DD-trends.json` - Daily trend log
- `data/trends/prototypes/` - Built demos
- GitHub PRs with `[AUTONOMOUS]` prefix
- Screenshots and demo videos

## Example Output

```
🔥 TREND DETECTED: "Supplement subscriptions moving to weekly delivery"
   Relevance: 9.2/10 (DBH opportunity)
   
   AUTONOMOUS BUILD:
   ✅ Built: Weekly subscription option for DBH
   ✅ PR: github.com/tom/dbh/pull/234
   ✅ Demo: http://localhost:3000/demo/weekly-sub
   
   ESTIMATED IMPACT:
   - Revenue uplift: +15% ($7.8k/year)
   - Dev effort: 2 days
   - Risk: Low
   
   RECOMMENDATION: Ship this. Trend is 3 weeks old, moving fast.
```

## Safety

- Never pushes to production
- Always creates PR for review
- Includes test coverage
- Estimates ROI before building
- Flags high-risk changes

## Dependencies

- X/Twitter API (or web scraping fallback)
- GitHub API for PR creation
- Node.cjs for prototyping
- Puppeteer for screenshots

