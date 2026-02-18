import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AI Marketing Consultant New Zealand | Fractional CMO NZ | Junction Media',
  description: 'New Zealand AI marketing consultant and fractional CMO. Tom Hall-Taylor works with select NZ businesses to build AI-native marketing operations that compound over time. Auckland-based, NZ-wide.',
  keywords: 'AI marketing consultant New Zealand, fractional CMO NZ, marketing consultant NZ, digital marketing New Zealand, AI marketing NZ, fractional CMO New Zealand, marketing agency NZ, marketing strategist NZ, outsourced CMO NZ',
  openGraph: {
    title: 'AI Marketing Consultant New Zealand | Tom Hall-Taylor | Junction Media',
    description: 'NZ-based AI marketing consultant. Fractional CMO for select businesses ready to build AI-native marketing operations that compound over time.',
    url: 'https://www.junctionmedia.ai/new-zealand',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/new-zealand',
  },
}

export default function NewZealandPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className="px-6 py-5 border-b border-gray-100 flex items-center justify-between max-w-5xl mx-auto">
        <Link href="/" className="font-medium text-gray-900 hover:text-gray-600 transition-colors">
          Junction Media
        </Link>
        <Link 
          href="/#apply" 
          className="text-sm bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors"
        >
          Apply to Work With Me
        </Link>
      </nav>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-16">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
          New Zealand
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          AI Marketing Consultant<br />
          <span className="text-gray-500">New Zealand</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          I&apos;m Tom Hall-Taylor — an NZ-based AI marketing consultant and fractional CMO. 
          I work with select businesses across New Zealand to build marketing operations 
          that compound over time, not campaigns that die when the budget runs out.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/#apply"
            className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors text-center"
          >
            Apply to Work With Me
          </Link>
          <Link
            href="/blog"
            className="inline-block border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:border-gray-500 transition-colors text-center"
          >
            Read the Blog
          </Link>
        </div>
      </section>

      {/* What I Do */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">What I Do for NZ Businesses</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Fractional CMO',
              desc: 'Senior marketing leadership without the full-time salary. I embed in your business, own the marketing function, and drive results — for a fraction of what a CMO hire costs.'
            },
            {
              title: 'AI Marketing Systems',
              desc: 'Build the AI infrastructure that handles content, ads, SEO, and reporting at scale. Stop campaigning. Start compounding.'
            },
            {
              title: 'Paid Advertising',
              desc: 'Meta Ads and Google Ads managed with AI-driven optimisation. Not set-and-forget — active management with real accountability.'
            },
            {
              title: 'Growth Strategy',
              desc: 'Clear positioning, 90-day roadmaps, and channel strategy built around your specific business and market — not a templated playbook.'
            },
          ].map((service) => (
            <div key={service.title} className="p-6 border border-gray-100 rounded-2xl">
              <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NZ Context */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Built for the NZ Market</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            New Zealand has a specific set of dynamics that most offshore agencies don&apos;t understand. 
            The market is small but competitive. Audiences are sophisticated. Traditional channels 
            are expensive relative to market size. And the real opportunity — AI-native marketing — 
            is still largely untapped by NZ businesses.
          </p>
          <p className="text-gray-600 leading-relaxed">
            I&apos;ve built Junction Media specifically to serve the $1M–$20M NZ business: established 
            enough to need real marketing leadership, too small to justify a full in-house team. 
            By using AI systems for execution, I can deliver what a 10-person agency delivers — 
            at a cost that makes sense for the NZ market.
          </p>
          <p className="text-gray-600 leading-relaxed">
            I work with a maximum of 3–5 clients at any time. That&apos;s a deliberate constraint — 
            it&apos;s how I give each business the attention and strategic depth that actually moves 
            the needle. You get direct access to a senior strategist, not an account manager.
          </p>
        </div>
      </section>

      {/* NZ Cities */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Working Across New Zealand</h2>
        <p className="text-gray-600 leading-relaxed mb-8">
          Based in Auckland, I work with businesses across New Zealand — both in-person 
          (Auckland) and remotely (Wellington, Christchurch, Hamilton, Tauranga, and beyond). 
          Modern marketing strategy doesn&apos;t require you to be in the same city.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            { city: 'Auckland', link: '/auckland' },
            { city: 'Wellington', link: null },
            { city: 'Christchurch', link: null },
            { city: 'Hamilton', link: null },
            { city: 'Tauranga', link: null },
            { city: 'Dunedin', link: null },
          ].map(({ city, link }) => (
            <div key={city} className="p-4 border border-gray-100 rounded-xl text-center">
              {link ? (
                <Link href={link} className="font-medium text-gray-900 hover:text-gray-600 transition-colors">
                  {city}
                </Link>
              ) : (
                <span className="font-medium text-gray-600">{city}</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Result */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">Proof It Works</h2>
        <div className="bg-gray-50 rounded-2xl p-8">
          <p className="text-3xl font-bold text-gray-900 mb-2">+30%</p>
          <p className="text-gray-500 text-sm mb-4">Above previous store record</p>
          <p className="text-gray-600 leading-relaxed">
            Deep Blue Health — a New Zealand supplement brand — achieved their best revenue 
            month ever in November 2025. We built AI-native marketing systems across Google Ads, 
            Meta Ads, SEO, content, and customer support. Result: 30% above their previous 
            all-time record.
          </p>
          <Link href="/blog/deep-blue-health-case-study" className="inline-block mt-4 text-sm font-medium text-gray-900 underline underline-offset-4 hover:text-gray-600 transition-colors">
            Read the full case study →
          </Link>
        </div>
      </section>

      {/* Who It&apos;s For */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">Who This Is For</h2>
        <div className="space-y-4">
          {[
            'NZ businesses doing $1M–$20M who need senior marketing strategy without a full-time CMO',
            'E-commerce brands scaling beyond $2M who need AI-native growth systems',
            'Professional services firms (law, accounting, consulting) wanting to scale marketing',
            'Health, wellness, and consumer brands looking to build compound marketing channels',
            'B2B businesses in NZ entering new markets or scaling client acquisition',
          ].map((item, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="text-gray-300 mt-1 flex-shrink-0">—</span>
              <p className="text-gray-600 leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">Common Questions</h2>
        <div className="space-y-8">
          {[
            {
              q: 'Do you only work with Auckland businesses?',
              a: 'No — I work with businesses across New Zealand. I\'m Auckland-based, but I work remotely with clients in Wellington, Christchurch, Hamilton, Tauranga, and beyond. Most of our work happens via video calls and shared systems anyway.'
            },
            {
              q: 'How is a fractional CMO different from a marketing agency?',
              a: 'An agency sells services — SEO, ads, content. They don\'t own strategy. A fractional CMO is embedded in your leadership team, owns marketing outcomes, and drives the strategy. I work with 3–5 clients max, not 30. You get direct access to me, not an account manager.'
            },
            {
              q: 'What does an engagement cost?',
              a: 'I work on monthly retainer. Pricing depends on scope — whether you need strategy-only, or strategy plus execution. Engagements start from $5k/month. The right question is whether the ROI justifies it: if I can help you grow revenue by $20k+/month, the math is straightforward.'
            },
            {
              q: 'How do you use AI differently from a regular agency?',
              a: 'AI is the execution infrastructure, not a gimmick. I use AI systems to produce content at scale, analyse performance data in real-time, manage ad creative testing, build automated marketing workflows, and deliver reporting. One person with AI does what a 5–10 person team used to do.'
            },
            {
              q: 'What\'s the minimum commitment?',
              a: 'I work in 3-month minimum engagements. Marketing compounds — it doesn\'t produce results in 30 days. 3 months is the minimum to see meaningful data and build the systems that actually change a business trajectory.'
            },
          ].map((faq) => (
            <div key={faq.q}>
              <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
              <p className="text-gray-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 py-20 border-t border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to build something real?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            I&apos;m selective about who I work with. If you&apos;re an NZ business serious 
            about building AI-native marketing that compounds — apply below.
          </p>
          <Link
            href="/#apply"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg"
          >
            Apply to Work With Me
          </Link>
          <p className="text-gray-400 text-sm mt-4">3–5 clients at any time. Serious enquiries only.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2026 Junction Media. Auckland, New Zealand.</p>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Home</Link>
            <Link href="/auckland" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Auckland</Link>
            <Link href="/blog" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Blog</Link>
            <Link href="/#apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
