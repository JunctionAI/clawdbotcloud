# Trading System - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Test the System

Run the market analysis:
```bash
cd C:\Users\Nightgalem\clawd
node scripts/trading-analysis.js
```

You should see:
- Crypto analysis for BTC, ETH, SOL, etc.
- Stock analysis for AAPL, MSFT, etc.
- Any detected trading signals
- Technical indicators (RSI, moving averages)

### 2. Generate a Market Briefing

```bash
node scripts/market-intelligence.js
```

This creates:
- Daily market intelligence report
- Top trading opportunities
- Risk alerts
- Market sentiment analysis

Output saved to: `data/market-briefing-YYYY-MM-DD.txt`

### 3. Start Paper Trading

```bash
node scripts/paper-trading-bot.js
```

The bot will:
- Scan markets every 10 seconds (configurable)
- Detect trading signals
- Simulate opening/closing positions
- Track portfolio performance
- Show P&L in real-time

**Press Ctrl+C to stop**

### 4. Calculate Position Sizes

```bash
node scripts/risk-calculator.js --interactive
```

Enter:
- Your account balance
- Risk percentage (e.g., 2%)
- Entry price
- Stop loss price
- Take profit target

Get instant:
- Correct position size
- Risk/reward ratio
- Breakeven analysis

---

## 📊 Understanding the Output

### Trading Signals

When a signal is detected, you'll see:

```
🚨 MOMENTUM_BREAKOUT - LONG (Confidence: 85%)
   Entry: $100.00 | Stop: $97.00 | Target: $108.00
```

**What this means:**
- **Type:** Momentum breakout strategy detected
- **Direction:** LONG (buy signal) or SHORT (sell signal)
- **Confidence:** 85% = high probability setup
- **Entry:** Price to enter the trade
- **Stop:** Where to exit if wrong (stop loss)
- **Target:** Where to take profit

### Paper Trading Output

```
✅ OPENED LONG POSITION
   Symbol: BTC/USDT
   Size: 0.5000 units @ $50000.00
   Stop Loss: $48500.00
   Target: $54000.00
   Confidence: 85%
   Cost: $25000.00
```

**What happened:**
- Bought 0.5 BTC at $50,000
- Will automatically sell if price drops to $48,500 (stop loss)
- Will automatically sell if price rises to $54,000 (take profit)
- Cost $25,000 of paper money

### Portfolio Status

```
📊 PORTFOLIO STATUS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💰 Cash:
   USD: $25,000.00
   USDT: $15,000.00

📈 Open Positions:
   🟢 BTC/USDT LONG
      Entry: $50000.00 → Current: $51000.00
      P&L: $500.00

📊 Performance:
   Total Value: $90,500.00
   Total P&L: $500.00 (0.56%)
   Trades: 1 | Win Rate: 100%
```

**What you're seeing:**
- Available cash to trade
- Open positions with current profit/loss
- Overall portfolio performance
- Trading statistics

---

## ⚙️ Configuration

### Edit Trading Parameters

Open: `config/trading-config.json`

**Key settings to adjust:**

```json
{
  "portfolio": {
    "paperBalance": {
      "USD": 50000    // ← Change starting balance
    },
    "riskPerTrade": 0.02,    // ← 2% risk per trade
    "maxPositions": 10        // ← Max simultaneous trades
  },
  
  "markets": {
    "crypto": {
      "enabled": true,       // ← Enable/disable crypto
      "pairs": [
        "BTC/USDT",          // ← Add/remove trading pairs
        "ETH/USDT"
      ]
    }
  },
  
  "strategies": {
    "momentumBreakout": {
      "enabled": true,       // ← Enable/disable strategies
      "rsiOverbought": 70    // ← Adjust parameters
    }
  },
  
  "alerts": {
    "minConfidence": 0.7     // ← Only show signals >70% confidence
  }
}
```

**Save and restart** the scripts for changes to take effect.

---

## 🎯 Daily Workflow

### Morning Routine

1. **Generate market briefing:**
   ```bash
   node scripts/market-intelligence.js
   ```

2. **Review:**
   - Top opportunities
   - Market sentiment
   - Risk alerts

3. **Start paper trading if conditions are good:**
   ```bash
   node scripts/paper-trading-bot.js
   ```

### Throughout the Day

The paper trading bot runs automatically:
- Scans markets
- Detects signals
- Opens/closes positions
- Manages risk

**Just let it run and monitor the output**

### Evening Review

1. **Stop the bot** (Ctrl+C)

2. **Review performance:**
   - Check closed trades
   - Calculate win rate
   - Note what worked/didn't work

