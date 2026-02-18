import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Meta Ads Agency Wellington | Facebook & Instagram Ads Wellington | Junction Media',
  description: 'Meta Ads agency in Wellington managing Facebook and Instagram advertising for NZ businesses. AI-assisted targeting, creative testing, and revenue-focused reporting. $1,500–$3,500/mo.',
  keywords: 'Meta Ads agency Wellington, Facebook ads Wellington, Instagram ads Wellington, social media advertising Wellington, Meta advertising Wellington, Facebook marketing Wellington NZ',
  openGraph: {
    title: 'Meta Ads Agency Wellington | Junction Media',
    description: 'AI-assisted Meta Ads management for Wellington businesses. Facebook and Instagram advertising that connects to real revenue outcomes.',
    url: 'https://www.junctionmedia.ai/wellington/meta-ads-agency',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/wellington/meta-ads-agency',
  },
}

const faqs = [
  {
    q: 'How much does Meta Ads management cost in Wellington?',
    a: 'Wellington Meta Ads management typically costs $1,500–$3,500/month for professional management, separate from your ad spend budget. At Junction Media, we build full campaign structures, run creative testing, and optimise continuously — not just set-and-forget. We recommend a minimum ad spend of $2,000/month to generate meaningful data for optimisation.',
  },
  {
    q: 'Are Meta Ads (Facebook & Instagram) effective for Wellington businesses?',
    a: 'Yes — when done well. Wellington has strong Meta platform penetration, and Facebook/Instagram advertising remains one of the most cost-effective ways to reach Wellington consumers across age groups. The key is targeting precision, creative quality, and connecting ad performance to actual business outcomes rather than vanity metrics.',
  },
  {
    q: 'What industries benefit most from Meta Ads in Wellington?',
    a: 'Wellington e-commerce, hospitality (restaurants, cafes, events), professional services, health and wellness, real estate, and retail all see strong results from well-managed Meta Ads. Wellington\'s government and corporate sector typically responds better to LinkedIn — we\'ll be honest if Meta isn\'t the right channel for your category.',
  },
  {
    q: 'How long before Wellington Meta Ads campaigns are profitable?',
    a: 'Most campaigns need 4–8 weeks to generate enough data for meaningful optimisation. In months 2–3, you should see clear trends — what audiences, creatives, and offers are converting. By month 3–4, well-structured campaigns typically reach a stable, profitable ROAS. We build with a 90-day runway in mind.',
  },
  {
    q: 'Do you handle creative (ad design) for Wellington Meta Ads?',
    a: 'Yes — creative strategy and production is included in our Meta Ads management. We build creative briefs, test formats (static, carousel, video), and iterate based on performance data. For Wellington brands, we focus on creative that feels local and authentic rather than generic stock imagery.',
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
        addressLocality: 'Wellington',
        addressRegion: 'Wellington',
        addressCountry: 'NZ',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -41.2865,
        longitude: 174.7762,
      },
      areaServed: {
        '@type': 'City',
        name: 'Wellington',
      },
      priceRange: '$$$',
    },
    {
      '@type': 'Service',
      name: 'Meta Ads Agency Wellington',
      provider: {
        '@type': 'Organization',
        name: 'Junction Media',
        url: 'https://www.junctionmedia.ai',
      },
      serviceType: 'Meta Ads Management',
      areaServed: {
        '@type': 'City',
        name: 'Wellington',
      },
      description: 'AI-assisted Meta Ads (Facebook and Instagram advertising) management for Wellington businesses. Campaign strategy, creative, targeting, and revenue-focused optimisation.',
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

export default function WellingtonMetaAdsAgencyPage() {
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
          Wellington · Meta Ads
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Meta Ads Agency Wellington
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          Facebook and Instagram advertising for Wellington businesses, managed with AI-assisted
          targeting and creative testing. We build Meta Ads systems that generate qualified leads
          and sales — not just reach and impressions.
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

      {/* Wellington Meta Ads Context */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Meta Ads in Wellington: The Honest Picture</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            Most Wellington businesses running Meta Ads are leaving money on the table. Not because
            the platform doesn&apos;t work — it does, for the right categories — but because their
            campaigns lack the structure, creative, and optimisation discipline that separates
            profitable accounts from wasted budget.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Wellington&apos;s Meta Ads landscape in 2026 rewards businesses that test creative
            systematically, understand their audience psychology, and connect ad spend to downstream
            revenue. The Wellington consumer is discerning — they respond to relevance, not just
            reach. Generic creative and broad targeting waste budget fast.
          </p>
          <p className="text-gray-600 leading-relaxed">
            What works for Wellington: tight audience segmentation (Wellingtonians by location,
            interest, and behaviour), creative that feels authentic to the Wellington market, and
            a clear funnel from awareness to conversion. We build campaigns with that framework
            from day one.
          </p>
        </div>
      </section>

      {/* What We Do */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">What Our Wellington Meta Ads Work Includes</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Campaign Architecture',
              desc: 'Awareness, consideration, and conversion campaigns built with proper structure from the start. Not just boosted posts — full Meta Ads Manager campaigns with audience segmentation, placement testing, and budget allocation strategy.',
            },
            {
              title: 'Audience Targeting',
              desc: 'Wellington-specific targeting using location, demographic, interest, and behavioural signals. Custom audiences from your existing data, lookalike audiences, and retargeting sequences that follow buyers through the funnel.',
            },
            {
              title: 'Creative Strategy & Production',
              desc: 'Ad creative built for performance: static images, carousels, and video scripts. We test multiple creative angles, iterate based on data, and brief Wellington-relevant photography and visual styles.',
            },
            {
              title: 'Pixel & Conversion Tracking',
              desc: 'Meta Pixel setup, event tracking, and conversion API configuration. We make sure your data is accurate — because optimisation is only as good as the signals you\'re feeding the algorithm.',
            },
            {
              title: 'Ongoing Optimisation',
              desc: 'Weekly campaign reviews: audience fatigue, creative performance, bid adjustments, and budget reallocation. AI-assisted monitoring identifies opportunities and issues before they become expensive.',
            },
            {
              title: 'Revenue Reporting',
              desc: 'Monthly reports that connect Meta Ads spend to revenue outcomes — not just click-through rates. We track cost-per-lead, cost-per-acquisition, and ROAS alongside platform metrics.',
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
            SEO, content, and customer support. Meta Ads was a core driver: structured campaigns,
            systematic creative testing, and revenue-connected reporting.
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
            { title: 'Meta Ads Agency Wellington — Full Guide', href: '/blog/meta-ads-agency-wellington' },
            { title: 'Meta Ads Services NZ', href: '/services/meta-ads-nz' },
            { title: 'Wellington Marketing Hub', href: '/wellington' },
            { title: 'Social Media Agency Wellington', href: '/wellington/social-media-agency' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to make Meta Ads work for your Wellington business?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            If you&apos;re tired of Meta Ads spend that doesn&apos;t translate to revenue — apply below.
            We review every application and are honest about whether we&apos;re the right fit.
          </p>
          <Link
            href="/apply"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg"
          >
            Apply to Work With Us
          </Link>
          <p className="text-gray-400 text-sm mt-4">3–5 client spots. Wellington & NZ businesses only.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2026 Junction Media. New Zealand.</p>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Home</Link>
            <Link href="/wellington" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Wellington</Link>
            <Link href="/services/meta-ads-nz" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Meta Ads NZ</Link>
            <Link href="/apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
