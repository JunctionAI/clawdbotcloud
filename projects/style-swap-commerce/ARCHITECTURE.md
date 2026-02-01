# Style Swap Commerce - Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend Layer                           │
├─────────────────────────────────────────────────────────────┤
│  • Buy Button Widget    • Shopping Cart    • Analytics UI    │
│  • Product Cards        • Checkout Flow    • Dashboards      │
└─────────────────────────────────────────────────────────────┘
                              ↓ HTTP/REST
┌─────────────────────────────────────────────────────────────┐
│                    API Layer (Express)                       │
├─────────────────────────────────────────────────────────────┤
│  /api/link/*           - Affiliate link management           │
│  /api/cart/*           - Shopping cart operations            │
│  /api/analytics/*      - Analytics & reporting               │
│  /api/webhooks/*       - External integration hooks          │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                   Business Logic Layer                       │
├─────────────────────────────────────────────────────────────┤
│  AffiliateLinkService  - Link creation & tracking            │
│  CommissionService     - Commission calculations             │
│  CartService           - Cart management                     │
│  AnalyticsService      - Data aggregation & reporting        │
│  WebhookHandler        - External event processing           │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                   Data Layer (PostgreSQL)                    │
├─────────────────────────────────────────────────────────────┤
│  brands             - Brand/merchant catalog                 │
│  products           - Product inventory                      │
│  affiliate_links    - Trackable URLs with UTM params         │
│  clicks             - Click tracking & attribution           │
│  conversions        - Purchase events & commissions          │
│  carts/cart_items   - Shopping cart state                    │
│  webhook_events     - External event log                     │
│  daily_stats        - Pre-aggregated analytics               │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                   External Integrations                      │
├─────────────────────────────────────────────────────────────┤
│  • Stripe (future direct sales)                              │
│  • Affiliate Networks (ShareASale, CJ, Impact, etc.)         │
│  • Brand Partner APIs                                        │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. Click Tracking Flow
```
User clicks "Buy Now" 
  → GET /api/link/:shortCode/redirect
  → Track click (IP, device, UTM params)
  → Store in clicks table
  → Increment affiliate_links.click_count
  → Redirect to brand site with UTM tracking
```

### 2. Conversion Tracking Flow
```
Brand/Affiliate Network sends webhook
  → POST /api/webhooks/:source
  → Verify signature
  → Store in webhook_events
  → Find affiliate_link by order_id or tracking code
  → Calculate commission
  → Create conversion record
  → Update affiliate_links stats
  → Mark webhook as processed
```

### 3. Shopping Cart Flow
```
User adds item to cart
  → POST /api/cart/add
  → Get or create cart (session-based)
  → Add cart_item with product + affiliate_link
  → Return updated cart

User checks out
  → POST /api/cart/checkout
  → Get all cart items
  → Generate checkout links (one per brand)
  → Mark cart as completed
  → Open brand sites in new tabs (redirect via affiliate links)
  → Track clicks for each item
```

### 4. Analytics Generation Flow
```
Cron job runs daily (midnight)
  → analyticsService.generateDailyStats()
  → Aggregate clicks, conversions, revenue by brand
  → Calculate conversion rates & AOV
  → Store in daily_stats table
  → Enable fast dashboard queries
```

## Key Design Decisions

### 1. **Session-Based Cart**
- Uses cookies to track sessions across pages
- No user login required initially
- 7-day cart expiration
- Can be linked to user_id when authentication is added

### 2. **Affiliate Link Structure**
- Short codes (8-char UUID prefix) for clean URLs
- Tracked URL includes all UTM parameters
- Original URL preserved for reference
- Click/conversion stats denormalized for performance

### 3. **Commission Calculation**
- Brand-specific rates stored in brands.commission_rate
- Calculated at conversion time
- Stored in conversions table for audit trail
- Status tracking: pending → confirmed → paid

### 4. **Analytics Strategy**
- Real-time queries for dashboard (with date filters)
- Daily aggregation for historical analysis
- Time series data generated on-demand
- Brand and product comparisons via JOINs

### 5. **Webhook Processing**
- All webhooks logged in webhook_events
- Idempotent processing (can replay)
- Error messages stored for debugging
- Signature verification for security

### 6. **UTM Tracking**
- Default parameters: utm_source=styleswap, utm_medium=referral
- Custom parameters per campaign
- Stored in clicks table for attribution
- Passed through to brand sites

## Scalability Considerations

### Current (MVP)
- Single PostgreSQL instance
- Synchronous webhook processing
- Session-based cookie tracking
- Direct API calls

### Future Optimizations
1. **Add Redis for:**
   - Session storage
   - Cart caching
   - Rate limiting
   - Real-time counters

2. **Add Message Queue (Bull/RabbitMQ) for:**
   - Async webhook processing
   - Batch conversion updates
   - Email notifications
   - Daily stats generation

3. **Add CDN for:**
   - Static assets (images, CSS, JS)
   - Cached dashboard data
   - Link redirects (with edge tracking)

4. **Database Optimization:**
   - Read replicas for analytics
   - Partitioning for clicks/conversions by date
   - Materialized views for dashboard
   - Connection pooling (already implemented)

5. **Monitoring:**
   - APM (New Relic, Datadog)
   - Error tracking (Sentry)
   - Real-time alerts
   - Conversion delay monitoring

## Security Measures

1. **API Security:**
   - Rate limiting (100 req/15min)
   - Helmet.js security headers
   - CORS whitelisting
   - Input validation

2. **Webhook Security:**
   - HMAC signature verification
   - IP whitelisting (future)
   - Replay protection
   - Error isolation

3. **Data Protection:**
   - Parameterized SQL queries (prevents injection)
   - No sensitive data in URLs
   - Session cookies with httpOnly flag
   - HTTPS in production (recommended)

4. **Privacy:**
   - IP address hashing option (future)
   - GDPR compliance ready
   - Data retention policies
   - User opt-out mechanism

## Tech Stack

- **Backend:** Node.js + Express
- **Database:** PostgreSQL 14+
- **Payment:** Stripe (ready to integrate)
- **Frontend:** Vanilla JS (easily replaceable with React/Vue)
- **Charts:** Chart.js
- **Security:** Helmet, CORS, Rate Limiting
- **Deployment:** Any Node.js host (Heroku, Vercel, AWS, etc.)

## API Design Patterns

1. **RESTful Routes:**
   - GET for reads
   - POST for creates
   - PUT for updates
   - DELETE for removals

2. **Consistent Response Format:**
   ```json
   {
     "success": true,
     "data": {...},
     "error": null
   }
   ```

3. **Error Handling:**
   - HTTP status codes
   - Descriptive error messages
   - Error logging
   - Graceful degradation

4. **Filtering & Pagination:**
   - Query parameters for filters
   - Date ranges for analytics
   - Limit/offset for lists
   - Brand-specific queries

## Future Enhancements

1. **Advanced Analytics:**
   - Cohort analysis
   - Customer lifetime value
   - Attribution modeling (first/last click)
   - A/B testing framework

2. **AI/ML Features:**
   - Product recommendations
   - Dynamic pricing optimization
   - Fraud detection
   - Conversion prediction

3. **Social Commerce:**
   - Influencer tracking codes
   - Social media integration
   - Share & earn features
   - Referral bonuses

4. **International:**
   - Multi-currency support
   - Geo-targeting
   - Local payment methods
   - Regional brand partnerships

5. **Mobile:**
   - Native mobile app
   - Deep linking
   - Push notifications
   - In-app purchases

---

**Architecture Version:** 1.0  
**Last Updated:** 2024-01-26  
**Status:** Production Ready (MVP)
