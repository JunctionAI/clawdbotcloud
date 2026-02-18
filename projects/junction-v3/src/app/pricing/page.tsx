import { Metadata } from 'next';
import Link from 'next/link';

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Pricing | Junction Media — AI-Native Marketing NZ',
  description:
    '$10,000/month full-stack AI marketing partnership for NZ businesses doing $500k+ revenue. Includes AI agents, strategy, SEO, paid media, content, web dev, and weekly meetings. By application only.',
  keywords:
    'Junction Media pricing, AI marketing pricing NZ, fractional CMO pricing NZ, AI marketing retainer NZ, $10k marketing NZ',
  openGraph: {
    title: 'Pricing | Junction Media — $10k/month AI-Native Partnership',
    description:
      'One retainer. Full AI stack. $10,000/month for NZ businesses serious about growth. By application only. Maximum 4–5 clients.',
    url: 'https://www.junctionmedia.ai/pricing',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/pricing',
  },
};

// ─── JSON-LD Structured Data ──────────────────────────────────────────────────

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Junction Media AI Marketing Partnership',
  description:
    'Full-stack AI-native marketing partnership for NZ businesses. Includes AI marketing strategy, AI agents running 24/7, SEO, Google Ads, Meta Ads, content, email, web development, and weekly strategy meetings.',
  brand: {
    '@type': 'Organization',
    name: 'Junction Media',
    url: 'https://www.junctionmedia.ai',
  },
  url: 'https://www.junctionmedia.ai/pricing',
  offers: {
    '@type': 'Offer',
    price: '10000',
    priceCurrency: 'NZD',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: '10000',
      priceCurrency: 'NZD',
      unitCode: 'MON',
      unitText: 'month',
    },
    availability: 'https://schema.org/LimitedAvailability',
    eligibleRegion: {
      '@type': 'Country',
      name: 'New Zealand',
    },
    seller: {
      '@type': 'Organization',
      name: 'Junction Media',
      url: 'https://www.junctionmedia.ai',
    },
    description:
      'By application only. Maximum 4–5 clients at any time. Includes full AI marketing stack, AI agents, weekly strategy meetings, all digital channels, and human oversight.',
  },
};

// ─── What's Included ──────────────────────────────────────────────────────────

const included = [
  {
    icon: '🧠',
    title: 'Full AI Marketing Strategy',
    desc: 'Data-driven 90-day roadmaps built around your revenue goals. No guesswork — every channel, every initiative, every dollar is intentional.',
  },
  {
    icon: '🤖',
    title: 'AI Agents Running 24/7',
    desc: 'Autonomous AI systems that research, optimise, and act around the clock. Your marketing operation never sleeps.',
  },
  {
    icon: '📅',
    title: 'Weekly Strategy Meetings',
    desc: 'Direct access every week. Review performance, adjust strategy, make decisions fast. No account managers in the middle.',
  },
  {
    icon: '⚙️',
    title: 'Production Pipelines',
    desc: 'End-to-end content and creative production pipelines. Strategy becomes execution without the drag.',
  },
  {
    icon: '🔍',
    title: 'SEO — Technical + Content',
    desc: 'Technical SEO foundation combined with AI-native content production. Organic traffic that compounds every month.',
  },
  {
    icon: '📣',
    title: 'Google Ads Management',
    desc: 'AI-optimised Google Ads with continuous refinement. Smart bidding, creative testing, conversion tracking done right.',
  },
  {
    icon: '📲',
    title: 'Meta Ads (Facebook & Instagram)',
    desc: 'Full-funnel Meta campaigns with AI-powered creative testing and audience strategy. Efficient spend, scalable results.',
  },
  {
    icon: '✍️',
    title: 'Content Marketing at Scale',
    desc: 'Consistent publishing across blog, social, and email — driven by AI, directed by senior strategy.',
  },
  {
    icon: '📧',
    title: 'Email Marketing & Automation',
    desc: 'Klaviyo flows, campaigns, and list strategy. Welcome, abandoned cart, post-purchase, win-back — all built and running.',
  },
  {
    icon: '💻',
    title: 'Web Development',
    desc: 'Ongoing website iteration, landing page builds, CRO improvements. Your web presence evolves with your business.',
  },
  {
    icon: '👁️',
    title: 'Human Oversight for Quality',
    desc: 'AI does the volume. Senior humans do the judgement calls. Everything that ships has been reviewed by someone who cares.',
  },
  {
    icon: '👥',
    title: 'AI Staff Augmentation',
    desc: 'Specialist AI agents for research, analysis, customer intelligence, and competitive monitoring — embedded in your operation.',
  },
];

