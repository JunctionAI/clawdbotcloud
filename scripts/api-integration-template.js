#!/usr/bin/env node

/**
 * API INTEGRATION TEMPLATE
 * 
 * When ready to connect real market data, use these templates
 * Replace mock data with actual API calls
 * 
 * ⚠️ START WITH TESTNET/PAPER ACCOUNTS ONLY
 */

// ============ BINANCE (CRYPTO) ============

/**
 * Binance API Integration
 * Free tier available, testnet for paper trading
 * 
 * Setup:
 * 1. Create account at binance.com
 * 2. Enable API access (testnet: testnet.binance.vision)
 * 3. Generate API key + secret
 * 4. npm install node-binance-api
 */

async function fetchBinanceData(symbol, interval = '1h', limit = 250) {
  // TESTNET: https://testnet.binance.vision
  // PRODUCTION: https://api.binance.com
  
  const baseUrl = 'https://testnet.binance.vision';
  const endpoint = `/api/v3/klines`;
  
  const params = new URLSearchParams({
    symbol: symbol.replace('/', ''),  // BTCUSDT
    interval: interval,                // 1h, 4h, 1d
    limit: limit
  });
  
  try {
    const response = await fetch(`${baseUrl}${endpoint}?${params}`);
    const data = await response.json();
    
    // Transform Binance format to our format
    return data.map(candle => ({
      timestamp: candle[0],
      open: parseFloat(candle[1]),
      high: parseFloat(candle[2]),
      low: parseFloat(candle[3]),
      close: parseFloat(candle[4]),
      volume: parseFloat(candle[5])
    }));
    
  } catch (error) {
    console.error('Binance API error:', error.message);
    return null;
  }
}

// ============ ALPACA (US STOCKS) ============

/**
 * Alpaca API Integration
 * Free paper trading account, real-time data
 * 
 * Setup:
 * 1. Create account at alpaca.markets
 * 2. Generate API key + secret (paper trading)
 * 3. npm install @alpacahq/alpaca-trade-api
 */

async function fetchAlpacaData(symbol, timeframe = '1Hour', limit = 250) {
  const baseUrl = 'https://paper-api.alpaca.markets';
  const apiKey = process.env.ALPACA_API_KEY;
  const apiSecret = process.env.ALPACA_API_SECRET;
  
  const endpoint = `/v2/stocks/${symbol}/bars`;
  
  const params = new URLSearchParams({
    timeframe: timeframe,  // 1Hour, 1Day
    limit: limit
  });
  
  try {
    const response = await fetch(`${baseUrl}${endpoint}?${params}`, {
      headers: {
        'APCA-API-KEY-ID': apiKey,
        'APCA-API-SECRET-KEY': apiSecret
      }
    });
    
    const data = await response.json();
    
    // Transform Alpaca format to our format
    return data.bars.map(bar => ({
      timestamp: new Date(bar.t).getTime(),
      open: bar.o,
      high: bar.h,
      low: bar.l,
      close: bar.c,
      volume: bar.v
    }));
    
  } catch (error) {
    console.error('Alpaca API error:', error.message);
    return null;
  }
}

// ============ POLYGON.IO (MARKET DATA) ============

/**
 * Polygon.io API Integration
 * High-quality market data for stocks, crypto, forex
 * Free tier: 5 API calls/minute
 * 
 * Setup:
 * 1. Create account at polygon.io
 * 2. Get free API key
 * 3. No npm package needed (simple REST API)
 */

async function fetchPolygonData(symbol, timespan = 'hour', limit = 250) {
  const apiKey = process.env.POLYGON_API_KEY;
  const baseUrl = 'https://api.polygon.io';
  
  const to = new Date().toISOString().split('T')[0];
  const from = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  
  const endpoint = `/v2/aggs/ticker/${symbol}/range/1/${timespan}/${from}/${to}`;
  
  try {
    const response = await fetch(`${baseUrl}${endpoint}?apiKey=${apiKey}&limit=${limit}`);
    const data = await response.json();
    
    // Transform Polygon format to our format
    return data.results.map(bar => ({
      timestamp: bar.t,
      open: bar.o,
      high: bar.h,
      low: bar.l,
      close: bar.c,
      volume: bar.v
    }));
    
  } catch (error) {
    console.error('Polygon API error:', error.message);
    return null;
  }
}

// ============ COINGECKO (CRYPTO PRICES) ============

/**
 * CoinGecko API Integration
 * Free crypto market data (no API key needed for basic)
 * Rate limit: 10-50 calls/minute depending on plan
 * 
 * Setup:
 * 1. No account needed for free tier
 * 2. Optional: Get API key for higher limits
 */

async function fetchCoinGeckoData(coinId, days = 7) {
  const baseUrl = 'https://api.coingecko.com/api/v3';
  const endpoint = `/coins/${coinId}/market_chart`;
  
  const params = new URLSearchParams({
    vs_currency: 'usd',
    days: days,
    interval: 'hourly'
  });
  
  try {
    const response = await fetch(`${baseUrl}${endpoint}?${params}`);
    const data = await response.json();
    
    // Transform CoinGecko format to our format
    return data.prices.map((price, index) => ({
      timestamp: price[0],
      open: price[1],
      high: price[1] * 1.01,  // Approximate
      low: price[1] * 0.99,   // Approximate
      close: price[1],
      volume: data.total_volumes[index]?.[1] || 0
    }));
    
  } catch (error) {
    console.error('CoinGecko API error:', error.message);
    return null;
  }
}

// ============ OANDA (FOREX) ============

/**
 * OANDA API Integration
 * Professional forex trading platform
 * Practice account available
 * 
 * Setup:
 * 1. Create practice account at oanda.com
 * 2. Generate API access token
 * 3. npm install @oanda/v20
 */

