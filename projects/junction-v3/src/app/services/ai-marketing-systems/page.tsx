import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AI Marketing Systems NZ | AI Marketing Consultant NZ | Junction Media',
  description: 'AI marketing systems for NZ businesses. Tom Hall-Taylor builds the 5 core AI marketing systems that replace a large agency team — content, paid media, customer intelligence, competitive monitoring, and reporting.',
  keywords: 'AI marketing systems NZ, AI marketing consultant NZ, marketing automation NZ, AI marketing Auckland, AI-native marketing NZ, marketing AI systems New Zealand, Junction Media',
  openGraph: {
    title: 'AI Marketing Systems NZ | Tom Hall-Taylor | Junction Media',
    description: '5 core AI marketing systems for NZ businesses. Built for your specific business — not off-the-shelf. By application only.',
    url: 'https://www.junctionmedia.ai/services/ai-marketing-systems',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/services/ai-marketing-systems',
  },
}

const systems = [
  {
    number: '01',
    title: 'AI Content Engine',
    desc: 'A content pipeline that produces brand-consistent blog posts, social content, and ad copy at scale — without you writing a word. Your brand voice, positioning, and SEO targets locked in as training context. Human reviews and approves. System generates, schedules, and publishes.',
    outcomes: ['10x content volume at same cost', 'Consistent brand voice across every channel', 'SEO-targeted publishing calendar, always full'],
    relatedPost: { title: 'What AI-native marketing actually looks like', href: '/blog/ai-native-marketing-nz' },
  },
  {
    number: '02',
    title: 'Paid Media Optimisation System',
    desc: 'Meta Ads and Google Ads managed with AI layers on top. Creative testing at scale (20 variants generated, 5 approved, system learns what wins). Audience signal monitoring. Automated budget shifts to top performers. Anomaly alerts before they become expensive problems.',
    outcomes: ['Lower CPA through systematic creative testing', 'Early detection of creative fatigue and audience saturation', 'Budget allocation that follows performance, not gut feel'],
    relatedPost: { title: 'AI marketing for ecommerce NZ', href: '/blog/ai-marketing-ecommerce-nz' },
  },
  {
    number: '03',
    title: 'Customer Intelligence Agent',
    desc: 'An AI agent that continuously analyses your customer data — purchase patterns, review sentiment, support conversations, email behaviour. Surfaces what segments have highest LTV, what products are frequently bought together, what complaints signal product gaps, what compliments signal messaging gold.',
    outcomes: ['Identify your highest-LTV customer segments', 'Surface messaging angles from real customer language', 'Catch at-risk customers before they churn'],
    relatedPost: { title: 'Marketing AI agents for NZ businesses', href: '/blog/marketing-ai-agent-nz' },
  },
  {
    number: '04',
    title: 'Competitive Intelligence Monitor',
    desc: 'Continuous monitoring of competitor activity — new products, pricing changes, ad creative shifts, content publishing velocity, review volume. Weekly competitive brief delivered to you. Real-time alerts on significant moves. No more finding out months later.',
    outcomes: ['Know competitor moves within 24 hours', 'Weekly competitive brief in plain English', 'Identify gaps and opportunities before competitors do'],
    relatedPost: { title: 'AI systems vs AI tools: the distinction worth thousands', href: '/blog/ai-systems-vs-ai-tools' },
  },
  {
    number: '05',
    title: 'Reporting & Insight Layer',
    desc: 'A system that pulls data from your ad platforms, analytics, email, and ecommerce backend — and synthesises it into plain-English weekly reports. What\'s working. What\'s not. Why. What to do about it. Replaces 3–5 hours of manual data synthesis per week, and produces better insights.',
    outcomes: ['3–5 hours/week back for the founder or marketing lead', 'Anomalies flagged before they become expensive', 'One source of truth across all marketing channels'],
    relatedPost: { title: '5 AI marketing systems every NZ business should have', href: '/blog/5-ai-marketing-systems-nz-businesses' },
  },
]

