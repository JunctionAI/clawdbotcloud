'use client'

import { useState } from 'react'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  
  const faqs = [
    {
      question: 'How does the extension track my LinkedIn messages?',
      answer: 'The extension uses a content script that observes your LinkedIn messaging activity. When you send a message, it automatically captures the recipient name, company, message text, and timestamp. All data is stored locally on your device (free tier) or encrypted in the cloud (Pro tier).',
    },
    {
      question: 'Is this against LinkedIn\'s Terms of Service?',
      answer: 'No. The extension uses passive observation only - it doesn\'t send automated messages, scrape data, or automate any LinkedIn actions. It simply tracks what YOU manually do on LinkedIn. This is similar to how browser extensions like password managers work.',
    },
    {
      question: 'What happens when I reach the 10-lead limit on the free plan?',
      answer: 'You\'ll see a notification prompting you to upgrade to Pro. Your existing 10 leads remain fully accessible, but you won\'t be able to track new messages until you upgrade or delete old leads.',
    },
    {
      question: 'Can I export my data?',
      answer: 'Yes! Both free and Pro users can export their entire lead database to CSV format anytime. This lets you import into your CRM or analyze in Excel/Google Sheets.',
    },
    {
      question: 'How do follow-up reminders work?',
      answer: 'When you send a message, the extension automatically sets follow-up reminders for 3, 7, and 14 days later (configurable). If the lead hasn\'t responded by then, you\'ll get a browser notification reminding you to follow up.',
    },
    {
      question: 'Does this work with LinkedIn Sales Navigator?',
      answer: 'Yes! The extension works with both regular LinkedIn and Sales Navigator. It tracks messages sent from either platform.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, Amex, Discover) via Stripe. All payments are secure and PCI-compliant.',
    },
    {
      question: 'Can I cancel my Pro subscription anytime?',
      answer: 'Absolutely. You can cancel anytime from your account dashboard. You\'ll continue to have Pro access until the end of your billing period, then you\'ll be downgraded to the free tier (10 leads).',
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes. Free tier data is stored locally on your device only. Pro tier data is encrypted in transit and at rest using industry-standard AES-256 encryption. We never sell your data to third parties.',
    },
    {
      question: 'Do you offer refunds?',
      answer: 'Yes! We offer a 30-day money-back guarantee. If you\'re not satisfied for any reason, email support@linkedintracker.app within 30 days of purchase for a full refund.',
    },
  ]
  
  return (
    <section className="py-20 px-6 bg-white" id="faq">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about LinkedIn Tracker
          </p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-lg pr-8">{faq.question}</span>
                <span className="text-2xl text-primary flex-shrink-0">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-5">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Contact support CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <a 
            href="mailto:support@linkedintracker.app"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            📧 Contact Support
          </a>
        </div>
      </div>
    </section>
  )
}
