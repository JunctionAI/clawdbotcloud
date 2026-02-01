# 02 - Domain & DNS Configuration

Complete guide to setting up a custom domain with SSL for Style Swap.

## Prerequisites

- Vercel project deployed (see `01-vercel-setup.md`)
- Domain name registered (e.g., from Namecheap, GoDaddy, Cloudflare)
- Access to your domain's DNS settings

## Step 1: Add Domain in Vercel

1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** → **Domains**
3. Click **Add Domain**
4. Enter your domain:
   - `styleswap.com` (root domain)
   - `www.styleswap.com` (www subdomain)

## Step 2: Configure DNS Records

Vercel will show you the required DNS records. You'll need to add these to your domain registrar.

### Option A: Using Vercel Nameservers (Recommended - Easiest)

**Advantages**: Automatic SSL, faster propagation, managed by Vercel

1. In Vercel, choose **Use Vercel Nameservers**
2. Copy the nameservers provided (usually `ns1.vercel-dns.com`, `ns2.vercel-dns.com`)
3. Go to your domain registrar
4. Find **Nameserver Settings** or **DNS Management**
5. Replace existing nameservers with Vercel's:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```
6. Save changes
7. Wait 24-48 hours for DNS propagation (usually faster)

### Option B: Using Custom DNS (Your Registrar)

**Advantages**: Keep existing email/DNS setup, more control

#### For Root Domain (styleswap.com)

Add an **A Record**:
```
Type: A
Name: @ (or leave blank)
Value: 76.76.21.21
TTL: 3600 (or Auto)
```

#### For WWW Subdomain (www.styleswap.com)

Add a **CNAME Record**:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600 (or Auto)
```

### Option C: Using Cloudflare (Recommended for Advanced Users)

**Advantages**: Free DDoS protection, additional caching, analytics

1. **Transfer DNS to Cloudflare**:
   - Add site to Cloudflare
   - Update nameservers at registrar to Cloudflare's
   - Wait for activation (usually 5-30 minutes)

2. **Configure DNS in Cloudflare**:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   Proxy: ✅ Enabled (orange cloud)
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   Proxy: ✅ Enabled (orange cloud)
   ```

3. **Cloudflare Settings**:
   - **SSL/TLS**: Full (strict)
   - **Auto HTTPS Rewrites**: On
   - **Always Use HTTPS**: On
   - **Minimum TLS Version**: 1.2
   - **Automatic HTTPS Rewrites**: On

## Step 3: Verify DNS Configuration

### Check DNS Propagation

Use online tools:
- https://dnschecker.org
- https://www.whatsmydns.net

Or use command line:
```bash
# Check A record
nslookup styleswap.com

# Check CNAME record
nslookup www.styleswap.com

# Detailed DNS query
dig styleswap.com
dig www.styleswap.com
```

### Expected Results
```
styleswap.com → 76.76.21.21 (Vercel IP)
www.styleswap.com → cname.vercel-dns.com → 76.76.21.21
```

## Step 4: SSL Certificate Setup

### Automatic SSL (Vercel)

Vercel automatically provisions SSL certificates via Let's Encrypt:
- **Root domain**: Automatic
- **WWW subdomain**: Automatic
- **Renewal**: Automatic (every 90 days)

Wait 5-15 minutes after DNS verification for SSL to activate.

### Verify SSL Certificate

1. Visit `https://styleswap.com`
2. Click the padlock icon in browser
3. Verify certificate is issued by **Let's Encrypt** or **Vercel**
4. Check expiration date (should be ~90 days out)

Online SSL checker:
```
https://www.ssllabs.com/ssltest/analyze.html?d=styleswap.com
```

Target grade: **A or A+**

## Step 5: Configure WWW Redirect

Choose your canonical domain (SEO best practice):

### Option 1: Redirect www → non-www (Recommended)

In Vercel Dashboard:
1. Go to **Settings** → **Domains**
2. Find `www.styleswap.com`
3. Click **Edit** → **Redirect to styleswap.com**

### Option 2: Redirect non-www → www

If you prefer `www.styleswap.com` as primary:
1. Set `styleswap.com` to redirect to `www.styleswap.com`

**Important**: Only ONE should be the primary. The other should redirect.

## Step 6: Update Environment Variables

Update your site URL in Vercel:

```bash
vercel env add NEXT_PUBLIC_SITE_URL production
# When prompted, enter: https://styleswap.com
```

Also update in `.env.production`:
```env
NEXT_PUBLIC_SITE_URL=https://styleswap.com
NEXT_PUBLIC_API_URL=https://styleswap.com/api
```

## Step 7: Test Domain Configuration

Run these checks:

### ✅ HTTP → HTTPS Redirect
```bash
curl -I http://styleswap.com
# Should return 301/308 redirect to https://
```

### ✅ WWW Redirect
```bash
curl -I https://www.styleswap.com
# Should redirect to https://styleswap.com (or vice versa)
```

### ✅ SSL Certificate Valid
```bash
curl https://styleswap.com
# Should return HTML without SSL errors
```

### ✅ Page Loads Correctly
- Visit `https://styleswap.com` in browser
- Check for mixed content warnings (F12 console)
- Verify all assets load over HTTPS

## Common DNS Providers - Quick Setup

### Namecheap
1. Dashboard → Manage Domain
2. Advanced DNS → Add New Record
3. Add A/CNAME records as specified above

### GoDaddy
1. My Products → DNS → Manage Zones
2. Add Record
3. Add A/CNAME records as specified above

### Google Domains
1. DNS → Custom records
2. Add A/CNAME records as specified above

### Cloudflare
1. DNS → Add record
2. Enable proxy (orange cloud) for CDN benefits

## Troubleshooting

### SSL Certificate Not Provisioning
- Wait 15-30 minutes after DNS verification
- Check DNS is pointing correctly
- Remove and re-add domain in Vercel
- Check for CAA records blocking Let's Encrypt

### Mixed Content Warnings
- Update hardcoded HTTP URLs to HTTPS
- Use relative URLs: `/images/logo.png` instead of `http://...`
- Check third-party resources use HTTPS

### Domain Shows "Not Found"
- Verify DNS propagation complete
- Check domain is added in Vercel
- Clear browser cache
- Try incognito/private browsing

### Redirect Loop
- Check you don't have conflicting redirects in:
  - Vercel settings
  - Cloudflare settings
  - `.htaccess` or server config

## Email Setup (Optional)

If you want email@styleswap.com:

### Using Google Workspace
Add MX records:
```
Priority: 1  → ASPMX.L.GOOGLE.COM
Priority: 5  → ALT1.ASPMX.L.GOOGLE.COM
Priority: 5  → ALT2.ASPMX.L.GOOGLE.COM
Priority: 10 → ALT3.ASPMX.L.GOOGLE.COM
Priority: 10 → ALT4.ASPMX.L.GOOGLE.COM
```

### Using Cloudflare Email Routing (Free)
1. Enable Email Routing in Cloudflare
2. Add destination address
3. Create forwarding rules
4. MX records added automatically

## Security Headers

These are configured in `vercel.json` (see `01-vercel-setup.md`):
- ✅ X-Content-Type-Options: nosniff
- ✅ X-Frame-Options: DENY
- ✅ X-XSS-Protection: 1; mode=block
- ✅ Referrer-Policy: strict-origin-when-cross-origin
- ✅ Permissions-Policy: restrictive

Verify at: https://securityheaders.com/?q=styleswap.com

## Next Steps

✅ Domain configured with SSL  
➡️ **Next**: Configure environment variables in `03-environment-vars.md`
