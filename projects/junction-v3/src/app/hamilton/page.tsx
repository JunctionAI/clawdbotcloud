import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AI Marketing Consultant Hamilton | Tom Hall-Taylor | Junction Media',
  description: 'Hamilton-based AI marketing consultant and fractional CMO. Tom Hall-Taylor helps select Hamilton businesses build AI-native marketing operations that compound over time.',
  keywords: 'AI marketing consultant Hamilton, fractional CMO Hamilton, marketing consultant Hamilton, digital marketing Hamilton, AI marketing Hamilton, marketing agency Hamilton, marketing strategist Hamilton',
  openGraph: {
    title: 'AI Marketing Consultant Hamilton | Tom Hall-Taylor',
    description: 'Hamilton AI marketing consultant. Fractional CMO for select Waikato businesses ready to build AI-native marketing operations.',
    url: 'https://www.junctionmedia.ai/hamilton',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/hamilton',
  },
}

export default function HamiltonPage() {
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
          Hamilton, New Zealand
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          AI Marketing Consultant<br />
          <span className="text-gray-500">Hamilton</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          I&apos;m Tom Hall-Taylor â€” an NZ-based AI marketing consultant and fractional CMO. 
          I work with select Hamilton and Waikato businesses to build marketing operations 
          that compound over time, not campaigns that stop when the budget runs out.
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
        <h2 className="text-2xl font-bold mb-8">What I Do for Hamilton Businesses</h2>
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

      {/* Why Hamilton */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Why Hamilton Businesses Work With Me</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            Hamilton is New Zealand&apos;s fourth-largest city and one of its fastest-growing. The Waikato 
            region has a diverse economy â€” agribusiness, manufacturing, education, health, and a 
            rapidly expanding professional services sector. But Hamilton businesses often get 
            overlooked by agencies that focus on Auckland or offshore markets.
          </p>
          <p className="text-gray-600 leading-relaxed">
            I built Junction Media differently. I work with a maximum of 3â€“5 clients at any time. 
            That cap is intentional â€” it&apos;s how I give each business the attention and strategic depth 
            that actually moves the needle. You deal directly with me, not an account manager in a 
            large agency machine.
          </p>
          <p className="text-gray-600 leading-relaxed">
            And because I use AI systems for execution â€” content, reporting, ad management â€” I can 
            deliver what a 10-person agency delivers, at a fraction of the cost. That matters 
            especially in a regional market like Hamilton where marketing budgets are often tighter 
            and ROI expectations are higher.
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
              q: 'Are you based in Hamilton?',
              a: 'I\'m based in Auckland but work with businesses across New Zealand, including Hamilton and the wider Waikato region. Most of our work happens remotely via video calls and shared systems â€” location isn\'t a constraint for modern marketing strategy.'
            },
            {
              q: 'What does an engagement look like?',
              a: 'I work on monthly retainer. We start with a strategy session to understand your business, goals, and current marketing state. From there I build a 90-day roadmap and we execute against it â€” with weekly check-ins and full visibility into what\'s happening.'
            },
            {
              q: 'How is this different from a Hamilton marketing agency?',
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
            I&apos;m selective about who I work with. If you&apos;re a Hamilton or Waikato business serious 
            about building AI-native marketing â€” apply below.
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
