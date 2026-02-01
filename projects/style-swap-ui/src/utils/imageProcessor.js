// Image processing utilities

export const getBase64Data = (dataUrl) => {
  return dataUrl.split(',')[1];
};

export const resizeImage = (dataUrl, maxDim = 1024) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;
      
      if (width > height) {
        if (width > maxDim) {
          height *= maxDim / width;
          width = maxDim;
        }
      } else {
        if (height > maxDim) {
          width *= maxDim / height;
          height = maxDim;
        }
      }
      
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', 0.85));
    };
    img.onerror = reject;
    img.src = dataUrl;
  });
};

export const convertHeicToJpeg = async (file) => {
  if (!window.heic2any) {
    throw new Error('HEIC converter not loaded');
  }
  
  const blob = await window.heic2any({ 
    blob: file, 
    toType: "image/jpeg" 
  });
  
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(Array.isArray(blob) ? blob[0] : blob);
  });
};

export const downloadImage = (dataUrl, filename = 'style-swap-image.png') => {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();
};
