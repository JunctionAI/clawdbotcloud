import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Meta Ads for Ecommerce NZ — Facebook & Instagram Ads That Convert | Junction Media',
  description: 'Meta Ads (Facebook & Instagram) for NZ ecommerce stores. Creative-led campaigns, dynamic product ads, and retargeting that drives profitable sales for NZ online stores.',
  keywords: 'meta ads for ecommerce nz, facebook ads ecommerce nz, instagram ads ecommerce nz, meta ads nz ecommerce, facebook shopping nz, retargeting nz ecommerce',
  openGraph: {
    title: 'Meta Ads for Ecommerce NZ | Junction Media',
    description: 'Creative-led Meta Ads for NZ ecommerce. Facebook & Instagram campaigns with dynamic product ads, sharp retargeting, and first-party data strategy that scales.',
    url: 'https://www.junctionmedia.ai/meta-ads-for-ecommerce-nz',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/meta-ads-for-ecommerce-nz',
  },
}

const painPoints = [
  {
    title: 'Meta Ads creative fatigue kills performance — most NZ stores don\'t refresh fast enough',
    desc: 'Meta\'s algorithm needs fresh creative to keep CPMs low and CTRs high. An ad that worked brilliantly in week one becomes invisible by week four. Most NZ ecommerce stores run the same 3–4 creatives for months, then wonder why their ROAS has collapsed. Sustainable Meta Ads performance requires a creative testing system, not a set-and-forget campaign.',
  },
  {
    title: 'iOS privacy changes broke most NZ ecommerce retargeting',
    desc: 'Post-iOS 14, pixel-based retargeting audiences shrank dramatically. The NZ ecommerce brands that are still running profitable Meta Ads have adapted: first-party data from email lists, server-side conversions via CAPI, and broader audience strategies that let Meta\'s algorithm find buyers rather than relying on pixel precision.',
  },
  {
    title: 'Prospecting and retargeting need different creative — most stores run the same ads for both',
    desc: 'A cold audience discovering your brand for the first time needs different messaging than a warm audience who added to cart last week. Running the same product-focused ads to both audiences wastes budget and burns out warm prospects who need more touchpoints before converting.',
  },
]

const approach = [
  {
    title: 'Creative Testing System',
    desc: 'We build a continuous creative testing framework — new ad concepts weekly, statistically valid testing methodology, and a clear creative kill/scale decision process. AI-assisted production means we can test at a volume most agencies can\'t match.',
  },
  {
    title: 'First-Party Data Strategy',
    desc: 'Your customer list, email subscribers, and post-purchase data are your most valuable Meta audience assets. We build custom and lookalike audiences from your first-party data, implement CAPI for accurate server-side conversion tracking, and structure campaigns to use this data advantage.',
  },
  {
    title: 'Dynamic Product Ads (DPA)',
    desc: 'Properly structured catalogue campaigns that serve the right product to the right person based on their browse and purchase behaviour. For NZ ecommerce stores with 50+ SKUs, DPA is often the most efficient channel in the Meta account.',
  },
  {
    title: 'Funnel-Specific Creative Strategy',
    desc: 'Cold prospecting ads that build brand and generate first-session purchases. Warm retargeting ads that overcome objections and drive add-to-carts. Cart abandonment ads that close the sale. Three different jobs, three different creative approaches.',
  },
]

const results = [
  { stat: '+30%', label: 'Above store record (Deep Blue Health, Nov 2025)' },
  { stat: '4–5', label: 'Clients at any one time — your account gets real focus' },
  { stat: 'Weekly', label: 'New creative tests live' },
  { stat: '100%', label: 'NZ-based, NZ-market knowledge' },
]

const faqs = [
  {
    q: 'How much should a NZ ecommerce store spend on Meta Ads?',
    a: 'A meaningful NZ Meta Ads budget for ecommerce starts at $3,000–$5,000/month in media spend. Below that, you don\'t have enough data for the algorithm to learn effectively, and the creative testing needed to find winning ads is constrained. Management fees are separate. We\'ll give you a specific recommendation based on your product category and margin structure.',
  },
  {
    q: 'Does Meta Ads still work post-iOS 14?',
    a: 'Yes — but the strategy has changed. Broad audiences, strong creative, and first-party data are now more important than pixel-precision targeting. NZ stores that adapted their Meta strategy post-iOS are still driving profitable results. Those that haven\'t are seeing declining ROAS from campaigns built on outdated assumptions.',
  },
  {
    q: 'Can you work with our existing creative/photo assets?',
    a: 'Yes. We work with whatever you have and develop a strategy around it — then identify the gaps and recommend creative production investment based on what\'s likely to have the highest testing value. We partner with NZ creative producers for photo and video when needed.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Meta Ads for Ecommerce NZ',
  provider: {
    '@type': 'Organization',
    name: 'Junction Media',
    url: 'https://www.junctionmedia.ai',
  },
  description: 'Meta Ads management for NZ ecommerce stores. Creative testing systems, first-party data strategy, dynamic product ads, and full-funnel campaign architecture.',
  areaServed: { '@type': 'Country', name: 'New Zealand' },
}

export default function MetaAdsForEcommerceNZ() {
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
          Service + Industry · Meta Ads for Ecommerce NZ
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Meta Ads for<br />
          <span className="text-gray-500">Ecommerce NZ</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          Facebook and Instagram ads for NZ ecommerce stores built on a creative testing system,
          first-party data strategy, and full-funnel campaign architecture. Not the same four ads
          running indefinitely — a live system that continuously finds what works and scales it
          before creative fatigue kills your ROAS.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/apply" className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors text-center">
            Apply to Work With Us
          </Link>
          <Link href="/industries/ecommerce-nz" className="inline-block border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:border-gray-500 transition-colors text-center">
            Ecommerce Marketing Overview
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
        <h2 className="text-2xl font-bold mb-8">Why Meta Ads for NZ Ecommerce Fail Without the Right Approach</h2>
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
        <h2 className="text-2xl font-bold mb-4">Our Meta Ads Approach for NZ Ecommerce</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          We treat Meta Ads as a creative and data problem, not a targeting problem. The brands
          winning on Meta in 2026 are winning on creative quality, creative velocity, and first-party
          data utilisation — not audience precision. We build the system that produces all three.
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
            A rebuilt Meta Ads creative strategy — new ad formats, seasonal messaging, and DPA
            campaigns targeting past purchasers with complementary products — was a central
            driver of that result.
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
            { title: 'Meta Ads for Ecommerce NZ — Full Guide', href: '/blog/meta-ads-ecommerce-nz' },
            { title: 'Google Ads for Ecommerce NZ', href: '/google-ads-for-ecommerce-nz' },
            { title: 'SEO for Ecommerce NZ', href: '/seo-for-ecommerce-nz' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to Scale Your Ecommerce Store with Meta?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            We work with a small number of NZ ecommerce clients at any one time. Apply to see if
            we can help you build the Meta Ads system that drives profitable growth.
          </p>
          <Link href="/apply" className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg">
            Apply to Work With Us
          </Link>
          <p className="text-gray-400 text-sm mt-4">NZ ecommerce businesses only.</p>
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
