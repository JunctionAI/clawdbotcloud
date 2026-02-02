#!/usr/bin/env node

/**
 * RISK MANAGEMENT CALCULATOR
 * 
 * Calculate position sizes, risk/reward ratios, and portfolio risk
 * Essential tool for disciplined trading
 */

class RiskCalculator {
  /**
   * Calculate position size based on risk parameters
   * 
   * @param {number} accountBalance - Total account balance
   * @param {number} riskPercentage - Risk per trade (e.g., 0.02 for 2%)
   * @param {number} entryPrice - Entry price
   * @param {number} stopLoss - Stop loss price
   * @param {number} contractSize - Contract/lot size (default 1 for stocks/crypto)
   * @returns {object} Position sizing details
   */
  static calculatePositionSize(accountBalance, riskPercentage, entryPrice, stopLoss, contractSize = 1) {
    // Calculate dollar risk
    const dollarRisk = accountBalance * riskPercentage;
    
    // Calculate risk per unit
    const riskPerUnit = Math.abs(entryPrice - stopLoss);
    
    if (riskPerUnit === 0) {
      throw new Error('Entry price and stop loss cannot be the same');
    }
    
    // Calculate position size
    const positionSize = dollarRisk / riskPerUnit;
    
    // Calculate position value
    const positionValue = positionSize * entryPrice;
    
    // Calculate percentage of account
    const percentageOfAccount = (positionValue / accountBalance) * 100;
    
    return {
      positionSize: positionSize,
      positionValue: positionValue,
      dollarRisk: dollarRisk,
      riskPerUnit: riskPerUnit,
      percentageOfAccount: percentageOfAccount,
      recommendedLots: Math.floor(positionSize / contractSize)
    };
  }

  /**
   * Calculate risk/reward ratio
   * 
   * @param {number} entryPrice - Entry price
   * @param {number} stopLoss - Stop loss price
   * @param {number} takeProfit - Take profit/target price
   * @returns {object} Risk/reward analysis
   */
  static calculateRiskReward(entryPrice, stopLoss, takeProfit) {
    const risk = Math.abs(entryPrice - stopLoss);
    const reward = Math.abs(takeProfit - entryPrice);
    
    const ratio = reward / risk;
    const riskPercent = (risk / entryPrice) * 100;
    const rewardPercent = (reward / entryPrice) * 100;
    
    return {
      ratio: ratio,
      risk: risk,
      reward: reward,
      riskPercent: riskPercent,
      rewardPercent: rewardPercent,
      recommendation: ratio >= 2 ? 'GOOD' : ratio >= 1.5 ? 'ACCEPTABLE' : 'POOR'
    };
  }

  /**
   * Calculate portfolio heat (total risk across all positions)
   * 
   * @param {Array} positions - Array of position objects with risk amounts
   * @param {number} accountBalance - Total account balance
   * @returns {object} Portfolio risk analysis
   */
  static calculatePortfolioHeat(positions, accountBalance) {
    const totalRisk = positions.reduce((sum, pos) => sum + pos.dollarRisk, 0);
    const portfolioHeatPercent = (totalRisk / accountBalance) * 100;
    
    return {
      totalRisk: totalRisk,
      portfolioHeatPercent: portfolioHeatPercent,
      numberOfPositions: positions.length,
      averageRiskPerPosition: totalRisk / positions.length,
      status: portfolioHeatPercent > 10 ? 'HIGH_RISK' : 
              portfolioHeatPercent > 6 ? 'MODERATE_RISK' : 'SAFE'
    };
  }

  /**
   * Calculate maximum loss (drawdown) from price movement
   * 
   * @param {number} entryPrice - Entry price
   * @param {number} currentPrice - Current price
   * @param {number} positionSize - Position size
   * @param {string} direction - 'LONG' or 'SHORT'
   * @returns {object} Drawdown analysis
   */
  static calculateDrawdown(entryPrice, currentPrice, positionSize, direction) {
    let pnl;
    if (direction === 'LONG') {
      pnl = (currentPrice - entryPrice) * positionSize;
    } else {
      pnl = (entryPrice - currentPrice) * positionSize;
    }
    
    const pnlPercent = (pnl / (entryPrice * positionSize)) * 100;
    
    return {
      pnl: pnl,
      pnlPercent: pnlPercent,
      status: pnl >= 0 ? 'PROFIT' : 'LOSS'
    };
  }

