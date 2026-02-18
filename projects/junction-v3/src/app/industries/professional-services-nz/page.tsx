import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Professional Services Marketing NZ — AI-Powered Authority | Junction Media',
  description: 'Professional services marketing NZ. AI-driven marketing for law firms, accountants, consultants, and B2B service providers. Build authority, generate qualified leads. Auckland-based.',
  keywords: 'professional services marketing nz, law firm marketing nz, accounting firm marketing nz, b2b marketing nz, consultant marketing nz, professional services digital marketing nz',
  openGraph: {
    title: 'Professional Services Marketing NZ — AI-Powered Authority | Junction Media',
    description: 'AI-driven marketing for NZ professional services firms. Build genuine authority, generate qualified leads, and create a marketing engine that works while you bill.',
    url: 'https://www.junctionmedia.ai/industries/professional-services-nz',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/industries/professional-services-nz',
  },
}

const painPoints = [
  {
    problem: 'You rely on referrals and have no control over your pipeline',
    detail: 'Referrals are the lifeblood of professional services — but relying on them exclusively means you have no ability to predict or influence growth. When referrals slow down, so does revenue. Building digital lead channels gives you a pipeline you control.',
  },
  {
    problem: 'Your competitors are winning on Google search',
    detail: '"Business lawyer Auckland", "accountant for small business NZ", "management consultant Wellington" — these searches happen thousands of times per month. If you\'re not on page one, those potential clients are calling your competitors. Professional services firms are often late to invest in SEO, which means there\'s still opportunity for firms who move now.',
  },
  {
    problem: 'You\'re billing time, not building authority',
    detail: 'The people who are brilliant at their craft often have no time to build the profile that attracts the clients who can afford premium rates. Authority marketing — thought leadership, LinkedIn presence, expert content — is what commands higher fees and attracts the right clients.',
  },
  {
    problem: 'Your website is a brochure, not a lead machine',
    detail: 'Most professional services websites list services and team bios. That\'s not enough. Potential clients need to see your expertise, your process, and social proof before they ever pick up the phone. A site that educates and qualifies visitors converts at a fraction of the cost of outbound prospecting.',
  },
]

const approach = [
  {
    title: 'SEO-Led Authority Building',
    desc: 'Content strategy built around the questions your ideal clients are searching for. Expert articles, guides, and resources that demonstrate deep expertise — not generic industry content. Optimised to rank on Google and capture clients in research mode.',
  },
  {
    title: 'LinkedIn Thought Leadership',
    desc: 'Professional services decisions are made on LinkedIn. We build systematic LinkedIn content strategies for principals and senior partners — positioning them as the go-to expert in their niche. Authority built in public attracts inbound enquiries.',
  },
  {
    title: 'Google Ads for High-Intent Search',
    desc: 'Professional services searches on Google have high intent — people searching for a specific service are often ready to engage. We capture that intent with targeted Google Ads campaigns focused on the services and specialisations that generate the highest-value clients.',
  },
  {
    title: 'Lead Nurture and Email',
    desc: 'Most professional services prospects research for weeks before making contact. Email sequences, gated resources, and follow-up campaigns keep your firm front-of-mind through a longer decision-making cycle.',
  },
  {
    title: 'Referral System Amplification',
    desc: 'We don\'t replace referral marketing — we amplify it. Client testimonials, case studies, and structured referral programs turn satisfied clients into active advocates. Your reputation works for you 24/7.',
  },
]

const packages = [
  {
    name: 'Growth',
    price: '$2,500',
    period: '/month NZD',
    desc: 'For boutique firms and solo practitioners. Digital foundations + authority content.',
    includes: [
      'SEO content strategy + 2 articles/month',
      'Google Ads (branded + service search)',
      'LinkedIn content (4 posts/month)',
      'Monthly performance review',
      'Competitor tracking',
    ],
  },
  {
    name: 'Scale',
    price: '$4,500',
    period: '/month NZD',
    desc: 'For established firms wanting to build a reliable lead pipeline alongside referrals.',
    includes: [
      'Everything in Growth',
      'Full SEO content program (4–6 articles/month)',
      'Email nurture sequences',
      'Google Ads + LinkedIn Ads management',
      'Case study and testimonial production',
      'Fortnightly strategy sessions',
    ],
    highlight: true,
  },
  {
    name: 'Partnership',
    price: '$8,500',
    period: '/month NZD',
    desc: 'For larger firms and practices ready to build a full marketing function.',
    includes: [
      'Everything in Scale',
      'Fractional CMO access',
      'Full channel ownership',
      'BD support (proposal templates, pitch decks)',
      'AI marketing systems build',
      'Weekly leadership check-ins',
    ],
  },
]

