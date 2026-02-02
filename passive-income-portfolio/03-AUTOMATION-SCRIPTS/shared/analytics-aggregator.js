/**
 * Analytics Aggregator
 * Combines revenue data from all income streams into one dashboard
 * Tracks: Micro-SaaS MRR, Affiliate commissions, Digital product sales
 */

const { createClient } = require('@supabase/supabase-js');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const axios = require('axios');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

/**
 * Get Micro-SaaS metrics (MRR, subscribers, churn)
 */
async function getMicroSaasMetrics(startDate, endDate) {
  // Get active subscriptions from Stripe
  const subscriptions = await stripe.subscriptions.list({
    status: 'active',
    limit: 100,
  });

  const mrr = subscriptions.data.reduce((sum, sub) => {
    const amount = sub.items.data[0].price.unit_amount / 100;
    const interval = sub.items.data[0].price.recurring.interval;
    
    // Convert to monthly
    const monthlyAmount = interval === 'year' ? amount / 12 : amount;
    return sum + monthlyAmount;
  }, 0);

  // Get subscriber growth
  const { data: licenses } = await supabase
    .from('licenses')
    .select('created_at, status')
    .gte('created_at', startDate)
    .lte('created_at', endDate);

  const newSubscribers = licenses.filter(l => l.status === 'active').length;
  const cancelledSubscribers = licenses.filter(l => l.status === 'revoked').length;

  return {
    stream: 'micro-saas',
    mrr: Math.round(mrr),
    activeSubscribers: subscriptions.data.length,
    newSubscribers,
    cancelledSubscribers,
    churnRate: subscriptions.data.length > 0 
      ? ((cancelledSubscribers / subscriptions.data.length) * 100).toFixed(2)
      : 0,
  };
}

/**
 * Get Affiliate Marketing metrics
 */
async function getAffiliateMetrics(startDate, endDate) {
  // This would integrate with your affiliate networks
  // Example: Impact, CJ, ShareASale APIs
  
  // For demo purposes, fetching from database where you log commissions
  const { data: commissions, error } = await supabase
    .from('affiliate_commissions')
    .select('*')
    .gte('commission_date', startDate)
    .lte('commission_date', endDate);

  if (error) {
    console.error('Error fetching affiliate data:', error);
    return null;
  }

  const totalCommissions = commissions.reduce((sum, c) => sum + c.amount, 0);
  const byProgram = {};

  commissions.forEach(c => {
    if (!byProgram[c.program_name]) {
      byProgram[c.program_name] = { count: 0, revenue: 0 };
    }
    byProgram[c.program_name].count++;
    byProgram[c.program_name].revenue += c.amount;
  });

  return {
    stream: 'affiliate',
    totalCommissions: Math.round(totalCommissions),
    salesCount: commissions.length,
    averageCommission: commissions.length > 0 
      ? Math.round(totalCommissions / commissions.length)
      : 0,
    byProgram,
  };
}

/**
 * Get Digital Products metrics
 */
async function getDigitalProductsMetrics(startDate, endDate) {
  const { data: sales, error } = await supabase
    .from('sales')
    .select('*')
    .gte('sale_date', startDate)
    .lte('sale_date', endDate);

  if (error) {
    console.error('Error fetching digital products data:', error);
    return null;
  }

  const totalRevenue = sales.reduce((sum, s) => sum + s.amount, 0);
  const totalNet = sales.reduce((sum, s) => sum + s.net, 0);
  
  const byPlatform = {};
  sales.forEach(s => {
    if (!byPlatform[s.platform]) {
      byPlatform[s.platform] = { count: 0, revenue: 0, net: 0 };
    }
    byPlatform[s.platform].count++;
    byPlatform[s.platform].revenue += s.amount;
    byPlatform[s.platform].net += s.net;
  });

  const topProducts = {};
  sales.forEach(s => {
    if (!topProducts[s.product_name]) {
      topProducts[s.product_name] = { count: 0, revenue: 0 };
    }
    topProducts[s.product_name].count++;
    topProducts[s.product_name].revenue += s.amount;
  });

  return {
    stream: 'digital-products',
    totalRevenue: Math.round(totalRevenue),
    totalNet: Math.round(totalNet),
    salesCount: sales.length,
    averageSalePrice: sales.length > 0 
      ? Math.round(totalRevenue / sales.length)
      : 0,
    byPlatform,
    topProducts: Object.entries(topProducts)
      .sort((a, b) => b[1].revenue - a[1].revenue)
      .slice(0, 5)
      .map(([name, stats]) => ({ name, ...stats })),
  };
}

/**
 * Generate comprehensive portfolio report
 */
