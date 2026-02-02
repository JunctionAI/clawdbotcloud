# 🧠 Information Extraction Pipeline

**Perfect information at perfect times. Make yourself 1000x more productive.**

---

## What is This?

An intelligent pipeline that extracts, processes, and delivers insights from:
- **X/Twitter** - Key accounts, trending topics, expert insights
- **Articles & Blogs** - RSS feeds, bookmarks, web content
- **Books & Resources** - PDFs, ebooks, research papers

All insights are automatically scored, ranked, and stored in Supermemory. The best insights are delivered in your morning briefing, with real-time alerts for critical information.

---

## 🚀 Quick Start

### 1. Run Setup
```bash
node scripts/setup-info-pipeline.js
```

This will:
- Check dependencies
- Create default configurations
- Test Supermemory connection
- Initialize all components

### 2. Configure Sources

**Twitter Accounts** (`config/x-twitter-monitor.json`):
```json
{
  "accounts": [
    {
      "handle": "@naval",
      "category": "wealth_management",
      "priority": "high"
    }
  ]
}
```

**RSS Feeds** (`config/article-digest.json`):
```json
{
  "rssFeeds": [
    {
      "url": "https://fs.blog/feed/",
      "name": "Farnam Street",
      "category": "mental_models",
      "priority": "high"
    }
  ]
}
```

### 3. Run First Extraction
```bash
node scripts/info-extraction-pipeline.js run
```

### 4. Check Your Insights
```bash
node scripts/info-extraction-pipeline.js insights 24
```

---

## 📊 Usage

### Daily Commands

```bash
# Full pipeline
node scripts/info-extraction-pipeline.js run

# Morning briefing (includes insights)
node scripts/morning-briefing.js

# Check status
node scripts/info-extraction-pipeline.js status
```

### Add Content Manually

```bash
# Add article to queue
node scripts/article-digest.js add "https://example.com/article" high

# Process book
node scripts/book-digest.js process ~/Downloads/book.pdf "Title" "Author"
```

### View Insights

```bash
# Last 24 hours
node scripts/info-extraction-pipeline.js insights 24

# Last week
node scripts/info-extraction-pipeline.js insights 168
```

---

## 🎯 Key Features

### 1. Intelligent Scoring
Every insight is scored 0-10 based on:
- **Relevance** (40%) - How relevant to your focus areas
- **Actionability** (30%) - Can you act on this?
- **Timeliness** (20%) - How fresh is it?
- **Engagement** (10%) - Social proof

Category boosts:
- NZ Business: 1.2x
- Marketing: 1.1x
- Wealth Management: 1.1x

### 2. Automatic Delivery

**Morning Briefing (8am)**
- Top 5 insights from last 24h
- Integrated with priorities and calendar

**Real-Time Alerts**
- Insights scoring ≥ 8/10
- Immediate notification via Telegram/Discord

**Evening Digest (6pm)**
- Summary of day's insights
- Reading queue status

### 3. Supermemory Integration
All insights automatically saved with:
- Full text
- Source metadata
- Relevance scores
- Timestamps
- Categories

Perfect recall when you need it.

---

## 📁 Files

### Scripts
- `scripts/info-extraction-pipeline.js` - Main orchestrator
- `scripts/x-twitter-monitor.js` - Twitter tracking
- `scripts/article-digest.js` - Article processing
- `scripts/book-digest.js` - Book extraction
- `scripts/setup-info-pipeline.js` - Setup wizard

### Configuration
- `config/info-pipeline.json` - Main settings
- `config/x-twitter-monitor.json` - Twitter accounts
- `config/article-digest.json` - RSS feeds & articles
- `config/book-digest-state.json` - Book library

### Documentation
- `docs/INFO-EXTRACTION-PIPELINE.md` - Complete guide
- `README-INFO-PIPELINE.md` - This file

---

## 🔧 Optional Enhancements

### Install Full Features
```bash
npm install rss-parser pdf-parse
```

### Twitter API Integration
1. Get Twitter API v2 credentials
2. Add to `config/x-twitter-monitor.json`
3. Enables live account tracking

### Web Content Extraction
Already integrated with Clawdbot's `web_fetch` tool!

---

## 📅 Automation

### Add to HEARTBEAT.md
```markdown
## Intelligence Pipeline

Every 4 hours:
- `node scripts/info-extraction-pipeline.js run`

At 8am:
- Morning briefing includes insights
```

### Windows Task Scheduler
```powershell
schtasks /create /tn "IntelligencePipeline" /tr "node C:\Users\Nightgalem\clawd\scripts\info-extraction-pipeline.js run" /sc hourly /mo 4
```

---

## 🎓 Learning Path

### Week 1: Article Digest
Focus on article processing - works immediately without API keys.

1. Add your favorite RSS feeds
2. Add bookmarked articles to queue
3. Run digest daily
4. Review insights in morning briefing

### Week 2: Twitter Monitoring
Set up Twitter tracking (requires API).

1. Get Twitter API credentials
2. Add key accounts to monitor
3. Configure categories and keywords
4. Enable real-time alerts

### Week 3: Book Processing
Process books and PDFs.

1. Install pdf-parse
2. Process 1-2 books
3. Review extracted frameworks
4. Build your book library

### Week 4: Optimization
Fine-tune everything.

1. Adjust scoring weights
2. Remove low-value sources
3. Optimize delivery timing
4. Measure productivity gains

---

## 💡 Pro Tips

1. **Start with articles** - No API needed, immediate value
2. **Be selective** - Quality > quantity for sources
3. **Review weekly** - Remove low-signal sources
4. **Act on insights** - Create tasks from actionable items
5. **Trust the system** - Let it run automatically

---

## 🐛 Troubleshooting

### Pipeline not running?
```bash
node scripts/info-extraction-pipeline.js status
```

### No insights showing?
Check if sources have run:
```bash
cat config/info-pipeline-state.json
```

### Supermemory errors?
Test connection:
```bash
node scripts/supermemory-sync.js profile
```

### Reset everything
```bash
rm config/info-pipeline-state.json
rm config/x-twitter-monitor-state.json
rm config/article-digest-state.json
```

---

## 📈 Success Metrics

**Daily:**
- 5-10 high-value insights captured
- 3-5 articles processed
- 1-2 real-time alerts

**Weekly:**
- 30-50 insights stored
- 20-30 articles digested
- 1-2 books processed

**Monthly:**
- Clear improvement in decision-making
- Time saved on information gathering
- Better strategic context
- Measurable productivity gains

---

## 🎉 What's Next?

Once running smoothly:

1. **Integrate with projects** - Link insights to active work
2. **Create insight actions** - Auto-create tasks/reminders
3. **Build custom categories** - PG Investments, TWG, etc.
4. **Share insights** - Forward best insights to team/clients
5. **Track ROI** - Document wins from pipeline insights

---

## 📚 Full Documentation

See `docs/INFO-EXTRACTION-PIPELINE.md` for complete details on:
- Advanced configuration
- API integration
- Scoring algorithms
- Workflow optimization
- Troubleshooting guide

---

**Built for Tom - Your intelligence amplification system. 🚀**

Questions? Check the docs or ask your agent!
