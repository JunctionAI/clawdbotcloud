import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Google Ads for Healthcare NZ — Patient Acquisition That Fills Your Books | Junction Media',
  description: 'Specialist Google Ads management for NZ healthcare providers, clinics, and practitioners. Compliant, high-converting campaigns that attract new patients across Auckland, Wellington, and Christchurch.',
  keywords: 'google ads for healthcare nz, healthcare google ads nz, medical clinic google ads nz, patient acquisition nz, healthcare ppc nz, google ads clinic nz',
  openGraph: {
    title: 'Google Ads for Healthcare NZ | Junction Media',
    description: 'Compliant Google Ads campaigns that fill appointment books for NZ healthcare providers and clinics.',
    url: 'https://www.junctionmedia.ai/google-ads-for-healthcare-nz',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/google-ads-for-healthcare-nz',
  },
}

const painPoints = [
  {
    title: 'Healthcare Google Ads require compliance expertise most agencies lack',
    desc: 'Google\'s healthcare advertising policies are strict and constantly updated. Ads for medical services in NZ must comply with both Google\'s policies and NZ advertising standards — including restrictions on before/after imagery, claims language, and certain medical services. Generic agencies burn budget on disapproved ads and policy violations. We know the rules.',
  },
  {
    title: 'Patient search intent varies dramatically by service type',
    desc: 'Someone searching "emergency dentist Auckland" has completely different intent to someone searching "Invisalign cost NZ". The bidding strategy, ad copy, landing page, and conversion tracking for each must be built separately. Lumping all your services into one campaign is how healthcare practices waste 40–60% of their ad spend.',
  },
  {
    title: 'Most NZ healthcare providers rely on referrals — until they don\'t',
    desc: 'Referral networks are slow to build and impossible to predict. Google Ads for healthcare creates a predictable, scalable patient acquisition channel that you control. When you need to fill appointment gaps, you can increase spend. When you\'re at capacity, you can pause. No other channel gives you that level of control.',
  },
]

const approach = [
  {
    title: 'Compliant Campaign Architecture',
    desc: 'Healthcare-specific campaign structure that respects Google\'s medical advertising policies and NZ Advertising Standards. We\'ve built compliant campaigns for GPs, specialists, dentists, physios, mental health providers, and allied health across NZ.',
  },
  {
    title: 'Service-Specific Ad Groups',
    desc: 'Separate campaigns for each service type — general consultations, specific treatments, specialist referrals — with tailored keywords, ad copy, and landing pages. No more one-size-fits-all campaigns that waste spend on irrelevant searches.',
  },
  {
    title: 'Local Patient Targeting',
    desc: 'Geo-targeting built around your clinic\'s catchment area — whether that\'s a suburb in Auckland, a region in Wellington, or a catchment across greater Christchurch. We target patients within realistic travel distance, not the entire country.',
  },
  {
    title: 'Appointment Conversion Tracking',
    desc: 'Track actual appointment bookings, not just clicks and calls. Integration with your booking system (or call tracking where online booking isn\'t available) so you know exactly which keywords and ads are filling your calendar.',
  },
]

const results = [
  { stat: '30–60%', label: 'Typical reduction in cost-per-new-patient' },
  { stat: '100%', label: 'Policy-compliant from day one' },
  { stat: '2 weeks', label: 'To first optimised campaign live' },
  { stat: 'NZ-wide', label: 'Healthcare sector experience' },
]

const faqs = [
  {
    q: 'Are there restrictions on healthcare Google Ads in NZ?',
    a: 'Yes. Google has specific policies around medical and healthcare advertising — restrictions on certain prescription medications, requirements around personalised advertising for sensitive health categories, and ad approval processes for certain medical services. We know these policies well and build campaigns that comply from the start, avoiding the costly account suspensions that catch out less-experienced agencies.',
  },
  {
    q: 'What types of healthcare providers do you work with?',
    a: 'We work with GPs, dental practices, physiotherapy clinics, specialist medical practices, mental health providers, optometrists, cosmetic clinics, and allied health providers across Auckland, Wellington, Christchurch, and other NZ cities. Each sector has different keyword landscapes and compliance requirements, and we build accordingly.',
  },
  {
    q: 'How quickly can Google Ads fill our appointment books?',
    a: 'New campaigns typically start generating appointment enquiries within the first week. Meaningful volume and cost efficiency usually takes 4–8 weeks as the campaign optimises. Most NZ healthcare providers we work with see their cost-per-new-patient reduce by 30–60% compared to what they were spending before with unmanaged or poorly managed accounts.',
  },
]

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Junction Media',
    url: 'https://www.junctionmedia.ai',
    description: 'Google Ads agency specialising in healthcare patient acquisition across New Zealand.',
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
      { '@type': 'ListItem', position: 2, name: 'Google Ads for Healthcare NZ', item: 'https://www.junctionmedia.ai/google-ads-for-healthcare-nz' },
    ],
  },
]

export default function GoogleAdsForHealthcareNZ() {
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
          Service + Industry · Google Ads for Healthcare NZ
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Google Ads for<br />
          <span className="text-gray-500">Healthcare NZ</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          When NZ patients need a healthcare provider, they search Google first. We run compliant,
          high-converting Google Ads campaigns for NZ clinics and practitioners — filling appointment
          books with genuine patients, not just clicks. Serving healthcare providers across Auckland,
          Wellington, Christchurch, and throughout New Zealand.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/apply" className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors text-center">
            Apply to Work With Us
          </Link>
          <Link href="/industries/healthcare-nz" className="inline-block border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:border-gray-500 transition-colors text-center">
            Healthcare Marketing Overview
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
        <h2 className="text-2xl font-bold mb-8">Why Healthcare Google Ads Require Specialist Management</h2>
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
        <h2 className="text-2xl font-bold mb-4">Our Healthcare Google Ads Approach</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          We don&apos;t treat healthcare like retail. Patient acquisition requires understanding the
          patient journey, the compliance constraints, and the trust signals that convert searchers
          into booked appointments — not just clicks.
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
            { title: 'Google Ads for Healthcare NZ — Full Guide', href: '/blog/google-ads-for-healthcare-nz' },
            { title: 'Healthcare Marketing Overview', href: '/industries/healthcare-nz' },
            { title: 'SEO for Healthcare NZ', href: '/seo-for-healthcare-nz' },
            { title: 'Google Ads Services NZ', href: '/services/google-ads-nz' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to fill your appointment books with Google Ads?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            We work with a small number of NZ healthcare clients at any one time. Apply to find out
            if we&apos;re a fit.
          </p>
          <Link href="/apply" className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg">
            Apply to Work With Us
          </Link>
          <p className="text-gray-400 text-sm mt-4">NZ healthcare providers only.</p>
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
