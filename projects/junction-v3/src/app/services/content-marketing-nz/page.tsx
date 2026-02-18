import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Content Marketing NZ — AI-Powered Content That Ranks | Junction Media',
  description: 'Content marketing services for NZ businesses. AI-assisted content strategy and production that ranks in search, builds authority, and converts readers into customers. $1,000–$2,000/mo.',
  keywords: 'content marketing nz, content marketing agency nz, content strategy nz, content marketing auckland, content creation nz, ai content marketing nz, content marketing new zealand',
  openGraph: {
    title: 'Content Marketing NZ — AI-Powered Content That Ranks | Junction Media',
    description: 'AI-assisted content strategy and production for NZ businesses. Content that ranks, converts, and compounds.',
    url: 'https://www.junctionmedia.ai/services/content-marketing-nz',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/services/content-marketing-nz',
  },
}

const whatIsIncluded = [
  {
    title: 'Content Strategy & Audit',
    desc: 'Start with what exists and what\'s missing. Full content audit, competitor content gap analysis, and a keyword-mapped content strategy. Every piece of content planned with a clear ranking target, audience intent, and conversion goal.',
  },
  {
    title: 'AI-Assisted Content Production',
    desc: 'Long-form blog posts, pillar pages, and supporting content produced with AI assistance and human editorial oversight. Genuine depth, proper research, your brand voice. Not generic filler that ranks nowhere and converts nobody.',
  },
  {
    title: 'Content Calendar Management',
    desc: 'A publishing calendar that\'s always full. Regular cadence (2–6 pieces/month depending on tier) published consistently. Consistency is the most underrated content marketing variable — most NZ businesses publish in bursts and go quiet for months.',
  },
  {
    title: 'SEO Optimisation',
    desc: 'Every piece structured for search: proper header hierarchy, keyword usage, internal linking, meta data, and schema markup where applicable. Content that\'s genuinely good and technically optimised to rank.',
  },
  {
    title: 'Content Distribution',
    desc: 'Publishing the content is step one. Distribution includes social sharing, email newsletter syndication, internal linking from existing high-authority pages, and outreach for relevant external links. Content that gets found.',
  },
  {
    title: 'Performance Tracking',
    desc: 'Monthly reporting on content performance: rankings, organic traffic, time-on-page, conversions. We know what\'s working and what isn\'t — and the content calendar adapts accordingly.',
  },
]

const processSteps = [
  {
    phase: 'Month 1',
    title: 'Strategy & Foundation',
    desc: 'Content audit of existing assets. Competitor content gap analysis. Keyword research mapped to your customer journey. Content strategy document delivered — what we\'re building, in what order, and why. First pieces briefed and drafted.',
  },
  {
    phase: 'Month 2',
    title: 'Production & Publishing',
    desc: 'Content pipeline in production. First pieces published, indexed, and submitted. Internal linking structure improved. Distribution process live. Early ranking signals monitored and strategy adjusted based on initial data.',
  },
  {
    phase: 'Month 3',
    title: 'Optimise & Expand',
    desc: 'First-month content showing early ranking signals. Optimise underperforming pieces. Expand content clusters around topics showing traction. Authority building begins for top-priority pages. Monthly report delivered.',
  },
  {
    phase: 'Ongoing',
    title: 'Compound Growth',
    desc: 'Content compounds. Each new piece adds to the site\'s topical authority. Each internal link strengthens the overall structure. By month 6–12, the content engine is producing meaningful organic traffic — and the gap versus competitors widens.',
  },
]

