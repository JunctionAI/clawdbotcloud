import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'SEO Services NZ — AI-Powered Search Optimisation | Junction Media',
  description: 'SEO services for NZ businesses. AI-powered technical SEO, content strategy, and authority building. $1,200–$2,500/mo. Based in Auckland, serving all of New Zealand.',
  keywords: 'seo nz, seo services nz, seo agency nz, seo auckland, seo new zealand, search engine optimisation nz, seo consultant nz, technical seo nz, ai seo nz',
  openGraph: {
    title: 'SEO Services NZ — AI-Powered Search Optimisation | Junction Media',
    description: 'AI-native SEO for NZ businesses. Technical + content + authority building. Results that compound over time.',
    url: 'https://www.junctionmedia.ai/services/seo-nz',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/services/seo-nz',
  },
}

const whatIsIncluded = [
  {
    title: 'Technical SEO Audit & Fixes',
    desc: 'Crawl errors, Core Web Vitals, mobile performance, structured data, internal linking architecture, canonicalisation issues. Technical problems suppressing your rankings get found and fixed — not just reported.',
  },
  {
    title: 'AI-Powered Keyword Research',
    desc: 'Keyword research mapped to actual NZ search intent, not global volume estimates. We find the searches your customers are actually making — including long-tail and commercial-intent queries your competitors have missed.',
  },
  {
    title: 'Content Strategy & Production',
    desc: 'A content calendar built around ranking opportunities. AI-assisted content production that writes to rank — proper structure, entity coverage, internal linking, and genuine depth. Not keyword-stuffed filler.',
  },
  {
    title: 'On-Page Optimisation',
    desc: 'Title tags, meta descriptions, headers, image alt text, internal links, page structure. Every page on your site optimised for its target queries — and kept up to date as the landscape shifts.',
  },
  {
    title: 'Authority Building',
    desc: 'Digital PR and link acquisition strategies appropriate for the NZ market. Building topical authority through content clusters. No dodgy link schemes — sustainable, white-hat authority that Google rewards.',
  },
  {
    title: 'Monthly Reporting & Insight',
    desc: 'Monthly ranking reports, traffic analysis, and content performance review in plain English. What moved, what didn\'t, why, and what we\'re doing about it. No hiding behind vanity metrics.',
  },
]

const processSteps = [
  {
    phase: 'Month 1',
    title: 'Technical Audit & Foundation',
    desc: 'Full technical audit of your site. Core issues identified and prioritised. Quick wins fixed immediately. Keyword research completed and mapped to site architecture. Content gap analysis delivered. Foundation set before we build.',
  },
  {
    phase: 'Month 2',
    title: 'Content Strategy Live',
    desc: 'Content calendar in production. First pieces published and submitted for indexing. On-page optimisation across priority pages. Internal linking architecture improved. Technical fixes implemented from Month 1 audit.',
  },
  {
    phase: 'Month 3',
    title: 'Authority & Momentum',
    desc: 'Authority building begins. Content compounding — early pieces starting to accumulate impressions. Ranking movement visible for target keywords. Monthly report delivered with clear performance picture and next 90 days planned.',
  },
  {
    phase: 'Ongoing',
    title: 'Compound & Expand',
    desc: 'SEO is a compounding channel. Rankings build on rankings. Content clusters expand. Authority grows. By month 6–12, the gap between your site and competitors widens every month. This is the point of long-term SEO investment.',
  },
]

