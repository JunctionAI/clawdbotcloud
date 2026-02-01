# Style Swap - Product Catalog System

A complete product catalog and affiliate management system for the Style Swap fashion platform, built with Supabase, Node.js/Express, and React.

## 🚀 Features

### Database (Supabase/PostgreSQL)
- **Brands Management**: Track brand partnerships, commission rates, and partnership tiers
- **Products Catalog**: Complete product information with images, pricing, and attributes
- **Categories**: Hierarchical category system with parent-child relationships
- **Affiliate Links**: Multiple affiliate links per product with tracking
- **Click Tracking**: Anonymous click tracking with session, user agent, and IP data
- **Conversion Tracking**: Track purchases, commissions, and revenue
- **Tags System**: Flexible tagging for products (trending, best-seller, etc.)

### API Backend (Node.js/Express)
- **RESTful API** with comprehensive endpoints
- **Rate limiting** and security with Helmet
- **Input validation** with express-validator
- **CORS** configuration
- **Analytics endpoints** for insights and reporting
- **Search functionality** with full-text search support

### Admin Panel (React + Vite)
- **Dashboard**: Overview of key metrics and quick actions
- **Product Management**: CRUD operations for products
- **Brand Management**: Manage brand partnerships
- **Categories View**: Hierarchical category display
- **Analytics Dashboard**: Performance metrics and top products
- **Responsive Design**: Built with Tailwind CSS

## 📁 Project Structure

```
style-swap-backend/
├── database/
│   ├── migrations/
│   │   └── 001_initial_schema.sql    # Complete database schema
│   └── seed/
│       └── seed_data.sql              # Sample data for testing
├── api/
│   ├── config/
│   │   └── supabase.js                # Supabase client configuration
│   ├── routes/
│   │   ├── products.js                # Product endpoints
│   │   ├── brands.js                  # Brand endpoints
│   │   ├── categories.js              # Category endpoints
│   │   ├── affiliates.js              # Affiliate tracking endpoints
│   │   └── analytics.js               # Analytics endpoints
│   ├── server.js                      # Express server setup
│   ├── package.json
│   ├── .env.example
│   └── database-functions.sql         # Helper SQL functions
├── admin/
│   ├── src/
│   │   ├── components/
│   │   │   └── Layout.jsx             # Main layout with sidebar
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── ProductForm.jsx
│   │   │   ├── Brands.jsx
│   │   │   ├── BrandForm.jsx
│   │   │   ├── Categories.jsx
│   │   │   └── Analytics.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
└── docs/
    └── (documentation files)
```

## 🛠️ Installation & Setup

### 1. Database Setup (Supabase)

1. Create a new Supabase project at https://supabase.com
2. Run the migration script in the SQL editor:
   ```sql
   -- Copy and paste contents of database/migrations/001_initial_schema.sql
   ```
3. (Optional) Run the seed data for testing:
   ```sql
   -- Copy and paste contents of database/seed/seed_data.sql
   ```
4. Run the helper functions:
   ```sql
   -- Copy and paste contents of api/database-functions.sql
   ```

### 2. API Setup

```bash
cd api
npm install

# Create .env file
cp .env.example .env

# Edit .env with your Supabase credentials:
# SUPABASE_URL=your-project-url
# SUPABASE_ANON_KEY=your-anon-key
# SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Start the API server
npm run dev
```

The API will run on http://localhost:3000

### 3. Admin Panel Setup

```bash
cd admin
npm install

# Start the dev server
npm run dev
```

The admin panel will run on http://localhost:5173

## 📚 API Endpoints

