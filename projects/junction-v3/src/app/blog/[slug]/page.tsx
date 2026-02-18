import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug, formatDate } from '@/lib/blog';

interface PageProps {
  params: { slug: string };
}

// ========================================
// STATIC PARAMS — pre-render all blog posts
// ========================================
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

// ========================================
// DYNAMIC METADATA — SEO per post
// ========================================
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: `${post.title} | Tom Hall-Taylor`,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://www.junctionmedia.ai/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: ['Tom Hall-Taylor'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

// ========================================
// PAGE COMPONENT
// ========================================
export default async function BlogPostPage({ params }: PageProps) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

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
          <div className="flex items-center gap-4">
            <Link href="/blog" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              ← All Posts
            </Link>
            <Link
              href="/#apply"
              className="hidden sm:inline-flex px-5 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 transition-opacity"
            >
              Apply to Work Together
            </Link>
          </div>
        </div>
      </nav>

      {/* Article */}
      <article className="pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-3 text-sm text-gray-400 mb-6">
              <Link href="/blog" className="hover:text-gray-600 transition-colors">Blog</Link>
              <span>→</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span>·</span>
              <span>{post.readingTime} min read</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
              {post.title}
            </h1>

            <p className="text-xl text-gray-500 leading-relaxed">
              {post.excerpt}
            </p>

            <div className="mt-8 pt-8 border-t border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                T
              </div>
              <div>
                <div className="font-semibold text-gray-900">Tom Hall-Taylor</div>
                <div className="text-sm text-gray-500">AI-Native Marketing Consultant · Auckland, NZ</div>
              </div>
            </div>
          </header>

          {/* Content */}
          <div
            className="prose prose-lg prose-gray max-w-none
              prose-headings:font-bold prose-headings:tracking-tight
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:leading-relaxed prose-p:text-gray-600
              prose-strong:text-gray-900
              prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
              prose-ul:my-4 prose-li:text-gray-600
              prose-blockquote:border-l-4 prose-blockquote:border-blue-200 prose-blockquote:bg-blue-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
              prose-hr:border-gray-100"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          {/* Author & CTA */}
          <div className="mt-16 pt-12 border-t border-gray-100">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                  T
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-lg mb-1">Tom Hall-Taylor</div>
                  <p className="text-gray-600 mb-4">
                    AI-native marketing consultant based in Auckland, New Zealand. I build integrated AI marketing systems for select businesses — strategy and execution, unified.
                  </p>
                  <Link
                    href="/#apply"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold text-sm bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 transition-opacity"
                  >
                    Apply to Work Together
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-6">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <span>© {new Date().getFullYear()} Junction Media · Auckland, New Zealand</span>
          <a href="mailto:tom@junctionmedia.ai" className="hover:text-gray-600 transition-colors">
            tom@junctionmedia.ai
          </a>
        </div>
      </footer>
    </div>
  );
}
