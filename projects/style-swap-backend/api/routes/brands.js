const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const { supabase, supabaseAdmin } = require('../config/supabase');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

/**
 * GET /api/brands
 * Get all active brands
 */
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .eq('is_active', true)
      .order('name');

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Error fetching brands:', error);
    res.status(500).json({ error: 'Failed to fetch brands' });
  }
});

/**
 * GET /api/brands/:id
 * Get a single brand
 */
router.get('/:id', [
  param('id').isUUID(),
  validate
], async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('brands')
      .select(`
        *,
        products(count)
      `)
      .eq('id', req.params.id)
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Brand not found' });

    res.json(data);
  } catch (error) {
    console.error('Error fetching brand:', error);
    res.status(500).json({ error: 'Failed to fetch brand' });
  }
});

/**
 * POST /api/brands
 * Create a new brand (Admin only)
 */
router.post('/', [
  body('name').isString().notEmpty(),
  body('slug').isString().notEmpty(),
  body('description').optional().isString(),
  body('website_url').optional().isURL(),
  body('partnership_status').optional().isIn(['none', 'pending', 'active', 'inactive']),
  validate
], async (req, res) => {
  try {
    if (!supabaseAdmin) {
      return res.status(403).json({ error: 'Admin access not configured' });
    }

    const { data, error } = await supabaseAdmin
      .from('brands')
      .insert([req.body])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    console.error('Error creating brand:', error);
    res.status(500).json({ error: 'Failed to create brand' });
  }
});

/**
 * PUT /api/brands/:id
 * Update a brand (Admin only)
 */
router.put('/:id', [
  param('id').isUUID(),
  validate
], async (req, res) => {
  try {
    if (!supabaseAdmin) {
      return res.status(403).json({ error: 'Admin access not configured' });
    }

    const { data, error } = await supabaseAdmin
      .from('brands')
      .update(req.body)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Brand not found' });

    res.json(data);
  } catch (error) {
    console.error('Error updating brand:', error);
    res.status(500).json({ error: 'Failed to update brand' });
  }
});

/**
 * DELETE /api/brands/:id
 * Soft delete a brand (Admin only)
 */
router.delete('/:id', [
  param('id').isUUID(),
  validate
], async (req, res) => {
  try {
    if (!supabaseAdmin) {
      return res.status(403).json({ error: 'Admin access not configured' });
    }

    const { data, error } = await supabaseAdmin
      .from('brands')
      .update({ is_active: false })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    res.json({ message: 'Brand deleted successfully' });
  } catch (error) {
    console.error('Error deleting brand:', error);
    res.status(500).json({ error: 'Failed to delete brand' });
  }
});

module.exports = router;
