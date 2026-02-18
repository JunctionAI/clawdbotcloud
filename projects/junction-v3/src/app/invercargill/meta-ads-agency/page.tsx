import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Meta Ads Agency Invercargill | Facebook & Instagram Ads Southland | Junction Media',
  description: 'Meta Ads agency serving Invercargill businesses. AI-powered Facebook and Instagram advertising for Southland retail, hospitality, trades, and local services. $1,500–$3,500/mo.',
  keywords: 'Meta Ads agency Invercargill, Facebook Ads Invercargill, Instagram Ads Invercargill, Facebook advertising Southland, Meta advertising Invercargill, paid social Invercargill NZ',
  openGraph: {
    title: 'Meta Ads Agency Invercargill | Junction Media',
    description: 'AI-native Meta Ads (Facebook & Instagram) for Invercargill and Southland businesses. Creative testing, audience strategy, and ROAS-focused management.',
    url: 'https://www.junctionmedia.ai/invercargill/meta-ads-agency',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/invercargill/meta-ads-agency',
  },
}

const faqs = [
  {
    q: 'How much does Meta Ads management cost for an Invercargill business?',
    a: 'Meta Ads management at Junction Media ranges from $1,500–$3,500/month NZD. $1,500/month covers campaign management and weekly creative testing for ad budgets up to $3,000/month. All engagements are 3-month minimum.',
  },
  {
    q: 'Is Meta advertising worth it for Invercargill businesses?',
    a: 'Yes — Facebook and Instagram are used extensively across Southland. For retail, hospitality, consumer services, and trades businesses in Invercargill, Meta Ads reaches local audiences effectively. The combination of low competition and strong community engagement on Facebook makes Southland a solid Meta market.',
  },
  {
    q: 'What Invercargill industries do you run Meta Ads for?',
    a: 'We run Meta Ads for Invercargill retail, hospitality, food and beverage, healthcare, professional services, trades, fitness and wellness, and consumer-facing businesses targeting the Southland community. Agricultural businesses seeking national reach also benefit from Meta\'s broad targeting capabilities.',
  },
  {
    q: 'How do you approach creative for Invercargill Meta campaigns?',
    a: 'Creative is the primary performance variable. We test 5–10 creative variants per week, use Southland-specific contexts and community hooks, and rapidly scale what outperforms. Strong local identity and community pride in Invercargill can be powerful creative assets.',
  },
  {
    q: 'Can Meta Ads reach the wider Southland farming community?',
    a: 'Yes — Meta\'s interest and demographic targeting allows us to reach farming families, agricultural workers, and rural Southland audiences. Geographic radius targeting extends reach to Gore, Winton, Riverton, and surrounding communities.',
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
        { '@type': 'City', name: 'Invercargill' },
        { '@type': 'City', name: 'Auckland' },
      ],
      priceRange: '$$$',
    },
    {
      '@type': 'Service',
      name: 'Meta Ads Agency Invercargill',
      provider: {
        '@type': 'Organization',
        name: 'Junction Media',
        url: 'https://www.junctionmedia.ai',
      },
      serviceType: 'Meta Ads / Facebook & Instagram Advertising',
      areaServed: { '@type': 'City', name: 'Invercargill' },
      description: 'AI-native Meta Ads management for Invercargill and Southland businesses. Creative testing, audience strategy, and ROAS-focused Facebook and Instagram advertising.',
      offers: {
        '@type': 'Offer',
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: '1500',
          maxPrice: '3500',
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

export default function InvercargillMetaAdsAgencyPage() {
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
        <Link href="/apply" className="text-sm bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors">
          Apply to Work With Us
        </Link>
      </nav>

      <section className="max-w-3xl mx-auto px-6 pt-20 pb-16">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Invercargill · Meta Ads</p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Meta Ads Agency Invercargill
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          AI-native Facebook and Instagram advertising for Invercargill businesses. We build
          creative-led Meta campaigns that reach your ideal customers across the Southland community —
          and optimise relentlessly until your ROAS compounds.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/apply" className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors text-center">
            Apply to Work With Us
          </Link>
          <Link href="/services/meta-ads-nz" className="inline-block border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:border-gray-500 transition-colors text-center">
            View Meta Ads Services
          </Link>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-12 border-t border-gray-100">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { stat: '$1.5k–$3.5k', label: 'Management fee /month NZD' },
            { stat: '5–10', label: 'Creative variants tested weekly' },
            { stat: '+30%', label: 'DBH sales record (month 1)' },
            { stat: '3-month', label: 'Minimum engagement' },
          ].map((item) => (
            <div key={item.label} className="p-4 border border-gray-100 rounded-2xl text-center">
              <p className="text-2xl font-bold text-gray-900 mb-1">{item.stat}</p>
              <p className="text-xs text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Meta Ads in Invercargill: Community-First Advertising</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            Invercargill has a strong sense of community identity — hard-working, resilient,
            locally proud. Facebook in particular is deeply embedded in how Southland communities
            stay connected, discover local businesses, and make purchasing decisions. For businesses
            here, Meta Ads offers direct access to this audience.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Meta advertising in Invercargill is relatively uncrowded. Most local businesses haven&apos;t
            invested seriously in structured Facebook or Instagram campaigns — creating a real
            advantage for early movers who build consistent, creative-led advertising systems.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We run structured creative testing programmes — 5–10 variants per week — learning what
            resonates with the Southland audience and scaling winning ads aggressively.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">What Our Invercargill Meta Ads Management Includes</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Campaign Strategy & Structure',
              desc: 'Awareness, consideration, and conversion campaigns for the full Invercargill customer journey. Prospecting and retargeting layered appropriately.',
            },
            {
              title: 'Creative Testing Programme',
              desc: 'Weekly creative testing: static, video, carousel. Southland-specific hooks and local community contexts. Rapid scaling of what outperforms.',
            },
            {
              title: 'Audience Strategy',
              desc: 'Invercargill local targeting combined with Southland regional and interest-based audiences. Lookalike audiences built from your existing customers.',
            },
            {
              title: 'Pixel & Conversion API Setup',
              desc: 'Meta Pixel and Conversions API configured correctly from day one. Accurate tracking drives better algorithm performance and cleaner reporting.',
            },
            {
              title: 'Budget Optimisation',
              desc: 'Dynamic budget allocation into what is working. Spend scales toward winning campaigns — not evenly distributed regardless of performance.',
            },
            {
              title: 'Weekly Reporting',
              desc: 'Reach, clicks, cost-per-lead, ROAS, creative winners, and what we test next. Plain English. Revenue-connected.',
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
            Deep Blue Health hit their best revenue month ever in November 2025. Meta Ads was a
            core component of the integrated system we built — 30% above their previous all-time
            record in month one.
          </p>
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
            { title: 'Meta Ads Invercargill — Blog', href: '/blog/meta-ads-invercargill' },
            { title: 'Meta Ads Services NZ', href: '/services/meta-ads-nz' },
            { title: 'Invercargill Marketing Hub', href: '/invercargill' },
            { title: 'Google Ads Agency Invercargill', href: '/invercargill/google-ads-agency' },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="p-4 border border-gray-100 rounded-xl hover:border-gray-300 transition-colors text-sm font-medium text-gray-700 hover:text-gray-900">
              {link.title} →
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-20 border-t border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to grow your Invercargill business with Meta Ads?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            Apply below. We work with select Invercargill and Southland businesses ready to invest
            seriously in paid social advertising.
          </p>
          <Link href="/apply" className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg">
            Apply to Work With Us
          </Link>
          <p className="text-gray-400 text-sm mt-4">Limited client spots. NZ businesses only.</p>
        </div>
      </section>

      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2026 Junction Media. Auckland, New Zealand.</p>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Home</Link>
            <Link href="/invercargill" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Invercargill</Link>
            <Link href="/services/meta-ads-nz" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Meta Ads NZ</Link>
            <Link href="/apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
