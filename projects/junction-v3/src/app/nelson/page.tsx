import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AI Marketing Agency Nelson | Junction Media',
  description: 'Nelson AI marketing consultant and fractional CMO. Tom Hall-Taylor works with select Nelson businesses in wine, horticulture, arts, and tourism to build AI-native marketing that compounds.',
  keywords: 'marketing agency Nelson, digital marketing Nelson NZ, AI marketing Marlborough, fractional CMO Nelson, marketing consultant Nelson NZ, Nelson Bays marketing',
  openGraph: {
    title: 'AI Marketing Agency Nelson | Junction Media',
    description: 'Nelson AI marketing consultant. Fractional CMO for select Top of South Island businesses ready to build AI-native marketing operations that compound over time.',
    url: 'https://www.junctionmedia.ai/nelson',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/nelson',
  },
}

export default function NelsonPage() {
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
          Nelson &amp; Top of the South, New Zealand
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          AI-Native Marketing in<br />
          <span className="text-gray-500">Nelson &amp; the Top of the South</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          I&apos;m Tom Hall-Taylor — an NZ-based AI marketing consultant and fractional CMO.
          I work with select Nelson and Top of the South businesses to build marketing
          operations that compound over time — designed for the region&apos;s wine, horticulture,
          arts, and tourism sectors.
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
        <h2 className="text-2xl font-bold mb-8">What I Do for Nelson Businesses</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Fractional CMO',
              desc: 'Senior marketing strategy without a full-time hire. I embed in your business, own the marketing function, and drive results.'
            },
            {
              title: 'AI Marketing Systems',
              desc: 'Build AI-powered systems that handle content, ads, SEO, and reporting at scale — so you compound, not just campaign.'
            },
            {
              title: 'Paid Advertising',
              desc: 'Meta Ads and Google Ads managed with AI optimisation. Data-driven, not set-and-forget.'
            },
            {
              title: 'Growth Strategy',
              desc: 'Clear positioning, channel strategy, and 90-day roadmaps built around your business — not a cookie-cutter playbook.'
            },
          ].map((service) => (
            <div key={service.title} className="p-6 border border-gray-100 rounded-2xl">
              <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Nelson */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Why Nelson Businesses Work With Me</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            Nelson sits at the top of the South Island with one of the sunniest climates in 
            New Zealand and an economy that reflects it. Wine and horticulture — including 
            the apple and hop industries — form the agricultural backbone. A thriving arts 
            and craft community draws visitors and builds the city&apos;s distinctive identity. 
            And the Waimea Estuary, National Park proximity, and outdoor lifestyle underpin 
            a growing tourism sector. These industries have real marketing needs and real 
            growth potential.
          </p>
          <p className="text-gray-600 leading-relaxed">
            I built Junction Media to serve exactly this type of market. I work with a maximum 
            of 3–5 clients at any time — so you get direct access to senior strategy, not a 
            junior account manager somewhere in a large agency. The cap is intentional. It&apos;s 
            how I give each business the attention and depth that actually moves the needle.
          </p>
          <p className="text-gray-600 leading-relaxed">
            By using AI systems for execution — content production, ad management, performance 
            reporting — I deliver what a 10-person agency would charge you significantly more 
            for. For Nelson businesses competing for both local and domestic tourist audiences, 
            that&apos;s a meaningful advantage.
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
            Deep Blue Health — a New Zealand supplement brand — hit their best revenue month ever
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
              q: 'Are you based in Nelson?',
              a: 'I\'m based in Auckland but work with businesses across New Zealand, including Nelson and the wider Top of the South region. Most of our work happens remotely via video calls and shared systems — location isn\'t a constraint for modern marketing strategy.'
            },
            {
              q: 'What does an engagement look like?',
              a: 'I work on monthly retainer. We start with a strategy session to understand your business, goals, and current marketing state. From there I build a 90-day roadmap and we execute against it — with weekly check-ins and full visibility into what\'s happening.'
            },
            {
              q: 'How is this different from a Nelson marketing agency?',
              a: 'I work with 3–5 clients at a time — not 30. You deal directly with me, not an account manager. And because I use AI systems for execution, the cost is lower without compromising quality. Think fractional CMO with an AI team behind it.'
            },
            {
              q: 'What\'s the minimum commitment?',
              a: 'I work in 3-month minimum engagements. Marketing compounds over time — 30-day sprints don\'t build the systems that actually change a business.'
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
            I&apos;m selective about who I work with. If you&apos;re a Nelson or Top of the South business
            serious about building AI-native marketing that compounds — apply below.
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
