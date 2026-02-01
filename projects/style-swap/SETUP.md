# 🚀 Quick Setup Guide

## Prerequisites Check
- ✅ Node.js 18+ installed
- ✅ npm or yarn available
- ✅ Gemini API key ready

## Step-by-Step Setup

### 1. Get Your Gemini API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

### 2. Configure Environment
Open `.env.local` and replace the placeholder:
```env
NEXT_PUBLIC_GEMINI_API_KEY=your_actual_api_key_here
```

### 3. Install & Run
```bash
# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

### 4. Open Browser
Navigate to: **http://localhost:3000**

## 🎯 First Time Usage

1. **Upload a selfie**
   - Click the upload zone or drag & drop
   - Use a well-lit, front-facing photo
   - Best results with plain background

2. **Browse catalog**
   - Click on category filters
   - Select any clothing item

3. **View results**
   - AI will analyze the combination
   - Use the slider to compare before/after
   - Share or download your new look!

## 🔧 Troubleshooting

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### API Issues
- Verify your API key is correct in `.env.local`
- Check your Gemini API quota
- Ensure `.env.local` is not committed to git

### Image Loading Issues
- Check browser console for CORS errors
- Ensure images are publicly accessible
- Try different image formats (JPG, PNG)

### Port Already in Use
```bash
# Use a different port
npm run dev -- -p 3001
```

## 📱 Mobile Testing

### Local Network Access
1. Find your local IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. Update Next.js config to allow external access
3. Access from mobile: `http://YOUR_IP:3000`

### Ngrok (for external testing)
```bash
ngrok http 3000
```

## 🎨 Customization

### Change Color Scheme
Edit `tailwind.config.ts`:
```typescript
colors: {
  'accent-purple': '#your-color',
  'accent-pink': '#your-color',
}
```

### Add More Clothing
Edit `app/data/clothing.ts` and add items to the `clothingCatalog` array.

### Modify AI Prompts
Edit `app/lib/gemini.ts` to customize AI behavior.

## 📦 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Environment Variables in Production
Don't forget to set `NEXT_PUBLIC_GEMINI_API_KEY` in your hosting platform's environment variables.

## 🎓 Learning Resources

- [Next.js 14 Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Gemini API](https://ai.google.dev/docs)

## 💡 Tips

- Use high-quality selfies for best results
- Experiment with different lighting
- Try the comparison slider for dramatic reveals
- Share your creations on social media!

---

Need help? Check the main README.md or open an issue on GitHub.
