import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [openFaq, setOpenFaq] = useState(null);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    // TODO: Integrate with backend
    localStorage.setItem('userEmail', email);
    navigate('/app');
  };

  const handleTryNow = () => {
    navigate('/app');
  };

  const handleContactSales = () => {
    window.location.href = 'mailto:sales@styleswap.ai?subject=Fashion Pro Plan Inquiry';
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const features = [
    {
      icon: '⚡',
      title: 'Try On Anything in Seconds',
      description: 'Upload one photo. See yourself in thousands of outfits. Our AI adapts clothing to your exact body shape, skin tone, and pose. No awkward fitting rooms. No waiting.',
      benefit: 'Works with clothes from any online store'
    },
    {
      icon: '✨',
      title: 'So Real, You\'ll Do a Double Take',
      description: 'Forget those cheesy virtual try-ons that look like video game graphics. Our AI creates photorealistic images that capture fabric texture, drape, and lighting.',
      benefit: 'HD quality, shareable on social media'
    },
    {
      icon: '📐',
      title: 'See How It Actually Fits YOUR Body',
      description: 'Our AI doesn\'t just paste clothes on you—it understands your body shape, proportions, and posture. See if that dress is too tight or if that jacket hits at the right length.',
      benefit: 'Reduces returns by 73%'
    },
    {
      icon: '👗',
      title: 'Build Complete Outfits, Not Just Pieces',
      description: 'Combine tops, bottoms, shoes, and accessories. Create entire looks. Save your favorites. Share with friends. Build a digital wardrobe before spending a dime.',
      benefit: 'Save unlimited outfit combinations'
    },
    {
      icon: '🛍️',
      title: 'Works with 10,000+ Brands',
      description: 'See yourself in clothes from Zara, ASOS, Nordstrom, and thousands more. Just paste a link or upload a product image. We handle the rest.',
      benefit: 'One-click shop buttons for instant purchase'
    },
    {
      icon: '🔒',
      title: 'Your Photos, Your Control',
      description: 'Your images are encrypted and private. Delete anytime. We never share or sell your data. Period.',
      benefit: 'GDPR compliant, bank-level encryption'
    }
  ];

  const steps = [
    {
      number: '01',
      icon: '📸',
      title: 'Upload Your Photo',
      description: 'Take a quick selfie or upload an existing photo. Full body works best, but even a half-body shot works great. Our AI handles the rest.',
      time: '10 seconds'
    },
    {
      number: '02',
      icon: '🎨',
      title: 'Choose Your Style',
      description: 'Browse our catalog, paste a link from your favorite store, or upload a product image. From streetwear to haute couture, we\'ve got it all.',
      time: '30 seconds'
    },
    {
      number: '03',
      icon: '✨',
      title: 'See Yourself Transformed',
      description: 'Watch as our AI creates a photorealistic image of you wearing the outfit. Save it, share it, or shop it instantly.',
      time: '5 seconds'
    }
  ];

  const testimonials = [
    {
      name: 'Jessica M.',
      age: 28,
      location: 'Los Angeles',
      rating: 5,
      quote: 'I used to spend HOURS at the mall trying on clothes that looked nothing like they did online. Now I try on 30 outfits in the time it used to take me to park. I\'ve saved literally hundreds of dollars on returns. This is magic.',
      stats: 'Tried on 847 outfits | Saved $2,340 on returns'
    },
    {
      name: 'Marcus T.',
      age: 34,
      location: 'New York',
      rating: 5,
      quote: 'As someone who hates shopping, this is a game-changer. I rebuilt my entire wardrobe in a weekend without leaving my apartment. The AI knows my style better than I do now.',
      stats: 'Built 45 outfits | 92% purchase satisfaction'
    },
    {
      name: 'Emma L.',
      age: 25,
      location: 'London',
      rating: 5,
      quote: 'Fast fashion thrives on returns and waste. Style Swap lets me be SURE before I buy. I\'ve cut my returns to zero and only buy what I know I\'ll love. Better for my wallet and the planet.',
      stats: 'Zero returns in 6 months | 100+ outfits tried'
    },
    {
      name: 'Aaliyah P.',
      age: 31,
      location: 'Toronto',
      rating: 5,
      quote: 'Shopping used to give me anxiety. Harsh fitting room lighting, clothes that never fit right... Style Swap changed that. I can experiment with styles I never thought would work on me. It\'s given me so much confidence.',
      stats: 'Discovered 3 new styles | Confidence: 📈'
    }
  ];

  const pricingPlans = [
    {
      name: 'Free',
      price: 0,
      badge: 'Perfect to Start',
      popular: false,
      features: [
        '10 AI try-ons per month',
        'Basic outfit combinations',
        'Save up to 20 looks',
        'Standard quality (720p)',
        'Watermarked images',
        'Access to 1,000+ brands'
      ],
      cta: 'Start Free'
    },
    {
      name: 'Style Lover',
      price: 12,
      yearlyPrice: 115,
      badge: 'Best Value',
      popular: true,
      features: [
        'Unlimited AI try-ons',
        'Advanced outfit mixing',
        'Unlimited saved looks',
        'HD quality (1080p)',
        'No watermarks',
        'Access to 10,000+ brands',
        'Style recommendations',
        'Share with friends',
        'Priority processing (2x faster)'
      ],
      cta: 'Start 7-Day Free Trial'
    },
    {
      name: 'Fashion Pro',
      price: 29,
      yearlyPrice: 278,
      badge: 'For Influencers',
      popular: false,
      features: [
        'Everything in Style Lover',
        '4K ultra-HD exports',
        'Commercial usage rights',
        'Bulk processing (100+ at once)',
        'API access',
        'White-label options',
        'Custom AI training',
        'Dedicated account manager'
      ],
      cta: 'Contact Sales'
    }
  ];

  const faqs = [
    {
      question: 'Do I need a professional photo?',
      answer: 'Nope! A simple selfie works great. The better the lighting and clearer your outfit, the better the results—but our AI is trained on real-world photos, not studio shots.'
    },
    {
      question: 'How accurate is the fit?',
      answer: 'Very. Our AI analyzes your body proportions and creates realistic representations. While it\'s not a perfect measurement tool, 94% of users say the AI try-on matches the real outfit fit.'
    },
    {
      question: 'Can I try on clothes from any website?',
      answer: 'Yes! Just paste the product URL or upload a product image. We support 10,000+ brands and counting.'
    },
    {
      question: 'What happens to my photos?',
      answer: 'They\'re encrypted, stored securely, and never shared. You can delete them anytime. We take privacy seriously.'
    },
    {
      question: 'Can I use this on mobile?',
      answer: 'Absolutely! Style Swap works on any device—phone, tablet, or desktop.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'Yes. 30-day money-back guarantee, no questions asked.'
    }
  ];

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Try On Any Outfit. <span className="gradient-text">Instantly.</span>
              <br />No Changing Room Required.
            </h1>
            <p className="hero-subtitle">
              See yourself in thousands of styles without leaving your couch. AI-powered fashion try-on that looks so real, you'll forget it's not.
            </p>
            <div className="hero-ctas">
              <button className="cta-primary" onClick={handleTryNow}>Try Your First Outfit Free →</button>
              <button className="cta-secondary" onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })}>See How It Works (30sec)</button>
            </div>
            <div className="trust-badges">
              <span>✓ 2M+ Happy Users</span>
              <span>✓ 50M+ Try-Ons</span>
              <span>✓ Featured in Vogue</span>
              <span>✓ Free to Start</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="demo-video-placeholder">
              <div className="video-mockup">
                <div className="play-button">▶</div>
                <p>Watch AI Transform Your Style</p>
              </div>
            </div>
          </div>
        </div>
        <div className="social-proof-ticker">
          <span className="ticker-text">Sarah in London just tried on 12 outfits...</span>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <h2 className="section-title">Why Settle for Guessing When You Can <span className="gradient-text">See Yourself?</span></h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card glass">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <span className="feature-benefit">{feature.benefit}</span>
            </div>
          ))}
        </div>
        <div className="section-cta">
          <button className="cta-primary" onClick={handleTryNow}>Start Trying On Outfits Free →</button>
          <p className="cta-subtext">No credit card required. 10 free try-ons to start.</p>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works">
        <h2 className="section-title">3 Steps to Your <span className="gradient-text">Perfect Outfit</span></h2>
        <div className="steps-container">
          {steps.map((step, index) => (
            <div key={index} className="step-card glass">
              <div className="step-number">{step.number}</div>
              <div className="step-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <span className="step-time">⏱️ {step.time}</span>
            </div>
          ))}
        </div>
        <div className="total-time">
          <span className="time-badge">⏱️ From photo to perfect outfit in under 60 seconds</span>
        </div>
        <div className="comparison-table glass">
          <h3>The Old Way vs. The Style Swap Way</h3>
          <div className="comparison-grid">
            <div className="comparison-column old-way">
              <h4>The Old Way 😫</h4>
              <ul>
                <li>Drive to store <span>(30 min)</span></li>
                <li>Wait for fitting room <span>(15 min)</span></li>
                <li>Try on 8 outfits <span>(45 min)</span></li>
                <li>Buy and hope it works</li>
                <li className="total">Total: 90+ minutes</li>
              </ul>
            </div>
            <div className="comparison-column new-way">
              <h4>The Style Swap Way ✨</h4>
              <ul>
                <li>Upload photo <span>(10 sec)</span></li>
                <li>Choose outfit <span>(30 sec)</span></li>
                <li>Try on 50 outfits <span>(2 min)</span></li>
                <li>Know it works before buying</li>
                <li className="total">Total: Under 60 seconds</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="section-cta">
          <button className="cta-primary" onClick={handleTryNow}>Skip the Fitting Room Forever →</button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials">
        <h2 className="section-title">Join Millions Who've <span className="gradient-text">Revolutionized</span> How They Shop</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card glass">
              <div className="rating">
                {Array(testimonial.rating).fill('⭐').join('')}
              </div>
              <p className="testimonial-quote">"{testimonial.quote}"</p>
              <div className="testimonial-author">
                <strong>{testimonial.name}</strong>, {testimonial.age}, {testimonial.location}
              </div>
              <div className="testimonial-stats">{testimonial.stats}</div>
            </div>
          ))}
        </div>
        <div className="social-proof-stats">
          <div className="stat">
            <span className="stat-number">2,147,832</span>
            <span className="stat-label">Happy Users</span>
          </div>
          <div className="stat">
            <span className="stat-number">50M+</span>
            <span className="stat-label">Outfits Tried</span>
          </div>
          <div className="stat">
            <span className="stat-number">4.9/5</span>
            <span className="stat-label">Average Rating</span>
          </div>
          <div className="stat">
            <span className="stat-number">73%</span>
            <span className="stat-label">Reduction in Returns</span>
          </div>
        </div>
        <div className="section-cta">
          <button className="cta-primary" onClick={handleTryNow}>See What You've Been Missing →</button>
          <p className="cta-subtext">Join the fashion revolution. Free to start.</p>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="pricing">
        <h2 className="section-title">Start Free. Upgrade When You're <span className="gradient-text">Obsessed.</span></h2>
        <div className="pricing-toggle">
          <button 
            className={selectedPlan === 'monthly' ? 'active' : ''}
            onClick={() => setSelectedPlan('monthly')}
          >
            Monthly
          </button>
          <button 
            className={selectedPlan === 'yearly' ? 'active' : ''}
            onClick={() => setSelectedPlan('yearly')}
          >
            Annual <span className="savings-badge">Save 20%</span>
          </button>
        </div>
        <div className="pricing-grid">
          {pricingPlans.map((plan, index) => (
            <div key={index} className={`pricing-card glass ${plan.popular ? 'popular' : ''}`}>
              {plan.popular && <div className="popular-badge">⭐ MOST POPULAR</div>}
              <div className="plan-badge">{plan.badge}</div>
              <h3>{plan.name}</h3>
              <div className="price">
                <span className="price-amount">
                  ${selectedPlan === 'yearly' && plan.yearlyPrice ? plan.yearlyPrice : plan.price}
                </span>
                <span className="price-period">/{selectedPlan === 'yearly' ? 'year' : 'month'}</span>
              </div>
              <ul className="features-list">
                {plan.features.map((feature, i) => (
                  <li key={i}>✓ {feature}</li>
                ))}
              </ul>
              <button 
                className={plan.popular ? 'cta-primary' : 'cta-secondary'}
                onClick={plan.name === 'Fashion Pro' ? handleContactSales : handleTryNow}
              >
                {plan.cta} →
              </button>
              {plan.popular && <p className="trial-text">Cancel anytime. No commitment.</p>}
            </div>
          ))}
        </div>
        <div className="money-back-guarantee glass">
          <h3>💰 30-Day Money-Back Guarantee</h3>
          <p>Not in love with Style Swap? Get a full refund, no questions asked. We're that confident you'll never want to shop the old way again.</p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq">
        <h2 className="section-title">Frequently Asked <span className="gradient-text">Questions</span></h2>
        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div key={index} className={`faq-item glass ${openFaq === index ? 'open' : ''}`}>
              <button className="faq-question" onClick={() => toggleFaq(index)}>
                {faq.question}
                <span className="faq-icon">{openFaq === index ? '−' : '+'}</span>
              </button>
              {openFaq === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="final-cta">
        <div className="final-cta-content glass">
          <h2>Your Perfect Outfit is <span className="gradient-text">60 Seconds Away</span></h2>
          <p>Join 2M+ people who've already revolutionized how they shop. No credit card needed to start.</p>
          <form onSubmit={handleEmailSubmit} className="email-capture">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="cta-primary">Try Your First Outfit Free →</button>
          </form>
          <div className="trust-bar">
            <span>🔒 Bank-level encryption</span>
            <span>💳 No credit card required</span>
            <span>⚡ Instant access</span>
            <span>🌍 Works worldwide</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 Style Swap. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Contact</a>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
