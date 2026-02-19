import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Social Media for Ecommerce NZ — Instagram, TikTok & Facebook That Drives Sales | Junction Media',
  description: 'Specialist social media management for NZ ecommerce stores. Content strategy, community management, and organic social that builds brand and drives revenue — not just followers.',
  keywords: 'social media for ecommerce nz, ecommerce social media nz, instagram ecommerce nz, tiktok ecommerce nz, social media management ecommerce nz, ecommerce content nz',
  openGraph: {
    title: 'Social Media for Ecommerce NZ | Junction Media',
    description: 'Social media management built for NZ ecommerce — Instagram, TikTok, and Facebook content that drives actual sales.',
    url: 'https://www.junctionmedia.ai/social-media-for-ecommerce-nz',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/social-media-for-ecommerce-nz',
  },
}

const painPoints = [
  {
    title: 'Follower counts don\'t pay the rent — social media must drive revenue',
    desc: 'Most NZ ecommerce brands measure social media by engagement and follower growth. The brands scaling past $2M measure it by attributed revenue, email list growth, and returning customer rate. Social media for ecommerce needs a commerce-first content strategy — every piece of content should have a path to purchase.',
  },
  {
    title: 'NZ ecommerce brands need content volume that one person can\'t sustain',
    desc: 'In 2026, staying algorithm-relevant across Instagram, TikTok, and Facebook requires 10–15 pieces of content per week across formats — Reels, carousels, Stories, UGC-style videos, product demos. A single social media manager can\'t produce this volume at quality without AI assistance. Most NZ ecommerce brands are underpowered on content output.',
  },
  {
    title: 'Without strategy, social media is the most expensive way to build brand',
    desc: 'Random posting — whatever comes to mind, whenever someone has time — burns hours without building anything. Social media for ecommerce needs a clear content calendar, a defined brand voice, product launch cadences, seasonal campaigns, and a system that turns content into customers.',
  },
]

const approach = [
  {
    title: 'Commerce-First Content Strategy',
    desc: 'Every content pillar mapped to a commercial outcome — brand awareness, product discovery, social proof, or direct purchase intent. Your social media becomes a sales asset, not just a marketing obligation.',
  },
  {
    title: 'AI-Accelerated Content Production',
    desc: 'We use AI to scale content volume without sacrificing quality. Product descriptions become captions, blog posts become carousel series, customer reviews become social proof videos. More content, faster, with consistent brand voice.',
  },
  {
    title: 'Platform-Specific Execution',
    desc: 'What works on TikTok doesn\'t work on Instagram. What works for Instagram Reels doesn\'t work for Facebook. We build platform-native content strategies for each channel, optimised for NZ audiences and NZ ecommerce buying behaviour.',
  },
  {
    title: 'Social Commerce & Shoppable Content',
    desc: 'Instagram Shopping, TikTok Shop, Facebook Shops — we set up and optimise the social commerce infrastructure that turns scrollers into buyers without leaving the app. Reducing friction at every step of the purchase journey.',
  },
]

const results = [
  { stat: '10–15x', label: 'Content output vs unmanaged accounts' },
  { stat: '3–6mo', label: 'To significant organic reach growth' },
  { stat: '100%', label: 'Revenue-attributed social strategy' },
  { stat: 'NZ-first', label: 'Audience and content approach' },
]

const faqs = [
  {
    q: 'Which social platforms should NZ ecommerce brands focus on?',
    a: 'It depends on your product category and customer demographic. For fashion, beauty, and lifestyle brands targeting under-35s, TikTok and Instagram are highest priority. For home goods and broader audiences, Facebook and Instagram Shopping. For B2C brands with repeat purchase cycles, Instagram and email work together most effectively. We assess and recommend based on your specific category and audience.',
  },
  {
    q: 'How does social media work alongside paid Meta Ads?',
    a: 'Organic social and paid Meta Ads are most powerful together. Organic content builds brand trust and gives the algorithm social proof signals. Paid ads amplify the best-performing organic content to cold audiences and run retargeting campaigns. High-quality organic content also feeds your paid ad creative library — reducing production costs significantly.',
  },
  {
    q: 'Can social media drive actual revenue, not just awareness?',
    a: 'Yes — but only with the right strategy. The ecommerce brands we work with in Auckland, Wellington, and Christchurch see social media drive 15–30% of their revenue when organic social is combined with social commerce infrastructure, email capture from social, and cohesive paid amplification.',
  },
]

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Junction Media',
    url: 'https://www.junctionmedia.ai',
    description: 'Social media agency specialising in ecommerce brands across New Zealand.',
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
      { '@type': 'ListItem', position: 2, name: 'Social Media for Ecommerce NZ', item: 'https://www.junctionmedia.ai/social-media-for-ecommerce-nz' },
    ],
  },
]

export default function SocialMediaForEcommerceNZ() {
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
          Service + Industry · Social Media for Ecommerce NZ
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Social Media for<br />
          <span className="text-gray-500">Ecommerce NZ</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          Social media for NZ ecommerce brands should build brand, drive product discovery, and
          convert scrollers into buyers. We manage Instagram, TikTok, and Facebook for NZ ecommerce
          stores with a commerce-first strategy — using AI to scale content production and social
          commerce infrastructure to close the loop from content to checkout.
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

      {/* Why */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">Why Most NZ Ecommerce Social Media Underperforms</h2>
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
        <h2 className="text-2xl font-bold mb-4">Our Ecommerce Social Media Approach</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          We build social media systems for NZ ecommerce brands — not just post schedules. Every
          element is designed to drive commercial outcomes: brand building, audience growth, product
          discovery, and revenue attribution.
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
            { title: 'Social Media for Ecommerce NZ — Full Guide', href: '/blog/social-media-for-ecommerce-nz' },
            { title: 'Ecommerce Marketing Overview', href: '/industries/ecommerce-nz' },
            { title: 'Meta Ads for Ecommerce NZ', href: '/meta-ads-for-ecommerce-nz' },
            { title: 'Social Media Services NZ', href: '/services/social-media-nz' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to turn social media into a sales channel?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            We work with a small number of NZ ecommerce clients at any one time. Apply to find out
            if we&apos;re a fit.
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