const faqs = [
  {
    q: 'How much does content marketing cost in NZ?',
    a: 'Our content marketing services range from $1,000–$2,000/month NZD. The $1,000/month tier includes strategy and 2–3 long-form pieces per month. The $2,000/month tier covers 4–6 pieces, full SEO optimisation, distribution, and comprehensive reporting. Minimum 3-month engagement — content marketing takes time to compound.',
  },
  {
    q: 'Is AI-generated content actually good?',
    a: 'AI-assisted content is good when used properly. Our process: AI accelerates research, outlining, and drafting. Human editors review, refine, and add genuine expertise. The result is content that\'s better-structured than pure human writing and more accurate than pure AI generation. We don\'t publish anything that isn\'t genuinely useful — because content that doesn\'t help readers doesn\'t rank.',
  },
  {
    q: 'How long before content marketing shows results?',
    a: 'New content typically starts accumulating search impressions within 4–8 weeks of publication. Meaningful ranking and traffic usually takes 3–6 months for competitive queries, 1–3 months for long-tail and low-competition queries. The value of content compounds — a piece published today will be generating traffic 2 years from now if it\'s good enough.',
  },
  {
    q: 'What types of content do you produce?',
    a: 'Long-form blog posts (our core), pillar pages, landing page copy, case studies, FAQs, comparison pages, and local service pages. We focus on formats that rank and convert — not content for content\'s sake. Every piece has a clear search intent target and a conversion path.',
  },
  {
    q: 'Do I need to be involved in content creation?',
    a: 'Minimal involvement required. Initial onboarding involves a deep-dive on your business, customers, tone of voice, and key differentiators — this feeds the AI system and sets the editorial guidelines. After that, you review drafts before publication (typically a 15–20 minute weekly task) and we handle everything else.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Content Marketing NZ',
  provider: {
    '@type': 'Organization',
    name: 'Junction Media',
    url: 'https://www.junctionmedia.ai',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Auckland',
      addressCountry: 'NZ',
    },
  },
  description: 'AI-assisted content marketing for NZ businesses. Strategy, production, and distribution of content that ranks, converts, and builds authority over time.',
  areaServed: { '@type': 'Country', name: 'New Zealand' },
  offers: {
    '@type': 'Offer',
    priceSpecification: {
      '@type': 'PriceSpecification',
      minPrice: '1000',
      maxPrice: '2000',
      priceCurrency: 'NZD',
      unitText: 'month',
    },
  },
}

