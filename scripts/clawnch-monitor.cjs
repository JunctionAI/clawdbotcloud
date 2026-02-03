#!/usr/bin/env node
/**
 * Clawnch Daily Monitor
 * Tracks AI agent prediction market activity
 * Runs daily in morning review
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const CLAWNCH_DEPLOYER = '0xa1F72459dfA10BAD200Ac160eCd78C6b77a747be';
const DATA_DIR = path.join(__dirname, '..', 'data', 'clawnch');
const REPORT_PATH = path.join(DATA_DIR, 'daily-reports');

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(REPORT_PATH)) {
  fs.mkdirSync(REPORT_PATH, { recursive: true });
}

async function fetchEtherscanData(address) {
  return new Promise((resolve, reject) => {
    const url = `https://etherscan.io/address/${address}`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function fetchBasescanData(address) {
  return new Promise((resolve, reject) => {
    const url = `https://basescan.org/address/${address}`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function monitorClawnch() {
  const timestamp = new Date().toISOString();
  const dateStr = timestamp.split('T')[0];
  
  console.log(`🦞 Clawnch Monitor - ${dateStr}`);
  console.log('─'.repeat(50));
  
  const report = {
    date: dateStr,
    timestamp,
    deployerAddress: CLAWNCH_DEPLOYER,
    chains: {},
    predictions: [],
    keyMetrics: {},
    notes: []
  };
  
  try {
    // Fetch multichain data
    console.log('Fetching Etherscan data...');
    const ethData = await fetchEtherscanData(CLAWNCH_DEPLOYER);
    
    // Parse portfolio value (basic regex extraction)
    const netWorthMatch = ethData.match(/Net Worth in USD[\s\S]*?\$([0-9,\.]+)/);
    if (netWorthMatch) {
      report.keyMetrics.totalNetWorth = netWorthMatch[1];
    }
    
    // Parse token allocations
    const polMatch = ethData.match(/POL[\s\S]*?([0-9\.]+)%/);
    const usdcMatch = ethData.match(/USDC[\s\S]*?([0-9\.]+)%/);
    const bscMatch = ethData.match(/BSC-USD[\s\S]*?([0-9\.]+)%/);
    
    if (polMatch) report.chains.polygon = polMatch[1] + '%';
    if (usdcMatch) report.chains.base = usdcMatch[1] + '%';
    if (bscMatch) report.chains.binance = bscMatch[1] + '%';
    
    console.log('\n📊 Portfolio Snapshot:');
    console.log(`Total Net Worth: $${report.keyMetrics.totalNetWorth || 'N/A'}`);
    console.log(`Polygon (POL): ${report.chains.polygon || 'N/A'}`);
    console.log(`Base (USDC): ${report.chains.base || 'N/A'}`);
    console.log(`Binance (BSC-USD): ${report.chains.binance || 'N/A'}`);
    
  } catch (error) {
    console.error('Error fetching data:', error.message);
    report.notes.push(`Error: ${error.message}`);
  }
  
  // Save daily report
  const reportFile = path.join(REPORT_PATH, `${dateStr}.json`);
  fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));
  
  // Update latest snapshot
  const snapshotFile = path.join(DATA_DIR, 'latest.json');
  fs.writeFileSync(snapshotFile, JSON.stringify(report, null, 2));
  
  console.log(`\n✅ Report saved: ${reportFile}`);
  
  // Generate summary for memory
  const summary = generateSummary(report);
  return summary;
}

function generateSummary(report) {
  return `## Clawnch Monitor - ${report.date}

**Deployer Wallet:** ${report.deployerAddress}

**Portfolio:**
- Total Net Worth: $${report.keyMetrics.totalNetWorth || 'N/A'}
- Polygon: ${report.chains.polygon || 'N/A'}
- Base: ${report.chains.base || 'N/A'}
- Binance: ${report.chains.binance || 'N/A'}

**Status:** Monitoring active. Clawnch is an AI agent-owned memecoin launchpad on Solana with real tokenomics (2% fees → buybacks, staking, creator rewards).

**Next Steps:**
- Track token launches by AI agents
- Monitor prediction market activity
- Compare to Polymarket opportunities
- Look for profit arbitrage patterns
`;
}

// Run if called directly
if (require.main === module) {
  monitorClawnch().then(summary => {
    console.log('\n' + summary);
  }).catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
  });
}

module.exports = { monitorClawnch, generateSummary };
