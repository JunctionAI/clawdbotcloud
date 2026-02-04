#!/usr/bin/env node
/**
 * Clawnch Daily Monitor
 * Tracks AI agent prediction market activity via blockchain APIs
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const CLAWNCH_DEPLOYER = process.env.CLAWNCH_DEPLOYER || '0xa1F72459dfA10BAD200Ac160eCd78C6b77a747be';
const ETHERSCAN_KEY = process.env.ETHERSCAN_API_KEY;
const BASESCAN_KEY = process.env.BASESCAN_API_KEY;

const DATA_DIR = path.join(__dirname, '..', 'data', 'clawnch');
const REPORT_PATH = path.join(DATA_DIR, 'daily-reports');

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(REPORT_PATH)) {
  fs.mkdirSync(REPORT_PATH, { recursive: true });
}

function apiRequest(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error('Failed to parse JSON: ' + e.message));
        }
      });
    }).on('error', reject);
  });
}

async function getEthBalance(address, apiKey) {
  const url = `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`;
  const response = await apiRequest(url);
  if (response.status === '1') {
    return (parseInt(response.result) / 1e18).toFixed(4); // Convert Wei to ETH
  }
  return null;
}

async function getTokenBalances(address, apiKey) {
  const url = `https://api.etherscan.io/api?module=account&action=tokentx&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${apiKey}`;
  const response = await apiRequest(url);
  
  if (response.status === '1' && response.result.length > 0) {
    // Aggregate unique tokens
    const tokens = {};
    response.result.slice(0, 20).forEach(tx => { // Last 20 transactions
      const symbol = tx.tokenSymbol;
      if (!tokens[symbol]) {
        tokens[symbol] = {
          name: tx.tokenName,
          symbol: symbol,
          decimals: tx.tokenDecimal
        };
      }
    });
    return Object.values(tokens);
  }
  return [];
}

async function getBaseBalance(address, apiKey) {
  const url = `https://api.basescan.org/api?module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`;
  const response = await apiRequest(url);
  if (response.status === '1') {
    return (parseInt(response.result) / 1e18).toFixed(4); // Convert Wei to ETH
  }
  return null;
}

async function monitorClawnch() {
  const timestamp = new Date().toISOString();
  const dateStr = timestamp.split('T')[0];
  
  console.log(`🦞 Clawnch Monitor - ${dateStr}`);
  console.log('─'.repeat(50));
  
  if (!ETHERSCAN_KEY) {
    console.error('❌ Missing ETHERSCAN_API_KEY in .env');
    process.exit(1);
  }
  
  const report = {
    date: dateStr,
    timestamp,
    deployerAddress: CLAWNCH_DEPLOYER,
    chains: {},
    balances: {},
    tokens: [],
    keyMetrics: {},
    notes: []
  };
  
  try {
    // Ethereum mainnet balance
    console.log('Fetching Ethereum balance...');
    const ethBalance = await getEthBalance(CLAWNCH_DEPLOYER, ETHERSCAN_KEY);
    if (ethBalance) {
      report.balances.ethereum = `${ethBalance} ETH`;
      console.log(`✅ Ethereum: ${ethBalance} ETH`);
    }
    
    // Token balances (ERC-20)
    console.log('\nFetching token activity...');
    const tokens = await getTokenBalances(CLAWNCH_DEPLOYER, ETHERSCAN_KEY);
    report.tokens = tokens;
    if (tokens.length > 0) {
      console.log(`✅ Active tokens: ${tokens.map(t => t.symbol).join(', ')}`);
    }
    
    // Base network balance (if key provided)
    if (BASESCAN_KEY) {
      console.log('\nFetching Base balance...');
      const baseBalance = await getBaseBalance(CLAWNCH_DEPLOYER, BASESCAN_KEY);
      if (baseBalance) {
        report.balances.base = `${baseBalance} ETH`;
        console.log(`✅ Base: ${baseBalance} ETH`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error fetching data:', error.message);
    report.notes.push(`Error: ${error.message}`);
  }
  
  // Save daily report
  const reportFile = path.join(REPORT_PATH, `${dateStr}.json`);
  fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));
  
  // Update latest snapshot
  const snapshotFile = path.join(DATA_DIR, 'latest.json');
  fs.writeFileSync(snapshotFile, JSON.stringify(report, null, 2));
  
  console.log(`\n✅ Report saved: ${reportFile}`);
  
  // Generate summary
  const summary = generateSummary(report);
  return summary;
}

function generateSummary(report) {
  const tokenList = report.tokens.length > 0 
    ? report.tokens.map(t => `- ${t.symbol} (${t.name})`).join('\n')
    : 'No recent token activity';
    
  return `## Clawnch Monitor - ${report.date}

**Deployer Wallet:** ${report.deployerAddress}

**Balances:**
- Ethereum: ${report.balances.ethereum || 'N/A'}
- Base: ${report.balances.base || 'N/A'}

**Active Tokens:**
${tokenList}

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
