import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'SaaS & Tech Marketing Agency NZ — AI-Powered Growth | Junction Media',
  description: 'SaaS and tech marketing agency NZ. AI-driven demand generation, content marketing, and paid acquisition for NZ SaaS companies and tech startups. Based in Auckland.',
  keywords: 'saas marketing agency nz, tech marketing nz, saas marketing nz, b2b saas nz, software marketing nz, tech startup marketing nz, demand generation nz, saas agency auckland',
  openGraph: {
    title: 'SaaS & Tech Marketing Agency NZ — AI-Powered Growth | Junction Media',
    description: 'AI-driven marketing for NZ SaaS companies and tech startups. Demand generation, product-led growth, and content that converts trials to paying customers.',
    url: 'https://www.junctionmedia.ai/industries/saas-nz',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/industries/saas-nz',
  },
}

const painPoints = [
  {
    problem: 'You\'re building a product but not building a demand engine',
    detail: 'Most NZ SaaS founders are product-first and marketing-last. The product gets built; the marketing gets bolted on. The result: excellent software that nobody knows about. Building a demand engine in parallel with the product is what creates sustainable growth.',
  },
  {
    problem: 'Your CAC is too high and your LTV is unclear',
    detail: 'Without a structured marketing function, NZ SaaS companies often grow through personal networks and conference relationships — which doesn\'t scale. When you do invest in paid acquisition, without proper funnel tracking the CAC spirals and the ROI case falls apart.',
  },
  {
    problem: 'Your trial-to-paid conversion is lower than it should be',
    detail: 'Acquisition is only half the battle. Most SaaS companies under-invest in the onboarding and nurture sequences that convert trials to paying customers. Email automation, in-app prompts, and success content are the levers — they\'re often untouched.',
  },
  {
    problem: 'You\'re competing globally with a NZ-sized marketing budget',
    detail: 'NZ SaaS companies often target international markets (Australia, UK, US) but with local budgets. The strategy needs to be surgical — the right channels, the right content, the right positioning to punch above weight in competitive markets.',
  },
]

const approach = [
  {
    title: 'Demand Generation Architecture',
    desc: 'Building a full-funnel demand generation system — awareness content, lead magnets, trial sign-ups, and conversion sequences. Every stage measured, every drop-off point identified and addressed.',
  },
  {
    title: 'Content-Led SEO',
    desc: 'B2B SaaS buyers research extensively before buying. Ranking for "best [category] software NZ", comparison content, use-case guides, and integration articles captures buyers at every stage of the decision journey.',
  },
  {
    title: 'LinkedIn B2B Demand Generation',
    desc: 'LinkedIn is where B2B SaaS decisions get influenced. Thought leadership from founders, targeted LinkedIn Ads to specific job titles and companies, and content that positions your product as the obvious choice in your category.',
  },
  {
    title: 'Trial Nurture and Onboarding',
    desc: 'Email sequences that guide trial users to their first value moment, address objections, and convert to paid. Properly built, these sequences compound — every trial that converts is a payback on your acquisition cost.',
  },
  {
    title: 'AI-Native Marketing Stack',
    desc: 'We build and connect marketing tools that most SaaS companies can\'t afford to hire for: automated competitive monitoring, AI-assisted content production at scale, attribution modelling, and performance anomaly detection.',
  },
]

const packages = [
  {
    name: 'Growth',
    price: '$2,500',
    period: '/month NZD',
    desc: 'For early-stage SaaS and tech startups. Marketing foundations + demand generation.',
    includes: [
      'Content strategy + 2 pieces/month',
      'LinkedIn organic + paid management',
      'Trial nurture email sequence (built once)',
      'Google Ads (branded + category)',
      'Monthly analytics and strategy review',
    ],
  },
  {
    name: 'Scale',
    price: '$4,500',
    period: '/month NZD',
    desc: 'For funded SaaS companies ready to build a repeatable growth engine.',
    includes: [
      'Everything in Growth',
      'Full SEO content program (4–6 pieces/month)',
      'LinkedIn Ads + retargeting',
      'Conversion rate optimisation (landing pages)',
      'Attribution modelling setup',
      'Fortnightly growth strategy sessions',
    ],
    highlight: true,
  },
  {
    name: 'Partnership',
    price: '$8,500',
    period: '/month NZD',
    desc: 'For scaling SaaS companies that need a full marketing function without a full CMO salary.',
    includes: [
      'Everything in Scale',
      'Fractional CMO access (Tom direct)',
      'Full channel ownership',
      'AI marketing systems build',
      'Board-level marketing reporting',
      'Weekly leadership check-ins',
    ],
  },
]

