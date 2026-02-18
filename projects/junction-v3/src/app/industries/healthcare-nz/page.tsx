import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Healthcare Marketing NZ — Clinics, Specialists & Health Brands | Junction Media',
  description: 'Healthcare marketing for NZ private clinics, specialists, and health brands. Compliance-safe SEO, Google Ads, local search, and patient retention email. Based in Auckland.',
  keywords: 'healthcare marketing nz, medical practice marketing nz, health clinic marketing nz, wellness marketing nz, medical marketing auckland, private clinic marketing nz, health brand marketing nz',
  openGraph: {
    title: 'Healthcare Marketing NZ — Clinics, Specialists & Health Brands | Junction Media',
    description: 'SEO-first, compliance-safe digital marketing for NZ healthcare providers. Private clinics, specialists, and health brands that need to build trust and grow patient volume.',
    url: 'https://www.junctionmedia.ai/industries/healthcare-nz',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/industries/healthcare-nz',
  },
}

const painPoints = [
  {
    problem: 'You\'re almost entirely dependent on GP referrals — and that\'s fragile',
    detail: 'Many NZ private clinics and specialists built their patient volume entirely through GP relationships. That works until a key GP retires, moves, or builds their own in-house capacity. Referral dependency is a single point of failure. Digital marketing builds a second acquisition channel you control.',
  },
  {
    problem: 'Your digital presence doesn\'t reflect the quality of your clinical work',
    detail: 'A dated website, no Google Business presence, and zero patient reviews online means new patients choosing between providers will pick someone else — even if you\'re clinically superior. In healthcare, the patient journey starts online now. Full stop.',
  },
  {
    problem: 'Compliance uncertainty is paralyzing your marketing',
    detail: 'Healthcare advertising in NZ has real constraints — Advertising Standards Authority guidelines, Medical Council obligations, and sector-specific rules around claims, testimonials, and before/after content. Most healthcare providers either ignore this (risky) or use it as an excuse to do nothing (expensive). There\'s a compliant middle path that works.',
  },
  {
    problem: 'Patient retention is haemorrhaging through the gaps',
    detail: 'Acquiring a new patient costs 5–7x more than retaining an existing one. Most NZ health practices have minimal or no patient retention infrastructure — no recall sequences, no annual health review reminders, no post-treatment follow-up. You\'re leaving recurring revenue and health outcomes on the table.',
  },
]

const approach = [
  {
    title: 'SEO-First — Be Found When Patients Search',
    desc: 'When a patient needs a specialist, physio, or private clinic, they Google first. We build organic search presence through local SEO, Google Business optimisation, and condition/treatment content that ranks for the searches your ideal patients are actually making. Organic traffic compounds — you don\'t pay per click forever.',
  },
  {
    title: 'Compliance-Safe Google Ads',
    desc: 'Google Ads can drive immediate patient enquiries — but healthcare advertising requires precision. We structure campaigns within NZ\'s advertising compliance framework: no prohibited claims, careful use of testimonials, clear service descriptions. You get patient volume without regulatory risk.',
  },
  {
    title: 'Content Authority That Builds Trust',
    desc: 'Healthcare decisions are high-stakes. Patients research extensively before booking. Content that explains conditions, treatments, and what to expect — written by or closely with your clinicians — positions your practice as the authoritative, trustworthy option. It also ranks. It\'s the best ROI in healthcare marketing.',
  },
  {
    title: 'Local SEO & Google Business',
    desc: 'Most healthcare searches are local: "physiotherapist Auckland", "private gynaecologist Wellington". Google Business profile optimisation, local citation building, and review generation strategy put your practice in the map pack — where most patients click first.',
  },
  {
    title: 'Patient Retention Email Sequences',
    desc: 'Post-treatment follow-up, annual recall reminders, educational newsletters, and re-engagement sequences that keep your patients engaged between visits. Patient email done correctly is compliance-safe, genuinely useful to patients, and significantly increases lifetime patient value.',
  },
]

