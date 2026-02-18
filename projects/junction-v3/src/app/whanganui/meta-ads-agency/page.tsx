import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Meta Ads Agency Whanganui | Facebook & Instagram Ads Whanganui | Junction Media',
  description: 'Meta Ads agency serving Whanganui businesses. AI-powered Facebook and Instagram advertising for the River City and Manawatū-Whanganui region. $1,500–$3,500/mo.',
  keywords: 'Meta Ads agency Whanganui, Facebook Ads Whanganui, Instagram Ads Whanganui, Facebook advertising Whanganui, paid social Whanganui, social ads Whanganui NZ',
  openGraph: {
    title: 'Meta Ads Agency Whanganui | Junction Media',
    description: 'AI-native Meta Ads for Whanganui businesses. Creative testing, audience strategy, and ROAS-focused Facebook and Instagram management.',
    url: 'https://www.junctionmedia.ai/whanganui/meta-ads-agency',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: { canonical: 'https://www.junctionmedia.ai/whanganui/meta-ads-agency' },
}

const faqs = [
  {
    q: 'Is Meta advertising effective for Whanganui businesses?',
    a: 'Yes — Facebook and Instagram are the dominant social platforms across Whanganui and the wider Manawatū-Whanganui region. For local consumer businesses, hospitality, trades, and retail, Meta Ads delivers strong ROI with the right creative and targeting strategy.',
  },
  {
    q: 'How much does Meta Ads management cost in Whanganui?',
    a: 'Meta Ads management at Junction Media ranges from $1,500–$3,500/month NZD depending on scope and ad spend. All engagements are 3-month minimum to allow proper audience optimisation.',
  },
  {
    q: 'What Whanganui businesses run Meta Ads well?',
    a: 'Hospitality, local retail, tourism operators, trades (awareness campaigns), professional services, and event businesses all benefit. Whanganui\'s strong community connection makes local Meta campaigns particularly effective for brand awareness.',
  },
  {
    q: 'How do you approach creative for Whanganui campaigns?',
    a: 'We test 5–10 creative variants weekly. Whanganui-specific visual hooks and local context make ads feel authentic rather than generic. We rapidly scale winning creative and cut what is not working.',
  },
  {
    q: 'Can you target Whanganui suburbs specifically?',
    a: 'Yes — we target Whanganui CBD, Gonville, Castlecliff, and the wider region. Radius-based targeting is useful for hospitality and service-area businesses. We combine geographic and interest-based targeting for maximum relevance.',
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
      name: 'Meta Ads Agency Whanganui',
      provider: { '@type': 'Organization', name: 'Junction Media', url: 'https://www.junctionmedia.ai' },
      serviceType: 'Meta Ads / Facebook & Instagram Advertising',
      areaServed: { '@type': 'City', name: 'Whanganui' },
      description: 'AI-native Meta Ads management for Whanganui businesses. Creative testing, audience strategy, and ROAS-focused Facebook and Instagram advertising.',
      offers: { '@type': 'Offer', priceSpecification: { '@type': 'PriceSpecification', minPrice: '1500', maxPrice: '3500', priceCurrency: 'NZD', unitText: 'month' } },
    },
    { '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.q, acceptedAnswer: { '@type': 'Answer', text: faq.a } })) },
  ],
}

export default function WhanganuiMetaAdsAgencyPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <nav className="px-6 py-5 border-b border-gray-100 flex items-center justify-between max-w-5xl mx-auto">
        <Link href="/" className="font-medium text-gray-900 hover:text-gray-600 transition-colors">Junction Media</Link>
        <Link href="/apply" className="text-sm bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors">Apply to Work With Us</Link>
      </nav>

      <section className="max-w-3xl mx-auto px-6 pt-20 pb-16">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Whanganui · Meta Ads</p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">Meta Ads Agency Whanganui</h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          AI-native Facebook and Instagram advertising for Whanganui businesses. Creative-led Meta
          campaigns that reach your ideal customers across the River City — and optimise relentlessly
          until your ROAS compounds.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/apply" className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors text-center">Apply to Work With Us</Link>
          <Link href="/services/meta-ads-nz" className="inline-block border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:border-gray-500 transition-colors text-center">View Meta Ads Services</Link>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-12 border-t border-gray-100">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[{ stat: '$1.5k–$3.5k', label: 'Management fee /month NZD' }, { stat: '5–10', label: 'Creative variants tested weekly' }, { stat: '+30%', label: 'DBH sales record (month 1)' }, { stat: '3-month', label: 'Minimum engagement' }].map((item) => (
            <div key={item.label} className="p-4 border border-gray-100 rounded-2xl text-center">
              <p className="text-2xl font-bold text-gray-900 mb-1">{item.stat}</p>
              <p className="text-xs text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Meta Ads in Whanganui: Community-Driven Reach</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">Whanganui is a tight-knit community where local businesses thrive on word of mouth and reputation. Meta Ads lets you extend that community reach digitally — putting your business in front of Whanganui residents who are already on Facebook and Instagram daily.</p>
          <p className="text-gray-600 leading-relaxed">The challenge: most Meta campaigns fail not because of the platform but because of poor creative. We run structured creative testing programmes that find what resonates specifically with the Whanganui audience — local context, local faces, local relevance.</p>
          <p className="text-gray-600 leading-relaxed">The result is Meta advertising that feels authentic to the Whanganui community — not generic agency-produced ads that look the same in every city.</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">What Our Whanganui Meta Ads Management Includes</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { title: 'Campaign Strategy', desc: 'Awareness, consideration, and conversion campaigns for the full Whanganui customer journey. Prospecting and retargeting layered correctly.' },
            { title: 'Creative Testing', desc: 'Weekly creative testing: static, video, carousel. Whanganui-specific hooks and visuals. Rapid scaling of what wins.' },
            { title: 'Audience Strategy', desc: 'Geographic targeting for Whanganui and surrounding areas, combined with interest, behaviour, and lookalike audiences.' },
            { title: 'Pixel & Conversion API', desc: 'Meta Pixel and Conversions API set up correctly from day one for accurate tracking and better algorithm performance.' },
            { title: 'Budget Optimisation', desc: 'Dynamic allocation — budget scales into what is working, not evenly distributed regardless of performance.' },
            { title: 'Weekly Reporting', desc: 'Reach, cost-per-lead, ROAS, creative winners, and what we are testing next. Plain English, revenue-connected.' },
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
          <p className="text-gray-600 leading-relaxed">Deep Blue Health hit their best revenue month ever in November 2025. Meta Ads was core to the integrated system. Result: 30% above their previous all-time record in month one.</p>
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
          <h2 className="text-3xl font-bold mb-4">Ready to scale your Whanganui business with Meta Ads?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">Apply below. We work with select Whanganui businesses serious about paid social as a real revenue channel.</p>
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
            <Link href="/services/meta-ads-nz" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Meta Ads NZ</Link>
            <Link href="/apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