async function fetchOandaData(instrument, granularity = 'H1', count = 250) {
  const apiKey = process.env.OANDA_API_KEY;
  const accountId = process.env.OANDA_ACCOUNT_ID;
  
  // PRACTICE: https://api-fxpractice.oanda.com
  // PRODUCTION: https://api-fxtrade.oanda.com
  const baseUrl = 'https://api-fxpractice.oanda.com';
  
  const endpoint = `/v3/instruments/${instrument}/candles`;
  
  const params = new URLSearchParams({
    granularity: granularity,  // H1 = 1 hour
    count: count
  });
  
  try {
    const response = await fetch(`${baseUrl}${endpoint}?${params}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });
    
    const data = await response.json();
    
    // Transform OANDA format to our format
    return data.candles.map(candle => ({
      timestamp: new Date(candle.time).getTime(),
      open: parseFloat(candle.mid.o),
      high: parseFloat(candle.mid.h),
      low: parseFloat(candle.mid.l),
      close: parseFloat(candle.mid.c),
      volume: candle.volume
    }));
    
  } catch (error) {
    console.error('OANDA API error:', error.message);
    return null;
  }
}

// ============ INTEGRATION GUIDE ============

/**
 * HOW TO INTEGRATE INTO TRADING-ANALYSIS.JS
 * 
 * 1. Replace generateMockData() calls with real API fetches:
 * 
 * OLD:
 *   const mockData = generateMockData(250);
 * 
 * NEW:
 *   const data = await fetchBinanceData('BTC/USDT');
 *   if (!data) {
 *     console.log('Failed to fetch data, skipping...');
 *     continue;
 *   }
 * 
 * 2. Add error handling and rate limiting:
 * 
 *   const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
 *   
 *   for (const pair of config.markets.crypto.pairs) {
 *     const data = await fetchBinanceData(pair);
 *     await sleep(1000);  // Rate limit: 1 request per second
 *   }
 * 
 * 3. Store API keys in environment variables (NOT in config):
 * 
 *   # .env file
 *   BINANCE_API_KEY=your_key_here
 *   BINANCE_API_SECRET=your_secret_here
 *   ALPACA_API_KEY=your_key_here
 *   
 *   # Load in scripts
 *   require('dotenv').config();
 * 
 * 4. Test with testnet/paper accounts first:
 * 
 *   - Binance testnet: testnet.binance.vision
 *   - Alpaca paper: paper-api.alpaca.markets
 *   - OANDA practice: api-fxpractice.oanda.com
 * 
 * 5. Add retry logic for failed requests:
 * 
 *   async function fetchWithRetry(fetchFn, maxRetries = 3) {
 *     for (let i = 0; i < maxRetries; i++) {
 *       const data = await fetchFn();
 *       if (data) return data;
 *       await sleep(1000 * (i + 1));  // Exponential backoff
 *     }
 *     return null;
 *   }
 */

// ============ EXAMPLE USAGE ============

async function exampleUsage() {
  console.log('API Integration Examples\n');
  
  // Fetch Bitcoin data from Binance
  console.log('Fetching BTC/USDT from Binance...');
  const btcData = await fetchBinanceData('BTC/USDT', '1h', 100);
  if (btcData) {
    console.log(`✓ Received ${btcData.length} candles`);
    console.log(`  Latest close: $${btcData[btcData.length - 1].close}`);
  }
  
  // Fetch Apple stock from Alpaca
  console.log('\nFetching AAPL from Alpaca...');
  const aaplData = await fetchAlpacaData('AAPL', '1Hour', 100);
  if (aaplData) {
    console.log(`✓ Received ${aaplData.length} candles`);
    console.log(`  Latest close: $${aaplData[aaplData.length - 1].close}`);
  }
  
  // Fetch Bitcoin from CoinGecko
  console.log('\nFetching Bitcoin from CoinGecko...');
  const cgBtc = await fetchCoinGeckoData('bitcoin', 7);
  if (cgBtc) {
    console.log(`✓ Received ${cgBtc.length} data points`);
    console.log(`  Latest price: $${cgBtc[cgBtc.length - 1].close}`);
  }
}

// ============ SETUP CHECKLIST ============

/**
 * BEFORE CONNECTING REAL APIs:
 * 
 * Security:
 * [ ] Store API keys in environment variables (.env file)
 * [ ] Never commit API keys to git (.gitignore .env file)
 * [ ] Use read-only API keys when possible
 * [ ] Enable IP whitelisting on exchanges
 * [ ] Enable 2FA on all accounts
 * 
 * Testing:
 * [ ] Test with testnet/paper accounts first
 * [ ] Verify data format matches our structure
 * [ ] Test error handling (disconnects, rate limits)
 * [ ] Monitor API usage/rate limits
 * 
 * Safety:
 * [ ] Start with read-only access (no trading permissions)
 * [ ] Test thoroughly before enabling trade execution
 * [ ] Set up alerts for API errors
 * [ ] Keep liveTrading: false until approved
 * 
 * Performance:
 * [ ] Implement rate limiting
 * [ ] Add request caching where appropriate
 * [ ] Handle network timeouts gracefully
 * [ ] Log API calls for debugging
 */

// Run example if script is executed directly
if (require.main === module) {
  console.log('⚠️  This is a template file. Uncomment exampleUsage() to test.');
  console.log('⚠️  Make sure to set environment variables first!\n');
  
  // Uncomment to test:
  // exampleUsage();
}

module.exports = {
  fetchBinanceData,
  fetchAlpacaData,
  fetchPolygonData,
  fetchCoinGeckoData,
  fetchOandaData
};
