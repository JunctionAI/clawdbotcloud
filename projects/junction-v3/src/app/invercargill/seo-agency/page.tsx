import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'SEO Agency Invercargill | Southland SEO Company | Junction Media',
  description: 'SEO agency serving Invercargill businesses. AI-powered technical SEO, content strategy, and authority building for Southland farming, manufacturing, trades, and retail. $1,200–$2,500/mo.',
  keywords: 'SEO agency Invercargill, Invercargill SEO, SEO company Invercargill, Southland SEO, SEO services Invercargill, local SEO Invercargill, SEO Invercargill NZ, search engine optimisation Invercargill',
  openGraph: {
    title: 'SEO Agency Invercargill | Junction Media',
    description: 'AI-native SEO for Invercargill and Southland businesses. Technical SEO, content strategy, and authority building for lasting organic growth.',
    url: 'https://www.junctionmedia.ai/invercargill/seo-agency',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/invercargill/seo-agency',
  },
}

const faqs = [
  {
    q: 'How much does SEO cost for an Invercargill business?',
    a: 'Invercargill SEO pricing at Junction Media ranges from $1,200–$2,500/month NZD. $1,200/month covers technical SEO maintenance and 2–3 content pieces per month. $2,500/month adds aggressive authority building and 6–8 content pieces targeting Southland and national keywords. All engagements are 3-month minimum.',
  },
  {
    q: 'Is Invercargill a good market for SEO investment?',
    a: 'Yes — Invercargill is the commercial hub of Southland, New Zealand\'s most southerly city. The region\'s strong agricultural, manufacturing, and engineering economy creates sustained B2B and trade search demand. Competition on Google in Invercargill is very low, meaning well-built SEO compounds quickly into category-defining positions.',
  },
  {
    q: 'What Invercargill industries benefit most from SEO?',
    a: 'Farming and agricultural supply businesses, manufacturing and engineering, trades (builders, electricians, plumbers), professional services, healthcare, retail, and businesses serving the Bluff oyster and seafood industry all see strong SEO ROI in the Invercargill and Southland market.',
  },
  {
    q: 'Do you cover Bluff, Gore, and the wider Southland region?',
    a: 'Yes — our Invercargill SEO work covers the full Southland region: Invercargill CBD, Bluff, Gore, Winton, Riverton, and surrounding communities. Local SEO includes Google Business Profile optimisation, Southland-specific citations, local schema, and area-level content.',
  },
  {
    q: 'Can you help an Invercargill business that tried SEO before with no results?',
    a: 'Yes. Poor SEO results trace to technical issues, content misaligned with search intent, or absent authority building. We audit all three, fix what is broken, and build a strategy based on what Southland customers are actually searching for.',
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
        { '@type': 'City', name: 'Invercargill' },
        { '@type': 'City', name: 'Auckland' },
      ],
      priceRange: '$$$',
    },
    {
      '@type': 'Service',
      name: 'SEO Agency Invercargill',
      provider: {
        '@type': 'Organization',
        name: 'Junction Media',
        url: 'https://www.junctionmedia.ai',
      },
      serviceType: 'Search Engine Optimisation',
      areaServed: { '@type': 'City', name: 'Invercargill' },
      description: 'AI-native SEO services for Invercargill and Southland businesses. Technical SEO, content strategy, and authority building for lasting organic growth.',
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
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    },
  ],
}

