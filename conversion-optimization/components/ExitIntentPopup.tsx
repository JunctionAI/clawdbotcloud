import React, { useEffect } from 'react';
import { useExitIntent } from '../hooks/useExitIntent';
import { trackExitIntent } from '../utils/analytics';

interface ExitIntentPopupProps {
  title?: string;
  subtitle?: string;
  discount?: string;
  ctaText?: string;
  onClaim?: () => void;
  enabled?: boolean;
}

export const ExitIntentPopup: React.FC<ExitIntentPopupProps> = ({
  title = "Wait! Don't Leave Empty Handed 🎁",
  subtitle = "Get an exclusive 20% discount on your first purchase",
  discount = "20% OFF",
  ctaText = "Claim My Discount",
  onClaim,
  enabled = true,
}) => {
  const { showExitIntent, hideExitIntent } = useExitIntent({ enabled });

  useEffect(() => {
    if (showExitIntent) {
      trackExitIntent('shown');
    }
  }, [showExitIntent]);

  const handleClaim = () => {
    trackExitIntent('converted');
    if (onClaim) onClaim();
    hideExitIntent();
  };

  const handleDismiss = () => {
    trackExitIntent('dismissed');
    hideExitIntent();
  };

  if (!showExitIntent) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm animate-fadeIn">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 p-8 animate-slideUp">
        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Discount Badge */}
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-3 rounded-full text-2xl font-bold shadow-lg transform -rotate-2">
            {discount}
          </div>
        </div>

        {/* Content */}
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-3">
          {title}
        </h2>
        <p className="text-gray-600 text-center mb-6 text-lg">
          {subtitle}
        </p>

        {/* Social Proof */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-700">
            <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            <span className="font-semibold">1,247 people</span>
            <span>claimed this offer today</span>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleClaim}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
        >
          {ctaText} →
        </button>

        {/* Urgency */}
        <p className="text-center text-sm text-gray-500 mt-4">
          ⏰ This exclusive offer expires when you close this window
        </p>

        {/* Trust Indicators */}
        <div className="flex justify-center items-center space-x-4 mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center text-xs text-gray-600">
            <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            No credit card required
          </div>
          <div className="flex items-center text-xs text-gray-600">
            <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Secure checkout
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};
