import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Google Ads Agency Dunedin | AI-Managed Google Ads for Dunedin Businesses | Junction Media',
  description: 'Google Ads agency in Dunedin managing PPC campaigns for Otago businesses. AI-assisted bidding, keyword strategy, and conversion tracking. Real leads, measurable ROI. $1,200–$2,500/mo.',
  keywords: 'Google Ads agency Dunedin, Google Ads Dunedin, PPC agency Dunedin, Google AdWords Dunedin, pay per click Dunedin, Dunedin Google Ads management, Otago Google Ads, digital advertising Dunedin',
  openGraph: {
    title: 'Google Ads Agency Dunedin | Junction Media',
    description: 'AI-managed Google Ads for Dunedin and Otago businesses. Search campaigns, keyword strategy, and revenue-focused reporting.',
    url: 'https://www.junctionmedia.ai/dunedin/google-ads-agency',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/dunedin/google-ads-agency',
  },
}

const faqs = [
  {
    q: 'How much does Google Ads management cost in Dunedin?',
    a: "Google Ads management for Dunedin businesses typically costs $1,200–$2,500/month for professional management, separate from your ad spend budget. In the Otago market, we recommend a minimum ad spend of $1,000–$1,500/month to generate sufficient data for effective optimisation. Dunedin's lower CPCs compared to Auckland and Wellington mean your budget often stretches further.",
  },
  {
    q: 'Is Google Ads effective for Dunedin businesses?',
    a: "Yes — Dunedin has strong local search demand for trades, healthcare, education services, tourism, and professional services. Google Ads captures high-intent searches like 'builder Dunedin,' 'dentist Dunedin,' or 'accountant Dunedin' — exactly when potential customers are ready to act. The University of Otago population also creates consistent demand spikes throughout the academic year.",
  },
  {
    q: 'Are CPCs lower in Dunedin than Auckland or Wellington?',
    a: "Yes — cost-per-click in Dunedin is generally significantly lower than Auckland or Wellington for most service categories. This means your Google Ads budget goes further in Dunedin, and the barrier to achieving a positive ROI is lower. Well-structured campaigns in Dunedin can generate leads at a cost that makes Google Ads compelling even for businesses with modest budgets.",
  },
  {
    q: 'How quickly can Google Ads generate leads for a Dunedin business?',
    a: "Google Ads is one of the fastest channels — campaigns can be live and generating leads within days of launch. Dunedin's local search volume means most service businesses start seeing enquiries in the first week. Months 1–2 are optimisation-focused; by month 3, campaigns are typically running at peak efficiency for the Dunedin and Otago market.",
  },
  {
    q: 'What industries work best with Google Ads in Dunedin?',
    a: "Dunedin's economy — healthcare and allied health, trades and construction, education services, tourism and hospitality, professional services, and manufacturing — all benefit from Google Ads for local intent searches. Healthcare in particular is growing rapidly with the Dunedin Hospital rebuild, creating strong demand for medical and allied health providers across the Otago region.",
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      name: 'Junction Media',
      url: 'https://www.junctionmedia.ai',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Auckland',
        addressRegion: 'Auckland',
        addressCountry: 'NZ',
      },
      areaServed: [
        { '@type': 'City', name: 'Dunedin' },
        { '@type': 'City', name: 'Auckland' },
      ],
      priceRange: '$$$',
    },
    {
      '@type': 'Service',
      name: 'Google Ads Agency Dunedin',
      provider: {
        '@type': 'Organization',
        name: 'Junction Media',
        url: 'https://www.junctionmedia.ai',
      },
      serviceType: 'Google Ads Management',
      areaServed: {
        '@type': 'City',
        name: 'Dunedin',
      },
      description: 'AI-managed Google Ads for Dunedin and Otago businesses. Search campaigns, keyword strategy, geographic targeting, and revenue-focused optimisation.',
      offers: {
        '@type': 'Offer',
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: '1200',
          maxPrice: '2500',
          priceCurrency: 'NZD',
          unitText: 'month',
        },
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    },
  ],
}

