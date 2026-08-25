import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/config';

export const dynamic = 'force-static';

// Served at the domain root (custom domain), so crawlers pick it up directly.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/admin' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
