import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Social Media Management NZ — Strategy & Content | Junction Media',
  description: 'Social media management for NZ businesses. Strategy, content creation, and consistent publishing across Instagram, Facebook, and LinkedIn. $800–$3,000/mo.',
  keywords: 'social media management NZ, social media agency NZ, social media marketing Auckland, social media consultant NZ, instagram management NZ, linkedin marketing NZ, social media strategy NZ',
  openGraph: {
    title: 'Social Media Management NZ — Strategy & Content | Junction Media',
    description: 'AI-assisted social media management for NZ businesses. Strategy, content creation, and consistent presence across the channels that matter.',
    url: 'https://www.junctionmedia.ai/services/social-media-nz',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/services/social-media-nz',
  },
}

const whatIsIncluded = [
  {
    title: 'Channel Strategy',
    desc: 'Identifying the right platforms for your audience — not defaulting to all of them. A B2B professional services firm needs LinkedIn more than Instagram. An e-commerce brand needs Instagram more than LinkedIn. Clarity on where to focus and why.',
  },
  {
    title: 'Content Creation & Calendar',
    desc: 'AI-assisted content production: captions, graphics briefs, carousels, and video scripts. A consistent monthly content calendar that reflects your brand voice and business goals — not generic filler content that could belong to anyone.',
  },
  {
    title: 'Publishing & Scheduling',
    desc: 'Content scheduled and published consistently. Optimal timing for NZ audiences. No more "we should post something" with nothing happening. A consistent presence that builds trust and keeps your brand top of mind.',
  },
  {
    title: 'Community Management',
    desc: 'Monitoring comments, DMs, and mentions. Timely responses that build relationships. Escalation of anything requiring your direct input. Your community managed professionally without it consuming your time.',
  },
  {
    title: 'Paid Social Integration',
    desc: 'Organic and paid social working together. Boosting high-performing organic content. Running targeted paid campaigns to warm audiences. The organic content strategy informing what gets paid amplification — not two separate disconnected efforts.',
  },
  {
    title: 'Monthly Reporting',
    desc: 'Follower growth, reach, engagement rate, link clicks, and profile visits — in plain English. What worked this month, what didn\'t, and what we\'re adjusting. No hiding behind vanity metrics or raw impression counts.',
  },
]

const processSteps = [
  {
    phase: 'Week 1–2',
    title: 'Audit & Strategy',
    desc: 'Audit of existing channels — content quality, consistency, engagement rate, audience composition. Competitor analysis. Channel strategy agreed. Brand voice documented. Content pillars defined. Clear picture of what we\'re building toward.',
  },
  {
    phase: 'Week 3–4',
    title: 'Content System Built',
    desc: 'Content calendar for Month 1 built and approved. Templates and visual style established. Scheduling tool set up. First two weeks of content ready to publish. Rhythm begins.',
  },
  {
    phase: 'Month 2',
    title: 'Rhythm & Refinement',
    desc: 'Full posting cadence in place. Early data on what content types perform best. Content mix refined based on results. Community management embedded. Monthly report delivered.',
  },
  {
    phase: 'Month 3+',
    title: 'Compound & Grow',
    desc: 'Content strategy informed by performance data. High-performing formats scaled. Paid amplification introduced where appropriate. Social presence compounding — consistent brands win over time on organic social.',
  },
]

