# 👔 Style Swap - AI Fashion Try-On

A cutting-edge AI-powered fashion try-on application built with Next.js 14, leveraging Gemini 2.5 Flash for intelligent virtual clothing visualization.

## ✨ Features

- 📸 **Upload Selfie** - Take or upload a clear front-facing photo
- 👕 **Browse Catalog** - Explore curated clothing collection with smart filtering
- 🤖 **AI Try-On** - Powered by Gemini 2.5 Flash (Nano Banana) API
- ⚡ **Before/After Comparison** - Interactive slider to compare looks
- 📱 **Mobile-First Design** - Optimized for all devices
- 🌙 **Dark UI** - Modern, eye-friendly interface
- 🎭 **Smooth Animations** - Framer Motion powered transitions

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **AI**: Google Gemini 2.5 Flash API
- **Language**: TypeScript
- **Image Handling**: Next.js Image Optimization

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Gemini API Key ([Get one here](https://makersuite.google.com/app/apikey))

## 🛠️ Installation

1. **Clone or navigate to the project**:
   ```bash
   cd ~/clawd/projects/style-swap
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file and add your Gemini API key:
   ```env
   NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
style-swap/
├── app/
│   ├── components/        # React components
│   │   ├── UploadZone.tsx
│   │   ├── ClothingCatalog.tsx
│   │   └── ComparisonSlider.tsx
│   ├── data/              # Static data
│   │   └── clothing.ts
│   ├── lib/               # Utilities
│   │   └── gemini.ts      # AI integration
│   ├── types/             # TypeScript types
│   │   └── index.ts
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page
├── public/                # Static assets
├── .env.local             # Environment variables
├── tailwind.config.ts     # Tailwind configuration
└── package.json           # Dependencies
```

## 🎨 Key Components

### UploadZone
Handles image upload via drag-and-drop or file selection with preview.

### ClothingCatalog
Displays clothing items with category filtering and selection.

### ComparisonSlider
Interactive before/after slider for comparing original and AI-generated images.

## 🤖 AI Integration

The app uses Gemini 2.5 Flash for:
- Virtual try-on generation
- Style analysis
- Clothing recommendations

**Note**: The current implementation uses Gemini's vision capabilities. For production-grade virtual try-on, consider integrating specialized image generation models or services like:
- Stable Diffusion with ControlNet
- Midjourney API
- Custom-trained fashion models

## 🎯 Usage

1. **Upload a selfie** - Click or drag a photo into the upload zone
2. **Browse catalog** - Filter by category and select clothing items
3. **View results** - Use the slider to compare before/after
4. **Share or download** - Save your new look!

## 🔒 Privacy

All image processing happens through secure API calls. Images are not stored on our servers.

## 🚧 Roadmap

- [ ] Advanced pose detection
- [ ] Multiple clothing items at once
- [ ] User accounts and saved looks
- [ ] Social sharing integration
- [ ] AR try-on mode
- [ ] Custom clothing uploads
- [ ] Style recommendations based on body type

## 🐛 Known Limitations

- Current AI integration uses Gemini's vision model which is optimized for analysis rather than image generation
- For production, integrate with specialized virtual try-on APIs
- Image quality depends on input photo clarity and lighting

## 📝 License

MIT License - feel free to use this project for learning and development.

## 🤝 Contributing

Contributions welcome! Please open an issue or PR.

## 💡 Tips for Best Results

- Use well-lit, front-facing photos
- Stand against a plain background
- Ensure full body or upper body is visible
- Avoid baggy clothing for accurate fitting

---

Built with 💜 using Next.js 14, Tailwind CSS, Framer Motion, and Gemini AI
