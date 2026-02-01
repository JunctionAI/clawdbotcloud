import React, { useRef, useState } from 'react';
import { Share2, Instagram, Facebook, Twitter, Download, Link2, Check } from 'lucide-react';

const SocialShare = ({ imageUrl, lookDetails, onClose }) => {
  const canvasRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);

  const generateShareableImage = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Set canvas size
      canvas.width = 1080;
      canvas.height = 1920;

      // Draw image
      ctx.drawImage(img, 0, 0, 1080, 1920);

      // Add gradient overlay at bottom
      const gradient = ctx.createLinearGradient(0, 1600, 0, 1920);
      gradient.addColorStop(0, 'rgba(0,0,0,0)');
      gradient.addColorStop(1, 'rgba(0,0,0,0.9)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 1600, 1080, 320);

      // Add watermark/branding
      ctx.fillStyle = 'white';
      ctx.font = 'bold 48px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('STYLE SWAP', 540, 1800);

      ctx.font = '24px sans-serif';
      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      ctx.fillText('AI-Powered Fashion Try-On', 540, 1840);

      // Add item tags
      if (lookDetails?.items) {
        let yPos = 1880;
        ctx.font = 'bold 20px sans-serif';
        const items = Object.values(lookDetails.items).filter(Boolean);
        const text = items.map(i => i.name).join(' · ');
        ctx.fillText(text, 540, yPos);
      }

      // Convert to data URL
      const dataUrl = canvas.toDataURL('image/png', 0.95);
      setGeneratedImage(dataUrl);
    };

    img.src = imageUrl;
  };

  React.useEffect(() => {
    generateShareableImage();
  }, [imageUrl]);

  const downloadImage = () => {
    if (!generatedImage) return;
    
    const link = document.createElement('a');
    link.download = `style-swap-${Date.now()}.png`;
    link.href = generatedImage;
    link.click();
  };

  const shareToSocial = (platform) => {
    const url = window.location.href;
    const text = 'Check out my new look created with Style Swap AI!';
    
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      instagram: null, // Instagram doesn't support web sharing
    };

    if (urls[platform]) {
      window.open(urls[platform], '_blank', 'width=600,height=400');
    } else {
      // For Instagram, download the image
      downloadImage();
      alert('Image downloaded! Share it on Instagram from your device.');
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-2xl z-[300] flex items-center justify-center p-6">
      <div className="bg-white/10 backdrop-blur-3xl border border-white/20 rounded-[50px] max-w-md w-full overflow-hidden">
        {/* Hidden canvas for image generation */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Share2 size={20} className="text-white" />
            <h2 className="text-xl font-black text-white tracking-tight">Share Your Look</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-white/60 hover:text-white transition-all"
          >
            ✕
          </button>
        </div>

        {/* Preview */}
        <div className="p-6">
          {generatedImage && (
            <div className="aspect-[9/16] rounded-3xl overflow-hidden mb-6 border border-white/10">
              <img 
                src={generatedImage} 
                alt="Share preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Share options */}
          <div className="space-y-3">
            <button
              onClick={() => shareToSocial('instagram')}
              className="w-full flex items-center gap-4 p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl text-white font-bold transition-all hover:scale-105 active:scale-95"
            >
              <Instagram size={24} />
              <span>Share to Instagram Stories</span>
            </button>

            <button
              onClick={() => shareToSocial('twitter')}
              className="w-full flex items-center gap-4 p-4 bg-[#1DA1F2] rounded-2xl text-white font-bold transition-all hover:scale-105 active:scale-95"
            >
              <Twitter size={24} />
              <span>Share to Twitter</span>
            </button>

            <button
              onClick={() => shareToSocial('facebook')}
              className="w-full flex items-center gap-4 p-4 bg-[#4267B2] rounded-2xl text-white font-bold transition-all hover:scale-105 active:scale-95"
            >
              <Facebook size={24} />
              <span>Share to Facebook</span>
            </button>

            <div className="flex gap-3">
              <button
                onClick={downloadImage}
                className="flex-1 flex items-center justify-center gap-2 p-4 bg-white/10 rounded-2xl text-white font-bold transition-all hover:bg-white/20 active:scale-95"
              >
                <Download size={20} />
                <span>Download</span>
              </button>

              <button
                onClick={copyLink}
                className="flex-1 flex items-center justify-center gap-2 p-4 bg-white/10 rounded-2xl text-white font-bold transition-all hover:bg-white/20 active:scale-95"
              >
                {copied ? <Check size={20} /> : <Link2 size={20} />}
                <span>{copied ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialShare;
