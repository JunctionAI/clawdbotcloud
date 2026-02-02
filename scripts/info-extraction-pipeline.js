#!/usr/bin/env node
/**
 * Information Extraction & Intelligence Pipeline
 * Orchestrates all extraction sources: Twitter, articles, books, resources
 * Delivers perfect information at perfect times
 */

import { spawn } from 'child_process';
import SupermemoryClient from './supermemory-sync.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CONFIG_PATH = path.join(__dirname, '..', 'config', 'info-pipeline.json');
const STATE_PATH = path.join(__dirname, '..', 'config', 'info-pipeline-state.json');

class InformationPipeline {
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
        lastRun: null,
        runs: 0,
        insights: [],
        deliveryHistory: []
      };
    }

    // Initialize Supermemory
    this.supermemory = await new SupermemoryClient().init();

    return this;
  }

  getDefaultConfig() {
    return {
      // Pipeline schedule
      schedule: {
        twitter: {
          enabled: true,
          frequency: "4h",
          script: "scripts/x-twitter-monitor.js"
        },
        articles: {
          enabled: true,
          frequency: "6h",
          script: "scripts/article-digest.js"
        },
        books: {
          enabled: false, // Manual trigger
          script: "scripts/book-digest.js"
        }
      },
      
      // Delivery settings
      delivery: {
        morningBriefing: {
          enabled: true,
          time: "08:00",
          timezone: "Pacific/Auckland",
          includeInsights: true,
          maxInsights: 5
        },
        realTimeAlerts: {
          enabled: true,
          threshold: 8, // Relevance score 8+ = immediate alert
          channels: ["telegram", "discord"]
        },
        eveningDigest: {
          enabled: true,
          time: "18:00",
          timezone: "Pacific/Auckland"
        }
      },

      // Insight scoring
      scoring: {
        weights: {
          relevance: 0.4,
          actionability: 0.3,
          timeliness: 0.2,
          engagement: 0.1
        },
        categories: {
          nz_business: 1.2,
          marketing: 1.1,
          wealth_management: 1.1,
          ai: 1.0,
          productivity: 1.0
        }
      },

      // Integration
      integration: {
        supermemory: true,
        morningBriefing: true,
        heartbeat: true
      }
    };
  }

  /**
   * Execute a script and capture output
   */
  async runScript(scriptPath, args = []) {
    return new Promise((resolve, reject) => {
      console.log(`  🚀 Running: node ${scriptPath} ${args.join(' ')}`);
      
      const child = spawn('node', [scriptPath, ...args], {
        cwd: path.join(__dirname, '..'),
        stdio: 'pipe'
      });

      let stdout = '';
      let stderr = '';

      child.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      child.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      child.on('close', (code) => {
        if (code === 0) {
          resolve({ stdout, stderr, code });
        } else {
          reject(new Error(`Script exited with code ${code}\n${stderr}`));
        }
      });

      child.on('error', (err) => {
        reject(err);
      });
    });
  }

  /**
   * Check if extraction source should run
   */
  shouldRun(source) {
    const sourceConfig = this.config.schedule[source];
    if (!sourceConfig || !sourceConfig.enabled) return false;

    const lastRun = this.state[`${source}LastRun`];
    if (!lastRun) return true;

    const frequency = sourceConfig.frequency;
    const hours = parseInt(frequency);
    const lastRunDate = new Date(lastRun);
    const hoursSince = (Date.now() - lastRunDate.getTime()) / (1000 * 60 * 60);

    return hoursSince >= hours;
  }

  /**
   * Run Twitter monitoring
   */
  async runTwitter() {
    if (!this.shouldRun('twitter')) {
      console.log('⏭️  Twitter: Not yet time to run');
      return null;
    }

    console.log('\n🐦 Running Twitter Monitor...');
    
    try {
      const result = await this.runScript(
        this.config.schedule.twitter.script,
        ['monitor']
      );
      
      this.state.twitterLastRun = new Date().toISOString();
      await this.saveState();
      
      console.log('✅ Twitter monitor complete');
      return result;
    } catch (err) {
      console.error('❌ Twitter monitor failed:', err.message);
      return null;
    }
  }

  /**
   * Run article digest
   */
  async runArticles() {
    if (!this.shouldRun('articles')) {
      console.log('⏭️  Articles: Not yet time to run');
      return null;
    }

    console.log('\n📚 Running Article Digest...');
    
    try {
      const result = await this.runScript(
        this.config.schedule.articles.script,
        ['digest']
      );
      
      this.state.articlesLastRun = new Date().toISOString();
      await this.saveState();
      
      console.log('✅ Article digest complete');
      return result;
    } catch (err) {
      console.error('❌ Article digest failed:', err.message);
      return null;
    }
  }

  /**
   * Process book/PDF resource
   */
  async processBook(filePath) {
    console.log(`\n📖 Processing book: ${filePath}`);
    
    // Placeholder for book/PDF extraction
    // Would use PDF parser + Claude API for intelligent extraction
    
    console.log('⚠️  Book processing not yet implemented');
    console.log('TODO: Implement PDF extraction + key concept summarization');
    
    return null;
  }

  /**
   * Fetch recent insights from Supermemory
   */
  async getRecentInsights(hours = 24) {
    console.log(`\n🔍 Fetching insights from last ${hours} hours...`);
    
    try {
      // Search for recent insights
      const results = await this.supermemory.search(
        'insight OR framework OR strategy OR lesson',
        20
      );

      if (!results || !results.results) return [];

      // Filter by timestamp
      const cutoff = Date.now() - (hours * 60 * 60 * 1000);
      const recentResults = results.results.filter(r => {
        const timestamp = new Date(r.createdAt || 0).getTime();
        return timestamp > cutoff;
      });

      console.log(`  Found ${recentResults.length} recent insights`);
      return recentResults;
    } catch (err) {
      console.error('❌ Failed to fetch insights:', err.message);
      return [];
    }
  }

  /**
   * Score an insight
   */
  scoreInsight(insight) {
    const weights = this.config.scoring.weights;
    let score = 0;

    // Relevance (0-10)
    const relevance = insight.relevance || 5;
    score += (relevance / 10) * weights.relevance;

    // Actionability
    const actionable = insight.actionable ? 1 : 0.5;
    score += actionable * weights.actionability;

    // Timeliness (newer = higher score)
    const hoursSince = insight.createdAt 
      ? (Date.now() - new Date(insight.createdAt).getTime()) / (1000 * 60 * 60)
      : 24;
    const timeliness = Math.max(0, 1 - (hoursSince / 24));
    score += timeliness * weights.timeliness;

    // Engagement
    const engagement = Math.min(1, (insight.engagement || 0) / 1000);
    score += engagement * weights.engagement;

    // Category boost
    const category = insight.category || 'general';
    const categoryBoost = this.config.scoring.categories[category] || 1.0;
    score *= categoryBoost;

    return Math.min(10, score * 10); // Scale to 0-10
  }

  /**
   * Rank and filter insights
   */
  rankInsights(insights) {
    return insights
      .map(insight => ({
        ...insight,
        score: this.scoreInsight(insight)
      }))
      .sort((a, b) => b.score - a.score);
  }

  /**
   * Generate insight summary for delivery
   */
  generateInsightSummary(insights, maxInsights = 5) {
    const topInsights = insights.slice(0, maxInsights);
    
    let summary = '📊 TOP INSIGHTS\n';
    summary += '='.repeat(60) + '\n\n';

    topInsights.forEach((insight, i) => {
      summary += `${i + 1}. [Score: ${insight.score.toFixed(1)}/10] ${insight.type || 'General'}\n`;
      summary += `   ${insight.content || insight.memory || 'No content'}\n`;
      summary += `   Source: ${insight.source || 'Unknown'}\n`;
      if (insight.url) summary += `   ${insight.url}\n`;
      summary += '\n';
    });

    return summary;
  }

  /**
   * Check if it's time for morning briefing
   */
  isTimeForMorningBriefing() {
    const now = new Date();
    const [targetHour, targetMin] = this.config.delivery.morningBriefing.time.split(':');
    
    const currentHour = now.getHours();
    const currentMin = now.getMinutes();
    
    // Check if we're within 15 minutes of target time
    const targetTime = parseInt(targetHour) * 60 + parseInt(targetMin);
    const currentTime = currentHour * 60 + currentMin;
    
    return Math.abs(currentTime - targetTime) <= 15;
  }

  /**
   * Deliver insights to morning briefing
   */
  async deliverMorningInsights() {
    console.log('\n🌅 Preparing morning insight delivery...');
    
    // Get recent insights (last 24 hours)
    const insights = await this.getRecentInsights(24);
    const rankedInsights = this.rankInsights(insights);
    
    const summary = this.generateInsightSummary(
      rankedInsights,
      this.config.delivery.morningBriefing.maxInsights
    );

    // Save summary for morning briefing to read
    const summaryPath = path.join(__dirname, '..', 'cache', 'morning-insights.txt');
    await fs.mkdir(path.dirname(summaryPath), { recursive: true });
    await fs.writeFile(summaryPath, summary);

    console.log('✅ Morning insights prepared');
    console.log(summary);

    return summary;
  }

  /**
   * Check for high-priority alerts
   */
  async checkForAlerts(insights) {
    const threshold = this.config.delivery.realTimeAlerts.threshold;
    const alerts = insights.filter(i => i.score >= threshold);

    if (alerts.length > 0) {
      console.log(`\n🚨 ${alerts.length} HIGH-PRIORITY ALERTS!`);
      alerts.forEach(alert => {
        console.log(`  ⚡ [${alert.score.toFixed(1)}/10] ${alert.type || 'Alert'}`);
        console.log(`     ${(alert.content || alert.memory || '').substring(0, 100)}...`);
      });
      
      // TODO: Send real-time notifications via configured channels
    }

    return alerts;
  }

  /**
   * Save state
   */
  async saveState() {
    await fs.writeFile(STATE_PATH, JSON.stringify(this.state, null, 2));
  }

  /**
   * Run full extraction pipeline
   */
  async run(options = {}) {
    console.log('🚀 Information Extraction Pipeline Starting...\n');
    console.log(`Time: ${new Date().toLocaleString()}`);
    console.log('='.repeat(60));

    const results = {
      twitter: null,
      articles: null,
      insights: [],
      alerts: []
    };

    // Run Twitter monitoring
    if (!options.skipTwitter) {
      results.twitter = await this.runTwitter();
    }

    // Run article digest
    if (!options.skipArticles) {
      results.articles = await this.runArticles();
    }

    // Fetch and rank insights
    console.log('\n📊 Analyzing insights...');
    const recentInsights = await this.getRecentInsights(24);
    results.insights = this.rankInsights(recentInsights);

    // Check for alerts
    results.alerts = await this.checkForAlerts(results.insights);

    // Check if morning briefing time
    if (this.isTimeForMorningBriefing() && 
        this.config.delivery.morningBriefing.enabled) {
      await this.deliverMorningInsights();
    }

    // Update state
    this.state.lastRun = new Date().toISOString();
    this.state.runs += 1;
    await this.saveState();

    // Generate report
    console.log('\n' + '='.repeat(60));
    console.log('📊 PIPELINE REPORT');
    console.log('='.repeat(60));
    console.log(`Total Insights: ${results.insights.length}`);
    console.log(`High-Priority Alerts: ${results.alerts.length}`);
    console.log(`Runs Completed: ${this.state.runs}`);
    console.log('='.repeat(60));

    console.log('\n✅ Pipeline complete!');

    return results;
  }

  /**
   * Show pipeline status
   */
  async status() {
    console.log('📊 Information Pipeline Status\n');
    console.log('='.repeat(60));
    
    console.log('\n🔄 SCHEDULE:');
    for (const [source, config] of Object.entries(this.config.schedule)) {
      const lastRun = this.state[`${source}LastRun`];
      const status = config.enabled ? '✅ Enabled' : '❌ Disabled';
      console.log(`  ${source}: ${status} (${config.frequency})`);
      if (lastRun) {
        console.log(`    Last run: ${new Date(lastRun).toLocaleString()}`);
      } else {
        console.log(`    Last run: Never`);
      }
    }

    console.log('\n📬 DELIVERY:');
    const morning = this.config.delivery.morningBriefing;
    console.log(`  Morning Briefing: ${morning.enabled ? '✅' : '❌'} ${morning.time} ${morning.timezone}`);
    
    const alerts = this.config.delivery.realTimeAlerts;
    console.log(`  Real-time Alerts: ${alerts.enabled ? '✅' : '❌'} (threshold: ${alerts.threshold}/10)`);
    
    const evening = this.config.delivery.eveningDigest;
    console.log(`  Evening Digest: ${evening.enabled ? '✅' : '❌'} ${evening.time}`);

    console.log('\n📈 STATS:');
    console.log(`  Total runs: ${this.state.runs}`);
    if (this.state.lastRun) {
      console.log(`  Last run: ${new Date(this.state.lastRun).toLocaleString()}`);
    }

    console.log('\n' + '='.repeat(60));
  }
}

