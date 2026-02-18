import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Social Media Agency Hamilton | AI-Driven Social Media Marketing Hamilton | Junction Media',
  description: 'Social media agency in Hamilton delivering AI-powered content, Meta Ads, and community management for Waikato businesses. Strategy-led, revenue-focused. $1,500–$3,000/mo.',
  keywords: 'social media agency Hamilton, social media marketing Hamilton, social media management Hamilton, Instagram marketing Hamilton, Facebook marketing Hamilton, Meta Ads Hamilton, social media consultant Hamilton',
  openGraph: {
    title: 'Social Media Agency Hamilton | Junction Media',
    description: 'AI-driven social media marketing for Hamilton and Waikato businesses. Content, Meta Ads, and reporting that connects to real business growth.',
    url: 'https://www.junctionmedia.ai/hamilton/social-media-agency',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/hamilton/social-media-agency',
  },
}

const faqs = [
  {
    q: 'How much does social media management cost in Hamilton?',
    a: 'Hamilton social media management typically ranges from $800/month for basic posting to $4,000+/month for full-service strategy, content creation, and paid social. At Junction Media, social media services for Hamilton businesses sit in the $1,500–$3,000/month range — content production, Meta Ads, and reporting included.',
  },
  {
    q: 'Which social platforms work best for Hamilton businesses?',
    a: 'For most Hamilton consumer brands and local service businesses: Facebook remains particularly strong in the Waikato market — community groups and local business pages are highly active. Instagram works well for lifestyle, hospitality, and retail. For Hamilton\'s B2B and agri-business sector: LinkedIn. We recommend starting with 1–2 platforms done well.',
  },
  {
    q: 'Is social media marketing worth it for Hamilton businesses?',
    a: 'Yes, when done with a clear strategy and proper execution. Hamilton\'s market has strong social media engagement — particularly on Facebook — and lower competition than Auckland for paid social. But social media only delivers ROI when it\'s connected to business objectives, not just post frequency and follower counts.',
  },
  {
    q: 'Can you manage both organic social and Meta Ads for our Hamilton business?',
    a: 'Yes — we typically manage both together. Organic social builds brand credibility and community, while Meta Ads provides direct acquisition. For most Hamilton businesses, the combination produces better results than either in isolation. We build integrated strategies where organic content and paid campaigns reinforce each other.',
  },
  {
    q: 'What makes Junction Media different from other Hamilton social media agencies?',
    a: 'We work with 3–5 clients at a time — not 50. Every Hamilton client gets genuine strategic attention, not templated content from a junior team member. We use AI for production efficiency (content drafting, scheduling, reporting) but strategy and creative direction are always human-led. And we measure success by revenue impact, not follower growth.',
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
      name: 'Social Media Agency Hamilton',
      provider: {
        '@type': 'Organization',
        name: 'Junction Media',
        url: 'https://www.junctionmedia.ai',
      },
      serviceType: 'Social Media Marketing',
      areaServed: {
        '@type': 'City',
        name: 'Hamilton',
      },
      description: 'AI-driven social media marketing for Hamilton and Waikato businesses. Content strategy, Meta Ads management, and community management.',
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

export default function HamiltonSocialMediaAgencyPage() {
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
          Hamilton · Social Media
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Social Media Agency Hamilton
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          AI-driven social media marketing for Hamilton and Waikato businesses. Content strategy,
          Meta Ads, and community management that builds genuine local presence — and connects
          your social channels to actual business growth.
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

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Social Media in Hamilton: What the Market Looks Like</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            Hamilton is New Zealand&apos;s fourth-largest city and the commercial heart of the Waikato.
            With a young, growing population and a strong mix of trades, agriculture, retail,
            healthcare, and emerging tech businesses, Hamilton is an increasingly active and
            competitive social media market.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Facebook is particularly strong in Hamilton and the wider Waikato — community groups,
            local business pages, and suburb-level networks have high engagement rates. This creates
            a strong foundation for both organic community building and paid social advertising
            when content is locally relevant and well-targeted.
          </p>
          <p className="text-gray-600 leading-relaxed">
            What works in Hamilton: content that reflects the local community, authentic brand voices,
            and social media strategies connected to clear business objectives. What doesn&apos;t work:
            generic content, purely aspirational posting without strategy, and agencies reporting
            on reach and impressions without connecting to leads or revenue.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">What Our Hamilton Social Media Work Includes</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Social Media Strategy',
              desc: 'Hamilton-specific audience research, platform selection, content pillars, and a 90-day roadmap. Built around your Waikato market position and business objectives.',
            },
            {
              title: 'Content Creation',
              desc: 'AI-assisted content production: captions, graphics, and video scripts. Content that reflects Hamilton\'s local culture and your brand voice — community-relevant, not generic.',
            },
            {
              title: 'Meta Ads (Facebook & Instagram)',
              desc: 'Full campaign management with Hamilton and Waikato geographic targeting, creative testing, and ongoing optimisation. Paid social connected to real business outcomes.',
            },
            {
              title: 'Community Management',
              desc: 'Responding to comments and DMs in your brand voice, building genuine community engagement, and escalating leads and enquiries to your team.',
            },
            {
              title: 'Facebook Group Strategy',
              desc: 'For Hamilton businesses serving local communities, Facebook group participation and content strategy can be a significant organic channel. We build approaches that work within Facebook\'s community norms.',
            },
            {
              title: 'Performance Reporting',
              desc: 'Monthly reports that connect social media activity to business outcomes — leads generated, sales influenced, and engagement that moves the needle for your Hamilton business.',
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
            SEO, content, and customer support. The result: 30% above their previous all-time record,
            in month one of the engagement.
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
            { title: 'Social Media Agency Hamilton — Full Guide', href: '/blog/social-media-agency-hamilton' },
            { title: 'Social Media Services NZ', href: '/services/social-media-nz' },
            { title: 'Hamilton Marketing Hub', href: '/hamilton' },
            { title: 'Meta Ads Agency Hamilton', href: '/hamilton/meta-ads-agency' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to build a social media presence that grows your Hamilton business?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            If you want social media that actually generates leads and revenue for your Hamilton or
            Waikato business — apply below. We review every application.
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
            <Link href="/services/social-media-nz" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Social Media NZ</Link>
            <Link href="/apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
