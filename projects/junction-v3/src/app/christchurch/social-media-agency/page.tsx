import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Social Media Agency Christchurch | AI-Driven Social Media Marketing Christchurch | Junction Media',
  description: 'Social media agency in Christchurch delivering AI-powered content, Meta Ads, and community management for Canterbury businesses. Strategy-led, results-focused. $1,500–$3,000/mo.',
  keywords: 'social media agency Christchurch, social media marketing Christchurch, social media management Christchurch, Instagram marketing Christchurch, Facebook marketing Christchurch, Meta Ads Christchurch',
  openGraph: {
    title: 'Social Media Agency Christchurch | Junction Media',
    description: 'AI-driven social media marketing for Christchurch businesses. Strategy, content, Meta Ads, and reporting that connects to revenue.',
    url: 'https://www.junctionmedia.ai/christchurch/social-media-agency',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/christchurch/social-media-agency',
  },
}

const faqs = [
  {
    q: 'How much does social media management cost in Christchurch?',
    a: 'Christchurch social media management ranges from $800/month for basic posting to $5,000+/month for full-service strategy, content, and paid social. At Junction Media, social media services for Christchurch businesses sit in the $1,500–$3,000/month range — content production, Meta Ads management, and reporting included.',
  },
  {
    q: 'Which social platforms should Christchurch businesses focus on?',
    a: 'For most Christchurch consumer brands: Facebook and Instagram (Meta) remain the highest-ROI platforms in Canterbury. Christchurch has a strong Facebook culture — community groups, local business pages, and neighbourhood networks are more active here than in many NZ cities. For professional services and B2B: LinkedIn. For younger demographics: TikTok is growing.',
  },
  {
    q: 'Is Christchurch\'s market different from Auckland or Wellington for social media?',
    a: 'Yes. Christchurch has a strong community identity and local pride — especially post-rebuild. Social media that taps into this local culture performs significantly better than generic content. Christchurch audiences respond to authenticity, local knowledge, and content that demonstrates a genuine connection to Canterbury.',
  },
  {
    q: 'Do you run Meta Ads for Christchurch businesses?',
    a: 'Yes — Meta Ads is core to our Christchurch social media work. We build campaigns with proper structure: audience segmentation, creative testing, conversion tracking, and monthly reporting connected to business outcomes. We target Canterbury-specific audiences including Christchurch CBD, suburbs, and greater Canterbury region.',
  },
  {
    q: 'What results can Christchurch businesses expect from social media?',
    a: 'It depends on your category, budget, and starting point. For e-commerce and retail, Meta Ads can deliver meaningful ROAS improvements within 60–90 days of active management. For service businesses, cost-per-lead typically improves over the same period. We set realistic expectations upfront and report transparently on what\'s working.',
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
      name: 'Social Media Agency Christchurch',
      provider: {
        '@type': 'Organization',
        name: 'Junction Media',
        url: 'https://www.junctionmedia.ai',
      },
      serviceType: 'Social Media Marketing',
      areaServed: {
        '@type': 'City',
        name: 'Christchurch',
      },
      description: 'AI-driven social media marketing for Christchurch businesses. Strategy, content creation, Meta Ads management, and community management that connects social to revenue.',
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

export default function ChristchurchSocialMediaAgencyPage() {
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
          Christchurch · Social Media
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Social Media Agency Christchurch
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          AI-driven social media marketing for Christchurch and Canterbury businesses. Content
          strategy, Meta Ads, and community management that builds genuine local presence —
          and connects to actual revenue, not just follower growth.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/apply"
            className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors text-center"
          >
            Apply to Work With Us
          </Link>
          <Link
            href="/services/social-media-nz"
            className="inline-block border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:border-gray-500 transition-colors text-center"
          >
            View Social Media Services
          </Link>
        </div>
      </section>

      {/* Key Numbers */}
      <section className="max-w-3xl mx-auto px-6 py-12 border-t border-gray-100">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { stat: '$1.5k–$3k', label: 'Per month NZD' },
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

      {/* Christchurch Market Context */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Social Media in Christchurch: The Local Reality</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            Christchurch is New Zealand&apos;s second-largest city by land area and one of the most
            dynamic business environments in the country. The post-rebuild era has brought a wave
            of new businesses, hospitality venues, and commercial development — creating a competitive
            but opportunity-rich market for businesses willing to invest in their digital presence.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Christchurch has a strong Facebook culture relative to other NZ cities — community groups,
            local business pages, and suburb-level networks are particularly active. This makes organic
            community engagement and paid social advertising particularly effective in Canterbury.
          </p>
          <p className="text-gray-600 leading-relaxed">
            What resonates with Christchurch audiences: local pride, community connection, and
            businesses that clearly understand and serve the Canterbury market. Generic national
            campaigns perform poorly here — local relevance is a significant competitive advantage.
          </p>
        </div>
      </section>

      {/* What We Do */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">What Our Christchurch Social Media Work Includes</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Social Media Strategy',
              desc: 'Christchurch-specific audience research, platform selection, content pillars, and a 90-day roadmap. Built around your business objectives and Canterbury market dynamics — not a template used across 50 other clients.',
            },
            {
              title: 'Content Creation',
              desc: 'AI-assisted content production: captions, graphics, short-form video scripts, and photography briefs. Content that reflects Christchurch\'s local culture and your brand voice — not stock imagery.',
            },
            {
              title: 'Meta Ads (Facebook & Instagram)',
              desc: 'Campaign structure, Canterbury-specific audience targeting, creative testing, and ongoing optimisation. Christchurch and greater Canterbury geographic targeting with suburb-level precision.',
            },
            {
              title: 'Community Management',
              desc: 'Responding to comments and DMs in your brand voice, building genuine engagement with the Christchurch community, and escalating leads and service enquiries promptly.',
            },
            {
              title: 'Local Influencer & Partner Strategy',
              desc: 'Identifying Christchurch-based content creators and local business partnerships that extend your reach authentically. Canterbury-specific networks that national campaigns miss.',
            },
            {
              title: 'Reporting & Insights',
              desc: 'Plain-English monthly reports connecting social performance to business outcomes. What\'s working in the Christchurch market, what\'s not, and what we\'re testing next.',
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
            SEO, content, and customer support. The result: 30% above their previous all-time record,
            in month one of the engagement.
          </p>
        </div>
      </section>

      {/* Christchurch Specifics */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">We Know the Christchurch Market</h2>
        <div className="space-y-4">
          {[
            'Christchurch CBD and central city — rapidly developing commercial area with hospitality, retail, and professional services all competing for local attention',
            'Riccarton and Hornby — Christchurch\'s key retail and commercial corridors with strong suburban Facebook and Instagram audiences',
            'Sumner, Lyttelton, and coastal communities — distinct local cultures with tight community networks particularly receptive to authentic local social content',
            'Greater Canterbury (Selwyn, Waimakariri) — growing residential areas with active families and strong community Facebook group culture',
            'Christchurch\'s tech and construction sectors — post-rebuild industries driving significant B2B opportunity, particularly on LinkedIn',
          ].map((item, i) => (
            <div key={i} className="flex gap-3">
              <span className="text-gray-400 mt-0.5 flex-shrink-0">→</span>
              <p className="text-gray-600 text-sm">{item}</p>
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
            { title: 'Social Media Agency Christchurch — Full Guide', href: '/blog/social-media-agency-christchurch' },
            { title: 'Social Media Services NZ', href: '/services/social-media-nz' },
            { title: 'Christchurch Marketing Hub', href: '/christchurch' },
            { title: 'Meta Ads Agency Christchurch', href: '/christchurch/meta-ads-agency' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to build a real social media presence in Christchurch?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            If you want social media that actually moves your Christchurch business forward —
            not just posts for the sake of it — apply below. We review every application.
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
            <Link href="/services/social-media-nz" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Social Media NZ</Link>
            <Link href="/apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
