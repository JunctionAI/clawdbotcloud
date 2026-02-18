import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'SEO Agency Rotorua | Rotorua SEO Company | Junction Media',
  description: 'SEO agency serving Rotorua and Bay of Plenty businesses. AI-powered technical SEO, content strategy, and authority building for Rotorua CBD, tourism, trades, and hospitality. $1,200–$2,500/mo.',
  keywords: "SEO agency Rotorua, Rotorua SEO, SEO company Rotorua, SEO services Rotorua, Rotorua SEO consultant, local SEO Rotorua, SEO Rotorua NZ, Bay of Plenty SEO, search engine optimisation Rotorua",
  openGraph: {
    title: "SEO Agency Rotorua | Junction Media",
    description: "AI-native SEO for Rotorua and Bay of Plenty businesses. Technical SEO, content strategy, and authority building that turns organic search into a compounding revenue channel.",
    url: 'https://www.junctionmedia.ai/rotorua/seo-agency',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/rotorua/seo-agency',
  },
}

const faqs = [
  {
    q: "How much does SEO cost for a Rotorua business?",
    a: "Rotorua SEO pricing at Junction Media ranges from $1,200–$2,500/month NZD depending on scope. $1,200/month covers technical SEO maintenance and 2–3 content pieces per month. $2,500/month adds aggressive authority building and 6–8 content pieces per month. All engagements are 3-month minimum — Bay of Plenty search markets take time to build, and meaningful results compound over time.",
  },
  {
    q: "Is SEO worth investing in for a Rotorua business?",
    a: "Absolutely. Rotorua attracts over 3 million visitors per year — one of New Zealand's top tourist destinations. Tourism, hospitality, and adventure activity businesses that rank well in organic search capture pre-trip planning traffic from domestic and international visitors with strong spending intent. The SEO competition in Rotorua is significantly lower than Auckland or Wellington.",
  },
  {
    q: "What Rotorua industries benefit most from SEO?",
    a: "Tourism and hospitality businesses, accommodation providers, adventure activity operators, Māori cultural experiences, trades and construction, healthcare, professional services, and retail businesses all see strong SEO ROI in Rotorua. The city's tourism economy creates distinctive content marketing opportunities around thermal experiences, Te Arawa culture, and adventure tourism.",
  },
  {
    q: "Do you do local SEO for Rotorua suburbs and Bay of Plenty?",
    a: "Yes — local SEO for Rotorua CBD, Ngongotaha, Springfield, Glenholme, Fairy Springs, Fenton Park, and surrounding Bay of Plenty towns is core to our work. Local SEO includes Google Business Profile optimisation, NZ and Bay of Plenty-specific citations, local schema, and area-level content.",
  },
  {
    q: "How long does SEO take to show results for a Rotorua business?",
    a: "Most Rotorua businesses start seeing measurable ranking improvements within 60–90 days. Traffic and lead volume typically follows in months 3–6. Rotorua's competitive landscape is meaningfully less intense than Wellington or Auckland, meaning faster results are achievable for most business categories — especially tourism and hospitality.",
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
        { '@type': 'City', name: 'Rotorua' },
        { '@type': 'City', name: 'Auckland' },
      ],
      priceRange: '$$$',
    },
    {
      '@type': 'Service',
      name: 'SEO Agency Rotorua',
      provider: {
        '@type': 'Organization',
        name: 'Junction Media',
        url: 'https://www.junctionmedia.ai',
      },
      serviceType: 'Search Engine Optimisation',
      areaServed: {
        '@type': 'City',
        name: 'Rotorua',
      },
      description: 'AI-native SEO services for Rotorua and Bay of Plenty businesses. Technical SEO, content strategy, and authority building for tourism, trades, hospitality, and professional services.',
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

export default function RotoruaSEOAgencyPage() {
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
          Rotorua · SEO
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          SEO Agency Rotorua
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          AI-native SEO for Rotorua and Bay of Plenty businesses. Technical foundations, strategic
          content, and authority building that turns organic search into a compounding channel —
          for Rotorua tourism, hospitality, trades, Māori cultural businesses, and professional services.
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
            { stat: 'Remote-first', label: 'Rotorua-ready delivery' },
          ].map((item) => (
            <div key={item.label} className="p-4 border border-gray-100 rounded-2xl text-center">
              <p className="text-2xl font-bold text-gray-900 mb-1">{item.stat}</p>
              <p className="text-xs text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">SEO in Rotorua: The Bay of Plenty Opportunity</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            Rotorua is one of New Zealand&apos;s most iconic destinations — famous worldwide for
            geothermal activity, Māori culture, mountain biking, and adventure tourism. With a
            resident population of around 60,000 and more than 3 million annual visitors, Rotorua
            businesses operate in a dual economy: serving local residents year-round and capturing
            high-spending tourists from across New Zealand, Australia, and internationally.
          </p>
          <p className="text-gray-600 leading-relaxed">
            The tourism economy creates distinctive SEO opportunities that few Rotorua businesses
            are fully exploiting. Visitors plan their trips weeks or months in advance — searching
            for accommodation, activities, restaurants, and experiences before they ever arrive.
            Businesses that rank for those searches capture demand at the earliest decision-making
            stage, when intent is high and alternatives haven&apos;t yet been considered.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We work remotely with Rotorua and Bay of Plenty clients — video strategy sessions,
            weekly updates, and transparent reporting. Our SEO quality matches what we deliver
            for Wellington and Auckland clients; the Rotorua market simply has more headroom
            and lower competition across most business categories.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">What Rotorua SEO Work Includes</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Technical SEO Audit & Fixes',
              desc: "Crawl errors, Core Web Vitals, schema markup, internal linking — found and fixed, not just reported. Technical issues suppressing your Rotorua rankings are resolved before we build content on top of them.",
            },
            {
              title: 'Local Rotorua SEO',
              desc: "Google Business Profile optimisation, Rotorua and Bay of Plenty-specific citations, local schema, and suburb-level content for CBD, Ngongotaha, Fairy Springs, Glenholme, Fenton Park, Springfield, and surrounds.",
            },
            {
              title: 'Content Strategy & Production',
              desc: "Topical authority mapping built around Rotorua and Bay of Plenty search intent. AI-assisted content production — more pieces, better quality, published consistently. Tourism, cultural, and service content that earns rankings.",
            },
            {
              title: 'Authority Building',
              desc: "NZ-relevant link acquisition from Bay of Plenty media, tourism industry publications, Te Arawa community associations, business networks, and regional directories. White-hat, sustainable — no link schemes.",
            },
            {
              title: 'On-Page Optimisation',
              desc: 'Every priority Rotorua page optimised: title tags, meta descriptions, headers, internal links, and content structure — aligned to current Google ranking signals and local search intent.',
            },
            {
              title: 'Monthly Reporting',
              desc: "Plain-English reporting every month: rankings, traffic, leads from organic, content published, links built, and next month's plan. No agency jargon — just numbers that connect to your Rotorua business revenue.",
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
        <h2 className="text-2xl font-bold mb-6">Rotorua &amp; Bay of Plenty Areas We Cover</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            'Rotorua CBD', 'Ngongotaha', 'Fairy Springs',
            'Glenholme', 'Fenton Park', 'Springfield',
            'Taupo', 'Whakatane', 'Tokoroa',
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
            { title: 'SEO Agency Rotorua — Blog', href: '/blog/seo-agency-rotorua' },
            { title: 'SEO Services NZ — Full Overview', href: '/services/seo-nz' },
            { title: 'Rotorua Marketing Hub', href: '/rotorua' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to own Rotorua search results?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            If you&apos;re a Rotorua or Bay of Plenty business serious about turning organic search
            into a real acquisition channel — apply below. We review every application.
          </p>
          <Link
            href="/apply"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg"
          >
            Apply to Work With Us
          </Link>
          <p className="text-gray-400 text-sm mt-4">Rotorua &amp; Bay of Plenty businesses. 3–5 client spots.</p>
        </div>
      </section>

      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2026 Junction Media. Auckland, New Zealand.</p>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Home</Link>
            <Link href="/rotorua" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Rotorua</Link>
            <Link href="/services/seo-nz" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">SEO NZ</Link>
            <Link href="/apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
