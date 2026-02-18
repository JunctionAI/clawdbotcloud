import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Meta Ads Agency Nelson | Facebook & Instagram Ads Nelson | Junction Media',
  description: 'Meta Ads agency serving Nelson businesses. AI-powered Facebook and Instagram advertising for Nelson CBD, Richmond, and the Tasman region. $1,500–$3,500/mo.',
  keywords: 'Meta Ads agency Nelson, Facebook Ads Nelson, Instagram Ads Nelson, Facebook advertising Nelson, Meta advertising Nelson, social ads Nelson, paid social Nelson, Facebook ads agency Nelson NZ',
  openGraph: {
    title: 'Meta Ads Agency Nelson | Junction Media',
    description: 'AI-native Meta Ads (Facebook & Instagram) for Nelson businesses. Creative testing, audience strategy, and ROAS-focused management.',
    url: 'https://www.junctionmedia.ai/nelson/meta-ads-agency',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/nelson/meta-ads-agency',
  },
}

const faqs = [
  {
    q: 'How much does Meta Ads management cost for a Nelson business?',
    a: 'Meta Ads management at Junction Media ranges from $1,500–$3,500/month NZD. $1,500/month covers campaign management and weekly creative testing for ad budgets up to $3,000/month. All engagements are 3-month minimum.',
  },
  {
    q: 'Is Meta advertising worth it for Nelson businesses in 2026?',
    a: 'Yes — Facebook and Instagram are the dominant social channels across the Nelson and Tasman region. For local consumer brands, hospitality, tourism, and retail businesses, Meta remains the highest-ROI paid social platform in regional NZ markets.',
  },
  {
    q: 'What Nelson industries do you run Meta Ads for?',
    a: 'We run Meta Ads for Nelson ecommerce brands, hospitality and café businesses, tourism operators, arts and creative businesses, health and wellness, professional services, and retail. Nelson\'s lifestyle-oriented community makes Meta particularly effective for experience and lifestyle categories.',
  },
  {
    q: 'How do you approach creative for Nelson Meta campaigns?',
    a: 'Creative is the primary lever in Meta advertising. We test 5–10 creative variants per week, use Nelson-specific hooks and local contexts where relevant, and rapidly scale what outperforms. We produce static, video, and carousel formats based on your offer.',
  },
  {
    q: 'Can you target specific Nelson suburbs or the wider Tasman region?',
    a: 'Yes — Meta\'s location targeting allows suburb-level and radius-based targeting across Nelson, Richmond, Stoke, Motueka, and the wider Tasman region. Useful for hospitality, local services, retail, and events.',
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
      name: 'Meta Ads Agency Nelson',
      provider: {
        '@type': 'Organization',
        name: 'Junction Media',
        url: 'https://www.junctionmedia.ai',
      },
      serviceType: 'Meta Ads / Facebook & Instagram Advertising',
      areaServed: { '@type': 'City', name: 'Nelson' },
      description: 'AI-native Meta Ads management for Nelson businesses. Creative testing, audience strategy, and ROAS-focused Facebook and Instagram advertising.',
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
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    },
  ],
}

export default function NelsonMetaAdsAgencyPage() {
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
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Nelson · Meta Ads</p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Meta Ads Agency Nelson
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          AI-native Facebook and Instagram advertising for Nelson businesses. We build creative-led
          Meta campaigns that reach your ideal customers across the Tasman region — and optimise
          relentlessly until your ROAS compounds.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/apply" className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors text-center">
            Apply to Work With Us
          </Link>
          <Link href="/services/meta-ads-nz" className="inline-block border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:border-gray-500 transition-colors text-center">
            View Meta Ads Services
          </Link>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-12 border-t border-gray-100">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { stat: '$1.5k–$3.5k', label: 'Management fee /month NZD' },
            { stat: '5–10', label: 'Creative variants tested weekly' },
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
        <h2 className="text-2xl font-bold mb-6">Meta Ads in Nelson: The Creative-Led Approach</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            Nelson&apos;s community is lifestyle-oriented, arts-engaged, and highly connected on social media.
            Facebook and Instagram are where Nelson residents discover local businesses, plan experiences,
            and make purchasing decisions — from a new café in the CBD to a wine tour in the Waimea Plains.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Most Nelson Meta campaigns fail because of creative, not targeting. Meta&apos;s algorithm has
            become exceptionally good at finding buyers if the creative is compelling. The businesses
            that win are testing more creative variants, learning faster, and scaling what works.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We run structured creative testing programmes — 5–10 variants per week — and use
            Nelson-specific visual and copy hooks to connect with local audiences authentically.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">What Our Nelson Meta Ads Management Includes</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Campaign Strategy & Structure',
              desc: 'Awareness, consideration, and conversion campaigns built for the full Nelson customer journey. Prospecting and retargeting layered appropriately.',
            },
            {
              title: 'Creative Testing Programme',
              desc: 'Weekly creative testing: static images, short video, carousel formats. Nelson-specific hooks and visuals. Rapid scaling of winning creative.',
            },
            {
              title: 'Audience Strategy',
              desc: 'Nelson and Tasman geographic targeting combined with interest, behaviour, and lookalike audiences. Constant audience refinement based on performance data.',
            },
            {
              title: 'Pixel & Conversion API Setup',
              desc: 'Meta Pixel and Conversions API configured correctly from day one. Accurate tracking drives better algorithm optimisation and reporting.',
            },
            {
              title: 'Budget Optimisation',
              desc: 'Dynamic budget allocation across campaigns and ad sets. Spending scales into what is working — not evenly distributed regardless of performance.',
            },
            {
              title: 'Weekly Reporting',
              desc: 'Reach, clicks, cost-per-lead, ROAS, creative performance winners, and what we are testing next. Plain English, revenue-connected.',
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
            Deep Blue Health hit their best revenue month ever in November 2025. Meta Ads was a core
            component of the integrated system we built across paid social, Google Ads, SEO, and content.
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
            { title: 'Meta Ads Services NZ — Full Overview', href: '/services/meta-ads-nz' },
            { title: 'Google Ads Agency Nelson', href: '/nelson/google-ads-agency' },
            { title: 'Meta Ads Nelson — Blog', href: '/blog/meta-ads-nelson' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to scale your Nelson business with Meta Ads?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            Apply below. We review every application and work with select Nelson and Tasman businesses ready to invest seriously in paid social.
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
            <Link href="/services/meta-ads-nz" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Meta Ads NZ</Link>
            <Link href="/apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
