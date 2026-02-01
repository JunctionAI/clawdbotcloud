/**
 * Example Unit Test - UploadZone Component
 * 
 * This file demonstrates how to write comprehensive unit tests
 * for React components using Jest and React Testing Library.
 * 
 * Location: app/__tests__/components/UploadZone.test.tsx
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UploadZone } from '@/app/components/UploadZone';

describe('UploadZone Component', () => {
  // Mock function to track callbacks
  const mockOnImageUpload = jest.fn();
  
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  // Test 1: Component renders correctly
  it('renders upload zone with instructions', () => {
    render(
      <UploadZone 
        onImageUpload={mockOnImageUpload}
        currentImage={null}
      />
    );
    
    // Check if key text is present
    expect(screen.getByText(/drag.*drop/i)).toBeInTheDocument();
    expect(screen.getByText(/click to upload/i)).toBeInTheDocument();
  });
  
  // Test 2: File upload via input
  it('handles file upload via input', async () => {
    render(
      <UploadZone 
        onImageUpload={mockOnImageUpload}
        currentImage={null}
      />
    );
    
    // Create a fake file
    const file = new File(['dummy content'], 'test.jpg', { 
      type: 'image/jpeg' 
    });
    
    // Get the file input
    const input = screen.getByLabelText(/upload/i) as HTMLInputElement;
    
    // Upload the file
    await userEvent.upload(input, file);
    
    // Verify callback was called with correct arguments
    await waitFor(() => {
      expect(mockOnImageUpload).toHaveBeenCalledWith(
        file,
        expect.stringContaining('data:image')
      );
    });
  });
  
  // Test 3: Invalid file type rejection
  it('shows error for invalid file type', async () => {
    // Spy on console.log to verify error logging
    const consoleError = jest.spyOn(console, 'log');
    
    render(
      <UploadZone 
        onImageUpload={mockOnImageUpload}
        currentImage={null}
      />
    );
    
    // Create an invalid file
    const file = new File(['dummy'], 'test.txt', { 
      type: 'text/plain' 
    });
    
    const input = screen.getByLabelText(/upload/i) as HTMLInputElement;
    await userEvent.upload(input, file);
    
    // Verify callback was NOT called
    expect(mockOnImageUpload).not.toHaveBeenCalled();
    
    consoleError.mockRestore();
  });
  
  // Test 4: File size validation
  it('shows error for file too large', async () => {
    // Mock window.alert
    window.alert = jest.fn();
    
    render(
      <UploadZone 
        onImageUpload={mockOnImageUpload}
        currentImage={null}
      />
    );
    
    // Create file larger than 10MB
    const largeFile = new File(
      ['x'.repeat(11 * 1024 * 1024)], 
      'large.jpg', 
      { type: 'image/jpeg' }
    );
    
    const input = screen.getByLabelText(/upload/i) as HTMLInputElement;
    await userEvent.upload(input, largeFile);
    
    // Verify alert was shown
    expect(window.alert).toHaveBeenCalledWith(
      expect.stringContaining('too large')
    );
    
    // Verify callback was NOT called
    expect(mockOnImageUpload).not.toHaveBeenCalled();
  });
  
  // Test 5: Image preview display
  it('displays preview when image is uploaded', () => {
    const preview = 'data:image/jpeg;base64,test123';
    
    render(
      <UploadZone 
        onImageUpload={mockOnImageUpload}
        currentImage={preview}
      />
    );
    
    // Find the preview image
    const img = screen.getByAltText(/preview/i);
    
    // Verify it has the correct src
    expect(img).toHaveAttribute('src', preview);
  });
  
  // Test 6: Drag and drop functionality
  it('handles drag and drop', async () => {
    render(
      <UploadZone 
        onImageUpload={mockOnImageUpload}
        currentImage={null}
      />
    );
    
    const dropzone = screen.getByText(/drag.*drop/i).parentElement!;
    
    // Create a file for drag-drop
    const file = new File(['content'], 'test.jpg', { 
      type: 'image/jpeg' 
    });
    
    // Simulate drag over
    fireEvent.dragOver(dropzone);
    expect(dropzone).toHaveClass('border-accent-purple');
    
    // Simulate drop
    fireEvent.drop(dropzone, {
      dataTransfer: { files: [file] },
    });
    
    // Verify callback was called
    await waitFor(() => {
      expect(mockOnImageUpload).toHaveBeenCalled();
    });
  });
  
  // Test 7: Drag leave behavior
  it('removes drag styling when drag leaves', () => {
    render(
      <UploadZone 
        onImageUpload={mockOnImageUpload}
        currentImage={null}
      />
    );
    
    const dropzone = screen.getByText(/drag.*drop/i).parentElement!;
    
    // Drag over
    fireEvent.dragOver(dropzone);
    expect(dropzone).toHaveClass('border-accent-purple');
    
    // Drag leave
    fireEvent.dragLeave(dropzone);
    expect(dropzone).not.toHaveClass('border-accent-purple');
  });
  
  // Test 8: Multiple file selection (should only use first)
  it('handles multiple file selection by using first file only', async () => {
    render(
      <UploadZone 
        onImageUpload={mockOnImageUpload}
        currentImage={null}
      />
    );
    
    const file1 = new File(['content1'], 'test1.jpg', { type: 'image/jpeg' });
    const file2 = new File(['content2'], 'test2.jpg', { type: 'image/jpeg' });
    
    const input = screen.getByLabelText(/upload/i) as HTMLInputElement;
    
    await userEvent.upload(input, [file1, file2]);
    
    // Should only process first file
    await waitFor(() => {
      expect(mockOnImageUpload).toHaveBeenCalledTimes(1);
      expect(mockOnImageUpload).toHaveBeenCalledWith(
        file1,
        expect.any(String)
      );
    });
  });
  
  // Test 9: Accessibility - keyboard navigation
  it('is keyboard accessible', () => {
    render(
      <UploadZone 
        onImageUpload={mockOnImageUpload}
        currentImage={null}
      />
    );
    
    const input = screen.getByLabelText(/upload/i);
    
    // Should be focusable
    input.focus();
    expect(input).toHaveFocus();
    
    // Should have proper ARIA attributes
    expect(input).toHaveAttribute('type', 'file');
  });
  
  // Test 10: Component updates when currentImage changes
  it('updates preview when currentImage prop changes', () => {
    const { rerender } = render(
      <UploadZone 
        onImageUpload={mockOnImageUpload}
        currentImage={null}
      />
    );
    
    // Initially no preview
    expect(screen.queryByAltText(/preview/i)).not.toBeInTheDocument();
    
    // Rerender with image
    const newImage = 'data:image/jpeg;base64,newimage';
    rerender(
      <UploadZone 
        onImageUpload={mockOnImageUpload}
        currentImage={newImage}
      />
    );
    
    // Now preview should appear
    const img = screen.getByAltText(/preview/i);
    expect(img).toHaveAttribute('src', newImage);
  });
});

/**
 * Best Practices Demonstrated:
 * 
 * 1. Clear test descriptions (it('does something'))
 * 2. Arrange-Act-Assert pattern
 * 3. Mocking external dependencies
 * 4. Testing user interactions
 * 5. Testing error cases
 * 6. Accessibility testing
 * 7. Cleanup between tests
 * 8. Comprehensive coverage
 */
