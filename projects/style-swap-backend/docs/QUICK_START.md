# Quick Start Guide

Get up and running with Style Swap in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works)
- Git (optional)

## Step 1: Setup Supabase (5 minutes)

1. Go to https://supabase.com and create a new project
2. Wait for the database to provision
3. Click on the SQL Editor in the sidebar
4. Copy the contents of `database/migrations/001_initial_schema.sql`
5. Paste and run in the SQL editor
6. (Optional) Run `database/seed/seed_data.sql` for sample data
7. Run `api/database-functions.sql` for helper functions
8. Go to Settings → API to get your keys

## Step 2: Setup API (2 minutes)

```bash
cd api
npm install

# Create .env file
cp .env.example .env
```

Edit `.env` with your Supabase credentials:
```env
SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbG...
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...
PORT=3000
```

Start the API:
```bash
npm run dev
```

Visit http://localhost:3000 - you should see the API info!

## Step 3: Setup Admin Panel (2 minutes)

Open a new terminal:

```bash
cd admin
npm install
npm run dev
```

Visit http://localhost:5173 - you should see the admin dashboard!

## Step 4: Test It Out

1. Go to the Brands page and add a new brand
2. Go to the Products page and add a new product
3. Check the Dashboard to see your stats
4. View Analytics to see performance metrics

## API Testing

Test the API with curl:

```bash
# Get all products
curl http://localhost:3000/api/products

# Get all brands
curl http://localhost:3000/api/brands

# Health check
curl http://localhost:3000/health
```

## Next Steps

- Customize the admin panel styling
- Add authentication (Supabase Auth)
- Set up your affiliate networks
- Deploy to production
- Connect your frontend application

## Troubleshooting

**API won't start:**
- Check your `.env` file has correct Supabase credentials
- Make sure port 3000 is available

**Admin panel won't start:**
- Make sure the API is running on port 3000
- Check for port conflicts on 5173

**Database errors:**
- Verify the migrations ran successfully
- Check Supabase logs in the dashboard
- Ensure RLS policies are set up correctly

**CORS errors:**
- Add your domain to `ALLOWED_ORIGINS` in `.env`
- Restart the API server after changes

## Need Help?

- Check the main README.md for detailed documentation
- Review API_DOCUMENTATION.md for endpoint details
- Check the Supabase logs for database issues
- Ensure all environment variables are set correctly

Happy building! 🚀