export default function ContentMarketingNZPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Navigation */}
      <nav className="px-6 py-5 border-b border-gray-100 flex items-center justify-between max-w-5xl mx-auto">
        <Link href="/" className="font-medium text-gray-900 hover:text-gray-600 transition-colors">
          Junction Media
        </Link>
        <Link
          href="/#apply"
          className="text-sm bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors"
        >
          Apply to Work With Me
        </Link>
      </nav>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-16">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
          Service · Content Marketing NZ
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Content That Ranks, Converts,<br />
          <span className="text-gray-500">and Compounds</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          AI-assisted content strategy and production for NZ businesses. We build content that earns
          organic traffic, builds brand authority, and converts readers into customers — published
          consistently, without you touching a keyboard.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/#apply"
            className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors text-center"
          >
            Apply to Work With Me
          </Link>
          <Link
            href="/services"
            className="inline-block border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:border-gray-500 transition-colors text-center"
          >
            View All Services
          </Link>
        </div>
      </section>

      {/* Key Numbers */}
      <section className="max-w-3xl mx-auto px-6 py-12 border-t border-gray-100">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { stat: '$1k–$2k', label: 'Per month NZD' },
            { stat: '3-month', label: 'Minimum term' },
            { stat: '2–6', label: 'Pieces published/month' },
            { stat: 'Compounds', label: 'Traffic grows over time' },
          ].map((item) => (
            <div key={item.label} className="p-4 border border-gray-100 rounded-2xl text-center">
              <p className="text-2xl font-bold text-gray-900 mb-1">{item.stat}</p>
              <p className="text-xs text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Content Marketing Fails */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Why Content Marketing Fails for Most NZ Businesses</h2>
        <div className="space-y-4 mb-8">
          <p className="text-gray-600 leading-relaxed">
            Most NZ businesses either don&apos;t do content marketing, or do it badly — sporadic publishing,
            generic topics, no SEO structure, no distribution plan. The result: content that nobody
            reads, that doesn&apos;t rank, and that doesn&apos;t convert.
          </p>
          <p className="text-gray-600 leading-relaxed">
            The businesses winning in organic search have three things in common: they publish
            consistently, they produce content that&apos;s genuinely more useful than what&apos;s currently
            ranking, and they build internal links that strengthen their topical authority over time.
          </p>
          <p className="text-gray-600 leading-relaxed">
            AI changes the economics. A content production rate that used to require a full-time
            writer ($80k+ NZD/year) is now achievable at a fraction of the cost — without sacrificing
            quality, with better SEO structure, and with smarter distribution.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-6 border border-gray-100 rounded-2xl">
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Typical NZ content approach</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• 1–2 blog posts when time allows</li>
              <li>• Generic topics with no keyword targeting</li>
              <li>• No internal linking strategy</li>
              <li>• No distribution beyond posting to social</li>
            </ul>
          </div>
          <div className="p-6 border border-gray-900 rounded-2xl bg-gray-50">
            <p className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">AI-native content approach</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• 2–6 pieces published monthly, consistently</li>
              <li>• Every piece mapped to a search intent</li>
              <li>• Internal linking architecture built deliberately</li>
              <li>• Multi-channel distribution every time</li>
            </ul>
          </div>
        </div>
        <p className="text-gray-500 text-sm mt-6">
          Related:{' '}
          <Link href="/blog/content-marketing-nz" className="underline hover:text-gray-700 transition-colors">
            Content marketing in NZ: what works and what doesn&apos;t →
          </Link>
        </p>
      </section>

      {/* What's Included */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">What&apos;s Included</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {whatIsIncluded.map((item) => (
            <div key={item.title} className="p-6 border border-gray-100 rounded-2xl">
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">How It Works</h2>
        <div className="space-y-6">
          {processSteps.map((step, i) => (
            <div key={step.phase} className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {i + 1}
                </div>
                {i < processSteps.length - 1 && (
                  <div className="w-px flex-1 bg-gray-100 mt-2" />
                )}
              </div>
              <div className="pb-8">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{step.phase}</p>
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Pricing</h2>
        <div className="bg-gray-50 rounded-2xl p-8">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-4xl font-bold text-gray-900">$1,000–$2,000</span>
            <span className="text-gray-500">/month NZD</span>
          </div>
          <p className="text-gray-600 leading-relaxed mb-6">
            Includes content strategy, AI-assisted production with human editorial oversight,
            SEO optimisation, distribution, and monthly performance reporting.
            3-month minimum engagement.
          </p>
          <div className="space-y-3 mb-8">
            {[
              { label: 'Core (strategy + 2–3 pieces/mo + SEO)', cost: '$1,000/mo' },
              { label: 'Growth (strategy + 4–6 pieces/mo + distribution)', cost: '$1,500/mo' },
              { label: 'Scale (strategy + 6+ pieces/mo + full distribution + reporting)', cost: '$2,000/mo' },
            ].map((row) => (
              <div
                key={row.label}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-3 border-b border-gray-200 last:border-0 text-gray-700"
              >
                <span className="text-sm">{row.label}</span>
                <span className="text-sm font-semibold">{row.cost}</span>
              </div>
            ))}
          </div>
          <Link
            href="/#apply"
            className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors"
          >
            Apply Now
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">Common Questions</h2>
        <div className="space-y-8">
          {faqs.map((faq) => (
            <div key={faq.q}>
              <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Further Reading</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { title: 'Content Marketing in NZ: What Works', href: '/blog/content-marketing-nz' },
            { title: 'SEO Services NZ', href: '/services/seo-nz' },
            { title: 'AI Marketing Systems NZ', href: '/services/ai-marketing-systems' },
            { title: 'View All Services', href: '/services' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="p-4 border border-gray-100 rounded-xl hover:border-gray-300 transition-colors text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              {link.title} →
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 py-20 border-t border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to build a content engine?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            If you want content that actually ranks, converts, and compounds over time —
            apply below. I review applications and respond within 48 hours.
          </p>
          <Link
            href="/#apply"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg"
          >
            Apply to Work With Me
          </Link>
          <p className="text-gray-400 text-sm mt-4">NZ businesses only. Serious enquiries only.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2026 Junction Media. Auckland, New Zealand.</p>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Home</Link>
            <Link href="/services" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Services</Link>
            <Link href="/blog" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Blog</Link>
            <Link href="/#apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
