# Quick Start Guide

Get Style Swap Commerce running in 5 minutes!

## ⚡ Fast Setup

### 1. Install Dependencies
```bash
cd ~/clawd/projects/style-swap-commerce
npm install
```

### 2. Setup Database
```bash
# Create PostgreSQL database
createdb styleswap_commerce

# Or with Docker:
docker run --name styleswap-db -e POSTGRES_PASSWORD=password -e POSTGRES_DB=styleswap_commerce -p 5432:5432 -d postgres:14
```

### 3. Configure Environment
```bash
# Copy example config
cp .env.example .env

# Edit .env with your settings:
# - DATABASE_URL
# - STRIPE_SECRET_KEY (optional for now)
# - Other API keys as needed
```

Minimal `.env` for local development:
```env
PORT=3000
NODE_ENV=development
DATABASE_URL=postgresql://postgres:password@localhost:5432/styleswap_commerce
DEFAULT_UTM_SOURCE=styleswap
DEFAULT_UTM_MEDIUM=referral
DEFAULT_COMMISSION_RATE=10
```

### 4. Run Database Migration
```bash
npm run migrate
```

You should see:
```
✓ Database schema created successfully
✓ Sample brands inserted
Migration completed successfully!
```

### 5. Start the Server
```bash
npm start
```

Server runs on: `http://localhost:3000`

## 🎯 Test It Out

### Option A: Use the Demo UI

1. **Open Buy Button Demo:**
   ```
   Open: file:///path/to/style-swap-commerce/frontend/buy-button.html
   ```
   - Click "Buy Now" to test redirects
   - Click "Add to Cart" to test shopping cart
   - View cart and checkout

2. **Open Analytics Dashboard:**
   ```
   Open: file:///path/to/style-swap-commerce/frontend/dashboard.html
   ```
   - View real-time metrics
   - Explore brand performance
   - Check top products

### Option B: Test with cURL

**Create an affiliate link:**
```bash
# Insert a product first (use pgAdmin or psql):
psql styleswap_commerce -c "
  INSERT INTO products (brand_id, name, product_url, price) 
  VALUES (1, 'Nike Air Max 270', 'https://nike.com/air-max-270', 150.00)
  RETURNING id;
"

# Create affiliate link via database:
psql styleswap_commerce -c "
  INSERT INTO affiliate_links (product_id, brand_id, original_url, short_code, tracked_url)
  VALUES (1, 1, 'https://nike.com/air-max-270', 'abc12345', 
          'https://nike.com/air-max-270?utm_source=styleswap&utm_medium=referral')
  RETURNING *;
"
```

**Test click tracking:**
```bash
# This will track a click and redirect
curl -L http://localhost:3000/api/link/abc12345/redirect
```

**Check analytics:**
```bash
curl http://localhost:3000/api/analytics/dashboard | json_pp
```

**Test cart:**
```bash
# Add item to cart
curl -X POST http://localhost:3000/api/cart/add \
  -H "Content-Type: application/json" \
  -d '{
    "product_id": 1,
    "affiliate_link_id": 1,
    "quantity": 1
  }'

# Get cart
curl http://localhost:3000/api/cart
```

**Simulate webhook (conversion):**
```bash
curl -X POST http://localhost:3000/api/webhooks/test \
  -H "Content-Type: application/json" \
  -d '{
    "event_type": "conversion",
    "order_id": "TEST-ORDER-123",
    "affiliate_link_code": "abc12345",
    "order_value": 150.00,
    "currency": "USD"
  }'
```

## 🛠️ Development Workflow

### Running in Dev Mode
```bash
npm run dev
# Auto-reloads on file changes
```

### Database Management
```bash
# Connect to database
psql styleswap_commerce

# View tables
\dt

# Check clicks
SELECT * FROM clicks ORDER BY clicked_at DESC LIMIT 10;

# Check conversions
SELECT * FROM conversions ORDER BY converted_at DESC LIMIT 10;

# View analytics
SELECT * FROM daily_stats ORDER BY date DESC;
```

### Common Queries

**See all affiliate links:**
```sql
SELECT 
  al.short_code,
  p.name as product_name,
  b.name as brand_name,
  al.click_count,
  al.conversion_count
FROM affiliate_links al
JOIN products p ON al.product_id = p.id
JOIN brands b ON al.brand_id = b.id;
```

