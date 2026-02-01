# API Testing Guide

Complete collection of API endpoints with example requests and responses.

## Base URL
```
Local: http://localhost:3000
Production: https://your-domain.com
```

## 🔗 Affiliate Links

### 1. Redirect via Affiliate Link (Track Click)
```bash
# Browser URL (redirects to brand site)
http://localhost:3000/api/link/abc12345/redirect

# With curl (follow redirects)
curl -L http://localhost:3000/api/link/abc12345/redirect

# Expected: Redirect to brand site + click tracked in database
```

**What happens:**
1. Creates click record (IP, user agent, timestamp, UTM params)
2. Increments `affiliate_links.click_count`
3. Sets session cookie
4. Redirects to `tracked_url`

### 2. Get Link Details
```bash
curl http://localhost:3000/api/link/abc12345

# Response:
{
  "id": 1,
  "product_id": 1,
  "brand_id": 1,
  "product_name": "Air Max 270",
  "brand_name": "Nike",
  "original_url": "https://nike.com/air-max-270",
  "short_code": "abc12345",
  "tracked_url": "https://nike.com/air-max-270?utm_source=styleswap&utm_medium=referral",
  "click_count": 42,
  "conversion_count": 3,
  "revenue_generated": "450.00",
  "commission_earned": "54.00",
  "last_clicked_at": "2024-01-26T12:30:00.000Z"
}
```

### 3. Get Link Analytics
```bash
curl http://localhost:3000/api/link/1/analytics

# Response:
{
  "id": 1,
  "short_code": "abc12345",
  "total_clicks": 42,
  "total_conversions": 3,
  "total_revenue": "450.00",
  "total_commission": "54.00",
  "conversion_rate": "7.14"
}
```

## 🛒 Shopping Cart

### 1. Get Current Cart
```bash
curl -b cookies.txt http://localhost:3000/api/cart

# Response:
{
  "id": 1,
  "session_id": "abc-123-def-456",
  "status": "active",
  "items": [
    {
      "id": 1,
      "product_id": 1,
      "product_name": "Air Max 270",
      "brand_name": "Nike",
      "quantity": 2,
      "price": "150.00",
      "image_url": null,
      "affiliate_link_id": 1
    }
  ],
  "total": 300.00,
  "item_count": 2,
  "created_at": "2024-01-26T12:00:00.000Z",
  "updated_at": "2024-01-26T12:30:00.000Z"
}
```

### 2. Add Item to Cart
```bash
curl -X POST http://localhost:3000/api/cart/add \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "product_id": 1,
    "affiliate_link_id": 1,
    "quantity": 1
  }'

# Response:
{
  "success": true,
  "item": {
    "id": 1,
    "cart_id": 1,
    "product_id": 1,
    "affiliate_link_id": 1,
    "quantity": 1,
    "price": "150.00",
    "added_at": "2024-01-26T12:30:00.000Z"
  }
}
```

### 3. Update Cart Item Quantity
```bash
curl -X PUT http://localhost:3000/api/cart/item/1 \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "quantity": 3
  }'

# Response:
{
  "success": true,
  "item": {
    "id": 1,
    "quantity": 3
  }
}
```

### 4. Remove Item from Cart
```bash
curl -X DELETE http://localhost:3000/api/cart/item/1 \
  -b cookies.txt

# Response:
{
  "success": true
}
```

### 5. Checkout Cart
```bash
curl -X POST http://localhost:3000/api/cart/checkout \
  -b cookies.txt

# Response:
{
  "cart_id": 1,
  "total": 450.00,
  "items": [
    {
      "product_id": 1,
      "product_name": "Air Max 270",
      "brand": "Nike",
      "quantity": 2,
      "affiliate_link_id": 1
    },
    {
      "product_id": 2,
      "product_name": "Ultraboost 22",
      "brand": "Adidas",
      "quantity": 1,
      "affiliate_link_id": 2
    }
  ]
}
```

## 📊 Analytics

### 1. Dashboard Overview
```bash
# All time
curl http://localhost:3000/api/analytics/dashboard

# With filters
curl "http://localhost:3000/api/analytics/dashboard?start_date=2024-01-01&end_date=2024-01-31&brand_id=1"

# Response:
{
  "total_clicks": 1250,
  "total_conversions": 87,
  "total_revenue": "13450.00",
  "total_commission": "1345.00",
  "conversion_rate": "6.96",
  "avg_order_value": "154.60"
}
```

