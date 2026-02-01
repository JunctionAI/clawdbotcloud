# Style Swap E-Commerce Integration

Complete e-commerce and affiliate tracking system for Style Swap fashion platform.

## 🚀 Features

### 1. **Buy Now Button Flow**
- Instant redirect to brand sites with UTM tracking
- Affiliate link generation and management
- Click tracking with device/location data
- Session-based user tracking

### 2. **Affiliate Link Tracking System**
- Click tracking (IP, user agent, referrer, UTM parameters)
- Conversion tracking with order value
- Revenue and commission calculation
- Performance analytics per link

### 3. **Shopping Cart** (Multi-Item Purchases)
- Session-based cart management
- Add/remove/update items
- Multi-brand checkout flow
- 7-day cart expiration
- Cart abandonment tracking

### 4. **Analytics Dashboard**
- Real-time metrics (clicks, conversions, revenue)
- Conversion rate tracking
- Brand performance comparison
- Top products by revenue
- Time series charts (daily/hourly)
- Commission reports

### 5. **Webhook Handlers**
- Affiliate network integration (ShareASale, CJ, Impact)
- Conversion callback processing
- Refund handling
- Status updates (pending → confirmed → paid)
- Signature verification

### 6. **Commission Calculation Engine**
- Brand-specific commission rates
- Automatic commission calculation
- Multi-currency support
- Commission status tracking
- Detailed reporting

### 7. **Stripe Integration**
- Ready for direct sales
- Webhook handling
- Payment intent tracking
- Checkout session support

## 📁 Project Structure

```
style-swap-commerce/
├── src/
│   ├── server.js                 # Express server
│   ├── routes/
│   │   └── api.js               # API endpoints
│   ├── services/
│   │   ├── affiliateLinkService.js
│   │   ├── commissionService.js
│   │   ├── cartService.js
│   │   └── analyticsService.js
│   └── utils/
│       └── urlBuilder.js         # UTM tracking utilities
├── database/
│   ├── schema.sql               # PostgreSQL schema
│   └── migrate.js               # Migration script
├── webhooks/
│   └── handler.js               # Webhook processing
├── frontend/
│   ├── dashboard.html           # Analytics dashboard
│   └── buy-button.html          # Product demo page
├── config/
│   └── database.js              # Database connection
├── package.json
└── .env.example
```

## 🛠️ Setup

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Stripe account (for future direct sales)

### Installation

1. **Install dependencies:**
```bash
cd ~/clawd/projects/style-swap-commerce
npm install
```

2. **Configure environment:**
```bash
cp .env.example .env
# Edit .env with your database credentials and API keys
```

3. **Create database:**
```bash
createdb styleswap_commerce
```

4. **Run migrations:**
```bash
npm run migrate
```

5. **Start server:**
```bash
npm start
# Or for development with auto-reload:
npm run dev
```

## 📡 API Endpoints

### Affiliate Links
- `GET /api/link/:shortCode/redirect` - Track click and redirect
- `GET /api/link/:shortCode` - Get link details
- `GET /api/link/:linkId/analytics` - Link performance

### Shopping Cart
- `GET /api/cart` - Get current cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/item/:itemId` - Update quantity
- `DELETE /api/cart/item/:itemId` - Remove item
- `POST /api/cart/checkout` - Checkout cart

### Analytics
- `GET /api/analytics/dashboard` - Overview stats
- `GET /api/analytics/brands` - Brand performance
- `GET /api/analytics/products` - Top products
- `GET /api/analytics/timeseries` - Time series data
- `GET /api/analytics/commissions` - Commission report

### Webhooks
- `POST /api/webhooks/:source` - Affiliate network webhooks
- `POST /api/webhooks/stripe` - Stripe webhooks

## 📊 Database Schema

### Core Tables
- **brands** - Merchant/brand information
- **products** - Product catalog
- **affiliate_links** - Trackable affiliate URLs
- **clicks** - Click tracking data
- **conversions** - Purchase tracking
- **carts** / **cart_items** - Shopping cart
- **webhook_events** - Webhook processing log
- **daily_stats** - Aggregated analytics

## 🎯 Usage Examples

### Creating an Affiliate Link
```javascript
const link = await affiliateLinkService.createAffiliateLink(
  productId,
  brandId,
  'https://nike.com/product/123',
  {
    utm_campaign: 'summer_sale',
    utm_content: 'homepage_banner'
  }
);
// Returns: { short_code: 'abc12345', tracked_url: '...' }
```

### Tracking a Click
```javascript
await affiliateLinkService.trackClick(linkId, {
  sessionId: 'user-session-id',
  ipAddress: '1.2.3.4',
  userAgent: 'Mozilla/5.0...',
  deviceType: 'mobile'
});
```

### Recording a Conversion
```javascript
await commissionService.recordConversion({
  affiliateLinkId: 123,
  brandId: 1,
  orderId: 'ORDER-123',
  orderValue: 99.99,
  currency: 'USD'
});
```

### Getting Analytics
```javascript
const dashboard = await analyticsService.getDashboard({
  startDate: '2024-01-01',
  endDate: '2024-01-31',
  brandId: 1
});
// Returns: clicks, conversions, revenue, commission, conversion_rate, avg_order_value
```

## 🔗 Frontend Integration

### Buy Now Button
```html
<button onclick="buyNow('product-slug', 'abc12345')">
  Buy Now
