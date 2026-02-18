import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Google Ads Agency Napier | AI-Managed Google Ads for Hawke's Bay Businesses | Junction Media",
  description: "Google Ads agency in Napier managing PPC campaigns for Hawke's Bay businesses. AI-assisted bidding, keyword strategy, and conversion tracking. Real leads, measurable ROI. $1,200–$2,500/mo.",
  keywords: "Google Ads agency Napier, Google Ads Napier, PPC agency Napier, Google AdWords Napier, pay per click Napier, Napier Google Ads management, Hawke's Bay Google Ads",
  openGraph: {
    title: "Google Ads Agency Napier | Junction Media",
    description: "AI-managed Google Ads for Napier and Hawke's Bay businesses. Keyword strategy, campaign management, and revenue-focused reporting.",
    url: 'https://www.junctionmedia.ai/napier/google-ads-agency',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/napier/google-ads-agency',
  },
}

const faqs = [
  {
    q: "How much does Google Ads management cost in Napier?",
    a: "Google Ads management for Napier businesses typically costs $1,200–$2,500/month for professional management, separate from your ad spend budget. Management fees cover strategy, campaign setup, keyword research, ongoing optimisation, and monthly reporting. We recommend a minimum ad spend of $1,000/month in the Napier/Hawke's Bay market.",
  },
  {
    q: "Is Google Ads effective for Napier businesses?",
    a: "Yes — Google Ads is one of the most effective channels for Napier businesses targeting high-intent searches like 'accommodation Napier,' 'winery Hawke's Bay,' or 'builder Napier.' The region's tourism economy and growing commercial sector make it well-suited to paid search. Google Ads provides immediate visibility while longer-term channels like SEO build.",
  },
  {
    q: "What Napier industries benefit most from Google Ads?",
    a: "Napier tourism and accommodation, wineries and cellar doors, trades, healthcare, professional services, retail, and hospitality businesses all benefit from Google Ads. The Hawke's Bay tourism economy creates strong seasonal demand spikes — smart campaigns capitalise on summer and event-driven search volumes.",
  },
  {
    q: "How quickly can Google Ads generate leads for a Napier business?",
    a: "Google Ads can generate leads within days of launch. Most Napier campaigns see initial enquiries in the first week. The first 4–6 weeks is optimisation and data collection; by month 2–3, campaigns are typically running efficiently with clear cost-per-lead data.",
  },
  {
    q: "Do you target the wider Hawke's Bay region, not just Napier city?",
    a: "Yes — we build campaigns with geographic targeting that reflects your actual service area. For Napier-based businesses this typically includes Napier city, Hastings, Havelock North, Clive, and surrounding Hawke's Bay communities as appropriate to your business model.",
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
        name: 'Napier',
      },
      priceRange: '$$$',
    },
    {
      '@type': 'Service',
      name: 'Google Ads Agency Napier',
      provider: {
        '@type': 'Organization',
        name: 'Junction Media',
        url: 'https://www.junctionmedia.ai',
      },
      serviceType: 'Google Ads Management',
      areaServed: {
        '@type': 'City',
        name: 'Napier',
      },
      description: "AI-managed Google Ads for Napier and Hawke's Bay businesses. Search campaigns, keyword strategy, conversion tracking, and revenue-focused optimisation.",
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

export default function NapierGoogleAdsAgencyPage() {
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
          Napier · Google Ads
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Google Ads Agency Napier
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          AI-managed Google Ads for Napier and Hawke&apos;s Bay businesses. We build search campaigns
          that capture high-intent local and tourist traffic and turn clicks into qualified leads —
          with transparent reporting that connects ad spend to actual revenue.
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
        <h2 className="text-2xl font-bold mb-6">Google Ads in Napier: The Opportunity</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            Napier is one of New Zealand&apos;s most-visited regional cities — famous for Art Deco
            architecture, Hawke&apos;s Bay wine country, Mission Estate, and some of the country&apos;s
            best beaches. This creates a dual commercial opportunity: local businesses serving the city&apos;s
            resident population of 65,000+, and tourism-facing businesses serving tens of thousands
            of annual visitors who start their trip planning on Google.
          </p>
          <p className="text-gray-600 leading-relaxed">
            For Napier businesses, Google Ads competition is meaningfully lower than in Wellington or
            Auckland. That means lower cost-per-click for most keyword categories — but only if
            campaigns are properly structured. Generic or poorly targeted campaigns still waste budget
            in regional markets.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Hawke&apos;s Bay&apos;s distinct seasons — summer beach and wine tourism peaking from
            November to March, Art Deco Festival in February — create natural opportunities for
            seasonally adjusted campaign budgets and messaging that captures peak demand.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">What Our Napier Google Ads Work Includes</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Keyword Research & Strategy',
              desc: "Napier and Hawke's Bay-specific keyword research: local intent searches, tourist queries, commercial queries, and competitor analysis. We identify what Hawke's Bay customers are actually searching for and build campaigns around those signals.",
            },
            {
              title: 'Campaign Setup & Structure',
              desc: "Proper Google Ads account architecture: tightly themed ad groups, match type strategy, negative keyword lists, and ad extensions configured for Napier businesses. Built for ongoing optimisation, not set-and-forget.",
            },
            {
              title: 'Local Geographic Targeting',
              desc: "Napier CBD, suburbs, and wider Hawke's Bay geographic targeting. Radius targeting around your business location, or targeted coverage across your entire service area.",
            },
            {
              title: 'Ad Copy & Creative',
              desc: "Responsive Search Ads and ad copy that speaks to Napier customers' and visitors' specific needs. A/B testing of messaging, offers, and CTAs to improve click-through rates and qualified traffic.",
            },
            {
              title: 'Conversion Tracking',
              desc: "Full conversion tracking setup: phone calls, form submissions, bookings, and purchases tracked back to specific keywords and ads. You know exactly which Hawke's Bay searches are generating business.",
            },
            {
              title: 'Monthly Optimisation & Reporting',
              desc: "Weekly bid adjustments, search term analysis, budget optimisation, and monthly reports in plain English. What's performing, what's not, and what we're changing.",
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
            { title: "Google Ads Agency Napier — Full Guide", href: '/blog/google-ads-agency-napier' },
            { title: 'Google Ads Services NZ', href: '/services/google-ads-nz' },
            { title: 'Napier Marketing Hub', href: '/napier' },
            { title: 'SEO Agency Napier', href: '/napier/seo-agency' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to dominate Napier search results?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            If you want Google Ads that generate real leads for your Napier or Hawke&apos;s Bay business —
            not just clicks and impressions — apply below. We review every application.
          </p>
          <Link
            href="/apply"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg"
          >
            Apply to Work With Us
          </Link>
          <p className="text-gray-400 text-sm mt-4">3–5 client spots. Napier &amp; Hawke&apos;s Bay businesses welcome.</p>
        </div>
      </section>

      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2026 Junction Media. New Zealand.</p>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Home</Link>
            <Link href="/napier" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Napier</Link>
            <Link href="/services/google-ads-nz" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Google Ads NZ</Link>
            <Link href="/apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
