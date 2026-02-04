import React, { useEffect, useState } from 'react';
import { trackPageView } from '../utils/analytics';

interface SuccessPageProps {
  customerName: string;
  planName: string;
  amount: number;
  currency?: string;
  email: string;
  upsells?: Upsell[];
  onUpsellClick?: (upsellId: string) => void;
}

interface Upsell {
  id: string;
  title: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  features: string[];
  urgent?: boolean;
}

export const SuccessPage: React.FC<SuccessPageProps> = ({
  customerName,
  planName,
  amount,
  currency = 'USD',
  email,
  upsells = [],
  onUpsellClick,
}) => {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    trackPageView('success');
    setTimeout(() => setShowConfetti(false), 5000);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12 px-4">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="confetti-animation"></div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        {/* Success Message */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center mb-8">
          {/* Success Icon */}
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto animate-scale-in">
              <svg className="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            🎉 Welcome Aboard, {customerName.split(' ')[0]}!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your {planName} subscription is now active
          </p>

          {/* Order Details */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 mb-8">
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div>
                <p className="text-sm text-gray-600 mb-1">Order Total</p>
                <p className="text-2xl font-bold text-gray-900">
                  {currency === 'USD' ? '$' : currency}{amount}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Confirmation Email</p>
                <p className="text-lg font-semibold text-gray-900 truncate">{email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Receipt</p>
                <button className="text-purple-600 hover:text-purple-700 font-semibold flex items-center">
                  Download PDF
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="text-left mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What Happens Next?</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Check Your Email</h3>
                  <p className="text-gray-600">We've sent your login credentials and getting started guide to {email}</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Complete Setup</h3>
                  <p className="text-gray-600">Follow our 5-minute onboarding to configure your account</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Start Saving Time</h3>
                  <p className="text-gray-600">See results in your first week!</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg">
              Access Dashboard →
            </button>
            <button className="bg-white border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-50 transition-all">
              View Setup Guide
            </button>
          </div>
        </div>

        {/* Upsells Section */}
        {upsells.length > 0 && (
          <div className="mb-8">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                🚀 Supercharge Your Experience
              </h2>
              <p className="text-gray-600">
                One-time offers available only to new customers
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {upsells.map((upsell) => (
                <div
                  key={upsell.id}
                  className={`
                    bg-white rounded-xl p-6 border-2 shadow-lg
                    ${upsell.urgent ? 'border-orange-400 bg-gradient-to-br from-orange-50 to-white' : 'border-gray-200'}
                  `}
                >
                  {upsell.urgent && (
                    <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold inline-block mb-3">
                      ⚡ LIMITED TIME
                    </div>
                  )}

                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {upsell.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{upsell.description}</p>

                  {/* Pricing */}
                  <div className="mb-4">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl font-bold text-gray-900">
                        ${upsell.discountedPrice}
                      </span>
                      <span className="text-lg text-gray-500 line-through">
                        ${upsell.originalPrice}
                      </span>
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-semibold">
                        Save ${upsell.originalPrice - upsell.discountedPrice}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">One-time payment</p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {upsell.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-700">
                        <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    onClick={() => onUpsellClick?.(upsell.id)}
                    className={`
                      w-full py-3 rounded-lg font-bold transition-all
                      ${upsell.urgent
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600'
                        : 'bg-purple-600 text-white hover:bg-purple-700'
                      }
                    `}
                  >
                    Add to My Account
                  </button>

                  {upsell.urgent && (
                    <p className="text-xs text-center text-gray-600 mt-2">
                      ⏰ This offer expires in 15 minutes
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Social Share */}
        <div className="bg-white rounded-xl p-6 text-center shadow-lg">
          <p className="text-gray-700 mb-4">
            Love what you see? Share the excitement! 🎊
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
              Share on Twitter
            </button>
            <button className="bg-blue-800 text-white px-6 py-2 rounded-lg hover:bg-blue-900 transition">
              Share on LinkedIn
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scale-in {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};
