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
 * GET /api/categories
 * Get all categories with hierarchical structure
 */
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order');

    if (error) throw error;

    // Build hierarchical structure
    const categoryMap = {};
    const rootCategories = [];

    // First pass: create map
    data.forEach(cat => {
      categoryMap[cat.id] = { ...cat, children: [] };
    });

    // Second pass: build tree
    data.forEach(cat => {
      if (cat.parent_id && categoryMap[cat.parent_id]) {
        categoryMap[cat.parent_id].children.push(categoryMap[cat.id]);
      } else {
        rootCategories.push(categoryMap[cat.id]);
      }
    });

    res.json(rootCategories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

/**
 * GET /api/categories/:id
 * Get a single category with products
 */
router.get('/:id', [
  param('id').isUUID(),
  validate
], async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select(`
        *,
        products:product_categories(
          product:products(*)
        )
      `)
      .eq('id', req.params.id)
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Category not found' });

    res.json(data);
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ error: 'Failed to fetch category' });
  }
});

/**
 * POST /api/categories
 * Create a new category (Admin only)
 */
router.post('/', [
  body('name').isString().notEmpty(),
  body('slug').isString().notEmpty(),
  body('parent_id').optional().isUUID(),
  validate
], async (req, res) => {
  try {
    if (!supabaseAdmin) {
      return res.status(403).json({ error: 'Admin access not configured' });
    }

    const { data, error } = await supabaseAdmin
      .from('categories')
      .insert([req.body])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'Failed to create category' });
  }
});

/**
 * PUT /api/categories/:id
 * Update a category (Admin only)
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
      .from('categories')
      .update(req.body)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'Failed to update category' });
  }
});

module.exports = router;
