export default function Hero() {
  return (
    <section className="gradient-bg text-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-8">
          <span className="animate-pulse">🔥</span>
          Used by 1,000+ sales professionals
        </div>
        
        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Never Lose a<br />
          <span className="text-yellow-300">LinkedIn Lead</span> Again
        </h1>
        
        {/* Subheadline */}
        <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-3xl mx-auto">
          Auto-track your LinkedIn messages, get follow-up reminders, and boost your conversion rate. 
          Stop letting hot leads go cold.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <a 
            href="https://chrome.google.com/webstore" 
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-lg"
          >
            🚀 Add to Chrome - It's Free
          </a>
          <button 
            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-secondary text-lg"
          >
            View Pricing
          </button>
        </div>
        
        {/* Social Proof */}
        <p className="text-white/80 text-sm">
          ⭐⭐⭐⭐⭐ 4.9/5 from 200+ reviews
        </p>
        
        {/* Demo Video / Screenshot Placeholder */}
        <div className="mt-16 relative">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mx-auto max-w-4xl">
            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="text-6xl mb-4">📊</div>
                <p className="text-gray-600 font-semibold">
                  Demo Video Coming Soon
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  Dashboard preview • Auto-tracking in action • Follow-up reminders
                </p>
              </div>
            </div>
          </div>
          
          {/* Floating stats */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 flex-wrap justify-center">
            <div className="bg-white rounded-xl px-6 py-3 shadow-lg">
              <p className="text-primary font-bold text-2xl">10k+</p>
              <p className="text-gray-600 text-sm">Messages Tracked</p>
            </div>
            <div className="bg-white rounded-xl px-6 py-3 shadow-lg">
              <p className="text-primary font-bold text-2xl">85%</p>
              <p className="text-gray-600 text-sm">Avg. Conversion Rate</p>
            </div>
            <div className="bg-white rounded-xl px-6 py-3 shadow-lg">
              <p className="text-primary font-bold text-2xl">0</p>
              <p className="text-gray-600 text-sm">Leads Lost</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
