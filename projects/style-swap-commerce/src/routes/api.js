const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const affiliateLinkService = require('../services/affiliateLinkService');
const commissionService = require('../services/commissionService');
const cartService = require('../services/cartService');
const analyticsService = require('../services/analyticsService');
const webhookHandler = require('../../webhooks/handler');
const { parseDeviceType } = require('../utils/urlBuilder');

// ============================================
// AFFILIATE LINK ROUTES
// ============================================

/**
 * GET /api/link/:shortCode/redirect
 * Track click and redirect to brand site
 */
router.get('/link/:shortCode/redirect', async (req, res) => {
  try {
    const { shortCode } = req.params;
    const link = await affiliateLinkService.getByShortCode(shortCode);
    
    if (!link) {
      return res.status(404).json({ error: 'Link not found' });
    }
    
    // Track click
    const sessionId = req.cookies?.session_id || uuidv4();
    res.cookie('session_id', sessionId, { maxAge: 30 * 24 * 60 * 60 * 1000 }); // 30 days
    
    const clickData = {
      sessionId,
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
      referrer: req.get('referer'),
      utmSource: req.query.utm_source,
      utmMedium: req.query.utm_medium,
      utmCampaign: req.query.utm_campaign,
      utmContent: req.query.utm_content,
      deviceType: parseDeviceType(req.get('user-agent'))
    };
    
    await affiliateLinkService.trackClick(link.id, clickData);
    
    // Redirect to tracked URL
    res.redirect(link.tracked_url);
  } catch (error) {
    console.error('Redirect error:', error);
    res.status(500).json({ error: 'Failed to process redirect' });
  }
});

/**
 * GET /api/link/:shortCode
 * Get link details
 */
router.get('/link/:shortCode', async (req, res) => {
  try {
    const link = await affiliateLinkService.getByShortCode(req.params.shortCode);
    
    if (!link) {
      return res.status(404).json({ error: 'Link not found' });
    }
    
    res.json(link);
  } catch (error) {
    console.error('Get link error:', error);
    res.status(500).json({ error: 'Failed to get link' });
  }
});

/**
 * GET /api/link/:linkId/analytics
 * Get analytics for a specific link
 */
router.get('/link/:linkId/analytics', async (req, res) => {
  try {
    const analytics = await affiliateLinkService.getAnalytics(req.params.linkId);
    res.json(analytics);
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ error: 'Failed to get analytics' });
  }
});

// ============================================
// CART ROUTES
// ============================================

/**
 * GET /api/cart
 * Get current cart
 */
router.get('/cart', async (req, res) => {
  try {
    const sessionId = req.cookies?.session_id || uuidv4();
    res.cookie('session_id', sessionId, { maxAge: 30 * 24 * 60 * 60 * 1000 });
    
    const cart = await cartService.getCart(sessionId);
    res.json(cart || { items: [], total: 0, item_count: 0 });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ error: 'Failed to get cart' });
  }
});

/**
 * POST /api/cart/add
 * Add item to cart
 */