const processSteps = [
  {
    phase: 'Month 1',
    title: 'Audit & Architecture',
    desc: 'Deep dive into your current marketing stack, data, and goals. I map the full AI system architecture — what gets built, in what order, what it connects to. You get a clear picture before anything is built.',
  },
  {
    phase: 'Month 2',
    title: 'Core Systems Build',
    desc: 'The content engine, paid media system, and reporting layer go live. First outputs are reviewed and refined. You start to see the system in action — and I start to tune it to your specific business.',
  },
  {
    phase: 'Month 3',
    title: 'Intelligence Layer Live',
    desc: 'Customer intelligence agent and competitive monitor deployed. The system now has enough data to start producing meaningful insight. Weekly reporting kicks in. We review, iterate, and expand.',
  },
  {
    phase: 'Ongoing',
    title: 'Compound & Optimise',
    desc: 'Systems compound over time. The AI gets better data, the content engine learns what converts, the ad system accumulates creative intelligence. Monthly reviews surface what to build next.',
  },
]

const faqs = [
  {
    q: 'What exactly is an "AI marketing system"?',
    a: 'An AI marketing system is a set of interconnected components that operate together toward a sustained marketing outcome — without requiring your constant input to function. It\'s different from an AI tool (like ChatGPT) which you use manually. A system runs. A tool requires you. The five systems I build cover content, paid media, customer intelligence, competitive monitoring, and reporting. Together, they create a marketing operation that compounds over time.',
  },
  {
    q: 'How long does it take to see results?',
    a: 'Honest answer: the systems take 60–90 days to build and dial in properly. You\'ll see output from month one (content published, ads running with AI optimisation). You\'ll see meaningful performance improvement by month three. Compounding results — where the system is significantly outperforming your previous approach — typically visible by month five to six.',
  },
  {
    q: 'Do I need to be technical to work with you?',
    a: 'No. I handle all the technical architecture and integration. You need to be able to review content, provide feedback, and make strategic decisions. The whole point of these systems is that they reduce the cognitive load on you — not increase it.',
  },
  {
    q: 'What tools and platforms do the systems use?',
    a: 'It depends on your existing stack. I build systems around what you already use where possible — Shopify, Google Analytics, Meta Ads, Google Ads, Klaviyo, HubSpot, and similar. I\'ll recommend changes where your current setup limits what\'s possible, but I don\'t start from scratch if you don\'t need to.',
  },
  {
    q: 'Is this available as a standalone service or only with the fractional CMO?',
    a: 'Both. If you already have strong marketing leadership in-house, I can build and hand over the AI systems. If you want ongoing strategic ownership, the fractional CMO engagement includes the full system build-out as part of the service.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'AI Marketing Systems NZ',
  provider: {
    '@type': 'Person',
    name: 'Tom Hall-Taylor',
    jobTitle: 'AI Marketing Consultant',
    url: 'https://www.junctionmedia.ai',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Auckland',
      addressCountry: 'NZ',
    },
  },
  description: 'Five core AI marketing systems for NZ businesses — content engine, paid media optimisation, customer intelligence, competitive monitoring, and reporting. Built for your specific business.',
  areaServed: { '@type': 'Country', name: 'New Zealand' },
}

