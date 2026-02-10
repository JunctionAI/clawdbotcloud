"use client";

import { motion } from "framer-motion";
import Section from "@/components/Section";
import Button from "@/components/Button";

const services = [
  {
    icon: "🎯",
    title: "Paid Advertising",
    description: "AI-managed campaigns across Google, Meta, TikTok, and emerging platforms.",
    features: [
      "Campaign strategy and setup",
      "AI-powered bid management and optimization",
      "Creative production and testing",
      "Audience research and segmentation",
      "Daily monitoring and adjustments",
      "Weekly performance reporting",
    ],
    advantage:
      "Our agents analyze performance data continuously—not once a week when someone remembers to check. They spot trends, shift budgets, and optimize bids faster than any human team.",
  },
  {
    icon: "📈",
    title: "SEO & Organic Growth",
    description: "Technical SEO, content strategy, and link building that compounds over time.",
    features: [
      "Full technical audit and fixes",
      "Keyword research and content mapping",
      "AI-assisted content production",
      "On-page optimization",
      "Link building outreach",
      "Local SEO (if applicable)",
      "Monthly ranking reports",
    ],
    advantage:
      "Content that used to take weeks to produce now happens in days. Our agents research, outline, draft, and optimize—while humans polish and publish.",
  },
  {
    icon: "✍️",
    title: "Content Production Pipeline",
    description: "A systematic approach to content that builds authority and drives results.",
    features: [
      "Content strategy and calendar",
      "Blog posts and articles",
      "Social media content",
      "Email sequences",
      "Video scripts",
      "Product descriptions",
      "Landing page copy",
    ],
    advantage:
      "We've built production pipelines that let us create more high-quality content in a week than most agencies produce in a month. Volume and quality, not one or the other.",
  },
  {
    icon: "🎨",
    title: "Brand Strategy & Design",
    description: "Visual identity and messaging that positions you as the category leader.",
    features: [
      "Brand positioning and messaging",
      "Visual identity refinement",
      "Marketing collateral design",
      "Ad creative production",
      "Social media graphics",
      "Presentation design",
    ],
    advantage:
      "AI-assisted design means faster iteration, more variations to test, and creative that's always fresh—not recycled from three campaigns ago.",
  },
  {
    icon: "💻",
    title: "Web Development",
    description: "Your website should convert visitors into customers. We make sure it does.",
    features: [
      "Landing page creation",
      "Conversion optimization",
      "Site speed improvements",
      "New feature development",
      "E-commerce enhancements",
      "Analytics implementation",
    ],
    advantage:
      "AI-assisted development means faster builds, cleaner code, and the ability to implement changes in days instead of weeks.",
  },
  {
    icon: "🤖",
    title: "AI Customer Support & Integration",
    description: "Deploy AI throughout your organization—not just marketing.",
    features: [
      "AI customer support chatbots",
      "Internal AI tools for your team",
      "Staff training on AI best practices",
      "OpenClaw platform integration",
      "Process automation",
      "Custom AI solutions",
    ],
    advantage:
      "This is the real differentiator. We don't just use AI for our work—we help you embed it into every part of your business.",
  },
  {
    icon: "📅",
    title: "Strategy & Oversight",
    description: "Weekly alignment to ensure everything's working toward your business goals.",
    features: [
      "Weekly strategy meetings",
      "Quarterly business reviews",
      "Access to our team via Slack/messaging",
      "Priority support for urgent needs",
      "Business strategy beyond just marketing",
      "Transparent reporting and dashboards",
    ],
    advantage:
      "Because AI handles execution, humans have time for what matters: thinking strategically about your business.",
  },
];

const comparison = [
  { aspect: "Monthly retainer", traditional: "$16,000+", junction: "$10,000" },
  { aspect: "Work hours", traditional: "Business hours only", junction: "24/7 AI coverage" },
  { aspect: "Speed to execute", traditional: "Weeks", junction: "Days" },
  { aspect: "AI sophistication", traditional: "Basic or none", junction: "Embedded throughout" },
  { aspect: "Staff AI training", traditional: "Not offered", junction: "Included" },
  { aspect: "Mindset", traditional: "Fear the change", junction: "Welcome it" },
];

const faqs = [
  {
    question: "Is $10k/month the only option?",
    answer:
      "Yes. We've found this is the level of investment required to actually move the needle for the businesses we work with. If you're looking for cheaper options, we're probably not the right fit.",
  },
  {
    question: "What's the minimum commitment?",
    answer:
      "Three months. Real marketing results take time to compound. If you're looking for a quick fix, look elsewhere.",
  },
  {
    question: "Do you work with startups?",
    answer:
      "Generally, no. Our ideal partners are established businesses doing $1M+ in revenue who are ready to scale.",
  },
  {
    question: "What industries do you specialize in?",
    answer:
      "E-commerce and product-based businesses are our sweet spot, but we've delivered results across B2B, SaaS, and service businesses too.",
  },
  {
    question: "How involved do I need to be?",
    answer:
      "We need your input for strategy and approvals, but we handle execution. Expect 1-2 hours per week for meetings and reviews.",
  },
  {
    question: "What makes you different from other AI marketing agencies?",
    answer:
      "Most \"AI marketing agencies\" use ChatGPT for copywriting and call it a day. We've built actual AI agent infrastructure that runs your marketing 24/7. It's not a gimmick—it's how we deliver more for less.",
  },
];

