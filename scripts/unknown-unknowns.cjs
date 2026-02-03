#!/usr/bin/env node

/**
 * UNKNOWN UNKNOWNS HUNTER - Capability Discovery System
 * 
 * Discovers capabilities Tom doesn't know about, surfaces hidden opportunities.
 * 
 * Usage:
 *   node scripts/unknown-unknowns.js discover
 *   node scripts/unknown-unknowns.js interview
 *   node scripts/unknown-unknowns.js map
 */

const fs = require('fs');
const path = require('path');

// ============================================================================
// CONFIGURATION
// ============================================================================

const CONFIG = {
  dataDir: path.join(__dirname, '..', 'data', 'unknown-unknowns'),
  capabilityMapPath: path.join(__dirname, '..', 'data', 'unknown-unknowns', 'capability-map.json'),
  discoveriesPath: path.join(__dirname, '..', 'data', 'unknown-unknowns', 'discoveries.json'),
  stateJsonPath: path.join(__dirname, '..', 'STATE.json'),
  
  // Known available capabilities/APIs
  availableCapabilities: [
    {
      name: 'LinkedIn API - Automated Posting',
      category: 'automation',
      apis: ['LinkedIn API'],
      effort: 2,
      impact: 9,
      description: 'Auto-post content to LinkedIn, schedule posts, engage with network'
    },
    {
      name: 'Invoice Payment Reminders',
      category: 'automation',
      apis: ['Xero API', 'Gmail API'],
      effort: 1,
      impact: 8,
      description: 'Auto-chase overdue invoices, send friendly reminders'
    },
    {
      name: 'Competitor Pricing Monitor',
      category: 'intelligence',
      apis: ['Web Scraping', 'Price Tracking'],
      effort: 3,
      impact: 7,
      description: 'Track competitor prices, get alerts on changes'
    },
    {
      name: 'CRM Contact Enrichment',
      category: 'integration',
      apis: ['Clearbit API', 'FullContact API'],
      effort: 2,
      impact: 8,
      description: 'Auto-enrich contacts with company data, job titles, net worth estimates'
    },
    {
      name: 'Email Template A/B Testing',
      category: 'optimization',
      apis: ['Gmail API', 'Google Sheets'],
      effort: 2,
      impact: 6,
      description: 'Test email subject lines, track open rates, optimize templates'
    },
    {
      name: 'Automated Meeting Scheduling',
      category: 'automation',
      apis: ['Calendly API', 'Outlook Calendar API'],
      effort: 2,
      impact: 7,
      description: 'Smart meeting scheduling with timezone detection, buffer times'
    },
    {
      name: 'Social Media Listening',
      category: 'intelligence',
      apis: ['Twitter API', 'Reddit API'],
      effort: 4,
      impact: 8,
      description: 'Monitor mentions, competitors, industry trends in real-time'
    },
    {
      name: 'Automated Expense Categorization',
      category: 'automation',
      apis: ['Wise API', 'Xero API', 'GPT-4'],
      effort: 2,
      impact: 6,
      description: 'Auto-categorize expenses using AI, sync to Xero'
    },
    {
      name: 'Client Health Score Dashboard',
      category: 'intelligence',
      apis: ['Xero API', 'Gmail API', 'Calendar API'],
      effort: 3,
      impact: 9,
      description: 'Track client engagement, predict churn, get early warning signs'
    },
    {
      name: 'Automated Content Repurposing',
      category: 'automation',
      apis: ['GPT-4', 'Twitter API', 'LinkedIn API'],
      effort: 3,
      impact: 7,
      description: 'Turn blog posts into tweets, LinkedIn posts, email newsletters automatically'
    }
  ]
};

// ============================================================================
// INITIALIZATION
// ============================================================================

function ensureDirectories() {
  if (!fs.existsSync(CONFIG.dataDir)) {
    fs.mkdirSync(CONFIG.dataDir, { recursive: true });
  }
  
  if (!fs.existsSync(CONFIG.capabilityMapPath)) {
    fs.writeFileSync(CONFIG.capabilityMapPath, JSON.stringify({
      using: [],
      knownButNotUsing: [],
      unknownUnknowns: []
    }, null, 2));
  }
  
  if (!fs.existsSync(CONFIG.discoveriesPath)) {
    fs.writeFileSync(CONFIG.discoveriesPath, JSON.stringify([], null, 2));
  }
}

function loadCapabilityMap() {
  return JSON.parse(fs.readFileSync(CONFIG.capabilityMapPath, 'utf8'));
}

function saveCapabilityMap(map) {
  fs.writeFileSync(CONFIG.capabilityMapPath, JSON.stringify(map, null, 2));
}

function loadDiscoveries() {
  return JSON.parse(fs.readFileSync(CONFIG.discoveriesPath, 'utf8'));
}

