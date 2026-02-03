#!/usr/bin/env node
/**
 * Molthunt Daily Monitor
 * Scans trending agent-built projects for validation signals
 * Identifies build opportunities and market trends
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const API_BASE = 'www.molthunt.com';
const API_KEY = process.env.MOLTHUNT_API_KEY || null; // Set after registration
const DATA_DIR = path.join(__dirname, '..', 'data', 'molthunt');
const REPORT_PATH = path.join(DATA_DIR, 'daily-reports');

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(REPORT_PATH)) {
  fs.mkdirSync(REPORT_PATH, { recursive: true });
}

function apiRequest(path, headers = {}) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: API_BASE,
      port: 443,
      path: `/api/v1${path}`,
      method: 'GET',
      headers: {
        ...headers
      }
    };
    
    if (API_KEY) {
      options.headers['Authorization'] = `Bearer ${API_KEY}`;
    }
    
    https.get(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve({ error: 'Parse failed', raw: data });
        }
      });
    }).on('error', reject);
  });
}

async function monitorMolthunt() {
  const timestamp = new Date().toISOString();
  const dateStr = timestamp.split('T')[0];
  
  console.log(`🦞 Molthunt Monitor - ${dateStr}`);
  console.log('─'.repeat(50));
  
  const report = {
    date: dateStr,
    timestamp,
    trending: [],
    today: [],
    highPotential: [],
    categories: {},
    insights: [],
    actionItems: []
  };
  
  try {
    // Fetch trending projects
    console.log('Fetching trending projects...');
    const trending = await apiRequest('/projects?filter=trending&limit=25');
    
    if (trending.projects) {
      report.trending = trending.projects.map(p => ({
        id: p.id,
        name: p.name,
        tagline: p.tagline,
        votes: p.votes,
        comments_count: p.comments_count,
        categories: p.categories,
        coin_symbol: p.coin?.symbol,
        coin_price: p.coin?.price_usd,
        launched_at: p.launched_at
      }));
      
      console.log(`✓ Found ${report.trending.length} trending projects`);
    }
    
    // Fetch today's launches
    console.log('Fetching today\'s launches...');
    const today = await apiRequest('/projects?filter=today&sort=votes');
    
    if (today.projects) {
      report.today = today.projects.map(p => ({
        id: p.id,
        name: p.name,
        tagline: p.tagline,
        votes: p.votes,
        categories: p.categories
      }));
      
      console.log(`✓ Found ${report.today.length} projects launched today`);
    }
    
    // Analyze high-potential opportunities
    console.log('\nAnalyzing high-potential projects...');
    
    const highPotential = report.trending.filter(p => {
      // Criteria: High votes, active comments, launched recently
      const votes = p.votes || 0;
      const comments = p.comments_count || 0;
      const engagement = votes > 50 || comments > 10;
      
      // Launched in past 7 days
      const launchedDate = p.launched_at ? new Date(p.launched_at) : null;
      const daysSinceLaunch = launchedDate 
        ? (Date.now() - launchedDate.getTime()) / (1000 * 60 * 60 * 24)
        : 999;
      
      return engagement && daysSinceLaunch <= 7;
    });
    
    report.highPotential = highPotential.map(p => ({
      ...p,
      reason: `${p.votes} votes, ${p.comments_count} comments - strong validation signal`
    }));
    
    console.log(`✓ Identified ${report.highPotential.length} high-potential opportunities`);
    
    // Category distribution
    const categoryCounts = {};
    [...report.trending, ...report.today].forEach(p => {
      if (p.categories) {
        p.categories.forEach(cat => {
          categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
        });
      }
    });
    
    report.categories = categoryCounts;
    
    // Generate insights
    const topCategories = Object.entries(categoryCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);
    
    if (topCategories.length > 0) {
      report.insights.push({
        type: 'trend',
        message: `Top trending categories: ${topCategories.map(([cat, count]) => `${cat} (${count})`).join(', ')}`
      });
    }
    
    if (report.highPotential.length > 0) {
      report.insights.push({
        type: 'opportunity',
        message: `${report.highPotential.length} projects showing strong validation - potential to build similar/better`
      });
    }
    
    // Action items
    if (!API_KEY) {
      report.actionItems.push({
        priority: 'high',
        action: 'Register on Molthunt and set MOLTHUNT_API_KEY environment variable'
      });
    }
    
    if (report.highPotential.length > 0) {
      report.actionItems.push({
        priority: 'medium',
        action: `Research top 3 high-potential projects: ${report.highPotential.slice(0, 3).map(p => p.name).join(', ')}`
      });
    }
    
  } catch (error) {
    console.error('Error fetching data:', error.message);
    report.insights.push({
      type: 'error',
      message: `Monitor error: ${error.message}`
    });
  }
  
  // Save daily report
  const reportFile = path.join(REPORT_PATH, `${dateStr}.json`);
  fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));
  
  // Update latest snapshot
  const snapshotFile = path.join(DATA_DIR, 'latest.json');
  fs.writeFileSync(snapshotFile, JSON.stringify(report, null, 2));
  
  console.log(`\n✅ Report saved: ${reportFile}`);
  
  // Generate summary
  const summary = generateSummary(report);
  return summary;
}

function generateSummary(report) {
  let summary = `## Molthunt Monitor - ${report.date}\n\n`;
  
  // Registration status
  if (!API_KEY) {
    summary += `⚠️ **NOT REGISTERED YET** - Limited data available\n\n`;
  }
  
  // High-potential opportunities
  if (report.highPotential.length > 0) {
    summary += `### 🔥 High-Potential Opportunities (${report.highPotential.length})\n\n`;
    
    report.highPotential.slice(0, 5).forEach((p, i) => {
      summary += `${i + 1}. **${p.name}** - ${p.tagline}\n`;
      summary += `   - ${p.votes} votes, ${p.comments_count} comments\n`;
      summary += `   - Categories: ${p.categories ? p.categories.join(', ') : 'N/A'}\n`;
      if (p.coin_price) {
        summary += `   - Coin: ${p.coin_symbol} ($${p.coin_price})\n`;
      }
      summary += `\n`;
    });
  }
  
  // Today's launches
  if (report.today.length > 0) {
    summary += `### 🚀 Launched Today (${report.today.length})\n\n`;
    
    report.today.slice(0, 5).forEach((p, i) => {
      summary += `${i + 1}. **${p.name}** - ${p.tagline} (${p.votes} votes)\n`;
    });
    summary += `\n`;
  }
  
  // Trending categories
  if (Object.keys(report.categories).length > 0) {
    summary += `### 📊 Trending Categories\n\n`;
    
    const topCats = Object.entries(report.categories)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
    
    topCats.forEach(([cat, count]) => {
      summary += `- ${cat}: ${count} projects\n`;
    });
    summary += `\n`;
  }
  
  // Insights
  if (report.insights.length > 0) {
    summary += `### 💡 Insights\n\n`;
    report.insights.forEach(insight => {
      summary += `- ${insight.message}\n`;
    });
    summary += `\n`;
  }
  
  // Action items
  if (report.actionItems.length > 0) {
    summary += `### ✅ Action Items\n\n`;
    report.actionItems.forEach(item => {
      const emoji = item.priority === 'high' ? '🔴' : '🟡';
      summary += `${emoji} ${item.action}\n`;
    });
  }
  
  return summary;
}

// Run if called directly
if (require.main === module) {
  monitorMolthunt().then(summary => {
    console.log('\n' + summary);
  }).catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
  });
}

module.exports = { monitorMolthunt, generateSummary };
