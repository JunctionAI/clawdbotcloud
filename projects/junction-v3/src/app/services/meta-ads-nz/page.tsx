import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Meta Ads NZ — Facebook & Instagram Advertising | Junction Media',
  description: 'Meta Ads management for NZ businesses. AI-optimised Facebook and Instagram advertising that scales. $800–$3,500/mo. Based in Auckland, serving all of New Zealand.',
  keywords: 'meta ads NZ, facebook ads NZ, facebook advertising NZ, meta advertising agency NZ, instagram ads NZ, facebook ads auckland, meta ads management NZ',
  openGraph: {
    title: 'Meta Ads NZ — Facebook & Instagram Advertising | Junction Media',
    description: 'AI-optimised Meta Ads for NZ businesses. Creative testing at scale, smart audiences, and campaigns that actually convert.',
    url: 'https://www.junctionmedia.ai/services/meta-ads-nz',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/services/meta-ads-nz',
  },
}

const whatIsIncluded = [
  {
    title: 'Account Audit & Strategy',
    desc: 'Full audit of your existing Meta Ads account — or a clean build from scratch. Campaign structure, audience strategy, pixel health, conversion tracking, and creative gaps all identified and prioritised before we spend a dollar.',
  },
  {
    title: 'Creative Testing at Scale',
    desc: 'Meta rewards creative velocity. AI-assisted copywriting and creative briefing lets us test more angles, more offers, and more hooks than a traditional agency. Winning creative identified and scaled. Losing creative cut fast.',
  },
  {
    title: 'Audience Strategy & Lookalikes',
    desc: 'Cold, warm, and hot audience segmentation. Custom audiences built from your customer data. Lookalike modelling. Retargeting sequences mapped to your sales funnel — not just a blanket "people who visited the site" audience.',
  },
  {
    title: 'Conversion Tracking & Pixel Setup',
    desc: 'Proper Meta Pixel and Conversions API implementation. First-party data strategy in a post-iOS14 environment. If your tracking is broken, your optimisation is blind — we fix this before optimising.',
  },
  {
    title: 'Campaign Optimisation',
    desc: 'Weekly optimisation across bid strategy, audiences, creative, placement, and budget allocation. Data-driven decisions, not gut feel. Spend shifted to what works, pulled from what doesn\'t.',
  },
  {
    title: 'Weekly Reporting & Insights',
    desc: 'Plain-English weekly performance reports. Cost per acquisition, ROAS, CPM, CTR, and what they actually mean for your business. No hiding behind impressions. Real numbers, real accountability.',
  },
]

const processSteps = [
  {
    phase: 'Week 1–2',
    title: 'Audit & Strategy',
    desc: 'Full account audit. Pixel and tracking verified. Audience strategy mapped. Campaign structure designed. Creative brief written. No ad spend until the foundation is right.',
  },
  {
    phase: 'Week 3–4',
    title: 'Build & Launch',
    desc: 'Campaigns built and launched. Initial creative tests running. Audiences seeded. Conversion data flowing. First optimisation decisions made based on early signals.',
  },
  {
    phase: 'Month 2',
    title: 'Optimise & Learn',
    desc: 'Creative testing velocity increases. Winning audiences identified and expanded. Losing campaigns paused. Budget shifted to best performers. Clear picture of cost per acquisition forming.',
  },
  {
    phase: 'Month 3+',
    title: 'Scale & Systemise',
    desc: 'Scale what works. Introduce new creative angles. Expand to new audience segments. The account builds a performance history that makes every future optimisation more accurate.',
  },
]

