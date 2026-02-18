import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'SEO Agency for SaaS NZ — Product-Led SEO for NZ Software Companies | Junction Media',
  description: 'SEO for NZ SaaS companies. Rank for high-intent trial and comparison keywords, build domain authority through content, and reduce CAC with organic pipeline.',
  keywords: 'seo for saas nz, saas seo nz, seo agency saas nz, software company seo nz, b2b saas seo nz, product-led seo nz',
  openGraph: {
    title: 'SEO Agency for SaaS NZ | Junction Media',
    description: 'Product-led SEO for NZ SaaS companies. Rank for trial-intent and comparison keywords, reduce CAC, and build the organic pipeline that compounds every month.',
    url: 'https://www.junctionmedia.ai/seo-for-saas-nz',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/seo-for-saas-nz',
  },
}

const painPoints = [
  {
    title: 'SaaS companies live or die on organic pipeline in the long run',
    desc: 'Paid acquisition works for early-stage SaaS growth, but it doesn\'t compound. Every new customer from paid ads costs roughly the same as the last. SEO compounds: a well-ranking article drives signups in month 6, month 18, and month 36 — for the same initial investment. NZ SaaS companies that neglect SEO give up a compounding advantage to competitors who don\'t.',
  },
  {
    title: 'SaaS buyers research differently — your content strategy must match',
    desc: 'A SaaS buyer\'s search journey includes problem-aware searches, solution-aware searches, and high-intent comparison and alternative searches. Most NZ SaaS companies only have content for one of these stages. A complete SEO strategy covers the full buyer journey — capturing at each stage and nurturing toward trial.',
  },
  {
    title: 'Generic SEO doesn\'t understand SaaS metrics',
    desc: 'An SEO agency that doesn\'t understand MRR, CAC, LTV, and expansion revenue will optimise for the wrong things — traffic without considering conversion rate to trial, and trials without considering product activation. SaaS SEO needs to connect organic traffic to business metrics that actually matter.',
  },
]

const approach = [
  {
    title: 'Bottom-of-Funnel Keyword Strategy',
    desc: 'High-intent searches like "[your product] alternatives", "[competitor] vs [your product]", "best [category] software NZ", and "[use case] software" — these searches come from buyers ready to make a decision. We prioritise them first because they deliver the fastest business impact.',
  },
  {
    title: 'Comparison & Alternative Pages',
    desc: 'Dedicated landing pages for competitor comparison searches — the highest-converting SEO content type for SaaS. Built with structured product comparisons, honest positioning, and CTAs designed for trial sign-up.',
  },
  {
    title: 'Thought Leadership & Domain Authority',
    desc: 'Long-form content that builds topical authority in your product category. Industry guides, benchmark reports, and expert content that earns backlinks and positions your brand as the authority in your space.',
  },
  {
    title: 'Technical SEO for SaaS Products',
    desc: 'SaaS products often have unique technical SEO challenges — user-generated content, faceted navigation, app subdomains, and public-facing feature pages. We solve these systematically so they enhance rather than dilute your domain authority.',
  },
]

const results = [
  { stat: '+30%', label: 'Above store record (Deep Blue Health, Nov 2025)' },
  { stat: '4–5', label: 'Clients at any one time — focused work' },
  { stat: 'BoFu First', label: 'Priority on trial-intent keywords' },
  { stat: '100%', label: 'NZ-based, NZ-market expertise' },
]

const faqs = [
  {
    q: 'Does SEO make sense for a NZ SaaS company with a global product?',
    a: 'Yes — with a nuanced strategy. NZ SaaS companies selling globally often start with NZ-specific content (lower competition, highly relevant), then expand to Australian, UK, and US markets as domain authority grows. We build international-ready content structures from the start so your SEO scales globally.',
  },
  {
    q: 'How does SaaS SEO connect to product-led growth?',
    a: 'Product-led SEO means creating content that captures buyers and leads them toward your free trial or freemium product — not just informational traffic. We optimise for search terms where the searcher is considering a purchase, then design the content-to-trial journey to maximise activation.',
  },
  {
    q: 'What SaaS categories do you have experience with?',
    a: 'We have experience across B2B SaaS, vertical SaaS (industry-specific tools), and marketplace platforms. Whether you\'re selling to SMBs, enterprise, or consumers, the keyword strategy and content architecture adapt to the buyer journey your customers actually use.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'SEO for SaaS NZ',
  provider: {
    '@type': 'Organization',
    name: 'Junction Media',
    url: 'https://www.junctionmedia.ai',
  },
  description: 'Product-led SEO for NZ SaaS companies. Bottom-of-funnel keyword strategy, comparison pages, thought leadership content, and technical SEO for software products.',
  areaServed: { '@type': 'Country', name: 'New Zealand' },
}

export default function SeoForSaasNZ() {
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
          Service + Industry · SEO for SaaS NZ
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          SEO Agency for<br />
          <span className="text-gray-500">SaaS NZ</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          Paid acquisition doesn&apos;t compound. SEO does. We build product-led SEO strategies for NZ
          SaaS companies that capture buyers at every stage of the decision journey — from problem-aware
          searches to high-intent comparison queries — and convert organic traffic into trial sign-ups
          that become long-term MRR.
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
        <h2 className="text-2xl font-bold mb-8">Why SaaS Companies Need SEO — Not Just Paid Acquisition</h2>
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
        <h2 className="text-2xl font-bold mb-4">Our SaaS SEO Approach</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          SaaS SEO requires understanding the product, the buyer, and the competitive landscape. We
          don&apos;t just write content — we build a strategic content architecture that maps to your
          buyer journey, earns authority in your category, and converts organic visitors into trials.
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
            Our AI-powered full-stack marketing approach helped Deep Blue Health beat their all-time
            monthly revenue record by 30% in November 2025. The same strategic thinking — content
            architecture, keyword intent mapping, and conversion-focused SEO — powers our SaaS
            client work.
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
            { title: 'SEO for SaaS NZ — Full Guide', href: '/blog/seo-saas-nz' },
            { title: 'SaaS Marketing NZ', href: '/industries/saas-nz' },
            { title: 'Content Marketing for SaaS NZ', href: '/content-marketing-for-saas-nz' },
            { title: 'SEO Services NZ', href: '/services/seo-nz' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to Build Your SaaS Organic Pipeline?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            We work with a small number of NZ SaaS clients at any one time. Apply to see if we can
            help you build the SEO engine that compounds every month.
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
