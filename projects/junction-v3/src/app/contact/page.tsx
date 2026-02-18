import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact | Junction Media — Auckland, New Zealand',
  description: 'Get in touch with Junction Media. Auckland-based AI marketing consultant serving NZ businesses. For partnership enquiries, apply at /apply.',
  openGraph: {
    title: 'Contact | Junction Media',
    description: 'Get in touch with Junction Media. Auckland, New Zealand.',
    url: 'https://www.junctionmedia.ai/contact',
    siteName: 'Junction Media',
    locale: 'en_NZ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.junctionmedia.ai/contact',
  },
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
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
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-12">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
          Contact
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Get in Touch
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          Got a question? Fill in the form below and I&apos;ll get back to you within 48 hours.
          If you&apos;re looking to work together, the fastest path is to{' '}
          <Link href="/apply" className="underline hover:text-gray-900 transition-colors">
            apply directly
          </Link>
          .
        </p>
      </section>

      {/* Main Content */}
      <section className="max-w-3xl mx-auto px-6 py-12 border-t border-gray-100">
        <div className="grid sm:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-xl font-bold mb-6">Send a Message</h2>
            <form
              action="mailto:tom@junctionmedia.ai"
              method="POST"
              encType="text/plain"
              className="space-y-5"
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Your name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors text-sm"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors text-sm"
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  placeholder="Your business name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors text-sm"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="What would you like to discuss?"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors text-sm resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors text-sm"
              >
                Send Message
              </button>
            </form>
            <p className="text-xs text-gray-400 mt-3">
              This will open your email client with a pre-filled message to tom@junctionmedia.ai
            </p>
          </div>

          {/* Details */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold mb-4">Contact Details</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Email</p>
                  <a
                    href="mailto:tom@junctionmedia.ai"
                    className="text-gray-700 hover:text-gray-900 transition-colors text-sm"
                  >
                    tom@junctionmedia.ai
                  </a>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Response Time</p>
                  <p className="text-gray-700 text-sm">Within 48 hours on business days</p>
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Location</h3>
              <div className="border border-gray-100 rounded-2xl overflow-hidden">
                {/* Map placeholder */}
                <div className="bg-gray-50 h-32 flex items-center justify-center border-b border-gray-100">
                  <div className="text-center">
                    <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center mx-auto mb-2 text-xs font-bold">
                      ✦
                    </div>
                    <p className="text-xs text-gray-500 font-medium">Auckland, New Zealand</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm font-semibold text-gray-900">Junction Media</p>
                  <p className="text-sm text-gray-500">Auckland, New Zealand</p>
                  <p className="text-xs text-gray-400 mt-1">Serving clients across all of NZ</p>
                </div>
              </div>
            </div>

            {/* Partnership */}
            <div className="p-6 bg-gray-50 rounded-2xl">
              <h3 className="font-semibold text-gray-900 mb-2">Looking to work together?</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                For partnership enquiries — including fractional CMO, paid media, SEO, and AI
                marketing systems — the fastest path is to apply directly. I review all applications
                within 48 hours.
              </p>
              <Link
                href="/apply"
                className="inline-block bg-gray-900 text-white px-5 py-2.5 rounded-full font-medium hover:bg-gray-700 transition-colors text-sm"
              >
                Apply to Work With Me →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="max-w-3xl mx-auto px-6 py-12 border-t border-gray-100">
        <h2 className="text-xl font-bold mb-6">Quick Links</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { title: 'Services', href: '/services' },
            { title: 'Case Studies', href: '/case-studies' },
            { title: 'Blog', href: '/blog' },
            { title: 'About', href: '/about' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="p-4 border border-gray-100 rounded-xl hover:border-gray-300 transition-colors text-sm font-medium text-gray-700 hover:text-gray-900 text-center"
            >
              {link.title}
            </Link>
          ))}
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
