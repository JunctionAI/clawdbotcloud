const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const { supabase, supabaseAdmin } = require('../config/supabase');
const { v4: uuidv4 } = require('uuid');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

/**
 * POST /api/affiliates/track-click
 * Track a click on an affiliate link
 */
router.post('/track-click', [
  body('affiliate_link_id').isUUID(),
  body('session_id').optional().isString(),
  validate
], async (req, res) => {
  try {
    const { affiliate_link_id, session_id } = req.body;
    
    // Get user agent and IP from request
    const user_agent = req.headers['user-agent'];
    const ip_address = req.ip || req.connection.remoteAddress;
    const referrer_url = req.headers['referer'] || req.headers['referrer'];

    // Get product_id from affiliate link
    const { data: linkData, error: linkError } = await supabase
      .from('affiliate_links')
      .select('id, product_id, affiliate_url')
      .eq('id', affiliate_link_id)
      .single();

    if (linkError || !linkData) {
      return res.status(404).json({ error: 'Affiliate link not found' });
    }

    // Insert click tracking record
    const { data: clickData, error: clickError } = await supabase
      .from('click_tracking')
      .insert([{
        affiliate_link_id,
        product_id: linkData.product_id,
        session_id: session_id || uuidv4(),
        user_agent,
        ip_address,
        referrer_url
      }])
      .select()
      .single();

    if (clickError) throw clickError;

    // Increment click count on affiliate link
    await supabase.rpc('increment_clicks', { link_id: affiliate_link_id });

    // Return the affiliate URL to redirect to
    res.json({
      click_id: clickData.id,
      redirect_url: linkData.affiliate_url
    });
  } catch (error) {
    console.error('Error tracking click:', error);
    res.status(500).json({ error: 'Failed to track click' });
  }
});

/**
 * POST /api/affiliates/track-conversion
 * Track a conversion (purchase) - typically called by webhook
 */
router.post('/track-conversion', [
  body('affiliate_link_id').isUUID(),
  body('order_id').isString(),
  body('order_value').isFloat({ min: 0 }),
  body('commission_earned').isFloat({ min: 0 }),
  validate
], async (req, res) => {
  try {
    if (!supabaseAdmin) {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const { affiliate_link_id, order_id, order_value, commission_earned, commission_rate } = req.body;

    // Get product_id
    const { data: linkData } = await supabase
      .from('affiliate_links')
      .select('product_id')
      .eq('id', affiliate_link_id)
      .single();

    if (!linkData) {
      return res.status(404).json({ error: 'Affiliate link not found' });
    }

    // Insert conversion record
    const { data, error } = await supabaseAdmin
      .from('conversion_tracking')
      .insert([{
        affiliate_link_id,
        product_id: linkData.product_id,
        order_id,
        order_value,
        commission_rate,
        commission_earned,
        status: 'pending'
      }])
      .select()
      .single();

    if (error) throw error;

    // Update affiliate link stats
    await supabaseAdmin.rpc('increment_conversions', { 
      link_id: affiliate_link_id,
      revenue_amount: order_value,
      commission_amount: commission_earned
    });

    res.status(201).json(data);
  } catch (error) {
    console.error('Error tracking conversion:', error);
    res.status(500).json({ error: 'Failed to track conversion' });
  }
});

/**
 * GET /api/affiliates/product/:product_id
 * Get all affiliate links for a product
 */
router.get('/product/:product_id', [
  param('product_id').isUUID(),
  validate
], async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('affiliate_links')
      .select('*')
      .eq('product_id', req.params.product_id)
      .eq('is_active', true)
      .order('is_primary', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Error fetching affiliate links:', error);
    res.status(500).json({ error: 'Failed to fetch affiliate links' });
  }
});

/**
 * POST /api/affiliates
 * Create a new affiliate link (Admin only)
 */
router.post('/', [
  body('product_id').isUUID(),
  body('retailer_name').isString(),
  body('affiliate_url').isURL(),
  validate
], async (req, res) => {
  try {
    if (!supabaseAdmin) {
      return res.status(403).json({ error: 'Admin access not configured' });
    }

    const { data, error } = await supabaseAdmin
      .from('affiliate_links')
      .insert([req.body])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    console.error('Error creating affiliate link:', error);
    res.status(500).json({ error: 'Failed to create affiliate link' });
  }
});

module.exports = router;
