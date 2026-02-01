import React from 'react';

export const ImageSkeleton = ({ className = '' }) => (
  <div className={`relative overflow-hidden bg-white/5 ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
  </div>
);

export const CardSkeleton = ({ className = '' }) => (
  <div className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 ${className}`}>
    <div className="space-y-4">
      <div className="h-4 bg-white/10 rounded-full w-3/4 animate-pulse" />
      <div className="h-4 bg-white/10 rounded-full w-1/2 animate-pulse delay-75" />
      <div className="h-8 bg-white/10 rounded-2xl w-full animate-pulse delay-150" />
    </div>
  </div>
);

export const ButtonSkeleton = ({ className = '' }) => (
  <div className={`h-12 bg-white/10 rounded-full animate-pulse ${className}`} />
);

export const GallerySkeletonLoader = () => (
  <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
    {[...Array(5)].map((_, i) => (
      <div
        key={i}
        className="flex-shrink-0 w-24 h-32 rounded-[32px] bg-white/5 border border-white/5 animate-pulse"
        style={{ animationDelay: `${i * 100}ms` }}
      />
    ))}
  </div>
);

export const ProcessingSkeleton = () => (
  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center z-50">
    <div className="relative">
      <div className="w-20 h-20 border-4 border-white/10 border-t-[#667EEA] rounded-full animate-spin" />
      <div className="absolute inset-2 border-4 border-white/5 border-b-[#764BA2] rounded-full animate-spin-reverse" />
    </div>
    <div className="mt-6 flex flex-col items-center gap-2">
      <div className="h-2 bg-white/10 rounded-full w-32 animate-pulse" />
      <div className="h-2 bg-white/10 rounded-full w-24 animate-pulse delay-100" />
    </div>
  </div>
);
