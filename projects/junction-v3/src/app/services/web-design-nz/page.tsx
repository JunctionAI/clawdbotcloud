import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Web Design NZ — Conversion-Focused Websites | Junction Media',
  description: 'Web design and development for NZ businesses. Conversion-focused design built on Next.js or Webflow. Mobile-optimised, fast, and built to generate leads. From $3,000 one-off or included in partnership.',
  keywords: 'web design nz, web design auckland, website design new zealand, conversion focused web design nz, nextjs website nz, webflow nz, website developer nz',
  openGraph: {
    title: 'Web Design NZ — Conversion-Focused Websites | Junction Media',
    description: 'Conversion-focused web design for NZ businesses. Built on Next.js or Webflow. Fast, mobile-optimised, and designed to turn visitors into leads.',
    url: 'https://www.junctionmedia.ai/services/web-design-nz',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/services/web-design-nz',
  },
}

const whatIsIncluded = [
  {
    title: 'Conversion-First Strategy',
    desc: 'Before a pixel is designed, we map your customer journey — who arrives, what they need to see, and what action you want them to take. Every design decision flows from that. You get a website built to convert, not just impress.',
  },
  {
    title: 'Next.js or Webflow Build',
    desc: 'We build on Next.js for clients who need performance and flexibility, or Webflow for businesses that want easy content management without code. Both deliver fast, production-grade websites — we recommend the right tool for your situation.',
  },
  {
    title: 'Mobile-First Design',
    desc: 'Over 65% of NZ web traffic is mobile. Every design is built mobile-first, tested across devices, and optimised for touch. Not responsive as an afterthought — mobile is the primary design context.',
  },
  {
    title: 'Core Web Vitals Optimised',
    desc: 'Page speed is a ranking factor and a conversion factor. We build with performance in mind: optimised images, minimal JavaScript, proper caching, and Core Web Vitals scores that support your SEO as well as your user experience.',
  },
  {
    title: 'SEO Foundation Built In',
    desc: 'Technical SEO is baked in from the start — proper heading structure, meta tags, Open Graph, schema markup, XML sitemap, robots.txt, and clean URL structure. You\'ll have a solid foundation to build organic traffic from day one.',
  },
  {
    title: 'Copy & Content Direction',
    desc: 'Most web design agencies leave you to figure out the copy yourself. We provide copy direction and can write conversion-focused copy for key pages using AI-assisted production and human editorial review. Words convert. Design supports them.',
  },
]

const processSteps = [
  {
    phase: 'Week 1',
    title: 'Discovery & Strategy',
    desc: 'Deep dive into your business, target customer, and current website performance. We map your customer journey, define conversion goals, and produce a sitemap and wireframe structure. You approve the strategy before any design begins.',
  },
  {
    phase: 'Week 2–3',
    title: 'Design',
    desc: 'High-fidelity mockups for all key pages — homepage, service/product pages, about, contact. Two rounds of revisions included. We present designs with conversion rationale: not just "this looks good" but "this is why it will perform".',
  },
  {
    phase: 'Week 3–4',
    title: 'Build',
    desc: 'Mockups translated into code (Next.js) or a Webflow project. All pages built, content populated, animations and interactions added. Performance optimisation run. Cross-browser and cross-device testing completed.',
  },
  {
    phase: 'Week 5',
    title: 'Launch',
    desc: 'Domain connection, SSL setup, DNS configuration, final QA. GA4 analytics installed and verified. Any redirect mapping from old URLs completed. Launch with monitoring in place. Post-launch support for 2 weeks included.',
  },
]

const faqs = [
  {
    q: 'How much does web design cost with Junction Media?',
    a: 'Web design projects start from $3,000 NZD for a simple 3–5 page site (homepage, about, services, contact). Mid-complexity sites (8–15 pages with custom functionality) typically range $5,000–$8,000. Larger or e-commerce projects are quoted individually. For clients on our full marketing partnership ($10,000/month), web design is often included as part of the engagement.',
  },
  {
    q: 'Next.js or Webflow — which is right for me?',
    a: 'Next.js is ideal if you need maximum performance, want to build in blog functionality or dynamic content, or expect to grow features over time. It requires developer access to update the codebase. Webflow is ideal if your team wants to update content independently without touching code — it has a visual editor and is excellent for marketing sites. We\'ll recommend the right tool after understanding your situation.',
  },
  {
    q: 'Do you redesign existing websites or only build new ones?',
    a: 'Both. Redesigns are actually more common — most clients have an existing site that isn\'t converting well. We audit what\'s there, identify what\'s costing you conversions, and redesign with specific improvements in mind. Starting fresh is also an option if the existing site has fundamental structural problems.',
  },
  {
    q: 'How long does a website project take?',
    a: 'Typical timeline is 4–5 weeks from strategy kick-off to launch. This can be faster for simpler projects (2–3 weeks) or longer for large, complex sites. Timeline depends on: scope, how quickly you can provide feedback and approvals, and content availability. We\'ll give you a specific timeline in the proposal.',
  },
  {
    q: 'Will my website rank on Google?',
    a: 'Your website will have the technical SEO foundation to rank — proper structure, schema, sitemaps, and performance. But ranking for competitive keywords requires ongoing SEO work (content, backlinks, authority building) beyond the website build. If you want ongoing SEO, we offer that as a separate service or as part of a full partnership.',
  },
  {
    q: 'Do you handle hosting?',
    a: 'For Next.js builds, we deploy to Vercel, which handles hosting and CDN — we set this up as part of the project and provide guidance on the ongoing cost (typically $20–$30/month NZD). For Webflow builds, Webflow\'s own hosting is used (their plans). We don\'t retain control of your hosting — it\'s always in your name.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.a,
    },
  })),
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Web Design NZ',
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
  description: 'Conversion-focused web design and development for NZ businesses. Built on Next.js or Webflow with mobile optimisation, Core Web Vitals performance, and SEO foundations built in.',
  areaServed: { '@type': 'Country', name: 'New Zealand' },
  offers: {
    '@type': 'Offer',
    priceSpecification: {
      '@type': 'PriceSpecification',
      minPrice: '3000',
      maxPrice: '8000',
      priceCurrency: 'NZD',
    },
  },
}

