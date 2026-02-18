import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Social Media Agency Invercargill | Southland Social Media Management | Junction Media',
  description: 'Social media agency serving Invercargill businesses. AI-powered content, strategy, and community management for Southland retail, hospitality, and local services. $1,200–$2,800/mo.',
  keywords: 'social media agency Invercargill, social media management Invercargill, social media marketing Southland, Instagram management Invercargill, Facebook management Invercargill NZ',
  openGraph: {
    title: 'Social Media Agency Invercargill | Junction Media',
    description: 'AI-native social media management for Invercargill businesses. Content strategy, community management, and organic growth across Instagram, Facebook, and LinkedIn.',
    url: 'https://www.junctionmedia.ai/invercargill/social-media-agency',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/invercargill/social-media-agency',
  },
}

const faqs = [
  {
    q: 'How much does social media management cost for an Invercargill business?',
    a: 'Social media management at Junction Media ranges from $1,200–$2,800/month NZD. $1,200/month covers content strategy and 3–4 posts per week. $2,800/month adds multi-platform management, community engagement, and detailed monthly reporting. All engagements are 3-month minimum.',
  },
  {
    q: 'Which platforms should Invercargill businesses focus on?',
    a: 'For most Invercargill consumer businesses, Facebook is the primary community platform — deeply embedded in how Southland locals stay connected and discover businesses. Instagram suits visual brands (food, retail, lifestyle). LinkedIn is important for B2B, manufacturing, and professional services. We assess and recommend the right mix.',
  },
  {
    q: 'Can social media help grow a local Invercargill business?',
    a: 'Yes — consistent, quality social media content builds brand recognition and community trust in Invercargill. Southland communities have strong local loyalty; businesses that show up consistently on social media build the kind of familiarity that drives word-of-mouth and repeat business.',
  },
  {
    q: 'Do you create the content or does our team?',
    a: 'We handle content creation end-to-end: strategy, copywriting, graphic design, and scheduling. Your team provides brand assets, photography where available, and approvals. We can work with your existing content or build a fresh content system from scratch.',
  },
  {
    q: 'Is social media management different from Meta Ads?',
    a: 'Yes — social media management is organic: building your brand presence through regular content and community engagement. Meta Ads is paid amplification. Both complement each other; many Invercargill businesses run both. Organic builds community trust; paid reaches new audiences and drives direct conversions.',
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
        { '@type': 'City', name: 'Invercargill' },
        { '@type': 'City', name: 'Auckland' },
      ],
      priceRange: '$$$',
    },
    {
      '@type': 'Service',
      name: 'Social Media Agency Invercargill',
      provider: {
        '@type': 'Organization',
        name: 'Junction Media',
        url: 'https://www.junctionmedia.ai',
      },
      serviceType: 'Social Media Management',
      areaServed: { '@type': 'City', name: 'Invercargill' },
      description: 'AI-native social media management for Invercargill and Southland businesses. Content strategy, community management, and organic growth.',
      offers: {
        '@type': 'Offer',
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: '1200',
          maxPrice: '2800',
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
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    },
  ],
}

export default function InvercargillSocialMediaAgencyPage() {
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
        <Link href="/apply" className="text-sm bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors">
          Apply to Work With Us
        </Link>
      </nav>

      <section className="max-w-3xl mx-auto px-6 pt-20 pb-16">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Invercargill · Social Media</p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Social Media Agency Invercargill
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          AI-native social media management for Invercargill businesses. We build content strategies,
          create compelling posts, and grow engaged communities across Facebook, Instagram, and LinkedIn —
          connecting your brand to the Southland community consistently and authentically.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/apply" className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors text-center">
            Apply to Work With Us
          </Link>
          <Link href="/services/social-media-nz" className="inline-block border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:border-gray-500 transition-colors text-center">
            View Social Media Services
          </Link>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-12 border-t border-gray-100">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { stat: '$1.2k–$2.8k', label: 'Per month NZD' },
            { stat: '3–4x', label: 'Posts per week' },
            { stat: '+30%', label: 'DBH sales record (month 1)' },
            { stat: '3-month', label: 'Minimum engagement' },
          ].map((item) => (
            <div key={item.label} className="p-4 border border-gray-100 rounded-2xl text-center">
              <p className="text-2xl font-bold text-gray-900 mb-1">{item.stat}</p>
              <p className="text-xs text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Social Media in Invercargill: Building Southland Community</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            Invercargill has a distinct community culture — hard-working, loyal, locally proud.
            Facebook is central to how Southlanders stay connected with their community and discover
            local businesses. For Invercargill businesses, consistent social media presence is one
            of the most direct ways to build brand recognition and community trust.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Most Invercargill businesses have social accounts. Few post consistently or with genuine
            strategy. The ones that do build real competitive advantages — top-of-mind awareness,
            word-of-mouth amplification, and community loyalty that advertising alone cannot buy.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We build social media systems — not one-off campaigns. Content calendars, visual brand
            consistency, community engagement protocols, and monthly performance reviews. Social
            media that works for your Invercargill business consistently over time.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">What Our Invercargill Social Media Management Includes</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Content Strategy',
              desc: 'Platform-specific content strategy aligned to your Invercargill and Southland audience. Content pillars, posting cadence, voice and tone, and monthly editorial calendars.',
            },
            {
              title: 'Content Creation',
              desc: 'Copywriting, graphic design, and video scripting for every post. AI-assisted production maintaining brand voice and platform best practices across Facebook, Instagram, and LinkedIn.',
            },
            {
              title: 'Scheduling & Publishing',
              desc: 'Content scheduled at optimal times for your Southland audience. Consistent publishing cadence — your profile always active and visible in the community.',
            },
            {
              title: 'Community Management',
              desc: 'Comments monitored, DMs managed, community engagement maintained. Your Invercargill audience gets prompt, brand-appropriate responses that build community trust.',
            },
            {
              title: 'Discovery Optimisation',
              desc: 'Platform-native discovery: hashtag research, location tagging, profile SEO, and engagement strategies that grow your organic reach in Invercargill and Southland.',
            },
            {
              title: 'Monthly Reporting',
              desc: 'Follower growth, engagement rate, reach, top-performing content, and strategic recommendations. Plain English, focused on what matters for your Invercargill business.',
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
            { title: 'Social Media Invercargill — Blog', href: '/blog/social-media-invercargill' },
            { title: 'Social Media Services NZ', href: '/services/social-media-nz' },
            { title: 'Invercargill Marketing Hub', href: '/invercargill' },
            { title: 'Meta Ads Agency Invercargill', href: '/invercargill/meta-ads-agency' },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="p-4 border border-gray-100 rounded-xl hover:border-gray-300 transition-colors text-sm font-medium text-gray-700 hover:text-gray-900">
              {link.title} →
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-20 border-t border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to build your Invercargill social presence?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            Apply below. We work with a small number of Invercargill and Southland businesses at
            a time — apply to see if we are the right fit.
          </p>
          <Link href="/apply" className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg">
            Apply to Work With Us
          </Link>
          <p className="text-gray-400 text-sm mt-4">Limited client spots. NZ businesses only.</p>
        </div>
      </section>

      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2026 Junction Media. Auckland, New Zealand.</p>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Home</Link>
            <Link href="/invercargill" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Invercargill</Link>
            <Link href="/services/social-media-nz" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Social Media NZ</Link>
            <Link href="/apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
