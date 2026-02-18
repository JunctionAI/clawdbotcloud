import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AI Marketing Consultant Dunedin | Tom Hall-Taylor | Junction Media',
  description: 'Dunedin AI marketing consultant and fractional CMO. Tom Hall-Taylor helps select Dunedin and Otago businesses build AI-native marketing systems that generate real results.',
  keywords: 'AI marketing consultant Dunedin, fractional CMO Dunedin, marketing consultant Dunedin, digital marketing Dunedin, AI marketing Dunedin, marketing agency Dunedin, marketing strategist Dunedin, Otago marketing consultant',
  openGraph: {
    title: 'AI Marketing Consultant Dunedin | Tom Hall-Taylor',
    description: 'Dunedin AI marketing consultant. Fractional CMO for select Otago businesses ready to build AI-native marketing operations.',
    url: 'https://www.junctionmedia.ai/dunedin',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/dunedin',
  },
}

export default function DunedinPage() {
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
          Dunedin, New Zealand
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          AI Marketing Consultant<br />
          <span className="text-gray-500">Dunedin</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          I&apos;m Tom Hall-Taylor — an NZ-based AI marketing consultant and fractional CMO. 
          I work with select Dunedin and Otago businesses to build marketing systems that 
          compound over time — not campaigns that stop the moment the budget runs out.
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
        <h2 className="text-2xl font-bold mb-8">What I Do for Dunedin Businesses</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Fractional CMO',
              desc: 'Senior marketing strategy without a full-time hire. I embed in your business, own the marketing function, and drive results measured in revenue.'
            },
            {
              title: 'AI Marketing Systems',
              desc: 'Build AI-powered systems that handle content, ads, SEO, and reporting at scale — compounding advantage over time.'
            },
            {
              title: 'Paid Advertising',
              desc: 'Meta Ads and Google Ads managed with AI optimisation. Data-driven, not set-and-forget.'
            },
            {
              title: 'Growth Strategy',
              desc: 'Clear positioning, channel strategy, and 90-day roadmaps built around your business model — not a generic playbook.'
            },
          ].map((service) => (
            <div key={service.title} className="p-6 border border-gray-100 rounded-2xl">
              <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Dunedin */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Why Dunedin Businesses Work With Me</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            Dunedin is one of New Zealand&apos;s most interesting business cities. The University of Otago 
            creates a constant pipeline of talent. The city has a punching-above-its-weight tech 
            scene, a thriving professional services sector, and businesses across manufacturing, 
            tourism, agriculture, and health — many of which have been underserved by marketing 
            agencies focused on Auckland or offshore markets.
          </p>
          <p className="text-gray-600 leading-relaxed">
            I work with a maximum of 3–5 clients at any time. That constraint is deliberate — it&apos;s 
            how I provide the kind of deep strategic involvement that actually changes outcomes. 
            You work directly with me, not an account manager in a 50-person agency machine.
          </p>
          <p className="text-gray-600 leading-relaxed">
            And because I&apos;ve built AI systems to handle execution — content production, reporting, 
            ad optimisation — I can deliver what a full agency team delivers at a significantly 
            lower cost. That matters in a regional market where every dollar has to work harder.
          </p>
        </div>
      </section>

      {/* Result */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">A Result Worth Mentioning</h2>
        <div className="bg-gray-50 rounded-2xl p-8">
          <p className="text-3xl font-bold text-gray-900 mb-2">+30%</p>
          <p className="text-gray-500 text-sm mb-4">Above previous store record</p>
          <p className="text-gray-600 leading-relaxed">
            Deep Blue Health — a New Zealand supplement brand — hit their best-ever revenue month 
            in November 2025. We built AI-native marketing systems spanning Google Ads, Meta Ads, 
            SEO, content, and customer support. The result: 30% above their previous all-time 
            record — not from a lucky campaign, but from a compounding system.
          </p>
        </div>
      </section>

      {/* Otago context */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Marketing in Dunedin&apos;s Market Context</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Dunedin&apos;s market has unique characteristics worth understanding before you design a 
            marketing strategy:
          </p>
          <ul className="space-y-3 list-none">
            <li className="flex gap-3">
              <span className="text-gray-400 shrink-0">—</span>
              <span><strong className="text-gray-900">University city dynamics:</strong> Large student population with distinct needs and behaviour patterns. Strong talent supply. High proportion of educated, digitally active consumers.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-gray-400 shrink-0">—</span>
              <span><strong className="text-gray-900">Tourism asset:</strong> Otago Peninsula, wildlife tourism, heritage buildings, and a distinctive cultural identity create genuine marketing differentiation for the right businesses.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-gray-400 shrink-0">—</span>
              <span><strong className="text-gray-900">Tech and professional services growth:</strong> Dunedin has a growing reputation as a viable tech hub — lower cost base than Auckland, strong university pipeline, quality of life advantage.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-gray-400 shrink-0">—</span>
              <span><strong className="text-gray-900">Strong community feel:</strong> Local trust and reputation carry significant weight. Being known in Dunedin&apos;s business community is a genuine competitive advantage — which means referral and relationship marketing performs exceptionally well.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">Common Questions</h2>
        <div className="space-y-8">
          {[
            {
              q: 'Are you based in Dunedin?',
              a: 'I\'m based in Auckland but work with businesses across New Zealand, including Dunedin and the Otago region. Most work happens remotely — video calls, shared dashboards, and direct Slack/comms access. Geography isn\'t a constraint for modern marketing work.'
            },
            {
              q: 'What does working with you look like?',
              a: 'I work on monthly retainer with a 3-month minimum. We start with a deep-dive strategy session, then I build a 90-day roadmap and execute against it — with weekly check-ins and full visibility. You\'re not getting a report once a month; you\'re getting a partner in the business.'
            },
            {
              q: 'How is this different from a Dunedin marketing agency?',
              a: 'I run a lean operation with 3–5 clients at a time. No account managers, no overhead padding costs. You work directly with me — someone who has actually delivered results for NZ businesses. I also use AI systems for execution, which means you get agency-level output at a fraction of agency cost.'
            },
            {
              q: 'What size of business is the right fit?',
              a: 'Generally businesses with $500k–$10M+ in revenue that have a proven offer and are ready to scale marketing. Too early-stage and the strategic work is premature. But if you\'re past product-market fit and trying to build acquisition at scale — that\'s the conversation.'
            },
          ].map((faq) => (
            <div key={faq.q}>
              <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
              <p className="text-gray-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* City links */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Other Cities I Work With</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            { city: 'Auckland', href: '/auckland' },
            { city: 'Wellington', href: '/wellington' },
            { city: 'Christchurch', href: '/christchurch' },
            { city: 'Hamilton', href: '/hamilton' },
            { city: 'Tauranga', href: '/tauranga' },
            { city: 'New Zealand', href: '/new-zealand' },
          ].map(({ city, href }) => (
            <Link
              key={city}
              href={href}
              className="text-center p-4 border border-gray-100 rounded-xl text-gray-600 hover:border-gray-300 hover:text-gray-900 transition-colors text-sm font-medium"
            >
              {city}
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 py-20 border-t border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to build something real?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            I&apos;m selective about who I work with. If you&apos;re a Dunedin or Otago business serious 
            about building AI-native marketing that compounds — apply below.
          </p>
          <Link
            href="/#apply"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg"
          >
            Apply to Work With Me
          </Link>
          <p className="text-gray-400 text-sm mt-4">Spots are limited. Serious enquiries only.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2026 Junction Media. Auckland, New Zealand.</p>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Home</Link>
            <Link href="/blog" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Blog</Link>
            <Link href="/#apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