### 2. Brand Performance
```bash
curl http://localhost:3000/api/analytics/brands

# Response:
[
  {
    "id": 1,
    "name": "Nike",
    "commission_rate": "12.00",
    "clicks": 450,
    "conversions": 32,
    "revenue": "4800.00",
    "commission": "576.00",
    "conversion_rate": "7.11",
    "avg_order_value": "150.00"
  },
  {
    "id": 2,
    "name": "Adidas",
    "commission_rate": "10.00",
    "clicks": 380,
    "conversions": 28,
    "revenue": "5040.00",
    "commission": "504.00",
    "conversion_rate": "7.37",
    "avg_order_value": "180.00"
  }
]
```

### 3. Top Products
```bash
# Top 10
curl http://localhost:3000/api/analytics/products?limit=10

# With brand filter
curl "http://localhost:3000/api/analytics/products?limit=20&brand_id=1"

# Response:
[
  {
    "id": 1,
    "name": "Air Max 270",
    "price": "150.00",
    "brand_name": "Nike",
    "clicks": 120,
    "conversions": 15,
    "revenue": "2250.00",
    "commission": "270.00"
  }
]
```

### 4. Time Series Data
```bash
# Daily (default)
curl "http://localhost:3000/api/analytics/timeseries?start_date=2024-01-01&end_date=2024-01-31"

# Hourly
curl "http://localhost:3000/api/analytics/timeseries?start_date=2024-01-26&granularity=hour"

# Response:
[
  {
    "date": "2024-01-26",
    "clicks": 45,
    "conversions": 3,
    "revenue": "450.00"
  },
  {
    "date": "2024-01-27",
    "clicks": 52,
    "conversions": 4,
    "revenue": "620.00"
  }
]
```

### 5. Commission Report
```bash
# All conversions
curl http://localhost:3000/api/analytics/commissions

# With filters
curl "http://localhost:3000/api/analytics/commissions?brand_id=1&status=confirmed&start_date=2024-01-01"

# Response:
[
  {
    "brand_name": "Nike",
    "total_conversions": 32,
    "total_revenue": "4800.00",
    "total_commission": "576.00",
    "avg_commission_rate": "12.00",
    "status": "confirmed"
  }
]
```

## 🔔 Webhooks

### 1. Affiliate Network Webhook (Conversion)
```bash
curl -X POST http://localhost:3000/api/webhooks/shareasale \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Signature: abc123..." \
  -d '{
    "event_type": "conversion",
    "order_id": "ORDER-ABC-123",
    "affiliate_link_code": "abc12345",
    "order_value": 150.00,
    "currency": "USD",
    "customer_id": "CUST-456"
  }'

# Response:
{
  "success": true
}
```

### 2. Refund Webhook
```bash
curl -X POST http://localhost:3000/api/webhooks/shareasale \
  -H "Content-Type: application/json" \
  -d '{
    "event_type": "refund",
    "order_id": "ORDER-ABC-123"
  }'

# Response:
{
  "success": true
}
```

### 3. Stripe Webhook (Checkout Session)
```bash
curl -X POST http://localhost:3000/api/webhooks/stripe \
  -H "Content-Type: application/json" \
  -H "Stripe-Signature: t=...,v1=..." \
  -d '{
    "type": "checkout.session.completed",
    "data": {
      "object": {
        "id": "cs_test_...",
        "amount_total": 15000,
        "currency": "usd"
      }
    }
  }'

# Response:
{
  "received": true
}
```

## 🏥 Health Check

```bash
curl http://localhost:3000/health

# Response:
{
  "status": "healthy",
  "timestamp": "2024-01-26T12:30:00.000Z"
}
```

## 🧪 Complete Test Scenario

### Setup
1. Start server: `npm start`
2. Seed demo data: `npm run seed`