export default function DunedinGoogleAdsAgencyPage() {
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
        <Link
          href="/apply"
          className="text-sm bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors"
        >
          Apply to Work With Us
        </Link>
      </nav>

      <section className="max-w-3xl mx-auto px-6 pt-20 pb-16">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
          Dunedin · Google Ads
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Google Ads Agency Dunedin
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          AI-managed Google Ads for Dunedin and Otago businesses. We build search campaigns
          that capture high-intent local traffic — from Dunedin CBD to Mosgiel and the Otago
          Peninsula — and turn clicks into qualified leads with transparent, revenue-connected
          reporting.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/apply"
            className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors text-center"
          >
            Apply to Work With Us
          </Link>
          <Link
            href="/services/google-ads-nz"
            className="inline-block border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:border-gray-500 transition-colors text-center"
          >
            View Google Ads Services
          </Link>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-12 border-t border-gray-100">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { stat: '$1.2k–$2.5k', label: 'Management per month NZD' },
            { stat: '3-month', label: 'Minimum engagement' },
            { stat: '+30%', label: 'DBH sales record (month 1)' },
            { stat: '3–5', label: 'Clients at a time (max)' },
          ].map((item) => (
            <div key={item.label} className="p-4 border border-gray-100 rounded-2xl text-center">
              <p className="text-2xl font-bold text-gray-900 mb-1">{item.stat}</p>
              <p className="text-xs text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Google Ads in Dunedin: Lower CPCs, Real Results</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            Dunedin is New Zealand&apos;s 4th largest city, home to around 130,000 people and anchored
            by the University of Otago, a major healthcare sector, and a diverse mix of trades,
            manufacturing, tourism, and professional services. For local businesses, this translates
            to genuine local search demand — people searching for services in Dunedin every day.
          </p>
          <p className="text-gray-600 leading-relaxed">
            One of Dunedin&apos;s most compelling advantages for Google Ads is cost. Cost-per-click
            in Dunedin is typically 30–50% lower than Auckland for comparable service categories.
            That means your budget generates more clicks, more leads, and more opportunities to
            build a profitable paid search channel — without the Auckland competition premium.
          </p>
          <p className="text-gray-600 leading-relaxed">
            The Dunedin Hospital rebuild is one of NZ&apos;s largest infrastructure projects, driving
            significant economic activity and creating demand across construction, professional
            services, and healthcare. The University of Otago and Otago Polytechnic bring a
            student population of over 20,000, creating year-round demand for accommodation,
            food, retail, and services.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">What Our Dunedin Google Ads Work Includes</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Keyword Research & Strategy',
              desc: 'Dunedin and Otago-specific keyword research. Local intent searches, commercial queries, and competitor analysis specific to your category and service area across the Otago region.',
            },
            {
              title: 'Campaign Setup & Structure',
              desc: "Proper Google Ads account architecture: tightly themed ad groups, match type strategy, negative keyword lists, and ad extensions. Built for Dunedin's local market dynamics and lower CPC environment.",
            },
            {
              title: 'Otago Geographic Targeting',
              desc: "Suburb-level targeting across Dunedin CBD, South Dunedin, Mosgiel, Port Chalmers, and wider Otago. Campaigns built around your actual service area — whether you serve the full city or specific neighbourhoods.",
            },
            {
              title: 'Ad Copy & Testing',
              desc: "Responsive Search Ads with messaging tailored to Dunedin customers. A/B testing of offers, CTAs, and copy to improve click-through rates and lead quality in the Dunedin market.",
            },
            {
              title: 'Conversion Tracking',
              desc: 'Phone call tracking, form submissions, and purchase tracking connected to specific keywords and ads. You know exactly which Dunedin searches drive real business outcomes.',
            },
            {
              title: 'Monthly Optimisation & Reporting',
              desc: "Weekly bid adjustments, search term analysis, and budget optimisation. Monthly reports in plain English — what's working, what's not, what's changing in your Dunedin campaigns.",
            },
          ].map((item) => (
            <div key={item.title} className="p-6 border border-gray-100 rounded-2xl">
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">A Result Worth Mentioning</h2>
        <div className="bg-gray-50 rounded-2xl p-8">
          <p className="text-3xl font-bold text-gray-900 mb-2">+30%</p>
          <p className="text-gray-500 text-sm mb-4">Above previous all-time store record — month 1</p>
          <p className="text-gray-600 leading-relaxed">
            Deep Blue Health — a New Zealand supplement brand — hit their best revenue month ever
            in November 2025. We built AI-native marketing systems across Google Ads, Meta Ads,
            SEO, content, and customer support. Google Ads was central to the result.
          </p>
        </div>
      </section>

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

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Further Reading</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { title: 'Google Ads Agency Dunedin — Full Guide', href: '/blog/google-ads-agency-dunedin' },
            { title: 'Google Ads Services NZ', href: '/services/google-ads-nz' },
            { title: 'Dunedin Marketing Hub', href: '/dunedin' },
            { title: 'SEO Agency Dunedin', href: '/dunedin/seo-agency' },
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

      <section className="max-w-3xl mx-auto px-6 py-20 border-t border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to capture more Dunedin customers via Google?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            If you want Google Ads that generate real leads for your Dunedin or Otago
            business — apply below. We review every application.
          </p>
          <Link
            href="/apply"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg"
          >
            Apply to Work With Us
          </Link>
          <p className="text-gray-400 text-sm mt-4">3–5 client spots. Dunedin & Otago businesses welcome.</p>
        </div>
      </section>

      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2026 Junction Media. New Zealand.</p>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Home</Link>
            <Link href="/dunedin" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Dunedin</Link>
            <Link href="/services/google-ads-nz" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Google Ads NZ</Link>
            <Link href="/apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
