import React, { useState } from 'react';
import {
  ExitIntentPopup,
  CountdownTimer,
  SocialProof,
  TrustBadges,
  Testimonials,
  ComparisonTable,
  ComparisonPlan,
  ScarcityIndicator,
  GuaranteeBadge,
  CheckoutForm,
  CheckoutData,
  SuccessPage,
} from '../components';

/**
 * Complete Conversion Optimization Example
 * 
 * This demonstrates a full signup flow with all psychological triggers:
 * - Landing page with social proof, testimonials, and scarcity
 * - Comparison table for plan selection
 * - Exit-intent popup for abandonment recovery
 * - Optimized checkout with trust badges
 * - Success page with upsells
 */

type FlowStep = 'landing' | 'checkout' | 'success';

export const FullConversionFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<FlowStep>('landing');
  const [selectedPlan, setSelectedPlan] = useState<ComparisonPlan | null>(null);
  const [customerData, setCustomerData] = useState<CheckoutData | null>(null);

  // Comparison Plans
  const plans: ComparisonPlan[] = [
    {
      id: 'starter',
      name: 'Starter',
      price: '$29',
      period: 'month',
      features: [
        { name: 'Up to 5 team members', included: true },
        { name: 'Basic automation', included: true },
        { name: 'Email support', included: true },
        { name: 'Advanced analytics', included: false },
        { name: 'Priority support', included: false },
        { name: 'Custom integrations', included: false },
      ],
      cta: {
        text: 'Start Free Trial',
        onClick: () => handlePlanSelect(plans[0]),
      },
    },
    {
      id: 'professional',
      name: 'Professional',
      price: '$79',
      period: 'month',
      popular: true,
      features: [
        { name: 'Up to 20 team members', included: true },
        { name: 'Advanced automation', included: true },
        { name: 'Priority email & chat support', included: true },
        { name: 'Advanced analytics', included: true },
        { name: 'API access', included: true },
        { name: 'Custom integrations', included: false },
      ],
      cta: {
        text: 'Start Free Trial',
        onClick: () => handlePlanSelect(plans[1]),
      },
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$199',
      period: 'month',
      features: [
        { name: 'Unlimited team members', included: true },
        { name: 'Enterprise automation', included: true },
        { name: '24/7 dedicated support', included: true },
        { name: 'Advanced analytics', included: true },
        { name: 'Full API access', included: true },
        { name: 'Custom integrations', included: true },
      ],
      cta: {
        text: 'Contact Sales',
        onClick: () => handlePlanSelect(plans[2]),
      },
    },
  ];

  const handlePlanSelect = (plan: ComparisonPlan) => {
    setSelectedPlan(plan);
    setCurrentStep('checkout');
  };

  const handleCheckoutSubmit = async (data: CheckoutData) => {
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setCustomerData(data);
    setCurrentStep('success');
  };

  const handleExitIntentClaim = () => {
    // Apply discount and proceed to checkout
    console.log('Exit intent discount claimed!');
    // Could auto-select a plan or apply a discount code
  };

  // Landing Page
  if (currentStep === 'landing') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Exit Intent Popup */}
        <ExitIntentPopup
          title="Wait! Don't Miss This 20% Discount 🎁"
          subtitle="Join 10,000+ users who transformed their workflow"
          discount="20% OFF"
          ctaText="Claim My Discount"
          onClaim={handleExitIntentClaim}
          enabled={true}
        />

        {/* Social Proof Notifications */}
        <SocialProof position="bottom-left" />

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-600 to-blue-600 text-white py-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Your AI Operator.<br />Always Working.
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100">
              Save 20+ hours per week with intelligent automation
            </p>
            
            {/* Countdown Timer */}
            <div className="max-w-2xl mx-auto mb-8">
              <CountdownTimer
                duration={3600} // 1 hour
                title="Limited Launch Pricing Ends In:"
                variant="urgent"
              />
            </div>

            {/* Scarcity Indicator */}
            <div className="max-w-md mx-auto mb-8">
              <ScarcityIndicator
                variant="spots-left"
                initialCount={7}
                minCount={2}
              />
            </div>

            <button
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-purple-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition transform hover:scale-105 shadow-lg"
            >
              See Pricing →
            </button>
          </div>
        </section>

        {/* Trust Badges */}
        <TrustBadges variant="default" />

        {/* Social Proof Stats */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold text-purple-600 mb-2">10,000+</p>
                <p className="text-gray-600">Happy Customers</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-purple-600 mb-2">20hrs</p>
                <p className="text-gray-600">Saved Per Week</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-purple-600 mb-2">99.9%</p>
                <p className="text-gray-600">Uptime</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-purple-600 mb-2">4.9/5</p>
                <p className="text-gray-600">Customer Rating</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
              Loved by Thousands of Teams
            </h2>
            <Testimonials variant="featured" showRatings={true} showResults={true} />
          </div>
        </section>

        {/* Comparison Table / Pricing */}
        <section id="pricing" className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Choose Your Plan
              </h2>
              <p className="text-xl text-gray-600">
                All plans include 14-day free trial. No credit card required.
              </p>
            </div>

            <ComparisonTable plans={plans} />

            {/* Guarantee Badge */}
            <div className="mt-12 max-w-2xl mx-auto">
              <GuaranteeBadge
                variant="money-back"
                days={30}
                size="lg"
              />
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 px-4 bg-gradient-to-br from-purple-600 to-blue-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Transform Your Workflow?
            </h2>
            <p className="text-xl mb-8 text-purple-100">
              Join 10,000+ teams saving 20+ hours per week
            </p>
            <button
              onClick={() => handlePlanSelect(plans[1])}
              className="bg-white text-purple-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition transform hover:scale-105 shadow-lg"
            >
              Start Your Free Trial →
            </button>
            <p className="text-sm mt-4 text-purple-200">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </section>
      </div>
    );
  }

  // Checkout Page
  if (currentStep === 'checkout' && selectedPlan) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                  ✓
                </div>
                <span className="ml-2 text-sm text-gray-600">Plan Selected</span>
              </div>
              <div className="w-16 h-1 bg-purple-600"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <span className="ml-2 text-sm font-semibold text-gray-900">Checkout</span>
              </div>
              <div className="w-16 h-1 bg-gray-300"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <span className="ml-2 text-sm text-gray-600">Success</span>
              </div>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="max-w-md mx-auto mb-8">
            <CountdownTimer
              duration={600} // 10 minutes
              title="Complete checkout to lock in this price:"
              variant="minimal"
            />
          </div>

          <CheckoutForm
            planName={selectedPlan.name}
            price={parseInt(selectedPlan.price.replace('$', ''))}
            onSubmit={handleCheckoutSubmit}
            showTrustIndicators={true}
          />
        </div>
      </div>
    );
  }

  // Success Page
  if (currentStep === 'success' && customerData) {
    const upsells = [
      {
        id: 'premium-support',
        title: 'Premium Support Package',
        description: 'Get 24/7 priority support with dedicated account manager',
        originalPrice: 299,
        discountedPrice: 149,
        features: [
          'Dedicated account manager',
          '24/7 priority support',
          'Quarterly business reviews',
          'Custom training sessions',
        ],
        urgent: true,
      },
      {
        id: 'advanced-analytics',
        title: 'Advanced Analytics Add-on',
        description: 'Unlock powerful insights with custom dashboards and reports',
        originalPrice: 199,
        discountedPrice: 99,
        features: [
          'Custom dashboard builder',
          'Advanced reporting',
          'Data export tools',
          'API access',
        ],
      },
    ];

    return (
      <SuccessPage
        customerName={customerData.name}
        planName={selectedPlan?.name || 'Premium'}
        amount={selectedPlan ? parseInt(selectedPlan.price.replace('$', '')) : 79}
        email={customerData.email}
        upsells={upsells}
        onUpsellClick={(id) => console.log('Upsell clicked:', id)}
      />
    );
  }

  return null;
};
