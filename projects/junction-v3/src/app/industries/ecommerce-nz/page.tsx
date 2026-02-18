import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Ecommerce Marketing Agency NZ — AI-Powered Growth | Junction Media',
  description: 'Ecommerce marketing agency in NZ that drives real revenue. AI-optimised Google Shopping, Meta Ads, email flows, and SEO for NZ online stores. Based in Auckland.',
  keywords: 'ecommerce marketing agency nz, ecommerce marketing nz, online store marketing nz, shopify marketing nz, ecommerce agency auckland, ecommerce seo nz',
  openGraph: {
    title: 'Ecommerce Marketing Agency NZ — AI-Powered Growth | Junction Media',
    description: 'AI-driven ecommerce marketing for NZ online stores. Google Shopping, Meta Ads, email automation, and SEO — all unified under one strategic operator.',
    url: 'https://www.junctionmedia.ai/industries/ecommerce-nz',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/industries/ecommerce-nz',
  },
}

const painPoints = [
  {
    problem: 'You\'re spending on ads but margins are shrinking',
    detail: 'Meta CPMs have doubled in two years. Google Shopping is more competitive. NZ ecommerce stores are getting squeezed between rising ad costs and customer expectations for free shipping and instant delivery.',
  },
  {
    problem: 'Email is an afterthought, not a revenue channel',
    detail: 'Most NZ stores have a basic welcome email and nothing else. No abandoned cart flows, no post-purchase sequences, no win-back campaigns. Email should be driving 30–40% of revenue — most NZ stores are leaving it on the table.',
  },
  {
    problem: 'Your agency doesn\'t understand NZ consumer behaviour',
    detail: 'NZ shoppers are different. Smaller market, high brand loyalty, strong preference for local when the value is clear, and distinct seasonal peaks (summer Christmas, EOFY, school holidays). Generic offshore strategies don\'t account for any of this.',
  },
  {
    problem: 'No attribution clarity — you don\'t know what\'s actually working',
    detail: 'GA4 is a mess if it wasn\'t set up properly. You\'re making budget decisions based on incomplete data. When you can\'t see clearly, you can\'t scale confidently.',
  },
]

const approach = [
  {
    title: 'Full-Funnel Attribution First',
    desc: 'Before we touch your ad spend, we fix your measurement. GA4 properly configured, Google Ads conversion tracking verified, Klaviyo or email platform integrated. You need to see what\'s working before you can scale it.',
  },
  {
    title: 'AI-Optimised Google Shopping',
    desc: 'Product feed optimisation, Performance Max structure, and continuous bid management using AI monitoring that catches anomalies within hours, not weeks. NZ search volumes are smaller — every dollar has to work harder.',
  },
  {
    title: 'Meta Ads Built for NZ Audiences',
    desc: 'Creative testing at scale with NZ-specific messaging. Prospecting, retargeting, and dynamic product ads built around your catalogue. Audiences refined using first-party data from your email list and customer database.',
  },
  {
    title: 'Email Revenue Engine',
    desc: 'Klaviyo flows built from scratch or audited and rebuilt: welcome series, abandoned cart (3-step), post-purchase, browse abandonment, and win-back. Email should be your most profitable channel — we make it one.',
  },
  {
    title: 'SEO for Organic Ecommerce Traffic',
    desc: 'Category page optimisation, product page SEO, and a content strategy that captures top-of-funnel shoppers before they reach paid channels. Organic traffic that compounds every month.',
  },
]

const results = [
  { stat: '+30%', label: 'Above store record (Deep Blue Health, Nov 2025)' },
  { stat: '4–5', label: 'Clients at any one time — you get real focus' },
  { stat: 'Week 1', label: 'Attribution audit completed' },
  { stat: '100%', label: 'NZ-based, NZ-market knowledge' },
]

const packages = [
  {
    name: 'Growth',
    price: '$2,500',
    period: '/month NZD',
    desc: 'For ecommerce stores doing $30k–$150k/month revenue. Core channel management + email foundation.',
    includes: [
      'Google Shopping management',
      'Meta Ads management',
      'Klaviyo core flows (welcome, cart, post-purchase)',
      'Monthly strategy session',
      'Weekly performance reporting',
    ],
  },
  {
    name: 'Scale',
    price: '$4,500',
    period: '/month NZD',
    desc: 'For stores doing $150k–$500k/month. Full omnichannel growth with AI optimisation across all channels.',
    includes: [
      'Everything in Growth',
      'SEO content strategy + production',
      'Advanced email segmentation & flows',
      'Creative testing program (Meta)',
      'Fortnightly strategy sessions',
      'Competitor intelligence monitoring',
    ],
    highlight: true,
  },
  {
    name: 'Partnership',
    price: '$8,500',
    period: '/month NZD',
    desc: 'Full marketing function for scaling stores ($500k+/month). Fractional CMO embedded with execution.',
    includes: [
      'Everything in Scale',
      'Fractional CMO access (Tom direct)',
      'Full channel ownership',
      'AI marketing systems build',
      'Weekly check-ins',
      'Board-level reporting',
    ],
  },
]

