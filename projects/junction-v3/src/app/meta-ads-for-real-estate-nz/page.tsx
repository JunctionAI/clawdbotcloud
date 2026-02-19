import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Meta Ads for Real Estate NZ — Facebook & Instagram Lead Generation | Junction Media',
  description: 'Specialist Meta Ads management for NZ real estate agencies and agents. Generate qualified buyer and seller leads on Facebook & Instagram — without wasting budget on tyre-kickers.',
  keywords: 'meta ads for real estate nz, facebook ads real estate nz, instagram ads real estate nz, real estate lead generation nz, property ads nz, facebook real estate agency nz',
  openGraph: {
    title: 'Meta Ads for Real Estate NZ | Junction Media',
    description: 'Generate qualified buyer and seller leads with Meta Ads built specifically for NZ real estate agencies and agents.',
    url: 'https://www.junctionmedia.ai/meta-ads-for-real-estate-nz',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/meta-ads-for-real-estate-nz',
  },
}

const painPoints = [
  {
    title: 'Most real estate Meta Ads generate leads, not listings',
    desc: 'Running a Facebook "interested in selling?" campaign is easy. Running one that generates motivated sellers with realistic price expectations in your target suburbs — in Auckland, Wellington, or Christchurch — is a different skill entirely. Most agents are burning budget on volume rather than quality.',
  },
  {
    title: 'The NZ property market requires hyper-local targeting',
    desc: 'What works for Remuera won\'t work for Papakura. What works for Thorndon won\'t work for Lower Hutt. Meta Ads for NZ real estate must be built suburb-by-suburb with localised creative, messaging that reflects actual market conditions, and audience logic that filters out renters and window shoppers.',
  },
  {
    title: 'Generic creative destroys trust in a trust-based industry',
    desc: 'Real estate is built on relationships. Generic stock-photo ad creative signals to prospects that you\'re another faceless agency. The agents winning on Meta in 2026 are running video content, suburb-specific testimonials, and social proof that builds personal brand — not just property listings.',
  },
]

const approach = [
  {
    title: 'Seller Lead Campaigns',
    desc: 'We build appraisal request funnels that attract motivated vendors, not tyre-kickers. Custom landing pages, multi-step lead forms, and follow-up sequences that qualify intent before your team picks up the phone.',
  },
  {
    title: 'Buyer Lead Campaigns',
    desc: 'Target first-home buyers, investors, and upsizers in specific suburbs across Auckland, Wellington, and Christchurch. Retargeting campaigns that keep your listings front-of-mind across the NZ property search cycle.',
  },
  {
    title: 'Agent Personal Brand',
    desc: 'Video content ads and reels that position individual agents as the trusted local expert. In a market where vendor selection is personal, we build the brand that makes the phone ring.',
  },
  {
    title: 'Campaign Measurement & CPA Tracking',
    desc: 'Cost-per-appraisal and cost-per-qualified-lead tracking so you know exactly what Meta Ads is delivering. We optimise toward outcomes — listings won, not leads generated.',
  },
]

const results = [
  { stat: '$18–45', label: 'Typical cost-per-lead in NZ real estate' },
  { stat: '3–6x', label: 'Improvement on unmanaged ad accounts' },
  { stat: '100%', label: 'NZ property market expertise' },
  { stat: '2 weeks', label: 'To first optimised campaign live' },
]

const faqs = [
  {
    q: 'Can Meta Ads work for smaller real estate agencies outside Auckland?',
    a: 'Yes — Meta Ads can be highly effective for regional agencies in Tauranga, Hamilton, Dunedin, and beyond. The lower competition in regional markets often means cheaper leads and less noise. The key is hyper-local creative and messaging that speaks to the specific community.',
  },
  {
    q: 'How much budget do I need for Meta Ads in NZ real estate?',
    a: 'We typically recommend a minimum of $1,500–$2,000/month in media spend to generate meaningful data and leads. At that level, you\'re looking at 30–80 leads per month depending on targeting and campaign type. Most agencies see positive ROI within the first listing won.',
  },
  {
    q: 'Do you work with individual agents or whole agencies?',
    a: 'Both. We work with individual top-performing agents building personal brands, and with agencies running territory-wide lead generation across Auckland, Wellington, Christchurch, and other NZ markets.',
  },
]

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Junction Media',
    url: 'https://www.junctionmedia.ai',
    description: 'Meta Ads agency specialising in real estate lead generation across New Zealand.',
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
      { '@type': 'ListItem', position: 2, name: 'Meta Ads for Real Estate NZ', item: 'https://www.junctionmedia.ai/meta-ads-for-real-estate-nz' },
    ],
  },
]

export default function MetaAdsForRealEstateNZ() {
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
          Service + Industry · Meta Ads for Real Estate NZ
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Meta Ads for<br />
          <span className="text-gray-500">Real Estate NZ</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          Facebook and Instagram are where NZ property buyers and sellers spend their time. We run
          Meta Ads campaigns built specifically for the NZ property market — generating qualified
          appraisal requests, buyer enquiries, and listings for agencies across Auckland, Wellington,
          Christchurch, and beyond.
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
        <h2 className="text-2xl font-bold mb-8">Why Most Real Estate Meta Ads Underperform in NZ</h2>
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
        <h2 className="text-2xl font-bold mb-4">Our Real Estate Meta Ads Approach</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          We build Meta Ads systems for NZ real estate that generate predictable lead flow — not
          vanity metrics. Every campaign is built around measurable outcomes: appraisal requests,
          buyer enquiries, and ultimately listings won.
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
            { title: 'Meta Ads for Real Estate NZ — Full Guide', href: '/blog/meta-ads-for-real-estate-nz' },
            { title: 'Real Estate Marketing Overview', href: '/industries/real-estate-nz' },
            { title: 'Google Ads for Real Estate NZ', href: '/google-ads-for-real-estate-nz' },
            { title: 'Meta Ads Services NZ', href: '/services/meta-ads-nz' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to generate more listings with Meta Ads?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            We work with a small number of NZ real estate clients at any one time. Apply to find
            out if we&apos;re a fit.
          </p>
          <Link href="/apply" className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg">
            Apply to Work With Us
          </Link>
          <p className="text-gray-400 text-sm mt-4">NZ real estate agencies and agents only.</p>
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
