# Financial Dashboard Integration

Real-time tracking of all passive income streams in one place.

---

## 🎯 DASHBOARD OPTIONS

### Option 1: Notion Dashboard (Easiest)

**Pros:**
- Free
- Beautiful templates available
- Embedded charts via Chart.js or Flourish
- API integrations possible

**Setup:**
1. Duplicate [this template](https://www.notion.so/templates/passive-income-tracker)
2. Create databases for:
   - Revenue by stream
   - Monthly targets vs actual
   - Expenses
   - Profit margins
3. Manual updates or API integrations (see scripts below)

**Databases to Create:**

```
📊 Revenue Streams
├── Stream Name (Select: Micro-SaaS, Affiliate, Digital Products)
├── Month (Date)
├── Revenue (Number)
├── Expenses (Number)
├── Net Profit (Formula: Revenue - Expenses)
└── Growth % (Formula)

📈 Monthly Summary
├── Month (Date)
├── Total Revenue (Rollup from Revenue Streams)
├── Total Expenses (Rollup)
├── Net Profit (Formula)
├── MoM Growth (Formula)
└── Target vs Actual (Progress bar)

💰 Transactions (detailed)
├── Date (Date)
├── Stream (Relation to Revenue Streams)
├── Type (Select: Sale, Subscription, Commission)
├── Amount (Number)
├── Customer Email (Text)
└── Notes (Text)
```

---

### Option 2: Google Sheets + Looker Studio (Best for automation)

**Pros:**
- Free
- Real-time updates via API
- Beautiful dashboards with Looker Studio
- Easy sharing

**Setup:**

**Step 1: Create Google Sheet**

Template structure:
```
Sheet 1: Revenue (Daily)
| Date       | Stream        | Revenue | Expenses | Net | Source    |
|------------|---------------|---------|----------|-----|-----------|
| 2024-01-15 | Micro-SaaS    | 150     | 10       | 140 | Stripe    |
| 2024-01-15 | Affiliate     | 500     | 0        | 500 | ClickBank |
| 2024-01-15 | Digital       | 200     | 20       | 180 | Gumroad   |

Sheet 2: Monthly Summary
| Month   | Micro-SaaS | Affiliate | Digital | Total  | Target | % Complete |
|---------|-----------|-----------|---------|--------|--------|------------|
| Jan 24  | 4,500     | 2,000     | 1,800   | 8,300  | 10,000 | 83%        |
| Feb 24  | 6,000     | 3,200     | 2,600   | 11,800 | 12,000 | 98%        |

Sheet 3: Metrics
| Metric                    | Value  |
|---------------------------|--------|
| Current MRR               | 8,250  |
| Total Active Subscribers  | 550    |
| Avg. Affiliate Commission | 800    |
| Digital Products Sold     | 600    |
| Email List Size           | 15,000 |
```

**Step 2: Automate with Google Apps Script**

```javascript
// Code > Apps Script in Google Sheets

function updateFromApis() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Revenue');
  
  // Fetch from your analytics API
  const data = UrlFetchApp.fetch('https://your-api.com/daily-revenue');
  const json = JSON.parse(data.getContentText());
  
  // Append to sheet
  json.forEach(row => {
    sheet.appendRow([
      new Date(row.date),
      row.stream,
      row.revenue,
      row.expenses,
      row.net,
      row.source
    ]);
  });
}

// Set trigger: Edit > Current project's triggers > Add trigger
// Function: updateFromApis
// Event source: Time-driven
// Type: Day timer
// Time: 9-10am
```

**Step 3: Create Looker Studio Dashboard**

1. Go to [Looker Studio](https://lookerstudio.google.com/)
2. Create new report
3. Add data source: Your Google Sheet
4. Create visualizations:
   - **Scorecard:** Total monthly revenue
   - **Time series chart:** Revenue by stream over time
   - **Pie chart:** Revenue breakdown by stream
   - **Bar chart:** Top performing products/programs
   - **Table:** Recent transactions

**Dashboard Layout:**

```
┌─────────────────────────────────────────────────────┐
│  PASSIVE INCOME DASHBOARD                           │
│  Last updated: [Auto]                               │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐  │
│  │  MTD   │  │ Growth │  │  MRR   │  │ Target │  │
│  │ $8,300 │  │  +15%  │  │ $8,250 │  │  83%   │  │
│  └────────┘  └────────┘  └────────┘  └────────┘  │
│                                                     │
│  ┌─────────────────────────────────────────────┐  │
│  │  Revenue Trend (Last 6 Months)              │  │
│  │  [Line chart showing all 3 streams]         │  │
│  └─────────────────────────────────────────────┘  │
│                                                     │
│  ┌──────────────────┐  ┌──────────────────────┐  │
│  │ Stream Breakdown │  │ Recent Transactions  │  │
│  │ [Pie chart]      │  │ [Table]              │  │
│  └──────────────────┘  └──────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

---

### Option 3: Custom Dashboard (Advanced)

**Tech Stack:**
- Frontend: Next.js + TailwindCSS + Recharts
- Backend: Supabase (database + realtime)
- Hosting: Vercel (free)

**Features:**
- Real-time updates
- Custom metrics
- Mobile app (via Progressive Web App)
- Alerts/notifications

**Quick Setup:**

```bash
npx create-next-app@latest passive-income-dashboard
cd passive-income-dashboard
npm install @supabase/supabase-js recharts
```

**Simple Dashboard Component:**

```jsx
// components/Dashboard.jsx
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { LineChart, Line, PieChart, Pie } from 'recharts';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_KEY);

export default function Dashboard() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    fetchMetrics();
    
    // Realtime updates
    const subscription = supabase
      .channel('revenue-updates')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'sales' }, () => {
        fetchMetrics();
      })
      .subscribe();

    return () => subscription.unsubscribe();
  }, []);

  async function fetchMetrics() {
    const { data } = await supabase
      .from('portfolio_reports')
      .select('*')
      .order('report_date', { ascending: false })
      .limit(1)
      .single();

    setMetrics(data);
  }

  if (!metrics) return <div>Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Passive Income Dashboard</h1>
      
      <div className="grid grid-cols-4 gap-4 mb-8">
        <MetricCard title="Total Revenue" value={`$${metrics.total_revenue}`} />
        <MetricCard title="MRR" value={`$${metrics.report_data.details.microSaas.mrr}`} />
        <MetricCard title="Affiliate" value={`$${metrics.report_data.details.affiliate.totalCommissions}`} />
        <MetricCard title="Digital" value={`$${metrics.report_data.details.digitalProducts.totalNet}`} />
      </div>

      {/* Add charts here */}
    </div>
  );
}

function MetricCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
```

Deploy to Vercel:
```bash
vercel
```

---

## 📊 METRICS TO TRACK

### Core Metrics (Must Track)

**Overall:**
- Total monthly revenue
- Total monthly profit
- Month-over-month growth %
- Diversification score (how evenly distributed)

**Micro-SaaS:**
- MRR (Monthly Recurring Revenue)
- Active subscribers
- Churn rate
- ARPU (Average Revenue Per User)
- CAC (Customer Acquisition Cost)

**Affiliate:**
- Total commissions
- Number of sales
- Average commission per sale
- Traffic to affiliate site
- Conversion rate (visitors → sales)

**Digital Products:**
- Total sales
- Revenue per product
- Best-selling products
- Platform breakdown (Gumroad vs Etsy vs etc.)
- Refund rate

---

## 🔔 ALERTS & NOTIFICATIONS

Set up alerts for key events:

### Discord Webhook Alerts

Use the `analytics-aggregator.js` script to send:

**Daily:**
- New sale (any stream)
- New subscriber (Micro-SaaS)

**Weekly:**
- Revenue summary
- Top performing products/programs

**Monthly:**
- Full portfolio report
- Target vs actual comparison

**Critical:**
- Churn spike (>10% in a week)
- Payment failures
- Refund requests

### Setup Discord Webhook:

1. Go to Discord Server Settings > Integrations > Webhooks
2. Create webhook, copy URL
3. Add to `.env`: `DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...`
4. Run scripts with webhook configured (see automation scripts)

---

## 📱 MOBILE ACCESS

### Option 1: Notion Mobile App
- Download Notion app
- Access dashboard on-the-go

### Option 2: Google Sheets App
- Download Google Sheets app
- Pin your revenue sheet

### Option 3: Custom PWA
- Install your custom dashboard as app on phone
- Enable push notifications

---

## 🎯 DASHBOARD AUTOMATION WORKFLOW

**Daily (9 AM):**
```bash
# Cron job
0 9 * * * cd /path/to/scripts && node shared/analytics-aggregator.js
```

This script:
1. Fetches data from Stripe (Micro-SaaS)
2. Fetches data from Gumroad/Etsy (Digital Products)
3. Fetches data from affiliate networks
4. Updates Google Sheets / Supabase
5. Sends Discord notification if revenue > $X

**Weekly (Monday 9 AM):**
```bash
0 9 * * 1 cd /path/to/scripts && node digital-products/sales-dashboard.js
```

Sends weekly summary email + Discord message

**Monthly (1st of month, 10 AM):**
```bash
0 10 1 * * cd /path/to/scripts && node generate-monthly-report.js
```

Generates:
- PDF report
- Revenue vs target comparison
- Growth analysis
- Action items for next month

---

## 📈 SAMPLE DASHBOARD VIEWS

### Executive View (High-Level)
```
┌────────────────────────────────────────┐
│ MONTHLY REVENUE: $29,850               │
│ Target: $30,000 (99.5%)                │
│                                        │
│ ██████████████████████████████████░░░  │
│                                        │
│ MoM Growth: +18%                       │
│ Diversification: 87/100                │
└────────────────────────────────────────┘

