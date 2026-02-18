import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Social Media Agency Auckland | AI-Driven Social Media Marketing Auckland | Junction Media',
  description: 'Social media agency in Auckland delivering AI-powered content, Meta Ads, and community management for NZ businesses. Strategy-led, not post-and-hope. Real results.',
  keywords: 'social media agency Auckland, social media marketing Auckland, social media management Auckland, Instagram marketing Auckland, Facebook marketing Auckland, Meta Ads Auckland, social media consultant Auckland',
  openGraph: {
    title: 'Social Media Agency Auckland | Junction Media',
    description: 'AI-driven social media marketing for Auckland businesses. Strategy, content, Meta Ads, and reporting that connects to revenue.',
    url: 'https://www.junctionmedia.ai/auckland/social-media-agency',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/auckland/social-media-agency',
  },
}

const faqs = [
  {
    q: 'How much does social media management cost in Auckland?',
    a: 'Auckland social media management ranges from $800/month for basic posting to $5,000+/month for full-service strategy, content creation, community management, and paid social. At Junction Media, social media services typically sit in the $1,500–$3,000/month range depending on scope — content production, paid social (Meta Ads), and reporting included.',
  },
  {
    q: 'Which social media platforms should Auckland businesses focus on?',
    a: 'It depends on your audience. For most Auckland consumer brands: Instagram and Facebook (Meta) remain the highest-ROI paid social platforms in NZ. For B2B and professional services: LinkedIn. For younger demographics and lifestyle brands: TikTok is growing fast in NZ. We always recommend starting with 1–2 platforms done well rather than spreading thin across five.',
  },
  {
    q: 'Is organic social media still worth it for Auckland businesses?',
    a: 'Organic social has lower reach than it did five years ago, but it\'s still valuable for brand credibility, community building, and retargeting audiences. The honest truth: for most Auckland businesses, organic social supports paid social — it\'s rarely a standalone acquisition channel. We build strategies that use both in an integrated way.',
  },
  {
    q: 'Do you run Meta Ads (Facebook and Instagram ads) for Auckland businesses?',
    a: 'Yes — Meta Ads is a core part of our Auckland social media work. We build campaign structures for awareness, consideration, and conversion, with Auckland-specific audience targeting, creative testing, and AI-assisted optimisation. We link ad performance directly to your CRM or e-commerce data so you know what\'s actually converting.',
  },
  {
    q: 'What results can Auckland businesses expect from social media marketing?',
    a: 'Honest answer: it depends on your category, budget, and starting point. For paid social (Meta Ads), Auckland e-commerce clients typically see ROAS of 3–6x in established campaigns. For service businesses, expect cost-per-lead to improve meaningfully after 60–90 days of active optimisation. Organic social is harder to measure directly but supports overall conversion rates.',
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
        name: 'Auckland',
      },
      priceRange: '$$$',
    },
    {
      '@type': 'Service',
      name: 'Social Media Agency Auckland',
      provider: {
        '@type': 'Organization',
        name: 'Junction Media',
        url: 'https://www.junctionmedia.ai',
      },
      serviceType: 'Social Media Marketing',
      areaServed: {
        '@type': 'City',
        name: 'Auckland',
      },
      description: 'AI-driven social media marketing for Auckland businesses. Strategy, content creation, Meta Ads management, and community management.',
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

export default function AucklandSocialMediaAgencyPage() {
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
          Auckland · Social Media
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Social Media Agency Auckland
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          Strategy-led social media marketing for Auckland businesses. Content that builds brand,
          Meta Ads that drive revenue, and reporting that connects every post and campaign to
          actual business outcomes — not vanity metrics.
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
            { stat: 'Meta + IG', label: 'Primary Auckland platforms' },
            { stat: 'AI-assisted', label: 'Content production' },
            { stat: '+30%', label: 'DBH sales record (month 1)' },
            { stat: 'Integrated', label: 'Organic + paid strategy' },
          ].map((item) => (
            <div key={item.label} className="p-4 border border-gray-100 rounded-2xl text-center">
              <p className="text-2xl font-bold text-gray-900 mb-1">{item.stat}</p>
              <p className="text-xs text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Auckland Social Media Context */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Auckland Social Media: What Actually Works</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            Auckland has one of the highest social media usage rates in the Asia-Pacific region.
            Facebook and Instagram remain dominant for consumer audiences; LinkedIn is essential
            for Auckland&apos;s large professional services sector; TikTok is growing fast among
            under-35s in Ponsonby, Grey Lynn, and the CBD.
          </p>
          <p className="text-gray-600 leading-relaxed">
            The mistake most Auckland businesses make: treating social media as a broadcast channel
            — posting content and hoping it reaches buyers. The reality is that organic reach on
            most platforms is under 5%. Social media marketing in 2026 means integrating organic
            content (for brand and retargeting) with paid social (for acquisition and conversion).
          </p>
          <p className="text-gray-600 leading-relaxed">
            We build integrated social media systems — content calendars, paid campaigns, and
            audience strategies that work together. Not just a content agency doing posts,
            or a media buyer running ads in isolation.
          </p>
        </div>
      </section>

      {/* What We Do */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">What Our Auckland Social Media Work Includes</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Social Media Strategy',
              desc: 'Platform selection, audience research, content pillars, and positioning that fits your Auckland brand. Strategy first — always — before we start producing content or running ads.',
            },
            {
              title: 'Content Creation',
              desc: 'AI-assisted content production: social copy, image briefs, video scripts, and carousel structures. Built to fit Auckland audiences — culturally relevant, brand-consistent, designed to perform.',
            },
            {
              title: 'Meta Ads Management',
              desc: 'Facebook and Instagram ad campaigns built for Auckland audiences. Awareness, consideration, and conversion campaigns with AI-assisted audience targeting and creative testing.',
            },
            {
              title: 'Community Management',
              desc: 'Comment moderation, DM responses, and community engagement for Auckland brands that need to maintain an active social presence without consuming your team\'s time.',
            },
            {
              title: 'Influencer & Creator Partnerships',
              desc: 'Auckland creator identification, brief development, and campaign coordination. From micro-influencers in specific Auckland communities to wider NZ creator campaigns.',
            },
            {
              title: 'Social Analytics & Reporting',
              desc: 'Monthly reporting that connects social performance to business metrics. Engagement, reach, ad ROAS, website traffic from social — all in plain English with clear next actions.',
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
            in November 2025. Meta Ads was a central pillar of the integrated system we built
            across paid social, Google Ads, SEO, and content. 30% above their previous all-time
            record in month one of the engagement.
          </p>
        </div>
      </section>

      {/* Auckland Platforms */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Platforms We Manage for Auckland Businesses</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { platform: 'Facebook', note: 'Broad Auckland audiences, local awareness' },
            { platform: 'Instagram', note: 'Visual brands, e-commerce, lifestyle' },
            { platform: 'LinkedIn', note: 'B2B, professional services, recruitment' },
            { platform: 'TikTok', note: 'Under-35s, lifestyle, hospitality' },
            { platform: 'Google Display', note: 'Retargeting, brand awareness' },
            { platform: 'YouTube', note: 'Video content, longer-form brand' },
          ].map((item) => (
            <div key={item.platform} className="p-4 border border-gray-100 rounded-xl">
              <p className="font-semibold text-gray-900 text-sm mb-1">{item.platform}</p>
              <p className="text-gray-500 text-xs">{item.note}</p>
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
            { title: 'Social Media Marketing NZ — Full Overview', href: '/services/social-media-nz' },
            { title: 'Meta Ads NZ — Service Page', href: '/services/meta-ads-nz' },
            { title: 'Social Media Agency Auckland — Blog', href: '/blog/social-media-agency-auckland' },
            { title: 'Auckland Marketing Hub', href: '/auckland' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to turn social media into a revenue channel?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            If you&apos;re an Auckland business serious about making social media actually work —
            not just post-and-hope — apply below.
          </p>
          <Link
            href="/apply"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg"
          >
            Apply to Work With Us
          </Link>
          <p className="text-gray-400 text-sm mt-4">Limited client spots. Auckland & NZ businesses only.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2026 Junction Media. Auckland, New Zealand.</p>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Home</Link>
            <Link href="/auckland" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Auckland</Link>
            <Link href="/services/social-media-nz" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Social Media NZ</Link>
            <Link href="/apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
