import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Social Media Agency Wellington | AI-Driven Social Media Marketing Wellington | Junction Media',
  description: 'Social media agency in Wellington delivering AI-powered content, Meta Ads, and community management for Wellington businesses. Strategy-led, results-focused. $1,500–$3,000/mo.',
  keywords: 'social media agency Wellington, social media marketing Wellington, social media management Wellington, Instagram marketing Wellington, Facebook marketing Wellington, Meta Ads Wellington, social media consultant Wellington',
  openGraph: {
    title: 'Social Media Agency Wellington | Junction Media',
    description: 'AI-driven social media marketing for Wellington businesses. Strategy, content, Meta Ads, and reporting that connects to revenue.',
    url: 'https://www.junctionmedia.ai/wellington/social-media-agency',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/wellington/social-media-agency',
  },
}

const faqs = [
  {
    q: 'How much does social media management cost in Wellington?',
    a: 'Wellington social media management typically ranges from $800/month for basic content posting to $5,000+/month for full-service strategy, content creation, community management, and paid social. At Junction Media, social media services sit in the $1,500–$3,000/month range depending on scope — content production, Meta Ads management, and reporting included.',
  },
  {
    q: 'Which social platforms should Wellington businesses focus on?',
    a: 'For most Wellington consumer brands and professional services: Instagram and Facebook (Meta) remain the highest-ROI paid social platforms in NZ. For Wellington\'s strong government and B2B sector: LinkedIn is essential. For lifestyle and hospitality brands targeting younger demographics: TikTok is growing fast. We recommend starting with 1–2 platforms executed well rather than spreading thin.',
  },
  {
    q: 'Is organic social media still worth it for Wellington businesses?',
    a: 'Organic social has lower reach than five years ago, but it remains valuable for brand credibility, community building, and retargeting. Honest answer: for most Wellington businesses, organic social supports paid social — it\'s rarely a standalone acquisition channel. We build strategies that use both in an integrated way.',
  },
  {
    q: 'Do you run Meta Ads for Wellington businesses?',
    a: 'Yes — Meta Ads is a core part of our Wellington social media work. We build campaign structures for awareness, consideration, and conversion, with Wellington-specific audience targeting, creative testing, and AI-assisted optimisation. We connect ad performance directly to your CRM or e-commerce data so you know what\'s actually converting.',
  },
  {
    q: 'What results can Wellington businesses expect from social media marketing?',
    a: 'It depends on your category, budget, and starting point. For paid social (Meta Ads), Wellington e-commerce and service businesses typically see meaningful cost-per-lead improvements after 60–90 days of active optimisation. We don\'t promise ROAS figures before we understand your business — but we do promise transparent reporting and a strategy built around actual revenue outcomes.',
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
      name: 'Social Media Agency Wellington',
      provider: {
        '@type': 'Organization',
        name: 'Junction Media',
        url: 'https://www.junctionmedia.ai',
      },
      serviceType: 'Social Media Marketing',
      areaServed: {
        '@type': 'City',
        name: 'Wellington',
      },
      description: 'AI-driven social media marketing for Wellington businesses. Strategy, content creation, Meta Ads management, and community management that connects social to revenue.',
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

export default function WellingtonSocialMediaAgencyPage() {
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
          Wellington · Social Media
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Social Media Agency Wellington
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          AI-driven social media marketing for Wellington businesses. Content strategy, Meta Ads,
          and community management that connects your social presence to actual revenue — not just
          vanity metrics and follower counts.
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

      {/* Wellington Market Context */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Social Media in Wellington: What Actually Works</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            Wellington&apos;s market is distinct from Auckland. As the capital, it has a high concentration
            of government agencies, professional services, hospitality, and creative industries. The
            Wellington consumer is generally well-educated, digitally savvy, and sceptical of generic
            marketing — which means content quality matters more here than in most NZ cities.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Wellington&apos;s compact geography and strong community culture make word-of-mouth and
            social proof particularly powerful. A well-executed social media presence can move
            faster here than in larger, more diffuse markets — because Wellington&apos;s networks are
            tight and conversations spread quickly.
          </p>
          <p className="text-gray-600 leading-relaxed">
            What doesn&apos;t work in Wellington: generic stock imagery, templated captions, and
            metrics-obsessed reporting that doesn&apos;t tie to business outcomes. Wellington audiences
            respond to authenticity, local relevance, and genuine expertise — and can tell the
            difference between strategy and activity.
          </p>
        </div>
      </section>

      {/* What We Do */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">What Our Wellington Social Media Work Includes</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Social Media Strategy',
              desc: 'Wellington-specific audience research, platform selection, content pillars, and a 90-day roadmap. No generic templates — strategy built around your business objectives and Wellington market dynamics.',
            },
            {
              title: 'Content Creation',
              desc: 'AI-assisted content production: captions, graphics, short-form video scripts, and photography briefs. Content that reflects your brand voice and resonates with Wellington audiences — not stock imagery and generic quotes.',
            },
            {
              title: 'Meta Ads (Facebook & Instagram)',
              desc: 'Campaign structure, audience targeting, creative testing, and ongoing optimisation for Wellington and national reach. We connect Meta Ads performance to actual revenue — not just impressions and clicks.',
            },
            {
              title: 'Community Management',
              desc: 'Responding to comments and DMs in your brand voice, escalating leads and service queries, and building genuine engagement with your Wellington audience.',
            },
            {
              title: 'LinkedIn Marketing',
              desc: 'For Wellington\'s professional services and B2B businesses, LinkedIn strategy and content that builds authority and drives qualified leads. Wellington\'s government and corporate sector are active on LinkedIn.',
            },
            {
              title: 'Reporting & Insights',
              desc: 'Plain-English monthly reports connecting social performance to business outcomes. What\'s working, what\'s not, what we\'re testing next. Revenue metrics, not just reach.',
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

      {/* Wellington Specifics */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">We Understand the Wellington Market</h2>
        <div className="space-y-4">
          {[
            'Wellington CBD, Te Aro, Thorndon, Newtown — Wellington\'s core commercial and hospitality areas where social media drives direct foot traffic and brand awareness',
            'Government and professional services sector — Wellington\'s dominant industry, requiring LinkedIn-first strategies and authority-building content',
            'Wellington\'s hospitality scene (Cuba St, waterfront, Courtenay Place) — highly social-media-driven with strong local followings and food/lifestyle audiences',
            'Petone, Lower Hutt, and the Hutt Valley — growing commercial areas with active local communities and strong Facebook group presence',
            'Wellington\'s creative and tech sector — early adopters who respond to genuine innovation and see through templated, generic social approaches',
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
            { title: 'Social Media Agency Wellington — Full Guide', href: '/blog/social-media-agency-wellington' },
            { title: 'Social Media Services NZ', href: '/services/social-media-nz' },
            { title: 'Wellington Marketing Hub', href: '/wellington' },
            { title: 'Meta Ads Agency Wellington', href: '/wellington/meta-ads-agency' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to make social media work for your Wellington business?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            If you&apos;re serious about turning social media into a genuine acquisition channel for your
            Wellington business — not just content for content&apos;s sake — apply below. We review every application.
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
            <Link href="/services/social-media-nz" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Social Media NZ</Link>
            <Link href="/apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
