#!/usr/bin/env node

/**
 * TRADING ANALYSIS ENGINE
 * 
 * Comprehensive market analysis for crypto, stocks, and forex
 * Includes technical indicators, pattern detection, and signal generation
 */

const fs = require('fs').promises;
const path = require('path');

class TradingAnalysis {
  constructor(config) {
    this.config = config;
    this.indicators = {};
    this.signals = [];
  }

  // ============ TECHNICAL INDICATORS ============

  /**
   * Calculate Simple Moving Average
   */
  calculateSMA(data, period) {
    const sma = [];
    for (let i = period - 1; i < data.length; i++) {
      const sum = data.slice(i - period + 1, i + 1).reduce((a, b) => a + b.close, 0);
      sma.push({ timestamp: data[i].timestamp, value: sum / period });
    }
    return sma;
  }

  /**
   * Calculate Exponential Moving Average
   */
  calculateEMA(data, period) {
    const multiplier = 2 / (period + 1);
    const ema = [];
    
    // Start with SMA
    let emaValue = data.slice(0, period).reduce((a, b) => a + b.close, 0) / period;
    ema.push({ timestamp: data[period - 1].timestamp, value: emaValue });
    
    // Calculate EMA for remaining data
    for (let i = period; i < data.length; i++) {
      emaValue = (data[i].close - emaValue) * multiplier + emaValue;
      ema.push({ timestamp: data[i].timestamp, value: emaValue });
    }
    
    return ema;
  }

  /**
   * Calculate Relative Strength Index (RSI)
   */
  calculateRSI(data, period = 14) {
    const rsi = [];
    let gains = 0;
    let losses = 0;
    
    // Calculate initial average gain/loss
    for (let i = 1; i <= period; i++) {
      const change = data[i].close - data[i - 1].close;
      if (change > 0) gains += change;
      else losses -= change;
    }
    
    let avgGain = gains / period;
    let avgLoss = losses / period;
    let rs = avgGain / avgLoss;
    rsi.push({ timestamp: data[period].timestamp, value: 100 - (100 / (1 + rs)) });
    
    // Calculate RSI for remaining data
    for (let i = period + 1; i < data.length; i++) {
      const change = data[i].close - data[i - 1].close;
      const gain = change > 0 ? change : 0;
      const loss = change < 0 ? -change : 0;
      
      avgGain = (avgGain * (period - 1) + gain) / period;
      avgLoss = (avgLoss * (period - 1) + loss) / period;
      rs = avgGain / avgLoss;
      rsi.push({ timestamp: data[i].timestamp, value: 100 - (100 / (1 + rs)) });
    }
    
    return rsi;
  }

  /**
   * Calculate Bollinger Bands
   */
  calculateBollingerBands(data, period = 20, stdDev = 2) {
    const sma = this.calculateSMA(data, period);
    const bands = [];
    
    for (let i = 0; i < sma.length; i++) {
      const dataIndex = i + period - 1;
      const slice = data.slice(dataIndex - period + 1, dataIndex + 1);
      
      // Calculate standard deviation
      const mean = sma[i].value;
      const variance = slice.reduce((sum, candle) => sum + Math.pow(candle.close - mean, 2), 0) / period;
      const std = Math.sqrt(variance);
      
      bands.push({
        timestamp: sma[i].timestamp,
        upper: mean + (stdDev * std),
        middle: mean,
        lower: mean - (stdDev * std)
      });
    }
    
    return bands;
  }

  /**
   * Calculate MACD (Moving Average Convergence Divergence)
   */
  calculateMACD(data, fastPeriod = 12, slowPeriod = 26, signalPeriod = 9) {
    const fastEMA = this.calculateEMA(data, fastPeriod);
    const slowEMA = this.calculateEMA(data, slowPeriod);
    
    const macdLine = [];
    for (let i = slowPeriod - fastPeriod; i < fastEMA.length; i++) {
      macdLine.push({
        timestamp: fastEMA[i].timestamp,
        value: fastEMA[i].value - slowEMA[i - (slowPeriod - fastPeriod)].value
      });
    }
    
    // Calculate signal line (EMA of MACD)
    const signalLine = this.calculateEMA(
      macdLine.map(m => ({ close: m.value, timestamp: m.timestamp })),
      signalPeriod
    );
    
    const histogram = [];
    for (let i = 0; i < signalLine.length; i++) {
      histogram.push({
        timestamp: signalLine[i].timestamp,
        value: macdLine[i + (macdLine.length - signalLine.length)].value - signalLine[i].value
      });
    }
    
    return { macdLine, signalLine, histogram };
  }

