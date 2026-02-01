# 🚀 Style Swap - Deployment Guide

## Choose Your Deployment Method

### 🏆 Method 1: Netlify (RECOMMENDED)

**Why**: Free, instant, auto-HTTPS, custom domain support, one command

**Steps**:
```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Navigate to project folder
cd ~/clawd/projects/style-swap-landing

# 3. Deploy (first time)
netlify deploy

# When prompted:
# - Create & configure a new site: YES
# - Publish directory: . (current folder)

# 4. View draft URL, then deploy to production
netlify deploy --prod

# 5. Done! Get your live URL like: https://style-swap.netlify.app
```

**Add Custom Domain** (optional):
```bash
netlify domains:add yourdomain.com
# Follow DNS instructions
```

**Advantages**:
- ✅ Free forever
- ✅ Instant deploys (30 seconds)
- ✅ Auto HTTPS/SSL
- ✅ CDN included
- ✅ Form handling built-in
- ✅ Custom domain support
- ✅ Continuous deployment from Git

---

### Method 2: Vercel

**Why**: Similar to Netlify, loved by developers

**Steps**:
```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Navigate to folder
cd ~/clawd/projects/style-swap-landing

# 3. Deploy
vercel

# Follow prompts, takes 1 minute

# Your site is live at: https://style-swap-xxx.vercel.app
```

**Advantages**:
- ✅ Free tier
- ✅ Zero config
- ✅ Auto HTTPS
- ✅ Global CDN
- ✅ Custom domains

---

### Method 3: GitHub Pages (FREE STATIC HOSTING)

**Why**: Direct from GitHub repo, 100% free

**Steps**:

