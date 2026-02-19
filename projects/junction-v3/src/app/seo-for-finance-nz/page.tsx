import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'SEO for Finance NZ — Organic Lead Generation for Financial Services | Junction Media',
  description: 'Specialist SEO for NZ financial services businesses. Rank for high-value mortgage, insurance, investment, and accounting keywords. Compliant, conversion-focused organic search.',
  keywords: 'seo for finance nz, financial services seo nz, mortgage broker seo nz, insurance seo nz, accounting seo nz, financial advisor seo nz, fintech seo nz',
  openGraph: {
    title: 'SEO for Finance NZ | Junction Media',
    description: 'Specialist SEO for NZ financial services — mortgage brokers, insurers, advisors, accountants, and fintechs.',
    url: 'https://www.junctionmedia.ai/seo-for-finance-nz',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/seo-for-finance-nz',
  },
}

const painPoints = [
  {
    title: 'Finance keywords are among the highest-value — and most competitive — in NZ',
    desc: 'Searches like "mortgage broker Auckland", "KiwiSaver advice NZ", or "business insurance NZ" carry enormous commercial value. The brands that rank for these terms generate leads at a fraction of the cost of paid search. But ranking requires sustained, expert-level SEO — not generic tactics.',
  },
  {
    title: 'Financial services content must be accurate, compliant, and authoritative',
    desc: 'Google\'s E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) standards hit financial services harder than almost any other industry. "Your Money or Your Life" (YMYL) content requires expert-authored, factually accurate, and regularly updated content. Thin or AI-generated content won\'t rank — and shouldn\'t.',
  },
  {
    title: 'NZ financial services is a trust-intensive market',
    desc: 'New Zealanders choosing a financial provider do extensive research before committing. The businesses that appear consistently in organic search — with genuinely useful content — build the trust that converts. The businesses that rely solely on ads are starting from zero trust every time.',
  },
]

const approach = [
  {
    title: 'YMYL Content Strategy',
    desc: 'Expert-level content that meets Google\'s highest quality standards for financial services. We produce guides, calculators, explainers, and comparison content that earns both rankings and reader trust — authored with genuine financial expertise.',
  },
  {
    title: 'High-Value Keyword Targeting',
    desc: 'Research-led identification of the mortgage, insurance, investment, accounting, and fintech keywords that NZ consumers actually search. We prioritise by commercial intent and conversion likelihood, not just search volume.',
  },
  {
    title: 'Technical SEO & Authority Building',
    desc: 'Site architecture, internal linking, and technical foundations that support strong rankings. Plus strategic link building through NZ financial media and industry publications to build the domain authority that finance SEO demands.',
  },
  {
    title: 'Local Financial Services SEO',
    desc: 'Location-specific optimisation for financial advisors and brokers in Auckland, Wellington, Christchurch, and beyond. Local search is where individual practitioners and boutique firms can compete with the big banks and national brands.',
  },
]

const results = [
  { stat: '3–9mo', label: 'Timeline to competitive finance keyword rankings' },
  { stat: 'YMYL', label: 'Compliant content standards' },
  { stat: '100%', label: 'NZ financial market expertise' },
  { stat: 'High', label: 'Organic lead value in finance sector' },
]

const faqs = [
  {
    q: 'Is SEO actually effective for financial services in NZ?',
    a: 'Yes — but it takes longer and requires higher quality than most industries. Finance is a YMYL (Your Money or Your Life) category, which means Google scrutinises content quality heavily. Done right, finance SEO generates the highest-value leads of any channel — someone who\'s researched extensively and organically found your business is far more qualified than a paid ad click.',
  },
  {
    q: 'What types of financial services businesses do you work with?',
    a: 'We work with mortgage brokers, insurance advisers and brokers, financial planners, KiwiSaver providers, accounting firms, and fintech companies across NZ. Each sub-sector has different keyword landscapes and compliance considerations — we understand the nuances.',
  },
  {
    q: 'How does financial services SEO differ from other industries?',
    a: 'Three key differences. First, content quality standards are significantly higher — Google is very strict about who ranks for financial advice content. Second, the conversion cycle is longer, requiring content that builds trust across multiple touchpoints. Third, there are regulatory compliance considerations for what financial services content can say in NZ. We navigate all three.',
  },
]

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Junction Media',
    url: 'https://www.junctionmedia.ai',
    description: 'SEO agency specialising in financial services businesses across New Zealand.',
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
      { '@type': 'ListItem', position: 2, name: 'SEO for Finance NZ', item: 'https://www.junctionmedia.ai/seo-for-finance-nz' },
    ],
  },
]

export default function SeoForFinanceNZ() {
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
          Service + Industry · SEO for Finance NZ
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          SEO for<br />
          <span className="text-gray-500">Finance NZ</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          Financial services keywords generate the highest-value leads in NZ digital marketing. The
          firms that earn organic rankings for mortgage, insurance, investment, and accounting terms
          build a sustainable competitive advantage that paid ads can never replicate. We build that
          advantage for NZ financial services businesses.
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
        <h2 className="text-2xl font-bold mb-8">Why Finance SEO in NZ Requires a Specialist Approach</h2>
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
        <h2 className="text-2xl font-bold mb-4">Our Finance SEO Approach</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Finance SEO is built on credibility — both to search engines and to prospective clients.
          We build content and technical strategies that satisfy Google&apos;s demanding quality
          standards while creating genuine value for NZ financial consumers.
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
            { title: 'SEO for Finance NZ — Full Guide', href: '/blog/seo-for-finance-nz' },
            { title: 'Finance Marketing Overview', href: '/industries/finance-nz' },
            { title: 'SEO for Healthcare NZ', href: '/seo-for-healthcare-nz' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to rank for high-value finance keywords?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            We work with a small number of NZ financial services clients at any one time. Apply to
            find out if we&apos;re a fit.
          </p>
          <Link href="/apply" className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg">
            Apply to Work With Us
          </Link>
          <p className="text-gray-400 text-sm mt-4">NZ financial services businesses only.</p>
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
