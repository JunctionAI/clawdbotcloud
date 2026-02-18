'use client';

import { useState } from 'react';
import Link from 'next/link';
import { trackEvent } from '@/components/Analytics';

// ─── Types ───────────────────────────────────────────────────────────────────

type FormData = {
  name: string;
  business: string;
  website: string;
  revenue: string;
  need: string;
  referral: string;
};

type FormStatus = 'idle' | 'submitted';

// ─── Logo (reused across pages) ──────────────────────────────────────────────

function JunctionLogo() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#3B82F6' }} />
          <stop offset="50%" style={{ stopColor: '#8B5CF6' }} />
          <stop offset="100%" style={{ stopColor: '#EC4899' }} />
        </linearGradient>
      </defs>
      <path d="M25 8 Q8 8 8 25" stroke="url(#logoGrad)" strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M55 8 Q72 8 72 25" stroke="url(#logoGrad)" strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M25 72 Q8 72 8 55" stroke="url(#logoGrad)" strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M55 72 Q72 72 72 55" stroke="url(#logoGrad)" strokeWidth="8" strokeLinecap="round" fill="none" />
    </svg>
  );
}

// ─── Process Steps ────────────────────────────────────────────────────────────

const steps = [
  {
    number: '01',
    title: 'Apply',
    description: 'Complete the form below. No fluff — just the information needed to understand your business and what you\'re trying to build.',
  },
  {
    number: '02',
    title: 'Strategy Call',
    description: 'If there\'s a fit, you\'ll receive an invitation to a 30-minute call. We\'ll talk through your business, your goals, and whether this partnership makes sense.',
  },
  {
    number: '03',
    title: 'Partnership',
    description: 'Engagements run on a 3-month minimum. We move fast, build properly, and measure everything. You get direct access — no account managers.',
  },
];

// ─── Revenue Options ─────────────────────────────────────────────────────────

const revenueOptions = [
  '$500k – $1M annually',
  '$1M – $3M annually',
  '$3M – $10M annually',
  '$10M+ annually',
  'Pre-revenue (funded)',
];

// ─── Referral Options ────────────────────────────────────────────────────────

const referralOptions = [
  'Google search',
  'LinkedIn',
  'Word of mouth / referral',
  'Blog / content',
  'Social media',
  'Other',
];

// ─── Application Form ────────────────────────────────────────────────────────

