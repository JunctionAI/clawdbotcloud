#!/usr/bin/env node
/**
 * Goal Progress Dashboard
 * Real-time tracking against $1M 2026 goal
 */

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// Tom's 2026 Goals
const GOALS = {
  revenue: {
    q1: { target: 400000, description: 'Q1 2026 Revenue Target' },
    year: { target: 1000000, description: '2026 Full Year Revenue Target' }
  },
  lifestyle: {
    description: 'Live life to the fullest - express full potential and curiosity'
  },
  understanding: {
    description: 'Understand the system - give back with gains to improve life for people'
  }
};

// Revenue model breakdown
const REVENUE_MODEL = {
  dbh: {
    name: 'Deep Blue Health (Safety)',
    target: 52000,
    frequency: 'weekly',
    hours: 20,
    description: 'Base income, stable'
  },
  clawdbot: {
    name: 'Clawdbot Services (Esteem)',
    target: 168000,
    model: 'Setup services $1k-$5k/client',
    description: 'Professional services, scaling'
  },
  apps: {
    name: 'Apps (Creation)',
    target: 180000,
    model: '1 release/week, Meta ads testing',
    description: 'True assets, upside potential'
  }
};

// Get current financial metrics
async function getFinancialMetrics() {
  try {
    const { stdout } = await execAsync('node scripts/financial-dashboard.js --json');
    return JSON.parse(stdout);
  } catch (err) {
    console.error('Failed to get financial metrics');
    return null;
  }
}

// Calculate progress
function calculateProgress(current, target) {
  const progress = (current / target) * 100;
  const remaining = target - current;
  const daysInYear = 365;
  const daysPassed = Math.floor((new Date() - new Date('2026-01-01')) / (1000 * 60 * 60 * 24));
  const daysRemaining = daysInYear - daysPassed;
  const requiredDailyRate = remaining / daysRemaining;
  
  return {
    current,
    target,
    progress: progress.toFixed(1),
    remaining,
    daysRemaining,
    requiredDailyRate: requiredDailyRate.toFixed(2),
    onTrack: progress >= (daysPassed / daysInYear) * 100
  };
}

// Generate dashboard
async function generateDashboard() {
  console.log('═'.repeat(80));
  console.log('🎯  GOAL PROGRESS DASHBOARD - 2026');
  console.log('═'.repeat(80));
  console.log('');
  
  // Get financial data
  const metrics = await getFinancialMetrics();
  
  if (metrics) {
    // Q1 Progress
    console.log('📊  Q1 2026 REVENUE GOAL');
    console.log('─'.repeat(80));
    const q1 = calculateProgress(metrics.revenue.last90Days, GOALS.revenue.q1.target);
    console.log(`Target: $${GOALS.revenue.q1.target.toLocaleString()}`);
    console.log(`Current: $${q1.current.toLocaleString()}`);
    console.log(`Progress: ${q1.progress}%`);
    console.log(`Remaining: $${q1.remaining.toLocaleString()}`);
    console.log(`Required daily: $${q1.requiredDailyRate}/day for next ${q1.daysRemaining} days`);
    console.log(`Status: ${q1.onTrack ? '✅ ON TRACK' : '⚠️ BEHIND PACE'}`);
    console.log('');
    
    // Year Progress
    console.log('📊  2026 FULL YEAR REVENUE GOAL');
    console.log('─'.repeat(80));
    const year = calculateProgress(metrics.revenue.last90Days, GOALS.revenue.year.target);
    console.log(`Target: $${GOALS.revenue.year.target.toLocaleString()}`);
    console.log(`Current: $${year.current.toLocaleString()}`);
    console.log(`Progress: ${year.progress}%`);
    console.log(`Remaining: $${year.remaining.toLocaleString()}`);
    console.log(`Required daily: $${year.requiredDailyRate}/day for next ${year.daysRemaining} days`);
    console.log(`Status: ${year.onTrack ? '✅ ON TRACK' : '⚠️ BEHIND PACE'}`);
    console.log('');
    
    // Revenue Model Breakdown
    console.log('💰  REVENUE MODEL (TARGET)');
    console.log('─'.repeat(80));
    for (const [key, model] of Object.entries(REVENUE_MODEL)) {
      console.log(`${model.name}: $${model.target.toLocaleString()}`);
      console.log(`   ${model.description}`);
      if (model.model) console.log(`   Model: ${model.model}`);
      console.log('');
    }
    
    // Burn Rate & Runway
    console.log('🔥  BURN RATE & RUNWAY');
    console.log('─'.repeat(80));
    console.log(`Current Balance: $${metrics.balance.toLocaleString()}`);
    console.log(`Monthly Burn: $${metrics.burn.monthly.toLocaleString()}`);
    console.log(`Runway: ${metrics.burn.runway} months`);
    console.log(`Overdue Invoices: $${metrics.invoices.authorised.total.toLocaleString()} (${metrics.invoices.overdue.count} invoices)`);
    console.log('');
    
    // Strategic Insights
    console.log('🧠  STRATEGIC INSIGHTS');
    console.log('─'.repeat(80));
    
    if (parseFloat(metrics.burn.runway) < 1) {
      console.log('🚨 CRITICAL: Less than 1 month runway - immediate cash collection required');
    }
    
    if (metrics.invoices.overdue.count > 0) {
      console.log(`⚠️  ${metrics.invoices.overdue.count} overdue invoices - chase immediately`);
    }
    
    if (!year.onTrack) {
      const gap = (year.requiredDailyRate - (metrics.revenue.last30Days / 30)).toFixed(2);
      console.log(`📈 To hit $1M target, need to increase daily revenue by $${gap}/day`);
    }
    
    console.log('');
  }
  
  // Lifestyle & Understanding Goals
  console.log('🌟  LIFESTYLE & PURPOSE');
  console.log('─'.repeat(80));
  console.log(`${GOALS.lifestyle.description}`);
  console.log(`${GOALS.understanding.description}`);
  console.log('');
  
  console.log('═'.repeat(80));
  console.log('🚀  COMPOUNDING CREATION: DBH (base) → Clawdbot (esteem) → Apps (actualization)');
  console.log('═'.repeat(80));
}

// Run
generateDashboard().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