**Get conversion rate by brand:**
```sql
SELECT 
  b.name,
  COUNT(DISTINCT c.id) as clicks,
  COUNT(DISTINCT conv.id) as conversions,
  CASE 
    WHEN COUNT(DISTINCT c.id) > 0 
    THEN ROUND((COUNT(DISTINCT conv.id)::NUMERIC / COUNT(DISTINCT c.id) * 100), 2)
    ELSE 0 
  END as conversion_rate
FROM brands b
LEFT JOIN affiliate_links al ON b.id = al.brand_id
LEFT JOIN clicks c ON al.id = c.affiliate_link_id
LEFT JOIN conversions conv ON al.id = conv.affiliate_link_id
GROUP BY b.name;
```

## 🔗 Integration Guide

### Integrate with Your Frontend

**1. Add the Buy Now button:**
```html
<button 
  class="buy-now-btn" 
  data-product-id="1"
  data-link-code="abc12345">
  Buy Now - $150
</button>

<script>
document.querySelectorAll('.buy-now-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const linkCode = btn.dataset.linkCode;
    window.open(`http://localhost:3000/api/link/${linkCode}/redirect`, '_blank');
  });
});
</script>
```

**2. Add to cart:**
```javascript
async function addToCart(productId, linkId) {
  const response = await fetch('http://localhost:3000/api/cart/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      product_id: productId,
      affiliate_link_id: linkId,
      quantity: 1
    })
  });
  
  if (response.ok) {
    alert('Added to cart!');
    updateCartBadge();
  }
}
```

**3. Display cart count:**
```javascript
async function getCartCount() {
  const response = await fetch('http://localhost:3000/api/cart', {
    credentials: 'include'
  });
  const cart = await response.json();
  return cart.item_count || 0;
}
```

### Configure Webhooks

**For Affiliate Networks:**
1. Go to your affiliate network dashboard
2. Add webhook endpoint: `https://yourdomain.com/api/webhooks/shareasale`
3. Set webhook secret in `.env`
4. Test with sample payload

**For Stripe:**
```bash
# Install Stripe CLI
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Test webhook
stripe trigger checkout.session.completed
```

## 📊 Monitoring

### Health Check
```bash
curl http://localhost:3000/health
# Returns: {"status":"healthy","timestamp":"..."}
```

### Check Webhook Processing
```sql
-- View recent webhooks
SELECT * FROM webhook_events 
ORDER BY received_at DESC 
LIMIT 10;

-- Find failed webhooks
SELECT * FROM webhook_events 
WHERE processed = false;
```

### Generate Daily Stats Manually
```javascript
// In Node.js REPL or script
const analyticsService = require('./src/services/analyticsService');
await analyticsService.generateDailyStats('2024-01-26');
```

## 🚀 Deploy to Production

### Heroku (Quick)
```bash
# Install Heroku CLI
heroku create styleswap-commerce

# Add PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set STRIPE_SECRET_KEY=sk_live_...

# Deploy
git push heroku main

# Run migration
heroku run npm run migrate

# View logs
heroku logs --tail
```

### Docker (Portable)
```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
docker build -t styleswap-commerce .
docker run -p 3000:3000 --env-file .env styleswap-commerce
```

## 🐛 Troubleshooting

**Database connection fails:**
```bash
# Check if PostgreSQL is running
pg_isready

# Test connection
psql styleswap_commerce -c "SELECT 1;"
```

**Clicks not tracked:**
- Check database has affiliate_links
- Verify short_code is correct
- Check browser console for CORS errors
- Enable cookies in browser

**Dashboard shows no data:**
- Verify API server is running
- Check CORS settings in server.js
- Generate some test clicks first

**Webhook failing:**
- Check signature verification
- View error in webhook_events table
- Verify payload format matches expected structure

## 📚 Next Steps

1. **Add Real Products:**
   - Import your product catalog
   - Create affiliate links for each product
   - Set up brand partnerships

2. **Customize Styling:**
   - Edit `frontend/*.html` CSS
   - Match your brand colors
   - Add your logo

3. **Set Up Cron Jobs:**
   - Daily stats generation
   - Abandoned cart reminders
   - Commission reports

4. **Add Authentication:**
   - User registration/login
   - Admin dashboard
   - Role-based access

5. **Enable Email:**
   - Conversion notifications
   - Cart abandonment emails
   - Commission reports

## 💡 Tips

- **Test with sample brands** - Nike, Adidas, Zara already seeded
- **Use short_codes** - Easier to remember than full UUIDs
- **Monitor webhooks** - Check processed=false regularly
- **Cache analytics** - Use Redis for dashboard performance
- **Log everything** - Helpful for debugging affiliate issues

## 📞 Support

Check the full README.md and ARCHITECTURE.md for detailed documentation.

Happy tracking! 🎉
