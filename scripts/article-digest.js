#!/usr/bin/env node
/**
 * Article & Blog Digest Engine
 * Scrapes, summarizes, and extracts insights from articles
 * Supports: URLs, RSS feeds, bookmarks
 */

import SupermemoryClient from './supermemory-sync.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CONFIG_PATH = path.join(__dirname, '..', 'config', 'article-digest.json');
const STATE_PATH = path.join(__dirname, '..', 'config', 'article-digest-state.json');

class ArticleDigest {
  constructor() {
    this.config = null;
    this.state = null;
    this.supermemory = null;
  }

  async init() {
    // Load config
    try {
      this.config = JSON.parse(await fs.readFile(CONFIG_PATH, 'utf8'));
    } catch (err) {
      console.log('⚠️  No config found, creating default...');
      this.config = this.getDefaultConfig();
      await fs.mkdir(path.dirname(CONFIG_PATH), { recursive: true });
      await fs.writeFile(CONFIG_PATH, JSON.stringify(this.config, null, 2));
      console.log(`✅ Created config at ${CONFIG_PATH}`);
    }

    // Load state
    try {
      this.state = JSON.parse(await fs.readFile(STATE_PATH, 'utf8'));
    } catch (err) {
      this.state = { 
        processedUrls: [],
        lastCheck: null,
        queue: []
      };
    }

    // Initialize Supermemory
    this.supermemory = await new SupermemoryClient().init();

    return this;
  }

  getDefaultConfig() {
    return {
      // RSS feeds to monitor
      rssFeeds: [
        {
          url: "https://fs.blog/feed/",
          name: "Farnam Street",
          category: "mental_models",
          priority: "high"
        },
        {
          url: "https://www.lennysnewsletter.com/feed",
          name: "Lenny's Newsletter",
          category: "product_marketing",
          priority: "high"
        },
        {
          url: "https://world.hey.com/dhh/feed.atom",
          name: "DHH (37signals)",
          category: "business_philosophy",
          priority: "medium"
        },
        {
          url: "http://www.paulgraham.com/rss.html",
          name: "Paul Graham Essays",
          category: "startups",
          priority: "high"
        }
      ],
      // Bookmarked URLs to process
      bookmarks: [],
      // Reading list
      readingList: [],
      // Digest settings
      checkIntervalHours: 6,
      maxArticlesPerRun: 5,
      summaryLength: "medium", // short, medium, long
      // Insight extraction keywords
      insightKeywords: [
        "framework", "strategy", "playbook", "lesson", "mistake",
        "revenue", "growth", "marketing", "email", "automation",
        "productivity", "system", "process", "workflow",
        "wealth", "investment", "business model"
      ]
    };
  }

  /**
   * Check if URL has been processed
   */
  isProcessed(url) {
    return this.state.processedUrls.includes(url);
  }

  /**
   * Mark URL as processed
   */
  async markProcessed(url) {
    if (!this.state.processedUrls.includes(url)) {
      this.state.processedUrls.push(url);
      // Keep only last 1000 URLs
      if (this.state.processedUrls.length > 1000) {
        this.state.processedUrls = this.state.processedUrls.slice(-1000);
      }
      await this.saveState();
    }
  }

  /**
   * Save state to disk
   */
  async saveState() {
    await fs.writeFile(STATE_PATH, JSON.stringify(this.state, null, 2));
  }

  /**
   * Parse RSS feed
   */
  async parseRSSFeed(feedUrl) {
    console.log(`  📡 Fetching RSS feed: ${feedUrl}`);
    
    // Note: This is a placeholder. In production, use a proper RSS parser
    // like 'rss-parser' npm package
    
    try {
      // Placeholder for RSS parsing
      // const Parser = require('rss-parser');
      // const parser = new Parser();
      // const feed = await parser.parseURL(feedUrl);
      // return feed.items;
      
      console.log('  ⚠️  RSS parsing not yet implemented - add rss-parser package');
      return [];
    } catch (err) {
      console.error(`  ❌ Failed to parse RSS feed: ${err.message}`);
      return [];
    }
  }

  /**
   * Extract article content (placeholder for web_fetch)
   */
  async fetchArticleContent(url) {
    console.log(`  📄 Fetching article: ${url}`);
    
    // In production, this would use the web_fetch tool via Clawdbot API
    // For now, return placeholder structure
    
    return {
      url,
      title: "Article Title",
      author: "Author Name",
      content: "Article content would be extracted here using web_fetch tool...",
      publishedDate: new Date().toISOString(),
      wordCount: 0
    };
  }

