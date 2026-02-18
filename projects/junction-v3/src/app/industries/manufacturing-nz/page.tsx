import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Manufacturing Marketing NZ — B2B & Industrial Growth | Junction Media',
  description: 'Marketing for NZ manufacturers that drives real pipeline. LinkedIn B2B, content marketing, Google Ads for industrial search, and email nurture for long sales cycles. Based in Auckland.',
  keywords: 'manufacturing marketing nz, marketing for manufacturers nz, b2b marketing nz manufacturing, industrial marketing nz, b2b marketing agency nz, manufacturer marketing auckland',
  openGraph: {
    title: 'Manufacturing Marketing NZ — B2B & Industrial Growth | Junction Media',
    description: 'AI-driven marketing for NZ manufacturers. LinkedIn B2B campaigns, content authority, Google Ads for industrial search, and email nurture built for long sales cycles.',
    url: 'https://www.junctionmedia.ai/industries/manufacturing-nz',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/industries/manufacturing-nz',
  },
}

const painPoints = [
  {
    problem: 'Complex products that are hard to explain — let alone market',
    detail: 'NZ manufacturers deal in specifications, tolerances, and technical detail that means nothing to a generic copywriter. Your buyers are engineers, procurement leads, and operations managers who see through vague marketing immediately. Generic content destroys credibility faster than no content at all.',
  },
  {
    problem: 'Sales cycles stretch across months — your marketing isn\'t built for it',
    detail: 'A factory equipment decision or a supply chain partnership doesn\'t happen after one Google ad click. NZ B2B buying cycles average 3–9 months with multiple stakeholders. Most marketing is built for fast consumer purchases — not considered industrial procurement.',
  },
  {
    problem: 'You\'re invisible to buyers doing research online',
    detail: 'Procurement leads and operations managers search Google before they call anyone. If your site looks like it was built in 2008 and your LinkedIn is a ghost town, you\'re losing deals before the conversation even starts. Your competitors from Australia and Asia are showing up — you\'re not.',
  },
  {
    problem: 'Export ambitions without an export marketing strategy',
    detail: 'NZ manufacturers with world-class products — food and beverage, industrial goods, specialty materials — routinely fail to break into Australian and international markets because marketing wasn\'t part of the export plan. Great product, invisible brand.',
  },
]

const approach = [
  {
    title: 'LinkedIn B2B That Actually Generates Pipeline',
    desc: 'LinkedIn is where NZ procurement managers, engineers, and C-suite buyers spend their professional time. We build targeted campaigns that position you as the credible, expert option — not spray-and-pray sponsored posts, but precision B2B outreach and content that earns trust over the sales cycle.',
  },
  {
    title: 'Technical Content That Earns Credibility',
    desc: 'White papers, case studies, technical explainers, and industry insight content that speaks to your buyer\'s actual language. Good B2B content marketing compounds — it generates inbound enquiries, supports your sales team, and builds search authority simultaneously.',
  },
  {
    title: 'Google Ads for Industrial Search',
    desc: 'Industrial buyers use Google to research suppliers. We capture them with tightly structured Google Search campaigns targeting high-intent procurement terms — then track every enquiry back to source. NZ search volumes are smaller, which means waste-free campaign structure is non-negotiable.',
  },
  {
    title: 'Email Nurture for Long Sales Cycles',
    desc: 'A prospect who isn\'t ready to buy today may be ready in six months. Email nurture sequences keep Junction Media clients front-of-mind through the entire decision window — with useful, non-pushy content that educates buyers and reinforces your authority.',
  },
  {
    title: 'Trade Show & Event Marketing Support',
    desc: 'NZ manufacturing still moves heavily through EMEX, FoodTech Packtech, and industry association events. We build pre-show awareness campaigns, post-show follow-up sequences, and year-round content that extends your event investment well beyond the three days on the floor.',
  },
]

const results = [
  { stat: '+30%', label: 'Above store record (Deep Blue Health, Nov 2025)' },
  { stat: '4–5', label: 'Clients at any one time — real focus, real results' },
  { stat: 'B2B', label: 'Long-cycle nurture built into every engagement' },
  { stat: '100%', label: 'NZ-based, NZ-market expertise' },
]