export default function InvercargillSEOAgencyPage() {
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
        <Link href="/apply" className="text-sm bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors">
          Apply to Work With Us
        </Link>
      </nav>

      <section className="max-w-3xl mx-auto px-6 pt-20 pb-16">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Invercargill · SEO</p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          SEO Agency Invercargill
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          AI-native SEO for Invercargill and Southland businesses. Technical foundations, strategic
          content, and authority building that turns organic search into a compounding acquisition
          channel — for farming, manufacturing, trades, professional services, and retail.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/apply" className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors text-center">
            Apply to Work With Us
          </Link>
          <Link href="/services/seo-nz" className="inline-block border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:border-gray-500 transition-colors text-center">
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
            { stat: '3–5', label: 'Clients at a time (max)' },
          ].map((item) => (
            <div key={item.label} className="p-4 border border-gray-100 rounded-2xl text-center">
              <p className="text-2xl font-bold text-gray-900 mb-1">{item.stat}</p>
              <p className="text-xs text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">SEO in Invercargill: Southland&apos;s Untapped Digital Frontier</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            Invercargill is New Zealand&apos;s southernmost city and the beating heart of Southland —
            a region built on some of the country&apos;s most productive farming, manufacturing, and
            engineering businesses. It is also one of the most underserved markets when it comes
            to high-quality digital marketing and SEO.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Most Invercargill businesses built their customer base on reputation, word of mouth,
            and long-standing relationships. Many have not invested meaningfully in digital.
            The result is an extraordinary first-mover opportunity: in most service categories,
            ranking on page one of Google in Invercargill requires far less effort than Auckland
            or Wellington — and rankings, once established, compound for years.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Southland&apos;s resilient economy and affordable operating costs mean businesses here have
            genuine long-term staying power. SEO is the natural complement: build organic traffic
            now, and it keeps delivering well into the future.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">What Our Invercargill SEO Work Includes</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Technical SEO Audit & Fixes',
              desc: 'Crawl errors, Core Web Vitals, schema markup, internal linking — found and fixed. Technical issues suppressing your Invercargill rankings resolved before we build content on top.',
            },
            {
              title: 'Local Invercargill SEO',
              desc: 'Google Business Profile optimisation, Southland-specific citations, local schema, and content for Invercargill CBD, Bluff, Gore, Winton, and the wider Southland region.',
            },
            {
              title: 'Content Strategy & Production',
              desc: 'Topical authority mapping specific to Invercargill and Southland search intent. AI-assisted content production — more pieces, better quality, published consistently.',
            },
            {
              title: 'Authority Building',
              desc: 'Link acquisition from NZ-relevant media, agricultural and manufacturing industry sites, and Southland business directories. White-hat and sustainable.',
            },
            {
              title: 'On-Page Optimisation',
              desc: 'Every priority page optimised: title tags, meta descriptions, headers, internal links, and content structure — aligned to current Google ranking signals.',
            },
            {
              title: 'Monthly Reporting',
              desc: 'Plain-English monthly reports: rankings, traffic, organic leads, content published, links built, and next month\'s plan. Numbers that connect to your business goals.',
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
            in November 2025. We built AI-native marketing systems across Google Ads, Meta Ads, SEO,
            content, and customer support. 30% above their previous all-time record in month one.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Southland Areas We Cover</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            'Invercargill CBD', 'Bluff', 'Gore',
            'Winton', 'Riverton', 'Queenstown',
            'Te Anau', 'Lumsden', 'Edendale',
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
            { title: 'SEO Agency Invercargill — Blog', href: '/blog/seo-agency-invercargill' },
            { title: 'SEO Services NZ — Full Overview', href: '/services/seo-nz' },
            { title: 'Invercargill Marketing Hub', href: '/invercargill' },
            { title: 'Google Ads Agency Invercargill', href: '/invercargill/google-ads-agency' },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="p-4 border border-gray-100 rounded-xl hover:border-gray-300 transition-colors text-sm font-medium text-gray-700 hover:text-gray-900">
              {link.title} →
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-20 border-t border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to own Invercargill search results?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            If you are an Invercargill or Southland business serious about turning organic search
            into a real acquisition channel — apply below. We review every application.
          </p>
          <Link href="/apply" className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg">
            Apply to Work With Us
          </Link>
          <p className="text-gray-400 text-sm mt-4">Southland businesses. 3–5 client spots.</p>
        </div>
      </section>

      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2026 Junction Media. Auckland, New Zealand.</p>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Home</Link>
            <Link href="/invercargill" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Invercargill</Link>
            <Link href="/services/seo-nz" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">SEO NZ</Link>
            <Link href="/apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