  /**
   * Analyze article for insights
   */
  analyzeArticle(article) {
    const content = article.content.toLowerCase();
    const analysis = {
      relevanceScore: 0,
      insights: [],
      keyTopics: [],
      actionable: false
    };

    // Check for insight keywords
    for (const keyword of this.config.insightKeywords) {
      if (content.includes(keyword.toLowerCase())) {
        analysis.relevanceScore += 1;
        if (!analysis.insights.includes(keyword)) {
          analysis.insights.push(keyword);
        }
      }
    }

    // Check if content is actionable (contains steps, how-to, etc.)
    const actionableWords = ['how to', 'step', 'guide', 'framework', 'template', 'checklist'];
    if (actionableWords.some(word => content.includes(word))) {
      analysis.actionable = true;
      analysis.relevanceScore += 2;
    }

    // Extract key topics (simplified - could use NLP)
    const topicPatterns = [
      /marketing/gi, /email/gi, /automation/gi, /AI/gi,
      /revenue/gi, /growth/gi, /productivity/gi, /wealth/gi
    ];
    
    for (const pattern of topicPatterns) {
      if (pattern.test(content)) {
        analysis.keyTopics.push(pattern.source);
      }
    }

    return analysis;
  }

  /**
   * Summarize article (placeholder for AI summarization)
   */
  summarizeArticle(article, length = 'medium') {
    // In production, this could use Claude API for intelligent summarization
    // For now, return a template
    
    const wordLimits = {
      short: 100,
      medium: 300,
      long: 500
    };

    return {
      summary: `Summary of "${article.title}" would be generated here using AI...`,
      keyPoints: [
        "Key point 1",
        "Key point 2",
        "Key point 3"
      ],
      actionableInsights: [
        "Actionable insight 1"
      ],
      wordCount: wordLimits[length]
    };
  }

  /**
   * Process a single article
   */
  async processArticle(url, source = 'manual') {
    console.log(`\n📖 Processing: ${url}`);

    if (this.isProcessed(url)) {
      console.log('  ⏭️  Already processed, skipping...');
      return null;
    }

    try {
      // Fetch article content
      const article = await this.fetchArticleContent(url);
      
      // Analyze for relevance
      const analysis = this.analyzeArticle(article);
      
      console.log(`  📊 Relevance Score: ${analysis.relevanceScore}/10`);
      console.log(`  🔍 Insights: ${analysis.insights.join(', ') || 'none'}`);
      console.log(`  🎯 Actionable: ${analysis.actionable ? 'Yes' : 'No'}`);

      // Only process if relevant
      if (analysis.relevanceScore < 2) {
        console.log('  ⏭️  Low relevance, skipping...');
        await this.markProcessed(url);
        return null;
      }

      // Generate summary
      const summary = this.summarizeArticle(article, this.config.summaryLength);

      // Save to Supermemory
      const content = `
Article Digest: ${article.title}
Source: ${source}
URL: ${url}
Author: ${article.author}
Published: ${article.publishedDate}

SUMMARY:
${summary.summary}

KEY POINTS:
${summary.keyPoints.map(p => `• ${p}`).join('\n')}

ACTIONABLE INSIGHTS:
${summary.actionableInsights.map(i => `→ ${i}`).join('\n')}

TOPICS: ${analysis.keyTopics.join(', ')}
INSIGHTS: ${analysis.insights.join(', ')}
RELEVANCE: ${analysis.relevanceScore}/10
      `.trim();

      await this.supermemory.add(content, {
        type: 'article_digest',
        url,
        source,
        relevance: analysis.relevanceScore,
        actionable: analysis.actionable,
        topics: analysis.keyTopics,
        timestamp: new Date().toISOString()
      });

      console.log('  ✅ Saved to Supermemory');

      await this.markProcessed(url);

      return {
        url,
        title: article.title,
        analysis,
        summary
      };

    } catch (err) {
      console.error(`  ❌ Failed to process article: ${err.message}`);
      return null;
    }
  }

  /**
   * Process RSS feeds
   */
  async processRSSFeeds() {
    console.log('📰 Processing RSS feeds...\n');
    
    const articles = [];
    
    for (const feed of this.config.rssFeeds) {
      console.log(`\n📡 Checking ${feed.name}...`);
      
      try {
        const items = await this.parseRSSFeed(feed.url);
        console.log(`  Found ${items.length} items`);
        
        // Process new items
        for (const item of items.slice(0, 3)) { // Process top 3 per feed
          if (!this.isProcessed(item.link)) {
            const result = await this.processArticle(item.link, feed.name);
            if (result) articles.push(result);
          }
        }
      } catch (err) {
        console.error(`  ❌ Error processing feed: ${err.message}`);
      }
    }

    return articles;
  }

