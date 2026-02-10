import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'YourBrand - The Modern Platform for Growing Teams',
  description: 'Ship faster, scale infinitely, and delight your customers. The all-in-one platform trusted by the world\'s most innovative companies.',
  keywords: 'SaaS, platform, development, cloud, API, enterprise',
  authors: [{ name: 'YourBrand' }],
  openGraph: {
    title: 'YourBrand - The Modern Platform for Growing Teams',
    description: 'Ship faster, scale infinitely, and delight your customers.',
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YourBrand - The Modern Platform for Growing Teams',
    description: 'Ship faster, scale infinitely, and delight your customers.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
