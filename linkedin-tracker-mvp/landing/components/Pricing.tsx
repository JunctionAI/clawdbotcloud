'use client'

import { useState } from 'react'

export default function Pricing() {
  const [loading, setLoading] = useState(false)
  
  const handleCheckout = async (priceId: string) => {
    setLoading(true)
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      })
      
      const { url } = await response.json()
      
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for trying out the extension',
      features: [
        'Track up to 10 leads',
        'Auto-message detection',
        'Follow-up reminders',
        'Basic analytics',
        'CSV export',
        'Local storage only',
      ],
      cta: 'Get Started Free',
      ctaAction: () => window.open('https://chrome.google.com/webstore', '_blank'),
      popular: false,
    },
    {
      name: 'Pro',
      price: '$19',
      period: '/month',
      description: 'For serious sales professionals',
      features: [
        '✨ Unlimited lead tracking',
        '✨ Cloud sync across devices',
        '✨ Advanced analytics & insights',
        '✨ Priority email support',
        '✨ Team collaboration (coming soon)',
        '✨ CRM integrations (coming soon)',
      ],
      cta: 'Start 7-Day Free Trial',
      ctaAction: () => handleCheckout(process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY || ''),
      popular: true,
    },
  ]
  
  return (
    <section className="py-20 px-6 bg-gray-50" id="pricing">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Simple, <span className="gradient-text">Transparent Pricing</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start free. Upgrade when you're ready to scale.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`pricing-card relative ${plan.popular ? 'featured' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-1 rounded-full text-sm font-semibold">
                    ⭐ Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-green-500 text-xl flex-shrink-0">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button
                onClick={plan.ctaAction}
                disabled={loading}
                className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-200 ${
                  plan.popular
                    ? 'btn-primary'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {loading ? 'Loading...' : plan.cta}
              </button>
              
              {plan.popular && (
                <p className="text-center text-sm text-gray-500 mt-4">
                  7-day free trial • Cancel anytime • No credit card required for trial
                </p>
              )}
            </div>
          ))}
        </div>
        
        {/* Money-back guarantee */}
        <div className="text-center mt-12">
          <p className="text-gray-600 font-semibold">
            💰 30-day money-back guarantee • 🔒 Secure checkout via Stripe
          </p>
        </div>
        
        {/* Enterprise CTA */}
        <div className="mt-16 bg-white rounded-2xl p-8 text-center shadow-lg max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-3">Need a Team Plan?</h3>
          <p className="text-gray-600 mb-6">
            Get volume pricing, dedicated support, and custom integrations for teams of 5+.
          </p>
          <a 
            href="mailto:sales@linkedintracker.app"
            className="inline-block btn-secondary"
          >
            📧 Contact Sales
          </a>
        </div>
      </div>
    </section>
  )
}
