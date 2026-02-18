import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About | Junction Media — AI-Native Marketing for NZ Businesses',
  description: 'Junction Media is an AI-native marketing agency for high-growth NZ businesses. Small team, deep integration, 4–5 clients maximum. Built for 2026.',
  keywords: 'Junction Media about, AI marketing NZ, AI-native marketing agency NZ, fractional CMO NZ, marketing strategy NZ',
  openGraph: {
    title: 'About Junction Media',
    description: 'AI-native marketing for NZ growth businesses. Small team, deep integration, 4–5 clients max.',
    url: 'https://www.junctionmedia.ai/about',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/about',
  },
};

// ─── Logo ────────────────────────────────────────────────────────────────────

function JunctionLogo() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="logoGradAbout" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#3B82F6' }} />
          <stop offset="50%" style={{ stopColor: '#8B5CF6' }} />
          <stop offset="100%" style={{ stopColor: '#EC4899' }} />
        </linearGradient>
      </defs>
      <path d="M25 8 Q8 8 8 25" stroke="url(#logoGradAbout)" strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M55 8 Q72 8 72 25" stroke="url(#logoGradAbout)" strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M25 72 Q8 72 8 55" stroke="url(#logoGradAbout)" strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M55 72 Q72 72 72 55" stroke="url(#logoGradAbout)" strokeWidth="8" strokeLinecap="round" fill="none" />
    </svg>
  );
}

// ─── Why AI-Native Beats Traditional ─────────────────────────────────────────

const comparisons = [
  {
    traditional: 'Senior strategy, junior execution',
    aiNative: 'Senior-level strategy — and execution',
  },
  {
    traditional: '30+ clients, rotating account managers',
    aiNative: '4–5 clients, direct relationship',
  },
  {
    traditional: 'Monthly reports, slow to iterate',
    aiNative: 'Real-time data, fast to adapt',
  },
  {
    traditional: 'Campaign-based thinking',
    aiNative: 'Systems-based thinking',
  },
  {
    traditional: 'Manual content production at scale',
    aiNative: 'AI content engine, human editorial direction',
  },
  {
    traditional: 'Fixed deliverables in SOW',
    aiNative: 'Flexible — we build what moves the needle',
  },
];

// ─── Principles ───────────────────────────────────────────────────────────────

