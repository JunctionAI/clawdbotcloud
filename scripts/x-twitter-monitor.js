#!/usr/bin/env node
/**
 * X/Twitter Intelligence Monitor
 * Tracks key accounts, extracts insights, identifies trending topics
 * Focus: NZ business, marketing, wealth management, AI, productivity
 */

import SupermemoryClient from './supermemory-sync.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CONFIG_PATH = path.join(__dirname, '..', 'config', 'x-twitter-monitor.json');
const STATE_PATH = path.join(__dirname, '..', 'config', 'x-twitter-monitor-state.json');

class TwitterMonitor {
  constructor() {
    this.config = null;
    this.state = null;
    this.supermemory = null;
  }

  async init() {
    // Load config (create default if doesn't exist)
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
      this.state = { lastCheck: null, processedUrls: [] };
    }

    // Initialize Supermemory
    this.supermemory = await new SupermemoryClient().init();

    return this;
  }

  getDefaultConfig() {
    return {
      // Key accounts to monitor (add Twitter/X handles)
      accounts: [
        {
          handle: "@naval",
          category: "wealth_management",
          priority: "high",
          note: "Wealth creation, startups, philosophy"
        },
        {
          handle: "@ShaanVP",
          category: "business",
          priority: "high",
          note: "Business ideas, marketing, growth"
        },
        {
          handle: "@agazdecki",
          category: "business",
          priority: "medium",
          note: "B2B SaaS, acquisitions"
        },
        {
          handle: "@lennysan",
          category: "marketing",
          priority: "high",
          note: "Product, growth, marketing"
        },
        {
          handle: "@paulg",
          category: "startups",
          priority: "high",
          note: "Startups, essays, wisdom"
        },
        {
          handle: "@sama",
          category: "ai",
          priority: "high",
          note: "AI, OpenAI, future"
        },
        {
          handle: "@waitbutwhy",
          category: "productivity",
          priority: "medium",
          note: "Deep dives, systems thinking"
        }
      ],
      // NZ-specific accounts (add local NZ business/marketing leaders)
      nzAccounts: [
        {
          handle: "@placeholder_nz",
          category: "nz_business",
          priority: "high",
          note: "Add actual NZ business leaders here"
        }
      ],
      // Topics to track
      topics: [
        "NZ business trends",
        "email marketing best practices",
        "wealth management strategies",
        "AI automation",
        "productivity systems",
        "marketing automation"
      ],
      // Check frequency
      checkIntervalHours: 4,
      // Insight thresholds
      minEngagement: 50, // Minimum likes/retweets to consider
      insightKeywords: [
        "framework", "strategy", "lesson", "mistake", "playbook",
        "revenue", "growth", "conversion", "retention", "churn",
        "AI", "automation", "productivity", "efficiency"
      ]
    };
  }

  /**
   * Check if enough time has passed since last check
   */
  shouldCheck() {
    if (!this.state.lastCheck) return true;
    const lastCheck = new Date(this.state.lastCheck);
    const hoursSince = (Date.now() - lastCheck.getTime()) / (1000 * 60 * 60);
    return hoursSince >= this.config.checkIntervalHours;
  }

  /**
   * Simulate fetching Twitter timeline
   * NOTE: Twitter API requires authentication. This is a simulation framework.
   * In production, integrate with Twitter API v2 or use a service like Nitter/RSS
   */
  async fetchTimeline(handle) {
    // Placeholder - would use Twitter API here
    console.log(`  📡 Fetching timeline for ${handle}...`);
    
    // For now, return empty - you'll need to add actual Twitter API integration
    // Options:
    // 1. Twitter API v2 (requires API key)
    // 2. RSS feeds (some accounts have RSS)
    // 3. Third-party services (RapidAPI, Apify)
    
    return [];
  }

  /**
   * Analyze tweet for insights
   */
  analyzeTweet(tweet, accountInfo) {
    const text = tweet.text.toLowerCase();
    const score = {
      relevance: 0,
      engagement: tweet.engagement || 0,
      insights: []
    };

    // Check for insight keywords
    for (const keyword of this.config.insightKeywords) {
      if (text.includes(keyword.toLowerCase())) {
        score.relevance += 1;
        score.insights.push(keyword);
      }
    }

    // Check topic relevance
    for (const topic of this.config.topics) {
      const topicWords = topic.toLowerCase().split(' ');
      if (topicWords.some(word => text.includes(word))) {
        score.relevance += 1;
      }
    }

    // Prioritize by account priority
    if (accountInfo.priority === 'high') score.relevance *= 1.5;

    // Check engagement threshold
    if (score.engagement >= this.config.minEngagement) {
      score.relevance += 1;
    }

    return score;
  }

  /**
   * Extract key insights from tweets
   */
  extractInsights(tweets, accountInfo) {
    const insights = [];

    for (const tweet of tweets) {
      const score = this.analyzeTweet(tweet, accountInfo);
      
      if (score.relevance >= 2) {
        insights.push({
          handle: accountInfo.handle,
          category: accountInfo.category,
          text: tweet.text,
          url: tweet.url,
          engagement: tweet.engagement,
          relevanceScore: score.relevance,
          insights: score.insights,
          timestamp: tweet.timestamp || new Date().toISOString()
        });
      }
    }

    return insights.sort((a, b) => b.relevanceScore - a.relevanceScore);
  }

  /**
   * Save insights to Supermemory
   */
  async saveInsights(insights) {
    for (const insight of insights) {
      const content = `
Twitter Insight from ${insight.handle} (${insight.category}):
${insight.text}

Relevance: ${insight.relevanceScore}/10
Keywords: ${insight.insights.join(', ')}
Engagement: ${insight.engagement}
URL: ${insight.url}
      `.trim();

      try {
        await this.supermemory.add(content, {
          type: 'twitter_insight',
          category: insight.category,
          handle: insight.handle,
          timestamp: insight.timestamp
        });
        console.log(`  ✅ Saved: ${insight.handle} - "${insight.text.substring(0, 60)}..."`);
      } catch (err) {
        console.error(`  ❌ Failed to save insight: ${err.message}`);
      }
    }
  }

  /**
   * Generate summary report
   */
  generateReport(insights) {
    if (insights.length === 0) {
      return "📊 No new high-value insights found in this check.";
    }

    const byCategory = {};
    for (const insight of insights) {
      if (!byCategory[insight.category]) byCategory[insight.category] = [];
      byCategory[insight.category].push(insight);
    }

    let report = `📊 Twitter Intelligence Report - ${new Date().toLocaleString()}\n`;
    report += `Found ${insights.length} high-value insights\n\n`;

    for (const [category, items] of Object.entries(byCategory)) {
      report += `\n## ${category.toUpperCase()} (${items.length})\n`;
      for (const item of items.slice(0, 3)) { // Top 3 per category
        report += `  • ${item.handle}: "${item.text.substring(0, 100)}..."\n`;
        report += `    Relevance: ${item.relevanceScore}/10 | Engagement: ${item.engagement}\n`;
        report += `    ${item.url}\n\n`;
      }
    }

    return report;
  }

  /**
   * Run monitoring cycle
   */
  async monitor() {
    console.log('🐦 Starting Twitter Intelligence Monitor...\n');

    if (!this.shouldCheck()) {
      const nextCheck = new Date(this.state.lastCheck);
      nextCheck.setHours(nextCheck.getHours() + this.config.checkIntervalHours);
      console.log(`⏰ Too soon since last check. Next check at: ${nextCheck.toLocaleString()}`);
      return;
    }

    const allInsights = [];
    const accounts = [...this.config.accounts, ...this.config.nzAccounts];

    console.log(`📡 Monitoring ${accounts.length} accounts...\n`);

    for (const account of accounts) {
      if (account.handle === '@placeholder_nz') continue; // Skip placeholder
      
      console.log(`🔍 Checking ${account.handle} (${account.category})...`);
      
      try {
        const tweets = await this.fetchTimeline(account.handle);
        const insights = this.extractInsights(tweets, account);
        allInsights.push(...insights);
        
        console.log(`  Found ${insights.length} insights`);
      } catch (err) {
        console.error(`  ❌ Error fetching ${account.handle}: ${err.message}`);
      }
    }

    // Save insights to Supermemory
    if (allInsights.length > 0) {
      console.log(`\n💾 Saving ${allInsights.length} insights to Supermemory...`);
      await this.saveInsights(allInsights);
    }

    // Generate report
    const report = this.generateReport(allInsights);
    console.log(`\n${report}`);

    // Update state
    this.state.lastCheck = new Date().toISOString();
    await fs.writeFile(STATE_PATH, JSON.stringify(this.state, null, 2));

    console.log('\n✅ Twitter monitoring complete!');
    
    return {
      insights: allInsights,
      report
    };
  }

  /**
   * Get trending topics (simulated - would use Twitter Trends API)
   */
  async getTrendingTopics() {
    console.log('📈 Fetching trending topics...');
    
    // Placeholder - would use Twitter Trends API or web scraping
    // For NZ: use location ID for New Zealand
    
    return {
      nz: [
        "Placeholder - integrate Twitter Trends API for NZ"
      ],
      global: [
        "Placeholder - integrate Twitter Trends API globally"
      ]
    };
  }
}

