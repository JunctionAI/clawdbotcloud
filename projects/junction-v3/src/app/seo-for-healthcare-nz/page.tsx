import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'SEO Agency for Healthcare NZ — Patient Acquisition via Organic Search | Junction Media',
  description: 'SEO for NZ healthcare providers. Rank for patient-intent searches, build local authority, and grow your practice with compliant, high-converting organic content.',
  keywords: 'seo for healthcare nz, healthcare seo nz, medical seo nz, seo agency healthcare nz, dental seo nz, clinic seo nz, gp seo nz',
  openGraph: {
    title: 'SEO Agency for Healthcare NZ | Junction Media',
    description: 'Specialist SEO for NZ healthcare providers. Rank for patient searches, build trust with Google EEAT content, and grow your practice organically.',
    url: 'https://www.junctionmedia.ai/seo-for-healthcare-nz',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/seo-for-healthcare-nz',
  },
}

const painPoints = [
  {
    title: 'Healthcare SEO requires E-E-A-T — most agencies don\'t understand it',
    desc: 'Google applies stricter quality standards to health content under its YMYL (Your Money, Your Life) guidelines. Expertise, Experience, Authoritativeness, and Trustworthiness signals must be explicit — author credentials, professional citations, practice accreditation. Generic SEO agencies miss this and can actually harm rankings.',
  },
  {
    title: 'Local search is where patients actually find you',
    desc: 'A patient searching for "physio near me" or "dentist Ponsonby" is ready to book. NZ healthcare practices live or die on Google Business Profile optimisation, local citation consistency, and suburb-level keyword targeting. This requires different skills than national ecommerce SEO.',
  },
  {
    title: 'Patients research before they call — your content is your first impression',
    desc: 'Before booking, most patients read 3–5 pages about a clinic or practitioner. Condition explainers, procedure guides, practitioner profiles, and patient FAQ content build the trust that turns searches into appointments. Most NZ clinics have almost none of this content.',
  },
]

const approach = [
  {
    title: 'Google Business Profile Optimisation',
    desc: 'Complete GBP setup and ongoing management — categories, services, hours, photos, Q&A, and review response strategy. Local map pack visibility is often the fastest win for healthcare providers.',
  },
  {
    title: 'E-E-A-T Content Architecture',
    desc: 'We build content with proper author attribution, credential display, professional organisation citations, and structured data for healthcare providers. This signals quality to Google and builds patient trust simultaneously.',
  },
  {
    title: 'Local & Suburb-Level SEO',
    desc: 'Service-area pages targeting every suburb you serve. "Chiropractor [suburb] NZ" style pages with genuine location-specific content — not thin duplicate pages that Google penalises.',
  },
  {
    title: 'Patient Education Content',
    desc: 'Condition guides, treatment explainers, and FAQ content that captures patients early in their research journey. Content that answers questions builds trust and earns rankings simultaneously.',
  },
]

const results = [
  { stat: '+30%', label: 'Above store record (Deep Blue Health, Nov 2025)' },
  { stat: '4–5', label: 'Clients at any one time — real attention' },
  { stat: 'Compliant', label: 'Healthcare content standards maintained' },
  { stat: '100%', label: 'NZ-based, NZ-market expertise' },
]

const faqs = [
  {
    q: 'Do you understand healthcare compliance requirements in NZ?',
    a: 'Yes. We work within AHPRA guidelines (where applicable for trans-Tasman practitioners), MCNZ standards, and the Health Information Privacy Code. Our content strategy avoids specific medical claims that require regulatory sign-off, while still building strong topical authority and patient trust.',
  },
  {
    q: 'What types of healthcare businesses do you work with?',
    a: 'We work with general practices (GPs), dental clinics, physiotherapy and allied health, specialist medical centres, mental health providers, and health supplement brands. Each has different SEO requirements and compliance considerations — we tailor accordingly.',
  },
  {
    q: 'How do reviews factor into healthcare SEO?',
    a: 'Reviews are critical for healthcare local SEO — they influence both Google rankings and patient decision-making. We help implement ethical review generation systems (compliant with MCNZ and AHPRA guidance), respond to existing reviews professionally, and build review volume over time.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'SEO for Healthcare NZ',
  provider: {
    '@type': 'Organization',
    name: 'Junction Media',
    url: 'https://www.junctionmedia.ai',
  },
  description: 'Specialist SEO for NZ healthcare providers. Local SEO, E-E-A-T content, Google Business Profile, and patient-intent keyword targeting.',
  areaServed: { '@type': 'Country', name: 'New Zealand' },
}

export default function SeoForHealthcareNZ() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

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
          Service + Industry · SEO for Healthcare NZ
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          SEO Agency for<br />
          <span className="text-gray-500">Healthcare NZ</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          When patients search for a clinic, GP, specialist, or allied health provider in New Zealand,
          the practices that rank on page one win. We build compliant, trust-signalling SEO strategies
          for NZ healthcare providers — from local map pack dominance to patient education content that
          earns Google&apos;s trust and converts searchers into booked appointments.
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
        <h2 className="text-2xl font-bold mb-8">Why Healthcare SEO is Different</h2>
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
        <h2 className="text-2xl font-bold mb-4">Our Healthcare SEO Approach</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Healthcare SEO requires expertise that generic agencies don&apos;t have. We combine local SEO
          precision, YMYL-compliant content strategy, and technical excellence — built specifically
          for the standards Google applies to health content and the trust patients require before booking.
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

      {/* Proof */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Real Results</h2>
        <div className="p-8 bg-gray-50 rounded-2xl border border-gray-200">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Case Study · Deep Blue Health</p>
          <p className="text-3xl font-bold text-gray-900 mb-3">+30% above store record</p>
          <p className="text-gray-600 leading-relaxed">
            Deep Blue Health — a NZ health supplement brand operating in the YMYL space — beat their
            all-time monthly revenue record by 30% in November 2025. Our full-stack approach: SEO
            content, Google Ads, Meta Ads, and customer support automation working together as one
            coordinated system.
          </p>
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
            { title: 'SEO for Healthcare NZ — Full Guide', href: '/blog/seo-healthcare-nz' },
            { title: 'Healthcare Marketing NZ', href: '/industries/healthcare-nz' },
            { title: 'SEO Services NZ', href: '/services/seo-nz' },
            { title: 'Content Marketing NZ', href: '/services/content-marketing-nz' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to Scale Your Healthcare Practice?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            We work with a small number of NZ healthcare clients at a time — enough to give
            your practice the focus it deserves.
          </p>
          <Link href="/apply" className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg">
            Apply to Work With Us
          </Link>
          <p className="text-gray-400 text-sm mt-4">NZ healthcare businesses only.</p>
        </div>
      </section>

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
