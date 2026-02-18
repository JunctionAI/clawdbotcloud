import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'SEO Agency Whanganui | Whanganui SEO Company | Junction Media',
  description: 'SEO agency serving Whanganui businesses. AI-powered technical SEO, content strategy, and authority building for Whanganui CBD, the River City, and surrounding Manawatū-Whanganui region. $1,200–$2,500/mo.',
  keywords: 'SEO agency Whanganui, Whanganui SEO, SEO company Whanganui, SEO services Whanganui, Whanganui SEO consultant, local SEO Whanganui, SEO Whanganui NZ, search engine optimisation Whanganui',
  openGraph: {
    title: 'SEO Agency Whanganui | Junction Media',
    description: 'AI-native SEO for Whanganui businesses. Technical SEO, content strategy, and authority building for the River City and wider region.',
    url: 'https://www.junctionmedia.ai/whanganui/seo-agency',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/whanganui/seo-agency',
  },
}

const faqs = [
  {
    q: 'How much does SEO cost for a Whanganui business?',
    a: 'Whanganui SEO at Junction Media ranges from $1,200–$2,500/month NZD. $1,200/month covers technical SEO and 2–3 content pieces monthly targeting Whanganui keywords. All engagements are 3-month minimum.',
  },
  {
    q: 'Is Whanganui a good SEO market?',
    a: 'Whanganui is a historic river city with a strong manufacturing, farming, and service economy. Digital competition remains low compared to larger NZ cities — first movers can establish dominant organic rankings in 3–6 months across most service categories.',
  },
  {
    q: 'What Whanganui industries benefit most from SEO?',
    a: 'Trades and construction, manufacturing suppliers, farming and agricultural services, professional services, healthcare, tourism (river and arts), and retail all see strong SEO ROI in the Whanganui market.',
  },
  {
    q: 'Do you cover Whanganui suburbs and surrounding areas?',
    a: 'Yes — our Whanganui SEO work covers the CBD, Gonville, Castlecliff, Aramoho, Springvale, Fordell, and the wider Manawatū-Whanganui region. Local SEO includes Google Business Profile optimisation, local citations, and area-specific content.',
  },
  {
    q: 'Why does Whanganui have good SEO opportunity?',
    a: 'Most Whanganui businesses built customer bases through reputation and relationships over decades. Their digital presence lags. That means lower competition in Google for almost every service category — a genuine first-mover advantage for businesses ready to invest in SEO.',
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
        { '@type': 'City', name: 'Whanganui' },
        { '@type': 'City', name: 'Auckland' },
      ],
      priceRange: '$$$',
    },
    {
      '@type': 'Service',
      name: 'SEO Agency Whanganui',
      provider: {
        '@type': 'Organization',
        name: 'Junction Media',
        url: 'https://www.junctionmedia.ai',
      },
      serviceType: 'Search Engine Optimisation',
      areaServed: { '@type': 'City', name: 'Whanganui' },
      description: 'AI-native SEO services for Whanganui businesses. Technical SEO, content strategy, and authority building for lasting organic growth.',
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

export default function WhanganuiSEOAgencyPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <nav className="px-6 py-5 border-b border-gray-100 flex items-center justify-between max-w-5xl mx-auto">
        <Link href="/" className="font-medium text-gray-900 hover:text-gray-600 transition-colors">Junction Media</Link>
        <Link href="/apply" className="text-sm bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors">Apply to Work With Us</Link>
      </nav>

      <section className="max-w-3xl mx-auto px-6 pt-20 pb-16">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Whanganui · SEO</p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">SEO Agency Whanganui</h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          AI-native SEO for Whanganui&apos;s River City businesses. Technical audits, content strategy, and
          authority building that turns organic search into a compounding acquisition channel — not a
          monthly bill that stops working the moment you pause.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/apply" className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors text-center">Apply to Work With Us</Link>
          <Link href="/services/seo-nz" className="inline-block border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:border-gray-500 transition-colors text-center">View SEO Services</Link>
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
        <h2 className="text-2xl font-bold mb-6">SEO in Whanganui: The River City Opportunity</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            Whanganui is one of New Zealand&apos;s most historic cities — a river city with deep roots in
            manufacturing, farming, and a distinctive arts and culture scene. It is also one of NZ&apos;s
            most cost-effective business bases. And in the digital marketing landscape, Whanganui
            represents a genuine first-mover opportunity.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Most Whanganui businesses built their customer bases through word of mouth and local
            reputation over decades. Digital presence has lagged. That means most service categories
            in Whanganui have low SEO competition — the bar to rank on page one of Google is
            significantly lower than in Auckland or Wellington.
          </p>
          <p className="text-gray-600 leading-relaxed">
            A business that invests in proper SEO now — technical foundations, local SEO, quality
            content — can achieve dominant positions in 3–6 months for categories where an Auckland
            business might take 12–18 months.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">What Our Whanganui SEO Work Includes</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { title: 'Technical SEO Audit & Fixes', desc: 'Crawl errors, Core Web Vitals, mobile performance, structured data, internal linking. We find what is suppressing your rankings — and implement the fixes.' },
            { title: 'Local Whanganui SEO', desc: 'Google Business Profile optimisation, local citations across NZ directories, local schema markup, and suburb-level content for Whanganui CBD, Gonville, Castlecliff, and beyond.' },
            { title: 'Content Strategy & Production', desc: 'Topical authority mapping for your Whanganui niche. AI-assisted content production targeting the keywords Whanganui customers actually use.' },
            { title: 'Authority Building', desc: 'Link acquisition from Whanganui and Manawatū-Whanganui-relevant publications and business directories. White-hat and sustainable.' },
            { title: 'On-Page Optimisation', desc: 'Every priority page optimised: title tags, meta descriptions, headers, internal links, schema, and content structure aligned with current ranking signals.' },
            { title: 'Monthly Reporting', desc: 'Plain-English monthly reports: what moved, what we published, what we built. Rankings tied to traffic and leads, not vanity metrics.' },
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
            Deep Blue Health hit their best revenue month ever in November 2025. We built AI-native
            marketing systems across SEO, Google Ads, Meta Ads, and content. Result: 30% above their
            previous all-time record in month one.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">We Know the Whanganui Market</h2>
        <div className="space-y-4">
          {[
            'Whanganui CBD — commercial heart of the River City with hospitality, retail, and professional services',
            'Gonville and Castlecliff — residential areas with growing services demand and distinct local search behaviour',
            'Manufacturing and farming sector — strong B2B search intent for trade suppliers and business services',
            'Whanganui arts scene — the Chronicle Glass Studio, Sarjeant Gallery, and River City Arts attract national attention and tourism',
            'Whanganui River — tourism, kayaking, and outdoor experiences driving seasonal search volume',
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
            { title: 'SEO Agency Whanganui — Full Guide', href: '/blog/seo-agency-whanganui' },
            { title: 'SEO Services NZ', href: '/services/seo-nz' },
            { title: 'Whanganui Marketing Hub', href: '/whanganui' },
            { title: 'Google Ads Agency Whanganui', href: '/whanganui/google-ads-agency' },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="p-4 border border-gray-100 rounded-xl hover:border-gray-300 transition-colors text-sm font-medium text-gray-700 hover:text-gray-900">{link.title} →</Link>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-20 border-t border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to dominate Whanganui search?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">Apply below. We review every application and work with select Whanganui businesses serious about organic growth.</p>
          <Link href="/apply" className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg">Apply to Work With Us</Link>
          <p className="text-gray-400 text-sm mt-4">3–5 client spots. NZ businesses only.</p>
        </div>
      </section>

      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2026 Junction Media. Auckland, New Zealand.</p>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Home</Link>
            <Link href="/whanganui" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Whanganui</Link>
            <Link href="/services/seo-nz" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">SEO NZ</Link>
            <Link href="/apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
