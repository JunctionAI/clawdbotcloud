import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Google Ads for SaaS Companies in NZ — PPC That Drives Demos & Signups | Junction Media',
  description: 'Google Ads management for NZ SaaS companies. Intent-driven search campaigns that capture high-value prospects at the exact moment they\'re evaluating software solutions.',
  keywords: 'google ads for saas nz, saas ppc nz, google ads saas new zealand, saas google ads agency nz, b2b google ads nz, software ppc nz',
  openGraph: {
    title: 'Google Ads for SaaS NZ | Junction Media',
    description: 'Intent-driven Google Ads for NZ SaaS companies. Capture decision-makers searching for software solutions and turn clicks into demos and trials.',
    url: 'https://www.junctionmedia.ai/google-ads-for-saas-nz',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/google-ads-for-saas-nz',
  },
}

const painPoints = [
  {
    title: 'SaaS buyers search with extreme intent — most NZ companies miss them',
    desc: 'When a business is evaluating CRM software, project management tools, or accounting platforms, they\'re actively searching comparison terms, feature queries, and competitor alternatives. These are the highest-intent moments in the buying cycle. Most NZ SaaS companies run generic awareness campaigns instead of capturing this bottom-of-funnel intent.',
  },
  {
    title: 'Long sales cycles demand different campaign architecture',
    desc: 'SaaS purchases — especially B2B — rarely convert on the first click. Decision-makers research, compare, and involve multiple stakeholders over weeks or months. Your Google Ads campaigns need remarketing layers, content offers for different funnel stages, and conversion events beyond just "booked a demo" to optimise properly.',
  },
  {
    title: 'CPCs are high in software categories — wasted spend is painful',
    desc: 'Software and SaaS keywords in NZ can run $8–$30+ per click. With small market volumes and high CPCs, every dollar of wasted spend matters more than in consumer categories. Poor match types, weak negative keyword lists, and generic landing pages are the difference between a profitable campaign and burning budget with nothing to show.',
  },
]

const approach = [
  {
    title: 'Intent-Layer Keyword Architecture',
    desc: 'We segment campaigns by buyer intent: problem-aware (e.g. "how to manage remote teams"), solution-aware (e.g. "project management software NZ"), product-aware (e.g. "Asana alternative NZ"), and competitor terms — each with tailored messaging and offers.',
  },
  {
    title: 'Demo & Trial Conversion Optimisation',
    desc: 'Landing pages built for SaaS conversion: social proof from NZ customers, clear value propositions, friction-reducing CTAs (free trial vs. book a demo vs. see a demo), and A/B testing frameworks that continuously improve conversion rates.',
  },
  {
    title: 'Multi-Touch Remarketing',
    desc: 'Sequential remarketing across Google Display and YouTube that follows prospects through their evaluation. Visitors who saw pricing get a different message than visitors who only read a blog post — each ad moving them one step closer to conversion.',
  },
  {
    title: 'Revenue-Tied Reporting',
    desc: 'We connect Google Ads to your CRM so you see pipeline and closed revenue attributed to paid search — not just leads. This enables true CAC tracking and LTV-adjusted bidding that scales your best-performing segments.',
  },
]

const results = [
  { stat: 'Bottom-funnel', label: 'Intent capture strategy' },
  { stat: 'CRM-linked', label: 'Revenue attribution' },
  { stat: '4–5', label: 'Clients at any one time' },
  { stat: '100%', label: 'NZ-based expertise' },
]

const faqs = [
  {
    q: 'What Google Ads budget do SaaS companies in NZ need to start?',
    a: 'For NZ SaaS companies, we typically recommend $2,000–$4,000/month minimum in ad spend to gather statistically meaningful data across your key keyword clusters. B2B SaaS with longer sales cycles needs enough volume to see patterns in demo-to-close rates. Management fees are additional. We\'ll give you a specific budget recommendation based on your average contract value and target CAC.',
  },
  {
    q: 'Should NZ SaaS companies target local or global keywords?',
    a: 'It depends on your product and ICP. If you serve NZ businesses specifically (e.g. NZ-specific compliance features, local integrations), NZ-targeted campaigns make sense. If your product is global, we may recommend broader geographic targeting with NZ as a priority region. We\'ll analyse search volume and CPCs across both options before making a recommendation.',
  },
  {
    q: 'How do you handle Google Ads for SaaS products with freemium models?',
    a: 'Freemium SaaS requires careful funnel tracking — free signups are not the final conversion event. We set up multi-step conversion tracking: free signup, activation milestone, trial-to-paid conversion, and optionally CRM-synced revenue. This lets us optimise for the user behaviour that actually predicts paid conversion, not just top-of-funnel volume.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Google Ads for SaaS NZ',
  provider: {
    '@type': 'Organization',
    name: 'Junction Media',
    url: 'https://www.junctionmedia.ai',
  },
  description: 'Google Ads management for NZ SaaS companies. Intent-driven search campaigns, demo conversion optimisation, and CRM-linked revenue attribution.',
  areaServed: { '@type': 'Country', name: 'New Zealand' },
}

export default function GoogleAdsForSaaSNZ() {
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
          Service + Industry · Google Ads for SaaS NZ
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Google Ads for<br />
          <span className="text-gray-500">SaaS Companies in NZ</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          SaaS buyers search Google when they&apos;re actively evaluating software — these are the
          highest-intent moments in your entire sales funnel. We build Google Ads campaigns for NZ
          SaaS companies that capture decision-makers at every stage of evaluation, from problem-aware
          searches to competitor comparison queries, and convert them into demos, trials, and paying
          customers.
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
        <h2 className="text-2xl font-bold mb-8">Why SaaS Google Ads Fail Without a Specialist Approach</h2>
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
        <h2 className="text-2xl font-bold mb-4">Our SaaS Google Ads Approach</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          SaaS Google Ads is not about generating the most clicks — it&apos;s about capturing the right
          buyer intent at the right moment and converting that intent into qualified pipeline. We build
          campaigns around your ICP, your sales cycle, and your actual revenue metrics.
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
            { title: 'SEO for SaaS NZ', href: '/seo-for-saas-nz' },
            { title: 'Content Marketing for SaaS NZ', href: '/content-marketing-for-saas-nz' },
            { title: 'Meta Ads for SaaS NZ', href: '/meta-ads-for-saas-nz' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to Capture High-Intent SaaS Buyers on Google?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            We work with a small number of NZ SaaS companies at any one time. Apply to see if we can
            help you turn Google search intent into qualified pipeline.
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
