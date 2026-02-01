const express = require('express');
const router = express.Router();
const { query, validationResult } = require('express-validator');
const { supabase } = require('../config/supabase');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

/**
 * GET /api/analytics/overview
 * Get overall analytics overview
 */
router.get('/overview', [
  query('start_date').optional().isISO8601(),
  query('end_date').optional().isISO8601(),
  validate
], async (req, res) => {
  try {
    const { start_date, end_date } = req.query;

    // Total clicks
    let clickQuery = supabase
      .from('click_tracking')
      .select('*', { count: 'exact', head: true });

    if (start_date) clickQuery = clickQuery.gte('click_timestamp', start_date);
    if (end_date) clickQuery = clickQuery.lte('click_timestamp', end_date);

    const { count: totalClicks } = await clickQuery;

    // Total conversions
    let conversionQuery = supabase
      .from('conversion_tracking')
      .select('order_value, commission_earned', { count: 'exact' });

    if (start_date) conversionQuery = conversionQuery.gte('conversion_timestamp', start_date);
    if (end_date) conversionQuery = conversionQuery.lte('conversion_timestamp', end_date);

    const { data: conversions, count: totalConversions } = await conversionQuery;

    const totalRevenue = conversions?.reduce((sum, c) => sum + parseFloat(c.order_value || 0), 0) || 0;
    const totalCommission = conversions?.reduce((sum, c) => sum + parseFloat(c.commission_earned || 0), 0) || 0;

    // Conversion rate
    const conversionRate = totalClicks > 0 ? (totalConversions / totalClicks * 100).toFixed(2) : 0;

    res.json({
      totalClicks,
      totalConversions,
      conversionRate: parseFloat(conversionRate),
      totalRevenue: parseFloat(totalRevenue.toFixed(2)),
      totalCommission: parseFloat(totalCommission.toFixed(2)),
      period: {
        start_date: start_date || null,
        end_date: end_date || null
      }
    });
  } catch (error) {
    console.error('Error fetching analytics overview:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

/**
 * GET /api/analytics/top-products
 * Get top performing products
 */
router.get('/top-products', [
  query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
  query('metric').optional().isIn(['clicks', 'conversions', 'revenue']),
  validate
], async (req, res) => {
  try {
    const limit = req.query.limit || 10;
    const metric = req.query.metric || 'clicks';

    let query = supabase
      .from('products')
      .select(`
        id,
        name,
        slug,
        primary_image_url,
        brand:brands(name),
        affiliate_links(clicks, conversions, revenue, commission_earned)
      `)
      .limit(limit);

    const { data, error } = await query;

    if (error) throw error;

    // Aggregate stats for each product
    const productsWithStats = data.map(product => {
      const stats = product.affiliate_links.reduce((acc, link) => ({
        clicks: acc.clicks + (link.clicks || 0),
        conversions: acc.conversions + (link.conversions || 0),
        revenue: acc.revenue + parseFloat(link.revenue || 0),
        commission: acc.commission + parseFloat(link.commission_earned || 0)
      }), { clicks: 0, conversions: 0, revenue: 0, commission: 0 });

      return {
        ...product,
        stats,
        affiliate_links: undefined // Remove the raw data
      };
    });

    // Sort by selected metric
    productsWithStats.sort((a, b) => {
      if (metric === 'revenue') return b.stats.revenue - a.stats.revenue;
      if (metric === 'conversions') return b.stats.conversions - a.stats.conversions;
      return b.stats.clicks - a.stats.clicks;
    });

    res.json(productsWithStats.slice(0, limit));
  } catch (error) {
    console.error('Error fetching top products:', error);
    res.status(500).json({ error: 'Failed to fetch top products' });
  }
});

/**
 * GET /api/analytics/product/:product_id
 * Get detailed analytics for a specific product
 */
router.get('/product/:product_id', async (req, res) => {
  try {
    const { product_id } = req.params;

    // Get click data
    const { data: clicks } = await supabase
      .from('click_tracking')
      .select('*')
      .eq('product_id', product_id);

    // Get conversion data
    const { data: conversions } = await supabase
      .from('conversion_tracking')
      .select('*')
      .eq('product_id', product_id);

    const totalClicks = clicks?.length || 0;
    const totalConversions = conversions?.length || 0;
    const totalRevenue = conversions?.reduce((sum, c) => sum + parseFloat(c.order_value || 0), 0) || 0;
    const totalCommission = conversions?.reduce((sum, c) => sum + parseFloat(c.commission_earned || 0), 0) || 0;

    res.json({
      product_id,
      totalClicks,
      totalConversions,
      conversionRate: totalClicks > 0 ? (totalConversions / totalClicks * 100).toFixed(2) : 0,
      totalRevenue: parseFloat(totalRevenue.toFixed(2)),
      totalCommission: parseFloat(totalCommission.toFixed(2)),
      recentClicks: clicks?.slice(0, 10) || [],
      recentConversions: conversions?.slice(0, 10) || []
    });
  } catch (error) {
    console.error('Error fetching product analytics:', error);
    res.status(500).json({ error: 'Failed to fetch product analytics' });
  }
});

/**
 * GET /api/analytics/brand/:brand_id
 * Get analytics for a specific brand
 */
router.get('/brand/:brand_id', async (req, res) => {
  try {
    const { brand_id } = req.params;

    // Get all products for this brand
    const { data: products } = await supabase
      .from('products')
      .select('id')
      .eq('brand_id', brand_id);

    if (!products || products.length === 0) {
      return res.json({
        brand_id,
        totalClicks: 0,
        totalConversions: 0,
        conversionRate: 0,
        totalRevenue: 0,
        totalCommission: 0
      });
    }

    const productIds = products.map(p => p.id);

    // Get aggregated stats
    const { data: clicks } = await supabase
      .from('click_tracking')
      .select('*', { count: 'exact' })
      .in('product_id', productIds);

    const { data: conversions } = await supabase
      .from('conversion_tracking')
      .select('order_value, commission_earned')
      .in('product_id', productIds);

    const totalClicks = clicks?.length || 0;
    const totalConversions = conversions?.length || 0;
    const totalRevenue = conversions?.reduce((sum, c) => sum + parseFloat(c.order_value || 0), 0) || 0;
    const totalCommission = conversions?.reduce((sum, c) => sum + parseFloat(c.commission_earned || 0), 0) || 0;

    res.json({
      brand_id,
      totalProducts: products.length,
      totalClicks,
      totalConversions,
      conversionRate: totalClicks > 0 ? (totalConversions / totalClicks * 100).toFixed(2) : 0,
      totalRevenue: parseFloat(totalRevenue.toFixed(2)),
      totalCommission: parseFloat(totalCommission.toFixed(2))
    });
  } catch (error) {
    console.error('Error fetching brand analytics:', error);
    res.status(500).json({ error: 'Failed to fetch brand analytics' });
  }
});

module.exports = router;
