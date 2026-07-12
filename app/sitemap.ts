import type { MetadataRoute } from 'next'
import courses from '@/data/courses.json'
import blogposts from '@/data/blogposts.json'
import { SITE_URL } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, priority: 1 },
    { url: `${SITE_URL}/courses`, priority: 0.9 },
    { url: `${SITE_URL}/pricing`, priority: 0.9 },
    { url: `${SITE_URL}/about`, priority: 0.6 },
    { url: `${SITE_URL}/contact`, priority: 0.8 },
    { url: `${SITE_URL}/blog`, priority: 0.5 },
    { url: `${SITE_URL}/privacy`, priority: 0.2 },
  ]

  const courseRoutes: MetadataRoute.Sitemap = courses
    .filter((c) => c.isActive)
    .map((c) => ({ url: `${SITE_URL}/courses/${c.slug}`, priority: 0.9 }))

  const blogRoutes: MetadataRoute.Sitemap = blogposts
    .filter((p) => p.isPublished)
    .map((p) => ({ url: `${SITE_URL}/blog/${p.slug}`, priority: 0.5 }))

  return [...staticRoutes, ...courseRoutes, ...blogRoutes]
}
