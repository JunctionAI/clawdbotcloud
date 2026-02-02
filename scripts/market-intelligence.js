#!/usr/bin/env node

/**
 * MARKET INTELLIGENCE BRIEFING
 * 
 * Daily market analysis and opportunity detection
 * Generates actionable intelligence for trading decisions
 */

const fs = require('fs').promises;
const path = require('path');
const { TradingAnalysis } = require('./trading-analysis');

class MarketIntelligence {
  constructor(config) {
    this.config = config;
    this.analyzer = new TradingAnalysis(config);
    this.intelligence = {
      timestamp: Date.now(),
      markets: {},
      topOpportunities: [],
      riskAlerts: [],
      marketSentiment: {},
      recommendations: []
    };
  }

  /**
   * Generate daily market intelligence briefing
   */
  async generateBriefing() {
    console.log('📰 Generating Market Intelligence Briefing...\n');

    // Analyze all markets
    await this.analyzeCryptoMarkets();
    await this.analyzeStockMarkets();
    await this.analyzeForexMarkets();

    // Generate insights
    this.detectTopOpportunities();
    this.assessMarketSentiment();
    this.generateRiskAlerts();
    this.generateRecommendations();

    // Create report
    const report = this.formatBriefing();
    await this.saveBriefing(report);

    return report;
  }

  /**
   * Analyze crypto markets
   */
  async analyzeCryptoMarkets() {
    if (!this.config.markets.crypto.enabled) return;

    console.log('💎 Analyzing Crypto Markets...');
    this.intelligence.markets.crypto = [];

    for (const pair of this.config.markets.crypto.pairs) {
      const mockData = this.generateMockData(250);
      const analysis = await this.analyzer.analyzeMarket(pair, mockData);

      const marketData = {
        symbol: pair,
        price: analysis.price,
        rsi: analysis.rsi,
        signals: analysis.signals,
        trend: this.determineTrend(mockData),
        volatility: this.calculateVolatility(mockData),
        volume24h: this.calculate24hVolume(mockData)
      };

      this.intelligence.markets.crypto.push(marketData);
      console.log(`  ✓ ${pair}: $${analysis.price.toFixed(2)}`);
    }
  }

  /**
   * Analyze stock markets
   */
  async analyzeStockMarkets() {
    if (!this.config.markets.stocks.enabled) return;

    console.log('\n📈 Analyzing Stock Markets...');
    this.intelligence.markets.stocks = [];
    this.intelligence.markets.nzStocks = [];

    // US Stocks
    for (const symbol of this.config.markets.stocks.symbols) {
      const mockData = this.generateMockData(250);
      const analysis = await this.analyzer.analyzeMarket(symbol, mockData);

      const marketData = {
        symbol: symbol,
        price: analysis.price,
        rsi: analysis.rsi,
        signals: analysis.signals,
        trend: this.determineTrend(mockData),
        dividendYield: Math.random() * 5, // Mock dividend yield
        peRatio: 15 + Math.random() * 30
      };

      this.intelligence.markets.stocks.push(marketData);
      console.log(`  ✓ ${symbol}: $${analysis.price.toFixed(2)}`);
    }

    // NZ Stocks
    for (const symbol of this.config.markets.stocks.nzStocks) {
      const mockData = this.generateMockData(250);
      const analysis = await this.analyzer.analyzeMarket(symbol, mockData);

      const marketData = {
        symbol: symbol,
        price: analysis.price,
        rsi: analysis.rsi,
        signals: analysis.signals,
        trend: this.determineTrend(mockData),
        dividendYield: Math.random() * 7, // NZ stocks often higher yield
        peRatio: 12 + Math.random() * 25
      };

      this.intelligence.markets.nzStocks.push(marketData);
      console.log(`  ✓ ${symbol}: $${analysis.price.toFixed(2)}`);
    }
  }

  /**
   * Analyze forex markets
   */
  async analyzeForexMarkets() {
    if (!this.config.markets.forex.enabled) return;

    console.log('\n💱 Analyzing Forex Markets...');
    this.intelligence.markets.forex = [];

    for (const pair of this.config.markets.forex.pairs) {
      const mockData = this.generateMockData(250);
      const analysis = await this.analyzer.analyzeMarket(pair, mockData);

      const marketData = {
        symbol: pair,
        price: analysis.price,
        rsi: analysis.rsi,
        signals: analysis.signals,
        trend: this.determineTrend(mockData),
        volatility: this.calculateVolatility(mockData)
      };

      this.intelligence.markets.forex.push(marketData);
      console.log(`  ✓ ${pair}: ${analysis.price.toFixed(4)}`);
    }
  }