// CLI interface
async function main() {
  try {
    const [command, ...args] = process.argv.slice(2);

    const monitor = await new TwitterMonitor().init();

    switch (command) {
      case 'monitor':
      case 'run':
        await monitor.monitor();
        break;

      case 'trends':
        const trends = await monitor.getTrendingTopics();
        console.log('📈 Trending Topics:\n');
        console.log('NZ:', trends.nz.join(', '));
        console.log('Global:', trends.global.join(', '));
        break;

      case 'config':
        console.log('⚙️  Current Configuration:\n');
        console.log(JSON.stringify(monitor.config, null, 2));
        break;

      case 'status':
        if (monitor.state.lastCheck) {
          const lastCheck = new Date(monitor.state.lastCheck);
          const nextCheck = new Date(lastCheck);
          nextCheck.setHours(nextCheck.getHours() + monitor.config.checkIntervalHours);
          console.log(`Last check: ${lastCheck.toLocaleString()}`);
          console.log(`Next check: ${nextCheck.toLocaleString()}`);
        } else {
          console.log('Never checked - run `monitor` to start');
        }
        break;

      default:
        console.log(`
🐦 X/Twitter Intelligence Monitor

Usage:
  node scripts/x-twitter-monitor.js monitor     Run monitoring cycle
  node scripts/x-twitter-monitor.js trends      Get trending topics
  node scripts/x-twitter-monitor.js config      Show configuration
  node scripts/x-twitter-monitor.js status      Show last check time

Configuration:
  Edit config/x-twitter-monitor.json to customize accounts and topics

Note: Requires Twitter API integration (placeholder framework provided)
        `);
    }
  } catch (err) {
    console.error('❌ Error:', err.message);
    if (err.stack) console.error(err.stack);
    process.exit(1);
  }
}

main();
