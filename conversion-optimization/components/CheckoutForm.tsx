import React, { useState } from 'react';
import { trackConversion } from '../utils/analytics';

interface CheckoutFormProps {
  planName: string;
  price: number;
  currency?: string;
  onSubmit: (data: CheckoutData) => Promise<void>;
  showTrustIndicators?: boolean;
}

export interface CheckoutData {
  email: string;
  name: string;
  company?: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
  billingZip: string;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  planName,
  price,
  currency = 'USD',
  onSubmit,
  showTrustIndicators = true,
}) => {
  const [formData, setFormData] = useState<CheckoutData>({
    email: '',
    name: '',
    company: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    billingZip: '',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);

    try {
      await onSubmit(formData);
      trackConversion(price, currency);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="order-2 md:order-1">
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 sticky top-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-900">{planName}</p>
                  <p className="text-sm text-gray-600">Billed monthly</p>
                </div>
                <p className="font-bold text-gray-900">
                  {currency === 'USD' ? '$' : currency}{price}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-300">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${price}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold">$0.00</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-4 border-t border-gray-300">
                  <span>Total due today</span>
                  <span className="text-purple-600">${price}</span>
                </div>
              </div>

              {/* Trust Indicators */}
              {showTrustIndicators && (
                <div className="space-y-3 pt-4 border-t border-gray-300">
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <span>Secure 256-bit SSL encryption</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>30-day money-back guarantee</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <span>Cancel anytime, no questions</span>
                  </div>
                </div>
              )}

              {/* Payment methods */}
              <div className="pt-4 border-t border-gray-300">
                <p className="text-xs text-gray-600 mb-2">We accept</p>
                <div className="flex items-center space-x-2">
                  <div className="bg-white rounded px-2 py-1 border border-gray-300 text-xs font-semibold">VISA</div>
                  <div className="bg-white rounded px-2 py-1 border border-gray-300 text-xs font-semibold">MC</div>
                  <div className="bg-white rounded px-2 py-1 border border-gray-300 text-xs font-semibold">AMEX</div>
                  <div className="bg-white rounded px-2 py-1 border border-gray-300 text-xs font-semibold">DISCOVER</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <div className="order-1 md:order-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete Your Order</h2>
              
              {/* Contact Information */}
              <div className="space-y-4 mb-6">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <span className="bg-purple-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm mr-2">1</span>
                  Contact Information
                </h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="you@company.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company (Optional)
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Acme Inc"
                  />
                </div>
              </div>

              {/* Payment Information */}
              <div className="space-y-4 mb-6">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <span className="bg-purple-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm mr-2">2</span>
                  Payment Information
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number *
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    required
                    value={formData.cardNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry *
                    </label>
                    <input
                      type="text"
                      name="cardExpiry"
                      required
                      value={formData.cardExpiry}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV *
                    </label>
                    <input
                      type="text"
                      name="cardCvv"
                      required
                      value={formData.cardCvv}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="123"
                      maxLength={4}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Billing ZIP Code *
                  </label>
                  <input
                    type="text"
                    name="billingZip"
                    required
                    value={formData.billingZip}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="10001"
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
                  <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className={`
                  w-full py-4 rounded-lg font-bold text-lg transition-all
                  ${isProcessing
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transform hover:scale-105'
                  }
                  text-white shadow-lg
                `}
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  `Complete Order - $${price}`
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                By completing this purchase, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