</button>

<script>
async function buyNow(productSlug, shortCode) {
  window.open(`http://localhost:3000/api/link/${shortCode}/redirect`, '_blank');
}
</script>
```

### Add to Cart
```html
<button onclick="addToCart(productId, affiliateLinkId)">
  Add to Cart
</button>

<script>
async function addToCart(productId, affiliateLinkId) {
  await fetch('http://localhost:3000/api/cart/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ product_id: productId, affiliate_link_id: affiliateLinkId })
  });
}
</script>
```

## 🔔 Webhook Integration

### Affiliate Network Example
```javascript
// Your affiliate network sends webhooks to:
// POST https://yourapp.com/api/webhooks/shareasale

// Example payload:
{
  "event_type": "conversion",
  "order_id": "ABC123",
  "affiliate_link_code": "abc12345",
  "order_value": 99.99,
  "currency": "USD"
}
```

### Stripe Example
```bash
# Configure Stripe webhook endpoint:
# https://yourapp.com/api/webhooks/stripe

stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

## 📈 Analytics Dashboard

Open `frontend/dashboard.html` in your browser to view:
- Real-time metrics
- Performance charts
- Brand comparison
- Top products
- Time series analysis

## 🔐 Security Features

- Rate limiting (100 req/15min per IP)
- Helmet.js security headers
- Webhook signature verification
- SQL injection prevention (parameterized queries)
- CORS configuration
- Cookie-based session tracking

## 🚀 Production Deployment

### Environment Variables
```bash
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
AFFILIATE_WEBHOOK_SECRET=your_secret
FRONTEND_URL=https://styleswap.com
```

### Database Optimization
- Run daily stats aggregation as cron job:
```javascript
// Run at midnight
analyticsService.generateDailyStats(new Date().toISOString().split('T')[0]);
```

### Monitoring
- Set up error tracking (Sentry, LogRocket)
- Monitor webhook processing queue
- Track conversion delays
- Alert on failed webhooks

## 📝 Commission Calculation

Commissions are calculated based on:
1. Brand-specific rates (defined in `brands.commission_rate`)
2. Order value from conversion webhook
3. Formula: `commission = order_value * (commission_rate / 100)`

Example:
```
Nike: 12% commission rate
Order: $150.00
Commission: $150.00 * 0.12 = $18.00
```

## 🧪 Testing

### Manual Testing
1. Open `frontend/buy-button.html`
2. Click "Buy Now" - should redirect and track click
3. Click "Add to Cart" - should increment cart badge
4. View analytics at `frontend/dashboard.html`

### Webhook Testing
```bash
# Test conversion webhook
curl -X POST http://localhost:3000/api/webhooks/test \
  -H "Content-Type: application/json" \
  -d '{
    "event_type": "conversion",
    "order_id": "TEST123",
    "affiliate_link_code": "abc12345",
    "order_value": 99.99
  }'
```

## 🎨 Customization

### Brand-Specific Commission Rates
Update in database:
```sql
UPDATE brands SET commission_rate = 15.00 WHERE slug = 'nike';
```

### UTM Parameters
Customize in `.env`:
```
DEFAULT_UTM_SOURCE=styleswap
DEFAULT_UTM_MEDIUM=referral
```

### Cart Expiration
Edit in `cartService.js`:
```javascript
expiresAt.setDate(expiresAt.getDate() + 7); // 7 days
```

## 🐛 Troubleshooting

**Clicks not tracking:**
- Check database connection
- Verify short_code exists in `affiliate_links`
- Check browser console for errors

**Conversions not showing:**
- Verify webhook signature
- Check `webhook_events` table for errors
- Ensure order_id matches affiliate_link_code

**Dashboard not loading:**
- Check API server is running
- Verify CORS settings
- Check browser console

## 📚 Next Steps

1. **Integrate with real brands** - Add actual affiliate network credentials
2. **Email notifications** - Alert on high-value conversions
3. **A/B testing** - Test different CTA buttons
4. **Mobile app** - Build React Native app using same API
5. **AI recommendations** - Use conversion data for product suggestions
6. **Influencer tracking** - Add influencer-specific UTM codes
7. **Automated payouts** - Integrate with payment processor

## 📄 License

MIT

## 🤝 Contributing

This is a custom integration for Style Swap. For questions or modifications, contact the development team.

---

**Built for Style Swap** 🛍️✨
