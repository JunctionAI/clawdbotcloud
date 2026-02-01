# 🔌 Style Swap - API Documentation

**Version**: 1.0.0  
**Last Updated**: January 28, 2026  
**Base URL**: `https://style-swap.vercel.app/api`

---

## Table of Contents

1. [Overview](#overview)
2. [Authentication](#authentication)
3. [Error Handling](#error-handling)
4. [Rate Limiting](#rate-limiting)
5. [Endpoints](#endpoints)
6. [Data Models](#data-models)
7. [Code Examples](#code-examples)
8. [Webhook Integration](#webhook-integration)
9. [SDKs & Libraries](#sdks--libraries)

---

## Overview

### API Architecture

The Style Swap API is built on **Next.js API Routes** providing serverless endpoints for:
- Virtual try-on processing
- Clothing catalog management
- Image analysis
- Style recommendations

### Base URL

```
Production:  https://style-swap.vercel.app/api
Development: http://localhost:3000/api
```

### Content Type

All requests and responses use `application/json` unless otherwise specified.

### API Versioning

Currently: **v1** (no version prefix required)

Future versions will use: `/api/v2/...`

---

## Authentication

### Current Status: No Authentication Required

The API is currently **public** for demo purposes.

### Future: API Key Authentication

**Coming Soon:**

```bash
# Request headers
Authorization: Bearer your_api_key_here
```

**Obtain API Key:**
1. Sign up at `https://style-swap.vercel.app/signup`
2. Navigate to Dashboard → API Keys
3. Generate new API key
4. Store securely (not in client-side code)

**Example:**

```javascript
fetch('https://style-swap.vercel.app/api/try-on', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer sk_live_xxxxxxxxxxxxx',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({...}),
});
```

---

## Error Handling

### Error Response Format

```typescript
{
  "error": string,          // Human-readable error message
  "code": string,           // Error code (e.g., "INVALID_IMAGE")
  "details"?: any,          // Additional error context
  "timestamp": number       // Unix timestamp
}
```

### HTTP Status Codes

| Code | Meaning | Description |
|------|---------|-------------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid request parameters |
| 401 | Unauthorized | Missing or invalid API key |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Endpoint doesn't exist |
| 422 | Unprocessable Entity | Validation failed |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server-side error |
| 503 | Service Unavailable | Temporary service outage |

### Common Error Codes

| Code | Description | Resolution |
|------|-------------|------------|
| `INVALID_IMAGE` | Image format not supported | Use JPEG, PNG, or WebP |
| `FILE_TOO_LARGE` | Image exceeds size limit | Reduce file size to < 10 MB |
| `PROCESSING_FAILED` | AI processing error | Retry or contact support |
| `RATE_LIMIT_EXCEEDED` | Too many requests | Wait before retrying |
| `INVALID_API_KEY` | API key invalid | Check key or regenerate |
| `INSUFFICIENT_CREDITS` | Out of API credits | Upgrade plan or add credits |

### Error Examples

**400 Bad Request:**
```json
{
  "error": "Missing required field",
  "code": "MISSING_FIELD",
  "details": {
    "field": "selfieImage",
    "message": "selfieImage is required"
  },
  "timestamp": 1706400000000
}
```

**422 Unprocessable Entity:**
```json
{
  "error": "Image validation failed",
  "code": "INVALID_IMAGE",
  "details": {
    "type": "image/gif",
    "acceptedTypes": ["image/jpeg", "image/png", "image/webp"]
  },
  "timestamp": 1706400000000
}
```

**429 Rate Limit:**
```json
{
  "error": "Rate limit exceeded",
  "code": "RATE_LIMIT_EXCEEDED",
  "details": {
    "limit": 10,
    "window": "1 minute",
    "retryAfter": 45
  },
  "timestamp": 1706400000000
}
```

---

## Rate Limiting

### Current Limits

| Plan | Requests/Min | Requests/Hour | Requests/Day |
|------|--------------|---------------|--------------|
| Free | 10 | 100 | 500 |
| Pro | 30 | 500 | 5,000 |
| Enterprise | Custom | Custom | Custom |

### Rate Limit Headers

```http
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 7
X-RateLimit-Reset: 1706400045
```

### Handling Rate Limits

```typescript
async function makeRequest() {
  const response = await fetch('/api/try-on', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  
  if (response.status === 429) {
    const retryAfter = response.headers.get('X-RateLimit-Reset');
    const waitTime = parseInt(retryAfter) - Math.floor(Date.now() / 1000);
    
    console.log(`Rate limited. Retry in ${waitTime}s`);
    await sleep(waitTime * 1000);
    return makeRequest(); // Retry
  }
  
  return response.json();
}
```

---

## Endpoints

### POST /api/try-on

**Description:** Process virtual try-on request using AI.

**Endpoint:** `/api/try-on`

**Method:** `POST`

**Request Body:**

```typescript
{
  selfieImage: string;    // Base64-encoded image (data URL)
  clothingImage: string;  // Base64-encoded image (data URL)
  options?: {
    quality?: 'low' | 'medium' | 'high';  // Output quality
    preserveFit?: boolean;                 // Preserve original fit
    colorCorrection?: boolean;             // Apply color correction
  };
}
```

**Request Example:**

```json
{
  "selfieImage": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...",
  "clothingImage": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...",
  "options": {
    "quality": "high",
    "colorCorrection": true
  }
}
```

**Response (200 OK):**

```typescript
{
  success: boolean;
  tryOnImage: string;      // Base64-encoded result image
  analysis: string;        // AI-generated style analysis
  metadata: {
    processingTime: number;     // Processing time in ms
    modelVersion: string;       // AI model version used
    timestamp: number;          // Unix timestamp
  };
  recommendations?: string[];   // Style recommendations
}
```

**Response Example:**

```json
{
  "success": true,
  "tryOnImage": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...",
  "analysis": "The blue t-shirt complements your skin tone beautifully. The casual fit works well with your body type.",
  "metadata": {
    "processingTime": 3245,
    "modelVersion": "gemini-2.0-flash-exp",
    "timestamp": 1706400000000
  },
  "recommendations": [
    "Pair with dark jeans for a classic look",
    "Add a denim jacket for layering",
    "White sneakers would complete the outfit"
  ]
}
```

**Error Responses:**

```json
// 400 - Missing image
{
  "error": "Missing required images",
  "code": "MISSING_FIELD",
  "details": {
    "missingFields": ["selfieImage"]
  }
}

// 422 - Invalid image
{
  "error": "Invalid image format",
  "code": "INVALID_IMAGE",
  "details": {
    "field": "selfieImage",
    "message": "Image must be JPEG, PNG, or WebP"
  }
}

// 500 - Processing failed
{
  "error": "Failed to process try-on request",
  "code": "PROCESSING_FAILED",
  "details": {
    "message": "AI service temporarily unavailable"
  }
}
```

**cURL Example:**

```bash
curl -X POST https://style-swap.vercel.app/api/try-on \
  -H "Content-Type: application/json" \
  -d '{
    "selfieImage": "data:image/jpeg;base64,...",
    "clothingImage": "data:image/jpeg;base64,..."
  }'
```

---

### GET /api/catalog

**Description:** Retrieve clothing catalog items.

**Endpoint:** `/api/catalog`

**Method:** `GET`

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `category` | string | No | Filter by category (tops, bottoms, etc.) |
| `tags` | string[] | No | Filter by tags (comma-separated) |
| `limit` | number | No | Max items to return (default: 50) |
| `offset` | number | No | Pagination offset (default: 0) |

**Request Example:**

```
GET /api/catalog?category=tops&limit=10
```

**Response (200 OK):**

```typescript
{
  items: ClothingItem[];
  total: number;
  limit: number;
  offset: number;
}

interface ClothingItem {
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
```

**Response Example:**

```json
{
  "items": [
    {
      "id": "tshirt-001",
      "name": "Classic Blue T-Shirt",
      "category": "tops",
      "imageUrl": "/images/tshirt-blue.jpg",
      "thumbnail": "/images/tshirt-blue-thumb.jpg",
      "description": "Casual cotton t-shirt in royal blue",
      "tags": ["casual", "summer", "cotton"],
      "price": 29.99,
      "brand": "StyleCo"
    }
  ],
  "total": 45,
  "limit": 10,
  "offset": 0
}
```

---

### GET /api/health

**Description:** Check API health status.

**Endpoint:** `/api/health`

**Method:** `GET`

**Response (200 OK):**

```json
{
  "status": "healthy",
  "timestamp": 1706400000000,
  "version": "1.0.0",
  "services": {
    "ai": "operational",
    "database": "operational",
    "storage": "operational"
  }
}
```

---

### POST /api/analyze

**Description:** Analyze style compatibility (without generating try-on).

**Endpoint:** `/api/analyze`

**Method:** `POST`

**Request Body:**

```typescript
{
  selfieImage: string;
  clothingImage: string;
}
```

**Response (200 OK):**

```json
{
  "compatibility": 8.5,
  "analysis": {
    "colorMatch": "Excellent - complementary colors",
    "styleMatch": "Good - fits casual aesthetic",
    "fitPrediction": "True to size, relaxed fit",
    "occasions": ["casual", "weekend", "everyday"]
  },
  "recommendations": [
    "Try with dark jeans",
    "Add white sneakers"
  ]
}
```

---

## Data Models

### ClothingItem

```typescript
interface ClothingItem {
  id: string;                    // Unique identifier
  name: string;                  // Item name
  category: Category;            // Item category
  imageUrl: string;              // Full-size image URL
  thumbnail: string;             // Thumbnail image URL
  description: string;           // Item description
  tags: string[];                // Search/filter tags
  price?: number;                // Price in USD
  brand?: string;                // Brand name
  sizes?: string[];              // Available sizes
  colors?: string[];             // Available colors
  material?: string;             // Fabric/material
  careInstructions?: string;     // Care instructions
}

type Category = 
  | 'tops' 
  | 'bottoms' 
  | 'dresses' 
  | 'outerwear' 
  | 'accessories';
```

### TryOnRequest

```typescript
interface TryOnRequest {
  selfieImage: string;           // Base64 data URL
  clothingImage: string;         // Base64 data URL
  options?: TryOnOptions;
}

interface TryOnOptions {
  quality?: 'low' | 'medium' | 'high';
  preserveFit?: boolean;
  colorCorrection?: boolean;
  outputFormat?: 'jpeg' | 'png' | 'webp';
}
```

### TryOnResponse

```typescript
interface TryOnResponse {
  success: boolean;
  tryOnImage: string;            // Base64 data URL
  analysis: string;              // AI analysis
  metadata: ResponseMetadata;
  recommendations?: string[];
  error?: string;
}

interface ResponseMetadata {
  processingTime: number;        // Milliseconds
  modelVersion: string;          // AI model identifier
  timestamp: number;             // Unix timestamp
  credits Used?: number;          // API credits consumed
}
```

---

## Code Examples

### JavaScript/TypeScript

```typescript
// Using fetch API
async function virtualTryOn(selfieFile: File, clothingUrl: string) {
  // Convert file to base64
  const selfieBase64 = await fileToBase64(selfieFile);
  
  // Fetch clothing image
  const clothingBase64 = await fetchImageAsBase64(clothingUrl);
  
  // Make API request
  const response = await fetch('/api/try-on', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      selfieImage: selfieBase64,
      clothingImage: clothingBase64,
      options: {
        quality: 'high',
        colorCorrection: true,
      },
    }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }
  
  return await response.json();
}

// Helper functions
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function fetchImageAsBase64(url: string): Promise<string> {
  const response = await fetch(url);
  const blob = await response.blob();
  return fileToBase64(new File([blob], 'image.jpg'));
}
```

### React Hook

```typescript
// useTryOn.ts
import { useState } from 'react';

interface UseTryOnResult {
  tryOn: (selfie: File, clothing: string) => Promise<void>;
  result: TryOnResponse | null;
  loading: boolean;
  error: string | null;
}

export function useTryOn(): UseTryOnResult {
  const [result, setResult] = useState<TryOnResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const tryOn = async (selfieFile: File, clothingUrl: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await virtualTryOn(selfieFile, clothingUrl);
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };
  
  return { tryOn, result, loading, error };
}

// Usage in component
function App() {
  const { tryOn, result, loading, error } = useTryOn();
  
  const handleTryOn = async () => {
    await tryOn(selfieFile, clothingImageUrl);
  };
  
  return (
    <div>
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {result && <ComparisonView result={result} />}
    </div>
  );
}
```

### Python

```python
import requests
import base64

def try_on(selfie_path: str, clothing_path: str) -> dict:
    """
    Virtual try-on using Style Swap API
    
    Args:
        selfie_path: Path to selfie image
        clothing_path: Path to clothing image
        
    Returns:
        dict: API response with try-on result
    """
    # Read and encode images
    with open(selfie_path, 'rb') as f:
        selfie_b64 = f'data:image/jpeg;base64,{base64.b64encode(f.read()).decode()}'
    
    with open(clothing_path, 'rb') as f:
        clothing_b64 = f'data:image/jpeg;base64,{base64.b64encode(f.read()).decode()}'
    
    # Make API request
    response = requests.post(
        'https://style-swap.vercel.app/api/try-on',
        json={
            'selfieImage': selfie_b64,
            'clothingImage': clothing_b64,
            'options': {
                'quality': 'high',
                'colorCorrection': True
            }
        }
    )
    
    response.raise_for_status()
    return response.json()

# Usage
result = try_on('selfie.jpg', 'clothing.jpg')
print(f"Analysis: {result['analysis']}")

# Save result image
import base64
image_data = result['tryOnImage'].split(',')[1]
with open('result.jpg', 'wb') as f:
    f.write(base64.b64decode(image_data))
```

### cURL

```bash
#!/bin/bash

# Convert images to base64
SELFIE_B64=$(base64 -w 0 selfie.jpg)
CLOTHING_B64=$(base64 -w 0 clothing.jpg)

# Make API request
curl -X POST https://style-swap.vercel.app/api/try-on \
  -H "Content-Type: application/json" \
  -d "{
    \"selfieImage\": \"data:image/jpeg;base64,$SELFIE_B64\",
    \"clothingImage\": \"data:image/jpeg;base64,$CLOTHING_B64\",
    \"options\": {
      \"quality\": \"high\"
    }
  }" | jq '.'
```

---

## Webhook Integration

**Coming Soon**

Webhooks will allow real-time notifications when:
- Try-on processing completes
- New catalog items added
- User actions trigger events

**Example webhook payload:**

```json
{
  "event": "try_on.completed",
  "timestamp": 1706400000000,
  "data": {
    "requestId": "req_xxxxxxxxxxxxx",
    "status": "success",
    "resultUrl": "https://cdn.styleswap.app/results/xxxxx.jpg"
  }
}
```

---

## SDKs & Libraries

### Official SDKs (Planned)

- **JavaScript/TypeScript**: `npm install @styleswap/sdk`
- **Python**: `pip install styleswap`
- **Ruby**: `gem install styleswap`

### Community Libraries

Coming soon! We welcome community contributions.

---

## Best Practices

### 1. Image Optimization

```typescript
// Compress images before sending
import sharp from 'sharp';

async function compressImage(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const compressed = await sharp(buffer)
    .resize(1280, 1280, { fit: 'inside' })
    .jpeg({ quality: 85 })
    .toBuffer();
    
  return `data:image/jpeg;base64,${compressed.toString('base64')}`;
}
```

### 2. Error Handling

```typescript
async function robustTryOn(selfie: File, clothing: string) {
  const maxRetries = 3;
  let lastError;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await virtualTryOn(selfie, clothing);
    } catch (error) {
      lastError = error;
      
      // Don't retry client errors
      if (error.code === 'INVALID_IMAGE') {
        throw error;
      }
      
      // Wait before retrying
      await sleep(1000 * (i + 1));
    }
  }
  
  throw lastError;
}
```

### 3. Caching Results

```typescript
// Cache try-on results to avoid redundant requests
const cache = new Map<string, TryOnResponse>();

async function cachedTryOn(selfie: File, clothing: string) {
  const cacheKey = `${await hashFile(selfie)}_${clothing}`;
  
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }
  
  const result = await virtualTryOn(selfie, clothing);
  cache.set(cacheKey, result);
  
  return result;
}
```

---

## Changelog

### Version 1.0.0 (2026-01-28)

- Initial API release
- `/api/try-on` endpoint
- `/api/catalog` endpoint
- `/api/health` endpoint
- Basic error handling
- Rate limiting (future)

---

## Support

**Questions?** Contact us:
- Email: api@styleswap.app
- Discord: [Join Community](https://discord.gg/styleswap)
- GitHub: [API Issues](https://github.com/styleswap/api/issues)

**Status Page:** https://status.styleswap.app

---

**API Documentation v1.0.0**  
*Last Updated: January 28, 2026*
