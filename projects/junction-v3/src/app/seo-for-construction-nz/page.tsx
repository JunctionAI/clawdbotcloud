import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'SEO for Construction NZ — Get Found When NZ Homeowners Search for Builders | Junction Media',
  description: 'Specialist SEO for NZ construction companies, builders, and tradespeople. Rank locally in Auckland, Wellington, and Christchurch for high-value project searches — and stop relying on referrals alone.',
  keywords: 'seo for construction nz, builder seo nz, construction company seo nz, local seo builder nz, trades seo nz, construction marketing nz, builder marketing auckland',
  openGraph: {
    title: 'SEO for Construction NZ | Junction Media',
    description: 'Local SEO built for NZ construction companies and builders — rank for high-value project searches in your area.',
    url: 'https://www.junctionmedia.ai/seo-for-construction-nz',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/seo-for-construction-nz',
  },
}

const painPoints = [
  {
    title: 'Referrals are unpredictable — SEO creates consistent lead flow',
    desc: 'Most NZ construction businesses are entirely referral-dependent. Referrals are the best quality leads — but they\'re impossible to predict or scale. When your pipeline dries up, there\'s nothing to turn on. SEO creates a consistent lead channel that runs 24/7 and generates enquiries even when you\'re on site and not actively selling.',
  },
  {
    title: 'High-value project searches have low competition in NZ construction',
    desc: 'Keywords like "house builder Auckland", "commercial construction Wellington", "renovation company Christchurch", and "custom home builder NZ" get searched consistently by high-intent buyers — and most NZ construction companies don\'t have the SEO to appear for them. This is an open window that won\'t stay open forever.',
  },
  {
    title: 'Your website is your most undervalued sales asset',
    desc: 'Most NZ construction company websites are digital business cards — a phone number, a list of services, maybe some project photos. They don\'t rank, they don\'t convert, and they don\'t build the trust that a $300,000 build project requires. SEO forces you to build a website that actually works as a sales tool.',
  },
]

const approach = [
  {
    title: 'Local SEO for Construction',
    desc: 'Suburb and region-specific SEO that makes your construction business visible when homeowners in your target area search for builders, renovators, or commercial construction. Google Maps ranking, Google Business Profile optimisation, and local citation building.',
  },
  {
    title: 'Project-Type Keyword Strategy',
    desc: 'Keyword research across your specific services — new builds, renovations, extensions, commercial construction, landscaping — targeting the high-intent searches that indicate a project is imminent. Every keyword mapped to a landing page built to convert.',
  },
  {
    title: 'Portfolio & Social Proof Content',
    desc: 'Case study pages that showcase completed projects with before/after, project scope, and location details. These pages rank for project-type + location queries and build the trust that converts a searcher into an enquiry on a high-value build.',
  },
  {
    title: 'Technical SEO & Site Speed',
    desc: 'Construction websites are often image-heavy and slow. We optimise for core web vitals, mobile performance (most searches happen on mobile), and the technical foundations that underpin strong rankings across Auckland, Wellington, Christchurch, and beyond.',
  },
]

const results = [
  { stat: '3–6mo', label: 'To meaningful local ranking results' },
  { stat: 'High', label: 'Lead value — project-intent searches' },
  { stat: 'Low', label: 'SEO competition in NZ construction' },
  { stat: '100%', label: 'NZ construction market expertise' },
]

