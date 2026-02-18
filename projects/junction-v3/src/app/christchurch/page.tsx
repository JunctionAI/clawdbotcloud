import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AI Marketing Consultant Christchurch | Fractional CMO Christchurch | Junction Media',
  description: 'Christchurch AI marketing consultant and fractional CMO. Tom Hall-Taylor works with select Christchurch businesses to build AI-native marketing operations that compound over time. Auckland-based, serving Christchurch and NZ-wide.',
  keywords: 'AI marketing consultant Christchurch, fractional CMO Christchurch, marketing consultant Christchurch, digital marketing Christchurch, AI marketing Christchurch, marketing agency Christchurch, marketing strategist Christchurch, outsourced CMO Christchurch',
  openGraph: {
    title: 'AI Marketing Consultant Christchurch | Tom Hall-Taylor | Junction Media',
    description: 'Christchurch AI marketing consultant. Fractional CMO for select businesses ready to build AI-native marketing operations that compound over time.',
    url: 'https://www.junctionmedia.ai/christchurch',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/christchurch',
  },
}

export default function ChristchurchPage() {
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
          Christchurch, New Zealand
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          AI Marketing Consultant<br />
          <span className="text-gray-500">Christchurch</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          I&apos;m Tom Hall-Taylor — an AI marketing consultant and fractional CMO based in New Zealand. 
          I work with select Christchurch businesses to build marketing operations that compound over time, 
          not campaigns that stop when the budget runs out.
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
        <h2 className="text-2xl font-bold mb-8">What I Do for Christchurch Businesses</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Fractional CMO',
              desc: 'Senior marketing strategy without a full-time hire. I embed in your Christchurch business, own the marketing function, and drive measurable results.'
            },
            {
              title: 'AI Marketing Systems',
              desc: 'Build AI-powered systems for content, ads, SEO, and reporting — so your marketing compounds month over month, not just campaign to campaign.'
            },
            {
              title: 'Paid Advertising',
              desc: 'Meta Ads and Google Ads with AI optimisation. Data-driven strategy, not set-and-forget management.'
            },
            {
              title: 'Growth Strategy',
              desc: 'Clear positioning, channel strategy, and 90-day roadmaps built around your Christchurch business — not a generic playbook.'
            },
          ].map((service) => (
            <div key={service.title} className="p-6 border border-gray-100 rounded-2xl">
              <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Christchurch Context */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Christchurch&apos;s Marketing Moment</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            Christchurch is in a genuinely exciting phase. Post-rebuild momentum, a growing tech 
            sector, a thriving food and hospitality scene, and a manufacturing base that punches 
            above its weight nationally. The city is moving fast — but most businesses&apos; marketing 
            hasn&apos;t kept up with the pace.
          </p>
          <p className="text-gray-600 leading-relaxed">
            The opportunity: Christchurch has a strong local economy and a population that actively 
            supports local businesses. But reaching them consistently — with the right message, 
            at the right time — requires systems, not just social posts and the occasional ad campaign.
          </p>
          <p className="text-gray-600 leading-relaxed">
            I work remotely with Christchurch clients — with weekly video check-ins and full 
            visibility into everything. The best marketing partnerships I&apos;ve had have been remote. 
            Distance doesn&apos;t limit depth of work.
          </p>
        </div>
      </section>

      {/* Cities Grid */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Serving Businesses Across New Zealand</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            { city: 'Auckland', link: '/auckland' },
            { city: 'Wellington', link: '/wellington' },
            { city: 'Christchurch', link: '/christchurch' },
            { city: 'Hamilton', link: '/new-zealand' },
            { city: 'Tauranga', link: '/new-zealand' },
            { city: 'Dunedin', link: '/new-zealand' },
          ].map((item) => (
            <Link
              key={item.city}
              href={item.link}
              className="p-4 border border-gray-100 rounded-xl text-gray-700 text-sm font-medium hover:border-gray-300 transition-colors text-center"
            >
              {item.city}
            </Link>
          ))}
        </div>
        <p className="text-gray-500 text-sm mt-4">
          Based in Auckland. Working with businesses throughout New Zealand and beyond.{' '}
          <Link href="/new-zealand" className="underline hover:text-gray-700">View NZ overview →</Link>
        </p>
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

      {/* Who It's For */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">Who This Is For</h2>
        <div className="space-y-4">
          {[
            'Christchurch businesses spending on marketing without a clear strategic direction',
            'Founders who are doing the marketing themselves and need to hand it off properly',
            'Businesses scaling past $1M who need senior marketing leadership without a full-time hire',
            'Companies that want to use AI seriously — not just as a buzzword',
            'Teams that have tried agencies and found them too expensive and too disconnected',
          ].map((item, i) => (
            <div key={i} className="flex gap-3">
              <span className="text-gray-400 mt-0.5">→</span>
              <p className="text-gray-600">{item}</p>
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
              q: 'Do you work with Christchurch businesses remotely?',
              a: 'Yes — I\'m Auckland-based but work with businesses across New Zealand. All strategy sessions are via video call, and day-to-day work happens asynchronously. The model works well remotely — many of my best client relationships have been entirely digital.'
            },
            {
              q: 'What does an engagement look like?',
              a: 'Monthly retainer, starting with a strategy session to understand your business, goals, and current marketing state. From there I build a 90-day roadmap and execute against it — with weekly check-ins and full transparency into what\'s happening.'
            },
            {
              q: 'How is this different from a Christchurch marketing agency?',
              a: 'Agencies typically serve 20-50+ clients. I work with 3-5 at a time — maximum. You deal directly with me, not an account manager. And because I use AI systems for execution, I can deliver senior-level results at a lower cost than a full-service agency.'
            },
            {
              q: 'What\'s the minimum commitment?',
              a: 'Three months. Marketing that actually works takes time to build and compound. If someone is promising results in 30 days, they\'re selling you something that won\'t last.'
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
            I&apos;m selective about who I work with. If you&apos;re a Christchurch or NZ business serious 
            about building AI-native marketing — apply below.
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
            <Link href="/auckland" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Auckland</Link>
            <Link href="/new-zealand" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">NZ</Link>
            <Link href="/blog" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Blog</Link>
            <Link href="/#apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
