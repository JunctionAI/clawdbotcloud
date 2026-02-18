import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Retail Marketing NZ — Physical, Ecommerce & Multi-Location | Junction Media',
  description: 'Marketing for NZ retailers that drives foot traffic and online sales. Meta and Google Shopping, seasonal campaigns, loyalty programmes, local SEO for multi-location retail. Based in Auckland.',
  keywords: 'retail marketing nz, retail digital marketing new zealand, ecommerce retail marketing nz, multi-location retail marketing nz, google shopping nz, meta ads retail nz, local seo retail nz',
  openGraph: {
    title: 'Retail Marketing NZ — Physical, Ecommerce & Multi-Location | Junction Media',
    description: 'AI-driven marketing for NZ retailers. Meta and Google Shopping, seasonal campaigns, loyalty programmes, and local SEO for physical and online retail.',
    url: 'https://www.junctionmedia.ai/industries/retail-nz',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/industries/retail-nz',
  },
}

const painPoints = [
  {
    problem: 'Online and in-store are fighting each other instead of working together',
    detail: 'NZ retailers with both physical and ecommerce channels often find their marketing pulling in two directions. Online sales cannibalise store visits, or in-store promotions don\'t translate online. The retailers winning in 2026 have integrated omnichannel strategies where digital drives foot traffic and in-store experience drives repeat online purchase.',
  },
  {
    problem: 'Seasonal peaks and troughs are unpredictable and chaotic',
    detail: 'Black Friday, Christmas, Boxing Day, Back to School, Easter — NZ retail lives and dies by seasonal campaigns. Most retailers scramble reactively, launching ads a week before they need results. A strategic seasonal calendar built 6 weeks ahead, with proper audience warming and offer sequencing, can make the difference between a record quarter and a stressful one.',
  },
  {
    problem: 'You\'re paying Meta and Google but you can\'t tell what\'s actually working',
    detail: 'Retail ad spend in NZ is routinely wasted on broad targeting, weak creative, and campaigns that optimise for clicks instead of revenue. Google Shopping and Meta Catalogue ads are the highest-ROI channels for product retail — but only when product feeds are clean, audiences are segmented, and attribution is set up to measure actual ROAS.',
  },
  {
    problem: 'Multi-location marketing is a logistical nightmare',
    detail: 'If you have multiple stores across NZ, marketing becomes complex fast. Local SEO for each location, geo-targeted campaigns, store-specific promotions, and Google Business Profile management at scale all require systems that most retailers — and most agencies — aren\'t set up to run properly.',
  },
]

const approach = [
  {
    title: 'Meta and Google Shopping That Drives Revenue',
    desc: 'Product catalogue ads on Meta and Shopping campaigns on Google are the engine of modern retail marketing. We build and manage these with clean product feeds, segmented audiences (prospecting, retargeting, loyalty), and creative that stops the scroll. ROAS tracking is non-negotiable — you know exactly what each dollar returns.',
  },
  {
    title: 'Seasonal Campaign Strategy Built 6 Weeks Ahead',
    desc: 'We build a retail marketing calendar that sequences audience warming, offer rollout, and post-event retention properly. For NZ retail, that means Black Friday campaigns that start warming in October, Christmas planning that doesn\'t become a December panic, and January recovery campaigns that retain new customers rather than losing them after the sale.',
  },
  {
    title: 'Loyalty Programme Marketing and Retention',
    desc: 'Acquiring a new retail customer costs 5x more than retaining one. We build and manage email and SMS retention strategies — loyalty programme onboarding flows, VIP segment campaigns, repurchase sequences, and win-back automations — that turn first-time buyers into repeat customers systematically.',
  },
  {
    title: 'Local SEO for Multi-Location Retail',
    desc: 'When someone searches "homewares stores near me" or "fashion boutique Newmarket", your stores need to appear. We manage Google Business Profiles, local citation consistency, and location-specific page SEO across multiple sites — the kind of systematic local SEO that chains and multi-location retailers need but rarely have properly in place.',
  },
  {
    title: 'Omnichannel Attribution and Measurement',
    desc: 'We set up the measurement infrastructure that tells you whether your Instagram ads are driving in-store visits, what your email subscribers\' store purchase value is, and which channels are actually responsible for your best customers. Most NZ retailers are flying blind on attribution. We fix that.',
  },
]

const results = [
  { stat: '+30%', label: 'Above store record (Deep Blue Health, Nov 2025)' },
  { stat: '4–5', label: 'Clients at any one time — real focus, real results' },
  { stat: 'ROAS', label: 'Revenue attribution on every campaign' },
  { stat: '100%', label: 'NZ-based, NZ-market expertise' },
]

