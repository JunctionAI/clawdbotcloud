import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Social Media Agency Whanganui | Social Media Marketing Whanganui | Junction Media',
  description: 'Social media agency serving Whanganui businesses. AI-driven content, Meta Ads, and social strategy for the River City and Manawatū-Whanganui region. Strategy-led, not post-and-hope.',
  keywords: 'social media agency Whanganui, social media marketing Whanganui, social media management Whanganui, Facebook marketing Whanganui, Instagram marketing Whanganui, Meta Ads Whanganui NZ',
  openGraph: {
    title: 'Social Media Agency Whanganui | Junction Media',
    description: 'AI-driven social media marketing for Whanganui businesses. Strategy, content, Meta Ads, and reporting that connects to revenue.',
    url: 'https://www.junctionmedia.ai/whanganui/social-media-agency',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: { canonical: 'https://www.junctionmedia.ai/whanganui/social-media-agency' },
}

const faqs = [
  {
    q: 'How much does social media management cost in Whanganui?',
    a: 'Social media management at Junction Media typically sits in the $1,500–$3,000/month range for Whanganui businesses, covering content production, Meta Ads management, and reporting.',
  },
  {
    q: 'Which platforms should Whanganui businesses prioritise?',
    a: 'Facebook remains the dominant social platform across regional NZ markets including Whanganui, with Instagram growing for lifestyle and hospitality categories. We recommend starting with 1–2 platforms done well rather than spreading thin across five.',
  },
  {
    q: 'Is organic social still worth it for Whanganui businesses?',
    a: 'Organic social builds brand credibility and community trust in Whanganui — valuable for businesses where reputation matters. But organic reach has declined substantially. For most businesses, organic content supports paid social rather than driving acquisition independently.',
  },
  {
    q: 'Do you run Meta Ads for Whanganui businesses?',
    a: 'Yes — Meta Ads is core to our Whanganui social media work. We build structured campaign funnels, test creative weekly, and optimise for real business outcomes — leads, bookings, or sales.',
  },
  {
    q: 'What results can Whanganui businesses expect?',
    a: 'For paid social, Whanganui clients typically see cost-per-lead improve meaningfully after 60–90 days of optimisation. Organic social builds brand trust and social proof over the same period. Results depend on category, budget, and starting point.',
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
      name: 'Social Media Agency Whanganui',
      provider: { '@type': 'Organization', name: 'Junction Media', url: 'https://www.junctionmedia.ai' },
      serviceType: 'Social Media Marketing',
      areaServed: { '@type': 'City', name: 'Whanganui' },
      description: 'AI-driven social media marketing for Whanganui businesses. Strategy, content, Meta Ads, and reporting connected to revenue.',
      offers: { '@type': 'Offer', priceSpecification: { '@type': 'PriceSpecification', minPrice: '1500', maxPrice: '3000', priceCurrency: 'NZD', unitText: 'month' } },
    },
    { '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.q, acceptedAnswer: { '@type': 'Answer', text: faq.a } })) },
  ],
}

export default function WhanganuiSocialMediaAgencyPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <nav className="px-6 py-5 border-b border-gray-100 flex items-center justify-between max-w-5xl mx-auto">
        <Link href="/" className="font-medium text-gray-900 hover:text-gray-600 transition-colors">Junction Media</Link>
        <Link href="/apply" className="text-sm bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors">Apply to Work With Us</Link>
      </nav>

      <section className="max-w-3xl mx-auto px-6 pt-20 pb-16">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Whanganui · Social Media</p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">Social Media Agency Whanganui</h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          AI-driven social media marketing for Whanganui businesses. Strategy, content, Meta Ads,
          and reporting that connects to revenue — not just follower counts.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/apply" className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors text-center">Apply to Work With Us</Link>
          <Link href="/services/social-media-nz" className="inline-block border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:border-gray-500 transition-colors text-center">View Social Media Services</Link>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-12 border-t border-gray-100">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[{ stat: '$1.5k–$3k', label: 'Per month NZD' }, { stat: 'Meta', label: 'Primary paid platform' }, { stat: '+30%', label: 'DBH sales record (month 1)' }, { stat: '3-month', label: 'Minimum engagement' }].map((item) => (
            <div key={item.label} className="p-4 border border-gray-100 rounded-2xl text-center">
              <p className="text-2xl font-bold text-gray-900 mb-1">{item.stat}</p>
              <p className="text-xs text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Social Media in Whanganui: Community First</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">Whanganui is a community-oriented city where local business reputation matters. Social media is the digital extension of that community — and for Whanganui businesses, showing up authentically on Facebook and Instagram is increasingly how new customers find and evaluate you.</p>
          <p className="text-gray-600 leading-relaxed">The challenge is converting social presence into real business outcomes. A great-looking Instagram page with no paid amplification rarely drives leads. We build strategies that combine organic credibility with paid social performance — Meta Ads that drive measurable results.</p>
          <p className="text-gray-600 leading-relaxed">Everything we build connects back to your business outcomes: leads, bookings, or sales — not just reach and impressions.</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">What Our Whanganui Social Media Work Includes</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { title: 'Social Media Strategy', desc: 'Platform selection, content pillars, and campaign calendar built around your Whanganui business goals.' },
            { title: 'Content Creation', desc: 'AI-assisted content: graphics, copy, short-form video. Local visual storytelling that resonates with the Whanganui community.' },
            { title: 'Meta Ads Management', desc: 'Facebook and Instagram paid campaigns with Whanganui audience targeting, creative testing, and conversion tracking.' },
            { title: 'Community Management', desc: 'Comment moderation, DM responses, and community engagement — active social presence without eating your time.' },
            { title: 'Analytics & Reporting', desc: 'Monthly reports: reach, engagement, paid performance, and what is driving website traffic and leads.' },
            { title: 'Competitor Analysis', desc: 'Ongoing monitoring of Whanganui competitors and leading NZ brands. We find gaps and exploit them.' },
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
          <p className="text-gray-600 leading-relaxed">Deep Blue Health hit their best revenue month ever in November 2025. Social and Meta Ads were core components of the integrated system we built across paid social, Google Ads, SEO, and content.</p>
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
          <h2 className="text-3xl font-bold mb-4">Ready to build a Whanganui social presence that actually grows your business?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">Apply below. We work with businesses serious about social media as a real revenue channel.</p>
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
            <Link href="/services/social-media-nz" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Social Media NZ</Link>
            <Link href="/apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
