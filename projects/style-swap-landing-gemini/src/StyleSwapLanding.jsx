import React, { useState } from 'react';
import { Camera, Zap, Shield, Sparkles, Layout, Smartphone, ChevronDown, Check, Mail, Play } from 'lucide-react';

const StyleSwapLanding = () => {
  const [email, setEmail] = useState('');

  const features = [
    { icon: <Zap className="w-6 h-6 text-pink-500" />, title: "Instant AI Fitting", desc: "Snap a selfie and see clothes on your body in under 2 seconds." },
    { icon: <Sparkles className="w-6 h-6 text-purple-500" />, title: "Texture Realism", desc: "AI mimics fabric drape, lighting, and physics with 99% accuracy." },
    { icon: <Layout className="w-6 h-6 text-pink-500" />, title: "Multi-Brand Catalog", desc: "Access thousands of items from top global retailers instantly." },
    { icon: <Smartphone className="w-6 h-6 text-purple-500" />, title: "Size Recommendation", desc: "AI-driven measurements ensure you never order the wrong size." },
    { icon: <Camera className="w-6 h-6 text-pink-500" />, title: "Style Remix", desc: "Generate complete outfits based on a single item you love." },
    { icon: <Shield className="w-6 h-6 text-purple-500" />, title: "Privacy First", desc: "Your photos are processed locally and never stored on our servers." },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-pink-500/30">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-6 sticky top-0 z-50 backdrop-blur-md border-b border-white/10">
        <div className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
          Style Swap
        </div>
        <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-400">
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#how-it-works" className="hover:text-white transition">How it Works</a>
          <a href="#pricing" className="hover:text-white transition">Pricing</a>
        </div>
        <button className="px-5 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition text-sm">
          Login
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-purple-600/20 blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Dress in the Future. <br />
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              No Fitting Room Required.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Experience any outfit instantly with hyper-realistic AI try-on technology. 
            Upload a photo, swap your style, and shop with confidence.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-16">
            <button className="px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full font-bold hover:scale-105 transition shadow-[0_0_20px_rgba(236,72,153,0.3)]">
              Get Started for Free
            </button>
            <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-full font-bold flex items-center gap-2 hover:bg-white/10 transition">
              <Play className="w-4 h-4 fill-current" /> Watch Demo
            </button>
          </div>

          {/* Demo Placeholder */}
          <div className="relative mx-auto max-w-4xl p-2 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
            <div className="aspect-video rounded-2xl bg-gradient-to-br from-gray-900 to-black flex items-center justify-center overflow-hidden">
                <div className="text-gray-500 flex flex-col items-center">
                    <Sparkles className="w-12 h-12 mb-4 animate-pulse" />
                    <p>Interactive Demo Video Placeholder</p>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-gray-400">Everything you need to find your perfect look.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-pink-500/50 transition-all group">
              <div className="mb-4 p-3 bg-white/5 w-fit rounded-2xl group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Three Steps to Perfection</h2>
          <div className="grid md:grid-cols-3 gap-12 relative">
            {[
              { step: "01", title: "Snap & Upload", desc: "Take a quick full-body photo or choose one from your gallery." },
              { step: "02", title: "Browse & Swap", desc: "Scroll through endless collections and tap to 'wear' them instantly." },
              { step: "03", title: "Perfect the Fit", desc: "Adjust colors, sizes, and layers before you hit the checkout." }
            ].map((s, i) => (
              <div key={i} className="text-center relative">
                <div className="text-6xl font-black text-white/5 absolute -top-10 left-1/2 -translate-x-1/2 -z-10">{s.step}</div>
                <h3 className="text-xl font-bold mb-4">{s.title}</h3>
                <p className="text-gray-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple Pricing</h2>
          <p className="text-gray-400">Join 50,000+ stylists using Style Swap today.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Free", price: "0", features: ["5 Swaps / day", "Standard Quality", "Basic Brands"] },
            { name: "Pro", price: "12", features: ["Unlimited Swaps", "4K Ultra-Res", "Exclusive Drops"], popular: true },
            { name: "Studio", price: "29", features: ["Commercial License", "API Access", "Batch Processing"] }
          ].map((plan, i) => (
            <div key={i} className={`p-8 rounded-3xl border ${plan.popular ? 'border-pink-500 bg-pink-500/5' : 'border-white/10 bg-white/5'} flex flex-col`}>
              {plan.popular && <span className="bg-pink-500 text-xs font-bold px-3 py-1 rounded-full w-fit mb-4">MOST POPULAR</span>}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="text-4xl font-bold mb-6">${plan.price}<span className="text-lg font-normal text-gray-500">/mo</span></div>
              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-green-500" /> {f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-4 rounded-xl font-bold transition ${plan.popular ? 'bg-pink-500 hover:bg-pink-600' : 'bg-white/10 hover:bg-white/20'}`}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Common Questions</h2>
        <div className="space-y-4">
          {[
            { q: "Does this work with all body types?", a: "Yes! Our AI is trained on diverse body shapes to ensure an inclusive and accurate fit." },
            { q: "Is my data safe?", a: "We use end-to-end encryption. Your images are processed securely and never shared." }
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 flex justify-between items-center cursor-pointer hover:bg-white/10">
              <span className="font-medium">{item.q}</span>
              <ChevronDown className="w-5 h-5 text-gray-500" />
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto rounded-[40px] bg-gradient-to-br from-pink-600/20 to-purple-800/20 border border-white/10 p-12 text-center relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-pink-500/20 blur-[80px] rounded-full" />
          <h2 className="text-4xl font-bold mb-6">Ready to redefine your wardrobe?</h2>
          <p className="text-gray-400 mb-10 max-w-md mx-auto">Join the waitlist for exclusive early access to the 2.0 release.</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-grow px-6 py-4 rounded-full bg-black/50 border border-white/20 focus:outline-none focus:border-pink-500 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition">
              Join Waitlist
            </button>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-white/5 text-center text-gray-500 text-sm">
        © 2024 Style Swap AI. All rights reserved.
      </footer>
    </div>
  );
};

export default StyleSwapLanding;
