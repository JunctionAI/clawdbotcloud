#!/usr/bin/env node

/**
 * MORNING BRIEFING INTEGRATION
 * 
 * Example of how to integrate trading intelligence into your morning briefing
 */

const { MarketIntelligence } = require('./market-intelligence');
const fs = require('fs').promises;
const path = require('path');

/**
 * Generate compact trading summary for morning briefing
 */
async function generateTradingSummary() {
  try {
    const configPath = path.join(__dirname, '..', 'config', 'trading-config.json');
    const config = JSON.parse(await fs.readFile(configPath, 'utf8'));
    
    const intelligence = new MarketIntelligence(config);
    await intelligence.generateBriefing();
    
    // Create compact summary
    const summary = formatCompactSummary(intelligence.intelligence);
    
    return summary;
    
  } catch (error) {
    return `⚠️ Trading analysis unavailable: ${error.message}`;
  }
}

/**
 * Format compact summary for briefing
 */
function formatCompactSummary(intel) {
  let summary = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📈 TRADING INTELLIGENCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🌡️  Market Sentiment: ${getSentimentLabel(intel.marketSentiment.overall)}
`;

  // Top opportunity
  if (intel.topOpportunities.length > 0) {
    const top = intel.topOpportunities[0];
    const rr = Math.abs((top.target - top.entry) / (top.entry - top.stopLoss));
    
    summary += `
🎯 Top Opportunity:
   ${top.market} ${top.direction} - ${(top.confidence * 100).toFixed(0)}% confidence
   Entry: $${top.entry.toFixed(2)} | Target: $${top.target.toFixed(2)} | R:R 1:${rr.toFixed(1)}
`;
  } else {
    summary += `\n🎯 No high-probability setups at this time\n`;
  }

  // Risk alerts
  if (intel.riskAlerts.length > 0) {
    summary += `\n⚠️  Risk Alerts:\n`;
    intel.riskAlerts.slice(0, 3).forEach(alert => {
      summary += `   • ${alert.message}\n`;
    });
  }

  // Focus areas
  summary += `
📌 Today's Focus:
   • Crypto: ${getCryptoFocus(intel)}
   • Stocks: ${getStocksFocus(intel)}
   • Forex: ${getForexFocus(intel)}
`;

  return summary;
}

function getSentimentLabel(sentiment) {
  if (sentiment > 0.5) return '🟢 Very Bullish';
  if (sentiment > 0.2) return '🟢 Bullish';
  if (sentiment > -0.2) return '🟡 Neutral';
  if (sentiment > -0.5) return '🔴 Bearish';
  return '🔴 Very Bearish';
}

function getCryptoFocus(intel) {
  if (!intel.markets.crypto || intel.markets.crypto.length === 0) return 'Not monitored';
  const sentiment = intel.marketSentiment.crypto;
  if (sentiment > 0.3) return 'Momentum breakouts';
  if (sentiment < -0.3) return 'Wait for dips';
  return 'Swing trades';
}

function getStocksFocus(intel) {
  if (!intel.markets.stocks || intel.markets.stocks.length === 0) return 'Not monitored';
  const divStocks = intel.markets.stocks.filter(s => s.dividendYield > 3);
  if (divStocks.length > 0) return `${divStocks.length} dividend plays`;
  return 'Value opportunities';
}

function getForexFocus(intel) {
  if (!intel.markets.forex || intel.markets.forex.length === 0) return 'Not monitored';
  const nzdusd = intel.markets.forex.find(f => f.symbol === 'NZD/USD');
  if (nzdusd) return `NZD/USD ${nzdusd.trend}`;
  return 'Major pairs monitoring';
}

/**
 * Example: Integration into existing morning briefing
 */
async function generateFullMorningBriefing() {
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-NZ', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  let briefing = `
╔══════════════════════════════════════════════════════════════╗
║              MORNING BRIEFING - ${dateStr.padEnd(25)}║
╚══════════════════════════════════════════════════════════════╝

🌅 Good morning, Tom!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
☀️  WEATHER & CONDITIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Your existing weather/calendar content here]
`;

  // Add trading intelligence
  const tradingSummary = await generateTradingSummary();
  briefing += tradingSummary;

  briefing += `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 TODAY'S SCHEDULE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Your existing calendar content here]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Have a great day! 🚀
`;

  return briefing;
}

/**
 * Simple standalone trading brief (just the trading part)
 */
async function generateStandaloneTradingBrief() {
  const dateStr = new Date().toLocaleDateString('en-NZ');
  
  let brief = `📈 Trading Brief - ${dateStr}\n\n`;
  brief += await generateTradingSummary();
  
  return brief;
}

// ============ MAIN EXECUTION ============

async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--full')) {
    // Full morning briefing with trading
    const briefing = await generateFullMorningBriefing();
    console.log(briefing);
    
  } else if (args.includes('--compact')) {
    // Just the trading summary
    const summary = await generateTradingSummary();
    console.log(summary);
    
  } else if (args.includes('--standalone')) {
    // Standalone trading brief
    const brief = await generateStandaloneTradingBrief();
    console.log(brief);
    
  } else {
    console.log(`
Morning Briefing Integration

Usage:
  node morning-briefing-integration.js --full        Full morning briefing
  node morning-briefing-integration.js --compact     Trading summary only
  node morning-briefing-integration.js --standalone  Standalone trading brief

Integration Example:
  
  In your existing morning briefing script:
  
  const { generateTradingSummary } = require('./morning-briefing-integration');
  
  // Add to your briefing
  const tradingSection = await generateTradingSummary();
  briefing += tradingSection;
`);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  generateTradingSummary,
  generateFullMorningBriefing,
  generateStandaloneTradingBrief
};