const faqs = [
  {
    q: 'How much do Meta Ads cost to manage in NZ?',
    a: 'Our Meta Ads management starts at $800/month NZD for businesses spending up to $5,000/month on ads. Growth tier is $1,800/month for spend up to $15,000/month. Scale tier is $3,500/month for spend above $15,000/month. These fees are for management only — your ad spend is paid directly to Meta. All engagements are 3-month minimum.',
  },
  {
    q: 'How much should I spend on Meta Ads in NZ?',
    a: 'Minimum viable ad spend for the NZ market is typically $1,500–$3,000/month. Below that, Meta\'s algorithm doesn\'t have enough data to optimise effectively, and you won\'t reach meaningful volume. Most businesses scaling through Meta are spending $5,000–$20,000/month on ad spend. Your management fee is separate from this.',
  },
  {
    q: 'Has iOS14 killed Meta Ads?',
    a: 'No — but it changed how they need to be run. iOS14 broke pixel-based tracking for a significant portion of iOS users. The solution is Conversions API (server-side tracking), first-party data strategy, and a willingness to look at blended ROAS rather than click-attributed ROAS. We implement all of this from day one. The businesses that adapted are still scaling on Meta. The ones that didn\'t are seeing inflated acquisition costs.',
  },
  {
    q: 'What types of businesses work best with Meta Ads?',
    a: 'Meta Ads work best for: e-commerce brands with clear product offers, service businesses with a defined ICP (ideal customer profile) and strong creative assets, lead generation campaigns where you can define the audience clearly, and businesses with a clear offer and proven unit economics. Meta is less effective for pure B2B (LinkedIn typically wins there), very niche professional services, and businesses with no visual creative capability.',
  },
  {
    q: 'Do I own my Meta Ads account?',
    a: 'Yes, always. Your Business Manager, ad account, and pixel are yours. We work inside your account, not a managed account we own. If you ever stop working with us, you keep everything — all the historical data, audiences, and learning that has built up. No lock-in.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Meta Ads NZ',
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
  description: 'AI-optimised Meta Ads (Facebook & Instagram) management for NZ businesses. Creative testing, smart audiences, and campaigns that convert.',
  areaServed: { '@type': 'Country', name: 'New Zealand' },
  offers: {
    '@type': 'Offer',
    priceSpecification: {
      '@type': 'PriceSpecification',
      minPrice: '800',
      maxPrice: '3500',
      priceCurrency: 'NZD',
      unitText: 'month',
    },
  },
}

export default function MetaAdsNZPage() {
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
          Apply to Work With Me
        </Link>
      </nav>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-16">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
          Service · Meta Ads NZ
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Meta Ads That Actually<br />
          <span className="text-gray-500">Scale Your Business</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          AI-optimised Facebook and Instagram advertising for NZ businesses. Creative testing at
          scale, smart audience strategy, and relentless optimisation — so your ad spend turns into
          customers, not wasted impressions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/apply"
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
            { stat: '$800–$3.5k', label: 'Per month NZD' },
            { stat: '3-month', label: 'Minimum term' },
            { stat: 'Weekly', label: 'Optimisation cadence' },
            { stat: 'You own', label: 'Your account, always' },
          ].map((item) => (
            <div key={item.label} className="p-4 border border-gray-100 rounded-2xl text-center">
              <p className="text-2xl font-bold text-gray-900 mb-1">{item.stat}</p>
              <p className="text-xs text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Meta Ads */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Why Meta Ads Still Win in 2026</h2>
        <div className="space-y-4 mb-8">
          <p className="text-gray-600 leading-relaxed">
            Despite iOS14, privacy changes, and every prediction that Facebook is dying — Meta Ads
            remain the most powerful paid social channel for NZ businesses targeting consumers. The
            platforms (Facebook + Instagram) still have the most precise interest and behavioural
            targeting available, combined with unmatched creative format variety.
          </p>
          <p className="text-gray-600 leading-relaxed">
            The businesses succeeding on Meta in 2026 are the ones who adapted. They&apos;re running
            Conversions API alongside their pixel, building first-party audiences, and testing creative
            with speed and discipline. The ones failing are running 2019 strategies and wondering why
            their cost per acquisition keeps climbing.
          </p>
        </div>
        <div className="space-y-4">
          {[
            {
              num: '01',
              title: 'Creative Is the Targeting',
              desc: 'Meta\'s algorithm has shifted dramatically. The creative itself now does most of the audience targeting work — the algorithm finds the people most likely to respond. This means creative velocity and testing discipline matters more than audience tweaks. We run more creative tests, faster.',
            },
            {
              num: '02',
              title: 'First-Party Data Strategy',
              desc: 'Post-iOS14, the businesses winning on Meta are the ones building first-party data — email lists, customer data, purchase histories — and using them to build high-quality custom and lookalike audiences. We help you build this infrastructure, not just run ads.',
            },
            {
              num: '03',
              title: 'Full-Funnel Structure',
              desc: 'Cold traffic, warm retargeting, and hot conversion campaigns need to work together. Too many NZ businesses run only cold traffic and wonder why their cost per acquisition is high. We build the full funnel — awareness, consideration, and conversion — so each layer feeds the next.',
            },
          ].map((pillar) => (
            <div key={pillar.num} className="border border-gray-100 rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-4">
                <span className="text-4xl font-black text-gray-100 leading-none">{pillar.num}</span>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{pillar.title}</h3>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-gray-500 text-sm mt-6">
          Related:{' '}
          <Link href="/blog/meta-ads-nz" className="underline hover:text-gray-700 transition-colors">
            Meta Ads NZ: The Complete Guide for 2026 →
          </Link>
        </p>
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
            <span className="text-4xl font-bold text-gray-900">$800–$3,500</span>
            <span className="text-gray-500">/month NZD</span>
          </div>
          <p className="text-gray-600 leading-relaxed mb-6">
            Management fee only — ad spend is paid directly to Meta. All tiers include account
            setup/audit, weekly optimisation, and weekly reporting. 3-month minimum engagement.
          </p>
          <div className="space-y-3 mb-8">
            {[
              { label: 'Starter (ad spend up to $5k/mo)', cost: '$800/mo' },
              { label: 'Growth (ad spend $5k–$15k/mo)', cost: '$1,800/mo' },
              { label: 'Scale (ad spend $15k+/mo)', cost: '$3,500/mo' },
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
            href="/apply"
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
            { title: 'Meta Ads NZ: The Complete Guide for 2026', href: '/blog/meta-ads-nz' },
            { title: 'Google Ads NZ', href: '/services/google-ads-nz' },
            { title: 'AI Marketing Systems NZ', href: '/services/ai-marketing-systems' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to scale with Meta Ads?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            If you&apos;re serious about turning Facebook and Instagram into a reliable customer acquisition
            channel for your NZ business — apply below. I review applications and respond within 48 hours.
          </p>
          <Link
            href="/apply"
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
            <Link href="/apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
