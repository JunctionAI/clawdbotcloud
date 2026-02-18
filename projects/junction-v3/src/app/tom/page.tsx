import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Tom Hall-Taylor | AI Marketing Consultant New Zealand',
  description: 'Tom Hall-Taylor is an AI-native marketing consultant based in Auckland, NZ. Founder of Junction Media. He helps businesses build marketing systems that compound — not campaigns that stop.',
  keywords: 'Tom Hall-Taylor, AI marketing consultant NZ, AI marketing consultant New Zealand, Junction Media founder, fractional CMO New Zealand',
  openGraph: {
    title: 'Tom Hall-Taylor | AI Marketing Consultant New Zealand',
    description: 'Tom Hall-Taylor is an AI-native marketing consultant based in Auckland, NZ. Founder of Junction Media.',
    url: 'https://www.junctionmedia.ai/tom',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'profile',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/tom',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Tom Hall-Taylor',
  jobTitle: 'AI Marketing Consultant & Fractional CMO',
  url: 'https://www.junctionmedia.ai/tom',
  worksFor: {
    '@type': 'Organization',
    name: 'Junction Media',
    url: 'https://www.junctionmedia.ai',
  },
  knowsAbout: [
    'AI Marketing',
    'Marketing Strategy',
    'Fractional CMO',
    'SaaS Marketing',
    'E-commerce Marketing',
    'Marketing Systems',
  ],
  sameAs: [
    'https://www.linkedin.com/in/tomhalltaylor',
  ],
}

export default function TomPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Navigation */}
      <nav className="px-6 py-5 border-b border-gray-100 flex items-center justify-between max-w-5xl mx-auto">
        <Link href="/" className="font-medium text-gray-900 hover:text-gray-600 transition-colors">
          Junction Media
        </Link>
        <Link
          href="/apply"
          className="text-sm bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors"
        >
          Work With Me
        </Link>
      </nav>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-16">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
          Auckland, New Zealand
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Tom Hall-Taylor
        </h1>
        <p className="text-xl text-gray-500 font-medium mb-6">
          AI Marketing Consultant & Fractional CMO
        </p>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          I help New Zealand businesses build AI-native marketing operations that compound over
          time. Not campaigns. Not monthly retainers that reset. Systems that keep producing —
          content, leads, revenue — long after the initial build.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/apply"
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

      {/* About / Bio */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Background</h2>
        <div className="space-y-5">
          <p className="text-gray-600 leading-relaxed">
            I&apos;m an ex-founder and marketer who came up through the hard side of building
            businesses — where you have to figure out how to grow with limited budget, small
            teams, and no room for waste. That background shapes everything I do.
          </p>
          <p className="text-gray-600 leading-relaxed">
            I built Junction Media around one conviction: the best marketing in 2025 and beyond
            is AI-native. Not AI-assisted. Not AI-sprinkled. Built from the ground up with AI
            as the operating layer — so you get the output quality of a large team with the
            cost structure of a small one.
          </p>
          <p className="text-gray-600 leading-relaxed">
            I&apos;ve worked across e-commerce, SaaS, professional services, and B2B. The thread
            that connects all of it: I care about systems, not stunts. I want the marketing
            I build to still be producing results 18 months from now — not just next quarter.
          </p>
          <p className="text-gray-600 leading-relaxed">
            I&apos;m based in Auckland and work with clients across New Zealand and occasionally
            internationally. I work with a small number of clients at any one time — typically
            3–5. That means you get my direct attention, not a handoff to a junior.
          </p>
        </div>
      </section>

      {/* What I Do */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">What I Do</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Fractional CMO',
              link: '/services/fractional-cmo',
              desc: 'I embed in your business as senior marketing leadership — owning strategy, channel mix, team coordination, and reporting. No full-time hire required.',
            },
            {
              title: 'AI Marketing Systems',
              link: '/services/ai-marketing-systems',
              desc: 'I design and build the AI-powered infrastructure behind your marketing — content pipelines, ad systems, SEO engines, reporting dashboards.',
            },
            {
              title: 'Growth Strategy',
              link: '/services/',
              desc: 'Clear positioning, channel prioritisation, and 90-day roadmaps. Built around your specific business — not a template from a playbook.',
            },
            {
              title: 'Paid & Organic Channels',
              link: '/services/google-ads-nz',
              desc: 'Google Ads, Meta Ads, SEO, content — I run or oversee all of it depending on your situation. Everything ties back to revenue, not vanity metrics.',
            },
          ].map((item) => (
            <Link
              key={item.title}
              href={item.link ?? '/#apply'}
              className="p-6 border border-gray-100 rounded-2xl hover:border-gray-400 transition-colors block"
            >
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Who I Work With */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Who I Work With</h2>
        <div className="space-y-5">
          <p className="text-gray-600 leading-relaxed">
            I work with New Zealand businesses that are serious about growth and ready to
            invest in building something durable. Typically that means:
          </p>
          <ul className="space-y-3">
            {[
              'E-commerce brands with $1M+ revenue looking to scale',
              'SaaS businesses building pipeline and category authority',
              'Professional services firms wanting to move beyond referrals',
              'Founders who want senior marketing leadership without a full-time hire',
              'Businesses that have tried agencies and want something different',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-gray-600">
                <span className="text-gray-400 mt-1 flex-shrink-0">→</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-gray-600 leading-relaxed pt-2">
            I&apos;m not a fit for every business. I&apos;m selective because the work requires real
            commitment from both sides. If you&apos;re serious, the application process is the
            place to start.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 py-20 border-t border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Let&apos;s talk about your business</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            I take a small number of clients. If you think there&apos;s a fit, apply below —
            I review every application personally.
          </p>
          <Link
            href="/apply"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg"
          >
            Apply to Work With Me
          </Link>
          <p className="text-gray-400 text-sm mt-4">Serious enquiries only. No agencies, please.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2026 Junction Media. Auckland, New Zealand.</p>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Home</Link>
            <Link href="/blog" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Blog</Link>
            <Link href="/apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
