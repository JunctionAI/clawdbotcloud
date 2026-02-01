# 🏗️ Style Swap Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────┐
│                     USER INTERFACE                       │
│                    (Next.js 14 App)                      │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                    MAIN PAGE (/)                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  Upload      │  │  Catalog     │  │  Comparison  │  │
│  │  Zone        │  │  Browser     │  │  Slider      │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                   STATE MANAGEMENT                       │
│  • selfie: UploadedSelfie | null                        │
│  • selectedClothing: ClothingItem | null                │
│  • tryOnResult: TryOnResult | null                      │
│  • isProcessing: boolean                                │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                    API LAYER                             │
│         /api/try-on (Next.js API Route)                 │
│  • Receives: selfie + clothing images                   │
│  • Calls: Gemini AI API                                 │
│  • Returns: Analysis + try-on result                    │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                 GEMINI AI SERVICE                        │
│              (Google Generative AI)                      │
│  • Model: gemini-2.0-flash-exp                          │
│  • Input: Multi-modal (images + text)                   │
│  • Output: Style analysis                               │
└─────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
app/
├── layout.tsx (Root Layout)
│   └── page.tsx (Main App)
│       ├── UploadZone
│       │   └── Image Preview
│       ├── ClothingCatalog
│       │   ├── Category Filter
│       │   └── Item Grid
│       │       └── Item Card
│       └── ComparisonSlider
│           ├── Before Image
│           ├── After Image
│           └── Slider Handle
```

## Data Flow

### 1. Upload Phase
```
User selects image
    ↓
FileReader converts to base64
    ↓
State updates: selfie = { file, preview, uploaded: true }
    ↓
UploadZone shows preview
```

### 2. Selection Phase
```
User clicks clothing item
    ↓
State updates: selectedClothing = item
    ↓
Catalog highlights selection
    ↓
Triggers try-on process
```

### 3. Try-On Phase
```
handleClothingSelect()
    ↓
setState: isProcessing = true
    ↓
fetchImageAsBase64(clothing.imageUrl)
    ↓
Call: generateTryOn({ selfie, clothing })
    ↓
API Route: /api/try-on (POST)
    ↓
Gemini AI: analyzeImages()
    ↓
Response: { tryOnImage, analysis }
    ↓
setState: tryOnResult = { ... }
    ↓
ComparisonSlider displays result
```

## State Machine

```
┌─────────────┐
│   Initial   │ No selfie uploaded
└─────────────┘
      │
      │ User uploads selfie
      ▼
┌─────────────┐
│   Ready     │ Selfie ready, catalog browsable
└─────────────┘
      │
      │ User selects clothing
      ▼
┌─────────────┐
│ Processing  │ AI generating try-on
└─────────────┘
      │
      │ AI completes
      ▼
┌─────────────┐
│   Result    │ Showing comparison
└─────────────┘
      │
      │ User clicks "Try Another"
      ▼
┌─────────────┐
│   Ready     │ (back to catalog)
└─────────────┘
```

## API Architecture

### Client → Server
```typescript
POST /api/try-on
Content-Type: application/json

{
  "selfieImage": "data:image/jpeg;base64,...",
  "clothingImage": "data:image/jpeg;base64,..."
}
```

### Server → Client
```typescript
200 OK
Content-Type: application/json

{
  "success": true,
  "tryOnImage": "data:image/jpeg;base64,...",
  "analysis": "Style analysis text...",
  "message": "AI analysis complete"
}
```

### Error Response
```typescript
500 Internal Server Error
Content-Type: application/json

{
  "error": "Failed to process try-on request",
  "details": "API key not configured"
}
```

## Type System

```typescript
// Core types
interface ClothingItem {
  id: string
  name: string
  category: 'tops' | 'bottoms' | 'dresses' | 'outerwear' | 'accessories'
  imageUrl: string
  thumbnail: string
  description: string
  tags: string[]
}

interface UploadedSelfie {
  file: File
  preview: string  // base64 data URL
  uploaded: boolean
}

interface TryOnResult {
  originalImage: string
  tryOnImage: string
  timestamp: number
  clothingItem: ClothingItem
  processing: boolean
  error?: string
}
```

## Styling Architecture

```
Tailwind CSS
    ├── tailwind.config.ts (Custom theme)
    ├── globals.css (Base styles)
    └── Component classes (Inline)
        ├── Utility classes
        ├── Custom animations
        └── Responsive variants
```

### Design Tokens
```css
/* Colors */
--background: #0a0a0a
--dark-card: #151515
--dark-border: #252525
--accent-purple: #a855f7
--accent-pink: #ec4899

/* Animations */
fade-in: 0.5s ease-in-out
slide-up: 0.5s ease-out
pulse-slow: 3s infinite
```

## Performance Optimizations

1. **Image Optimization**
   - Next.js Image component with automatic optimization
   - Responsive image loading
   - Lazy loading for catalog items

2. **Code Splitting**
   - Dynamic imports for heavy components
   - Route-based splitting (automatic)
   - Lazy-loaded Framer Motion animations

3. **Caching Strategy**
   - Static generation for catalog data
   - API response caching (to be implemented)
   - Browser image caching

4. **Bundle Size**
   - Tree-shaking with Turbopack
   - Minimal dependencies
   - CSS purging in production

## Security Model

```
Client Side:
  ├── Input validation (file types, sizes)
  ├── XSS prevention (sanitized inputs)
  └── CORS protection

Server Side:
  ├── API key isolation (.env.local)
  ├── Request validation
  ├── Rate limiting (to be implemented)
  └── Error sanitization

External:
  ├── HTTPS only
  ├── Secure headers
  └── No data persistence
```

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      VERCEL CDN                          │
│  • Static assets (images, CSS, JS)                      │
│  • Edge caching                                          │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                  VERCEL SERVERLESS                       │
│  • Next.js App                                          │
│  • API Routes                                           │
│  • Environment Variables                                │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                   GEMINI API                             │
│  • Google Cloud Infrastructure                          │
│  • Rate limited                                         │
│  • Usage billing                                        │
└─────────────────────────────────────────────────────────┘
```

## Scaling Considerations

### Current: Single User
- Client-side state management
- No database required
- Direct API calls

### Future: Multi-User
- Add database (Postgres/MongoDB)
- User authentication (NextAuth.js)
- Session management
- Saved looks history
- Social features

### High Traffic
- Redis caching layer
- CDN for user-generated content
- Queue system for AI requests
- Load balancing
- Monitoring (DataDog/New Relic)

## Development Workflow

```
Local Development
    ├── npm run dev (Turbopack)
    ├── Hot reload
    └── TypeScript checking

Build Process
    ├── npm run build
    ├── Type checking
    ├── Linting
    ├── Optimization
    └── Static generation

Deployment
    ├── Push to Git
    ├── Vercel auto-deploy
    ├── Environment variables
    └── Production URL
```

## Monitoring & Debugging

```
Development:
  ├── Next.js DevTools
  ├── React DevTools
  ├── Browser Console
  └── Network Tab

Production:
  ├── Vercel Analytics (to add)
  ├── Error tracking (Sentry - to add)
  ├── Performance monitoring
  └── User analytics
```

---

**Architecture Version**: 1.0
**Last Updated**: January 28, 2026
**Status**: Production Ready ✅
