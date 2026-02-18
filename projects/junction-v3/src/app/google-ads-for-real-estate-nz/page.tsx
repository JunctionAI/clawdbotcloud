import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Google Ads for Real Estate NZ — Generate Buyer & Vendor Leads | Junction Media',
  description: 'Google Ads for NZ real estate agencies and property developers. Capture high-intent buyer and vendor leads at the moment they search. AI-optimised campaigns.',
  keywords: 'google ads for real estate nz, real estate google ads nz, property google ads nz, real estate ppc nz, property marketing nz',
  openGraph: {
    title: 'Google Ads for Real Estate NZ | Junction Media',
    description: 'Capture high-intent buyer and vendor leads with Google Ads built specifically for NZ real estate. Stop paying for clicks that don\'t convert.',
    url: 'https://www.junctionmedia.ai/google-ads-for-real-estate-nz',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/google-ads-for-real-estate-nz',
  },
}

const painPoints = [
  {
    title: 'Real estate leads have a short window — most agencies miss it',
    desc: 'A vendor thinking about listing researches for 2–4 weeks before contacting an agent. A buyer pre-registers for auctions 48–72 hours before close. Google Ads captures these moments; generic social media posts don\'t. If you\'re not in front of a prospect at the moment of search intent, your competitor is.',
  },
  {
    title: 'Generic "real estate" campaigns waste budget on unqualified clicks',
    desc: 'Bidding on broad terms like "homes for sale NZ" drives high volumes of unqualified traffic. NZ real estate Google Ads needs to target suburb-level, property-type, and intent-qualified keywords — first-home buyer searches, investment property searches, and vendor intent signals like "how much is my house worth".',
  },
  {
    title: 'Most real estate agents can\'t attribute which ad drove a listing',
    desc: 'Without proper conversion tracking (call tracking, form submissions linked to campaign, offline conversion import for listings won), you\'re flying blind. We build the attribution infrastructure first so you can see exactly which campaigns generate real business, not just website traffic.',
  },
]

const approach = [
  {
    title: 'Suburb & Property-Type Targeting',
    desc: 'We build campaigns around NZ suburb searches, property types (do-up, beachfront, investment, first home), and price brackets. Precision targeting means higher relevance scores and lower cost per qualified lead.',
  },
  {
    title: 'Vendor Lead Campaigns',
    desc: 'Dedicated campaigns targeting homeowners considering selling — "how much is my home worth", "real estate agent [suburb]", "sell my house NZ". These leads are gold and require different landing pages and follow-up sequences.',
  },
  {
    title: 'Buyer Lead Campaigns',
    desc: 'Capture buyers at different stages — early research, suburb-specific searching, auction registration intent. Structured campaigns with matching landing pages that qualify and convert.',
  },
  {
    title: 'Call & Form Conversion Tracking',
    desc: 'Google Ads call extensions with call tracking numbers, form submission tracking with lead source attribution, and CRM integration so you know which campaigns produced appraisals, listings, and sales.',
  },
]

const results = [
  { stat: '+30%', label: 'Above store record (Deep Blue Health, Nov 2025)' },
  { stat: '4–5', label: 'Clients at any one time — your campaigns get real attention' },
  { stat: 'Week 1', label: 'Conversion tracking audit and rebuild' },
  { stat: '100%', label: 'NZ-based, NZ-market knowledge' },
]

const faqs = [
  {
    q: 'How much should a real estate agency spend on Google Ads per month?',
    a: 'In NZ metro markets (Auckland, Wellington, Christchurch), a competitive real estate Google Ads budget starts at $3,000–$5,000/month in media spend. Smaller regions can be effective from $1,500/month. The management fee is separate. We\'ll give you a specific recommendation based on your target suburbs and competition level.',
  },
  {
    q: 'Can Google Ads generate vendor (listing) leads or only buyer enquiries?',
    a: 'Both. Vendor leads require different keywords ("appraisal", "sell my home", "what\'s my property worth") and dedicated landing pages with appraisal forms. Buyer leads use property-specific and suburb-specific searches. We run both campaign types simultaneously with separate budgets and tracking.',
  },
  {
    q: 'Do you work with property developers as well as agencies?',
    a: 'Yes. Property developers have different requirements — project launches, off-the-plan sales, land release campaigns — and we have experience building campaigns around staged development timelines and driving VIP registrations before public launch.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Google Ads for Real Estate NZ',
  provider: {
    '@type': 'Organization',
    name: 'Junction Media',
    url: 'https://www.junctionmedia.ai',
  },
  description: 'Google Ads management for NZ real estate agencies and property developers. Vendor leads, buyer leads, suburb targeting, and full conversion attribution.',
  areaServed: { '@type': 'Country', name: 'New Zealand' },
}

export default function GoogleAdsForRealEstateNZ() {
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
          Service + Industry · Google Ads for Real Estate NZ
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Google Ads for<br />
          <span className="text-gray-500">Real Estate NZ</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          Real estate leads are won in the moments buyers and vendors search Google. We build AI-optimised
          Google Ads campaigns that capture these high-intent moments — suburb-level vendor leads, buyer
          enquiries, and auction registrations — with the tracking infrastructure to prove what works.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/apply" className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors text-center">
            Apply to Work With Us
          </Link>
          <Link href="/industries/real-estate-nz" className="inline-block border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:border-gray-500 transition-colors text-center">
            Real Estate Marketing Overview
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
        <h2 className="text-2xl font-bold mb-8">Why Real Estate Businesses Need Google Ads Done Right</h2>
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
        <h2 className="text-2xl font-bold mb-4">Our Approach for Real Estate Google Ads</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          We don&apos;t use generic property industry templates. We build real estate campaigns around your
          specific suburbs, property types, and whether you&apos;re targeting vendors, buyers, or both —
          with separate campaigns, landing pages, and tracking for each intent signal.
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

      {/* Proof */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Real Results</h2>
        <div className="p-8 bg-gray-50 rounded-2xl border border-gray-200">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Case Study · Deep Blue Health</p>
          <p className="text-3xl font-bold text-gray-900 mb-3">+30% above store record</p>
          <p className="text-gray-600 leading-relaxed">
            Our AI-managed Google Ads approach has driven record results across industries. Deep Blue Health
            beat their all-time monthly revenue record by 30% in November 2025 — proof that our campaign
            structure, attribution setup, and continuous optimisation delivers when it matters most.
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
        <h2 className="text-2xl font-bold mb-6">Related</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { title: 'Google Ads for Real Estate NZ — Full Guide', href: '/blog/google-ads-real-estate-nz' },
            { title: 'Real Estate Marketing NZ', href: '/industries/real-estate-nz' },
            { title: 'Google Ads Services NZ', href: '/services/google-ads-nz' },
            { title: 'Meta Ads for Ecommerce NZ', href: '/meta-ads-for-ecommerce-nz' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to Scale Your Real Estate Business?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            We work with a small number of NZ clients at any one time. Apply to see if we can help
            your agency win more listings and buyer enquiries.
          </p>
          <Link href="/apply" className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg">
            Apply to Work With Us
          </Link>
          <p className="text-gray-400 text-sm mt-4">NZ real estate businesses only.</p>
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
