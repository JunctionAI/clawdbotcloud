#!/usr/bin/env node

/**
 * PAPER TRADING BOT
 * 
 * Simulates live trading with fake money to test strategies
 * Tracks P&L, win rate, and performance metrics
 * 
 * ⚠️ PAPER TRADING ONLY - NO REAL MONEY
 */

const fs = require('fs').promises;
const path = require('path');
const { TradingAnalysis } = require('./trading-analysis');

class PaperTradingBot {
  constructor(config) {
    this.config = config;
    this.portfolio = {
      cash: { ...config.portfolio.paperBalance },
      positions: [],
      closedTrades: [],
      totalTrades: 0,
      winningTrades: 0,
      losingTrades: 0
    };
    this.analyzer = new TradingAnalysis(config);
    this.isRunning = false;
  }

  /**
   * Start the paper trading bot
   */
  async start() {
    if (this.config.liveTrading) {
      throw new Error('❌ LIVE TRADING IS DISABLED - Paper trading only!');
    }

    console.log('🤖 Paper Trading Bot Starting...');
    console.log(`💰 Initial Balance: $${this.portfolio.cash.USD.toLocaleString()}`);
    console.log(`📊 Max Positions: ${this.config.portfolio.maxPositions}`);
    console.log(`⚠️  Risk Per Trade: ${this.config.portfolio.riskPerTrade * 100}%`);
    console.log('');

    this.isRunning = true;
    await this.loadPortfolio();
    await this.tradingLoop();
  }

  /**
   * Main trading loop
   */
  async tradingLoop() {
    while (this.isRunning) {
      try {
        console.log(`\n⏰ ${new Date().toLocaleTimeString()} - Scanning markets...`);
        
        // Scan all enabled markets
        const signals = await this.scanMarkets();
        
        // Check existing positions
        await this.managePositions();
        
        // Evaluate new signals
        if (signals.length > 0) {
          console.log(`\n🔍 Found ${signals.length} potential signals`);
          await this.evaluateSignals(signals);
        }
        
        // Display portfolio status
        this.displayPortfolio();
        
        // Save portfolio state
        await this.savePortfolio();
        
        // Wait before next scan (5 minutes in real use, 10 seconds for demo)
        await this.sleep(10000);
        
      } catch (error) {
        console.error('❌ Error in trading loop:', error.message);
        await this.sleep(5000);
      }
    }
  }

  /**
   * Scan all markets for signals
   */
  async scanMarkets() {
    const signals = [];
    
    // Scan crypto
    if (this.config.markets.crypto.enabled) {
      for (const pair of this.config.markets.crypto.pairs) {
        const mockData = this.generateMockData(250);
        const result = await this.analyzer.analyzeMarket(pair, mockData);
        
        if (result.signals && result.signals.length > 0) {
          signals.push(...result.signals);
        }
      }
    }
    
    // Scan stocks
    if (this.config.markets.stocks.enabled) {
      for (const symbol of this.config.markets.stocks.symbols) {
        const mockData = this.generateMockData(250);
        const result = await this.analyzer.analyzeMarket(symbol, mockData);
        
        if (result.signals && result.signals.length > 0) {
          signals.push(...result.signals);
        }
      }
    }
    
    return signals;
  }

  /**
   * Evaluate signals and potentially open positions
   */
  async evaluateSignals(signals) {
    // Sort by confidence
    signals.sort((a, b) => b.confidence - a.confidence);
    
    for (const signal of signals) {
      // Check if we can open more positions
      if (this.portfolio.positions.length >= this.config.portfolio.maxPositions) {
        console.log('⚠️  Max positions reached, skipping new signals');
        break;
      }
      
      // Check if we already have a position in this symbol
      if (this.portfolio.positions.find(p => p.symbol === signal.symbol)) {
        continue;
      }
      
      // Calculate position size based on risk
      const positionSize = this.calculatePositionSize(signal);
      
      if (positionSize > 0) {
        await this.openPosition(signal, positionSize);
      }
    }
  }

  /**
   * Calculate position size based on risk management
   */
  calculatePositionSize(signal) {
    const accountValue = this.getTotalAccountValue();
    const riskAmount = accountValue * this.config.portfolio.riskPerTrade;
    
    // Calculate risk per share/unit
    const riskPerUnit = Math.abs(signal.entry - signal.stopLoss);
    
    if (riskPerUnit === 0) return 0;
    
    // Position size = risk amount / risk per unit
    const positionSize = riskAmount / riskPerUnit;
    
    // Check if we have enough cash
    const requiredCash = positionSize * signal.entry;
    const currency = signal.symbol.includes('/') ? 'USDT' : 'USD';
    
    if (requiredCash > this.portfolio.cash[currency]) {
      return (this.portfolio.cash[currency] / signal.entry) * 0.95; // Use 95% of available
    }
    
    return positionSize;
  }

