import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Google Ads Agency Wellington | PPC Agency Wellington | Junction Media',
  description: 'Google Ads management for Wellington businesses. AI-optimised PPC campaigns targeting Wellington CBD, Te Aro, Petone and beyond. Transparent reporting, no lock-in. From $1,500/mo.',
  keywords: 'Google Ads agency Wellington, PPC agency Wellington, Google Ads Wellington, PPC Wellington, Google Ads management Wellington, paid search Wellington, Google Adwords Wellington, PPC consultant Wellington',
  openGraph: {
    title: 'Google Ads Agency Wellington | Junction Media',
    description: 'AI-optimised Google Ads for Wellington businesses. Active management, transparent reporting, real results.',
    url: 'https://www.junctionmedia.ai/wellington/google-ads-agency',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/wellington/google-ads-agency',
  },
}

const faqs = [
  {
    q: 'How much does Google Ads management cost for Wellington businesses?',
    a: 'Junction Media charges $1,500–$3,500/month NZD for Google Ads management, separate from your ad spend. For Wellington businesses in competitive categories (legal, IT, healthcare, professional services), we typically recommend a minimum ad spend of $2,000–$4,000/month to generate meaningful data and results.',
  },
  {
    q: 'What Wellington industries benefit most from Google Ads?',
    a: 'Wellington\'s industry mix makes it particularly strong for Google Ads in: government-adjacent professional services (consultants, policy advisors, lawyers), IT and tech companies (software, managed services), healthcare (specialists, allied health, dentistry), hospitality (CBD cafes and restaurants), and trade services (electricians, plumbers, builders across Greater Wellington).',
  },
  {
    q: 'Can you target specific Wellington suburbs with Google Ads?',
    a: 'Yes — Google Ads location targeting allows us to target Wellington CBD, Te Aro, Thorndon, Newtown, Petone, Lower Hutt, Upper Hutt, Kapiti Coast and anywhere else in the Greater Wellington region. We can also set radius targeting around your Wellington office or service area for hyper-local campaigns.',
  },
  {
    q: 'How long does it take for Google Ads to work for a Wellington business?',
    a: 'Traffic starts immediately when campaigns go live. Meaningful optimisation — finding the right keywords, negative lists, bid strategies, and ad copy that converts — typically takes 6–10 weeks of active management. By month 3, a well-managed Wellington Google Ads account should be delivering consistent, measurable returns.',
  },
  {
    q: 'Do you provide conversion tracking so I can see what my Wellington Google Ads spend is returning?',
    a: 'Yes — proper GA4 + Google Ads conversion tracking is set up from day one of every engagement. Phone call tracking, form fill tracking, e-commerce purchase tracking — everything is connected so you can see exactly what campaigns are driving revenue, not just clicks.',
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
        { '@type': 'City', name: 'Wellington' },
        { '@type': 'City', name: 'Auckland' },
      ],
      priceRange: '$$$',
    },
    {
      '@type': 'Service',
      name: 'Google Ads Agency Wellington',
      provider: {
        '@type': 'Organization',
        name: 'Junction Media',
        url: 'https://www.junctionmedia.ai',
      },
      serviceType: 'Google Ads Management / PPC',
      areaServed: {
        '@type': 'City',
        name: 'Wellington',
      },
      description: 'AI-optimised Google Ads management for Wellington businesses. Active campaign management, conversion tracking, and transparent reporting.',
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

export default function WellingtonGoogleAdsAgencyPage() {
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
          Wellington · Google Ads
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Google Ads Agency Wellington
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          AI-optimised Google Ads management for Wellington businesses. We capture high-intent
          search traffic across Wellington CBD, Greater Wellington, and beyond — and actively
          optimise campaigns every week so your cost-per-lead falls as your volume grows.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/apply"
            className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors text-center"
          >
            Apply to Work With Us
          </Link>
          <Link
            href="/services/google-ads-nz"
            className="inline-block border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:border-gray-500 transition-colors text-center"
          >
            View Google Ads Services
          </Link>
        </div>
      </section>

      {/* Key Numbers */}
      <section className="max-w-3xl mx-auto px-6 py-12 border-t border-gray-100">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { stat: '$1.5k–$3.5k', label: 'Management fee /month NZD' },
            { stat: 'Week 1', label: 'Campaigns live' },
            { stat: '+30%', label: 'DBH sales record (month 1)' },
            { stat: 'Weekly', label: 'Optimisation cadence' },
          ].map((item) => (
            <div key={item.label} className="p-4 border border-gray-100 rounded-2xl text-center">
              <p className="text-2xl font-bold text-gray-900 mb-1">{item.stat}</p>
              <p className="text-xs text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Wellington Google Ads Context */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Wellington Google Ads: Why Active Management Matters</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            Wellington is a smaller market than Auckland but no less competitive in its key
            categories. Legal and professional services, IT consulting, government procurement,
            and healthcare all have high CPC environments — clicks in Wellington&apos;s top
            categories routinely cost $15–$60+.
          </p>
          <p className="text-gray-600 leading-relaxed">
            The Wellington businesses that win on Google Ads aren&apos;t necessarily spending more —
            they&apos;re managing smarter. Higher Quality Scores (lower CPCs), tighter keyword
            targeting (less wasted spend), better landing pages (higher conversion rates), and
            continuous optimisation that compounds month over month.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We manage accounts with weekly attention — not the quarterly check-ins that most
            Wellington Google Ads clients get from larger agencies. That active management
            is what drives the efficiency gains that improve ROAS over time.
          </p>
        </div>
      </section>

      {/* What We Do */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">What Wellington Google Ads Management Includes</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Account Audit or Build',
              desc: 'Forensic audit of your existing Wellington Google Ads account — or a clean-slate build. Wasted spend found, quality score problems fixed, campaign structure optimised from the start.',
            },
            {
              title: 'Wellington Keyword Strategy',
              desc: 'Keyword research mapped to Wellington search intent — including industry-specific terms, local suburb modifiers, and commercial-intent queries. Thorough negative keyword lists from day one.',
            },
            {
              title: 'Ad Copy & Extensions',
              desc: 'Wellington-relevant ad copy with callouts, sitelinks, structured snippets, and call extensions. A/B testing from launch — so the best-performing variants emerge quickly.',
            },
            {
              title: 'Conversion Tracking',
              desc: 'GA4 + Google Ads conversion tracking configured properly. Phone calls, form fills, purchases — every Wellington conversion tied to the campaign, ad group, and keyword that drove it.',
            },
            {
              title: 'Weekly Optimisation',
              desc: 'Bid adjustments, search term analysis, negative keyword expansion, Quality Score improvements — every week. Accounts don\'t improve by themselves; they improve with active attention.',
            },
            {
              title: 'Weekly Reporting',
              desc: 'Plain-English weekly updates: clicks, costs, conversions, ROAS, what changed, and what\'s next. Connected to your Wellington business outcomes — not just ad platform metrics.',
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
            in November 2025. Google Ads was a central pillar of the integrated system we built
            alongside Meta Ads, SEO, and content. 30% above their previous all-time store record
            in month one.
          </p>
        </div>
      </section>

      {/* Wellington Areas */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Wellington Areas We Target</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            'Wellington CBD', 'Te Aro', 'Lambton Quay',
            'Thorndon', 'Newtown', 'Petone',
            'Lower Hutt', 'Upper Hutt', 'Kapiti Coast',
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
            { title: 'Google Ads Management NZ — Full Overview', href: '/services/google-ads-nz' },
            { title: 'SEO Agency Wellington', href: '/wellington/seo-agency' },
            { title: 'Google Ads Agency Wellington — Blog', href: '/blog/google-ads-agency-wellington' },
            { title: 'Wellington Marketing Hub', href: '/wellington' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to make your Wellington ad spend work harder?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            If you&apos;re spending on Google Ads in Wellington and not seeing the returns you
            expect — or you&apos;re ready to launch — apply below.
          </p>
          <Link
            href="/apply"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg"
          >
            Apply to Work With Us
          </Link>
          <p className="text-gray-400 text-sm mt-4">Wellington & NZ businesses. Limited spots.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2026 Junction Media. Auckland, New Zealand.</p>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Home</Link>
            <Link href="/wellington" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Wellington</Link>
            <Link href="/services/google-ads-nz" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Google Ads NZ</Link>
            <Link href="/apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