  /**
   * Detect volume spikes
   */
  detectVolumeSpike(data, lookback = 20, multiplier = 1.5) {
    if (data.length < lookback + 1) return false;
    
    const recentData = data.slice(-lookback - 1, -1);
    const avgVolume = recentData.reduce((sum, candle) => sum + candle.volume, 0) / lookback;
    const currentVolume = data[data.length - 1].volume;
    
    return currentVolume > avgVolume * multiplier;
  }

  // ============ PATTERN DETECTION ============

  /**
   * Detect momentum breakout
   */
  detectMomentumBreakout(data) {
    if (data.length < 50) return null;
    
    const rsi = this.calculateRSI(data);
    const ema20 = this.calculateEMA(data, 20);
    const ema50 = this.calculateEMA(data, 50);
    const volumeSpike = this.detectVolumeSpike(data);
    
    const currentPrice = data[data.length - 1].close;
    const currentRSI = rsi[rsi.length - 1].value;
    const currentEMA20 = ema20[ema20.length - 1].value;
    const currentEMA50 = ema50[ema50.length - 1].value;
    
    // Bullish momentum breakout
    if (currentPrice > currentEMA20 && 
        currentEMA20 > currentEMA50 && 
        currentRSI > 50 && currentRSI < 70 &&
        volumeSpike) {
      return {
        type: 'MOMENTUM_BREAKOUT',
        direction: 'LONG',
        confidence: this.calculateConfidence([
          currentRSI > 55 && currentRSI < 65 ? 0.9 : 0.7,
          volumeSpike ? 0.9 : 0.6,
          (currentPrice - currentEMA20) / currentEMA20 < 0.05 ? 0.8 : 0.6
        ]),
        entry: currentPrice,
        stopLoss: currentEMA20 * 0.97,
        target: currentPrice * 1.08,
        indicators: { rsi: currentRSI, ema20: currentEMA20, ema50: currentEMA50 }
      };
    }
    
    // Bearish momentum breakdown
    if (currentPrice < currentEMA20 && 
        currentEMA20 < currentEMA50 && 
        currentRSI < 50 && currentRSI > 30 &&
        volumeSpike) {
      return {
        type: 'MOMENTUM_BREAKOUT',
        direction: 'SHORT',
        confidence: this.calculateConfidence([
          currentRSI < 45 && currentRSI > 35 ? 0.9 : 0.7,
          volumeSpike ? 0.9 : 0.6,
          (currentEMA20 - currentPrice) / currentEMA20 < 0.05 ? 0.8 : 0.6
        ]),
        entry: currentPrice,
        stopLoss: currentEMA20 * 1.03,
        target: currentPrice * 0.92,
        indicators: { rsi: currentRSI, ema20: currentEMA20, ema50: currentEMA50 }
      };
    }
    
    return null;
  }

  /**
   * Detect mean reversion setup
   */
  detectMeanReversion(data) {
    if (data.length < 50) return null;
    
    const bb = this.calculateBollingerBands(data);
    const rsi = this.calculateRSI(data);
    
    const currentPrice = data[data.length - 1].close;
    const currentBB = bb[bb.length - 1];
    const currentRSI = rsi[rsi.length - 1].value;
    
    // Oversold - potential long
    if (currentPrice < currentBB.lower && currentRSI < 30) {
      return {
        type: 'MEAN_REVERSION',
        direction: 'LONG',
        confidence: this.calculateConfidence([
          currentRSI < 25 ? 0.95 : 0.75,
          currentPrice < currentBB.lower * 0.99 ? 0.9 : 0.7
        ]),
        entry: currentPrice,
        stopLoss: currentPrice * 0.95,
        target: currentBB.middle,
        indicators: { rsi: currentRSI, bbLower: currentBB.lower, bbMiddle: currentBB.middle }
      };
    }
    
    // Overbought - potential short
    if (currentPrice > currentBB.upper && currentRSI > 70) {
      return {
        type: 'MEAN_REVERSION',
        direction: 'SHORT',
        confidence: this.calculateConfidence([
          currentRSI > 75 ? 0.95 : 0.75,
          currentPrice > currentBB.upper * 1.01 ? 0.9 : 0.7
        ]),
        entry: currentPrice,
        stopLoss: currentPrice * 1.05,
        target: currentBB.middle,
        indicators: { rsi: currentRSI, bbUpper: currentBB.upper, bbMiddle: currentBB.middle }
      };
    }
    
    return null;
  }

