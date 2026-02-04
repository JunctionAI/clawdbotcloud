import React from 'react';

interface TrustBadgesProps {
  variant?: 'default' | 'compact' | 'detailed';
  showSecure?: boolean;
  showMoneyBack?: boolean;
  showSupport?: boolean;
  showSSL?: boolean;
  customBadges?: Array<{
    icon: React.ReactNode;
    title: string;
    description?: string;
  }>;
}

export const TrustBadges: React.FC<TrustBadgesProps> = ({
  variant = 'default',
  showSecure = true,
  showMoneyBack = true,
  showSupport = true,
  showSSL = true,
  customBadges = [],
}) => {
  const badges = [
    ...(showSecure ? [{
      icon: (
        <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
      title: '100% Secure Checkout',
      description: 'SSL encrypted payment',
    }] : []),
    ...(showMoneyBack ? [{
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
      ),
      title: '30-Day Money Back',
      description: 'Risk-free guarantee',
    }] : []),
    ...(showSupport ? [{
      icon: (
        <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
        </svg>
      ),
      title: '24/7 Support',
      description: 'Expert help anytime',
    }] : []),
    ...(showSSL ? [{
      icon: (
        <svg className="w-8 h-8 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
      ),
      title: 'SSL Certified',
      description: 'Bank-level security',
    }] : []),
    ...customBadges,
  ];

  if (variant === 'compact') {
    return (
      <div className="flex items-center justify-center space-x-6 py-4">
        {badges.map((badge, index) => (
          <div key={index} className="flex items-center space-x-2 text-gray-700">
            <div className="w-6 h-6">
              {React.cloneElement(badge.icon as React.ReactElement, { className: 'w-6 h-6' })}
            </div>
            <span className="text-sm font-medium">{badge.title}</span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'detailed') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {badges.map((badge, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-center mb-4">
              {badge.icon}
            </div>
            <h4 className="font-bold text-gray-900 mb-2">{badge.title}</h4>
            {badge.description && (
              <p className="text-sm text-gray-600">{badge.description}</p>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-gray-50 border-y border-gray-200 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((badge, index) => (
            <div key={index} className="flex items-center space-x-3 bg-white rounded-lg p-4 shadow-sm">
              <div className="flex-shrink-0">
                {badge.icon}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900">{badge.title}</p>
                {badge.description && (
                  <p className="text-xs text-gray-600">{badge.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
