"use client";

import { motion } from "framer-motion";
import Section from "@/components/Section";
import { useState } from "react";

const industries = [
  "E-commerce / Retail",
  "B2B Services",
  "SaaS / Software",
  "Health & Wellness",
  "Food & Beverage",
  "Manufacturing",
  "Other",
];

const revenues = [
  "Under $500K",
  "$500K - $1M",
  "$1M - $5M",
  "$5M - $10M",
  "$10M - $50M",
  "$50M+",
];

const employees = ["1-5", "6-20", "21-50", "51-200", "200+"];

const marketingSpend = [
  "Under $2K",
  "$2K - $5K",
  "$5K - $10K",
  "$10K - $20K",
  "$20K+",
];

const channels = [
  "Google Ads",
  "Meta (Facebook/Instagram) Ads",
  "TikTok",
  "SEO",
  "Email Marketing",
  "Content Marketing",
  "Influencer Marketing",
  "None / Just Getting Started",
];

const agencyStatus = [
  "Yes, and we're happy",
  "Yes, but looking to switch",
  "No, we handle in-house",
  "No, we're not doing much marketing",
];

const aiInterest = [
  "Very interested - we want AI everywhere",
  "Somewhat interested - open to learning more",
  "Just focused on marketing for now",
  "Not sure what that means",
];

const timelines = ["Immediately", "Within 30 days", "1-3 months", "Just exploring"];

const faqs = [
  {
    question: "What if I'm under $1M in revenue?",
    answer:
      "Our model is designed for established businesses. If you're earlier stage, we're probably not the right fit yet. Focus on product-market fit first, then come back when you're ready to scale.",
  },
  {
    question: "What if I'm already spending more than $10k/month with another agency?",
    answer:
      "Even better. You understand the investment required. The question is whether you're getting the results you deserve. Let's talk.",
  },
  {
    question: "Do you work with businesses outside New Zealand?",
    answer:
      "Yes. We work with partners internationally. Time zone differences are manageable with our AI-first model since agents work 24/7 regardless.",
  },
  {
    question: "What if I just need help with one channel?",
    answer:
      "We don't do piecemeal work. Our model is full-service because that's how we deliver real results. Individual channels working in isolation rarely move the needle.",
  },
  {
    question: "How quickly can you start?",
    answer:
      "We can typically begin onboarding within 1-2 weeks of agreement. Full ramp-up takes 4-6 weeks as we learn your business and get systems running.",
  },
];