const results = [
  { stat: '+30%', label: 'Above store record (Deep Blue Health, Nov 2025)' },
  { stat: '4–5', label: 'Clients at any one time — focused, strategic work' },
  { stat: 'SEO', label: 'Organic-first approach — traffic that compounds' },
  { stat: '100%', label: 'Compliance-aware NZ healthcare marketing' },
]

const packages = [
  {
    name: 'Growth',
    price: '$2,500',
    period: '/month NZD',
    desc: 'For clinics and health brands starting to invest in digital marketing. Core SEO + local presence foundation.',
    includes: [
      'Google Business profile optimisation',
      'Local SEO (on-page + citations)',
      'Monthly content piece (condition/treatment guide)',
      'Monthly strategy session',
      'Weekly performance reporting',
    ],
  },
  {
    name: 'Scale',
    price: '$4,500',
    period: '/month NZD',
    desc: 'For established practices growing patient volume. Full digital presence with Google Ads, content authority, and patient email.',
    includes: [
      'Everything in Growth',
      'Google Ads (compliance-reviewed)',
      'Patient retention email sequences',
      'Content production (2x/month)',
      'Competitor & referral analysis',
      'Fortnightly strategy sessions',
    ],
    highlight: true,
  },
  {
    name: 'Partnership',
    price: '$8,500',
    period: '/month NZD',
    desc: 'Full marketing function for multi-site clinics or health brands scaling nationally. Fractional CMO embedded.',
    includes: [
      'Everything in Scale',
      'Fractional CMO access (Tom direct)',
      'Multi-location SEO strategy',
      'Full content calendar execution',
      'Patient journey mapping & optimisation',
      'Board-level reporting',
    ],
  },
]

