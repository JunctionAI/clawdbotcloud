import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Email Marketing for SaaS Companies in NZ — Onboarding, Retention & Expansion | Junction Media',
  description: 'Email marketing for NZ SaaS companies. Automated onboarding sequences, retention campaigns, and expansion email programs that reduce churn and grow MRR.',
  keywords: 'email marketing for saas nz, saas email marketing nz, saas onboarding emails nz, saas retention email nz, email automation saas nz, drip campaigns saas nz',
  openGraph: {
    title: 'Email Marketing for SaaS NZ | Junction Media',
    description: 'Email marketing for NZ SaaS companies. Onboarding sequences, retention campaigns, and expansion programs that reduce churn and grow MRR.',
    url: 'https://www.junctionmedia.ai/email-marketing-for-saas-nz',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/email-marketing-for-saas-nz',
  },
}

const painPoints = [
  {
    title: 'Most SaaS churn happens in the first 30 days — email is the fix',
    desc: 'The majority of SaaS churn occurs in the first month, before users have experienced the value of the product. Most NZ SaaS companies have inadequate onboarding email sequences — generic welcome emails rather than behaviour-triggered journeys that guide users to their first aha moment. Every churned user in month one represents lost acquisition spend and a missed relationship.',
  },
  {
    title: 'Expansion revenue is the highest-ROI growth lever most SaaS companies underuse',
    desc: 'For most mature SaaS businesses, expansion revenue (upgrades, seat additions, plan changes) from existing customers has higher margins and lower CAC than acquiring new customers. Yet most NZ SaaS companies send the same newsletter to all users regardless of usage pattern, plan, or expansion readiness. Segmented expansion email programs are one of the highest-ROI investments available.',
  },
  {
    title: 'Newsletter-only email programs miss 80% of the email opportunity',
    desc: 'Monthly newsletters keep users informed but don\'t drive behaviour. The real email opportunity for SaaS is behavioural and lifecycle — triggered by user actions (or inactions), timed to critical moments in the customer journey, and personalised to where each user is in their relationship with your product. Most NZ SaaS companies are only using newsletters and are leaving enormous revenue on the table.',
  },
]

const approach = [
  {
    title: 'Onboarding Sequence Architecture',
    desc: 'A structured onboarding email journey from signup through first value moment — behaviour-triggered emails based on product usage events, role-specific onboarding paths, milestone celebration emails, and re-engagement triggers for users who stall before reaching activation. Built in whatever email platform you use.',
  },
  {
    title: 'Churn Prediction & Retention Campaigns',
    desc: 'Identifying at-risk users through product usage signals and triggering retention campaigns before they cancel. Automated check-in emails, success manager outreach triggers, win-back sequences for churned users, and NPS survey flows that surface dissatisfied customers before they leave.',
  },
  {
    title: 'Expansion Revenue Programs',
    desc: 'Segmented campaigns targeting users showing expansion signals — high usage approaching plan limits, features on higher tiers they haven\'t accessed, multi-seat potential based on team size. Upgrade campaigns that present the value of the next tier at the moment users are most likely to say yes.',
  },
  {
    title: 'Product Newsletter & Announcement Strategy',
    desc: 'Regular product updates, feature releases, use case spotlights, and customer success stories that keep your user base engaged, informed, and reminded of the value your product delivers. Strategic send timing, segmentation by plan and usage, and A/B testing to continuously improve engagement rates.',
  },
]

const results = [
  { stat: 'Churn-focused', label: 'Retention strategy' },
  { stat: 'Behaviour-triggered', label: 'Automated journeys' },
  { stat: '4–5', label: 'Clients at any one time' },
  { stat: '100%', label: 'NZ-based expertise' },
]