const notIncluded = [
  { item: "Media spend", note: "(your ad budgets are separate)" },
  { item: "Major website rebuilds", note: "(quoted separately if needed)" },
  { item: "Physical production", note: "(video shoots, photography, print)" },
  { item: "PR and traditional media buying", note: "" },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-4"
          >
            Full-Service AI Marketing
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold gradient-text mb-6"
          >
            $10,000/month
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted max-w-3xl mx-auto"
          >
            Everything you need to dominate digital—powered by AI agents working 24/7,
            overseen by humans who care about quality.
          </motion.p>
        </div>
      </section>

      {/* Intro */}
      <Section className="bg-card-bg">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">The Complete Package</h2>
          <p className="text-lg text-muted">
            No nickel-and-diming. No scope creep conversations. One flat rate for
            full-service marketing that actually moves the needle.
          </p>
        </div>
      </Section>

      {/* Services Grid */}
      <Section>
        <div className="space-y-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-card-bg border border-card-border rounded-2xl p-8 md:p-10"
            >
              <div className="flex items-start gap-6">
                <div className="text-4xl">{service.icon}</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                  <p className="text-muted mb-6">{service.description}</p>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <p className="font-semibold mb-4">What's included:</p>
                      <ul className="space-y-2">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2 text-muted">
                            <svg
                              className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
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
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-background rounded-xl p-6 border border-accent/20">
                      <p className="text-accent font-semibold mb-2">The AI advantage:</p>
                      <p className="text-muted text-sm">{service.advantage}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Team Model */}
      <Section className="bg-card-bg">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            How We Staff Your Account
          </h2>
          <p className="text-lg text-muted text-center mb-12">
            You're not getting a junior account manager who checks in once a week. Here's
            what your $10k/month actually buys:
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Dedicated Account Lead",
                description:
                  "Senior strategist who owns your account. Understands your business deeply. Available when you need them.",
              },
              {
                title: "AI Agent Fleet",
                description:
                  "Multiple specialized agents working your account daily. Ads agent. SEO agent. Content agent. All coordinated, all monitored.",
              },
              {
                title: "Specialist Access",
                description:
                  "When you need deep expertise—web development, advanced analytics, creative direction—you get it. No extra charges, no scope negotiations.",
              },
              {
                title: "Human Oversight",
                description:
                  "Every AI output is reviewed before it touches your brand. Quality control is non-negotiable.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-background border border-card-border rounded-xl p-6"
              >
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-muted text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* What's Not Included */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            What We Don't Do
          </h2>
          <p className="text-lg text-muted text-center mb-12">
            Transparency matters. Here's what falls outside the $10k/month:
          </p>

          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {notIncluded.map((item) => (
              <div
                key={item.item}
                className="flex items-center gap-3 text-muted p-4 bg-card-bg rounded-lg border border-card-border"
              >
                <svg
                  className="w-5 h-5 text-red-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <span>
                  <strong className="text-white">{item.item}</strong> {item.note}
                </span>
              </div>
            ))}
          </div>

          <p className="text-center text-accent font-semibold mt-8">
            Everything else? Included.
          </p>
        </div>
      </Section>

      {/* Comparison */}
      <Section className="bg-card-bg">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Junction vs. Traditional Agencies
          </h2>

          <div className="overflow-x-auto">
            <div className="min-w-[500px]">
              <div className="grid grid-cols-3 gap-4 mb-4 text-center font-bold">
                <div></div>
                <div className="text-muted">Traditional Agency</div>
                <div className="gradient-text">Junction Media AI</div>
              </div>
              {comparison.map((row, index) => (
                <motion.div
                  key={row.aspect}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="grid grid-cols-3 gap-4 py-4 border-t border-card-border"
                >
                  <div className="font-semibold">{row.aspect}</div>
                  <div className="text-muted text-center">{row.traditional}</div>
                  <div className="text-accent text-center font-semibold">{row.junction}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Common Questions
          </h2>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-card-bg border border-card-border rounded-xl p-6"
              >
                <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                <p className="text-muted">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-gradient-to-br from-accent/10 via-background to-background">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to See What AI-Powered Marketing Can Do?
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto mb-8">
            We take on a limited number of partners each quarter. If this sounds like
            the right fit, let's talk.
          </p>
          <Button href="/contact" size="lg">
            Apply to Work With Us
          </Button>
        </div>
      </Section>
    </>
  );
}
