import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Social Media Agency for Hospitality NZ — Fill Tables & Drive Bookings | Junction Media',
  description: 'Social media marketing for NZ restaurants, hotels, cafés, and tourism businesses. Content that drives real bookings, not just likes. AI-powered, NZ-market focused.',
  keywords: 'social media agency hospitality nz, social media for restaurants nz, hospitality social media nz, restaurant social media nz, cafe social media nz, tourism social media nz',
  openGraph: {
    title: 'Social Media Agency for Hospitality NZ | Junction Media',
    description: 'Social media that fills tables and drives bookings for NZ hospitality businesses. Strategy built around NZ dining culture, seasonal events, and tourism patterns.',
    url: 'https://www.junctionmedia.ai/social-media-for-hospitality-nz',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/social-media-for-hospitality-nz',
  },
}

const painPoints = [
  {
    title: 'Beautiful content that gets likes but doesn\'t fill seats',
    desc: 'Most hospitality social media is aesthetic without strategy. Pretty food photos get double-taps; they don\'t drive reservations. The difference between social media that looks good and social media that works is a conversion-focused strategy — CTAs, booking links, limited-availability messaging, and stories designed to trigger action.',
  },
  {
    title: 'NZ hospitality is hyper-seasonal — most content strategies ignore this',
    desc: 'Summer dining differs from winter comfort food campaigns. Auckland Restaurant Month, Queenstown Winter Festival, school holiday family dining, Christmas bookings in November — NZ hospitality has a distinct seasonal rhythm that your content calendar must anticipate and leverage, not react to after the fact.',
  },
  {
    title: 'Staff bandwidth is always the constraint — content falls behind',
    desc: 'A busy restaurant on a Saturday service doesn\'t have a marketing manager. Content planning, caption writing, posting, community management, and responding to reviews happen in whatever time exists. With AI-assisted content systems, we solve the bandwidth problem without hiring a full-time social media manager.',
  },
]

const approach = [
  {
    title: 'Booking-Focused Content Strategy',
    desc: 'Every piece of content serves a purpose. Menu launches with reservation links, event announcements with booking codes, limited-seating urgency posts, and user-generated content reposting that builds social proof. Strategy before aesthetics.',
  },
  {
    title: 'NZ Hospitality Calendar Management',
    desc: 'We plan and produce content around the NZ events and seasons that matter to your venue — summer outdoor dining, Mother\'s Day campaigns, school holidays, long-weekend promotions, and the quiet periods where well-targeted content makes the difference.',
  },
  {
    title: 'AI-Powered Content Production',
    desc: 'Caption writing, hashtag strategy, story sequences, and Reel scripting at a volume that would require 2–3 staff to maintain manually. We use AI production tools to generate more content, more consistently, without the overhead.',
  },
  {
    title: 'Community Management & Review Response',
    desc: 'Responding to comments, DMs, and Google reviews professionally and promptly. In hospitality, reputation is everything — a thoughtful response to a negative review can turn a one-star into a loyal regular. We manage the conversation.',
  },
]

const results = [
  { stat: '+30%', label: 'Above store record (Deep Blue Health, Nov 2025)' },
  { stat: '4–5', label: 'Clients at any one time — focused work' },
  { stat: 'Daily', label: 'Content posting and community management' },
  { stat: '100%', label: 'NZ-based, NZ hospitality market' },
]

const faqs = [
  {
    q: 'Which platforms matter most for NZ hospitality?',
    a: 'Instagram is the primary platform for NZ food and hospitality — it\'s visual, local, and where NZ diners discover restaurants. Facebook is important for older demographics and event promotion. TikTok is growing rapidly for restaurant discovery, particularly for under-35s. Google Business Profile (not strictly social media, but managed similarly) drives the most direct bookings. We prioritise based on your venue type and target customer.',
  },
  {
    q: 'Do you handle photography and videography as well?',
    a: 'We don\'t produce photography in-house, but we work closely with NZ hospitality photographers and videographers we trust. We can coordinate content shoots, provide creative briefs, and manage the post-production workflow so you get social-ready content without managing multiple vendors.',
  },
  {
    q: 'Can social media work for accommodation and tourism, not just restaurants?',
    a: 'Absolutely. Hotels, lodges, and tourism operators have their own distinct social media requirements — showcasing experiences rather than food, targeting international visitors, and building aspirational content that drives bookings months in advance. We have experience across restaurants, accommodation, and tourism experiences.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Social Media for Hospitality NZ',
  provider: {
    '@type': 'Organization',
    name: 'Junction Media',
    url: 'https://www.junctionmedia.ai',
  },
  description: 'Social media marketing for NZ restaurants, hotels, cafés, and tourism businesses. Content strategy, AI-powered production, and community management.',
  areaServed: { '@type': 'Country', name: 'New Zealand' },
}

export default function SocialMediaForHospitalityNZ() {
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
          Service + Industry · Social Media for Hospitality NZ
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Social Media Agency for<br />
          <span className="text-gray-500">Hospitality NZ</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          Social media for NZ restaurants, cafés, hotels, and tourism operators that actually drives
          bookings — not just likes. We build content strategies around NZ hospitality seasons and
          dining culture, with AI-powered production systems that keep your channels active without
          pulling your staff away from the floor.
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
        <h2 className="text-2xl font-bold mb-8">Why Hospitality Businesses Need Social Media Done Right</h2>
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
        <h2 className="text-2xl font-bold mb-4">Our Hospitality Social Media Approach</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          We treat social media as a revenue channel, not a branding exercise. Every campaign,
          every post, every story is designed to move a potential guest from &quot;aware&quot; to
          &quot;booked&quot; — measured by actual reservations and covers, not follower counts.
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
            Deep Blue Health beat their all-time monthly revenue record by 30% in November 2025 —
            driven by a coordinated full-stack marketing approach including social media, paid ads,
            email, and SEO. The same systems thinking applies to NZ hospitality — channels that work
            together, not in isolation.
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
            { title: 'Social Media for Hospitality NZ — Full Guide', href: '/blog/social-media-hospitality-nz' },
            { title: 'Hospitality Marketing NZ', href: '/industries/hospitality-nz' },
            { title: 'Social Media Services NZ', href: '/services/social-media-nz' },
            { title: 'Meta Ads for Ecommerce NZ', href: '/meta-ads-for-ecommerce-nz' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to Scale Your Hospitality Business?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            We work with a small number of NZ hospitality clients at any one time. Apply to see if
            we can help you fill more seats and drive more bookings.
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
