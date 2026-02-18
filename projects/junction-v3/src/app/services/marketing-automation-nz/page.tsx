import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Marketing Automation NZ — AI-Powered Lead Nurture & CRM | Junction Media',
  description: 'Marketing automation for NZ businesses. AI email sequences, CRM integration, behaviour triggers, and lead nurture flows that convert prospects into customers 24/7.',
  keywords: 'marketing automation NZ, marketing automation Auckland, email automation NZ, CRM integration NZ, lead nurture automation NZ, automated marketing NZ, AI marketing automation',
  openGraph: {
    title: 'Marketing Automation NZ — AI-Powered Lead Nurture & CRM | Junction Media',
    description: 'AI-powered marketing automation for NZ businesses. Email sequences, CRM integration, and behaviour-triggered flows that run while you sleep.',
    url: 'https://www.junctionmedia.ai/services/marketing-automation-nz',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/services/marketing-automation-nz',
  },
}

const whatIsIncluded = [
  {
    title: 'AI-Powered Email Sequences',
    desc: 'Multi-step email sequences written with AI and personalised dynamically by contact behaviour, industry, and lifecycle stage. Every touchpoint adapts — not the same message blasted to everyone. Welcome series, onboarding flows, re-engagement campaigns, and post-purchase sequences built to convert.',
  },
  {
    title: 'CRM Integration & Setup',
    desc: 'Full CRM integration across HubSpot, ActiveCampaign, or your existing stack. Contact syncing, lead scoring rules, pipeline automation, and data hygiene. Your CRM becomes the single source of truth — not a graveyard of stale contacts that nobody trusts.',
  },
  {
    title: 'Behaviour-Based Triggers',
    desc: 'Automation that fires based on what contacts actually do — page visits, email opens, link clicks, form submissions, purchase history, and inactivity. Right message, right person, right moment. No more spray-and-pray batch campaigns that ignore intent signals.',
  },
  {
    title: 'Lead Nurture Flows',
    desc: 'End-to-end nurture sequences for every funnel stage — awareness, consideration, and decision. Leads that are not yet ready to buy get nurtured until they are. For NZ B2B businesses especially, where sales cycles are longer, this is where automation pays back its cost many times over.',
  },
  {
    title: 'Lead Scoring & Qualification',
    desc: 'Automated lead scoring based on demographic fit and behavioural signals. Sales teams stop wasting time on cold leads — they see only the contacts ready to have a conversation. Score thresholds trigger sales alerts, CRM tasks, and handoff sequences automatically.',
  },
  {
    title: 'Reporting & Optimisation',
    desc: 'Monthly reporting on sequence performance — open rates, click rates, reply rates, conversion rates, and revenue attribution. Flows are iterated on data, not gut feel. What works gets doubled down on. What does not gets cut.',
  },
]

const processSteps = [
  {
    phase: 'Week 1–2',
    title: 'Audit & Architecture',
    desc: 'Audit of your current automation setup (if any), CRM state, and lead flow. Map the customer journey end-to-end — where leads enter, where they stall, where they convert. Identify the top 3 automation gaps killing revenue right now. Most NZ businesses have a welcome sequence and nothing else. The gap between that and a full nurture architecture is where the money is.',
  },
  {
    phase: 'Week 3–4',
    title: 'CRM & Trigger Setup',
    desc: 'CRM integration configured. Contact properties mapped. Lead scoring rules set. Behaviour triggers established. The plumbing done properly so every automation that follows actually fires and tracks correctly. This is the unglamorous work most agencies skip — and why their sequences underperform.',
  },
  {
    phase: 'Month 2',
    title: 'Core Sequences Live',
    desc: 'Welcome sequence, lead nurture flow, and at least one behaviour-triggered sequence live. AI-written copy reviewed and refined. First performance data coming in. Typically within the first 30 days of a live sequence, you will see leads re-engaging that had gone cold.',
  },
  {
    phase: 'Month 3+',
    title: 'Full Funnel Automation',
    desc: 'Full funnel automation built out — top of funnel, mid funnel, and bottom of funnel sequences all running. Lead scoring refined on real data. Sales and marketing fully aligned on what a sales-ready lead looks like. Automation compounding as the contact database grows.',
  },
]