const steps = [
  {
    title: "Application Review",
    description:
      "We review every application personally. No automated filtering. If there's potential fit, you'll hear from us within 2 business days.",
  },
  {
    title: "Discovery Call",
    description:
      "A 30-minute call to understand your business, goals, and whether we're the right partner for each other. No sales pitch—just honest conversation.",
  },
  {
    title: "Strategy Session",
    description:
      "If we both want to move forward, we'll do a deep dive into your current marketing, identify opportunities, and outline what working together would look like.",
  },
  {
    title: "Partnership Begins",
    description:
      "We onboard you properly—understanding your business, setting up systems, and getting agents working on your account. Results follow.",
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);

  const toggleChannel = (channel: string) => {
    setSelectedChannels((prev) =>
      prev.includes(channel)
        ? prev.filter((c) => c !== channel)
        : [...prev, channel]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would send to an API
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto px-6 text-center"
        >
          <div className="text-6xl mb-6">✓</div>
          <h1 className="text-4xl font-bold mb-4 gradient-text">Application Received</h1>
          <p className="text-lg text-muted mb-8">
            Thank you for your interest in Junction Media AI. We'll review your
            application and respond within 2 business days if we think there's a
            potential fit.
          </p>
          <p className="text-muted">
            In the meantime, feel free to explore our{" "}
            <a href="/case-study" className="text-accent hover:text-accent-dark">
              case study
            </a>{" "}
            or learn more{" "}
            <a href="/about" className="text-accent hover:text-accent-dark">
              about us
            </a>
            .
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Apply to <span className="gradient-text">Work With Us</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted max-w-2xl mx-auto"
          >
            We partner with a limited number of businesses each quarter. If you're ready
            to embrace AI and scale aggressively, tell us about your business.
          </motion.p>
        </div>
      </section>

      {/* Why Selective */}
      <Section className="bg-card-bg py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Why We're Selective</h2>
          <p className="text-muted text-center mb-8">
            We're not for everyone—and we know it. Our model works best for:
          </p>
          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {[
              "Established businesses doing $1M+ in annual revenue",
              "Growth-minded leaders who want to scale, not coast",
              "AI-forward thinkers ready to embrace new technology",
              "Partners, not clients who want a real relationship",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
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
                <span className="text-muted text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Application Form */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Tell Us About Your Business
          </h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Info */}
            <div className="bg-card-bg border border-card-border rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-6">Basic Info</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Full Name <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-background border border-card-border rounded-lg px-4 py-3 text-white focus:border-accent focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email Address <span className="text-accent">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full bg-background border border-card-border rounded-lg px-4 py-3 text-white focus:border-accent focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    className="w-full bg-background border border-card-border rounded-lg px-4 py-3 text-white focus:border-accent focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Company Name <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-background border border-card-border rounded-lg px-4 py-3 text-white focus:border-accent focus:outline-none transition-colors"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    Website URL <span className="text-accent">*</span>
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://"
                    className="w-full bg-background border border-card-border rounded-lg px-4 py-3 text-white focus:border-accent focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Business Details */}
            <div className="bg-card-bg border border-card-border rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-6">Business Details</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    What industry are you in? <span className="text-accent">*</span>
                  </label>
                  <select
                    required
                    className="w-full bg-background border border-card-border rounded-lg px-4 py-3 text-white focus:border-accent focus:outline-none transition-colors"
                  >
                    <option value="">Select industry</option>
                    {industries.map((industry) => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Annual Revenue Range <span className="text-accent">*</span>
                  </label>
                  <select
                    required
                    className="w-full bg-background border border-card-border rounded-lg px-4 py-3 text-white focus:border-accent focus:outline-none transition-colors"
                  >
                    <option value="">Select revenue</option>
                    {revenues.map((revenue) => (
                      <option key={revenue} value={revenue}>
                        {revenue}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    How many employees?
                  </label>
                  <select className="w-full bg-background border border-card-border rounded-lg px-4 py-3 text-white focus:border-accent focus:outline-none transition-colors">
                    <option value="">Select size</option>
                    {employees.map((emp) => (
                      <option key={emp} value={emp}>
                        {emp}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Current Marketing */}
            <div className="bg-card-bg border border-card-border rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-6">Current Marketing</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    What's your current monthly marketing spend (excluding media)?{" "}
                    <span className="text-accent">*</span>
                  </label>
                  <select
                    required
                    className="w-full bg-background border border-card-border rounded-lg px-4 py-3 text-white focus:border-accent focus:outline-none transition-colors"
                  >
                    <option value="">Select spend</option>
                    {marketingSpend.map((spend) => (
                      <option key={spend} value={spend}>
                        {spend}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Which channels are you currently active on?{" "}
                    <span className="text-accent">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {channels.map((channel) => (
                      <label
                        key={channel}
                        className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                          selectedChannels.includes(channel)
                            ? "border-accent bg-accent/10"
                            : "border-card-border bg-background hover:border-muted"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedChannels.includes(channel)}
                          onChange={() => toggleChannel(channel)}
                          className="sr-only"
                        />
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center ${
                            selectedChannels.includes(channel)
                              ? "bg-accent border-accent"
                              : "border-muted"
                          }`}
                        >
                          {selectedChannels.includes(channel) && (
                            <svg
                              className="w-3 h-3 text-background"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                        <span className="text-sm text-muted">{channel}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Are you currently working with an agency?{" "}
                    <span className="text-accent">*</span>
                  </label>
                  <div className="space-y-2">
                    {agencyStatus.map((status) => (
                      <label
                        key={status}
                        className="flex items-center gap-3 p-3 rounded-lg border border-card-border bg-background hover:border-muted cursor-pointer transition-colors"
                      >
                        <input
                          type="radio"
                          name="agencyStatus"
                          value={status}
                          required
                          className="w-4 h-4 text-accent"
                        />
                        <span className="text-sm text-muted">{status}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Goals & Readiness */}
            <div className="bg-card-bg border border-card-border rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-6">Goals & Readiness</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    What's your primary goal for the next 12 months?{" "}
                    <span className="text-accent">*</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="E.g., Double revenue, expand internationally, launch new product line..."
                    className="w-full bg-background border border-card-border rounded-lg px-4 py-3 text-white focus:border-accent focus:outline-none transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    How interested are you in integrating AI across your business (not
                    just marketing)? <span className="text-accent">*</span>
                  </label>
                  <div className="space-y-2">
                    {aiInterest.map((interest) => (
                      <label
                        key={interest}
                        className="flex items-center gap-3 p-3 rounded-lg border border-card-border bg-background hover:border-muted cursor-pointer transition-colors"
                      >
                        <input
                          type="radio"
                          name="aiInterest"
                          value={interest}
                          required
                          className="w-4 h-4 text-accent"
                        />
                        <span className="text-sm text-muted">{interest}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    What's your timeline to get started?{" "}
                    <span className="text-accent">*</span>
                  </label>
                  <select
                    required
                    className="w-full bg-background border border-card-border rounded-lg px-4 py-3 text-white focus:border-accent focus:outline-none transition-colors"
                  >
                    <option value="">Select timeline</option>
                    {timelines.map((timeline) => (
                      <option key={timeline} value={timeline}>
                        {timeline}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Is there anything else you'd like us to know?
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Challenges you're facing, questions you have, why you think we might be a good fit..."
                    className="w-full bg-background border border-card-border rounded-lg px-4 py-3 text-white focus:border-accent focus:outline-none transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-accent hover:bg-accent-dark text-background font-semibold px-12 py-4 rounded-lg text-lg transition-colors duration-200"
              >
                Submit Application
              </button>
              <p className="text-muted text-sm mt-4">
                By submitting, you agree to receive communication from Junction Media
                AI. We'll review your application and respond within 2 business days if
                it's a potential fit.
              </p>
            </div>
          </form>
        </div>
      </Section>

      {/* What Happens Next */}
      <Section className="bg-card-bg">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Process</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-background border border-card-border rounded-xl p-6"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-accent font-bold text-sm">{index + 1}</span>
                  </div>
                  <h3 className="text-lg font-bold">{step.title}</h3>
                </div>
                <p className="text-muted text-sm ml-12">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Quick FAQ */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Quick Answers</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-card-bg border border-card-border rounded-xl p-6"
              >
                <h3 className="font-bold mb-2">{faq.question}</h3>
                <p className="text-muted text-sm">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Alternative Contact */}
      <Section className="bg-card-bg py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Just Want to Say Hello?</h2>
          <p className="text-muted mb-4">
            Not ready to apply but want to connect? Reach out directly.
          </p>
          <a
            href="mailto:hello@junctionmedia.ai"
            className="text-accent hover:text-accent-dark font-semibold text-lg"
          >
            hello@junctionmedia.ai
          </a>
          <p className="text-muted text-sm mt-4">
            We prioritize application responses, but we read everything.
          </p>
        </div>
      </Section>

      {/* Final */}
      <Section className="bg-gradient-to-br from-accent/10 via-background to-background">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            The Super Intelligence Era Is Here
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Businesses that embrace AI now will dominate their industries. Those that
            wait will struggle to catch up. We're looking for partners who see what's
            coming and want to build for it—together.
          </p>
        </div>
      </Section>
    </>
  );
}
