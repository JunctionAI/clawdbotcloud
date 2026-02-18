import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Real Estate Marketing Agency NZ — AI-Powered Lead Gen | Junction Media',
  description: 'Real estate marketing agency NZ. AI-driven lead generation, Google Ads, Meta Ads, and content marketing for NZ property professionals. Based in Auckland.',
  keywords: 'real estate marketing agency nz, real estate marketing nz, property marketing nz, real estate digital marketing nz, real estate lead generation nz, real estate ads nz',
  openGraph: {
    title: 'Real Estate Marketing Agency NZ — AI-Powered Lead Gen | Junction Media',
    description: 'AI-driven marketing for NZ real estate agencies and property developers. Google Ads, Meta lead generation, and content that builds long-term authority.',
    url: 'https://www.junctionmedia.ai/industries/real-estate-nz',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/industries/real-estate-nz',
  },
}

const painPoints = [
  {
    problem: 'You\'re generating enquiries but not quality leads',
    detail: 'Volume is vanity. NZ real estate marketers often optimise for clicks and form fills — but the leads that arrive are unqualified, time-wasting, or ready to list in 18 months. The problem is usually targeting and funnel structure, not ad spend.',
  },
  {
    problem: 'The NZ property market moves fast and your marketing doesn\'t',
    detail: 'A campaign built for a rising market fails in a cooling one. Most agencies set campaigns and leave them. When OCR changes or auction clearance rates shift, your messaging and offers need to adapt — immediately, not at the next quarterly review.',
  },
  {
    problem: 'You\'re competing on price instead of authority',
    detail: 'When vendors don\'t know you, they compare agents on commission rates. Building consistent online authority — content, social proof, local market coverage — repositions you as the obvious choice before the appraisal conversation starts.',
  },
  {
    problem: 'Your CRM data is sitting unused',
    detail: 'Most real estate CRMs hold years of vendor and buyer data that\'s never leveraged for re-engagement. Warm past clients are your cheapest lead source. Most agents leave them completely cold.',
  },
]

const approach = [
  {
    title: 'AI-Driven Lead Scoring',
    desc: 'Not all leads are equal. We build lead qualification frameworks using AI that score enquiries by intent signals, timeline, property profile, and prior engagement — so your agents spend time on the right conversations.',
  },
  {
    title: 'Hyper-Local Google Ads',
    desc: 'Suburb-level targeting for Google Search and Display. Buyers and vendors search with location intent — "sell house in Remuera", "houses for sale Karori". We capture that intent before your competitors do.',
  },
  {
    title: 'Meta Ads for Vendor Lead Generation',
    desc: 'Facebook and Instagram campaigns targeting homeowners by location, property ownership signals, and life events (recent movers, growing families). Vendor lead generation that warms prospects over weeks, not just instant form fills.',
  },
  {
    title: 'Authority Content Strategy',
    desc: 'Consistent local market reports, suburb guides, and buyer/seller education content that positions your team as the market experts. Vendors choose agents they trust — trust is built through consistent, valuable content over time.',
  },
  {
    title: 'Database Re-Engagement',
    desc: 'Email and remarketing sequences to re-engage past clients, unconverted leads, and warm contacts. Your existing database is your most cost-effective lead source — we help you activate it.',
  },
]

const packages = [
  {
    name: 'Growth',
    price: '$2,500',
    period: '/month NZD',
    desc: 'For individual agents or small teams. Core digital presence + lead generation fundamentals.',
    includes: [
      'Google Ads (search + display remarketing)',
      'Meta Ads (vendor lead gen)',
      'Monthly market content piece',
      'Lead qualification setup',
      'Weekly performance reporting',
    ],
  },
  {
    name: 'Scale',
    price: '$4,500',
    period: '/month NZD',
    desc: 'For established agencies and team leaders. Full-funnel digital strategy with content authority building.',
    includes: [
      'Everything in Growth',
      'Database re-engagement campaigns',
      'Suburb authority content (4 pieces/month)',
      'CRM integration and lead scoring',
      'Fortnightly strategy sessions',
      'Competitive market monitoring',
    ],
    highlight: true,
  },
  {
    name: 'Partnership',
    price: '$8,500',
    period: '/month NZD',
    desc: 'For multi-office agencies and property developers. Full marketing function embedded with your team.',
    includes: [
      'Everything in Scale',
      'Fractional CMO access',
      'Developer project launch campaigns',
      'Full channel ownership',
      'AI marketing systems build',
      'Weekly leadership check-ins',
    ],
  },
]