### Products
- `GET /api/products` - List products (with filtering & pagination)
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/slug/:slug` - Get product by slug
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Soft delete product (Admin)

### Brands
- `GET /api/brands` - List all brands
- `GET /api/brands/:id` - Get brand by ID
- `POST /api/brands` - Create brand (Admin)
- `PUT /api/brands/:id` - Update brand (Admin)
- `DELETE /api/brands/:id` - Soft delete brand (Admin)

### Categories
- `GET /api/categories` - List categories (hierarchical)
- `GET /api/categories/:id` - Get category with products
- `POST /api/categories` - Create category (Admin)
- `PUT /api/categories/:id` - Update category (Admin)

### Affiliate Links
- `POST /api/affiliates/track-click` - Track affiliate link click
- `POST /api/affiliates/track-conversion` - Track conversion (Admin)
- `GET /api/affiliates/product/:product_id` - Get product's affiliate links
- `POST /api/affiliates` - Create affiliate link (Admin)

### Analytics
- `GET /api/analytics/overview` - Overall analytics overview
- `GET /api/analytics/top-products` - Top performing products
- `GET /api/analytics/product/:product_id` - Product-specific analytics
- `GET /api/analytics/brand/:brand_id` - Brand-specific analytics

## 🗄️ Database Schema

### Key Tables

**brands**
- Brand information and partnership details
- Commission rates and partnership tiers
- Contact information

**products**
- Product details (name, description, price, images)
- Attributes (color, gender, season, size)
- SEO fields (meta title, description)
- Stock status and featured flag

**categories**
- Hierarchical category system
- Parent-child relationships
- Sort ordering

**affiliate_links**
- Multiple retailers per product
- Affiliate network tracking
- Performance metrics (clicks, conversions, revenue)

**click_tracking**
- Anonymous tracking of each click
- Session ID, user agent, IP address
- Geographic data (optional)
- Conversion status

**conversion_tracking**
- Purchase tracking with order details
- Commission calculations
- Approval workflow (pending/approved/rejected/paid)

## 🔐 Security Features

- **Row Level Security (RLS)** enabled on all tables
- **Public read access** for active items only
- **Admin-only write access** with role-based policies
- **Rate limiting** on API endpoints
- **Input validation** on all routes
- **CORS** configuration
- **Helmet** security headers

## 📊 Analytics & Tracking

### Click Tracking
When a user clicks an affiliate link:
1. POST to `/api/affiliates/track-click` with `affiliate_link_id`
2. System records click with session data
3. Returns redirect URL
4. Click count incremented on affiliate link

### Conversion Tracking
When a purchase is confirmed:
1. POST to `/api/affiliates/track-conversion` (typically via webhook)
2. Records order value and commission
3. Updates affiliate link stats
4. Links to original click if session ID matches

## 🎨 Admin Panel Features

- **Responsive Design**: Works on desktop and mobile
- **Real-time Updates**: Instant feedback on all actions
- **Form Validation**: Client-side validation with react-hook-form
- **Toast Notifications**: Success/error messages with react-hot-toast
- **Search & Filtering**: Easy product discovery
- **Image Previews**: Visual product management
- **Analytics Dashboard**: Key metrics at a glance

## 🚀 Deployment

### API Deployment
- Deploy to Vercel, Railway, Heroku, or any Node.js hosting
- Set environment variables in hosting platform
- Update CORS origins for production

### Admin Panel Deployment
- Build: `npm run build`
- Deploy `dist` folder to Vercel, Netlify, or static hosting
- Update API base URL if needed

### Database
- Supabase handles hosting and scaling automatically
- Consider enabling Point-in-Time Recovery for production
- Set up automated backups

## 📝 Environment Variables

### API (.env)
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
PORT=3000
NODE_ENV=production
ALLOWED_ORIGINS=https://admin.yoursite.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 🤝 Contributing

1. Create feature branches
2. Write clear commit messages
3. Test thoroughly before submitting
4. Update documentation as needed

## 📄 License

MIT License - feel free to use for commercial projects

## 🆘 Support

For issues or questions:
1. Check the documentation
2. Review the API responses for error details
3. Check Supabase logs for database issues
4. Ensure all environment variables are set correctly

---

Built with ❤️ for Style Swap
