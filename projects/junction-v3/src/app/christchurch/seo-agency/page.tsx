import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'SEO Agency Christchurch | Christchurch SEO Company | Junction Media',
  description: 'SEO agency serving Christchurch businesses. AI-powered technical SEO, content strategy, and authority building for Christchurch CBD, Addington, Riccarton, and beyond. $1,200–$2,500/mo.',
  keywords: 'SEO agency Christchurch, Christchurch SEO, SEO company Christchurch, SEO services Christchurch, Christchurch SEO consultant, local SEO Christchurch, SEO Christchurch NZ, search engine optimisation Christchurch',
  openGraph: {
    title: 'SEO Agency Christchurch | Junction Media',
    description: 'AI-native SEO for Christchurch businesses. Technical SEO, content strategy, and authority building that turns search into a compounding channel.',
    url: 'https://www.junctionmedia.ai/christchurch/seo-agency',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/christchurch/seo-agency',
  },
}

const faqs = [
  {
    q: 'How much does an SEO agency cost for Christchurch businesses?',
    a: 'Junction Media SEO for Christchurch businesses ranges from $1,200–$2,500/month NZD. $1,200/month covers technical SEO management and 2–3 content pieces per month. $2,500/month includes aggressive authority building and 6–8 content pieces. All engagements are 3-month minimum — meaningful SEO results in Christchurch markets take 90 days minimum to demonstrate.',
  },
  {
    q: 'Is Christchurch a competitive SEO market?',
    a: 'Christchurch is New Zealand\'s third-largest city and growing fast. Construction, manufacturing, professional services, tourism, food and hospitality, and tech are all competitive online. The opportunity: Christchurch has a strong local economy and population that actively searches for local providers — but many Christchurch businesses haven\'t invested seriously in SEO, leaving ranking opportunities on the table.',
  },
  {
    q: 'Do you do local SEO for specific Christchurch suburbs?',
    a: 'Yes — local SEO for Christchurch CBD, Addington, Riccarton, Sydenham, Merivale, Burnside, Hornby, and surrounding areas is core to our work. We optimise Google Business Profile, build NZ-specific citations, implement local schema, and create suburb-level content that signals genuine Christchurch relevance to Google.',
  },
  {
    q: 'How has Christchurch\'s rebuild affected SEO opportunities?',
    a: 'Christchurch\'s post-earthquake rebuild has created a dynamic business environment. Construction, architecture, engineering, and property are all high-growth categories with strong search demand. Many newer Christchurch businesses don\'t yet have established online presence — making this an ideal time to build SEO foundations that compound as the city grows.',
  },
  {
    q: 'Can you help a Christchurch business rank for national NZ searches, not just local?',
    a: 'Absolutely — many Christchurch businesses want to rank nationally (across NZ) for their category, not just locally. We build content and authority strategies that work for both local Christchurch searches and national NZ queries. A Christchurch manufacturer or software company can absolutely rank nationally with the right topical authority approach.',
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
        { '@type': 'City', name: 'Christchurch' },
        { '@type': 'City', name: 'Auckland' },
      ],
      priceRange: '$$$',
    },
    {
      '@type': 'Service',
      name: 'SEO Agency Christchurch',
      provider: {
        '@type': 'Organization',
        name: 'Junction Media',
        url: 'https://www.junctionmedia.ai',
      },
      serviceType: 'Search Engine Optimisation',
      areaServed: {
        '@type': 'City',
        name: 'Christchurch',
      },
      description: 'AI-native SEO for Christchurch businesses. Technical SEO, content strategy, and authority building.',
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

export default function ChristchurchSEOAgencyPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Structured Data */}
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
          Christchurch · SEO
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          SEO Agency Christchurch
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          AI-native SEO for Christchurch businesses. Technical foundations, strategic content,
          and authority building for a city in genuine growth mode — construction, manufacturing,
          professional services, hospitality, and beyond.
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

      {/* Key Numbers */}
      <section className="max-w-3xl mx-auto px-6 py-12 border-t border-gray-100">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { stat: '$1.2k–$2.5k', label: 'Per month NZD' },
            { stat: '3-month', label: 'Minimum engagement' },
            { stat: '+30%', label: 'DBH sales record (month 1)' },
            { stat: 'Local + national', label: 'Search coverage' },
          ].map((item) => (
            <div key={item.label} className="p-4 border border-gray-100 rounded-2xl text-center">
              <p className="text-2xl font-bold text-gray-900 mb-1">{item.stat}</p>
              <p className="text-xs text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Christchurch SEO Context */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Why Christchurch Is a Real SEO Opportunity</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            Christchurch is in a genuinely exciting phase. Post-rebuild momentum has brought
            new businesses, new infrastructure, and a growing population base. Construction,
            manufacturing, tech, food, and hospitality are all expanding — and so is the
            online search demand that comes with them.
          </p>
          <p className="text-gray-600 leading-relaxed">
            The SEO opportunity in Christchurch is distinct from Auckland: the market is less
            saturated. Many Christchurch businesses that should be ranking for their category
            aren&apos;t — because they haven&apos;t yet invested in technical SEO, content, or authority
            building. That creates real room for businesses that move now.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We work with Christchurch clients remotely — all strategy sessions via video, weekly
            updates asynchronously, and full transparency into every deliverable. Distance
            doesn&apos;t affect the quality of the work.
          </p>
        </div>
      </section>

      {/* What We Do */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">What Christchurch SEO Work Includes</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Technical SEO Audit & Fixes',
              desc: 'Complete technical audit of your Christchurch site — Core Web Vitals, crawl efficiency, schema markup, internal linking, mobile performance. Issues implemented, not just reported.',
            },
            {
              title: 'Local Christchurch SEO',
              desc: 'Google Business Profile optimisation, Christchurch-specific citations (NZ directories, industry associations), local schema, and suburb-level content. Built for real local ranking, not just vanity listings.',
            },
            {
              title: 'Content Strategy & Production',
              desc: 'Topical authority mapping built around your Christchurch category. AI-assisted content production that builds ranking assets consistently. Content that earns positions because it\'s genuinely useful.',
            },
            {
              title: 'Authority Building',
              desc: 'NZ-relevant link acquisition from Canterbury media, South Island industry publications, and business networks. White-hat and sustainable — no link farms or schemes.',
            },
            {
              title: 'On-Page Optimisation',
              desc: 'Every priority Christchurch page optimised: title tags, meta descriptions, headers, image alt text, internal links, and content structure — all aligned to current Google ranking signals.',
            },
            {
              title: 'Monthly Reporting',
              desc: 'Plain-English monthly reports: rankings, organic traffic, leads, content published, links built. Reporting that connects to your Christchurch business outcomes.',
            },
          ].map((item) => (
            <div key={item.title} className="p-6 border border-gray-100 rounded-2xl">
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DBH Result */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">A Result Worth Mentioning</h2>
        <div className="bg-gray-50 rounded-2xl p-8">
          <p className="text-3xl font-bold text-gray-900 mb-2">+30%</p>
          <p className="text-gray-500 text-sm mb-4">Above previous all-time store record — month 1</p>
          <p className="text-gray-600 leading-relaxed">
            Deep Blue Health — a New Zealand supplement brand — hit their best revenue month ever
            in November 2025. We built AI-native marketing systems across Google Ads, Meta Ads,
            SEO, content, and customer support. Result: 30% above their previous all-time store
            record, in month one of the engagement.
          </p>
        </div>
      </section>

      {/* Christchurch Areas */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Christchurch Areas We Cover</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            'Christchurch CBD', 'Addington', 'Riccarton',
            'Sydenham', 'Merivale', 'Burnside',
            'Hornby', 'Papanui', 'Rolleston / Selwyn',
          ].map((area) => (
            <div key={area} className="p-3 border border-gray-100 rounded-xl text-sm text-gray-700 text-center">
              {area}
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

      {/* Related Links */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Further Reading</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { title: 'SEO Agency Christchurch — Blog', href: '/blog/seo-agency-christchurch' },
            { title: 'SEO Services NZ — Full Overview', href: '/services/seo-nz' },
            { title: 'Christchurch Marketing Hub', href: '/christchurch' },
            { title: 'SEO Agency Auckland (compare)', href: '/auckland/seo-agency' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to own Christchurch search results?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            If you&apos;re a Christchurch business serious about building organic search as a
            compounding acquisition channel — apply below.
          </p>
          <Link
            href="/apply"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg"
          >
            Apply to Work With Us
          </Link>
          <p className="text-gray-400 text-sm mt-4">Christchurch & NZ businesses. 3–5 client spots.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2026 Junction Media. Auckland, New Zealand.</p>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Home</Link>
            <Link href="/christchurch" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Christchurch</Link>
            <Link href="/services/seo-nz" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">SEO NZ</Link>
            <Link href="/apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
