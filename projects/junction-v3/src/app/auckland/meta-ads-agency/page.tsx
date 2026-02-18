import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Meta Ads Agency Auckland | Facebook & Instagram Ads Auckland | Junction Media',
  description: 'Meta Ads agency serving Auckland businesses. AI-powered Facebook and Instagram advertising for Auckland CBD, North Shore, Ponsonby, Newmarket and beyond. $1,500–$3,500/mo.',
  keywords: 'Meta Ads agency Auckland, Facebook Ads Auckland, Instagram Ads Auckland, Facebook advertising Auckland, Meta advertising Auckland, social ads Auckland, paid social Auckland, Facebook ads agency NZ',
  openGraph: {
    title: 'Meta Ads Agency Auckland | Junction Media',
    description: 'AI-native Meta Ads (Facebook & Instagram) for Auckland businesses. Creative testing, audience strategy, and ROAS-focused management that compounds over time.',
    url: 'https://www.junctionmedia.ai/auckland/meta-ads-agency',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/auckland/meta-ads-agency',
  },
}

const faqs = [
  {
    q: 'How much does Meta Ads management cost for an Auckland business?',
    a: 'Meta Ads management at Junction Media ranges from $1,500–$3,500/month NZD depending on scope and ad spend. $1,500/month covers campaign management, weekly creative testing, and reporting for ad budgets up to ~$3,000/month. $3,500/month adds aggressive multi-audience testing, full creative production, and higher ad spend management. All engagements are 3-month minimum — Auckland paid social markets require time to optimise audiences and creative.',
  },
  {
    q: 'Is Meta advertising worth it for Auckland businesses in 2026?',
    a: 'Yes — Auckland has one of the highest Meta platform usage rates in New Zealand. Facebook and Instagram remain dominant channels for reaching Auckland consumers across lifestyle, health, home, fashion, food, and professional services categories. The difference between good and poor Meta results is almost entirely in creative quality and audience strategy — not the platform itself.',
  },
  {
    q: 'What Auckland industries do you run Meta Ads for?',
    a: 'We run Meta Ads for Auckland ecommerce brands, hospitality businesses (cafes, restaurants, bars), health and wellness operators, professional services, real estate, events, and retail. Auckland\'s density and diversity makes Meta particularly effective for local awareness campaigns, retargeting, and direct-response offers across these categories.',
  },
  {
    q: 'How do you approach creative for Auckland Meta campaigns?',
    a: 'Creative is the primary lever in Meta advertising — audience targeting has become largely automated. Our approach: test 5–10 creative variants per week, use Auckland-specific hooks and contexts where relevant, and rapidly double down on what outperforms. We produce static, video, and carousel formats depending on your offer and what the data says works.',
  },
  {
    q: 'Can you run Meta Ads for a business targeting specific Auckland suburbs or areas?',
    a: 'Yes — Meta\'s location targeting allows suburb-level and radius-based Auckland targeting. This is particularly useful for Auckland hospitality, local services, retail stores, and events. We combine geographic targeting with behavioural and interest signals to build efficient, high-relevance Auckland audiences.',
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
      areaServed: [
        { '@type': 'City', name: 'Auckland' },
      ],
      priceRange: '$$$',
    },
    {
      '@type': 'Service',
      name: 'Meta Ads Agency Auckland',
      provider: {
        '@type': 'Organization',
        name: 'Junction Media',
        url: 'https://www.junctionmedia.ai',
      },
      serviceType: 'Meta Advertising (Facebook & Instagram Ads)',
      areaServed: {
        '@type': 'City',
        name: 'Auckland',
      },
      description: 'AI-native Meta Ads management for Auckland businesses. Facebook and Instagram advertising strategy, creative testing, and ROAS-focused optimisation.',
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

export default function AucklandMetaAdsAgencyPage() {
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
          Auckland · Meta Ads
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Meta Ads Agency Auckland
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          AI-native Facebook and Instagram advertising for Auckland businesses. Creative that converts,
          audiences that scale, and ROAS that justifies every dollar spent — for Auckland ecommerce,
          hospitality, retail, health, and professional services.
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
            { stat: '$1.5k–$3.5k', label: 'Per month NZD' },
            { stat: '3-month', label: 'Minimum engagement' },
            { stat: '+30%', label: 'DBH sales record (month 1)' },
            { stat: 'Auckland-based', label: 'Local market expertise' },
          ].map((item) => (
            <div key={item.label} className="p-4 border border-gray-100 rounded-2xl text-center">
              <p className="text-2xl font-bold text-gray-900 mb-1">{item.stat}</p>
              <p className="text-xs text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Auckland Meta Ads Context */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Meta Ads in Auckland: Why Creative Is the Only Variable That Matters</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            Auckland is New Zealand&apos;s largest city and its most competitive digital advertising market.
            Over 1.7 million people live in the Auckland region — across the CBD, North Shore,
            West Auckland, South Auckland, and the wider metro area. Facebook and Instagram reach
            the vast majority of them.
          </p>
          <p className="text-gray-600 leading-relaxed">
            The challenge for Auckland businesses isn&apos;t access to Meta&apos;s platform — it&apos;s standing
            out in an increasingly crowded feed. Meta&apos;s algorithm has largely automated audience
            targeting. What the algorithm can&apos;t do is create compelling creative. That&apos;s the lever
            that determines whether your Auckland Meta campaigns generate 2x ROAS or 6x.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We run a systematic creative testing process: multiple variants per week, performance
            data driving decisions in days not months, and Auckland-specific messaging where it
            matters. The businesses winning on Auckland Meta in 2026 are the ones treating it
            like a creative production operation — not a set-and-forget ad platform.
          </p>
        </div>
      </section>

      {/* What We Do */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">What Auckland Meta Ads Work Includes</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Campaign Strategy & Structure',
              desc: 'Full-funnel campaign architecture across prospecting, retargeting, and retention. Auckland audience segmentation by location, interest, behaviour, and custom data — set up for scale from day one.',
            },
            {
              title: 'Creative Testing System',
              desc: '5–10 creative variants tested weekly. Static, video, and carousel formats. Auckland-specific hooks where relevant. Performance data drives creative decisions in days, not monthly review cycles.',
            },
            {
              title: 'Audience Strategy',
              desc: 'Interest stacking, lookalike audiences from your best Auckland customers, and retargeting sequences that convert warm traffic. As Meta\'s algorithm improves, we layer our audience intelligence on top.',
            },
            {
              title: 'Ad Copy & Hooks',
              desc: 'High-converting ad copy for Auckland audiences — short-form hooks that stop the scroll, body copy that builds desire, and CTAs that drive action. Copy tested at scale, not guessed once.',
            },
            {
              title: 'Pixel & Conversion Tracking',
              desc: 'Proper Meta Pixel setup, Conversions API integration, and event verification. Auckland businesses often run Meta Ads with broken tracking — we fix attribution so you know what\'s actually working.',
            },
            {
              title: 'Monthly Reporting',
              desc: 'Plain-English reporting every month: ROAS, CPL, creative performance, audience insights, spend, and next month\'s plan. No vanity metrics — just the numbers that connect to your Auckland business goals.',
            },
          ].map((item) => (
            <div key={item.title} className="p-6 border border-gray-100 rounded-2xl">
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DBH Result */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">A Result Worth Mentioning</h2>
        <div className="bg-gray-50 rounded-2xl p-8">
          <p className="text-3xl font-bold text-gray-900 mb-2">+30%</p>
          <p className="text-gray-500 text-sm mb-4">Above previous all-time store record — month 1</p>
          <p className="text-gray-600 leading-relaxed">
            Deep Blue Health — a New Zealand supplement brand — hit their best revenue month ever
            in November 2025. Meta Ads were a core part of the integrated AI marketing system we
            built across Google Ads, Meta Ads, SEO, content, and customer support. 30% above their
            previous all-time record in month one of the engagement.
          </p>
        </div>
      </section>

      {/* Auckland Areas */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Auckland Areas We Cover</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            'Auckland CBD', 'Ponsonby', 'Newmarket',
            'North Shore', 'Takapuna', 'Albany',
            'West Auckland', 'Henderson', 'South Auckland',
          ].map((area) => (
            <div key={area} className="p-3 border border-gray-100 rounded-xl text-sm text-gray-700 text-center">
              {area}
            </div>
          ))}
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
            { title: 'Meta Ads Agency Auckland — Blog', href: '/blog/meta-ads-agency-auckland' },
            { title: 'Meta Ads Services NZ — Full Overview', href: '/services/meta-ads-nz' },
            { title: 'Auckland Marketing Hub', href: '/auckland' },
            { title: 'Google Ads Agency Auckland', href: '/auckland/google-ads-agency' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to make Auckland Meta Ads actually work?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            If you&apos;re an Auckland business serious about turning Facebook and Instagram into a
            real revenue channel — apply below. We review every application.
          </p>
          <Link
            href="/apply"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg"
          >
            Apply to Work With Us
          </Link>
          <p className="text-gray-400 text-sm mt-4">Auckland & NZ businesses. 3–5 client spots.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2026 Junction Media. Auckland, New Zealand.</p>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Home</Link>
            <Link href="/auckland" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Auckland</Link>
            <Link href="/services/meta-ads-nz" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Meta Ads NZ</Link>
            <Link href="/apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