const faqs = [
  {
    q: 'How much does social media management cost in NZ?',
    a: 'Our social media management ranges from $800–$3,000/month NZD. The $800/month tier covers 1–2 platforms, 3–4 posts per week, and monthly reporting — right for businesses that need consistent presence without high volume. The $3,000/month tier covers 3–4 platforms, daily posting, community management, paid social integration, and comprehensive reporting. Ad spend for boosted posts or paid campaigns is extra and paid directly to the platform.',
  },
  {
    q: 'Which social media platforms should NZ businesses focus on?',
    a: 'It depends on your audience: Instagram for consumer brands, lifestyle, food, retail, and anything visually driven. LinkedIn for B2B, professional services, and recruitment. Facebook for local service businesses (still strong in NZ for local audiences). TikTok for brands targeting under-35s with entertaining content. Most businesses should focus on 2 platforms well rather than 5 platforms poorly. We recommend based on where your specific audience actually is — not what\'s trending.',
  },
  {
    q: 'How long does it take to see results from social media management?',
    a: 'Honest answer: 3–6 months for meaningful follower and engagement growth on organic social. The first 30 days establish rhythm and baseline. Months 2–3 show what content resonates. By month 4–6, compound growth begins if the strategy is right. Social media is a long-game channel for organic — if you need faster results, paid social (Meta Ads) can accelerate while organic builds. We\'ll tell you this honestly upfront rather than oversell organic timelines.',
  },
  {
    q: 'Do you create the content or do we need to supply it?',
    a: 'We create the content — copy, graphics briefs, and video scripts. For photography and video footage, we can work with assets you supply (product photos, team photos, in-store footage) or brief a photographer/videographer. We don\'t typically do on-site photography ourselves, but we manage the brief and edit process. The more visual assets you can supply, the better the content quality. We\'ll tell you exactly what we need upfront.',
  },
  {
    q: 'Can you manage paid social (boosting) as well as organic?',
    a: 'Yes — we manage organic and paid social as an integrated strategy. Organic content informs what gets paid amplification. We handle the ad management within our retainer for boosted posts and small-budget awareness campaigns. For full-scale Meta Ads campaigns (lead generation, e-commerce) with larger budgets, that\'s handled under our separate Meta Ads NZ service.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Social Media Management NZ',
  provider: {
    '@type': 'Organization',
    name: 'Junction Media',
    url: 'https://www.junctionmedia.ai',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Auckland',
      addressCountry: 'NZ',
    },
  },
  description: 'AI-assisted social media management for NZ businesses. Strategy, content creation, and consistent presence across Instagram, Facebook, and LinkedIn.',
  areaServed: { '@type': 'Country', name: 'New Zealand' },
  offers: {
    '@type': 'Offer',
    priceSpecification: {
      '@type': 'PriceSpecification',
      minPrice: '800',
      maxPrice: '3000',
      priceCurrency: 'NZD',
      unitText: 'month',
    },
  },
}

