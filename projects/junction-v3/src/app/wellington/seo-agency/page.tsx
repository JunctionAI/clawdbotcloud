import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'SEO Agency Wellington | Wellington SEO Company | Junction Media',
  description: 'SEO agency serving Wellington businesses. AI-powered technical SEO, content strategy, and authority building for Wellington CBD, Te Aro, Thorndon and beyond. $1,200–$2,500/mo.',
  keywords: 'SEO agency Wellington, Wellington SEO, SEO company Wellington, SEO services Wellington, Wellington SEO consultant, local SEO Wellington, SEO Wellington NZ, search engine optimisation Wellington',
  openGraph: {
    title: 'SEO Agency Wellington | Junction Media',
    description: 'AI-native SEO for Wellington businesses. Technical SEO, content strategy, and authority building that compounds over time.',
    url: 'https://www.junctionmedia.ai/wellington/seo-agency',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/wellington/seo-agency',
  },
}

const faqs = [
  {
    q: 'How much does SEO cost for a Wellington business?',
    a: 'Wellington SEO pricing at Junction Media ranges from $1,200–$2,500/month NZD depending on scope. $1,200/month covers technical SEO maintenance and 2–3 content pieces per month. $2,500/month adds aggressive authority building and 6–8 content pieces. All engagements are 3-month minimum — Wellington search markets are competitive, and meaningful results take time to build.',
  },
  {
    q: 'Does Wellington have a competitive SEO market?',
    a: 'Wellington is more concentrated than Auckland but highly competitive in government, tech, professional services, and hospitality niches. Local searches like "Wellington lawyer," "IT company Wellington," and "cafe Wellington CBD" all have meaningful competition. The good news: many Wellington businesses haven\'t invested seriously in SEO — which creates real opportunities for those that do.',
  },
  {
    q: 'Do you do local SEO for Wellington suburbs and areas?',
    a: 'Yes — local SEO for Wellington CBD, Te Aro, Thorndon, Newtown, Lambton Quay, Petone, Lower Hutt, and the Kapiti Coast is a core part of our work. Local SEO for Wellington means Google Business Profile optimisation, NZ-relevant citations, local schema markup, and content that signals genuine Wellington relevance to Google.',
  },
  {
    q: 'How is SEO useful for Wellington government and professional services businesses?',
    a: 'Wellington\'s economy is heavily weighted toward government, policy, and professional services. For these sectors, SEO works differently — less about high-volume consumer searches, more about owning niche decision-stage queries and building topical authority in your field. We tailor our approach to match your Wellington audience.',
  },
  {
    q: 'Can you help my Wellington business recover from a Google penalty or ranking drop?',
    a: 'Yes — Google algorithm update impacts and manual actions are both diagnosable and recoverable. Wellington businesses hit by Core Updates in 2024–2026 often have content quality or E-E-A-T issues we can identify and fix. Recovery plans are typically 3–6 months to see full impact after issues are resolved.',
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
        { '@type': 'City', name: 'Wellington' },
        { '@type': 'City', name: 'Auckland' },
      ],
      priceRange: '$$$',
    },
    {
      '@type': 'Service',
      name: 'SEO Agency Wellington',
      provider: {
        '@type': 'Organization',
        name: 'Junction Media',
        url: 'https://www.junctionmedia.ai',
      },
      serviceType: 'Search Engine Optimisation',
      areaServed: {
        '@type': 'City',
        name: 'Wellington',
      },
      description: 'AI-native SEO services for Wellington businesses. Technical SEO, content strategy, and authority building.',
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

export default function WellingtonSEOAgencyPage() {
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
          Wellington · SEO
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          SEO Agency Wellington
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          AI-native SEO for Wellington businesses. Technical foundations, strategic content, and
          authority building that turns organic search into a compounding channel — for Wellington
          CBD businesses, government-adjacent firms, tech companies, and beyond.
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
            { stat: 'Remote-first', label: 'Wellington-ready delivery' },
          ].map((item) => (
            <div key={item.label} className="p-4 border border-gray-100 rounded-2xl text-center">
              <p className="text-2xl font-bold text-gray-900 mb-1">{item.stat}</p>
              <p className="text-xs text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Wellington SEO Context */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">SEO in Wellington: The Opportunity Most Businesses Miss</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            Wellington has a concentrated, highly educated, and digitally engaged population.
            The city&apos;s economic mix — government departments, tech companies, professional services,
            hospitality, and creative industries — creates specific search intent patterns that
            differ significantly from Auckland or Christchurch.
          </p>
          <p className="text-gray-600 leading-relaxed">
            The opportunity: many Wellington businesses have strong offline reputations but weak
            organic search presence. Government and corporate procurement increasingly starts with
            Google research. A Wellington law firm, IT consultancy, or healthcare provider that
            owns the relevant search results has a significant pipeline advantage over competitors
            who don&apos;t invest in SEO.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We work remotely with Wellington clients — full strategy sessions via video, weekly
            updates, and transparent reporting. Geography doesn&apos;t limit the depth of the work.
          </p>
        </div>
      </section>

      {/* What We Do */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">What Wellington SEO Work Includes</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Technical SEO Audit & Fixes',
              desc: 'Crawl errors, Core Web Vitals, schema, internal linking — found and fixed, not just reported. Technical issues suppressing your Wellington rankings are resolved before we build content on top of them.',
            },
            {
              title: 'Local Wellington SEO',
              desc: 'Google Business Profile, Wellington-specific citations (NZ Business Number, local directories), local schema, and suburb-level content for CBD, Te Aro, Thorndon, Newtown, and surrounds.',
            },
            {
              title: 'Content Strategy & Production',
              desc: 'Topical authority mapping built around Wellington search intent. AI-assisted content production — more pieces, better quality, published consistently. Content that actually earns rankings.',
            },
            {
              title: 'Authority Building',
              desc: 'NZ-relevant link acquisition from Wellington media, industry associations, and business networks. White-hat, sustainable — no link schemes. Authority that Google rewards long-term.',
            },
            {
              title: 'On-Page Optimisation',
              desc: 'Every priority Wellington page optimised: title tags, meta descriptions, headers, internal links, and content structure — all aligned to current Google ranking signals.',
            },
            {
              title: 'Monthly Reporting',
              desc: 'Plain-English reporting every month: rankings, traffic, leads from organic, content published, links built, and next month\'s plan. No hiding behind vanity metrics.',
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
            SEO, content, and customer support. 30% above their previous all-time record in
            month one of the engagement.
          </p>
        </div>
      </section>

      {/* Wellington Areas */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Wellington Areas We Cover</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            'Wellington CBD', 'Te Aro', 'Thorndon',
            'Newtown', 'Lambton Quay', 'Petone',
            'Lower Hutt', 'Upper Hutt', 'Kapiti Coast',
          ].map((area) => (
            <div key={area} className="p-3 border border-gray-100 rounded-xl text-sm text-gray-700 text-center">
              {area}
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
            { title: 'SEO Agency Wellington — Blog', href: '/blog/seo-agency-wellington' },
            { title: 'SEO Services NZ — Full Overview', href: '/services/seo-nz' },
            { title: 'Wellington Marketing Hub', href: '/wellington' },
            { title: 'Google Ads Agency Wellington', href: '/wellington/google-ads-agency' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to own Wellington search results?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            If you&apos;re a Wellington business serious about turning organic search into a real
            acquisition channel — apply below. We review every application.
          </p>
          <Link
            href="/apply"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg"
          >
            Apply to Work With Us
          </Link>
          <p className="text-gray-400 text-sm mt-4">Wellington & NZ businesses. 3–5 client spots.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2026 Junction Media. Auckland, New Zealand.</p>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Home</Link>
            <Link href="/wellington" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Wellington</Link>
            <Link href="/services/seo-nz" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">SEO NZ</Link>
            <Link href="/apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