// CLI interface
async function main() {
  try {
    const [command, ...args] = process.argv.slice(2);

    const pipeline = await new InformationPipeline().init();

    switch (command) {
      case 'run':
        const options = {
          skipTwitter: args.includes('--skip-twitter'),
          skipArticles: args.includes('--skip-articles')
        };
        await pipeline.run(options);
        break;

      case 'twitter':
        await pipeline.runTwitter();
        break;

      case 'articles':
        await pipeline.runArticles();
        break;

      case 'book':
        const bookPath = args[0];
        if (!bookPath) {
          console.error('❌ Usage: node info-extraction-pipeline.js book <path>');
          process.exit(1);
        }
        await pipeline.processBook(bookPath);
        break;

      case 'insights':
        const hours = parseInt(args[0]) || 24;
        const insights = await pipeline.getRecentInsights(hours);
        const ranked = pipeline.rankInsights(insights);
        console.log(pipeline.generateInsightSummary(ranked, 10));
        break;

      case 'morning':
        await pipeline.deliverMorningInsights();
        break;

      case 'status':
        await pipeline.status();
        break;

      case 'config':
        console.log('⚙️  Configuration:\n');
        console.log(JSON.stringify(pipeline.config, null, 2));
        break;

      default:
        console.log(`
🚀 Information Extraction & Intelligence Pipeline

Usage:
  node scripts/info-extraction-pipeline.js run              Run full pipeline
  node scripts/info-extraction-pipeline.js twitter          Run Twitter monitor only
  node scripts/info-extraction-pipeline.js articles         Run article digest only
  node scripts/info-extraction-pipeline.js book <path>      Process book/PDF
  node scripts/info-extraction-pipeline.js insights [hours] Show recent insights
  node scripts/info-extraction-pipeline.js morning          Generate morning briefing
  node scripts/info-extraction-pipeline.js status           Show pipeline status
  node scripts/info-extraction-pipeline.js config           Show configuration

Options:
  --skip-twitter    Skip Twitter monitoring
  --skip-articles   Skip article digest

Examples:
  node scripts/info-extraction-pipeline.js run
  node scripts/info-extraction-pipeline.js run --skip-twitter
  node scripts/info-extraction-pipeline.js insights 48
  node scripts/info-extraction-pipeline.js book ~/Downloads/book.pdf

Automation:
  Add to HEARTBEAT.md for automatic execution:
  - Run every 4 hours for continuous monitoring
  - Morning briefing integration at 8am
  - Real-time alerts for high-priority insights
        `);
    }
  } catch (err) {
    console.error('❌ Error:', err.message);
    if (err.stack) console.error(err.stack);
    process.exit(1);
  }
}

main();
