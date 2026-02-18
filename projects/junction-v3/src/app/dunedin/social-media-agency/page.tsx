import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Social Media Agency Dunedin | Social Media Marketing for Dunedin Businesses | Junction Media',
  description: 'Social media agency serving Dunedin and Otago businesses. Strategy, content, community management, and paid social for Instagram, Facebook, LinkedIn, and TikTok. $1,200–$2,500/mo.',
  keywords: 'social media agency Dunedin, social media marketing Dunedin, social media management Dunedin, Instagram marketing Dunedin, Facebook marketing Dunedin, social media Dunedin NZ, Otago social media agency',
  openGraph: {
    title: 'Social Media Agency Dunedin | Junction Media',
    description: 'AI-native social media marketing for Dunedin and Otago businesses. Strategy, content, and paid social that builds brand and drives revenue.',
    url: 'https://www.junctionmedia.ai/dunedin/social-media-agency',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/dunedin/social-media-agency',
  },
}

const faqs = [
  {
    q: 'How much does social media management cost for a Dunedin business?',
    a: "Social media management for Dunedin businesses at Junction Media ranges from $1,200–$2,500/month NZD depending on scope. This includes strategy, content creation, scheduling, and reporting. Paid social advertising (Meta Ads, TikTok Ads) is managed separately with its own ad spend budget. We work with Dunedin businesses that are serious about social media as a real business channel — not just ticking a box.",
  },
  {
    q: 'Which social media platforms work best for Dunedin businesses?',
    a: "Instagram and Facebook (Meta) have the broadest reach for most Dunedin consumer businesses. LinkedIn is the go-to for B2B professional services targeting Dunedin's growing professional sector and the University of Otago academic community. TikTok is increasingly relevant for hospitality, tourism, and lifestyle brands targeting younger Dunedin audiences. We recommend the right platform mix based on your industry and target customer.",
  },
  {
    q: 'Can social media help Dunedin tourism businesses?',
    a: "Absolutely — tourism is one of the highest-ROI use cases for social media in Dunedin. The Otago Peninsula's wildlife (albatrosses, penguins, seals), Dunedin's Victorian architecture, Larnach Castle, Baldwin Street, and the emerging food and craft beer scene all generate compelling visual content. Social media marketing can drive direct bookings, attract international visitors, and build a year-round audience that converts beyond the peak season.",
  },
  {
    q: 'How does social media work alongside other marketing channels for Dunedin businesses?',
    a: "Social media works best as part of an integrated approach. For Dunedin businesses, the highest-ROI combination is typically: SEO for long-term organic growth, Google Ads for high-intent local search, and Meta/social for brand building, retargeting, and audience nurturing. Social media builds the brand awareness that makes paid search more effective and SEO content more shareable.",
  },
  {
    q: 'Do you create content or just manage accounts for Dunedin businesses?',
    a: "We do both, depending on what your Dunedin business needs. Our social media management includes content strategy, copywriting, and creative direction. We can work with your existing visual assets or guide you on content production. For businesses with team members who can capture content on-site in Dunedin, we often find a hybrid model works best — we handle strategy and editing, you supply raw content.",
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
        { '@type': 'City', name: 'Dunedin' },
        { '@type': 'City', name: 'Auckland' },
      ],
      priceRange: '$$$',
    },
    {
      '@type': 'Service',
      name: 'Social Media Agency Dunedin',
      provider: {
        '@type': 'Organization',
        name: 'Junction Media',
        url: 'https://www.junctionmedia.ai',
      },
      serviceType: 'Social Media Marketing',
      areaServed: {
        '@type': 'City',
        name: 'Dunedin',
      },
      description: 'AI-native social media marketing for Dunedin and Otago businesses. Strategy, content, community management, and paid social across Instagram, Facebook, LinkedIn, and TikTok.',
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

export default function DunedinSocialMediaAgencyPage() {
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
          Dunedin · Social Media
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Social Media Agency Dunedin
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          AI-native social media marketing for Dunedin and Otago businesses. Strategy, content,
          and paid social that builds your brand, grows your audience, and drives real business
          results — for hospitality, tourism, retail, professional services, and more.
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
        <h2 className="text-2xl font-bold mb-6">Social Media in Dunedin: A City With a Story to Tell</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            Dunedin is one of New Zealand&apos;s most visually compelling cities — Victorian and Edwardian
            architecture, the wildlife-rich Otago Peninsula, world-famous Baldwin Street, and a
            vibrant student culture anchored by the University of Otago. For businesses operating here,
            social media isn&apos;t just a marketing channel — it&apos;s an opportunity to tap into genuine
            storytelling that resonates with both local Dunedin audiences and the national and
            international visitors the city attracts.
          </p>
          <p className="text-gray-600 leading-relaxed">
            The Otago region has a distinctive identity that travels well on social media: wildlife
            encounters, dramatic coastal scenery, craft food and beverage culture, and the energy of
            a university city with a young, digitally active population. We build social media
            strategies that leverage these distinctive assets to grow real, engaged audiences.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Our approach combines AI-assisted content production with strategic platform management.
            More content, better quality, published consistently — with paid social layered on top
            to amplify what works and reach new Dunedin and Otago audiences efficiently.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">What Our Dunedin Social Media Work Includes</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Social Media Strategy',
              desc: "Platform selection, content pillars, posting cadence, and KPIs tailored to your Dunedin business goals. No generic templates — a strategy built for your specific industry and Otago audience.",
            },
            {
              title: 'Content Creation',
              desc: 'Copywriting, creative direction, and AI-assisted content production. Posts, stories, reels, and captions that reflect your brand voice and connect with Dunedin audiences.',
            },
            {
              title: 'Platform Management',
              desc: 'Scheduling, community management, comment responses, and inbox management. We keep your Dunedin social presence active and professional without pulling your team away from the business.',
            },
            {
              title: 'Paid Social (Meta & TikTok)',
              desc: 'Boosted posts, targeted campaigns, and retargeting for Dunedin and Otago audiences. Paid social amplifies your best organic content and reaches new customers efficiently.',
            },
            {
              title: 'Influencer & Local Partnerships',
              desc: "Strategy for partnering with Dunedin content creators, local media, and Otago-based influencers. Authentic partnerships that build credibility and reach with engaged local audiences.",
            },
            {
              title: 'Analytics & Reporting',
              desc: "Monthly reporting on reach, engagement, follower growth, and (where trackable) revenue impact. We connect social media activity to business outcomes — not just likes and shares.",
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
            { title: 'Social Media Agency Dunedin — Full Guide', href: '/blog/social-media-agency-dunedin' },
            { title: 'Social Media Services NZ', href: '/services/social-media-nz' },
            { title: 'Dunedin Marketing Hub', href: '/dunedin' },
            { title: 'Meta Ads Agency Dunedin', href: '/dunedin/meta-ads-agency' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to build a real social media presence in Dunedin?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            If you want social media that actually grows your Dunedin or Otago business — not
            just posts for the sake of it — apply below. We review every application.
          </p>
          <Link
            href="/apply"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg"
          >
            Apply to Work With Us
          </Link>
          <p className="text-gray-400 text-sm mt-4">3–5 client spots. Dunedin & Otago businesses welcome.</p>
        </div>
      </section>

      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2026 Junction Media. New Zealand.</p>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Home</Link>
            <Link href="/dunedin" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Dunedin</Link>
            <Link href="/services/social-media-nz" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Social Media NZ</Link>
            <Link href="/apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