const faqs = [
  {
    q: 'How much do SEO services cost in NZ?',
    a: 'Our SEO management ranges from $1,200–$2,500/month NZD depending on scope. $1,200/month covers core technical SEO, 2–3 content pieces/month, and monthly reporting. $2,500/month covers full technical management, 6–8 content pieces/month, authority building, and comprehensive reporting. All engagements are 3-month minimum — SEO doesn\'t produce meaningful results in less than 90 days.',
  },
  {
    q: 'How long does SEO take to show results?',
    a: 'Honest answer: 3–6 months for meaningful ranking movement on competitive keywords, 6–12 months for dominant rankings. Technical fixes can show impact within weeks. New content pieces often start accumulating impressions within 4–8 weeks of publication. The important thing is that SEO results compound — unlike paid ads, which stop the moment you stop paying, organic rankings keep delivering after the work is done.',
  },
  {
    q: 'What makes AI-powered SEO different?',
    a: 'AI speeds up keyword research (processing thousands of queries in minutes instead of hours), accelerates content production (we produce more pieces per month at the same cost), and monitors ranking changes faster. More practically: AI helps us build content clusters — interconnected pieces that build topical authority — faster than traditional SEO methods. The strategy is human. The execution is AI-assisted.',
  },
  {
    q: 'Do you do link building?',
    a: 'Yes — but only white-hat, sustainable link acquisition. In the NZ market, this means digital PR (getting coverage on NZ media and industry sites), strategic partnerships, and content that earns links naturally because it\'s genuinely useful. We don\'t buy links or use link farms. Google\'s penalty risk isn\'t worth the short-term ranking lift.',
  },
  {
    q: 'Can you help if my site has been penalised by Google?',
    a: 'Yes. Manual actions (Google Search Console notifications) and algorithmic penalties (ranking drops coinciding with Core Updates) are both diagnosable. We\'ve helped NZ businesses recover from both. Recovery takes time — typically 3–6 months after issues are resolved — but it\'s absolutely achievable with the right approach.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'SEO Services NZ',
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
  description: 'AI-powered SEO services for NZ businesses. Technical SEO, content strategy, and authority building. Results that compound over time.',
  areaServed: { '@type': 'Country', name: 'New Zealand' },
  offers: {
    '@type': 'Offer',
    priceSpecification: {
      '@type': 'PriceSpecification',
      minPrice: '1200',
      maxPrice: '2500',
      priceCurrency: 'NZD',
      unitText: 'month',
    },
  },
}

export default function SEONZPage() {
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
          Service · SEO NZ
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          SEO That Compounds<br />
          <span className="text-gray-500">Over Time</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          AI-native SEO for NZ businesses. Technical foundation, strategic content, and authority
          building that turns search into a compounding acquisition channel — not a monthly expense
          that stops working when you stop paying.
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
            { stat: '$1.2k–$2.5k', label: 'Per month NZD' },
            { stat: '3-month', label: 'Minimum term' },
            { stat: '3 pillars', label: 'Technical + Content + Authority' },
            { stat: 'Compounds', label: 'Results grow over time' },
          ].map((item) => (
            <div key={item.label} className="p-4 border border-gray-100 rounded-2xl text-center">
              <p className="text-2xl font-bold text-gray-900 mb-1">{item.stat}</p>
              <p className="text-xs text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The 3 Pillars */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">The 3 Pillars of AI-Native SEO</h2>
        <div className="space-y-4 mb-8">
          <p className="text-gray-600 leading-relaxed">
            Most NZ SEO agencies focus on one thing — usually content or links — and neglect the others.
            Sustainable organic growth requires all three pillars working together.
          </p>
        </div>
        <div className="space-y-4">
          {[
            {
              num: '01',
              title: 'Technical Foundation',
              desc: 'Google can\'t rank pages it can\'t crawl, index, or understand. Technical SEO — site speed, Core Web Vitals, structured data, crawl efficiency — is the foundation everything else sits on. We fix the foundation before building on top of it.',
            },
            {
              num: '02',
              title: 'Content Strategy',
              desc: 'Ranking requires content that\'s better than what\'s currently ranking. AI-assisted content production lets us build topical authority faster — more pieces, better structured, published consistently. Not filler content. Genuinely useful, well-researched pieces that answer the questions your customers are asking.',
            },
            {
              num: '03',
              title: 'Authority Building',
              desc: 'Links remain one of Google\'s most important ranking signals. Building authority in the NZ market means earning links from relevant NZ publications, industry sites, and partner organisations. Digital PR, strategic content, and relationship-building — not link schemes.',
            },
          ].map((pillar) => (
            <div key={pillar.num} className="border border-gray-100 rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-4">
                <span className="text-4xl font-black text-gray-100 leading-none">{pillar.num}</span>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{pillar.title}</h3>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-gray-500 text-sm mt-6">
          Related:{' '}
          <Link href="/blog/seo-agency-auckland" className="underline hover:text-gray-700 transition-colors">
            How to choose an SEO agency in Auckland →
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
            <span className="text-4xl font-bold text-gray-900">$1,200–$2,500</span>
            <span className="text-gray-500">/month NZD</span>
          </div>
          <p className="text-gray-600 leading-relaxed mb-6">
            Includes technical SEO management, content strategy and production, on-page optimisation,
            authority building, and monthly reporting. 3-month minimum engagement.
          </p>
          <div className="space-y-3 mb-8">
            {[
              { label: 'Core (technical + 2–3 content pieces/mo)', cost: '$1,200/mo' },
              { label: 'Growth (full technical + 4–6 content pieces/mo + authority)', cost: '$1,800/mo' },
              { label: 'Scale (full technical + 6–8 content pieces/mo + aggressive authority)', cost: '$2,500/mo' },
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
            { title: 'How to Choose an SEO Agency in Auckland', href: '/blog/seo-agency-auckland' },
            { title: 'AI SEO Consultant NZ: What It Actually Means', href: '/blog/ai-seo-consultant-nz' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to build organic growth?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            If you&apos;re serious about turning search into a compounding acquisition channel for your
            NZ business — apply below. I review applications and respond within 48 hours.
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
