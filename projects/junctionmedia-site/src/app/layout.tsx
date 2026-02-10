import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Junction Media AI | AI-Powered Marketing That Actually Works",
  description:
    "Full-service digital marketing with AI agents running 24/7. Human oversight for quality. Results that speak for themselves. $10k/month. No fluff. Just results.",
  keywords: ["AI marketing", "digital marketing", "marketing agency", "AI agents", "SEO", "paid advertising"],
  openGraph: {
    title: "Junction Media AI | AI-Powered Marketing That Actually Works",
    description: "Full-service digital marketing with AI agents running 24/7. Human oversight for quality.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
