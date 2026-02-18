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
    default: "Tom Hall-Taylor | AI-Native Marketing Operator",
    template: "%s | Tom Hall-Taylor",
  },
  description:
    "AI-native marketing systems for select businesses. Tom Hall-Taylor builds integrated AI marketing operations that create real competitive advantage. By application only.",
  keywords: [
    "AI marketing operator",
    "AI marketing systems",
    "AI marketing New Zealand",
    "fractional CMO Auckland",
    "AI marketing consultant NZ",
    "marketing automation NZ",
    "AI-native marketing",
    "Tom Hall-Taylor",
    "Junction Media",
  ],

  // Canonical URL
  metadataBase: new URL("https://www.junctionmedia.ai"),
  alternates: {
    canonical: "/",
  },

  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_NZ",
    url: "https://www.junctionmedia.ai",
    siteName: "Tom Hall-Taylor",
    title: "Tom Hall-Taylor | AI-Native Marketing Operator",
    description:
      "Building AI marketing systems for select businesses. Strategy and execution, unified. By application only.",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Tom Hall-Taylor - AI-Native Marketing Operator",
        type: "image/png",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Tom Hall-Taylor | AI-Native Marketing Operator",
    description:
      "Building AI marketing systems for select businesses. Strategy and execution, unified.",
    images: ["/api/og"],
    creator: "@tomhalltaylor",
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
  authors: [{ name: "Tom Hall-Taylor" }],
  creator: "Tom Hall-Taylor",
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
// JSON-LD STRUCTURED DATA
// ========================================
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://www.junctionmedia.ai/#person",
      name: "Tom Hall-Taylor",
      url: "https://www.junctionmedia.ai",
      jobTitle: "AI Marketing Consultant & Fractional CMO",
      description:
        "AI-native marketing consultant based in Auckland, NZ. Builds integrated AI marketing systems for select businesses. Fractional CMO services by application only.",
      email: "tom@junctionmedia.ai",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Auckland",
        addressRegion: "Auckland",
        addressCountry: "NZ",
      },
      areaServed: [
        { "@type": "Country", name: "New Zealand" },
        { "@type": "City", name: "Auckland" },
      ],
      sameAs: [
        "https://www.linkedin.com/in/tomhalltaylor",
        "https://twitter.com/tomhalltaylor",
      ],
      knowsAbout: [
        "AI Marketing Systems",
        "Marketing Automation",
        "Digital Marketing Strategy",
        "AI Strategy",
        "Growth Marketing",
        "Fractional CMO Services",
        "AI-Native Marketing Operations",
        "Content Marketing",
        "Paid Media",
        "SEO",
      ],
      worksFor: {
        "@id": "https://www.junctionmedia.ai/#organization",
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://www.junctionmedia.ai/#organization",
      name: "Junction Media",
      url: "https://www.junctionmedia.ai",
      description:
        "AI-native marketing consultancy. Fractional CMO and AI marketing systems for select businesses in New Zealand. By application only.",
      email: "tom@junctionmedia.ai",
      founder: {
        "@id": "https://www.junctionmedia.ai/#person",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Auckland",
        addressRegion: "Auckland",
        addressCountry: "NZ",
      },
      areaServed: [
        { "@type": "Country", name: "New Zealand" },
        { "@type": "City", name: "Auckland" },
      ],
      priceRange: "$$$",
      serviceType: [
        "AI Marketing Consulting",
        "Fractional CMO",
        "AI Marketing Systems",
        "Growth Marketing",
        "Marketing Automation",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "AI Marketing Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Fractional CMO",
              description:
                "Embedded AI marketing leadership. Strategy, execution, and optimization — unified. Auckland, NZ.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AI Marketing Systems",
              description:
                "Custom AI marketing operations built for your business. Autonomous agents, content systems, and growth infrastructure.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AI Marketing Consulting",
              description:
                "Strategic consulting for businesses ready to build AI-native marketing operations.",
            },
          },
        ],
      },
    },
  ],
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
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
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
