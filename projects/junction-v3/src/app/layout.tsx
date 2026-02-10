import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Junction Media | AI-Powered Marketing That Moves The Needle",
  description: "The marketing partner that actually moves the needle. AI agents executing 24/7 with senior human oversight. Limited partnerships available.",
  keywords: ["marketing agency", "AI marketing", "digital marketing", "performance marketing", "New Zealand"],
  openGraph: {
    title: "Junction Media | AI-Powered Marketing",
    description: "AI agents + senior human strategists. Marketing that produces revenue, not just reports.",
    type: "website",
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
        {children}
      </body>
    </html>
  );
}
