import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'SEO Agency Whangarei | Whangarei SEO Company | Junction Media',
  description: 'SEO agency serving Whangarei and Northland businesses. AI-powered technical SEO, content strategy, and authority building for Whangarei CBD, Kamo, Tikipunga and across Northland. $1,200–$2,500/mo.',
  keywords: 'SEO agency Whangarei, Whangarei SEO, SEO company Whangarei, SEO services Whangarei, Whangarei SEO consultant, local SEO Whangarei, SEO Whangarei NZ, Northland SEO, search engine optimisation Whangarei',
  openGraph: {
    title: 'SEO Agency Whangarei | Junction Media',
    description: 'AI-native SEO for Whangarei and Northland businesses. Technical SEO, content strategy, and authority building that turns organic search into a compounding revenue channel.',
    url: 'https://www.junctionmedia.ai/whangarei/seo-agency',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/whangarei/seo-agency',
  },
}

const faqs = [
  {
    q: 'How much does SEO cost for a Whangarei business?',
    a: 'Whangarei SEO pricing at Junction Media ranges from $1,200–$2,500/month NZD depending on scope. $1,200/month covers technical SEO maintenance and 2–3 content pieces per month. $2,500/month adds aggressive authority building and 6–8 content pieces per month. All engagements are 3-month minimum — Northland search markets take time to build, and meaningful results compound over time.',
  },
  {
    q: 'Is SEO worth investing in for a Whangarei or Northland business?',
    a: 'Yes — Whangarei is Northland\'s main commercial centre. Local searches for trades, tourism, retail, agriculture, and professional services are made daily by Whangarei residents and businesses across the region. The opportunity: Whangarei has significantly less SEO competition than Auckland, meaning businesses that invest now can achieve rankings that would take far longer in larger markets.',
  },
  {
    q: 'What Whangarei industries benefit most from SEO?',
    a: 'Whangarei trades (builders, plumbers, electricians), tourism and hospitality businesses, healthcare providers, agricultural services, retail businesses, and professional services (legal, accounting) all see strong SEO ROI in the Whangarei and Northland market. The region\'s growing population and booming tourism sector create consistent organic search demand.',
  },
  {
    q: 'Do you do local SEO for Whangarei suburbs and Northland towns?',
    a: 'Yes — local SEO for Whangarei CBD, Kamo, Tikipunga, Raumanga, Onerahi, Maunu, Kerikeri, Paihia, and surrounding Northland towns is core to our work. Local SEO includes Google Business Profile optimisation, NZ and Northland-specific citations, local schema, and suburb-level content that signals genuine Whangarei relevance to Google.',
  },
  {
    q: 'How long does SEO take to show results for a Whangarei business?',
    a: 'Most Whangarei businesses start seeing measurable ranking improvements within 60–90 days. Traffic and lead volume typically follows in months 3–6 as rankings consolidate and content gains authority. Whangarei\'s competitive landscape is less intense than Auckland, meaning faster results are achievable in many niches.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      name: 'Junction Media',
      url: 'https://www.junctionmedia.ai',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Auckland',
        addressRegion: 'Auckland',
        addressCountry: 'NZ',
      },
      areaServed: [
        { '@type': 'City', name: 'Whangarei' },
        { '@type': 'City', name: 'Auckland' },
      ],
      priceRange: '$$$',
    },
    {
      '@type': 'Service',
      name: 'SEO Agency Whangarei',
      provider: {
        '@type': 'Organization',
        name: 'Junction Media',
        url: 'https://www.junctionmedia.ai',
      },
      serviceType: 'Search Engine Optimisation',
      areaServed: {
        '@type': 'City',
        name: 'Whangarei',
      },
      description: 'AI-native SEO services for Whangarei and Northland businesses. Technical SEO, content strategy, and authority building.',
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
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    },
  ],
}

