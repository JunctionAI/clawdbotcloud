#!/usr/bin/env node
/**
 * Opportunity Scanner
 * Automatically find and track revenue opportunities
 * 
 * OBJECTIVE: Scan for consulting, speaking, partnership, and advisor opportunities
 * TARGET: $5k-50k consulting projects, $1k-10k speaking gigs
 * 
 * SOURCES:
 * - LinkedIn job changes (new roles = new budgets)
 * - Industry news (funding rounds, expansions)
 * - Speaking opportunities (conferences, events)
 * - Partnership opportunities (complementary services)
 * - Advisor/investment roles (equity + cash)
 * - Warm intros from network
 */

import fs from 'fs';
import path from 'path';

// Data paths
const DATA_DIR = 'data/opportunities';
const OPPORTUNITIES_FILE = path.join(DATA_DIR, 'opportunities.json');
const SOURCES_FILE = path.join(DATA_DIR, 'sources.json');
const TRACKING_FILE = path.join(DATA_DIR, 'tracking.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize default data
function initializeFiles() {
  if (!fs.existsSync(OPPORTUNITIES_FILE)) {
    fs.writeFileSync(OPPORTUNITIES_FILE, JSON.stringify({ opportunities: [] }, null, 2));
  }
  if (!fs.existsSync(SOURCES_FILE)) {
    fs.writeFileSync(SOURCES_FILE, JSON.stringify({ sources: getDefaultSources() }, null, 2));
  }
  if (!fs.existsSync(TRACKING_FILE)) {
    fs.writeFileSync(TRACKING_FILE, JSON.stringify({ 
      lastScan: null,
      scannedOpportunities: [],
      contacted: [],
      closed: []
    }, null, 2));
  }
}

// Default opportunity sources
function getDefaultSources() {
  return [
    {
      type: 'CONSULTING',
      name: 'LinkedIn Job Changes',
      description: 'Monitor connections for new roles (new budgets)',
      method: 'linkedin-intelligence.js integration',
      targetValue: '$5k-50k',
      frequency: 'daily'
    },
    {
      type: 'CONSULTING',
      name: 'Funding Announcements',
      description: 'Companies that just raised money need growth help',
      sources: ['Crunchbase', 'TechCrunch', 'LinkedIn'],
      targetValue: '$10k-50k',
      frequency: 'weekly'
    },
    {
      type: 'SPEAKING',
      name: 'Conference Speaking',
      description: 'Tech and marketing conferences need speakers',
      sources: ['Sessionize', 'Papercall.io', 'LinkedIn Events'],
      targetValue: '$1k-10k per talk',
      frequency: 'monthly'
    },
    {
      type: 'SPEAKING',
      name: 'Corporate Workshops',
      description: 'Companies pay for internal training/workshops',
      sources: ['Direct outreach to high-value connections'],
      targetValue: '$2k-10k per workshop',
      frequency: 'quarterly'
    },
    {
      type: 'PARTNERSHIP',
      name: 'Complementary Service Providers',
      description: 'Web agencies, dev shops need marketing expertise',
      sources: ['LinkedIn', 'Agency directories', 'Referrals'],
      targetValue: '$5k-20k per referral partnership',
      frequency: 'ongoing'
    },
    {
      type: 'ADVISOR',
      name: 'Startup Advisor Roles',
      description: 'Early-stage startups need strategic guidance',
      sources: ['AngelList', 'LinkedIn', 'Network referrals'],
      targetValue: '0.25-1% equity + $1k-5k/month',
      frequency: 'quarterly'
    },
    {
      type: 'INVESTMENT',
      name: 'Angel Investment Opportunities',
      description: 'Co-invest with network (access + returns)',
      sources: ['Network referrals', 'High-net-worth connections'],
      targetValue: 'Equity stake + strategic influence',
      frequency: 'opportunistic'
    }
  ];
}

// Score opportunity attractiveness (0-10)
function scoreOpportunity(opp) {
  let score = 0;
  
  // Value score (higher $ = higher score)
  if (opp.estimatedValue) {
    const value = parseInt(opp.estimatedValue.replace(/[$k,]/g, ''));
    if (value >= 50) score += 4;
    else if (value >= 20) score += 3;
    else if (value >= 10) score += 2;
    else if (value >= 5) score += 1;
  }
  
  // Warm intro vs cold (warm = much higher probability)
  if (opp.warmIntro) score += 3;
  else if (opp.networkConnection) score += 2;
  
  // Timeline (immediate need = higher urgency)
  if (opp.timeline === 'IMMEDIATE' || opp.timeline === 'URGENT') score += 2;
  else if (opp.timeline === 'NEAR_TERM') score += 1;
  
  // Fit score (how well does this match Tom's expertise?)
  if (opp.fitScore) {
    score += Math.floor(opp.fitScore / 2); // Convert 0-10 to 0-5
  }
  
  return Math.min(score, 10);
}

// Detect consulting opportunities from network
function detectConsultingOpportunities() {
  const opportunities = [];
  
  // Check if LinkedIn intelligence data exists
  const linkedinDataPath = 'data/linkedin/opportunities.json';
  if (fs.existsSync(linkedinDataPath)) {
    const linkedinData = JSON.parse(fs.readFileSync(linkedinDataPath, 'utf8'));
    
    // Job changes = new budget opportunities
    if (linkedinData.jobChanges) {
      linkedinData.jobChanges.forEach(change => {
        if (change.valueScore >= 6) {
          opportunities.push({
            id: `consulting_${change.name.replace(/\s/g, '_')}_${Date.now()}`,
            type: 'CONSULTING',
            title: `Growth/Marketing Consulting - ${change.company}`,
            company: change.company,
            contact: change.name,
            contactTitle: change.newRole,
            source: 'LinkedIn Job Change',
            reasoning: `${change.name} just started as ${change.newRole} at ${change.company}. New role = new budget. Perfect timing to offer growth/marketing expertise.`,
            estimatedValue: '$10k-30k',
            timeline: change.daysSinceChange <= 30 ? 'IMMEDIATE' : 'NEAR_TERM',
            warmIntro: true,
            fitScore: 8,
            nextAction: `Message ${change.name}: "Congrats on the new role! As you're building out your strategy at ${change.company}, would love to chat about growth opportunities."`,
            status: 'IDENTIFIED'
          });
        }
      });
    }
  }
  
  return opportunities;
}

// Detect speaking opportunities
function detectSpeakingOpportunities() {
  // TODO: Integrate with Sessionize, Papercall.io APIs
  // For now, return template opportunities
  
  return [
    {
      id: `speaking_template_${Date.now()}`,
      type: 'SPEAKING',
      title: 'Conference Speaking Opportunity',
      description: 'Marketing/AI conferences actively seeking speakers',
      platforms: ['Sessionize', 'Papercall.io', 'LinkedIn Events'],
      topics: [
        'AI-Powered Marketing Automation',
        'Growth Hacking for Startups',
        'Building AI Agents for Business',
        'From Zero to $1M: Startup Growth Tactics'
      ],
      estimatedValue: '$2k-10k per talk',
      timeline: 'ONGOING',
      nextAction: 'Create speaker profile on Sessionize + Papercall.io, pitch to 5 conferences',
      status: 'ACTION_REQUIRED'
    }
  ];
}

// Detect partnership opportunities
function detectPartnershipOpportunities() {
  return [
    {
      id: `partnership_template_${Date.now()}`,
      type: 'PARTNERSHIP',
      title: 'Agency Partnership Program',
      description: 'Partner with web/dev agencies - you do marketing, they do dev',
      strategy: 'Referral-based revenue sharing (10% commission on both sides)',
      targetPartners: [
        'Web design agencies',
        'Development shops',
        'Branding agencies',
        'SEO agencies'
      ],
      estimatedValue: '$5k-20k per partnership',
      timeline: 'NEAR_TERM',
      nextAction: 'Identify 10 complementary agencies in Auckland, pitch partnership model',
      status: 'ACTION_REQUIRED'
    }
  ];
}

// Detect advisor opportunities
function detectAdvisorOpportunities() {
  return [
    {
      id: `advisor_template_${Date.now()}`,
      type: 'ADVISOR',
      title: 'Startup Advisor Roles',
      description: 'Early-stage startups need marketing/growth expertise',
      platforms: ['AngelList', 'LinkedIn', 'Network referrals'],
      targetCompanies: [
        'SaaS startups (post-seed)',
        'E-commerce brands (scaling phase)',
        'AI/Tech startups (go-to-market)'
      ],
      estimatedValue: '0.25-1% equity + $2k-5k/month',
      timeCommitment: '5-10 hours/month',
      timeline: 'ONGOING',
      nextAction: 'Create AngelList advisor profile, reach out to 5 founders in network',
      status: 'ACTION_REQUIRED'
    }
  ];
}

// Main scan function
async function scanOpportunities() {
  initializeFiles();
  
  console.log('🔍 OPPORTUNITY SCANNER\n');
  console.log('Scanning network and sources for revenue opportunities...\n');
  
  const allOpportunities = [
    ...detectConsultingOpportunities(),
    ...detectSpeakingOpportunities(),
    ...detectPartnershipOpportunities(),
    ...detectAdvisorOpportunities()
  ];
  
  // Score and sort
  allOpportunities.forEach(opp => {
    opp.score = scoreOpportunity(opp);
  });
  
  allOpportunities.sort((a, b) => b.score - a.score);
  
  // Display results
  console.log(`✅ Found ${allOpportunities.length} opportunities\n`);
  
  // High-value opportunities (score 7+)
  const highValue = allOpportunities.filter(o => o.score >= 7);
  if (highValue.length > 0) {
    console.log('🎯 HIGH-VALUE OPPORTUNITIES (Score 7+):\n');
    highValue.forEach((opp, i) => {
      console.log(`${i + 1}. [${opp.type}] ${opp.title} [Score: ${opp.score}/10]`);
      if (opp.company) console.log(`   Company: ${opp.company}`);
      if (opp.contact) console.log(`   Contact: ${opp.contact} (${opp.contactTitle})`);
      console.log(`   Value: ${opp.estimatedValue}`);
      console.log(`   Timeline: ${opp.timeline}`);
      console.log(`   Next Action: ${opp.nextAction}`);
      if (opp.reasoning) console.log(`   💡 ${opp.reasoning}`);
      console.log('');
    });
  }
  
  // Medium-value opportunities (score 4-6)
  const mediumValue = allOpportunities.filter(o => o.score >= 4 && o.score < 7);
  if (mediumValue.length > 0) {
    console.log('📊 MEDIUM-VALUE OPPORTUNITIES (Score 4-6):\n');
    mediumValue.forEach((opp, i) => {
      console.log(`${i + 1}. [${opp.type}] ${opp.title} [Score: ${opp.score}/10]`);
      console.log(`   Value: ${opp.estimatedValue}`);
      console.log(`   Next Action: ${opp.nextAction}\n`);
    });
  }
  
  // Action plan
  console.log('📋 IMMEDIATE ACTION PLAN:\n');
  const immediate = allOpportunities
    .filter(o => o.timeline === 'IMMEDIATE' || o.score >= 7)
    .slice(0, 5);
  
  immediate.forEach((opp, i) => {
    console.log(`${i + 1}. ${opp.nextAction}`);
  });
  console.log('');
  
  // Save results
  const tracking = JSON.parse(fs.readFileSync(TRACKING_FILE, 'utf8'));
  tracking.lastScan = new Date().toISOString();
  tracking.scannedOpportunities = allOpportunities;
  fs.writeFileSync(TRACKING_FILE, JSON.stringify(tracking, null, 2));
  
  fs.writeFileSync(OPPORTUNITIES_FILE, JSON.stringify({
    scannedAt: new Date().toISOString(),
    totalOpportunities: allOpportunities.length,
    highValue: highValue.length,
    mediumValue: mediumValue.length,
    opportunities: allOpportunities
  }, null, 2));
  
  console.log(`✅ Scan complete. Data saved to ${OPPORTUNITIES_FILE}\n`);
  
  // Return summary
  return {
    total: allOpportunities.length,
    highValue: highValue.length,
    mediumValue: mediumValue.length,
    estimatedTotalValue: calculateTotalValue(allOpportunities)
  };
}

// Calculate total opportunity value
function calculateTotalValue(opportunities) {
  let total = 0;
  opportunities.forEach(opp => {
    if (opp.estimatedValue) {
      const match = opp.estimatedValue.match(/\$(\d+)k/);
      if (match) {
        total += parseInt(match[1]);
      }
    }
  });
  return `$${total}k+ potential`;
}

// Track opportunity status
function updateOpportunityStatus(opportunityId, status, notes) {
  const tracking = JSON.parse(fs.readFileSync(TRACKING_FILE, 'utf8'));
  
  const opp = tracking.scannedOpportunities.find(o => o.id === opportunityId);
  if (opp) {
    opp.status = status;
    opp.notes = notes;
    opp.updatedAt = new Date().toISOString();
    
    if (status === 'CONTACTED') {
      tracking.contacted.push({
        opportunityId,
        contactedAt: new Date().toISOString(),
        notes
      });
    } else if (status === 'CLOSED_WON') {
      tracking.closed.push({
        opportunityId,
        closedAt: new Date().toISOString(),
        result: 'WON',
        notes
      });
    } else if (status === 'CLOSED_LOST') {
      tracking.closed.push({
        opportunityId,
        closedAt: new Date().toISOString(),
        result: 'LOST',
        notes
      });
    }
    
    fs.writeFileSync(TRACKING_FILE, JSON.stringify(tracking, null, 2));
    console.log(`✅ Updated opportunity ${opportunityId} to ${status}`);
  } else {
    console.error(`❌ Opportunity ${opportunityId} not found`);
  }
}

// Run
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  
  if (args[0] === 'update' && args[1] && args[2]) {
    // Update status: node opportunity-scanner.js update <id> <status> [notes]
    updateOpportunityStatus(args[1], args[2], args.slice(3).join(' '));
  } else {
    // Run scan
    scanOpportunities().catch(err => {
      console.error('❌ Error:', err.message);
      process.exit(1);
    });
  }
}

export { 
  scanOpportunities, 
  scoreOpportunity,
  updateOpportunityStatus,
  detectConsultingOpportunities,
  detectSpeakingOpportunities,
  detectPartnershipOpportunities,
  detectAdvisorOpportunities
};
