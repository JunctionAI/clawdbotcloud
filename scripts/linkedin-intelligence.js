#!/usr/bin/env node
/**
 * LinkedIn Intelligence System
 * Analyze connections, detect opportunities, identify high-value targets
 * 
 * OBJECTIVE: Turn LinkedIn network into revenue opportunities
 * 
 * FEATURES:
 * - Connection value scoring (who can afford high-ticket services?)
 * - Job change detection (new roles = new budgets)
 * - Warm intro path mapping (A → B → C)
 * - Decision-maker identification (who controls budgets?)
 * - Content strategy (attract high-value connections)
 */

import fs from 'fs';
import path from 'path';

// Data paths
const DATA_DIR = 'data/linkedin';
const CONNECTIONS_FILE = path.join(DATA_DIR, 'connections.json');
const TRACKING_FILE = path.join(DATA_DIR, 'connection-tracking.json');
const OPPORTUNITIES_FILE = path.join(DATA_DIR, 'opportunities.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize default data structures
function initializeFiles() {
  if (!fs.existsSync(CONNECTIONS_FILE)) {
    fs.writeFileSync(CONNECTIONS_FILE, JSON.stringify({ connections: [] }, null, 2));
  }
  if (!fs.existsSync(TRACKING_FILE)) {
    fs.writeFileSync(TRACKING_FILE, JSON.stringify({ lastChecked: null, jobChanges: [] }, null, 2));
  }
  if (!fs.existsSync(OPPORTUNITIES_FILE)) {
    fs.writeFileSync(OPPORTUNITIES_FILE, JSON.stringify({ opportunities: [] }, null, 2));
  }
}

// Connection value scoring (0-10)
function scoreConnectionValue(connection) {
  let score = 0;
  
  // Company indicators
  const highValueCompanies = ['Google', 'Microsoft', 'Amazon', 'Facebook', 'Meta', 'Apple', 
    'Netflix', 'Tesla', 'Stripe', 'Shopify', 'Salesforce'];
  const investmentFirms = ['Capital', 'Ventures', 'Partners', 'Equity', 'Investment', 'Holdings'];
  
  if (connection.company) {
    if (highValueCompanies.some(c => connection.company.includes(c))) score += 2;
    if (investmentFirms.some(f => connection.company.includes(f))) score += 3;
  }
  
  // Title indicators (decision-makers)
  const executiveTitles = ['CEO', 'CTO', 'CMO', 'CFO', 'VP', 'Director', 'Head of', 'Chief', 'Founder', 'Owner'];
  const budgetControllers = ['Marketing', 'Growth', 'Digital', 'Product', 'Engineering'];
  
  if (connection.title) {
    if (executiveTitles.some(t => connection.title.includes(t))) score += 3;
    if (budgetControllers.some(b => connection.title.includes(b))) score += 2;
  }
  
  // Industry indicators
  const highValueIndustries = ['SaaS', 'Fintech', 'E-commerce', 'Technology', 'Healthcare Tech', 'AI/ML'];
  if (connection.industry) {
    if (highValueIndustries.some(i => connection.industry.includes(i))) score += 2;
  }
  
  // Network size (influence)
  if (connection.connectionCount) {
    if (connection.connectionCount > 500) score += 1;
    if (connection.connectionCount > 1000) score += 1;
  }
  
  return Math.min(score, 10);
}

// Detect job changes (new role = new budget opportunity)
function detectJobChanges(connections, tracking) {
  const jobChanges = [];
  const now = new Date();
  
  connections.forEach(conn => {
    // Check if job change is recent (within 90 days)
    if (conn.jobChangeDate) {
      const changeDate = new Date(conn.jobChangeDate);
      const daysSinceChange = (now - changeDate) / (1000 * 60 * 60 * 24);
      
      if (daysSinceChange <= 90) {
        jobChanges.push({
          name: conn.name,
          oldRole: conn.previousTitle || 'Unknown',
          newRole: conn.title,
          company: conn.company,
          daysSinceChange: Math.floor(daysSinceChange),
          opportunity: daysSinceChange <= 30 ? 'HOT' : 'WARM',
          reasoning: 'New role = new budget. Reach out to congratulate and explore needs.',
          valueScore: scoreConnectionValue(conn)
        });
      }
    }
  });
  
  return jobChanges.sort((a, b) => b.valueScore - a.valueScore);
}

// Find warm intro paths (A → B → C)
function findWarmIntroPaths(targetName, connections) {
  const paths = [];
  
  // Find direct connections to target
  const directConnection = connections.find(c => c.name === targetName);
  if (directConnection) {
    return [{
      path: ['Tom', targetName],
      strength: 'DIRECT',
      confidence: 'HIGH'
    }];
  }
  
  // Find 2nd-degree connections
  connections.forEach(connector => {
    if (connector.mutualConnections && connector.mutualConnections.includes(targetName)) {
      paths.push({
        path: ['Tom', connector.name, targetName],
        strength: '2ND_DEGREE',
        confidence: connector.relationshipStrength || 'MEDIUM',
        introduction: `"${connector.name}, would you be willing to introduce me to ${targetName}? I'd love to connect about [specific reason]."`
      });
    }
  });
  
  return paths;
}

// Identify high-value targets for outreach
function identifyHighValueTargets(connections) {
  const targets = connections
    .map(conn => ({
      ...conn,
      valueScore: scoreConnectionValue(conn),
      lastContactDays: conn.lastContact ? 
        Math.floor((new Date() - new Date(conn.lastContact)) / (1000 * 60 * 60 * 24)) : 
        999
    }))
    .filter(conn => conn.valueScore >= 6) // Only high-value (6+)
    .sort((a, b) => {
      // Prioritize: high value + long time since contact
      const aScore = a.valueScore + (a.lastContactDays > 90 ? 2 : 0);
      const bScore = b.valueScore + (b.lastContactDays > 90 ? 2 : 0);
      return bScore - aScore;
    });
  
  return targets.slice(0, 20); // Top 20
}

// Content strategy: What to post to attract decision-makers
function generateContentStrategy() {
  return {
    themes: [
      {
        topic: 'Growth Hacking & Marketing ROI',
        reasoning: 'Attracts CMOs, VPs of Marketing, Growth leaders',
        examples: [
          'How we grew [client] from 0 to $X MRR in Y months',
          'The one metric that changed everything for [niche]',
          '5 marketing mistakes costing you 6 figures'
        ]
      },
      {
        topic: 'AI & Automation for Business',
        reasoning: 'Attracts tech-forward executives, CTOs, innovation leaders',
        examples: [
          'We built an AI system that saves 20 hours/week',
          'How AI can 10x your marketing output (real examples)',
          'The future of [industry]: AI case studies'
        ]
      },
      {
        topic: 'Strategic Thinking & Business Insights',
        reasoning: 'Attracts CEOs, founders, strategic leaders',
        examples: [
          'The counterintuitive strategy that scaled [business]',
          'What most companies get wrong about [common problem]',
          'Lessons from building multiple 6-figure businesses'
        ]
      },
      {
        topic: 'Personal Transformation & Productivity',
        reasoning: 'Builds personal brand, attracts high-performers',
        examples: [
          'How I went from [before] to [after] in [timeframe]',
          'The system that 10x\'d my output',
          'Lessons from [interesting experience]'
        ]
      }
    ],
    frequency: '3-5 posts per week',
    engagement: 'Comment on 10 high-value posts daily',
    dm_strategy: 'Follow up with engaged connections (likes/comments from decision-makers)'
  };
}

// Opportunity detection
function detectOpportunities(connections) {
  const opportunities = [];
  
  connections.forEach(conn => {
    const score = scoreConnectionValue(conn);
    
    // High-value connection opportunities
    if (score >= 7) {
      opportunities.push({
        type: 'HIGH_VALUE_OUTREACH',
        connection: conn.name,
        company: conn.company,
        title: conn.title,
        valueScore: score,
        action: `Reach out to ${conn.name} - potential for consulting/partnership`,
        timing: conn.lastContact ? 
          `Last contact: ${Math.floor((new Date() - new Date(conn.lastContact)) / (1000 * 60 * 60 * 24))} days ago` : 
          'No previous contact',
        suggestedMessage: `Hey ${conn.name}, been following your work at ${conn.company}. Would love to connect about [specific topic relevant to their role].`
      });
    }
    
    // Job change opportunities
    if (conn.jobChangeDate) {
      const daysSinceChange = Math.floor((new Date() - new Date(conn.jobChangeDate)) / (1000 * 60 * 60 * 24));
      if (daysSinceChange <= 60) {
        opportunities.push({
          type: 'JOB_CHANGE_CONGRATS',
          connection: conn.name,
          company: conn.company,
          title: conn.title,
          newRole: conn.title,
          daysSinceChange,
          action: `Congratulate ${conn.name} on new role, explore budget/needs`,
          suggestedMessage: `Congrats on the new role at ${conn.company}! As you're getting settled in, would love to chat about [relevant topic] if it's helpful.`
        });
      }
    }
  });
  
  return opportunities.sort((a, b) => (b.valueScore || 0) - (a.valueScore || 0));
}

// Main analysis function
async function analyzeNetwork() {
  initializeFiles();
  
  const connectionsData = JSON.parse(fs.readFileSync(CONNECTIONS_FILE, 'utf8'));
  const tracking = JSON.parse(fs.readFileSync(TRACKING_FILE, 'utf8'));
  
  const connections = connectionsData.connections || [];
  
  if (connections.length === 0) {
    console.log('📊 LINKEDIN INTELLIGENCE\n');
    console.log('⚠️  No connections data found.\n');
    console.log('📝 To use this system:');
    console.log('   1. Export your LinkedIn connections (Settings → Data Privacy → Get a copy)');
    console.log('   2. Parse CSV and save to data/linkedin/connections.json');
    console.log('   3. Run this script again\n');
    console.log('Expected format:');
    console.log(JSON.stringify({
      connections: [
        {
          name: 'John Doe',
          title: 'CEO at Tech Co',
          company: 'Tech Co',
          industry: 'SaaS',
          connectionCount: 500,
          lastContact: '2026-01-15',
          relationshipStrength: 'STRONG',
          mutualConnections: ['Jane Smith'],
          email: 'john@techco.com',
          notes: 'Met at conference 2024'
        }
      ]
    }, null, 2));
    return;
  }
  
  console.log('📊 LINKEDIN INTELLIGENCE REPORT\n');
  console.log(`Total Connections: ${connections.length}\n`);
  
  // High-value targets
  console.log('🎯 HIGH-VALUE TARGETS (Score 6+):\n');
  const highValueTargets = identifyHighValueTargets(connections);
  highValueTargets.forEach((target, i) => {
    console.log(`${i + 1}. ${target.name} [Score: ${target.valueScore}/10]`);
    console.log(`   ${target.title} @ ${target.company}`);
    console.log(`   Last contact: ${target.lastContactDays === 999 ? 'Never' : target.lastContactDays + ' days ago'}`);
    console.log(`   Action: ${target.lastContactDays > 90 ? 'REACH OUT NOW' : 'Stay engaged'}\n`);
  });
  
  // Job changes
  console.log('💼 RECENT JOB CHANGES (New Budget Opportunities):\n');
  const jobChanges = detectJobChanges(connections, tracking);
  if (jobChanges.length === 0) {
    console.log('   No recent job changes detected.\n');
  } else {
    jobChanges.forEach((change, i) => {
      console.log(`${i + 1}. ${change.name} [${change.opportunity}]`);
      console.log(`   ${change.oldRole} → ${change.newRole}`);
      console.log(`   ${change.company} (${change.daysSinceChange} days ago)`);
      console.log(`   💡 ${change.reasoning}\n`);
    });
  }
  
  // Opportunities
  console.log('🚀 DETECTED OPPORTUNITIES:\n');
  const opportunities = detectOpportunities(connections);
  if (opportunities.length === 0) {
    console.log('   No opportunities detected. Add more connection data.\n');
  } else {
    opportunities.slice(0, 10).forEach((opp, i) => {
      console.log(`${i + 1}. [${opp.type}] ${opp.connection}`);
      console.log(`   ${opp.action}`);
      if (opp.suggestedMessage) {
        console.log(`   💬 "${opp.suggestedMessage}"\n`);
      }
    });
  }
  
  // Content strategy
  console.log('📝 CONTENT STRATEGY:\n');
  const strategy = generateContentStrategy();
  strategy.themes.forEach(theme => {
    console.log(`📌 ${theme.topic}`);
    console.log(`   Why: ${theme.reasoning}`);
    console.log(`   Examples:`);
    theme.examples.forEach(ex => console.log(`   - ${ex}`));
    console.log('');
  });
  console.log(`Frequency: ${strategy.frequency}`);
  console.log(`Engagement: ${strategy.engagement}`);
  console.log(`DM Strategy: ${strategy.dm_strategy}\n`);
  
  // Save opportunities
  fs.writeFileSync(OPPORTUNITIES_FILE, JSON.stringify({
    generatedAt: new Date().toISOString(),
    highValueTargets,
    jobChanges,
    opportunities,
    contentStrategy: strategy
  }, null, 2));
  
  console.log(`✅ Analysis complete. Data saved to ${OPPORTUNITIES_FILE}\n`);
}

// Run
if (import.meta.url === `file://${process.argv[1]}`) {
  analyzeNetwork().catch(err => {
    console.error('❌ Error:', err.message);
    process.exit(1);
  });
}

export { 
  scoreConnectionValue, 
  detectJobChanges, 
  findWarmIntroPaths, 
  identifyHighValueTargets,
  detectOpportunities,
  generateContentStrategy 
};
