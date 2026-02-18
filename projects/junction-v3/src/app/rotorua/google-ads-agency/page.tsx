import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Google Ads Agency Rotorua | AI-Managed Google Ads for Bay of Plenty Businesses | Junction Media',
  description: 'Google Ads agency in Rotorua managing PPC campaigns for Bay of Plenty businesses. AI-assisted bidding, keyword strategy, and conversion tracking for tourism, trades, and hospitality. $1,200–$2,500/mo.',
  keywords: "Google Ads agency Rotorua, Google Ads Rotorua, PPC agency Rotorua, Google AdWords Rotorua, pay per click Rotorua, Rotorua Google Ads management, Bay of Plenty Google Ads",
  openGraph: {
    title: "Google Ads Agency Rotorua | Junction Media",
    description: "AI-managed Google Ads for Rotorua and Bay of Plenty businesses. Keyword strategy, campaign management, and revenue-focused reporting.",
    url: 'https://www.junctionmedia.ai/rotorua/google-ads-agency',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/rotorua/google-ads-agency',
  },
}

const faqs = [
  {
    q: "How much does Google Ads management cost in Rotorua?",
    a: "Google Ads management for Rotorua businesses typically costs $1,200–$2,500/month for professional management, separate from your ad spend budget. Management fees cover strategy, campaign setup, keyword research, ongoing optimisation, and monthly reporting. We recommend a minimum ad spend of $1,000/month in the Rotorua/Bay of Plenty market.",
  },
  {
    q: "Is Google Ads effective for Rotorua businesses?",
    a: "Yes — Google Ads is one of the most effective channels for Rotorua businesses targeting high-intent searches like 'accommodation Rotorua,' 'thermal pools Rotorua,' or 'plumber Rotorua.' The city's massive tourism economy and year-round visitor flow make it well-suited to paid search. Google Ads provides immediate visibility while longer-term channels like SEO build.",
  },
  {
    q: "What Rotorua industries benefit most from Google Ads?",
    a: "Tourism and accommodation, adventure activities, Māori cultural experiences, geothermal attractions, trades, healthcare, professional services, and hospitality businesses all benefit from Google Ads in Rotorua. The tourism economy creates strong seasonal demand — with domestic travel peaking in summer and school holidays, and international visitors driving year-round volume.",
  },
  {
    q: "How quickly can Google Ads generate leads for a Rotorua business?",
    a: "Google Ads can generate leads within days of launch. Most Rotorua campaigns see initial enquiries in the first week. The first 4–6 weeks is optimisation and data collection; by month 2–3, campaigns are typically running efficiently with clear cost-per-lead data.",
  },
  {
    q: "Do you target the wider Bay of Plenty region, not just Rotorua city?",
    a: "Yes — we build campaigns with geographic targeting that reflects your actual service area. For Rotorua-based businesses this typically includes Rotorua city, Taupo, Whakatane, Tokoroa, and surrounding Bay of Plenty communities as appropriate to your business model.",
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
        name: 'Rotorua',
      },
      priceRange: '$$$',
    },
    {
      '@type': 'Service',
      name: 'Google Ads Agency Rotorua',
      provider: {
        '@type': 'Organization',
        name: 'Junction Media',
        url: 'https://www.junctionmedia.ai',
      },
      serviceType: 'Google Ads Management',
      areaServed: {
        '@type': 'City',
        name: 'Rotorua',
      },
      description: 'AI-managed Google Ads for Rotorua and Bay of Plenty businesses. Search campaigns, keyword strategy, conversion tracking, and revenue-focused optimisation.',
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

export default function RotoruaGoogleAdsAgencyPage() {
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
          Rotorua · Google Ads
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Google Ads Agency Rotorua
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          AI-managed Google Ads for Rotorua and Bay of Plenty businesses. We build search campaigns
          that capture high-intent local and visitor traffic and turn clicks into qualified leads —
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
        <h2 className="text-2xl font-bold mb-6">Google Ads in Rotorua: The Opportunity</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            Rotorua is one of New Zealand&apos;s most-visited cities — a geothermal wonderland
            that draws over 3 million visitors annually with its thermal pools, Te Arawa Māori
            cultural experiences, Whakarewarewa Forest mountain biking, and world-class adventure
            tourism. This creates a powerful commercial opportunity: a resident population of 60,000+
            served year-round, plus a constant stream of high-spending visitors actively searching
            for businesses like yours on Google.
          </p>
          <p className="text-gray-600 leading-relaxed">
            For Rotorua businesses, Google Ads competition is meaningfully lower than in Wellington
            or Auckland. That means lower cost-per-click for most keyword categories — and faster
            returns on ad spend for well-structured campaigns. The key is building campaigns specific
            to the Rotorua market rather than applying generic templates.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Rotorua&apos;s tourism seasons — summer domestic travel peaks, school holidays,
            international visitor flows from Australia and Asia — create natural opportunities
            for seasonally adjusted campaigns that capitalise on peak demand with precise messaging.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">What Our Rotorua Google Ads Work Includes</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Keyword Research & Strategy',
              desc: "Rotorua and Bay of Plenty-specific keyword research: tourist queries, local intent searches, commercial queries, and competitor analysis. We identify what visitors and locals are actually searching for and build campaigns around those signals.",
            },
            {
              title: 'Campaign Setup & Structure',
              desc: "Proper Google Ads account architecture: tightly themed ad groups, match type strategy, negative keyword lists, and ad extensions configured for Rotorua businesses. Built for ongoing optimisation, not set-and-forget.",
            },
            {
              title: 'Local Geographic Targeting',
              desc: "Rotorua CBD, suburbs, and wider Bay of Plenty geographic targeting. Radius targeting around your business location, or broad coverage across your entire service area — including tourist accommodation zones.",
            },
            {
              title: 'Ad Copy & Creative',
              desc: "Responsive Search Ads and ad copy that speaks to Rotorua customers' and visitors' specific needs. A/B testing of messaging, offers, and CTAs to improve click-through rates and attract qualified, high-intent traffic.",
            },
            {
              title: 'Conversion Tracking',
              desc: "Full conversion tracking setup: phone calls, form submissions, bookings, and purchases tracked back to specific keywords and ads. You know exactly which Rotorua searches are generating real business.",
            },
            {
              title: 'Monthly Optimisation & Reporting',
              desc: "Weekly bid adjustments, search term analysis, budget optimisation, and monthly reports in plain English. What's performing, what's not, and what we're changing next month.",
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
            { title: "Google Ads Agency Rotorua — Full Guide", href: '/blog/google-ads-agency-rotorua' },
            { title: 'Google Ads Services NZ', href: '/services/google-ads-nz' },
            { title: 'Rotorua Marketing Hub', href: '/rotorua' },
            { title: 'SEO Agency Rotorua', href: '/rotorua/seo-agency' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to dominate Rotorua search results?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            If you want Google Ads that generate real leads for your Rotorua or Bay of Plenty business —
            not just clicks and impressions — apply below. We review every application.
          </p>
          <Link
            href="/apply"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg"
          >
            Apply to Work With Us
          </Link>
          <p className="text-gray-400 text-sm mt-4">3–5 client spots. Rotorua &amp; Bay of Plenty businesses welcome.</p>
        </div>
      </section>

      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2026 Junction Media. New Zealand.</p>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Home</Link>
            <Link href="/rotorua" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Rotorua</Link>
            <Link href="/services/google-ads-nz" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Google Ads NZ</Link>
            <Link href="/apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
