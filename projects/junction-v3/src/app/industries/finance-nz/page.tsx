import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Financial Services Marketing NZ — Fintech, Mortgage & Wealth | Junction Media',
  description: 'Marketing for NZ financial services businesses that builds trust and drives qualified leads. Compliance-aware content, Google Ads for financial queries, LinkedIn B2B for advisors and fintech. Based in Auckland.',
  keywords: 'financial services marketing nz, fintech marketing nz, mortgage broker marketing nz, financial advisor marketing nz, insurance marketing nz, wealth management marketing nz, finance marketing auckland',
  openGraph: {
    title: 'Financial Services Marketing NZ — Fintech, Mortgage & Wealth | Junction Media',
    description: 'AI-driven marketing for NZ financial services. Compliance-aware content, Google Ads for financial queries, LinkedIn B2B for advisors and fintech.',
    url: 'https://www.junctionmedia.ai/industries/finance-nz',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/industries/finance-nz',
  },
}

const painPoints = [
  {
    problem: 'Compliance restrictions make marketing feel impossible',
    detail: 'NZ financial services marketing sits inside a tight regulatory framework. The Financial Markets Conduct Act, FMA guidelines, and disclosure obligations mean every piece of content carries risk. Generic agencies ignore this and hand you copy that could expose your licence. You need a partner who understands where the lines are — and how to build compelling marketing inside them.',
  },
  {
    problem: 'Trust is everything — and most financial marketing destroys it',
    detail: 'Kiwis are sceptical of financial services marketing for good reason. High-pressure tactics, vague claims, and pushy ads actively repel the clients you want. The best financial services businesses in NZ win on trust, expertise, and clarity — not volume. That requires a different approach to content, tone, and channel strategy.',
  },
  {
    problem: 'Your ideal clients are doing research before they contact anyone',
    detail: 'Whether it\'s a first home buyer comparing mortgage brokers, a business owner researching insurance, or an investor looking for a wealth manager — they research online first. If your site is thin, your Google presence is weak, and your content doesn\'t demonstrate expertise, you\'re not on the shortlist before the conversation starts.',
  },
  {
    problem: 'Referral networks plateau — digital channels require a different skill set',
    detail: 'Most established financial advisors and brokers built their book on referrals. That\'s a great foundation — but referral-only growth has a ceiling. Scaling digitally means Google Ads, SEO, and content marketing done right for a highly regulated industry. Most agencies don\'t know how to do that for finance.',
  },
]

const approach = [
  {
    title: 'Compliance-Aware Content Marketing',
    desc: 'We build content that demonstrates genuine expertise without triggering regulatory risk. Educational content — market commentary, explainers, guides — positions your advisors as credible thought leaders without making claims that expose your licence. This kind of content compounds over time, driving organic traffic and inbound enquiries.',
  },
  {
    title: 'Google Ads for High-Intent Financial Queries',
    desc: 'People searching "mortgage broker Auckland", "KiwiSaver advice NZ", or "business insurance quote" are ready to act. We build tightly structured Google Search campaigns that capture this intent with messaging that emphasises trust, credentials, and track record — and track every lead back to source.',
  },
  {
    title: 'LinkedIn B2B for Advisors and Fintech',
    desc: 'For B2B financial services — corporate insurance, business finance, wealth management for high-net-worth clients — LinkedIn is the most effective channel in NZ. We manage LinkedIn content and ads that reach CFOs, business owners, and decision-makers with the kind of credible, useful content that earns trust before the first meeting.',
  },
  {
    title: 'Trust-Building Website and SEO Strategy',
    desc: 'Your website is your most important trust signal. We audit and improve NZ financial services websites for clarity, compliance, conversion, and search performance — targeting the keywords your ideal clients actually use, and building the kind of content depth that makes Google rank you as the authoritative option.',
  },
  {
    title: 'Email Nurture for Long Decision Cycles',
    desc: 'A prospect researching wealth management options today might not be ready to move for six months. Email sequences keep you front-of-mind through that decision window — with genuinely useful financial content, not sales pressure. Done right, email is the highest ROI channel in financial services marketing.',
  },
]

const results = [
  { stat: '+30%', label: 'Above record (Deep Blue Health, Nov 2025)' },
  { stat: '4–5', label: 'Clients at any one time — real focus, real results' },
  { stat: 'FMA', label: 'Compliance-aware content as default' },
  { stat: '100%', label: 'NZ-based, NZ-market expertise' },
]

