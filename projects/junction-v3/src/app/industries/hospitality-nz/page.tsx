import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Hospitality & Restaurant Marketing Agency NZ | Junction Media',
  description: 'Hospitality marketing agency NZ. AI-powered marketing for restaurants, cafes, hotels, and tourism operators. Drive covers, bookings, and direct revenue. Auckland-based.',
  keywords: 'hospitality marketing agency nz, restaurant marketing nz, cafe marketing nz, hotel marketing nz, tourism marketing nz, restaurant digital marketing nz, hospitality agency auckland',
  openGraph: {
    title: 'Hospitality & Restaurant Marketing Agency NZ | Junction Media',
    description: 'AI-driven marketing for NZ restaurants, cafes, hotels, and tourism operators. More covers, direct bookings, and loyal regulars.',
    url: 'https://www.junctionmedia.ai/industries/hospitality-nz',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/industries/hospitality-nz',
  },
}

const painPoints = [
  {
    problem: 'You\'re paying third-party platforms 30% margins on your own customers',
    detail: 'Menulog, Uber Eats, and booking platforms take a significant cut of every transaction. Most NZ hospitality businesses are building customer relationships for platforms, not for themselves. Direct bookings and direct orders are the path to sustainable margins.',
  },
  {
    problem: 'Social media is burning time without clear ROI',
    detail: 'Posting on Instagram every day and seeing follower counts move slowly while the cost of ingredients and labour keeps rising. Most hospitality social media is activity masquerading as marketing. It needs to drive bookings, not just likes.',
  },
  {
    problem: 'Your busy periods are full but your quiet periods are dead',
    detail: 'Monday lunches, mid-week dinners, shoulder seasons. Most NZ hospitality operators rely on weekend peaks. Building consistent demand through targeted digital channels — Google, Meta, email — flattens the curve and improves overall profitability.',
  },
  {
    problem: 'You have no way to re-engage past customers',
    detail: 'Every diner who\'s ever visited your restaurant is a warm lead for their next occasion — anniversary, birthday, corporate dinner. Without an email list or loyalty mechanism, you start from scratch to fill every service.',
  },
]

const approach = [
  {
    title: 'Direct Booking & Order Engine',
    desc: 'Google Ads and Meta Ads campaigns that drive traffic directly to your booking system or online ordering — bypassing third-party platforms. Every direct booking saves you their commission margin.',
  },
  {
    title: 'Google Search Capture',
    desc: '"Restaurants near me", "best brunch Auckland", "romantic dinner Wellington" — high-intent searches from people ready to book. Google Ads and Google Business Profile optimisation to capture that intent at the moment it happens.',
  },
  {
    title: 'Social Media Built to Convert',
    desc: 'Instagram and Facebook content strategy and management that actually drives bookings — not just engagement. Content calendars built around key occasions, seasonal menus, and local events.',
  },
  {
    title: 'Email List and Loyalty',
    desc: 'Build a direct customer database through Wi-Fi sign-ups, reservation data, and loyalty programs. Use it for occasion-based campaigns (Valentine\'s Day, Mother\'s Day, EOFY corporate dinners) that reliably fill quiet periods.',
  },
  {
    title: 'Tourism and Visitor Strategy',
    desc: 'For hospitality businesses in tourist locations (Queenstown, Rotorua, Bay of Islands, etc.), international visitor marketing requires a different approach — TripAdvisor presence, Google Maps optimisation, and content that ranks in international traveller searches.',
  },
]

const packages = [
  {
    name: 'Growth',
    price: '$2,500',
    period: '/month NZD',
    desc: 'For single-venue restaurants, cafes, or accommodation. Digital foundations + direct booking focus.',
    includes: [
      'Google Ads (search + maps)',
      'Meta Ads (bookings + reach)',
      'Google Business Profile management',
      'Monthly email campaign',
      'Weekly reporting',
    ],
  },
  {
    name: 'Scale',
    price: '$4,500',
    period: '/month NZD',
    desc: 'For multi-venue groups or larger operators. Full digital presence with email automation and content.',
    includes: [
      'Everything in Growth',
      'Social media management (Instagram + Facebook)',
      'Email automation (welcome, occasion campaigns)',
      'Review management strategy',
      'Seasonal campaign planning',
      'Fortnightly strategy sessions',
    ],
    highlight: true,
  },
  {
    name: 'Partnership',
    price: '$8,500',
    period: '/month NZD',
    desc: 'For hospitality groups, hotels, and tourism operators. Full marketing function with fractional CMO access.',
    includes: [
      'Everything in Scale',
      'Fractional CMO access',
      'Multi-venue campaign coordination',
      'Tourism and visitor strategy',
      'AI marketing systems build',
      'Weekly leadership check-ins',
    ],
  },
]

