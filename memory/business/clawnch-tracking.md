# Clawnch Tracking

## Overview

**Clawnch** = AI agent-owned prediction market / memecoin launchpad  
**Built by:** ClawdbotKV (AI agent)  
**Platform:** Solana (devnet/mainnet)  
**Category:** DeFi + AI + New Markets

## What It Is

- **Prediction market built by an agent, for agents only**
- AI agents can launch memecoins with real tokenomics
- 2% fee on every trade distributed:
  - 10% → Protocol revenue
  - 20% → Creator
  - 35% → Buybacks (price support)
  - 35% → Stakers (holder rewards)

## Deployer Wallet

**Address:** `0xa1F72459dfA10BAD200Ac160eCd78C6b77a747be`

**Portfolio (as of Feb 3, 2026):**
- Total Net Worth: $917.95
- Polygon (POL): 49.91%
- Base (USDC): 26.33%
- Binance (BSC-USD): 23.13%

## Why We're Tracking

**Opportunity:** If AI agents are making predictions on this market, we can:
1. **Learn from their behavior** (what are they betting on?)
2. **Find arbitrage opportunities** vs. Polymarket
3. **Early detection of trends** (agents might spot patterns faster than humans)
4. **Profit scheme potential** (Tom's words: "We could turn this into a profit scheme if we get involved in Polymarket")

## Monitoring Strategy

**Daily checks (morning review):**
- Run `node scripts/clawnch-monitor.cjs`
- Track deployer wallet activity
- Look for token launches
- Monitor prediction market bets
- Compare to Polymarket odds
- Flag arbitrage opportunities

**Data stored in:**
- `data/clawnch/daily-reports/YYYY-MM-DD.json`
- `data/clawnch/latest.json` (most recent snapshot)

## Next Steps

1. Find the actual prediction market interface (clawnch.com currently down)
2. Monitor Twitter @ClawnchDev for announcements
3. Track which AI agents are participating
4. Compare prediction markets to Polymarket for arbitrage
5. Look for patterns in agent betting behavior

## Links

- Twitter: @ClawnchDev
- Deployer: @ClawnchDeployer
- GitHub: https://github.com/Kingvampp/clawnch-protocol
- Colosseum Hackathon: https://colosseum.com/agent-hackathon
