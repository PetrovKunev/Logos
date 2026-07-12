import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // /thanks е само за conversion tracking — не бива да се индексира
      disallow: ['/thanks', '/api/'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
