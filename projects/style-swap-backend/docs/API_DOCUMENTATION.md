# API Documentation

Complete API reference for the Style Swap backend.

## Base URL

```
Development: http://localhost:3000
Production: https://api.yoursite.com
```

## Authentication

Currently uses Supabase Row Level Security (RLS) policies. For admin operations, configure `SUPABASE_SERVICE_ROLE_KEY`.

Future: Implement Supabase Auth with JWT tokens.

## Response Format

All responses follow this structure:

**Success:**
```json
{
  "data": { ... },
  "pagination": { ... } // if applicable
}
```

**Error:**
```json
{
  "error": "Error message"
}
```

---

## Products

### List Products

```http
GET /api/products
```

**Query Parameters:**
- `page` (integer, min: 1) - Page number
- `limit` (integer, min: 1, max: 100) - Items per page
- `brand_id` (UUID) - Filter by brand
- `category_id` (UUID) - Filter by category
- `gender` (enum) - Filter by gender: mens, womens, unisex, kids
- `search` (string) - Search in name and description
- `featured` (boolean) - Filter featured products

**Example Request:**
```bash
curl "http://localhost:3000/api/products?page=1&limit=20&gender=womens&featured=true"
```

**Example Response:**
```json
{
  "products": [
    {
      "id": "uuid",
      "name": "Linen Midi Dress",
      "slug": "zara-linen-midi-dress",
      "description": "Flowing midi dress...",
      "price": 59.99,
      "sale_price": null,
      "primary_image_url": "https://...",
      "brand": {
        "id": "uuid",
        "name": "Zara"
      },
      "categories": [...],
      "affiliate_links": [...]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

### Get Product by ID

```http
GET /api/products/:id
```

**Example Response:**
```json
{
  "id": "uuid",
  "name": "Air Max 270 React",
  "slug": "nike-air-max-270-react",
  "description": "The Nike Air Max...",
  "price": 150.00,
  "brand": { ... },
  "categories": [ ... ],
  "tags": [ ... ],
  "affiliate_links": [ ... ]
}
```

### Get Product by Slug

```http
GET /api/products/slug/:slug
```

Same response as Get Product by ID.

### Create Product (Admin)

```http
POST /api/products
```

**Required Fields:**
- `brand_id` (UUID)
- `name` (string)
- `slug` (string, unique)
- `price` (number, min: 0)
- `primary_image_url` (URL)

**Optional Fields:**
- `description` (string)
- `short_description` (string)
- `sale_price` (number)
- `color` (string)
- `size_range` (string)
- `gender` (enum: mens, womens, unisex, kids)
- `season` (enum: spring, summer, fall, winter, all-season)
- `stock_status` (enum: in_stock, out_of_stock, pre_order, discontinued)
- `is_featured` (boolean)
- `meta_title` (string)
- `meta_description` (string)

**Example Request:**
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "brand_id": "uuid",
    "name": "Classic T-Shirt",
    "slug": "classic-tshirt",
    "price": 29.99,
    "primary_image_url": "https://example.com/tshirt.jpg",
    "gender": "unisex"
  }'
```

### Update Product (Admin)

```http
PUT /api/products/:id
```

Same fields as Create Product (all optional for update).

### Delete Product (Admin)

```http
DELETE /api/products/:id
```

Performs a soft delete (sets `is_active` to false).

---

## Brands

### List Brands

```http
GET /api/brands
```

**Example Response:**
```json
[
  {
    "id": "uuid",
    "name": "Nike",
    "slug": "nike",
    "logo_url": "https://...",
    "description": "Athletic footwear and apparel",
    "website_url": "https://www.nike.com",
    "partnership_status": "active",
    "partnership_tier": "platinum",
    "commission_rate": 8.00,
    "is_active": true
  }
]
```

### Get Brand by ID

```http
GET /api/brands/:id
```

Returns brand with product count.

### Create Brand (Admin)

```http
POST /api/brands
```

**Required Fields:**
- `name` (string)
- `slug` (string, unique)

**Optional Fields:**
- `description` (string)
- `logo_url` (URL)
- `website_url` (URL)
- `partnership_status` (enum: none, pending, active, inactive)
- `partnership_tier` (enum: bronze, silver, gold, platinum)
- `commission_rate` (number, e.g., 5.50 for 5.5%)
- `contact_email` (string)
- `contact_name` (string)

### Update Brand (Admin)

```http
PUT /api/brands/:id
```

### Delete Brand (Admin)

```http
DELETE /api/brands/:id
```

---

## Categories

### List Categories

```http
GET /api/categories
```

Returns hierarchical category structure.

