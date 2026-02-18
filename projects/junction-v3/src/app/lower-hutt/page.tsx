import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Lower Hutt Marketing Agency | AI-Native Marketing | Junction Media',
  description: 'Lower Hutt marketing agency specialising in AI-native marketing systems. Junction Media helps Lower Hutt and Wellington metro businesses in tech, innovation, and professional services grow faster.',
  keywords: 'Lower Hutt marketing agency, marketing agency Lower Hutt, digital marketing Lower Hutt, marketing consultant Lower Hutt, Lower Hutt SEO, Wellington marketing agency, Hutt Valley marketing',
  openGraph: {
    title: 'Lower Hutt Marketing Agency | Junction Media',
    description: 'AI-native marketing for Lower Hutt and the Wellington metro. Tech, innovation, professional services — we build marketing systems that compound.',
    url: 'https://www.junctionmedia.ai/lower-hutt',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/lower-hutt',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Junction Media — Lower Hutt Marketing Agency',
  description: 'AI-native marketing agency serving Lower Hutt and the Wellington metro. Specialists in tech, innovation, manufacturing, and professional services marketing.',
  url: 'https://www.junctionmedia.ai/lower-hutt',
  areaServed: [
    { '@type': 'City', name: 'Lower Hutt' },
    { '@type': 'Place', name: 'Hutt Valley' },
    { '@type': 'City', name: 'Wellington' },
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

export default function LowerHuttPage() {
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
          Lower Hutt, Wellington Metro
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Lower Hutt Marketing Agency<br />
          <span className="text-gray-500">For Tech & Innovation Leaders</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          Junction Media is an AI-native marketing agency working with Lower Hutt and Wellington
          metro businesses in tech, innovation, manufacturing, and professional services.
          We build marketing systems that compound — so you&apos;re not starting from zero
          every quarter.
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
        <h2 className="text-2xl font-bold mb-8">Marketing Services for Lower Hutt Businesses</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Fractional CMO',
              link: '/services/fractional-cmo',
              desc: 'Senior marketing leadership for tech and innovation businesses. We own the marketing function, drive strategy, and build the systems that scale.',
            },
            {
              title: 'AI Marketing Systems',
              link: '/services/ai-marketing-systems',
              desc: 'AI-powered content, SEO, ads, and reporting built for B2B and SaaS businesses. Compound your marketing instead of repeating the same campaigns.',
            },
            {
              title: 'SEO & Content Strategy',
              link: '/services/seo-nz',
              desc: 'Rank for Lower Hutt, Wellington metro, and national search terms. Authority-building SEO for tech, professional services, and manufacturing businesses.',
            },
            {
              title: 'Google & Meta Ads',
              link: '/services/google-ads-nz',
              desc: 'Performance advertising built around your pipeline. B2B lead generation, SaaS trials, or direct sales — we build campaigns that convert.',
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

      {/* Why Lower Hutt */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Why Lower Hutt Businesses Work With Us</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            Lower Hutt is one of New Zealand&apos;s most underrated business cities. It sits at the
            centre of the Wellington metro — connected to the capital&apos;s government and
            professional services economy, but with a distinct industrial and innovation
            identity of its own. Callaghan Innovation is headquartered here. GNS Science, Hutt
            City Council&apos;s innovation precinct, and a cluster of advanced manufacturing and
            tech businesses make Lower Hutt one of the country&apos;s more interesting B2B markets.
          </p>
          <p className="text-gray-600 leading-relaxed">
            The marketing challenge for Lower Hutt tech and innovation businesses is often
            the same: they&apos;re genuinely sophisticated operators who haven&apos;t invested in
            marketing to match. A defence technology supplier, a SaaS company, or an
            advanced manufacturer in Lower Hutt often competes nationally or internationally
            — but their online presence suggests otherwise.
          </p>
          <p className="text-gray-600 leading-relaxed">
            AI-native marketing systems close that gap. They allow lean teams to produce
            high-quality content, run targeted B2B campaigns, and build the credibility
            signals — SEO authority, thought leadership, case studies — that enterprise
            buyers look for before engaging.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We work with a small number of clients at a time. Lower Hutt businesses get
            direct senior attention — not a junior account manager. We understand B2B
            marketing, long sales cycles, and how to build trust with sophisticated buyers.
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
              q: 'Do you work with tech and SaaS businesses?',
              a: 'Yes — B2B tech, SaaS, professional services, and advanced manufacturing are core markets for us. We understand long sales cycles and how to build pipeline through content, SEO, and targeted ads.',
            },
            {
              q: 'Do you work in person in Lower Hutt?',
              a: 'Our work is primarily remote via video calls and shared systems. Wellington metro is easy to reach when in-person makes sense — but most of the value we deliver happens asynchronously.',
            },
            {
              q: 'How is this different from a Wellington marketing agency?',
              a: 'We combine senior strategy with AI-powered execution. You get a fractional CMO level of thinking without paying for a large agency overhead — and we work with a small number of clients, so you get direct attention.',
            },
            {
              q: 'What\'s the minimum commitment?',
              a: 'We work in 3-month minimum engagements. B2B marketing especially requires time to build — pipeline, content authority, and brand credibility don\'t happen in 30 days.',
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
            We&apos;re selective about who we work with. If you&apos;re a Lower Hutt or Wellington metro
            business serious about building AI-native marketing — apply below.
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