  /**
   * Detect swing trading setup
   */
  detectSwingSetup(data) {
    if (data.length < 200) return null;
    
    const ema20 = this.calculateEMA(data, 20);
    const ema50 = this.calculateEMA(data, 50);
    const ema200 = this.calculateEMA(data, 200);
    const macd = this.calculateMACD(data);
    
    const currentPrice = data[data.length - 1].close;
    const prevPrice = data[data.length - 2].close;
    
    const currentEMA20 = ema20[ema20.length - 1].value;
    const currentEMA50 = ema50[ema50.length - 1].value;
    const currentEMA200 = ema200[ema200.length - 1].value;
    
    const prevEMA20 = ema20[ema20.length - 2].value;
    const prevEMA50 = ema50[ema50.length - 2].value;
    
    const currentHistogram = macd.histogram[macd.histogram.length - 1].value;
    const prevHistogram = macd.histogram[macd.histogram.length - 2].value;
    
    // Bullish swing setup - Golden cross region
    if (currentEMA20 > currentEMA50 && 
        prevEMA20 <= prevEMA50 && 
        currentPrice > currentEMA200 &&
        currentHistogram > 0) {
      return {
        type: 'SWING_SETUP',
        direction: 'LONG',
        confidence: this.calculateConfidence([
          currentHistogram > prevHistogram ? 0.9 : 0.7,
          currentPrice > currentEMA20 ? 0.85 : 0.75
        ]),
        entry: currentPrice,
        stopLoss: currentEMA50 * 0.98,
        target: currentPrice * 1.15,
        indicators: { ema20: currentEMA20, ema50: currentEMA50, ema200: currentEMA200 }
      };
    }
    
    // Bearish swing setup - Death cross region
    if (currentEMA20 < currentEMA50 && 
        prevEMA20 >= prevEMA50 && 
        currentPrice < currentEMA200 &&
        currentHistogram < 0) {
      return {
        type: 'SWING_SETUP',
        direction: 'SHORT',
        confidence: this.calculateConfidence([
          currentHistogram < prevHistogram ? 0.9 : 0.7,
          currentPrice < currentEMA20 ? 0.85 : 0.75
        ]),
        entry: currentPrice,
        stopLoss: currentEMA50 * 1.02,
        target: currentPrice * 0.85,
        indicators: { ema20: currentEMA20, ema50: currentEMA50, ema200: currentEMA200 }
      };
    }
    
    return null;
  }

  /**
   * Calculate average confidence from array of scores
   */
  calculateConfidence(scores) {
    return scores.reduce((sum, score) => sum + score, 0) / scores.length;
  }

  // ============ MARKET ANALYSIS ============

  /**
   * Analyze a single market/symbol
   */
  async analyzeMarket(symbol, data) {
    if (!data || data.length < 200) {
      return { symbol, error: 'Insufficient data' };
    }

    const signals = [];
    
    // Run all detection strategies
    const momentum = this.detectMomentumBreakout(data);
    if (momentum && momentum.confidence >= this.config.alerts.minConfidence) {
      signals.push({ ...momentum, symbol, timestamp: Date.now() });
    }
    
    const meanReversion = this.detectMeanReversion(data);
    if (meanReversion && meanReversion.confidence >= this.config.alerts.minConfidence) {
      signals.push({ ...meanReversion, symbol, timestamp: Date.now() });
    }
    
    const swing = this.detectSwingSetup(data);
    if (swing && swing.confidence >= this.config.alerts.minConfidence) {
      signals.push({ ...swing, symbol, timestamp: Date.now() });
    }

    // Calculate current market state
    const currentPrice = data[data.length - 1].close;
    const rsi = this.calculateRSI(data);
    const currentRSI = rsi[rsi.length - 1].value;
    
    return {
      symbol,
      price: currentPrice,
      rsi: currentRSI,
      signals,
      timestamp: Date.now()
    };
  }

