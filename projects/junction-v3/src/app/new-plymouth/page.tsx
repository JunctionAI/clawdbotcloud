import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AI Marketing Agency New Plymouth | Junction Media',
  description: 'New Plymouth and Taranaki AI marketing consultant and fractional CMO. Tom Hall-Taylor works with select businesses in oil & gas, dairy, arts, and professional services to build AI-native marketing that compounds.',
  keywords: 'marketing agency New Plymouth, digital marketing New Plymouth, AI marketing Taranaki, fractional CMO New Plymouth, marketing consultant New Plymouth NZ, Taranaki marketing agency',
  openGraph: {
    title: 'AI Marketing Agency New Plymouth | Junction Media',
    description: 'New Plymouth AI marketing consultant. Fractional CMO for select Taranaki businesses ready to build AI-native marketing operations that compound over time.',
    url: 'https://www.junctionmedia.ai/new-plymouth',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/new-plymouth',
  },
}

export default function NewPlymouthPage() {
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
          New Plymouth &amp; Taranaki, New Zealand
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          AI-Native Marketing in<br />
          <span className="text-gray-500">New Plymouth &amp; Taranaki</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          I&apos;m Tom Hall-Taylor â€” an NZ-based AI marketing consultant and fractional CMO.
          I work with select New Plymouth and Taranaki businesses to build marketing operations
          that compound over time â€” purpose-built for the region&apos;s oil &amp; gas, dairy,
          arts, and professional services sectors.
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
        <h2 className="text-2xl font-bold mb-8">What I Do for New Plymouth &amp; Taranaki Businesses</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Fractional CMO', link: '/services/fractional-cmo',
              desc: 'Senior marketing strategy without a full-time hire. I embed in your business, own the marketing function, and drive results.'
            },
            {
              title: 'AI Marketing Systems', link: '/services/ai-marketing-systems',
              desc: 'Build AI-powered systems that handle content, ads, SEO, and reporting at scale â€” so you compound, not just campaign.'
            },
            {
              title: 'Paid Advertising', link: '/services/google-ads-nz',
              desc: 'Meta Ads and Google Ads managed with AI optimisation. Data-driven, not set-and-forget.'
            },
            {
              title: 'Growth Strategy', link: '/services/',
              desc: 'Clear positioning, channel strategy, and 90-day roadmaps built around your business â€” not a cookie-cutter playbook.'
            },
          ].map((service) => (
            <Link key={service.title} href={service.link ?? '/#apply'} className="p-6 border border-gray-100 rounded-2xl hover:border-gray-400 transition-colors block">
              <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{service.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Why New Plymouth */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Why New Plymouth &amp; Taranaki Businesses Work With Me</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            Taranaki&apos;s economy is one of the most distinctive in New Zealand. The energy sector â€” 
            oil, gas, and an emerging renewable energy industry â€” gives the region a strong 
            commercial backbone. Dairy farming dominates the rural economy. And culturally, New 
            Plymouth punches well above its weight, anchored by the Govett-Brewster Art Gallery 
            and the internationally recognised Len Lye Centre. This is a region with serious 
            businesses and serious ambition.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Those businesses deserve marketing that reflects that ambition â€” not generic output 
            from agencies that don&apos;t understand the Taranaki market. I built Junction Media to 
            work with a maximum of 3â€“5 clients at any time, which means you get direct access to 
            senior strategy, not a junior account manager.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Because I use AI systems for execution â€” content, reporting, ad management â€” I can 
            deliver what a 10-person agency delivers at a fraction of the cost. For New Plymouth 
            businesses competing regionally and nationally, that combination of senior thinking 
            and AI-powered execution is a genuine competitive advantage.
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
            Deep Blue Health â€” a New Zealand supplement brand â€” hit their best revenue month ever
            in November 2025. We built AI-native marketing systems across Google Ads, Meta Ads,
            SEO, content, and customer support. That was the result: 30% above their previous
            all-time record.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">Common Questions</h2>
        <div className="space-y-8">
          {[
            {
              q: 'Are you based in New Plymouth?',
              a: 'I\'m based in Auckland but work with businesses across New Zealand, including New Plymouth and the wider Taranaki region. Most of our work happens remotely via video calls and shared systems â€” location isn\'t a barrier for modern marketing strategy.'
            },
            {
              q: 'What does an engagement look like?',
              a: 'I work on monthly retainer. We start with a strategy session to understand your business, goals, and current marketing state. From there I build a 90-day roadmap and we execute against it â€” with weekly check-ins and full visibility into what\'s happening.'
            },
            {
              q: 'How is this different from a New Plymouth marketing agency?',
              a: 'I work with 3â€“5 clients at a time â€” not 30. You deal directly with me, not an account manager. And because I use AI systems for execution, the cost is lower without compromising quality. Think fractional CMO with an AI team behind it.'
            },
            {
              q: 'What\'s the minimum commitment?',
              a: 'I work in 3-month minimum engagements. Marketing compounds over time â€” 30-day sprints don\'t build the systems that actually change a business.'
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
            I&apos;m selective about who I work with. If you&apos;re a New Plymouth or Taranaki business
            serious about building AI-native marketing that compounds â€” apply below.
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
          <p className="text-gray-500 text-sm">Â© 2026 Junction Media. Auckland, New Zealand.</p>
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
