import type { MetadataRoute } from 'next';
import { getVaultTree, VaultNode } from '@/lib/markdown';
import { TECHNIQUES } from '@/data/techniques';
import { BOOK_SUMMARIES } from '@/data/bookSummaries';
import { getBlogPosts } from '@/lib/blog';
import { SITE_URL } from '@/lib/config';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, priority: 1 },
    { url: `${SITE_URL}/start-here/`, priority: 0.9 },
    { url: `${SITE_URL}/test-the-law/`, priority: 0.9 },
    { url: `${SITE_URL}/techniques/`, priority: 0.9 },
    ...TECHNIQUES.map(t => ({ url: `${SITE_URL}/techniques/${t.slug}/`, priority: 0.9 })),
    { url: `${SITE_URL}/success-stories/`, priority: 0.8 },
    { url: `${SITE_URL}/blog/`, priority: 0.8 },
    ...getBlogPosts().map(p => ({ url: `${SITE_URL}/blog/${p.slug}/`, priority: 0.7, lastModified: new Date(p.date) })),
    { url: `${SITE_URL}/summaries/`, priority: 0.9 },
    ...BOOK_SUMMARIES.map(b => ({ url: `${SITE_URL}/summaries/${b.slug}/`, priority: 0.9 })),
    { url: `${SITE_URL}/search/topics/`, priority: 0.6 },
    { url: `${SITE_URL}/search/bible-references/`, priority: 0.6 },
    { url: `${SITE_URL}/search/keywords/`, priority: 0.6 },
  ];

  function traverse(nodes: VaultNode[]) {
    for (const node of nodes) {
      const slugPath = node.slug.join('/');
      if (slugPath === 'index') continue; // home already listed
      entries.push({
        url: `${SITE_URL}/${slugPath}/`,
        priority: node.type === 'directory' ? 0.8 : 0.7,
      });
      if (node.children) traverse(node.children);
    }
  }

  traverse(getVaultTree());
  return entries;
}
