# Trading Analysis & Strategy System

**⚠️ PAPER TRADING ONLY - NO LIVE TRADING WITHOUT EXPLICIT APPROVAL**

## Overview

A comprehensive trading infrastructure for crypto, stocks, and forex markets. Built for intelligent analysis, strategy testing, and paper trading before any real money deployment.

## System Components

### 1. Market Analysis Engine (`scripts/trading-analysis.js`)

**Purpose:** Analyze markets using technical indicators and detect trading opportunities

**Features:**
- **Technical Indicators:**
  - Moving Averages (SMA, EMA)
  - RSI (Relative Strength Index)
  - MACD (Moving Average Convergence Divergence)
  - Bollinger Bands
  - Volume analysis

- **Pattern Detection:**
  - Momentum breakouts
  - Mean reversion setups
  - Swing trading patterns
  - Trend identification

- **Signal Generation:**
  - Entry/exit points
  - Stop loss calculation
  - Take profit targets
  - Confidence scoring

**Usage:**
```bash
node scripts/trading-analysis.js
```

**Output:**
- Market analysis for all configured symbols
- Detected signals with confidence scores
- Technical indicator values
- Saved signals in `data/signals/signals-YYYY-MM-DD.json`

---

### 2. Paper Trading Bot (`scripts/paper-trading-bot.js`)

**Purpose:** Simulate live trading with fake money to test strategies

**Features:**
- **Portfolio Management:**
  - Track cash balance (USD, USDT, NZD)
  - Manage multiple positions
  - Position sizing based on risk
  - Max position limits

- **Trade Execution:**
  - Automatic signal detection
  - Position opening/closing
  - Stop loss enforcement
  - Take profit execution

- **Performance Tracking:**
  - P&L calculation
  - Win rate statistics
  - Total return tracking
  - Trade history

- **Safety Features:**
  - Hard-coded paper trading mode
  - Risk per trade limits (default 2%)
  - Max drawdown protection (default 15%)
  - Portfolio heat monitoring

**Usage:**
```bash
node scripts/paper-trading-bot.js
```

**Safety Check:**
The bot will refuse to run if `liveTrading: true` in config

**Portfolio State:**
Saved automatically to `data/paper-trading-portfolio.json`

---

### 3. Market Intelligence Briefing (`scripts/market-intelligence.js`)

**Purpose:** Generate daily market analysis and actionable intelligence

**Features:**
- **Market Analysis:**
  - Crypto market overview
  - Stock market analysis (US + NZ)
  - Forex market monitoring
  - Trend identification

- **Opportunity Detection:**
  - Top 5 high-confidence setups
  - Risk/reward analysis
  - Entry/exit recommendations

- **Sentiment Analysis:**
  - Overall market sentiment
  - Per-market sentiment breakdown
  - Trend strength indicators

- **Risk Alerts:**
  - Overbought/oversold warnings
  - High volatility alerts
  - Market condition changes

- **Focus Areas:**
  - Daily trading priorities
  - Dividend opportunities
  - Key levels to watch

**Usage:**
```bash
node scripts/market-intelligence.js
```

**Output:**
- Formatted text briefing: `data/market-briefing-YYYY-MM-DD.txt`
- JSON data: `data/market-briefing-YYYY-MM-DD.json`
- Console display with full report

**Integration:**
Can be integrated into morning briefing system for daily market updates

---

### 4. Risk Management Calculator (`scripts/risk-calculator.js`)

**Purpose:** Calculate position sizes and manage trading risk

**Features:**
- **Position Sizing:**
  - Risk-based calculation
  - Account percentage limits
  - Dollar risk computation

- **Risk/Reward Analysis:**
  - R:R ratio calculation
  - Risk/reward recommendations
  - Breakeven analysis

- **Portfolio Risk:**
  - Portfolio heat calculation
  - Total exposure tracking
  - Risk distribution

- **Advanced Calculations:**
  - Kelly Criterion
  - Drawdown analysis
  - Fee impact calculation

**Usage:**
```bash
# Interactive mode
node scripts/risk-calculator.js --interactive

# In code
const { RiskCalculator } = require('./scripts/risk-calculator');
const sizing = RiskCalculator.calculatePositionSize(10000, 0.02, 100, 95);
```

**Example:**
```javascript
// Calculate position size
const sizing = RiskCalculator.calculatePositionSize(
  10000,  // Account balance
  0.02,   // 2% risk per trade
  100,    // Entry price
  95      // Stop loss price
);

// Result:
// positionSize: 40 units
// dollarRisk: $200
// positionValue: $4000
```

---

## Configuration

### `config/trading-config.json`

