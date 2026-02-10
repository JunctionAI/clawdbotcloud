"use client";

import { motion } from "framer-motion";
import Section from "@/components/Section";
import Button from "@/components/Button";
import Link from "next/link";

const services = [
  "Paid Advertising (Google, Meta, TikTok)",
  "SEO & Organic Growth",
  "Content Production Pipeline",
  "Brand Strategy & Design",
  "Web Development",
  "AI Customer Support Systems",
  "Team AI Training & Integration",
  "Weekly Strategy Meetings",
];

const pillars = [
  {
    title: "AI Agents Running 24/7",
    description:
      "Multiple specialized agents handling different marketing functions—simultaneously. Not one person juggling everything. A coordinated system that never sleeps.",
    icon: "🤖",
  },
  {
    title: "Human Oversight for Quality",
    description:
      "Every output is reviewed. Every strategy is refined. AI does the heavy lifting. Humans ensure excellence.",
    icon: "👁️",
  },
  {
    title: "Full Integration Into Your Business",
    description:
      "This isn't outsourced marketing that exists in a silo. We embed into your operations, supercharge your team with AI, and align everything to your business goals.",
    icon: "🔗",
  },
];

const includes = [
  "Dedicated AI agents across all channels",
  "Human oversight and quality control",
  "Weekly strategy meetings",
  "Full OpenClaw platform integration",
  "Staff AI training",
  "Web development and design as needed",
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 py-20 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            AI-Powered Marketing
            <br />
            <span className="gradient-text">That Actually Works</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl md:text-2xl text-muted max-w-3xl mx-auto mb-8"
          >
            Full-service digital marketing with AI agents running 24/7. Human oversight
            for quality. Results that speak for themselves.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <Button href="/contact" size="lg">
              Apply to Work With Us
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-muted"
          >
            We partner with ambitious businesses ready to dominate their industry through
            AI.
            <br />
            <span className="text-white font-semibold">$10k/month. No fluff. Just results.</span>
          </motion.p>
        </div>
      </section>

      {/* Problem Section */}
      <Section className="bg-card-bg">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Traditional Agencies Are Stuck in the Past
          </h2>
          <p className="text-lg text-muted mb-8">
            While they charge $16k+ per month and deliver at human speed, we've built
            something different.
          </p>
          <p className="text-lg text-muted mb-8">
            Our AI agents work around the clock—each one focused on a specific part of
            your marketing machine. Google Ads. Meta campaigns. SEO. Content. Customer
            support. All running simultaneously, all day, every day.
          </p>
          <p className="text-xl font-semibold gradient-text">
            We don't fear the AI era. We welcome it with open arms.
          </p>
        </div>
      </Section>

      {/* How It Works */}
      <Section>
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
          The Junction Model
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card-bg border border-card-border rounded-2xl p-8 hover:glow transition-all duration-300"
            >
              <div className="text-4xl mb-4">{pillar.icon}</div>
              <h3 className="text-xl font-bold mb-4">{pillar.title}</h3>
              <p className="text-muted">{pillar.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Services Overview */}
      <Section className="bg-card-bg">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need. One Partner.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={service}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-background border border-card-border rounded-lg p-4 text-center hover:border-accent transition-colors duration-200"
            >
              <span className="text-muted">{service}</span>
            </motion.div>
          ))}
        </div>
        <div className="text-center">
          <Link
            href="/services"
            className="text-accent hover:text-accent-dark font-semibold inline-flex items-center gap-2 transition-colors"
          >
            See Full Service Breakdown
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

      {/* Results Section */}
      <Section>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Proof, Not Promises</h2>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto bg-gradient-to-br from-accent/20 to-blue-500/10 border border-accent/30 rounded-3xl p-12 text-center glow"
        >
          <div className="text-8xl md:text-9xl font-bold gradient-text mb-4">30%</div>
          <p className="text-2xl font-semibold mb-6">Above store record in monthly sales</p>
          <p className="text-muted mb-8">
            Deep Blue Health came to us for help. Within months, we broke their all-time
            sales record by 30%—while expanding into international markets, rebuilding
            their SEO from scratch, and deploying AI customer support.
          </p>
          <Button href="/case-study" variant="outline">
            Read the Case Study
          </Button>
        </motion.div>
      </Section>

      {/* The Pitch */}
      <Section className="bg-card-bg">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Partners for the Super Intelligence Era
          </h2>
          <p className="text-lg text-muted mb-8">
            The next three years will separate businesses that embrace AI from those that
            get left behind.
          </p>
          <p className="text-lg text-muted mb-12">
            We're not looking for clients. We're looking for partners—businesses ready to
            embed AI at every level and dominate their industry.
          </p>
          <blockquote className="border-l-4 border-accent pl-6 text-left text-xl italic text-muted">
            "If you're supercharging AI in every part of your business over the next
            three years, you actually have a chance of being highly competitive—and
            potentially dominating your industry."
          </blockquote>
        </div>
      </Section>

      {/* Pricing */}
      <Section>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto bg-card-bg border border-card-border rounded-3xl p-10 text-center"
        >
          <div className="text-6xl md:text-7xl font-bold gradient-text mb-4">
            $10,000
            <span className="text-2xl text-muted font-normal">/month</span>
          </div>
          <p className="text-lg text-muted mb-8">
            Full-service AI-powered marketing. Strategy, execution, and everything in
            between.
          </p>
          <div className="text-left mb-8">
            <p className="font-semibold mb-4">Includes:</p>
            <ul className="space-y-3">
              {includes.map((item) => (
                <li key={item} className="flex items-center gap-3 text-muted">
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
          </div>
          <p className="text-sm text-muted mb-8">
            Minimum 3-month commitment. We're selective about who we work with.
          </p>
          <Button href="/contact" size="lg" className="w-full">
            Apply Now
          </Button>
        </motion.div>
      </Section>

      {/* Final CTA */}
      <Section className="bg-gradient-to-br from-accent/10 via-background to-background">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Work With AI, Not Against It?
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto mb-8">
            We take on a limited number of partners each quarter. If you're doing $1M+ in
            revenue and ready to scale with AI, apply below.
          </p>
          <Button href="/contact" size="lg">
            Apply to Work With Us
          </Button>
        </div>
      </Section>
    </>
  );
}