**Example Response:**
```json
[
  {
    "id": "uuid",
    "name": "Clothing",
    "slug": "clothing",
    "parent_id": null,
    "children": [
      {
        "id": "uuid",
        "name": "Tops",
        "slug": "tops",
        "parent_id": "parent-uuid",
        "children": []
      }
    ]
  }
]
```

### Get Category by ID

```http
GET /api/categories/:id
```

Returns category with associated products.

### Create Category (Admin)

```http
POST /api/categories
```

**Required:**
- `name` (string)
- `slug` (string, unique)

**Optional:**
- `parent_id` (UUID)
- `description` (string)
- `sort_order` (integer)

---

## Affiliate Links

### Track Click

```http
POST /api/affiliates/track-click
```

**Required:**
- `affiliate_link_id` (UUID)

**Optional:**
- `session_id` (string) - for tracking user journey

**Example Request:**
```bash
curl -X POST http://localhost:3000/api/affiliates/track-click \
  -H "Content-Type: application/json" \
  -d '{
    "affiliate_link_id": "uuid",
    "session_id": "user-session-123"
  }'
```

**Response:**
```json
{
  "click_id": "uuid",
  "redirect_url": "https://www.nike.com/product?aff=12345"
}
```

**Flow:**
1. User clicks product link on your site
2. Your frontend calls this endpoint
3. System records the click
4. Frontend redirects user to `redirect_url`

### Track Conversion (Admin/Webhook)

```http
POST /api/affiliates/track-conversion
```

**Required:**
- `affiliate_link_id` (UUID)
- `order_id` (string)
- `order_value` (number)
- `commission_earned` (number)

**Optional:**
- `commission_rate` (number)

Typically called by affiliate network webhooks when a purchase is confirmed.

### Get Product's Affiliate Links

```http
GET /api/affiliates/product/:product_id
```

Returns all active affiliate links for a product.

### Create Affiliate Link (Admin)

```http
POST /api/affiliates
```

**Required:**
- `product_id` (UUID)
- `retailer_name` (string)
- `affiliate_url` (URL)

**Optional:**
- `retailer_url` (URL)
- `affiliate_network` (string)
- `affiliate_id` (string)
- `is_primary` (boolean)

---

## Analytics

### Overview

```http
GET /api/analytics/overview
```

**Query Parameters:**
- `start_date` (ISO date)
- `end_date` (ISO date)

**Example Response:**
```json
{
  "totalClicks": 15234,
  "totalConversions": 487,
  "conversionRate": 3.2,
  "totalRevenue": 24350.75,
  "totalCommission": 1826.31,
  "period": {
    "start_date": "2024-01-01",
    "end_date": "2024-01-31"
  }
}
```

### Top Products

```http
GET /api/analytics/top-products
```

**Query Parameters:**
- `limit` (integer, min: 1, max: 100) - Default: 10
- `metric` (enum: clicks, conversions, revenue) - Default: clicks

**Example Response:**
```json
[
  {
    "id": "uuid",
    "name": "Air Max 270",
    "slug": "nike-air-max-270",
    "primary_image_url": "https://...",
    "brand": { "name": "Nike" },
    "stats": {
      "clicks": 1250,
      "conversions": 48,
      "revenue": 7200.00,
      "commission": 576.00
    }
  }
]
```

### Product Analytics

```http
GET /api/analytics/product/:product_id
```

Returns detailed analytics for a specific product.

### Brand Analytics

```http
GET /api/analytics/brand/:brand_id
```

Returns aggregated analytics for all products from a brand.

---

## Health Check

```http
GET /health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-26T12:00:00.000Z"
}
```

---

## Rate Limits

- **Default:** 100 requests per 15 minutes per IP
- **Configurable** via environment variables

**Headers:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1609459200
```

---

## Error Codes

- `400` - Bad Request (validation error)
- `401` - Unauthorized
- `403` - Forbidden (admin only)
- `404` - Not Found
- `429` - Too Many Requests (rate limit)
- `500` - Internal Server Error

---

## Webhooks (Future)

Plan to support webhooks for:
- Affiliate network conversions
- Stock updates
- Price changes

---

## SDKs & Libraries

**JavaScript/TypeScript:**
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Get products
const { data } = await api.get('/products', {
  params: { page: 1, limit: 20 }
});
```

**Python:**
```python
import requests

response = requests.get('http://localhost:3000/api/products')
products = response.json()
```

---

## Best Practices

1. **Caching:** Cache product listings and brand data (5-15 min)
2. **Images:** Use a CDN for product images
3. **Search:** Implement debouncing on search inputs
4. **Pagination:** Default to 20 items per page
5. **Error Handling:** Always handle 429 rate limit responses
6. **Logging:** Log affiliate clicks for debugging

---

## Support

For API issues:
- Check response status and error message
- Review Supabase logs
- Ensure correct authentication
- Verify request payload format

Need help? Check the main README.md or create an issue.
