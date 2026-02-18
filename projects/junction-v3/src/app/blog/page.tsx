import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts, formatDate } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog | Tom Hall-Taylor — AI-Native Marketing Consultant NZ',
  description: 'Insights on AI marketing systems, fractional CMO strategy, and building competitive advantage through AI-native marketing. By Tom Hall-Taylor, Auckland NZ.',
  keywords: [
    'AI marketing consultant NZ',
    'fractional CMO NZ',
    'AI marketing systems',
    'marketing automation NZ',
    'Tom Hall-Taylor blog',
    'AI-native marketing',
  ],
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog | Tom Hall-Taylor',
    description: 'Insights on AI marketing systems and fractional CMO strategy from Auckland, New Zealand.',
    url: 'https://www.junctionmedia.ai/blog',
    type: 'website',
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-white">
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

      {/* Header */}
      <header className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            Insights & Strategy
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Thinking Out Loud
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl">
            On AI marketing systems, the fractional CMO model, and what it actually takes to build competitive advantage in 2026.
          </p>
        </div>
      </header>

      {/* Posts */}
      <main className="px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="divide-y divide-gray-100">
            {posts.map((post) => (
              <article key={post.slug} className="py-10 group">
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="flex items-center gap-3 text-sm text-gray-400 mb-3">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span>·</span>
                    <span>{post.readingTime} min read</span>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-snug">
                    {post.title}
                  </h2>

                  <p className="text-gray-500 text-lg leading-relaxed mb-4 max-w-3xl">
                    {post.excerpt}
                  </p>

                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 group-hover:gap-3 transition-all">
                    Read more
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>
              </article>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 p-8 md:p-12 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Ready to Build Your AI Marketing System?</h2>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
              I work with 3-5 businesses at a time. Applications are reviewed personally and monthly.
            </p>
            <Link
              href="/#apply"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-bold bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 transition-opacity"
            >
              Apply to Work With Me
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
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