const faqs = [
  {
    q: 'What platforms do you use for marketing automation in NZ?',
    a: 'We work primarily with HubSpot, ActiveCampaign, and Klaviyo — the three platforms best suited to NZ business sizes and use cases. HubSpot for B2B businesses with longer sales cycles and CRM needs. ActiveCampaign for mid-market businesses wanting powerful automation without HubSpot pricing. Klaviyo for e-commerce businesses where purchase behaviour is the core trigger. We recommend based on your situation, not on what we have a reseller margin on.',
  },
  {
    q: 'How much does marketing automation cost in NZ?',
    a: 'Our marketing automation management starts at $800/month NZD for setup and management of core sequences. More complex builds with full CRM integration, lead scoring, and multi-channel automation sit in the $1,500–$3,000/month range. Platform subscription costs (HubSpot, ActiveCampaign, etc.) are separate and paid directly by you. We quote based on complexity after an initial audit — not before we understand what you actually need.',
  },
  {
    q: 'We already have HubSpot / ActiveCampaign. Can you optimise it?',
    a: 'Yes — and this is often where the best ROI is. Most NZ businesses have a marketing automation platform that is underutilised. They have the tool, but the sequences are basic, the lead scoring is off, and the CRM data is messy. Auditing and rebuilding on an existing platform is typically faster and cheaper than starting from scratch, and the improvements are immediate.',
  },
  {
    q: 'What is the difference between email marketing and marketing automation?',
    a: 'Email marketing is about sending campaigns — newsletters, promotions, announcements. Marketing automation is about building systems that respond to contact behaviour. The overlap is real (both use email), but automation goes further: it tracks what contacts do, scores their intent, fires the right message at the right moment, and hands leads off to sales when they are ready. Automation is infrastructure. Email marketing is content. You need both, but they serve different purposes.',
  },
  {
    q: 'How long before we see results from marketing automation?',
    a: 'Behaviour-triggered sequences start firing immediately once live — so if you have existing traffic and leads, you will see the automation working within days of going live. The compounding effects (better lead quality, shorter sales cycles, higher conversion rates) build over 60–90 days as the contact database grows and sequences are optimised on real performance data. Marketing automation is not a quick win — it is infrastructure that pays back compounding returns over time.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Marketing Automation NZ',
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
  description: 'AI-powered marketing automation for NZ businesses. Email sequences, CRM integration, behaviour-triggered flows, and lead nurture automation that converts prospects into customers.',
  areaServed: { '@type': 'Country', name: 'New Zealand' },
  offers: {
    '@type': 'Offer',
    priceSpecification: {
      '@type': 'PriceSpecification',
      minPrice: '800',
      maxPrice: '3000',
      priceCurrency: 'NZD',
      unitText: 'month',
    },
  },
}

export default function MarketingAutomationNZPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Structured Data */}
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
          Apply to Work With Me
        </Link>
      </nav>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-16">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
          Service · Marketing Automation NZ
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Marketing Automation<br />
          <span className="text-gray-500">That Actually Runs</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          Most NZ businesses have a welcome email and call it automation. We build the full
          system — AI-powered sequences, CRM integration, behaviour triggers, and lead nurture
          flows that convert prospects into customers while you sleep.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/apply"
            className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors text-center"
          >
            Apply to Work With Me
          </Link>
          <Link
            href="/services"
            className="inline-block border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:border-gray-500 transition-colors text-center"
          >
            View All Services
          </Link>
        </div>
      </section>

      {/* Key Numbers */}
      <section className="max-w-3xl mx-auto px-6 py-12 border-t border-gray-100">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { stat: '$800–$3k', label: 'Per month NZD' },
            { stat: '3-month', label: 'Minimum term' },
            { stat: '24/7', label: 'Automation runs continuously' },
            { stat: '60–90', label: 'Days to full compounding' },
          ].map((item) => (
            <div key={item.label} className="p-4 border border-gray-100 rounded-2xl text-center">
              <p className="text-2xl font-bold text-gray-900 mb-1">{item.stat}</p>
              <p className="text-xs text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Automation Fails */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Why Most NZ Marketing Automation Underperforms</h2>
        <div className="space-y-4 mb-8">
          <p className="text-gray-600 leading-relaxed">
            The problem is not the platform — it is the architecture. Most NZ businesses set up a
            tool (HubSpot, ActiveCampaign, Mailchimp), build a basic welcome sequence, and then
            never touch it again. The tool does nothing because no one built it to do anything.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Real automation is about the system behind it: lead scoring that separates hot from cold,
            behaviour triggers that fire when intent is high, nurture sequences that move contacts
            through the funnel without human intervention. That is the infrastructure most NZ
            businesses are missing.
          </p>
        </div>
        <div className="space-y-4">
          {[
            {
              num: '01',
              title: 'Behaviour Triggers Over Batch Sends',
              desc: 'The highest-converting sequences are triggered by what contacts do — visiting a pricing page, downloading a guide, opening an email three times but not clicking. These intent signals tell you exactly who is ready for what message. Batch campaigns ignore all of that. Behaviour-triggered automation captures it.',
            },
            {
              num: '02',
              title: 'CRM as the Foundation',
              desc: 'Automation without a clean CRM is a house built on sand. Contact data needs to be accurate, segmented, and synced. Lead scores need to reflect real buying intent. Pipeline stages need to match actual sales reality. We fix the CRM first — everything else follows from that.',
            },
            {
              num: '03',
              title: 'AI Copy That Personalises at Scale',
              desc: 'AI does not just write the sequences — it personalises them. Different messages for different industries, company sizes, funnel stages, and previous interactions. Personalisation that would take a team of copywriters to produce manually, running autonomously and consistently.',
            },
          ].map((pillar) => (
            <div key={pillar.num} className="border border-gray-100 rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-4">
                <span className="text-4xl font-black text-gray-100 leading-none">{pillar.num}</span>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{pillar.title}</h3>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-gray-500 text-sm mt-6">
          Related:{' '}
          <Link href="/blog/marketing-automation-auckland" className="underline hover:text-gray-700 transition-colors">
            Marketing Automation Auckland: What AI Actually Makes Possible →
          </Link>
        </p>
      </section>

      {/* What is Included */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">What&apos;s Included</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {whatIsIncluded.map((item) => (
            <div key={item.title} className="p-6 border border-gray-100 rounded-2xl">
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NZ Examples */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">What This Looks Like for NZ Businesses</h2>
        <div className="space-y-6">
          {[
            {
              type: 'E-commerce (Auckland)',
              scenario: 'A health supplement brand with 8,000 subscribers and no automation beyond a basic welcome email. Built: abandoned cart sequence (3-step), post-purchase upsell flow, win-back sequence for 90-day inactive subscribers, and a VIP tier trigger based on lifetime spend. Result: email revenue up 34% in 60 days without increasing ad spend.',
            },
            {
              type: 'Professional Services (Wellington)',
              scenario: 'An accounting firm generating inbound leads via SEO with no follow-up system. Leads were filling out a contact form and hearing nothing for days. Built: instant lead response sequence, 5-touch nurture flow over 3 weeks, and a sales-ready alert when leads hit a threshold score. Lead-to-meeting conversion rate doubled within the first quarter.',
            },
            {
              type: 'B2B SaaS (New Zealand)',
              scenario: 'A software company with a 14-day free trial and no onboarding automation. 70% of trials were churning without converting. Built: day-by-day onboarding sequence triggered by product activity (or inactivity), milestone celebration emails, and a human sales touchpoint triggered at day 10 for high-engagement trials. Trial-to-paid conversion improved by 28%.',
            },
          ].map((example) => (
            <div key={example.type} className="border border-gray-100 rounded-2xl p-8">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                {example.type}
              </p>
              <p className="text-gray-600 leading-relaxed text-sm">{example.scenario}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">How It Works</h2>
        <div className="space-y-6">
          {processSteps.map((step, i) => (
            <div key={step.phase} className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {i + 1}
                </div>
                {i < processSteps.length - 1 && (
                  <div className="w-px flex-1 bg-gray-100 mt-2" />
                )}
              </div>
              <div className="pb-8">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{step.phase}</p>
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Pricing</h2>
        <div className="bg-gray-50 rounded-2xl p-8">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-4xl font-bold text-gray-900">$800–$3,000</span>
            <span className="text-gray-500">/month NZD</span>
          </div>
          <p className="text-gray-600 leading-relaxed mb-6">
            Management and strategy fee only — platform subscriptions (HubSpot, ActiveCampaign, etc.)
            are separate and paid directly by you. All tiers include audit, build, ongoing
            optimisation, and monthly reporting. 3-month minimum engagement.
          </p>
          <div className="space-y-3 mb-8">
            {[
              { label: 'Core (welcome + nurture sequences, basic CRM setup)', cost: '$800/mo' },
              { label: 'Growth (full funnel automation, lead scoring, CRM integration)', cost: '$1,500/mo' },
              { label: 'Scale (multi-channel automation, advanced segmentation, sales alignment)', cost: '$3,000/mo' },
            ].map((row) => (
              <div
                key={row.label}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-3 border-b border-gray-200 last:border-0 text-gray-700"
              >
                <span className="text-sm">{row.label}</span>
                <span className="text-sm font-semibold">{row.cost}</span>
              </div>
            ))}
          </div>
          <Link
            href="/apply"
            className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors"
          >
            Apply Now
          </Link>
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
            { title: 'Marketing Automation Auckland: What AI Makes Possible', href: '/blog/marketing-automation-auckland' },
            { title: 'Email Marketing NZ', href: '/services/email-marketing-nz' },
            { title: 'AI Marketing Systems NZ', href: '/services/ai-marketing-systems' },
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

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 py-20 border-t border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to build automation that actually converts?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            If you are serious about turning your CRM and email platform into a revenue-generating
            machine — apply below. I review applications and respond within 48 hours.
          </p>
          <Link
            href="/apply"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg"
          >
            Apply to Work With Me
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
            <Link href="/services" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Services</Link>
            <Link href="/blog" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Blog</Link>
            <Link href="/apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
