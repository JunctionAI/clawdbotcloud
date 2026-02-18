import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Meta Ads Agency Hamilton | Facebook & Instagram Ads Hamilton | Junction Media',
  description: 'Meta Ads agency in Hamilton managing Facebook and Instagram advertising for Waikato businesses. AI-assisted targeting, creative testing, and revenue-focused results. $1,500–$3,500/mo.',
  keywords: 'Meta Ads agency Hamilton, Facebook ads Hamilton, Instagram ads Hamilton, social media advertising Hamilton, Meta advertising Waikato, Facebook marketing Hamilton NZ',
  openGraph: {
    title: 'Meta Ads Agency Hamilton | Junction Media',
    description: 'AI-assisted Meta Ads management for Hamilton businesses. Facebook and Instagram advertising that drives real leads and revenue.',
    url: 'https://www.junctionmedia.ai/hamilton/meta-ads-agency',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/hamilton/meta-ads-agency',
  },
}

const faqs = [
  {
    q: 'How much does Meta Ads management cost in Hamilton?',
    a: 'Meta Ads management for Hamilton businesses typically costs $1,500–$3,500/month for professional management — separate from your ad spend budget. In the Hamilton/Waikato market, we recommend a minimum ad spend of $1,500/month to generate enough data for effective optimisation. Management covers strategy, creative, campaign setup, and ongoing optimisation.',
  },
  {
    q: 'Are Meta Ads effective for Hamilton businesses?',
    a: 'Yes — Hamilton and the Waikato region have strong Facebook and Instagram penetration. For local service businesses, retail, hospitality, and consumer brands, Meta Ads is one of the most cost-effective paid channels when managed with proper campaign structure. Hamilton\'s market is less competitive than Auckland, which often means lower CPCs and CPLs.',
  },
  {
    q: 'Can you target specific Hamilton suburbs with Meta Ads?',
    a: 'Yes — Meta\'s geographic targeting allows suburb-level and radius-based targeting across Hamilton. We can target Hamilton CBD, Chartwell, Rototuna, Hillcrest, Flagstaff, and surrounding Waikato communities with precision. This is particularly effective for local service businesses and hospitality venues.',
  },
  {
    q: 'What types of Hamilton businesses work best with Meta Ads?',
    a: 'Consumer-facing businesses in Hamilton typically see the best Meta Ads results: retail, hospitality, health and wellness, home services, real estate, automotive, and e-commerce. For Hamilton\'s B2B and professional services sector, we often recommend a combination of Meta Ads for brand awareness and Google Ads or LinkedIn for intent-based lead generation.',
  },
  {
    q: 'How do you measure Meta Ads success for Hamilton businesses?',
    a: 'We measure what matters to your Hamilton business: cost-per-lead, cost-per-acquisition, and ROAS — not just reach and impressions. We set up proper conversion tracking (Meta Pixel + Conversions API), connect ad performance to CRM or sales data where possible, and report monthly in plain English.',
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
      name: 'Meta Ads Agency Hamilton',
      provider: {
        '@type': 'Organization',
        name: 'Junction Media',
        url: 'https://www.junctionmedia.ai',
      },
      serviceType: 'Meta Ads Management',
      areaServed: {
        '@type': 'City',
        name: 'Hamilton',
      },
      description: 'AI-assisted Meta Ads (Facebook and Instagram) management for Hamilton businesses. Campaign strategy, creative, Waikato-specific targeting, and revenue-focused optimisation.',
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

export default function HamiltonMetaAdsAgencyPage() {
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
          Hamilton · Meta Ads
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Meta Ads Agency Hamilton
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          Facebook and Instagram advertising for Hamilton and Waikato businesses. AI-assisted
          targeting, creative testing, and structured campaign management that turns Meta Ads
          spend into qualified leads and revenue.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/apply"
            className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors text-center"
          >
            Apply to Work With Us
          </Link>
          <Link
            href="/services/meta-ads-nz"
            className="inline-block border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:border-gray-500 transition-colors text-center"
          >
            View Meta Ads Services
          </Link>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-12 border-t border-gray-100">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { stat: '$1.5k–$3.5k', label: 'Management per month NZD' },
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
        <h2 className="text-2xl font-bold mb-6">Meta Ads in Hamilton: The Opportunity</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            Hamilton is a rapidly growing city with a diverse commercial base — agriculture, trades,
            healthcare, retail, and increasingly, tech and professional services. The Waikato region
            has strong Meta platform usage, with Facebook particularly active among Hamilton&apos;s
            community and business networks.
          </p>
          <p className="text-gray-600 leading-relaxed">
            For many Hamilton business categories, Meta Ads CPCs and CPLs are meaningfully lower
            than Auckland — but the management quality gap between good and poor campaigns is just
            as large. Boosted posts and poorly structured campaigns waste budget regardless of
            market size.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Hamilton businesses that invest in proper Meta Ads management — full campaign structure,
            systematic creative testing, conversion tracking, and monthly optimisation — see
            significantly better returns than those running ad hoc social advertising.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">What Our Hamilton Meta Ads Work Includes</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Campaign Architecture',
              desc: 'Full-funnel Meta Ads campaigns built properly in Ads Manager. Awareness, consideration, and conversion campaigns with Waikato-specific audience segmentation.',
            },
            {
              title: 'Hamilton Audience Targeting',
              desc: 'Geographic targeting at the suburb level across Hamilton. Custom audiences from your existing data, lookalike audiences built from Hamilton customer profiles, and retargeting sequences.',
            },
            {
              title: 'Creative Strategy & Production',
              desc: 'Ad creative that resonates with Hamilton audiences: static images, carousels, and video scripts. Multiple angles tested simultaneously with data-driven iteration.',
            },
            {
              title: 'Conversion Tracking Setup',
              desc: 'Meta Pixel, Conversions API, and event tracking configured correctly. Accurate conversion data is the foundation of profitable Meta Ads optimisation.',
            },
            {
              title: 'Ongoing Optimisation',
              desc: 'Weekly campaign reviews: creative fatigue detection, audience performance, bid adjustments, and budget reallocation. AI-assisted monitoring keeps campaigns running efficiently.',
            },
            {
              title: 'Revenue Reporting',
              desc: 'Monthly reports connecting Meta Ads spend to business outcomes — cost-per-lead, cost-per-acquisition, ROAS. Plain English, no vanity metrics.',
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
            SEO, content, and customer support. Meta Ads was a core driver of the result.
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
            { title: 'Meta Ads Agency Hamilton — Full Guide', href: '/blog/meta-ads-agency-hamilton' },
            { title: 'Meta Ads Services NZ', href: '/services/meta-ads-nz' },
            { title: 'Hamilton Marketing Hub', href: '/hamilton' },
            { title: 'Google Ads Agency Hamilton', href: '/hamilton/google-ads-agency' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to make Meta Ads work for your Hamilton business?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            If you&apos;re spending on Facebook and Instagram without seeing real business results — apply below.
            We review every application and give you an honest assessment.
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

      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2026 Junction Media. New Zealand.</p>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Home</Link>
            <Link href="/hamilton" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Hamilton</Link>
            <Link href="/services/meta-ads-nz" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Meta Ads NZ</Link>
            <Link href="/apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
