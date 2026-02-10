#!/usr/bin/env node
/**
 * Test Stripe Metrics Integration
 * 
 * Verifies Stripe API connection and tests metric calculations.
 * 
 * Usage:
 *   node test-stripe-metrics.js
 */

const http = require('http');

const PORT = process.env.PORT || 3456;
const BASE_URL = `http://localhost:${PORT}`;

async function fetch(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, data });
        }
      });
    }).on('error', reject);
  });
}

async function testEndpoint(name, path, validate) {
  process.stdout.write(`  Testing ${name}... `);
  try {
    const { status, data } = await fetch(`${BASE_URL}${path}`);
    if (status !== 200) {
      console.log(`❌ HTTP ${status}`);
      return false;
    }
    if (validate && !validate(data)) {
      console.log('❌ Validation failed');
      return false;
    }
    console.log('✅');
    return true;
  } catch (e) {
    console.log(`❌ ${e.message}`);
    return false;
  }
}

async function runTests() {
  console.log('\n╔═══════════════════════════════════════════╗');
  console.log('║    Stripe Metrics Integration Test        ║');
  console.log('╚═══════════════════════════════════════════╝\n');
  
  // Check if STRIPE_SECRET_KEY is set
  if (!process.env.STRIPE_SECRET_KEY) {
    console.log('⚠️  STRIPE_SECRET_KEY not set in environment');
    console.log('   Set it with: export STRIPE_SECRET_KEY=sk_...\n');
  }
  
  console.log(`Testing server at ${BASE_URL}...\n`);
  
  let passed = 0;
  let failed = 0;
  
  // Test health endpoint
  if (await testEndpoint('Health', '/health', d => d.status === 'ok')) passed++;
  else failed++;
  
  // Test metrics endpoint
  if (await testEndpoint('Metrics', '/metrics', d => 
    d.mrr !== undefined && d.subscriptions !== undefined
  )) passed++;
  else failed++;
  
  // Test MRR endpoint
  if (await testEndpoint('MRR', '/metrics/mrr', d => 
    d.mrr !== undefined && d.mrr.value !== undefined
  )) passed++;
  else failed++;
  
  // Test revenue endpoint  
  if (await testEndpoint('Revenue', '/metrics/revenue', d =>
    d.revenue !== undefined
  )) passed++;
  else failed++;
  
  // Test events endpoint
  if (await testEndpoint('Events', '/events', d =>
    Array.isArray(d.events)
  )) passed++;
  else failed++;
  
  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`Results: ${passed} passed, ${failed} failed`);
  
  if (failed === 0) {
    console.log('\n🎉 All tests passed!\n');
  } else {
    console.log('\n⚠️  Some tests failed. Check server logs.\n');
  }
  
  // Show sample data if available
  try {
    const { data } = await fetch(`${BASE_URL}/metrics`);
    if (data.mrr) {
      console.log('📊 Current Metrics:');
      console.log(`   MRR: ${data.mrr.formatted}`);
      console.log(`   ARR: ${data.arr.formatted}`);
      console.log(`   Active Subscriptions: ${data.subscriptions.total}`);
      console.log(`   Today's Revenue: $${data.revenue.today}`);
      console.log(`   This Month: $${data.revenue.thisMonth}`);
      if (data.churn.rate !== null) {
        console.log(`   Churn Rate (30d): ${data.churn.formatted}`);
      }
      console.log('');
    }
  } catch (e) {
    // Server not running or no data
  }
  
  process.exit(failed > 0 ? 1 : 0);
}

// Instructions if server not running
async function checkServer() {
  try {
    await fetch(`${BASE_URL}/health`);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const serverRunning = await checkServer();
  
  if (!serverRunning) {
    console.log(`
╔═══════════════════════════════════════════════════════════╗
║  Stripe Metrics Server Not Running                        ║
╠═══════════════════════════════════════════════════════════╣
║  Start it first with:                                     ║
║                                                           ║
║    export STRIPE_SECRET_KEY=sk_test_...                   ║
║    node scripts/stripe-metrics.js                         ║
║                                                           ║
║  Then run this test in another terminal.                  ║
╚═══════════════════════════════════════════════════════════╝
`);
    process.exit(1);
  }
  
  await runTests();
}

main();
