import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Style Swap - AI Fashion Try-On",
  description: "Transform your style with AI-powered virtual fashion try-on",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
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
