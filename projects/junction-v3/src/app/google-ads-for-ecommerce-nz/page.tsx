import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Google Ads for Ecommerce NZ — Google Shopping & PPC That Converts | Junction Media',
  description: 'Google Ads management for NZ ecommerce stores. AI-optimised Google Shopping, Performance Max, and Search campaigns that drive profitable sales, not just traffic.',
  keywords: 'google ads for ecommerce nz, google shopping nz, ecommerce ppc nz, google ads ecommerce nz, performance max nz, shopping campaigns nz',
  openGraph: {
    title: 'Google Ads for Ecommerce NZ | Junction Media',
    description: 'AI-optimised Google Shopping and Performance Max for NZ ecommerce. Drive profitable sales, not just traffic. Expert management with real NZ market knowledge.',
    url: 'https://www.junctionmedia.ai/google-ads-for-ecommerce-nz',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/google-ads-for-ecommerce-nz',
  },
}

const painPoints = [
  {
    title: 'Google Shopping feeds are the engine — most NZ stores run them broken',
    desc: 'Performance Max and Google Shopping campaigns are only as good as your product feed. Disapproved products, missing GTINs, poor product titles, and unoptimised descriptions all silently kill your campaign performance. Most NZ stores running Google Ads have significant feed issues they\'re not aware of.',
  },
  {
    title: 'Performance Max is powerful but needs expert management',
    desc: 'Google\'s Performance Max campaigns can drive excellent results for NZ ecommerce stores — but they\'re also a black box that will spend your budget on brand searches, irrelevant placements, and non-converting traffic if not properly structured and monitored. Automation needs a skilled operator.',
  },
  {
    title: 'ROAS targets that ignore contribution margin are misleading',
    desc: 'Optimising for a ROAS target without knowing your true contribution margin per product category leads to scaling losing campaigns and cutting profitable ones. We build campaigns around margin-adjusted targets that reflect real profitability.',
  },
]

const approach = [
  {
    title: 'Product Feed Optimisation',
    desc: 'We audit and rebuild your Merchant Center feed — product titles optimised for shopping queries, accurate categorisation, all required attributes present, and variant handling that maximises coverage without duplication.',
  },
  {
    title: 'Performance Max Architecture',
    desc: 'Structured PMax campaigns with asset group organisation by product category, audience signals informed by your customer list and remarketing data, and brand vs. non-brand separation to protect margins.',
  },
  {
    title: 'Search Campaign Support',
    desc: 'Branded search protection, competitor keyword campaigns, and high-intent transactional search terms for your key product categories — working alongside Shopping to capture the full Google intent spectrum.',
  },
  {
    title: 'AI-Monitored Bid Management',
    desc: 'Continuous campaign monitoring that catches performance anomalies within hours. Budget pacing, automated rules for dayparting, and margin-adjusted ROAS targets that evolve as your product mix changes.',
  },
]

const results = [
  { stat: '+30%', label: 'Above store record (Deep Blue Health, Nov 2025)' },
  { stat: '4–5', label: 'Clients at any one time — your campaigns get focus' },
  { stat: 'Week 1', label: 'Feed audit and tracking verification' },
  { stat: '100%', label: 'NZ-based, NZ-market expertise' },
]

