import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Email Marketing for Ecommerce NZ — Klaviyo Flows That Print Revenue | Junction Media',
  description: 'Specialist email marketing for NZ ecommerce stores. Klaviyo setup, automated flows, and campaign management that drives repeat purchases and recovers lost revenue.',
  keywords: 'email marketing for ecommerce nz, klaviyo nz, ecommerce email marketing nz, abandoned cart email nz, email automation ecommerce nz, shopify email marketing nz',
  openGraph: {
    title: 'Email Marketing for Ecommerce NZ | Junction Media',
    description: 'Klaviyo email marketing management for NZ ecommerce stores — automated flows that drive repeat purchases and recover lost revenue.',
    url: 'https://www.junctionmedia.ai/email-marketing-for-ecommerce-nz',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/email-marketing-for-ecommerce-nz',
  },
}

const painPoints = [
  {
    title: 'Email is your highest-margin channel — if you actually use it',
    desc: 'Email marketing has the highest ROI of any digital channel for ecommerce — consistently 30–40x return on cost in well-managed programmes. Most NZ ecommerce stores have an email list they\'ve never properly monetised: a welcome sequence that\'s never been sent, an abandoned cart flow that was set up years ago and never touched, and campaigns that go out only when there\'s a sale.',
  },
  {
    title: 'Klaviyo is powerful but complex — most stores use 20% of what it can do',
    desc: 'Klaviyo\'s full value comes from sophisticated segmentation, predictive analytics, and behavioural triggers that most NZ ecommerce operators never get around to setting up. Browse abandonment, post-purchase cross-sell sequences, win-back campaigns, VIP flows — these can collectively add 15–25% revenue to a store without spending another dollar on ads.',
  },
  {
    title: 'Your list is degrading if you\'re not actively managing it',
    desc: 'Without consistent sends and active list hygiene, your email list loses value every month. Subscribers go cold, deliverability deteriorates, and open rates drop — meaning even when you do send, fewer people see it. An actively managed email programme maintains list health and grows it consistently through pop-ups, post-purchase capture, and social integration.',
  },
]

const approach = [
  {
    title: 'Core Flow Architecture',
    desc: 'We build the five foundational Klaviyo flows that every NZ ecommerce store needs: welcome series, abandoned cart, browse abandonment, post-purchase, and win-back. Each optimised for NZ consumer behaviour and your specific product category.',
  },
  {
    title: 'Advanced Segmentation',
    desc: 'Klaviyo\'s segmentation power activated — VIP segments, predictive CLV segments, product-category purchasers, lapsed customers. The right message to the right customer at the right time, not the same email blast to everyone.',
  },
  {
    title: 'Campaign Calendar & Execution',
    desc: 'A consistent campaign calendar that keeps your list engaged year-round — product launches, seasonal campaigns (Black Friday, Boxing Day, NZ public holidays), editorial content, and exclusive subscriber offers. We write, design, and send.',
  },
  {
    title: 'List Growth & Health',
    desc: 'Pop-up optimisation, post-purchase email capture, social list-building, and active list hygiene to keep your deliverability strong and your subscriber quality high. A growing, healthy list compounds over time.',
  },
]

const results = [
  { stat: '30–40x', label: 'Typical email marketing ROI' },
  { stat: '+20%', label: 'Revenue from advanced flows vs basic setup' },
  { stat: 'Klaviyo', label: 'Certified partner & specialists' },
  { stat: 'NZ-first', label: 'Calendar & seasonal approach' },
]

const faqs = [
  {
    q: 'Which email platform do you use for NZ ecommerce?',
    a: 'Klaviyo is our platform of choice for ecommerce email marketing — it\'s built specifically for ecommerce, integrates natively with Shopify and WooCommerce, and has the most sophisticated segmentation and automation capabilities available. We also work with Mailchimp and other platforms when clients are already established on them.',
  },
  {
    q: 'How quickly can email marketing start generating revenue?',
    a: 'The core abandoned cart flow alone typically pays for itself within the first week of being live. A well-built welcome series starts generating revenue from new subscribers immediately. The compound effects — VIP programmes, win-back campaigns, predictive send-time optimisation — build over 2–3 months. Most NZ ecommerce stores see email move from 10% to 25–35% of total revenue within the first six months.',
  },
  {
    q: 'Our email list is very small — is it worth starting now?',
    a: 'Yes. Even small lists (1,000–5,000 subscribers) can generate meaningful revenue with the right flows and campaigns. And the sooner you start building the system, the faster your list grows. We help you set up list growth mechanisms alongside the email programme itself — so both grow together.',
  },
]

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Junction Media',
    url: 'https://www.junctionmedia.ai',
    description: 'Email marketing agency specialising in ecommerce businesses across New Zealand.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Auckland',
      addressCountry: 'NZ',
    },
    areaServed: [
      { '@type': 'City', name: 'Auckland' },
      { '@type': 'City', name: 'Wellington' },
      { '@type': 'City', name: 'Christchurch' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.junctionmedia.ai' },
      { '@type': 'ListItem', position: 2, name: 'Email Marketing for Ecommerce NZ', item: 'https://www.junctionmedia.ai/email-marketing-for-ecommerce-nz' },
    ],
  },
]

export default function EmailMarketingForEcommerceNZ() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Nav */}
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
          Service + Industry · Email Marketing for Ecommerce NZ
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Email Marketing for<br />
          <span className="text-gray-500">Ecommerce NZ</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          Email is the highest-ROI channel available to NZ ecommerce stores — but only when it&apos;s
          actually built and managed properly. We set up and run Klaviyo for NZ ecommerce brands:
          the automations that recover abandoned carts, the flows that drive repeat purchases, and
          the campaigns that keep your list generating revenue year-round.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/apply" className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors text-center">
            Apply to Work With Us
          </Link>
          <Link href="/industries/ecommerce-nz" className="inline-block border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:border-gray-500 transition-colors text-center">
            Ecommerce Marketing Overview
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
        <h2 className="text-2xl font-bold mb-8">Why Email Marketing is the Most Underused Channel for NZ Ecommerce</h2>
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
        <h2 className="text-2xl font-bold mb-4">Our Ecommerce Email Marketing Approach</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          We build email programmes that compound over time. Starting with the core revenue-driving
          flows, then layering sophistication — advanced segmentation, predictive analytics, and
          campaigns that keep your list engaged without burning it out.
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
            { title: 'Email Marketing for Ecommerce NZ — Full Guide', href: '/blog/email-marketing-for-ecommerce-nz' },
            { title: 'Ecommerce Marketing Overview', href: '/industries/ecommerce-nz' },
            { title: 'SEO for Ecommerce NZ', href: '/seo-for-ecommerce-nz' },
            { title: 'Email Marketing Services NZ', href: '/services/email-marketing-nz' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to unlock email as a revenue channel?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            We work with a small number of NZ ecommerce clients at any one time. Apply to find out
            if we&apos;re a fit.
          </p>
          <Link href="/apply" className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg">
            Apply to Work With Us
          </Link>
          <p className="text-gray-400 text-sm mt-4">NZ ecommerce businesses only.</p>
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
