import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Meta Ads Agency Palmerston North | Facebook & Instagram Ads for Palmerston North Businesses | Junction Media',
  description: 'Meta Ads agency in Palmerston North managing Facebook and Instagram advertising for Manawatū-Whanganui region businesses. AI-assisted targeting, creative strategy, and ROAS-focused campaigns. $1,200–$2,500/mo.',
  keywords: 'Meta Ads agency Palmerston North, Facebook Ads Palmerston North, Instagram Ads Palmerston North, Meta advertising Palmerston North, Facebook advertising Palmerston North, social media advertising Palmerston North, Meta Ads Manawatū, paid social Palmerston North',
  openGraph: {
    title: 'Meta Ads Agency Palmerston North | Junction Media',
    description: 'AI-managed Meta Ads (Facebook & Instagram) for Palmerston North and Manawatū businesses. Creative strategy, audience targeting, and ROAS-focused campaigns.',
    url: 'https://www.junctionmedia.ai/palmerston-north/meta-ads-agency',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/palmerston-north/meta-ads-agency',
  },
}

const faqs = [
  {
    q: 'How much does Meta Ads management cost in Palmerston North?',
    a: 'Meta Ads management for Palmerston North businesses costs $1,200–$2,500/month for professional management, separate from your ad spend budget. We recommend a minimum ad spend of $1,000–$2,000/month to generate enough data for meaningful optimisation. Palmerston North\'s audience size is smaller than Auckland, so spend needs to be sufficient to reach and test effectively.',
  },
  {
    q: 'Is Meta Ads (Facebook/Instagram) effective for Palmerston North businesses?',
    a: 'Yes — Facebook and Instagram remain the dominant social platforms in New Zealand, and Palmerston North has strong user bases across both. Meta Ads work particularly well for Palmerston North businesses selling to consumers: education, food processing, logistics, retail, healthcare, and professional services. The platform\'s targeting precision makes it highly effective for reaching Manawatū residents, Massey University community, and Palmerston North businesses.',
  },
  {
    q: 'Can Meta Ads work for B2B businesses in Palmerston North?',
    a: 'Meta Ads are primarily a B2C channel, but they can work for B2B businesses in Palmerston North — particularly for brand awareness, retargeting website visitors, and reaching decision-makers in specific industries. For pure B2B lead generation, we often recommend a blended approach combining Google Ads (for high-intent search) with Meta retargeting.',
  },
  {
    q: 'How do you target Palmerston North audiences on Meta?',
    a: 'We use geographic targeting to focus spend on Palmerston North and the Manawatū region, combined with interest, behaviour, and demographic targeting relevant to your customer profile. We also leverage custom audiences (website visitors, customer lists) and lookalike audiences built from your best existing customers in the Manawatū market.',
  },
  {
    q: 'What results can a Palmerston North business expect from Meta Ads?',
    a: 'Results vary by industry and offer, but well-managed Meta Ads campaigns for Palmerston North businesses typically achieve positive ROAS within 30–60 days. The learning phase (Meta\'s algorithm optimising delivery) takes 2–3 weeks. Manawatū businesses targeting local customers can reach highly qualified audiences with precise geographic and interest-based targeting.',
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
        { '@type': 'City', name: 'Palmerston North' },
        { '@type': 'City', name: 'Auckland' },
      ],
      priceRange: '$$$',
    },
    {
      '@type': 'Service',
      name: 'Meta Ads Agency Palmerston North',
      provider: {
        '@type': 'Organization',
        name: 'Junction Media',
        url: 'https://www.junctionmedia.ai',
      },
      serviceType: 'Meta Ads Management',
      areaServed: {
        '@type': 'City',
        name: 'Palmerston North',
      },
      description: 'AI-managed Meta Ads (Facebook & Instagram) for Palmerston North and Manawatū businesses. Creative strategy, audience targeting, and ROAS-focused campaign management.',
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

export default function PalmerstonNorthMetaAdsAgencyPage() {
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
          Palmerston North · Meta Ads
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Meta Ads Agency Palmerston North
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          AI-managed Facebook and Instagram advertising for Palmerston North and Manawatū businesses. We
          build Meta campaigns that reach the right Palmerston North audiences and convert attention into
          measurable revenue.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/apply"
            className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors text-center"
          >
            Apply to Work With Us
          </Link>
          <Link
            href="/services/meta-ads-nz"
            className="inline-block border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:border-gray-500 transition-colors text-center"
          >
            View Meta Ads Services
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
        <h2 className="text-2xl font-bold mb-6">Meta Ads in Palmerston North: Reaching Manawatū&apos;s Audiences</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            Palmerston North is the centre of the Manawatū region and home to Massey University. The Manawatū audience on Facebook and Instagram spans
            Manawatū residents, Massey University community, and Palmerston North businesses — a diverse and addressable demographic for consumer-facing businesses.
          </p>
          <p className="text-gray-600 leading-relaxed">
            For consumer-facing Palmerston North businesses, Meta Ads offer unmatched audience reach and
            targeting precision. Reach local Palmerston North residents by interest, age, location, and
            behaviour. Retarget visitors to your website. Build lookalike audiences from your best
            customers. The platform&apos;s data depth is particularly effective for businesses in
            education, food processing, logistics, retail, healthcare, and professional services.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We manage Meta Ads with an AI-assisted approach — faster creative iteration, smarter
            audience testing, and continuous optimisation that keeps campaigns improving month over
            month rather than plateauing.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">What Our Palmerston North Meta Ads Work Includes</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Audience Research & Targeting',
              desc: 'Deep audience research for the Palmerston North and Manawatū market. Interest targeting, behaviour targeting, demographic segmentation, and custom audience builds specific to your Palmerston North customer profile.',
            },
            {
              title: 'Creative Strategy & Production',
              desc: 'Ad creative that resonates with Palmerston North audiences — images, video concepts, copy, and hooks developed for the Manawatū market. We iterate creative based on performance data, not guesswork.',
            },
            {
              title: 'Campaign Architecture',
              desc: 'Proper Meta campaign structure: awareness, consideration, and conversion campaigns built around your Palmerston North customer journey. No wasted spend on audiences that are unlikely to convert.',
            },
            {
              title: 'Pixel & Conversion Tracking',
              desc: 'Meta Pixel setup, conversion event configuration, and accurate attribution. You know exactly which ads are driving Palmerston North customers to take action — calls, form fills, purchases.',
            },
            {
              title: 'Retargeting & Lookalike Audiences',
              desc: 'Website visitor retargeting and lookalike audience creation from your existing Palmerston North customers. The highest-efficiency segment of any Meta campaign — reaching people already familiar with your brand.',
            },
            {
              title: 'Monthly Optimisation & Reporting',
              desc: 'Weekly creative and audience testing, budget reallocation, and continuous ROAS improvement. Monthly reports that show what\'s working in your Palmerston North Meta campaigns and what we\'re changing.',
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
            SEO, content, and customer support. Meta Ads was a key driver of the result.
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
            { title: 'Meta Ads Agency Palmerston North — Full Guide', href: '/blog/meta-ads-agency-palmerston-north' },
            { title: 'Meta Ads Services NZ', href: '/services/meta-ads-nz' },
            { title: 'Palmerston North Marketing Hub', href: '/palmerston-north' },
            { title: 'Google Ads Agency Palmerston North', href: '/palmerston-north/google-ads-agency' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to grow your Palmerston North business with Meta Ads?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            If you want Facebook and Instagram campaigns that generate real results for your Palmerston North
            or Manawatū business — apply below. We review every application.
          </p>
          <Link
            href="/apply"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg"
          >
            Apply to Work With Us
          </Link>
          <p className="text-gray-400 text-sm mt-4">3–5 client spots. Palmerston North & Manawatū businesses welcome.</p>
        </div>
      </section>

      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2026 Junction Media. New Zealand.</p>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Home</Link>
            <Link href="/palmerston-north" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Palmerston North</Link>
            <Link href="/services/meta-ads-nz" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Meta Ads NZ</Link>
            <Link href="/apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
