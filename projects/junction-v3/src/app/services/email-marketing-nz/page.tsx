import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Email Marketing NZ — Klaviyo & List Growth | Junction Media',
  description: 'Email marketing services for NZ businesses. Strategy, automation, and list growth with Klaviyo. $600–$2,500/mo. Based in Auckland, serving all of New Zealand.',
  keywords: 'email marketing NZ, email marketing agency NZ, email marketing Auckland, klaviyo NZ, email automation NZ, email list growth NZ, email marketing consultant NZ',
  openGraph: {
    title: 'Email Marketing NZ — Klaviyo & List Growth | Junction Media',
    description: 'Email marketing strategy and automation for NZ businesses. Build a list that converts with Klaviyo flows, segmentation, and consistent campaigns.',
    url: 'https://www.junctionmedia.ai/services/email-marketing-nz',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/services/email-marketing-nz',
  },
}

const whatIsIncluded = [
  {
    title: 'Email Strategy & Audit',
    desc: 'Full audit of your current email setup — list health, deliverability, open rates, flows, and segmentation. Strategy built around your business goals: e-commerce revenue, lead nurturing, or retention. No one-size-fits-all templates.',
  },
  {
    title: 'Klaviyo Setup & Migration',
    desc: 'Klaviyo account setup, platform migration, and list import. Proper property mapping, integrations with your e-commerce platform or CRM, and deliverability warm-up. The technical foundation done right so campaigns actually land in the inbox.',
  },
  {
    title: 'Automation Flows',
    desc: 'Welcome series, abandoned cart, post-purchase, win-back, and browse abandonment — the core revenue-generating flows built and optimised. AI-assisted copywriting for each step. Triggers, delays, and conditional splits set up correctly from the start.',
  },
  {
    title: 'Segmentation & Personalisation',
    desc: 'List segmentation by purchase history, engagement level, product interest, and lifecycle stage. Personalised content that speaks to where the customer actually is — not a generic broadcast. Segmented campaigns routinely outperform blasts by 2–4x on revenue per recipient.',
  },
  {
    title: 'Campaign Management',
    desc: 'Consistent campaign calendar — promotional sends, content newsletters, product launches. AI-assisted copywriting and subject line testing. Scheduled, proofed, and sent on cadence. No more "we should do an email" with nothing happening.',
  },
  {
    title: 'Reporting & Deliverability',
    desc: 'Monthly reporting on open rates, click rates, revenue attributed, and list growth. Deliverability monitoring — spam rate, bounce management, domain reputation. Email is only valuable if it reaches the inbox.',
  },
]

const processSteps = [
  {
    phase: 'Week 1–2',
    title: 'Audit & Strategy',
    desc: 'Full email audit. Deliverability baseline established. Strategy mapped to business goals. Klaviyo setup or migration planned. Quick wins identified — often there are suppression and deliverability issues killing existing performance before we send a single new email.',
  },
  {
    phase: 'Week 3–4',
    title: 'Foundation Build',
    desc: 'Core flows built: welcome series and abandoned cart as the first priority. These two alone typically generate 15–25% of e-commerce email revenue. List segmentation architecture set up. First campaign sent.',
  },
  {
    phase: 'Month 2',
    title: 'Campaign Rhythm',
    desc: 'Consistent campaign cadence in place. Additional flows built (post-purchase, win-back). Subject line testing underway. Segmentation refined based on early data. Email becoming a predictable revenue channel.',
  },
  {
    phase: 'Month 3+',
    title: 'Optimise & Grow',
    desc: 'Flow performance reviewed and iterated. List growth strategy implemented — pop-ups, lead magnets, checkout capture. Suppression management keeping deliverability strong. Email compounding as list and engagement grow.',
  },
]

