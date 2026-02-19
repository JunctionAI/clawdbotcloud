import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Meta Ads for SaaS Companies in NZ — Facebook & Instagram for B2B Software | Junction Media',
  description: 'Meta Ads management for NZ SaaS companies. Facebook and Instagram campaigns that build brand awareness, generate demo requests, and reduce CAC for B2B and B2C software products.',
  keywords: 'meta ads for saas nz, facebook ads saas nz, instagram ads software nz, b2b facebook ads nz, saas social advertising nz, software facebook ads nz',
  openGraph: {
    title: 'Meta Ads for SaaS NZ | Junction Media',
    description: 'Facebook and Instagram ads for NZ SaaS companies. Build awareness, generate trials, and reduce customer acquisition costs.',
    url: 'https://www.junctionmedia.ai/meta-ads-for-saas-nz',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/meta-ads-for-saas-nz',
  },
}

const painPoints = [
  {
    title: 'SaaS buyers don\'t search Meta — they need to be interrupted intelligently',
    desc: 'Unlike Google, where buyers are actively searching, Meta Ads intercept people who are not actively looking for software solutions. This means your ad needs to identify a pain point they already have, make them aware that a solution exists, and create enough curiosity or urgency to take action. Most B2B SaaS Meta campaigns fail because they lead with features, not problems.',
  },
  {
    title: 'B2B targeting on Meta requires creative audience construction',
    desc: 'Meta\'s job title and industry targeting is less precise than LinkedIn but more cost-effective. Getting the right audience requires layering multiple signals — interests, behaviours, lookalike audiences from your existing customers, website retargeting — to approximate your ICP without overspending on the wrong people.',
  },
  {
    title: 'SaaS attribution across long buying cycles breaks standard tracking',
    desc: 'A decision-maker might see your Meta Ad in January, search for you on Google in March, and sign up after a sales call in May. Last-click attribution credits Google, and your Meta Ads look like they don\'t work. Without proper multi-touch attribution, you\'ll cut the channel that was actually starting the customer journey.',
  },
]

const approach = [
  {
    title: 'Problem-First Creative Framework',
    desc: 'We build Meta creative that leads with the pain your software solves — relatable business problems, frustrations with existing solutions, or aspirational outcomes — before introducing your product. This pattern gets the right people to self-identify and engage before any product pitch.',
  },
  {
    title: 'ICP Audience Architecture',
    desc: 'Layered audience construction using job function interests, industry signals, software-user behaviours, and company size proxies. Separate campaigns for cold audiences (awareness), warm audiences (video viewers, page engagers), and hot audiences (website visitors, trial users) — each with messaging matched to their familiarity with your product.',
  },
  {
    title: 'Free Trial & Demo Funnels',
    desc: 'Optimised landing pages and lead flows for SaaS conversion events — free trial signups, demo bookings, and resource downloads. We test offer framing ("See it in action" vs "Start free" vs "Book a demo") to find what your specific audience responds to.',
  },
  {
    title: 'Cross-Channel Attribution',
    desc: 'We implement UTM frameworks and data studio reporting that shows Meta\'s true contribution to pipeline — including assisted conversions and view-through attribution windows appropriate for your sales cycle length. No more cutting the channels that were actually working.',
  },
]

const results = [
  { stat: 'Problem-first', label: 'Creative strategy' },
  { stat: 'ICP-targeted', label: 'Audience architecture' },
  { stat: '4–5', label: 'Clients at any one time' },
  { stat: '100%', label: 'NZ-based expertise' },
]

const faqs = [
  {
    q: 'Does Meta Ads actually work for B2B SaaS in NZ?',
    a: 'Yes — but differently than Google Ads. Meta works best for SaaS companies targeting businesses of 1–100 people where decision-makers are also active consumers of social media. Larger enterprise targets are better served by LinkedIn. For SMB-focused NZ SaaS products, Meta can be very cost-effective compared to LinkedIn\'s much higher CPCs, especially for building brand awareness and top-of-funnel demand.',
  },
  {
    q: 'What budget do NZ SaaS companies need for Meta Ads?',
    a: 'We typically recommend $2,000–$3,000/month minimum in ad spend to run enough creative variations and audience tests to find what works. B2B SaaS on Meta requires more creative testing than consumer products because the audience signals are less precise. Management fees are additional. We\'ll give you a specific recommendation based on your ACV and target CAC.',
  },
  {
    q: 'Should NZ SaaS companies use Meta alongside Google Ads?',
    a: 'For most NZ SaaS companies, yes. Google captures existing demand (people already searching for your category); Meta creates new demand (reaching your ICP before they\'re searching). Together they create a more complete funnel. Google tends to convert faster; Meta builds the awareness that makes Google searches happen. The exact budget split depends on your product and ICP.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Meta Ads for SaaS NZ',
  provider: {
    '@type': 'Organization',
    name: 'Junction Media',
    url: 'https://www.junctionmedia.ai',
  },
  description: 'Meta Ads management for NZ SaaS companies. Problem-first creative, ICP audience architecture, and cross-channel attribution.',
  areaServed: { '@type': 'Country', name: 'New Zealand' },
}

export default function MetaAdsForSaaSNZ() {
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
          Service + Industry · Meta Ads for SaaS NZ
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Meta Ads for<br />
          <span className="text-gray-500">SaaS Companies in NZ</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          Google Ads captures SaaS buyers who are already searching — Meta Ads reach them before they
          start looking. For NZ SaaS companies that want to build a pipeline beyond search intent, we
          run Facebook and Instagram campaigns that intercept your ideal customer profile with the right
          problem-framing, at scale, and with attribution that proves what&apos;s actually driving growth.
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
        <h2 className="text-2xl font-bold mb-8">Why SaaS Meta Ads Fail Without the Right Approach</h2>
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
        <h2 className="text-2xl font-bold mb-4">Our SaaS Meta Ads Approach</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          We build Meta Ads systems for SaaS companies that create demand rather than just capturing
          it. That means reaching the right people with creative that resonates, funnels that convert
          at different stages, and attribution that shows Meta&apos;s true contribution to your growth.
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
            { title: 'Email Marketing for SaaS NZ', href: '/email-marketing-for-saas-nz' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to Build SaaS Pipeline with Meta Ads?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            We work with a small number of NZ SaaS companies at any one time. Apply to see if Meta
            Ads can add a meaningful demand-generation channel to your growth stack.
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