async function generatePortfolioReport(period = 'month') {
  const now = new Date();
  let startDate, endDate;

  if (period === 'month') {
    startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  } else if (period === 'week') {
    const dayOfWeek = now.getDay();
    startDate = new Date(now);
    startDate.setDate(now.getDate() - dayOfWeek);
    endDate = now;
  } else { // today
    startDate = new Date(now.setHours(0, 0, 0, 0));
    endDate = new Date(now.setHours(23, 59, 59, 999));
  }

  const [microSaas, affiliate, digitalProducts] = await Promise.all([
    getMicroSaasMetrics(startDate.toISOString(), endDate.toISOString()),
    getAffiliateMetrics(startDate.toISOString(), endDate.toISOString()),
    getDigitalProductsMetrics(startDate.toISOString(), endDate.toISOString()),
  ]);

  const totalRevenue = 
    (microSaas?.mrr || 0) +
    (affiliate?.totalCommissions || 0) +
    (digitalProducts?.totalRevenue || 0);

  const report = {
    period: {
      start: startDate.toISOString().split('T')[0],
      end: endDate.toISOString().split('T')[0],
      label: period,
    },
    summary: {
      totalRevenue: Math.round(totalRevenue),
      streams: {
        microSaas: microSaas?.mrr || 0,
        affiliate: affiliate?.totalCommissions || 0,
        digitalProducts: digitalProducts?.totalNet || 0,
      },
      diversificationScore: calculateDiversification([
        microSaas?.mrr || 0,
        affiliate?.totalCommissions || 0,
        digitalProducts?.totalNet || 0,
      ]),
    },
    details: {
      microSaas,
      affiliate,
      digitalProducts,
    },
    generatedAt: new Date().toISOString(),
  };

  // Store report in database
  await supabase.from('portfolio_reports').insert({
    report_date: endDate.toISOString().split('T')[0],
    period,
    total_revenue: totalRevenue,
    report_data: report,
  });

  return report;
}

/**
 * Calculate diversification score (0-100)
 * Higher = more evenly distributed across streams
 */
function calculateDiversification(values) {
  const total = values.reduce((sum, v) => sum + v, 0);
  if (total === 0) return 0;

  const proportions = values.map(v => v / total);
  
  // Calculate entropy (Shannon diversity index)
  const entropy = proportions.reduce((sum, p) => {
    return p > 0 ? sum - (p * Math.log(p)) : sum;
  }, 0);

  // Normalize to 0-100 (max entropy for 3 streams is log(3))
  const maxEntropy = Math.log(values.length);
  return Math.round((entropy / maxEntropy) * 100);
}

/**
 * Send weekly dashboard to email/Discord
 */
async function sendWeeklyDashboard() {
  const report = await generatePortfolioReport('week');

  const message = `
📊 **Weekly Passive Income Dashboard**
Period: ${report.period.start} to ${report.period.end}

💰 **Total Revenue:** $${report.summary.totalRevenue}

**Breakdown:**
• Micro-SaaS MRR: $${report.summary.streams.microSaas}
• Affiliate Commissions: $${report.summary.streams.affiliate}
• Digital Products: $${report.summary.streams.digitalProducts}

📈 **Diversification Score:** ${report.summary.diversificationScore}/100

**Micro-SaaS:**
• Active Subscribers: ${report.details.microSaas?.activeSubscribers || 0}
• New: +${report.details.microSaas?.newSubscribers || 0}
• Churned: -${report.details.microSaas?.cancelledSubscribers || 0}

**Affiliate:**
• Sales: ${report.details.affiliate?.salesCount || 0}
• Avg Commission: $${report.details.affiliate?.averageCommission || 0}

**Digital Products:**
• Sales: ${report.details.digitalProducts?.salesCount || 0}
• Avg Price: $${report.details.digitalProducts?.averageSalePrice || 0}
`;

  // Send to Discord
  if (process.env.DISCORD_WEBHOOK_URL) {
    const webhook = require('discord-webhook-node');
    const Hook = new webhook.Webhook(process.env.DISCORD_WEBHOOK_URL);

    Hook.send({
      username: 'Portfolio Dashboard',
      content: message,
    });
  }

  console.log('✅ Weekly dashboard sent');
  return report;
}

/**
 * Cron job: Run every Monday at 9 AM
 * Add to crontab: 0 9 * * 1 node analytics-aggregator.js
 */
if (require.main === module) {
  sendWeeklyDashboard()
    .then(() => process.exit(0))
    .catch(err => {
      console.error('Error:', err);
      process.exit(1);
    });
}

module.exports = {
  getMicroSaasMetrics,
  getAffiliateMetrics,
  getDigitalProductsMetrics,
  generatePortfolioReport,
  sendWeeklyDashboard,
};
