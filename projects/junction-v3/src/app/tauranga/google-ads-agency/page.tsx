import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Google Ads Agency Tauranga | AI-Managed Google Ads for Tauranga Businesses | Junction Media',
  description: 'Google Ads agency in Tauranga managing PPC campaigns for Bay of Plenty businesses. AI-assisted bidding, keyword strategy, and conversion tracking. Real leads, measurable ROI. $1,200–$2,500/mo.',
  keywords: 'Google Ads agency Tauranga, Google Ads Tauranga, PPC agency Tauranga, Google AdWords Tauranga, pay per click Tauranga, Tauranga Google Ads management, Bay of Plenty Google Ads',
  openGraph: {
    title: 'Google Ads Agency Tauranga | Junction Media',
    description: 'AI-managed Google Ads for Tauranga and Bay of Plenty businesses. Search campaigns, keyword strategy, and revenue-focused reporting.',
    url: 'https://www.junctionmedia.ai/tauranga/google-ads-agency',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/tauranga/google-ads-agency',
  },
}

const faqs = [
  {
    q: 'How much does Google Ads management cost in Tauranga?',
    a: 'Google Ads management for Tauranga businesses typically costs $1,200–$2,500/month for professional management, separate from your ad spend budget. In the Bay of Plenty market, we recommend a minimum ad spend of $1,500/month to generate sufficient data for effective optimisation. Management covers strategy, setup, ongoing optimisation, and reporting.',
  },
  {
    q: 'Is Google Ads effective for Tauranga businesses?',
    a: 'Yes — Tauranga is one of New Zealand\'s fastest-growing cities, with strong demand for local services, trades, real estate, and tourism-adjacent businesses. Google Ads captures high-intent searches like "builder Tauranga," "dentist Mount Maunganui," or "Tauranga accountant" — exactly when potential customers are ready to act.',
  },
  {
    q: 'Do you target Mount Maunganui and Papamoa separately from Tauranga CBD?',
    a: 'Yes — Tauranga\'s geography is spread across distinct areas (CBD, Mount Maunganui, Papamoa, Welcome Bay, Bethlehem, and surrounds), and we build campaigns with geographic targeting that reflects your actual service area and customer base. Different areas can have different search behaviour and competition levels.',
  },
  {
    q: 'How quickly can Google Ads generate leads for a Tauranga business?',
    a: 'Google Ads is one of the fastest channels — campaigns can be live and generating leads within days of launch. Tauranga\'s strong local search volume means most service businesses start seeing enquiries in the first week. Months 1–2 are optimisation-focused; by month 3, campaigns are typically running at peak efficiency.',
  },
  {
    q: 'What industries work best with Google Ads in Tauranga?',
    a: 'Tauranga\'s economy — construction and trades, real estate, tourism, healthcare, professional services, and retail — all benefit from Google Ads for local intent searches. The Bay of Plenty\'s strong growth means new residents actively searching for local providers, which creates consistent, quality search traffic.',
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
        addressLocality: 'Tauranga',
        addressRegion: 'Bay of Plenty',
        addressCountry: 'NZ',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -37.6878,
        longitude: 176.1651,
      },
      areaServed: {
        '@type': 'City',
        name: 'Tauranga',
      },
      priceRange: '$$$',
    },
    {
      '@type': 'Service',
      name: 'Google Ads Agency Tauranga',
      provider: {
        '@type': 'Organization',
        name: 'Junction Media',
        url: 'https://www.junctionmedia.ai',
      },
      serviceType: 'Google Ads Management',
      areaServed: {
        '@type': 'City',
        name: 'Tauranga',
      },
      description: 'AI-managed Google Ads for Tauranga and Bay of Plenty businesses. Search campaigns, keyword strategy, geographic targeting, and revenue-focused optimisation.',
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

export default function TaurangaGoogleAdsAgencyPage() {
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
        <Link
          href="/apply"
          className="text-sm bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors"
        >
          Apply to Work With Us
        </Link>
      </nav>

      <section className="max-w-3xl mx-auto px-6 pt-20 pb-16">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
          Tauranga · Google Ads
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Google Ads Agency Tauranga
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          AI-managed Google Ads for Tauranga and Bay of Plenty businesses. We build search campaigns
          that capture high-intent local traffic — from Mount Maunganui to Papamoa — and turn
          clicks into qualified leads with transparent, revenue-connected reporting.
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

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Google Ads in Tauranga: A Growing Market</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            Tauranga is New Zealand&apos;s fifth-largest city and one of its fastest-growing. The Bay of
            Plenty region has seen sustained population growth, a construction and development boom,
            and an expanding professional services sector. For local businesses, this growth means
            strong and increasing local search demand.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Tauranga&apos;s spread-out geography — CBD, Mount Maunganui, Papamoa, Bethlehem, Welcome Bay,
            and surrounding areas — means geographic targeting in Google Ads requires careful
            planning. New residents moving into growing suburbs actively search for local providers
            across every service category.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Competition in Tauranga Google Ads is lower than Auckland and Wellington for most
            categories, which means lower cost-per-click — but only if your campaigns are structured
            to capture intent efficiently. Poorly structured campaigns waste budget in any market.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">What Our Tauranga Google Ads Work Includes</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Keyword Research & Strategy',
              desc: 'Tauranga and Bay of Plenty-specific keyword research. Local intent searches, commercial queries, and competitor analysis specific to your category and service area.',
            },
            {
              title: 'Campaign Setup & Structure',
              desc: 'Proper Google Ads account architecture: tightly themed ad groups, match type strategy, negative keyword lists, and ad extensions. Built for Tauranga\'s local market dynamics.',
            },
            {
              title: 'Bay of Plenty Geographic Targeting',
              desc: 'Suburb-level targeting across Tauranga, Mount Maunganui, Papamoa, Bethlehem, and wider Bay of Plenty. Campaigns built around your actual service area.',
            },
            {
              title: 'Ad Copy & Testing',
              desc: 'Responsive Search Ads with messaging tailored to Tauranga customers. A/B testing of offers, CTAs, and copy to improve click-through rates and lead quality.',
            },
            {
              title: 'Conversion Tracking',
              desc: 'Phone call tracking, form submissions, and purchase tracking connected to specific keywords and ads. You know exactly which Tauranga searches drive real business.',
            },
            {
              title: 'Monthly Optimisation & Reporting',
              desc: 'Weekly bid adjustments, search term analysis, and budget optimisation. Monthly reports in plain English — what\'s working, what\'s not, what\'s changing.',
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
            Deep Blue Health — a New Zealand supplement brand — hit their best revenue month ever
            in November 2025. We built AI-native marketing systems across Google Ads, Meta Ads,
            SEO, content, and customer support. Google Ads was central to the result.
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
            { title: 'Google Ads Agency Tauranga — Full Guide', href: '/blog/google-ads-agency-tauranga' },
            { title: 'Google Ads Services NZ', href: '/services/google-ads-nz' },
            { title: 'Tauranga Marketing Hub', href: '/tauranga' },
            { title: 'SEO Agency Tauranga', href: '/tauranga/seo-agency' },
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

      <section className="max-w-3xl mx-auto px-6 py-20 border-t border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to capture more Tauranga customers via Google?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            If you want Google Ads that generate real leads for your Tauranga or Bay of Plenty
            business — apply below. We review every application.
          </p>
          <Link
            href="/apply"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg"
          >
            Apply to Work With Us
          </Link>
          <p className="text-gray-400 text-sm mt-4">3–5 client spots. Tauranga & Bay of Plenty businesses welcome.</p>
        </div>
      </section>

      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2026 Junction Media. New Zealand.</p>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Home</Link>
            <Link href="/tauranga" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Tauranga</Link>
            <Link href="/services/google-ads-nz" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Google Ads NZ</Link>
            <Link href="/apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
