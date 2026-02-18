import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Social Media Agency Whangarei | Social Media Marketing for Whangarei Businesses | Junction Media',
  description: 'Social media agency serving Whangarei and Northland businesses. Strategy, content, community management, and paid social for Instagram, Facebook, LinkedIn, and TikTok. $1,200–$2,500/mo.',
  keywords: 'social media agency Whangarei, social media marketing Whangarei, social media management Whangarei, Instagram marketing Whangarei, Facebook marketing Whangarei, social media Whangarei NZ, Northland social media agency',
  openGraph: {
    title: 'Social Media Agency Whangarei | Junction Media',
    description: 'AI-native social media marketing for Whangarei and Northland businesses. Strategy, content, and paid social that builds brand and drives revenue.',
    url: 'https://www.junctionmedia.ai/whangarei/social-media-agency',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/whangarei/social-media-agency',
  },
}

const faqs = [
  {
    q: 'How much does social media management cost for a Whangarei business?',
    a: 'Social media management for Whangarei businesses at Junction Media ranges from $1,200–$2,500/month NZD depending on scope. This includes strategy, content creation, scheduling, and reporting. Paid social advertising (Meta Ads, TikTok Ads) is managed separately with its own ad spend budget. We work with Whangarei businesses that are serious about social media as a real business channel.',
  },
  {
    q: 'Which social media platforms work best for Whangarei businesses?',
    a: 'Instagram and Facebook (Meta) have the broadest reach for most Whangarei consumer businesses. LinkedIn is the go-to for B2B professional services targeting Northland\'s professional sector. TikTok is increasingly relevant for hospitality, tourism, and lifestyle brands targeting younger Whangarei audiences. We recommend the right platform mix based on your industry and target customer.',
  },
  {
    q: 'Can social media help Whangarei businesses attract customers?',
    a: 'Absolutely — social media is one of the most effective ways for Whangarei businesses to build brand awareness, engage with the local Northland community, and attract new customers. Businesses in tourism, fishing, agriculture, professional services, retail, and trades all benefit from consistent, high-quality social media presence. The key is strategy and consistency — not just posting randomly.',
  },
  {
    q: 'How does social media work alongside other marketing channels for Whangarei businesses?',
    a: 'Social media works best as part of an integrated approach. For Whangarei businesses, the highest-ROI combination is typically: SEO for long-term organic growth, Google Ads for high-intent local search, and Meta/social for brand building, retargeting, and audience nurturing. Social media builds the brand awareness that makes paid search more effective and SEO content more shareable.',
  },
  {
    q: 'Do you create content or just manage accounts for Whangarei businesses?',
    a: 'We do both, depending on what your Whangarei business needs. Our social media management includes content strategy, copywriting, and creative direction. We can work with your existing visual assets or guide you on content production. For businesses with team members who can capture content on-site in Whangarei, we often find a hybrid model works best — we handle strategy and editing, you supply raw content.',
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
        { '@type': 'City', name: 'Whangarei' },
        { '@type': 'City', name: 'Auckland' },
      ],
      priceRange: '$$$',
    },
    {
      '@type': 'Service',
      name: 'Social Media Agency Whangarei',
      provider: {
        '@type': 'Organization',
        name: 'Junction Media',
        url: 'https://www.junctionmedia.ai',
      },
      serviceType: 'Social Media Marketing',
      areaServed: {
        '@type': 'City',
        name: 'Whangarei',
      },
      description: 'AI-native social media marketing for Whangarei and Northland businesses. Strategy, content, community management, and paid social across Instagram, Facebook, LinkedIn, and TikTok.',
      offers: {
        '@type': 'Offer',
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: '1200',
          maxPrice: '2500',
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

export default function WhangareiSocialMediaAgencyPage() {
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
          Whangarei · Social Media
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Social Media Agency Whangarei
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          AI-native social media marketing for Whangarei and Northland businesses. Strategy, content
          creation, community management, and paid social that builds genuine brand presence and
          drives real business results.
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
            { stat: '$1.2k–$2.5k', label: 'Management per month NZD' },
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
        <h2 className="text-2xl font-bold mb-6">Social Media in Whangarei: Building Brand & Community</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            Whangarei is the capital of Northland and the gateway to the Bay of Islands. The Northland social media landscape spans Northland community, Bay of Islands tourism audiences, and Whangarei businesses —
            a vibrant and engaged audience for businesses that show up with quality, consistent content.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Most Whangarei businesses have inconsistent social media presence: irregular posting, generic
            content, no clear strategy. That creates opportunity. Businesses that invest in systematic,
            high-quality social media stand out clearly in the Northland market — and the engagement
            compounds as audiences grow.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We build social media systems for Whangarei businesses — not one-off campaigns, but
            structured content strategies that build audience, drive engagement, and create real
            commercial outcomes over time.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">What Our Whangarei Social Media Work Includes</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Social Media Strategy',
              desc: 'Platform selection, content pillars, posting cadence, and audience growth strategy — all built around your Whangarei business goals and Northland target customer. Strategy first, execution second.',
            },
            {
              title: 'Content Creation & Scheduling',
              desc: 'High-quality social content for Whangarei — copy, creative direction, hashtag strategy, and scheduled posting. AI-assisted production that maintains quality at scale.',
            },
            {
              title: 'Community Management',
              desc: 'Comment responses, DM management, and community engagement for your Whangarei social accounts. Building a genuine community around your brand in the Northland market.',
            },
            {
              title: 'Platform Management',
              desc: 'Instagram, Facebook, LinkedIn, and TikTok management tailored to what works for Whangarei businesses in your category. Right platform, right content, right audience.',
            },
            {
              title: 'Paid Social Integration',
              desc: 'Organic social and paid Meta Ads working together — organic builds the audience, paid amplifies what works. A coordinated approach for maximum Whangarei impact.',
            },
            {
              title: 'Monthly Reporting',
              desc: 'Clear monthly reports: follower growth, engagement rates, reach, and — most importantly — how social is contributing to traffic, leads, and revenue for your Whangarei business.',
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
            SEO, content, and customer support. Social media was part of the integrated system
            that drove the result.
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
            { title: 'Social Media Agency Whangarei — Full Guide', href: '/blog/social-media-agency-whangarei' },
            { title: 'Social Media Services NZ', href: '/services/social-media-nz' },
            { title: 'Whangarei Marketing Hub', href: '/whangarei' },
            { title: 'Meta Ads Agency Whangarei', href: '/whangarei/meta-ads-agency' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to build your Whangarei social media presence?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            If you want social media that actually builds brand and drives revenue for your Whangarei
            or Northland business — apply below. We review every application.
          </p>
          <Link
            href="/apply"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg"
          >
            Apply to Work With Us
          </Link>
          <p className="text-gray-400 text-sm mt-4">3–5 client spots. Whangarei & Northland businesses welcome.</p>
        </div>
      </section>

      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2026 Junction Media. New Zealand.</p>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Home</Link>
            <Link href="/whangarei" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Whangarei</Link>
            <Link href="/services/social-media-nz" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Social Media NZ</Link>
            <Link href="/apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