  /**
   * Open a new position
   */
  async openPosition(signal, size) {
    const currency = signal.symbol.includes('/') ? 'USDT' : 'USD';
    const cost = size * signal.entry;
    
    if (cost > this.portfolio.cash[currency]) {
      console.log(`⚠️  Insufficient funds for ${signal.symbol}`);
      return;
    }
    
    const position = {
      id: `${signal.symbol}-${Date.now()}`,
      symbol: signal.symbol,
      type: signal.type,
      direction: signal.direction,
      entry: signal.entry,
      size: size,
      stopLoss: signal.stopLoss,
      target: signal.target,
      confidence: signal.confidence,
      openTime: Date.now(),
      currentPrice: signal.entry,
      unrealizedPnL: 0
    };
    
    this.portfolio.cash[currency] -= cost;
    this.portfolio.positions.push(position);
    this.portfolio.totalTrades++;
    
    console.log(`\n✅ OPENED ${position.direction} POSITION`);
    console.log(`   Symbol: ${position.symbol}`);
    console.log(`   Size: ${size.toFixed(4)} units @ $${position.entry.toFixed(2)}`);
    console.log(`   Stop Loss: $${position.stopLoss.toFixed(2)}`);
    console.log(`   Target: $${position.target.toFixed(2)}`);
    console.log(`   Confidence: ${(position.confidence * 100).toFixed(0)}%`);
    console.log(`   Cost: $${cost.toFixed(2)}`);
  }

  /**
   * Manage existing positions (update prices, check stops/targets)
   */
  async managePositions() {
    for (let i = this.portfolio.positions.length - 1; i >= 0; i--) {
      const position = this.portfolio.positions[i];
      
      // Simulate price movement
      position.currentPrice = this.simulatePriceMovement(position);
      
      // Calculate unrealized P&L
      if (position.direction === 'LONG') {
        position.unrealizedPnL = (position.currentPrice - position.entry) * position.size;
      } else {
        position.unrealizedPnL = (position.entry - position.currentPrice) * position.size;
      }
      
      // Check stop loss
      if (position.direction === 'LONG' && position.currentPrice <= position.stopLoss) {
        await this.closePosition(i, 'STOP_LOSS');
        continue;
      }
      
      if (position.direction === 'SHORT' && position.currentPrice >= position.stopLoss) {
        await this.closePosition(i, 'STOP_LOSS');
        continue;
      }
      
      // Check target
      if (position.direction === 'LONG' && position.currentPrice >= position.target) {
        await this.closePosition(i, 'TARGET');
        continue;
      }
      
      if (position.direction === 'SHORT' && position.currentPrice <= position.target) {
        await this.closePosition(i, 'TARGET');
        continue;
      }
    }
  }

  /**
   * Close a position
   */
  async closePosition(index, reason) {
    const position = this.portfolio.positions[index];
    const currency = position.symbol.includes('/') ? 'USDT' : 'USD';
    
    const exitValue = position.size * position.currentPrice;
    this.portfolio.cash[currency] += exitValue;
    
    const trade = {
      ...position,
      closeTime: Date.now(),
      exitPrice: position.currentPrice,
      realizedPnL: position.unrealizedPnL,
      reason: reason,
      duration: Date.now() - position.openTime
    };
    
    this.portfolio.closedTrades.push(trade);
    
    if (trade.realizedPnL > 0) {
      this.portfolio.winningTrades++;
    } else {
      this.portfolio.losingTrades++;
    }
    
    // Remove from positions
    this.portfolio.positions.splice(index, 1);
    
    const pnlColor = trade.realizedPnL > 0 ? '🟢' : '🔴';
    console.log(`\n${pnlColor} CLOSED ${position.direction} POSITION - ${reason}`);
    console.log(`   Symbol: ${position.symbol}`);
    console.log(`   Entry: $${position.entry.toFixed(2)} → Exit: $${position.currentPrice.toFixed(2)}`);
    console.log(`   P&L: $${trade.realizedPnL.toFixed(2)} (${((trade.realizedPnL / (position.entry * position.size)) * 100).toFixed(2)}%)`);
    console.log(`   Duration: ${(trade.duration / 3600000).toFixed(1)} hours`);
  }