const faqs = [
  {
    q: 'Do you work with individual agents or agencies?',
    a: 'Both. Individual agents with their own marketing budget benefit from the Growth package — it sets a professional digital baseline. Established agencies with multiple agents suit Scale or Partnership. Property developers (off-plan launches, new subdivisions) often benefit from the full Partnership model with a bespoke campaign structure.',
  },
  {
    q: 'How does real estate marketing differ in NZ vs Australia?',
    a: 'NZ property buyers and vendors have distinct behaviours. Auction culture is more embedded in Auckland than most Australian cities. The NZ market is more relationship-driven — a vendor often knows their agent before they appraise. Marketing needs to build familiarity over a longer lead time rather than driving instant conversion. We understand this and structure campaigns accordingly.',
  },
  {
    q: 'Can you help with project marketing for new developments?',
    a: 'Yes. Apartment off-plans, new subdivisions, and lifestyle developments require a different approach to standard agency marketing — longer sales cycles, investor and first-home buyer segmentation, and staged launch campaigns. We\'ve built campaigns for NZ property developments and understand the compliance requirements around real estate advertising.',
  },
  {
    q: 'What does a vendor lead generation campaign actually look like?',
    a: 'Typically a Meta Ads campaign targeting homeowners in your target suburbs with life event signals. Ads focus on market intelligence — "What\'s your [suburb] home worth in today\'s market?" or "2025 [suburb] market report" — rather than direct "list with us" pitches. Leads come in via a landing page or Meta instant form, then move into an email nurture sequence. The goal is to warm prospects over a 30–90 day window, not just generate one-touch enquiries.',
  },
  {
    q: 'Do you manage REA or Trade Me Property advertising?',
    a: 'We don\'t manage listing portals directly — that\'s your core platform spend and typically managed in-house. We focus on the channels around that ecosystem: Google (capturing active search intent), Meta (prospecting and re-engagement), email (database activation), and content (authority building). Together, these channels generate leads before they ever hit the portals.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Real Estate Marketing Agency NZ',
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
  description: 'AI-driven marketing for NZ real estate agencies and property professionals. Lead generation, Google Ads, Meta Ads, and content authority building.',
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

export default function RealEstateNZPage() {
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
          Industry · Real Estate NZ
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Real Estate Marketing<br />
          <span className="text-gray-500">Agency NZ</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          AI-driven marketing for NZ real estate agencies, property developers, and top-performing
          agents who want to generate better leads, build genuine authority, and stop relying on
          word-of-mouth alone.
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
          {[
            { stat: 'Suburb-level', label: 'Targeting precision on Google & Meta' },
            { stat: '4–5', label: 'Clients at any time — full focus guaranteed' },
            { stat: 'Week 2', label: 'First vendor leads campaign live' },
            { stat: 'NZ-only', label: 'We know the local market' },
          ].map((item) => (
            <div key={item.label} className="p-4 border border-gray-100 rounded-2xl text-center">
              <p className="text-xl font-bold text-gray-900 mb-1">{item.stat}</p>
              <p className="text-xs text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pain Points */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">The Real Estate Marketing Problem in NZ</h2>
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

      {/* Approach */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-4">How We Build Your Pipeline</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          We work with a maximum of 4–5 clients at any time. Real estate is one of our core industry
          verticals — which means you get a marketing partner who genuinely understands NZ property
          market dynamics, not a generalist who&apos;s applied the same strategy to every industry.
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

      {/* Packages */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-4">Packages</h2>
        <p className="text-gray-500 mb-8">3-month minimum engagement. All packages are NZD, excluding ad spend budgets (paid directly to platforms).</p>
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
            { title: 'Real Estate Marketing in NZ: What Actually Works', href: '/blog/real-estate-marketing-nz' },
            { title: 'Lead Generation NZ', href: '/blog/lead-generation-nz' },
            { title: 'Meta Ads NZ', href: '/services/meta-ads-nz' },
            { title: 'Google Ads NZ', href: '/services/google-ads-nz' },
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
          <h2 className="text-3xl font-bold mb-4">Build a lead pipeline that works without you.</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            We work with select NZ property professionals who are serious about building a
            sustainable digital marketing engine — not just buying leads.
          </p>
          <Link
            href="/apply"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg"
          >
            Apply to Work With Us
          </Link>
          <p className="text-gray-400 text-sm mt-4">NZ businesses only. Spots are limited.</p>
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