export default function AIMarketingSystemsPage() {
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
          href="/#apply"
          className="text-sm bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors"
        >
          Apply to Work With Me
        </Link>
      </nav>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-16">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
          Service · AI Marketing Systems
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          AI Marketing Systems<br />
          <span className="text-gray-500">for NZ Businesses</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          Five core AI systems that replace the output of a large agency team — built for your specific
          business, not off-the-shelf. Marketing that runs, learns, and compounds while you focus on
          running the business.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/#apply"
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

      {/* What AI-Native Marketing Means */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">What AI-Native Marketing Actually Means</h2>
        <div className="space-y-4 mb-8">
          <p className="text-gray-600 leading-relaxed">
            Most NZ businesses adding &quot;AI to their marketing&quot; are adding tools. A better copywriting
            assistant. An AI image generator. An automated report. These save time at the task level.
            Useful — but not transformative.
          </p>
          <p className="text-gray-600 leading-relaxed">
            AI-native marketing is different. It&apos;s a set of interconnected systems that operate
            together toward a sustained outcome — without requiring your constant input. The distinction:
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <div className="p-6 border border-gray-100 rounded-2xl">
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Tool approach</p>
            <p className="text-gray-600 text-sm leading-relaxed">
              You write prompts in ChatGPT to draft social captions. You spend 20 minutes instead of 45.
              That&apos;s it.
            </p>
          </div>
          <div className="p-6 border border-gray-900 rounded-2xl bg-gray-50">
            <p className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">System approach</p>
            <p className="text-gray-600 text-sm leading-relaxed">
              A content pipeline pulls from brand guidelines, campaign performance, and content calendar.
              Produces drafts for review. You approve in 5 minutes. It learns from what you approve.
            </p>
          </div>
        </div>
        <p className="text-gray-500 text-sm">
          Read more:{' '}
          <Link href="/blog/ai-systems-vs-ai-tools" className="underline hover:text-gray-700 transition-colors">
            AI systems vs AI tools: the distinction worth thousands per month →
          </Link>
        </p>
      </section>

      {/* The 5 Systems */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-4">The 5 Core AI Systems</h2>
        <p className="text-gray-600 mb-10">
          These are the five systems I build for every client. Together they replace the output of
          a 10-person agency team — at a fraction of the cost.
        </p>
        <div className="space-y-8">
          {systems.map((system) => (
            <div key={system.number} className="border border-gray-100 rounded-2xl overflow-hidden">
              <div className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-4xl font-black text-gray-100 leading-none">{system.number}</span>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{system.title}</h3>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">{system.desc}</p>
                <div className="space-y-2 mb-6">
                  {system.outcomes.map((outcome) => (
                    <div key={outcome} className="flex items-center gap-3 text-sm text-gray-600">
                      <span className="w-5 h-5 rounded-full bg-gray-900 text-white flex items-center justify-center flex-shrink-0 text-xs">✓</span>
                      {outcome}
                    </div>
                  ))}
                </div>
                <Link
                  href={system.relatedPost.href}
                  className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
                >
                  Related: {system.relatedPost.title} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">How the Build Works</h2>
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

      {/* Result */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-8">What This Looks Like in Practice</h2>
        <div className="bg-gray-50 rounded-2xl p-8">
          <p className="text-4xl font-bold text-gray-900 mb-2">22 hours/week</p>
          <p className="text-gray-500 text-sm mb-4">Returned to the team — with increased marketing output</p>
          <p className="text-gray-600 leading-relaxed">
            Before building an integrated AI marketing system, one client was spending roughly 30 hours
            per week across their team on marketing execution — content, ad management, customer queries,
            reporting. After six months of system building, that dropped to under 8 hours. Marketing
            output — content volume, campaign activity, customer touchpoints — increased.
          </p>
          <p className="text-gray-500 text-sm mt-4">
            Read:{' '}
            <Link href="/blog/ai-systems-vs-ai-tools" className="underline hover:text-gray-700 transition-colors">
              AI systems vs AI tools: the distinction worth thousands →
            </Link>
          </p>
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

      {/* Related Posts */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Deep Dives</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { title: 'AI systems vs AI tools: the distinction worth thousands', href: '/blog/ai-systems-vs-ai-tools' },
            { title: '5 AI marketing systems every NZ business should have', href: '/blog/5-ai-marketing-systems-nz-businesses' },
            { title: 'Marketing AI agents for NZ businesses', href: '/blog/marketing-ai-agent-nz' },
            { title: 'AI-native marketing: what it is and why it changes everything', href: '/blog/ai-native-marketing-nz' },
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
          <h2 className="text-3xl font-bold mb-4">Ready to build?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            If you&apos;re an NZ business ready to move from ad-hoc marketing to a system that compounds —
            apply below. I review applications and respond within 48 hours.
          </p>
          <Link
            href="/#apply"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg"
          >
            Apply to Work With Me
          </Link>
          <p className="text-gray-400 text-sm mt-4">Maximum 4–5 clients. Serious enquiries only.</p>
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
            <Link href="/#apply" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
