#!/usr/bin/env node
/**
 * Relationship CRM - Enhanced Edition
 * Track people, estimate value, map decision-makers, automate follow-ups
 * 
 * ENHANCEMENTS:
 * - Net worth estimation (who can afford high-ticket services?)
 * - Decision-maker mapping (who controls budgets?)
 * - Warm intro paths (A → B → C)
 * - Follow-up automation (stay top-of-mind)
 * - Relationship scoring (strength + recency + value)
 */

import fs from 'fs';
import path from 'path';

// Data paths
const DATA_DIR = 'data/relationships';
const CRM_FILE = path.join(DATA_DIR, 'crm.json');
const FOLLOWUP_FILE = path.join(DATA_DIR, 'followups.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Enhanced people database with net worth + decision power
const PEOPLE = {
  'Jakob': {
    name: 'Jakob',
    relationship: 'First Clawdbot client',
    company: 'Unknown',
    email: 'Unknown',
    lastContact: '2026-01-30',
    nextAction: 'Setup meeting (6:45pm Feb 3)',
    tags: ['client', 'clawdbot', 'first-client'],
    notes: 'Important - first revenue from Clawdbot services',
    priority: 'HIGH',
    // Enhanced fields
    estimatedNetWorth: '$100k-500k',
    affordabilityScore: 7, // 0-10 (can they afford $5k-50k projects?)
    decisionMaker: true,
    budgetControl: 'FULL',
    relationshipStrength: 8, // 0-10
    networkValue: 6 // How valuable is their network?
  },
  'Elliott': {
    name: 'Elliott',
    relationship: 'Connection',
    lastContact: 'Unknown',
    tags: ['network'],
    priority: 'MEDIUM',
    estimatedNetWorth: '$50k-200k',
    affordabilityScore: 5,
    decisionMaker: false,
    relationshipStrength: 4,
    networkValue: 5
  },
  'Andi Garnett': {
    name: 'Andi Garnett',
    relationship: 'TWG Discovery Call Contact',
    company: 'The Web Guys',
    project: 'TWG Klaviyo Project',
    lastContact: 'Unknown',
    nextAction: 'Awaiting discovery call response',
    tags: ['client-prospect', 'twg', 'klaviyo'],
    priority: 'HIGH',
    estimatedNetWorth: '$200k-1M',
    affordabilityScore: 8,
    decisionMaker: true,
    budgetControl: 'PARTIAL',
    relationshipStrength: 5,
    networkValue: 7
  },
  'Ella': {
    name: 'Ella',
    relationship: 'Connection',
    lastContact: 'Unknown',
    tags: ['network'],
    priority: 'MEDIUM',
    estimatedNetWorth: '$100k-500k',
    affordabilityScore: 6,
    decisionMaker: false,
    relationshipStrength: 6,
    networkValue: 6
  },
  'PG Chairman': {
    name: 'PG Investments Chairman',
    relationship: 'Potential employer/partner',
    company: 'PG Investments',
    meeting: 'Feb 5, 2026 9am (breakfast)',
    value: '$150k+ marketing role potential',
    nextAction: 'Meeting prep + research complete',
    tags: ['critical', 'pg-investments', 'strategic', 'high-net-worth'],
    notes: 'This is the bedrock path - chose over setupclaw.com. High-tier network access. Path to $500k+ in 2-3 years.',
    priority: 'CRITICAL',
    estimatedNetWorth: '$50M+',
    affordabilityScore: 10,
    decisionMaker: true,
    budgetControl: 'FULL',
    relationshipStrength: 7,
    networkValue: 10, // Ultra high-value network
    connectsTo: ['High-net-worth investors', 'C-suite executives', 'Board members']
  },
  'Will': {
    name: 'Will',
    relationship: 'Friend',
    meeting: 'Feb 4, 2026 11am @ B:HIVE Smales Farm',
    lastContact: 'Unknown',
    tags: ['friend', 'catch-up'],
    priority: 'MEDIUM',
    estimatedNetWorth: '$100k-500k',
    affordabilityScore: 6,
    decisionMaker: false,
    relationshipStrength: 8,
    networkValue: 5
  },
  'Rich': {
    name: 'Rich',
    relationship: 'Friend',
    company: 'PureSEO',
    meeting: 'Feb 4, 2026 11:30pm @ PureSEO Polaroid',
    lastContact: 'Unknown',
    tags: ['friend', 'catch-up'],
    priority: 'MEDIUM',
    estimatedNetWorth: '$200k-1M',
    affordabilityScore: 7,
    decisionMaker: true,
    budgetControl: 'PARTIAL',
    relationshipStrength: 8,
    networkValue: 7,
    connectsTo: ['SEO/marketing professionals']
  },
  'Sian': {
    name: 'Sian',
    relationship: 'Personal',
    meeting: 'Feb 7, 2026 7:30pm @ Deadshot',
    lastContact: 'Unknown',
    tags: ['personal'],
    priority: 'MEDIUM',
    estimatedNetWorth: 'Unknown',
    affordabilityScore: 0,
    decisionMaker: false,
    relationshipStrength: 9,
    networkValue: 3
  },
  'DBH Accounts': {
    name: 'Deep Blue Health Accounts Team',
    email: 'accounts@dbh.co.nz',
    relationship: 'Client (recurring)',
    company: 'Deep Blue Health',
    project: 'DBH Base Income ($52k/year)',
    lastContact: 'Unknown',
    nextAction: 'Chase $9,944 in overdue invoices (URGENT)',
    tags: ['client', 'dbh', 'base-income', 'recurring'],
    notes: '8 overdue invoices, oldest from Nov 3. Critical for cash flow.',
    priority: 'URGENT',
    estimatedNetWorth: '$10M+ (company)',
    affordabilityScore: 9,
    decisionMaker: true,
    budgetControl: 'FULL',
    relationshipStrength: 7,
    networkValue: 4
  }
};

// Estimate net worth based on signals
function estimateNetWorth(person) {
  // If already estimated, return it
  if (person.estimatedNetWorth) {
    return person.estimatedNetWorth;
  }
  
  let estimate = 'Unknown';
  
  // Title-based estimation
  const executiveTitles = ['CEO', 'Founder', 'Chairman', 'CFO', 'CTO', 'VP'];
  const seniorTitles = ['Director', 'Head of', 'Senior', 'Lead'];
  
  if (person.title) {
    if (executiveTitles.some(t => person.title.includes(t))) {
      estimate = '$500k-5M';
    } else if (seniorTitles.some(t => person.title.includes(t))) {
      estimate = '$200k-1M';
    } else {
      estimate = '$50k-200k';
    }
  }
  
  // Company-based adjustment
  const bigTechCompanies = ['Google', 'Microsoft', 'Meta', 'Amazon', 'Apple', 'Netflix'];
  if (person.company && bigTechCompanies.some(c => person.company.includes(c))) {
    estimate = '$1M-10M'; // Big tech employees have high net worth
  }
  
  return estimate;
}

// Calculate affordability score (0-10)
function calculateAffordabilityScore(person) {
  if (person.affordabilityScore) return person.affordabilityScore;
  
  let score = 5; // Default middle
  
  // Net worth indicators
  if (person.estimatedNetWorth) {
    if (person.estimatedNetWorth.includes('$10M+') || person.estimatedNetWorth.includes('$50M+')) {
      score = 10;
    } else if (person.estimatedNetWorth.includes('$1M-10M')) {
      score = 9;
    } else if (person.estimatedNetWorth.includes('$500k-5M')) {
      score = 8;
    } else if (person.estimatedNetWorth.includes('$200k-1M')) {
      score = 7;
    } else if (person.estimatedNetWorth.includes('$100k-500k')) {
      score = 6;
    } else if (person.estimatedNetWorth.includes('$50k-200k')) {
      score = 5;
    }
  }
  
  return score;
}

// Map decision-makers (who controls budgets?)
function mapDecisionMakers(people) {
  const decisionMakers = [];
  
  Object.entries(people).forEach(([key, person]) => {
    if (person.decisionMaker || person.budgetControl) {
      decisionMakers.push({
        name: person.name,
        company: person.company,
        budgetControl: person.budgetControl || 'UNKNOWN',
        affordabilityScore: person.affordabilityScore || calculateAffordabilityScore(person),
        networkValue: person.networkValue || 5,
        totalScore: (person.affordabilityScore || 5) + (person.networkValue || 5),
        canApprove: ['Consulting projects ($5k-50k)', 'Advisor roles', 'Speaking engagements']
      });
    }
  });
  
  return decisionMakers.sort((a, b) => b.totalScore - a.totalScore);
}

// Find warm intro paths (A → B → C)
function findWarmIntroPath(targetName, people) {
  const paths = [];
  
  // Check for direct connection
  const directConnection = people[targetName];
  if (directConnection) {
    return [{
      path: ['Tom', targetName],
      strength: 'DIRECT',
      confidence: directConnection.relationshipStrength || 5
    }];
  }
  
  // Check for 2nd-degree connections
  Object.entries(people).forEach(([key, connector]) => {
    if (connector.connectsTo && connector.connectsTo.includes(targetName)) {
      paths.push({
        path: ['Tom', connector.name, targetName],
        strength: '2ND_DEGREE',
        confidence: connector.relationshipStrength || 5,
        introduction: `"${connector.name}, would you be willing to introduce me to ${targetName}? I'd love to connect about [specific value prop]."`
      });
    }
  });
  
  return paths;
}

// Generate follow-up automation schedule
function generateFollowUpSchedule(person) {
  const schedule = [];
  const now = new Date();
  
  // Last contact recency
  let daysSinceContact = 999;
  if (person.lastContact && person.lastContact !== 'Unknown') {
    const lastContactDate = new Date(person.lastContact);
    daysSinceContact = Math.floor((now - lastContactDate) / (1000 * 60 * 60 * 24));
  }
  
  // High-value relationships: touch base every 30-60 days
  if (person.priority === 'CRITICAL' || person.priority === 'HIGH') {
    if (daysSinceContact > 45) {
      schedule.push({
        type: 'IMMEDIATE',
        action: `Reach out to ${person.name} - it's been ${daysSinceContact} days`,
        reasoning: 'High-value relationship needs regular contact',
        suggestedMessage: `Hey ${person.name}, been thinking about you. How's [current project/role] going? Would love to catch up.`
      });
    } else if (daysSinceContact > 30) {
      schedule.push({
        type: 'NEAR_TERM',
        action: `Plan follow-up with ${person.name} in 1-2 weeks`,
        reasoning: 'Keep relationship warm'
      });
    }
  }
  
  // Medium-value: touch base every 60-90 days
  if (person.priority === 'MEDIUM') {
    if (daysSinceContact > 90) {
      schedule.push({
        type: 'NEAR_TERM',
        action: `Reach out to ${person.name}`,
        reasoning: 'Medium-value relationship going cold'
      });
    }
  }
  
  // Post-meeting follow-ups
  if (person.meeting) {
    schedule.push({
      type: 'POST_MEETING',
      action: `Follow up with ${person.name} within 24h of meeting`,
      reasoning: 'Strike while iron is hot',
      suggestedMessage: `Great catching up! [Reference something specific from meeting]. Let's [next step].`
    });
  }
  
  return schedule;
}

// Relationship health score (0-10)
function calculateRelationshipHealth(person) {
  let score = 0;
  
  // Relationship strength (0-10)
  score += (person.relationshipStrength || 5);
  
  // Recency (fresh contact = higher score)
  let daysSinceContact = 999;
  if (person.lastContact && person.lastContact !== 'Unknown') {
    const lastContactDate = new Date(person.lastContact);
    daysSinceContact = Math.floor((new Date() - lastContactDate) / (1000 * 60 * 60 * 24));
  }
  
  if (daysSinceContact < 7) score += 3;
  else if (daysSinceContact < 30) score += 2;
  else if (daysSinceContact < 90) score += 1;
  else score -= 1; // Going cold
  
  // Value alignment
  if (person.affordabilityScore >= 8) score += 2;
  else if (person.affordabilityScore >= 6) score += 1;
  
  return Math.max(0, Math.min(10, score));
}

// Main CRM function
async function runEnhancedCRM() {
  console.log('💼 RELATIONSHIP CRM - ENHANCED EDITION\n');
  
  // Decision-makers map
  console.log('👔 DECISION-MAKERS (Budget Control):\n');
  const decisionMakers = mapDecisionMakers(PEOPLE);
  decisionMakers.forEach((dm, i) => {
    console.log(`${i + 1}. ${dm.name} [Score: ${dm.totalScore}/20]`);
    console.log(`   Company: ${dm.company || 'Unknown'}`);
    console.log(`   Budget Control: ${dm.budgetControl}`);
    console.log(`   Affordability: ${dm.affordabilityScore}/10 | Network Value: ${dm.networkValue}/10`);
    console.log(`   Can approve: ${dm.canApprove.join(', ')}\n`);
  });
  
  // High-value targets (affordability 7+, network value 6+)
  console.log('💰 HIGH-VALUE TARGETS (Affordability 7+, Network 6+):\n');
  const highValueTargets = Object.entries(PEOPLE)
    .filter(([key, p]) => (p.affordabilityScore || 0) >= 7 && (p.networkValue || 0) >= 6)
    .sort((a, b) => {
      const aScore = (a[1].affordabilityScore || 0) + (a[1].networkValue || 0);
      const bScore = (b[1].affordabilityScore || 0) + (b[1].networkValue || 0);
      return bScore - aScore;
    });
  
  highValueTargets.forEach(([key, person], i) => {
    console.log(`${i + 1}. ${person.name}`);
    console.log(`   Company: ${person.company || 'Unknown'}`);
    console.log(`   Net Worth: ${person.estimatedNetWorth || 'Unknown'}`);
    console.log(`   Affordability: ${person.affordabilityScore}/10`);
    console.log(`   Network Value: ${person.networkValue}/10`);
    if (person.connectsTo) console.log(`   Connects to: ${person.connectsTo.join(', ')}`);
    console.log('');
  });
  
  // Follow-up schedule
  console.log('📅 FOLLOW-UP AUTOMATION SCHEDULE:\n');
  const allFollowUps = [];
  Object.entries(PEOPLE).forEach(([key, person]) => {
    const schedule = generateFollowUpSchedule(person);
    schedule.forEach(item => {
      allFollowUps.push({
        person: person.name,
        ...item
      });
    });
  });
  
  // Sort by type (IMMEDIATE first)
  allFollowUps.sort((a, b) => {
    const order = { IMMEDIATE: 0, NEAR_TERM: 1, POST_MEETING: 2 };
    return order[a.type] - order[b.type];
  });
  
  allFollowUps.forEach((item, i) => {
    console.log(`${i + 1}. [${item.type}] ${item.action}`);
    console.log(`   💡 ${item.reasoning}`);
    if (item.suggestedMessage) {
      console.log(`   💬 "${item.suggestedMessage}"`);
    }
    console.log('');
  });
  
  // Relationship health report
  console.log('❤️ RELATIONSHIP HEALTH SCORES:\n');
  const healthScores = Object.entries(PEOPLE)
    .map(([key, person]) => ({
      name: person.name,
      health: calculateRelationshipHealth(person),
      priority: person.priority
    }))
    .sort((a, b) => b.health - a.health);
  
  healthScores.forEach((item, i) => {
    const emoji = item.health >= 8 ? '💚' : item.health >= 6 ? '💛' : item.health >= 4 ? '🧡' : '❤️';
    console.log(`${i + 1}. ${emoji} ${item.name}: ${item.health}/10 [${item.priority}]`);
  });
  console.log('');
  
  // Warm intro opportunities
  console.log('🤝 WARM INTRO OPPORTUNITIES:\n');
  console.log('If you need an intro to someone, use this CRM to find the path.\n');
  console.log('Example: findWarmIntroPath("Target Name", PEOPLE)\n');
  
  // Save enhanced data
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  
  fs.writeFileSync(CRM_FILE, JSON.stringify({
    updatedAt: new Date().toISOString(),
    people: PEOPLE,
    decisionMakers,
    highValueTargets: highValueTargets.map(([k, p]) => p),
    relationshipHealthScores: healthScores
  }, null, 2));
  
  fs.writeFileSync(FOLLOWUP_FILE, JSON.stringify({
    generatedAt: new Date().toISOString(),
    followUps: allFollowUps
  }, null, 2));
  
  console.log(`✅ Enhanced CRM data saved to ${DATA_DIR}/\n`);
}

// Run
if (import.meta.url === `file://${process.argv[1]}`) {
  runEnhancedCRM().catch(err => {
    console.error('❌ Error:', err.message);
    process.exit(1);
  });
}

export { 
  PEOPLE, 
  estimateNetWorth, 
  calculateAffordabilityScore,
  mapDecisionMakers,
  findWarmIntroPath,
  generateFollowUpSchedule,
  calculateRelationshipHealth
};