  /**
   * Display current portfolio status
   */
  displayPortfolio() {
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 PORTFOLIO STATUS');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    // Cash balances
    console.log('\n💰 Cash:');
    Object.entries(this.portfolio.cash).forEach(([currency, amount]) => {
      console.log(`   ${currency}: $${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
    });
    
    // Open positions
    if (this.portfolio.positions.length > 0) {
      console.log('\n📈 Open Positions:');
      this.portfolio.positions.forEach(pos => {
        const pnlColor = pos.unrealizedPnL > 0 ? '🟢' : '🔴';
        console.log(`   ${pnlColor} ${pos.symbol} ${pos.direction}`);
        console.log(`      Entry: $${pos.entry.toFixed(2)} → Current: $${pos.currentPrice.toFixed(2)}`);
        console.log(`      P&L: $${pos.unrealizedPnL.toFixed(2)}`);
      });
    }
    
    // Performance stats
    const totalAccountValue = this.getTotalAccountValue();
    const initialValue = Object.values(this.config.portfolio.paperBalance).reduce((a, b) => a + b, 0);
    const totalPnL = totalAccountValue - initialValue;
    const winRate = this.portfolio.totalTrades > 0 
      ? (this.portfolio.winningTrades / this.portfolio.totalTrades * 100).toFixed(1)
      : 0;
    
    console.log('\n📊 Performance:');
    console.log(`   Total Value: $${totalAccountValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
    console.log(`   Total P&L: $${totalPnL.toFixed(2)} (${((totalPnL / initialValue) * 100).toFixed(2)}%)`);
    console.log(`   Trades: ${this.portfolio.totalTrades} | Win Rate: ${winRate}%`);
    console.log(`   Winners: ${this.portfolio.winningTrades} | Losers: ${this.portfolio.losingTrades}`);
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  }

  /**
   * Get total account value
   */
  getTotalAccountValue() {
    let total = Object.values(this.portfolio.cash).reduce((a, b) => a + b, 0);
    
    // Add unrealized P&L from open positions
    this.portfolio.positions.forEach(pos => {
      total += pos.unrealizedPnL;
    });
    
    return total;
  }

  /**
   * Simulate price movement for a position
   */
  simulatePriceMovement(position) {
    // Simple random walk with slight bias toward target
    const targetDistance = position.target - position.entry;
    const stopDistance = position.entry - position.stopLoss;
    
    const bias = position.direction === 'LONG' ? 0.52 : 0.48;
    const volatility = Math.abs(targetDistance) * 0.02;
    
    const change = (Math.random() - bias) * volatility;
    return position.currentPrice + change;
  }

  /**
   * Generate mock OHLCV data
   */
  generateMockData(length = 250) {
    const data = [];
    let price = 100 + Math.random() * 100;
    const now = Date.now();
    
    for (let i = 0; i < length; i++) {
      const change = (Math.random() - 0.48) * 5;
      price = Math.max(price + change, 10);
      
      data.push({
        timestamp: now - ((length - i) * 3600000),
        open: price,
        high: price + Math.random() * 2,
        low: price - Math.random() * 2,
        close: price + (Math.random() - 0.5) * 2,
        volume: Math.random() * 1000000 + 500000
      });
    }
    
    return data;
  }

  /**
   * Sleep utility
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Load portfolio from disk
   */
  async loadPortfolio() {
    try {
      const filepath = path.join(__dirname, '..', 'data', 'paper-trading-portfolio.json');
      const data = await fs.readFile(filepath, 'utf8');
      const savedPortfolio = JSON.parse(data);
      
      // Merge saved data with defaults
      this.portfolio = { ...this.portfolio, ...savedPortfolio };
      console.log('✅ Loaded existing portfolio');
    } catch (err) {
      console.log('📝 Starting fresh portfolio');
    }
  }

  /**
   * Save portfolio to disk
   */
  async savePortfolio() {
    try {
      const filepath = path.join(__dirname, '..', 'data', 'paper-trading-portfolio.json');
      await fs.writeFile(filepath, JSON.stringify(this.portfolio, null, 2));
    } catch (err) {
      console.error('⚠️  Failed to save portfolio:', err.message);
    }
  }

  /**
   * Stop the bot
   */
  stop() {
    console.log('\n🛑 Stopping paper trading bot...');
    this.isRunning = false;
  }
}

// ============ MAIN EXECUTION ============

async function main() {
  try {
    // Load config
    const configPath = path.join(__dirname, '..', 'config', 'trading-config.json');
    const config = JSON.parse(await fs.readFile(configPath, 'utf8'));
    
    // Verify paper trading mode
    if (config.liveTrading) {
      console.error('❌ SAFETY CHECK FAILED: liveTrading is enabled in config');
      console.error('❌ Change "liveTrading": false in config/trading-config.json');
      process.exit(1);
    }
    
    const bot = new PaperTradingBot(config);
    
    // Handle graceful shutdown
    process.on('SIGINT', () => {
      bot.stop();
      setTimeout(() => process.exit(0), 1000);
    });
    
    await bot.start();
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { PaperTradingBot };
