import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Education Marketing NZ | Junction Media',
  description: 'Marketing for NZ schools, tertiary providers, and training organisations. Enrolment campaigns, SEO for course searches, Google Ads, and parent-journey content that fills your intake.',
  keywords: 'education marketing nz, school marketing nz, tertiary marketing nz, training provider marketing nz, private school marketing nz, enrolment marketing nz, education agency nz',
  openGraph: {
    title: 'Education Marketing NZ | Junction Media',
    description: 'AI-driven marketing for NZ education providers. Enrolment funnels, SEO for course searches, Google Ads, and parent-facing content that builds trust and fills your intake.',
    url: 'https://www.junctionmedia.ai/industries/education-nz',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/industries/education-nz',
  },
}

const painPoints = [
  {
    problem: 'Enrolment season is high-stakes and short — most providers aren\'t ready',
    detail: 'NZ schools and tertiary providers have a narrow enrolment window each year. Most spend the first half of that window figuring out their marketing rather than executing it. By the time campaigns are live, the best-fit families have already made decisions. Preparation matters more than budget.',
  },
  {
    problem: 'Parents research extensively — and your digital presence doesn\'t reflect your quality',
    detail: 'Parents choosing a school or tertiary provider spend weeks or months researching. They read reviews, compare websites, watch videos, look at social media, and ask in community groups. If your digital presence doesn\'t match the quality of your actual institution, you\'re losing enrolments to competitors who look better online.',
  },
  {
    problem: 'International student attraction requires a completely different approach',
    detail: 'Attracting international students involves different search terms, different trust signals, different platforms, and often different languages. NZ institutions that treat international recruitment like domestic marketing miss the mark on all fronts. The research journey of a family in South Korea or India looks nothing like a NZ family\'s.',
  },
  {
    problem: 'Course-level SEO is almost universally ignored',
    detail: 'When someone searches "graphic design course Auckland" or "business diploma Hamilton NZ," that\'s high purchase-intent traffic. Most NZ education providers have weak or non-existent course-level SEO — meaning they\'re invisible at the exact moment a prospective student is actively looking to enrol.',
  },
]

const approach = [
  {
    title: 'Enrolment Funnel Strategy',
    desc: 'We map the full enrolment journey — from initial awareness through open day attendance to submitted application — and build marketing that supports each stage. Awareness content, consideration retargeting, open day campaigns, application nurture sequences. Most providers focus on awareness only and lose prospects who needed a follow-up.',
  },
  {
    title: 'SEO for Course & Programme Searches',
    desc: 'High-intent searches like "nursing degree Auckland," "IT course NZ," and "private school Tauranga" represent students and families who are actively evaluating options. We build course-level landing pages, programme-specific content, and technical SEO that gets you ranking for these searches — and converting them.',
  },
  {
    title: 'Google Ads for High-Intent Queries',
    desc: 'Google Search campaigns targeting prospective students at the decision stage. We structure campaigns by programme type, location, and student cohort — so a mature student searching for evening courses sees different messaging than a school leaver looking at degree programmes. Precise targeting, tracked enquiries.',
  },
  {
    title: 'Parent-Facing Content & Social',
    desc: 'For schools targeting families with school-age children, parent trust is everything. We build content strategies that showcase student outcomes, staff quality, and school culture in formats parents actually consume — Instagram, Facebook community content, and Google reviews that answer the questions parents are privately asking.',
  },
  {
    title: 'International Student Digital Strategy',
    desc: 'International recruitment requires separate campaign structures, platform choices, and messaging entirely. We build digital strategies for international student attraction that account for the research behaviour of families in key source markets, trust barriers specific to studying abroad, and the role of agents and education fairs alongside digital.',
  },
]

const results = [
  { stat: '+30%', label: 'Above store record (Deep Blue Health, Nov 2025)' },
  { stat: '4–5', label: 'Clients at any one time — real focus, real results' },
  { stat: 'Funnel', label: 'Awareness to enrolment — not just top-of-funnel' },
  { stat: '100%', label: 'NZ-based, NZ-market expertise' },
]

