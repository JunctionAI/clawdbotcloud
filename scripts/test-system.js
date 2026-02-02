#!/usr/bin/env node

/**
 * SYSTEM TEST SCRIPT
 * 
 * Verify all components are working correctly
 * Run this after setup or after making changes
 */

const fs = require('fs').promises;
const path = require('path');
const { TradingAnalysis } = require('./trading-analysis');
const { PaperTradingBot } = require('./paper-trading-bot');
const { MarketIntelligence } = require('./market-intelligence');
const { RiskCalculator } = require('./risk-calculator');

class SystemTest {
  constructor() {
    this.results = {
      passed: 0,
      failed: 0,
      tests: []
    };
  }

  /**
   * Run a test and track results
   */
  async runTest(name, testFn) {
    try {
      await testFn();
      this.results.passed++;
      this.results.tests.push({ name, status: 'PASS' });
      console.log(`✅ ${name}`);
    } catch (error) {
      this.results.failed++;
      this.results.tests.push({ name, status: 'FAIL', error: error.message });
      console.log(`❌ ${name}: ${error.message}`);
    }
  }

  /**
   * Test configuration file
   */
  async testConfig() {
    await this.runTest('Configuration file exists', async () => {
      const configPath = path.join(__dirname, '..', 'config', 'trading-config.json');
      const data = await fs.readFile(configPath, 'utf8');
      const config = JSON.parse(data);
      
      if (config.liveTrading) {
        throw new Error('liveTrading should be false for paper trading');
      }
      
      if (!config.portfolio) {
        throw new Error('portfolio configuration missing');
      }
    });
  }

  /**
   * Test directories exist
   */
  async testDirectories() {
    await this.runTest('Required directories exist', async () => {
      const dirs = ['scripts', 'data', 'data/signals', 'data/market-data', 'data/backtests', 'config', 'docs'];
      
      for (const dir of dirs) {
        const dirPath = path.join(__dirname, '..', dir);
        try {
          await fs.access(dirPath);
        } catch (error) {
          throw new Error(`Directory missing: ${dir}`);
        }
      }
    });
  }

  /**
   * Test trading analysis engine
   */
  async testTradingAnalysis() {
    await this.runTest('Trading Analysis - Technical Indicators', async () => {
      const config = await this.loadConfig();
      const analyzer = new TradingAnalysis(config);
      
      // Generate test data
      const data = this.generateTestData(250);
      
      // Test SMA
      const sma = analyzer.calculateSMA(data, 20);
      if (!sma || sma.length === 0) {
        throw new Error('SMA calculation failed');
      }
      
      // Test EMA
      const ema = analyzer.calculateEMA(data, 20);
      if (!ema || ema.length === 0) {
        throw new Error('EMA calculation failed');
      }
      
      // Test RSI
      const rsi = analyzer.calculateRSI(data);
      if (!rsi || rsi.length === 0) {
        throw new Error('RSI calculation failed');
      }
      
      const lastRSI = rsi[rsi.length - 1].value;
      if (lastRSI < 0 || lastRSI > 100) {
        throw new Error('RSI out of valid range');
      }
      
      // Test Bollinger Bands
      const bb = analyzer.calculateBollingerBands(data);
      if (!bb || bb.length === 0) {
        throw new Error('Bollinger Bands calculation failed');
      }
      
      // Test MACD
      const macd = analyzer.calculateMACD(data);
      if (!macd.macdLine || !macd.signalLine || !macd.histogram) {
        throw new Error('MACD calculation failed');
      }
    });

    await this.runTest('Trading Analysis - Pattern Detection', async () => {
      const config = await this.loadConfig();
      const analyzer = new TradingAnalysis(config);
      const data = this.generateTestData(250);
      
      // Test momentum detection (should not throw)
      const momentum = analyzer.detectMomentumBreakout(data);
      
      // Test mean reversion (should not throw)
      const meanRev = analyzer.detectMeanReversion(data);
      
      // Test swing setup (should not throw)
      const swing = analyzer.detectSwingSetup(data);
      
      // At least one should be able to process data
      if (momentum === undefined && meanRev === undefined && swing === undefined) {
        throw new Error('Pattern detection not returning results');
      }
    });

    await this.runTest('Trading Analysis - Market Analysis', async () => {
      const config = await this.loadConfig();
      const analyzer = new TradingAnalysis(config);
      const data = this.generateTestData(250);
      
      const result = await analyzer.analyzeMarket('TEST/USD', data);
      
      if (!result.symbol || !result.price || result.rsi === undefined) {
        throw new Error('Market analysis incomplete');
      }
      
      if (!Array.isArray(result.signals)) {
        throw new Error('Signals should be an array');
      }
    });
  }

