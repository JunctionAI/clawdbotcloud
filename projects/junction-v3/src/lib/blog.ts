import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

// ========================================
// BLOG UTILITIES
// ========================================

const BLOG_DIR = path.join(process.cwd(), 'src', 'content', 'blog');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  readingTime: number;
  keywords: string[];
  content: string;
  contentHtml: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  readingTime: number;
  keywords: string[];
}

/**
 * Get all blog posts sorted by date (newest first)
 */
export function getAllPosts(): BlogPostMeta[] {
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.md$/, '');
    const filePath = path.join(BLOG_DIR, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContent);

    return {
      slug: data.slug || slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      readingTime: data.readingTime || 5,
      keywords: data.keywords || [],
    } as BlogPostMeta;
  });

  // Sort by date descending
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get a single blog post by slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'));

  for (const filename of files) {
    const filePath = path.join(BLOG_DIR, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    const postSlug = data.slug || filename.replace(/\.md$/, '');

    if (postSlug === slug) {
      const contentHtml = await marked(content);
      return {
        slug: postSlug,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        readingTime: data.readingTime || 5,
        keywords: data.keywords || [],
        content,
        contentHtml,
      };
    }
  }

  return null;
}

/**
 * Format date for display (e.g., "February 18, 2026")
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-NZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
