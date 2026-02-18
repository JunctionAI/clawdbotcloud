import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Social Media Agency Nelson | Social Media Marketing Nelson | Junction Media',
  description: 'Social media agency serving Nelson businesses. AI-driven content, Meta Ads, and social strategy for Nelson CBD, Richmond, and the Tasman region. Strategy-led, not post-and-hope.',
  keywords: 'social media agency Nelson, social media marketing Nelson, social media management Nelson, Instagram marketing Nelson, Facebook marketing Nelson, Meta Ads Nelson, social media consultant Nelson NZ',
  openGraph: {
    title: 'Social Media Agency Nelson | Junction Media',
    description: 'AI-driven social media marketing for Nelson businesses. Strategy, content, Meta Ads, and reporting that connects to revenue.',
    url: 'https://www.junctionmedia.ai/nelson/social-media-agency',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/nelson/social-media-agency',
  },
}

const faqs = [
  {
    q: 'How much does social media management cost in Nelson?',
    a: 'Nelson social media management at Junction Media typically sits in the $1,500–$3,000/month range depending on scope — content production, paid social (Meta Ads), and reporting included. Basic posting-only packages start lower but rarely deliver meaningful business outcomes.',
  },
  {
    q: 'Which social media platforms should Nelson businesses focus on?',
    a: 'For most Nelson consumer brands: Instagram and Facebook (Meta) are the highest-ROI paid social platforms. For B2B and professional services: LinkedIn. Nelson\'s arts and lifestyle community is also active on Instagram. We always recommend 1–2 platforms done well over spreading thin across five.',
  },
  {
    q: 'Is organic social media still worth it for Nelson businesses?',
    a: 'Organic social is valuable for brand credibility and community building in Nelson — especially for arts, hospitality, and tourism businesses where visual storytelling is compelling. But for most Nelson businesses, organic social supports paid social rather than being a standalone acquisition channel.',
  },
  {
    q: 'Do you run Meta Ads for Nelson businesses?',
    a: 'Yes — Meta Ads is a core part of our Nelson social media work. We build campaign structures for awareness, consideration, and conversion, with Nelson-specific audience targeting, creative testing, and AI-assisted optimisation.',
  },
  {
    q: 'What results can Nelson businesses expect from social media marketing?',
    a: 'For paid social (Meta Ads), Nelson ecommerce and tourism clients typically see ROAS of 3–6x in established campaigns. For service businesses, cost-per-lead improves meaningfully after 60–90 days of optimisation. Organic social supports overall conversion rates and brand trust.',
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
        { '@type': 'City', name: 'Nelson' },
        { '@type': 'City', name: 'Auckland' },
      ],
      priceRange: '$$$',
    },
    {
      '@type': 'Service',
      name: 'Social Media Agency Nelson',
      provider: {
        '@type': 'Organization',
        name: 'Junction Media',
        url: 'https://www.junctionmedia.ai',
      },
      serviceType: 'Social Media Marketing',
      areaServed: { '@type': 'City', name: 'Nelson' },
      description: 'AI-driven social media marketing for Nelson businesses. Strategy, content creation, Meta Ads, and reporting that connects to revenue.',
      offers: {
        '@type': 'Offer',
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: '1500',
          maxPrice: '3000',
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

export default function NelsonSocialMediaAgencyPage() {
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
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Nelson · Social Media</p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Social Media Agency Nelson
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          AI-driven social media marketing for Nelson businesses. Strategy, content, Meta Ads,
          and reporting that connects to revenue — not just likes and follower counts.
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
            { stat: '$1.5k–$3k', label: 'Per month NZD' },
            { stat: 'Meta', label: 'Primary paid social platform' },
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
        <h2 className="text-2xl font-bold mb-6">Social Media in Nelson: Strategy Over Volume</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            Nelson is an arts-engaged, lifestyle-oriented city with a strong sense of community.
            Local residents follow and support local businesses on social media more than in larger
            cities — making authentic social media strategy genuinely valuable here.
          </p>
          <p className="text-gray-600 leading-relaxed">
            But &quot;post and hope&quot; strategies rarely deliver business outcomes. The Nelson businesses
            that win on social media combine organic content (brand building, community connection)
            with paid social (Meta Ads) that drives measurable leads and sales.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We build integrated social strategies that use both — connecting to your CRM or
            e-commerce data so you know exactly what is converting.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">What Our Nelson Social Media Work Includes</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Social Media Strategy',
              desc: 'Platform selection, content pillars, posting frequency, and campaign calendar — built around your Nelson business goals, not generic templates.',
            },
            {
              title: 'Content Creation',
              desc: 'AI-assisted content production: graphics, copy, and short-form video. Nelson-specific visual storytelling that resonates with the local community.',
            },
            {
              title: 'Meta Ads Management',
              desc: 'Facebook and Instagram paid campaigns for Nelson audience targeting. Creative testing, bid optimisation, and conversion tracking from day one.',
            },
            {
              title: 'Community Management',
              desc: 'Comment moderation, DM responses, and community engagement — so your Nelson social presence is active and responsive without eating your time.',
            },
            {
              title: 'Analytics & Reporting',
              desc: 'Monthly reports showing reach, engagement, follower growth, paid ad performance, and what is driving website traffic and leads.',
            },
            {
              title: 'Competitor Analysis',
              desc: 'Ongoing monitoring of what Nelson competitors and leading brands in your category are doing on social. We find the gaps and exploit them.',
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
            Deep Blue Health hit their best revenue month ever in November 2025. Social media and
            Meta Ads were core components of the integrated system we built — alongside SEO, Google
            Ads, and content.
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
            { title: 'Social Media Services NZ', href: '/services/social-media-nz' },
            { title: 'Meta Ads Agency Nelson', href: '/nelson/meta-ads-agency' },
            { title: 'Social Media Agency Nelson — Blog', href: '/blog/social-media-agency-nelson' },
            { title: 'Nelson Marketing Hub', href: '/nelson' },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="p-4 border border-gray-100 rounded-xl hover:border-gray-300 transition-colors text-sm font-medium text-gray-700 hover:text-gray-900">
              {link.title} →
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-20 border-t border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to build a social media presence that actually grows your Nelson business?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            Apply below. We review every application and work with businesses serious about social media as a real revenue channel.
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
            <Link href="/nelson" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Nelson</Link>
            <Link href="/services/social-media-nz" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Social Media NZ</Link>
            <Link href="/apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