**Critical Settings:**
```json
{
  "mode": "PAPER_TRADING_ONLY",
  "liveTrading": false,  // ⚠️ MUST be false
  
  "portfolio": {
    "paperBalance": {
      "USD": 50000,
      "USDT": 20000,
      "NZD": 30000
    },
    "riskPerTrade": 0.02,      // 2% risk per trade
    "maxPositions": 10,         // Max concurrent positions
    "maxDrawdown": 0.15         // 15% max drawdown
  }
}
```

**Market Configuration:**
```json
{
  "markets": {
    "crypto": {
      "enabled": true,
      "pairs": ["BTC/USDT", "ETH/USDT", "SOL/USDT"],
      "timeframes": ["1h", "4h", "1d"]
    },
    "stocks": {
      "enabled": true,
      "symbols": ["AAPL", "MSFT", "GOOGL"],
      "nzStocks": ["FPH.NZ", "AIA.NZ", "SPK.NZ"],
      "dividendFocus": true
    },
    "forex": {
      "enabled": true,
      "pairs": ["NZD/USD", "EUR/USD", "GBP/USD"]
    }
  }
}
```

**Strategy Settings:**
```json
{
  "strategies": {
    "momentumBreakout": {
      "enabled": true,
      "rsiPeriod": 14,
      "rsiOverbought": 70,
      "rsiOversold": 30
    },
    "swingTrading": {
      "enabled": true,
      "emaPeriods": [20, 50, 200]
    },
    "meanReversion": {
      "enabled": true,
      "bollingerPeriod": 20
    }
  }
}
```

---

## Trading Strategies

### 1. Momentum Breakout
**When:** Price breaks above/below key moving averages with volume

**Conditions:**
- Price > EMA20 > EMA50 (bullish)
- RSI between 50-70
- Volume spike (1.5x average)

**Risk Management:**
- Stop loss: 3% below EMA20
- Target: 8% profit
- Typical R:R ratio: 1:2.5

### 2. Mean Reversion
**When:** Price deviates significantly from average

**Conditions:**
- Price touches Bollinger Band extremes
- RSI < 30 (oversold) or > 70 (overbought)
- No strong trend present

**Risk Management:**
- Stop loss: 5% beyond entry
- Target: Middle Bollinger Band
- Typical R:R ratio: 1:2

### 3. Swing Trading
**When:** Trend changes detected via EMA crossovers

**Conditions:**
- Golden cross (EMA20 crosses above EMA50)
- Price above EMA200 (long-term trend)
- MACD histogram positive and increasing

**Risk Management:**
- Stop loss: 2% below EMA50
- Target: 15% profit
- Typical R:R ratio: 1:7

---

## API Integration (Future)

### Currently Using Mock Data

The system is built to integrate with real market data APIs but currently uses simulated data for testing.

### Supported APIs (When Ready):

**Crypto:**
- **Binance** - Spot & futures trading
  - Free API with rate limits
  - Testnet available for paper trading
  - Real-time price data

**US Stocks:**
- **Alpaca** - Commission-free trading
  - Free paper trading account
  - Real-time market data
  - Easy API integration

- **Polygon.io** - Market data
  - Historical & real-time data
  - Free tier available
  - High-quality stock data

**Forex:**
- **OANDA** - Forex & CFD trading
  - Practice account available
  - Competitive spreads
  - Professional API

**Setup Steps (When Approved):**

1. Create accounts on chosen platforms
2. Generate API keys (read-only for research)
3. Add keys to `config/trading-config.json`
4. Test with paper trading accounts first
5. Monitor performance for 30+ days
6. Get explicit approval before live trading

---

## Safety & Risk Management

### Hard Safety Limits

**Never Override These:**
- Max risk per trade: 2%
- Max portfolio heat: 10%
- Max drawdown: 15%
- Max concurrent positions: 10

### Pre-Trade Checklist

Before any trade (paper or real):
- [ ] Risk/reward ratio ≥ 1.5:1
- [ ] Position size calculated correctly
- [ ] Stop loss set and verified
- [ ] Take profit target set
- [ ] Total portfolio risk under 10%
- [ ] Market conditions favorable
- [ ] Strategy signals confirmed

### Daily Risk Check

Run before market open:
```bash
node scripts/market-intelligence.js
```

Review:
- Market sentiment
- Risk alerts
- Open positions
- Portfolio heat

---

## Performance Tracking

### Metrics to Monitor

**Win Rate:**
- Target: 50%+ for swing trades
- Target: 60%+ for momentum trades
- Target: 40%+ for mean reversion

**Average R:R Ratio:**
- Minimum: 1.5:1
- Target: 2:1 or better

**Maximum Drawdown:**
- Hard limit: 15%
- Warning level: 10%

**Sharpe Ratio:**
- Target: 1.5+ (risk-adjusted returns)