  /**
   * Save signals to file
   */
  async saveSignals(signals) {
    const timestamp = new Date().toISOString().split('T')[0];
    const filepath = path.join(__dirname, '..', 'data', 'signals', `signals-${timestamp}.json`);
    
    let existingSignals = [];
    try {
      const data = await fs.readFile(filepath, 'utf8');
      existingSignals = JSON.parse(data);
    } catch (err) {
      // File doesn't exist yet
    }
    
    existingSignals.push(...signals);
    await fs.writeFile(filepath, JSON.stringify(existingSignals, null, 2));
    
    return filepath;
  }
}

// ============ MAIN EXECUTION ============

async function main() {
  try {
    // Load config
    const configPath = path.join(__dirname, '..', 'config', 'trading-config.json');
    const config = JSON.parse(await fs.readFile(configPath, 'utf8'));
    
    console.log('🔍 Trading Analysis Engine Starting...');
    console.log(`Mode: ${config.mode}`);
    console.log('');
    
    const analyzer = new TradingAnalysis(config);
    
    // For demonstration, generate mock data
    // In production, this would fetch from real APIs
    console.log('📊 Analyzing markets...');
    console.log('⚠️  Note: Using mock data - connect real APIs in production');
    console.log('');
    
    const mockData = generateMockData(250);
    
    // Analyze crypto markets
    if (config.markets.crypto.enabled) {
      console.log('💎 Crypto Analysis:');
      for (const pair of config.markets.crypto.pairs) {
        const result = await analyzer.analyzeMarket(pair, mockData);
        console.log(`  ${result.symbol}: $${result.price.toFixed(2)} | RSI: ${result.rsi.toFixed(1)}`);
        
        if (result.signals.length > 0) {
          result.signals.forEach(signal => {
            console.log(`    🚨 ${signal.type} - ${signal.direction} (Confidence: ${(signal.confidence * 100).toFixed(0)}%)`);
            console.log(`       Entry: $${signal.entry.toFixed(2)} | Stop: $${signal.stopLoss.toFixed(2)} | Target: $${signal.target.toFixed(2)}`);
          });
        }
      }
      console.log('');
    }
    
    // Analyze stocks
    if (config.markets.stocks.enabled) {
      console.log('📈 Stock Analysis:');
      for (const symbol of [...config.markets.stocks.symbols, ...config.markets.stocks.nzStocks]) {
        const result = await analyzer.analyzeMarket(symbol, mockData);
        console.log(`  ${result.symbol}: $${result.price.toFixed(2)} | RSI: ${result.rsi.toFixed(1)}`);
        
        if (result.signals.length > 0) {
          result.signals.forEach(signal => {
            console.log(`    🚨 ${signal.type} - ${signal.direction} (Confidence: ${(signal.confidence * 100).toFixed(0)}%)`);
          });
        }
      }
      console.log('');
    }
    
    console.log('✅ Analysis complete');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

/**
 * Generate mock OHLCV data for testing
 */
function generateMockData(length = 250) {
  const data = [];
  let price = 100;
  const now = Date.now();
  
  for (let i = 0; i < length; i++) {
    const change = (Math.random() - 0.48) * 5; // Slight upward bias
    price = Math.max(price + change, 10);
    
    const open = price;
    const close = price + (Math.random() - 0.5) * 2;
    const high = Math.max(open, close) + Math.random() * 1;
    const low = Math.min(open, close) - Math.random() * 1;
    const volume = Math.random() * 1000000 + 500000;
    
    data.push({
      timestamp: now - ((length - i) * 3600000), // Hourly candles
      open,
      high,
      low,
      close,
      volume
    });
    
    price = close;
  }
  
  return data;
}

if (require.main === module) {
  main();
}

module.exports = { TradingAnalysis };
