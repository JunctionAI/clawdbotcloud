# 📋 Information Pipeline - Quick Reference

## 🚀 Essential Commands

### Run Pipeline (Every 4h)
```bash
node scripts/info-extraction-pipeline.js run
```

### Check Insights
```bash
node scripts/info-extraction-pipeline.js insights 24    # Last 24h
node scripts/info-extraction-pipeline.js insights 168   # Last week
```

### Morning Briefing (8am)
```bash
node scripts/morning-briefing.js
```

### Add Article to Queue
```bash
node scripts/article-digest.js add "https://url.com" high
```

### Process Book
```bash
node scripts/book-digest.js process ~/Downloads/book.pdf "Title" "Author"
```

### Check Status
```bash
node scripts/info-extraction-pipeline.js status
```

---

## 📁 Key Files

### Configs
- `config/info-pipeline.json` - Main settings
- `config/x-twitter-monitor.json` - Twitter accounts
- `config/article-digest.json` - RSS feeds

### Docs
- `docs/INFO-EXTRACTION-PIPELINE.md` - Full guide
- `README-INFO-PIPELINE.md` - Quick start
- `PIPELINE-SUMMARY.md` - What was built

---

## ⚙️ What's Tracking

### Twitter Accounts (7)
@naval, @ShaanVP, @agazdecki, @lennysan, @paulg, @sama, @waitbutwhy

### RSS Feeds (4)
Farnam Street, Lenny's Newsletter, DHH Essays, Paul Graham

### Keywords
framework, strategy, playbook, lesson, revenue, growth, marketing, automation, productivity

### Topics
NZ business, email marketing, wealth management, AI, productivity

---

## 🎯 Delivery Schedule

- **8am** - Morning briefing (top 5 insights)
- **Every 4h** - Pipeline extraction
- **Real-time** - Alerts for insights ≥ 8/10
- **6pm** - Evening digest

---

## 🔧 Quick Fixes

### Reset State
```bash
rm config/info-pipeline-state.json
rm config/x-twitter-monitor-state.json
rm config/article-digest-state.json
```

### Test Supermemory
```bash
node scripts/supermemory-sync.js profile
```

### Install Optional Features
```bash
npm install rss-parser pdf-parse
```

---

## 💡 Pro Tips

1. **Article Queue** - Add interesting articles immediately, process in batches
2. **Weekly Review** - Remove low-value sources on Fridays
3. **Priority Levels** - Use high/normal/low for reading queue
4. **Act Fast** - Create tasks from actionable insights immediately
5. **Trust System** - Let it run automatically, check insights in morning

---

## 📊 Scoring Guide

**Insight Score = 0-10**
- 0-3: Low value, filtered out
- 4-6: Medium value, stored
- 7-8: High value, prioritized
- 9-10: Critical, immediate alert

**Scoring Formula:**
```
(Relevance × 0.4) + (Actionability × 0.3) + (Timeliness × 0.2) + (Engagement × 0.1)
× Category Boost
```

**Category Boosts:**
- NZ Business: 1.2x
- Marketing: 1.1x
- Wealth: 1.1x
- AI/Productivity: 1.0x

---

## 🚨 Alert Thresholds

- **8+**: Real-time alert
- **7-8**: Morning briefing
- **4-6**: Stored in Supermemory
- **<4**: Filtered out

---

## 📈 Success Metrics

**Daily:** 5-10 insights captured
**Weekly:** 30-50 insights, 20-30 articles
**Monthly:** 100-200 insights, 60-100 articles, 3-5 books

---

## 🔗 Integration Points

- ✅ Morning Briefing
- ✅ Supermemory
- ✅ STATE.json
- ⬜ HEARTBEAT.md (add manually)
- ⬜ Real-time alerts (needs channel setup)

---

## 🎯 Next Actions

1. ⬜ Run first extraction
2. ⬜ Customize Twitter accounts
3. ⬜ Add favorite RSS feeds
4. ⬜ Add to HEARTBEAT.md
5. ⬜ Check morning briefing tomorrow

---

**Built for Tom. Perfect information. Perfect timing. 🚀**
