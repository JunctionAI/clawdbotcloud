# ⚡ Quick Start Guide

Get your content monetization system running in 15 minutes.

---

## Step 1: Generate Your First Piece of Content (2 minutes)

```bash
# Blog post
node scripts/content-generator.js blog "How to Use AI for Marketing"

# Output: data/generated/blog_how-to-use-ai-for-marketing_[timestamp].md
```

**No API key?** The system will generate a mock version. To use real AI:
- Get an OpenAI API key: https://platform.openai.com/api-keys
- Or Anthropic Claude key: https://console.anthropic.com/
- Add to `.env` file: `OPENAI_API_KEY=sk-...`

---

## Step 2: View Your Content (1 minute)

```bash
# List generated files
dir data\generated

# Open in your favorite editor
notepad data\generated\blog_*.md
```

**What you'll see:**
- SEO-optimized headline
- Complete blog post (1500+ words)
- Subheadings and structure
- Meta description
- Call-to-actions

---

## Step 3: Optimize for SEO (2 minutes)

```bash
# Research keywords first
node scripts/seo-optimizer.js research "AI marketing"

# Then optimize your content
node scripts/seo-optimizer.js analyze data\generated\blog_*.md "AI marketing"
```

**You'll get:**
- SEO score (out of 100)
- Issues to fix
- Optimization recommendations
- Keyword density analysis

---

## Step 4: Set Up Your First Revenue Stream (5 minutes)

```bash
# Add affiliate links
node scripts/affiliate-tracker.js add "Jasper AI" "https://jasper.ai?aff=YOUR_ID" "Jasper" "30%" "AI Tools" true

# View your links
node scripts/affiliate-tracker.js list

# Generate affiliate content section
node scripts/affiliate-tracker.js content blog
```

**Add this to your blog post!** Copy the generated affiliate content and paste it into your post.

---

## Step 5: Track Everything (2 minutes)

```bash
# Start the web dashboard
node scripts/analytics-dashboard.js web 3000
```

Then open your browser to: **http://localhost:3000**

You'll see:
- 📊 Revenue dashboard
- 📈 Traffic stats
- 🎯 Goal progress
- 💡 Insights

---

## Step 6: Schedule Your Content (3 minutes)

```bash
# Create a content calendar for this month
node scripts/auto-publisher.js calendar 2026 2

# View the schedule
node scripts/auto-publisher.js queue
```

**Publishing coming soon?**
- Set up your platform credentials (see README)
- Schedule posts in advance
- Auto-publish on schedule

---

## 🎉 You're Done!

In 15 minutes you've:
- ✅ Generated AI content
- ✅ Optimized for SEO
- ✅ Set up affiliate tracking
- ✅ Created a dashboard
- ✅ Planned your content calendar

---

## Next Steps

### This Week:
1. Generate 3 blog posts (Mon, Wed, Fri)
2. Create 5 Twitter threads
3. Write 1 newsletter
4. Add 5 affiliate links

### This Month:
1. Publish consistently (3x/week minimum)
2. Build email list (create lead magnet)
3. Get first affiliate sale
4. Hit 1,000 monthly visitors

### This Quarter:
1. Launch first digital product (course or ebook)
2. Reach $1,000/month revenue
3. Build newsletter to 500+ subscribers
4. Systemize your workflow

---

## Common Questions

**Q: Do I need coding experience?**
A: Nope! Just run the commands. The scripts do the work.

**Q: What if I don't have API keys?**
A: The system works without them (mock mode). Add them when ready for real AI generation.

**Q: How much does this cost?**
A: OpenAI API: ~$10-20/month for content generation. Everything else is free.

**Q: Can I customize the content?**
A: Yes! Edit templates in `templates/` folder to match your voice.

**Q: How long until I make money?**
A: Most people see first revenue in 1-3 months with consistent effort.

---

## Daily Routine (10 minutes)

```bash
# Morning: Check what's due today
node scripts/auto-publisher.js process

# Afternoon: Generate content
node scripts/content-generator.js blog "Your Topic"

# Evening: Check analytics
node scripts/analytics-dashboard.js report today
```

---

## Pro Tips

1. **Batch your content** - Generate 5 pieces at once, schedule throughout the week
2. **Repurpose everything** - Turn 1 blog into: Twitter thread + LinkedIn post + Newsletter section + YouTube script
3. **Track everything** - Log revenue immediately so you see what's working
4. **Focus on one channel** - Master blog or Twitter first, then expand
5. **Ship imperfect content** - Done is better than perfect

---

## Need Help?

Run any script without arguments to see usage:

```bash
node scripts/content-generator.js
node scripts/seo-optimizer.js
node scripts/auto-publisher.js
node scripts/affiliate-tracker.js
node scripts/analytics-dashboard.js
```

---

**Ready to turn your knowledge into income? Let's go! 🚀**
