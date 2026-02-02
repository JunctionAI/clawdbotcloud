#!/usr/bin/env node
/**
 * Financial Command Center
 * Pulls Xero invoices + Wise balance, calculates burn rate, runway, goal progress
 */

import https from 'https';
import fs from 'fs';

// Load credentials
const xeroCredsPath = 'xero-credentials.json';
const wiseCredsPath = 'wise-credentials.json';

let xeroCreds, wiseCreds;
try {
  xeroCreds = JSON.parse(fs.readFileSync(xeroCredsPath, 'utf8'));
  wiseCreds = JSON.parse(fs.readFileSync(wiseCredsPath, 'utf8'));
} catch (err) {
  console.error('❌ Failed to load credentials:', err.message);
  process.exit(1);
}

// Xero API request
function xeroRequest(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.xero.com',
      path: path,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${xeroCreds.accessToken}`,
        'xero-tenant-id': xeroCreds.tenantId,
        'Accept': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(new Error(`Xero API returned ${res.statusCode}: ${data}`));
          return;
        }
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`Failed to parse Xero response: ${e.message}`));
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

// Wise API request
function wiseRequest(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.transferwise.com',
      path: path,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${wiseCreds.apiToken}`
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(new Error(`Wise API returned ${res.statusCode}: ${data}`));
          return;
        }
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`Failed to parse Wise response: ${e.message}`));
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

// Get Wise NZD balance
async function getWiseBalance() {
  const profileId = parseInt(wiseCreds.profileId);
  const accounts = await wiseRequest(`/v1/borderless-accounts?profileId=${profileId}`);
  const nzdBalance = accounts[0]?.balances?.find(b => b.currency === 'NZD');
  return nzdBalance?.amount?.value || 0;
}

// Get Xero invoices (last 3 months)
async function getXeroInvoices() {
  const since = new Date();
  since.setMonth(since.getMonth() - 3);
  
  const response = await xeroRequest(
    `/api.xro/2.0/Invoices?Statuses=DRAFT,SUBMITTED,AUTHORISED,PAID&Where=Date>=DateTime(${since.getFullYear()},${since.getMonth()+1},${since.getDate()})`
  );
  
  return response.Invoices || [];
}

// Calculate financial metrics
function calculateMetrics(invoices, balance) {
  const now = Date.now();
  
  // Invoices by status
  const draft = invoices.filter(i => i.Status === 'DRAFT');
  const authorised = invoices.filter(i => i.Status === 'AUTHORISED');
  const paid = invoices.filter(i => i.Status === 'PAID');
  
  const draftTotal = draft.reduce((sum, i) => sum + i.Total, 0);
  const authorisedTotal = authorised.reduce((sum, i) => sum + i.Total, 0);
  const paidTotal = paid.reduce((sum, i) => sum + i.Total, 0);
  
  // Overdue invoices (AUTHORISED > 7 days)
  const overdue = authorised.filter(inv => {
    const dueDate = inv.DueDateString ? new Date(inv.DueDateString) : new Date(inv.DateString);
    const daysOverdue = (now - dueDate.getTime()) / (1000 * 60 * 60 * 24);
    return daysOverdue > 7;
  });
  
  // Revenue (last 30 days)
  const last30Days = paid.filter(inv => {
    const paidDate = new Date(inv.DateString);
    const daysAgo = (now - paidDate.getTime()) / (1000 * 60 * 60 * 24);
    return daysAgo <= 30;
  });
  const revenue30d = last30Days.reduce((sum, i) => sum + i.Total, 0);
  
  // Burn rate estimate (assume $300/day based on recent spending)
  const dailyBurn = 300;
  const monthlyBurn = dailyBurn * 30;
  
  // Runway (months)
  const runway = balance / monthlyBurn;
  
  // Goal progress (2026 target: $400k Q1, $1M year)
  const q1Target = 400000;
  const yearTarget = 1000000;
  const q1Progress = (paidTotal / q1Target) * 100;
  const yearProgress = (paidTotal / yearTarget) * 100;
  
  return {
    balance,
    invoices: {
      draft: { count: draft.length, total: draftTotal },
      authorised: { count: authorised.length, total: authorisedTotal },
      paid: { count: paid.length, total: paidTotal },
      overdue: { count: overdue.length, invoices: overdue }
    },
    revenue: {
      last30Days: revenue30d,
      last90Days: paidTotal
    },
    burn: {
      daily: dailyBurn,
      monthly: monthlyBurn,
      runway: runway.toFixed(1)
    },
    goals: {
      q1: { target: q1Target, current: paidTotal, progress: q1Progress.toFixed(1) },
      year: { target: yearTarget, current: paidTotal, progress: yearProgress.toFixed(1) }
    }
  };
}