// ─── What You Get Breakdown ───────────────────────────────────────────────────

const breakdown = [
  {
    category: 'Strategy',
    items: [
      '90-day growth roadmaps, refreshed quarterly',
      'Channel mix strategy and budget allocation',
      'Competitive intelligence and market positioning',
      'Weekly performance review and decision-making',
    ],
  },
  {
    category: 'AI Systems',
    items: [
      'AI content engine (blog, social, email)',
      'AI paid media optimisation agents',
      'Customer intelligence and segmentation AI',
      'Competitive monitoring (automated alerts)',
    ],
  },
  {
    category: 'Channels',
    items: [
      'SEO — technical, content, and authority building',
      'Google Ads — search, shopping, display, YouTube',
      'Meta Ads — Facebook and Instagram full-funnel',
      'Email marketing — automation, campaigns, list growth',
    ],
  },
  {
    category: 'Production',
    items: [
      'Content writing and editing at scale',
      'Creative assets for paid and organic',
      'Landing pages and web development',
      'Reporting dashboards and monthly performance reports',
    ],
  },
];

// ─── Who It's For / Not For ───────────────────────────────────────────────────

const forItems = [
  'NZ businesses generating $500k+ annual revenue',
  'Founders who want real results, not vanity metrics',
  'Businesses ready to invest seriously in marketing infrastructure',
  'Companies that see marketing as a growth lever, not a cost',
  'Teams willing to collaborate — we need your context to do our best work',
  'Businesses thinking about the next 12 months, not the next 30 days',
];

const notForItems = [
  'Businesses looking for a quick one-off campaign',
  'Brands with less than $500k revenue (the ROI math doesn\'t work)',
  'Owners who want to approve every social media post',
  'Anyone looking for the cheapest option on the market',
  'Businesses without a product or service that actually works',
  'Project-based work — we only do ongoing partnerships',
];

// ─── FAQs ─────────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: 'Is $10,000/month actually worth it?',
    a: 'That depends on your business. If you\'re doing $500k–$10M+ in revenue, and marketing is currently costing you growth — then yes, it\'s worth it. One additional client per week often pays for this retainer several times over. The question isn\'t whether it\'s expensive. It\'s whether the return justifies it. We only take clients where we believe the answer is yes.',
  },
  {
    q: 'What about contracts? Can I cancel anytime?',
    a: 'Engagements run on a 3-month minimum. Not to lock you in — but because meaningful results take time to build. After 3 months, you\'re on a rolling monthly arrangement. We don\'t believe in 12-month lock-ins. If we\'re not delivering, you should be able to leave. That keeps us accountable.',
  },
  {
    q: 'How does AI actually work in my marketing?',
    a: 'AI runs the processes that don\'t require human judgment at scale — content drafts, data analysis, ad optimisation, competitive monitoring, reporting. Humans (us) direct the strategy, make the calls that require business context, and review everything before it ships. Think of it as an AI-powered team with senior human oversight. You get the volume of a 10-person agency with the judgment of a senior operator.',
  },
  {
    q: 'What does "by application" mean? Why can\'t I just sign up?',
    a: 'Because we cap at 4–5 clients per operator. That cap is the whole model — it\'s what lets us give you real attention instead of farming your account out to a junior. We review every application personally and only accept businesses where we\'re confident we can deliver serious results. If it\'s not a fit, we\'ll tell you straight.',
  },
];

// ─── Logo ─────────────────────────────────────────────────────────────────────

