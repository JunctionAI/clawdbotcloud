import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Social Media for Real Estate in NZ — Agent & Agency Brand Building | Junction Media',
  description: 'Social media management for NZ real estate agents and agencies. Build your listing profile, attract vendors, and stay top-of-mind with property buyers and sellers in your market.',
  keywords: 'social media for real estate nz, real estate social media nz, property agent social media nz, real estate instagram nz, real estate facebook nz, nz real estate marketing social',
  openGraph: {
    title: 'Social Media for Real Estate NZ | Junction Media',
    description: 'Social media for NZ real estate agents and agencies. Build your brand, attract vendors, and grow your market share.',
    url: 'https://www.junctionmedia.ai/social-media-for-real-estate-nz',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/social-media-for-real-estate-nz',
  },
}

const painPoints = [
  {
    title: 'Real estate social media is an agent brand game — most agents treat it as a listing board',
    desc: 'The real estate agents who win on social media are not the ones posting the most listings — they\'re the ones who have built a personal brand that potential vendors want to work with. When a homeowner thinks about selling, they think of the agent they\'ve been watching on social for months. Most NZ agents post listings, get minimal engagement, and wonder why their social isn\'t generating appraisal requests.',
  },
  {
    title: 'The best time to build social presence is before you need the listing',
    desc: 'Real estate is a relationship business with long time horizons. A vendor who is thinking about selling in 18 months is making mental notes about which agents they trust, follow, and respect right now. Social media is the only channel that lets you consistently stay in front of potential vendors during that 12–18 month window before they make contact. Most agents don\'t start until they need the business.',
  },
  {
    title: 'Market commentary and local expertise content drives the highest engagement',
    desc: 'Real estate social content that gets shared and builds genuine authority is market insight content — suburb price trends, auction results commentary, market condition explanations, and local area knowledge. This content positions agents as trusted advisors, not just salespeople. It\'s also the content that is hardest to delegate to someone who doesn\'t know your market.',
  },
]

const approach = [
  {
    title: 'Agent Personal Brand Development',
    desc: 'We develop a consistent social media persona for individual agents or agency brands — distinct voice, visual style, content pillars, and a positioning statement that differentiates you from every other agent posting property photos. Your brand should communicate who you are and why vendors should choose you.',
  },
  {
    title: 'Market Insight Content',
    desc: 'Regular market commentary posts that showcase your local expertise: suburb spotlights, auction result analysis, buyer demand updates, and property market trend content. Positioned as helpful information, not sales pitches — the kind of content that gets shared by homeowners to their neighbours and family members who are thinking about selling.',
  },
  {
    title: 'Listing Showcase Strategy',
    desc: 'When you do post listings, we ensure they\'re presented in a way that builds your brand rather than just promoting the property. Storytelling-focused listing content, neighbourhood context, and lifestyle positioning that resonates with buyers while also demonstrating your marketing quality to future vendors who are watching.',
  },
  {
    title: 'Vendor Journey Content',
    desc: 'Behind-the-scenes content that walks potential vendors through the selling process: how you prepare a property for market, how you run auctions, client results stories, and the experience of working with you. Content that answers the questions vendors have before they\'re ready to ask them.',
  },
]

const results = [
  { stat: 'Vendor-focused', label: 'Brand strategy' },
  { stat: 'Market insight', label: 'Authority content' },
  { stat: '4–5', label: 'Clients at any one time' },
  { stat: '100%', label: 'NZ-based expertise' },
]

const faqs = [
  {
    q: 'Should NZ real estate agents focus on Instagram or Facebook?',
    a: 'Both have distinct roles. Instagram is better for property imagery, agent personal brand, and reaching younger buyers and upgraders. Facebook is stronger for older demographics (often the vendor cohort), local community groups, and event promotion. For most NZ real estate agents, we recommend maintaining both with platform-appropriate content rather than picking one. Video content (Reels) works well across both platforms.',
  },
  {
    q: 'How do you handle social media for a whole real estate agency vs individual agents?',
    a: 'We build separate strategies depending on the business model. Agency-level social focuses on brand, market presence, and showcasing the team\'s collective results. Individual agent social focuses on personal brand and relationship building. For agencies where agents have their own profiles, we often help create content guidelines and branded templates that allow agents to personalise while maintaining overall brand consistency.',
  },
  {
    q: 'How long before social media generates real estate appraisal requests?',
    a: 'Real estate social media is a 6–12 month strategy minimum. The first 3 months build brand presence and follower growth. Months 3–6 start generating engagement and DMs from warm prospects. By 6–12 months, agents who have been consistent typically have inbound appraisal requests from people who have been watching them. This timeline varies significantly based on posting consistency and content quality.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Social Media for Real Estate NZ',
  provider: {
    '@type': 'Organization',
    name: 'Junction Media',
    url: 'https://www.junctionmedia.ai',
  },
  description: 'Social media management for NZ real estate agents and agencies. Agent brand building, market insight content, and vendor attraction strategy.',
  areaServed: { '@type': 'Country', name: 'New Zealand' },
}

export default function SocialMediaForRealEstateNZ() {
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
          Service + Industry · Social Media for Real Estate NZ
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Social Media for<br />
          <span className="text-gray-500">Real Estate in NZ</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          The NZ real estate agents who consistently win appraisals are the ones vendors already
          know and trust before they pick up the phone. Social media is how you build that familiarity
          at scale — not by posting listings, but by becoming the local market expert your community
          follows and respects. We manage social media for NZ real estate agents and agencies that want
          to attract vendors, not just buyers.
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
        <h2 className="text-2xl font-bold mb-8">Why Real Estate Social Media Requires a Different Mindset</h2>
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
        <h2 className="text-2xl font-bold mb-4">Our Real Estate Social Media Approach</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          We manage social media for NZ real estate professionals as a long-term brand-building
          investment, not a short-term listings promotional tool. The agents we work with are building
          the kind of social presence that generates inbound appraisal requests — because vendors
          have been watching them for months.
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
            { title: 'Google Ads for Real Estate NZ', href: '/google-ads-for-real-estate-nz' },
            { title: 'Meta Ads for Real Estate NZ', href: '/meta-ads-for-real-estate-nz' },
            { title: 'Real Estate Marketing Overview', href: '/industries/real-estate-nz' },
            { title: 'Social Media for Hospitality NZ', href: '/social-media-for-hospitality-nz' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to Become the Go-To Agent in Your Market?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            We work with a small number of NZ real estate professionals at any one time. Apply to see
            if we can help you build the social presence that attracts vendors before they start
            comparing agents.
          </p>
          <Link href="/apply" className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg">
            Apply to Work With Us
          </Link>
          <p className="text-gray-400 text-sm mt-4">NZ real estate professionals only.</p>
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
