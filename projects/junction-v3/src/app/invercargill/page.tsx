import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AI Marketing Agency Invercargill | Junction Media',
  description: 'Invercargill and Southland AI marketing consultant and fractional CMO. Tom Hall-Taylor works with select businesses in agriculture, manufacturing, tourism, and professional services to build AI-native marketing that compounds.',
  keywords: 'marketing agency Invercargill, digital marketing Invercargill, AI marketing Southland, fractional CMO Invercargill, marketing consultant Invercargill NZ, Southland marketing agency',
  openGraph: {
    title: 'AI Marketing Agency Invercargill | Junction Media',
    description: 'Invercargill AI marketing consultant. Fractional CMO for select Southland businesses ready to build AI-native marketing operations that compound over time.',
    url: 'https://www.junctionmedia.ai/invercargill',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/invercargill',
  },
}

export default function InvercargillPage() {
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
          Invercargill &amp; Southland, New Zealand
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          AI Marketing Agency<br />
          <span className="text-gray-500">Invercargill</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          I&apos;m Tom Hall-Taylor â€” an NZ-based AI marketing consultant and fractional CMO.
          I work with select Invercargill and Southland businesses to build marketing
          operations that compound over time â€” built for the region&apos;s agriculture,
          manufacturing, tourism, and growing services sectors.
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
        <h2 className="text-2xl font-bold mb-8">What I Do for Invercargill &amp; Southland Businesses</h2>
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

      {/* Why Invercargill */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Why Southland Businesses Work With Me</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            Southland â€” Murihiku in te reo MÄori â€” is one of New Zealand&apos;s most productive
            regions by any measure that matters. Dairy, sheep, and deer farming underpin one of
            the country&apos;s strongest agricultural economies. Manufacturing is significant,
            anchored by meat processing and a range of light industry. The Port of Bluff is
            New Zealand&apos;s southernmost deep-water port and a meaningful trade gateway. And
            tourism is growing â€” particularly around the spectacular Fiordland, the Catlins
            coast, and Stewart Island â€” drawing visitors who are willing to spend.
          </p>
          <p className="text-gray-600 leading-relaxed">
            These are real businesses with real ambition. What they often lack isn&apos;t
            capability â€” it&apos;s access to senior marketing thinking at a cost that makes
            sense for the Southland market. That&apos;s the gap Junction Media was built to fill.
          </p>
          <p className="text-gray-600 leading-relaxed">
            I work with a maximum of 3â€“5 clients at any time. You get direct access to a
            senior strategist â€” not a junior account manager working 30 accounts at once. And
            because I use AI systems for execution, the cost is a fraction of what a
            traditional agency charges for the same output. For Invercargill businesses
            competing regionally and nationally, that&apos;s a genuine edge.
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
              q: 'Are you based in Invercargill?',
              a: 'I\'m based in Auckland but work with businesses across New Zealand, including Invercargill and the wider Southland region. Most of our work happens remotely via video calls and shared systems â€” geography isn\'t a constraint for modern marketing strategy.'
            },
            {
              q: 'What does an engagement look like?',
              a: 'I work on monthly retainer. We start with a strategy session to understand your business, goals, and current marketing state. From there I build a 90-day roadmap and execute against it â€” with weekly check-ins and full visibility into what\'s happening.'
            },
            {
              q: 'How is this different from a local Invercargill marketing agency?',
              a: 'I work with 3â€“5 clients at a time â€” not 30. You deal directly with me, not an account manager. And because I use AI systems for execution, the cost is lower without compromising on quality. Think fractional CMO with an AI team behind it.'
            },
            {
              q: 'What industries do you work with in Southland?',
              a: 'I work with established businesses across agriculture, manufacturing, professional services, tourism, and ecommerce. The common thread is businesses doing meaningful revenue ($1M+) that are ready to invest in marketing that compounds rather than campaigns that expire.'
            },
            {
              q: 'What\'s the minimum commitment?',
              a: 'I work in 3-month minimum engagements. Marketing compounds over time â€” 30-day sprints don\'t build the systems that actually change a business trajectory.'
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
            I&apos;m selective about who I work with. If you&apos;re an Invercargill or Southland
            business serious about building AI-native marketing that compounds â€” apply below.
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
