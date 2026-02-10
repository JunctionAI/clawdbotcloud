"use client";

import { motion } from "framer-motion";
import Section from "@/components/Section";
import Button from "@/components/Button";

const principles = [
  {
    title: "AI + Human, Not AI vs. Human",
    description:
      "AI does the heavy lifting. Humans ensure quality. It's not about replacing people—it's about amplifying what's possible. Every piece of content, every campaign, every strategy gets human eyes before it touches your brand. The AI handles volume and speed. The humans handle judgment and quality.",
  },
  {
    title: "Embed, Don't Outsource",
    description:
      "Traditional agencies exist in a silo. They take a brief, disappear for weeks, and come back with deliverables that may or may not fit your actual business needs. We embed. We join your Slack. We understand your operations. We train your team on AI. We become an extension of your business, not a vendor you talk to once a week.",
  },
  {
    title: "Partners, Not Clients",
    description:
      "We're selective about who we work with because we're committing to a real partnership. We want to grow with you through the super intelligence era—not just execute tasks for a paycheck. If you're not ready to embrace AI across your business, we're not the right fit. And that's okay.",
  },
];

const values = [
  {
    title: "Embrace the change",
    description:
      "The AI era is here. You can fear it or welcome it. We choose to welcome it—and we're looking for partners who feel the same way.",
  },
  {
    title: "Results over activity",
    description:
      "We don't care how many hours we logged or how many meetings we had. We care about whether your business grew.",
  },
  {
    title: "Transparency always",
    description:
      "No hidden fees, no scope creep, no surprises. You know exactly what you're paying for and exactly what you're getting.",
  },
  {
    title: "Quality is non-negotiable",
    description:
      "AI can produce garbage fast. That's not what we do. Every output gets human review. We'd rather slow down than ship mediocrity.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            We Welcome the <span className="gradient-text">AI Era</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted max-w-2xl mx-auto"
          >
            While others fear what's coming, we're building for it.
          </motion.p>
        </div>
      </section>

      {/* The Story */}
      <Section className="bg-card-bg">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Why We Built Junction</h2>
          <div className="space-y-6 text-lg text-muted">
            <p>The marketing industry has a problem.</p>
            <p>
              Traditional agencies charge premium rates—$16k, $20k, even $30k per
              month—and deliver work at human speed. One person juggling your account
              alongside a dozen others. Endless meetings about meetings. Slow execution.
              Outdated methods.
            </p>
            <p>
              Meanwhile, AI is transforming every industry on the planet. But most
              agencies? They're either ignoring it entirely or slapping "AI-powered" on
              their website while changing nothing about how they work.
            </p>
            <p>We saw a different path.</p>
            <p className="text-white font-semibold text-xl">
              What if we built an agency from the ground up for the AI era?
            </p>
            <p>
              Not AI as a buzzword. AI as infrastructure. Agents running 24/7, each
              focused on a different aspect of your marketing. Humans overseeing quality
              and strategy. More done in a day than traditional agencies accomplish in a
              week.
            </p>
            <p className="gradient-text font-semibold">That's Junction Media AI.</p>
          </div>
        </div>
      </Section>

      {/* The Founder */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 items-start">
            <div className="md:col-span-1">
              <div className="aspect-square bg-gradient-to-br from-accent/20 to-blue-500/10 rounded-2xl flex items-center justify-center border border-accent/20">
                <span className="text-6xl">👤</span>
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-xl font-bold">Tom</h3>
                <p className="text-accent">Founder & Chief Strategist</p>
              </div>
            </div>
            <div className="md:col-span-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Meet Tom</h2>
              <div className="space-y-4 text-muted">
                <p>
                  Tom has spent the last decade in digital marketing—running campaigns,
                  building teams, and watching the industry slowly fail to keep up with
                  technology.
                </p>
                <p>When AI capabilities exploded in 2023, he didn't panic. He went all in.</p>
                <p>
                  Today, Tom runs Junction Media AI with a simple thesis: businesses that
                  embed AI into every part of their operations over the next three years
                  will dominate their industries. Those that don't will get left behind.
                </p>
                <p>
                  His role is simple: take everything he knows about marketing, combine it
                  with cutting-edge AI capabilities, and deliver results that traditional
                  agencies simply can't match.
                </p>
              </div>
              <blockquote className="mt-8 border-l-4 border-accent pl-6 text-xl italic text-muted">
                "We're not looking for clients. We're looking for partners—businesses
                ready to embrace AI and build something extraordinary together."
              </blockquote>
            </div>
          </div>
        </div>
      </Section>

      {/* Our Approach */}
      <Section className="bg-card-bg">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Our Approach
          </h2>
          <div className="space-y-8">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-background border border-card-border rounded-2xl p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-accent font-bold">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">{principle.title}</h3>
                    <p className="text-muted">{principle.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* How We Scale */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">How We Scale</h2>
          <p className="text-lg text-muted text-center mb-12">
            Traditional agencies scale by hiring more junior staff and spreading them
            thin. We scale differently.
          </p>

          <div className="bg-card-bg border border-card-border rounded-2xl p-8 md:p-10">
            <h3 className="text-2xl font-bold mb-6 gradient-text">The Junction Model</h3>
            <p className="text-muted mb-6">
              Each account gets a dedicated senior strategist supported by a fleet of AI
              agents. Those agents handle execution across every channel—24/7, 365.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { label: "Better coverage", desc: "than a traditional team" },
                { label: "Faster execution", desc: "than humanly possible" },
                { label: "Lower cost", desc: "because AI efficiency compounds" },
                { label: "Higher quality", desc: "because humans focus on oversight, not grunt work" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-accent flex-shrink-0 mt-1"
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
                  <p className="text-muted">
                    <strong className="text-white">{item.label}</strong> {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Powered by OpenClaw */}
      <Section className="bg-card-bg">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Powered by OpenClaw</h2>
          <p className="text-lg text-muted mb-6">
            We didn't just adopt AI tools—we built infrastructure.
          </p>
          <p className="text-muted mb-6">
            OpenClaw is our proprietary AI agent platform. It's what allows us to run
            multiple specialized agents on your account simultaneously, coordinate their
            work, and ensure everything aligns with your strategy.
          </p>
          <p className="text-muted mb-6">
            When you partner with Junction, you get access to this platform. Not just for
            marketing—for your entire organization. Customer support agents. Internal
            productivity tools. Whatever your business needs.
          </p>
          <p className="text-accent font-semibold">
            This is what sets us apart from agencies that "use AI." We don't use AI.
            We're built on it.
          </p>
        </div>
      </Section>

      {/* Values */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            What We Believe
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card-bg border border-card-border rounded-xl p-6"
              >
                <h3 className="text-lg font-bold mb-2 gradient-text">{value.title}</h3>
                <p className="text-muted text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Looking Forward */}
      <Section className="bg-card-bg">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">The Next Three Years</h2>
          <p className="text-lg text-muted mb-6">
            We believe the next three years will be the most transformative in business
            history.
          </p>
          <p className="text-lg text-muted mb-6">
            Super intelligence is coming. The companies that survive—and thrive—will be
            those that embedded AI early, learned to work alongside it, and built systems
            that compound over time.
          </p>
          <p className="text-white font-semibold">
            That's the bet we're making. And we're looking for partners ready to make it
            with us.
          </p>
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-gradient-to-br from-accent/10 via-background to-background">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Want to Build the Future Together?
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto mb-8">
            We work with a limited number of partners who share our vision. If you're
            ready to embrace AI and dominate your industry, let's talk.
          </p>
          <Button href="/contact" size="lg">
            Apply to Work With Us
          </Button>
        </div>
      </Section>
    </>
  );
}
