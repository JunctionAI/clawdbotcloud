import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'SEO Agency Queenstown | AI-Native SEO for Queenstown Businesses | Junction Media',
  description: 'Looking for an SEO agency in Queenstown? Junction Media delivers AI-powered SEO — technical audits, content strategy, and authority building for Queenstown and Queenstown-Lakes district and the Central Otago region. $1,200–$2,500/mo.',
  keywords: 'SEO agency Queenstown, Queenstown SEO company, SEO Queenstown, SEO services Queenstown, best SEO agency Queenstown, Queenstown SEO consultant, local SEO Queenstown, SEO company Queenstown NZ',
  openGraph: {
    title: 'SEO Agency Queenstown | Junction Media',
    description: 'AI-native SEO for Queenstown businesses. Technical SEO, content strategy, and authority building. Real results that compound over time.',
    url: 'https://www.junctionmedia.ai/queenstown/seo-agency',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/queenstown/seo-agency',
  },
}

const faqs = [
  {
    q: 'How much does an SEO agency in Queenstown cost?',
    a: 'Queenstown SEO agency pricing at Junction Media starts at $1,200/month NZD for core technical SEO and content, scaling to $2,500/month for aggressive authority building. All engagements are 3-month minimum — meaningful rankings take time to build. This reflects the investment required to produce real, compounding organic results for Queenstown businesses.',
  },
  {
    q: 'How long does SEO take to work for Queenstown businesses?',
    a: 'For most Queenstown businesses targeting competitive local keywords, expect meaningful ranking movement in 3–4 months and strong positions by month 6–9. Less competitive niches in Queenstown-Lakes can move faster. Technical fixes often show impact in 4–8 weeks. Queenstown\'s SEO landscape is less saturated than Auckland, meaning faster gains are often achievable for businesses that invest properly.',
  },
  {
    q: 'Do you specialise in local SEO for Queenstown?',
    a: 'Yes — local SEO for Queenstown and the wider Queenstown-Lakes district and the Central Otago region is central to our work. Local rankings depend on Google Business Profile optimisation, NZ-specific citations, local schema, and content that signals genuine local relevance in the Queenstown-Lakes market. We understand the Queenstown search landscape and build strategies around it.',
  },
  {
    q: 'What makes Junction Media different from other Queenstown SEO companies?',
    a: 'We use AI for execution (keyword research, content production, technical monitoring) but lead with human strategy. We work with 3–5 clients at a time — not 50. And we think in systems: topical authority clusters, not individual keywords. For Queenstown businesses, this means building an organic channel that compounds over time, not chasing one ranking.',
  },
  {
    q: 'Can you help if my Queenstown business has been hit by a Google algorithm update?',
    a: 'Yes. Google Core Updates have hit many NZ sites hard — particularly sites with thin content, poor E-E-A-T signals, or over-reliance on AI-generated filler. We diagnose what changed, identify the root cause, and build a recovery plan. Recovery typically takes 3–6 months but is achievable with the right approach.',
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
        { '@type': 'City', name: 'Queenstown' },
        { '@type': 'City', name: 'Auckland' },
      ],
      priceRange: '$$$',
    },
    {
      '@type': 'Service',
      name: 'SEO Agency Queenstown',
      provider: {
        '@type': 'Organization',
        name: 'Junction Media',
        url: 'https://www.junctionmedia.ai',
      },
      serviceType: 'Search Engine Optimisation',
      areaServed: {
        '@type': 'City',
        name: 'Queenstown',
      },
      description: 'AI-native SEO services for Queenstown businesses. Technical SEO, content strategy, and authority building that turns organic search into a compounding acquisition channel.',
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

export default function QueenstownSEOAgencyPage() {
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
          Queenstown · SEO
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          SEO Agency Queenstown
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          AI-native SEO for Queenstown businesses. Technical audits, content strategy, and authority
          building that turns organic search into a compounding acquisition channel — not a
          monthly expense that stops the moment you pause.
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
        <h2 className="text-2xl font-bold mb-6">SEO in Queenstown: What Actually Moves the Needle</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            Queenstown is New Zealand's adventure tourism capital and one of the world's premier destination cities. The local digital marketing landscape is less saturated than
            Auckland or Wellington, which means businesses that invest in proper SEO now can
            establish dominant positions faster and hold them longer.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Queenstown has intense tourism competition and high digital spend — but smart SEO still delivers strong ROI for local businesses. Most established local businesses built their customer base on
            reputation and word of mouth — their digital presence hasn&apos;t kept pace. That
            creates a genuine first-mover advantage for businesses willing to invest in
            systematic, compound-oriented SEO.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Key Queenstown industries include tourism, hospitality, adventure sports, real estate, retail, and professional services. Each has addressable organic search
            demand from local customers and regional visitors. The goal: build content and
            authority that compounds over months and years, not campaigns that stop the moment
            you pause the spend.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">What Our Queenstown SEO Work Includes</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Technical SEO Audit & Fixes',
              desc: 'Crawl errors, Core Web Vitals, mobile performance, structured data, internal linking. We find what\'s suppressing your Queenstown rankings — and implement the fixes, not just report them.',
            },
            {
              title: 'Local Queenstown SEO',
              desc: 'Google Business Profile optimisation, local citations across NZ directories, local schema markup, and suburb-level content for Frankton, Arrowtown, Wānaka, Fernhill, Kelvin Heights, Lake Hayes and surrounding areas. Built for searches like "trades Queenstown" or "professional services Queenstown-Lakes."',
            },
            {
              title: 'Content Strategy & Production',
              desc: 'Topical authority mapping specific to your Queenstown niche. AI-assisted content production that builds ranking assets — not keyword-stuffed filler. Content that earns links because it\'s genuinely useful.',
            },
            {
              title: 'Authority Building',
              desc: 'Digital PR and link acquisition from NZ-relevant publications, industry sites, and Queenstown-Lakes business directories. White-hat, sustainable — no link schemes that create penalty risk.',
            },
            {
              title: 'On-Page Optimisation',
              desc: 'Every priority page on your Queenstown site optimised for its target queries. Title tags, meta descriptions, headers, internal links, schema, and content structure — all tuned to current ranking signals.',
            },
            {
              title: 'Monthly Reporting',
              desc: 'Plain-English monthly reports: what moved, what we published, what we built, and what comes next. Ranking data tied to traffic and lead data — not vanity metrics.',
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
            SEO, content, and customer support. The result: 30% above their previous all-time record,
            in month one of the engagement.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">We Know the Queenstown Market</h2>
        <div className="space-y-4">
          {[
            'Queenstown CBD and surrounding suburbs — strong local search intent for trades, professional services, and retail',
            'Queenstown-Lakes region — a broader audience reachable through well-structured local SEO and content',
            'Key Queenstown industries: tourism, hospitality, adventure sports, real estate, retail, and professional services — all with addressable organic search demand',
            'Notable areas and landmarks: Remarkables, Coronet Peak, Lake Wakatipu, Milford Sound access, and world-class adventure activities — local context that builds genuine geographic relevance',
            'Suburbs including Frankton, Arrowtown, Wānaka, Fernhill, Kelvin Heights, Lake Hayes — suburb-level content that signals real local expertise to Google',
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
            { title: 'SEO Agency Queenstown — Full Guide', href: '/blog/seo-agency-queenstown' },
            { title: 'SEO Services NZ — Full Overview', href: '/services/seo-nz' },
            { title: 'Queenstown Marketing Hub', href: '/queenstown' },
            { title: 'Google Ads Agency Queenstown', href: '/queenstown/google-ads-agency' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to dominate Queenstown search?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            If you&apos;re serious about turning organic search into a compounding acquisition channel
            for your Queenstown business — apply below. We review every application.
          </p>
          <Link
            href="/apply"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg"
          >
            Apply to Work With Us
          </Link>
          <p className="text-gray-400 text-sm mt-4">3–5 client spots. Queenstown & Queenstown-Lakes businesses welcome.</p>
        </div>
      </section>

      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2026 Junction Media. New Zealand.</p>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Home</Link>
            <Link href="/queenstown" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Queenstown</Link>
            <Link href="/services/seo-nz" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">SEO NZ</Link>
            <Link href="/apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