const packages = [
  {
    name: 'Growth',
    price: '$2,500',
    period: '/month NZD',
    desc: 'For financial services businesses entering digital marketing. Core presence, content foundation, and Google Ads.',
    includes: [
      'Google Ads management (financial queries)',
      'Monthly compliance-aware content piece',
      'LinkedIn profile optimisation',
      'Monthly strategy session',
      'Weekly performance reporting',
    ],
  },
  {
    name: 'Scale',
    price: '$4,500',
    period: '/month NZD',
    desc: 'For financial services businesses with existing client base wanting to grow. Full digital with LinkedIn Ads and email nurture.',
    includes: [
      'Everything in Growth',
      'LinkedIn Ads (sponsored content)',
      'Email nurture sequences (3–5 step)',
      'SEO content production (2x/month)',
      'Competitor intelligence monitoring',
      'Fortnightly strategy sessions',
    ],
    highlight: true,
  },
  {
    name: 'Partnership',
    price: '$8,500',
    period: '/month NZD',
    desc: 'Full marketing function for financial services firms scaling aggressively. Fractional CMO embedded — strategic and executional.',
    includes: [
      'Everything in Scale',
      'Fractional CMO access (Tom direct)',
      'Full content calendar execution',
      'Referral programme strategy',
      'PR and media placement support',
      'Board-level reporting',
    ],
  },
]

const faqs = [
  {
    q: 'Do you understand FMA compliance and financial services regulations?',
    a: 'Yes — this is non-negotiable for us. Every piece of content we create for financial services clients goes through a compliance lens. We understand the Financial Markets Conduct Act, FMA guidance on advertising, and the difference between educational content and regulated advice. We work with your compliance team or adviser, not around them.',
  },
  {
    q: 'We\'re a mortgage broker. Is digital marketing worth it for us?',
    a: 'Absolutely. Google Search for mortgage-related queries in NZ is high-intent and high-value — first home buyers and refinancers searching right now. A well-run Google Ads campaign plus a strong content presence (answering the questions buyers actually have) can transform a referral-dependent broker into a business with consistent digital lead flow.',
  },
  {
    q: 'How do you handle advertising for investment products?',
    a: 'Carefully and specifically. We don\'t make performance predictions, past returns claims, or anything that would create a misleading impression. Our content approach for investment and wealth management focuses on education, process, and credentials — content that earns trust without creating compliance risk. Your PI insurance and licence stay intact.',
  },
  {
    q: 'We\'re a fintech — how is that different from traditional financial services marketing?',
    a: 'Fintech marketing blends financial services compliance awareness with tech startup growth tactics. We understand both. Product-led growth, developer content, B2B SaaS acquisition, and financial services trust-building all play differently. We\'ll map a strategy specific to your fintech\'s stage, audience, and regulatory environment.',
  },
  {
    q: 'Can you show us results from financial services clients?',
    a: 'Our flagship published result is Deep Blue Health (+30% above store record, November 2025). For financial services-specific case studies, we discuss these directly in a discovery call — given the sensitivity of financial performance data, we share relevant work under NDA. Reach out and we\'ll make that easy.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Financial Services Marketing NZ',
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
  description: 'Compliance-aware marketing for NZ financial services, fintech, mortgage brokers, insurance, and wealth management. Google Ads, content marketing, LinkedIn B2B, and email nurture.',
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

export default function FinanceNZPage() {
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
          Industry · Financial Services NZ
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Financial Services Marketing<br />
          <span className="text-gray-500">NZ</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          Compliance-aware marketing for NZ financial services that builds genuine trust and drives
          qualified leads. Mortgage brokers, financial advisors, insurers, wealth managers, and
          fintech — we understand the regulatory landscape and know how to market inside it.
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
        <h2 className="text-2xl font-bold mb-8">The Financial Services Marketing Problem in NZ</h2>
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
          Junction Media works with a maximum of 4–5 clients at any time. That means your financial
          services business gets genuine strategic attention — not a junior account manager following
          a templated plan. We understand the NZ financial regulatory environment, the trust dynamics
          of the sector, and how to build marketing that earns clients rather than repelling them.
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
            and strategic campaign timing. The same rigour — attribution, channel coordination, and
            deep market understanding — applies directly to financial services client acquisition.
          </p>
          <p className="text-gray-500 text-sm mt-4">
            Financial services-specific case studies available on request under NDA.
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
            { title: 'Financial Services Marketing NZ: The Complete Guide', href: '/blog/finance-marketing-nz' },
            { title: 'Content Marketing NZ', href: '/services/content-marketing-nz' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to grow your financial services business?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            We work with a maximum of 4–5 clients at any one time. If you want a marketing partner
            who understands NZ financial services compliance and treats your client acquisition
            like it&apos;s their own — apply below.
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