Stream Performance:
• Micro-SaaS:    $8,250  (28%)  ↑ +12%
• Affiliate:     $9,600  (32%)  ↑ +25%
• Digital:      $12,000  (40%)  ↑ +15%
```

### Detailed View (Operator)
```
Micro-SaaS Metrics:
• Active subs: 550 (+30 this month)
• MRR: $8,250
• Churn: 4.2% (good)
• ARPU: $15

Affiliate Metrics:
• Sales: 12
• Avg commission: $800
• Traffic: 25,000 visits
• Conversion: 0.48%

Digital Products:
• Sales: 600
• Revenue: $12,000
• Top product: Financial Dashboard ($3,200)
• Platforms: Gumroad (55%), Etsy (30%), Other (15%)
```

---

## 🔄 INTEGRATION CHECKLIST

- [ ] Connect Stripe API (Micro-SaaS)
- [ ] Connect Gumroad API (Digital Products)
- [ ] Connect Etsy API (Digital Products)
- [ ] Connect affiliate network APIs (if available)
- [ ] Set up Google Sheets or Supabase database
- [ ] Create Looker Studio dashboard OR Notion template
- [ ] Configure Discord webhooks for alerts
- [ ] Set up daily cron jobs for data sync
- [ ] Test all integrations
- [ ] Create mobile access (app or PWA)

---

## 💡 PRO TIPS

1. **Track leading indicators:** Don't just track revenue—track traffic, signups, email list growth
2. **Set up goals:** Monthly targets for each stream + overall
3. **Review weekly:** Spend 30 minutes every Monday reviewing dashboard
4. **Automate everything:** Manual data entry = wasted time
5. **Share with accountability partner:** Makes you more likely to hit goals

---

**Next Steps:**
1. Choose your dashboard platform (Notion, Google Sheets, or custom)
2. Set up basic tracking (manual if needed initially)
3. Implement API integrations using provided scripts
4. Configure alerts
5. Review dashboard daily until it becomes habit
