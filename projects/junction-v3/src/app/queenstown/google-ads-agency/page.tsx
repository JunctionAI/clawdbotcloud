import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Google Ads Agency Queenstown | PPC Management for Queenstown Businesses | Junction Media',
  description: 'Google Ads management for Queenstown businesses. AI-optimised PPC campaigns targeting Queenstown and the Queenstown-Lakes district and the Central Otago region. Transparent reporting, real results. $1,500–$3,500/mo.',
  keywords: 'Google Ads agency Queenstown, PPC agency Queenstown, Google Ads Queenstown, PPC Queenstown, Google Ads management Queenstown, paid search Queenstown, Google Adwords Queenstown, PPC consultant Queenstown NZ',
  openGraph: {
    title: 'Google Ads Agency Queenstown | Junction Media',
    description: 'AI-optimised Google Ads for Queenstown businesses. Active management, transparent reporting, real results.',
    url: 'https://www.junctionmedia.ai/queenstown/google-ads-agency',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/queenstown/google-ads-agency',
  },
}

const faqs = [
  {
    q: 'How much does Google Ads management cost for Queenstown businesses?',
    a: 'Junction Media charges $1,500–$3,500/month NZD for Google Ads management, separate from your ad spend. For Queenstown businesses in competitive categories, we typically recommend a minimum ad spend of $1,500–$3,000/month to generate meaningful data and results. Queenstown-Lakes markets often have lower CPCs than Auckland, making ad spend go further.',
  },
  {
    q: 'What Queenstown industries benefit most from Google Ads?',
    a: 'Queenstown\'s industry mix makes it particularly strong for Google Ads in: tourism, hospitality, adventure sports, real estate, retail, and professional services. High-intent local searches — "builder Queenstown," "accountant Queenstown-Lakes," "plumber Queenstown" — capture motivated buyers at the moment of decision.',
  },
  {
    q: 'Can you target specific Queenstown suburbs and surrounding areas with Google Ads?',
    a: 'Yes — Google Ads location targeting allows us to focus spend on Queenstown and the wider Queenstown-Lakes district including Wānaka, Frankton, and Arrowtown. We can also set radius targeting around your Queenstown office or service area for hyper-local campaigns.',
  },
  {
    q: 'How long does it take for Google Ads to work for a Queenstown business?',
    a: 'Traffic starts immediately when campaigns go live. Meaningful optimisation — finding the right keywords, negative lists, bid strategies, and ad copy that converts — typically takes 6–10 weeks of active management. By month 3, a well-managed Queenstown Google Ads account should be delivering consistent, measurable returns.',
  },
  {
    q: 'Do you provide conversion tracking for Queenstown Google Ads?',
    a: 'Yes — proper GA4 + Google Ads conversion tracking is set up from day one of every engagement. Phone call tracking, form fill tracking, e-commerce purchase tracking — everything is connected so you can see exactly what campaigns are driving revenue for your Queenstown business.',
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
        { '@type': 'City', name: 'Queenstown' },
        { '@type': 'City', name: 'Auckland' },
      ],
      priceRange: '$$$',
    },
    {
      '@type': 'Service',
      name: 'Google Ads Agency Queenstown',
      provider: {
        '@type': 'Organization',
        name: 'Junction Media',
        url: 'https://www.junctionmedia.ai',
      },
      serviceType: 'Google Ads Management',
      areaServed: {
        '@type': 'City',
        name: 'Queenstown',
      },
      description: 'AI-optimised Google Ads management for Queenstown businesses. Search, display, and Performance Max campaigns built for the Queenstown-Lakes market.',
      offers: {
        '@type': 'Offer',
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: '1500',
          maxPrice: '3500',
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

export default function QueenstownGoogleAdsAgencyPage() {
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
          Queenstown · Google Ads
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Google Ads Agency Queenstown
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          AI-optimised Google Ads management for Queenstown businesses. We build and manage PPC
          campaigns that capture high-intent Queenstown searchers at the exact moment they&apos;re
          ready to buy — turning ad spend into measurable, trackable revenue.
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
            { stat: '$1.5k–$3.5k', label: 'Management per month NZD' },
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
        <h2 className="text-2xl font-bold mb-6">Google Ads in Queenstown: Capturing Local Intent</h2>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            Queenstown is New Zealand's adventure tourism capital and one of the world's premier destination cities. When local residents and regional visitors search Google for
            services — trades, professional services, healthcare, hospitality — they&apos;re ready to
            act. Google Ads puts your Queenstown business at the top of those searches, at the
            exact moment of highest intent.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Unlike social media advertising, which interrupts people who aren&apos;t looking for you,
            Google Ads captures demand that already exists. Someone searching &quot;plumber Queenstown&quot;
            or &quot;accountant Queenstown-Lakes&quot; has a specific need and is ready to make a decision.
            Being at the top of that result is worth real money.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We manage Queenstown Google Ads with an AI-assisted approach — faster keyword discovery,
            smarter negative keyword management, continuous bid optimisation, and creative
            iteration that keeps campaigns improving month over month.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">What Our Queenstown Google Ads Work Includes</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Campaign Strategy & Build',
              desc: 'Full campaign architecture for Queenstown: search campaigns, display, and Performance Max where appropriate. Built around your Queenstown-Lakes customer journey — from discovery to conversion.',
            },
            {
              title: 'Keyword Research & Negative Lists',
              desc: 'Queenstown-specific keyword research covering all relevant local search queries. Comprehensive negative keyword lists to eliminate wasted spend on irrelevant searches across the Queenstown-Lakes region.',
            },
            {
              title: 'Ad Copy & Creative',
              desc: 'Compelling search ads that stop Queenstown searchers and drive clicks. A/B tested headlines and descriptions, continuously refined based on performance data.',
            },
            {
              title: 'Conversion Tracking',
              desc: 'GA4 + Google Ads conversion tracking: phone calls, form submissions, purchases, and custom events. You know exactly what your Queenstown ad spend is returning — not just clicks.',
            },
            {
              title: 'Bid Management & Optimisation',
              desc: 'Active bid management using AI-assisted analysis. Budget allocation across campaigns, dayparting for Queenstown business hours, and continuous ROAS improvement.',
            },
            {
              title: 'Monthly Reporting',
              desc: 'Plain-English reports: spend, clicks, conversions, ROAS, and what we changed. No vanity metrics — only data that connects your Queenstown Google Ads investment to business outcomes.',
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
            SEO, content, and customer support. Google Ads was a core driver of the result.
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
            { title: 'Google Ads Agency Queenstown — Full Guide', href: '/blog/google-ads-agency-queenstown' },
            { title: 'Google Ads Services NZ', href: '/services/google-ads-nz' },
            { title: 'Queenstown Marketing Hub', href: '/queenstown' },
            { title: 'SEO Agency Queenstown', href: '/queenstown/seo-agency' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to grow your Queenstown business with Google Ads?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            If you want Google Ads campaigns that generate real, measurable results for your
            Queenstown business — apply below. We review every application.
          </p>
          <Link
            href="/apply"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg"
          >
            Apply to Work With Us
          </Link>
          <p className="text-gray-400 text-sm mt-4">3–5 client spots. Queenstown & Queenstown-Lakes businesses welcome.</p>
        </div>
      </section>

      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2026 Junction Media. New Zealand.</p>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Home</Link>
            <Link href="/queenstown" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Queenstown</Link>
            <Link href="/services/google-ads-nz" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Google Ads NZ</Link>
            <Link href="/apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
