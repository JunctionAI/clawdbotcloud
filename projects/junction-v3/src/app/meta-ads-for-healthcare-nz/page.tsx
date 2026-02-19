import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Meta Ads for Healthcare in NZ — Compliant Facebook & Instagram Ads | Junction Media',
  description: 'Meta Ads management for NZ healthcare providers. Compliant Facebook and Instagram campaigns for clinics, specialists, allied health, and wellness businesses that fill appointment books.',
  keywords: 'meta ads for healthcare nz, facebook ads healthcare nz, instagram ads clinic nz, healthcare social media advertising nz, medical facebook ads nz, allied health advertising nz',
  openGraph: {
    title: 'Meta Ads for Healthcare NZ | Junction Media',
    description: 'Compliant Meta Ads for NZ healthcare providers. Facebook and Instagram campaigns that attract the right patients and fill your appointment book.',
    url: 'https://www.junctionmedia.ai/meta-ads-for-healthcare-nz',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/meta-ads-for-healthcare-nz',
  },
}

const painPoints = [
  {
    title: 'Healthcare Meta Ads have strict policy restrictions that trip up most agencies',
    desc: 'Meta prohibits targeting users based on health conditions, medical history, or sensitive health topics. Healthcare advertisers cannot use custom audiences built from patient data, cannot use certain health-related interest targeting, and must comply with specific ad content restrictions. Most generalist agencies run healthcare campaigns that violate these policies — risking account suspension.',
  },
  {
    title: 'Healthcare decisions are trust-driven — the wrong creative destroys credibility',
    desc: 'Patients selecting a healthcare provider are making high-trust decisions. Before-and-after photos, exaggerated claims, or pressure-tactics that might work in other industries will repel healthcare prospects and damage your professional reputation. Healthcare Meta Ads need to communicate expertise, empathy, and safety — not just drive clicks.',
  },
  {
    title: 'Privacy compliance adds complexity specific to health data',
    desc: 'The Privacy Act 2020 and Health Information Privacy Code impose specific obligations on how you handle patient information in your marketing. Pixel tracking, retargeting, and lead form data all need to be handled compliantly. Getting this wrong exposes your practice to regulatory risk well beyond a suspended ad account.',
  },
]

const approach = [
  {
    title: 'Policy-Compliant Campaign Architecture',
    desc: 'We build healthcare campaigns that work within Meta\'s health and wellness advertising policies — interest-based targeting that doesn\'t rely on sensitive health data, creative that meets content guidelines, and ad structures that remain compliant as policies evolve.',
  },
  {
    title: 'Trust-Building Creative Strategy',
    desc: 'Healthcare creative that earns trust: practitioner profiles that humanise your team, patient education content that demonstrates expertise, facility and environment imagery that reduces anxiety, and clear, honest descriptions of services and outcomes without prohibited claims.',
  },
  {
    title: 'Appointment-Focused Conversion',
    desc: 'We optimise for appointment bookings, not just leads. Integrated booking system connections, phone call tracking, and lead form campaigns that capture the information needed to qualify patients — reducing no-shows and improving the quality of your booked appointments.',
  },
  {
    title: 'Local Geographic Targeting',
    desc: 'Healthcare is inherently local. We use radius targeting around your practice locations, suburb-level demographic data, and community-focused messaging that resonates with the specific population you serve — whether that\'s a GP in South Auckland or a physio clinic in Wellington CBD.',
  },
]

const results = [
  { stat: 'Policy-safe', label: 'Healthcare compliance' },
  { stat: 'Booking-focused', label: 'Conversion optimisation' },
  { stat: '4–5', label: 'Clients at any one time' },
  { stat: '100%', label: 'NZ-based expertise' },
]

const faqs = [
  {
    q: 'Can healthcare businesses in NZ run Meta Ads legally?',
    a: 'Yes — with the right approach. Meta allows healthcare advertising but restricts targeting based on health conditions and prohibits certain types of content. The Privacy Act and Health Information Privacy Code require careful handling of any patient data used in advertising. We structure campaigns to comply with both Meta policies and NZ health information privacy requirements.',
  },
  {
    q: 'What types of NZ healthcare businesses work well with Meta Ads?',
    a: 'Meta Ads work particularly well for elective and wellness services: dental practices, physiotherapy, chiropractic, psychology/counselling, cosmetic medicine, optometry, personal training and sports medicine, and specialist services with longer booking lead times. Emergency and acute care services are less suited to paid social.',
  },
  {
    q: 'How do you measure ROI for healthcare Meta Ads in NZ?',
    a: 'We track cost per appointment booked as the primary metric, alongside cost per lead and lead-to-appointment conversion rate. Where practices can share de-identified revenue data, we calculate cost per patient acquired and patient lifetime value. We also factor in appointment type — a new patient booking a comprehensive consultation is worth more than a quick check.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Meta Ads for Healthcare NZ',
  provider: {
    '@type': 'Organization',
    name: 'Junction Media',
    url: 'https://www.junctionmedia.ai',
  },
  description: 'Meta Ads management for NZ healthcare providers. Compliant Facebook and Instagram campaigns that fill appointment books.',
  areaServed: { '@type': 'Country', name: 'New Zealand' },
}

export default function MetaAdsForHealthcareNZ() {
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
          Service + Industry · Meta Ads for Healthcare NZ
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Meta Ads for<br />
          <span className="text-gray-500">Healthcare in NZ</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          Healthcare providers in NZ are sitting on an underused growth channel. Facebook and Instagram
          reach your community where they spend their time — before they&apos;re searching for a specific
          provider. We run compliant, trust-building Meta Ads for NZ healthcare businesses that
          generate qualified appointment bookings without putting your practice at policy or
          regulatory risk.
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
        <h2 className="text-2xl font-bold mb-8">Why Healthcare Meta Ads Require Specialist Knowledge</h2>
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
        <h2 className="text-2xl font-bold mb-4">Our Healthcare Meta Ads Approach</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Healthcare advertising on Meta requires balancing three things simultaneously: compliance
          with platform policies and NZ health privacy law, creative that builds genuine trust with
          patients, and conversion mechanics that fill your schedule with the right appointments.
          We&apos;ve built the systems to do all three.
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
            { title: 'SEO for Healthcare NZ', href: '/seo-for-healthcare-nz' },
            { title: 'Google Ads for Healthcare NZ', href: '/google-ads-for-healthcare-nz' },
            { title: 'Social Media for Healthcare NZ', href: '/social-media-for-healthcare-nz' },
            { title: 'Email Marketing for Healthcare NZ', href: '/email-marketing-for-healthcare-nz' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to Fill Your Appointment Book with Meta Ads?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            We work with a small number of NZ healthcare providers at any one time. Apply to see if
            we can help your practice grow with compliant, effective Meta Ads.
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
