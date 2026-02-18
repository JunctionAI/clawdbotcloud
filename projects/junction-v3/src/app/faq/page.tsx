import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'FAQ | Junction Media — Common Questions Answered',
  description: 'Frequently asked questions about Junction Media\'s AI-native marketing services. Pricing, what\'s included, how it works, contracts, and more.',
  keywords: 'Junction Media FAQ, AI marketing NZ questions, fractional CMO pricing NZ, marketing agency NZ FAQ',
  openGraph: {
    title: 'FAQ | Junction Media — Common Questions Answered',
    description: 'Everything you need to know about working with Junction Media. Pricing, process, AI tools, contracts, and results.',
    url: 'https://www.junctionmedia.ai/faq',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/faq',
  },
}

const faqs = [
  {
    q: 'How much does Junction Media cost?',
    a: 'Our core partnership (Fractional CMO) starts at $10,000/month NZD. This covers strategic leadership plus execution across multiple channels. Standalone services start lower: Google Ads management from $1,500/month, SEO from $1,500/month, content marketing from $1,000/month, email marketing from $600/month, and web design from $3,000 as a one-off project. All prices are in NZD and exclude GST.',
  },
  {
    q: "What's included in the $10,000/month partnership?",
    a: "The full partnership includes: a senior marketing operator embedded in your business, a full AI marketing system build (content engine, paid media optimisation, customer intelligence, competitive monitoring, automated reporting), active management of your Google Ads and/or Meta Ads campaigns, SEO strategy and content production, and weekly check-ins plus a monthly strategic review. It's the output of a 5–10 person marketing team, run by one senior operator using AI systems.",
  },
  {
    q: 'How does the AI side of things actually work?',
    a: "We build AI systems that handle the volume work — generating and testing ad copy variants, producing SEO content at scale, monitoring your competitors and flagging changes, analysing customer data and surfacing insights, and automating reporting. The AI does execution at scale. Tom provides strategy, editorial direction, and judgment. The combination means you get significantly more output than a traditional agency at the same price point.",
  },
  {
    q: 'Is Junction Media focused on New Zealand businesses?',
    a: 'Yes. We work exclusively with NZ businesses. Our knowledge of the NZ market — search volumes, consumer behaviour, platform dynamics, seasonal patterns — is a core part of what we deliver. We\'re based in Auckland and all strategy is built for the NZ context, not adapted from US or UK templates.',
  },
  {
    q: 'How does onboarding work?',
    a: "After you're accepted and the agreement is signed, onboarding takes 1–2 weeks. Week 1 covers: access setup (accounts, analytics, ads platforms), a full audit of your existing marketing, and a 90-day growth roadmap. Week 2 is strategy alignment — we walk you through the plan, you approve it, and we start building. Most clients see the first deliverables in week 2 and the full system running by the end of month 1.",
  },
  {
    q: 'How long before I see results?',
    a: "Honest answer: it depends on the channel. Google Ads can show meaningful results within the first month once campaigns are live. SEO typically takes 3–6 months to build meaningful organic traffic. The full compound effect of a well-built AI marketing system — where all channels are reinforcing each other — is usually visible by month 3. That's why we have a 3-month minimum term: it's the minimum time needed to see the system working properly.",
  },
  {
    q: 'Do I have to sign a long-term contract?',
    a: "There's a 3-month minimum term on all engagements. That's non-negotiable — it's genuinely not enough time to produce meaningful results otherwise. After 3 months, we move to rolling monthly. Either party can cancel with 30 days notice. There's no lock-in beyond that minimum. You own all your accounts (Google Ads, Meta Ads, etc.) at all times — if you leave, you take everything with you.",
  },
  {
    q: 'Can I cancel anytime?',
    a: "After the initial 3-month minimum term, yes — 30 days written notice and you're done. We don't hold accounts hostage, add exit fees, or make the offboarding process difficult. We'd rather earn your continued business than trap you into it.",
  },
  {
    q: 'Who is Junction Media right for?',
    a: "We work best with NZ businesses that: are doing $1M+ in revenue (or have clear path to it), have a proven product or service, are ready to invest $10k+/month in marketing, and want a genuine strategic partner — not a vendor who just executes tasks. Industries we've worked in: ecommerce, professional services, SaaS, health and wellness, hospitality. If you're not sure if you're a fit, apply and we'll tell you honestly.",
  },
  {
    q: 'Who is Junction Media NOT right for?',
    a: "We're not the right fit for: businesses just starting out (pre-revenue or early stage), companies with budgets below $5,000/month for marketing, businesses that need a large team of junior staff executing high volumes of basic tasks, and anyone who needs an agency to 'manage up' to their board without real accountability for results. We're a small, focused operation. If you need a full-service agency with 20 people and multiple account managers, we're not that.",
  },
  {
    q: 'Do you work with businesses outside Auckland?',
    a: "Yes. We work with businesses across New Zealand — Auckland, Wellington, Christchurch, and everywhere else. All client work is delivered remotely. We meet by Zoom for weekly check-ins and strategy sessions. The NZ market is small enough that geography doesn't matter for most of what we do.",
  },
  {
    q: 'How do I apply?',
    a: "Head to the Apply page and fill out the short application form. We ask about your business, current marketing situation, goals, and budget. We review every application personally and respond within 48 hours. If there's a potential fit, we'll schedule a 30-minute call to discuss further. If there isn't, we'll tell you honestly and point you in the right direction.",
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.a,
    },
  })),
}

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
          Apply to Work With Me
        </Link>
      </nav>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-12">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
          FAQ
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Common Questions<br />
          <span className="text-gray-500">Answered Honestly</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          Everything you need to know about working with Junction Media — pricing, process,
          AI tools, contracts, and who we&apos;re right for.
        </p>
      </section>

      {/* FAQ List */}
      <section className="max-w-3xl mx-auto px-6 py-12 border-t border-gray-100">
        <div className="space-y-0 divide-y divide-gray-100">
          {faqs.map((faq, i) => (
            <div key={i} className="py-8">
              <h2 className="text-lg font-bold text-gray-900 mb-3 leading-snug">{faq.q}</h2>
              <p className="text-gray-600 leading-relaxed text-sm">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Still have questions? */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Still have questions?</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            If your question isn&apos;t answered above, the best way to get clarity is to apply.
            The application takes 3 minutes and we respond personally within 48 hours.
            We&apos;ll either confirm it&apos;s a fit, or tell you honestly if it&apos;s not and point you
            in a better direction.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/apply"
              className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors text-center"
            >
              Apply Now
            </Link>
            <a
              href="mailto:tom@junctionmedia.ai"
              className="inline-block border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:border-gray-500 transition-colors text-center"
            >
              Email Tom directly
            </a>
          </div>
        </div>
      </section>

      {/* Related links */}
      <section className="max-w-3xl mx-auto px-6 py-12 border-t border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Explore Services</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { title: 'Fractional CMO NZ', href: '/services/fractional-cmo' },
            { title: 'AI Marketing Systems', href: '/services/ai-marketing-systems' },
            { title: 'Google Ads NZ', href: '/services/google-ads-nz' },
            { title: 'SEO NZ', href: '/services/seo-nz' },
            { title: 'Web Design NZ', href: '/services/web-design-nz' },
            { title: 'View All Services', href: '/services' },
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

      {/* Footer */}
      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Junction Media. Auckland, New Zealand.</p>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Home</Link>
            <Link href="/services" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Services</Link>
            <Link href="/blog" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Blog</Link>
            <Link href="/privacy-policy" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Privacy</Link>
            <Link href="/terms" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