function JunctionLogo() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="logoGradPricing" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#4ade80' }} />
          <stop offset="100%" style={{ stopColor: '#22c55e' }} />
        </linearGradient>
      </defs>
      <path d="M25 8 Q8 8 8 25" stroke="url(#logoGradPricing)" strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M55 8 Q72 8 72 25" stroke="url(#logoGradPricing)" strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M25 72 Q8 72 8 55" stroke="url(#logoGradPricing)" strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M55 72 Q72 72 72 55" stroke="url(#logoGradPricing)" strokeWidth="8" strokeLinecap="round" fill="none" />
    </svg>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ── Nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-800">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8">
              <JunctionLogo />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-extrabold text-zinc-100 text-lg tracking-tight">Junction</span>
              <span className="font-normal text-zinc-500 text-lg">Media</span>
            </div>
          </Link>
          <Link
            href="/apply"
            className="px-5 py-2 rounded-full text-sm font-semibold text-zinc-950 bg-green-400 hover:bg-green-300 transition-colors"
          >
            Apply Now
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <header className="pt-36 pb-20 px-6 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-green-500/8 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto relative">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            By Application Only · 4–5 Clients Maximum
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-zinc-100 tracking-tight leading-tight mb-6">
            One Partnership.<br />
            <span className="text-green-400">Full AI Stack.</span>
          </h1>

          <p className="text-xl text-zinc-400 leading-relaxed mb-6 max-w-2xl">
            Junction Media operates differently. Instead of a dozen services you piece together yourself,
            you get one embedded operator — with an entire AI-powered marketing operation running under them —
            accountable for your growth.
          </p>

          <p className="text-zinc-500 leading-relaxed max-w-xl">
            There&apos;s one tier. One price. And we only work with businesses where we believe the partnership
            will create serious results. If that&apos;s you, apply below.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-green-400 text-zinc-950 font-bold text-base hover:bg-green-300 transition-colors"
            >
              Apply to Partner
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <a
              href="#what-you-get"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-zinc-700 text-zinc-300 font-medium text-base hover:border-zinc-500 hover:text-zinc-100 transition-colors"
            >
              See what&apos;s included
            </a>
          </div>
        </div>
      </header>

      {/* ── Pricing Card ── */}
      <section className="px-6 pb-20">
        <div className="max-w-3xl mx-auto">
          <div className="relative rounded-3xl border border-green-500/30 bg-gradient-to-br from-zinc-900 to-zinc-950 p-8 md:p-12 overflow-hidden">
            {/* Corner glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-10">
                <div>
                  <span className="inline-block text-xs font-bold uppercase tracking-widest text-green-400 mb-3">
                    The Partnership
                  </span>
                  <h2 className="text-2xl font-black text-zinc-100">Full AI Stack Retainer</h2>
                  <p className="text-zinc-500 mt-1.5 text-sm">All channels. All systems. One team.</p>
                </div>
                <div className="text-left sm:text-right flex-shrink-0">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-zinc-500 text-lg font-medium">NZD</span>
                    <span className="text-5xl font-black text-zinc-100">$10,000</span>
                  </div>
                  <p className="text-zinc-400 text-sm mt-1">per month · $120,000/year</p>
                  <p className="text-zinc-600 text-xs mt-1">3-month minimum · rolling monthly after</p>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-zinc-800 mb-8" />

              {/* Inclusions grid */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-6">
                  Everything that&apos;s included
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {included.map((item) => (
                    <div
                      key={item.title}
                      className="flex items-start gap-3.5 p-4 rounded-xl bg-zinc-800/50 border border-zinc-800 hover:border-zinc-700 transition-colors"
                    >
                      <span className="text-2xl leading-none flex-shrink-0 mt-0.5">{item.icon}</span>
                      <div>
                        <p className="text-sm font-semibold text-zinc-200 mb-1">{item.title}</p>
                        <p className="text-xs text-zinc-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-zinc-800 mt-10 mb-8" />

              {/* CTA */}
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <Link
                  href="/apply"
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-green-400 text-zinc-950 font-bold text-base hover:bg-green-300 transition-colors"
                >
                  Apply for a Partnership Spot
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <p className="text-xs text-zinc-500 text-center sm:text-left leading-relaxed max-w-xs">
                  Applications reviewed personally.<br />
                  Response within 5 business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── What You Get Breakdown ── */}
      <section className="px-6 py-20 border-t border-zinc-800" id="what-you-get">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-green-400 mb-4">
            The breakdown
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-zinc-100 mb-4 leading-tight">
            What you actually get
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-12 max-w-xl">
            Not a services menu. An integrated operation — every channel, every system, working together
            toward a single objective: your revenue growth.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            {breakdown.map((section) => (
              <div
                key={section.category}
                className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800"
              >
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-2 h-2 rounded-full bg-green-400" />
                  <h3 className="font-bold text-zinc-200 text-sm uppercase tracking-wider">{section.category}</h3>
                </div>
                <ul className="space-y-3">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-400">
                      <svg className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who It's For / Not For ── */}
      <section className="px-6 py-20 border-t border-zinc-800">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-green-400 mb-4">
            Honest filtering
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-zinc-100 mb-4 leading-tight">
            Is this right for you?
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-12 max-w-xl">
            We&apos;re not for everyone — and that&apos;s intentional. Here&apos;s a straight answer on who we work with
            and who we don&apos;t.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* For */}
            <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-7 h-7 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-bold text-green-400">This is for you if…</h3>
              </div>
              <ul className="space-y-3.5">
                {forItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-zinc-300 leading-snug">
                    <svg className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Not For */}
            <div className="rounded-2xl border border-zinc-700 bg-zinc-900/50 p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-7 h-7 rounded-full bg-zinc-700/60 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="font-bold text-zinc-400">This is NOT for you if…</h3>
              </div>
              <ul className="space-y-3.5">
                {notForItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-zinc-500 leading-snug">
                    <svg className="w-4 h-4 text-zinc-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Scarcity / Model Section ── */}
      <section className="px-6 py-20 border-t border-zinc-800">
        <div className="max-w-3xl mx-auto">
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                stat: '4–5',
                label: 'Clients per operator',
                sub: 'The intentional cap that makes deep work possible',
              },
              {
                stat: '$500k+',
                label: 'Minimum revenue',
                sub: 'The threshold where this partnership creates serious ROI',
              },
              {
                stat: '3 months',
                label: 'Minimum engagement',
                sub: 'Real results take time to build — then they compound',
              },
            ].map((item) => (
              <div
                key={item.label}
                className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 text-center"
              >
                <p className="text-4xl font-black text-green-400 mb-2">{item.stat}</p>
                <p className="text-sm font-bold text-zinc-200 mb-2">{item.label}</p>
                <p className="text-xs text-zinc-500 leading-relaxed">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="px-6 py-20 border-t border-zinc-800">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-green-400 mb-4">
            Common questions
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-zinc-100 mb-12 leading-tight">
            The straight answers
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="p-7 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors"
              >
                <h3 className="font-bold text-zinc-100 mb-3 text-lg leading-snug">{faq.q}</h3>
                <p className="text-zinc-400 leading-relaxed text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Proof ── */}
      <section className="px-6 py-20 border-t border-zinc-800">
        <div className="max-w-3xl mx-auto">
          <div className="relative rounded-3xl border border-zinc-700 bg-zinc-900 p-8 md:p-10 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-widest text-green-400 mb-4">
                Proof it works
              </p>
              <p className="text-5xl font-black text-zinc-100 mb-3">+30%</p>
              <p className="text-green-400 font-semibold mb-4">Revenue above all-time store record</p>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-xl mb-6">
                Deep Blue Health, a NZ health supplement brand, broke their all-time sales record
                in November 2025 — 30% above the previous best month. The result of 2–3 months of
                AI-native system building: rebuilt Google Ads, Meta creative engine, email lifecycle,
                and AI customer support.
              </p>
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-100 hover:text-green-400 transition-colors underline underline-offset-4 decoration-zinc-600"
              >
                Read the full case study →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="px-6 py-24 border-t border-zinc-800">
        <div className="max-w-3xl mx-auto text-center">
          {/* Glow */}
          <div className="w-48 h-48 bg-green-500/10 rounded-full blur-3xl mx-auto mb-0 -mb-12 relative" />

          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-widest text-green-400 mb-5">
              Limited availability
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-zinc-100 mb-5 leading-tight">
              Ready to build<br />
              something serious?
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-10 max-w-lg mx-auto">
              If you&apos;re a NZ business doing $500k+ in revenue and you&apos;re ready to invest in
              AI-native marketing that compounds — apply. We review every application personally.
            </p>

            <Link
              href="/apply"
              className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-green-400 text-zinc-950 font-black text-lg hover:bg-green-300 transition-colors shadow-lg shadow-green-500/20"
            >
              Apply for a Partnership Spot
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            <p className="text-zinc-600 text-sm mt-5">
              Applications reviewed personally · Response within 5 business days · Serious enquiries only
            </p>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-zinc-800 py-8 px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
          <span>© {new Date().getFullYear()} Junction Media · Auckland, New Zealand</span>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
            <Link href="/services" className="hover:text-zinc-300 transition-colors">Services</Link>
            <Link href="/about" className="hover:text-zinc-300 transition-colors">About</Link>
            <Link href="/case-studies" className="hover:text-zinc-300 transition-colors">Case Studies</Link>
            <Link href="/blog" className="hover:text-zinc-300 transition-colors">Blog</Link>
            <Link href="/apply" className="hover:text-zinc-300 transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
