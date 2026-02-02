# Information Extraction & Intelligence Pipeline

**Goal:** Perfect information at perfect times. Make you 1000x more productive.

## Overview

The intelligence pipeline extracts, processes, and delivers insights from multiple sources:

1. **X/Twitter** - Track key accounts, trending topics, expert insights
2. **Articles & Blogs** - RSS feeds, bookmarks, web content
3. **Books & Resources** - PDFs, ebooks, research papers
4. **Insight Delivery** - Morning briefings, real-time alerts, evening digests

All insights are automatically scored, ranked, and stored in Supermemory for perfect recall.

---

## 🚀 Quick Start

### Run Full Pipeline
```bash
node scripts/info-extraction-pipeline.js run
```

### Individual Components
```bash
# Twitter monitoring (4h frequency)
node scripts/x-twitter-monitor.js monitor

# Article digest (6h frequency)
node scripts/article-digest.js digest

# Process a book
node scripts/book-digest.js process ~/Downloads/book.pdf "Title" "Author"

# View recent insights
node scripts/info-extraction-pipeline.js insights 24
```

### Pipeline Status
```bash
node scripts/info-extraction-pipeline.js status
```

---

## 📊 Components

### 1. Twitter/X Monitor (`x-twitter-monitor.js`)

**Purpose:** Track key accounts, extract insights, identify trends

**Focus Areas:**
- NZ business & marketing
- Wealth management
- AI & automation
- Productivity systems

**Configuration:** `config/x-twitter-monitor.json`

**Features:**
- Tracks 7+ key accounts (Naval, Shaan Puri, Lenny, etc.)
- Keyword-based insight detection
- Engagement filtering (min 50 likes/retweets)
- Category tagging (business, marketing, wealth, AI)
- Auto-save to Supermemory

**Usage:**
```bash
# Run monitoring cycle
node scripts/x-twitter-monitor.js monitor

# Get trending topics
node scripts/x-twitter-monitor.js trends

# Show configuration
node scripts/x-twitter-monitor.js config
```

**Note:** Requires Twitter API integration (framework provided, needs API key)

---

### 2. Article Digest (`article-digest.js`)

**Purpose:** Scrape, summarize, and extract insights from articles

