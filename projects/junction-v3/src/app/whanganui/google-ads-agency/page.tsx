import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Google Ads Agency Whanganui | PPC Whanganui | Junction Media',
  description: 'Google Ads agency serving Whanganui businesses. AI-optimised PPC campaigns for the River City and surrounding Manawatū-Whanganui region. Management from $1,500/mo.',
  keywords: 'Google Ads agency Whanganui, PPC Whanganui, Google Ads Whanganui, Google Ads management Whanganui, paid search Whanganui, PPC agency Whanganui, Google Ads consultant Whanganui NZ',
  openGraph: {
    title: 'Google Ads Agency Whanganui | Junction Media',
    description: 'AI-optimised Google Ads management for Whanganui businesses. Capture high-intent local search traffic across the River City.',
    url: 'https://www.junctionmedia.ai/whanganui/google-ads-agency',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: { canonical: 'https://www.junctionmedia.ai/whanganui/google-ads-agency' },
}

const faqs = [
  {
    q: 'How much does Google Ads management cost in Whanganui?',
    a: 'Google Ads management at Junction Media starts at $1,500/month NZD. In Whanganui\'s market, we recommend a minimum ad spend of $1,000–$2,500/month alongside management fees.',
  },
  {
    q: 'How quickly does Google Ads work for Whanganui businesses?',
    a: 'Traffic from day one. Meaningful ROAS typically emerges in weeks 4–8 as we refine keyword lists, negative keywords, and ad copy. By month 2–3 a well-managed account returns measurable results.',
  },
  {
    q: 'What Whanganui businesses suit Google Ads best?',
    a: 'Trade services (plumbers, electricians, builders, roofers), professional services, healthcare, manufacturing suppliers, and tourism operations all benefit strongly when people search for what you offer in Whanganui.',
  },
  {
    q: 'Can you target Whanganui-specific areas?',
    a: 'Yes — we use granular location targeting covering Whanganui CBD, Gonville, Castlecliff, Aramoho, Springvale, and the wider Manawatū-Whanganui region. Service-area businesses benefit from radius targeting.',
  },
  {
    q: 'What is included in Whanganui Google Ads management?',
    a: 'Account audit or build, keyword research, ad copy creation, bid management, negative keyword management, conversion tracking, landing page recommendations, and weekly plain-English reporting.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      name: 'Junction Media',
      url: 'https://www.junctionmedia.ai',
      address: { '@type': 'PostalAddress', addressLocality: 'Auckland', addressRegion: 'Auckland', addressCountry: 'NZ' },
      areaServed: [{ '@type': 'City', name: 'Whanganui' }, { '@type': 'City', name: 'Auckland' }],
      priceRange: '$$$',
    },
    {
      '@type': 'Service',
      name: 'Google Ads Agency Whanganui',
      provider: { '@type': 'Organization', name: 'Junction Media', url: 'https://www.junctionmedia.ai' },
      serviceType: 'Google Ads Management / PPC',
      areaServed: { '@type': 'City', name: 'Whanganui' },
      description: 'AI-optimised Google Ads management for Whanganui businesses. Continuous campaign optimisation and transparent reporting.',
      offers: { '@type': 'Offer', priceSpecification: { '@type': 'PriceSpecification', minPrice: '1500', maxPrice: '3500', priceCurrency: 'NZD', unitText: 'month' } },
    },
    { '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.q, acceptedAnswer: { '@type': 'Answer', text: faq.a } })) },
  ],
}

export default function WhanganuiGoogleAdsAgencyPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <nav className="px-6 py-5 border-b border-gray-100 flex items-center justify-between max-w-5xl mx-auto">
        <Link href="/" className="font-medium text-gray-900 hover:text-gray-600 transition-colors">Junction Media</Link>
        <Link href="/apply" className="text-sm bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors">Apply to Work With Us</Link>
      </nav>

      <section className="max-w-3xl mx-auto px-6 pt-20 pb-16">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Whanganui · Google Ads</p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">Google Ads Agency Whanganui</h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          AI-optimised Google Ads for Whanganui businesses. We capture high-intent local search traffic
          across the River City and continuously optimise to lower your cost-per-lead while
          increasing conversion volume.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/apply" className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors text-center">Apply to Work With Us</Link>
          <Link href="/services/google-ads-nz" className="inline-block border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:border-gray-500 transition-colors text-center">View Google Ads Services</Link>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-12 border-t border-gray-100">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[{ stat: '$1.5k–$3.5k', label: 'Management fee /month NZD' }, { stat: 'Week 1', label: 'Campaigns live' }, { stat: '+30%', label: 'DBH sales record (month 1)' }, { stat: 'Weekly', label: 'Optimisation cadence' }].map((item) => (
            <div key={item.label} className="p-4 border border-gray-100 rounded-2xl text-center">
              <p className="text-2xl font-bold text-gray-900 mb-1">{item.stat}</p>
              <p className="text-xs text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Why Whanganui PPC Needs Active Management</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">Whanganui&apos;s Google Ads market is compact but competitive within key categories. Trade services, professional services, and manufacturing suppliers compete for a focused local audience — meaning every wasted click is proportionally more costly than in a larger city.</p>
          <p className="text-gray-600 leading-relaxed">Most Whanganui Google Ads accounts we audit share common problems: broad match keywords bleeding budget, poor Quality Scores inflating CPCs, and no conversion tracking tied to real leads or revenue.</p>
          <p className="text-gray-600 leading-relaxed">We build accounts from first principles or fix existing ones — with weekly optimisation that compounds over time. Every dollar of Whanganui ad spend should work harder each month.</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">What Our Whanganui Google Ads Management Includes</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { title: 'Account Audit or Build', desc: 'Forensic audit of your existing account or clean-slate build. Wasted spend identified, structure optimised before scaling.' },
            { title: 'Whanganui Keyword Strategy', desc: 'Keyword research mapped to Whanganui search intent — including local commercial queries your competitors have missed.' },
            { title: 'Ad Copy & Extensions', desc: 'AI-assisted ad copy testing with Whanganui-specific messaging. Sitelinks, callouts, and call extensions maximise click-through.' },
            { title: 'Conversion Tracking', desc: 'GA4 + Google Ads conversion tracking from day one. Phone calls, form fills, purchases — all tied back to campaign and keyword.' },
            { title: 'Weekly Optimisation', desc: 'Bid adjustments, search term analysis, negative keyword expansion — every week, not once a quarter.' },
            { title: 'Weekly Reports', desc: 'Clicks, costs, conversions, ROAS, what changed, what is next. Revenue-connected reporting.' },
          ].map((item) => (
            <div key={item.title} className="p-6 border border-gray-100 rounded-2xl">
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">A Result Worth Mentioning</h2>
        <div className="bg-gray-50 rounded-2xl p-8">
          <p className="text-3xl font-bold text-gray-900 mb-2">+30%</p>
          <p className="text-gray-500 text-sm mb-4">Above previous all-time store record — month 1</p>
          <p className="text-gray-600 leading-relaxed">Deep Blue Health hit their best revenue month ever in November 2025. Google Ads was central to the integrated system we built. Result: 30% above their previous all-time record.</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Whanganui Areas We Target</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {['Whanganui CBD', 'Gonville', 'Castlecliff', 'Aramoho', 'Springvale', 'Fordell / Surrounds'].map((area) => (
            <div key={area} className="p-3 border border-gray-100 rounded-xl text-sm text-gray-700 text-center">{area}</div>
          ))}
        </div>
      </section>

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

      <section className="max-w-3xl mx-auto px-6 py-20 border-t border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to make your Whanganui ad spend work harder?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">Apply below. We review every application and work with select Whanganui businesses ready to invest in Google Ads.</p>
          <Link href="/apply" className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg">Apply to Work With Us</Link>
          <p className="text-gray-400 text-sm mt-4">Limited client spots. NZ businesses only.</p>
        </div>
      </section>

      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2026 Junction Media. Auckland, New Zealand.</p>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Home</Link>
            <Link href="/whanganui" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Whanganui</Link>
            <Link href="/services/google-ads-nz" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Google Ads NZ</Link>
            <Link href="/apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
