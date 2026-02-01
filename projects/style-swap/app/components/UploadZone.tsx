'use client';

import { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface UploadZoneProps {
  onUpload: (file: File, preview: string) => void;
  currentImage?: string;
}

export default function UploadZone({ onUpload, currentImage }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      
      const files = Array.from(e.dataTransfer.files);
      const imageFile = files.find((file) => file.type.startsWith('image/'));
      
      if (imageFile) {
        processFile(imageFile);
      }
    },
    []
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && file.type.startsWith('image/')) {
        processFile(file);
      }
    },
    []
  );

  const processFile = async (file: File) => {
    setIsProcessing(true);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const preview = e.target?.result as string;
      onUpload(file, preview);
      setIsProcessing(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-white mb-2">Upload Your Selfie</h2>
        <p className="text-gray-400 text-sm">
          Take or upload a clear front-facing photo for best results
        </p>
      </div>

      <label
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative block w-full rounded-2xl border-2 border-dashed cursor-pointer
          overflow-hidden transition-all duration-300
          ${isDragging ? 'border-accent-purple bg-accent-purple/10' : 'border-dark-border bg-dark-card'}
          ${currentImage ? 'aspect-[3/4]' : 'aspect-square'}
          hover:border-accent-purple/50 hover:bg-dark-card/80
        `}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          disabled={isProcessing}
        />

        <AnimatePresence mode="wait">
          {currentImage ? (
            <motion.div
              key="image"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative w-full h-full"
            >
              <Image
                src={currentImage}
                alt="Your selfie"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white font-medium mb-1">Looking good! 📸</p>
                <p className="text-gray-300 text-sm">Click to change photo</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
            >
              {isProcessing ? (
                <>
                  <div className="w-16 h-16 mb-4 rounded-full border-4 border-accent-purple border-t-transparent animate-spin" />
                  <p className="text-white font-medium">Processing...</p>
                </>
              ) : (
                <>
                  <div className="w-20 h-20 mb-4 rounded-full bg-gradient-to-br from-accent-purple to-accent-pink flex items-center justify-center">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                  <p className="text-white font-medium mb-2">
                    {isDragging ? 'Drop your photo here' : 'Upload a selfie'}
                  </p>
                  <p className="text-gray-400 text-sm">
                    Drag & drop or click to browse
                  </p>
                  <p className="text-gray-500 text-xs mt-2">
                    JPG, PNG, WEBP • Max 10MB
                  </p>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </label>
    </motion.div>
  );
}