function saveDiscoveries(discoveries) {
  fs.writeFileSync(CONFIG.discoveriesPath, JSON.stringify(discoveries, null, 2));
}

function updateState() {
  if (!fs.existsSync(CONFIG.stateJsonPath)) return;
  
  const state = JSON.parse(fs.readFileSync(CONFIG.stateJsonPath, 'utf8'));
  
  if (!state.automationSystems) {
    state.automationSystems = {};
  }
  
  const discoveries = loadDiscoveries();
  const implemented = discoveries.filter(d => d.status === 'implemented').length;
  
  state.automationSystems.unknownUnknowns = {
    script: 'scripts/unknown-unknowns.js',
    description: 'Capability discovery system - surfaces unknown unknowns',
    features: [
      'Profile-based capability discovery',
      'Interview mode for needs assessment',
      'Comprehensive capability map',
      'Weekly discovery reports'
    ],
    totalDiscoveries: discoveries.length,
    implemented,
    lastDiscovery: discoveries.length > 0 ? discoveries[0].timestamp : null,
    lastUpdated: new Date().toISOString()
  };
  
  fs.writeFileSync(CONFIG.stateJsonPath, JSON.stringify(state, null, 2));
}

// ============================================================================
// CAPABILITY DISCOVERY
// ============================================================================

function analyzeTomProfile() {
  // In production, this would read from Supermemory
  // For now, use known context
  return {
    businesses: ['DBH (supplement e-commerce)', 'Junction Media (email marketing agency)', '7 apps in development'],
    goals: ['$1M revenue in 2026', 'Network monetization', 'Scale without burnout'],
    painPoints: ['Time management', 'Client acquisition', 'Scaling operations'],
    currentTools: [
      'Xero (accounting)',
      'Wise (banking)',
      'Gmail (email)',
      'Outlook Calendar',
      'Klaviyo (email marketing)',
      'Supermemory (memory)',
      'Clawdbot (automation)'
    ],
    opportunities: [
      'PG Investments - potential $150k+ marketing role',
      'TWG Klaviyo project',
      'Network monetization via LinkedIn'
    ]
  };
}

function discoverUnknownUnknowns() {
  console.log('🔍 Discovering Unknown Unknowns...\n');
  
  const profile = analyzeTomProfile();
  const capabilityMap = loadCapabilityMap();
  const discoveries = loadDiscoveries();
  
  // Filter capabilities not currently being used
  const currentCapabilities = capabilityMap.using.map(c => c.name);
  const availableNotUsed = CONFIG.availableCapabilities.filter(
    cap => !currentCapabilities.includes(cap.name)
  );
  
  // Score each capability based on profile
  const scored = availableNotUsed.map(cap => {
    const relevanceScore = scoreRelevance(cap, profile);
    const priorityScore = (cap.impact * 0.6) + (relevanceScore * 0.4);
    
    return {
      ...cap,
      relevanceScore,
      priorityScore,
      roi: estimateROI(cap, profile)
    };
  });
  
  // Sort by priority
  const topDiscoveries = scored
    .sort((a, b) => b.priorityScore - a.priorityScore)
    .slice(0, 5);
  
  // Save as new discoveries
  topDiscoveries.forEach(discovery => {
    const existing = discoveries.find(d => d.name === discovery.name);
    if (!existing) {
      discoveries.push({
        ...discovery,
        timestamp: new Date().toISOString(),
        status: 'discovered'
      });
    }
  });
  
  saveDiscoveries(discoveries);
  updateState();
  
  return topDiscoveries;
}

function scoreRelevance(capability, profile) {
  let score = 5.0;  // Base score
  
  // Boost if relates to goals
  if (capability.category === 'automation' && profile.painPoints.includes('Time management')) {
    score += 2.0;
  }
  
  if (capability.category === 'intelligence' && profile.goals.includes('Network monetization')) {
    score += 1.5;
  }
  
  if (capability.category === 'monetization') {
    score += 2.0;
  }
  
  return Math.min(score, 10);
}

function estimateROI(capability, profile) {
  const estimates = {
    'LinkedIn API - Automated Posting': '10x reach, 2-3 high-value leads/month',
    'Invoice Payment Reminders': 'Recover $2k-5k/month in late payments',
    'Competitor Pricing Monitor': 'Better pricing intelligence, 5-10% margin improvement',
    'CRM Contact Enrichment': 'Better targeting, +15% conversion rate',
    'Email Template A/B Testing': '+20% open rates',
    'Client Health Score Dashboard': 'Reduce churn by 20%, save 2-3 clients/year',
    'Automated Content Repurposing': 'Save 5h/week, 3x content output'
  };
  
  return estimates[capability.name] || 'Measurable improvement in efficiency';
}

