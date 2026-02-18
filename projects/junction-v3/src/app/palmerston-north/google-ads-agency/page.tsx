import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Google Ads Agency Palmerston North | AI-Managed Google Ads for Palmy Businesses | Junction Media',
  description: 'Google Ads agency in Palmerston North managing PPC campaigns for Manawatū businesses. AI-assisted bidding, keyword strategy, and conversion tracking. Real leads, measurable ROI. $1,200–$2,500/mo.',
  keywords: 'Google Ads agency Palmerston North, Google Ads Palmerston North, PPC agency Palmy, Google AdWords Palmerston North, pay per click Palmy, Palmerston North Google Ads management, Manawatū Google Ads',
  openGraph: {
    title: 'Google Ads Agency Palmerston North | Junction Media',
    description: 'AI-managed Google Ads for Palmerston North and Manawatū businesses. Keyword strategy, campaign management, and revenue-focused reporting.',
    url: 'https://www.junctionmedia.ai/palmerston-north/google-ads-agency',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/palmerston-north/google-ads-agency',
  },
}

const faqs = [
  {
    q: 'How much does Google Ads management cost in Palmerston North?',
    a: 'Google Ads management for Palmerston North businesses typically costs $1,200–$2,500/month for professional management, separate from your ad spend budget. Management fees cover strategy, campaign setup, keyword research, ongoing optimisation, and monthly reporting. We recommend a minimum ad spend of $1,000/month in the Palmy/Manawatū market.',
  },
  {
    q: 'Is Google Ads effective for Palmerston North businesses?',
    a: 'Yes — Google Ads is one of the most effective channels for Palmy businesses targeting high-intent searches like "dentist Palmerston North," "builder Palmy," or "accountant Palmerston North." The Manawatū market is growing and Google Ads provides immediate visibility while longer-term channels like SEO build.',
  },
  {
    q: 'What Palmy industries benefit most from Google Ads?',
    a: 'Palmerston North trades, healthcare, retail, education-adjacent services, professional services, and automotive businesses all benefit from Google Ads. Massey University creates a substantial student population that actively searches for local services. We\'ll advise honestly if a different channel would serve your Palmy business better.',
  },
  {
    q: 'How quickly can Google Ads generate leads for a Palmerston North business?',
    a: 'Google Ads can generate leads within days of launch. Most Palmy campaigns see initial enquiries in the first week. The first 4–6 weeks is optimisation and data collection; by month 2–3, campaigns are typically running efficiently with clear cost-per-lead data.',
  },
  {
    q: 'Do you target the wider Manawatū region, not just Palmerston North city?',
    a: 'Yes — we build campaigns with geographic targeting that reflects your actual service area. For Palmy-based businesses this typically includes Palmerston North city, Feilding, Levin, Foxton, and surrounding Manawatū communities as appropriate to your business model.',
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
        name: 'Palmerston North',
      },
      priceRange: '$$$',
    },
    {
      '@type': 'Service',
      name: 'Google Ads Agency Palmerston North',
      provider: {
        '@type': 'Organization',
        name: 'Junction Media',
        url: 'https://www.junctionmedia.ai',
      },
      serviceType: 'Google Ads Management',
      areaServed: {
        '@type': 'City',
        name: 'Palmerston North',
      },
      description: 'AI-managed Google Ads for Palmerston North and Manawatū businesses. Search campaigns, keyword strategy, conversion tracking, and revenue-focused optimisation.',
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

export default function PalmerstonNorthGoogleAdsAgencyPage() {
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
          Palmerston North · Google Ads
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Google Ads Agency Palmerston North
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          AI-managed Google Ads for Palmerston North and Manawatū businesses. We build search campaigns
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
        <h2 className="text-2xl font-bold mb-6">Google Ads in Palmerston North: The Opportunity</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            Palmerston North is the commercial centre for the Manawatū-Whanganui region — a city of
            90,000+ anchored by Massey University, strong agribusiness and food processing sectors,
            and a growing professional services economy. It sits at New Zealand&apos;s geographic
            heart, with excellent transport links connecting it to Wellington, Hamilton, and Napier.
          </p>
          <p className="text-gray-600 leading-relaxed">
            For Palmy businesses investing in Google Ads: competition is meaningfully lower than
            Wellington or Auckland, which typically means lower cost-per-click and better returns
            on ad spend. The key is proper campaign structure and targeting — without that,
            the budget advantage disappears.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Massey University creates a distinct opportunity layer: student-facing services see
            reliable demand cycles that smart campaigns can capitalise on. Agribusiness and
            industrial suppliers see B2B search traffic that can be captured with the right
            keyword strategy.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">What Our Palmy Google Ads Work Includes</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Keyword Research & Strategy',
              desc: 'Palmerston North and Manawatū-specific keyword research: local intent searches, commercial queries, and competitor analysis. We identify what Palmy customers are actually searching for and build campaigns around those signals.',
            },
            {
              title: 'Campaign Setup & Structure',
              desc: 'Proper Google Ads account architecture: tightly themed ad groups, match type strategy, negative keyword lists, and ad extensions configured for Palmy businesses. Built for ongoing optimisation, not set-and-forget.',
            },
            {
              title: 'Local Geographic Targeting',
              desc: 'Palmerston North CBD, suburbs, and wider Manawatū geographic targeting. Radius targeting around your business location, or targeted coverage across your entire service area.',
            },
            {
              title: 'Ad Copy & Creative',
              desc: 'Responsive Search Ads and ad copy that speaks to Palmy customers\' specific needs. A/B testing of messaging, offers, and CTAs to improve click-through rates and qualified traffic.',
            },
            {
              title: 'Conversion Tracking',
              desc: 'Full conversion tracking setup: phone calls, form submissions, and purchases tracked back to specific keywords and ads. You know exactly which Palmy searches are generating business.',
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
            { title: 'Google Ads Agency Palmerston North — Guide', href: '/blog/google-ads-agency-palmerston-north' },
            { title: 'Google Ads Services NZ', href: '/services/google-ads-nz' },
            { title: 'Palmerston North Marketing Hub', href: '/palmerston-north' },
            { title: 'SEO Agency Palmerston North', href: '/palmerston-north/seo-agency' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to dominate Palmerston North search results?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            If you want Google Ads that generate real leads for your Palmy or Manawatū business —
            not just clicks and impressions — apply below. We review every application.
          </p>
          <Link
            href="/apply"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg"
          >
            Apply to Work With Us
          </Link>
          <p className="text-gray-400 text-sm mt-4">3–5 client spots. Palmerston North & Manawatū businesses welcome.</p>
        </div>
      </section>

      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2026 Junction Media. New Zealand.</p>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Home</Link>
            <Link href="/palmerston-north" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Palmy</Link>
            <Link href="/services/google-ads-nz" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Google Ads NZ</Link>
            <Link href="/apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
