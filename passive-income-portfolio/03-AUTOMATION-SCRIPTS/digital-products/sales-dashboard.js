/**
 * Sales Dashboard - Aggregate sales from all platforms
 * Tracks: Gumroad, Etsy, Creative Market, and direct sales
 */

const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

/**
 * Fetch Gumroad sales
 */
async function fetchGumroadSales(startDate, endDate) {
  const url = 'https://api.gumroad.com/v2/sales';
  const response = await axios.get(url, {
    params: {
      access_token: process.env.GUMROAD_ACCESS_TOKEN,
      after: startDate,
      before: endDate,
    },
  });

  const sales = response.data.sales.map(sale => ({
    platform: 'gumroad',
    product_name: sale.product_name,
    product_id: sale.product_id,
    amount: parseFloat(sale.price) / 100,
    currency: sale.currency,
    buyer_email: sale.email,
    sale_date: sale.created_at,
    fees: parseFloat(sale.gumroad_fee) / 100,
    net: (parseFloat(sale.price) - parseFloat(sale.gumroad_fee)) / 100,
  }));

  return sales;
}

/**
 * Fetch Etsy sales (requires OAuth setup)
 */
async function fetchEtsySales(startDate, endDate) {
  // Note: Etsy API requires OAuth 2.0 authentication
  // This is a simplified example - implement full OAuth flow
  
  const url = `https://openapi.etsy.com/v3/application/shops/${process.env.ETSY_SHOP_ID}/receipts`;
  
  try {
    const response = await axios.get(url, {
      headers: {
        'x-api-key': process.env.ETSY_API_KEY,
        Authorization: `Bearer ${process.env.ETSY_ACCESS_TOKEN}`,
      },
      params: {
        min_created: Math.floor(new Date(startDate).getTime() / 1000),
        max_created: Math.floor(new Date(endDate).getTime() / 1000),
      },
    });

    const sales = response.data.results.map(receipt => ({
      platform: 'etsy',
      product_name: receipt.title,
      product_id: receipt.receipt_id,
      amount: parseFloat(receipt.grandtotal.amount / receipt.grandtotal.divisor),
      currency: receipt.grandtotal.currency_code,
      buyer_email: receipt.buyer_email,
      sale_date: new Date(receipt.create_timestamp * 1000).toISOString(),
      fees: parseFloat(receipt.total_shipping_cost.amount / receipt.total_shipping_cost.divisor),
      net: parseFloat((receipt.grandtotal.amount - receipt.total_shipping_cost.amount) / receipt.grandtotal.divisor),
    }));

    return sales;
  } catch (error) {
    console.error('Etsy API error:', error.message);
    return [];
  }
}

/**
 * Store sales in Supabase
 */
async function storeSales(sales) {
  const { data, error } = await supabase
    .from('sales')
    .upsert(sales, { onConflict: 'platform,product_id,sale_date' });

  if (error) {
    console.error('Error storing sales:', error);
    throw error;
  }

  console.log(`✅ Stored ${sales.length} sales`);
  return data;
}

/**
 * Generate sales report
 */
async function generateReport(startDate, endDate) {
  const { data: sales, error } = await supabase
    .from('sales')
    .select('*')
    .gte('sale_date', startDate)
    .lte('sale_date', endDate);

  if (error) {
    throw error;
  }

  // Aggregate by platform
  const platformStats = {};
  sales.forEach(sale => {
    if (!platformStats[sale.platform]) {
      platformStats[sale.platform] = {
        count: 0,
        revenue: 0,
        fees: 0,
        net: 0,
      };
    }
    platformStats[sale.platform].count++;
    platformStats[sale.platform].revenue += sale.amount;
    platformStats[sale.platform].fees += sale.fees;
    platformStats[sale.platform].net += sale.net;
  });

  // Aggregate by product
  const productStats = {};
  sales.forEach(sale => {
    if (!productStats[sale.product_name]) {
      productStats[sale.product_name] = {
        count: 0,
        revenue: 0,
      };
    }
    productStats[sale.product_name].count++;
    productStats[sale.product_name].revenue += sale.amount;
  });

  const totalRevenue = sales.reduce((sum, sale) => sum + sale.amount, 0);
  const totalFees = sales.reduce((sum, sale) => sum + sale.fees, 0);
  const totalNet = sales.reduce((sum, sale) => sum + sale.net, 0);

  return {
    period: { startDate, endDate },
    totalSales: sales.length,
    totalRevenue,
    totalFees,
    totalNet,
    platformStats,
    productStats,
    topProducts: Object.entries(productStats)
      .sort((a, b) => b[1].revenue - a[1].revenue)
      .slice(0, 5)
      .map(([name, stats]) => ({ name, ...stats })),
  };
}

/**
 * Send daily sales summary to Discord
 */
async function sendDailySummary() {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const startDate = yesterday.toISOString().split('T')[0];
  const endDate = today.toISOString().split('T')[0];

  // Fetch from all platforms
  const gumroadSales = await fetchGumroadSales(startDate, endDate);
  const etsySales = await fetchEtsySales(startDate, endDate);
  
  const allSales = [...gumroadSales, ...etsySales];

  // Store in database
  if (allSales.length > 0) {
    await storeSales(allSales);
  }

  // Generate report
  const report = await generateReport(startDate, endDate);

  // Send to Discord
  if (process.env.DISCORD_WEBHOOK_URL) {
    const webhook = require('discord-webhook-node');
    const Hook = new webhook.Webhook(process.env.DISCORD_WEBHOOK_URL);

    const platformBreakdown = Object.entries(report.platformStats)
      .map(([platform, stats]) => `**${platform}:** ${stats.count} sales, $${stats.net.toFixed(2)} net`)
      .join('\n');

    Hook.send({
      username: 'Sales Bot',
      embeds: [{
        title: '📊 Daily Sales Summary',
        description: `Period: ${startDate} to ${endDate}`,
        fields: [
          { name: 'Total Sales', value: report.totalSales.toString(), inline: true },
          { name: 'Revenue', value: `$${report.totalRevenue.toFixed(2)}`, inline: true },
          { name: 'Net', value: `$${report.totalNet.toFixed(2)}`, inline: true },
          { name: 'Platform Breakdown', value: platformBreakdown || 'No sales' },
          {
            name: 'Top Products',
            value: report.topProducts.map(p => `${p.name}: ${p.count} sales ($${p.revenue.toFixed(2)})`).join('\n') || 'N/A',
          },
        ],
        color: report.totalSales > 0 ? 0x00ff00 : 0xff9900,
        timestamp: new Date(),
      }],
    });
  }

  console.log('✅ Daily summary sent');
  return report;
}

/**
 * Cron job: Run daily at 9 AM
 * Add to crontab: 0 9 * * * node sales-dashboard.js
 */
if (require.main === module) {
  sendDailySummary()
    .then(() => process.exit(0))
    .catch(err => {
      console.error('Error:', err);
      process.exit(1);
    });
}

module.exports = {
  fetchGumroadSales,
  fetchEtsySales,
  generateReport,
  sendDailySummary,
};
