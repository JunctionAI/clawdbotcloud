import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service | Junction Media',
  description: 'Terms of Service for Junction Media marketing services. Service agreements, payment terms, IP ownership, confidentiality, and liability.',
  alternates: {
    canonical: 'https://www.junctionmedia.ai/terms',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function TermsPage() {
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

      {/* Content */}
      <section className="max-w-3xl mx-auto px-6 pt-16 pb-24">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Legal</p>
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Terms of Service</h1>
        <p className="text-gray-500 text-sm mb-12">Last updated: January 2026</p>

        <div className="space-y-10">

          {/* 1. Agreement */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Agreement to Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              These Terms of Service (&ldquo;Terms&rdquo;) govern the relationship between Junction Media
              (&ldquo;Junction Media&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) and clients (&ldquo;you&rdquo;, &ldquo;Client&rdquo;) who engage our
              marketing services. By signing a service agreement or engaging Junction Media for services,
              you agree to be bound by these Terms.
            </p>
            <p className="text-gray-600 leading-relaxed mt-3">
              These Terms are governed by the laws of New Zealand. Any disputes will be subject to the
              exclusive jurisdiction of the New Zealand courts.
            </p>
          </div>

          {/* 2. Services */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Services</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Junction Media provides AI-native marketing services including but not limited to:
              fractional CMO engagements, AI marketing systems, Google Ads management, Meta Ads management,
              SEO, content marketing, email marketing, social media management, and web design.
            </p>
            <p className="text-gray-600 leading-relaxed mb-3">
              The specific scope of services, deliverables, and timelines for each engagement are agreed
              in writing prior to commencement. Junction Media reserves the right to decline or discontinue
              services at our discretion.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We work with a maximum of 4–5 clients at any one time. Acceptance of an application does
              not guarantee a service agreement — a formal proposal and signed agreement are required
              before work commences.
            </p>
          </div>

          {/* 3. Payment */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Payment Terms</h2>
            <div className="space-y-4">
              <div className="p-5 border border-gray-100 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-2 text-sm">Invoicing</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Monthly retainer services are invoiced on the 1st of each month, payable within 7 days.
                  Project-based work is invoiced 50% upfront and 50% on completion, unless otherwise agreed.
                  All prices are in NZD and exclusive of GST unless stated otherwise.
                </p>
              </div>
              <div className="p-5 border border-gray-100 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-2 text-sm">Late Payment</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Invoices unpaid after 14 days may incur a 1.5% monthly late fee. Junction Media
                  reserves the right to pause or suspend services on accounts overdue by more than 14 days.
                  Services will resume within 2 business days of payment receipt.
                </p>
              </div>
              <div className="p-5 border border-gray-100 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-2 text-sm">Ad Spend</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Third-party advertising spend (Google Ads, Meta Ads) is paid directly by the client
                  to the respective platform. Management fees are separate from and additional to ad spend.
                  Junction Media is not responsible for platform billing issues or account suspensions.
                </p>
              </div>
            </div>
          </div>

          {/* 4. Minimum Terms */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Engagement Terms &amp; Cancellation</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              All engagements have a minimum term of 3 months. This minimum term is non-negotiable
              and applies regardless of results — marketing systems require time to build, test, and
              compound. Early termination within the minimum term does not entitle the client to a refund
              of fees already paid.
            </p>
            <p className="text-gray-600 leading-relaxed mb-3">
              After the minimum term, engagements continue on a rolling monthly basis. Either party may
              terminate by providing 30 days written notice. Notice must be sent to{' '}
              <a href="mailto:tom@junctionmedia.ai" className="text-gray-900 underline underline-offset-2">
                tom@junctionmedia.ai
              </a>.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Junction Media may terminate an engagement immediately if: the client engages in unlawful
              activity, the client fails to pay after 30 days, or the working relationship becomes
              untenable at Junction Media&apos;s reasonable discretion.
            </p>
          </div>

          {/* 5. IP */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Intellectual Property</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              <strong className="text-gray-800">Client-owned deliverables:</strong> Upon full payment of
              all outstanding invoices, the client owns all final deliverables created specifically for
              them — including ad creatives, written content, website copy, and custom reports.
            </p>
            <p className="text-gray-600 leading-relaxed mb-3">
              <strong className="text-gray-800">Junction Media-retained IP:</strong> Junction Media retains
              ownership of: all methodologies, processes, AI system configurations, templates, frameworks,
              and proprietary tools used to deliver services. These are licensed to the client for use
              during the engagement but are not transferred upon termination.
            </p>
            <p className="text-gray-600 leading-relaxed">
              <strong className="text-gray-800">Ad accounts:</strong> The client always retains full
              ownership of their Google Ads, Meta Ads, and other advertising accounts. Junction Media
              operates as a manager/partner on these accounts and removes access upon engagement termination.
            </p>
          </div>

          {/* 6. Confidentiality */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Confidentiality</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Both parties agree to keep confidential all non-public information disclosed during the
              engagement (&ldquo;Confidential Information&rdquo;). This includes business strategies, financial data,
              customer information, and technical systems.
            </p>
            <p className="text-gray-600 leading-relaxed mb-3">
              Junction Media will not disclose client Confidential Information to third parties without
              written consent, except where required by law. This obligation survives termination of
              the engagement for a period of 2 years.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Junction Media may reference the client as a customer in marketing materials (e.g., case
              studies, testimonials) unless the client opts out in writing. We will always seek approval
              before publishing specific performance data.
            </p>
          </div>

          {/* 7. Client Obligations */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Client Obligations</h2>
            <p className="text-gray-600 leading-relaxed mb-3">To enable effective service delivery, you agree to:</p>
            <ul className="list-disc list-outside ml-5 space-y-1 text-gray-600 text-sm leading-relaxed">
              <li>Provide timely access to required accounts, assets, and information</li>
              <li>Designate a primary point of contact who can approve work and provide feedback</li>
              <li>Respond to requests for approval or information within 3 business days</li>
              <li>Ensure all information provided to Junction Media is accurate and lawful</li>
              <li>Comply with the terms of service of all platforms used (Google, Meta, etc.)</li>
              <li>Not engage other marketing agencies for the same services without prior discussion</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-3 text-sm">
              Delays caused by the client (e.g., late approvals, missing access) may affect delivery
              timelines. Junction Media is not responsible for results impacted by client delays.
            </p>
          </div>

          {/* 8. Results & Liability */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Results Disclaimer &amp; Limitation of Liability</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Junction Media applies professional expertise and best-practice methods to all engagements.
              However, we make no guarantee of specific outcomes — marketing results depend on numerous
              factors outside our control including market conditions, platform algorithm changes,
              product/service quality, and competitive landscape.
            </p>
            <p className="text-gray-600 leading-relaxed mb-3">
              To the maximum extent permitted by New Zealand law, Junction Media&apos;s total liability to
              the client for any claim arising from the engagement shall not exceed the total fees paid
              by the client in the 3 months prior to the claim.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Junction Media is not liable for: loss of profits, indirect or consequential damages,
              platform account suspensions, changes in third-party algorithms or policies, or actions
              taken by the client outside the agreed scope.
            </p>
          </div>

          {/* 9. Changes */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Changes to These Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              We may update these Terms periodically. Active clients will be notified of material changes
              by email with 30 days notice. Continued engagement after that period constitutes acceptance
              of the updated Terms.
            </p>
          </div>

          {/* 10. Contact */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">10. Contact</h2>
            <p className="text-gray-600 leading-relaxed">
              For questions about these Terms, contact:
            </p>
            <div className="mt-4 p-5 border border-gray-100 rounded-xl">
              <p className="font-semibold text-gray-800">Junction Media</p>
              <p className="text-gray-600 text-sm mt-1">Auckland, New Zealand</p>
              <a href="mailto:tom@junctionmedia.ai" className="text-gray-600 text-sm underline underline-offset-2 hover:text-gray-900">
                tom@junctionmedia.ai
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Junction Media. Auckland, New Zealand.</p>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Home</Link>
            <Link href="/services" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Services</Link>
            <Link href="/privacy-policy" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Privacy</Link>
            <Link href="/terms" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
