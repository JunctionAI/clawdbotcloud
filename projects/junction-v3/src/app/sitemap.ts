import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';

// ========================================
// SITEMAP GENERATION
// ========================================
// Automatically generates sitemap.xml for SEO
// Includes static pages + all blog posts

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.junctionmedia.ai';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  // Dynamic blog posts
  const posts = getAllPosts();
  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...blogPages];
}