export default function WhangareiSEOAgencyPage() {
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
        <Link
          href="/apply"
          className="text-sm bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors"
        >
          Apply to Work With Us
        </Link>
      </nav>

      <section className="max-w-3xl mx-auto px-6 pt-20 pb-16">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
          Whangarei · SEO
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          SEO Agency Whangarei
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          AI-native SEO for Whangarei and Northland businesses. Technical foundations, strategic content,
          and authority building that turns organic search into a compounding channel — for Whangarei
          trades, tourism, professional services, healthcare, and beyond.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/apply"
            className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors text-center"
          >
            Apply to Work With Us
          </Link>
          <Link
            href="/services/seo-nz"
            className="inline-block border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:border-gray-500 transition-colors text-center"
          >
            View SEO Services
          </Link>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-12 border-t border-gray-100">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { stat: '$1.2k–$2.5k', label: 'Per month NZD' },
            { stat: '3-month', label: 'Minimum engagement' },
            { stat: '+30%', label: 'DBH sales record (month 1)' },
            { stat: 'Remote-first', label: 'Whangarei-ready delivery' },
          ].map((item) => (
            <div key={item.label} className="p-4 border border-gray-100 rounded-2xl text-center">
              <p className="text-2xl font-bold text-gray-900 mb-1">{item.stat}</p>
              <p className="text-xs text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">SEO in Whangarei: The Northland Opportunity</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            Whangarei is Northland&apos;s largest city and the commercial hub of Te Tai Tokerau.
            With a population exceeding 55,000 and a catchment that includes Kerikeri, Paihia,
            the Bay of Islands, and surrounding Northland towns, the Whangarei search market
            punches well above its size — driven by tourism, agriculture, and steady population growth.
          </p>
          <p className="text-gray-600 leading-relaxed">
            The opportunity for Whangarei businesses: SEO competition in most niches is considerably
            lower than Auckland. A Whangarei trades business, healthcare provider, or tourism operator
            that invests seriously in SEO can often achieve page-one rankings within months — results
            that would take a year or more in Auckland&apos;s more competitive market.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We work remotely with Whangarei and Northland clients — video strategy sessions, weekly
            updates, and transparent reporting. The quality of the work is identical to what we do
            for Auckland clients; only the market context changes.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">What Whangarei SEO Work Includes</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Technical SEO Audit & Fixes',
              desc: 'Crawl errors, Core Web Vitals, schema markup, internal linking — found and fixed, not just reported. Technical issues suppressing your Whangarei rankings are resolved before we build content on top of them.',
            },
            {
              title: 'Local Whangarei SEO',
              desc: 'Google Business Profile optimisation, Whangarei and Northland-specific citations, local schema, and suburb-level content for CBD, Kamo, Tikipunga, Raumanga, Onerahi, and surrounds.',
            },
            {
              title: 'Content Strategy & Production',
              desc: 'Topical authority mapping built around Whangarei and Northland search intent. AI-assisted content production — more pieces, better quality, published consistently. Content that earns rankings in the Northland market.',
            },
            {
              title: 'Authority Building',
              desc: 'NZ-relevant link acquisition from Northland media, industry associations, and business networks. White-hat, sustainable — no link schemes.',
            },
            {
              title: 'On-Page Optimisation',
              desc: 'Every priority Whangarei page optimised: title tags, meta descriptions, headers, internal links, and content structure — aligned to current Google ranking signals.',
            },
            {
              title: 'Monthly Reporting',
              desc: 'Plain-English reporting every month: rankings, traffic, leads from organic, content published, links built, and next month\'s plan. No agency jargon — just numbers that connect to your Whangarei business revenue.',
            },
          ].map((item) => (
            <div key={item.title} className="p-6 border border-gray-100 rounded-2xl">
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">A Result Worth Mentioning</h2>
        <div className="bg-gray-50 rounded-2xl p-8">
          <p className="text-3xl font-bold text-gray-900 mb-2">+30%</p>
          <p className="text-gray-500 text-sm mb-4">Above previous all-time store record — month 1</p>
          <p className="text-gray-600 leading-relaxed">
            Deep Blue Health — a New Zealand supplement brand — hit their best revenue month ever
            in November 2025. We built AI-native marketing systems across Google Ads, Meta Ads,
            SEO, content, and customer support. 30% above their previous all-time record in
            month one of the engagement.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Whangarei & Northland Areas We Cover</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            'Whangarei CBD', 'Kamo', 'Tikipunga',
            'Raumanga', 'Onerahi', 'Maunu',
            'Kerikeri', 'Paihia', 'Bay of Islands',
          ].map((area) => (
            <div key={area} className="p-3 border border-gray-100 rounded-xl text-sm text-gray-700 text-center">
              {area}
            </div>
          ))}
        </div>
      </section>

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

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Further Reading</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { title: 'SEO Agency Whangarei — Blog', href: '/blog/seo-agency-whangarei' },
            { title: 'SEO Services NZ — Full Overview', href: '/services/seo-nz' },
            { title: 'Whangarei Marketing Hub', href: '/whangarei' },
            { title: 'SEO Agency Auckland', href: '/auckland/seo-agency' },
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

      <section className="max-w-3xl mx-auto px-6 py-20 border-t border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to own Whangarei search results?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            If you&apos;re a Whangarei or Northland business serious about turning organic search into
            a real acquisition channel — apply below. We review every application.
          </p>
          <Link
            href="/apply"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg"
          >
            Apply to Work With Us
          </Link>
          <p className="text-gray-400 text-sm mt-4">Whangarei & Northland businesses. 3–5 client spots.</p>
        </div>
      </section>

      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2026 Junction Media. Auckland, New Zealand.</p>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Home</Link>
            <Link href="/whangarei" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Whangarei</Link>
            <Link href="/services/seo-nz" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">SEO NZ</Link>
            <Link href="/apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
