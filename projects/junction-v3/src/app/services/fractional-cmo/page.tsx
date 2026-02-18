import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Fractional CMO NZ | Fractional CMO Auckland | Junction Media',
  description: 'Fractional CMO services for NZ businesses. Tom Hall-Taylor works with 4–5 clients maximum, at $10k/month. Senior marketing leadership without a full-time hire. Apply now.',
  keywords: 'fractional CMO NZ, fractional CMO Auckland, fractional CMO cost NZ, fractional marketing director NZ, outsourced CMO NZ, AI marketing consultant NZ, Junction Media',
  openGraph: {
    title: 'Fractional CMO NZ | Tom Hall-Taylor | Junction Media',
    description: 'Senior marketing leadership for NZ businesses. Tom Hall-Taylor works with a maximum of 4–5 clients at $10k/month. Apply to work together.',
    url: 'https://www.junctionmedia.ai/services/fractional-cmo',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/services/fractional-cmo',
  },
}

const whatYouGet = [
  {
    title: 'Full Marketing Strategy Ownership',
    desc: 'I own the marketing function — strategy, priorities, and execution. You focus on your business. I focus on making the marketing work.',
  },
  {
    title: '90-Day Growth Roadmap',
    desc: 'Every engagement starts with a 90-day roadmap. Clear priorities, clear milestones, clear expected outcomes. No ambiguity about what we\'re building toward.',
  },
  {
    title: 'AI Marketing Systems Build-Out',
    desc: 'I don\'t just advise — I build. Content pipelines, paid media systems, customer communication flows, and reporting dashboards. Your business gets infrastructure, not opinions.',
  },
  {
    title: 'Weekly Check-Ins',
    desc: 'Direct access to Tom. Weekly video calls covering performance, priorities, and decisions. You always know exactly what\'s happening and why.',
  },
  {
    title: 'Channel Execution',
    desc: 'Meta Ads, Google Ads, SEO, content, email — all managed under one strategic roof. No fragmented agencies speaking different languages. One operator, full visibility.',
  },
  {
    title: 'Performance Reporting',
    desc: 'Weekly performance summaries in plain English. What\'s working, what\'s not, what we\'re doing about it. No 40-slide decks dressed up to hide a bad month.',
  },
]

const whoItsFor = [
  {
    title: 'NZ businesses with $2M–$20M revenue',
    desc: 'You\'ve got traction. You need someone who can own the marketing function and scale it — not a junior hire or an agency that doesn\'t understand your model.',
  },
  {
    title: 'E-commerce brands with product-market fit',
    desc: 'You know the product works. You need systematic acquisition and retention. AI-native systems are how you scale without proportionally scaling costs.',
  },
  {
    title: 'Service businesses with a clear client profile',
    desc: 'You know who you want. You need consistent pipeline, positioning that closes, and content that builds authority. That\'s a system problem, not a creative problem.',
  },
  {
    title: 'Founders who think in systems',
    desc: 'You\'re not buying activity. You\'re buying infrastructure that compounds. If you understand leverage, we\'ll get along well.',
  },
]

const faqs = [
  {
    q: 'What does "fractional CMO" actually mean?',
    a: 'A fractional CMO is a senior marketing executive who works with your business on a part-time or retainer basis — delivering the strategic leadership of a full-time CMO without the full-time cost. Instead of paying $200k+ for a full-time hire (plus benefits, equity, recruitment cost), you get senior marketing leadership at a fraction of the price. The "fraction" refers to time allocation, not quality of work.',
  },
  {
    q: 'How much does a fractional CMO cost in NZ?',
    a: 'My engagements start at $10,000/month NZD. That includes full marketing strategy ownership, AI systems build-out, channel execution across paid media and content, and direct weekly access. Compare that to: a full-time CMO ($200k+/year), a mid-size agency retainer ($15–30k/month for senior strategy + execution), or a junior marketing manager ($80–100k/year) who can\'t do strategy. For what\'s included, $10k/month is the most cost-effective route to senior marketing leadership available in NZ.',
  },
  {
    q: 'Why do you only work with 4–5 clients?',
    a: 'Because more than that and I can\'t do the work properly. Traditional agencies work with 20–30 clients per account manager. That means your business gets a fraction of a junior person\'s attention. I made a deliberate decision to cap at 4–5 clients — which means each one gets genuine strategic depth, not a template dressed up with your logo. That cap is the product.',
  },
  {
    q: 'What\'s the minimum commitment?',
    a: 'Three months minimum. Marketing compounds over time. A 30-day sprint shows activity. A 90-day engagement shows the beginning of real momentum — systems built, channels optimised, data accumulated. Anything less than three months isn\'t enough time to do meaningful work. I\'m also selective about who I work with — I\'m not looking for clients, I\'m looking for partners.',
  },
  {
    q: 'How is this different from hiring a marketing agency?',
    a: 'Three key differences. First, you deal directly with me — not an account manager who briefs a team you\'ll never meet. Second, I use AI systems for execution, which means the output volume of a large team at a fraction of the cost. Third, I\'m capped at 4–5 clients, so your business gets genuine attention, not rotation. Agencies are built around client volume. Junction Media is built around client outcomes.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Fractional CMO Services NZ',
  provider: {
    '@type': 'Person',
    name: 'Tom Hall-Taylor',
    jobTitle: 'Fractional CMO & AI Marketing Consultant',
    url: 'https://www.junctionmedia.ai',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Auckland',
      addressCountry: 'NZ',
    },
  },
  description: 'Fractional CMO services for NZ businesses. Senior marketing leadership, AI systems build-out, and full channel execution — by application only.',
  areaServed: { '@type': 'Country', name: 'New Zealand' },
  offers: {
    '@type': 'Offer',
    priceSpecification: {
      '@type': 'PriceSpecification',
      price: '10000',
      priceCurrency: 'NZD',
      unitText: 'month',
    },
  },
}