const packages = [
  {
    name: 'Growth',
    price: '$2,500',
    period: '/month NZD',
    desc: 'For education providers entering digital marketing. Core SEO + Google Ads for course enquiries.',
    includes: [
      'Google Ads (course & programme searches)',
      'Google Business Profile optimisation',
      'Course-level landing page SEO',
      'Monthly strategy session',
      'Weekly performance reporting',
    ],
  },
  {
    name: 'Scale',
    price: '$4,500',
    period: '/month NZD',
    desc: 'For providers with multiple programmes wanting consistent enrolments. Full enrolment funnel — awareness to application.',
    includes: [
      'Everything in Growth',
      'Facebook/Instagram (parent-facing content)',
      'Enrolment season campaign planning',
      'Email nurture for enquiry to enrolment',
      'Open day promotion campaigns',
      'Fortnightly strategy sessions',
    ],
    highlight: true,
  },
  {
    name: 'Partnership',
    price: '$8,500',
    period: '/month NZD',
    desc: 'For institutions with domestic + international enrolment goals. Full marketing function with fractional CMO.',
    includes: [
      'Everything in Scale',
      'International student digital strategy',
      'Fractional CMO access (Tom direct)',
      'Multi-programme campaign management',
      'Brand positioning and content authority',
      'Board-level enrolment reporting',
    ],
  },
]

const faqs = [
  {
    q: 'When should we start marketing for enrolments — our open day is six months away?',
    a: 'Start now. The families who choose your institution in six months are doing their research today. Awareness campaigns, organic content, and SEO compound over time — you can\'t turn them on the week before open day and expect results. The most successful NZ education providers run year-round marketing, not just enrolment-season bursts.',
  },
  {
    q: 'What platforms work best for school marketing in NZ?',
    a: 'For schools targeting families with school-age children, Facebook and Instagram are primary (parents are there), supported by Google Search for intent-based queries and Google Maps for local searches. Email nurture from enquiry to enrolment is consistently underused and highly effective. YouTube works well for showcase content if your production quality is high.',
  },
  {
    q: 'We\'re a private school — does paid digital advertising fit our positioning?',
    a: 'Yes, when done correctly. The key is that premium private schools shouldn\'t run ads that feel like direct-response sales. We build brand-consistent campaigns that position you through quality, outcomes, and values — not discounts or urgency tactics. Retargeting families who\'ve visited your website is particularly effective for private schools where the consideration period is long.',
  },
  {
    q: 'How do you approach international student recruitment marketing?',
    a: 'International is a separate workstream with its own strategy. Key variables: which source markets you\'re targeting, whether you use agents (and how digital supports that), platform choices by country (Google vs. social vs. local platforms), and the trust signals that matter to international families — accreditation, graduate outcomes, safety, student support. We build this out as part of the Partnership package.',
  },
  {
    q: 'Can you help with PBRF or research marketing for tertiary institutions?',
    a: 'Research reputation and academic marketing requires a different approach to enrolment marketing — and we\'re honest about our focus. Our strength is enrolment-driving marketing: attracting students and families, converting enquiries, and filling intake. For research comms and PBRF-adjacent positioning, that\'s a more specialised space we\'d discuss in detail before committing.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Education Marketing NZ',
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
  description: 'AI-driven marketing for NZ schools, tertiary providers, and training organisations. Enrolment funnels, course SEO, Google Ads, and international student digital strategy.',
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

export default function EducationNZPage() {
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
          Industry · Education NZ
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Education Marketing<br />
          <span className="text-gray-500">NZ</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          Enrolment campaigns, SEO for course searches, and parent-facing content that fills your
          intake — built for NZ schools, tertiary providers, and training organisations. Marketing
          that runs year-round, not just at open day.
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
        <h2 className="text-2xl font-bold mb-8">The Education Marketing Problem in NZ</h2>
        <div className="space-y-6">
          {painPoints.map((item) => (
            <div key={item.problem} className="p-6 border border-gray-100 rounded-2xl">
              <h3 className="font-semibold text-gray-900 mb-2">
                <span className="text-gray-400 mr-2">→</span>
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
          Junction Media works with a maximum of 4–5 clients at any time — which means your account
          gets genuine strategic attention. For education providers, that means treating enrolment
          as a full-funnel challenge: building awareness in the right audiences, nurturing families
          through the research phase, and converting open day visits and enquiries into applications.
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
            In November 2025, Deep Blue Health — a NZ health brand — beat their all-time monthly
            revenue record by 30%. The result came from coordinated paid channels, email automation,
            and strategic campaign timing. The same principles — understanding research behaviour,
            building trust through the consideration phase, and removing friction from conversion
            — apply directly to education enrolment marketing.
          </p>
          <p className="text-gray-500 text-sm mt-4">
            Education-specific case studies available on request.
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
            { title: 'Education Marketing NZ: The Enrolment Playbook', href: '/blog/education-marketing-nz' },
            { title: 'Content Marketing NZ', href: '/services/content-marketing-nz' },
            { title: 'SEO NZ', href: '/services/seo-nz' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to fill your next intake?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            We work with a maximum of 4–5 clients at any one time. If you want a marketing partner
            who understands the NZ education sector and builds for real enrolment outcomes
            — apply below.
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