const faqs = [
  {
    q: 'Can SEO actually work for a local construction company?',
    a: 'Yes — and it often works better for local construction than for national ecommerce. Local SEO targets people actively searching for builders in your specific area. A homeowner in Remuera searching "renovation builder Auckland" is a highly qualified lead. If your business doesn\'t appear, a competitor who has invested in SEO gets the enquiry.',
  },
  {
    q: 'What if our work area spans multiple NZ cities or regions?',
    a: 'We build multi-location SEO strategies for construction companies that operate across multiple areas. Separate landing pages for Auckland, Wellington, Christchurch, or whatever regions you cover — each optimised for local search in that area. This is often how regional construction companies build a dominant online presence.',
  },
  {
    q: 'Do we need a big website budget to make SEO work?',
    a: 'Not necessarily. We work with what you have and build from there. Sometimes a focused rebuild of key landing pages is more effective than a complete website overhaul. We assess what\'s needed and recommend the minimum viable investment to get results — then build from there as the ROI proves itself.',
  },
]

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Junction Media',
    url: 'https://www.junctionmedia.ai',
    description: 'SEO agency specialising in construction companies and builders across New Zealand.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Auckland',
      addressCountry: 'NZ',
    },
    areaServed: [
      { '@type': 'City', name: 'Auckland' },
      { '@type': 'City', name: 'Wellington' },
      { '@type': 'City', name: 'Christchurch' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.junctionmedia.ai' },
      { '@type': 'ListItem', position: 2, name: 'SEO for Construction NZ', item: 'https://www.junctionmedia.ai/seo-for-construction-nz' },
    ],
  },
]

export default function SeoForConstructionNZ() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Nav */}
      <nav className="px-6 py-5 border-b border-gray-100 flex items-center justify-between max-w-5xl mx-auto">
        <Link href="/" className="font-medium text-gray-900 hover:text-gray-600 transition-colors">
          Junction Media
        </Link>
        <Link href="/apply" className="text-sm bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors">
          Apply to Work With Us
        </Link>
      </nav>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-16">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
          Service + Industry · SEO for Construction NZ
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          SEO for<br />
          <span className="text-gray-500">Construction NZ</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          NZ homeowners and commercial developers search Google before they call a builder. We build
          local SEO strategies for NZ construction companies that get you found when high-value
          project searches happen in your area — Auckland, Wellington, Christchurch, and beyond.
          Stop relying solely on referrals. Build a lead channel that works while you work.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/apply" className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors text-center">
            Apply to Work With Us
          </Link>
          <Link href="/industries/construction-nz" className="inline-block border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:border-gray-500 transition-colors text-center">
            Construction Marketing Overview
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-3xl mx-auto px-6 py-12 border-t border-gray-100">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {results.map((item) => (
            <div key={item.label} className="p-4 border border-gray-100 rounded-2xl text-center">
              <p className="text-2xl font-bold text-gray-900 mb-1">{item.stat}</p>
              <p className="text-xs text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">Why NZ Construction Companies Need SEO in 2026</h2>
        <div className="space-y-6">
          {painPoints.map((item) => (
            <div key={item.title} className="p-6 border border-gray-100 rounded-2xl">
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Approach */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-4">Our Construction SEO Approach</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Construction SEO is primarily local SEO — getting your business found in the suburbs and
          regions where you operate. We build local authority through Google Business Profile,
          location pages, project case studies, and the technical foundations that support strong
          local rankings.
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          {approach.map((item) => (
            <div key={item.title} className="p-6 border border-gray-100 rounded-2xl">
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
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
        <h2 className="text-2xl font-bold mb-6">Related</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { title: 'SEO for Construction NZ — Full Guide', href: '/blog/seo-for-construction-nz' },
            { title: 'Construction Marketing Overview', href: '/industries/construction-nz' },
            { title: 'SEO for Healthcare NZ', href: '/seo-for-healthcare-nz' },
            { title: 'SEO Services NZ', href: '/services/seo-nz' },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="p-4 border border-gray-100 rounded-xl hover:border-gray-300 transition-colors text-sm font-medium text-gray-700 hover:text-gray-900">
              {link.title} →
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 py-20 border-t border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to build a lead channel beyond referrals?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            We work with a small number of NZ construction clients at any one time. Apply to find
            out if we&apos;re a fit.
          </p>
          <Link href="/apply" className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg">
            Apply to Work With Us
          </Link>
          <p className="text-gray-400 text-sm mt-4">NZ construction businesses only.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2026 Junction Media. Auckland, New Zealand.</p>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Home</Link>
            <Link href="/industries" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Industries</Link>
            <Link href="/services" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Services</Link>
            <Link href="/blog" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Blog</Link>
            <Link href="/apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
