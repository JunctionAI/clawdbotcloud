import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Meta Ads Agency Christchurch | Facebook & Instagram Ads Christchurch | Junction Media',
  description: 'Meta Ads agency in Christchurch managing Facebook and Instagram advertising for Canterbury businesses. AI-assisted targeting, creative testing, revenue-focused reporting. $1,500–$3,500/mo.',
  keywords: 'Meta Ads agency Christchurch, Facebook ads Christchurch, Instagram ads Christchurch, social media advertising Christchurch, Meta advertising Canterbury, Facebook marketing Christchurch NZ',
  openGraph: {
    title: 'Meta Ads Agency Christchurch | Junction Media',
    description: 'AI-assisted Meta Ads management for Christchurch businesses. Facebook and Instagram advertising that connects to real revenue outcomes.',
    url: 'https://www.junctionmedia.ai/christchurch/meta-ads-agency',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/christchurch/meta-ads-agency',
  },
}

const faqs = [
  {
    q: 'How much does Meta Ads management cost in Christchurch?',
    a: 'Christchurch Meta Ads management typically costs $1,500–$3,500/month for professional management — separate from your ad spend budget. At Junction Media, we build full campaign structures, creative, and optimise continuously. We recommend a minimum ad spend of $1,500–$2,000/month in the Christchurch market to generate enough data for effective optimisation.',
  },
  {
    q: 'Are Meta Ads effective for Christchurch businesses?',
    a: 'Yes — Christchurch has strong Facebook and Instagram penetration, with particularly active Facebook community groups and local business pages. For consumer-facing businesses in Canterbury, Meta Ads is one of the highest-ROI channels when managed with proper campaign structure and targeting discipline.',
  },
  {
    q: 'Can you target Christchurch suburbs specifically with Meta Ads?',
    a: 'Yes — Meta\'s geographic targeting allows suburb-level and radius-based targeting across Christchurch. We can target specific areas like Riccarton, Fendalton, Merivale, Cashmere, and surrounding Canterbury regions with precision. This is particularly valuable for local service businesses and hospitality venues.',
  },
  {
    q: 'How long before Christchurch Meta Ads campaigns are profitable?',
    a: 'Most campaigns need 4–8 weeks to generate enough data for meaningful optimisation. In months 2–3, you should see clear performance trends. By month 3–4, well-structured campaigns typically reach consistent, profitable returns. We build with a 90-day minimum runway in mind and are transparent about expectations upfront.',
  },
  {
    q: 'Do you handle creative for Christchurch Meta Ads?',
    a: 'Yes — creative strategy and production is included in our management. We build creative briefs, test formats (static, carousel, video), and iterate based on performance data. For Christchurch brands, we focus on creative that reflects Canterbury\'s local character rather than generic national campaigns.',
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
        addressLocality: 'Christchurch',
        addressRegion: 'Canterbury',
        addressCountry: 'NZ',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -43.5321,
        longitude: 172.6362,
      },
      areaServed: {
        '@type': 'City',
        name: 'Christchurch',
      },
      priceRange: '$$$',
    },
    {
      '@type': 'Service',
      name: 'Meta Ads Agency Christchurch',
      provider: {
        '@type': 'Organization',
        name: 'Junction Media',
        url: 'https://www.junctionmedia.ai',
      },
      serviceType: 'Meta Ads Management',
      areaServed: {
        '@type': 'City',
        name: 'Christchurch',
      },
      description: 'AI-assisted Meta Ads (Facebook and Instagram) management for Christchurch businesses. Campaign strategy, creative, Canterbury-specific targeting, and revenue-focused optimisation.',
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

export default function ChristchurchMetaAdsAgencyPage() {
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
          Christchurch · Meta Ads
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Meta Ads Agency Christchurch
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          Facebook and Instagram advertising for Christchurch and Canterbury businesses. AI-assisted
          targeting, creative testing, and optimisation that turns Meta Ads spend into measurable
          revenue — not just impressions.
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

      {/* Key Numbers */}
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

      {/* Christchurch Meta Ads Context */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Meta Ads in Christchurch: What Works</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            Christchurch has one of New Zealand&apos;s most active Facebook communities. Local groups,
            business pages, and community networks are genuinely engaged — which creates a
            strong foundation for paid social when campaigns are built with local relevance in mind.
          </p>
          <p className="text-gray-600 leading-relaxed">
            The Christchurch Meta Ads landscape rewards businesses that understand the Canterbury
            audience. Creative that feels local, offers that resonate with Canterbury consumers,
            and targeting that reflects the geographic and demographic nuances of the Christchurch
            market all outperform generic national campaigns run with a Christchurch postcode added.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Christchurch businesses that invest in proper campaign structure — full funnel, systematic
            creative testing, conversion tracking, and monthly optimisation — see dramatically better
            results than those running boosted posts or set-and-forget campaigns.
          </p>
        </div>
      </section>

      {/* What We Do */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">What Our Christchurch Meta Ads Work Includes</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Campaign Architecture',
              desc: 'Awareness, consideration, and conversion campaigns built properly in Meta Ads Manager. Christchurch-specific audience segmentation, placement testing, and budget allocation — not just boosted posts.',
            },
            {
              title: 'Canterbury Audience Targeting',
              desc: 'Geographic targeting at the suburb level across Christchurch and greater Canterbury. Demographic, interest, and behavioural targeting tuned to the Canterbury consumer profile. Custom and lookalike audiences from your existing data.',
            },
            {
              title: 'Creative Strategy & Production',
              desc: 'Ad creative built for performance in the Christchurch market: static images, carousels, and video scripts. Multiple creative angles tested simultaneously, iterated based on data.',
            },
            {
              title: 'Pixel & Conversion Tracking',
              desc: 'Meta Pixel setup, event tracking, and Conversions API configuration. Accurate data is the foundation of good optimisation — we make sure your signal is clean.',
            },
            {
              title: 'Ongoing Optimisation',
              desc: 'Weekly campaign reviews: creative fatigue, audience performance, bid adjustments, and budget reallocation. AI-assisted monitoring keeps Christchurch campaigns performing.',
            },
            {
              title: 'Revenue Reporting',
              desc: 'Monthly reports connecting Meta Ads spend to business outcomes — cost-per-lead, cost-per-acquisition, ROAS. Not just click-through rates and reach.',
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
            SEO, content, and customer support. Meta Ads was central to the result — structured
            campaigns, creative testing, and revenue-connected reporting.
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
            { title: 'Meta Ads Agency Christchurch — Full Guide', href: '/blog/meta-ads-agency-christchurch' },
            { title: 'Meta Ads Services NZ', href: '/services/meta-ads-nz' },
            { title: 'Christchurch Marketing Hub', href: '/christchurch' },
            { title: 'Social Media Agency Christchurch', href: '/christchurch/social-media-agency' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to make Meta Ads work for your Christchurch business?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            If you&apos;re spending on Facebook and Instagram ads without seeing real returns — apply below.
            We review every application and are honest about whether we&apos;re the right fit.
          </p>
          <Link
            href="/apply"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg"
          >
            Apply to Work With Us
          </Link>
          <p className="text-gray-400 text-sm mt-4">3–5 client spots. Christchurch & NZ businesses only.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2026 Junction Media. New Zealand.</p>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Home</Link>
            <Link href="/christchurch" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Christchurch</Link>
            <Link href="/services/meta-ads-nz" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Meta Ads NZ</Link>
            <Link href="/apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
