const express = require('express');
const router = express.Router();
const { body, param, query, validationResult } = require('express-validator');
const { supabase, supabaseAdmin } = require('../config/supabase');

// Validation middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

/**
 * GET /api/products
 * Get all products with filtering, pagination, and search
 */
router.get('/', [
  query('page').optional().isInt({ min: 1 }).toInt(),
  query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
  query('brand_id').optional().isUUID(),
  query('category_id').optional().isUUID(),
  query('gender').optional().isIn(['mens', 'womens', 'unisex', 'kids']),
  query('search').optional().isString(),
  query('featured').optional().isBoolean(),
  validate
], async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 20;
    const offset = (page - 1) * limit;

    let query = supabase
      .from('products')
      .select(`
        *,
        brand:brands(*),
        categories:product_categories(
          category:categories(*)
        ),
        affiliate_links(*)
      `, { count: 'exact' })
      .eq('is_active', true)
      .not('published_at', 'is', null)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // Apply filters
    if (req.query.brand_id) {
      query = query.eq('brand_id', req.query.brand_id);
    }
    if (req.query.gender) {
      query = query.eq('gender', req.query.gender);
    }
    if (req.query.featured) {
      query = query.eq('is_featured', true);
    }
    if (req.query.search) {
      query = query.or(`name.ilike.%${req.query.search}%,description.ilike.%${req.query.search}%`);
    }
    if (req.query.category_id) {
      // Note: This requires a more complex query with joins
      // For now, filtering by category should be done client-side or with a custom function
    }

    const { data, error, count } = await query;

    if (error) throw error;

    res.json({
      products: data,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

/**
 * GET /api/products/:id
 * Get a single product by ID
 */
router.get('/:id', [
  param('id').isUUID(),
  validate
], async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        brand:brands(*),
        categories:product_categories(
          category:categories(*)
        ),
        tags:product_tags(
          tag:tags(*)
        ),
        affiliate_links(*)
      `)
      .eq('id', req.params.id)
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Product not found' });

    res.json(data);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

/**
 * GET /api/products/slug/:slug
 * Get a product by slug
 */
router.get('/slug/:slug', [
  param('slug').isString(),
  validate
], async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        brand:brands(*),
        categories:product_categories(
          category:categories(*)
        ),
        tags:product_tags(
          tag:tags(*)
        ),
        affiliate_links(*)
      `)
      .eq('slug', req.params.slug)
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Product not found' });

    res.json(data);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

/**
 * POST /api/products
 * Create a new product (Admin only)
 */
router.post('/', [
  body('brand_id').isUUID(),
  body('name').isString().notEmpty(),
  body('slug').isString().notEmpty(),
  body('description').optional().isString(),
  body('price').isFloat({ min: 0 }),
  body('primary_image_url').isURL(),
  body('gender').optional().isIn(['mens', 'womens', 'unisex', 'kids']),
  validate
], async (req, res) => {
  try {
    if (!supabaseAdmin) {
      return res.status(403).json({ error: 'Admin access not configured' });
    }

    const { data, error } = await supabaseAdmin
      .from('products')
      .insert([req.body])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

/**
 * PUT /api/products/:id
 * Update a product (Admin only)
 */
router.put('/:id', [
  param('id').isUUID(),
  body('name').optional().isString(),
  body('description').optional().isString(),
  body('price').optional().isFloat({ min: 0 }),
  validate
], async (req, res) => {
  try {
    if (!supabaseAdmin) {
      return res.status(403).json({ error: 'Admin access not configured' });
    }

    const { data, error } = await supabaseAdmin
      .from('products')
      .update(req.body)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Product not found' });

    res.json(data);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

/**
 * DELETE /api/products/:id
 * Delete a product (Admin only - soft delete)
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
      .from('products')
      .update({ is_active: false })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Product not found' });

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

module.exports = router;
