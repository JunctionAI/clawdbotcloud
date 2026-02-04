import React, { useState, useEffect } from 'react';

interface ScarcityIndicatorProps {
  variant?: 'spots-left' | 'stock-limited' | 'time-sensitive' | 'high-demand';
  initialCount?: number;
  minCount?: number;
  updateInterval?: number; // ms
  message?: string;
}

export const ScarcityIndicator: React.FC<ScarcityIndicatorProps> = ({
  variant = 'spots-left',
  initialCount = 7,
  minCount = 2,
  updateInterval = 30000,
  message,
}) => {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    // Randomly decrease count over time
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev <= minCount) return prev;
        // 30% chance to decrease
        return Math.random() > 0.7 ? prev - 1 : prev;
      });
    }, updateInterval);

    return () => clearInterval(interval);
  }, [minCount, updateInterval]);

  const renderContent = () => {
    switch (variant) {
      case 'spots-left':
        return (
          <div className="flex items-center space-x-3">
            <div className="relative">
              <svg className="w-8 h-8 text-orange-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">
                {message || `Only ${count} spots left at this price!`}
              </p>
              <p className="text-xs text-gray-600">
                {count <= 3 ? '🔥 Almost gone!' : 'Filling up fast'}
              </p>
            </div>
          </div>
        );

      case 'stock-limited':
        const percentage = (count / initialCount) * 100;
        return (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <p className="text-sm font-semibold text-gray-900">
                {message || 'Stock Level'}
              </p>
              <p className="text-sm font-bold text-orange-600">
                {count} left
              </p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  percentage > 50 ? 'bg-green-500' : percentage > 25 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className="text-xs text-gray-600">
              {percentage < 25 ? '⚠️ Low stock - order soon!' : 'In stock now'}
            </p>
          </div>
        );

      case 'time-sensitive':
        return (
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <svg className="w-6 h-6 text-red-600 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="font-bold text-gray-900 mb-1">
                  {message || '⚡ Flash Sale - Limited Time!'}
                </p>
                <p className="text-sm text-gray-700">
                  {count} people viewing this right now
                </p>
              </div>
            </div>
          </div>
        );

      case 'high-demand':
        return (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    🔥 High Demand
                  </p>
                  <p className="text-xs text-gray-600">
                    {message || `${count * 12} people purchased in the last 24 hours`}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">{count * 12}</p>
                <p className="text-xs text-gray-600">purchases</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      {renderContent()}
    </div>
  );
};