  /**
   * Process reading queue
   */
  async processQueue() {
    console.log('📚 Processing reading queue...\n');
    
    const articles = [];
    const toProcess = this.state.queue.slice(0, this.config.maxArticlesPerRun);
    
    for (const item of toProcess) {
      const result = await this.processArticle(item.url, item.source || 'queue');
      if (result) articles.push(result);
      
      // Remove from queue
      this.state.queue = this.state.queue.filter(q => q.url !== item.url);
    }

    await this.saveState();
    
    return articles;
  }

  /**
   * Add URL to reading queue
   */
  async addToQueue(url, source = 'manual', priority = 'normal') {
    if (this.state.queue.some(item => item.url === url)) {
      console.log('⚠️  URL already in queue');
      return;
    }

    this.state.queue.push({
      url,
      source,
      priority,
      addedAt: new Date().toISOString()
    });

    // Sort by priority
    const priorityOrder = { high: 0, normal: 1, low: 2 };
    this.state.queue.sort((a, b) => 
      priorityOrder[a.priority] - priorityOrder[b.priority]
    );

    await this.saveState();
    console.log(`✅ Added to queue: ${url} (${priority} priority)`);
  }

  /**
   * Run digest cycle
   */
  async digest() {
    console.log('📚 Starting Article Digest Engine...\n');

    const results = {
      rss: [],
      queue: [],
      total: 0
    };

    // Process RSS feeds
    results.rss = await this.processRSSFeeds();
    
    // Process reading queue
    results.queue = await this.processQueue();

    results.total = results.rss.length + results.queue.length;

    // Update state
    this.state.lastCheck = new Date().toISOString();
    await this.saveState();

    // Generate report
    console.log('\n' + '='.repeat(60));
    console.log('📊 DIGEST REPORT');
    console.log('='.repeat(60));
    console.log(`RSS Articles: ${results.rss.length}`);
    console.log(`Queue Articles: ${results.queue.length}`);
    console.log(`Total Processed: ${results.total}`);
    console.log(`Queue Remaining: ${this.state.queue.length}`);
    console.log('='.repeat(60));

    return results;
  }
}

// CLI interface
async function main() {
  try {
    const [command, ...args] = process.argv.slice(2);

    const digest = await new ArticleDigest().init();

    switch (command) {
      case 'digest':
      case 'run':
        await digest.digest();
        break;

      case 'add':
        const url = args[0];
        const priority = args[1] || 'normal';
        if (!url) {
          console.error('❌ Usage: node article-digest.js add <url> [priority]');
          process.exit(1);
        }
        await digest.addToQueue(url, 'manual', priority);
        break;

      case 'process':
        const processUrl = args[0];
        if (!processUrl) {
          console.error('❌ Usage: node article-digest.js process <url>');
          process.exit(1);
        }
        await digest.processArticle(processUrl, 'manual');
        break;

      case 'queue':
        console.log('📚 Reading Queue:\n');
        if (digest.state.queue.length === 0) {
          console.log('  (empty)');
        } else {
          digest.state.queue.forEach((item, i) => {
            console.log(`${i + 1}. [${item.priority}] ${item.url}`);
            console.log(`   Added: ${new Date(item.addedAt).toLocaleString()}`);
          });
        }
        break;

      case 'config':
        console.log('⚙️  Configuration:\n');
        console.log(JSON.stringify(digest.config, null, 2));
        break;

      default:
        console.log(`
📚 Article & Blog Digest Engine

Usage:
  node scripts/article-digest.js digest              Run full digest cycle
  node scripts/article-digest.js add <url> [priority]  Add URL to queue
  node scripts/article-digest.js process <url>       Process single article
  node scripts/article-digest.js queue               Show reading queue
  node scripts/article-digest.js config              Show configuration

Priority levels: high, normal, low

Examples:
  node scripts/article-digest.js add "https://example.com/article" high
  node scripts/article-digest.js digest
        `);
    }
  } catch (err) {
    console.error('❌ Error:', err.message);
    if (err.stack) console.error(err.stack);
    process.exit(1);
  }
}

main();
