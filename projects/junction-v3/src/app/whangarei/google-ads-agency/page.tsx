import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Google Ads Agency Whangarei | AI-Managed Google Ads for Whangarei Businesses | Junction Media',
  description: 'Google Ads agency in Whangarei managing PPC campaigns for Northland businesses. AI-assisted bidding, keyword strategy, and conversion tracking. Real leads, measurable ROI. $1,200–$2,500/mo.',
  keywords: 'Google Ads agency Whangarei, Google Ads Whangarei, PPC agency Whangarei, Google AdWords Whangarei, pay per click Whangarei, Whangarei Google Ads management, Northland Google Ads',
  openGraph: {
    title: 'Google Ads Agency Whangarei | Junction Media',
    description: 'AI-managed Google Ads for Whangarei and Northland businesses. Keyword strategy, campaign management, and revenue-focused reporting.',
    url: 'https://www.junctionmedia.ai/whangarei/google-ads-agency',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/whangarei/google-ads-agency',
  },
}

const faqs = [
  {
    q: 'How much does Google Ads management cost in Whangarei?',
    a: 'Google Ads management for Whangarei businesses typically costs $1,200–$2,500/month for professional management, separate from your ad spend budget. Management fees cover strategy, campaign setup, keyword research, ongoing optimisation, and monthly reporting. We recommend a minimum ad spend of $1,000/month in the Whangarei/Northland market.',
  },
  {
    q: 'Is Google Ads effective for Whangarei businesses?',
    a: 'Yes — Google Ads is one of the most effective channels for Whangarei businesses targeting high-intent local searches like "plumber Whangarei," "dentist Whangarei," or "Whangarei builder." Northland is a growing commercial market, and Google Ads provides immediate visibility while longer-term channels like SEO build.',
  },
  {
    q: 'What Whangarei industries benefit most from Google Ads?',
    a: 'Whangarei trades, tourism and accommodation businesses, healthcare, automotive, retail, and professional services all benefit from Google Ads. The region\'s tourism economy means seasonal demand spikes are well-suited to paid search. We\'ll advise honestly if a different channel would serve your Whangarei business better.',
  },
  {
    q: 'How quickly can Google Ads generate leads for a Whangarei business?',
    a: 'Google Ads can generate leads within days of launch. Most Whangarei campaigns generate initial enquiries in the first week. The first 4–6 weeks is optimisation and data collection; by month 2–3, campaigns are typically running efficiently with cost-per-lead tracking in place.',
  },
  {
    q: 'Do you target the wider Northland region, not just Whangarei city?',
    a: 'Yes — we build campaigns with geographic targeting that reflects your actual service area. For Whangarei-based businesses, this typically includes Whangarei city, Kerikeri, Paihia, Bay of Islands, Mangawhai, and surrounding Northland communities as appropriate.',
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
        name: 'Whangarei',
      },
      priceRange: '$$$',
    },
    {
      '@type': 'Service',
      name: 'Google Ads Agency Whangarei',
      provider: {
        '@type': 'Organization',
        name: 'Junction Media',
        url: 'https://www.junctionmedia.ai',
      },
      serviceType: 'Google Ads Management',
      areaServed: {
        '@type': 'City',
        name: 'Whangarei',
      },
      description: 'AI-managed Google Ads for Whangarei and Northland businesses. Search campaigns, keyword strategy, conversion tracking, and revenue-focused optimisation.',
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

export default function WhangareiGoogleAdsAgencyPage() {
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
          Whangarei · Google Ads
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Google Ads Agency Whangarei
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          AI-managed Google Ads for Whangarei and Northland businesses. We build search campaigns that
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
        <h2 className="text-2xl font-bold mb-6">Google Ads in Whangarei: The Opportunity</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            Whangarei is Northland&apos;s commercial capital — a city of 55,000+ with a growing
            services economy and a thriving tourism sector that draws visitors from Auckland and
            internationally. It&apos;s also a gateway city for the Bay of Islands and Far North,
            meaning search catchment extends well beyond the city limits.
          </p>
          <p className="text-gray-600 leading-relaxed">
            This creates a real opportunity for Whangarei businesses willing to invest in Google Ads
            properly. Lower competition than Auckland means lower cost-per-click for most keywords,
            but only if your campaigns are structured to capture the right intent. Poor campaign
            structure wastes budget in any market — and Whangarei is no exception.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Whangarei&apos;s tourism economy also creates seasonal opportunities. Summer search volumes
            for accommodation, activities, and dining spike significantly — smart campaign management
            capitalises on this with seasonally adjusted budgets and targeted messaging.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">What Our Whangarei Google Ads Work Includes</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Keyword Research & Strategy',
              desc: 'Whangarei and Northland-specific keyword research: local intent searches, commercial queries, and competitor analysis. We identify what Northland customers are actually searching for and build campaigns around those signals.',
            },
            {
              title: 'Campaign Setup & Structure',
              desc: 'Proper Google Ads account architecture: tightly themed ad groups, match type strategy, negative keyword lists, and ad extensions configured for Whangarei businesses. Built for ongoing optimisation, not set-and-forget.',
            },
            {
              title: 'Local Geographic Targeting',
              desc: 'Whangarei CBD, suburbs, and wider Northland geographic targeting. Radius targeting around your business location, or targeted coverage across your entire service area including Bay of Islands.',
            },
            {
              title: 'Ad Copy & Creative',
              desc: 'Responsive Search Ads and ad copy that speaks to Whangarei customers\' specific needs. A/B testing of messaging, offers, and CTAs to improve click-through rates and qualified traffic.',
            },
            {
              title: 'Conversion Tracking',
              desc: 'Full conversion tracking setup: phone calls, form submissions, and purchases tracked back to specific keywords and ads. You know exactly which Northland searches are generating business.',
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
            { title: 'Google Ads Agency Whangarei — Full Guide', href: '/blog/google-ads-agency-whangarei' },
            { title: 'Google Ads Services NZ', href: '/services/google-ads-nz' },
            { title: 'Whangarei Marketing Hub', href: '/whangarei' },
            { title: 'SEO Agency Whangarei', href: '/whangarei/seo-agency' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to dominate Whangarei search results?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            If you want Google Ads that generate real leads for your Whangarei or Northland business —
            not just clicks and impressions — apply below. We review every application.
          </p>
          <Link
            href="/apply"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg"
          >
            Apply to Work With Us
          </Link>
          <p className="text-gray-400 text-sm mt-4">3–5 client spots. Whangarei & Northland businesses welcome.</p>
        </div>
      </section>

      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2026 Junction Media. New Zealand.</p>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Home</Link>
            <Link href="/whangarei" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Whangarei</Link>
            <Link href="/services/google-ads-nz" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Google Ads NZ</Link>
            <Link href="/apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
