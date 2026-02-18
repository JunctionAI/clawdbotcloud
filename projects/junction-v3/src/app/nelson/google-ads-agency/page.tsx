import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Google Ads Agency Nelson | PPC Nelson | Junction Media',
  description: 'Google Ads agency serving Nelson businesses. AI-optimised PPC campaigns for Nelson CBD, Richmond, and the Tasman region. Management from $1,500/mo. Real results.',
  keywords: 'Google Ads agency Nelson, PPC Nelson, Google Ads Nelson, Google Ads management Nelson, PPC agency Nelson, Google Ads consultant Nelson, paid search Nelson, Nelson digital marketing',
  openGraph: {
    title: 'Google Ads Agency Nelson | Junction Media',
    description: 'AI-optimised Google Ads management for Nelson businesses. Capture high-intent local search traffic across the Tasman region.',
    url: 'https://www.junctionmedia.ai/nelson/google-ads-agency',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/nelson/google-ads-agency',
  },
}

const faqs = [
  {
    q: 'How much does Google Ads management cost for a Nelson business?',
    a: 'Google Ads management at Junction Media starts at $1,500/month NZD. We recommend a minimum ad spend of $1,500–$3,000/month for meaningful data and results in the Nelson and Tasman market.',
  },
  {
    q: 'How quickly can Google Ads deliver results for Nelson businesses?',
    a: 'Google Ads can drive traffic from day one. Meaningful optimisation — finding keywords, negative keyword lists, and ad copy that converts — typically takes 4–8 weeks of data. By month 2–3 a well-managed Nelson account should return measurable ROAS.',
  },
  {
    q: 'What Nelson businesses benefit most from Google Ads?',
    a: 'Trade services (builders, electricians, plumbers), professional services (lawyers, accountants), tourism and hospitality, healthcare, and retailers all benefit strongly. If people search for what you offer in Nelson, Google Ads can capture that intent.',
  },
  {
    q: 'Can you target specific areas like Richmond, Stoke, or Motueka?',
    a: 'Yes — location targeting is a core part of our Nelson PPC strategy. We target Nelson CBD, Richmond, Stoke, Tahunanui, Mapua, Motueka, Takaka, and the broader Tasman region with granular geographic settings.',
  },
  {
    q: 'What is included in Nelson Google Ads management?',
    a: 'Account audit or build, campaign strategy, keyword research, ad copy, bid management, negative keyword management, conversion tracking, landing page recommendations, and weekly plain-English reporting.',
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
        { '@type': 'City', name: 'Nelson' },
        { '@type': 'City', name: 'Auckland' },
      ],
      priceRange: '$$$',
    },
    {
      '@type': 'Service',
      name: 'Google Ads Agency Nelson',
      provider: {
        '@type': 'Organization',
        name: 'Junction Media',
        url: 'https://www.junctionmedia.ai',
      },
      serviceType: 'Google Ads Management / PPC',
      areaServed: { '@type': 'City', name: 'Nelson' },
      description: 'AI-optimised Google Ads management for Nelson and Tasman businesses. Continuous campaign optimisation and transparent reporting.',
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

export default function NelsonGoogleAdsAgencyPage() {
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
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Nelson · Google Ads</p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Google Ads Agency Nelson
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          AI-optimised Google Ads management for Nelson and Tasman businesses. We build campaigns that
          capture high-intent local search traffic — and continuously optimise to lower your
          cost-per-lead while increasing conversion volume.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/apply" className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors text-center">
            Apply to Work With Us
          </Link>
          <Link href="/services/google-ads-nz" className="inline-block border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:border-gray-500 transition-colors text-center">
            View Google Ads Services
          </Link>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-12 border-t border-gray-100">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { stat: '$1.5k–$3.5k', label: 'Management fee /month NZD' },
            { stat: 'Week 1', label: 'Campaigns live' },
            { stat: '+30%', label: 'DBH sales record (month 1)' },
            { stat: 'Weekly', label: 'Optimisation cadence' },
          ].map((item) => (
            <div key={item.label} className="p-4 border border-gray-100 rounded-2xl text-center">
              <p className="text-2xl font-bold text-gray-900 mb-1">{item.stat}</p>
              <p className="text-xs text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Why Nelson PPC Needs Active Management</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            Nelson&apos;s Google Ads market is smaller than Auckland but no less competitive within
            specific categories. Trade services, tourism operators, and professional services all
            compete for a relatively small pool of local clicks — which means wasted spend is
            proportionally more painful.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Most Nelson Google Ads accounts we audit have the same problems: broad match keywords
            bleeding budget on irrelevant searches, missing negative keyword lists, poor Quality
            Scores driving up CPCs, and no conversion tracking tied to real revenue.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We build accounts from first principles — or fix existing ones — with weekly optimisation
            that compounds over time. Every dollar of Nelson ad spend should work harder each month.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">What Our Nelson Google Ads Management Includes</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Account Audit or Build',
              desc: 'Every engagement starts with a forensic audit or clean-slate build. Wasted spend identified, quality score issues fixed, campaign structure optimised before scaling.',
            },
            {
              title: 'Nelson-Specific Keyword Strategy',
              desc: 'Keyword research mapped to Nelson and Tasman search intent — including suburb-level terms (Richmond, Motueka, Mapua) and commercial-intent queries competitors may have missed.',
            },
            {
              title: 'Ad Copy & Extensions',
              desc: 'AI-assisted ad copy testing with Nelson-specific messaging. Callouts, sitelinks, structured snippets, and call extensions maximise click-through rates.',
            },
            {
              title: 'Conversion Tracking',
              desc: 'GA4 + Google Ads conversion tracking set up properly from day one. Phone calls, form fills, purchases — every conversion tied back to the campaign that drove it.',
            },
            {
              title: 'Weekly Optimisation',
              desc: 'Bid adjustments, search term analysis, negative keyword expansion, and ad copy rotation — every week, not once a quarter.',
            },
            {
              title: 'Plain-English Weekly Reports',
              desc: 'Clicks, costs, conversions, ROAS, what changed, and what is next. Numbers that connect to your business outcomes.',
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
            Deep Blue Health hit their best revenue month ever in November 2025. Google Ads was a
            core component of the integrated system we built. Result: 30% above their previous
            all-time record in month one.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Nelson Areas We Target</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {['Nelson CBD', 'Richmond', 'Stoke / Tahunanui', 'Mapua / Ruby Bay', 'Motueka', 'Takaka / Golden Bay'].map((area) => (
            <div key={area} className="p-3 border border-gray-100 rounded-xl text-sm text-gray-700 text-center">{area}</div>
          ))}
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
            { title: 'Google Ads Management NZ — Full Overview', href: '/services/google-ads-nz' },
            { title: 'SEO Agency Nelson', href: '/nelson/seo-agency' },
            { title: 'Google Ads Agency Nelson — Blog', href: '/blog/google-ads-agency-nelson' },
            { title: 'Nelson Marketing Hub', href: '/nelson' },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="p-4 border border-gray-100 rounded-xl hover:border-gray-300 transition-colors text-sm font-medium text-gray-700 hover:text-gray-900">
              {link.title} →
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-20 border-t border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to make your Nelson ad spend work harder?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            Running Google Ads in Nelson with disappointing returns — or ready to launch? Apply below.
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
            <Link href="/nelson" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Nelson</Link>
            <Link href="/services/google-ads-nz" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Google Ads NZ</Link>
            <Link href="/apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