export default function SocialMediaNZPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
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
          Apply to Work With Me
        </Link>
      </nav>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-16">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
          Service · Social Media NZ
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Social Media That<br />
          <span className="text-gray-500">Actually Builds Brands</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          AI-assisted social media management for NZ businesses. Strategy, content creation, and
          consistent publishing on the platforms that matter — so your brand shows up, builds trust,
          and converts followers into customers over time.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/apply"
            className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors text-center"
          >
            Apply to Work With Me
          </Link>
          <Link
            href="/services"
            className="inline-block border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:border-gray-500 transition-colors text-center"
          >
            View All Services
          </Link>
        </div>
      </section>

      {/* Key Numbers */}
      <section className="max-w-3xl mx-auto px-6 py-12 border-t border-gray-100">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { stat: '$800–$3k', label: 'Per month NZD' },
            { stat: '3-month', label: 'Minimum term' },
            { stat: '2–4', label: 'Platforms managed' },
            { stat: 'Daily', label: 'Publishing cadence (Scale tier)' },
          ].map((item) => (
            <div key={item.label} className="p-4 border border-gray-100 rounded-2xl text-center">
              <p className="text-2xl font-bold text-gray-900 mb-1">{item.stat}</p>
              <p className="text-xs text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why It Fails */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Why Most NZ Social Media Management Fails</h2>
        <div className="space-y-4 mb-8">
          <p className="text-gray-600 leading-relaxed">
            Most NZ businesses either neglect social media entirely (posting once a month when they
            remember) or hand it to a junior staff member or offshore virtual assistant with no
            strategic brief. The result is inconsistent, off-brand, low-engagement content that
            doesn&apos;t build anything meaningful.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Social media management done well is a compound channel. Consistent brands win. Consistent
            posting builds algorithm favour. Consistent engagement builds audience trust. The problem
            isn&apos;t that social media doesn&apos;t work for NZ businesses — it&apos;s that consistency is hard
            without a system.
          </p>
        </div>
        <div className="space-y-4">
          {[
            {
              num: '01',
              title: 'Strategy Before Content',
              desc: 'Too many businesses start with "let\'s post more" without asking why. Which platforms? What audience? What content pillars? What does success look like? We define this first — so every post is building toward something, not just filling the calendar.',
            },
            {
              num: '02',
              title: 'AI-Assisted Content at Scale',
              desc: 'AI lets us produce more content, faster — without sacrificing quality or brand voice. More posts, more formats, more creative angles tested. The algorithm rewards consistency; AI makes consistency sustainable at a cost that makes business sense.',
            },
            {
              num: '03',
              title: 'Organic + Paid Working Together',
              desc: 'Organic social builds long-term trust and brand equity. Paid social amplifies what\'s working and accelerates growth. When they\'re managed together, organic content informs paid strategy and vice versa — not two disconnected efforts with separate briefs and separate reporting.',
            },
          ].map((pillar) => (
            <div key={pillar.num} className="border border-gray-100 rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-4">
                <span className="text-4xl font-black text-gray-100 leading-none">{pillar.num}</span>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{pillar.title}</h3>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-gray-500 text-sm mt-6">
          Related:{' '}
          <Link href="/blog/social-media-strategy-nz" className="underline hover:text-gray-700 transition-colors">
            Social Media Marketing NZ: What Actually Works in 2026 →
          </Link>
        </p>
      </section>

      {/* What's Included */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">What&apos;s Included</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {whatIsIncluded.map((item) => (
            <div key={item.title} className="p-6 border border-gray-100 rounded-2xl">
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">How It Works</h2>
        <div className="space-y-6">
          {processSteps.map((step, i) => (
            <div key={step.phase} className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {i + 1}
                </div>
                {i < processSteps.length - 1 && (
                  <div className="w-px flex-1 bg-gray-100 mt-2" />
                )}
              </div>
              <div className="pb-8">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{step.phase}</p>
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Pricing</h2>
        <div className="bg-gray-50 rounded-2xl p-8">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-4xl font-bold text-gray-900">$800–$3,000</span>
            <span className="text-gray-500">/month NZD</span>
          </div>
          <p className="text-gray-600 leading-relaxed mb-6">
            Includes strategy, content creation, scheduling, and monthly reporting. Ad spend for
            paid social is extra and paid directly to platforms. 3-month minimum engagement.
          </p>
          <div className="space-y-3 mb-8">
            {[
              { label: 'Starter (1–2 platforms, 3–4 posts/week + community management)', cost: '$800/mo' },
              { label: 'Growth (2–3 platforms, 5–6 posts/week + paid social integration)', cost: '$1,800/mo' },
              { label: 'Scale (3–4 platforms, daily posting + full paid social management)', cost: '$3,000/mo' },
            ].map((row) => (
              <div
                key={row.label}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-3 border-b border-gray-200 last:border-0 text-gray-700"
              >
                <span className="text-sm">{row.label}</span>
                <span className="text-sm font-semibold">{row.cost}</span>
              </div>
            ))}
          </div>
          <Link
            href="/apply"
            className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors"
          >
            Apply Now
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">Common Questions</h2>
        <div className="space-y-8">
          {faqs.map((faq) => (
            <div key={faq.q}>
              <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Further Reading</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { title: 'Social Media Marketing NZ: What Actually Works in 2026', href: '/blog/social-media-strategy-nz' },
            { title: 'Meta Ads NZ', href: '/services/meta-ads-nz' },
            { title: 'Content Marketing NZ', href: '/services/content-marketing-nz' },
            { title: 'View All Services', href: '/services' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="p-4 border border-gray-100 rounded-xl hover:border-gray-300 transition-colors text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              {link.title} →
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 py-20 border-t border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to build a social media presence that converts?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            If you&apos;re serious about turning social media into a consistent, compounding brand asset for
            your NZ business — apply below. I review applications and respond within 48 hours.
          </p>
          <Link
            href="/apply"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg"
          >
            Apply to Work With Me
          </Link>
          <p className="text-gray-400 text-sm mt-4">NZ businesses only. Serious enquiries only.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2026 Junction Media. Auckland, New Zealand.</p>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Home</Link>
            <Link href="/services" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Services</Link>
            <Link href="/blog" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Blog</Link>
            <Link href="/apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
