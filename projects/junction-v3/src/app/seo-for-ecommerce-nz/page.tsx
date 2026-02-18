import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'SEO Agency for Ecommerce NZ — Organic Revenue Growth | Junction Media',
  description: 'Specialist SEO for NZ ecommerce stores. Rank for high-intent product and category keywords, drive organic traffic that converts, and stop depending on paid ads.',
  keywords: 'seo for ecommerce nz, ecommerce seo nz, seo agency ecommerce nz, shopify seo nz, ecommerce organic traffic nz',
  openGraph: {
    title: 'SEO Agency for Ecommerce NZ | Junction Media',
    description: 'Specialist SEO for NZ ecommerce stores. Rank for product and category keywords that drive real revenue — not just traffic.',
    url: 'https://www.junctionmedia.ai/seo-for-ecommerce-nz',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/seo-for-ecommerce-nz',
  },
}

const painPoints = [
  {
    title: 'Paid ads eat your margin — SEO builds it back',
    desc: 'Every sale through Google Shopping or Meta Ads costs you 15–25% in media spend. Organic search traffic has a one-time cost: the work to earn the ranking. NZ ecommerce stores that invest in SEO reduce their blended CAC by 30–50% over 12 months.',
  },
  {
    title: 'Category pages are your highest-value real estate',
    desc: 'Product pages come and go, but category pages rank for high-volume commercial intent keywords year-round. Most NZ ecommerce stores have category pages that are thin, poorly structured, and missing the content signals that Google needs to rank them.',
  },
  {
    title: 'Your competitors are winning on keywords you don\'t even know you\'re losing',
    desc: 'NZ ecommerce search is surprisingly competitive. Australian brands with bigger budgets are targeting the same NZ keywords. Without a clear keyword strategy and consistent content output, you lose organic market share slowly — until the drop becomes impossible to ignore.',
  },
]

const approach = [
  {
    title: 'Technical SEO Foundation',
    desc: 'Site speed, crawlability, structured data for products (ratings, price, availability), canonical tags across product variants, and XML sitemap health. We fix the foundation before building on it.',
  },
  {
    title: 'Category Page Optimisation',
    desc: 'We identify your highest-value category keywords, then build out content-rich category pages with proper heading structure, internal linking, and buyer-intent copy that ranks and converts.',
  },
  {
    title: 'Product Page SEO at Scale',
    desc: 'AI-assisted product description optimisation across your entire catalogue. Unique, keyword-rich descriptions that avoid duplicate content penalties — scalable in a way manual copywriting never could be.',
  },
  {
    title: 'Content Strategy for Ecommerce',
    desc: 'Top-of-funnel blog content that captures shoppers before they know what brand they want. Buying guides, comparison posts, and how-to content that builds topical authority and feeds organic traffic into product pages.',
  },
]

const results = [
  { stat: '+30%', label: 'Above store record (Deep Blue Health, Nov 2025)' },
  { stat: '4–5', label: 'Clients at any one time — focused attention' },
  { stat: '3–6mo', label: 'Typical timeline to meaningful organic traffic' },
  { stat: '100%', label: 'NZ-based, NZ-market expertise' },
]