const faqs = [
  {
    q: 'How much does email marketing cost in NZ?',
    a: 'Our email marketing management ranges from $600–$2,500/month NZD. The $600/month tier covers core flows (welcome + abandoned cart), monthly campaigns, and reporting — right for businesses with up to 5,000 subscribers. The $2,500/month tier covers full flow library, weekly campaigns, advanced segmentation, list growth strategy, and comprehensive reporting — right for businesses with 20,000+ subscribers or significant e-commerce revenue. Klaviyo subscription cost is separate and paid directly to Klaviyo.',
  },
  {
    q: 'Do I need Klaviyo, or do you work with other platforms?',
    a: 'We specialise in Klaviyo because it\'s the best email marketing platform for e-commerce businesses — its Shopify integration, flow builder, and segmentation capabilities are unmatched. If you\'re not e-commerce, we also work with Mailchimp and ActiveCampaign. If you have an existing platform you\'re happy with, we can work within it. If you\'re starting fresh or thinking about switching, we\'ll recommend Klaviyo for most businesses.',
  },
  {
    q: 'What email metrics should I be tracking?',
    a: 'The metrics that actually matter: open rate (benchmark: 35–45% for engaged lists), click rate (2–5% is healthy), revenue per recipient (for e-commerce), flow revenue as a percentage of total email revenue (30%+ is good), and list growth rate. Unsubscribe rate and spam complaint rate matter for deliverability — keep spam complaints below 0.08%. We report on all of these monthly in plain English.',
  },
  {
    q: 'How do you grow an email list in NZ?',
    a: 'The most effective NZ list growth strategies: on-site pop-ups with a genuine incentive (discount, lead magnet, or early access), checkout email capture with clear opt-in, social media lead generation ads pointing to a landing page, and content upgrades on high-traffic blog posts. Most NZ businesses have a leaky acquisition funnel — visitors arrive but don\'t get captured. We fix this before focusing on sending more campaigns to an existing stagnant list.',
  },
  {
    q: 'Is email marketing still effective for NZ businesses?',
    a: 'Yes — consistently the highest ROI marketing channel for businesses that do it properly. Email has no algorithm to fight, no ad spend required for existing subscribers, and direct access to people who have opted in to hear from you. The problem isn\'t that email stopped working — it\'s that most businesses either don\'t send consistently, send to unengaged lists, or lack automation flows that capture revenue on autopilot. When email is set up correctly, it typically generates 20–40% of total revenue for e-commerce businesses.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Email Marketing NZ',
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
  description: 'Email marketing strategy, Klaviyo automation, and list growth for NZ businesses. Build a list that converts with smart flows, segmentation, and consistent campaigns.',
  areaServed: { '@type': 'Country', name: 'New Zealand' },
  offers: {
    '@type': 'Offer',
    priceSpecification: {
      '@type': 'PriceSpecification',
      minPrice: '600',
      maxPrice: '2500',
      priceCurrency: 'NZD',
      unitText: 'month',
    },
  },
}

export default function EmailMarketingNZPage() {
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
          Service · Email Marketing NZ
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Email Marketing That<br />
          <span className="text-gray-500">Actually Converts</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          Email is still the highest ROI channel when it&apos;s done properly. Strategy, Klaviyo
          automation, smart segmentation, and consistent campaigns — built for NZ businesses that
          want email to be a predictable revenue channel, not an afterthought.
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
            { stat: '$600–$2.5k', label: 'Per month NZD' },
            { stat: '3-month', label: 'Minimum term' },
            { stat: 'Klaviyo', label: 'Specialist platform' },
            { stat: '20–40%', label: 'Of revenue for top e-comm brands' },
          ].map((item) => (
            <div key={item.label} className="p-4 border border-gray-100 rounded-2xl text-center">
              <p className="text-2xl font-bold text-gray-900 mb-1">{item.stat}</p>
              <p className="text-xs text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The 3 Pillars */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Why Most NZ Email Marketing Underperforms</h2>
        <div className="space-y-4 mb-8">
          <p className="text-gray-600 leading-relaxed">
            Most NZ businesses have an email list. Most of them underutilise it dramatically. The
            problems are usually the same: inconsistent sending, no automation flows, no segmentation,
            and deliverability issues caused by sending to unengaged subscribers. Fixing these doesn&apos;t
            require more budget — it requires the right setup.
          </p>
        </div>
        <div className="space-y-4">
          {[
            {
              num: '01',
              title: 'Automation Flows First',
              desc: 'Before any campaign, the automation flows need to be right. Welcome series, abandoned cart, and post-purchase flows run 24/7 and generate revenue on autopilot. For e-commerce businesses, these flows alone should be generating 15–30% of total email revenue. Most NZ businesses either don\'t have them or have them set up incorrectly.',
            },
            {
              num: '02',
              title: 'Segmentation, Not Blasting',
              desc: 'Sending every email to every subscriber kills deliverability and drives unsubscribes. Segmenting by engagement level, purchase behaviour, and lifecycle stage means every email is more relevant — which means higher open rates, better click rates, and inbox placement staying strong over time.',
            },
            {
              num: '03',
              title: 'Deliverability Is Non-Negotiable',
              desc: 'An email that doesn\'t reach the inbox is worthless. Domain reputation, spam complaint rate, bounce management, and engagement rate all feed into whether Gmail and Outlook deliver your emails or file them in spam. We monitor and manage deliverability actively — it\'s not a set-and-forget problem.',
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
          <Link href="/blog/email-marketing-strategy-nz" className="underline hover:text-gray-700 transition-colors">
            Email Marketing NZ: Build a List That Actually Converts →
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
            <span className="text-4xl font-bold text-gray-900">$600–$2,500</span>
            <span className="text-gray-500">/month NZD</span>
          </div>
          <p className="text-gray-600 leading-relaxed mb-6">
            Management fee only — Klaviyo subscription is separate and paid directly to Klaviyo. All
            tiers include flows, campaigns, and monthly reporting. 3-month minimum engagement.
          </p>
          <div className="space-y-3 mb-8">
            {[
              { label: 'Starter (up to 5k subscribers, core flows + monthly campaigns)', cost: '$600/mo' },
              { label: 'Growth (up to 20k subscribers, full flow library + weekly campaigns)', cost: '$1,400/mo' },
              { label: 'Scale (20k+ subscribers, advanced segmentation + list growth strategy)', cost: '$2,500/mo' },
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
            { title: 'Email Marketing NZ: Build a List That Actually Converts', href: '/blog/email-marketing-strategy-nz' },
            { title: 'Content Marketing NZ', href: '/services/content-marketing-nz' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to make email a proper revenue channel?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            If you&apos;re serious about turning your email list into a predictable, compounding revenue
            stream for your NZ business — apply below. I review applications and respond within 48 hours.
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