  /**
   * Calculate Kelly Criterion for optimal position sizing
   * 
   * @param {number} winRate - Historical win rate (0-1)
   * @param {number} avgWin - Average winning trade size
   * @param {number} avgLoss - Average losing trade size
   * @returns {object} Kelly criterion recommendation
   */
  static calculateKellyCriterion(winRate, avgWin, avgLoss) {
    if (avgLoss === 0) {
      throw new Error('Average loss cannot be zero');
    }
    
    const winLossRatio = avgWin / Math.abs(avgLoss);
    const kellyCriterion = (winRate * winLossRatio - (1 - winRate)) / winLossRatio;
    
    // Half-Kelly is often recommended as more conservative
    const halfKelly = kellyCriterion / 2;
    
    return {
      fullKelly: Math.max(0, kellyCriterion * 100),
      halfKelly: Math.max(0, halfKelly * 100),
      recommendation: halfKelly > 0.1 ? 'TOO_AGGRESSIVE' : 
                     halfKelly > 0.05 ? 'AGGRESSIVE' :
                     halfKelly > 0.02 ? 'MODERATE' : 'CONSERVATIVE',
      message: kellyCriterion <= 0 ? 
               'Negative expectancy - do not trade this strategy' :
               `Recommended position size: ${(halfKelly * 100).toFixed(2)}% (half-Kelly)`
    };
  }

  /**
   * Calculate breakeven point after fees
   * 
   * @param {number} entryPrice - Entry price
   * @param {number} feePercentage - Trading fee percentage (e.g., 0.001 for 0.1%)
   * @param {string} direction - 'LONG' or 'SHORT'
   * @returns {object} Breakeven analysis
   */
  static calculateBreakeven(entryPrice, feePercentage, direction) {
    const entryFee = entryPrice * feePercentage;
    const exitFee = entryPrice * feePercentage; // Approximate
    
    let breakeven;
    if (direction === 'LONG') {
      breakeven = entryPrice + entryFee + exitFee;
    } else {
      breakeven = entryPrice - entryFee - exitFee;
    }
    
    const breakevenPercent = Math.abs((breakeven - entryPrice) / entryPrice) * 100;
    
    return {
      breakeven: breakeven,
      breakevenPercent: breakevenPercent,
      totalFees: entryFee + exitFee,
      requiredMove: Math.abs(breakeven - entryPrice)
    };
  }

  /**
   * Interactive calculator CLI
   */
  static async interactive() {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const question = (prompt) => new Promise((resolve) => {
      readline.question(prompt, resolve);
    });

    console.log('\n╔══════════════════════════════════════════════════════════════╗');
    console.log('║           RISK MANAGEMENT CALCULATOR                         ║');
    console.log('╚══════════════════════════════════════════════════════════════╝\n');

    try {
      const accountBalance = parseFloat(await question('Account Balance ($): '));
      const riskPercentage = parseFloat(await question('Risk per trade (%): ')) / 100;
      const entryPrice = parseFloat(await question('Entry Price ($): '));
      const stopLoss = parseFloat(await question('Stop Loss ($): '));
      const takeProfit = parseFloat(await question('Take Profit ($): '));
      
      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

      // Calculate position size
      const sizing = this.calculatePositionSize(accountBalance, riskPercentage, entryPrice, stopLoss);
      console.log('📊 POSITION SIZING:');
      console.log(`   Position Size: ${sizing.positionSize.toFixed(4)} units`);
      console.log(`   Position Value: $${sizing.positionValue.toFixed(2)}`);
      console.log(`   Dollar Risk: $${sizing.dollarRisk.toFixed(2)}`);
      console.log(`   % of Account: ${sizing.percentageOfAccount.toFixed(2)}%`);

      // Calculate risk/reward
      const rr = this.calculateRiskReward(entryPrice, stopLoss, takeProfit);
      console.log('\n⚖️  RISK/REWARD:');
      console.log(`   Ratio: 1:${rr.ratio.toFixed(2)} (${rr.recommendation})`);
      console.log(`   Risk: $${rr.risk.toFixed(2)} (${rr.riskPercent.toFixed(2)}%)`);
      console.log(`   Reward: $${rr.reward.toFixed(2)} (${rr.rewardPercent.toFixed(2)}%)`);

      // Calculate breakeven
      const breakeven = this.calculateBreakeven(entryPrice, 0.001, entryPrice < stopLoss ? 'SHORT' : 'LONG');
      console.log('\n💰 BREAKEVEN ANALYSIS:');
      console.log(`   Breakeven Price: $${breakeven.breakeven.toFixed(2)}`);
      console.log(`   Total Fees: $${breakeven.totalFees.toFixed(2)}`);
      console.log(`   Required Move: ${breakeven.breakevenPercent.toFixed(3)}%`);

      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    } catch (error) {
      console.error('Error:', error.message);
    } finally {
      readline.close();
    }
  }
}

// ============ MAIN EXECUTION ============

if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args[0] === '--interactive') {
    RiskCalculator.interactive();
  } else if (args[0] === '--help') {
    console.log(`
Risk Management Calculator

Usage:
  node risk-calculator.js --interactive    Start interactive calculator
  node risk-calculator.js --help          Show this help

Examples in code:
  const sizing = RiskCalculator.calculatePositionSize(10000, 0.02, 100, 95);
  const rr = RiskCalculator.calculateRiskReward(100, 95, 110);
  const kelly = RiskCalculator.calculateKellyCriterion(0.6, 100, 50);
    `);
  }
}

module.exports = { RiskCalculator };
