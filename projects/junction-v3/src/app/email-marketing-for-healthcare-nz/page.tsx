import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Email Marketing for Healthcare in NZ — Patient Retention & Practice Growth | Junction Media',
  description: 'Email marketing for NZ healthcare providers. Compliant patient communication, appointment recall sequences, and educational newsletters that retain patients and grow your practice.',
  keywords: 'email marketing for healthcare nz, healthcare email marketing nz, patient email marketing nz, medical practice email nz, clinic newsletter nz, patient recall email nz',
  openGraph: {
    title: 'Email Marketing for Healthcare NZ | Junction Media',
    description: 'Email marketing for NZ healthcare providers. Patient recall, education, and retention programs that fill your appointment book.',
    url: 'https://www.junctionmedia.ai/email-marketing-for-healthcare-nz',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/email-marketing-for-healthcare-nz',
  },
}

const painPoints = [
  {
    title: 'Most NZ healthcare practices lose patients to inactivity — not dissatisfaction',
    desc: 'A large percentage of patients who stop attending a healthcare practice haven\'t left because they\'re unhappy — they\'ve just drifted. Life gets busy, appointments lapse, and without proactive recall communication, patients quietly move on or simply forget to rebook. Most NZ practices have no systematic email recall strategy, making patient attrition entirely avoidable revenue loss.',
  },
  {
    title: 'Healthcare email must comply with health information privacy requirements',
    desc: 'Patient email communication is subject to the Health Information Privacy Code 2020 and Privacy Act requirements around how you collect, store, and use patient contact information. Opt-in practices, unsubscribe mechanisms, secure handling of health-related content, and appropriate data processing agreements are all compliance requirements. Most practices send emails without proper consent frameworks in place.',
  },
  {
    title: 'Generic newsletters don\'t drive appointments — relevant, timed communication does',
    desc: 'A seasonal flu reminder sent in May to your whole patient list gets deleted by most recipients. The same reminder sent to patients who haven\'t had a flu shot, in March, with a direct booking link, books appointments. Healthcare email marketing that drives commercial results is segmented by patient history, condition relevance, and preventive care timing — not broadcast to everyone.',
  },
]

const approach = [
  {
    title: 'Compliant Patient Email Setup',
    desc: 'Proper consent framework implementation, privacy-compliant list segmentation, unsubscribe management, and documentation of how patient contact data is used for marketing. We ensure your email program meets Privacy Act and Health Information Privacy Code requirements before sending a single message.',
  },
  {
    title: 'Recall & Reactivation Sequences',
    desc: 'Automated sequences that identify overdue patients by appointment type and send appropriately timed recall emails: annual check-up reminders, preventive care prompts, treatment follow-up sequences, and win-back campaigns for patients who haven\'t been in for 12+ months. Direct booking integration where possible.',
  },
  {
    title: 'Patient Education Newsletters',
    desc: 'Regular health education content that keeps your practice top-of-mind between appointments. Condition-relevant health tips, seasonal health topics, new service announcements, and practitioner-authored advice content that patients genuinely read and sometimes share with family and friends who need your services.',
  },
  {
    title: 'New Patient Welcome & Onboarding',
    desc: 'Welcome email sequences for new patients that set expectations, introduce the team, explain what to bring to first appointments, and start building the relationship from day one. Good new patient onboarding reduces no-shows and increases the probability that new patients become long-term regulars.',
  },
]

const results = [
  { stat: 'Privacy-compliant', label: 'Health information standards' },
  { stat: 'Recall-focused', label: 'Retention strategy' },
  { stat: '4–5', label: 'Clients at any one time' },
  { stat: '100%', label: 'NZ-based expertise' },
]

const faqs = [
  {
    q: 'What email platform is best for NZ healthcare practices?',
    a: 'For most NZ healthcare practices, Mailchimp, Campaign Monitor, or ActiveCampaign work well for newsletters and basic recall sequences. For more sophisticated behavioural triggers based on appointment history, integration with your practice management system (PMS) becomes important — some PMS providers have built-in email tools, or we can set up integrations. We\'ll recommend the right approach based on your current software stack.',
  },
  {
    q: 'Can NZ healthcare providers email patients without specific consent?',
    a: 'Healthcare practices can send administrative emails (appointment reminders, recall notices) as part of the health service relationship without separate marketing consent. However, marketing emails (promotions, newsletters, non-clinical content) require specific opt-in consent. We help practices implement clear consent collection at point of registration and through existing patient communications to build compliant marketing lists.',
  },
  {
    q: 'How do you measure the success of healthcare email marketing?',
    a: 'Key metrics for healthcare email are: appointment bookings attributable to recall emails, open rates and click rates (engagement benchmarks), list growth from new patients, and recall conversion rate (patients who received a recall email and booked within 30 days). For educational newsletters, we also track website visits and practice-specific engagement like FAQ page views and service page visits.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Email Marketing for Healthcare NZ',
  provider: {
    '@type': 'Organization',
    name: 'Junction Media',
    url: 'https://www.junctionmedia.ai',
  },
  description: 'Email marketing for NZ healthcare providers. Compliant patient communication, recall sequences, and educational newsletters.',
  areaServed: { '@type': 'Country', name: 'New Zealand' },
}

export default function EmailMarketingForHealthcareNZ() {
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
          Service + Industry · Email Marketing for Healthcare NZ
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Email Marketing for<br />
          <span className="text-gray-500">Healthcare in NZ</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          Most NZ healthcare practices focus entirely on attracting new patients while silently losing
          existing ones to inactivity. Email is the most cost-effective tool for keeping patients
          engaged, bringing lapsed patients back, and filling your schedule with people who are
          already in your system. We build compliant email marketing programs for NZ healthcare
          providers that retain patients and grow practice revenue without needing a single new
          acquisition.
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
        <h2 className="text-2xl font-bold mb-8">Why Patient Email Marketing Is the Highest-ROI Healthcare Channel</h2>
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
        <h2 className="text-2xl font-bold mb-4">Our Healthcare Email Marketing Approach</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          We build email programs for healthcare practices that are compliant, systematic, and
          focused on the metrics that matter: recall rates, reactivated patients, and appointment
          bookings. Every sequence is designed with the patient relationship at its centre — not
          just filling the appointment book at any cost.
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
            { title: 'Social Media for Healthcare NZ', href: '/social-media-for-healthcare-nz' },
            { title: 'Meta Ads for Healthcare NZ', href: '/meta-ads-for-healthcare-nz' },
            { title: 'Google Ads for Healthcare NZ', href: '/google-ads-for-healthcare-nz' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to Retain More Patients with Email Marketing?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            We work with a small number of NZ healthcare providers at any one time. Apply to see if
            we can help you build the email systems that keep patients active and your schedule full.
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
