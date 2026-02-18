import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'SEO Agency Auckland | AI-Native SEO for Auckland Businesses | Junction Media',
  description: 'Looking for an SEO agency in Auckland? Junction Media delivers AI-powered SEO — technical audits, content strategy, and authority building that turns search into a compounding channel. $1,200–$2,500/mo.',
  keywords: 'SEO agency Auckland, Auckland SEO company, SEO Auckland, SEO services Auckland, best SEO agency Auckland, Auckland SEO consultant, local SEO Auckland, SEO company Auckland NZ',
  openGraph: {
    title: 'SEO Agency Auckland | Junction Media',
    description: 'AI-native SEO for Auckland businesses. Technical SEO, content strategy, and authority building. Real results that compound over time.',
    url: 'https://www.junctionmedia.ai/auckland/seo-agency',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/auckland/seo-agency',
  },
}

const faqs = [
  {
    q: 'How much does an SEO agency in Auckland cost?',
    a: 'Auckland SEO agency pricing varies widely — from $500/month for basic packages to $10,000+ for enterprise campaigns. At Junction Media, SEO starts at $1,200/month NZD for core technical SEO and content, scaling to $2,500/month for aggressive authority building. All engagements are 3-month minimum — meaningful rankings take time to build.',
  },
  {
    q: 'How long does SEO take to work for Auckland businesses?',
    a: 'For most Auckland businesses targeting competitive local keywords like "plumber North Shore" or "Auckland accountant," expect meaningful ranking movement in 3–4 months and strong positions by month 6–9. Less competitive niches can move faster. Technical fixes often show impact in 4–8 weeks. SEO compounds — the longer you invest, the stronger the returns.',
  },
  {
    q: 'Do you specialise in local SEO for Auckland suburbs?',
    a: 'Yes — local SEO for Auckland suburbs (Parnell, Newmarket, Ponsonby, Grey Lynn, North Shore, Remuera, Mt Eden, Takapuna, Manukau, Henderson, and beyond) is a core part of our work. Local rankings depend on Google Business Profile optimisation, NZ-specific citations, local schema, and content that signals genuine local relevance.',
  },
  {
    q: 'What makes Junction Media different from other Auckland SEO companies?',
    a: 'We use AI for execution (keyword research, content production, technical monitoring) but lead with human strategy. We work with 3–5 clients at a time — not 50. And we think in systems: topical authority clusters, not individual keywords. The goal is to build an organic channel that compounds over time, not rank for one keyword and call it done.',
  },
  {
    q: 'Can you help if my Auckland business has been hit by a Google algorithm update?',
    a: 'Yes. Google Core Updates in 2024–2026 have hit many NZ sites hard — particularly sites with thin content, poor E-E-A-T signals, or over-reliance on AI-generated filler. We diagnose what changed, identify the root cause, and build a recovery plan. Recovery takes 3–6 months typically, but it\'s achievable with the right approach.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      name: 'Junction Media',
      url: 'https://www.junctionmedia.ai',
      telephone: '',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Auckland',
        addressRegion: 'Auckland',
        addressCountry: 'NZ',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -36.8485,
        longitude: 174.7633,
      },
      areaServed: {
        '@type': 'City',
        name: 'Auckland',
      },
      priceRange: '$$$',
    },
    {
      '@type': 'Service',
      name: 'SEO Agency Auckland',
      provider: {
        '@type': 'Organization',
        name: 'Junction Media',
        url: 'https://www.junctionmedia.ai',
      },
      serviceType: 'Search Engine Optimisation',
      areaServed: {
        '@type': 'City',
        name: 'Auckland',
      },
      description: 'AI-native SEO services for Auckland businesses. Technical SEO, content strategy, and authority building that turns organic search into a compounding acquisition channel.',
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

export default function AucklandSEOAgencyPage() {
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
          Auckland · SEO
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          SEO Agency Auckland
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          AI-native SEO for Auckland businesses. Technical audits, content strategy, and authority
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

      {/* Key Numbers */}
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

      {/* What Auckland SEO Looks Like */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">SEO in Auckland: What Actually Moves the Needle</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            Auckland is New Zealand&apos;s largest city and most competitive digital market. If you&apos;re
            targeting local searches — &quot;electrician Ponsonby,&quot; &quot;accountant Newmarket,&quot; &quot;SEO agency
            Auckland&quot; — you&apos;re competing with every other business in the category who has had
            the same idea.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Most Auckland SEO companies still sell 2019-era tactics: keyword rankings reports, generic
            blog posts, and backlinks from directories nobody visits. In 2026&apos;s AI-era search
            landscape, this approach doesn&apos;t just underperform — it can actively damage your rankings.
          </p>
          <p className="text-gray-600 leading-relaxed">
            What works now: topical authority (owning your niche cluster, not chasing one keyword),
            technical precision (Core Web Vitals, schema, crawl efficiency), content that demonstrates
            genuine expertise, and local signals that prove you actually serve Auckland.
          </p>
        </div>
      </section>

      {/* What We Do */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">What Our Auckland SEO Work Includes</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Technical SEO Audit & Fixes',
              desc: 'Crawl errors, Core Web Vitals, mobile performance, structured data, internal linking. We find what\'s suppressing your Auckland rankings — and implement the fixes, not just report them.',
            },
            {
              title: 'Local Auckland SEO',
              desc: 'Google Business Profile optimisation, local citations across NZ directories, local schema markup, and suburb-level content. Built for searches like "SEO company North Shore" or "marketing agency Parnell."',
            },
            {
              title: 'Content Strategy & Production',
              desc: 'Topical authority mapping specific to your Auckland niche. AI-assisted content production that builds ranking assets — not keyword-stuffed filler. Content that earns links because it\'s genuinely useful.',
            },
            {
              title: 'Authority Building',
              desc: 'Digital PR and link acquisition from NZ-relevant publications, industry sites, and business directories. White-hat, sustainable — no link schemes that create penalty risk.',
            },
            {
              title: 'On-Page Optimisation',
              desc: 'Every priority page on your Auckland site optimised for its target queries. Title tags, meta descriptions, headers, internal links, schema, and content structure — all tuned to current ranking signals.',
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

      {/* DBH Result */}
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

      {/* Auckland-Specific Context */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">We Know the Auckland Market</h2>
        <div className="space-y-4">
          {[
            'Auckland CBD, Ponsonby, Grey Lynn, Parnell, Newmarket — competitive urban suburbs where local SEO rankings directly drive foot traffic and leads',
            'North Shore suburbs (Takapuna, Devonport, Albany) — often underserved by local SEO despite strong search volume',
            'South Auckland (Manukau, Papatoetoe, Papakura) — growing commercial areas with lower competition and strong ranking opportunities',
            'West Auckland (Henderson, Te Atatū, New Lynn) — increasingly active business communities with addressable local search demand',
            'East Auckland (Howick, Botany, Pakuranga) — affluent residential area with high commercial search intent',
          ].map((item, i) => (
            <div key={i} className="flex gap-3">
              <span className="text-gray-400 mt-0.5 flex-shrink-0">→</span>
              <p className="text-gray-600 text-sm">{item}</p>
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
            { title: 'SEO Agency Auckland — Full Guide', href: '/blog/seo-agency-auckland' },
            { title: 'SEO Services NZ — Full Overview', href: '/services/seo-nz' },
            { title: 'Auckland Marketing Hub', href: '/auckland' },
            { title: 'Google Ads Agency Auckland', href: '/auckland/google-ads-agency' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to dominate Auckland search?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            If you&apos;re serious about turning organic search into a compounding acquisition channel
            for your Auckland business — apply below. We review every application.
          </p>
          <Link
            href="/apply"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg"
          >
            Apply to Work With Us
          </Link>
          <p className="text-gray-400 text-sm mt-4">3–5 client spots. Auckland & NZ businesses only.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2026 Junction Media. Auckland, New Zealand.</p>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Home</Link>
            <Link href="/auckland" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Auckland</Link>
            <Link href="/services/seo-nz" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">SEO NZ</Link>
            <Link href="/apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
