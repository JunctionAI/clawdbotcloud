import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Google Ads Agency Christchurch | Christchurch PPC Agency | Junction Media',
  description: 'Google Ads agency serving Christchurch businesses. AI-powered PPC management for Christchurch CBD, Riccarton, Sydenham and across Canterbury. $1,500–$3,500/mo.',
  keywords: 'Google Ads agency Christchurch, PPC agency Christchurch, Google Ads Christchurch, Google AdWords Christchurch, paid search Christchurch, SEM agency Christchurch, Christchurch Google advertising, PPC management Christchurch NZ',
  openGraph: {
    title: 'Google Ads Agency Christchurch | Junction Media',
    description: 'AI-native Google Ads management for Christchurch businesses. Search, Shopping, and Performance Max campaigns that deliver qualified leads and measurable ROAS.',
    url: 'https://www.junctionmedia.ai/christchurch/google-ads-agency',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/christchurch/google-ads-agency',
  },
}

const faqs = [
  {
    q: 'How much does Google Ads management cost for a Christchurch business?',
    a: 'Google Ads management at Junction Media ranges from $1,500–$3,500/month NZD depending on scope and ad spend. $1,500/month covers Search campaign management, weekly optimisation, and reporting for ad budgets up to ~$3,000/month. $3,500/month adds Shopping or Performance Max, competitor conquest campaigns, and higher ad spend management. All engagements are 3-month minimum — Christchurch Google Ads accounts need proper data before optimisation decisions compound.',
  },
  {
    q: 'Is Google Ads competitive in Christchurch compared to Auckland?',
    a: 'Christchurch CPCs are generally lower than Auckland — which is actually a significant opportunity for Christchurch businesses that invest properly. The Canterbury market is large enough to justify serious Google Ads spend, and the competition in many niches (construction, trades, professional services, healthcare, retail) isn\'t as sophisticated as Auckland. Christchurch businesses that run well-managed Google Ads campaigns often see better ROAS than equivalent Auckland campaigns.',
  },
  {
    q: 'What Christchurch industries do you run Google Ads for?',
    a: 'We run Google Ads for Christchurch construction and trades businesses, professional services (law, accounting, consulting), healthcare and allied health, hospitality, retail, education, and ecommerce. Christchurch\'s rebuild-era economy has created strong demand signals in construction, property, and infrastructure-adjacent sectors — all high-value Google Ads categories.',
  },
  {
    q: 'Do you target specific Christchurch suburbs in Google Ads campaigns?',
    a: 'Yes — Google Ads location targeting allows suburb and postcode-level Christchurch targeting. We use this for service businesses that operate within a specific radius, retail stores in Christchurch locations like Riccarton Mall or The Palms, and hospitality businesses targeting nearby residential areas. Location bid adjustments ensure your budget goes toward the Christchurch areas that convert best for your business.',
  },
  {
    q: 'How long before Google Ads starts working for my Christchurch business?',
    a: 'Initial results from Christchurch Google Ads typically appear in the first 2–4 weeks as campaigns collect data and optimise. Meaningful ROAS improvements take 6–10 weeks as the algorithm learns your best converting traffic. Our 3-month minimum exists for this reason — the best results come in months 2 and 3 as bidding, targeting, and ad copy compound from accumulated data.',
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
        { '@type': 'City', name: 'Christchurch' },
        { '@type': 'City', name: 'Auckland' },
      ],
      priceRange: '$$$',
    },
    {
      '@type': 'Service',
      name: 'Google Ads Agency Christchurch',
      provider: {
        '@type': 'Organization',
        name: 'Junction Media',
        url: 'https://www.junctionmedia.ai',
      },
      serviceType: 'Google Ads Management (PPC)',
      areaServed: {
        '@type': 'City',
        name: 'Christchurch',
      },
      description: 'AI-native Google Ads management for Christchurch businesses. Search, Shopping, and Performance Max campaigns with transparent ROAS reporting.',
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
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    },
  ],
}

