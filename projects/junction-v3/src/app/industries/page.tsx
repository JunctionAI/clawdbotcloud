import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Industries We Serve | AI Marketing Agency NZ | Junction Media',
  description: 'Junction Media serves select NZ industries: ecommerce, real estate, hospitality, professional services, and SaaS. AI-powered marketing tailored to your sector.',
  keywords: 'marketing agency nz industries, ecommerce marketing nz, real estate marketing nz, hospitality marketing nz, professional services marketing nz, saas marketing nz',
  openGraph: {
    title: 'Industries We Serve | AI Marketing Agency NZ | Junction Media',
    description: 'AI-native marketing for ecommerce, real estate, hospitality, professional services, and SaaS companies in NZ.',
    url: 'https://www.junctionmedia.ai/industries',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/industries',
  },
}

const industries = [
  {
    title: 'Ecommerce',
    slug: '/industries/ecommerce-nz',
    tagline: 'More revenue from every channel.',
    description:
      'AI-optimised Google Shopping, Meta Ads, email automation, and SEO for NZ online stores. We helped Deep Blue Health beat their all-time store record by 30% in November 2025.',
    includes: ['Google Shopping & Performance Max', 'Meta Ads + creative testing', 'Klaviyo email flows', 'Ecommerce SEO'],
    cta: 'Learn more →',
    highlight: true,
  },
  {
    title: 'Real Estate',
    slug: '/industries/real-estate-nz',
    tagline: 'More qualified leads. Less wasted time.',
    description:
      'Hyper-local lead generation for NZ property professionals. Vendor lead campaigns, buyer prospecting, and authority content that positions you as the expert in your market.',
    includes: ['Suburb-level Google Ads', 'Meta vendor lead gen', 'Authority content', 'Database re-engagement'],
    cta: 'Learn more →',
    highlight: false,
  },
  {
    title: 'Hospitality & Restaurants',
    slug: '/industries/hospitality-nz',
    tagline: 'Fill covers. Build loyal regulars.',
    description:
      'Marketing for NZ restaurants, cafes, hotels, and tourism operators. Drive direct bookings, reduce third-party platform dependency, and build a customer database you own.',
    includes: ['Google Ads + Maps', 'Meta Ads for bookings', 'Email loyalty campaigns', 'Seasonal campaign planning'],
    cta: 'Learn more →',
    highlight: false,
  },
  {
    title: 'Professional Services',
    slug: '/industries/professional-services-nz',
    tagline: 'Authority that commands premium rates.',
    description:
      'Marketing for NZ law firms, accountants, consultants, and B2B service providers. Build inbound lead pipelines alongside referral networks — so growth isn\'t dependent on word of mouth.',
    includes: ['SEO authority content', 'LinkedIn thought leadership', 'Google Ads (high-intent)', 'Lead nurture email'],
    cta: 'Learn more →',
    highlight: false,
  },
  {
    title: 'SaaS & Tech',
    slug: '/industries/saas-nz',
    tagline: 'Grow MRR. Reduce CAC. Build compounding assets.',
    description:
      'Demand generation for NZ SaaS companies and tech startups. Content-led SEO, LinkedIn B2B, trial nurture sequences, and attribution modelling — built for international scale.',
    includes: ['B2B demand generation', 'LinkedIn Ads', 'Trial-to-paid nurture', 'AI marketing stack'],
    cta: 'Learn more →',
    highlight: false,
  },
]

export default function IndustriesPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className="px-6 py-5 border-b border-gray-100 flex items-center justify-between max-w-5xl mx-auto">
        <Link href="/" className="font-medium text-gray-900 hover:text-gray-600 transition-colors">
          Junction Media
        </Link>
        <Link
          href="/apply"
          className="text-sm bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors"
        >
          Apply to Work With Us
        </Link>
      </nav>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-16">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
          Industries
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Marketing Built for<br />
          <span className="text-gray-500">Your Industry</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          Generic marketing advice doesn&apos;t work. We specialise in five NZ industry verticals
          where we understand the buyers, the sales cycles, the seasonality, and the competitive
          landscape — and we build marketing systems to match.
        </p>
        <p className="text-gray-500 leading-relaxed">
          We work with a maximum of 4–5 clients at any one time. When you work with Junction Media,
          you get the strategic depth of a senior marketing operator who genuinely knows your market.
        </p>
      </section>

      {/* Industries Grid */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-10">The Industries We Serve</h2>
        <div className="space-y-6">
          {industries.map((industry) => (
            <div
              key={industry.title}
              className={`p-8 rounded-2xl border ${
                industry.highlight
                  ? 'border-gray-900 bg-gray-50'
                  : 'border-gray-100'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{industry.title}</h3>
                  <p className="text-sm text-gray-500 font-medium">{industry.tagline}</p>
                </div>
                {industry.highlight && (
                  <span className="inline-block text-xs font-semibold bg-gray-900 text-white px-3 py-1 rounded-full whitespace-nowrap">
                    Case study available
                  </span>
                )}
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">{industry.description}</p>
              <div className="grid grid-cols-2 gap-2 mb-6">
                {industry.includes.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 flex-shrink-0 text-xs">
                      ✓
                    </span>
                    {item}
                  </div>
                ))}
              </div>
              <Link
                href={industry.slug}
                className="inline-block text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors underline underline-offset-4"
              >
                {industry.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Why Specialise */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Why Sector Specialisation Matters</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            Most NZ marketing agencies will work with any business in any industry. They apply
            the same playbooks, the same channel mix, and the same reporting templates regardless
            of whether you&apos;re a law firm or a food truck.
          </p>
          <p className="text-gray-600 leading-relaxed">
            That&apos;s not how we work. Our industry verticals reflect deep operational knowledge —
            we understand ecommerce unit economics, real estate seasonal cycles, hospitality
            margin structures, professional services compliance constraints, and SaaS growth mechanics.
          </p>
          <p className="text-gray-600 leading-relaxed">
            When your marketing partner understands your industry at this depth, you don&apos;t spend
            the first three months educating them. You start building from day one.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 pt-4">
            {[
              { stat: '+30%', label: 'Above store record (Deep Blue Health, Nov 2025)' },
              { stat: '4–5', label: 'Maximum clients at any time' },
              { stat: '5', label: 'Industry verticals with deep expertise' },
            ].map((item) => (
              <div key={item.label} className="p-6 border border-gray-100 rounded-2xl text-center">
                <p className="text-3xl font-bold text-gray-900 mb-2">{item.stat}</p>
                <p className="text-sm text-gray-500">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Cross-link */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Our Services</h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          All industry work draws from the same service stack — tailored to your sector&apos;s
          specific needs and buyer behaviour.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { title: 'AI Marketing Systems', href: '/services/ai-marketing-systems' },
            { title: 'Google Ads NZ', href: '/services/google-ads-nz' },
            { title: 'Meta Ads NZ', href: '/services/meta-ads-nz' },
            { title: 'SEO NZ', href: '/services/seo-nz' },
            { title: 'Email Marketing NZ', href: '/services/email-marketing-nz' },
            { title: 'Fractional CMO NZ', href: '/services/fractional-cmo' },
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
          <h2 className="text-3xl font-bold mb-4">Don&apos;t see your industry?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            We occasionally take on businesses outside our core verticals when the fit is right.
            Apply below and tell us about your business — we&apos;ll let you know within 48 hours
            whether we&apos;re a good match.
          </p>
          <Link
            href="/apply"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg"
          >
            Apply to Work With Us
          </Link>
          <p className="text-gray-400 text-sm mt-4">NZ businesses only. Spots are limited.</p>
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