**Sources:**
- RSS feeds (Farnam Street, Lenny's Newsletter, Paul Graham, etc.)
- Bookmarked URLs
- Reading queue

**Configuration:** `config/article-digest.json`

**Features:**
- RSS feed monitoring (6h frequency)
- Reading queue with priority levels
- Relevance scoring (keywords + topics)
- Actionable insight detection
- AI summarization (key points, takeaways)
- Automatic deduplication

**Usage:**
```bash
# Run digest cycle
node scripts/article-digest.js digest

# Add URL to queue
node scripts/article-digest.js add "https://example.com/article" high

# Process single article
node scripts/article-digest.js process "https://example.com/article"

# Show reading queue
node scripts/article-digest.js queue
```

**Integration:**
- Uses `web_fetch` tool via Clawdbot for content extraction
- Saves digests to Supermemory
- Feeds into morning briefing

---

### 3. Book Digest (`book-digest.js`)

**Purpose:** Extract key concepts from books and PDFs

**Supported Formats:**
- PDF (requires pdf-parse)
- TXT

**Features:**
- Text extraction from PDFs
- Framework identification
- Key concept extraction
- Quote extraction
- Chapter-by-chapter summaries
- AI-powered analysis (placeholder for Claude integration)

**Usage:**
```bash
# Process a book
node scripts/book-digest.js process ~/Downloads/atomic-habits.pdf "Atomic Habits" "James Clear"

# Show library
node scripts/book-digest.js library
```

**Setup:**
```bash
npm install pdf-parse
```

---

### 4. Main Pipeline (`info-extraction-pipeline.js`)

**Purpose:** Orchestrate all extraction sources + insight delivery

**Features:**
- Scheduled extraction (Twitter 4h, Articles 6h)
- Insight scoring & ranking
- Real-time alerts (threshold: 8/10)
- Morning briefing integration
- Evening digest
- Supermemory integration

**Scoring Algorithm:**
```
Score = (relevance × 0.4) + (actionability × 0.3) + (timeliness × 0.2) + (engagement × 0.1)
× category_boost
```

**Category Boosts:**
- NZ Business: 1.2x
- Marketing: 1.1x
- Wealth Management: 1.1x
- AI: 1.0x
- Productivity: 1.0x

**Usage:**
```bash
# Run full pipeline
node scripts/info-extraction-pipeline.js run

# Run specific components
node scripts/info-extraction-pipeline.js twitter
node scripts/info-extraction-pipeline.js articles

# View insights
node scripts/info-extraction-pipeline.js insights 24    # Last 24 hours
node scripts/info-extraction-pipeline.js insights 168   # Last week

# Generate morning briefing
node scripts/info-extraction-pipeline.js morning

# Show status
node scripts/info-extraction-pipeline.js status
```

---

## 📬 Delivery System

### Morning Briefing (8am)

Integrated with `scripts/morning-briefing.js`

**Includes:**
- Top 5 insights from last 24h
- Critical reminders
- Today's priorities
- Calendar (48h)
- Email intelligence
- Financial snapshot

**Run:**
```bash
node scripts/morning-briefing.js
```

### Real-Time Alerts

**Trigger:** Insights scoring ≥ 8/10

**Channels:** Telegram, Discord (configurable)

**Example Alert:**
```
🚨 HIGH-PRIORITY INSIGHT (9.2/10)
From @naval (wealth_management):
"The best way to get rich is to own equity in a business..."
https://twitter.com/naval/status/...
```

### Evening Digest (6pm)

**Includes:**
- Summary of day's insights
- Reading queue status
- Recommendations for tomorrow

---

## ⚙️ Configuration

### Pipeline Config (`config/info-pipeline.json`)

```json
{
  "schedule": {
    "twitter": {
      "enabled": true,
      "frequency": "4h"
    },
    "articles": {
      "enabled": true,
      "frequency": "6h"
    }
  },
  "delivery": {
    "morningBriefing": {
      "enabled": true,
      "time": "08:00",
      "maxInsights": 5
    },
    "realTimeAlerts": {
      "enabled": true,
      "threshold": 8
    }
  }
}
```

### Twitter Config (`config/x-twitter-monitor.json`)

```json
{
  "accounts": [
    {
      "handle": "@naval",
      "category": "wealth_management",
      "priority": "high"
    }
  ],
  "topics": [
    "NZ business trends",
    "email marketing",
    "wealth management"
  ],
  "checkIntervalHours": 4
}
```

### Article Config (`config/article-digest.json`)

```json
{
  "rssFeeds": [
    {
      "url": "https://fs.blog/feed/",
      "name": "Farnam Street",
      "category": "mental_models",
      "priority": "high"
    }
  ],
  "checkIntervalHours": 6,
  "maxArticlesPerRun": 5
}
```

---

## 🔄 Automation

### Add to HEARTBEAT.md

```markdown
## Intelligence Pipeline

Every 4 hours:
- Run: `node scripts/info-extraction-pipeline.js run`
- Check for high-priority insights
- Update morning briefing cache

At 8am:
- Morning briefing includes top insights

At 6pm:
- Evening digest summary
```

### Cron Alternative (Windows Task Scheduler)

```powershell
# Every 4 hours
schtasks /create /tn "ClawdbotIntelligence" /tr "node C:\Users\Nightgalem\clawd\scripts\info-extraction-pipeline.js run" /sc hourly /mo 4
```

---

## 🧠 Supermemory Integration

All insights are automatically saved to Supermemory with metadata:

**Twitter Insight:**
```json
{
  "type": "twitter_insight",
  "category": "marketing",
  "handle": "@naval",
  "relevanceScore": 8.5,
  "timestamp": "2026-02-03T10:30:00+13:00"
}
```

**Article Digest:**
```json
{
  "type": "article_digest",
  "url": "https://example.com/article",
  "relevance": 9,
  "actionable": true,
  "topics": ["marketing", "automation"]
}
```

**Book Digest:**
```json
{
  "type": "book_digest",
  "title": "Atomic Habits",
  "author": "James Clear",
  "file": "/path/to/book.pdf"
}
```

---

## 📈 Workflow

### Daily Flow

**8:00am** - Morning briefing with top insights
```bash
node scripts/morning-briefing.js
```

**12:00pm** - Mid-day pipeline check
```bash
node scripts/info-extraction-pipeline.js run
```

**4:00pm** - Afternoon update
```bash
node scripts/info-extraction-pipeline.js run
```

**6:00pm** - Evening digest
```bash
node scripts/info-extraction-pipeline.js insights 24
```

**9:00pm** - Enhanced Supermemory sync (existing)
```bash
node scripts/supermemory-enhanced-sync.js
```

### Weekly Routine

**Monday morning:**
- Review last week's top insights
- Add new RSS feeds if needed
- Update Twitter account list

**Friday afternoon:**
- Check reading queue
- Process any pending articles
- Update book library

---

## 🛠️ Advanced Features

### Custom Insight Scoring

Edit `config/info-pipeline.json`:

```json
{
  "scoring": {
    "weights": {
      "relevance": 0.5,      // Increase relevance weight
      "actionability": 0.3,
      "timeliness": 0.1,
      "engagement": 0.1
    },
    "categories": {
      "pg_investments": 1.5  // Add custom category boost
    }
  }
}
```

### Add Custom Accounts

```bash
# Edit config
nano config/x-twitter-monitor.json

# Add to "accounts" array:
{
  "handle": "@new_account",
  "category": "custom_category",
  "priority": "high",
  "note": "Why tracking this account"
}
```

### Add RSS Feeds

```bash
# Edit config
nano config/article-digest.json

# Add to "rssFeeds" array:
{
  "url": "https://example.com/feed",
  "name": "Example Blog",
  "category": "custom",
  "priority": "medium"
}
```

---

## 🔍 Debugging

### Check Pipeline Status
```bash
node scripts/info-extraction-pipeline.js status
```

### View Recent Runs
```bash
cat config/info-pipeline-state.json
```

### Test Individual Components
```bash
# Test Twitter
node scripts/x-twitter-monitor.js monitor

# Test articles
node scripts/article-digest.js digest

# Test scoring
node scripts/info-extraction-pipeline.js insights 1
```

### Clear State (Reset)
```bash
# Remove state files to reset
rm config/info-pipeline-state.json
rm config/x-twitter-monitor-state.json
rm config/article-digest-state.json
```

---

## 🎯 Optimization Tips

### 1. Prioritize High-Value Sources
- Focus on accounts/feeds that consistently deliver actionable insights
- Remove low-signal sources
- Adjust category boosts based on current priorities

### 2. Tune Frequency
- Reduce check frequency if getting overwhelmed
- Increase for time-sensitive topics (news, trends)

### 3. Alert Threshold
- Start at 8/10, adjust based on alert volume
- Lower = more alerts, higher = only critical

### 4. Reading Queue Management
- Add articles immediately when found
- Process queue in batches (5-10 articles)
- Use priority levels: high (read today), normal (this week), low (someday)

---

## 🚧 TODO / Roadmap

### Phase 1: Core Functionality ✅
- [x] Twitter monitoring framework
- [x] Article digest engine
- [x] Book extraction framework
- [x] Main pipeline orchestrator
- [x] Morning briefing integration
- [x] Supermemory integration

### Phase 2: API Integration (In Progress)
- [ ] Twitter API v2 integration
- [ ] RSS parser implementation (install rss-parser)
- [ ] PDF extraction (install pdf-parse)
- [ ] web_fetch integration for article extraction

### Phase 3: AI Enhancement
- [ ] Claude API for intelligent summarization
- [ ] Smart chapter detection
- [ ] Framework extraction using LLM
- [ ] Personalized insight recommendations

### Phase 4: Delivery Optimization
- [ ] Real-time notification delivery (Telegram/Discord)
- [ ] Custom digest timing based on usage patterns
- [ ] Weekly/monthly insight compilations
- [ ] Insight clustering (group related insights)

### Phase 5: Advanced Features
- [ ] Video/podcast transcript extraction
- [ ] Multi-language support
- [ ] Sentiment analysis
- [ ] Trend prediction
- [ ] Automated insight actions (add to calendar, create tasks)

---

## 📚 Resources

**Documentation:**
- [Supermemory Docs](https://docs.supermemory.ai)
- [Twitter API v2](https://developer.twitter.com/en/docs/twitter-api)
- [RSS Parser](https://www.npmjs.com/package/rss-parser)
- [PDF Parse](https://www.npmjs.com/package/pdf-parse)

**Configuration Files:**
- `config/info-pipeline.json` - Main pipeline config
- `config/x-twitter-monitor.json` - Twitter accounts & topics
- `config/article-digest.json` - RSS feeds & articles
- `config/book-digest-state.json` - Book library

**State Files:**
- `config/info-pipeline-state.json` - Pipeline run history
- `config/x-twitter-monitor-state.json` - Last Twitter check
- `config/article-digest-state.json` - Processed articles & queue
- `cache/morning-insights.txt` - Morning briefing cache

---

## 🎉 Success Metrics

**Daily:**
- 5-10 high-value insights captured
- 3-5 articles processed
- 0-2 real-time alerts

**Weekly:**
- 30-50 insights stored
- 20-30 articles digested
- 1-2 books processed

**Monthly:**
- Clear improvement in decision-making
- Time saved on information gathering
- Better strategic context for projects
- Measurable productivity gains

---

## 💡 Pro Tips

1. **Start Small** - Enable one source at a time, get comfortable with the flow
2. **Review Weekly** - Check your insights, adjust scoring weights
3. **Clean Your Feeds** - Remove low-value sources ruthlessly
4. **Tag Everything** - Use consistent categories for better filtering
5. **Trust the System** - Let the pipeline work, don't manually check sources
6. **Act on Insights** - Create tasks/reminders from actionable insights
7. **Share Wins** - Document how insights led to wins (reinforces value)

---

**Built with ❤️ for Tom - Making you 1000x more productive, one insight at a time.**
