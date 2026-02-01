/**
 * Compress and optimize image before upload
 * @param {string} dataUrl - Base64 data URL of the image
 * @param {Object} options - Compression options
 * @returns {Promise<string>} - Compressed image data URL
 */
export const compressImage = async (dataUrl, options = {}) => {
  const {
    maxWidth = 1024,
    maxHeight = 1024,
    quality = 0.85,
    format = 'image/jpeg'
  } = options;

  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let { width, height } = img;

      // Calculate new dimensions while maintaining aspect ratio
      if (width > height) {
        if (width > maxWidth) {
          height = Math.round(height * (maxWidth / width));
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = Math.round(width * (maxHeight / height));
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      
      // Enable image smoothing for better quality
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      
      ctx.drawImage(img, 0, 0, width, height);

      // Convert to desired format with quality setting
      const compressedDataUrl = canvas.toDataURL(format, quality);
      
      // Calculate compression ratio
      const originalSize = dataUrl.length;
      const compressedSize = compressedDataUrl.length;
      const ratio = ((1 - compressedSize / originalSize) * 100).toFixed(1);
      
      console.log(`Image compressed: ${ratio}% reduction (${originalSize} → ${compressedSize} bytes)`);
      
      resolve(compressedDataUrl);
    };

    img.onerror = () => reject(new Error('Failed to load image for compression'));
    img.src = dataUrl;
  });
};

/**
 * Convert HEIC to JPEG format
 * @param {File} file - HEIC file
 * @returns {Promise<string>} - JPEG data URL
 */
export const convertHeicToJpeg = async (file) => {
  if (!window.heic2any) {
    throw new Error('HEIC converter not loaded');
  }

  try {
    const convertedBlob = await window.heic2any({
      blob: file,
      toType: 'image/jpeg',
      quality: 0.9
    });

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob);
    });
  } catch (error) {
    throw new Error('Failed to convert HEIC image');
  }
};

/**
 * Get estimated file size from data URL
 * @param {string} dataUrl - Base64 data URL
 * @returns {number} - Estimated size in bytes
 */
export const getDataUrlSize = (dataUrl) => {
  const base64 = dataUrl.split(',')[1];
  return Math.ceil((base64.length * 3) / 4);
};