router.post('/cart/add', async (req, res) => {
  try {
    const { product_id, affiliate_link_id, quantity = 1 } = req.body;
    
    const sessionId = req.cookies?.session_id || uuidv4();
    res.cookie('session_id', sessionId, { maxAge: 30 * 24 * 60 * 60 * 1000 });
    
    const item = await cartService.addItem(
      sessionId,
      product_id,
      affiliate_link_id,
      quantity
    );
    
    res.json({ success: true, item });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
});

/**
 * PUT /api/cart/item/:itemId
 * Update cart item quantity
 */
router.put('/cart/item/:itemId', async (req, res) => {
  try {
    const { quantity } = req.body;
    const item = await cartService.updateQuantity(req.params.itemId, quantity);
    res.json({ success: true, item });
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({ error: 'Failed to update item' });
  }
});

/**
 * DELETE /api/cart/item/:itemId
 * Remove item from cart
 */
router.delete('/cart/item/:itemId', async (req, res) => {
  try {
    await cartService.removeItem(req.params.itemId);
    res.json({ success: true });
  } catch (error) {
    console.error('Remove item error:', error);
    res.status(500).json({ error: 'Failed to remove item' });
  }
});

/**
 * POST /api/cart/checkout
 * Checkout cart
 */
router.post('/cart/checkout', async (req, res) => {
  try {
    const sessionId = req.cookies?.session_id;
    
    if (!sessionId) {
      return res.status(400).json({ error: 'No active cart' });
    }
    
    const result = await cartService.checkout(sessionId);
    res.json(result);
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// ANALYTICS ROUTES
// ============================================

/**
 * GET /api/analytics/dashboard
 * Get dashboard overview
 */
router.get('/analytics/dashboard', async (req, res) => {
  try {
    const filters = {
      startDate: req.query.start_date,
      endDate: req.query.end_date,
      brandId: req.query.brand_id
    };
    
    const dashboard = await analyticsService.getDashboard(filters);
    res.json(dashboard);
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Failed to get dashboard data' });
  }
});

/**
 * GET /api/analytics/brands
 * Get brand performance
 */
router.get('/analytics/brands', async (req, res) => {
  try {
    const filters = {
      startDate: req.query.start_date,
      endDate: req.query.end_date
    };
    
    const brands = await analyticsService.getBrandPerformance(filters);
    res.json(brands);
  } catch (error) {
    console.error('Brand analytics error:', error);
    res.status(500).json({ error: 'Failed to get brand performance' });
  }
});

/**
 * GET /api/analytics/products
 * Get top products
 */
router.get('/analytics/products', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const filters = {
      brandId: req.query.brand_id,
      startDate: req.query.start_date,
      endDate: req.query.end_date
    };
    
    const products = await analyticsService.getTopProducts(limit, filters);
    res.json(products);
  } catch (error) {
    console.error('Product analytics error:', error);
    res.status(500).json({ error: 'Failed to get top products' });
  }
});

/**
 * GET /api/analytics/timeseries
 * Get time series data
 */
router.get('/analytics/timeseries', async (req, res) => {
  try {
    const filters = {
      startDate: req.query.start_date,
      endDate: req.query.end_date,
      brandId: req.query.brand_id,
      granularity: req.query.granularity || 'day'
    };
    
    const data = await analyticsService.getTimeSeries(filters);
    res.json(data);
  } catch (error) {
    console.error('Time series error:', error);
    res.status(500).json({ error: 'Failed to get time series' });
  }
});

/**
 * GET /api/analytics/commissions
 * Get commission report
 */
router.get('/analytics/commissions', async (req, res) => {
  try {
    const filters = {
      brandId: req.query.brand_id,
      startDate: req.query.start_date,
      endDate: req.query.end_date,
      status: req.query.status
    };
    
    const report = await commissionService.getCommissionReport(filters);
    res.json(report);
  } catch (error) {
    console.error('Commission report error:', error);
    res.status(500).json({ error: 'Failed to get commission report' });
  }
});

// ============================================
// WEBHOOK ROUTES
// ============================================

/**
 * POST /api/webhooks/:source
 * Handle incoming webhooks from affiliate networks
 */
router.post('/webhooks/:source', async (req, res) => {
  try {
    const { source } = req.params;
    const signature = req.get('X-Webhook-Signature');
    
    // Verify signature
    if (signature) {
      const isValid = webhookHandler.verifySignature(
        req.body,
        signature,
        process.env.AFFILIATE_WEBHOOK_SECRET
      );
      
      if (!isValid) {
        return res.status(401).json({ error: 'Invalid signature' });
      }
    }
    
    // Process webhook
    const eventType = req.body.event_type || 'conversion';
    await webhookHandler.processWebhook(source, eventType, req.body);
    
    res.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Failed to process webhook' });
  }
});

/**
 * POST /api/webhooks/stripe
 * Handle Stripe webhooks (for future direct sales)
 */
router.post('/webhooks/stripe', async (req, res) => {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  const sig = req.headers['stripe-signature'];
  
  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    
    // Handle different Stripe events
    switch (event.type) {
      case 'checkout.session.completed':
        // Handle successful checkout
        console.log('Checkout completed:', event.data.object);
        break;
      case 'payment_intent.succeeded':
        // Handle successful payment
        console.log('Payment succeeded:', event.data.object);
        break;
      default:
        console.log(`Unhandled Stripe event: ${event.type}`);
    }
    
    res.json({ received: true });
  } catch (error) {
    console.error('Stripe webhook error:', error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