  /**
   * Test risk calculator
   */
  async testRiskCalculator() {
    await this.runTest('Risk Calculator - Position Sizing', () => {
      const sizing = RiskCalculator.calculatePositionSize(
        10000,  // Account balance
        0.02,   // 2% risk
        100,    // Entry price
        95      // Stop loss
      );
      
      if (!sizing.positionSize || !sizing.dollarRisk || !sizing.positionValue) {
        throw new Error('Position sizing calculation incomplete');
      }
      
      if (sizing.dollarRisk !== 200) {
        throw new Error('Dollar risk calculation incorrect');
      }
      
      if (sizing.positionSize !== 40) {
        throw new Error('Position size calculation incorrect');
      }
    });

    await this.runTest('Risk Calculator - Risk/Reward Ratio', () => {
      const rr = RiskCalculator.calculateRiskReward(100, 95, 110);
      
      if (!rr.ratio || !rr.risk || !rr.reward) {
        throw new Error('Risk/Reward calculation incomplete');
      }
      
      if (rr.ratio !== 2) {
        throw new Error('Risk/Reward ratio incorrect');
      }
    });

    await this.runTest('Risk Calculator - Kelly Criterion', () => {
      const kelly = RiskCalculator.calculateKellyCriterion(0.6, 100, 50);
      
      if (!kelly.fullKelly || !kelly.halfKelly) {
        throw new Error('Kelly Criterion calculation incomplete');
      }
      
      if (kelly.fullKelly < 0) {
        throw new Error('Kelly should be positive for profitable system');
      }
    });
  }

  /**
   * Test market intelligence
   */
  async testMarketIntelligence() {
    await this.runTest('Market Intelligence - Briefing Generation', async () => {
      const config = await this.loadConfig();
      const intelligence = new MarketIntelligence(config);
      
      // This should complete without errors
      await intelligence.analyzeCryptoMarkets();
      await intelligence.analyzeStockMarkets();
      
      if (!intelligence.intelligence.markets.crypto) {
        throw new Error('Crypto market analysis not populated');
      }
      
      intelligence.detectTopOpportunities();
      intelligence.assessMarketSentiment();
      
      if (!intelligence.intelligence.marketSentiment.overall && 
          intelligence.intelligence.marketSentiment.overall !== 0) {
        throw new Error('Market sentiment not calculated');
      }
    });
  }

  /**
   * Test paper trading bot (initialization only)
   */
  async testPaperTradingBot() {
    await this.runTest('Paper Trading Bot - Initialization', async () => {
      const config = await this.loadConfig();
      const bot = new PaperTradingBot(config);
      
      if (!bot.portfolio) {
        throw new Error('Portfolio not initialized');
      }
      
      if (!bot.portfolio.cash) {
        throw new Error('Cash balance not initialized');
      }
      
      if (config.liveTrading) {
        throw new Error('Live trading should be disabled');
      }
    });

    await this.runTest('Paper Trading Bot - Position Sizing', async () => {
      const config = await this.loadConfig();
      const bot = new PaperTradingBot(config);
      
      const signal = {
        symbol: 'TEST/USDT',
        entry: 100,
        stopLoss: 95,
        target: 110,
        direction: 'LONG'
      };
      
      const size = bot.calculatePositionSize(signal);
      
      if (!size || size <= 0) {
        throw new Error('Position size calculation failed');
      }
    });
  }

  /**
   * Load configuration
   */
  async loadConfig() {
    const configPath = path.join(__dirname, '..', 'config', 'trading-config.json');
    const data = await fs.readFile(configPath, 'utf8');
    return JSON.parse(data);
  }

  /**
   * Generate test data
   */
  generateTestData(length) {
    const data = [];
    let price = 100;
    const now = Date.now();
    
    for (let i = 0; i < length; i++) {
      const change = (Math.random() - 0.48) * 5;
      price = Math.max(price + change, 10);
      
      const open = price;
      const close = price + (Math.random() - 0.5) * 2;
      const high = Math.max(open, close) + Math.random() * 1;
      const low = Math.min(open, close) - Math.random() * 1;
      
      data.push({
        timestamp: now - ((length - i) * 3600000),
        open,
        high,
        low,
        close,
        volume: Math.random() * 1000000 + 500000
      });
      
      price = close;
    }
    
    return data;
  }

  /**
   * Run all tests
   */
  async runAllTests() {
    console.log('\n╔══════════════════════════════════════════════════════════════╗');
    console.log('║           TRADING SYSTEM - COMPONENT TESTS                  ║');
    console.log('╚══════════════════════════════════════════════════════════════╝\n');
    
    console.log('🔍 Running tests...\n');
    
    // System tests
    console.log('📁 System Tests:');
    await this.testConfig();
    await this.testDirectories();
    console.log('');
    
    // Component tests
    console.log('📊 Trading Analysis Tests:');
    await this.testTradingAnalysis();
    console.log('');
    
    console.log('⚖️  Risk Calculator Tests:');
    await this.testRiskCalculator();
    console.log('');
    
    console.log('📰 Market Intelligence Tests:');
    await this.testMarketIntelligence();
    console.log('');
    
    console.log('🤖 Paper Trading Bot Tests:');
    await this.testPaperTradingBot();
    console.log('');
    
    // Summary
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`\n📊 TEST RESULTS:`);
    console.log(`   ✅ Passed: ${this.results.passed}`);
    console.log(`   ❌ Failed: ${this.results.failed}`);
    console.log(`   📈 Total:  ${this.results.passed + this.results.failed}`);
    
    if (this.results.failed === 0) {
      console.log('\n🎉 ALL TESTS PASSED! System is ready to use.\n');
    } else {
      console.log('\n⚠️  Some tests failed. Check errors above.\n');
      console.log('Failed tests:');
      this.results.tests
        .filter(t => t.status === 'FAIL')
        .forEach(t => console.log(`   - ${t.name}: ${t.error}`));
      console.log('');
    }
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    return this.results.failed === 0;
  }
}

// ============ MAIN EXECUTION ============

async function main() {
  const tester = new SystemTest();
  const success = await tester.runAllTests();
  process.exit(success ? 0 : 1);
}

if (require.main === module) {
  main();
}

module.exports = { SystemTest };