const packages = [
  {
    name: 'Growth',
    price: '$2,500',
    period: '/month NZD',
    desc: 'For NZ retailers entering paid digital. Core Google Shopping or Meta catalogue ads, with seasonal campaign support.',
    includes: [
      'Google Shopping or Meta catalogue ads (one channel)',
      'Product feed setup and management',
      'Seasonal campaign planning',
      'Monthly strategy session',
      'Weekly performance reporting',
    ],
  },
  {
    name: 'Scale',
    price: '$4,500',
    period: '/month NZD',
    desc: 'For retailers ready to scale across both channels. Full paid media, email retention, and seasonal calendar management.',
    includes: [
      'Everything in Growth',
      'Both Meta and Google Shopping active',
      'Email retention flows (3–5 automations)',
      'Seasonal campaign calendar (6 weeks ahead)',
      'Competitor intelligence monitoring',
      'Fortnightly strategy sessions',
    ],
    highlight: true,
  },
  {
    name: 'Partnership',
    price: '$8,500',
    period: '/month NZD',
    desc: 'Full marketing function for retailers scaling aggressively or across multiple locations. Fractional CMO embedded.',
    includes: [
      'Everything in Scale',
      'Fractional CMO access (Tom direct)',
      'Multi-location local SEO management',
      'Loyalty programme strategy and marketing',
      'Omnichannel attribution setup',
      'Board-level reporting',
    ],
  },
]

const faqs = [
  {
    q: 'We have physical stores and an online shop. Can you handle both?',
    a: 'That\'s exactly our sweet spot. The NZ retailers getting the best results in 2026 treat physical and digital as one integrated system — digital drives foot traffic, in-store experience drives online loyalty. We build marketing strategies that serve both channels, with measurement that shows the actual relationship between your paid spend and store visits.',
  },
  {
    q: 'Google Shopping vs Meta — which is better for NZ retail?',
    a: 'It depends on your product and margin profile. Google Shopping captures existing demand — people actively searching for what you sell. Meta creates demand — reaching people who didn\'t know they wanted your product until they saw it. For most NZ retailers, the right answer is both, with budget allocation based on your actual ROAS data rather than guesswork.',
  },
  {
    q: 'Can you help us with Black Friday and Christmas campaigns?',
    a: 'Yes — and we\'d insist on starting earlier than you think you need to. Effective NZ seasonal retail campaigns begin audience warming 4–6 weeks before the peak. We build the full campaign arc: brand awareness phase, offer reveal, sales window, and post-event retention — because keeping those new customers is worth as much as the sale itself.',
  },
  {
    q: 'We have 5 stores across NZ. Can you manage local SEO for each?',
    a: 'Yes. Multi-location local SEO is one of the most consistently underinvested areas in NZ retail marketing — and one of the highest-ROI. We manage Google Business Profiles, local citations, location pages, and geo-targeted campaigns for retailers with multiple physical sites. It requires proper systems, which we have.',
  },
  {
    q: 'How do you measure results for retail — ROAS, revenue, foot traffic?',
    a: 'All of the above where the data exists. Online ROAS is measurable down to the campaign and product level. In-store attribution is harder — we use Google store visit conversions, loyalty card matching, and UTM-tracked campaigns with offer codes to build as complete a picture as possible. We\'ll be honest about what we can and can\'t measure.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Retail Marketing NZ',
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
  description: 'Marketing for NZ retailers. Meta and Google Shopping, seasonal campaigns, loyalty programme marketing, local SEO for multi-location retail, and omnichannel attribution.',
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

export default function RetailNZPage() {
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
          Industry · Retail NZ
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Retail Marketing<br />
          <span className="text-gray-500">NZ</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          Marketing for NZ retailers that drives real revenue — foot traffic and online sales, working
          together. Fashion, homewares, specialty retail, multi-location chains — Meta Shopping,
          Google Shopping, seasonal campaigns, and loyalty programmes built for the NZ market.
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
        <h2 className="text-2xl font-bold mb-8">The Retail Marketing Problem in NZ</h2>
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
          Junction Media works with a maximum of 4–5 clients at any time. For NZ retailers, that
          means a marketing partner who actually knows your product, your seasons, and your customers
          — not an agency juggling 80 accounts with templated reporting. We track revenue, not
          impressions, and we treat your ROAS like it&apos;s ours.
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
            In November 2025, Deep Blue Health — a NZ health and wellness brand — beat their
            all-time monthly revenue record by 30%. The result came from coordinated paid channels,
            email automation, and strategic campaign timing. The same principles — proper product
            feed management, ROAS-focused campaigns, and retention sequencing — form the core of
            our retail marketing approach.
          </p>
          <p className="text-gray-500 text-sm mt-4">
            Retail-specific case studies available on request.
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
            { title: 'Retail Marketing NZ: The Omnichannel Playbook', href: '/blog/retail-marketing-nz' },
            { title: 'Meta Ads NZ', href: '/services/meta-ads-nz' },
            { title: 'Google Ads NZ', href: '/services/google-ads-nz' },
            { title: 'View All Industries', href: '/industries' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to make every season count?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            We work with a maximum of 4–5 clients at any one time. If you want a marketing partner
            who treats your revenue like it&apos;s their own and knows NZ retail inside out — apply below.
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
