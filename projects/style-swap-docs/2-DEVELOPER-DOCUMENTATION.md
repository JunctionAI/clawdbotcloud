# 🛠️ Style Swap - Developer Documentation

**Version**: 1.0.0  
**Last Updated**: January 28, 2026  
**For**: Developers & Contributors

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Component Documentation](#component-documentation)
5. [API Reference](#api-reference)
6. [State Management](#state-management)
7. [Type System](#type-system)
8. [Utilities & Helpers](#utilities--helpers)
9. [Styling Guide](#styling-guide)
10. [Development Workflow](#development-workflow)

---

## Architecture Overview

### System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  FRONTEND (Next.js 14)                   │
│  ┌──────────────────────────────────────────────────┐  │
│  │           React Components Layer                  │  │
│  │  • UploadZone  • ClothingCatalog  • Comparison   │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │           State Management (useState)             │  │
│  │  • selfie  • selectedClothing  • tryOnResult     │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │              Client Libraries                     │  │
│  │  • Framer Motion  • Image Processing             │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                           │
                           │ HTTP/HTTPS
                           ▼
┌─────────────────────────────────────────────────────────┐
│              API ROUTES (Serverless)                     │
│  ┌──────────────────────────────────────────────────┐  │
│  │         /api/try-on (POST)                        │  │
│  │  • Input validation  • Image processing          │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                           │
                           │ API Call
                           ▼
┌─────────────────────────────────────────────────────────┐
│           EXTERNAL SERVICES                              │
│  ┌──────────────────────────────────────────────────┐  │
│  │      Google Gemini 2.5 Flash API                  │  │
│  │  • Vision processing  • Style analysis           │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Data Flow

```
1. User uploads selfie
   └→ File → FileReader → Base64 → State (selfie)

2. User selects clothing
   └→ Click → State update → Trigger try-on

3. Try-on process
   └→ Fetch clothing image
   └→ POST /api/try-on {selfie, clothing}
   └→ Gemini AI processing
   └→ Response → State (tryOnResult)
   └→ Render ComparisonSlider
```

---

## Tech Stack

### Core Framework

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.1.6 | React framework with App Router |
| React | 19.2.3 | UI library |
| TypeScript | 5.x | Type safety |

### Styling & Animation

| Technology | Version | Purpose |
|------------|---------|---------|
| Tailwind CSS | 4.x | Utility-first styling |
| Framer Motion | 12.29.2 | Animations & transitions |
| PostCSS | 4.x | CSS processing |

### AI & APIs

| Technology | Version | Purpose |
|------------|---------|---------|
| @google/generative-ai | 0.24.1 | Gemini AI integration |

### Development Tools

| Technology | Version | Purpose |
|------------|---------|---------|
| ESLint | 9.x | Code linting |
| TypeScript ESLint | Latest | TS-specific linting |

---

## Project Structure

```
style-swap/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   └── try-on/
│   │       └── route.ts          # Try-on endpoint
│   ├── components/               # React Components
│   │   ├── ClothingCatalog.tsx
│   │   ├── ComparisonSlider.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── UploadZone.tsx
│   ├── data/                     # Static Data
│   │   └── clothing.ts           # Clothing catalog
│   ├── lib/                      # Utilities
│   │   └── gemini.ts             # AI integration
│   ├── types/                    # TypeScript Types
│   │   └── index.ts
│   ├── favicon.ico
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main page
├── public/                       # Static Assets
│   └── images/                   # Clothing images
├── .env.local                    # Environment variables
├── .gitignore
├── eslint.config.mjs             # ESLint configuration
├── next.config.js                # Next.js configuration
├── package.json                  # Dependencies
├── postcss.config.mjs            # PostCSS configuration
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # Project overview
```

---

## Component Documentation

### 1. UploadZone Component

**File**: `app/components/UploadZone.tsx`

**Purpose**: Handles image upload via drag-and-drop or file selection.

**Props**:
```typescript
interface UploadZoneProps {
  onImageUpload: (file: File, preview: string) => void;
  currentImage: string | null;
}
```

**State**:
```typescript
const [isDragging, setIsDragging] = useState(false);
```

**Key Functions**:

```typescript
// Handle file selection
const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) processFile(file);
};

// Process uploaded file
const processFile = (file: File) => {
  if (file.size > 10 * 1024 * 1024) {
    alert('File too large. Maximum 10MB.');
    return;
  }
  
  const reader = new FileReader();
  reader.onloadend = () => {
    const preview = reader.result as string;
    onImageUpload(file, preview);
  };
  reader.readAsDataURL(file);
};

// Drag and drop handlers
const handleDragOver = (e: React.DragEvent) => {
  e.preventDefault();
  setIsDragging(true);
};

const handleDrop = (e: React.DragEvent) => {
  e.preventDefault();
  setIsDragging(false);
  const file = e.dataTransfer.files[0];
  if (file) processFile(file);
};
```

**Usage**:
```tsx
<UploadZone
  onImageUpload={(file, preview) => {
    setSelfie({ file, preview, uploaded: true });
  }}
  currentImage={selfie?.preview || null}
/>
```

---

### 2. ClothingCatalog Component

**File**: `app/components/ClothingCatalog.tsx`

**Purpose**: Display and filter clothing items, handle selection.

**Props**:
```typescript
interface ClothingCatalogProps {
  onItemSelect: (item: ClothingItem) => void;
  disabled?: boolean;
  selectedItem?: ClothingItem | null;
}
```

**State**:
```typescript
const [selectedCategory, setSelectedCategory] = useState<string>('all');
const [filteredItems, setFilteredItems] = useState<ClothingItem[]>(clothingData);
```

**Key Functions**:

```typescript
// Filter items by category
const filterByCategory = (category: string) => {
  setSelectedCategory(category);
  
  if (category === 'all') {
    setFilteredItems(clothingData);
  } else {
    setFilteredItems(
      clothingData.filter(item => item.category === category)
    );
  }
};

// Handle item selection
const handleItemClick = (item: ClothingItem) => {
  if (!disabled) {
    onItemSelect(item);
  }
};
```

**Categories**:
- `all` - Show all items
- `tops` - Shirts, t-shirts, blouses
- `bottoms` - Pants, shorts, skirts
- `dresses` - All dress styles
- `outerwear` - Jackets, coats
- `accessories` - Hats, scarves

**Usage**:
```tsx
<ClothingCatalog
  onItemSelect={handleClothingSelect}
  disabled={isProcessing}
  selectedItem={selectedClothing}
/>
```

---

### 3. ComparisonSlider Component

**File**: `app/components/ComparisonSlider.tsx`

**Purpose**: Interactive before/after comparison slider.

**Props**:
```typescript
interface ComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}
```

**State**:
```typescript
const [sliderPosition, setSliderPosition] = useState(50);
const [isDragging, setIsDragging] = useState(false);
```

**Key Functions**:

```typescript
// Update slider position
const handleMove = (clientX: number) => {
  if (!containerRef.current) return;
  
  const rect = containerRef.current.getBoundingClientRect();
  const x = clientX - rect.left;
  const percentage = (x / rect.width) * 100;
  
  setSliderPosition(Math.max(0, Math.min(100, percentage)));
};

// Mouse/touch event handlers
const handleMouseDown = () => setIsDragging(true);
const handleMouseUp = () => setIsDragging(false);

const handleMouseMove = (e: React.MouseEvent) => {
  if (isDragging) handleMove(e.clientX);
};

const handleTouchMove = (e: React.TouchEvent) => {
  if (isDragging && e.touches[0]) {
    handleMove(e.touches[0].clientX);
  }
};
```

**Accessibility**:
- Keyboard support (arrow keys)
- Touch-friendly on mobile
- ARIA labels for screen readers

**Usage**:
```tsx
<ComparisonSlider
  beforeImage={tryOnResult.originalImage}
  afterImage={tryOnResult.tryOnImage}
  beforeLabel="Original"
  afterLabel="Try-On"
/>
```

---

### 4. LoadingSpinner Component

**File**: `app/components/LoadingSpinner.tsx`

**Purpose**: Visual feedback during AI processing.

**Props**:
```typescript
interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}
```

**Usage**:
```tsx
{isProcessing && (
  <LoadingSpinner 
    message="AI is styling your look..."
    size="lg"
  />
)}
```

---

## API Reference

### POST /api/try-on

**File**: `app/api/try-on/route.ts`

**Description**: Process virtual try-on request using Gemini AI.

**Request**:

```typescript
// Headers
Content-Type: application/json

// Body
{
  selfieImage: string;    // Base64 data URL
  clothingImage: string;  // Base64 data URL
}
```

**Response (Success)**:

```typescript
{
  success: true,
  tryOnImage: string,     // Base64 result image
  analysis: string,       // AI style analysis
  message: string
}
```

**Response (Error)**:

```typescript
{
  error: string,
  details?: string
}
```

**Implementation**:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { generateTryOn } from '@/app/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const { selfieImage, clothingImage } = await request.json();
    
    // Validate inputs
    if (!selfieImage || !clothingImage) {
      return NextResponse.json(
        { error: 'Missing required images' },
        { status: 400 }
      );
    }
    
    // Process with Gemini AI
    const result = await generateTryOn({
      selfieImage,
      clothingImage
    });
    
    return NextResponse.json({
      success: true,
      tryOnImage: result.image,
      analysis: result.analysis,
      message: 'Try-on complete'
    });
    
  } catch (error) {
    console.error('Try-on error:', error);
    return NextResponse.json(
      { error: 'Processing failed', details: error.message },
      { status: 500 }
    );
  }
}
```

**Rate Limiting**: Not implemented (TODO)

**Authentication**: Not required (public endpoint)

**CORS**: Handled by Next.js defaults

---

## State Management

### Main Page State

**File**: `app/page.tsx`

```typescript
// Selfie state
const [selfie, setSelfie] = useState<UploadedSelfie | null>(null);

// Selected clothing
const [selectedClothing, setSelectedClothing] = useState<ClothingItem | null>(null);

// Try-on result
const [tryOnResult, setTryOnResult] = useState<TryOnResult | null>(null);

// Processing flag
const [isProcessing, setIsProcessing] = useState(false);
```

### State Flow Diagram

```
┌─────────────┐
│   Initial   │ selfie = null
└─────────────┘
      │
      │ Upload selfie
      ▼
┌─────────────┐
│   Ready     │ selfie = { file, preview, uploaded: true }
└─────────────┘
      │
      │ Select clothing
      ▼
┌─────────────┐
│ Processing  │ isProcessing = true
└─────────────┘
      │
      │ AI completes
      ▼
┌─────────────┐
│   Result    │ tryOnResult = { originalImage, tryOnImage, ... }
└─────────────┘
```

---

## Type System

### Core Types

**File**: `app/types/index.ts`

```typescript
// Clothing item type
export interface ClothingItem {
  id: string;
  name: string;
  category: 'tops' | 'bottoms' | 'dresses' | 'outerwear' | 'accessories';
  imageUrl: string;
  thumbnail: string;
  description: string;
  tags: string[];
  price?: number;
  brand?: string;
}

// Uploaded selfie type
export interface UploadedSelfie {
  file: File;
  preview: string;
  uploaded: boolean;
}

// Try-on result type
export interface TryOnResult {
  originalImage: string;
  tryOnImage: string;
  timestamp: number;
  clothingItem: ClothingItem;
  processing: boolean;
  error?: string;
  analysis?: string;
}

// Category type
export type Category = 'all' | 'tops' | 'bottoms' | 'dresses' | 'outerwear' | 'accessories';

// AI response type
export interface GeminiResponse {
  image: string;
  analysis: string;
  confidence?: number;
}
```

### Type Guards

```typescript
export function isValidClothingItem(item: any): item is ClothingItem {
  return (
    typeof item.id === 'string' &&
    typeof item.name === 'string' &&
    ['tops', 'bottoms', 'dresses', 'outerwear', 'accessories'].includes(item.category) &&
    typeof item.imageUrl === 'string'
  );
}

export function isValidBase64Image(str: string): boolean {
  return str.startsWith('data:image/');
}
```

---

## Utilities & Helpers

### Gemini AI Integration

**File**: `app/lib/gemini.ts`

```typescript
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY || ''
);

// Generate try-on result
export async function generateTryOn({
  selfieImage,
  clothingImage
}: {
  selfieImage: string;
  clothingImage: string;
}): Promise<GeminiResponse> {
  
  const model = genAI.getGenerativeModel({ 
    model: 'gemini-2.0-flash-exp' 
  });
  
  // Prepare multimodal prompt
  const prompt = `
    Analyze this person and clothing item. Provide:
    1. Style compatibility assessment
    2. Color matching analysis
    3. Fit predictions
    4. Overall recommendation
    
    Be specific and helpful.
  `;
  
  // Convert base64 to blob
  const selfieBlob = base64ToBlob(selfieImage);
  const clothingBlob = base64ToBlob(clothingImage);
  
  // Generate content
  const result = await model.generateContent([
    prompt,
    {
      inlineData: {
        data: blobToBase64(selfieBlob),
        mimeType: 'image/jpeg'
      }
    },
    {
      inlineData: {
        data: blobToBase64(clothingBlob),
        mimeType: 'image/jpeg'
      }
    }
  ]);
  
  const response = await result.response;
  const analysis = response.text();
  
  // For MVP, return analysis + original image
  // TODO: Integrate actual image generation model
  return {
    image: selfieImage, // Placeholder
    analysis
  };
}

// Helper: Base64 to Blob
function base64ToBlob(base64: string): Blob {
  const parts = base64.split(';base64,');
  const contentType = parts[0].split(':')[1];
  const raw = window.atob(parts[1]);
  const rawLength = raw.length;
  const uInt8Array = new Uint8Array(rawLength);
  
  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }
  
  return new Blob([uInt8Array], { type: contentType });
}

// Helper: Blob to Base64
function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
```

### Image Utilities

```typescript
// Fetch remote image as base64
export async function fetchImageAsBase64(url: string): Promise<string> {
  const response = await fetch(url);
  const blob = await response.blob();
  return blobToBase64(blob);
}

// Validate image file
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
  
  if (!validTypes.includes(file.type)) {
    return { valid: false, error: 'Invalid file type' };
  }
  
  if (file.size > 10 * 1024 * 1024) {
    return { valid: false, error: 'File too large (max 10MB)' };
  }
  
  return { valid: true };
}

// Compress image
export async function compressImage(
  file: File, 
  maxWidth: number = 1280
): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;
        
        const scale = Math.min(1, maxWidth / img.width);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.9));
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}
```

---

## Styling Guide

### Tailwind Configuration

**File**: `tailwind.config.ts`

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0a0a0a',
        'dark-card': '#151515',
        'dark-border': '#252525',
        'accent-purple': '#a855f7',
        'accent-pink': '#ec4899',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

### Design Tokens

```css
/* globals.css */
:root {
  /* Colors */
  --background: #0a0a0a;
  --foreground: #ffffff;
  --dark-card: #151515;
  --dark-border: #252525;
  --accent-purple: #a855f7;
  --accent-pink: #ec4899;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  /* Border Radius */
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
}
```

### Component Styling Patterns

```tsx
// Card pattern
<div className="bg-dark-card border border-dark-border rounded-xl p-6">
  {/* Content */}
</div>

// Button pattern
<button className="bg-gradient-to-r from-accent-purple to-accent-pink text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity">
  Click Me
</button>

// Input pattern
<input className="w-full bg-dark-card border border-dark-border rounded-lg px-4 py-2 text-white focus:border-accent-purple outline-none" />
```

---

## Development Workflow

### Setup

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Add NEXT_PUBLIC_GEMINI_API_KEY

# Start dev server
npm run dev
```

### Build & Deploy

```bash
# Production build
npm run build

# Test production locally
npm run start

# Deploy to Vercel
vercel deploy --prod
```

### Code Quality

```bash
# Lint code
npm run lint

# Type check
npx tsc --noEmit

# Format code (if Prettier configured)
npx prettier --write .
```

---

## Next Steps

- Implement actual image generation (Stable Diffusion/ControlNet)
- Add user authentication
- Build database for saved looks
- Create API rate limiting
- Add comprehensive testing
- Performance optimization
- SEO improvements

---

*Developer Documentation v1.0.0*  
*For questions: dev@styleswap.app*
