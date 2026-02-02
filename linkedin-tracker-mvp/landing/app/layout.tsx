import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LinkedIn Outreach Tracker - Never Lose a Lead Again',
  description: 'Track LinkedIn messages, automate follow-ups, and boost your conversion rate. Perfect for sales reps, recruiters, and networkers. Free for 10 leads.',
  keywords: 'LinkedIn tracker, sales automation, CRM, lead tracking, outreach management, follow-up reminders',
  openGraph: {
    title: 'LinkedIn Outreach Tracker',
    description: 'Track LinkedIn messages and automate follow-ups. Free for 10 leads.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LinkedIn Outreach Tracker',
    description: 'Never lose a lead again. Track LinkedIn messages automatically.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Plausible Analytics */}
        <script defer data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN} src="https://plausible.io/js/script.js"></script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