export default function ChristchurchGoogleAdsAgencyPage() {
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
          Christchurch · Google Ads
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Google Ads Agency Christchurch
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          AI-native Google Ads management for Christchurch businesses. Search, Shopping, and Performance
          Max campaigns that put your business in front of Canterbury customers at the exact moment
          they&apos;re ready to buy — with transparent ROAS that justifies every dollar.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/apply"
            className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors text-center"
          >
            Apply to Work With Us
          </Link>
          <Link
            href="/services/google-ads-nz"
            className="inline-block border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:border-gray-500 transition-colors text-center"
          >
            View Google Ads Services
          </Link>
        </div>
      </section>

      {/* Key Numbers */}
      <section className="max-w-3xl mx-auto px-6 py-12 border-t border-gray-100">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { stat: '$1.5k–$3.5k', label: 'Per month NZD' },
            { stat: '3-month', label: 'Minimum engagement' },
            { stat: '+30%', label: 'DBH sales record (month 1)' },
            { stat: 'Remote-first', label: 'Christchurch-ready delivery' },
          ].map((item) => (
            <div key={item.label} className="p-4 border border-gray-100 rounded-2xl text-center">
              <p className="text-2xl font-bold text-gray-900 mb-1">{item.stat}</p>
              <p className="text-xs text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Christchurch Google Ads Context */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Google Ads in Christchurch: The Canterbury Market Opportunity</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            Christchurch is New Zealand&apos;s second-largest city and one of the country&apos;s fastest-growing
            economies. The post-earthquake rebuild has transformed the CBD and created sustained demand
            across construction, property, professional services, and infrastructure. A city reinventing
            itself is a city full of businesses searching for services on Google.
          </p>
          <p className="text-gray-600 leading-relaxed">
            The Google Ads opportunity in Christchurch is real: lower average CPCs than Auckland in
            most categories, a local market large enough to support serious ad spend, and a business
            community where many operators haven&apos;t yet invested in professionally managed PPC.
            The Christchurch businesses running well-structured Google Ads are capturing search demand
            that competitors are simply missing.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We work remotely with Christchurch clients — video strategy sessions, weekly updates,
            and full account transparency. You never need to wonder what&apos;s happening with your
            Christchurch Google Ads account.
          </p>
        </div>
      </section>

      {/* What We Do */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">What Christchurch Google Ads Work Includes</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Search Campaign Management',
              desc: 'Keyword research specific to Christchurch and Canterbury search behaviour, match type strategy, negative keyword management, and ad copy testing. Built to capture high-intent searches from people actively looking for what you offer.',
            },
            {
              title: 'Shopping & Performance Max',
              desc: 'For Christchurch ecommerce and product businesses, Google Shopping and Performance Max campaigns managed with proper feed optimisation, bidding strategy, and asset testing. Built for ROAS, not just impressions.',
            },
            {
              title: 'Landing Page Optimisation',
              desc: 'We review and improve the pages your Christchurch ad traffic lands on. A perfectly managed campaign is wasted on a poor landing page. CRO recommendations are part of our standard engagement.',
            },
            {
              title: 'Bid Strategy & Budget Management',
              desc: 'Smart bidding configuration aligned to your Christchurch business goals — whether that\'s leads, revenue, or ROAS targets. Budget allocation across campaigns, ad groups, and time periods optimised continuously.',
            },
            {
              title: 'Conversion Tracking Setup',
              desc: 'Proper Google Ads conversion tracking, Google Analytics 4 integration, and call tracking for Christchurch phone leads. Many Christchurch accounts we audit have broken tracking — we fix it before optimising.',
            },
            {
              title: 'Monthly Reporting',
              desc: 'Plain-English reporting every month: clicks, conversions, cost per lead, ROAS, and what we\'re doing next month. No agency jargon — just the metrics that connect to your Christchurch business revenue.',
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
            in November 2025. Google Ads were a core part of the integrated AI marketing system we
            built across Google Ads, Meta Ads, SEO, content, and customer support. 30% above their
            previous all-time record in month one of the engagement.
          </p>
        </div>
      </section>

      {/* Christchurch Areas */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Christchurch Areas We Cover</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            'Christchurch CBD', 'Riccarton', 'Sydenham',
            'Addington', 'St Albans', 'Papanui',
            'Hornby', 'Rolleston', 'Rangiora',
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
            { title: 'Google Ads Agency Christchurch — Blog', href: '/blog/google-ads-agency-christchurch' },
            { title: 'Google Ads Services NZ — Full Overview', href: '/services/google-ads-nz' },
            { title: 'Christchurch Marketing Hub', href: '/christchurch' },
            { title: 'SEO Agency Christchurch', href: '/christchurch/seo-agency' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to own Christchurch Google search?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            If you&apos;re a Christchurch business serious about turning Google Ads into a real
            revenue channel — apply below. We review every application.
          </p>
          <Link
            href="/apply"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg"
          >
            Apply to Work With Us
          </Link>
          <p className="text-gray-400 text-sm mt-4">Christchurch & NZ businesses. 3–5 client spots.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2026 Junction Media. Auckland, New Zealand.</p>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Home</Link>
            <Link href="/christchurch" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Christchurch</Link>
            <Link href="/services/google-ads-nz" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Google Ads NZ</Link>
            <Link href="/apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
