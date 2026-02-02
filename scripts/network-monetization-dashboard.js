#!/usr/bin/env node
/**
 * Network Monetization Dashboard
 * Master view of all network-driven revenue opportunities
 * 
 * OBJECTIVE: $5k-20k/month from network-driven opportunities
 * 
 * INTEGRATIONS:
 * - LinkedIn Intelligence
 * - Opportunity Scanner
 * - Relationship CRM
 * - Referral System
 * - Strategic Networking
 */

import fs from 'fs';
import path from 'path';

// Check if data files exist
function checkDataFiles() {
  const files = {
    linkedinOpportunities: 'data/linkedin/opportunities.json',
    opportunityScanner: 'data/opportunities/opportunities.json',
    relationshipCRM: 'data/relationships/crm.json',
    referrals: 'data/referrals/referrals.json'
  };
  
  const status = {};
  Object.entries(files).forEach(([key, filePath]) => {
    status[key] = fs.existsSync(filePath);
  });
  
  return status;
}

// Load data
function loadData() {
  const data = {};
  
  // LinkedIn Intelligence
  const linkedinPath = 'data/linkedin/opportunities.json';
  if (fs.existsSync(linkedinPath)) {
    data.linkedin = JSON.parse(fs.readFileSync(linkedinPath, 'utf8'));
  }
  
  // Opportunity Scanner
  const opportunitiesPath = 'data/opportunities/opportunities.json';
  if (fs.existsSync(opportunitiesPath)) {
    data.opportunities = JSON.parse(fs.readFileSync(opportunitiesPath, 'utf8'));
  }
  
  // Relationship CRM
  const crmPath = 'data/relationships/crm.json';
  if (fs.existsSync(crmPath)) {
    data.crm = JSON.parse(fs.readFileSync(crmPath, 'utf8'));
  }
  
  // Referrals
  const referralsPath = 'data/referrals/referrals.json';
  if (fs.existsSync(referralsPath)) {
    data.referrals = JSON.parse(fs.readFileSync(referralsPath, 'utf8'));
  }
  
  return data;
}

// Calculate total opportunity value
function calculateTotalOpportunityValue(data) {
  let total = 0;
  
  // LinkedIn opportunities
  if (data.linkedin && data.linkedin.highValueTargets) {
    data.linkedin.highValueTargets.forEach(target => {
      total += 10; // Assume $10k average per high-value target
    });
  }
  
  // Opportunity scanner
  if (data.opportunities && data.opportunities.opportunities) {
    data.opportunities.opportunities.forEach(opp => {
      if (opp.estimatedValue) {
        const match = opp.estimatedValue.match(/\$(\d+)k/);
        if (match) {
          total += parseInt(match[1]);
        }
      }
    });
  }
  
  // Referrals (won but not paid)
  if (data.referrals && data.referrals.referrals) {
    data.referrals.referrals
      .filter(r => r.status === 'QUALIFIED' || r.status === 'PROPOSAL')
      .forEach(ref => {
        total += ref.estimatedValue || 0;
      });
  }
  
  return total;
}

// Monthly revenue projection
function calculateMonthlyRevenue(data) {
  let monthlyRevenue = 0;
  
  // Active referrals (assume 20% close rate)
  if (data.referrals && data.referrals.referrals) {
    const activeReferrals = data.referrals.referrals
      .filter(r => r.status === 'QUALIFIED' || r.status === 'PROPOSAL')
      .reduce((sum, r) => sum + (r.estimatedValue || 0), 0);
    
    monthlyRevenue += activeReferrals * 0.20; // 20% close rate
  }
  
  // LinkedIn opportunities (assume 10% close rate)
  if (data.linkedin && data.linkedin.highValueTargets) {
    monthlyRevenue += data.linkedin.highValueTargets.length * 10 * 0.10; // $10k avg, 10% close
  }
  
  // Opportunity scanner (assume 15% close rate for high-value)
  if (data.opportunities && data.opportunities.highValue) {
    monthlyRevenue += data.opportunities.highValue * 15 * 0.15; // $15k avg, 15% close
  }
  
  return Math.floor(monthlyRevenue);
}

