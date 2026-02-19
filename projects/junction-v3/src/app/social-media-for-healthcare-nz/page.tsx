import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Social Media for Healthcare in NZ — Patient Trust & Practice Growth | Junction Media',
  description: 'Social media management for NZ healthcare providers. Build patient trust, educate your community, and grow your practice with compliant, professional social content.',
  keywords: 'social media for healthcare nz, healthcare social media nz, medical social media nz, clinic social media management nz, health practice social media nz, allied health social media nz',
  openGraph: {
    title: 'Social Media for Healthcare NZ | Junction Media',
    description: 'Social media management for NZ healthcare providers. Build patient trust and grow your practice with compliant, professional content.',
    url: 'https://www.junctionmedia.ai/social-media-for-healthcare-nz',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/social-media-for-healthcare-nz',
  },
}

const painPoints = [
  {
    title: 'Healthcare social media must build trust before it can drive appointments',
    desc: 'Patients don\'t book appointments based on slick social media graphics — they book with practitioners they trust. Healthcare social media that only promotes services misses the point entirely. Effective healthcare social builds authority through patient education, practitioner expertise, and community engagement — and that requires a different content strategy than most industries.',
  },
  {
    title: 'Compliance boundaries limit what you can say — and most practitioners don\'t know them',
    desc: 'Medical Council, Advertising Standards Authority, and Health and Disability Commissioner guidelines all apply to healthcare social media in NZ. Testimonials, before-and-after imagery, outcome claims, and certain therapeutic assertions are all restricted or prohibited. Practitioners who post without this knowledge risk regulatory complaints and reputational damage.',
  },
  {
    title: 'Consistency is the hardest part — and it\'s the most important part',
    desc: 'Healthcare social media only builds community and trust if it\'s consistent. An Instagram profile that was active in 2023 and hasn\'t posted since actually harms credibility — it signals that the practice is closed, inactive, or doesn\'t care. Most healthcare businesses start strong and then run out of ideas, time, or energy to maintain the cadence needed to see results.',
  },
]

const approach = [
  {
    title: 'Compliance-Aware Content Strategy',
    desc: 'We understand the NZ regulatory environment for healthcare advertising and create social content that stays within the boundaries — education-first content, compliant testimonial formats, appropriate outcome framing, and disclaimers where required. Your social presence builds your reputation without risking it.',
  },
  {
    title: 'Patient Education Content',
    desc: 'Condition explainers, treatment process content, FAQ posts, myth-busting, and health tip content that positions your practitioners as trusted experts. Content that patients share with family members — expanding your organic reach to people who genuinely need your services.',
  },
  {
    title: 'Practitioner Authority Building',
    desc: 'Behind-the-scenes content, practitioner introductions, case study stories (appropriately consented), and professional development content that helps potential patients feel connected to your team before they ever step through the door. Trust is built long before the first appointment.',
  },
  {
    title: 'Consistent Managed Publishing',
    desc: 'A reliable content calendar with 3–5 posts per week across Facebook and Instagram, responding to comments and DMs promptly, monitoring brand mentions, and monthly reporting on engagement, follower growth, and profile visits — so you can see how social is contributing to practice awareness.',
  },
]

const results = [
  { stat: 'Compliant', label: 'NZ healthcare regulations' },
  { stat: 'Trust-first', label: 'Content philosophy' },
  { stat: '4–5', label: 'Clients at any one time' },
  { stat: '100%', label: 'NZ-based expertise' },
]

const faqs = [
  {
    q: 'What types of NZ healthcare businesses benefit most from social media?',
    a: 'Allied health and wellness services see the strongest social media ROI: physiotherapy, chiropractic, psychology, dentistry, optometry, cosmetic medicine, personal training, and nutritional consulting. These services have strong visual and educational content potential, and patients actively seek recommendations in their local networks. GP and specialist practices also benefit but with different content approaches.',
  },
  {
    q: 'Can NZ healthcare businesses use patient testimonials on social media?',
    a: 'Yes, with care. Patient testimonials are permitted but must comply with the Health and Disability Commissioner Code and ASA guidelines. They should not make unsubstantiated outcome claims, should include appropriate context, and must be genuinely voluntary. We structure testimonial content in formats that are both compelling and compliant with NZ regulations.',
  },
  {
    q: 'How do you measure the ROI of social media for healthcare practices?',
    a: 'We track profile visits (people checking your practice out after seeing content), website clicks from social, appointment booking form completions attributable to social referrals, and follower growth as a proxy for growing community awareness. We also measure engagement rate as a quality signal — high engagement means your content is resonating with the right people.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Social Media for Healthcare NZ',
  provider: {
    '@type': 'Organization',
    name: 'Junction Media',
    url: 'https://www.junctionmedia.ai',
  },
  description: 'Social media management for NZ healthcare providers. Compliant content strategy, patient education, and consistent managed publishing.',
  areaServed: { '@type': 'Country', name: 'New Zealand' },
}

export default function SocialMediaForHealthcareNZ() {
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
          Service + Industry · Social Media for Healthcare NZ
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Social Media for<br />
          <span className="text-gray-500">Healthcare in NZ</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          Patients choose healthcare providers they trust. Social media is the most powerful tool
          available to NZ healthcare businesses for building that trust at scale — but only with
          the right strategy. We manage social media for NZ healthcare providers that want to
          educate their community, grow their online presence, and fill their appointment books
          — all within NZ&apos;s regulatory framework.
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
        <h2 className="text-2xl font-bold mb-8">Why Healthcare Social Media Needs a Specialist Approach</h2>
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
        <h2 className="text-2xl font-bold mb-4">Our Healthcare Social Media Approach</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          We manage social media for healthcare businesses as a trust-building operation, not a
          promotional megaphone. The goal is to make potential patients feel they already know your
          team before they ever call — which makes every other part of the new patient journey easier.
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
            { title: 'Meta Ads for Healthcare NZ', href: '/meta-ads-for-healthcare-nz' },
            { title: 'Google Ads for Healthcare NZ', href: '/google-ads-for-healthcare-nz' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to Build Patient Trust Through Social Media?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            We work with a small number of NZ healthcare businesses at any one time. Apply to see if
            we can help your practice grow its community and attract more of the right patients.
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
