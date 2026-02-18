import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AI Marketing Consultant Whangarei | Tom Hall-Taylor | Junction Media',
  description: 'Whangarei AI marketing consultant and fractional CMO. Tom Hall-Taylor helps select Whangarei and Northland businesses build AI-native marketing operations that compound over time.',
  keywords: 'AI marketing consultant Whangarei, fractional CMO Whangarei, marketing consultant Whangarei, digital marketing Whangarei, AI marketing Whangarei, marketing agency Whangarei, Northland marketing agency, marketing consultant Northland',
  openGraph: {
    title: 'AI Marketing Consultant Whangarei | Tom Hall-Taylor',
    description: 'Whangarei AI marketing consultant. Fractional CMO for select Northland businesses ready to build AI-native marketing operations.',
    url: 'https://www.junctionmedia.ai/whangarei',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/whangarei',
  },
}

export default function WhangareiPage() {
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
          Whangarei, Northland
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          AI-Native Marketing in<br />
          <span className="text-gray-500">Whangarei</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          I&apos;m Tom Hall-Taylor â€” an NZ-based AI marketing consultant and fractional CMO. 
          I work with select Whangarei and Northland businesses to build marketing operations 
          that compound over time â€” not campaigns that stop when the budget runs out.
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
        <h2 className="text-2xl font-bold mb-8">What I Do for Whangarei Businesses</h2>
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
              title: 'Local & Regional SEO',
              desc: 'Dominate Northland search results for your category. AI-native SEO infrastructure that builds compounding visibility over time.'
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

      {/* Why Whangarei */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Why Whangarei Businesses Work With Me</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            Whangarei is Northland&apos;s commercial hub â€” and it&apos;s more interesting than its 
            reputation suggests. The region has a diverse economic base: marine industry 
            (Whangarei is one of New Zealand&apos;s largest boat-building centres), oil refining 
            and energy infrastructure, construction, agriculture, tourism, and the professional 
            services that tie it together.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Northland businesses often operate in a competitive vacuum at the local level â€” there 
            aren&apos;t many local competitors â€” but compete nationally or internationally in their 
            sectors. A boat builder in Whangarei isn&apos;t just competing against other Northland 
            businesses; they&apos;re competing against marine businesses globally. Marketing that 
            builds genuine authority â€” through SEO, thought leadership, and systematic social 
            proof â€” is the differentiator.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Most Whangarei businesses are also under-resourced for marketing relative to their 
            actual potential. They&apos;re often excellent at what they do and terrible at telling 
            people about it. AI-native marketing systems fix this asymmetry â€” they produce 
            at scale, target precisely, and build the online presence that turns a great 
            business into a known business.
          </p>
          <p className="text-gray-600 leading-relaxed">
            I work with a small number of clients at any one time. The Whangarei and Northland 
            businesses I work with get my direct attention â€” not a handoff to a junior account 
            manager based in Auckland.
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
              q: 'Are you based in Whangarei?',
              a: 'I\'m based in Auckland but work with businesses across Northland and New Zealand. Most of our work happens remotely via video calls and shared systems â€” location isn\'t a constraint for modern marketing strategy. Auckland to Whangarei is also a straightforward drive when in-person makes sense.'
            },
            {
              q: 'Do you work with marine and industrial businesses?',
              a: 'Yes â€” I work with B2B and trade businesses including those in manufacturing, marine, construction, and industrial services. Understanding your buyers and building marketing that reaches them effectively is what I do, regardless of sector.'
            },
            {
              q: 'How is this different from a Whangarei marketing agency?',
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
            I&apos;m selective about who I work with. If you&apos;re a Whangarei or Northland business 
            serious about building AI-native marketing â€” apply below.
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
