import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Google Ads Agency Invercargill | Southland Google Ads | Junction Media',
  description: 'Google Ads agency serving Invercargill businesses. AI-powered search and display campaigns for Southland farming, manufacturing, trades, and local services. $1,500–$3,500/mo.',
  keywords: 'Google Ads agency Invercargill, Invercargill Google Ads, Southland Google Ads, PPC agency Invercargill, Google Ads management Invercargill, paid search Invercargill NZ',
  openGraph: {
    title: 'Google Ads Agency Invercargill | Junction Media',
    description: 'AI-native Google Ads management for Invercargill and Southland businesses. Search and display campaigns built for measurable ROI in the deep south.',
    url: 'https://www.junctionmedia.ai/invercargill/google-ads-agency',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/invercargill/google-ads-agency',
  },
}

const faqs = [
  {
    q: 'How much does Google Ads management cost for an Invercargill business?',
    a: 'Google Ads management at Junction Media ranges from $1,500–$3,500/month NZD (management fee, excluding ad spend). Ad spend is separate — typically $1,000–$4,000+/month depending on your market. Invercargill often has lower cost-per-click than major NZ centres due to lower competition.',
  },
  {
    q: 'Is Google Ads worth it for an Invercargill business?',
    a: 'Yes — for Invercargill agricultural supply, manufacturing, trades, professional services, and retail businesses, Google Search captures buyers at the moment of highest intent. Low competition in Southland means lower CPCs, lower cost-per-lead, and faster ROI than most NZ markets.',
  },
  {
    q: 'What Invercargill businesses do you run Google Ads for?',
    a: 'We run Google Ads for Invercargill agricultural suppliers, manufacturers, engineering businesses, trades, professional services (legal, accounting, consulting), healthcare, retail, and businesses serving the Southland farming community. National businesses based in Invercargill also benefit from our Google Shopping expertise.',
  },
  {
    q: 'Can Google Ads reach farming and agricultural customers in Southland?',
    a: 'Yes — agricultural and farming buyers in Southland use Google extensively to research and source supplies, equipment, and services. Targeting specific farming-related keywords, equipment categories, and regional geographic targeting lets us reach this audience precisely.',
  },
  {
    q: 'How quickly do Google Ads produce leads for Invercargill businesses?',
    a: 'Qualified leads typically start within 2–4 weeks of campaign launch as the algorithm learns your market. In lower-competition markets like Invercargill, this learning period can be shorter than major cities. Month 1 is optimisation; months 2–3 are where performance consistently improves.',
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
      name: 'Google Ads Agency Invercargill',
      provider: {
        '@type': 'Organization',
        name: 'Junction Media',
        url: 'https://www.junctionmedia.ai',
      },
      serviceType: 'Google Ads Management',
      areaServed: { '@type': 'City', name: 'Invercargill' },
      description: 'AI-native Google Ads management for Invercargill and Southland businesses. Search and display campaigns built for measurable ROI.',
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

export default function InvercargillGoogleAdsAgencyPage() {
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
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Invercargill · Google Ads</p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Google Ads Agency Invercargill
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          AI-native Google Ads management for Invercargill and Southland businesses. We build
          search, display, and Performance Max campaigns that capture buyer intent — for farming
          supply, manufacturing, trades, professional services, and retail.
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
            { stat: '2–4 weeks', label: 'To first leads' },
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
        <h2 className="text-2xl font-bold mb-6">Google Ads in Invercargill: First-Mover Advantage in the Deep South</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            Southland businesses operate in one of New Zealand&apos;s least digitally saturated markets.
            Agricultural supply, engineering, manufacturing, and trade businesses in Invercargill
            are increasingly searched on Google — but most businesses in these sectors have not yet
            invested seriously in paid search. That is an opportunity.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Cost-per-click in Invercargill and Southland is typically meaningfully lower than Auckland
            or Wellington across most commercial categories. That means the same ad spend generates
            more clicks, more leads, and faster ROI for Southland businesses willing to invest.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We build structured campaigns: tightly themed ad groups, conversion-optimised landing
            pages, and bidding strategies tuned to your specific Invercargill and Southland market.
            Every dollar tracked and attributed.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">What Our Invercargill Google Ads Management Includes</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Campaign Strategy & Build',
              desc: 'Full account architecture: search, display, Performance Max. Keyword research specific to Invercargill and Southland buyer intent. Negative keywords from day one.',
            },
            {
              title: 'Ad Copy & Testing',
              desc: 'Multiple headline and description variants tested continuously. Copy that speaks to Southland business needs and agricultural/industrial buyer psychology.',
            },
            {
              title: 'Conversion Tracking',
              desc: 'Google Ads conversion tracking, GA4 integration, and call tracking configured correctly. Accurate attribution underpins every optimisation decision.',
            },
            {
              title: 'Landing Page Optimisation',
              desc: 'We review or help build high-converting landing pages. A great ad to a weak landing page loses leads. We fix the full conversion funnel.',
            },
            {
              title: 'Bid & Budget Management',
              desc: 'Smart bidding strategies tuned to your goals. Budget allocated dynamically to what is converting — not spread evenly regardless of performance.',
            },
            {
              title: 'Monthly Reporting',
              desc: 'Impressions, clicks, conversions, cost-per-lead, ROAS every month. Plain English. What worked, what changed, what we test next.',
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
            Deep Blue Health hit their best revenue month ever in November 2025. Google Ads was
            core to the integrated system — 30% above their previous all-time record in month one.
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
            { title: 'Google Ads Invercargill — Blog', href: '/blog/google-ads-invercargill' },
            { title: 'Google Ads Services NZ', href: '/services/google-ads-nz' },
            { title: 'Invercargill Marketing Hub', href: '/invercargill' },
            { title: 'SEO Agency Invercargill', href: '/invercargill/seo-agency' },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="p-4 border border-gray-100 rounded-xl hover:border-gray-300 transition-colors text-sm font-medium text-gray-700 hover:text-gray-900">
              {link.title} →
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-20 border-t border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to drive leads from Google in Invercargill?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            If you are an Invercargill or Southland business ready to invest in Google Ads that
            actually delivers — apply below. We review every application.
          </p>
          <Link href="/apply" className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg">
            Apply to Work With Us
          </Link>
          <p className="text-gray-400 text-sm mt-4">Southland businesses. Limited client spots.</p>
        </div>
      </section>

      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2026 Junction Media. Auckland, New Zealand.</p>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Home</Link>
            <Link href="/invercargill" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Invercargill</Link>
            <Link href="/services/google-ads-nz" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Google Ads NZ</Link>
            <Link href="/apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
