import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'SEO Agency Napier | Napier SEO Company | Junction Media',
  description: 'SEO agency serving Napier and Hawke\'s Bay businesses. AI-powered technical SEO, content strategy, and authority building for Napier CBD, Taradale, Ahuriri and across Hawke\'s Bay. $1,200–$2,500/mo.',
  keywords: "SEO agency Napier, Napier SEO, SEO company Napier, SEO services Napier, Napier SEO consultant, local SEO Napier, SEO Napier NZ, Hawke's Bay SEO, search engine optimisation Napier",
  openGraph: {
    title: "SEO Agency Napier | Junction Media",
    description: "AI-native SEO for Napier and Hawke's Bay businesses. Technical SEO, content strategy, and authority building that turns organic search into a compounding revenue channel.",
    url: 'https://www.junctionmedia.ai/napier/seo-agency',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/napier/seo-agency',
  },
}

const faqs = [
  {
    q: "How much does SEO cost for a Napier business?",
    a: "Napier SEO pricing at Junction Media ranges from $1,200–$2,500/month NZD depending on scope. $1,200/month covers technical SEO maintenance and 2–3 content pieces per month. $2,500/month adds aggressive authority building and 6–8 content pieces per month. All engagements are 3-month minimum — Hawke's Bay search markets take time to build, and meaningful results compound over time.",
  },
  {
    q: "Is SEO worth investing in for a Napier or Hawke's Bay business?",
    a: "Yes — Napier is one of New Zealand's most distinctive cities, with a thriving wine, food, and tourism economy alongside growing professional and commercial sectors. The Art Deco heritage and Hawke's Bay wine region attract national and international visitors year-round, creating consistent search demand that well-optimised businesses can capture.",
  },
  {
    q: "What Napier industries benefit most from SEO?",
    a: "Napier trades, tourism and hospitality businesses, wineries and food producers, healthcare providers, professional services, and retail businesses all see strong SEO ROI. The Hawke's Bay wine and food tourism sector creates distinctive content marketing opportunities. Hastings and wider Hawke's Bay businesses also benefit significantly from Napier-anchored SEO strategies.",
  },
  {
    q: "Do you do local SEO for Napier suburbs and Hawke's Bay towns?",
    a: "Yes — local SEO for Napier CBD, Taradale, Ahuriri, Marewa, Bay View, Hastings, Havelock North, and surrounding Hawke's Bay towns is core to our work. Local SEO includes Google Business Profile optimisation, NZ and Hawke's Bay-specific citations, local schema, and area-level content.",
  },
  {
    q: "How long does SEO take to show results for a Napier business?",
    a: "Most Napier businesses start seeing measurable ranking improvements within 60–90 days. Traffic and lead volume typically follows in months 3–6. Hawke's Bay's competitive landscape is meaningfully less intense than Wellington or Auckland, meaning faster results are achievable for most business categories.",
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
        { '@type': 'City', name: 'Napier' },
        { '@type': 'City', name: 'Auckland' },
      ],
      priceRange: '$$$',
    },
    {
      '@type': 'Service',
      name: 'SEO Agency Napier',
      provider: {
        '@type': 'Organization',
        name: 'Junction Media',
        url: 'https://www.junctionmedia.ai',
      },
      serviceType: 'Search Engine Optimisation',
      areaServed: {
        '@type': 'City',
        name: 'Napier',
      },
      description: "AI-native SEO services for Napier and Hawke's Bay businesses. Technical SEO, content strategy, and authority building.",
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

export default function NapierSEOAgencyPage() {
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
          Napier · SEO
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          SEO Agency Napier
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          AI-native SEO for Napier and Hawke&apos;s Bay businesses. Technical foundations, strategic
          content, and authority building that turns organic search into a compounding channel —
          for Napier tourism, trades, wine and food businesses, professional services, and beyond.
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
            { stat: 'Remote-first', label: 'Napier-ready delivery' },
          ].map((item) => (
            <div key={item.label} className="p-4 border border-gray-100 rounded-2xl text-center">
              <p className="text-2xl font-bold text-gray-900 mb-1">{item.stat}</p>
              <p className="text-xs text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">SEO in Napier: The Hawke&apos;s Bay Opportunity</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            Napier is one of New Zealand&apos;s most distinctive cities — famous for its Art Deco
            architecture, Hawke&apos;s Bay wine country, and year-round sunshine. With a population
            of around 65,000 and a commercial catchment that includes Hastings, Havelock North,
            and the wider Hawke&apos;s Bay region, Napier businesses serve a significant and growing
            market — with far less SEO competition than the major metro centres.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Hawke&apos;s Bay&apos;s wine and food tourism economy creates distinctive SEO opportunities
            that few local businesses are fully exploiting. National and international visitors actively
            search for accommodation, dining, wineries, activities, and services before and during their
            trips. Businesses that rank for those searches capture demand that arrives with high intent
            and strong spending power.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We work remotely with Napier and Hawke&apos;s Bay clients — video strategy sessions,
            weekly updates, and transparent reporting. Our SEO quality matches what we deliver for
            Wellington and Auckland clients; the Hawke&apos;s Bay market simply has more headroom.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">What Napier SEO Work Includes</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Technical SEO Audit & Fixes',
              desc: "Crawl errors, Core Web Vitals, schema markup, internal linking — found and fixed, not just reported. Technical issues suppressing your Napier rankings are resolved before we build content on top of them.",
            },
            {
              title: "Local Napier SEO",
              desc: "Google Business Profile optimisation, Napier and Hawke's Bay-specific citations, local schema, and suburb-level content for CBD, Taradale, Ahuriri, Marewa, Bay View, and surrounds.",
            },
            {
              title: 'Content Strategy & Production',
              desc: "Topical authority mapping built around Napier and Hawke's Bay search intent. AI-assisted content production — more pieces, better quality, published consistently. Content that earns rankings in the Hawke's Bay market.",
            },
            {
              title: 'Authority Building',
              desc: "NZ-relevant link acquisition from Hawke's Bay media, wine and tourism industry publications, business networks, and regional associations. White-hat, sustainable — no link schemes.",
            },
            {
              title: 'On-Page Optimisation',
              desc: 'Every priority Napier page optimised: title tags, meta descriptions, headers, internal links, and content structure — aligned to current Google ranking signals.',
            },
            {
              title: 'Monthly Reporting',
              desc: "Plain-English reporting every month: rankings, traffic, leads from organic, content published, links built, and next month's plan. No agency jargon — just numbers that connect to your Napier business revenue.",
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
        <h2 className="text-2xl font-bold mb-6">Napier &amp; Hawke&apos;s Bay Areas We Cover</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            'Napier CBD', 'Taradale', 'Ahuriri',
            'Marewa', 'Bay View', 'Onekawa',
            'Hastings', 'Havelock North', 'Clive',
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
            { title: 'SEO Agency Napier — Blog', href: '/blog/seo-agency-napier' },
            { title: 'SEO Services NZ — Full Overview', href: '/services/seo-nz' },
            { title: 'Napier Marketing Hub', href: '/napier' },
            { title: 'SEO Agency Wellington', href: '/wellington/seo-agency' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to own Napier search results?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            If you&apos;re a Napier or Hawke&apos;s Bay business serious about turning organic search
            into a real acquisition channel — apply below. We review every application.
          </p>
          <Link
            href="/apply"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg"
          >
            Apply to Work With Us
          </Link>
          <p className="text-gray-400 text-sm mt-4">Napier &amp; Hawke&apos;s Bay businesses. 3–5 client spots.</p>
        </div>
      </section>

      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2026 Junction Media. Auckland, New Zealand.</p>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Home</Link>
            <Link href="/napier" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Napier</Link>
            <Link href="/services/seo-nz" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">SEO NZ</Link>
            <Link href="/apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