const packages = [
  {
    name: 'Growth',
    price: '$2,500',
    period: '/month NZD',
    desc: 'For NZ manufacturers entering the digital marketing space. Core B2B presence + content foundation.',
    includes: [
      'LinkedIn company page management',
      'Google Ads (industrial search)',
      'Monthly content piece (blog or case study)',
      'Monthly strategy session',
      'Weekly performance reporting',
    ],
  },
  {
    name: 'Scale',
    price: '$4,500',
    period: '/month NZD',
    desc: 'For manufacturers with existing pipeline wanting to grow it. Full B2B marketing with email nurture and content authority.',
    includes: [
      'Everything in Growth',
      'LinkedIn Ads (sponsored content + InMail)',
      'Email nurture sequences (3–5 step)',
      'Technical content production (2x/month)',
      'Competitor intelligence monitoring',
      'Fortnightly strategy sessions',
    ],
    highlight: true,
  },
  {
    name: 'Partnership',
    price: '$8,500',
    period: '/month NZD',
    desc: 'Full B2B marketing function for manufacturers scaling aggressively or entering export markets. Fractional CMO embedded.',
    includes: [
      'Everything in Scale',
      'Fractional CMO access (Tom direct)',
      'Export market entry strategy',
      'Full content calendar execution',
      'Trade show marketing support',
      'Board-level reporting',
    ],
  },
]

const faqs = [
  {
    q: 'Do you understand manufacturing? We\'re not a consumer brand.',
    a: 'That\'s the right question to ask. Yes — we work with technically complex NZ businesses and understand B2B buying psychology, procurement processes, and the difference between a marketing brief that\'ll work for a procurement manager versus one that\'ll embarrass you. We don\'t produce generic content for technical industries.',
  },
  {
    q: 'Our sales cycles are 6–12 months. Can marketing actually help that?',
    a: 'Absolutely — and in fact, long sales cycles make marketing more valuable, not less. Consistent LinkedIn presence, email nurture, and content authority mean you\'re building trust throughout the decision window. Buyers who\'ve read your case studies and followed your LinkedIn updates are dramatically easier to close than cold prospects.',
  },
  {
    q: 'We\'re not on LinkedIn much. Is that really worth it for NZ manufacturing?',
    a: 'LinkedIn has over 1.2 million NZ users and is the primary professional network for procurement, operations, and C-suite decision makers. If you\'re selling B2B, your buyers are there. The question isn\'t whether to be on LinkedIn — it\'s whether to do it strategically or just post company updates nobody reads.',
  },
  {
    q: 'We want to expand into Australia. Can you help with that?',
    a: 'Yes. Export market entry is part of our Partnership package and something we think about strategically — not just running Australian Google Ads, but positioning your brand correctly for an Australian procurement audience, understanding the competitive landscape, and building the content infrastructure that makes Australian buyers trust a NZ supplier.',
  },
  {
    q: 'Can you show us results from manufacturing clients specifically?',
    a: 'Our flagship published result is Deep Blue Health (+30% above store record, November 2025) — a product brand rather than industrial manufacturing. For manufacturing-specific case studies, we\'re happy to discuss these directly in a discovery call. Reach out and we\'ll share relevant work under NDA if required.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Manufacturing Marketing NZ',
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
  description: 'AI-driven B2B marketing for NZ manufacturers. LinkedIn campaigns, technical content, Google Ads for industrial search, and email nurture built for long sales cycles.',
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

export default function ManufacturingNZPage() {
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
          Industry · Manufacturing NZ
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Manufacturing Marketing<br />
          <span className="text-gray-500">NZ</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          B2B marketing for NZ manufacturers that generates real pipeline — not vanity metrics.
          LinkedIn, technical content, industrial search, and email nurture built for the way
          procurement actually works. Based in Auckland, built for NZ industry.
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
        <h2 className="text-2xl font-bold mb-8">The Manufacturing Marketing Problem in NZ</h2>
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
          Junction Media isn&apos;t a generalist agency that runs the same playbook for every client.
          We work with a maximum of 4–5 clients at any time — which means your account gets
          genuine strategic attention, not junior account management. For manufacturers, that
          means B2B marketing that speaks your buyers&apos; language and tracks back to pipeline, not impressions.
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
            revenue record by 30%. The result came from a coordinated approach across paid channels,
            email automation, and strategic campaign timing. The same principles — rigorous attribution,
            channel coordination, and deep market knowledge — apply directly to B2B manufacturing marketing.
          </p>
          <p className="text-gray-500 text-sm mt-4">
            Manufacturing-specific case studies available on request.
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
            { title: 'Manufacturing Marketing NZ: The B2B Playbook', href: '/blog/manufacturing-marketing-nz' },
            { title: 'Content Marketing NZ', href: '/services/content-marketing-nz' },
            { title: 'B2B Google Ads NZ', href: '/services/google-ads-nz' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to build a real B2B pipeline?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            We work with a maximum of 4–5 clients at any one time. If you want a marketing partner
            who understands manufacturing and treats your pipeline like it&apos;s their own — apply below.
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
