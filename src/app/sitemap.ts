import type { MetadataRoute } from 'next';
import { getVaultTree, VaultNode } from '@/lib/markdown';
import { TECHNIQUES } from '@/data/techniques';
import { SITE_URL } from '@/lib/config';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, priority: 1 },
    { url: `${SITE_URL}/start-here/`, priority: 0.9 },
    { url: `${SITE_URL}/techniques/`, priority: 0.9 },
    ...TECHNIQUES.map(t => ({ url: `${SITE_URL}/techniques/${t.slug}/`, priority: 0.9 })),
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
