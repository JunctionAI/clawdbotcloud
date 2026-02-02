#!/usr/bin/env node
/**
 * Enhanced Supermemory Sync
 * Sends strategic insights, project progress, people context, goal tracking
 */

import fs from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';
import Supermemory from 'supermemory';

const execAsync = promisify(exec);

// Supermemory client singleton
let smClientCache = null;

async function getSupermemoryClient() {
  if (smClientCache) return smClientCache;
  
  try {
    const creds = JSON.parse(fs.readFileSync('supermemory-credentials.json', 'utf8'));
    process.env.SUPERMEMORY_API_KEY = creds.apiKey;
    smClientCache = {
      client: new Supermemory(),
      containerTag: creds.containerTag
    };
    return smClientCache;
  } catch (err) {
    console.error('❌ Failed to init Supermemory:', err.message);
    throw err;
  }
}

// Add memory to Supermemory
async function addMemory(content) {
  try {
    const { client, containerTag } = await getSupermemoryClient();
    await client.add({
      content,
      containerTag
    });
    return true;
  } catch (err) {
    console.error(`❌ Failed to add memory: ${err.message}`);
    return false;
  }
}

// Get financial metrics
async function getFinancialMetrics() {
  try {
    const { stdout } = await execAsync('node scripts/financial-dashboard.js --json');
    const lines = stdout.split('\n');
    const jsonLine = lines.find(line => line.trim().startsWith('{'));
    if (jsonLine) {
      return JSON.parse(jsonLine);
    }
  } catch (err) {
    console.error('Failed to get financial metrics:', err.message);
  }
  return null;
}

// Get project status from STATE.json
function getProjectStatus() {
  try {
    const state = JSON.parse(fs.readFileSync('STATE.json', 'utf8'));
    return {
      activeProjects: state.activeProjects || [],
      pendingItems: state.pendingItems || [],
      recentDecisions: state.recentDecisions || []
    };
  } catch (err) {
    return null;
  }
}

// Get today's date
function getToday() {
  return new Date().toLocaleDateString('en-NZ', {
    timeZone: 'Pacific/Auckland',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

// Generate strategic insights
async function generateInsights() {
  console.log('🧠 Generating strategic insights for Supermemory...\n');
  
  const today = getToday();
  const insights = [];
  
  // Financial insights
  const financials = await getFinancialMetrics();
  if (financials) {
    insights.push({
      type: 'financial',
      content: `Tom's financial snapshot ${today}: $${financials.balance.toFixed(2)} NZD balance with ${financials.burn.runway} months runway. $${financials.invoices.authorised.total.toFixed(2)} in unpaid invoices (${financials.invoices.authorised.count} invoices), ${financials.invoices.overdue.count} overdue. Revenue last 30 days: $${financials.revenue.last30Days.toFixed(2)}. Q1 2026 progress: ${financials.goals.q1.progress}% of $${financials.goals.q1.target} target.`
    });
    
    if (financials.invoices.overdue.count > 0) {
      insights.push({
        type: 'alert',
        content: `CRITICAL ALERT ${today}: Tom has ${financials.invoices.overdue.count} overdue invoices totaling $${financials.invoices.authorised.total.toFixed(2)} NZD. Oldest invoice is from ${financials.invoices.overdue.invoices[0]?.DateString?.slice(0, 10)}. This requires immediate follow-up with DBH.`
      });
    }
    
    if (parseFloat(financials.burn.runway) < 1) {
      insights.push({
        type: 'alert',
        content: `CRITICAL CASH FLOW ALERT ${today}: Tom has only ${financials.burn.runway} months runway (approximately ${(parseFloat(financials.burn.runway) * 30).toFixed(0)} days). Immediate cash collection required.`
      });
    }
  }
  
  // Project insights
  const projects = getProjectStatus();
  if (projects) {
    // PG meeting prep
    const pgProject = projects.activeProjects.find(p => p.includes('PG'));
    if (pgProject) {
      insights.push({
        type: 'strategic',
        content: `Tom's PRIMARY FOCUS as of ${today}: PG Investments Chairman meeting (scheduled for Feb 5, 2026 at 9am). This is a potential $150k+ marketing role. Tom chose this path over setupclaw.com on Feb 1, 2026 as the bedrock for his $1M 2026 goal.`
      });
    }
    
    // Recent decisions
    const latestDecision = projects.recentDecisions[0];
    if (latestDecision) {
      insights.push({
        type: 'decision',
        content: `Tom's strategic decision on ${latestDecision.date}: ${latestDecision.decision}. Rationale: ${latestDecision.rationale}`
      });
    }
    
    // Pending items summary
    if (projects.pendingItems.length > 0) {
      insights.push({
        type: 'todo',
        content: `Tom's pending items as of ${today}: ${projects.pendingItems.join('; ')}.`
      });
    }
  }
  
  return insights;
}

// Sync to Supermemory
async function syncToSupermemory() {
  console.log('🔄 Enhanced Supermemory Sync Starting...\n');
  
  const insights = await generateInsights();
  
  let successCount = 0;
  let failCount = 0;
  
  for (const insight of insights) {
    console.log(`📝 Syncing [${insight.type}]: ${insight.content.slice(0, 80)}...`);
    const success = await addMemory(insight.content);
    if (success) {
      successCount++;
      console.log('   ✅ Synced');
    } else {
      failCount++;
      console.log('   ❌ Failed');
    }
  }
  
  console.log(`\n✅ Enhanced sync complete: ${successCount} insights added, ${failCount} failed\n`);
}

// Run
syncToSupermemory().catch(err => {
  console.error('❌ Sync failed:', err.message);
  process.exit(1);
});
