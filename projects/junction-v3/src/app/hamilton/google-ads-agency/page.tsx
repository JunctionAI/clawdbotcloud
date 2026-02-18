import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Google Ads Agency Hamilton | AI-Managed Google Ads for Hamilton Businesses | Junction Media',
  description: 'Google Ads agency in Hamilton managing PPC campaigns for Waikato businesses. AI-assisted bidding, keyword strategy, and conversion tracking. Real leads, measurable ROI. $1,200–$2,500/mo.',
  keywords: 'Google Ads agency Hamilton, Google Ads Hamilton, PPC agency Hamilton, Google AdWords Hamilton, pay per click Hamilton, Hamilton Google Ads management, Waikato Google Ads',
  openGraph: {
    title: 'Google Ads Agency Hamilton | Junction Media',
    description: 'AI-managed Google Ads for Hamilton and Waikato businesses. Keyword strategy, campaign management, and revenue-focused reporting.',
    url: 'https://www.junctionmedia.ai/hamilton/google-ads-agency',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/hamilton/google-ads-agency',
  },
}

const faqs = [
  {
    q: 'How much does Google Ads management cost in Hamilton?',
    a: 'Google Ads management for Hamilton businesses typically costs $1,200–$2,500/month for professional management, separate from your ad spend budget. At Junction Media, management fees cover strategy, campaign setup, keyword research, ongoing optimisation, and monthly reporting. We recommend a minimum ad spend of $1,500/month in the Hamilton/Waikato market.',
  },
  {
    q: 'Is Google Ads effective for Hamilton businesses?',
    a: 'Yes — Google Ads is one of the most effective channels for Hamilton businesses targeting high-intent local searches like "plumber Hamilton," "accountant Hamilton," or "Hamilton auto repair." Waikato is a significant and growing commercial market, and Google Ads provides immediate visibility while longer-term channels like SEO build.',
  },
  {
    q: 'What industries benefit most from Google Ads in Hamilton?',
    a: 'Hamilton\'s diverse economy — agriculture and agri-tech, trades, professional services, healthcare, retail, and automotive — all benefit from Google Ads. Trades and services businesses particularly benefit from local intent searches. We\'ll advise honestly if a different channel would serve your Hamilton business better.',
  },
  {
    q: 'How quickly can Google Ads generate leads for a Hamilton business?',
    a: 'Google Ads is one of the fastest channels for lead generation — unlike SEO, you can be showing ads to Hamilton and Waikato customers within days of launch. Most campaigns generate initial leads in the first week. The first 4–6 weeks is optimisation and data collection; by month 2–3, campaigns are typically running efficiently.',
  },
  {
    q: 'Do you target the wider Waikato region, not just Hamilton city?',
    a: 'Yes — we build campaigns with geographic targeting that reflects your actual service area. For Hamilton-based businesses, this typically includes Hamilton city, Cambridge, Te Awamutu, Huntly, Ngāruawāhia, and surrounding Waikato communities as appropriate to your business model.',
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
        addressLocality: 'Hamilton',
        addressRegion: 'Waikato',
        addressCountry: 'NZ',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -37.7870,
        longitude: 175.2793,
      },
      areaServed: {
        '@type': 'City',
        name: 'Hamilton',
      },
      priceRange: '$$$',
    },
    {
      '@type': 'Service',
      name: 'Google Ads Agency Hamilton',
      provider: {
        '@type': 'Organization',
        name: 'Junction Media',
        url: 'https://www.junctionmedia.ai',
      },
      serviceType: 'Google Ads Management',
      areaServed: {
        '@type': 'City',
        name: 'Hamilton',
      },
      description: 'AI-managed Google Ads for Hamilton and Waikato businesses. Search campaigns, keyword strategy, conversion tracking, and revenue-focused optimisation.',
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

export default function HamiltonGoogleAdsAgencyPage() {
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
          Hamilton · Google Ads
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Google Ads Agency Hamilton
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          AI-managed Google Ads for Hamilton and Waikato businesses. We build search campaigns that
          capture high-intent local traffic and turn clicks into qualified leads — with transparent
          reporting that connects ad spend to actual revenue.
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
            { stat: '$1.2k–$2.5k', label: 'Management per month NZD' },
            { stat: '3-month', label: 'Minimum engagement' },
            { stat: '+30%', label: 'DBH sales record (month 1)' },
            { stat: '3–5', label: 'Clients at a time (max)' },
          ].map((item) => (
            <div key={item.label} className="p-4 border border-gray-100 rounded-2xl text-center">
              <p className="text-2xl font-bold text-gray-900 mb-1">{item.stat}</p>
              <p className="text-xs text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Hamilton Market Context */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Google Ads in Hamilton: The Opportunity</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            Hamilton is New Zealand&apos;s fourth-largest city and the hub of the Waikato region.
            With a population approaching 200,000 and strong growth in professional services,
            agriculture-related businesses, healthcare, and retail, Hamilton is an increasingly
            competitive digital advertising market — but still significantly less contested
            than Auckland for most categories.
          </p>
          <p className="text-gray-600 leading-relaxed">
            This creates a real opportunity for Hamilton businesses willing to invest in Google Ads
            properly. Lower competition means lower cost-per-click for most keywords, but only if
            your campaigns are structured to capture the right intent. Poor campaign structure
            wastes budget in any market — and Hamilton is no exception.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Hamilton&apos;s growing population and its position as a gateway to the wider Waikato
            region means geographic targeting matters. We build campaigns that reflect your actual
            service area — Hamilton city, surrounding suburbs, and the broader Waikato region
            as appropriate.
          </p>
        </div>
      </section>

      {/* What We Do */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">What Our Hamilton Google Ads Work Includes</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Keyword Research & Strategy',
              desc: 'Hamilton and Waikato-specific keyword research: local intent searches, commercial queries, and competitor analysis. We identify what Hamilton customers are actually searching for and build campaigns around those signals.',
            },
            {
              title: 'Campaign Setup & Structure',
              desc: 'Proper Google Ads account architecture: tightly themed ad groups, match type strategy, negative keyword lists, and ad extensions configured for Hamilton businesses. Not set-and-forget — built for ongoing optimisation.',
            },
            {
              title: 'Local Geographic Targeting',
              desc: 'Hamilton CBD, suburbs, and wider Waikato geographic targeting. Radius targeting around your business location, or targeted coverage across your entire service area.',
            },
            {
              title: 'Ad Copy & Creative',
              desc: 'Responsive Search Ads and ad copy that speaks to Hamilton customers\' specific needs. A/B testing of messaging, offers, and CTAs to improve click-through rates and qualified traffic.',
            },
            {
              title: 'Conversion Tracking',
              desc: 'Full conversion tracking setup: phone calls, form submissions, and purchases tracked back to specific keywords and ads. You know exactly which Hamilton searches are generating business.',
            },
            {
              title: 'Monthly Optimisation & Reporting',
              desc: 'Weekly bid adjustments, search term analysis, budget optimisation, and monthly reports in plain English. What\'s performing, what\'s not, and what we\'re changing.',
            },
          ].map((item) => (
            <div key={item.title} className="p-6 border border-gray-100 rounded-2xl">
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Result */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">A Result Worth Mentioning</h2>
        <div className="bg-gray-50 rounded-2xl p-8">
          <p className="text-3xl font-bold text-gray-900 mb-2">+30%</p>
          <p className="text-gray-500 text-sm mb-4">Above previous all-time store record — month 1</p>
          <p className="text-gray-600 leading-relaxed">
            Deep Blue Health — a New Zealand supplement brand — hit their best revenue month ever
            in November 2025. We built AI-native marketing systems across Google Ads, Meta Ads,
            SEO, content, and customer support. Google Ads was a core driver: proper campaign
            structure, smart bidding, and conversion tracking that showed exactly what was working.
          </p>
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
            { title: 'Google Ads Agency Hamilton — Full Guide', href: '/blog/google-ads-agency-hamilton' },
            { title: 'Google Ads Services NZ', href: '/services/google-ads-nz' },
            { title: 'Hamilton Marketing Hub', href: '/hamilton' },
            { title: 'SEO Agency Hamilton', href: '/hamilton/seo-agency' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to dominate Hamilton search results?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            If you want Google Ads that generate real leads for your Hamilton or Waikato business —
            not just clicks and impressions — apply below. We review every application.
          </p>
          <Link
            href="/apply"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg"
          >
            Apply to Work With Us
          </Link>
          <p className="text-gray-400 text-sm mt-4">3–5 client spots. Hamilton & Waikato businesses welcome.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2026 Junction Media. New Zealand.</p>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Home</Link>
            <Link href="/hamilton" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Hamilton</Link>
            <Link href="/services/google-ads-nz" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Google Ads NZ</Link>
            <Link href="/apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
