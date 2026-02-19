import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Google Ads for Finance Companies in NZ — Compliant PPC for Financial Services | Junction Media',
  description: 'Google Ads management for NZ financial services companies. Compliant, high-converting campaigns for insurance, mortgage brokers, investment advisors, and fintech.',
  keywords: 'google ads for finance nz, financial services google ads nz, mortgage broker google ads nz, insurance google ads nz, fintech ppc nz, financial advisor ppc nz',
  openGraph: {
    title: 'Google Ads for Finance NZ | Junction Media',
    description: 'Compliant Google Ads for NZ financial services. Capture high-intent prospects searching for mortgages, insurance, investments, and financial advice.',
    url: 'https://www.junctionmedia.ai/google-ads-for-finance-nz',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/google-ads-for-finance-nz',
  },
}

const painPoints = [
  {
    title: 'Financial services Google Ads require compliance knowledge most agencies lack',
    desc: 'Google has strict advertising policies for financial products — credit, insurance, investment products all have specific certification, disclosure, and targeting requirements. Non-compliant ads get disapproved or accounts suspended. Most generalist agencies don\'t understand the Financial Services Verification Programme requirements or how to structure compliant ads for NZ regulated entities.',
  },
  {
    title: 'Financial keywords are among the most competitive in NZ',
    desc: 'Terms like "mortgage broker Auckland", "KiwiSaver advice", and "business insurance NZ" attract major banks, insurance companies, and well-funded comparison sites bidding aggressively. Winning without a clear differentiation strategy and smart bidding structure means you\'re competing on budget alone — a race you\'ll lose against the big players.',
  },
  {
    title: 'Trust and credibility must be established before prospects convert',
    desc: 'Financial decisions are high-stakes and high-trust. A prospect searching for a mortgage broker is not going to convert on a generic landing page. They need to see credentials, reviews, clear explanations of your process, and reasons to trust you over every other option. Most NZ finance Google Ads campaigns drive traffic to homepages that don\'t convert.',
  },
]

const approach = [
  {
    title: 'Compliance-First Campaign Setup',
    desc: 'We understand Google\'s Financial Services Verification requirements and structure campaigns that satisfy policy requirements while still being compelling. Required disclosures, appropriate targeting restrictions, and keyword strategies that stay within policy boundaries.',
  },
  {
    title: 'Competitive Differentiation Strategy',
    desc: 'Instead of bidding head-to-head on the most expensive terms, we identify high-intent long-tail keywords where your specific offer has an advantage — niche products, specific life stages, geographic focus, or unique service models that large competitors don\'t serve well.',
  },
  {
    title: 'Trust-Building Landing Pages',
    desc: 'Landing pages designed for financial services conversion: clear credentials display, client testimonials with specifics, regulatory registrations, transparent fee information, and low-friction consultation CTAs that match the prospect\'s stage of evaluation.',
  },
  {
    title: 'Lead Quality Optimisation',
    desc: 'Financial services need qualified leads, not just leads. We implement pre-qualification questions, lead scoring through form design, and CRM integration that lets us optimise for leads that actually convert to clients — not just people who submitted a form.',
  },
]

const results = [
  { stat: 'Compliant', label: 'Google financial policy adherence' },
  { stat: 'Long-tail', label: 'Competitive differentiation' },
  { stat: '4–5', label: 'Clients at any one time' },
  { stat: '100%', label: 'NZ-based expertise' },
]

const faqs = [
  {
    q: 'Do NZ financial services companies need special Google Ads certification?',
    a: 'Yes. Google requires Financial Services Verification for certain financial product categories including credit products, investment products, and some insurance categories. The requirements vary by product type and target country. We\'ll assess what your specific product requires and guide you through the verification process before launching campaigns.',
  },
  {
    q: 'How do you compete with major banks and insurers on Google Ads?',
    a: 'We don\'t compete head-to-head on their strongest terms — we find the gaps. Long-tail queries, specific product niches, geographic areas the big players underserve, and life-event triggers (first home, new business, upcoming retirement) where a specialist advisor has a genuine advantage over a large institution. Quality score and landing page relevance also matter enormously at scale.',
  },
  {
    q: 'What conversion events should NZ finance companies track in Google Ads?',
    a: 'We typically track multiple conversion events: consultation booked (primary), contact form submission, phone call, document download (mortgage calculator, insurance guide etc.), and live chat initiation. Weighted conversion values let us optimise for the events that actually predict client conversion, not just any form fill.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Google Ads for Finance NZ',
  provider: {
    '@type': 'Organization',
    name: 'Junction Media',
    url: 'https://www.junctionmedia.ai',
  },
  description: 'Google Ads management for NZ financial services companies. Compliant campaigns, competitive differentiation, and lead quality optimisation.',
  areaServed: { '@type': 'Country', name: 'New Zealand' },
}

export default function GoogleAdsForFinanceNZ() {
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
          Service + Industry · Google Ads for Finance NZ
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Google Ads for<br />
          <span className="text-gray-500">Finance Companies in NZ</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          Financial services prospects search Google when they&apos;re ready to act — comparing mortgage
          brokers, finding business insurance, or looking for investment advice. We manage Google Ads
          for NZ finance companies that need compliant, high-converting campaigns that generate
          qualified leads, not just clicks from people who aren&apos;t serious buyers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/apply" className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors text-center">
            Apply to Work With Us
          </Link>
          <Link href="/industries/finance-nz" className="inline-block border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:border-gray-500 transition-colors text-center">
            Finance Marketing Overview
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
        <h2 className="text-2xl font-bold mb-8">Why Finance Google Ads Needs a Specialist Approach</h2>
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
        <h2 className="text-2xl font-bold mb-4">Our Finance Google Ads Approach</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Finance is one of the most complex categories in Google Ads — compliance requirements,
          fierce competition, and high-trust conversion challenges all demand expertise. We build
          campaigns that navigate these constraints and find profitable angles for your specific
          financial product or service.
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
            { title: 'SEO for Finance NZ', href: '/seo-for-finance-nz' },
            { title: 'Finance Marketing Overview', href: '/industries/finance-nz' },
            { title: 'Google Ads for Healthcare NZ', href: '/google-ads-for-healthcare-nz' },
            { title: 'Google Ads for SaaS NZ', href: '/google-ads-for-saas-nz' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to Generate Qualified Finance Leads from Google?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            We work with a small number of NZ finance clients at any one time. Apply to see if we can
            help you build a compliant, high-converting Google Ads system for your financial services business.
          </p>
          <Link href="/apply" className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg">
            Apply to Work With Us
          </Link>
          <p className="text-gray-400 text-sm mt-4">NZ financial services businesses only.</p>
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
