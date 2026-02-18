import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Content Marketing for SaaS NZ — Pipeline-Generating Content Strategy | Junction Media',
  description: 'Content marketing for NZ SaaS companies. AI-powered content that builds domain authority, captures buyer-intent searches, and turns organic traffic into trial sign-ups.',
  keywords: 'content marketing for saas nz, saas content marketing nz, content strategy saas nz, b2b content marketing nz, saas blog nz, saas thought leadership nz',
  openGraph: {
    title: 'Content Marketing for SaaS NZ | Junction Media',
    description: 'Content marketing for NZ SaaS companies that builds pipeline. Strategy-first, AI-powered production, and a content architecture designed to compound every month.',
    url: 'https://www.junctionmedia.ai/content-marketing-for-saas-nz',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/content-marketing-for-saas-nz',
  },
}

const painPoints = [
  {
    title: 'Most SaaS content is high-effort, low-return because strategy comes last',
    desc: 'Writing blog posts without a keyword strategy, topical authority map, and content-to-conversion journey is expensive output that doesn\'t compound. Most NZ SaaS companies are producing content reactively — publishing what seems interesting rather than what\'s strategically positioned to rank, build authority, and convert searchers into trials.',
  },
  {
    title: 'SaaS content needs to serve three masters: SEO, thought leadership, and sales enablement',
    desc: 'Great SaaS content earns rankings from Google, builds category authority with buyers and influencers, and gives your sales team case studies, comparison guides, and ROI calculators that accelerate deals. Most NZ SaaS content only tries to do one of these things — which is why most SaaS blogs don\'t move business metrics.',
  },
  {
    title: 'Content production at the required volume requires systems, not just writers',
    desc: 'A competitive SaaS content program needs 4–8 high-quality articles per month, plus supporting content (landing pages, social assets, email nurture sequences). That requires an AI-assisted production system, not a single freelance writer. We build the system that scales content output without sacrificing quality.',
  },
]

const approach = [
  {
    title: 'Topical Authority Architecture',
    desc: 'We map the full keyword universe for your product category, build a pillar-cluster content structure that signals deep expertise to Google, and prioritise publication order to build authority systematically rather than randomly.',
  },
  {
    title: 'Bottom-of-Funnel Content First',
    desc: 'Comparison pages, alternative guides, use-case landing pages, and integration content — the content that captures buyers closest to a purchase decision. We build BoFu content first because it generates pipeline immediately while the longer-tail ToFu content compounds in the background.',
  },
  {
    title: 'AI-Powered Production at Scale',
    desc: 'We use AI to produce draft content at scale, then apply expert editing, original data, and genuine product insight to create content that\'s indistinguishable from human-first work — but produced at 3–5x the speed and cost-efficiency.',
  },
  {
    title: 'Content Distribution & Amplification',
    desc: 'Great content that nobody reads doesn\'t build pipeline. We build distribution into every piece — LinkedIn publishing, newsletter syndication, community sharing, and link-building outreach to ensure your content reaches your target audience, not just Google\'s crawlers.',
  },
]

const results = [
  { stat: '+30%', label: 'Above store record (Deep Blue Health, Nov 2025)' },
  { stat: '4–8', label: 'Articles per month production capacity' },
  { stat: 'BoFu First', label: 'Pipeline content before awareness content' },
  { stat: '100%', label: 'NZ-based, SaaS-experienced team' },
]

const faqs = [
  {
    q: 'How is SaaS content marketing different from other industries?',
    a: 'SaaS buyers are more educated and more skeptical than most B2C buyers. Generic, thin content doesn\'t work — buyers can tell immediately if a piece was written by someone who doesn\'t understand the category. Our content team works closely with your product team to ensure every piece demonstrates genuine product expertise and reflects real customer pain points.',
  },
  {
    q: 'Do you include technical content and documentation-adjacent content?',
    a: 'Yes — for developer-led or technical SaaS products, integration guides, API documentation content, and technical use-case articles can be highly effective for SEO and pipeline generation. We have experience writing technical SaaS content that balances accessibility for business buyers with enough depth to satisfy technical evaluators.',
  },
  {
    q: 'How do you measure content marketing ROI for SaaS?',
    a: 'We track organic traffic growth, keyword ranking movement, content-influenced trial sign-ups (using UTM tracking and assisted conversion data), and content-influenced pipeline (using CRM integration). The goal is always business metrics — pipeline and revenue — not vanity metrics like page views.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Content Marketing for SaaS NZ',
  provider: {
    '@type': 'Organization',
    name: 'Junction Media',
    url: 'https://www.junctionmedia.ai',
  },
  description: 'Content marketing for NZ SaaS companies. Topical authority architecture, BoFu-first content strategy, AI-powered production, and pipeline-connected distribution.',
  areaServed: { '@type': 'Country', name: 'New Zealand' },
}

export default function ContentMarketingForSaasNZ() {
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
          Service + Industry · Content Marketing for SaaS NZ
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Content Marketing for<br />
          <span className="text-gray-500">SaaS NZ</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          Content marketing for NZ SaaS companies that actually builds pipeline — not just page views.
          We build the strategic architecture, produce content at scale using AI-assisted systems,
          and distribute it where your buyers actually are. Every piece is designed to rank, build
          authority, and convert organic visitors into trial sign-ups.
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
        <h2 className="text-2xl font-bold mb-8">Why Most SaaS Content Marketing Doesn&apos;t Build Pipeline</h2>
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
        <h2 className="text-2xl font-bold mb-4">Our SaaS Content Marketing Approach</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          We treat content as a pipeline asset, not a brand exercise. Every piece is mapped to a
          stage in your buyer journey, a keyword cluster with search volume, and a conversion goal.
          We measure content performance in trials and pipeline influenced — not blog traffic.
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
            Deep Blue Health beat their all-time monthly revenue record by 30% in November 2025.
            AI-powered content production — product education articles, category SEO content, and
            email sequences — formed the organic backbone of a multi-channel marketing system that
            delivered record results.
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
            { title: 'Content Marketing for SaaS NZ — Full Guide', href: '/blog/content-marketing-saas-nz' },
            { title: 'SEO for SaaS NZ', href: '/seo-for-saas-nz' },
            { title: 'SaaS Marketing NZ', href: '/industries/saas-nz' },
            { title: 'Content Marketing Services NZ', href: '/services/content-marketing-nz' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to Build Your SaaS Content Engine?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            We work with a small number of NZ SaaS clients at any one time. Apply to see if we can
            help you build content that compounds into real pipeline.
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