### Review Schedule

**Daily:**
- Check open positions
- Review new signals
- Update stops if needed

**Weekly:**
- Analyze closed trades
- Calculate win rate
- Review strategy performance

**Monthly:**
- Full portfolio review
- Strategy adjustments
- Risk parameter updates

---

## Going Live (Requires Approval)

### Before Live Trading:

1. **Paper Trading Performance:**
   - Minimum 30 days of paper trading
   - Positive P&L over period
   - Win rate above targets
   - Maximum drawdown respected

2. **Risk Management:**
   - All systems tested
   - Risk calculator validated
   - Emergency stop procedures defined
   - Position sizing verified

3. **Technical Setup:**
   - API keys secured (use environment variables)
   - 2FA enabled on all accounts
   - Backup systems in place
   - Monitoring alerts configured

4. **Get Explicit Approval:**
   - Review performance data
   - Discuss risk parameters
   - Confirm account funding
   - Set initial position limits

### Activation Command (After Approval):

```bash
# Update config
# Set: "liveTrading": true
# Add: real API keys

# Start with small positions
node scripts/paper-trading-bot.js
```

**Start Small:**
- Begin with 25% of planned capital
- Max 2-3 positions initially
- Reduce risk per trade to 1%
- Monitor closely for first week

---

## Troubleshooting

### Common Issues

**"Insufficient data" error:**
- Check that market data is available
- Verify API connections
- Ensure timeframe has enough candles

**No signals detected:**
- Market may be in consolidation
- Adjust confidence threshold
- Review strategy parameters

**High portfolio heat:**
- Close some positions
- Reduce position sizes
- Wait for better setups

### Debug Mode

Enable detailed logging:
```javascript
// In trading-analysis.js
const DEBUG = true;
```

---

## Files & Directories

```
clawd/
├── config/
│   └── trading-config.json          # Main configuration
├── scripts/
│   ├── trading-analysis.js          # Market analysis engine
│   ├── paper-trading-bot.js         # Paper trading simulator
│   ├── market-intelligence.js       # Daily briefing generator
│   └── risk-calculator.js           # Risk management tools
├── data/
│   ├── signals/                     # Detected trading signals
│   ├── market-data/                 # Historical market data
│   ├── backtests/                   # Backtest results
│   ├── paper-trading-portfolio.json # Paper trading state
│   ├── market-briefing-*.txt        # Daily briefings
│   └── market-briefing-*.json       # Briefing data
└── docs/
    └── TRADING-SYSTEM.md            # This file
```

---

## Next Steps

### Immediate (Paper Trading):

1. **Run Market Analysis:**
   ```bash
   node scripts/trading-analysis.js
   ```

2. **Start Paper Trading:**
   ```bash
   node scripts/paper-trading-bot.js
   ```

3. **Generate Daily Briefing:**
   ```bash
   node scripts/market-intelligence.js
   ```

### Short Term (1-2 weeks):

1. **Connect Real Data:**
   - Set up Binance testnet
   - Get Alpaca paper trading account
   - Connect Polygon.io for data

2. **Backtest Strategies:**
   - Run historical simulations
   - Optimize parameters
   - Validate performance

3. **Monitor Performance:**
   - Track paper trading results
   - Analyze winning/losing trades
   - Refine strategies

### Medium Term (1-3 months):

1. **Strategy Refinement:**
   - Add more technical indicators
   - Test new patterns
   - Optimize entry/exit logic

2. **Automation:**
   - Integrate with heartbeat system
   - Set up automatic briefings
   - Add Discord/Telegram alerts

3. **Performance Analysis:**
   - Build dashboards
   - Generate reports
   - Track key metrics

### Long Term (3+ months):

1. **Live Trading Preparation:**
   - Consistent paper trading profits
   - Proven risk management
   - Strategy validation

2. **Approval Process:**
   - Review with Tom
   - Discuss funding
   - Set live trading limits

3. **Go Live:**
   - Start with small capital
   - Scale gradually
   - Monitor closely

---

## Important Reminders

⚠️ **SAFETY FIRST:**
- This is paper trading infrastructure
- No real money unless explicitly approved
- Always verify risk calculations
- Never trade without stop losses

💡 **LEARNING FOCUS:**
- Build experience with paper trading
- Understand market behavior
- Test strategies thoroughly
- Learn from every trade

🎯 **GOAL:**
- Build proven, profitable strategies
- Develop disciplined trading habits
- Create reliable income stream
- Scale gradually and safely

---

## Support & Questions

For questions about the system:
1. Check this documentation
2. Review code comments
3. Test with paper trading
4. Ask before going live

**Remember:** There's no rush. Build skills, test strategies, and only trade live when ready and approved.