  /**
   * Detect top trading opportunities
   */
  detectTopOpportunities() {
    console.log('\n🎯 Detecting Top Opportunities...');

    const allSignals = [];

    // Collect all signals from all markets
    Object.values(this.intelligence.markets).forEach(marketType => {
      if (Array.isArray(marketType)) {
        marketType.forEach(market => {
          if (market.signals && market.signals.length > 0) {
            market.signals.forEach(signal => {
              allSignals.push({
                ...signal,
                market: market.symbol,
                currentPrice: market.price,
                rsi: market.rsi,
                trend: market.trend
              });
            });
          }
        });
      }
    });

    // Sort by confidence and filter
    this.intelligence.topOpportunities = allSignals
      .filter(s => s.confidence >= this.config.alerts.minConfidence)
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 5);

    console.log(`  Found ${this.intelligence.topOpportunities.length} high-confidence opportunities`);
  }

  /**
   * Assess overall market sentiment
   */
  assessMarketSentiment() {
    console.log('\n🌡️  Assessing Market Sentiment...');

    const sentiment = {
      crypto: this.calculateSentiment(this.intelligence.markets.crypto),
      stocks: this.calculateSentiment(this.intelligence.markets.stocks),
      nzStocks: this.calculateSentiment(this.intelligence.markets.nzStocks),
      forex: this.calculateSentiment(this.intelligence.markets.forex)
    };

    // Overall sentiment
    const allSentiments = Object.values(sentiment).filter(s => s !== null);
    sentiment.overall = allSentiments.length > 0
      ? allSentiments.reduce((a, b) => a + b, 0) / allSentiments.length
      : 0;

    this.intelligence.marketSentiment = sentiment;

    console.log(`  Overall: ${this.getSentimentLabel(sentiment.overall)}`);
    if (sentiment.crypto !== null) console.log(`  Crypto: ${this.getSentimentLabel(sentiment.crypto)}`);
    if (sentiment.stocks !== null) console.log(`  Stocks: ${this.getSentimentLabel(sentiment.stocks)}`);
  }

  /**
   * Calculate sentiment for a market
   */
  calculateSentiment(markets) {
    if (!markets || markets.length === 0) return null;

    let totalSentiment = 0;
    let count = 0;

    markets.forEach(market => {
      // RSI-based sentiment
      let sentiment = 0;
      if (market.rsi < 30) sentiment = -0.7; // Oversold
      else if (market.rsi < 40) sentiment = -0.3;
      else if (market.rsi < 60) sentiment = 0;
      else if (market.rsi < 70) sentiment = 0.3;
      else sentiment = 0.7; // Overbought

      // Trend adjustment
      if (market.trend === 'UPTREND') sentiment += 0.2;
      else if (market.trend === 'DOWNTREND') sentiment -= 0.2;

      totalSentiment += sentiment;
      count++;
    });

    return count > 0 ? totalSentiment / count : 0;
  }

  /**
   * Get sentiment label
   */
  getSentimentLabel(sentiment) {
    if (sentiment > 0.5) return '🟢 Very Bullish';
    if (sentiment > 0.2) return '🟢 Bullish';
    if (sentiment > -0.2) return '🟡 Neutral';
    if (sentiment > -0.5) return '🔴 Bearish';
    return '🔴 Very Bearish';
  }

  /**
   * Generate risk alerts
   */
  generateRiskAlerts() {
    console.log('\n⚠️  Generating Risk Alerts...');

    const alerts = [];

    // Check for extreme RSI conditions
    Object.values(this.intelligence.markets).forEach(marketType => {
      if (Array.isArray(marketType)) {
        marketType.forEach(market => {
          if (market.rsi > 80) {
            alerts.push({
              type: 'OVERBOUGHT',
              severity: 'HIGH',
              market: market.symbol,
              message: `${market.symbol} is heavily overbought (RSI: ${market.rsi.toFixed(1)})`
            });
          } else if (market.rsi < 20) {
            alerts.push({
              type: 'OVERSOLD',
              severity: 'HIGH',
              market: market.symbol,
              message: `${market.symbol} is heavily oversold (RSI: ${market.rsi.toFixed(1)})`
            });
          }

          // Check for high volatility
          if (market.volatility && market.volatility > 5) {
            alerts.push({
              type: 'HIGH_VOLATILITY',
              severity: 'MEDIUM',
              market: market.symbol,
              message: `${market.symbol} showing high volatility (${market.volatility.toFixed(1)}%)`
            });
          }
        });
      }
    });

    this.intelligence.riskAlerts = alerts;
    console.log(`  Generated ${alerts.length} risk alerts`);
  }

  /**
   * Generate actionable recommendations
   */
  generateRecommendations() {
    console.log('\n💡 Generating Recommendations...');

    const recommendations = [];

    // Top opportunities
    if (this.intelligence.topOpportunities.length > 0) {
      const top = this.intelligence.topOpportunities[0];
      recommendations.push({
        priority: 'HIGH',
        action: top.direction === 'LONG' ? 'BUY' : 'SELL',
        market: top.market,
        reason: `${top.type} signal with ${(top.confidence * 100).toFixed(0)}% confidence`,
        entry: top.entry,
        stopLoss: top.stopLoss,
        target: top.target
      });
    }

    // Dividend opportunities
    const dividendStocks = [
      ...(this.intelligence.markets.stocks || []),
      ...(this.intelligence.markets.nzStocks || [])
    ]
      .filter(s => s.dividendYield > 4 && s.trend !== 'DOWNTREND')
      .sort((a, b) => b.dividendYield - a.dividendYield);

    if (dividendStocks.length > 0) {
      const top = dividendStocks[0];
      recommendations.push({
        priority: 'MEDIUM',
        action: 'ACCUMULATE',
        market: top.symbol,
        reason: `Strong dividend yield (${top.dividendYield.toFixed(2)}%) with positive trend`,
        type: 'DIVIDEND_PLAY'
      });
    }

    // Sentiment plays
    if (this.intelligence.marketSentiment.overall < -0.5) {
      recommendations.push({
        priority: 'LOW',
        action: 'WAIT',
        reason: 'Overall market sentiment is very bearish - wait for better entry points',
        type: 'MARKET_TIMING'
      });
    }

    this.intelligence.recommendations = recommendations;
    console.log(`  Generated ${recommendations.length} recommendations`);
  }

  /**
   * Format briefing as text report
   */
  formatBriefing() {
    const date = new Date().toLocaleDateString('en-NZ', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    let report = `
╔══════════════════════════════════════════════════════════════╗
║           MARKET INTELLIGENCE BRIEFING                       ║
║           ${date.padEnd(44)}║
╚══════════════════════════════════════════════════════════════╝

📊 MARKET SENTIMENT
${Object.entries(this.intelligence.marketSentiment)
  .filter(([key]) => key !== 'overall')
  .map(([market, sentiment]) => {
    if (sentiment === null) return '';
    const label = market.charAt(0).toUpperCase() + market.slice(1);
    return `   ${label.padEnd(12)}: ${this.getSentimentLabel(sentiment)}`;
  })
  .filter(line => line)
  .join('\n')}
   
   Overall      : ${this.getSentimentLabel(this.intelligence.marketSentiment.overall)}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 TOP OPPORTUNITIES
`;

    if (this.intelligence.topOpportunities.length > 0) {
      this.intelligence.topOpportunities.forEach((opp, i) => {
        const rr = Math.abs((opp.target - opp.entry) / (opp.entry - opp.stopLoss));
        report += `
${i + 1}. ${opp.market} - ${opp.direction}
   Strategy: ${opp.type}
   Confidence: ${(opp.confidence * 100).toFixed(0)}%
   Entry: $${opp.entry.toFixed(2)}
   Stop Loss: $${opp.stopLoss.toFixed(2)}
   Target: $${opp.target.toFixed(2)}
   Risk/Reward: 1:${rr.toFixed(2)}
`;
      });
    } else {
      report += '\n   No high-confidence opportunities at this time.\n';
    }

    report += `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 RECOMMENDATIONS
`;

    if (this.intelligence.recommendations.length > 0) {
      this.intelligence.recommendations.forEach((rec, i) => {
        report += `
${i + 1}. [${rec.priority}] ${rec.action} - ${rec.market || 'General'}
   ${rec.reason}
`;
      });
    } else {
      report += '\n   No specific recommendations at this time.\n';
    }

    if (this.intelligence.riskAlerts.length > 0) {
      report += `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️  RISK ALERTS
`;
      this.intelligence.riskAlerts.forEach(alert => {
        report += `\n   [${alert.severity}] ${alert.message}`;
      });
      report += '\n';
    }

    report += `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 FOCUS AREAS FOR TODAY

🔸 Crypto: ${this.getCryptoFocus()}
🔸 Stocks: ${this.getStocksFocus()}
🔸 Forex: ${this.getForexFocus()}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️  PAPER TRADING ONLY - Real money trading requires explicit approval
`;

    return report;
  }

  /**
   * Get crypto focus summary
   */
  getCryptoFocus() {
    if (!this.intelligence.markets.crypto || this.intelligence.markets.crypto.length === 0) {
      return 'Not monitored';
    }

    const sentiment = this.intelligence.marketSentiment.crypto;
    if (sentiment > 0.3) return 'Look for momentum breakouts on pullbacks';
    if (sentiment < -0.3) return 'Wait for oversold conditions before buying dips';
    return 'Range-bound - focus on swing trades';
  }

  /**
   * Get stocks focus summary
   */
  getStocksFocus() {
    if (!this.intelligence.markets.stocks || this.intelligence.markets.stocks.length === 0) {
      return 'Not monitored';
    }

    const divStocks = this.intelligence.markets.stocks.filter(s => s.dividendYield > 3);
    if (divStocks.length > 0) {
      return `${divStocks.length} dividend opportunities available`;
    }
    return 'Monitor for value plays';
  }

  /**
   * Get forex focus summary
   */
  getForexFocus() {
    if (!this.intelligence.markets.forex || this.intelligence.markets.forex.length === 0) {
      return 'Not monitored';
    }

    const nzdusd = this.intelligence.markets.forex.find(f => f.symbol === 'NZD/USD');
    if (nzdusd) {
      return `NZD/USD at ${nzdusd.price.toFixed(4)} - ${nzdusd.trend}`;
    }
    return 'Monitor major pairs for breakouts';
  }

  /**
   * Determine trend from price data
   */
  determineTrend(data) {
    if (data.length < 50) return 'UNKNOWN';

    const recentData = data.slice(-50);
    const first = recentData[0].close;
    const last = recentData[recentData.length - 1].close;

    const change = ((last - first) / first) * 100;

    if (change > 5) return 'UPTREND';
    if (change < -5) return 'DOWNTREND';
    return 'SIDEWAYS';
  }

  /**
   * Calculate volatility (standard deviation of returns)
   */
  calculateVolatility(data) {
    if (data.length < 20) return 0;

    const returns = [];
    for (let i = 1; i < data.length; i++) {
      const ret = ((data[i].close - data[i - 1].close) / data[i - 1].close) * 100;
      returns.push(ret);
    }

    const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
    const variance = returns.reduce((sum, ret) => sum + Math.pow(ret - mean, 2), 0) / returns.length;
    return Math.sqrt(variance);
  }

  /**
   * Calculate 24h volume
   */
  calculate24hVolume(data) {
    if (data.length < 24) return 0;

    const last24h = data.slice(-24);
    return last24h.reduce((sum, candle) => sum + candle.volume, 0);
  }

  /**
   * Generate mock data
   */
  generateMockData(length = 250) {
    const data = [];
    let price = 100 + Math.random() * 100;
    const now = Date.now();

    for (let i = 0; i < length; i++) {
      const change = (Math.random() - 0.48) * 5;
      price = Math.max(price + change, 10);

      const close = price + (Math.random() - 0.5) * 2;
      data.push({
        timestamp: now - ((length - i) * 3600000),
        open: price,
        high: Math.max(price, close) + Math.random() * 2,
        low: Math.min(price, close) - Math.random() * 2,
        close: close,
        volume: Math.random() * 1000000 + 500000
      });

      price = close;
    }

    return data;
  }

  /**
   * Save briefing to file
   */
  async saveBriefing(report) {
    const timestamp = new Date().toISOString().split('T')[0];
    const filepath = path.join(__dirname, '..', 'data', `market-briefing-${timestamp}.txt`);

    await fs.writeFile(filepath, report);
    console.log(`\n✅ Briefing saved to: ${filepath}`);

    // Also save JSON data
    const jsonPath = path.join(__dirname, '..', 'data', `market-briefing-${timestamp}.json`);
    await fs.writeFile(jsonPath, JSON.stringify(this.intelligence, null, 2));

    return filepath;
  }
}

// ============ MAIN EXECUTION ============

async function main() {
  try {
    // Load config
    const configPath = path.join(__dirname, '..', 'config', 'trading-config.json');
    const config = JSON.parse(await fs.readFile(configPath, 'utf8'));

    const intelligence = new MarketIntelligence(config);
    const report = await intelligence.generateBriefing();

    console.log('\n' + report);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { MarketIntelligence };