const faqs = [
  {
    q: 'How long does ecommerce SEO take to show results?',
    a: 'New pages typically start appearing in search results within 4–8 weeks. Meaningful traffic movement usually starts at month 3–4. By month 6, well-executed ecommerce SEO should be driving measurable revenue. Unlike paid ads, the gains compound — they don\'t disappear when you stop paying.',
  },
  {
    q: 'Do you work with Shopify stores?',
    a: 'Yes. Shopify is where most of our ecommerce SEO work happens. We know its technical constraints well — URL structure, canonical issues with product variants, collection page limitations — and we work within and around them effectively.',
  },
  {
    q: 'Can SEO work alongside paid ads?',
    a: 'SEO and paid ads are most powerful together. Paid ads give you immediate traffic while SEO builds; SEO data (which keywords convert) informs your paid strategy; paid ads data tells you which organic keywords are worth pursuing. We can manage both or work alongside your existing paid ads partner.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'SEO for Ecommerce NZ',
  provider: {
    '@type': 'Organization',
    name: 'Junction Media',
    url: 'https://www.junctionmedia.ai',
  },
  description: 'Specialist SEO for NZ ecommerce stores. Category page optimisation, technical SEO, product page SEO, and content strategy for organic revenue growth.',
  areaServed: { '@type': 'Country', name: 'New Zealand' },
}

export default function SeoForEcommerceNZ() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Nav */}
      <nav className="px-6 py-5 border-b border-gray-100 flex items-center justify-between max-w-5xl mx-auto">
        <Link href="/" className="font-medium text-gray-900 hover:text-gray-600 transition-colors">
          Junction Media
        </Link>
        <Link href="/apply" className="text-sm bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors">
          Apply to Work With Us
        </Link>
      </nav>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-16">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
          Service + Industry · SEO for Ecommerce NZ
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          SEO Agency for<br />
          <span className="text-gray-500">Ecommerce NZ</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          Organic search is the highest-margin traffic channel for NZ ecommerce stores — and the most
          neglected. We build the technical foundation, optimise your category and product pages, and
          create the content that earns rankings that convert to revenue without ongoing ad spend.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/apply" className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors text-center">
            Apply to Work With Us
          </Link>
          <Link href="/industries/ecommerce-nz" className="inline-block border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:border-gray-500 transition-colors text-center">
            Ecommerce Marketing Overview
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-3xl mx-auto px-6 py-12 border-t border-gray-100">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {results.map((item) => (
            <div key={item.label} className="p-4 border border-gray-100 rounded-2xl text-center">
              <p className="text-2xl font-bold text-gray-900 mb-1">{item.stat}</p>
              <p className="text-xs text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Ecommerce Needs SEO */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">Why Ecommerce Stores Need SEO — Not Just Ads</h2>
        <div className="space-y-6">
          {painPoints.map((item) => (
            <div key={item.title} className="p-6 border border-gray-100 rounded-2xl">
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Approach */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-4">Our Ecommerce SEO Approach</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          We don&apos;t do generic SEO. Ecommerce SEO has unique requirements — product feeds, variant
          canonicalisation, category page content, structured data for rich results — and we build
          strategies around these specifics, not generic blog post checklists.
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          {approach.map((item) => (
            <div key={item.title} className="p-6 border border-gray-100 rounded-2xl">
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Proof */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Real Results</h2>
        <div className="p-8 bg-gray-50 rounded-2xl border border-gray-200">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Case Study · Deep Blue Health</p>
          <p className="text-3xl font-bold text-gray-900 mb-3">+30% above store record</p>
          <p className="text-gray-600 leading-relaxed">
            Deep Blue Health — a NZ health supplement brand — beat their all-time monthly revenue record
            by 30% in November 2025. SEO-driven category content and product page optimisation built
            the organic foundation, while paid channels amplified it. The organic traffic continues to
            compound every month.
          </p>
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

      {/* Related */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Related</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { title: 'SEO for Ecommerce NZ — Full Guide', href: '/blog/seo-for-ecommerce-nz' },
            { title: 'Ecommerce Marketing Overview', href: '/industries/ecommerce-nz' },
            { title: 'Google Ads for Ecommerce NZ', href: '/google-ads-for-ecommerce-nz' },
            { title: 'SEO Services NZ', href: '/services/seo-nz' },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="p-4 border border-gray-100 rounded-xl hover:border-gray-300 transition-colors text-sm font-medium text-gray-700 hover:text-gray-900">
              {link.title} →
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 py-20 border-t border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to grow your ecommerce store organically?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            We work with a small number of NZ ecommerce clients at any one time.
            Apply to find out if we&apos;re a fit.
          </p>
          <Link href="/apply" className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg">
            Apply to Work With Us
          </Link>
          <p className="text-gray-400 text-sm mt-4">NZ ecommerce businesses only.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2026 Junction Media. Auckland, New Zealand.</p>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Home</Link>
            <Link href="/industries" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Industries</Link>
            <Link href="/services" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Services</Link>
            <Link href="/blog" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Blog</Link>
            <Link href="/apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
