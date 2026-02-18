import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Google Ads Agency Auckland | AI-Optimised PPC Auckland | Junction Media',
  description: 'Google Ads agency in Auckland delivering AI-optimised campaigns for NZ businesses. PPC management from $1,500/mo. No lock-in contracts. Transparent reporting. Real results.',
  keywords: 'Google Ads agency Auckland, PPC Auckland, Google Ads Auckland, Google Ads management Auckland, PPC agency Auckland, Google Ads consultant Auckland, Google Adwords Auckland, paid search Auckland',
  openGraph: {
    title: 'Google Ads Agency Auckland | Junction Media',
    description: 'AI-optimised Google Ads management for Auckland businesses. Continuous optimisation, transparent reporting, no lock-in contracts.',
    url: 'https://www.junctionmedia.ai/auckland/google-ads-agency',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/auckland/google-ads-agency',
  },
}

const faqs = [
  {
    q: 'How much does Google Ads management cost in Auckland?',
    a: 'Auckland Google Ads management typically costs $1,000–$5,000+ per month in management fees, separate from your ad spend budget. At Junction Media, management starts at $1,500/month NZD. We recommend a minimum ad spend of $2,000–$5,000/month for meaningful data and results in competitive Auckland markets.',
  },
  {
    q: 'How quickly can Google Ads deliver results for my Auckland business?',
    a: 'Google Ads can drive traffic from day one of launch. However, meaningful optimisation — finding the right keywords, negative keyword lists, ad copy, and bid strategies that actually convert — typically takes 4–8 weeks of data. By month 2–3, a well-managed Auckland Google Ads account should be returning measurable ROAS.',
  },
  {
    q: 'What types of Auckland businesses benefit most from Google Ads?',
    a: 'Google Ads works best for businesses with clear commercial intent searches: trade services (plumbers, electricians, builders), professional services (lawyers, accountants, consultants), healthcare (dentists, physios, specialists), and e-commerce. If people search for what you offer in Auckland, Google Ads can capture that intent cost-effectively.',
  },
  {
    q: 'Do you run Google Ads for local Auckland suburbs?',
    a: 'Yes — location targeting is a key part of our Auckland PPC strategy. We can target specific suburbs (Remuera, Ponsonby, Takapuna, Manukau, etc.), radius targeting around your business location, or broader Auckland-wide campaigns with suburb-specific ad customisers. Local campaigns for service-area businesses are a specialty.',
  },
  {
    q: 'What\'s included in your Auckland Google Ads management?',
    a: 'Full account setup or audit, campaign strategy, keyword research, ad copy creation, bid management, negative keyword management, conversion tracking setup, landing page recommendations, and plain-English weekly reporting. We actively manage — not set-and-forget.',
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
      name: 'Google Ads Agency Auckland',
      provider: {
        '@type': 'Organization',
        name: 'Junction Media',
        url: 'https://www.junctionmedia.ai',
      },
      serviceType: 'Google Ads Management / PPC',
      areaServed: {
        '@type': 'City',
        name: 'Auckland',
      },
      description: 'AI-optimised Google Ads management for Auckland businesses. Continuous campaign optimisation, conversion tracking, and transparent reporting.',
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

export default function AucklandGoogleAdsAgencyPage() {
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
          Auckland · Google Ads
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Google Ads Agency Auckland
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          AI-optimised Google Ads management for Auckland businesses. We build campaigns that
          capture high-intent local search traffic — and continuously optimise to lower your
          cost-per-lead while increasing conversion volume.
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

      {/* Auckland PPC Context */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Why Auckland PPC Needs Active Management</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            Auckland is Google Ads&apos; most competitive NZ market. Clicks for commercial search terms
            — &quot;Auckland lawyer,&quot; &quot;plumber North Shore,&quot; &quot;accountant CBD&quot; — can cost $15–80+. The
            businesses that win aren&apos;t necessarily spending more — they&apos;re managing smarter.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Most Auckland Google Ads accounts we audit share the same problems: broad match keywords
            bleeding budget on irrelevant searches, missing negative keyword lists, poor Quality
            Scores driving up CPCs, and no conversion tracking that ties ad spend to actual revenue.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We build accounts from first principles — or fix the existing ones — with weekly
            optimisation that compounds over time. Every dollar of ad spend should be working harder
            each month, not the same as the month before.
          </p>
        </div>
      </section>

      {/* What We Do */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">What Our Auckland Google Ads Management Includes</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Account Audit or Build',
              desc: 'Every engagement starts with a forensic audit of your existing account or a clean-slate build. Wasted spend identified, quality score issues fixed, campaign structure optimised before we scale.',
            },
            {
              title: 'Auckland-Specific Keyword Strategy',
              desc: 'Keyword research mapped to Auckland search intent — including suburb-level terms (Remuera, Takapuna, Ponsonby) and commercial-intent queries your competitors may have missed.',
            },
            {
              title: 'Ad Copy & Extensions',
              desc: 'AI-assisted ad copy testing with Auckland-specific messaging. Callouts, sitelinks, structured snippets, and call extensions configured to maximise click-through rates.',
            },
            {
              title: 'Conversion Tracking',
              desc: 'GA4 + Google Ads conversion tracking set up properly from day one. Phone calls, form fills, purchases — every conversion tied back to the campaign and keyword that drove it.',
            },
            {
              title: 'Weekly Optimisation',
              desc: 'Bid adjustments, search term analysis, negative keyword expansion, ad copy rotation, and Quality Score improvement — every week, not once a quarter.',
            },
            {
              title: 'Plain-English Weekly Reports',
              desc: 'Weekly summaries: clicks, costs, conversions, ROAS, what changed, and what\'s next. Numbers that connect to your business outcomes — not just ad platform metrics.',
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
            in November 2025. Google Ads was a core component of the integrated system we built
            across paid search, Meta Ads, SEO, and content. Result: 30% above their previous
            all-time record in month one.
          </p>
        </div>
      </section>

      {/* Auckland context */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Auckland Areas We Target</h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Our Auckland Google Ads campaigns use granular location targeting — by suburb, radius, or
          custom geographic boundaries. We work with businesses targeting:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            'Auckland CBD', 'North Shore', 'Ponsonby / Grey Lynn',
            'Remuera / Parnell', 'Takapuna / Devonport', 'Newmarket / Epsom',
            'South Auckland', 'West Auckland', 'East Auckland (Howick / Botany)',
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
            { title: 'SEO Agency Auckland', href: '/auckland/seo-agency' },
            { title: 'Google Ads Agency Auckland — Blog', href: '/blog/google-ads-agency-auckland' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to make your ad spend work harder?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            If you&apos;re running Google Ads in Auckland and not seeing the returns you expect — or
            you&apos;re ready to launch your first campaign — apply below.
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
            <Link href="/services/google-ads-nz" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Google Ads NZ</Link>
            <Link href="/apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