export default function WebDesignNZPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
          Service · Web Design NZ
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Websites Built to<br />
          <span className="text-gray-500">Convert, Not Just Impress</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          Conversion-focused web design for NZ businesses. Built on Next.js or Webflow.
          Fast, mobile-optimised, and designed from the ground up to turn visitors into leads.
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
            { stat: 'From $3k', label: 'One-off project NZD' },
            { stat: '4–5 wks', label: 'Typical delivery' },
            { stat: 'Next.js', label: 'or Webflow' },
            { stat: '100%', label: 'Mobile-first' },
          ].map((item) => (
            <div key={item.label} className="p-4 border border-gray-100 rounded-2xl text-center">
              <p className="text-2xl font-bold text-gray-900 mb-1">{item.stat}</p>
              <p className="text-xs text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Most NZ Websites Don't Convert */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Why Most NZ Business Websites Don&apos;t Convert</h2>
        <div className="space-y-4 mb-8">
          <p className="text-gray-600 leading-relaxed">
            Most NZ businesses have a website that looks acceptable but converts poorly. The problem
            isn&apos;t usually aesthetics — it&apos;s that the site was built by someone who prioritised
            visual polish over conversion architecture.
          </p>
          <p className="text-gray-600 leading-relaxed">
            A slow load time on mobile. A hero section that says &ldquo;Welcome to our website&rdquo;
            instead of articulating what you do and for whom. No clear primary call-to-action. Copy
            written from the business&apos;s perspective instead of the customer&apos;s.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We build websites with conversion as the primary brief. Every structural and design
            decision is made in service of getting the right visitors to take the right action.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-6 border border-gray-100 rounded-2xl">
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Typical NZ website</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Built to look good in a desktop screenshot</li>
              <li>• Slow on mobile — 4s+ load time</li>
              <li>• Generic copy, no clear value proposition</li>
              <li>• No conversion tracking or analytics</li>
            </ul>
          </div>
          <div className="p-6 border border-gray-900 rounded-2xl bg-gray-50">
            <p className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Junction Media build</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Built mobile-first, every screen tested</li>
              <li>• Sub-2s load time, Core Web Vitals passing</li>
              <li>• Clear value prop, customer-focused copy</li>
              <li>• GA4 + conversion tracking from day one</li>
            </ul>
          </div>
        </div>
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
            <span className="text-4xl font-bold text-gray-900">$3,000–$8,000</span>
            <span className="text-gray-500">NZD one-off</span>
          </div>
          <p className="text-gray-600 leading-relaxed mb-6">
            Project pricing covers: strategy and discovery, full design (all key pages, 2 revision rounds),
            build on Next.js or Webflow, copy direction, GA4 setup, domain and launch configuration,
            and 2 weeks post-launch support. Ad spend and ongoing hosting are separate.
          </p>
          <div className="space-y-3 mb-8">
            {[
              { label: 'Starter — 3–5 pages, Next.js or Webflow', cost: 'From $3,000' },
              { label: 'Growth — 6–12 pages, custom sections', cost: '$4,500–$6,000' },
              { label: 'Full site — 12+ pages, blog, complex structure', cost: '$6,000–$8,000' },
              { label: 'Full partnership — included in $10k/mo retainer', cost: 'Included' },
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
        <h2 className="text-2xl font-bold mb-6">Related Services</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { title: 'SEO NZ — Rank Your New Site', href: '/services/seo-nz' },
            { title: 'Google Ads NZ — Drive Traffic Fast', href: '/services/google-ads-nz' },
            { title: 'Fractional CMO — Full Marketing Leadership', href: '/services/fractional-cmo' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to build a site that converts?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            If your current website isn&apos;t generating leads — or you&apos;re starting from scratch and
            want to do it properly — apply below. Projects reviewed within 48 hours.
          </p>
          <Link
            href="/apply"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg"
          >
            Apply to Work With Me
          </Link>
          <p className="text-gray-400 text-sm mt-4">NZ businesses only. Response within 48 hours.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Junction Media. Auckland, New Zealand.</p>
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