const faqs = [
  {
    q: 'What types of professional services firms do you work with?',
    a: 'Law firms, accounting and advisory practices, management consultants, HR consultants, engineering consultants, financial advisers, and similar B2B service providers. The common thread is: you sell expertise and time, you have a longer sales cycle, and relationships matter more than transactions. If that sounds like you, we can help.',
  },
  {
    q: 'Is digital marketing appropriate for professional services in NZ?',
    a: 'Absolutely — and NZ is behind the curve compared to Australia and the UK, which means there\'s still competitive advantage for firms who invest now. In sectors like law, accounting, and consulting, most firms are still relying entirely on referrals and word of mouth. The firms that build digital authority in the next 2–3 years will have a significant structural advantage when the market catches up.',
  },
  {
    q: 'How do you handle compliance and regulatory restrictions in industries like financial advice or law?',
    a: 'We work within your compliance framework. Content is reviewed against your regulatory requirements before publication. We don\'t make claims you can\'t substantiate or produce content that creates compliance risk. We\'ll ask you to review any content that touches regulated advice areas before it goes live — that\'s non-negotiable and appropriate.',
  },
  {
    q: 'Can you help us attract better clients, not just more clients?',
    a: 'Yes — this is actually the most important thing we do for professional services firms. The goal isn\'t maximum lead volume; it\'s maximum qualified lead volume. We design content and campaigns to attract the specific client profile you want — by industry, by business size, by complexity of need — and filter out the enquiries that aren\'t the right fit.',
  },
  {
    q: 'How long does it take to see results from professional services marketing?',
    a: 'Google Ads can start generating enquiries within 2–4 weeks of launch. SEO is a 3–6 month play — organic content takes time to rank, but once it does, it compounds. LinkedIn authority building shows results over 3–6 months as your network and content engagement grows. We structure engagements to generate early signal from paid channels while building long-term organic authority in parallel.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Professional Services Marketing NZ',
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
  description: 'AI-driven marketing for NZ professional services firms. Build genuine authority, generate qualified B2B leads, and create a marketing engine that runs while you bill.',
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

export default function ProfessionalServicesNZPage() {
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
          Industry · Professional Services NZ
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Professional Services<br />
          <span className="text-gray-500">Marketing NZ</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          AI-driven marketing for NZ law firms, accountants, consultants, and B2B service providers
          who want to build genuine digital authority, generate qualified inbound leads, and stop
          relying exclusively on referrals and word of mouth.
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
            { stat: 'Inbound', label: 'Qualified leads — not cold outreach' },
            { stat: '4–5', label: 'Clients at any one time' },
            { stat: 'Authority', label: 'Content that commands premium rates' },
            { stat: 'Compliant', label: 'Content reviewed within your regulatory framework' },
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
        <h2 className="text-2xl font-bold mb-8">The Professional Services Marketing Problem in NZ</h2>
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
        <h2 className="text-2xl font-bold mb-4">How We Build Your Authority &amp; Pipeline</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Junction Media works with a maximum of 4–5 clients at any one time. We&apos;re not a factory
          producing generic content for 50 firms. We go deep on your practice area, your ideal client
          profile, and the content strategy that actually moves the needle for your specific niche in the NZ market.
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
            { title: 'Marketing for Professional Services in NZ', href: '/blog/professional-services-marketing-nz' },
            { title: 'B2B Marketing NZ', href: '/blog/b2b-marketing-nz' },
            { title: 'SEO NZ', href: '/services/seo-nz' },
            { title: 'Content Marketing NZ', href: '/services/content-marketing-nz' },
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
          <h2 className="text-3xl font-bold mb-4">Build a pipeline that doesn&apos;t depend on referrals.</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            We work with select NZ professional services firms who are serious about building
            sustainable inbound marketing — not just waiting for the phone to ring.
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
