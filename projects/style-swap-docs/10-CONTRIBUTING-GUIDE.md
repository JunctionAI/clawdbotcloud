# 🤝 Style Swap - Contributing Guide

**Version**: 1.0.0  
**Last Updated**: January 28, 2026  
**Welcome Contributors!**

---

## Table of Contents

1. [Welcome](#welcome)
2. [Code of Conduct](#code-of-conduct)
3. [Getting Started](#getting-started)
4. [Development Workflow](#development-workflow)
5. [Coding Standards](#coding-standards)
6. [Pull Request Process](#pull-request-process)
7. [Testing Guidelines](#testing-guidelines)
8. [Documentation](#documentation)
9. [Issue Guidelines](#issue-guidelines)
10. [Community](#community)

---

## Welcome

Thank you for considering contributing to Style Swap! 🎉

Whether you're fixing a bug, adding a feature, improving documentation, or just asking a question, we appreciate your help making Style Swap better for everyone.

### Ways to Contribute

- 🐛 **Report Bugs** - Found something broken? Let us know!
- ✨ **Suggest Features** - Have an idea? We'd love to hear it!
- 📝 **Improve Documentation** - Help others understand the project
- 🎨 **Design Improvements** - Make it look even better
- 💻 **Code Contributions** - Fix bugs or add features
- 🧪 **Write Tests** - Improve code quality and coverage
- 🌍 **Translations** - Help us reach a global audience
- 💬 **Answer Questions** - Help other users in discussions

---

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors, regardless of:
- Age, body size, disability
- Ethnicity, gender identity and expression
- Level of experience
- Nationality, personal appearance
- Race, religion
- Sexual identity and orientation

### Our Standards

**Positive behaviors:**
- ✅ Being respectful and inclusive
- ✅ Gracefully accepting constructive criticism
- ✅ Focusing on what's best for the community
- ✅ Showing empathy towards others

**Unacceptable behaviors:**
- ❌ Harassment, trolling, or personal attacks
- ❌ Public or private harassment
- ❌ Publishing others' private information
- ❌ Other conduct which could reasonably be considered inappropriate

### Enforcement

Violations can be reported to: conduct@styleswap.app

All complaints will be reviewed and investigated promptly and fairly.

---

## Getting Started

### Prerequisites

**Required:**
- Node.js 18+ ([Download](https://nodejs.org))
- Git ([Download](https://git-scm.com))
- Code editor (VS Code recommended)

**Recommended:**
- GitHub account
- Vercel account (for testing deployments)
- Discord account (for community chat)

### First-Time Setup

**1. Fork the Repository**

```bash
# Via GitHub UI:
1. Go to https://github.com/styleswap/style-swap
2. Click "Fork" button (top right)
3. Select your account
```

**2. Clone Your Fork**

```bash
git clone https://github.com/YOUR_USERNAME/style-swap.git
cd style-swap
```

**3. Add Upstream Remote**

```bash
git remote add upstream https://github.com/styleswap/style-swap.git
git remote -v
# Should show:
# origin    https://github.com/YOUR_USERNAME/style-swap.git (fetch)
# origin    https://github.com/YOUR_USERNAME/style-swap.git (push)
# upstream  https://github.com/styleswap/style-swap.git (fetch)
# upstream  https://github.com/styleswap/style-swap.git (push)
```

**4. Install Dependencies**

```bash
npm install
```

**5. Set Up Environment Variables**

```bash
# Copy example env file
cp .env.example .env.local

# Add your Gemini API key
# Get key from: https://makersuite.google.com/app/apikey
echo "NEXT_PUBLIC_GEMINI_API_KEY=your_key_here" >> .env.local
```

**6. Run Development Server**

```bash
npm run dev
```

Open http://localhost:3000 - you should see Style Swap running! 🎉

---

## Development Workflow

### Creating a New Feature/Fix

**1. Sync with Upstream**

```bash
git checkout main
git pull upstream main
```

**2. Create Feature Branch**

```bash
# Use descriptive branch names:
git checkout -b feature/add-outfit-save
git checkout -b fix/upload-validation
git checkout -b docs/improve-readme
git checkout -b refactor/component-structure
```

**Branch Naming Convention:**
- `feature/*` - New features
- `fix/*` - Bug fixes
- `docs/*` - Documentation changes
- `refactor/*` - Code refactoring
- `test/*` - Adding/updating tests
- `perf/*` - Performance improvements

**3. Make Your Changes**

```bash
# Edit files
# Test locally
npm run dev

# Build to ensure no errors
npm run build
```

**4. Write Tests**

```bash
# Run tests
npm test

# Add new tests for your changes
# See Testing Guidelines below
```

**5. Commit Your Changes**

```bash
git add .
git commit -m "feat: add outfit save functionality"
```

**Commit Message Convention:**

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Adding/updating tests
- `chore`: Build process or auxiliary tools

**Examples:**

```bash
# Good commits:
git commit -m "feat(upload): add drag-and-drop support"
git commit -m "fix(api): handle invalid image format error"
git commit -m "docs(readme): update installation instructions"
git commit -m "perf(catalog): lazy load clothing images"

# Bad commits:
git commit -m "update stuff"
git commit -m "fix bug"
git commit -m "changes"
```

**Detailed Commit:**

```bash
git commit -m "feat(comparison): add keyboard navigation to slider

- Add arrow key support for slider movement
- Add keyboard focus indicator
- Update ARIA attributes for accessibility
- Add unit tests for keyboard events

Closes #123"
```

**6. Push to Your Fork**

```bash
git push origin feature/add-outfit-save
```

**7. Create Pull Request**

1. Go to your fork on GitHub
2. Click "Compare & pull request"
3. Fill out the PR template
4. Submit!

---

## Coding Standards

### TypeScript

**Use TypeScript for all new code:**

```typescript
// ✅ Good - Explicit types
interface UploadProps {
  onUpload: (file: File) => void;
  maxSize?: number;
}

export function UploadZone({ onUpload, maxSize = 10485760 }: UploadProps) {
  // Implementation
}

// ❌ Bad - No types
export function UploadZone(props) {
  // Implementation
}
```

**Avoid `any`:**

```typescript
// ❌ Bad
function processImage(data: any) {
  return data.image;
}

// ✅ Good
interface ImageData {
  image: string;
  metadata: ImageMetadata;
}

function processImage(data: ImageData): string {
  return data.image;
}
```

### React Components

**Functional Components with TypeScript:**

```typescript
// ✅ Good - Functional component with types
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

export function Button({ 
  label, 
  onClick, 
  disabled = false,
  variant = 'primary'
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant}`}
    >
      {label}
    </button>
  );
}

// ❌ Bad - Class component, no types
export class Button extends React.Component {
  render() {
    return <button onClick={this.props.onClick}>{this.props.label}</button>;
  }
}
```

**Hooks Best Practices:**

```typescript
// ✅ Good - Custom hook with types
interface UseTryOnResult {
  tryOn: (selfie: File, clothing: string) => Promise<void>;
  result: TryOnResponse | null;
  loading: boolean;
  error: Error | null;
}

export function useTryOn(): UseTryOnResult {
  const [result, setResult] = useState<TryOnResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const tryOn = useCallback(async (selfie: File, clothing: string) => {
    setLoading(true);
    try {
      const response = await api.tryOn(selfie, clothing);
      setResult(response);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);
  
  return { tryOn, result, loading, error };
}
```

### CSS/Styling

**Use Tailwind CSS utility classes:**

```tsx
// ✅ Good - Tailwind utilities
<div className="flex items-center gap-4 p-6 bg-dark-card rounded-xl border border-dark-border">
  <Image src={item.imageUrl} alt={item.name} />
  <h3 className="text-xl font-semibold">{item.name}</h3>
</div>

// ❌ Bad - Inline styles
<div style={{ display: 'flex', padding: '1.5rem', background: '#151515' }}>
  <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{item.name}</h3>
</div>
```

**Component-specific styles (when necessary):**

```tsx
// styles.module.css
.customSlider {
  position: relative;
  overflow: hidden;
}

.customSlider::before {
  content: '';
  position: absolute;
  /* ... */
}

// Component.tsx
import styles from './styles.module.css';

export function Slider() {
  return <div className={styles.customSlider}>...</div>;
}
```

### Code Organization

**File Structure:**

```
app/
├── components/
│   ├── UploadZone/
│   │   ├── UploadZone.tsx        # Component
│   │   ├── UploadZone.test.tsx   # Tests
│   │   ├── UploadZone.module.css # Styles (if needed)
│   │   └── index.ts              # Export
│   └── ...
├── hooks/
│   ├── useTryOn.ts
│   └── useImageUpload.ts
├── lib/
│   ├── api.ts
│   ├── utils.ts
│   └── constants.ts
└── types/
    └── index.ts
```

**Import Order:**

```typescript
// 1. External dependencies
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// 2. Internal absolute imports
import { Button } from '@/app/components/Button';
import { useTryOn } from '@/app/hooks/useTryOn';

// 3. Relative imports
import { validateImage } from './utils';

// 4. Types
import type { ClothingItem } from '@/app/types';

// 5. Styles
import styles from './Component.module.css';
```

### Error Handling

**Always handle errors gracefully:**

```typescript
// ✅ Good - Comprehensive error handling
async function uploadImage(file: File): Promise<string> {
  try {
    // Validate
    if (!file.type.startsWith('image/')) {
      throw new Error('Invalid file type');
    }
    
    if (file.size > MAX_FILE_SIZE) {
      throw new Error('File too large');
    }
    
    // Process
    const base64 = await fileToBase64(file);
    return base64;
    
  } catch (error) {
    console.error('Upload failed:', error);
    
    if (error instanceof Error) {
      throw error; // Re-throw with context
    }
    
    throw new Error('Unknown upload error');
  }
}

// ❌ Bad - Silent failure
async function uploadImage(file: File) {
  const base64 = await fileToBase64(file);
  return base64;
}
```

### Accessibility

**Always consider accessibility:**

```tsx
// ✅ Good - Accessible
<button
  onClick={handleClick}
  aria-label="Upload photo"
  disabled={isProcessing}
>
  <UploadIcon aria-hidden="true" />
  <span>Upload</span>
</button>

// ❌ Bad - Not accessible
<div onClick={handleClick}>
  <UploadIcon />
</div>
```

---

## Pull Request Process

### Before Submitting

**Checklist:**

- [ ] Code follows style guidelines
- [ ] Tests written and passing
- [ ] Documentation updated
- [ ] No console.log() statements
- [ ] No commented-out code
- [ ] Commits follow convention
- [ ] Branch up to date with main
- [ ] Build succeeds locally

```bash
# Pre-PR checklist commands
npm run lint        # Check linting
npm test           # Run tests
npm run build      # Verify build
git log --oneline  # Check commit messages
```

### PR Template

**Use this template for all PRs:**

```markdown
## Description
Brief description of what this PR does and why.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Related Issues
Closes #123
Relates to #456

## Testing
How has this been tested?

- [ ] Tested locally on Chrome/Firefox/Safari
- [ ] Tested on mobile
- [ ] Added unit tests
- [ ] Added integration tests
- [ ] Manual testing checklist:
  - [ ] Upload image works
  - [ ] Catalog displays correctly
  - [ ] Try-on processes
  - [ ] Slider functions

## Screenshots (if applicable)
[Add screenshots/videos]

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code where necessary
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix/feature works
- [ ] New and existing tests pass locally
- [ ] Any dependent changes have been merged

## Additional Notes
Any other context or information reviewers should know.
```

### Review Process

**What to expect:**

1. **Automated Checks** (5-10 min)
   - Linting
   - Tests
   - Build verification
   - Type checking

2. **Code Review** (1-3 days)
   - At least one maintainer will review
   - May request changes or ask questions
   - Be responsive to feedback

3. **Approval & Merge**
   - Once approved, a maintainer will merge
   - Your contribution is live! 🎉

**During Review:**

```
✅ Do:
- Respond to comments promptly
- Be open to feedback
- Make requested changes
- Ask questions if unclear

❌ Don't:
- Take feedback personally
- Force-push after review started (unless requested)
- Argue without explanation
- Add unrelated changes
```

---

## Testing Guidelines

### Writing Tests

**Every new feature should include tests:**

```typescript
// Component.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { UploadZone } from './UploadZone';

describe('UploadZone', () => {
  it('renders upload instructions', () => {
    render(<UploadZone onUpload={jest.fn()} currentImage={null} />);
    expect(screen.getByText(/drag.*drop/i)).toBeInTheDocument();
  });
  
  it('calls onUpload when file is selected', async () => {
    const mockOnUpload = jest.fn();
    render(<UploadZone onUpload={mockOnUpload} currentImage={null} />);
    
    const file = new File(['content'], 'test.jpg', { type: 'image/jpeg' });
    const input = screen.getByLabelText(/upload/i);
    
    await fireEvent.change(input, { target: { files: [file] } });
    
    expect(mockOnUpload).toHaveBeenCalledWith(file, expect.any(String));
  });
  
  it('shows error for invalid file type', async () => {
    // Test error handling
  });
});
```

**Test Coverage Goals:**

- Unit tests: 80%+ coverage
- All new features tested
- All bug fixes include regression test

**Running Tests:**

```bash
# All tests
npm test

# Watch mode
npm test -- --watch

# Coverage report
npm test -- --coverage

# Specific file
npm test UploadZone.test.tsx
```

---

## Documentation

### Code Documentation

**Document complex logic:**

```typescript
/**
 * Compresses an image file to reduce upload size
 * 
 * @param file - The image file to compress
 * @param maxWidth - Maximum width in pixels (default: 1920)
 * @param quality - JPEG quality 0-1 (default: 0.85)
 * @returns Promise resolving to compressed base64 data URL
 * 
 * @example
 * const compressed = await compressImage(file, 1280, 0.9);
 */
export async function compressImage(
  file: File,
  maxWidth: number = 1920,
  quality: number = 0.85
): Promise<string> {
  // Implementation
}
```

### README Updates

**If you add a feature, update README:**

```markdown
## Features

- 📸 Upload selfie (drag-and-drop or click)
- 👕 Browse clothing catalog
- 🤖 AI-powered virtual try-on
- 🔍 Before/after comparison slider
- 💾 **NEW: Save favorite outfits** ← Add here!
```

### Changelog

**Major changes should update CHANGELOG.md:**

```markdown
## [Unreleased]

### Added
- Save outfit feature (#123)
- Keyboard shortcuts for catalog navigation (#145)

### Fixed
- Upload validation for HEIC images (#156)

### Changed
- Improved error messages (#167)
```

---

## Issue Guidelines

### Creating Issues

**Good Issue Template:**

```markdown
**Bug Report**

## Description
Brief description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- Browser: Chrome 120
- OS: Windows 11
- Version: 1.0.0

## Screenshots
[If applicable]

## Additional Context
Any other relevant information
```

**Feature Request Template:**

```markdown
**Feature Request**

## Problem Statement
What problem does this solve?

## Proposed Solution
How should it work?

## Alternatives Considered
Other ways to solve this?

## Additional Context
Mockups, examples, etc.
```

### Working on Issues

**Claim an issue before starting:**

```
Comment: "I'd like to work on this! 🙋‍♀️"

Wait for assignment before starting work
```

**Good First Issues:**

Look for labels:
- `good first issue` - Perfect for newcomers
- `help wanted` - Maintainers need help
- `documentation` - Docs improvements
- `bug` - Bug fixes

---

## Community

### Communication Channels

**Discord** (Recommended)
- Real-time chat
- Ask questions
- Share progress
- Join: https://discord.gg/styleswap

**GitHub Discussions**
- Long-form discussions
- Feature proposals
- Q&A

**Twitter**
- Follow: @StyleSwapApp
- Share your contributions!

### Getting Recognition

**Contributors are celebrated! 🎉**

- Listed in README
- Mentioned in release notes
- Contributor badge on Discord
- Shoutouts on social media

**Hall of Fame:**

We recognize contributors monthly for:
- Most PRs merged
- Best documentation
- Most helpful in community
- Innovation award

---

## Additional Resources

### Learning Resources

**Next.js:**
- [Next.js Docs](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

**React:**
- [React Docs](https://react.dev)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app)

**Tailwind CSS:**
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Tailwind UI Examples](https://tailwindui.com/components)

**Testing:**
- [Testing Library Docs](https://testing-library.com)
- [Jest Docs](https://jestjs.io/docs/getting-started)

### Project-Specific Docs

- [Architecture Overview](./2-DEVELOPER-DOCUMENTATION.md)
- [API Documentation](./8-API-DOCUMENTATION.md)
- [Testing Suite Setup](./4-TESTING-SUITE-SETUP.md)

---

## License

By contributing to Style Swap, you agree that your contributions will be licensed under the MIT License.

---

## Questions?

**Stuck? Need help?**

- 💬 Ask in Discord: https://discord.gg/styleswap
- 📧 Email: contribute@styleswap.app
- 🐛 Open a discussion: https://github.com/styleswap/style-swap/discussions

**We're here to help! Don't hesitate to ask. 😊**

---

## Thank You! 🙏

Your contributions make Style Swap better for everyone. Whether you're fixing a typo or adding a major feature, we appreciate your time and effort.

Happy coding! 💜

---

**Contributing Guide v1.0.0**  
**Last Updated**: January 28, 2026  
*Let's build something amazing together!*
