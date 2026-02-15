// ========================================
// LOADING STATE
// ========================================
// Next.js will show this while the page is loading
// Provides instant visual feedback for better perceived performance

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="relative">
        {/* Animated logo placeholder */}
        <div className="w-16 h-16 relative">
          {/* Spinning ring */}
          <div className="absolute inset-0 rounded-full border-4 border-blue-100" />
          <div 
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 animate-spin"
            style={{ animationDuration: '0.8s' }}
          />
          
          {/* Center pulse */}
          <div className="absolute inset-3 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 animate-pulse" />
        </div>
        
        {/* Loading text */}
        <p className="mt-4 text-sm text-gray-400 font-medium text-center">
          Loading...
        </p>
      </div>
    </div>
  );
}
