"use client";

import { motion } from "framer-motion";
import Section from "@/components/Section";
import Button from "@/components/Button";
import Link from "next/link";

const stats = [
  { value: "30%", label: "above previous sales record" },
  { value: "First-ever", label: "proper SEO implementation" },
  { value: "International", label: "market expansion" },
  { value: "AI support", label: "deployed across customer service" },
];

const takeaways = [
  {
    title: "AI-Powered Execution",
    description:
      "Our agents work around the clock. While traditional agencies operate 40 hours a week, we're optimizing campaigns, producing content, and managing channels 24/7. That compounds.",
  },
  {
    title: "Full-Stack Approach",
    description:
      "We didn't just run ads. We rebuilt everything: paid, organic, content, brand, web, support. When all channels work together, results multiply.",
  },
  {
    title: "Speed to Execute",
    description:
      "Changes that would take traditional agencies weeks happened in days. New campaigns launched faster. Content produced quicker. Problems solved immediately.",
  },
  {
    title: "AI Integration Beyond Marketing",
    description:
      "Deploying AI customer support wasn't just about marketing efficiency. It improved the customer experience while reducing operational costs. That's the kind of thinking traditional agencies don't bring.",
  },
];

export default function CaseStudyPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-accent font-semibold mb-4"
          >
            CASE STUDY
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="gradient-text">30%</span> Above Store Record
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted max-w-3xl"
          >
            How Deep Blue Health shattered their all-time sales record while expanding
            into international markets.
          </motion.p>
        </div>
      </section>

      {/* Stats Row */}
      <Section className="bg-card-bg py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <p className="text-muted text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* The Challenge */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">The Challenge</h2>
          <p className="text-lg text-muted mb-6">
            Deep Blue Health came to us at an inflection point. They had a strong
            product, a loyal customer base, and ambitions to grow—but their marketing
            wasn't keeping pace.
          </p>
          <div className="bg-card-bg border border-card-border rounded-xl p-6 mb-6">
            <p className="font-semibold mb-4">The situation:</p>
            <ul className="space-y-2 text-muted">
              <li className="flex items-center gap-2">
                <span className="text-accent">•</span> Google Ads running but underperforming
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent">•</span> No real SEO strategy in place
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent">•</span> Meta advertising untapped
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent">•</span> International expansion on the roadmap but no clear path
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent">•</span> Customer support struggling to scale with demand
              </li>
            </ul>
          </div>
          <p className="text-lg text-muted">
            They needed a partner who could do more than tweak existing campaigns. They
            needed someone to rebuild their marketing machine from the ground up.
          </p>
        </div>
      </Section>

      {/* What We Did */}
      <Section className="bg-card-bg">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">What We Did</h2>

          {/* Phase 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <span className="text-accent font-bold">1</span>
              </div>
              <h3 className="text-2xl font-bold">Foundation</h3>
            </div>
            <p className="text-muted ml-16">
              We started by auditing everything. Existing campaigns. Website performance.
              Competitive landscape. The works. What we found: massive untapped potential
              across every channel.
            </p>
          </motion.div>

          {/* Phase 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <span className="text-accent font-bold">2</span>
              </div>
              <h3 className="text-2xl font-bold">Rebuild</h3>
            </div>

            <div className="ml-16 space-y-6">
              <div className="bg-background border border-card-border rounded-xl p-6">
                <h4 className="font-bold mb-3 text-accent">Paid Advertising Overhaul</h4>
                <ul className="space-y-2 text-muted text-sm">
                  <li>• Restructured Google Ads campaigns for better ROI</li>
                  <li>• Launched comprehensive Meta advertising program</li>
                  <li>• Built creative testing framework to iterate quickly</li>
                  <li>• Implemented AI-powered bid management</li>
                </ul>
              </div>

              <div className="bg-background border border-card-border rounded-xl p-6">
                <h4 className="font-bold mb-3 text-accent">SEO From Scratch</h4>
                <p className="text-muted text-sm mb-3">
                  This was their first real SEO effort. We built it properly:
                </p>
                <ul className="space-y-2 text-muted text-sm">
                  <li>• Technical audit and fixes</li>
                  <li>• Keyword strategy mapped to buyer intent</li>
                  <li>• Content production pipeline (AI-assisted, human-polished)</li>
                  <li>• On-page optimization across priority pages</li>
                </ul>
              </div>

              <div className="bg-background border border-card-border rounded-xl p-6">
                <h4 className="font-bold mb-3 text-accent">Content Machine</h4>
                <ul className="space-y-2 text-muted text-sm">
                  <li>• Systematic content calendar</li>
                  <li>• Product-focused blog strategy</li>
                  <li>• Social media content engine</li>
                  <li>• Email sequences for retention</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-background border border-card-border rounded-xl p-6">
                  <h4 className="font-bold mb-3 text-accent">Brand & Design Refresh</h4>
                  <ul className="space-y-2 text-muted text-sm">
                    <li>• Updated visual identity elements</li>
                    <li>• New marketing collateral</li>
                    <li>• Consistent brand voice across channels</li>
                  </ul>
                </div>

                <div className="bg-background border border-card-border rounded-xl p-6">
                  <h4 className="font-bold mb-3 text-accent">Web Development</h4>
                  <ul className="space-y-2 text-muted text-sm">
                    <li>• Conversion optimization</li>
                    <li>• Site speed improvements</li>
                    <li>• Enhanced product pages</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Phase 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <span className="text-accent font-bold">3</span>
              </div>
              <h3 className="text-2xl font-bold">AI Integration</h3>
            </div>

            <div className="ml-16 space-y-6">
              <div className="bg-background border border-accent/30 rounded-xl p-6">
                <h4 className="font-bold mb-3 text-white">
                  This is where it got interesting.
                </h4>
                <div className="space-y-4 text-muted">
                  <div>
                    <p className="font-semibold text-accent mb-2">AI Customer Support</p>
                    <p className="text-sm">
                      We deployed AI-powered customer support agents to handle common
                      inquiries, freeing up their human team for complex issues. Faster
                      response times. Happier customers. Lower support costs.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-accent mb-2">Full AI Model</p>
                    <p className="text-sm">
                      The entire marketing operation now runs on our AI agent
                      infrastructure. Multiple agents handling different functions, all
                      day, every day. Human oversight ensuring quality. Speed and
                      consistency that traditional agencies can't match.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* The Results */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">The Results</h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-accent/20 to-blue-500/10 border border-accent/30 rounded-3xl p-12 text-center mb-12 glow"
          >
            <div className="text-8xl md:text-9xl font-bold gradient-text mb-4">30%</div>
            <p className="text-2xl font-semibold">Above their all-time store sales record</p>
          </motion.div>

          <p className="text-lg text-muted mb-8">
            In November, Deep Blue Health didn't just beat their monthly target. They
            shattered their previous all-time sales record by 30%.
          </p>

          <p className="text-lg text-muted mb-8">
            This wasn't a fluke. It was the compounding effect of:
          </p>

          <ul className="space-y-3 text-muted mb-12">
            {[
              "Optimized paid campaigns driving qualified traffic",
              "SEO finally contributing meaningful organic traffic",
              "Content building authority and trust",
              "Customer support running smoothly",
              "Everything working together as a system",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-accent flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {item}
              </li>
            ))}
          </ul>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-card-bg border border-card-border rounded-xl p-6">
              <h4 className="font-bold mb-3 text-accent">Expanded Channels</h4>
              <ul className="space-y-2 text-muted text-sm">
                <li>• Google Ads: Restructured and performing</li>
                <li>• Meta Ads: Launched and scaling</li>
                <li>• SEO: First real implementation, already ranking</li>
              </ul>
            </div>
            <div className="bg-card-bg border border-card-border rounded-xl p-6">
              <h4 className="font-bold mb-3 text-accent">International Growth</h4>
              <ul className="space-y-2 text-muted text-sm">
                <li>• Expansion playbook in place</li>
                <li>• New markets generating revenue</li>
                <li>• Localization systems built</li>
              </ul>
            </div>
            <div className="bg-card-bg border border-card-border rounded-xl p-6">
              <h4 className="font-bold mb-3 text-accent">AI Integration</h4>
              <ul className="space-y-2 text-muted text-sm">
                <li>• Customer support AI handling routine inquiries</li>
                <li>• Marketing AI running 24/7</li>
                <li>• Team trained on AI best practices</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Key Takeaways */}
      <Section className="bg-card-bg">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            What Made the Difference
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {takeaways.map((takeaway, index) => (
              <motion.div
                key={takeaway.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-background border border-card-border rounded-xl p-6"
              >
                <h3 className="text-lg font-bold mb-3 gradient-text">{takeaway.title}</h3>
                <p className="text-muted text-sm">{takeaway.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* What's Next */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">What's Next</h2>
          <p className="text-lg text-muted mb-6">
            Deep Blue Health isn't a "client" we check in with once a month. They're a
            partner we're building with for the long term.
          </p>
          <div className="bg-card-bg border border-card-border rounded-xl p-6 mb-8">
            <p className="font-semibold mb-4">Current focus areas:</p>
            <ul className="space-y-2 text-muted">
              <li className="flex items-center gap-2">
                <span className="text-accent">→</span> Scaling international expansion
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent">→</span> Deepening AI integration across operations
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent">→</span> Testing emerging channels and tactics
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent">→</span> Continuous optimization of what's working
              </li>
            </ul>
          </div>
          <p className="text-white font-semibold text-center text-lg">
            The 30% record was the beginning, not the destination.
          </p>
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-gradient-to-br from-accent/10 via-background to-background">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready for Results Like These?
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto mb-8">
            We partner with established businesses ready to embrace AI and scale
            aggressively. If that sounds like you, let's talk.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" size="lg">
              Apply to Work With Us
            </Button>
            <Button href="/services" variant="outline" size="lg">
              See Full Services
            </Button>
          </div>
        </div>
      </Section>

      {/* Related */}
      <Section className="bg-card-bg py-12">
        <div className="flex flex-col md:flex-row justify-center gap-6 text-center">
          <Link
            href="/services"
            className="text-accent hover:text-accent-dark font-semibold inline-flex items-center gap-2 transition-colors justify-center"
          >
            Full breakdown of what's included
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
          <Link
            href="/about"
            className="text-accent hover:text-accent-dark font-semibold inline-flex items-center gap-2 transition-colors justify-center"
          >
            Learn about our AI-first approach
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </Section>
    </>
  );
}
