import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'SEO for Hospitality Businesses in NZ — Restaurants, Hotels & Tourism | Junction Media',
  description: 'SEO for NZ hospitality businesses. Local SEO, Google Maps optimisation, and content strategies that fill tables, book rooms, and attract guests year-round.',
  keywords: 'seo for hospitality nz, restaurant seo nz, hotel seo nz, tourism seo nz, local seo hospitality nz, google maps restaurant nz, hospitality digital marketing nz',
  openGraph: {
    title: 'SEO for Hospitality NZ | Junction Media',
    description: 'SEO for NZ restaurants, hotels, and tourism operators. Local search dominance that fills tables and books rooms year-round.',
    url: 'https://www.junctionmedia.ai/seo-for-hospitality-nz',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/seo-for-hospitality-nz',
  },
}

const painPoints = [
  {
    title: 'Google Maps and local pack rankings determine where hungry diners go',
    desc: 'When someone searches "restaurants near me" or "best pizza Queenstown", the Google Maps local pack appears above all organic results. Hospitality businesses not appearing in the local pack for their key searches are invisible to the most commercially ready searchers. Most NZ venues have unclaimed, incomplete, or poorly managed Google Business Profiles that limit their local visibility.',
  },
  {
    title: 'Seasonal search patterns require proactive content strategy',
    desc: 'NZ hospitality businesses face significant seasonal demand variation — summer tourism, school holiday peaks, event-driven surges, and quiet periods in between. Your SEO strategy needs to anticipate these patterns, building content and backlinks before peak seasons, and leveraging slow periods for local market share. Reactive SEO is always three months behind where it needs to be.',
  },
  {
    title: 'Review signals heavily influence both rankings and booking decisions',
    desc: 'Google Business Profile review quantity and quality directly affect local pack rankings. And for hospitality, reviews are also the primary decision-making tool for potential guests — a 4.2 vs 4.7 average rating in the same price bracket can mean the difference between a full house and empty seats on a Saturday night. Most venues have no systematic approach to review generation.',
  },
]

const approach = [
  {
    title: 'Google Business Profile Dominance',
    desc: 'Complete optimisation of your Google Business Profile — accurate categories, service areas, hours, attributes, photo optimisation, Q&A management, and a systematic review response strategy. We also optimise for Google\'s "justifications" that appear in local pack listings.',
  },
  {
    title: 'Local Search Content',
    desc: 'Content that captures local discovery searches: neighbourhood guides, event round-ups, cuisine-type guides, and experience-focused content that attracts both tourists searching "things to do in [city]" and locals looking for specific experiences.',
  },
  {
    title: 'Seasonal SEO Planning',
    desc: 'A 12-month content and link-building calendar aligned with NZ hospitality seasonality — building rankings before peak periods, targeting holiday-specific searches, and maximising organic visibility during the windows when spending on paid ads makes least sense.',
  },
  {
    title: 'Review & Reputation Management',
    desc: 'Systematic review generation through post-visit follow-up, QR code table cards, and staff training. Response templates that demonstrate professionalism. Monitoring across Google, TripAdvisor, and booking platforms. Review velocity management that continuously improves your average rating.',
  },
]

const results = [
  { stat: 'Local pack', label: 'Google Maps dominance' },
  { stat: 'Seasonal', label: 'Peak-period planning' },
  { stat: '4–5', label: 'Clients at any one time' },
  { stat: '100%', label: 'NZ-based expertise' },
]

const faqs = [
  {
    q: 'How long does SEO take to work for NZ hospitality businesses?',
    a: 'Google Business Profile optimisation can show results within weeks — improved local pack rankings often appear within 4–8 weeks of a complete profile overhaul. Organic content rankings take 3–6 months for new content to establish authority. Link-building results compound over 6–12 months. We focus early efforts on GBP because that\'s where you\'ll see the fastest commercial impact for most hospitality businesses.',
  },
  {
    q: 'Should hospitality businesses focus on SEO or paid ads?',
    a: 'Both serve different purposes. SEO builds long-term organic visibility that compounds over time and doesn\'t stop when you stop paying. Paid ads (Google Ads, Meta) are better for event promotions, new openings, and seasonal peaks where you need immediate visibility. Most NZ hospitality businesses benefit from a base of good SEO supplemented by tactical paid campaigns around key periods.',
  },
  {
    q: 'How do you handle SEO for hospitality businesses with multiple locations in NZ?',
    a: 'Multi-location hospitality SEO requires separate Google Business Profiles for each location, location-specific landing pages on your website, and a local citation strategy that builds separate authority for each venue. We manage this systematically with clear reporting by location so you know which venues are performing and which need attention.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'SEO for Hospitality NZ',
  provider: {
    '@type': 'Organization',
    name: 'Junction Media',
    url: 'https://www.junctionmedia.ai',
  },
  description: 'SEO for NZ hospitality businesses. Local SEO, Google Maps optimisation, review management, and seasonal content strategy.',
  areaServed: { '@type': 'Country', name: 'New Zealand' },
}

export default function SEOForHospitalityNZ() {
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
          Service + Industry · SEO for Hospitality NZ
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          SEO for<br />
          <span className="text-gray-500">Hospitality Businesses in NZ</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          NZ diners, travellers, and tourists search Google before they walk through your door.
          Restaurants, hotels, cafes, and tourism operators that rank at the top of local search
          fill their tables and book their rooms from organic traffic — without paying per click.
          We build the local SEO systems that put NZ hospitality businesses at the top of the
          searches that matter most.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/apply" className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors text-center">
            Apply to Work With Us
          </Link>
          <Link href="/industries/hospitality-nz" className="inline-block border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:border-gray-500 transition-colors text-center">
            Hospitality Marketing Overview
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
        <h2 className="text-2xl font-bold mb-8">Why Hospitality SEO Requires a Dedicated Strategy</h2>
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
        <h2 className="text-2xl font-bold mb-4">Our Hospitality SEO Approach</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Hospitality SEO is primarily a local game. The fundamentals are your Google Business
          Profile, your review velocity, and your ability to appear for high-intent local searches.
          We get the foundations right first, then build the content layer that drives organic
          discovery at scale.
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
            { title: 'Social Media for Hospitality NZ', href: '/social-media-for-hospitality-nz' },
            { title: 'Meta Ads for Hospitality NZ', href: '/meta-ads-for-hospitality-nz' },
            { title: 'Hospitality Marketing Overview', href: '/industries/hospitality-nz' },
            { title: 'SEO for Retail NZ', href: '/seo-for-retail-nz' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to Fill Your Venue from Organic Search?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            We work with a small number of NZ hospitality businesses at any one time. Apply to see
            if we can help you dominate local search in your area.
          </p>
          <Link href="/apply" className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg">
            Apply to Work With Us
          </Link>
          <p className="text-gray-400 text-sm mt-4">NZ hospitality businesses only.</p>
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