const principles = [
  {
    title: 'Small by design',
    body: 'We cap client numbers deliberately. 4–5 businesses at any one time. This isn\'t a constraint — it\'s the point. Deep work requires focused attention. You get a partner, not a vendor.',
  },
  {
    title: 'AI-native, not AI-curious',
    body: 'AI isn\'t a tool we bolt on. It\'s how we operate from day one — content, research, paid media, customer intelligence, reporting. The humans direct strategy and judgment. The systems do the execution at scale.',
  },
  {
    title: 'Systems over campaigns',
    body: 'Campaigns stop when the budget runs out. Systems compound. We build marketing infrastructure that works whether we\'re in the room or not — and gets better over time.',
  },
  {
    title: 'Transparency as a default',
    body: 'You see everything. Every metric, every test, every result. No black boxes. No "trust us, it\'s working." If it\'s not working, we say so and change it.',
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8">
              <JunctionLogo />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-extrabold text-gray-900 text-lg tracking-tight">Junction</span>
              <span className="font-normal text-gray-500 text-lg">Media</span>
            </div>
          </Link>
          <Link
            href="/apply"
            className="px-5 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 transition-opacity"
          >
            Apply to Work Together
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <header className="pt-32 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            About Junction Media
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-6">
            AI-Native Marketing<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              for NZ Growth Businesses
            </span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Junction Media is a boutique AI-native marketing agency based in Auckland, New Zealand.
            We work with a small number of high-growth NZ businesses to build marketing operations
            that compound — not campaigns that expire.
          </p>
        </div>
      </header>

      {/* Mission */}
      <section className="px-6 py-14 border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">The mission</p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-snug">
                Give NZ businesses the marketing infrastructure that only large companies used to afford
              </h2>
            </div>
            <div className="space-y-4 pt-2">
              <p className="text-gray-600 leading-relaxed">
                The marketing landscape shifted in 2024–2025. AI didn&apos;t just automate tasks —
                it changed what&apos;s possible with a small, skilled team. Content at scale. Paid media
                optimised continuously. Customer intelligence gathered automatically. Reporting that
                actually tells you something.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We built Junction Media to give NZ businesses access to that operating model.
                Not a watered-down version — the real thing, with a senior operator embedded in
                your business, accountable for outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Approach */}
      <section className="px-6 py-14 border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">The approach</p>
          <div className="grid sm:grid-cols-2 gap-5">
            {principles.map((p) => (
              <div key={p.title} className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-2">{p.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Model */}
      <section className="px-6 py-14 border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">The model</p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-snug">
            4–5 clients. That&apos;s the cap.
          </h2>
          <p className="text-gray-600 leading-relaxed mb-10 max-w-2xl">
            This isn&apos;t false scarcity. It&apos;s how we maintain quality.
            Every client gets direct access — not an account manager, not a junior,
            not a rotating team. An operator who knows your business and is accountable for results.
          </p>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { stat: '4–5', label: 'Clients maximum', sub: 'Intentional cap' },
              { stat: '3 mo', label: 'Minimum engagement', sub: 'Results take time to build' },
              { stat: '100%', label: 'AI-augmented', sub: 'Every workflow, every deliverable' },
            ].map((item) => (
              <div key={item.label} className="p-6 rounded-2xl border border-gray-200 text-center">
                <p className="text-3xl font-black text-gray-900 mb-1">{item.stat}</p>
                <p className="text-sm font-semibold text-gray-700 mb-1">{item.label}</p>
                <p className="text-xs text-gray-400">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why AI-Native Wins */}
      <section className="px-6 py-14 border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
            Why AI-native beats traditional in 2026
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 leading-snug">
            The agency model was built for a different era
          </h2>

          <div className="rounded-2xl border border-gray-200 overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-2 border-b border-gray-200">
              <div className="px-5 py-3 bg-gray-50 border-r border-gray-200">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Traditional agency</p>
              </div>
              <div className="px-5 py-3 bg-gray-900">
                <p className="text-xs font-bold uppercase tracking-widest text-blue-400">AI-native · Junction Media</p>
              </div>
            </div>

            {/* Rows */}
            {comparisons.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-2 border-b border-gray-100 last:border-b-0`}
              >
                <div className="px-5 py-4 border-r border-gray-100 flex items-start gap-2.5">
                  <span className="mt-0.5 flex-shrink-0 text-gray-300">✕</span>
                  <p className="text-sm text-gray-500">{row.traditional}</p>
                </div>
                <div className="px-5 py-4 flex items-start gap-2.5">
                  <span className="mt-0.5 flex-shrink-0 text-blue-500">✓</span>
                  <p className="text-sm text-gray-800 font-medium">{row.aiNative}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Build */}
      <section className="px-6 py-14 border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">What we build</p>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Services built for depth, not volume
          </h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            Our services are designed to be combined — not picked à la carte.
            A fractional CMO engagement typically includes AI systems, content, and paid media
            as integrated parts of a single growth operation.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { name: 'Fractional CMO', href: '/services/fractional-cmo', desc: 'Senior marketing leadership, embedded in your business.' },
              { name: 'AI Marketing Systems', href: '/services/ai-marketing-systems', desc: 'Five core systems that replace the output of a large agency team.' },
              { name: 'Content & SEO', href: '/services', desc: 'AI-native content that builds authority and compounds over time.' },
              { name: 'Paid Media', href: '/services', desc: 'Meta and Google Ads managed with AI optimisation layers.' },
            ].map((service) => (
              <Link
                key={service.name}
                href={service.href}
                className="group p-5 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-900 text-sm group-hover:text-blue-700 transition-colors">
                    {service.name}
                  </h3>
                  <svg className="w-4 h-4 text-gray-300 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{service.desc}</p>
              </Link>
            ))}
          </div>
          <div className="mt-6">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-500 transition-colors"
            >
              View all services →
            </Link>
          </div>
        </div>
      </section>

      {/* Results Proof */}
      <section className="px-6 py-14 border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Proof</p>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            The results speak for themselves
          </h2>
          <div className="p-7 rounded-2xl bg-gray-900 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative">
              <p className="text-4xl font-black text-white mb-2">+30%</p>
              <p className="text-blue-400 font-semibold mb-3">Revenue above store record</p>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xl mb-5">
                Deep Blue Health, a NZ health supplement brand, broke their all-time sales record
                in November 2025 — 30% above the previous best. The result of 2–3 months of
                AI-native system building: rebuilt Google Ads, Meta creative engine, email
                lifecycle, and AI customer support.
              </p>
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-blue-300 transition-colors underline underline-offset-4 decoration-white/30"
              >
                Read the case study →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 border-t border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to build something that lasts?
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto leading-relaxed">
            If you&apos;re a high-growth NZ business serious about building an AI-native marketing
            operation — apply below. Applications are reviewed personally.
          </p>
          <Link
            href="/apply"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gray-900 text-white font-bold hover:bg-gray-800 transition-colors text-lg"
          >
            Apply to Work With Us
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <p className="text-gray-400 text-sm mt-4">
            Applications reviewed personally. Response within 5 business days.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <span>© {new Date().getFullYear()} Junction Media · Auckland, New Zealand</span>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
            <Link href="/services" className="hover:text-gray-600 transition-colors">Services</Link>
            <Link href="/case-studies" className="hover:text-gray-600 transition-colors">Case Studies</Link>
            <Link href="/blog" className="hover:text-gray-600 transition-colors">Blog</Link>
            <Link href="/apply" className="hover:text-gray-600 transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
