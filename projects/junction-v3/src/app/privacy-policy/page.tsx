import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Junction Media',
  description: 'Privacy Policy for Junction Media (junctionmedia.ai). How we collect, use, and protect your personal information.',
  alternates: {
    canonical: 'https://www.junctionmedia.ai/privacy-policy',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPolicyPage() {
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
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Privacy Policy</h1>
        <p className="text-gray-500 text-sm mb-12">Last updated: January 2026</p>

        <div className="prose prose-gray max-w-none space-y-10">

          {/* 1. Who we are */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Who We Are</h2>
            <p className="text-gray-600 leading-relaxed">
              Junction Media (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) operates the website{' '}
              <a href="https://www.junctionmedia.ai" className="text-gray-900 underline underline-offset-2">
                junctionmedia.ai
              </a>{' '}
              and provides AI-native marketing services to businesses in New Zealand. Our principal place
              of business is Auckland, New Zealand.
            </p>
            <p className="text-gray-600 leading-relaxed mt-3">
              If you have any questions about this policy, contact us at{' '}
              <a href="mailto:tom@junctionmedia.ai" className="text-gray-900 underline underline-offset-2">
                tom@junctionmedia.ai
              </a>.
            </p>
          </div>

          {/* 2. Information we collect */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Information We Collect</h2>
            <p className="text-gray-600 leading-relaxed mb-4">We collect information in the following ways:</p>

            <h3 className="font-semibold text-gray-800 mb-2">Information you provide directly</h3>
            <ul className="list-disc list-outside ml-5 space-y-1 text-gray-600 text-sm leading-relaxed mb-4">
              <li>Name, email address, and business details when you submit an application or contact form</li>
              <li>Business information and marketing goals shared during onboarding or consultation calls</li>
              <li>Any communications you send to us by email or other channels</li>
            </ul>

            <h3 className="font-semibold text-gray-800 mb-2">Information collected automatically</h3>
            <ul className="list-disc list-outside ml-5 space-y-1 text-gray-600 text-sm leading-relaxed">
              <li>IP address, browser type, device type, and operating system</li>
              <li>Pages visited, time spent on pages, and navigation paths</li>
              <li>Referral source (how you found our website)</li>
              <li>Cookie identifiers and similar tracking technologies</li>
            </ul>
          </div>

          {/* 3. Cookies */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Cookies &amp; Tracking Technologies</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our website uses cookies and similar technologies to improve your experience and help us
              understand how our site is used. By using our website, you consent to the use of cookies
              as described below.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  name: 'Essential Cookies',
                  desc: 'Required for the website to function. Cannot be disabled. These include session management and security tokens.',
                },
                {
                  name: 'Analytics Cookies',
                  desc: 'Google Analytics (GA4) to understand how visitors use our site — page views, session duration, traffic sources. Data is anonymised.',
                },
                {
                  name: 'Marketing Cookies',
                  desc: 'Meta Pixel to measure the effectiveness of our advertising on Facebook and Instagram. May be used to show relevant ads to past visitors.',
                },
                {
                  name: 'Preference Cookies',
                  desc: 'Remember your settings and preferences to improve your experience on return visits.',
                },
              ].map((cookie) => (
                <div key={cookie.name} className="p-4 border border-gray-100 rounded-xl">
                  <h4 className="font-semibold text-gray-800 text-sm mb-1">{cookie.name}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">{cookie.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-600 leading-relaxed mt-4 text-sm">
              You can control cookies through your browser settings. Disabling certain cookies may affect
              the functionality of the website. For more information on managing cookies, visit{' '}
              <a href="https://www.allaboutcookies.org" className="underline underline-offset-2" target="_blank" rel="noopener noreferrer">
                allaboutcookies.org
              </a>.
            </p>
          </div>

          {/* 4. How we use your information */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. How We Use Your Information</h2>
            <p className="text-gray-600 leading-relaxed mb-3">We use the information we collect to:</p>
            <ul className="list-disc list-outside ml-5 space-y-1 text-gray-600 text-sm leading-relaxed">
              <li>Review and respond to service applications and enquiries</li>
              <li>Provide and improve our marketing services to clients</li>
              <li>Send service-related communications (onboarding, reporting, updates)</li>
              <li>Analyse website usage and improve user experience</li>
              <li>Measure the effectiveness of our own marketing campaigns</li>
              <li>Comply with legal obligations under New Zealand law</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4 text-sm">
              We do <strong>not</strong> sell your personal information to third parties. We do not use your
              data for automated decision-making that produces legal or similarly significant effects.
            </p>
          </div>

          {/* 5. Third parties */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Third-Party Services</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We use the following third-party services that may process your data:
            </p>
            <div className="space-y-3">
              {[
                {
                  name: 'Google Analytics (GA4)',
                  purpose: 'Website analytics and traffic measurement',
                  privacy: 'https://policies.google.com/privacy',
                },
                {
                  name: 'Meta Pixel (Facebook/Instagram)',
                  purpose: 'Advertising measurement and retargeting',
                  privacy: 'https://www.facebook.com/privacy/policy/',
                },
                {
                  name: 'Vercel',
                  purpose: 'Website hosting and delivery infrastructure',
                  privacy: 'https://vercel.com/legal/privacy-policy',
                },
              ].map((tp) => (
                <div key={tp.name} className="flex flex-col sm:flex-row sm:items-center gap-2 py-3 border-b border-gray-100 last:border-0">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800">{tp.name}</p>
                    <p className="text-xs text-gray-500">{tp.purpose}</p>
                  </div>
                  <a
                    href={tp.privacy}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-gray-500 hover:text-gray-700 underline underline-offset-2 whitespace-nowrap"
                  >
                    Privacy policy →
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Data retention */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Data Retention</h2>
            <p className="text-gray-600 leading-relaxed">
              We retain personal information for as long as necessary to provide our services and comply with
              legal obligations. Enquiry data from non-clients is retained for 12 months. Client data is
              retained for 7 years in accordance with New Zealand tax and business record requirements.
              You may request deletion of your data at any time (see section 8).
            </p>
          </div>

          {/* 7. Data security */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Data Security</h2>
            <p className="text-gray-600 leading-relaxed">
              We implement appropriate technical and organisational measures to protect your personal
              information against unauthorised access, disclosure, alteration, or destruction. Our website
              is served over HTTPS. Access to client data is restricted to authorised personnel only.
              No method of transmission over the internet is 100% secure, and we cannot guarantee absolute
              security.
            </p>
          </div>

          {/* 8. Your rights */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Your Rights</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Under the New Zealand Privacy Act 2020, you have the right to:
            </p>
            <ul className="list-disc list-outside ml-5 space-y-1 text-gray-600 text-sm leading-relaxed">
              <li>Request access to personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information (subject to legal retention requirements)</li>
              <li>Withdraw consent for processing where consent is the basis for processing</li>
              <li>Lodge a complaint with the Office of the Privacy Commissioner</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4 text-sm">
              To exercise any of these rights, email{' '}
              <a href="mailto:tom@junctionmedia.ai" className="text-gray-900 underline underline-offset-2">
                tom@junctionmedia.ai
              </a>{' '}
              with your request. We will respond within 20 working days.
            </p>
          </div>

          {/* 9. Changes */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Changes to This Policy</h2>
            <p className="text-gray-600 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify clients of significant
              changes by email. The &ldquo;Last updated&rdquo; date at the top of this page reflects the most recent
              revision. Continued use of our website after changes are posted constitutes acceptance of
              the updated policy.
            </p>
          </div>

          {/* 10. Contact */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">10. Contact Us</h2>
            <p className="text-gray-600 leading-relaxed">
              For any privacy-related questions, requests, or complaints, contact us at:
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
