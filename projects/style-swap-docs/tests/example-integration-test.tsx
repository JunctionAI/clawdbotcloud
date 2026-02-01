/**
 * Example Integration Test - Full Try-On Flow
 * 
 * This file demonstrates how to write integration tests that test
 * multiple components working together.
 * 
 * Location: app/__tests__/integration/try-on-flow.test.tsx
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Page from '@/app/page';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

// Mock API server for testing
const server = setupServer(
  rest.post('/api/try-on', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        tryOnImage: 'data:image/jpeg;base64,mockresult',
        analysis: 'This outfit looks great on you!',
        metadata: {
          processingTime: 2000,
          modelVersion: 'gemini-2.0-flash-exp',
          timestamp: Date.now(),
        },
      })
    );
  })
);

// Start server before tests
beforeAll(() => server.listen());

// Reset handlers after each test
afterEach(() => server.resetHandlers());

// Close server after all tests
afterAll(() => server.close());

describe('Try-On Flow Integration', () => {
  // Test 1: Complete user journey
  it('completes full try-on workflow', async () => {
    const user = userEvent.setup();
    
    render(<Page />);
    
    // Step 1: Verify initial state
    expect(screen.getByText(/upload.*selfie/i)).toBeInTheDocument();
    expect(screen.getByText(/browse.*catalog/i)).toBeInTheDocument();
    
    // Step 2: Upload selfie
    const file = new File(['selfie'], 'selfie.jpg', { type: 'image/jpeg' });
    const input = screen.getByLabelText(/upload/i) as HTMLInputElement;
    
    await user.upload(input, file);
    
    // Verify upload success
    await waitFor(() => {
      expect(screen.getByAltText(/preview/i)).toBeInTheDocument();
    });
    
    // Step 3: Catalog should now be active
    const catalogSection = screen.getByText(/browse catalog/i).parentElement!;
    expect(catalogSection).not.toHaveClass('opacity-50');
    
    // Step 4: Select clothing item
    const clothingItems = await screen.findAllByRole('button', {
      name: /select/i,
    });
    
    expect(clothingItems.length).toBeGreaterThan(0);
    
    await user.click(clothingItems[0]);
    
    // Step 5: Verify processing state
    expect(await screen.findByText(/processing/i)).toBeInTheDocument();
    expect(await screen.findByTestId('loading-spinner')).toBeInTheDocument();
    
    // Step 6: Wait for result
    await waitFor(
      () => {
        expect(screen.getByText(/outfit looks great/i)).toBeInTheDocument();
      },
      { timeout: 5000 }
    );
    
    // Step 7: Verify comparison slider appears
    const comparisonSlider = await screen.findByTestId('comparison-slider');
    expect(comparisonSlider).toBeInTheDocument();
    
    // Step 8: Verify result images
    const resultImages = screen.getAllByRole('img');
    expect(resultImages.length).toBeGreaterThanOrEqual(2);
  });
  
  // Test 2: Error handling in flow
  it('handles API errors gracefully', async () => {
    const user = userEvent.setup();
    
    // Mock API error
    server.use(
      rest.post('/api/try-on', (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({
            error: 'Processing failed',
            code: 'PROCESSING_FAILED',
          })
        );
      })
    );
    
    render(<Page />);
    
    // Upload selfie
    const file = new File(['selfie'], 'selfie.jpg', { type: 'image/jpeg' });
    const input = screen.getByLabelText(/upload/i) as HTMLInputElement;
    await user.upload(input, file);
    
    // Select clothing
    await waitFor(() => {
      const items = screen.getAllByRole('button', { name: /select/i });
      return user.click(items[0]);
    });
    
    // Verify error message appears
    await waitFor(() => {
      expect(screen.getByText(/processing failed/i)).toBeInTheDocument();
    });
    
    // Verify user can retry
    const retryButton = screen.getByText(/try again/i);
    expect(retryButton).toBeInTheDocument();
  });
  
  // Test 3: Multiple try-ons in sequence
  it('allows multiple try-ons without refresh', async () => {
    const user = userEvent.setup();
    
    render(<Page />);
    
    // Upload selfie
    const file = new File(['selfie'], 'selfie.jpg', { type: 'image/jpeg' });
    const input = screen.getByLabelText(/upload/i) as HTMLInputElement;
    await user.upload(input, file);
    
    // First try-on
    await waitFor(async () => {
      const items = screen.getAllByRole('button', { name: /select/i });
      await user.click(items[0]);
    });
    
    await waitFor(() => {
      expect(screen.getByTestId('comparison-slider')).toBeInTheDocument();
    });
    
    // Click "Try Another"
    const tryAnotherButton = screen.getByText(/try another/i);
    await user.click(tryAnotherButton);
    
    // Verify returned to catalog
    expect(screen.queryByTestId('comparison-slider')).not.toBeInTheDocument();
    expect(screen.getByText(/browse catalog/i)).toBeInTheDocument();
    
    // Second try-on
    await waitFor(async () => {
      const items = screen.getAllByRole('button', { name: /select/i });
      await user.click(items[1]);
    });
    
    // Verify new result
    await waitFor(() => {
      expect(screen.getByTestId('comparison-slider')).toBeInTheDocument();
    });
  });
  
  // Test 4: Category filtering integration
  it('filters catalog by category and selects item', async () => {
    const user = userEvent.setup();
    
    render(<Page />);
    
    // Upload selfie first
    const file = new File(['selfie'], 'selfie.jpg', { type: 'image/jpeg' });
    const input = screen.getByLabelText(/upload/i) as HTMLInputElement;
    await user.upload(input, file);
    
    // Click "Tops" category
    const topsButton = screen.getByText(/^tops$/i);
    await user.click(topsButton);
    
    // Verify only tops are shown
    const items = screen.getAllByRole('button', { name: /select/i });
    
    // All items should be tops (verify via data attributes or text)
    items.forEach((item) => {
      expect(item).toHaveAttribute('data-category', 'tops');
    });
    
    // Select a top
    await user.click(items[0]);
    
    // Verify processing starts
    expect(await screen.findByText(/processing/i)).toBeInTheDocument();
  });
  
  // Test 5: State persistence across interactions
  it('maintains state when switching between views', async () => {
    const user = userEvent.setup();
    
    render(<Page />);
    
    // Upload selfie
    const file = new File(['selfie'], 'selfie.jpg', { type: 'image/jpeg' });
    const input = screen.getByLabelText(/upload/i) as HTMLInputElement;
    await user.upload(input, file);
    
    // Verify preview is shown
    const preview = await screen.findByAltText(/preview/i);
    const previewSrc = preview.getAttribute('src');
    
    // Select clothing
    await waitFor(async () => {
      const items = screen.getAllByRole('button', { name: /select/i });
      await user.click(items[0]);
    });
    
    // Wait for result
    await waitFor(() => {
      expect(screen.getByTestId('comparison-slider')).toBeInTheDocument();
    });
    
    // Go back to catalog
    await user.click(screen.getByText(/try another/i));
    
    // Verify preview is still there
    const stillPreview = screen.getByAltText(/preview/i);
    expect(stillPreview.getAttribute('src')).toBe(previewSrc);
  });
  
  // Test 6: Loading states
  it('shows appropriate loading states during processing', async () => {
    const user = userEvent.setup();
    
    // Mock slow API response
    server.use(
      rest.post('/api/try-on', async (req, res, ctx) => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return res(
          ctx.json({
            success: true,
            tryOnImage: 'data:image/jpeg;base64,mockresult',
            analysis: 'Looks great!',
          })
        );
      })
    );
    
    render(<Page />);
    
    // Upload and select
    const file = new File(['selfie'], 'selfie.jpg', { type: 'image/jpeg' });
    const input = screen.getByLabelText(/upload/i) as HTMLInputElement;
    await user.upload(input, file);
    
    await waitFor(async () => {
      const items = screen.getAllByRole('button', { name: /select/i });
      await user.click(items[0]);
    });
    
    // Verify loading state
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    expect(screen.getByText(/processing/i)).toBeInTheDocument();
    
    // Verify catalog is disabled during processing
    const catalogSection = screen.getByText(/browse catalog/i).parentElement!;
    expect(catalogSection).toHaveClass('opacity-50');
    
    // Wait for completion
    await waitFor(
      () => {
        expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
      },
      { timeout: 5000 }
    );
  });
  
  // Test 7: Comparison slider interaction
  it('allows slider interaction after try-on completes', async () => {
    const user = userEvent.setup();
    
    render(<Page />);
    
    // Complete try-on flow
    const file = new File(['selfie'], 'selfie.jpg', { type: 'image/jpeg' });
    const input = screen.getByLabelText(/upload/i) as HTMLInputElement;
    await user.upload(input, file);
    
    await waitFor(async () => {
      const items = screen.getAllByRole('button', { name: /select/i });
      await user.click(items[0]);
    });
    
    // Wait for slider
    const slider = await screen.findByRole('slider');
    expect(slider).toBeInTheDocument();
    
    // Test keyboard navigation
    slider.focus();
    expect(slider).toHaveFocus();
    
    // Simulate arrow key press
    await user.keyboard('{ArrowRight}');
    
    // Slider should have updated (check aria-valuenow)
    const currentValue = slider.getAttribute('aria-valuenow');
    expect(parseInt(currentValue || '50')).toBeGreaterThan(50);
  });
  
  // Test 8: Accessibility throughout flow
  it('maintains accessibility throughout user journey', async () => {
    const user = userEvent.setup();
    
    render(<Page />);
    
    // Check initial accessibility
    expect(screen.getByRole('main')).toBeInTheDocument();
    
    // Upload with keyboard
    const input = screen.getByLabelText(/upload/i);
    input.focus();
    
    // Simulate Enter key to open file picker (would work in real browser)
    await user.keyboard('{Enter}');
    
    // Upload file
    const file = new File(['selfie'], 'selfie.jpg', { type: 'image/jpeg' });
    await user.upload(input as HTMLInputElement, file);
    
    // Tab to catalog
    await user.tab();
    
    // Verify focus moves to catalog item
    const focusedElement = document.activeElement;
    expect(focusedElement?.getAttribute('role')).toBe('button');
  });
});

/**
 * Integration Testing Best Practices Demonstrated:
 * 
 * 1. Test full user workflows
 * 2. Mock external dependencies (API calls)
 * 3. Test error scenarios
 * 4. Test state management
 * 5. Test component interactions
 * 6. Test loading states
 * 7. Test accessibility
 * 8. Use realistic data
 * 9. Verify UI updates
 * 10. Test edge cases
 */
