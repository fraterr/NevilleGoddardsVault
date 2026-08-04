import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/config';

export const dynamic = 'force-static';

// Note: on a GitHub Pages project site this file is served under the base
// path, so crawlers won't pick it up automatically at the domain root.
// The sitemap should be submitted manually via Google Search Console.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