### Test Flow
```bash
# 1. Get a product's affiliate link from database
psql styleswap_commerce -c "SELECT short_code FROM affiliate_links LIMIT 1;"
# Returns: abc12345

# 2. Track a click (redirect)
curl -L -c cookies.txt http://localhost:3000/api/link/abc12345/redirect

# 3. Add to cart
curl -X POST http://localhost:3000/api/cart/add \
  -b cookies.txt \
  -H "Content-Type: application/json" \
  -d '{"product_id": 1, "affiliate_link_id": 1, "quantity": 2}'

# 4. View cart
curl -b cookies.txt http://localhost:3000/api/cart

# 5. Checkout
curl -X POST http://localhost:3000/api/cart/checkout -b cookies.txt

# 6. Simulate conversion webhook
curl -X POST http://localhost:3000/api/webhooks/test \
  -H "Content-Type: application/json" \
  -d '{
    "event_type": "conversion",
    "order_id": "TEST-ORDER-001",
    "affiliate_link_code": "abc12345",
    "order_value": 300.00,
    "currency": "USD"
  }'

# 7. Check analytics
curl http://localhost:3000/api/analytics/dashboard

# 8. View brand performance
curl http://localhost:3000/api/analytics/brands
```

## 📝 Postman Collection

Import this JSON into Postman:

```json
{
  "info": {
    "name": "Style Swap Commerce API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:3000",
      "type": "string"
    }
  ],
  "item": [
    {
      "name": "Affiliate Links",
      "item": [
        {
          "name": "Redirect (Track Click)",
          "request": {
            "method": "GET",
            "url": "{{baseUrl}}/api/link/abc12345/redirect"
          }
        },
        {
          "name": "Get Link Details",
          "request": {
            "method": "GET",
            "url": "{{baseUrl}}/api/link/abc12345"
          }
        }
      ]
    },
    {
      "name": "Shopping Cart",
      "item": [
        {
          "name": "Get Cart",
          "request": {
            "method": "GET",
            "url": "{{baseUrl}}/api/cart"
          }
        },
        {
          "name": "Add to Cart",
          "request": {
            "method": "POST",
            "url": "{{baseUrl}}/api/cart/add",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"product_id\": 1,\n  \"affiliate_link_id\": 1,\n  \"quantity\": 1\n}"
            }
          }
        },
        {
          "name": "Checkout",
          "request": {
            "method": "POST",
            "url": "{{baseUrl}}/api/cart/checkout"
          }
        }
      ]
    },
    {
      "name": "Analytics",
      "item": [
        {
          "name": "Dashboard",
          "request": {
            "method": "GET",
            "url": "{{baseUrl}}/api/analytics/dashboard"
          }
        },
        {
          "name": "Brand Performance",
          "request": {
            "method": "GET",
            "url": "{{baseUrl}}/api/analytics/brands"
          }
        },
        {
          "name": "Top Products",
          "request": {
            "method": "GET",
            "url": "{{baseUrl}}/api/analytics/products?limit=10"
          }
        }
      ]
    }
  ]
}
```

## 🐛 Debugging Tips

### Check if click was tracked
```sql
SELECT * FROM clicks 
WHERE affiliate_link_id = 1 
ORDER BY clicked_at DESC 
LIMIT 5;
```

### Check if conversion was recorded
```sql
SELECT 
  c.order_id,
  c.order_value,
  c.commission_amount,
  c.status,
  al.short_code
FROM conversions c
JOIN affiliate_links al ON c.affiliate_link_id = al.id
ORDER BY c.converted_at DESC
LIMIT 5;
```

### Check webhook events
```sql
SELECT 
  event_type,
  source,
  processed,
  error_message,
  received_at
FROM webhook_events
ORDER BY received_at DESC
LIMIT 10;
```

### View failed webhooks
```sql
SELECT * FROM webhook_events 
WHERE processed = false;
```

## 🔐 Authentication (Future)

When adding authentication, requests would include:

```bash
curl http://localhost:3000/api/analytics/dashboard \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 📊 Response Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (invalid input)
- `401` - Unauthorized (future: when auth is added)
- `403` - Forbidden (webhook signature failed)
- `404` - Not Found (link doesn't exist)
- `500` - Internal Server Error

## 💡 Pro Tips

1. **Save cookies** - Use `-c cookies.txt` and `-b cookies.txt` to maintain session
2. **Pretty print JSON** - Pipe to `| json_pp` or `| jq`
3. **Test webhooks locally** - Use ngrok to expose localhost
4. **Monitor logs** - Watch server output while testing
5. **Use environment variables** - Store `BASE_URL` in your shell

---

**Happy Testing! 🎯**
