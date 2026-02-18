import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Google Ads Management NZ — AI-Optimised Campaigns | Junction Media',
  description: 'Google Ads management for NZ businesses. AI-driven campaign optimisation, no lock-in contracts, and transparent reporting. $1,500–$3,500/mo. Based in Auckland.',
  keywords: 'google ads nz, google ads management nz, google ads agency nz, google ads auckland, google ads new zealand, google ads consultant nz, ppc nz, google adwords nz',
  openGraph: {
    title: 'Google Ads Management NZ — AI-Optimised Campaigns | Junction Media',
    description: 'AI-driven Google Ads management for NZ businesses. Continuous optimisation, transparent reporting, no lock-in contracts.',
    url: 'https://www.junctionmedia.ai/services/google-ads-nz',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/services/google-ads-nz',
  },
}

const whatIsIncluded = [
  {
    title: 'Full Account Audit',
    desc: 'Every engagement starts with a forensic audit of your existing Google Ads account (or competitor landscape if starting fresh). Wasted spend identified, quality score issues surfaced, structural problems fixed before we scale.',
  },
  {
    title: 'AI-Optimised Campaign Build',
    desc: 'Campaigns built with AI-assisted keyword research, ad copy generation, and audience targeting. Not template campaigns — structured around your specific offer, customer intent signals, and NZ market dynamics.',
  },
  {
    title: 'Continuous Optimisation',
    desc: 'Weekly bid adjustments, negative keyword expansion, ad copy testing, and Quality Score improvements. The account gets better every week — not set-and-forgotten after launch.',
  },
  {
    title: 'Conversion Tracking Setup',
    desc: 'Proper GA4 + Google Ads conversion tracking configured from day one. You know exactly what\'s converting, at what cost, and from which campaigns. No more guessing.',
  },
  {
    title: 'Landing Page Recommendations',
    desc: 'Traffic without conversion is wasted money. I audit your landing pages and provide specific, actionable recommendations to improve conversion rate alongside the ad work.',
  },
  {
    title: 'Plain-English Weekly Reports',
    desc: 'Weekly performance summaries that tell you what\'s happening, why, and what we\'re doing about it. No 40-slide decks. No vanity metrics. Real numbers in plain English.',
  },
]

const processSteps = [
  {
    phase: 'Week 1–2',
    title: 'Audit & Strategy',
    desc: 'Deep audit of your existing account or market landscape. Keyword research mapped to NZ search intent. Campaign architecture designed. Conversion tracking verified or configured. You approve the plan before anything goes live.',
  },
  {
    phase: 'Week 3',
    title: 'Build & Launch',
    desc: 'Campaigns built, ad copy written (multiple variants), extensions configured, bidding strategy set. Launch with conservative budgets to gather data before scaling. Everything tracked from day one.',
  },
  {
    phase: 'Month 2+',
    title: 'Optimise & Scale',
    desc: 'Weekly optimisation: search term mining, bid adjustments, Quality Score improvements, ad copy testing. Budget scaled to top-performing campaigns. Monthly strategic review — what\'s working, what\'s next.',
  },
  {
    phase: 'Ongoing',
    title: 'Compound Performance',
    desc: 'Google Ads rewards accounts that accumulate quality data over time. The longer we run and optimise, the lower your CPCs and the higher your Quality Scores. Performance compounds — it doesn\'t plateau.',
  },
]

const faqs = [
  {
    q: 'How much do your Google Ads management services cost?',
    a: 'Management fees range from $1,500–$3,500/month NZD depending on account complexity, number of campaigns, and ad spend volume. This is separate from your ad spend budget (which goes directly to Google). Most NZ businesses we work with run $2,000–$10,000/month in ad spend on top of the management fee. Minimum 3-month engagement — Google Ads needs time to learn and optimise properly.',
  },
  {
    q: 'What\'s the difference between AI-optimised Google Ads and regular management?',
    a: 'Traditional Google Ads management relies on a human checking the account weekly or fortnightly and making manual adjustments. AI-optimised management adds automated monitoring layers that flag anomalies within hours, generate and test ad copy variants at scale, identify winning audience signals faster, and surface optimisation opportunities that manual review misses. The result: faster learning cycles, lower wasted spend, and better Quality Scores over time.',
  },
  {
    q: 'Do you lock clients into long-term contracts?',
    a: 'Minimum 3 months — that\'s non-negotiable because it\'s genuinely not enough time to see meaningful results otherwise. After 3 months, rolling monthly. You own the Google Ads account — always. If you leave, you take the account history, data, and campaigns with you. No lock-in, no held-hostage accounts.',
  },
  {
    q: 'Which types of Google Ads campaigns do you manage?',
    a: 'Search (the most important for most NZ businesses), Performance Max, Shopping (for ecommerce), Display remarketing, and YouTube. Most campaigns start with Search — it\'s where purchase intent is highest. We add other campaign types as the account matures and the budget supports testing them.',
  },
  {
    q: 'Do I need to have run Google Ads before?',
    a: 'No. We work with businesses starting from scratch as well as those with existing accounts. Starting fresh is often cleaner — no bad history to unpick. The audit phase covers the full competitive landscape regardless, so you know what you\'re launching into.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Google Ads Management NZ',
  provider: {
    '@type': 'Organization',
    name: 'Junction Media',
    url: 'https://www.junctionmedia.ai',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Auckland',
      addressCountry: 'NZ',
    },
  },
  description: 'AI-driven Google Ads management for NZ businesses. Continuous optimisation, transparent reporting, no lock-in contracts after the initial 3-month term.',
  areaServed: { '@type': 'Country', name: 'New Zealand' },
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
}