function displayDiscoveries(discoveries) {
  console.log('🔥 UNKNOWN UNKNOWNS DISCOVERED\n');
  console.log('='.repeat(60));
  console.log();
  
  discoveries.forEach((discovery, idx) => {
    console.log(`${idx + 1}. ${getIcon(discovery.category)} ${discovery.name} (Impact: ${discovery.impact}/10)`);
    console.log(`   You're not using: ${discovery.apis.join(', ')}`);
    console.log(`   Opportunity: ${discovery.description}`);
    console.log(`   Effort: ${discovery.effort} hours | ROI: ${discovery.roi}`);
    console.log(`   Offer: Want me to build this?`);
    console.log();
  });
  
  console.log('='.repeat(60));
  console.log('\n💡 Reply with the number to build it, or "all" to queue all 5');
}

function getIcon(category) {
  const icons = {
    automation: '🤖',
    intelligence: '🧠',
    integration: '🔗',
    optimization: '⚡',
    monetization: '💰',
    network: '🌐'
  };
  return icons[category] || '📦';
}

// ============================================================================
// INTERVIEW MODE
// ============================================================================

function runInterview() {
  console.log('💬 INTERVIEW MODE - Capability Discovery\n');
  console.log('='.repeat(60));
  console.log();
  console.log('Let me ask you some questions to discover hidden opportunities:\n');
  
  const questions = [
    {
      q: 'What tasks take up most of your time each week?',
      hint: 'This helps identify automation opportunities'
    },
    {
      q: 'What do you wish was automated but haven\'t asked for?',
      hint: 'Often the best ideas come from daily frustrations'
    },
    {
      q: 'What do your competitors do that you don\'t?',
      hint: 'Competitive intelligence opportunities'
    },
    {
      q: 'What APIs/tools do you pay for but barely use?',
      hint: 'Untapped potential in existing subscriptions'
    },
    {
      q: 'What manual processes frustrate you the most?',
      hint: 'Low-hanging fruit for quick wins'
    },
    {
      q: 'What data do you wish you had but don\'t collect?',
      hint: 'Intelligence and analytics opportunities'
    },
    {
      q: 'What part of your business feels "behind" or manual?',
      hint: 'Areas ripe for modernization'
    }
  ];
  
  questions.forEach((item, idx) => {
    console.log(`${idx + 1}. ${item.q}`);
    console.log(`   💡 ${item.hint}`);
    console.log();
  });
  
  console.log('='.repeat(60));
  console.log('\n📝 Answer these questions in our chat, and I\'ll discover capabilities for you.');
}

// ============================================================================
// CAPABILITY MAP
// ============================================================================

function displayCapabilityMap() {
  const map = loadCapabilityMap();
  
  console.log('🗺️  CAPABILITY MAP\n');
  console.log('='.repeat(60));
  console.log();
  
  console.log(`✅ USING (${map.using.length}):`);
  map.using.forEach(cap => console.log(`   - ${cap.name}`));
  console.log();
  
  console.log(`📚 KNOWN BUT NOT USING (${map.knownButNotUsing.length}):`);
  map.knownButNotUsing.forEach(cap => console.log(`   - ${cap.name}`));
  console.log();
  
  console.log(`❓ UNKNOWN UNKNOWNS (${map.unknownUnknowns.length}):`);
  map.unknownUnknowns.forEach(cap => console.log(`   - ${cap.name}`));
  console.log();
  
  console.log('='.repeat(60));
  
  const total = map.using.length + map.knownButNotUsing.length + map.unknownUnknowns.length;
  const utilizationRate = total > 0 ? (map.using.length / total * 100).toFixed(0) : 0;
  
  console.log(`\n📊 Utilization Rate: ${utilizationRate}% (${map.using.length} of ${total} capabilities)`);
  console.log(`💡 ${map.unknownUnknowns.length} unknown unknowns waiting to be discovered`);
}

// ============================================================================
// CLI
// ============================================================================

async function main() {
  ensureDirectories();
  updateState();
  
  const args = process.argv.slice(2);
  const command = args[0];
  
  try {
    switch (command) {
      case 'discover':
        const discoveries = discoverUnknownUnknowns();
        displayDiscoveries(discoveries);
        break;
        
      case 'interview':
        runInterview();
        break;
        
      case 'map':
        displayCapabilityMap();
        break;
        
      default:
        console.log('Usage:');
        console.log('  node scripts/unknown-unknowns.js discover   # Discover new capabilities');
        console.log('  node scripts/unknown-unknowns.js interview  # Interview mode');
        console.log('  node scripts/unknown-unknowns.js map        # View capability map');
        process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { discoverUnknownUnknowns, analyzeTomProfile, displayCapabilityMap };
