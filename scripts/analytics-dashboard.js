#!/usr/bin/env node
/**
 * Analytics Dashboard
 * - Track traffic, conversions, revenue across all channels
 * - Visualize performance
 * - Generate reports
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

class AnalyticsDashboard {
  constructor() {
    this.dataDir = path.join(__dirname, '..', 'data');
    this.analyticsPath = path.join(this.dataDir, 'analytics.json');
    
    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive: true });
    }

    this.loadAnalytics();
  }

  loadAnalytics() {
    if (fs.existsSync(this.analyticsPath)) {
      this.analytics = JSON.parse(fs.readFileSync(this.analyticsPath, 'utf8'));
    } else {
      this.analytics = {
        traffic: [],
        conversions: [],
        revenue: [],
        channels: {
          blog: { views: 0, clicks: 0, conversions: 0, revenue: 0 },
          twitter: { impressions: 0, clicks: 0, followers: 0 },
          linkedin: { impressions: 0, clicks: 0, followers: 0 },
          youtube: { views: 0, subscribers: 0, revenue: 0 },
          newsletter: { subscribers: 0, opens: 0, clicks: 0 }
        },
        goals: {
          monthlyRevenue: 5000,
          subscribers: 1000,
          blogViews: 10000
        }
      };
      this.saveAnalytics();
    }
  }

  saveAnalytics() {
    fs.writeFileSync(this.analyticsPath, JSON.stringify(this.analytics, null, 2));
  }

  /**
   * Log traffic event
   */
  logTraffic(channel, views, source = 'organic') {
    const event = {
      date: new Date().toISOString(),
      channel,
      views,
      source
    };

    this.analytics.traffic.push(event);

    if (this.analytics.channels[channel]) {
      this.analytics.channels[channel].views = 
        (this.analytics.channels[channel].views || 0) + views;
    }

    this.saveAnalytics();
    return event;
  }

  /**
   * Log conversion
   */
  logConversion(channel, type, value = 0) {
    const event = {
      date: new Date().toISOString(),
      channel,
      type, // 'newsletter', 'course', 'affiliate', 'consulting'
      value
    };

    this.analytics.conversions.push(event);

    if (this.analytics.channels[channel]) {
      this.analytics.channels[channel].conversions = 
        (this.analytics.channels[channel].conversions || 0) + 1;
    }

    this.saveAnalytics();
    return event;
  }

  /**
   * Log revenue
   */
  logRevenue(source, amount, type) {
    const event = {
      date: new Date().toISOString(),
      source,
      amount,
      type // 'adsense', 'affiliate', 'course', 'sponsorship', 'consulting'
    };

    this.analytics.revenue.push(event);

    if (this.analytics.channels[source]) {
      this.analytics.channels[source].revenue = 
        (this.analytics.channels[source].revenue || 0) + amount;
    }

    this.saveAnalytics();
    return event;
  }

  /**
   * Get summary for period
   */
  getSummary(period = 'month') {
    const now = new Date();
    let startDate;

    if (period === 'today') {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    } else if (period === 'week') {
      startDate = new Date(now - 7 * 24 * 60 * 60 * 1000);
    } else if (period === 'month') {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    } else {
      startDate = new Date(0); // All time
    }

    const trafficInPeriod = this.analytics.traffic.filter(e => 
      new Date(e.date) >= startDate
    );

    const conversionsInPeriod = this.analytics.conversions.filter(e => 
      new Date(e.date) >= startDate
    );

    const revenueInPeriod = this.analytics.revenue.filter(e => 
      new Date(e.date) >= startDate
    );

    const totalViews = trafficInPeriod.reduce((sum, e) => sum + e.views, 0);
    const totalConversions = conversionsInPeriod.length;
    const totalRevenue = revenueInPeriod.reduce((sum, e) => sum + e.amount, 0);

    const conversionRate = totalViews > 0 ? (totalConversions / totalViews) * 100 : 0;

    // Group by channel
    const byChannel = {};
    
    trafficInPeriod.forEach(e => {
      if (!byChannel[e.channel]) {
        byChannel[e.channel] = { views: 0, conversions: 0, revenue: 0 };
      }
      byChannel[e.channel].views += e.views;
    });

    conversionsInPeriod.forEach(e => {
      if (byChannel[e.channel]) {
        byChannel[e.channel].conversions += 1;
      }
    });

    revenueInPeriod.forEach(e => {
      if (byChannel[e.source]) {
        byChannel[e.source].revenue += e.amount;
      }
    });

    // Group revenue by type
    const revenueByType = {};
    revenueInPeriod.forEach(e => {
      revenueByType[e.type] = (revenueByType[e.type] || 0) + e.amount;
    });

    return {
      period,
      totalViews,
      totalConversions,
      totalRevenue,
      conversionRate,
      byChannel,
      revenueByType
    };
  }

  /**
   * Get progress toward goals
   */
  getGoalProgress() {
    const summary = this.getSummary('month');
    
    return {
      revenue: {
        current: summary.totalRevenue,
        goal: this.analytics.goals.monthlyRevenue,
        percentage: (summary.totalRevenue / this.analytics.goals.monthlyRevenue) * 100
      },
      subscribers: {
        current: this.analytics.channels.newsletter.subscribers,
        goal: this.analytics.goals.subscribers,
        percentage: (this.analytics.channels.newsletter.subscribers / this.analytics.goals.subscribers) * 100
      },
      blogViews: {
        current: this.analytics.channels.blog.views,
        goal: this.analytics.goals.blogViews,
        percentage: (this.analytics.channels.blog.views / this.analytics.goals.blogViews) * 100
      }
    };
  }

  /**
   * Generate comprehensive report
   */
  generateReport(period = 'month') {
    const summary = this.getSummary(period);
    const goals = this.getGoalProgress();

    console.log(`\n📊 CONTENT MONETIZATION DASHBOARD\n`);
    console.log(`Period: ${period.toUpperCase()}`);
    console.log(`Generated: ${new Date().toLocaleString()}\n`);

    console.log('═══════════════════════════════════════\n');

    console.log('💰 REVENUE\n');
    console.log(`  Total: $${summary.totalRevenue.toFixed(2)}`);
    console.log(`  Goal:  $${this.analytics.goals.monthlyRevenue.toFixed(2)} (${goals.revenue.percentage.toFixed(1)}%)`);
    console.log('\n  By Type:');
    for (const type in summary.revenueByType) {
      const amount = summary.revenueByType[type];
      const percentage = (amount / summary.totalRevenue) * 100;
      console.log(`    ${type}: $${amount.toFixed(2)} (${percentage.toFixed(1)}%)`);
    }

    console.log('\n═══════════════════════════════════════\n');

    console.log('📈 TRAFFIC\n');
    console.log(`  Total Views: ${summary.totalViews.toLocaleString()}`);
    console.log(`  Conversions: ${summary.totalConversions}`);
    console.log(`  Conversion Rate: ${summary.conversionRate.toFixed(2)}%`);
    console.log('\n  By Channel:');
    
    const channelsSorted = Object.entries(summary.byChannel)
      .sort((a, b) => b[1].views - a[1].views);
    
    channelsSorted.forEach(([channel, stats]) => {
      const rate = stats.views > 0 ? (stats.conversions / stats.views) * 100 : 0;
      console.log(`    ${channel}:`);
      console.log(`      Views: ${stats.views.toLocaleString()}`);
      console.log(`      Conversions: ${stats.conversions} (${rate.toFixed(2)}%)`);
      console.log(`      Revenue: $${stats.revenue.toFixed(2)}`);
    });

    console.log('\n═══════════════════════════════════════\n');

    console.log('🎯 GOALS PROGRESS\n');
    
    console.log(`  Monthly Revenue:`);
    console.log(`    Current: $${goals.revenue.current.toFixed(2)}`);
    console.log(`    Goal:    $${goals.revenue.goal.toFixed(2)}`);
    console.log(`    Progress: ${this.progressBar(goals.revenue.percentage)}`);
    
    console.log(`\n  Newsletter Subscribers:`);
    console.log(`    Current: ${goals.subscribers.current.toLocaleString()}`);
    console.log(`    Goal:    ${goals.subscribers.goal.toLocaleString()}`);
    console.log(`    Progress: ${this.progressBar(goals.subscribers.percentage)}`);
    
    console.log(`\n  Blog Views:`);
    console.log(`    Current: ${goals.blogViews.current.toLocaleString()}`);
    console.log(`    Goal:    ${goals.blogViews.goal.toLocaleString()}`);
    console.log(`    Progress: ${this.progressBar(goals.blogViews.percentage)}`);

    console.log('\n═══════════════════════════════════════\n');

    console.log('💡 INSIGHTS\n');
    this.generateInsights(summary, goals);

    console.log('\n═══════════════════════════════════════\n');
  }

  generateInsights(summary, goals) {
    const insights = [];

    // Revenue insights
    if (goals.revenue.percentage >= 100) {
      insights.push('🎉 Congrats! You hit your monthly revenue goal!');
    } else if (goals.revenue.percentage >= 75) {
      insights.push('💪 You\'re 75%+ to your revenue goal. Keep pushing!');
    } else if (goals.revenue.percentage < 25) {
      insights.push('⚠️  Revenue is below 25% of goal. Focus on monetization.');
    }

    // Conversion insights
    if (summary.conversionRate < 1) {
      insights.push('🔍 Conversion rate is low (<1%). Improve CTAs and landing pages.');
    } else if (summary.conversionRate > 3) {
      insights.push('✅ Strong conversion rate (>3%). Your offers are resonating!');
    }

    // Channel insights
    const topChannel = Object.entries(summary.byChannel)
      .sort((a, b) => b[1].revenue - a[1].revenue)[0];
    
    if (topChannel) {
      insights.push(`🏆 Top revenue channel: ${topChannel[0]} ($${topChannel[1].revenue.toFixed(2)})`);
    }

    // Revenue diversity
    const revenueTypes = Object.keys(summary.revenueByType).length;
    if (revenueTypes < 2) {
      insights.push('⚠️  Revenue relies on 1 source. Diversify income streams!');
    } else if (revenueTypes >= 3) {
      insights.push(`✅ Good diversification: ${revenueTypes} revenue streams`);
    }

    // Growth recommendations
    if (summary.totalRevenue < 1000) {
      insights.push('💼 Focus: Scale traffic and improve affiliate conversions');
    } else if (summary.totalRevenue < 3000) {
      insights.push('💼 Focus: Launch digital product or premium newsletter tier');
    } else {
      insights.push('💼 Focus: Systemize and scale what\'s working');
    }

    insights.forEach(insight => console.log(`  ${insight}`));
  }

  progressBar(percentage, width = 30) {
    const filled = Math.round((percentage / 100) * width);
    const empty = width - filled;
    const bar = '█'.repeat(filled) + '░'.repeat(empty);
    return `${bar} ${percentage.toFixed(1)}%`;
  }

  /**
   * Start web dashboard server
   */
  startWebServer(port = 3000) {
    const server = http.createServer((req, res) => {
      if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(this.generateHTML());
      } else if (req.url === '/api/data') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const summary = this.getSummary('month');
        const goals = this.getGoalProgress();
        res.end(JSON.stringify({ summary, goals, channels: this.analytics.channels }));
      } else {
        res.writeHead(404);
        res.end('Not found');
      }
    });

    server.listen(port, () => {
      console.log(`\n📊 Dashboard running at http://localhost:${port}`);
      console.log('Press Ctrl+C to stop\n');
    });
  }

  generateHTML() {
    const summary = this.getSummary('month');
    const goals = this.getGoalProgress();

    return `<!DOCTYPE html>
<html>
<head>
  <title>Content Monetization Dashboard</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #0f0f0f;
      color: #e0e0e0;
      padding: 20px;
    }
    .container { max-width: 1400px; margin: 0 auto; }
    h1 { font-size: 2.5em; margin-bottom: 10px; color: #fff; }
    .subtitle { color: #888; margin-bottom: 40px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 30px; }
    .card {
      background: #1a1a1a;
      border: 1px solid #333;
      border-radius: 12px;
      padding: 24px;
      transition: transform 0.2s;
    }
    .card:hover { transform: translateY(-2px); }
    .card h2 { font-size: 1em; color: #888; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 1px; }
    .card .value { font-size: 2.5em; font-weight: bold; color: #fff; margin-bottom: 5px; }
    .card .subvalue { color: #888; font-size: 0.9em; }
    .progress {
      background: #2a2a2a;
      border-radius: 10px;
      height: 10px;
      margin: 15px 0 10px 0;
      overflow: hidden;
    }
    .progress-bar {
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      height: 100%;
      transition: width 0.3s;
    }
    .channel-list { margin-top: 20px; }
    .channel-item {
      background: #252525;
      border-radius: 8px;
      padding: 15px;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .channel-name { font-weight: 600; color: #fff; }
    .channel-stats { display: flex; gap: 20px; font-size: 0.9em; color: #888; }
    .positive { color: #4ade80; }
    .negative { color: #f87171; }
    .emoji { font-size: 1.5em; margin-right: 10px; }
  </style>
</head>
<body>
  <div class="container">
    <h1><span class="emoji">💰</span>Content Monetization Dashboard</h1>
    <p class="subtitle">Your path to $1k-5k/month passive income</p>

    <div class="grid">
      <div class="card">
        <h2>Monthly Revenue</h2>
        <div class="value ${summary.totalRevenue >= this.analytics.goals.monthlyRevenue ? 'positive' : ''}">
          $${summary.totalRevenue.toFixed(0)}
        </div>
        <div class="subvalue">Goal: $${this.analytics.goals.monthlyRevenue.toFixed(0)}</div>
        <div class="progress">
          <div class="progress-bar" style="width: ${Math.min(goals.revenue.percentage, 100)}%"></div>
        </div>
        <div class="subvalue">${goals.revenue.percentage.toFixed(1)}% of goal</div>
      </div>

      <div class="card">
        <h2>Total Views</h2>
        <div class="value">${summary.totalViews.toLocaleString()}</div>
        <div class="subvalue">${summary.totalConversions} conversions</div>
        <div class="progress">
          <div class="progress-bar" style="width: ${Math.min(goals.blogViews.percentage, 100)}%"></div>
        </div>
        <div class="subvalue">${summary.conversionRate.toFixed(2)}% conversion rate</div>
      </div>

      <div class="card">
        <h2>Newsletter Subscribers</h2>
        <div class="value">${this.analytics.channels.newsletter.subscribers.toLocaleString()}</div>
        <div class="subvalue">Goal: ${this.analytics.goals.subscribers.toLocaleString()}</div>
        <div class="progress">
          <div class="progress-bar" style="width: ${Math.min(goals.subscribers.percentage, 100)}%"></div>
        </div>
        <div class="subvalue">${goals.subscribers.percentage.toFixed(1)}% of goal</div>
      </div>

      <div class="card">
        <h2>Revenue Streams</h2>
        <div class="value">${Object.keys(summary.revenueByType).length}</div>
        <div class="subvalue">Active income sources</div>
        <div style="margin-top: 15px;">
          ${Object.entries(summary.revenueByType).map(([type, amount]) => `
            <div style="display: flex; justify-content: space-between; margin: 8px 0;">
              <span style="color: #888;">${type}</span>
              <span style="color: #fff; font-weight: 600;">$${amount.toFixed(0)}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <div class="card">
      <h2>Channels Performance</h2>
      <div class="channel-list">
        ${Object.entries(summary.byChannel).map(([channel, stats]) => `
          <div class="channel-item">
            <div>
              <div class="channel-name">${channel.toUpperCase()}</div>
              <div class="channel-stats">
                <span>${stats.views.toLocaleString()} views</span>
                <span>${stats.conversions} conversions</span>
              </div>
            </div>
            <div class="value" style="font-size: 1.5em;">$${stats.revenue.toFixed(0)}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <div style="text-align: center; margin-top: 40px; color: #666;">
      <p>Last updated: ${new Date().toLocaleString()}</p>
      <p style="margin-top: 10px;">Refresh page to update data</p>
    </div>
  </div>

  <script>
    // Auto-refresh every 5 minutes
    setTimeout(() => location.reload(), 5 * 60 * 1000);
  </script>
</body>
</html>`;
  }
}

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
Analytics Dashboard - Track and visualize content monetization

Usage:
  node analytics-dashboard.js report [period]     - Generate report (today/week/month/all)
  node analytics-dashboard.js web [port]          - Start web dashboard (default: 3000)
  node analytics-dashboard.js log <type> <data>   - Log event
  node analytics-dashboard.js goals <name> <value> - Set goal

Log Types:
  traffic <channel> <views> [source]
  conversion <channel> <type> [value]
  revenue <source> <amount> <type>

Examples:
  node analytics-dashboard.js report month
  node analytics-dashboard.js web 3000
  node analytics-dashboard.js log traffic blog 500 organic
  node analytics-dashboard.js log revenue blog 29.99 affiliate
  node analytics-dashboard.js goals monthlyRevenue 5000
`);
    process.exit(0);
  }

  const dashboard = new AnalyticsDashboard();
  const command = args[0];

  try {
    if (command === 'report') {
      const period = args[1] || 'month';
      dashboard.generateReport(period);

    } else if (command === 'web') {
      const port = parseInt(args[1]) || 3000;
      dashboard.startWebServer(port);

    } else if (command === 'log') {
      const type = args[1];
      
      if (type === 'traffic') {
        const channel = args[2];
        const views = parseInt(args[3]);
        const source = args[4] || 'organic';
        dashboard.logTraffic(channel, views, source);
        console.log(`✓ Logged ${views} views for ${channel}`);
        
      } else if (type === 'conversion') {
        const channel = args[2];
        const conversionType = args[3];
        const value = parseFloat(args[4]) || 0;
        dashboard.logConversion(channel, conversionType, value);
        console.log(`✓ Logged conversion on ${channel}`);
        
      } else if (type === 'revenue') {
        const source = args[2];
        const amount = parseFloat(args[3]);
        const revenueType = args[4];
        dashboard.logRevenue(source, amount, revenueType);
        console.log(`✓ Logged $${amount} revenue from ${source}`);
        
      } else {
        throw new Error(`Unknown log type: ${type}`);
      }

    } else if (command === 'goals') {
      const goalName = args[1];
      const value = parseFloat(args[2]);
      
      if (dashboard.analytics.goals[goalName] !== undefined) {
        dashboard.analytics.goals[goalName] = value;
        dashboard.saveAnalytics();
        console.log(`✓ Set ${goalName} goal to ${value}`);
      } else {
        throw new Error(`Unknown goal: ${goalName}`);
      }

    } else {
      throw new Error(`Unknown command: ${command}`);
    }

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

module.exports = AnalyticsDashboard;