const faqs = [
  {
    q: 'What size ecommerce store do you work with?',
    a: 'We work best with NZ ecommerce stores doing $30k/month or more in revenue — at that scale there\'s enough data to optimise from and enough at stake to justify proper management. We\'ve worked with stores up to $2M+ monthly revenue. If you\'re earlier stage, we can discuss whether it\'s the right fit.',
  },
  {
    q: 'Do you specialise in any particular ecommerce platform?',
    a: 'Shopify is where most of our ecommerce clients operate — it\'s the dominant platform for NZ stores at scale. We also work with WooCommerce and BigCommerce. Platform matters less than your product, your margins, and your data setup.',
  },
  {
    q: 'How long until we see results from ecommerce marketing?',
    a: 'Klaviyo flows go live in weeks and generate revenue immediately once traffic flows through them. Paid ads typically show meaningful signal within 4–6 weeks as algorithms learn. SEO is a 3–6 month play. We structure engagements to generate quick wins (email, paid) while building long-term compounders (SEO, organic).',
  },
  {
    q: 'Can you reference the Deep Blue Health result?',
    a: 'Deep Blue Health (DBH) is a NZ health supplement brand we work with. In November 2025 they beat their all-time monthly store record by 30% — driven by a combination of optimised paid channels, improved email flows, and a strategic promotional campaign timed around seasonal demand. We\'re proud of that result and happy to walk you through the approach.',
  },
  {
    q: 'Do you work with NZ ecommerce stores that also sell internationally?',
    a: 'Yes. Several clients sell into Australia, the US, and UK. We can manage multi-market paid campaigns and help you prioritise which markets to expand into based on margin and competition data. NZ remains the foundation — we know this market best.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Ecommerce Marketing Agency NZ',
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
  description: 'AI-driven ecommerce marketing for NZ online stores. Google Shopping, Meta Ads, email automation, and SEO — all unified under one strategic operator. Based in Auckland.',
  areaServed: { '@type': 'Country', name: 'New Zealand' },
  offers: {
    '@type': 'Offer',
    priceSpecification: {
      '@type': 'PriceSpecification',
      minPrice: '2500',
      maxPrice: '8500',
      priceCurrency: 'NZD',
      unitText: 'month',
    },
  },
}

export default function EcommerceNZPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
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
          href="/apply"
          className="text-sm bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors"
        >
          Apply to Work With Us
        </Link>
      </nav>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-16">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
          Industry · Ecommerce NZ
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Ecommerce Marketing<br />
          <span className="text-gray-500">Agency NZ</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          AI-driven ecommerce marketing for NZ online stores that want to grow without burning
          budget on channels that don&apos;t convert. Google Shopping, Meta Ads, email automation,
          and SEO — all working together under one operator who knows the NZ market.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/apply"
            className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors text-center"
          >
            Apply to Work With Us
          </Link>
          <Link
            href="/industries"
            className="inline-block border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:border-gray-500 transition-colors text-center"
          >
            View All Industries
          </Link>
        </div>
      </section>

      {/* Key Numbers */}
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

      {/* Pain Points */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">The Ecommerce Marketing Problem in NZ</h2>
        <div className="space-y-6">
          {painPoints.map((item) => (
            <div key={item.problem} className="p-6 border border-gray-100 rounded-2xl">
              <h3 className="font-semibold text-gray-900 mb-2">
                <span className="text-gray-400 mr-2">✗</span>
                {item.problem}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Approach */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-4">How We Solve It</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Junction Media isn&apos;t a generalist agency that dabbles in ecommerce. We work with a
          maximum of 4–5 clients at any time, which means your account gets the attention
          that a 10-person agency team would give a $500k/year client — without the $500k price tag.
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
        <h2 className="text-2xl font-bold mb-6">Results That Matter</h2>
        <div className="p-8 bg-gray-50 rounded-2xl border border-gray-200">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Case Study · Deep Blue Health (DBH)</p>
          <p className="text-3xl font-bold text-gray-900 mb-3">+30% above store record</p>
          <p className="text-gray-600 leading-relaxed">
            In November 2025, Deep Blue Health — a NZ health supplement brand — beat their all-time
            monthly revenue record by 30%. The result came from a coordinated approach: optimised
            Google Shopping campaigns, rebuilt Klaviyo email flows targeting seasonal buyers, and
            a Meta Ads creative refresh timed to capture peak-season demand.
          </p>
          <p className="text-gray-500 text-sm mt-4">
            This wasn&apos;t a one-month spike. The systems we built continue to compound.
          </p>
        </div>
      </section>

      {/* Packages */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-4">Packages</h2>
        <p className="text-gray-500 mb-8">All packages are monthly engagements with a 3-month minimum. Ad spend budgets are separate and paid directly to platforms.</p>
        <div className="space-y-6">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`p-8 rounded-2xl border ${pkg.highlight ? 'border-gray-900 bg-gray-50' : 'border-gray-100'}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-bold text-gray-900">{pkg.name}</h3>
                    {pkg.highlight && (
                      <span className="text-xs font-semibold bg-gray-900 text-white px-3 py-1 rounded-full">Most popular</span>
                    )}
                  </div>
                  <p className="text-gray-500 text-sm">{pkg.desc}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-3xl font-bold text-gray-900">{pkg.price}</span>
                  <span className="text-gray-500 text-sm">{pkg.period}</span>
                </div>
              </div>
              <ul className="space-y-2 mb-6">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 flex-shrink-0 text-xs">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/apply"
                className="inline-block bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-700 transition-colors"
              >
                Apply for {pkg.name}
              </Link>
            </div>
          ))}
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
            { title: 'How to Choose an Ecommerce Marketing Agency in NZ', href: '/blog/ecommerce-marketing-agency-nz' },
            { title: 'AI Marketing for Ecommerce NZ', href: '/blog/ai-marketing-ecommerce-nz' },
            { title: 'Shopify Marketing NZ', href: '/blog/shopify-marketing-nz' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to grow your NZ store?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            We work with a maximum of 4–5 ecommerce clients at any one time. If you want a
            marketing partner who treats your store like it&apos;s their own — apply below.
          </p>
          <Link
            href="/apply"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg"
          >
            Apply to Work With Us
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