// Main
async function main() {
  const isJson = process.argv.includes('--json');
  
  if (!isJson) {
    console.log('💰 Financial Command Center\n');
  }
  
  try {
    if (!isJson) console.log('📊 Fetching Wise balance...');
    const balance = await getWiseBalance();
    
    if (!isJson) console.log('📄 Fetching Xero invoices...');
    const invoices = await getXeroInvoices();
    
    if (!isJson) console.log('🧮 Calculating metrics...\n');
    const metrics = calculateMetrics(invoices, balance);
    
    // Display dashboard or JSON
    if (isJson) {
      console.log(JSON.stringify(metrics, null, 2));
    } else {
      console.log('═'.repeat(60));
      console.log('💵  BALANCE');
      console.log('═'.repeat(60));
      console.log(`Wise NZD: $${metrics.balance.toFixed(2)}`);
      console.log(`Runway: ${metrics.burn.runway} months @ $${metrics.burn.monthly}/month burn\n`);
      
      console.log('═'.repeat(60));
      console.log('📄  INVOICES');
      console.log('═'.repeat(60));
      console.log(`Draft: ${metrics.invoices.draft.count} ($${metrics.invoices.draft.total.toFixed(2)})`);
      console.log(`Authorised (awaiting payment): ${metrics.invoices.authorised.count} ($${metrics.invoices.authorised.total.toFixed(2)})`);
      console.log(`Paid: ${metrics.invoices.paid.count} ($${metrics.invoices.paid.total.toFixed(2)})\n`);
      
      if (metrics.invoices.overdue.count > 0) {
        console.log(`🚨 OVERDUE: ${metrics.invoices.overdue.count} invoices`);
        metrics.invoices.overdue.invoices.forEach(inv => {
          console.log(`   - ${inv.InvoiceNumber}: ${inv.Contact.Name} ($${inv.Total}) - ${inv.DateString?.slice(0, 10)}`);
        });
        console.log('');
      }
      
      console.log('═'.repeat(60));
      console.log('📈  REVENUE');
      console.log('═'.repeat(60));
      console.log(`Last 30 days: $${metrics.revenue.last30Days.toFixed(2)}`);
      console.log(`Last 90 days: $${metrics.revenue.last90Days.toFixed(2)}\n`);
      
      console.log('═'.repeat(60));
      console.log('🎯  GOAL PROGRESS');
      console.log('═'.repeat(60));
      console.log(`Q1 2026 ($${(metrics.goals.q1.target / 1000).toFixed(0)}k target): $${metrics.goals.q1.current.toFixed(2)} (${metrics.goals.q1.progress}%)`);
      console.log(`Year 2026 ($${(metrics.goals.year.target / 1000).toFixed(0)}k target): $${metrics.goals.year.current.toFixed(2)} (${metrics.goals.year.progress}%)\n`);
    }
    
    return metrics;
  } catch (err) {
    console.error('❌ Error:', err.message);
    
    // If token expired, try refreshing
    if (err.message.includes('TokenExpired') || err.message.includes('401')) {
      console.log('\n⚠️  Token expired. Run: node scripts/xero-refresh-token.js');
    }
    
    process.exit(1);
  }
}

// Run if called directly
main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});

export { getWiseBalance, getXeroInvoices, calculateMetrics };