export default function FractionalCMOPage() {
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
          Service · Fractional CMO
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Fractional CMO<br />
          <span className="text-gray-500">for NZ Businesses</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          Senior marketing leadership, without a full-time hire. Tom Hall-Taylor embeds in your business,
          owns the marketing function, and builds the AI-native systems that compound over time.
          By application only — maximum 4–5 clients at any time.
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
            { stat: '4–5', label: 'Clients max' },
            { stat: '$10k', label: 'Per month NZD' },
            { stat: '3-month', label: 'Minimum term' },
            { stat: '+30%', label: 'Above store record (Deep Blue Health)' },
          ].map((item) => (
            <div key={item.label} className="p-4 border border-gray-100 rounded-2xl text-center">
              <p className="text-2xl font-bold text-gray-900 mb-1">{item.stat}</p>
              <p className="text-xs text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What You Get */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">What You Get</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {whatYouGet.map((item) => (
            <div key={item.title} className="p-6 border border-gray-100 rounded-2xl">
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who It's For */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">Who This Is For</h2>
        <div className="space-y-6">
          {whoItsFor.map((item) => (
            <div key={item.title} className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">
                ✓
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Context */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Pricing</h2>
        <div className="bg-gray-50 rounded-2xl p-8">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-4xl font-bold text-gray-900">$10,000</span>
            <span className="text-gray-500">/month NZD</span>
          </div>
          <p className="text-gray-600 leading-relaxed mb-6">
            Full marketing strategy ownership, AI systems build-out, channel execution, weekly check-ins,
            and direct access to Tom. Three-month minimum engagement.
          </p>
          <div className="space-y-3 mb-8">
            <p className="text-sm font-medium text-gray-700">Compare to:</p>
            {[
              { label: 'Full-time CMO (NZ market)', cost: '$180–220k/year + benefits + equity' },
              { label: 'Mid-size Auckland agency (strategy + execution)', cost: '$15,000–30,000/month' },
              { label: 'Junior marketing manager', cost: '$80–100k/year — no strategy capability' },
              { label: 'Tom Hall-Taylor, Fractional CMO', cost: '$10,000/month — senior strategy + AI execution', highlight: true },
            ].map((row) => (
              <div
                key={row.label}
                className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-3 border-b border-gray-200 last:border-0 ${
                  row.highlight ? 'font-semibold text-gray-900' : 'text-gray-600'
                }`}
              >
                <span className="text-sm">{row.label}</span>
                <span className="text-sm">{row.cost}</span>
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

      {/* Result */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">A Recent Result</h2>
        <div className="bg-gray-50 rounded-2xl p-8">
          <p className="text-4xl font-bold text-gray-900 mb-2">+30%</p>
          <p className="text-gray-500 text-sm mb-4">Above previous all-time revenue record</p>
          <p className="text-gray-600 leading-relaxed">
            Deep Blue Health — a New Zealand supplement brand — hit their best revenue month ever
            in November 2025. As their fractional CMO, I built AI-native marketing systems across
            Google Ads, Meta Ads, SEO, content production, and customer support.
            The result was 30% above their previous all-time store record.
          </p>
          <p className="text-gray-500 text-sm mt-4">
            Read:{' '}
            <Link href="/blog/deep-blue-health-case-study" className="underline hover:text-gray-700 transition-colors">
              Deep Blue Health case study →
            </Link>
          </p>
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
            { title: 'What is a Fractional CMO? (NZ guide)', href: '/blog/what-is-a-fractional-cmo-nz' },
            { title: 'How to hire a Fractional CMO in NZ', href: '/blog/how-to-hire-fractional-cmo-nz' },
            { title: 'Fractional Marketing Director NZ', href: '/blog/fractional-marketing-director-nz' },
            { title: 'AI Marketing Systems', href: '/services/ai-marketing-systems' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to apply?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            Spots are limited to 4–5 clients. If your NZ business is ready for AI-native marketing
            leadership — apply below and I&apos;ll review your application within 48 hours.
          </p>
          <Link
            href="/#apply"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg"
          >
            Apply to Work With Me
          </Link>
          <p className="text-gray-400 text-sm mt-4">Spots are limited. Serious enquiries only.</p>
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
