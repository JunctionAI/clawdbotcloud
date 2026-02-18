import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Gisborne Marketing Agency | AI-Native Marketing | Junction Media',
  description: 'Gisborne marketing agency specialising in AI-native marketing systems. Junction Media helps Gisborne businesses in wine, horticulture, and East Coast industries grow with smarter marketing.',
  keywords: 'Gisborne marketing agency, marketing agency Gisborne, digital marketing Gisborne, marketing consultant Gisborne, Gisborne SEO, Gisborne wine marketing, East Coast NZ marketing',
  openGraph: {
    title: 'Gisborne Marketing Agency | Junction Media',
    description: 'AI-native marketing for Gisborne and East Coast NZ businesses. Wine, horticulture, tourism — we build marketing systems that compound.',
    url: 'https://www.junctionmedia.ai/gisborne',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/gisborne',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Junction Media — Gisborne Marketing Agency',
  description: 'AI-native marketing agency serving Gisborne and the East Coast of New Zealand. Specialists in wine, horticulture, tourism, and regional business marketing.',
  url: 'https://www.junctionmedia.ai/gisborne',
  areaServed: [
    { '@type': 'City', name: 'Gisborne' },
    { '@type': 'AdministrativeArea', name: 'Gisborne District' },
    { '@type': 'Place', name: 'East Coast New Zealand' },
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

export default function GisbornePage() {
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
          Gisborne, East Coast New Zealand
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Gisborne Marketing Agency<br />
          <span className="text-gray-500">East Coast, World-Class Results</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          Junction Media is an AI-native marketing agency working with Gisborne businesses in
          wine, horticulture, tourism, and East Coast industries. We build marketing systems
          that compound over time — so your brand grows whether you&apos;re targeting locals,
          domestic visitors, or international markets.
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
        <h2 className="text-2xl font-bold mb-8">Marketing Services for Gisborne Businesses</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Fractional CMO',
              link: '/services/fractional-cmo',
              desc: 'Senior marketing leadership without the full-time cost. We own the marketing function, set strategy, and drive results — embedded in your business.',
            },
            {
              title: 'AI Marketing Systems',
              link: '/services/ai-marketing-systems',
              desc: 'AI-powered content, SEO, ads, and reporting built to run at scale — ideal for wine, horticulture, and agribusiness brands competing nationally or internationally.',
            },
            {
              title: 'Local & Regional SEO',
              link: '/services/seo-nz',
              desc: 'Rank for Gisborne and East Coast search terms. AI-native SEO infrastructure that builds lasting organic visibility for your category.',
            },
            {
              title: 'Google & Meta Ads',
              link: '/services/google-ads-nz',
              desc: 'Paid advertising built around your margins — whether you\'re selling wine direct-to-consumer, filling accommodation, or marketing B2B agribusiness services.',
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

      {/* Why Gisborne */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Why Gisborne Businesses Work With Us</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            Gisborne is one of New Zealand&apos;s most distinct regional economies. It&apos;s the first
            city in the world to see the sunrise — a genuine brand asset that the region has
            barely scratched the surface of. It&apos;s also home to some of New Zealand&apos;s finest
            Chardonnay and Gewürztraminer wine, a significant horticulture sector (including
            a large share of New Zealand&apos;s apple and kiwifruit production), and a tourism
            economy with real international potential.
          </p>
          <p className="text-gray-600 leading-relaxed">
            The challenge for Gisborne businesses is reach. The city is geographically isolated
            — it&apos;s the most remote city of its size in the country — which means digital
            marketing isn&apos;t optional. It&apos;s how Gisborne producers sell their wine to Auckland
            restaurants, how tourism operators attract visitors from overseas, and how agribusiness
            companies win national contracts.
          </p>
          <p className="text-gray-600 leading-relaxed">
            AI-native marketing systems are built for exactly this situation. They allow small
            regional teams to produce high-quality content at scale, run sophisticated ad
            campaigns without a large internal team, and build the kind of online presence
            that makes geography irrelevant.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We work with a small number of clients at a time. Gisborne businesses we work with
            get direct senior attention — and marketing built around their specific industry,
            buyer, and growth ambition.
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
              q: 'Do you work with Gisborne businesses remotely?',
              a: 'Yes — our work happens remotely via video calls and shared systems. Gisborne\'s geographic isolation makes remote-first marketing support especially valuable.',
            },
            {
              q: 'Do you work with wine or horticulture businesses?',
              a: 'Yes. We work with producers, exporters, and agribusiness services businesses. Whether you\'re selling direct-to-consumer, to wholesale buyers, or building an export brand, we can build the marketing infrastructure that supports it.',
            },
            {
              q: 'How is this different from a local Gisborne marketing agency?',
              a: 'We combine senior strategy with AI-powered execution — so you get the rigour of a fractional CMO without paying for a large agency team. We work with a small number of clients and give each one direct attention.',
            },
            {
              q: 'What\'s the minimum commitment?',
              a: 'We work in 3-month minimum engagements. Building marketing systems that compound takes time — short sprints don\'t move the needle.',
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
            We&apos;re selective about who we work with. If you&apos;re a Gisborne business serious
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
