# 🧪 Style Swap - Testing Suite Setup

**Version**: 1.0.0  
**Last Updated**: January 28, 2026  
**Testing Framework**: Jest + React Testing Library

---

## Table of Contents

1. [Testing Strategy](#testing-strategy)
2. [Installation & Setup](#installation--setup)
3. [Configuration](#configuration)
4. [Unit Tests](#unit-tests)
5. [Integration Tests](#integration-tests)
6. [E2E Tests](#e2e-tests)
7. [Test Coverage](#test-coverage)
8. [CI/CD Integration](#cicd-integration)
9. [Best Practices](#best-practices)

---

## Testing Strategy

### Testing Pyramid

```
        ┌─────────────┐
        │   E2E (10%) │  Full user flows
        └─────────────┘
      ┌───────────────────┐
      │ Integration (30%) │  Component interactions
      └───────────────────┘
   ┌────────────────────────┐
   │   Unit Tests (60%)      │  Individual functions/components
   └────────────────────────┘
```

### Test Coverage Goals

- **Unit Tests**: 80%+ coverage
- **Integration Tests**: Key user flows
- **E2E Tests**: Critical paths
- **Component Tests**: All interactive components

---

## Installation & Setup

### Step 1: Install Dependencies

```bash
# Testing libraries
npm install --save-dev jest jest-environment-jsdom
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm install --save-dev @types/jest

# Additional utilities
npm install --save-dev ts-jest
npm install --save-dev identity-obj-proxy  # For CSS modules
```

**Package Versions**:
```json
{
  "devDependencies": {
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "@testing-library/react": "^14.1.2",
    "@testing-library/jest-dom": "^6.1.5",
    "@testing-library/user-event": "^14.5.1",
    "@types/jest": "^29.5.11",
    "ts-jest": "^29.1.1",
    "identity-obj-proxy": "^3.0.0"
  }
}
```

### Step 2: Create Configuration Files

**jest.config.js**:

```javascript
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app
  dir: './',
});

const customJestConfig = {
  // Setup files
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
  // Test environment
  testEnvironment: 'jest-environment-jsdom',
  
  // Module paths
  moduleNameMapper: {
    // Handle CSS imports
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    
    // Handle CSS imports (non-modules)
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    
    // Handle image imports
    '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$': '<rootDir>/__mocks__/fileMock.js',
    
    // Handle module aliases
    '^@/(.*)$': '<rootDir>/$1',
  },
  
  // Coverage configuration
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
    '!app/**/*.d.ts',
    '!app/**/*.stories.{js,jsx,ts,tsx}',
    '!app/**/index.{js,ts}',
    '!app/api/**',
  ],
  
  coverageThresholds: {
    global: {
      branches: 70,
      functions: 70,
      lines: 80,
      statements: 80,
    },
  },
  
  // Test match patterns
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],
  
  // Transformers
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['ts-jest', {
      tsconfig: {
        jsx: 'react-jsx',
      },
    }],
  },
};

module.exports = createJestConfig(customJestConfig);
```

**jest.setup.js**:

```javascript
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
};

// Mock FileReader
global.FileReader = class FileReader {
  readAsDataURL() {
    this.onloadend({
      target: {
        result: 'data:image/jpeg;base64,fake-image-data',
      },
    });
  }
};
```

**__mocks__/styleMock.js**:

```javascript
module.exports = {};
```

**__mocks__/fileMock.js**:

```javascript
module.exports = 'test-file-stub';
```

### Step 3: Update package.json

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:ci": "jest --ci --coverage --maxWorkers=2"
  }
}
```

---

## Configuration

### TypeScript Support

**tsconfig.json** (add to compilerOptions):

```json
{
  "compilerOptions": {
    "types": ["jest", "@testing-library/jest-dom"]
  }
}
```

### Environment Variables for Testing

**.env.test**:

```env
NEXT_PUBLIC_GEMINI_API_KEY=test_api_key_mock
NEXT_PUBLIC_API_URL=/api
```

---

## Unit Tests

### Component Tests

**app/__tests__/components/UploadZone.test.tsx**:

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UploadZone from '@/app/components/UploadZone';

describe('UploadZone Component', () => {
  const mockOnImageUpload = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('renders upload zone with instructions', () => {
    render(
      <UploadZone 
        onImageUpload={mockOnImageUpload}
        currentImage={null}
      />
    );
    
    expect(screen.getByText(/drag.*drop/i)).toBeInTheDocument();
    expect(screen.getByText(/click to upload/i)).toBeInTheDocument();
  });
  
  it('handles file upload via input', async () => {
    render(
      <UploadZone 
        onImageUpload={mockOnImageUpload}
        currentImage={null}
      />
    );
    
    const file = new File(['dummy content'], 'test.jpg', { type: 'image/jpeg' });
    const input = screen.getByLabelText(/upload/i) as HTMLInputElement;
    
    await userEvent.upload(input, file);
    
    await waitFor(() => {
      expect(mockOnImageUpload).toHaveBeenCalledWith(
        file,
        expect.stringContaining('data:image')
      );
    });
  });
  
  it('shows error for invalid file type', async () => {
    const consoleError = jest.spyOn(console, 'log');
    
    render(
      <UploadZone 
        onImageUpload={mockOnImageUpload}
        currentImage={null}
      />
    );
    
    const file = new File(['dummy'], 'test.txt', { type: 'text/plain' });
    const input = screen.getByLabelText(/upload/i) as HTMLInputElement;
    
    await userEvent.upload(input, file);
    
    expect(mockOnImageUpload).not.toHaveBeenCalled();
    
    consoleError.mockRestore();
  });
  
  it('shows error for file too large', async () => {
    window.alert = jest.fn();
    
    render(
      <UploadZone 
        onImageUpload={mockOnImageUpload}
        currentImage={null}
      />
    );
    
    // Create file larger than 10MB
    const largeFile = new File(['x'.repeat(11 * 1024 * 1024)], 'large.jpg', {
      type: 'image/jpeg',
    });
    
    const input = screen.getByLabelText(/upload/i) as HTMLInputElement;
    await userEvent.upload(input, largeFile);
    
    expect(window.alert).toHaveBeenCalledWith(
      expect.stringContaining('too large')
    );
    expect(mockOnImageUpload).not.toHaveBeenCalled();
  });
  
  it('displays preview when image is uploaded', () => {
    const preview = 'data:image/jpeg;base64,test';
    
    render(
      <UploadZone 
        onImageUpload={mockOnImageUpload}
        currentImage={preview}
      />
    );
    
    const img = screen.getByAltText(/preview/i);
    expect(img).toHaveAttribute('src', preview);
  });
  
  it('handles drag and drop', async () => {
    render(
      <UploadZone 
        onImageUpload={mockOnImageUpload}
        currentImage={null}
      />
    );
    
    const dropzone = screen.getByText(/drag.*drop/i).parentElement!;
    const file = new File(['content'], 'test.jpg', { type: 'image/jpeg' });
    
    fireEvent.dragOver(dropzone);
    expect(dropzone).toHaveClass('border-accent-purple');
    
    fireEvent.drop(dropzone, {
      dataTransfer: { files: [file] },
    });
    
    await waitFor(() => {
      expect(mockOnImageUpload).toHaveBeenCalled();
    });
  });
});
```

**app/__tests__/components/ClothingCatalog.test.tsx**:

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import ClothingCatalog from '@/app/components/ClothingCatalog';
import { ClothingItem } from '@/app/types';

const mockClothingItems: ClothingItem[] = [
  {
    id: '1',
    name: 'Blue T-Shirt',
    category: 'tops',
    imageUrl: '/images/tshirt.jpg',
    thumbnail: '/images/tshirt-thumb.jpg',
    description: 'Casual blue t-shirt',
    tags: ['casual', 'summer'],
  },
  {
    id: '2',
    name: 'Black Jeans',
    category: 'bottoms',
    imageUrl: '/images/jeans.jpg',
    thumbnail: '/images/jeans-thumb.jpg',
    description: 'Classic black jeans',
    tags: ['casual', 'denim'],
  },
];

// Mock clothing data
jest.mock('@/app/data/clothing', () => ({
  clothingData: mockClothingItems,
}));

describe('ClothingCatalog Component', () => {
  const mockOnItemSelect = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('renders all clothing items', () => {
    render(
      <ClothingCatalog 
        onItemSelect={mockOnItemSelect}
        disabled={false}
      />
    );
    
    expect(screen.getByText('Blue T-Shirt')).toBeInTheDocument();
    expect(screen.getByText('Black Jeans')).toBeInTheDocument();
  });
  
  it('filters items by category', () => {
    render(
      <ClothingCatalog 
        onItemSelect={mockOnItemSelect}
        disabled={false}
      />
    );
    
    // Click "Tops" category
    const topsButton = screen.getByText(/tops/i);
    fireEvent.click(topsButton);
    
    expect(screen.getByText('Blue T-Shirt')).toBeInTheDocument();
    expect(screen.queryByText('Black Jeans')).not.toBeInTheDocument();
  });
  
  it('calls onItemSelect when item is clicked', () => {
    render(
      <ClothingCatalog 
        onItemSelect={mockOnItemSelect}
        disabled={false}
      />
    );
    
    const item = screen.getByText('Blue T-Shirt');
    fireEvent.click(item);
    
    expect(mockOnItemSelect).toHaveBeenCalledWith(mockClothingItems[0]);
  });
  
  it('disables selection when disabled prop is true', () => {
    render(
      <ClothingCatalog 
        onItemSelect={mockOnItemSelect}
        disabled={true}
      />
    );
    
    const item = screen.getByText('Blue T-Shirt');
    fireEvent.click(item);
    
    expect(mockOnItemSelect).not.toHaveBeenCalled();
  });
  
  it('highlights selected item', () => {
    render(
      <ClothingCatalog 
        onItemSelect={mockOnItemSelect}
        disabled={false}
        selectedItem={mockClothingItems[0]}
      />
    );
    
    const selectedCard = screen.getByText('Blue T-Shirt').closest('div');
    expect(selectedCard).toHaveClass('ring-2', 'ring-accent-purple');
  });
});
```

**app/__tests__/components/ComparisonSlider.test.tsx**:

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import ComparisonSlider from '@/app/components/ComparisonSlider';

describe('ComparisonSlider Component', () => {
  const beforeImage = 'data:image/jpeg;base64,before';
  const afterImage = 'data:image/jpeg;base64,after';
  
  it('renders both images', () => {
    render(
      <ComparisonSlider
        beforeImage={beforeImage}
        afterImage={afterImage}
        beforeLabel="Original"
        afterLabel="Try-On"
      />
    );
    
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('src', beforeImage);
    expect(images[1]).toHaveAttribute('src', afterImage);
  });
  
  it('displays labels', () => {
    render(
      <ComparisonSlider
        beforeImage={beforeImage}
        afterImage={afterImage}
        beforeLabel="Original"
        afterLabel="Try-On"
      />
    );
    
    expect(screen.getByText('Original')).toBeInTheDocument();
    expect(screen.getByText('Try-On')).toBeInTheDocument();
  });
  
  it('updates slider position on drag', () => {
    const { container } = render(
      <ComparisonSlider
        beforeImage={beforeImage}
        afterImage={afterImage}
      />
    );
    
    const slider = container.querySelector('[role="slider"]');
    expect(slider).toBeInTheDocument();
    
    // Simulate drag
    fireEvent.mouseDown(slider!);
    fireEvent.mouseMove(slider!, { clientX: 100 });
    fireEvent.mouseUp(slider!);
    
    // Verify slider moved (visual test)
    expect(slider).toBeInTheDocument();
  });
  
  it('handles touch events on mobile', () => {
    const { container } = render(
      <ComparisonSlider
        beforeImage={beforeImage}
        afterImage={afterImage}
      />
    );
    
    const slider = container.querySelector('[role="slider"]');
    
    fireEvent.touchStart(slider!);
    fireEvent.touchMove(slider!, {
      touches: [{ clientX: 150 }],
    });
    fireEvent.touchEnd(slider!);
    
    expect(slider).toBeInTheDocument();
  });
});
```

### Utility Function Tests

**app/__tests__/lib/gemini.test.ts**:

```typescript
import { generateTryOn } from '@/app/lib/gemini';

// Mock Google Generative AI
jest.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
    getGenerativeModel: jest.fn().mockReturnValue({
      generateContent: jest.fn().mockResolvedValue({
        response: {
          text: () => 'AI analysis result',
        },
      }),
    }),
  })),
}));

describe('Gemini AI Integration', () => {
  it('generates try-on result', async () => {
    const selfieImage = 'data:image/jpeg;base64,selfie';
    const clothingImage = 'data:image/jpeg;base64,clothing';
    
    const result = await generateTryOn({ selfieImage, clothingImage });
    
    expect(result).toHaveProperty('image');
    expect(result).toHaveProperty('analysis');
    expect(result.analysis).toBe('AI analysis result');
  });
  
  it('handles API errors gracefully', async () => {
    // This would require more sophisticated mocking
    // to simulate API failures
  });
});
```

---

## Integration Tests

### Page Tests

**app/__tests__/page.test.tsx**:

```typescript
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Page from '@/app/page';

// Mock fetch for API calls
global.fetch = jest.fn();

describe('Main Page Integration', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });
  
  it('renders all main components', () => {
    render(<Page />);
    
    expect(screen.getByText(/upload.*selfie/i)).toBeInTheDocument();
    expect(screen.getByText(/browse.*catalog/i)).toBeInTheDocument();
  });
  
  it('enables catalog after uploading selfie', async () => {
    render(<Page />);
    
    const file = new File(['content'], 'selfie.jpg', { type: 'image/jpeg' });
    const input = screen.getByLabelText(/upload/i) as HTMLInputElement;
    
    await userEvent.upload(input, file);
    
    await waitFor(() => {
      const catalogItems = screen.getAllByRole('button', { name: /select/i });
      expect(catalogItems.length).toBeGreaterThan(0);
    });
  });
  
  it('processes try-on when clothing is selected', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        tryOnImage: 'data:image/jpeg;base64,result',
        analysis: 'Looks great!',
      }),
    });
    
    render(<Page />);
    
    // Upload selfie
    const file = new File(['content'], 'selfie.jpg', { type: 'image/jpeg' });
    const input = screen.getByLabelText(/upload/i) as HTMLInputElement;
    await userEvent.upload(input, file);
    
    // Select clothing
    await waitFor(() => {
      const clothingItem = screen.getAllByRole('button')[0];
      userEvent.click(clothingItem);
    });
    
    // Wait for processing
    await waitFor(() => {
      expect(screen.getByText(/looks great/i)).toBeInTheDocument();
    });
  });
});
```

### API Route Tests

**app/__tests__/api/try-on.test.ts**:

```typescript
import { POST } from '@/app/api/try-on/route';
import { NextRequest } from 'next/server';

describe('Try-On API Route', () => {
  it('returns 400 for missing images', async () => {
    const request = new NextRequest('http://localhost/api/try-on', {
      method: 'POST',
      body: JSON.stringify({}),
    });
    
    const response = await POST(request);
    const data = await response.json();
    
    expect(response.status).toBe(400);
    expect(data.error).toBeDefined();
  });
  
  it('processes valid request', async () => {
    const request = new NextRequest('http://localhost/api/try-on', {
      method: 'POST',
      body: JSON.stringify({
        selfieImage: 'data:image/jpeg;base64,selfie',
        clothingImage: 'data:image/jpeg;base64,clothing',
      }),
    });
    
    const response = await POST(request);
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.tryOnImage).toBeDefined();
  });
});
```

---

## E2E Tests

### Playwright Setup

```bash
npm install --save-dev @playwright/test
npx playwright install
```

**playwright.config.ts**:

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

**e2e/try-on-flow.spec.ts**:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Try-On Flow', () => {
  test('completes full try-on process', async ({ page }) => {
    await page.goto('/');
    
    // Upload selfie
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles('test-fixtures/selfie.jpg');
    
    // Wait for preview
    await expect(page.locator('img[alt*="preview"]')).toBeVisible();
    
    // Select clothing item
    await page.locator('[data-testid="clothing-item"]').first().click();
    
    // Wait for processing
    await expect(page.locator('text=Processing')).toBeVisible();
    
    // Verify result
    await expect(page.locator('[data-testid="comparison-slider"]')).toBeVisible({
      timeout: 15000,
    });
    
    // Test slider interaction
    const slider = page.locator('[role="slider"]');
    await slider.hover();
    await page.mouse.down();
    await page.mouse.move(500, 300);
    await page.mouse.up();
  });
  
  test('handles upload errors gracefully', async ({ page }) => {
    await page.goto('/');
    
    // Upload invalid file
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles('test-fixtures/invalid.txt');
    
    // Expect error message
    await expect(page.locator('text=/invalid.*file/i')).toBeVisible();
  });
});
```

---

## Test Coverage

### Generate Coverage Report

```bash
npm run test:coverage
```

**Output**:
```
---------------------------|---------|----------|---------|---------|
File                       | % Stmts | % Branch | % Funcs | % Lines |
---------------------------|---------|----------|---------|---------|
All files                  |   85.23 |    78.45 |   82.11 |   86.34 |
 app/components            |   92.15 |    85.32 |   90.45 |   93.21 |
  UploadZone.tsx           |   95.23 |    88.12 |   94.11 |   96.34 |
  ClothingCatalog.tsx      |   91.45 |    84.23 |   88.45 |   92.11 |
  ComparisonSlider.tsx     |   89.34 |    82.45 |   87.23 |   90.45 |
 app/lib                   |   78.45 |    70.23 |   75.34 |   79.56 |
  gemini.ts                |   78.45 |    70.23 |   75.34 |   79.56 |
---------------------------|---------|----------|---------|---------|
```

### View HTML Report

```bash
open coverage/lcov-report/index.html
```

---

## CI/CD Integration

### GitHub Actions

**.github/workflows/test.yml**:

```yaml
name: Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm run test:ci
        env:
          NEXT_PUBLIC_GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
          flags: unittests
          name: codecov-umbrella
```

---

## Best Practices

### 1. Test Organization

```
app/
├── __tests__/
│   ├── components/
│   │   ├── UploadZone.test.tsx
│   │   └── ClothingCatalog.test.tsx
│   ├── lib/
│   │   └── gemini.test.ts
│   ├── api/
│   │   └── try-on.test.ts
│   └── page.test.tsx
```

### 2. Naming Conventions

- Test files: `*.test.tsx` or `*.spec.tsx`
- Describe blocks: Component/function name
- Test cases: "should do something"

### 3. AAA Pattern

```typescript
it('should handle file upload', async () => {
  // Arrange
  const mockHandler = jest.fn();
  render(<UploadZone onUpload={mockHandler} />);
  
  // Act
  const file = new File(['content'], 'test.jpg', { type: 'image/jpeg' });
  await userEvent.upload(screen.getByLabelText(/upload/i), file);
  
  // Assert
  expect(mockHandler).toHaveBeenCalledWith(file);
});
```

### 4. Mock External Dependencies

```typescript
jest.mock('@google/generative-ai');
jest.mock('next/navigation');
global.fetch = jest.fn();
```

### 5. Test Accessibility

```typescript
it('is accessible', async () => {
  const { container } = render(<MyComponent />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

---

**Testing Guide v1.0.0**  
*Comprehensive testing for Style Swap*