const faqs = [
  {
    q: 'What email platform do you use for SaaS email marketing in NZ?',
    a: 'We work with the platform you\'re already using or recommend the right one for your needs. For SaaS, we most commonly work with Customer.io, Klaviyo, ActiveCampaign, Intercom, or HubSpot depending on the complexity of behavioural triggers you need. We\'ll assess your current stack and recommend whether to build on what you have or migrate to a more capable platform.',
  },
  {
    q: 'How do you integrate SaaS product data into email campaigns?',
    a: 'Behaviour-triggered SaaS email requires product event data feeding into your email platform — events like "feature used", "limit reached", "login streak broken", or "team member invited". We design the event taxonomy, work with your developer to implement the tracking, and build the email logic that responds to those events. The sophistication of what\'s possible depends on how much product data you can expose.',
  },
  {
    q: 'How long does it take to see results from SaaS email marketing?',
    a: 'Onboarding sequence improvements often show results within 4–8 weeks as new cohorts move through the improved journey. Retention campaigns show results over 2–3 months as you\'re measuring churn rates on monthly cohorts. Expansion campaigns can show revenue impact within weeks if you have a large enough existing user base to target. We prioritise the initiatives with fastest time-to-impact first.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Email Marketing for SaaS NZ',
  provider: {
    '@type': 'Organization',
    name: 'Junction Media',
    url: 'https://www.junctionmedia.ai',
  },
  description: 'Email marketing for NZ SaaS companies. Onboarding sequences, retention campaigns, expansion programs, and product newsletters.',
  areaServed: { '@type': 'Country', name: 'New Zealand' },
}

export default function EmailMarketingForSaaSNZ() {
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

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-16">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
          Service + Industry · Email Marketing for SaaS NZ
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Email Marketing for<br />
          <span className="text-gray-500">SaaS Companies in NZ</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          For NZ SaaS companies, email is not a marketing channel — it&apos;s a retention and expansion
          engine. The right email sequences reduce first-month churn, guide users to activation, and
          surface expansion revenue from your existing base. We build the automated lifecycle email
          programs that reduce your CAC payback period and grow MRR from the customers you already
          have.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/apply" className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors text-center">
            Apply to Work With Us
          </Link>
          <Link href="/industries/saas-nz" className="inline-block border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:border-gray-500 transition-colors text-center">
            SaaS Marketing Overview
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-3xl mx-auto px-6 py-12 border-t border-gray-100">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {results.map((item) => (
            <div key={item.label} className="p-4 border border-gray-100 rounded-2xl text-center">
              <p className="text-2xl font-bold text-gray-900 mb-1">{item.stat}</p>
              <p className="text-xs text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">Why SaaS Email Marketing is More Than Newsletters</h2>
        <div className="space-y-6">
          {painPoints.map((item) => (
            <div key={item.title} className="p-6 border border-gray-100 rounded-2xl">
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Approach */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-4">Our SaaS Email Marketing Approach</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          We build email programs for SaaS companies that treat the inbox as a relationship management
          tool, not a broadcast channel. Every email is triggered by context, timed to the right
          moment, and designed to move a user one step closer to experiencing value from your product.
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          {approach.map((item) => (
            <div key={item.title} className="p-6 border border-gray-100 rounded-2xl">
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
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

      {/* Related */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Related</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { title: 'Google Ads for SaaS NZ', href: '/google-ads-for-saas-nz' },
            { title: 'SEO for SaaS NZ', href: '/seo-for-saas-nz' },
            { title: 'Content Marketing for SaaS NZ', href: '/content-marketing-for-saas-nz' },
            { title: 'Meta Ads for SaaS NZ', href: '/meta-ads-for-saas-nz' },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="p-4 border border-gray-100 rounded-xl hover:border-gray-300 transition-colors text-sm font-medium text-gray-700 hover:text-gray-900">
              {link.title} →
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 py-20 border-t border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Reduce Churn and Grow MRR with Email?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            We work with a small number of NZ SaaS companies at any one time. Apply to see if we can
            help you build the email lifecycle programs that reduce churn and unlock expansion revenue.
          </p>
          <Link href="/apply" className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg">
            Apply to Work With Us
          </Link>
          <p className="text-gray-400 text-sm mt-4">NZ SaaS companies only.</p>
        </div>
      </section>

      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2026 Junction Media. Auckland, New Zealand.</p>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Home</Link>
            <Link href="/industries" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Industries</Link>
            <Link href="/services" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Services</Link>
            <Link href="/blog" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Blog</Link>
            <Link href="/apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
