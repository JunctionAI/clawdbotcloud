export default function FeaturesPlanet() {
  return (
    <section className="relative bg-[#070a1a]" id="services">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-16 text-center md:pb-20">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Everything You Need. One Partner.
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              Full-service AI-powered growth across every channel.
            </p>
          </div>
          
          {/* Pricing highlight */}
          <div className="pb-16 md:pb-20" data-aos="zoom-y-out">
            <div className="text-center">
              <div className="relative inline-flex rounded-2xl bg-gradient-to-b from-blue-500/20 to-transparent p-8 border border-blue-500/20">
                <div className="text-center">
                  <div className="text-5xl font-bold text-white mb-2">$10,000<span className="text-2xl text-gray-400">/month</span></div>
                  <div className="text-gray-400">Full-service AI-powered growth partnership</div>
                  <div className="mt-4 text-sm text-gray-500">Minimum 3-month commitment</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* What you get equation */}
          <div className="mb-16 text-center" data-aos="zoom-y-out">
            <div className="inline-flex items-center gap-4 text-2xl md:text-3xl">
              <span className="text-blue-400 font-bold">🤖 Agents</span>
              <span className="text-gray-600">+</span>
              <span className="text-blue-400 font-bold">🧠 Strategy</span>
              <span className="text-gray-600">=</span>
              <span className="text-green-400 font-bold">💰 Revenue</span>
            </div>
          </div>
          
          {/* Grid */}
          <div className="grid overflow-hidden sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-800 rounded-2xl">
            <article className="relative p-6 md:p-10 bg-[#070a1a] group hover:bg-gray-900/50 transition-colors">
              <h3 className="mb-2 flex items-center space-x-2 font-medium text-white">
                <svg className="fill-blue-400" xmlns="http://www.w3.org/2000/svg" width={16} height={16}>
                  <path d="M8 0a1 1 0 0 1 1 1v14a1 1 0 1 1-2 0V1a1 1 0 0 1 1-1Zm6 3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1a1 1 0 1 1 0 2h-1a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3h1a1 1 0 1 1 0 2h-1ZM1 1a1 1 0 0 0 0 2h1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 1 0 0 2h1a3 3 0 0 0 3-3V4a3 3 0 0 0-3-3H1Z" />
                </svg>
                <span>Paid Acquisition</span>
              </h3>
              <p className="text-[15px] text-gray-400">
                AI-optimized ad campaigns across Google, Meta, TikTok. Continuous testing, learning, and scaling what works.
              </p>
            </article>
            
            <article className="relative p-6 md:p-10 bg-[#070a1a] group hover:bg-gray-900/50 transition-colors">
              <h3 className="mb-2 flex items-center space-x-2 font-medium text-white">
                <svg className="fill-blue-400" xmlns="http://www.w3.org/2000/svg" width={16} height={16}>
                  <path d="M2.248 6.285a1 1 0 0 1-1.916-.57A8.014 8.014 0 0 1 5.715.332a1 1 0 0 1 .57 1.916 6.014 6.014 0 0 0-4.037 4.037Z" opacity=".3" />
                  <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm0-2a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm1.715-6.752a1 1 0 0 1 .57-1.916 8.014 8.014 0 0 1 5.383 5.383 1 1 0 1 1-1.916.57 6.014 6.014 0 0 0-4.037-4.037Zm4.037 7.467a1 1 0 1 1 1.916.57 8.014 8.014 0 0 1-5.383 5.383 1 1 0 1 1-.57-1.916 6.014 6.014 0 0 0 4.037-4.037Zm-7.467 4.037a1 1 0 1 1-.57 1.916 8.014 8.014 0 0 1-5.383-5.383 1 1 0 1 1 1.916-.57 6.014 6.014 0 0 0 4.037 4.037Z" />
                </svg>
                <span>Search & AI Visibility</span>
              </h3>
              <p className="text-[15px] text-gray-400">
                Show up in AI search results, featured snippets, and citations. Future-proof your discoverability.
              </p>
            </article>
            
            <article className="relative p-6 md:p-10 bg-[#070a1a] group hover:bg-gray-900/50 transition-colors">
              <h3 className="mb-2 flex items-center space-x-2 font-medium text-white">
                <svg className="fill-blue-400" xmlns="http://www.w3.org/2000/svg" width={16} height={16}>
                  <path d="M2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Zm2-4a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H4Zm1 10a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H5Z" />
                </svg>
                <span>Content at Scale</span>
              </h3>
              <p className="text-[15px] text-gray-400">
                High-volume, high-quality content production at a fraction of traditional costs. More iterations, more distribution.
              </p>
            </article>
            
            <article className="relative p-6 md:p-10 bg-[#070a1a] group hover:bg-gray-900/50 transition-colors">
              <h3 className="mb-2 flex items-center space-x-2 font-medium text-white">
                <svg className="fill-blue-400" xmlns="http://www.w3.org/2000/svg" width={16} height={16}>
                  <path d="M14.29 2.614a1 1 0 0 0-1.58-1.228L6.407 9.492l-3.199-3.2a1 1 0 1 0-1.414 1.415l4 4a1 1 0 0 0 1.496-.093l7-9ZM1 14a1 1 0 1 0 0 2h14a1 1 0 1 0 0-2H1Z" />
                </svg>
                <span>Brand & Creative</span>
              </h3>
              <p className="text-[15px] text-gray-400">
                Strategic positioning and visual design. Unlimited creative ideas, completely tailored to your voice and brand.
              </p>
            </article>
            
            <article className="relative p-6 md:p-10 bg-[#070a1a] group hover:bg-gray-900/50 transition-colors">
              <h3 className="mb-2 flex items-center space-x-2 font-medium text-white">
                <svg className="fill-blue-400" xmlns="http://www.w3.org/2000/svg" width={16} height={16}>
                  <path d="M10.284.33a1 1 0 1 0-.574 1.917 6.049 6.049 0 0 1 2.417 1.395A1 1 0 0 0 13.5 2.188 8.034 8.034 0 0 0 10.284.33ZM6.288 2.248A1 1 0 0 0 5.718.33 8.036 8.036 0 0 0 2.5 2.187a1 1 0 0 0 1.372 1.455 6.036 6.036 0 0 1 2.415-1.395Z" />
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16Zm0-2A6 6 0 1 1 8 2a6 6 0 0 1 0 12Z" opacity=".3" />
                </svg>
                <span>AI Automation</span>
              </h3>
              <p className="text-[15px] text-gray-400">
                Deploy AI customer support, automated workflows, and personal AI assistants for your team. Work smarter.
              </p>
            </article>
            
            <article className="relative p-6 md:p-10 bg-[#070a1a] group hover:bg-gray-900/50 transition-colors">
              <h3 className="mb-2 flex items-center space-x-2 font-medium text-white">
                <svg className="fill-blue-400" xmlns="http://www.w3.org/2000/svg" width={16} height={16}>
                  <path d="M9 1a1 1 0 1 0-2 0v6a1 1 0 0 0 2 0V1ZM4.572 3.08a1 1 0 0 0-1.144-1.64A7.987 7.987 0 0 0 0 8a8 8 0 0 0 16 0c0-2.72-1.36-5.117-3.428-6.56a1 1 0 1 0-1.144 1.64A5.987 5.987 0 0 1 14 8 6 6 0 1 1 2 8a5.987 5.987 0 0 1 2.572-4.92Z" />
                </svg>
                <span>Team Empowerment</span>
              </h3>
              <p className="text-[15px] text-gray-400">
                Get your team set up with personal AI assistants. We help you build your own AI infrastructure internally.
              </p>
            </article>
          </div>
          
          {/* Comparison section */}
          <div className="mt-20">
            <div className="mx-auto max-w-3xl pb-10 text-center">
              <h3 className="text-2xl font-bold text-white mb-2" data-aos="zoom-y-out">
                What Changes When You Partner With Us
              </h3>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2" data-aos="zoom-y-out" data-aos-delay={100}>
              <div className="rounded-xl border border-gray-800 bg-gray-900/30 p-6">
                <div className="text-sm text-gray-500 uppercase mb-4">What you're used to</div>
                <ul className="space-y-3 text-gray-400 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400/70 mt-0.5">✗</span>
                    <span>Monthly reports full of impressions you can't action</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400/70 mt-0.5">✗</span>
                    <span>Your account manager barely knows your business</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400/70 mt-0.5">✗</span>
                    <span>Same cookie-cutter playbook for every client</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400/70 mt-0.5">✗</span>
                    <span>Algorithm changes catch you off guard</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400/70 mt-0.5">✗</span>
                    <span>You ask "is this working?" and get a 40-slide deck</span>
                  </li>
                </ul>
              </div>
              
              <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-6">
                <div className="text-sm text-blue-400 uppercase mb-4">The Junction difference</div>
                <ul className="space-y-3 text-gray-300 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5">✓</span>
                    <span>Daily optimization with results tied to revenue</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5">✓</span>
                    <span>Dedicated strategist + AI agents fully looped into your context</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5">✓</span>
                    <span>Custom strategies built from your actual data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5">✓</span>
                    <span>We test emerging channels before competitors know they exist</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5">✓</span>
                    <span>You ask "is this working?" and we show you the pipeline in dollars</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
