import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'SEO for Retail NZ — Organic Search That Drives Foot Traffic & Online Sales | Junction Media',
  description: 'Specialist SEO for NZ retail businesses. Rank for local and product keywords across Auckland, Wellington, and Christchurch. Drive both in-store foot traffic and online revenue.',
  keywords: 'seo for retail nz, retail seo nz, seo agency retail nz, local seo retail nz, retail organic search nz, retail marketing seo nz',
  openGraph: {
    title: 'SEO for Retail NZ | Junction Media',
    description: 'Specialist SEO for NZ retailers — local search, product rankings, and content that drives both online and in-store traffic.',
    url: 'https://www.junctionmedia.ai/seo-for-retail-nz',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/seo-for-retail-nz',
  },
}

const painPoints = [
  {
    title: 'Local SEO is the most underused growth lever for NZ retail',
    desc: 'When someone in Newmarket or Ponsonby searches "running shoes Auckland" or "homewares Wellington", Google Maps and local organic results capture the majority of clicks. Most NZ retailers have incomplete Google Business Profiles, inconsistent NAP data, and zero review strategy — leaving high-intent local search traffic on the table.',
  },
  {
    title: 'Retail SEO in NZ means competing with international giants',
    desc: 'Amazon, The Iconic, and major Australian chains dominate generic product keywords. NZ retailers can\'t outspend them — but they can out-localise them. SEO strategies built around NZ-specific product terms, local intent, and hyperlocal content create rankings these giants can\'t easily steal.',
  },
  {
    title: 'Your product pages are invisible without content and structure',
    desc: 'Most retail product pages are thin — a product name, a price, and a few images. Google needs context: what the product is, who it\'s for, where it\'s available, and why it\'s the best option. Without structured content, your product pages don\'t rank, and you depend entirely on paid ads for visibility.',
  },
]

const approach = [
  {
    title: 'Local SEO & Google Business Profile',
    desc: 'Full Google Business Profile optimisation for each retail location in Auckland, Wellington, Christchurch, or wherever you operate. Review generation systems, local citation building, and Maps ranking strategies that drive foot traffic.',
  },
  {
    title: 'Product & Category Page SEO',
    desc: 'Keyword research tailored to NZ retail search behaviour. We identify what NZ shoppers are searching for, then build optimised product descriptions and category pages that rank for commercial intent terms.',
  },
  {
    title: 'Local Content Strategy',
    desc: 'Blog content and buying guides targeting NZ-specific retail searches. "Best homewares stores Auckland", "outdoor gear Wellington" — the informational queries that capture shoppers before they\'ve decided where to buy.',
  },
  {
    title: 'Technical SEO for Retail Platforms',
    desc: 'Whether you\'re on Shopify, WooCommerce, or a custom platform, we fix the technical issues holding your retail site back — site speed, structured data for products, local schema, and crawlability.',
  },
]

const results = [
  { stat: '+40%', label: 'Average organic traffic growth in 6 months' },
  { stat: '2–4mo', label: 'Typical time to local rankings improvement' },
  { stat: '100%', label: 'NZ retail market expertise' },
  { stat: 'Both', label: 'Online and in-store traffic growth' },
]

const faqs = [
  {
    q: 'Does SEO work for brick-and-mortar retail, or just online stores?',
    a: 'Both. Local SEO is specifically designed for physical retail. When someone searches "shoe store near me" in Auckland or "furniture store Christchurch", local SEO determines whether your store appears. We optimise for both the in-store foot traffic that local SEO drives and the online sales that organic product rankings deliver.',
  },
  {
    q: 'How long before we see results from retail SEO?',
    a: 'Local SEO improvements (Google Maps rankings, Google Business Profile) often show results within 4–8 weeks. Organic search rankings for product and category terms typically take 3–6 months to build meaningfully. The results compound over time — unlike paid ads, once you rank, the traffic is essentially free.',
  },
  {
    q: 'Do you work with retail chains that have multiple NZ locations?',
    a: 'Yes. Multi-location retail is actually where local SEO delivers the most value. We set up location-specific pages and Google Business Profiles for each store, building local authority across Auckland, Wellington, Christchurch, Hamilton, and wherever else you operate.',
  },
]

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Junction Media',
    url: 'https://www.junctionmedia.ai',
    description: 'SEO agency specialising in retail businesses across New Zealand.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Auckland',
      addressCountry: 'NZ',
    },
    areaServed: [
      { '@type': 'City', name: 'Auckland' },
      { '@type': 'City', name: 'Wellington' },
      { '@type': 'City', name: 'Christchurch' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.junctionmedia.ai' },
      { '@type': 'ListItem', position: 2, name: 'SEO for Retail NZ', item: 'https://www.junctionmedia.ai/seo-for-retail-nz' },
    ],
  },
]

export default function SeoForRetailNZ() {
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
          Service + Industry · SEO for Retail NZ
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          SEO for<br />
          <span className="text-gray-500">Retail NZ</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          NZ retail is fighting on two fronts: local foot traffic and online sales. SEO is the only
          channel that drives both. We build organic search strategies for NZ retailers that surface
          your stores in local search, rank your products above competitors, and generate consistent
          traffic that doesn&apos;t disappear when you pause ad spend.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/apply" className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors text-center">
            Apply to Work With Us
          </Link>
          <Link href="/industries/retail-nz" className="inline-block border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:border-gray-500 transition-colors text-center">
            Retail Marketing Overview
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

      {/* Why */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">Why NZ Retailers Struggle With Organic Search</h2>
        <div className="space-y-6">
          {painPoints.map((item) => (
            <div key={item.title} className="p-6 border border-gray-100 rounded-2xl">
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Approach */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-4">Our Retail SEO Approach</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Retail SEO isn&apos;t generic SEO with a retail label. It requires local search expertise,
          product schema knowledge, and an understanding of how NZ shoppers search — by suburb, by
          product type, by brand. We build around those specifics.
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
            { title: 'SEO for Retail NZ — Full Guide', href: '/blog/seo-for-retail-nz' },
            { title: 'Retail Marketing Overview', href: '/industries/retail-nz' },
            { title: 'SEO for Ecommerce NZ', href: '/seo-for-ecommerce-nz' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to grow your retail business with SEO?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            We work with a small number of NZ retail clients at any one time. Apply to find out if
            we&apos;re a fit.
          </p>
          <Link href="/apply" className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg">
            Apply to Work With Us
          </Link>
          <p className="text-gray-400 text-sm mt-4">NZ retail businesses only.</p>
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
