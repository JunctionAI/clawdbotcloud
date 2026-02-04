import React from 'react';

interface GuaranteeBadgeProps {
  variant?: 'money-back' | 'satisfaction' | 'custom';
  days?: number;
  title?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const GuaranteeBadge: React.FC<GuaranteeBadgeProps> = ({
  variant = 'money-back',
  days = 30,
  title,
  description,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'p-4 text-sm',
    md: 'p-6 text-base',
    lg: 'p-8 text-lg',
  };

  const iconSizes = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
  };

  const getContent = () => {
    switch (variant) {
      case 'money-back':
        return {
          title: title || `${days}-Day Money-Back Guarantee`,
          description: description || "Not satisfied? Get a full refund, no questions asked. We're that confident you'll love it.",
          icon: (
            <div className={`${iconSizes[size]} rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white shadow-lg relative`}>
              <svg className="w-1/2 h-1/2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-1">
                <svg className="w-4 h-4 text-yellow-900" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          ),
        };

      case 'satisfaction':
        return {
          title: title || '100% Satisfaction Guaranteed',
          description: description || "Love it or your money back. We stand behind our product completely.",
          icon: (
            <div className={`${iconSizes[size]} rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white shadow-lg`}>
              <svg className="w-1/2 h-1/2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>
          ),
        };

      case 'custom':
        return {
          title: title || 'Our Guarantee',
          description: description || 'Your satisfaction is our priority.',
          icon: (
            <div className={`${iconSizes[size]} rounded-full bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center text-white shadow-lg`}>
              <svg className="w-1/2 h-1/2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          ),
        };

      default:
        return { title: '', description: '', icon: null };
    }
  };

  const content = getContent();

  return (
    <div className={`
      ${sizeClasses[size]}
      bg-gradient-to-br from-gray-50 to-white
      border-2 border-dashed border-gray-300
      rounded-xl shadow-lg
      hover:shadow-xl transition-shadow
    `}>
      <div className="flex items-center space-x-4">
        {content.icon}
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 mb-1 flex items-center">
            {content.title}
            <svg className="w-5 h-5 ml-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {content.description}
          </p>
        </div>
      </div>

      {/* Trust seals */}
      <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-center space-x-4 text-xs text-gray-500">
        <div className="flex items-center space-x-1">
          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span>Secure</span>
        </div>
        <div className="flex items-center space-x-1">
          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>Verified</span>
        </div>
        <div className="flex items-center space-x-1">
          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          <span>24/7 Support</span>
        </div>
      </div>
    </div>
  );
};
