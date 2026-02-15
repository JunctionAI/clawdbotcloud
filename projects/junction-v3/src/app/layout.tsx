import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/animations/CustomCursor";

// ========================================
// FONT OPTIMIZATION
// ========================================
// Using next/font for automatic optimization:
// - Self-hosted (no external requests)
// - font-display: swap (prevents FOIT)
// - Preloaded automatically
// - CSS size-adjust for zero CLS
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
  // Only load weights we actually use
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

// ========================================
// METADATA (SEO & OG)
// ========================================
export const metadata: Metadata = {
  // Basic Meta
  title: {
    default: "Junction Media | AI-Powered Marketing That Moves The Needle",
    template: "%s | Junction Media",
  },
  description:
    "The marketing partner that actually moves the needle. AI agents executing 24/7 with senior human oversight. Limited partnerships available.",
  keywords: [
    "AI marketing agency",
    "AI marketing",
    "digital marketing",
    "performance marketing",
    "New Zealand marketing",
    "AI agents",
    "marketing automation",
    "growth marketing",
  ],

  // Canonical URL
  metadataBase: new URL("https://junctionmedia.co.nz"),
  alternates: {
    canonical: "/",
  },

  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_NZ",
    url: "https://junctionmedia.co.nz",
    siteName: "Junction Media",
    title: "Junction Media | AI-Powered Marketing",
    description:
      "AI agents + senior human strategists. Marketing that produces revenue, not just reports. 24/7 autonomous execution.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Junction Media - AI-Powered Marketing",
        type: "image/png",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Junction Media | AI-Powered Marketing",
    description:
      "AI agents + senior human strategists. Marketing that produces revenue, not just reports.",
    images: ["/og-image.png"],
    creator: "@junctionmedia",
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Icons & Manifest
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",

  // Additional meta
  authors: [{ name: "Junction Media" }],
  creator: "Junction Media",
  publisher: "Junction Media",
  category: "Marketing",
};

// ========================================
// VIEWPORT
// ========================================
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// ========================================
// ROOT LAYOUT
// ========================================
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Preconnect to critical origins */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for potential third-party resources */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        
        {/* Preload critical assets */}
        <link
          rel="preload"
          href="/hero-gradient.svg"
          as="image"
          type="image/svg+xml"
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {/* Premium custom cursor (desktop only) */}
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