export default function GoogleAdsNZPage() {
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
          href="/#apply"
          className="text-sm bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors"
        >
          Apply to Work With Me
        </Link>
      </nav>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-16">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
          Service · Google Ads NZ
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Google Ads That<br />
          <span className="text-gray-500">Actually Convert</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          AI-driven Google Ads management for NZ businesses. Continuous optimisation, transparent
          reporting, and no lock-in contracts after 3 months. Stop paying for clicks that don&apos;t convert.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/#apply"
            className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors text-center"
          >
            Apply to Work With Me
          </Link>
          <Link
            href="/services"
            className="inline-block border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:border-gray-500 transition-colors text-center"
          >
            View All Services
          </Link>
        </div>
      </section>

      {/* Key Numbers */}
      <section className="max-w-3xl mx-auto px-6 py-12 border-t border-gray-100">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { stat: '$1.5k–$3.5k', label: 'Management fee/mo NZD' },
            { stat: '3-month', label: 'Minimum term' },
            { stat: 'Week 1', label: 'Audit completed' },
            { stat: '100%', label: 'You own the account' },
          ].map((item) => (
            <div key={item.label} className="p-4 border border-gray-100 rounded-2xl text-center">
              <p className="text-2xl font-bold text-gray-900 mb-1">{item.stat}</p>
              <p className="text-xs text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Google Ads Management Fails */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Why Most Google Ads Fail in NZ</h2>
        <div className="space-y-4 mb-8">
          <p className="text-gray-600 leading-relaxed">
            Most NZ businesses running Google Ads are either managing it themselves without the expertise
            to optimise properly, or paying an agency that set the campaigns up 18 months ago and hasn&apos;t
            touched them since.
          </p>
          <p className="text-gray-600 leading-relaxed">
            The result: poor Quality Scores that inflate your CPCs, broad match keywords eating budget
            on irrelevant searches, ad copy that hasn&apos;t been tested in years, and conversion tracking
            that&apos;s either broken or measuring the wrong things.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Google Ads rewards active, data-driven management. Accounts that are continuously optimised
            see lower CPCs, higher Quality Scores, and better conversion rates over time. The gap between
            a well-managed account and a neglected one widens every month.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-6 border border-gray-100 rounded-2xl">
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Set-and-forget management</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Campaigns unchanged for months</li>
              <li>• Broad match burning budget on junk searches</li>
              <li>• No conversion tracking or broken tracking</li>
              <li>• Poor Quality Scores inflating CPCs</li>
            </ul>
          </div>
          <div className="p-6 border border-gray-900 rounded-2xl bg-gray-50">
            <p className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">AI-optimised management</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Weekly optimisation cycles</li>
              <li>• Continuous negative keyword expansion</li>
              <li>• Proper conversion tracking from day one</li>
              <li>• Quality Scores improving every month</li>
            </ul>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">What&apos;s Included</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {whatIsIncluded.map((item) => (
            <div key={item.title} className="p-6 border border-gray-100 rounded-2xl">
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">How It Works</h2>
        <div className="space-y-6">
          {processSteps.map((step, i) => (
            <div key={step.phase} className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {i + 1}
                </div>
                {i < processSteps.length - 1 && (
                  <div className="w-px flex-1 bg-gray-100 mt-2" />
                )}
              </div>
              <div className="pb-8">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{step.phase}</p>
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Pricing</h2>
        <div className="bg-gray-50 rounded-2xl p-8">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-4xl font-bold text-gray-900">$1,500–$3,500</span>
            <span className="text-gray-500">/month NZD</span>
          </div>
          <p className="text-gray-600 leading-relaxed mb-6">
            Management fee covers: full account audit, campaign build or restructure, weekly
            optimisation, conversion tracking setup, landing page recommendations, and weekly
            plain-English reporting. Ad spend budget is separate and paid directly to Google.
          </p>
          <div className="space-y-3 mb-8">
            {[
              { label: 'Starter (1–2 campaigns, up to $3k ad spend)', cost: '$1,500/mo' },
              { label: 'Growth (3–5 campaigns, $3k–$8k ad spend)', cost: '$2,500/mo' },
              { label: 'Scale (6+ campaigns, $8k+ ad spend)', cost: '$3,500/mo' },
            ].map((row) => (
              <div
                key={row.label}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-3 border-b border-gray-200 last:border-0 text-gray-700"
              >
                <span className="text-sm">{row.label}</span>
                <span className="text-sm font-semibold">{row.cost}</span>
              </div>
            ))}
          </div>
          <Link
            href="/#apply"
            className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors"
          >
            Apply Now
          </Link>
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

      {/* Related */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Further Reading</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { title: 'Google Ads Auckland: How to Find a Consultant Who Actually Delivers', href: '/blog/google-ads-auckland-consultant' },
            { title: 'AI Marketing Systems NZ', href: '/services/ai-marketing-systems' },
            { title: 'Fractional CMO NZ', href: '/services/fractional-cmo' },
            { title: 'View All Services', href: '/services' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to fix your Google Ads?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            If your Google Ads account is underperforming — or you&apos;ve never run Google Ads before
            and want to start properly — apply below. I review applications and respond within 48 hours.
          </p>
          <Link
            href="/#apply"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg"
          >
            Apply to Work With Me
          </Link>
          <p className="text-gray-400 text-sm mt-4">NZ businesses only. Serious enquiries only.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2026 Junction Media. Auckland, New Zealand.</p>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Home</Link>
            <Link href="/services" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Services</Link>
            <Link href="/blog" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Blog</Link>
            <Link href="/#apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