const faqs = [
  {
    q: 'Do you work with single restaurants or only groups?',
    a: 'Both. A single strong venue doing $500k+ in annual revenue has enough at stake to justify proper marketing management. Hospitality groups benefit from the Scale or Partnership model where campaigns can be coordinated across venues. The minimum we work with is a business that\'s serious about growth — not looking for a quick social media fix.',
  },
  {
    q: 'How do you handle the seasonality of hospitality marketing in NZ?',
    a: 'NZ hospitality has distinct peaks — summer outdoor dining, Christmas/New Year functions, Valentine\'s Day, Mother\'s Day, EOFY corporate entertainment, and school holiday family dining. We build annual campaign calendars that plan these in advance, with pre-built campaigns ready to activate. You never scramble for a promotional idea three days before a key date.',
  },
  {
    q: 'Can you help us reduce our dependence on Uber Eats or Menulog?',
    a: 'Yes. This is one of the most common asks from NZ restaurant clients. We build Google Ads campaigns and Meta Ads campaigns that drive direct ordering traffic — to your own online ordering system (Deputy, OrderMate, etc.) rather than through aggregators. It requires an upfront investment in awareness and habit-building, but the math on margin recovery is compelling.',
  },
  {
    q: 'Do you manage TripAdvisor or Google reviews?',
    a: 'We don\'t manage individual review responses (that requires deep day-to-day brand voice knowledge), but we build review generation systems — automated post-visit emails that prompt happy customers to leave Google or TripAdvisor reviews. Average review volume and rating both improve significantly with systematic prompting.',
  },
  {
    q: 'We\'re a tourism-facing operation in Queenstown. Is that different?',
    a: 'Significantly different. International visitor marketing requires content that ranks in Google searches from the UK, Australia, and US, strong TripAdvisor presence, and Google Maps visibility for "things to do near me" and "best restaurants in Queenstown" searches. We\'ve worked with tourism-adjacent hospitality and understand the distinct funnel — it\'s longer and requires a different content strategy than local repeat-customer marketing.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Hospitality & Restaurant Marketing Agency NZ',
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
  description: 'AI-driven marketing for NZ restaurants, cafes, hotels, and tourism operators. Drive direct bookings, reduce third-party platform dependency, and build loyal regulars.',
  areaServed: { '@type': 'Country', name: 'New Zealand' },
  offers: {
    '@type': 'Offer',
    priceSpecification: {
      '@type': 'PriceSpecification',
      minPrice: '2500',
      maxPrice: '8500',
      priceCurrency: 'NZD',
      unitText: 'month',
    },
  },
}

export default function HospitalityNZPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
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
          Industry · Hospitality NZ
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Hospitality &amp; Restaurant<br />
          <span className="text-gray-500">Marketing Agency NZ</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          AI-powered marketing for NZ restaurants, cafes, hotels, and tourism operators who
          want to fill covers, drive direct bookings, and build a loyal customer base — without
          paying 30% margins to third-party platforms.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/apply"
            className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors text-center"
          >
            Apply to Work With Us
          </Link>
          <Link
            href="/industries"
            className="inline-block border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:border-gray-500 transition-colors text-center"
          >
            View All Industries
          </Link>
        </div>
      </section>

      {/* Key Numbers */}
      <section className="max-w-3xl mx-auto px-6 py-12 border-t border-gray-100">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { stat: 'Direct', label: 'Booking focus — bypass platform fees' },
            { stat: '4–5', label: 'Clients at any one time' },
            { stat: '12-month', label: 'Campaign calendars built in advance' },
            { stat: 'NZ-first', label: 'Strategy built for NZ dining culture' },
          ].map((item) => (
            <div key={item.label} className="p-4 border border-gray-100 rounded-2xl text-center">
              <p className="text-xl font-bold text-gray-900 mb-1">{item.stat}</p>
              <p className="text-xs text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pain Points */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">The Hospitality Marketing Problem in NZ</h2>
        <div className="space-y-6">
          {painPoints.map((item) => (
            <div key={item.problem} className="p-6 border border-gray-100 rounded-2xl">
              <h3 className="font-semibold text-gray-900 mb-2">
                <span className="text-gray-400 mr-2">✗</span>
                {item.problem}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Approach */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-4">How We Drive Revenue</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Junction Media works with select NZ hospitality businesses as a genuine marketing partner
          — not a vendor posting content and sending invoices. We care about your covers, your margins,
          and your long-term customer relationships. That&apos;s how we build ours.
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

      {/* Packages */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-4">Packages</h2>
        <p className="text-gray-500 mb-8">3-month minimum. All NZD, excluding ad spend (paid directly to platforms).</p>
        <div className="space-y-6">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`p-8 rounded-2xl border ${pkg.highlight ? 'border-gray-900 bg-gray-50' : 'border-gray-100'}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-bold text-gray-900">{pkg.name}</h3>
                    {pkg.highlight && (
                      <span className="text-xs font-semibold bg-gray-900 text-white px-3 py-1 rounded-full">Most popular</span>
                    )}
                  </div>
                  <p className="text-gray-500 text-sm">{pkg.desc}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-3xl font-bold text-gray-900">{pkg.price}</span>
                  <span className="text-gray-500 text-sm">{pkg.period}</span>
                </div>
              </div>
              <ul className="space-y-2 mb-6">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 flex-shrink-0 text-xs">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/apply"
                className="inline-block bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-700 transition-colors"
              >
                Apply for {pkg.name}
              </Link>
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
        <h2 className="text-2xl font-bold mb-6">Further Reading</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { title: 'Social Media Marketing NZ', href: '/services/social-media-nz' },
            { title: 'Email Marketing NZ', href: '/services/email-marketing-nz' },
            { title: 'Google Ads NZ', href: '/services/google-ads-nz' },
            { title: 'View All Industries', href: '/industries' },
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
          <h2 className="text-3xl font-bold mb-4">Fill more covers. Keep more margin.</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            We work with select NZ hospitality businesses as a genuine marketing partner.
            Apply below — we review applications and respond within 48 hours.
          </p>
          <Link
            href="/apply"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg"
          >
            Apply to Work With Us
          </Link>
          <p className="text-gray-400 text-sm mt-4">NZ businesses only. Spots are limited.</p>
        </div>
      </section>

      {/* Footer */}
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
