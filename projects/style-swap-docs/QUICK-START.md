# ⚡ Quick Start Guide - Style Swap Documentation

**Find what you need in 30 seconds or less!**

---

## 🎯 I want to...

### ...use the app
📖 **[User Guide](./1-USER-GUIDE.md)** → Section: Getting Started  
⏱️ **5 minutes to get started**

Quick steps:
1. Open the app
2. Upload a selfie (JPEG/PNG, max 10 MB)
3. Browse catalog
4. Click clothing item
5. Compare results with slider

---

### ...fix an error
🔧 **[Troubleshooting Guide](./9-TROUBLESHOOTING-GUIDE.md)**  
⏱️ **Find solution in 2 minutes**

Common issues:
- Upload failed? → [Section: Upload Issues](./9-TROUBLESHOOTING-GUIDE.md#issue-cant-upload-image)
- Slow processing? → [Section: Processing Timeouts](./9-TROUBLESHOOTING-GUIDE.md#issue-processing-takes-too-long)
- Poor quality? → [Section: Quality Issues](./9-TROUBLESHOOTING-GUIDE.md#issue-poor-try-on-quality)

---

### ...deploy the app
🚀 **[Deployment Guide](./3-DEPLOYMENT-GUIDE.md)** → Quick Deploy  
⏱️ **Deploy in 5 minutes**

```bash
# 1. Click "Deploy with Vercel" button in guide
# 2. Add NEXT_PUBLIC_GEMINI_API_KEY
# 3. Click Deploy
# Done!
```

---

### ...write code
💻 **[Developer Documentation](./2-DEVELOPER-DOCUMENTATION.md)**  
⏱️ **Get oriented in 10 minutes**

Essential sections:
1. [Architecture Overview](./2-DEVELOPER-DOCUMENTATION.md#architecture-overview)
2. [Component Documentation](./2-DEVELOPER-DOCUMENTATION.md#component-documentation)
3. [State Management](./2-DEVELOPER-DOCUMENTATION.md#state-management)

---

### ...write tests
🧪 **[Testing Suite Setup](./4-TESTING-SUITE-SETUP.md)**  
⏱️ **Setup in 15 minutes**

```bash
npm install --save-dev jest @testing-library/react
# Copy config from guide
npm test
```

Example tests: `tests/` directory

---

### ...contribute code
🤝 **[Contributing Guide](./10-CONTRIBUTING-GUIDE.md)**  
⏱️ **Start contributing in 20 minutes**

Quick setup:
```bash
git clone https://github.com/YOUR_USERNAME/style-swap.git
cd style-swap
npm install
cp .env.example .env.local
# Add your GEMINI_API_KEY
npm run dev
```

---

### ...use the API
🔌 **[API Documentation](./8-API-DOCUMENTATION.md)**  
⏱️ **First API call in 5 minutes**

```javascript
const response = await fetch('/api/try-on', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    selfieImage: 'data:image/jpeg;base64,...',
    clothingImage: 'data:image/jpeg;base64,...'
  })
});

const result = await response.json();
console.log(result.analysis);
```

---

### ...check security
🔒 **[Security Audit](./6-SECURITY-AUDIT-CHECKLIST.md)**  
⏱️ **Review in 15 minutes**

Priority items:
1. [API Key Security](./6-SECURITY-AUDIT-CHECKLIST.md#api-key-management)
2. [Rate Limiting](./6-SECURITY-AUDIT-CHECKLIST.md#rate-limiting)
3. [Input Validation](./6-SECURITY-AUDIT-CHECKLIST.md#input-validation)

---

### ...improve accessibility
♿ **[Accessibility Report](./7-ACCESSIBILITY-COMPLIANCE-REPORT.md)**  
⏱️ **Get overview in 10 minutes**

Current status: **95% WCAG 2.1 AA compliant**

Key improvements needed:
1. [Add skip link](./7-ACCESSIBILITY-COMPLIANCE-REPORT.md#skip-navigation-link-missing)
2. [Improve error messages](./7-ACCESSIBILITY-COMPLIANCE-REPORT.md#improve-error-messages)
3. [Enhance focus indicators](./7-ACCESSIBILITY-COMPLIANCE-REPORT.md#focus-indicators-could-be-more-prominent)

---

### ...optimize performance
⚡ **[Performance Report](./5-PERFORMANCE-BENCHMARKING.md)**  
⏱️ **Review in 10 minutes**

Current score: **87/100 (Good)**

Quick wins:
1. [Reduce API response time](./5-PERFORMANCE-BENCHMARKING.md#reduce-api-response-time)
2. [Optimize bundle size](./5-PERFORMANCE-BENCHMARKING.md#reduce-javascript-bundle)
3. [Add image compression](./5-PERFORMANCE-BENCHMARKING.md#add-image-compression)

---

## 📚 Full Documentation

**Browse everything**: [INDEX.md](./INDEX.md)  
**Overview**: [README.md](./README.md)  
**Completion details**: [COMPLETION-SUMMARY.md](./COMPLETION-SUMMARY.md)

---

## 🆘 Still Need Help?

**Can't find what you need?**

1. 🔍 Check [INDEX.md](./INDEX.md) for complete topic list
2. 📧 Email: support@styleswap.app
3. 💬 Discord: https://discord.gg/styleswap
4. 🐛 GitHub Issues: Report documentation gaps

---

## 📱 Mobile Users

Reading on mobile? Essential docs:
- [User Guide](./1-USER-GUIDE.md) (friendliest)
- [Troubleshooting](./9-TROUBLESHOOTING-GUIDE.md) (most helpful)
- [API Docs](./8-API-DOCUMENTATION.md) (code examples)

---

**Get started now!** Pick a link above and dive in. 🚀

*Updated: January 28, 2026*