const faqs = [
  {
    q: 'Do you work with NZ SaaS companies targeting international markets?',
    a: 'Yes — most NZ SaaS companies have to. The local market is too small for most software businesses to build meaningful scale. We help NZ SaaS companies build marketing engines that work in Australia, the UK, and the US — leveraging NZ\'s credibility as a tech-forward market while building the distribution channels needed to compete globally.',
  },
  {
    q: 'What stage of SaaS company do you work best with?',
    a: 'Post-product-market-fit to Series A/B. Pre-PMF companies need to be testing messaging and channels rapidly — that\'s founder-led and hard to outsource effectively. Once you have repeatable revenue and a clear ICP, that\'s when a structured marketing function creates the most value. We\'ve worked with companies ranging from $50k MRR through to $2M+ ARR.',
  },
  {
    q: 'Can you help with product-led growth (PLG) marketing?',
    a: 'Yes. PLG requires a different marketing approach than traditional SaaS — the product is the main acquisition channel, and marketing\'s job is to drive trial sign-ups and then improve the in-product experience that converts free to paid. We understand PLG mechanics and can build the acquisition and conversion systems around a PLG motion.',
  },
  {
    q: 'How do you measure success for SaaS marketing?',
    a: 'Revenue impact, always. That means tracking MQL to SQL to trial to paid conversion rates, CAC by channel, LTV:CAC ratio, and payback period. Vanity metrics (impressions, followers) are noted but never the focus. We build proper attribution from day one so you can see exactly what your marketing spend is generating in pipeline and revenue.',
  },
  {
    q: 'Do you have experience with specific SaaS verticals?',
    a: 'We\'ve worked with SaaS companies in HR tech, professional services software, trade and field service platforms, and ecommerce tooling. Each vertical has different buyer personas, different decision-making cycles, and different content needs. We onboard deeply into your vertical before touching any marketing execution.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'SaaS & Tech Marketing Agency NZ',
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
  description: 'AI-driven marketing for NZ SaaS companies and tech startups. Demand generation, content, and paid acquisition to grow MRR and reduce CAC.',
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

export default function SaaSNZPage() {
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
          Industry · SaaS &amp; Tech NZ
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          SaaS &amp; Tech Marketing<br />
          <span className="text-gray-500">Agency NZ</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          AI-driven demand generation for NZ SaaS companies and tech startups who need to grow
          MRR, reduce CAC, and build a marketing engine that scales — without hiring a full
          marketing team or paying enterprise agency rates.
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
            { stat: 'MRR', label: 'Revenue focus — not vanity metrics' },
            { stat: '4–5', label: 'Clients at any one time' },
            { stat: 'Global', label: 'Built for international expansion' },
            { stat: 'AI-native', label: 'Marketing stack most agencies can\'t build' },
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
        <h2 className="text-2xl font-bold mb-8">The SaaS Marketing Problem in NZ</h2>
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
        <h2 className="text-2xl font-bold mb-4">How We Build Your Growth Engine</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Junction Media is AI-native by design — we use the same tools we build for SaaS companies
          to run our own marketing. We understand your product context, your buyer journey, and the
          metrics that matter. We work with a maximum of 4–5 clients at any time so you get
          genuine strategic depth, not a junior account manager running playbooks.
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
        <p className="text-gray-500 mb-8">3-month minimum. All NZD, excluding ad spend (paid directly to platforms).</p>
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
            { title: 'AI Marketing Systems NZ', href: '/services/ai-marketing-systems' },
            { title: 'Content Marketing NZ', href: '/services/content-marketing-nz' },
            { title: 'B2B Marketing NZ', href: '/blog/b2b-marketing-nz' },
            { title: 'Startup Marketing NZ', href: '/blog/startup-marketing-nz' },
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
          <h2 className="text-3xl font-bold mb-4">Build the marketing engine your product deserves.</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            We work with select NZ SaaS companies and tech businesses who are serious about
            building a repeatable growth engine — not just running ads and hoping.
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
