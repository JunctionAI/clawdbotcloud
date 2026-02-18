import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found | Tom Hall-Taylor',
  description: 'This page does not exist. Head back to Tom Hall-Taylor — AI-Native Marketing Consultant based in Auckland, New Zealand.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8">
              <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <defs>
                  <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#3B82F6' }} />
                    <stop offset="50%" style={{ stopColor: '#8B5CF6' }} />
                    <stop offset="100%" style={{ stopColor: '#EC4899' }} />
                  </linearGradient>
                </defs>
                <path d="M25 8 Q8 8 8 25" stroke="url(#logoGradient)" strokeWidth="8" strokeLinecap="round" fill="none" />
                <path d="M55 8 Q72 8 72 25" stroke="url(#logoGradient)" strokeWidth="8" strokeLinecap="round" fill="none" />
                <path d="M25 72 Q8 72 8 55" stroke="url(#logoGradient)" strokeWidth="8" strokeLinecap="round" fill="none" />
                <path d="M55 72 Q72 72 72 55" stroke="url(#logoGradient)" strokeWidth="8" strokeLinecap="round" fill="none" />
              </svg>
            </div>
            <span className="font-bold text-gray-900">Tom Hall-Taylor</span>
          </Link>
          <Link
            href="/#apply"
            className="px-5 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 transition-opacity"
          >
            Apply to Work Together
          </Link>
        </div>
      </nav>

      {/* 404 Content */}
      <main className="flex-1 flex items-center justify-center px-6 pt-24 pb-16">
        <div className="max-w-xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            404 — Page Not Found
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Wrong turn.
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed mb-10">
            This page doesn&apos;t exist — but if you&apos;re looking for an AI-native marketing partner in New Zealand, you&apos;re in the right place.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-white font-bold bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 transition-opacity"
            >
              Go Home
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h18m-9-9l9 9-9 9" />
              </svg>
            </Link>
            <Link
              href="/blog"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-gray-700 font-bold border border-gray-200 hover:border-gray-400 transition-colors"
            >
              Read the Blog
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <span>© {new Date().getFullYear()} Junction Media · Auckland, New Zealand</span>
          <a href="mailto:tom@junctionmedia.ai" className="hover:text-gray-600 transition-colors">
            tom@junctionmedia.ai
          </a>
        </div>
      </footer>
    </div>
  );
}