1. **Create GitHub repo** (if you haven't):
   ```bash
   cd ~/clawd/projects/style-swap-landing
   git init
   git add .
   git commit -m "Style Swap landing page"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/style-swap.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to repo on GitHub.com
   - Click **Settings** > **Pages**
   - Source: **main branch**
   - Click **Save**
   - Wait 1-2 minutes

3. **Your site is live**:
   `https://YOUR_USERNAME.github.io/style-swap/`

**Add Custom Domain**:
- Settings > Pages > Custom domain
- Add your domain (e.g., `styleswap.ai`)
- Update DNS:
  ```
  A Record: 185.199.108.153
  A Record: 185.199.109.153
  A Record: 185.199.110.153
  A Record: 185.199.111.153
  ```

**Advantages**:
- ✅ 100% free
- ✅ Direct from Git
- ✅ Custom domains
- ✅ Auto-rebuild on push

---

### Method 4: Cloudflare Pages

**Why**: Fastest CDN, unlimited bandwidth

**Steps**:
1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Sign up / Sign in
3. Click **Create a project**
4. Connect GitHub or upload files
5. Deploy

**Advantages**:
- ✅ Free unlimited bandwidth
- ✅ Fastest global CDN
- ✅ HTTPS included
- ✅ Custom domains

---

### Method 5: Traditional Hosting (cPanel/FTP)

**For**: Shared hosting like Bluehost, HostGator, etc.

**Steps**:

1. **Via cPanel File Manager**:
   - Login to cPanel
   - Open **File Manager**
   - Navigate to `public_html/`
   - Click **Upload**
   - Upload `index.html`
   - Done! Visit: `http://yourdomain.com`

2. **Via FTP** (FileZilla):
   - Open FileZilla
   - Connect: `ftp.yourdomain.com`
   - Username/Password: from hosting provider
   - Upload `index.html` to `/public_html/`
   - Visit: `http://yourdomain.com`

**Advantages**:
- ✅ Works with existing hosting
- ✅ No new accounts needed
- ✅ Full control

---

## 📊 After Deployment Checklist

### Immediate (First 5 Minutes)

- [ ] **Test on mobile** - Open on your phone
- [ ] **Test all links** - Click every button/link
- [ ] **Check forms** - Try email signup
- [ ] **Verify HTTPS** - Should show padlock 🔒
- [ ] **Speed test** - Run PageSpeed Insights
- [ ] **Responsive test** - Resize browser window

### Within First Hour

- [ ] **Add to Google Search Console**
  ```
  - Go to: search.google.com/search-console
  - Add property: https://yourdomain.com
  - Verify ownership (HTML file or DNS)
  - Submit sitemap
  ```

- [ ] **Set up Analytics**
  ```html
  <!-- Add before </head> in index.html -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>
  ```

- [ ] **Test email signup** - Actually try subscribing
- [ ] **Set up 404 page** (optional)
- [ ] **Add robots.txt**:
  ```
  User-agent: *
  Allow: /
  Sitemap: https://yourdomain.com/sitemap.xml
  ```

### Within First Day

- [ ] **Share on social media** - Use your new graphics!
- [ ] **Post on Product Hunt** (if doing official launch)
- [ ] **Add to directory sites**:
  - Product Hunt
  - BetaList
  - Hacker News (Show HN)
  - Reddit (r/SideProject)
  - IndieHackers

- [ ] **Set up monitoring**:
  - UptimeRobot (free uptime monitoring)
  - Google Analytics (traffic)
  - Hotjar (user behavior - optional)

---

## 🔧 Custom Domain Setup

### Buy Domain (Recommended Registrars)

1. **Namecheap** - namecheap.com (~$10/year)
2. **Google Domains** - domains.google.com (~$12/year)
3. **Cloudflare** - cloudflare.com (~$9/year)
4. **Porkbun** - porkbun.com (~$8/year)

### Connect to Netlify

```bash
# After deploying to Netlify
netlify domains:add styleswap.ai

# Netlify will show DNS records to add:
# Add these at your registrar:

CNAME www styleswap.netlify.app
A @ 75.2.60.5

# Or use Netlify nameservers (easier):
dns1.p03.nsone.net
dns2.p03.nsone.net
dns3.p03.nsone.net
dns4.p03.nsone.net
```

### Connect to Vercel

1. Go to Vercel dashboard
2. Click your project > **Settings** > **Domains**
3. Add domain: `styleswap.ai`
4. Copy DNS records shown
5. Add to your registrar
6. Wait 5-10 minutes for propagation

### Connect to GitHub Pages

1. Repo **Settings** > **Pages** > **Custom domain**
2. Add: `styleswap.ai`
3. Add these A records at registrar:
   ```
   A @ 185.199.108.153
   A @ 185.199.109.153
   A @ 185.199.110.153
   A @ 185.199.111.153
   
   CNAME www YOUR_USERNAME.github.io
   ```
4. Wait 10-30 minutes

---

## 🚨 Troubleshooting

### "Site not loading"
- **Wait**: DNS can take 10-60 minutes
- **Check**: DNS propagation at whatsmydns.net
- **Clear**: Browser cache (Ctrl+Shift+R)
- **Try**: Incognito mode

### "HTTPS not working"
- **Netlify/Vercel**: Auto within 30 seconds
- **GitHub Pages**: Enable in Settings > Pages
- **Others**: Use Cloudflare (free SSL)

### "Slow loading"
- **Use CDN**: Netlify/Vercel include CDN
- **Optimize images**: Compress graphics before uploading
- **Enable caching**: Add Cache-Control headers
- **Minify HTML**: Use html-minifier

### "Form not working"
- **Netlify**: Add `netlify` attribute to form
- **Others**: Use FormSubmit.co (free)
- **Or**: Connect to backend API

---

## 📈 Post-Launch Optimization

### Week 1: Monitor

```bash
# Check analytics daily
- Page views
- Bounce rate
- Time on site
- Conversion rate (email signups)
```

### Week 2: Iterate

- A/B test headlines
- Try different CTA colors
- Adjust pricing display
- Tweak testimonials

### Week 3: Scale

- Run Facebook/Instagram ads
- Start content marketing
- Reach out to influencers
- Build email list

---

## 💰 Cost Breakdown

| Method | Cost | Domain | HTTPS | CDN | Custom Code |
|--------|------|--------|-------|-----|-------------|
| Netlify | FREE | +$10/yr | ✅ | ✅ | ✅ |
| Vercel | FREE | +$10/yr | ✅ | ✅ | ✅ |
| GitHub Pages | FREE | +$10/yr | ✅ | ❌ | ✅ |
| Cloudflare | FREE | +$9/yr | ✅ | ✅ | ✅ |
| Shared Hosting | ~$60/yr | Often free | ✅ | ❌ | ✅ |

**Recommended**: Netlify + Namecheap domain = **$10/year total**

---

## 🎯 Final Checklist Before Launch

- [ ] Landing page deployed and live
- [ ] Custom domain connected (optional but recommended)
- [ ] HTTPS enabled (padlock shows in browser)
- [ ] Google Analytics added
- [ ] Email form tested and working
- [ ] Mobile tested on real device
- [ ] All links work
- [ ] Marketing graphics generated (8 total)
- [ ] Social media accounts ready
- [ ] Launch post drafted
- [ ] Email to send list prepared

---

## 🚀 You're Ready!

**One-Command Deploy** (Netlify):
```bash
npm install -g netlify-cli && \
cd ~/clawd/projects/style-swap-landing && \
netlify deploy --prod
```

**Bookmark These**:
- Netlify Dashboard: app.netlify.com
- Google Analytics: analytics.google.com
- Search Console: search.google.com/search-console

---

**Need help?** Check README.md or open an issue!

**Good luck with your launch! 🎉**