3. **Update strategy if needed:**
   - Edit config parameters
   - Disable underperforming strategies
   - Adjust risk settings

---

## 🔧 Common Adjustments

### Make Strategies More Aggressive

```json
{
  "portfolio": {
    "riskPerTrade": 0.03,    // Increase from 2% to 3%
    "maxPositions": 15       // Allow more simultaneous trades
  },
  "alerts": {
    "minConfidence": 0.6     // Accept lower confidence signals
  }
}
```

### Make Strategies More Conservative

```json
{
  "portfolio": {
    "riskPerTrade": 0.01,    // Decrease to 1%
    "maxPositions": 5        // Limit simultaneous trades
  },
  "alerts": {
    "minConfidence": 0.8     // Only take highest confidence signals
  }
}
```

### Focus Only on Crypto

```json
{
  "markets": {
    "crypto": { "enabled": true },
    "stocks": { "enabled": false },
    "forex": { "enabled": false }
  }
}
```

---

## 📈 Integration with Morning Briefing

### Add to Existing Briefing System

The market intelligence can be integrated into your morning briefing.

**In your briefing script:**

```javascript
const { MarketIntelligence } = require('./scripts/market-intelligence');

// Generate trading briefing
const tradingBrief = await intelligence.generateBriefing();

// Include in morning briefing
briefing += '\n\n' + tradingBrief;
```

**Or run separately and save:**

```bash
node scripts/market-intelligence.js > daily-trading-brief.txt
```

---

## 🐛 Troubleshooting

### Script Won't Run

**Check Node.js version:**
```bash
node --version
```
Should be v14 or higher

**Check you're in the right directory:**
```bash
cd C:\Users\Nightgalem\clawd
```

### No Signals Detected

This is normal! The strategies are conservative and wait for high-probability setups.

**To see more signals:**
- Lower `minConfidence` in config (e.g., 0.6)
- Enable more strategies
- Add more trading pairs

### "Insufficient data" Error

The mock data generator needs at least 200 candles. This shouldn't happen with the current setup, but if it does:
- Check that the analysis is calling `generateMockData(250)`
- Ensure strategies aren't requesting too much historical data

### Bot Keeps Losing Money

**Paper trading losses are good learning!**

1. **Review closed trades:**
   Check `data/paper-trading-portfolio.json`

2. **Analyze patterns:**
   - Are stop losses too tight?
   - Are targets too ambitious?
   - Is win rate below 40%?

3. **Adjust strategies:**
   - Disable underperforming ones
   - Tighten entry conditions
   - Improve risk/reward ratios

---

## 🎓 Learning Resources

### Understanding Indicators

**RSI (Relative Strength Index):**
- 0-30: Oversold (potential buy)
- 30-70: Neutral
- 70-100: Overbought (potential sell)

**Moving Averages:**
- Price above MAs = uptrend
- Price below MAs = downtrend
- MAs crossing = trend change

**Bollinger Bands:**
- Price at upper band = overbought
- Price at lower band = oversold
- Price at middle = fair value

### Risk Management Rules

1. **Never risk more than 2% per trade**
2. **Always use stop losses**
3. **Target 2:1 reward-to-risk minimum**
4. **Don't trade more than 10 positions**
5. **Stop trading after 3 losses in a row**

### Trading Psychology

- **Be patient:** Wait for high-probability setups
- **Be disciplined:** Follow your rules
- **Be humble:** Accept losses as learning
- **Be consistent:** Trust the process

---

## ✅ Next Steps

### Week 1: Learn the System
- Run scripts daily
- Understand the output
- Read the documentation
- Experiment with settings

### Week 2: Test Strategies
- Run paper trading continuously
- Track performance
- Note winning patterns
- Identify what doesn't work

### Week 3: Optimize
- Adjust parameters
- Focus on best strategies
- Improve risk management
- Build confidence

### Week 4: Review
- Calculate total P&L
- Analyze all trades
- Decide if ready for real money
- Get approval from Tom

---

## 📞 Support

**Questions?**
1. Check `docs/TRADING-SYSTEM.md` for detailed info
2. Review code comments in scripts
3. Test with paper trading first
4. Ask before going live!

**Remember:** This is practice. Make mistakes here, not with real money!

---

## 🔒 Safety Reminder

**Current Status:** PAPER TRADING ONLY

**Before Live Trading:**
- [ ] Minimum 30 days paper trading
- [ ] Positive overall P&L
- [ ] Win rate above 50%
- [ ] Risk management proven
- [ ] Tom's explicit approval

**This is infrastructure. You're building skills. Take your time!**
