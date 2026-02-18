import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'SEO Agency Nelson | Nelson SEO Company | Junction Media',
  description: 'SEO agency serving Nelson businesses. AI-powered technical SEO, content strategy, and authority building for Nelson CBD, Richmond, and the Tasman region. $1,200–$2,500/mo.',
  keywords: 'SEO agency Nelson, Nelson SEO, SEO company Nelson, SEO services Nelson, Nelson SEO consultant, local SEO Nelson, SEO Nelson NZ, Tasman SEO, search engine optimisation Nelson, Nelson digital marketing',
  openGraph: {
    title: 'SEO Agency Nelson | Junction Media',
    description: 'AI-native SEO for Nelson and Tasman businesses. Technical SEO, content strategy, and authority building that compounds into lasting organic growth.',
    url: 'https://www.junctionmedia.ai/nelson/seo-agency',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/nelson/seo-agency',
  },
}

const faqs = [
  {
    q: 'How much does SEO cost for a Nelson business?',
    a: 'Nelson SEO pricing at Junction Media ranges from $1,200–$2,500/month NZD. $1,200/month covers technical SEO and 2–3 content pieces per month targeting Nelson and Tasman keywords. $2,500/month adds aggressive authority building and more content volume. All engagements are 3-month minimum.',
  },
  {
    q: 'Is Nelson a good market for SEO investment?',
    a: 'Nelson is a thriving regional city with a strong arts scene, wine and horticulture industry, and a growing small business community across the Tasman region. SEO competition is significantly lower than Auckland or Wellington — first movers can establish durable organic rankings in 3–6 months rather than 12–18.',
  },
  {
    q: 'What Nelson industries benefit most from SEO?',
    a: 'Nelson trades (builders, electricians, plumbers), tourism and hospitality, wine and food producers, arts and creative businesses, professional services, marine and fishing industries, and retail all see strong SEO ROI in the Nelson/Tasman market.',
  },
  {
    q: 'Do you cover Richmond, Stoke, and the wider Tasman region?',
    a: 'Yes — our Nelson SEO work covers Nelson CBD, Richmond, Stoke, Tahunanui, Mapua, Motueka, Takaka, and the wider Tasman region. Local SEO includes Google Business Profile optimisation, Tasman-specific citations, local schema, and suburb-level content.',
  },
  {
    q: 'Can you help a Nelson business that tried SEO before with no results?',
    a: 'Yes. Poor SEO results trace to technical issues, content misaligned with search intent, or absent authority building. We audit all three, fix what is broken, and build a Nelson-specific strategy based on what local customers actually search for.',
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
        { '@type': 'City', name: 'Nelson' },
        { '@type': 'City', name: 'Auckland' },
      ],
      priceRange: '$$$',
    },
    {
      '@type': 'Service',
      name: 'SEO Agency Nelson',
      provider: {
        '@type': 'Organization',
        name: 'Junction Media',
        url: 'https://www.junctionmedia.ai',
      },
      serviceType: 'Search Engine Optimisation',
      areaServed: {
        '@type': 'City',
        name: 'Nelson',
      },
      description: 'AI-native SEO services for Nelson and Tasman businesses. Technical SEO, content strategy, and authority building for lasting organic growth.',
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

export default function NelsonSEOAgencyPage() {
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
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Nelson · SEO</p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          SEO Agency Nelson
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          AI-native SEO for Nelson and Tasman businesses. Technical audits, content strategy, and
          authority building that turns organic search into a compounding acquisition channel — not
          a monthly expense that stops the moment you pause.
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
        <h2 className="text-2xl font-bold mb-6">SEO in Nelson: What Actually Moves the Needle</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            Nelson is New Zealand&apos;s sunniest city — and one of its most underrated digital markets.
            Home to a thriving arts and creative community, a strong wine and horticulture sector,
            and a diverse small business economy across the Tasman region, Nelson offers a compelling
            first-mover SEO opportunity for businesses ready to invest.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Most Nelson businesses built their customer bases through word of mouth and local reputation.
            Digital presence has often lagged behind. That creates a window: in most service categories,
            the bar to rank on page one of Google in Nelson is meaningfully lower than in Auckland or Wellington.
          </p>
          <p className="text-gray-600 leading-relaxed">
            What works now: topical authority, technical precision, content that demonstrates genuine local expertise,
            and signals that prove you actually serve Nelson and the Tasman region. We build all of it.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">What Our Nelson SEO Work Includes</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Technical SEO Audit & Fixes',
              desc: 'Crawl errors, Core Web Vitals, mobile performance, structured data, internal linking. We find what is suppressing your Nelson rankings — and implement the fixes.',
            },
            {
              title: 'Local Nelson SEO',
              desc: 'Google Business Profile optimisation, local citations across NZ directories, local schema markup, and content for Nelson CBD, Richmond, Stoke, and the wider Tasman region.',
            },
            {
              title: 'Content Strategy & Production',
              desc: 'Topical authority mapping specific to your Nelson niche. AI-assisted content production that builds ranking assets — not keyword-stuffed filler.',
            },
            {
              title: 'Authority Building',
              desc: 'Link acquisition from Nelson and Tasman-relevant publications, industry sites, and business directories. White-hat and sustainable.',
            },
            {
              title: 'On-Page Optimisation',
              desc: 'Every priority page optimised for its target queries. Title tags, meta descriptions, headers, internal links, schema, and content structure — all tuned to current ranking signals.',
            },
            {
              title: 'Monthly Reporting',
              desc: 'Plain-English monthly reports: what moved, what we published, what we built, what comes next. Rankings tied to traffic and leads — not vanity metrics.',
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
            Deep Blue Health — a New Zealand supplement brand — hit their best revenue month ever in
            November 2025. We built AI-native marketing systems across Google Ads, Meta Ads, SEO,
            content, and customer support. Result: 30% above their previous all-time record in month one.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">We Know the Nelson Market</h2>
        <div className="space-y-4">
          {[
            'Nelson CBD — the commercial and hospitality hub, high foot traffic and local search intent from both residents and visitors',
            'Richmond — fast-growing suburb with strong residential and commercial activity and distinct local search behaviour',
            'Stoke and Tahunanui — beachside and residential areas with growing services demand',
            'Mapua and Motueka — popular tourism corridors with food, arts, and experience-based businesses',
            'Tasman region broadly — wine country, horticulture, and outdoor tourism driving year-round search volume',
          ].map((item, i) => (
            <div key={i} className="flex gap-3">
              <span className="text-gray-400 mt-0.5 flex-shrink-0">→</span>
              <p className="text-gray-600 text-sm">{item}</p>
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
            { title: 'SEO Agency Nelson — Full Guide', href: '/blog/seo-agency-nelson' },
            { title: 'SEO Services NZ — Full Overview', href: '/services/seo-nz' },
            { title: 'Nelson Marketing Hub', href: '/nelson' },
            { title: 'Google Ads Agency Nelson', href: '/nelson/google-ads-agency' },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="p-4 border border-gray-100 rounded-xl hover:border-gray-300 transition-colors text-sm font-medium text-gray-700 hover:text-gray-900">
              {link.title} →
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-20 border-t border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to dominate Nelson search?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            If you are serious about turning organic search into a compounding acquisition channel
            for your Nelson business — apply below. We review every application.
          </p>
          <Link href="/apply" className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg">
            Apply to Work With Us
          </Link>
          <p className="text-gray-400 text-sm mt-4">3–5 client spots. NZ businesses only.</p>
        </div>
      </section>

      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2026 Junction Media. Auckland, New Zealand.</p>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Home</Link>
            <Link href="/nelson" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Nelson</Link>
            <Link href="/services/seo-nz" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">SEO NZ</Link>
            <Link href="/apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
