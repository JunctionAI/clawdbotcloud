import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Services | AI Marketing Consultant NZ | Junction Media',
  description: 'AI-native marketing services for select NZ businesses. Fractional CMO, AI marketing systems, content & SEO, and paid media — all unified under one strategic operator.',
  keywords: 'AI marketing services NZ, fractional CMO NZ, AI marketing systems NZ, marketing consultant NZ, digital marketing NZ, Junction Media services',
  openGraph: {
    title: 'Services | AI Marketing Consultant NZ | Tom Hall-Taylor',
    description: 'Fractional CMO, AI marketing systems, content & SEO, and paid media. By application only.',
    url: 'https://www.junctionmedia.ai/services',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/services',
  },
}

const services = [
  {
    title: 'Fractional CMO',
    slug: '/services/fractional-cmo',
    tagline: 'Senior marketing leadership, without the full-time overhead.',
    description:
      'Embedded marketing strategy and execution for NZ businesses that have outgrown ad-hoc marketing but aren\'t ready for a $200k CMO. Tom works with a maximum of 4–5 clients at any time.',
    includes: ['90-day growth roadmap', 'Weekly check-ins', 'Full channel ownership', 'Direct access to Tom'],
    cta: 'Learn more →',
    highlight: true,
  },
  {
    title: 'AI Marketing Systems',
    slug: '/services/ai-marketing-systems',
    tagline: 'Marketing that runs, compounds, and learns.',
    description:
      'Five core AI systems that replace the output of a large agency team — content engine, paid media optimisation, customer intelligence, competitive monitoring, and reporting. Built for your business, not off-the-shelf.',
    includes: ['AI content pipeline', 'Paid media agents', 'Customer intelligence', 'Automated reporting'],
    cta: 'Learn more →',
    highlight: false,
  },
  {
    title: 'Content & SEO',
    slug: '/blog',
    tagline: 'Content that ranks and converts — built at scale.',
    description:
      'AI-native content production combined with technical SEO. Not keyword-stuffed filler — strategic content that builds genuine authority in your market. Published consistently, without you touching a keyboard.',
    includes: ['SEO strategy', 'AI content production', 'Technical SEO', 'Internal linking architecture'],
    cta: 'Read the blog →',
    highlight: false,
  },
  {
    title: 'Paid Media',
    slug: '/#apply',
    tagline: 'Meta Ads and Google Ads, run with AI precision.',
    description:
      'Paid advertising managed with AI optimisation layers. Creative testing at scale, audience intelligence, automated budget allocation. Data-driven from day one — not set-and-forget.',
    includes: ['Meta Ads (Facebook/Instagram)', 'Google Ads', 'AI creative testing', 'Weekly performance reports'],
    cta: 'Apply to work together →',
    highlight: false,
  },
  {
    title: 'Google Ads NZ',
    slug: '/services/google-ads-nz',
    tagline: 'AI-optimised Google Ads campaigns that actually convert.',
    description:
      'Google Ads management for NZ businesses with AI-driven continuous optimisation. From account audit to launch to ongoing improvement — no lock-in contracts after 3 months. You own your account, always.',
    includes: ['Full account audit', 'Campaign build & launch', 'Weekly optimisation', 'Transparent reporting'],
    cta: 'Learn more →',
    highlight: false,
  },
  {
    title: 'SEO NZ',
    slug: '/services/seo-nz',
    tagline: 'AI-powered SEO that compounds over time.',
    description:
      'AI-native SEO for NZ businesses — technical foundation, content strategy, and authority building working together. Organic traffic that grows every month and keeps delivering after the work is done.',
    includes: ['Technical SEO audit', 'AI content production', 'Authority building', 'Monthly reporting'],
    cta: 'Learn more →',
    highlight: false,
  },
  {
    title: 'Content Marketing NZ',
    slug: '/services/content-marketing-nz',
    tagline: 'Content that ranks, converts, and compounds.',
    description:
      'AI-assisted content strategy and production for NZ businesses. Consistent publishing, proper SEO structure, and distribution — without you touching a keyboard. From $1,000/month.',
    includes: ['Content strategy', 'AI-assisted production', 'SEO optimisation', 'Content distribution'],
    cta: 'Learn more →',
    highlight: false,
  },
]

export default function ServicesPage() {
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
          Services
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          What I Build<br />
          <span className="text-gray-500">for NZ Businesses</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          I&apos;m Tom Hall-Taylor — an AI-native marketing consultant based in Auckland.
          I work with select NZ businesses to build marketing operations that compound over time,
          not campaigns that stop when the budget runs out.
        </p>
        <p className="text-gray-500 leading-relaxed">
          All work is done by application. I take a maximum of 4–5 clients at any one time.
          That cap is intentional — it&apos;s how I give each business the focus that actually moves the needle.
        </p>
      </section>

      {/* Services Grid */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-10">The Services</h2>
        <div className="space-y-6">
          {services.map((service) => (
            <div
              key={service.title}
              className={`p-8 rounded-2xl border ${
                service.highlight
                  ? 'border-gray-900 bg-gray-50'
                  : 'border-gray-100'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{service.title}</h3>
                  <p className="text-sm text-gray-500 font-medium">{service.tagline}</p>
                </div>
                {service.highlight && (
                  <span className="inline-block text-xs font-semibold bg-gray-900 text-white px-3 py-1 rounded-full whitespace-nowrap">
                    Most popular
                  </span>
                )}
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
              <div className="grid grid-cols-2 gap-2 mb-6">
                {service.includes.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 flex-shrink-0">
                      ✓
                    </span>
                    {item}
                  </div>
                ))}
              </div>
              <Link
                href={service.slug}
                className="inline-block text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors underline underline-offset-4"
              >
                {service.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* The Model */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">How I Work</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            Traditional agencies serve 30+ clients and rotate junior staff through your account.
            You pay senior rates and get junior execution.
          </p>
          <p className="text-gray-600 leading-relaxed">
            I built Junction Media differently. I work with a maximum of 4–5 clients at any one time.
            You deal directly with me — not an account manager. And because I use AI systems for execution,
            I deliver what a 10-person agency delivers, at a fraction of the cost.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 pt-4">
            {[
              { stat: '4–5', label: 'Clients maximum at any time' },
              { stat: '3-month', label: 'Minimum engagement' },
              { stat: '+30%', label: 'Revenue above store record (Deep Blue Health, Nov 2025)' },
            ].map((item) => (
              <div key={item.label} className="p-6 border border-gray-100 rounded-2xl text-center">
                <p className="text-3xl font-bold text-gray-900 mb-2">{item.stat}</p>
                <p className="text-sm text-gray-500">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 py-20 border-t border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to apply?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            Spots are limited. If you&apos;re an NZ business serious about building AI-native marketing
            that compounds — apply below and I&apos;ll review your application within 48 hours.
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