function ApplicationForm() {
  const [form, setForm] = useState<FormData>({
    name: '',
    business: '',
    website: '',
    revenue: '',
    need: '',
    referral: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    trackEvent('apply_form_submit', { business: form.business, revenue: form.revenue });

    // Try API first
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await res.json();

      if (result.success) {
        setStatus('submitted');
        return;
      }
    } catch {
      // API failed, fall back to mailto
    }

    // Fallback: open email client
    const subject = encodeURIComponent(`Partnership Application – ${form.business || form.name}`);
    const body = encodeURIComponent(
      `Hi Tom,\n\nI'd like to apply to work with Junction Media.\n\n` +
      `Name: ${form.name}\n` +
      `Business: ${form.business}\n` +
      `Website: ${form.website}\n` +
      `Revenue: ${form.revenue}\n` +
      `Need: ${form.need}\n` +
      `Referred by: ${form.referral}`
    );
    window.location.href = `mailto:tom@junctionmedia.ai?subject=${subject}&body=${body}`;
    setStatus('submitted');
  };

  if (status === 'submitted') {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Application Received</h3>
        <p className="text-gray-600 max-w-sm mx-auto leading-relaxed">
          Your application has been submitted. You&apos;ll hear back within 5 business days.
        </p>
        <Link
          href="/"
          className="inline-block mt-8 text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
        >
          ← Back to home
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name + Business */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Your name <span className="text-red-400">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Sarah Thompson"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 transition-colors text-sm"
          />
        </div>
        <div>
          <label htmlFor="business" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Business name <span className="text-red-400">*</span>
          </label>
          <input
            id="business"
            name="business"
            type="text"
            required
            value={form.business}
            onChange={handleChange}
            placeholder="e.g. Acme Commerce Ltd"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 transition-colors text-sm"
          />
        </div>
      </div>

      {/* Website */}
      <div>
        <label htmlFor="website" className="block text-sm font-semibold text-gray-700 mb-1.5">
          Website <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <input
          id="website"
          name="website"
          type="url"
          value={form.website}
          onChange={handleChange}
          placeholder="https://yourbusiness.co.nz"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 transition-colors text-sm"
        />
      </div>

      {/* Revenue */}
      <div>
        <label htmlFor="revenue" className="block text-sm font-semibold text-gray-700 mb-1.5">
          Annual revenue range <span className="text-red-400">*</span>
        </label>
        <select
          id="revenue"
          name="revenue"
          required
          value={form.revenue}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 transition-colors text-sm appearance-none"
        >
          <option value="" disabled>Select a range</option>
          {revenueOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      {/* What they need */}
      <div>
        <label htmlFor="need" className="block text-sm font-semibold text-gray-700 mb-1.5">
          What are you looking to build? <span className="text-red-400">*</span>
        </label>
        <p className="text-xs text-gray-500 mb-2">
          Tell us about your current marketing, what&apos;s not working, and what you&apos;d like to achieve.
        </p>
        <textarea
          id="need"
          name="need"
          required
          rows={5}
          value={form.need}
          onChange={handleChange}
          placeholder="We're an ecommerce brand with $2M revenue. Our paid ads plateau'd and our content is inconsistent. We want to rebuild our marketing stack with AI and get to $4M in the next 12 months..."
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 transition-colors text-sm resize-none"
        />
      </div>

      {/* How they heard */}
      <div>
        <label htmlFor="referral" className="block text-sm font-semibold text-gray-700 mb-1.5">
          How did you hear about Junction Media? <span className="text-red-400">*</span>
        </label>
        <select
          id="referral"
          name="referral"
          required
          value={form.referral}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 transition-colors text-sm appearance-none"
        >
          <option value="" disabled>Select an option</option>
          {referralOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      {/* Submit */}
      <div className="pt-2">
        <button
          type="submit"
          className="w-full py-4 rounded-xl bg-gray-900 text-white font-bold text-base hover:bg-gray-800 active:scale-[0.99] transition-all duration-150 shadow-sm"
        >
          Submit Application →
        </button>
        <p className="text-center text-xs text-gray-400 mt-3">
          Applications reviewed personally within 5 business days.
        </p>
      </div>
    </form>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8">
              <JunctionLogo />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-extrabold text-gray-900 text-lg tracking-tight">Junction</span>
              <span className="font-normal text-gray-500 text-lg">Media</span>
            </div>
          </Link>
          <Link
            href="/services"
            className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            View services →
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            By Application Only
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight tracking-tight mb-5">
            Apply to Work<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              With Junction Media
            </span>
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed mb-4">
            Junction Media works with a maximum of 4–5 NZ businesses at any one time.
            We&apos;re selective because the work is deep — embedded strategy, AI systems, and real accountability.
          </p>

          <p className="text-gray-500 leading-relaxed">
            If you&apos;re a high-growth NZ business ready to build AI-native marketing that compounds,
            we&apos;d like to hear from you.
          </p>
        </div>
      </section>

      {/* Who it's for */}
      <section className="px-6 py-10 border-t border-gray-100">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">Who this is for</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: 'NZ businesses at $500k+ revenue', icon: '🇳🇿' },
              { label: 'Founders serious about AI-native growth', icon: '🧠' },
              { label: 'Teams with a product or service that works', icon: '✅' },
              { label: 'Businesses ready for a 3-month minimum', icon: '📅' },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-xl leading-none">{item.icon}</span>
                <span className="text-sm text-gray-700 font-medium leading-snug">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 p-5 rounded-xl border border-amber-100 bg-amber-50">
            <p className="text-sm text-amber-800 leading-relaxed">
              <strong>Not the right fit:</strong> If you&apos;re looking for a quick campaign,
              a cheap social media manager, or a traditional agency retainer — this isn&apos;t it.
              Junction Media is for businesses serious about building a marketing operation that scales.
            </p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="px-6 py-12 border-t border-gray-100">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">What to expect</p>
          <div className="space-y-8">
            {steps.map((step, i) => (
              <div key={step.number} className="flex gap-5">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-900 text-white text-sm font-bold">
                    {step.number}
                  </span>
                </div>
                <div className="pt-1.5">
                  <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                  {i < steps.length - 1 && (
                    <div className="mt-5 ml-[-37px] w-px h-6 bg-gray-200 ml-5" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="px-6 py-12 border-t border-gray-100" id="form">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">The Application</p>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Tell us about your business</h2>
          <ApplicationForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-6 mt-8">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <span>© {new Date().getFullYear()} Junction Media · Auckland, New Zealand</span>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
            <Link href="/services" className="hover:text-gray-600 transition-colors">Services</Link>
            <Link href="/case-studies" className="hover:text-gray-600 transition-colors">Case Studies</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