// Top actions
function getTopActions(data) {
  const actions = [];
  
  // LinkedIn high-value targets
  if (data.linkedin && data.linkedin.highValueTargets) {
    data.linkedin.highValueTargets.slice(0, 3).forEach(target => {
      actions.push({
        priority: 'HIGH',
        category: 'LinkedIn',
        action: `Reach out to ${target.name} (${target.company})`,
        value: '$10k-30k potential',
        reasoning: 'High-value target, strong network value'
      });
    });
  }
  
  // Job changes
  if (data.linkedin && data.linkedin.jobChanges) {
    data.linkedin.jobChanges.slice(0, 2).forEach(change => {
      if (change.opportunity === 'HOT') {
        actions.push({
          priority: 'URGENT',
          category: 'Job Change',
          action: `Congratulate ${change.name} on new role at ${change.company}`,
          value: '$10k-30k potential',
          reasoning: 'New role = new budget. Strike while iron is hot.'
        });
      }
    });
  }
  
  // Opportunity scanner high-value
  if (data.opportunities && data.opportunities.opportunities) {
    data.opportunities.opportunities
      .filter(o => o.score >= 7)
      .slice(0, 2)
      .forEach(opp => {
        actions.push({
          priority: 'HIGH',
          category: opp.type,
          action: opp.nextAction,
          value: opp.estimatedValue,
          reasoning: opp.reasoning || 'High-value opportunity'
        });
      });
  }
  
  // Active referrals
  if (data.referrals && data.referrals.referrals) {
    data.referrals.referrals
      .filter(r => r.status === 'LEAD' || r.status === 'QUALIFIED')
      .slice(0, 2)
      .forEach(ref => {
        actions.push({
          priority: 'MEDIUM',
          category: 'Referral',
          action: `Follow up with ${ref.clientName} (referred by ${ref.referrerName})`,
          value: `$${ref.estimatedValue}`,
          reasoning: 'Active referral in pipeline'
        });
      });
  }
  
  // CRM follow-ups
  if (data.crm && data.crm.highValueTargets) {
    data.crm.highValueTargets.slice(0, 2).forEach(target => {
      actions.push({
        priority: 'MEDIUM',
        category: 'CRM',
        action: `Follow up with ${target.name} (${target.company})`,
        value: 'High-value relationship',
        reasoning: 'Strong relationship + high affordability score'
      });
    });
  }
  
  // Sort by priority
  const priorityOrder = { URGENT: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };
  actions.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  
  return actions.slice(0, 10); // Top 10
}

// Strategic networking recommendations
function getNetworkingRecommendations() {
  return [
    {
      event: 'Tech/Startup Meetups',
      frequency: '2x per month',
      roi: 'HIGH',
      reasoning: 'Meet founders/CTOs with budgets',
      prep: 'Research attendees on LinkedIn, prepare 30-sec pitch',
      followUp: 'LinkedIn connect within 24h + personalized message'
    },
    {
      event: 'Marketing Conferences',
      frequency: '1x per quarter',
      roi: 'MEDIUM',
      reasoning: 'Speaking opportunities + CMO connections',
      prep: 'Submit speaking proposals 6 months ahead',
      followUp: 'Collect business cards, follow up with value (article/insight)'
    },
    {
      event: 'Founder Dinners',
      frequency: '1x per month',
      roi: 'VERY HIGH',
      reasoning: 'Intimate setting, high-quality connections',
      prep: 'Host or attend exclusive dinners (6-8 people max)',
      followUp: 'Send thank you + offer value'
    },
    {
      event: 'Online Communities (LinkedIn/Twitter)',
      frequency: 'Daily',
      roi: 'HIGH',
      reasoning: 'Scale reach, attract inbound opportunities',
      prep: 'Post 3-5x per week, comment on 10 posts daily',
      followUp: 'DM engaged connections with specific value prop'
    }
  ];
}

