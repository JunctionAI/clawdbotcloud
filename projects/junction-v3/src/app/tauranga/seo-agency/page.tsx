import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'SEO Agency Tauranga | Tauranga SEO Company | Junction Media',
  description: 'SEO agency serving Tauranga businesses. AI-powered technical SEO, content strategy, and authority building for Tauranga CBD, Mount Maunganui, Papamoa and across the Bay of Plenty. $1,200–$2,500/mo.',
  keywords: 'SEO agency Tauranga, Tauranga SEO, SEO company Tauranga, SEO services Tauranga, Tauranga SEO consultant, local SEO Tauranga, SEO Tauranga NZ, Bay of Plenty SEO, Mount Maunganui SEO, search engine optimisation Tauranga',
  openGraph: {
    title: 'SEO Agency Tauranga | Junction Media',
    description: 'AI-native SEO for Tauranga and Bay of Plenty businesses. Technical SEO, content strategy, and authority building that compounds into lasting organic growth.',
    url: 'https://www.junctionmedia.ai/tauranga/seo-agency',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/tauranga/seo-agency',
  },
}

const faqs = [
  {
    q: 'How much does SEO cost for a Tauranga business?',
    a: 'Tauranga SEO pricing at Junction Media ranges from $1,200–$2,500/month NZD depending on scope. $1,200/month covers technical SEO maintenance and 2–3 content pieces per month. $2,500/month adds aggressive authority building and 6–8 content pieces per month targeting Tauranga and Bay of Plenty keywords. All engagements are 3-month minimum — Bay of Plenty search markets compound over time, not overnight.',
  },
  {
    q: 'Is Tauranga a good market for SEO investment?',
    a: 'Tauranga is one of New Zealand\'s fastest-growing cities and has one of the country\'s most affluent demographics — retirees, lifestyle migrants from Auckland, thriving tourism, and a booming construction sector. Local searches for trades, property, health, hospitality, and retail are growing with the population. The SEO opportunity: the market is growing faster than SEO competition is keeping up, which means early movers win disproportionately.',
  },
  {
    q: 'Do you cover Mount Maunganui and Papamoa as well as Tauranga CBD?',
    a: 'Yes — our Tauranga SEO work covers the full Bay of Plenty sub-region: Tauranga CBD, Mount Maunganui (the Mount), Papamoa, Bethlehem, Greerton, Te Puke, and beyond. Local SEO includes Google Business Profile optimisation, Bay of Plenty-specific citations, local schema, and suburb-level content targeting relevant areas. The Mount and Papamoa in particular have distinct search audiences worth targeting separately.',
  },
  {
    q: 'What Tauranga industries benefit most from SEO?',
    a: 'Tauranga trades (builders, electricians, plumbers, landscapers), property and real estate, tourism and hospitality operators, health and wellness businesses, professional services, retail, and marine/boating businesses all see strong SEO ROI in the Bay of Plenty market. The Tauranga Port-adjacent logistics and export sector is also a distinct B2B SEO opportunity.',
  },
  {
    q: 'Can you help a Tauranga business that tried SEO before and saw no results?',
    a: 'Yes — poor SEO results are almost always traceable to one of three causes: technical issues blocking Google from properly crawling the site, content that doesn\'t match real search intent, or authority building that was absent or low-quality. We audit these specifically, fix what\'s broken, and build a strategy based on what Tauranga customers are actually searching for — not generic keyword lists.',
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
        { '@type': 'City', name: 'Tauranga' },
        { '@type': 'City', name: 'Auckland' },
      ],
      priceRange: '$$$',
    },
    {
      '@type': 'Service',
      name: 'SEO Agency Tauranga',
      provider: {
        '@type': 'Organization',
        name: 'Junction Media',
        url: 'https://www.junctionmedia.ai',
      },
      serviceType: 'Search Engine Optimisation',
      areaServed: {
        '@type': 'City',
        name: 'Tauranga',
      },
      description: 'AI-native SEO services for Tauranga and Bay of Plenty businesses. Technical SEO, content strategy, and authority building for lasting organic growth.',
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

export default function TaurangaSEOAgencyPage() {
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
          Tauranga · SEO
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          SEO Agency Tauranga
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          AI-native SEO for Tauranga and Bay of Plenty businesses. Technical foundations, strategic
          content, and authority building that turns organic search into a compounding channel —
          for Tauranga trades, hospitality, health, retail, property, and professional services.
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
            { stat: 'Remote-first', label: 'Bay of Plenty-ready delivery' },
          ].map((item) => (
            <div key={item.label} className="p-4 border border-gray-100 rounded-2xl text-center">
              <p className="text-2xl font-bold text-gray-900 mb-1">{item.stat}</p>
              <p className="text-xs text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tauranga SEO Context */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">SEO in Tauranga: Bay of Plenty&apos;s Untapped Opportunity</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            Tauranga is one of New Zealand&apos;s fastest-growing cities. With a population exceeding
            160,000 across Tauranga, Mount Maunganui, and Papamoa — and strong net migration from
            Auckland and beyond — the Bay of Plenty search market is expanding rapidly. The region&apos;s
            economy is powered by tourism, horticulture, construction, port logistics, and an increasingly
            affluent residential base.
          </p>
          <p className="text-gray-600 leading-relaxed">
            The SEO opportunity in Tauranga is distinctive: the market is growing faster than
            SEO competition is maturing. Many Tauranga businesses rely on word-of-mouth and social
            media — they haven&apos;t yet invested in owning organic search. That creates a window for
            businesses that move now to establish rankings that will be difficult to displace as
            competition eventually increases.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We work remotely with Tauranga clients — video strategy sessions, weekly progress
            updates, and full reporting transparency. Local knowledge of the Tauranga market is
            built into our keyword research and content strategy from day one.
          </p>
        </div>
      </section>

      {/* What We Do */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">What Tauranga SEO Work Includes</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Technical SEO Audit & Fixes',
              desc: 'Crawl errors, Core Web Vitals, schema markup, internal linking — found and fixed, not just reported. Technical issues suppressing your Tauranga rankings are resolved before we build content on top of them.',
            },
            {
              title: 'Local Tauranga SEO',
              desc: 'Google Business Profile optimisation, Bay of Plenty-specific citations, local schema, and suburb-level content for Tauranga CBD, the Mount, Papamoa, Bethlehem, Greerton, and Te Puke. Signals that tell Google you\'re genuinely local.',
            },
            {
              title: 'Content Strategy & Production',
              desc: 'Topical authority mapping built around Tauranga and Bay of Plenty search intent. AI-assisted content production — more pieces, better quality, published consistently. Content that earns rankings in your specific market.',
            },
            {
              title: 'Authority Building',
              desc: 'NZ-relevant link acquisition from Bay of Plenty media, industry associations, and local business networks. White-hat, sustainable — no link schemes. Links that build lasting authority in the Tauranga search landscape.',
            },
            {
              title: 'On-Page Optimisation',
              desc: 'Every priority Tauranga page optimised: title tags, meta descriptions, headers, internal links, and content structure — all aligned to current Google ranking signals and Bay of Plenty search behaviour.',
            },
            {
              title: 'Monthly Reporting',
              desc: 'Plain-English reporting every month: rankings, traffic, organic leads, content published, links built, and next month\'s plan. No vanity metrics — just numbers that connect to your Tauranga business goals.',
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
            SEO, content, and customer support. 30% above their previous all-time record in
            month one of the engagement.
          </p>
        </div>
      </section>

      {/* Tauranga Areas */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Tauranga & Bay of Plenty Areas We Cover</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            'Tauranga CBD', 'Mount Maunganui', 'Papamoa',
            'Bethlehem', 'Greerton', 'Te Puke',
            'Waihi Beach', 'Katikati', 'Ōmokoroa',
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
            { title: 'SEO Agency Tauranga — Blog', href: '/blog/seo-agency-tauranga' },
            { title: 'SEO Services NZ — Full Overview', href: '/services/seo-nz' },
            { title: 'Tauranga Marketing Hub', href: '/tauranga' },
            { title: 'SEO Agency Hamilton', href: '/hamilton/seo-agency' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to own Tauranga search results?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            If you&apos;re a Tauranga or Bay of Plenty business serious about turning organic search
            into a real acquisition channel — apply below. We review every application.
          </p>
          <Link
            href="/apply"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg"
          >
            Apply to Work With Us
          </Link>
          <p className="text-gray-400 text-sm mt-4">Tauranga & Bay of Plenty businesses. 3–5 client spots.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2026 Junction Media. Auckland, New Zealand.</p>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Home</Link>
            <Link href="/tauranga" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Tauranga</Link>
            <Link href="/services/seo-nz" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">SEO NZ</Link>
            <Link href="/apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
