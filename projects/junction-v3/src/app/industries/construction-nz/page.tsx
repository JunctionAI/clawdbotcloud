import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Construction & Trades Marketing NZ | Junction Media',
  description: 'Marketing for NZ construction companies and trades businesses. Local search dominance, Google Ads for high-intent queries, reputation management, and lead generation that fills your quote pipeline.',
  keywords: 'construction marketing nz, trades marketing nz, marketing for builders nz, plumber marketing nz, contractor marketing nz, tradies marketing nz, construction company marketing auckland',
  openGraph: {
    title: 'Construction & Trades Marketing NZ | Junction Media',
    description: 'AI-driven marketing for NZ trades and construction. Local search, Google Ads for urgent queries, review management, and quote-request funnels that keep your pipeline full.',
    url: 'https://www.junctionmedia.ai/industries/construction-nz',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/industries/construction-nz',
  },
}

const painPoints = [
  {
    problem: 'You rely on word-of-mouth — but it doesn\'t scale',
    detail: 'Referrals built your business. They won\'t scale it. When a homeowner needs a builder, plumber, or electrician in 2026, they search Google. If you\'re not showing up in the top 3 map results and running targeted ads, you\'re invisible to a massive pool of high-intent buyers who are ready to call right now.',
  },
  {
    problem: 'Inconsistent leads — feast or famine pipeline',
    detail: 'Most NZ trades businesses run hot or cold. Either you\'re swamped with work or you\'re chasing quotes. Consistent digital marketing builds a predictable pipeline so you\'re never scrambling for work and never turning away good jobs because you\'re understaffed.',
  },
  {
    problem: 'Your competitors\' reviews are everywhere — yours aren\'t',
    detail: 'Online reviews are the new word-of-mouth. When a homeowner in Remuera searches "builder Auckland," the tradie with 47 five-star reviews wins the click before price is even discussed. Most NZ trades businesses have no system for collecting reviews — and it costs them jobs every week.',
  },
  {
    problem: 'Commercial construction needs B2B — not consumer tactics',
    detail: 'Commercial builders and subcontractors have a different buyer entirely. Developers, project managers, and property investors aren\'t clicking Facebook ads — they\'re on LinkedIn, attending industry events, and responding to businesses with credibility. Consumer marketing tactics fail completely in this space.',
  },
]

const approach = [
  {
    title: 'Local Search Dominance (Google Maps & SEO)',
    desc: 'For residential trades, Google Maps is the most valuable marketing channel you\'re probably ignoring. We optimise your Google Business Profile, build local citation authority, and run a content strategy that ranks you for "[trade] [suburb]" searches — the exact queries your customers use when they\'re ready to book.',
  },
  {
    title: 'Google Ads for High-Intent Searches',
    desc: '"Emergency plumber Auckland," "hot water cylinder replacement," "new build builder Wellington" — these are high-intent searches from people who need you now and will pay well. We build tightly structured Google Search campaigns that capture these buyers and track every lead back to a specific keyword and ad, so you know exactly what\'s working.',
  },
  {
    title: 'Review Generation Systems',
    desc: 'We build automated review request sequences that turn your completed jobs into five-star Google reviews. Most tradies finish a job and never ask. We automate the ask — timing it correctly, making it easy, and building your online reputation systematically over time. Reviews compound. Start now.',
  },
  {
    title: 'Seasonal & Project-Type Campaigns',
    desc: 'Summer is deck and renovation season. Winter is heating and insulation. Pre-Christmas is renovation lead gen for the new year. We build a campaign calendar that matches your trade\'s natural demand cycles — scaling spend when intent is high and pulling back when it isn\'t.',
  },
  {
    title: 'LinkedIn for Commercial Construction',
    desc: 'Commercial builders, structural engineers, and specialist subcontractors need B2B marketing, not consumer ads. We build LinkedIn presence and targeted outreach that gets you in front of developers, project managers, and property investors who award contracts — before the tender process even begins.',
  },
]

const results = [
  { stat: '+30%', label: 'Above store record (Deep Blue Health, Nov 2025)' },
  { stat: '4–5', label: 'Clients at any one time — real focus, real results' },
  { stat: 'Local', label: 'NZ-specific search strategy, not generic templates' },
  { stat: '100%', label: 'NZ-based, NZ-market expertise' },
]