const faqs = [
  {
    q: 'Is healthcare digital marketing actually compliant with NZ regulations?',
    a: 'Yes — when done correctly. There are real constraints: the Advertising Standards Authority\'s guidelines, Medical Council obligations around testimonials and claims, and Medsafe rules if you\'re advertising therapeutic products. We work within these frameworks, not around them. We\'ve designed compliant campaign structures specifically for NZ healthcare providers.',
  },
  {
    q: 'We get most patients through GP referrals. Do we actually need digital marketing?',
    a: 'That\'s the question every specialist asks — right up until their key GP relationship changes. Referral networks are valuable but fragile. Digital marketing builds a parallel acquisition channel that you control. Increasingly, patients self-refer for elective procedures and wellness services — and they find providers online. If you\'re not there, someone else is.',
  },
  {
    q: 'Can we use patient testimonials in our marketing?',
    a: 'It depends on the context and claim being made. The Medical Council of New Zealand has specific guidance on testimonials and endorsements. Patient stories are possible within the compliance framework — but they require careful structuring. We review all content against current NZ healthcare advertising standards before it goes live.',
  },
  {
    q: 'What kind of health businesses do you work with?',
    a: 'Private clinics (surgical, specialist, allied health), wellness brands, health supplement companies, and health technology businesses. We don\'t work with public health providers. We work best with private health businesses where the patient or customer relationship is direct and digital touchpoints genuinely influence the decision.',
  },
  {
    q: 'How long does healthcare SEO take to work?',
    a: 'Local SEO and Google Business improvements can show results within 4–8 weeks for practices with no existing optimisation. Broader content SEO (ranking for condition and treatment searches) typically builds over 3–6 months. Google Ads can generate patient enquiries from week one. We structure engagements to layer short-term wins with long-term organic compounding.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Healthcare Marketing NZ',
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
  description: 'Compliance-safe digital marketing for NZ healthcare providers. SEO, Google Ads, local search, and patient retention email for private clinics, specialists, and health brands.',
  areaServed: { '@type': 'Country', name: 'New Zealand' },
  offers: {
    '@type': 'Offer',
    priceSpecification: {
      '@type': 'PriceSpecification',
      minPrice: '2500',
      maxPrice: '8500',
      priceCurrency: 'NZD',
      unitText: 'month',
    },
  },
}

export default function HealthcareNZPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
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
          Apply to Work With Us
        </Link>
      </nav>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-16">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
          Industry · Healthcare NZ
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Healthcare Marketing<br />
          <span className="text-gray-500">NZ</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          Compliance-safe digital marketing for NZ private clinics, specialists, and health brands
          that need to be found online, build patient trust, and grow without regulatory risk.
          SEO-first, Google Ads, and patient retention — built for healthcare.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/apply"
            className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors text-center"
          >
            Apply to Work With Us
          </Link>
          <Link
            href="/industries"
            className="inline-block border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:border-gray-500 transition-colors text-center"
          >
            View All Industries
          </Link>
        </div>
      </section>

      {/* Key Numbers */}
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

      {/* Pain Points */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">The Healthcare Marketing Problem in NZ</h2>
        <div className="space-y-6">
          {painPoints.map((item) => (
            <div key={item.problem} className="p-6 border border-gray-100 rounded-2xl">
              <h3 className="font-semibold text-gray-900 mb-2">
                <span className="text-gray-400 mr-2">✗</span>
                {item.problem}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Approach */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-4">How We Solve It</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Junction Media works with a maximum of 4–5 clients at any time. Healthcare clients
          get the same strategic depth we bring to every engagement — with the added layer
          of compliance-aware campaign design. We don&apos;t just run your ads; we understand
          the sector, respect the regulatory environment, and build marketing that earns patient trust.
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
        <h2 className="text-2xl font-bold mb-6">Results That Matter</h2>
        <div className="p-8 bg-gray-50 rounded-2xl border border-gray-200">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Case Study · Deep Blue Health (DBH)</p>
          <p className="text-3xl font-bold text-gray-900 mb-3">+30% above store record</p>
          <p className="text-gray-600 leading-relaxed">
            In November 2025, Deep Blue Health — a NZ health supplement brand — beat their
            all-time monthly revenue record by 30%. The result came from coordinated channel
            management, rebuilt email flows, and strategic campaign timing. Health brand marketing
            requires the same trust-building rigour as clinical practice marketing — we understand that.
          </p>
          <p className="text-gray-500 text-sm mt-4">
            Healthcare practice case studies available on request.
          </p>
        </div>
      </section>

      {/* Packages */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-4">Packages</h2>
        <p className="text-gray-500 mb-8">All packages are monthly engagements with a 3-month minimum. Ad spend budgets are separate and paid directly to platforms.</p>
        <div className="space-y-6">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`p-8 rounded-2xl border ${pkg.highlight ? 'border-gray-900 bg-gray-50' : 'border-gray-100'}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-bold text-gray-900">{pkg.name}</h3>
                    {pkg.highlight && (
                      <span className="text-xs font-semibold bg-gray-900 text-white px-3 py-1 rounded-full">Most popular</span>
                    )}
                  </div>
                  <p className="text-gray-500 text-sm">{pkg.desc}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-3xl font-bold text-gray-900">{pkg.price}</span>
                  <span className="text-gray-500 text-sm">{pkg.period}</span>
                </div>
              </div>
              <ul className="space-y-2 mb-6">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 flex-shrink-0 text-xs">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/apply"
                className="inline-block bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-700 transition-colors"
              >
                Apply for {pkg.name}
              </Link>
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
        <h2 className="text-2xl font-bold mb-6">Further Reading</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { title: 'Healthcare Marketing NZ: The Clinic Owner\'s Guide', href: '/blog/healthcare-marketing-nz' },
            { title: 'SEO Services NZ', href: '/services/seo-nz' },
            { title: 'Google Ads NZ', href: '/services/google-ads-nz' },
            { title: 'View All Industries', href: '/industries' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to grow your patient volume?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            We work with a maximum of 4–5 clients at any one time. If you want a marketing partner
            who understands healthcare, respects compliance, and treats your practice like it&apos;s
            their own — apply below.
          </p>
          <Link
            href="/apply"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg"
          >
            Apply to Work With Us
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