// Main dashboard
async function showDashboard() {
  console.log('💰 NETWORK MONETIZATION DASHBOARD\n');
  console.log('═══════════════════════════════════════════════════════\n');
  
  // Check system status
  const status = checkDataFiles();
  console.log('📊 SYSTEM STATUS:\n');
  console.log(`  LinkedIn Intelligence: ${status.linkedinOpportunities ? '✅' : '⚠️  Not initialized'}`);
  console.log(`  Opportunity Scanner: ${status.opportunityScanner ? '✅' : '⚠️  Not initialized'}`);
  console.log(`  Relationship CRM: ${status.relationshipCRM ? '✅' : '⚠️  Not initialized'}`);
  console.log(`  Referral System: ${status.referrals ? '✅' : '⚠️  Not initialized'}\n`);
  
  // Load data
  const data = loadData();
  
  // Calculate metrics
  const totalOpportunityValue = calculateTotalOpportunityValue(data);
  const projectedMonthlyRevenue = calculateMonthlyRevenue(data);
  
  console.log('💵 REVENUE METRICS:\n');
  console.log(`  Total Opportunity Value: $${totalOpportunityValue}k+`);
  console.log(`  Projected Monthly Revenue: $${projectedMonthlyRevenue}`);
  console.log(`  Goal: $5k-20k/month\n`);
  
  // Progress toward goal
  const goalMin = 5000;
  const goalMax = 20000;
  const goalProgress = Math.floor((projectedMonthlyRevenue / goalMax) * 100);
  console.log(`  Goal Progress: ${goalProgress}% of $20k target\n`);
  
  // Pipeline breakdown
  console.log('📈 PIPELINE BREAKDOWN:\n');
  
  if (data.linkedin) {
    console.log(`  LinkedIn High-Value Targets: ${data.linkedin.highValueTargets?.length || 0}`);
    console.log(`  Job Changes (Hot): ${data.linkedin.jobChanges?.filter(j => j.opportunity === 'HOT').length || 0}`);
  }
  
  if (data.opportunities) {
    console.log(`  High-Value Opportunities: ${data.opportunities.highValue || 0}`);
    console.log(`  Medium-Value Opportunities: ${data.opportunities.mediumValue || 0}`);
  }
  
  if (data.referrals && data.referrals.referrals) {
    const activeReferrals = data.referrals.referrals.filter(r => 
      r.status === 'LEAD' || r.status === 'QUALIFIED' || r.status === 'PROPOSAL'
    ).length;
    console.log(`  Active Referrals: ${activeReferrals}`);
  }
  
  if (data.crm) {
    console.log(`  CRM High-Value Targets: ${data.crm.highValueTargets?.length || 0}`);
  }
  
  console.log('\n');
  
  // Top actions
  console.log('🎯 TOP 10 ACTIONS (Prioritized):\n');
  const actions = getTopActions(data);
  
  if (actions.length === 0) {
    console.log('  No actions found. Run the individual scripts to populate data:\n');
    console.log('  - node scripts/linkedin-intelligence.js');
    console.log('  - node scripts/opportunity-scanner.js');
    console.log('  - node scripts/relationship-crm-enhanced.js');
    console.log('  - node scripts/referral-system.js\n');
  } else {
    actions.forEach((action, i) => {
      console.log(`${i + 1}. [${action.priority}] ${action.action}`);
      console.log(`   Category: ${action.category} | Value: ${action.value}`);
      console.log(`   💡 ${action.reasoning}\n`);
    });
  }
  
  // Strategic networking
  console.log('🤝 STRATEGIC NETWORKING RECOMMENDATIONS:\n');
  const recommendations = getNetworkingRecommendations();
  recommendations.forEach((rec, i) => {
    console.log(`${i + 1}. ${rec.event} [ROI: ${rec.roi}]`);
    console.log(`   Frequency: ${rec.frequency}`);
    console.log(`   Why: ${rec.reasoning}`);
    console.log(`   Prep: ${rec.prep}`);
    console.log(`   Follow-up: ${rec.followUp}\n`);
  });
  
  // Content strategy
  console.log('📝 CONTENT STRATEGY (Attract High-Value Connections):\n');
  console.log('  Post 3-5x per week on LinkedIn:');
  console.log('  - Growth hacking case studies');
  console.log('  - AI/automation insights');
  console.log('  - Strategic business thinking');
  console.log('  - Personal transformation stories\n');
  console.log('  Engage daily:');
  console.log('  - Comment on 10 high-value posts');
  console.log('  - DM engaged connections with specific value\n');
  
  // Quick start guide
  console.log('🚀 QUICK START GUIDE:\n');
  console.log('1. Export LinkedIn connections → data/linkedin/connections.json');
  console.log('2. Run: node scripts/linkedin-intelligence.js');
  console.log('3. Run: node scripts/opportunity-scanner.js');
  console.log('4. Run: node scripts/relationship-crm-enhanced.js');
  console.log('5. Add referrals: node scripts/referral-system.js add --referrer="Name" ...');
  console.log('6. Check dashboard: node scripts/network-monetization-dashboard.js\n');
  
  console.log('═══════════════════════════════════════════════════════');
  console.log('💰 TARGET: $5k-20k/month from network-driven opportunities');
  console.log('═══════════════════════════════════════════════════════\n');
}

// Run
if (import.meta.url === `file://${process.argv[1]}`) {
  showDashboard().catch(err => {
    console.error('❌ Error:', err.message);
    process.exit(1);
  });
}

export { showDashboard, calculateTotalOpportunityValue, calculateMonthlyRevenue };
