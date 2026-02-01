'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import UploadZone from './components/UploadZone';
import ClothingCatalog from './components/ClothingCatalog';
import ComparisonSlider from './components/ComparisonSlider';
import { ClothingItem, UploadedSelfie, TryOnResult } from './types';
import { generateTryOn } from './lib/gemini';

export default function Home() {
  const [selfie, setSelfie] = useState<UploadedSelfie | null>(null);
  const [selectedClothing, setSelectedClothing] = useState<ClothingItem | null>(null);
  const [tryOnResult, setTryOnResult] = useState<TryOnResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSelfieUpload = (file: File, preview: string) => {
    setSelfie({ file, preview, uploaded: true });
    setTryOnResult(null); // Reset result when new selfie is uploaded
  };

  const handleClothingSelect = async (item: ClothingItem) => {
    setSelectedClothing(item);
    
    if (!selfie) {
      return;
    }

    // Start try-on process
    setIsProcessing(true);
    setTryOnResult({
      originalImage: selfie.preview,
      tryOnImage: selfie.preview, // Placeholder
      timestamp: Date.now(),
      clothingItem: item,
      processing: true,
    });

    try {
      // Convert clothing image URL to base64 (simplified - in production would fetch and convert)
      const clothingImageBase64 = await fetchImageAsBase64(item.imageUrl);
      
      const result = await generateTryOn({
        selfieImage: selfie.preview,
        clothingImage: clothingImageBase64,
      });

      setTryOnResult({
        originalImage: selfie.preview,
        tryOnImage: result,
        timestamp: Date.now(),
        clothingItem: item,
        processing: false,
      });
    } catch (error) {
      console.error('Try-on failed:', error);
      setTryOnResult({
        originalImage: selfie.preview,
        tryOnImage: selfie.preview,
        timestamp: Date.now(),
        clothingItem: item,
        processing: false,
        error: 'Failed to generate try-on. Please try again.',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const fetchImageAsBase64 = async (url: string): Promise<string> => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Failed to fetch image:', error);
      return '';
    }
  };

  const currentStep = !selfie ? 1 : !tryOnResult ? 2 : 3;

  return (
    <main className="min-h-screen bg-dark-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-dark-bg/80 backdrop-blur-xl border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-purple to-accent-pink flex items-center justify-center">
                <span className="text-2xl">👔</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Style Swap</h1>
                <p className="text-xs text-gray-400">AI Fashion Try-On</p>
              </div>
            </motion.div>

            {/* Progress Indicator */}
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    step <= currentStep
                      ? 'bg-gradient-to-r from-accent-purple to-accent-pink w-8'
                      : 'bg-dark-border'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Upload & Result */}
          <div>
            <AnimatePresence mode="wait">
              {!tryOnResult ? (
                <UploadZone
                  key="upload"
                  onUpload={handleSelfieUpload}
                  currentImage={selfie?.preview}
                />
              ) : (
                <ComparisonSlider
                  key="result"
                  beforeImage={tryOnResult.originalImage}
                  afterImage={tryOnResult.tryOnImage}
                  isProcessing={isProcessing}
                />
              )}
            </AnimatePresence>

            {/* Error Message */}
            {tryOnResult?.error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl"
              >
                <p className="text-red-400 text-sm">{tryOnResult.error}</p>
              </motion.div>
            )}

            {/* Info Cards */}
            {!selfie && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8 grid grid-cols-3 gap-4"
              >
                {[
                  { icon: '🤖', label: 'AI Powered' },
                  { icon: '⚡', label: 'Instant' },
                  { icon: '🔒', label: 'Private' },
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="p-4 bg-dark-card rounded-xl text-center border border-dark-border"
                  >
                    <div className="text-3xl mb-2">{feature.icon}</div>
                    <p className="text-sm text-gray-400">{feature.label}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Right Column - Catalog */}
          <div>
            <ClothingCatalog
              onSelectItem={handleClothingSelect}
              selectedItem={selectedClothing ?? undefined}
              disabled={!selfie || isProcessing}
            />

            {/* Try Again Button */}
            {tryOnResult && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onClick={() => {
                  setTryOnResult(null);
                  setSelectedClothing(null);
                }}
                className="w-full mt-6 px-6 py-4 bg-dark-card hover:bg-dark-border text-white font-medium rounded-xl transition-colors border border-dark-border"
              >
                Try Another Style 🔄
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            Powered by Gemini 2.5 Flash • Made with 💜 in 2026
          </p>
        </div>
      </footer>
    </main>
  );
}
