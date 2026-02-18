import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Whanganui Marketing Agency | AI-Native Marketing | Junction Media',
  description: 'Whanganui marketing agency specialising in AI-native marketing systems. Junction Media helps Whanganui businesses in manufacturing, tourism, and regional industries grow with smarter marketing.',
  keywords: 'Whanganui marketing agency, marketing agency Whanganui, digital marketing Whanganui, marketing consultant Whanganui, Whanganui SEO, Whanganui advertising, regional marketing NZ',
  openGraph: {
    title: 'Whanganui Marketing Agency | Junction Media',
    description: 'AI-native marketing for Whanganui and Manawatū-Whanganui businesses. Manufacturing, tourism, retail — we build marketing systems that compound.',
    url: 'https://www.junctionmedia.ai/whanganui',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/whanganui',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Junction Media — Whanganui Marketing Agency',
  description: 'AI-native marketing agency serving Whanganui and the Manawatū-Whanganui region. Specialists in manufacturing, tourism, and regional business marketing.',
  url: 'https://www.junctionmedia.ai/whanganui',
  areaServed: [
    { '@type': 'City', name: 'Whanganui' },
    { '@type': 'AdministrativeArea', name: 'Manawatū-Whanganui' },
  ],
  serviceType: [
    'Marketing Strategy',
    'AI Marketing Systems',
    'SEO',
    'Google Ads',
    'Meta Ads',
    'Fractional CMO',
  ],
  priceRange: '$$',
}

export default function WhanganuilPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Navigation */}
      <nav className="px-6 py-5 border-b border-gray-100 flex items-center justify-between max-w-5xl mx-auto">
        <Link href="/" className="font-medium text-gray-900 hover:text-gray-600 transition-colors">
          Junction Media
        </Link>
        <Link
          href="/#apply"
          className="text-sm bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors"
        >
          Apply to Work With Me
        </Link>
      </nav>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-16">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
          Whanganui, Manawatū-Whanganui
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Whanganui Marketing Agency<br />
          <span className="text-gray-500">Built for Regional Business</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          Junction Media is an AI-native marketing agency working with Whanganui businesses in
          manufacturing, tourism, and regional industries. We build marketing systems that
          compound over time — not campaigns that stop when the budget runs out.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/#apply"
            className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors text-center"
          >
            Apply to Work With Me
          </Link>
          <Link
            href="/blog"
            className="inline-block border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:border-gray-500 transition-colors text-center"
          >
            Read the Blog
          </Link>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">Marketing Services for Whanganui Businesses</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Fractional CMO',
              link: '/services/fractional-cmo',
              desc: 'Senior marketing leadership without the full-time cost. We embed in your business, own the marketing function, and drive measurable results.',
            },
            {
              title: 'AI Marketing Systems',
              link: '/services/ai-marketing-systems',
              desc: 'AI-powered content, SEO, ads, and reporting built to run at scale — so your marketing compounds instead of stalling.',
            },
            {
              title: 'Local & Regional SEO',
              link: '/services/seo-nz',
              desc: 'Rank for Whanganui and regional search terms. AI-native SEO infrastructure that builds lasting organic visibility.',
            },
            {
              title: 'Google & Meta Ads',
              link: '/services/google-ads-nz',
              desc: 'Paid advertising built around your margins and your market — whether you\'re targeting Whanganui locals or national buyers.',
            },
          ].map((service) => (
            <Link
              key={service.title}
              href={service.link ?? '/#apply'}
              className="p-6 border border-gray-100 rounded-2xl hover:border-gray-400 transition-colors block"
            >
              <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{service.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Whanganui */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Why Whanganui Businesses Work With Us</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            Whanganui sits at the heart of the Manawatū-Whanganui region — one of New Zealand&apos;s
            most underestimated economic zones. The city has a strong manufacturing base, a
            growing creative economy, a significant tourism sector centred on the Whanganui River
            and its national park, and agriculture stretching across the wider region.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Regional businesses face a distinct marketing challenge: they often have genuine
            quality and deep local knowledge, but lack the marketing infrastructure to communicate
            that effectively to wider audiences. A Whanganui manufacturer competing for national
            contracts, or a tourism operator trying to reach international visitors, needs
            marketing that punches above its weight.
          </p>
          <p className="text-gray-600 leading-relaxed">
            AI-native marketing systems solve this. They allow Whanganui businesses to produce
            high-quality content at scale, run sophisticated ad campaigns without a large team,
            and build the online presence that turns a great product or service into a known brand.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We work with a small number of clients at a time. Whanganui businesses we work with
            get direct senior attention — not a junior account manager who rotates every six months.
          </p>
        </div>
      </section>

      {/* Result */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">A Result Worth Mentioning</h2>
        <div className="bg-gray-50 rounded-2xl p-8">
          <p className="text-3xl font-bold text-gray-900 mb-2">+30%</p>
          <p className="text-gray-500 text-sm mb-4">Above previous store record</p>
          <p className="text-gray-600 leading-relaxed">
            Deep Blue Health — a New Zealand supplement brand — hit their best revenue month ever
            in November 2025. We built AI-native marketing systems across Google Ads, Meta Ads,
            SEO, content, and customer support. That was the result: 30% above their previous
            all-time record.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">Common Questions</h2>
        <div className="space-y-8">
          {[
            {
              q: 'Do you work with Whanganui businesses remotely?',
              a: 'Yes — our work is primarily remote via video calls and shared systems. Location isn\'t a barrier for modern marketing strategy. When in-person makes sense, we can arrange it.',
            },
            {
              q: 'What industries do you work with in Whanganui?',
              a: 'Manufacturing, tourism and hospitality, professional services, agriculture, and retail. If your business has genuine quality and needs help communicating it at scale, we can likely help.',
            },
            {
              q: 'How is this different from a local Whanganui marketing agency?',
              a: 'We work with a small number of clients at a time and use AI systems for execution — so you get senior strategy without paying for a large agency overhead. Think fractional CMO with an AI team behind it.',
            },
            {
              q: 'What\'s the minimum commitment?',
              a: 'We work in 3-month minimum engagements. Marketing compounds over time — short sprints don\'t build the systems that actually change a business.',
            },
          ].map((faq) => (
            <div key={faq.q}>
              <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
              <p className="text-gray-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 py-20 border-t border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to build something real?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            We&apos;re selective about who we work with. If you&apos;re a Whanganui business serious
            about building AI-native marketing — apply below.
          </p>
          <Link
            href="/#apply"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg"
          >
            Apply to Work With Me
          </Link>
          <p className="text-gray-400 text-sm mt-4">Spots are limited. Serious enquiries only.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2026 Junction Media. Auckland, New Zealand.</p>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Home</Link>
            <Link href="/blog" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Blog</Link>
            <Link href="/#apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
