import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'SEO for Manufacturing Companies in NZ — Industrial & B2B Search Strategy | Junction Media',
  description: 'SEO for NZ manufacturers. B2B search strategy that puts your products and capabilities in front of procurement managers, engineers, and buyers searching for NZ manufacturing partners.',
  keywords: 'seo for manufacturing nz, manufacturer seo nz, industrial seo nz, b2b seo manufacturing nz, nz manufacturer google ranking, engineering company seo nz',
  openGraph: {
    title: 'SEO for Manufacturing NZ | Junction Media',
    description: 'B2B SEO for NZ manufacturers. Get found by procurement managers and buyers searching for NZ manufacturing capabilities.',
    url: 'https://www.junctionmedia.ai/seo-for-manufacturing-nz',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/seo-for-manufacturing-nz',
  },
}

const painPoints = [
  {
    title: 'Manufacturing buyers are searching — most NZ manufacturers are invisible',
    desc: 'Procurement managers, engineers, and supply chain managers actively search Google when sourcing manufacturing partners, materials, and components. Searches like "precision engineering NZ", "plastic injection moulding Auckland", or "contract manufacturing New Zealand" are made every day by people with real budgets and genuine requirements. Most NZ manufacturers have outdated websites with no SEO investment and miss all of it.',
  },
  {
    title: 'Technical content is your competitive moat — if you use it',
    desc: 'Manufacturing companies have deep technical expertise that translates into outstanding SEO content: detailed capability pages, material specifications, tolerance guides, process explanations, and industry application content. This technical depth is hard to replicate and can rank well for long-tail searches that other industries miss. Most manufacturers don\'t publish any of it.',
  },
  {
    title: 'Long sales cycles need top-of-funnel content to start the relationship',
    desc: 'Manufacturing deals don\'t happen from a single Google search. A procurement manager might research your capabilities for months before reaching out. SEO content that educates buyers throughout their research phase — industry guides, capability comparisons, quality certifications, case studies — keeps your company top-of-mind throughout the evaluation process.',
  },
]

const approach = [
  {
    title: 'Capability & Service Page Architecture',
    desc: 'Dedicated pages for each manufacturing capability, material, process, and industry vertical you serve — each optimised for the specific terms buyers use when sourcing those capabilities. Clear, technical descriptions that satisfy both search engines and the engineers making sourcing decisions.',
  },
  {
    title: 'Technical Content Development',
    desc: 'Manufacturing guides, process explainers, material specification pages, and industry application content that attracts top-of-funnel researchers and establishes your technical authority. Content that answers real questions buyers have before they reach out.',
  },
  {
    title: 'Industry Vertical Targeting',
    desc: 'Manufacturing SEO isn\'t one strategy — it varies by the industries you serve. We identify which verticals are searching for your specific capabilities and build content that speaks to those buyers\' specific contexts: aerospace, food processing, construction, medical devices, automotive, or consumer goods.',
  },
  {
    title: 'Local & Export Market Optimisation',
    desc: 'NZ manufacturing SEO covers both local market searches (NZ buyers) and export market intent (international buyers sourcing from NZ). We structure your SEO to capture both segments without diluting either — separate targeting strategies with appropriate geographic signals.',
  },
]

const results = [
  { stat: 'B2B-focused', label: 'Buyer intent strategy' },
  { stat: 'Technical', label: 'Content authority' },
  { stat: '4–5', label: 'Clients at any one time' },
  { stat: '100%', label: 'NZ-based expertise' },
]

const faqs = [
  {
    q: 'Does SEO actually work for B2B manufacturing in NZ?',
    a: 'Yes — and it\'s particularly effective because the competition is low. Most NZ manufacturers haven\'t invested in SEO, which means ranking for high-value industry terms is achievable with consistent effort. Even capturing 2–3 additional qualified enquiries per month from organic search can justify significant SEO investment when you consider the contract values involved in manufacturing deals.',
  },
  {
    q: 'What keywords should NZ manufacturers target?',
    a: 'We start with a thorough keyword research process covering capability-specific terms ("CNC machining Auckland"), material and process terms ("stainless steel fabrication NZ"), industry application terms ("food grade manufacturing NZ"), and intent-driven terms ("manufacturing partner NZ"). We also research international terms if you\'re targeting export markets. Search volumes are often lower than consumer categories, but the commercial intent is high.',
  },
  {
    q: 'How long does manufacturing SEO take to produce results?',
    a: 'Manufacturing SEO follows the same general timeline as all B2B SEO: technical improvements deliver results in 1–3 months, new content begins ranking in 3–6 months, and authority-building through links compounds over 6–18 months. For manufacturers with very little existing online presence, the early wins from technical fixes and Google Business Profile optimisation can be seen within weeks.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'SEO for Manufacturing NZ',
  provider: {
    '@type': 'Organization',
    name: 'Junction Media',
    url: 'https://www.junctionmedia.ai',
  },
  description: 'SEO for NZ manufacturing companies. B2B search strategy, capability page architecture, technical content, and industry vertical targeting.',
  areaServed: { '@type': 'Country', name: 'New Zealand' },
}

export default function SEOForManufacturingNZ() {
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
          Service + Industry · SEO for Manufacturing NZ
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          SEO for<br />
          <span className="text-gray-500">Manufacturing Companies in NZ</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          Procurement managers and engineers searching for NZ manufacturing capabilities go to Google
          first. If your company doesn&apos;t appear for searches like &ldquo;precision engineering NZ&rdquo; or
          &ldquo;contract manufacturing New Zealand&rdquo;, you&apos;re invisible to buyers with real requirements and
          real budgets. We build B2B SEO strategies for NZ manufacturers that turn organic search
          into a consistent lead generation channel.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/apply" className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors text-center">
            Apply to Work With Us
          </Link>
          <Link href="/industries/manufacturing-nz" className="inline-block border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:border-gray-500 transition-colors text-center">
            Manufacturing Marketing Overview
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
        <h2 className="text-2xl font-bold mb-8">Why NZ Manufacturers Need a Dedicated SEO Strategy</h2>
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
        <h2 className="text-2xl font-bold mb-4">Our Manufacturing SEO Approach</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Manufacturing SEO is B2B SEO — it&apos;s about being visible during long research cycles to
          buyers who have complex, specific requirements. We build the content architecture that
          answers their questions at every stage and positions your company as the obvious choice
          before they ever make contact.
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
            { title: 'Manufacturing Marketing Overview', href: '/industries/manufacturing-nz' },
            { title: 'SEO for Construction NZ', href: '/seo-for-construction-nz' },
            { title: 'SEO for Finance NZ', href: '/seo-for-finance-nz' },
            { title: 'Services Overview', href: '/services' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to Get Found by NZ Buyers Searching for Manufacturing?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            We work with a small number of NZ manufacturers at any one time. Apply to see if we can
            help you build organic search visibility that generates qualified enquiries.
          </p>
          <Link href="/apply" className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg">
            Apply to Work With Us
          </Link>
          <p className="text-gray-400 text-sm mt-4">NZ manufacturing businesses only.</p>
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