const faqs = [
  {
    q: 'What\'s the minimum ad spend for ecommerce Google Ads in NZ?',
    a: 'To gather meaningful data in the NZ market and run Google Shopping effectively, we recommend a minimum of $3,000–$5,000/month in ad spend. Below that, the algorithms don\'t have enough purchase data to optimise properly. Management fees are additional. We\'ll give you a specific recommendation based on your category and expected conversion volumes.',
  },
  {
    q: 'Should NZ ecommerce stores use Performance Max or Standard Shopping?',
    a: 'In most cases, Performance Max is now the preferred approach — Google has significantly invested in its capabilities and it\'s where most of Shopping\'s functionality is moving. However, PMax without proper structure and asset quality performs poorly. We build and monitor PMax campaigns with the rigour they require.',
  },
  {
    q: 'Can you manage Google Ads alongside our existing Meta Ads?',
    a: 'Yes. In fact, Google and Meta together create a much more complete funnel than either alone. We can manage both, or work alongside your existing Meta Ads provider, with shared attribution data so both channels are informed by the full picture.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Google Ads for Ecommerce NZ',
  provider: {
    '@type': 'Organization',
    name: 'Junction Media',
    url: 'https://www.junctionmedia.ai',
  },
  description: 'Google Ads management for NZ ecommerce stores. Product feed optimisation, Performance Max, Search campaigns, and AI-monitored bid management.',
  areaServed: { '@type': 'Country', name: 'New Zealand' },
}

export default function GoogleAdsForEcommerceNZ() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <nav className="px-6 py-5 border-b border-gray-100 flex items-center justify-between max-w-5xl mx-auto">
        <Link href="/" className="font-medium text-gray-900 hover:text-gray-600 transition-colors">
          Junction Media
        </Link>
        <Link href="/apply" className="text-sm bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors">
          Apply to Work With Us
        </Link>
      </nav>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-16">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
          Service + Industry · Google Ads for Ecommerce NZ
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Google Ads for<br />
          <span className="text-gray-500">Ecommerce NZ</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          Google Shopping is the highest-intent paid channel for NZ ecommerce stores — customers are
          already searching to buy. We build and manage AI-optimised Google Shopping and Performance
          Max campaigns with proper product feed architecture, margin-aware bidding, and conversion
          tracking that shows you exactly what&apos;s driving profitable sales.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/apply" className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors text-center">
            Apply to Work With Us
          </Link>
          <Link href="/industries/ecommerce-nz" className="inline-block border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:border-gray-500 transition-colors text-center">
            Ecommerce Marketing Overview
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-3xl mx-auto px-6 py-12 border-t border-gray-100">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {results.map((item) => (
            <div key={item.label} className="p-4 border border-gray-100 rounded-2xl text-center">
              <p className="text-2xl font-bold text-gray-900 mb-1">{item.stat}</p>
              <p className="text-xs text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">Why Ecommerce Google Ads Fail Without Expert Management</h2>
        <div className="space-y-6">
          {painPoints.map((item) => (
            <div key={item.title} className="p-6 border border-gray-100 rounded-2xl">
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Approach */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-4">Our Ecommerce Google Ads Approach</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          We treat Google Ads as a system, not a campaign. Product feed quality, campaign structure,
          conversion tracking, and bid strategy are all interdependent — improving one without the
          others is how agencies produce mediocre results. We build the whole system.
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          {approach.map((item) => (
            <div key={item.title} className="p-6 border border-gray-100 rounded-2xl">
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Proof */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Real Results</h2>
        <div className="p-8 bg-gray-50 rounded-2xl border border-gray-200">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Case Study · Deep Blue Health</p>
          <p className="text-3xl font-bold text-gray-900 mb-3">+30% above store record</p>
          <p className="text-gray-600 leading-relaxed">
            Deep Blue Health — a NZ health supplement brand — beat their all-time monthly revenue
            record by 30% in November 2025. Optimised Google Shopping campaigns, rebuilt Performance
            Max structure, and a seasonal campaign strategy timed to capture peak-period demand were
            central to the result.
          </p>
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
        <h2 className="text-2xl font-bold mb-6">Related</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { title: 'Google Ads for Ecommerce NZ — Full Guide', href: '/blog/google-ads-ecommerce-nz' },
            { title: 'Ecommerce Marketing Overview', href: '/industries/ecommerce-nz' },
            { title: 'SEO for Ecommerce NZ', href: '/seo-for-ecommerce-nz' },
            { title: 'Meta Ads for Ecommerce NZ', href: '/meta-ads-for-ecommerce-nz' },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="p-4 border border-gray-100 rounded-xl hover:border-gray-300 transition-colors text-sm font-medium text-gray-700 hover:text-gray-900">
              {link.title} →
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 py-20 border-t border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Scale Your Ecommerce Store with Google?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            We work with a small number of NZ ecommerce clients at any one time. Apply to see if we can
            help you scale profitably with Google Ads.
          </p>
          <Link href="/apply" className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg">
            Apply to Work With Us
          </Link>
          <p className="text-gray-400 text-sm mt-4">NZ ecommerce businesses only.</p>
        </div>
      </section>

      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2026 Junction Media. Auckland, New Zealand.</p>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Home</Link>
            <Link href="/industries" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Industries</Link>
            <Link href="/services" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Services</Link>
            <Link href="/blog" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Blog</Link>
            <Link href="/apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
