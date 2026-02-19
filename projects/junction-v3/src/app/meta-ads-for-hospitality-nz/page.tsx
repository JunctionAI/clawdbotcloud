import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Meta Ads for Hospitality NZ — Facebook & Instagram That Fills Tables & Rooms | Junction Media',
  description: 'Specialist Meta Ads for NZ restaurants, cafes, hotels, and hospitality businesses. Drive reservations, events, and direct bookings with Facebook and Instagram campaigns built for NZ hospitality.',
  keywords: 'meta ads for hospitality nz, facebook ads restaurant nz, instagram ads cafe nz, hospitality advertising nz, restaurant marketing nz, hotel facebook ads nz, cafe marketing nz',
  openGraph: {
    title: 'Meta Ads for Hospitality NZ | Junction Media',
    description: 'Facebook and Instagram ads built for NZ restaurants, cafes, and hotels — driving reservations, events, and direct bookings.',
    url: 'https://www.junctionmedia.ai/meta-ads-for-hospitality-nz',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/meta-ads-for-hospitality-nz',
  },
}

const painPoints = [
  {
    title: 'Hospitality lives and dies on foot traffic — Meta Ads drives it',
    desc: 'A restaurant in Ponsonby, a boutique hotel in Queenstown, a cafe in Wellington\'s CBD — all depend on people deciding to show up. Meta Ads is the most powerful tool for driving that decision: reaching NZ diners and travellers at the moment they\'re planning a night out or looking for somewhere to stay.',
  },
  {
    title: 'Food and hospitality is the most visual category on Instagram — most brands underuse it',
    desc: 'Instagram and Facebook were built for hospitality content. But most NZ restaurants and cafes post inconsistently, without a strategy, and without using paid promotion to extend their reach. The hospitality brands winning on Meta combine strong organic content with paid amplification — using content that makes people hungry or excited to book.',
  },
  {
    title: 'Seasonal events and special occasions are the biggest revenue opportunities',
    desc: 'Mother\'s Day, Valentine\'s Day, NZME Restaurant Month, Rugby World Cup watch parties, Christmas functions — hospitality revenue peaks are predictable. Most NZ venues don\'t start promoting these far enough in advance, missing the planning window when people are making their decisions. Meta Ads lets you reach them at the right moment.',
  },
]

const approach = [
  {
    title: 'Reservation & Booking Campaigns',
    desc: 'Direct-response campaigns that drive table reservations, room bookings, and function enquiries. Integration with your booking system (SevenRooms, OpenTable, RMS, or your website form) so every ad is trackable to actual revenue.',
  },
  {
    title: 'Event & Seasonal Campaigns',
    desc: 'Campaign calendars built around NZ hospitality\'s biggest revenue opportunities — special occasions, food festivals, public holidays, and unique events. We plan 4–6 weeks ahead so your audience is warmed before competitors start advertising.',
  },
  {
    title: 'Local Audience Targeting',
    desc: 'Hyper-local targeting to reach your actual catchment — a 3km radius around your Auckland restaurant, or broader regional targeting for a Queenstown hotel targeting domestic and international travellers. The right audience for your specific venue type.',
  },
  {
    title: 'Creative That Makes People Hungry',
    desc: 'Food and hospitality creative is our strongest suit. Video ads, carousel menus, behind-the-scenes content, UGC-style social proof — we produce and manage creative that stops the scroll and drives the booking.',
  },
]

const results = [
  { stat: '$8–25', label: 'Cost-per-booking NZ hospitality' },
  { stat: '3–6x', label: 'Ad spend return on restaurant campaigns' },
  { stat: '100%', label: 'NZ hospitality market expertise' },
  { stat: '48hrs', label: 'Typical campaign launch time' },
]

const faqs = [
  {
    q: 'Do Meta Ads work for small cafes and restaurants, or just big venues?',
    a: 'Meta Ads work exceptionally well for small venues — sometimes better than for large ones. A cafe in Grey Lynn or Wellington\'s Cuba Street can target a 2km radius with a $500/month budget and drive meaningful foot traffic. The local, visual nature of hospitality content performs well at small scale. You don\'t need a big budget to see results.',
  },
  {
    q: 'How do we measure whether Meta Ads are actually driving bookings?',
    a: 'We set up conversion tracking linked to your booking system or reservation form so we can attribute actual bookings to specific campaigns. For venues without online booking, we use unique offer codes or call tracking to attribute ad-driven visits. You\'ll know your cost-per-booking from week one.',
  },
  {
    q: 'What about promoting events versus driving regular traffic?',
    a: 'Both require different strategies. Events need a build-up campaign — awareness 4–6 weeks out, urgency as seats fill, final push 48–72 hours before. Regular traffic campaigns are always-on with audience refresh and creative rotation to avoid fatigue. We run both simultaneously for most NZ hospitality clients.',
  },
]

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Junction Media',
    url: 'https://www.junctionmedia.ai',
    description: 'Meta Ads agency specialising in hospitality businesses across New Zealand.',
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
      { '@type': 'ListItem', position: 2, name: 'Meta Ads for Hospitality NZ', item: 'https://www.junctionmedia.ai/meta-ads-for-hospitality-nz' },
    ],
  },
]

export default function MetaAdsForHospitalityNZ() {
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
          Service + Industry · Meta Ads for Hospitality NZ
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Meta Ads for<br />
          <span className="text-gray-500">Hospitality NZ</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          NZ restaurants, cafes, and hotels that show up consistently on Facebook and Instagram win
          the booking decisions of Auckland, Wellington, and Christchurch diners and travellers. We
          run Meta Ads campaigns for NZ hospitality businesses that drive actual reservations, fill
          event nights, and build the visual brand that makes people choose you over the next option.
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
        <h2 className="text-2xl font-bold mb-8">Why Meta Ads Are the Most Effective Paid Channel for NZ Hospitality</h2>
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
        <h2 className="text-2xl font-bold mb-4">Our Hospitality Meta Ads Approach</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Hospitality Meta Ads require creative that makes people feel something — hungry, excited,
          like they&apos;re missing out. We combine that creative quality with the targeting precision
          and conversion tracking that makes every dollar of your ad budget accountable.
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
            { title: 'Meta Ads for Hospitality NZ — Full Guide', href: '/blog/meta-ads-for-hospitality-nz' },
            { title: 'Hospitality Marketing Overview', href: '/industries/hospitality-nz' },
            { title: 'Social Media for Hospitality NZ', href: '/social-media-for-hospitality-nz' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to fill more tables and rooms with Meta Ads?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            We work with a small number of NZ hospitality clients at any one time. Apply to find
            out if we&apos;re a fit.
          </p>
          <Link href="/apply" className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg">
            Apply to Work With Us
          </Link>
          <p className="text-gray-400 text-sm mt-4">NZ restaurants, cafes, and hotels only.</p>
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