const packages = [
  {
    name: 'Growth',
    price: '$2,500',
    period: '/month NZD',
    desc: 'For trades businesses entering digital marketing. Core local presence + Google Ads for lead generation.',
    includes: [
      'Google Business Profile optimisation',
      'Google Ads (local search + intent)',
      'Review request automation setup',
      'Monthly strategy session',
      'Weekly performance reporting',
    ],
  },
  {
    name: 'Scale',
    price: '$4,500',
    period: '/month NZD',
    desc: 'For trades businesses ready to dominate their local market. Full local SEO + paid + social + seasonal campaigns.',
    includes: [
      'Everything in Growth',
      'Facebook/Instagram ads (residential reno)',
      'Local SEO (suburb-level content)',
      'Seasonal campaign planning',
      'Quote funnel optimisation',
      'Fortnightly strategy sessions',
    ],
    highlight: true,
  },
  {
    name: 'Partnership',
    price: '$8,500',
    period: '/month NZD',
    desc: 'For construction companies scaling into commercial work or operating across multiple regions. Full marketing function.',
    includes: [
      'Everything in Scale',
      'LinkedIn B2B for commercial construction',
      'Fractional CMO access (Tom direct)',
      'Multi-region campaign management',
      'Brand positioning and content authority',
      'Board-level reporting',
    ],
  },
]

const faqs = [
  {
    q: 'I already get enough work from referrals. Why do I need digital marketing?',
    a: 'Referrals are great — until they slow down, you want to scale, or you want to choose your clients rather than taking whatever comes in. Digital marketing gives you a second engine for growth that doesn\'t depend on word-of-mouth. The most successful NZ trades businesses have both working simultaneously.',
  },
  {
    q: 'Which platforms work best for trades in NZ?',
    a: 'Google is the primary channel for residential trades — when someone needs a plumber urgently, they\'re not on Instagram. Google Maps and Google Ads are non-negotiable. Facebook works well for renovation and new build projects with longer consideration cycles. LinkedIn is relevant for commercial construction B2B. We build the right mix for your trade and target customer.',
  },
  {
    q: 'How quickly will I see leads from Google Ads?',
    a: 'Google Ads can generate leads within days of launching if set up correctly. We typically see the first leads within the first 1–2 weeks. The first month is about data collection and optimisation — by month 2–3, campaigns are running efficiently and cost-per-lead is dropping as we identify what converts.',
  },
  {
    q: 'Can you help us get more Google reviews?',
    a: 'Yes — and this is one of the highest-ROI things a trades business can do. We build review request automation that sends a follow-up message after job completion, making it simple for happy customers to leave a review. Over 6–12 months, this compounds into a review profile that wins you jobs before you even speak to the customer.',
  },
  {
    q: 'We do commercial construction, not residential. Does this still apply?',
    a: 'Different strategy, same principle. Commercial construction buyers — developers, project managers, property investors — respond to LinkedIn presence, credibility content, and consistent brand visibility in their professional networks. We\'d focus less on Google Maps and more on B2B positioning and LinkedIn outreach. The Partnership package is built for this.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Construction & Trades Marketing NZ',
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
  description: 'AI-driven marketing for NZ construction companies and trades businesses. Local search, Google Ads, review systems, and commercial B2B positioning.',
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

export default function ConstructionNZPage() {
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
          Industry · Construction & Trades NZ
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Construction & Trades<br />
          <span className="text-gray-500">Marketing NZ</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          Local search dominance, Google Ads that fill your quote pipeline, and review systems
          that win you jobs before you even pick up the phone. Marketing for NZ trades built around
          how customers actually find and choose a contractor.
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
        <h2 className="text-2xl font-bold mb-8">The Construction Marketing Problem in NZ</h2>
        <div className="space-y-6">
          {painPoints.map((item) => (
            <div key={item.problem} className="p-6 border border-gray-100 rounded-2xl">
              <h3 className="font-semibold text-gray-900 mb-2">
                <span className="text-gray-400 mr-2">→</span>
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
          Junction Media works with a maximum of 4–5 clients at any time — which means your account
          gets genuine strategic attention, not a template campaign with your logo on it. For trades
          and construction, that means marketing built around how NZ customers actually find and
          choose a contractor in their area.
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
            In November 2025, Deep Blue Health — a NZ health brand — beat their all-time monthly
            revenue record by 30%. The result came from coordinated paid channels, email automation,
            and strategic campaign timing. The same principles — understanding your customer&apos;s
            search intent, removing friction from the enquiry process, and tracking every dollar
            back to a result — apply directly to trades and construction marketing.
          </p>
          <p className="text-gray-500 text-sm mt-4">
            Construction and trades-specific case studies available on request.
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
            { title: 'Construction & Trades Marketing NZ: The Playbook', href: '/blog/construction-trades-marketing-nz' },
            { title: 'Google Ads NZ', href: '/services/google-ads-nz' },
            { title: 'Local SEO NZ', href: '/services/seo-nz' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to fill your quote pipeline?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            We work with a maximum of 4–5 clients at any one time. If you want a marketing partner
            who understands how NZ customers find a tradie and treats your leads like they matter
            — apply below.
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
