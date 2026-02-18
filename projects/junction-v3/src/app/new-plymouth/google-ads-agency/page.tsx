import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Google Ads Agency New Plymouth | AI-Managed Google Ads for Taranaki Businesses | Junction Media',
  description: 'Google Ads agency in New Plymouth managing PPC campaigns for Taranaki businesses. AI-assisted bidding, keyword strategy, and conversion tracking. Real leads, measurable ROI. $1,200–$2,500/mo.',
  keywords: 'Google Ads agency New Plymouth, Google Ads New Plymouth, PPC agency New Plymouth, Google AdWords New Plymouth, pay per click New Plymouth, New Plymouth Google Ads management, Taranaki Google Ads',
  openGraph: {
    title: 'Google Ads Agency New Plymouth | Junction Media',
    description: 'AI-managed Google Ads for New Plymouth and Taranaki businesses. Keyword strategy, campaign management, and revenue-focused reporting.',
    url: 'https://www.junctionmedia.ai/new-plymouth/google-ads-agency',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/new-plymouth/google-ads-agency',
  },
}

const faqs = [
  {
    q: 'How much does Google Ads management cost in New Plymouth?',
    a: 'Google Ads management for New Plymouth businesses typically costs $1,200–$2,500/month for professional management, separate from your ad spend budget. Management fees cover strategy, campaign setup, keyword research, ongoing optimisation, and monthly reporting. We recommend a minimum ad spend of $1,000/month in the New Plymouth/Taranaki market.',
  },
  {
    q: 'Is Google Ads effective for New Plymouth businesses?',
    a: 'Yes — Google Ads is one of the most effective channels for New Plymouth businesses targeting high-intent searches like "builder New Plymouth," "dentist Taranaki," or "accountant New Plymouth." The Taranaki market is growing and Google Ads provides immediate visibility while longer-term channels like SEO build.',
  },
  {
    q: 'What New Plymouth industries benefit most from Google Ads?',
    a: 'New Plymouth trades, energy sector services, healthcare, professional services, retail, tourism, and automotive businesses all benefit from Google Ads. The energy sector creates B2B search demand for specialist services. Tourism and hospitality businesses benefit from visitor-intent searches from across NZ. We\'ll advise honestly if a different channel would serve your business better.',
  },
  {
    q: 'How quickly can Google Ads generate leads for a New Plymouth business?',
    a: 'Google Ads can generate leads within days of launch. Most New Plymouth campaigns see initial enquiries in the first week. The first 4–6 weeks is optimisation and data collection; by month 2–3, campaigns are typically running efficiently with clear cost-per-lead data.',
  },
  {
    q: 'Do you target the wider Taranaki region, not just New Plymouth city?',
    a: 'Yes — we build campaigns with geographic targeting that reflects your actual service area. For New Plymouth-based businesses this typically includes New Plymouth city, Inglewood, Stratford, Ōakura, Waitara, and surrounding Taranaki communities as appropriate to your business model.',
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
      areaServed: {
        '@type': 'City',
        name: 'New Plymouth',
      },
      priceRange: '$$$',
    },
    {
      '@type': 'Service',
      name: 'Google Ads Agency New Plymouth',
      provider: {
        '@type': 'Organization',
        name: 'Junction Media',
        url: 'https://www.junctionmedia.ai',
      },
      serviceType: 'Google Ads Management',
      areaServed: {
        '@type': 'City',
        name: 'New Plymouth',
      },
      description: 'AI-managed Google Ads for New Plymouth and Taranaki businesses. Search campaigns, keyword strategy, conversion tracking, and revenue-focused optimisation.',
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

export default function NewPlymouthGoogleAdsAgencyPage() {
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
          New Plymouth · Google Ads
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Google Ads Agency New Plymouth
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          AI-managed Google Ads for New Plymouth and Taranaki businesses. We build search campaigns
          that capture high-intent local traffic and turn clicks into qualified leads — with transparent
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
        <h2 className="text-2xl font-bold mb-6">Google Ads in New Plymouth: The Opportunity</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            New Plymouth is Taranaki&apos;s commercial centre — a city of 85,000+ with New Zealand&apos;s
            largest concentration of energy sector businesses, a strong agricultural economy, and a
            growing arts and tourism reputation. Its isolation from other major centres (3 hours from
            both Hamilton and Wellington) means local businesses serve a captive regional market with
            strong demand for local services.
          </p>
          <p className="text-gray-600 leading-relaxed">
            For New Plymouth businesses investing in Google Ads: competition is significantly lower
            than in Wellington or Auckland, meaning lower cost-per-click for most keyword categories.
            Proper campaign structure and targeting turns this cost advantage into genuine ROI.
          </p>
          <p className="text-gray-600 leading-relaxed">
            The energy sector creates a unique B2B layer in the New Plymouth market — specialist
            engineering, services, and professional services firms with high-value clients who
            actively research providers on Google. These searches often have high commercial intent
            and justify premium ad spend.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">What Our New Plymouth Google Ads Work Includes</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Keyword Research & Strategy',
              desc: 'New Plymouth and Taranaki-specific keyword research: local intent searches, B2B queries, commercial queries, and competitor analysis. We identify what Taranaki customers are actually searching for and build campaigns around those signals.',
            },
            {
              title: 'Campaign Setup & Structure',
              desc: 'Proper Google Ads account architecture: tightly themed ad groups, match type strategy, negative keyword lists, and ad extensions configured for New Plymouth businesses. Built for ongoing optimisation, not set-and-forget.',
            },
            {
              title: 'Local Geographic Targeting',
              desc: 'New Plymouth CBD, suburbs, and wider Taranaki geographic targeting. Radius targeting around your business location, or targeted coverage across your entire service area.',
            },
            {
              title: 'Ad Copy & Creative',
              desc: 'Responsive Search Ads and ad copy that speaks to New Plymouth customers\' specific needs. A/B testing of messaging, offers, and CTAs to improve click-through rates and qualified traffic.',
            },
            {
              title: 'Conversion Tracking',
              desc: 'Full conversion tracking setup: phone calls, form submissions, and purchases tracked back to specific keywords and ads. You know exactly which Taranaki searches are generating business.',
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
            { title: 'Google Ads Agency New Plymouth — Guide', href: '/blog/google-ads-agency-new-plymouth' },
            { title: 'Google Ads Services NZ', href: '/services/google-ads-nz' },
            { title: 'New Plymouth Marketing Hub', href: '/new-plymouth' },
            { title: 'SEO Agency New Plymouth', href: '/new-plymouth/seo-agency' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to dominate New Plymouth search results?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            If you want Google Ads that generate real leads for your New Plymouth or Taranaki business —
            not just clicks and impressions — apply below. We review every application.
          </p>
          <Link
            href="/apply"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg"
          >
            Apply to Work With Us
          </Link>
          <p className="text-gray-400 text-sm mt-4">3–5 client spots. New Plymouth &amp; Taranaki businesses welcome.</p>
        </div>
      </section>

      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2026 Junction Media. New Zealand.</p>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Home</Link>
            <Link href="/new-plymouth" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">New Plymouth</Link>
            <Link href="/services/google-ads-nz" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Google Ads NZ</Link>
            <Link href="/apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
