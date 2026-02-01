# Components Directory

This directory contains all reusable React components for the Style Swap UI application.

## Component Overview

### 1. MultiItemSelector.jsx
**Purpose**: Item selection component for tops, bottoms, and shoes.

**Props**:
```typescript
{
  selectedItems: Object,     // Current selections
  onItemSelect: Function,    // (category, item) => void
  isProcessing: Boolean,     // Disable during AI processing
  category: String          // 'top', 'bottom', or 'shoes'
}
```

**Features**:
- Horizontal scrollable list
- Visual selection state
- Price display
- Category-specific items
- Disabled state during processing

---

### 2. FavoritesManager.jsx
**Purpose**: Modal for managing saved favorite looks.

**Props**:
```typescript
{
  isOpen: Boolean,          // Show/hide modal
  onClose: Function,        // Close callback
  onLoadLook: Function      // (look) => void - Restore look
}
```

**Features**:
- Grid view of favorites
- Delete individual items
- Restore to editor
- Backend-ready export
- LocalStorage persistence

**Storage**: `localStorage.styleSwapFavorites`

---

### 3. SocialShare.jsx
**Purpose**: Share transformed images to social media with watermark.

**Props**:
```typescript
{
  imageUrl: String,         // Transformed image data URL
  lookDetails: Object,      // { items: {...} }
  onClose: Function         // Close callback
}
```

**Features**:
- Canvas-based watermark
- Instagram/Twitter/Facebook sharing
- Copy link functionality
- Download with branding
- Preview before sharing

---

### 4. OutfitHistory.jsx
**Purpose**: Gallery view of all past outfit tries.

**Props**:
```typescript
{
  isOpen: Boolean,          // Show/hide modal
  onClose: Function,        // Close callback
  onRestore: Function       // (entry) => void - Restore try
}
```

**Features**:
- 3-column grid layout
- Hover actions (restore, download, delete)
- Date/time stamps
- Clear all history
- FIFO storage (50 items)

**Storage**: `localStorage.styleSwapHistory`

---

### 5. StyleRecommendations.jsx
**Purpose**: AI-powered outfit suggestions based on selected items.

**Props**:
```typescript
{
  selectedItems: Object,       // Current selections
  onRecommendation: Function   // (category, itemId) => void
}
```

**Features**:
- Rule-based recommendation engine
- Style matching
- Season awareness
- Confidence scoring
- One-tap apply

**Algorithm**:
- Analyzes current selections
- Suggests complementary items
- Provides style insights
- Ready for ML upgrade

---

### 6. ComparisonSlider.jsx
**Purpose**: Interactive before/after slider for comparing images.

**Props**:
```typescript
{
  beforeImage: String,      // Original photo URL
  afterImage: String,       // Transformed photo URL
  className: String         // Additional CSS classes
}
```

**Features**:
- Drag to compare
- Mouse and touch support
- Visual percentage indicators
- Smooth animations
- Accessible design

**Technical**:
- Uses CSS `clip-path`
- No canvas overhead
- 60fps performance

---

### 7. OnboardingTutorial.jsx
**Purpose**: First-time user tutorial/walkthrough.

**Props**:
```typescript
{
  onComplete: Function      // Callback when finished
}
```

**Features**:
- 5-step walkthrough
- Skip option
- Progress dots
- Beautiful gradients
- Only shows once

**Steps**:
1. Welcome
2. Upload guide
3. Item selection
4. AI processing
5. Save & share

**Storage**: `localStorage.styleSwapOnboardingComplete`

---

## Usage Patterns

### Modal Components
```jsx
// Pattern for all modal components
const [isOpen, setIsOpen] = useState(false);

<Button onClick={() => setIsOpen(true)}>Open</Button>

<ModalComponent 
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  // ... other props
/>
```

### Selection Components
```jsx
// Pattern for item selectors
const [selected, setSelected] = useState(null);

<MultiItemSelector 
  selectedItems={selected}
  onItemSelect={(category, item) => {
    setSelected(prev => ({
      ...prev,
      [category]: item
    }));
  }}
  category="top"
/>
```

---

## Styling Conventions

### Glass Morphism
```jsx
className="bg-white/10 backdrop-blur-3xl border border-white/20"
```

### Gradients
```jsx
className="bg-gradient-to-r from-[#667EEA] to-[#764BA2]"
```

### Animations
```jsx
className="transition-all duration-300 hover:scale-105 active:scale-95"
```

### Responsive Text
```jsx
className="text-[10px] font-black uppercase tracking-[0.4em]"
```

---

## Accessibility

### Current Support
- Semantic HTML
- Keyboard navigation (partial)
- ARIA labels (can be improved)
- Focus indicators

### Improvements Needed
- [ ] Full keyboard navigation
- [ ] Screen reader testing
- [ ] ARIA live regions
- [ ] Color contrast validation
- [ ] Focus trap in modals

---

## Performance

### Optimization Strategies
1. **Lazy Loading**: Components loaded on-demand
2. **Memoization**: Use `React.memo()` for expensive renders
3. **Virtual Scrolling**: For long lists (favorites/history)
4. **Debouncing**: For search/filter inputs
5. **Image Optimization**: Lazy load images in galleries

---

## Testing

### Component Tests
```javascript
// Example test pattern
describe('MultiItemSelector', () => {
  it('renders all items', () => {
    render(<MultiItemSelector {...props} />);
    expect(screen.getAllByRole('button')).toHaveLength(7);
  });

  it('calls onItemSelect when clicked', () => {
    const onSelect = jest.fn();
    render(<MultiItemSelector onItemSelect={onSelect} />);
    fireEvent.click(screen.getByText('Leather'));
    expect(onSelect).toHaveBeenCalledWith('top', expect.any(Object));
  });
});
```

---

## Common Props Interface

Most components follow this pattern:

```typescript
interface CommonProps {
  // State
  isOpen?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  
  // Callbacks
  onClose?: () => void;
  onClick?: () => void;
  onChange?: (value: any) => void;
  
  // Styling
  className?: string;
  style?: React.CSSProperties;
  
  // Content
  children?: React.ReactNode;
}
```

---

## Dependencies

- **React**: ^18.2.0
- **lucide-react**: ^0.263.1 (icons)
- **Tailwind CSS**: ^4.1.18 (styling)

---

## Future Components

Planned additions:
- `ColorPicker.jsx` - Custom color selection
- `SizeSelector.jsx` - Size recommendations
- `StyleQuiz.jsx` - Personalization quiz
- `CommunityFeed.jsx` - Social feed
- `NotificationCenter.jsx` - In-app notifications

---

## Component Checklist

When creating new components:
- [ ] PropTypes or TypeScript types
- [ ] Default props
- [ ] Error boundaries
- [ ] Loading states
- [ ] Empty states
- [ ] Accessibility attributes
- [ ] Responsive design
- [ ] Dark mode support
- [ ] Documentation
- [ ] Tests

---

## Questions?

Check the main FEATURES.md or reach out to the development team.
