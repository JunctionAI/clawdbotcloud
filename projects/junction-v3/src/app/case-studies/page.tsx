import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Case Studies | Junction Media — AI Marketing Results NZ',
  description: 'Real results from real NZ businesses. See how Junction Media\'s AI-native marketing systems drive measurable revenue growth.',
  keywords: 'AI marketing results NZ, marketing case studies NZ, Junction Media results, Deep Blue Health case study',
  openGraph: {
    title: 'Case Studies | Junction Media',
    description: 'Real results from AI-native marketing. Deep Blue Health +30% revenue record. NZ businesses, real outcomes.',
    url: 'https://www.junctionmedia.ai/case-studies',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/case-studies',
  },
};

// ─── Logo ────────────────────────────────────────────────────────────────────

function JunctionLogo() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="logoGradCS" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#3B82F6' }} />
          <stop offset="50%" style={{ stopColor: '#8B5CF6' }} />
          <stop offset="100%" style={{ stopColor: '#EC4899' }} />
        </linearGradient>
      </defs>
      <path d="M25 8 Q8 8 8 25" stroke="url(#logoGradCS)" strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M55 8 Q72 8 72 25" stroke="url(#logoGradCS)" strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M25 72 Q8 72 8 55" stroke="url(#logoGradCS)" strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M55 72 Q72 72 72 55" stroke="url(#logoGradCS)" strokeWidth="8" strokeLinecap="round" fill="none" />
    </svg>
  );
}

// ─── Case Study Data ─────────────────────────────────────────────────────────

const featuredCaseStudy = {
  client: 'Deep Blue Health',
  industry: 'Health supplements · NZ ecommerce',
  headline: '+30% above store revenue record',
  subline: 'November 2025 — single month',
  description:
    'A NZ health supplement brand with a solid product line and a loyal customer base — but growth had plateau\'d. We rebuilt the marketing operation from the ground up: Google Ads restructured, Meta creative engine built, email lifecycle automated, and an AI customer support layer handling 80% of queries.',
  outcomes: [
    { stat: '+30%', label: 'Revenue above store record' },
    { stat: '80%', label: 'Customer queries handled by AI' },
    { stat: '~15h', label: 'Staff hours saved per week' },
  ],
  tags: ['Google Ads', 'Meta Ads', 'Email automation', 'AI customer support', 'SEO'],
  link: '/blog/deep-blue-health-case-study',
  status: 'published' as const,
};

const upcomingCaseStudies = [
  {
    client: 'NZ ecommerce brand',
    industry: 'Consumer goods · Auckland-based',
    teaser:
      'AI content engine + paid media rebuild for a sub-$5M ecommerce brand. 90-day engagement. Results publishing soon.',
    tags: ['Content engine', 'Paid media', 'CRO'],
    status: 'coming-soon' as const,
  },
  {
    client: 'B2B SaaS company, Auckland',
    industry: 'Software · B2B · NZ market',
    teaser:
      'Fractional CMO engagement. AI-powered demand generation, content-led SEO strategy, and sales-marketing alignment for a growing SaaS business.',
    tags: ['Fractional CMO', 'Demand gen', 'Content SEO'],
    status: 'coming-soon' as const,
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function CaseStudiesPage() {
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

      {/* Header */}
      <header className="pt-32 pb-14 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            Case Studies
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-4">
            Results That{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Compound
            </span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl leading-relaxed">
            No manufactured case studies. No padded agency metrics.
            Real NZ businesses, real outcomes, honestly documented.
          </p>
        </div>
      </header>

      {/* Featured Case Study */}
      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Featured</p>

          <div className="rounded-2xl border border-gray-900 bg-gray-900 overflow-hidden">
            {/* Card header */}
            <div className="relative p-8 md:p-10">
              {/* Glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative">
                {/* Badge */}
                <div className="flex items-center gap-2 mb-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/15 text-green-400 text-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    Published
                  </span>
                  <span className="text-gray-500 text-xs">{featuredCaseStudy.industry}</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-2">
                  {featuredCaseStudy.client}
                </h2>
                <p className="text-blue-400 font-semibold text-lg mb-6">{featuredCaseStudy.headline}</p>
                <p className="text-sm text-gray-500 mb-6">{featuredCaseStudy.subline}</p>

                <p className="text-gray-300 leading-relaxed max-w-2xl mb-8">
                  {featuredCaseStudy.description}
                </p>

                {/* Outcomes */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {featuredCaseStudy.outcomes.map((outcome) => (
                    <div
                      key={outcome.label}
                      className="p-4 rounded-xl bg-white/5 border border-white/10 text-center"
                    >
                      <p className="text-2xl md:text-3xl font-black text-white mb-1">{outcome.stat}</p>
                      <p className="text-xs text-gray-400 leading-snug">{outcome.label}</p>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {featuredCaseStudy.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-white/10 text-gray-300 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href={featuredCaseStudy.link}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-gray-900 font-bold text-sm hover:bg-gray-100 transition-colors"
                >
                  Read the full case study
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Case Studies */}
      <section className="px-6 pb-16 border-t border-gray-100 pt-14">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">More results — publishing soon</p>

          <div className="grid md:grid-cols-2 gap-5">
            {upcomingCaseStudies.map((cs) => (
              <div
                key={cs.client}
                className="p-7 rounded-2xl border border-gray-100 bg-gray-50 relative overflow-hidden"
              >
                {/* Coming soon badge */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-200 text-gray-500 text-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                    Publishing soon
                  </span>
                </div>

                <p className="text-xs text-gray-400 mb-2">{cs.industry}</p>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{cs.client}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-5">{cs.teaser}</p>

                <div className="flex flex-wrap gap-2">
                  {cs.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-white border border-gray-200 text-gray-500 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-400 mt-6 leading-relaxed">
            Client confidentiality is taken seriously. Case studies are published only with explicit permission.
            Details are anonymised where requested.
          </p>
        </div>
      </section>

      {/* About the approach */}
      <section className="px-6 py-14 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">How results happen</p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                Systems compound.<br />Campaigns don&apos;t.
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Every result here came from building systems that run, learn, and improve —
                not from running a campaign and hoping. The Deep Blue Health result wasn&apos;t
                one lever. It was 2–3 months of simultaneous improvements firing at the same time.
              </p>
              <p className="text-gray-500 text-sm leading-relaxed">
                That&apos;s the model. Patient in the build. Relentless in the execution.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { label: 'We build, not manage', desc: 'Systems that outlast the engagement.' },
                { label: 'We measure everything', desc: 'No vanity metrics. Revenue, retention, efficiency.' },
                { label: 'We go deep, not wide', desc: '4–5 clients max. Full focus on each.' },
              ].map((item) => (
                <div key={item.label} className="flex gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{item.label}</p>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center p-10 md:p-14 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Want results like these?
              </h2>
              <p className="text-gray-400 mb-8 max-w-lg mx-auto leading-relaxed">
                Apply to work with Junction Media. Engagements start at 3 months.
                Applications reviewed personally.
              </p>
              <Link
                href="/apply"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-gray-900 font-bold hover:bg-gray-100 transition-colors"
              >
                Submit an Application
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <span>© {new Date().getFullYear()} Junction Media · Auckland, New Zealand</span>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
            <Link href="/services" className="hover:text-gray-600 transition-colors">Services</Link>
            <Link href="/blog" className="hover:text-gray-600 transition-colors">Blog</Link>
            <Link href="/apply" className="hover:text-gray-600 transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
