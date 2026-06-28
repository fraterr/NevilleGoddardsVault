import { getDocumentBySlug, getVaultTree, VaultNode } from '@/lib/markdown';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

// Map slugs to banner image filenames
const BANNER_MAP: Record<string, string> = {
  'index': 'banner-index.png',
  'books': 'banner-books.png',
  'lectures': 'banner-lectures.png',
  'feedback': 'banner-feedback.png',
  'buy-me-a-tea': 'banner-buy-me-a-tea.png',
  'search/bible-references': 'banner-bible-references.png',
  'books/awakened-imagination': 'banner-awakened-imagination.png',
  'books/feeling-is-the-secret': 'banner-feeling-is-the-secret.png',
  'books/freedom-for-all': 'banner-freedom-for-all.png',
  'books/out-of-this-world': 'banner-out-of-this-world.png',
  'books/the-law-and-the-promise': 'banner-the-law-and-the-promise.png',
  'books/the-power-of-awareness': 'banner-the-power-of-awareness.png',
  'books/the-search': 'banner-the-search.png',
  'books/your-faith-is-your-fortune': 'banner-your-faith-is-your-fortune.png',
  'books/at-your-command': 'banner-at-your-command.png',
  'books/prayer-the-art-of-believing': 'banner-prayer-art-of-believing.png',
  'books/seedtime-and-harvest': 'banner-seedtime-and-harvest.png',
  'lectures/radio-lectures': 'banner-radio-lectures.png',
};

function getBannerForSlug(slugParts: string[]): string | null {
  const slugPath = slugParts.join('/').toLowerCase();

  // Exact match first
  if (BANNER_MAP[slugPath]) {
    return BANNER_MAP[slugPath];
  }

  // For chapter pages, try the parent (book) banner
  // e.g. books/awakened-imagination/awakened-imagination-chapter-1 -> books/awakened-imagination
  if (slugParts.length >= 2) {
    const parentSlug = slugParts.slice(0, -1).join('/').toLowerCase();
    if (BANNER_MAP[parentSlug]) {
      return BANNER_MAP[parentSlug];
    }
  }

  return null;
}

export async function generateStaticParams() {
  const tree = getVaultTree();
  const paths: { slug: string[] }[] = [];

  function traverse(nodes: VaultNode[]) {
    for (const node of nodes) {
      paths.push({ slug: node.slug });
      if (node.children) {
        traverse(node.children);
      }
    }
  }

  traverse(tree);
  return paths;
}

export default async function DocumentPage({ params }: PageProps) {
  const resolvedParams = await params;
  const doc = getDocumentBySlug(resolvedParams.slug);

  if (!doc) {
    notFound();
  }

  const bannerFile = getBannerForSlug(resolvedParams.slug);

  return (
    <article className="glass animate-fade-in" style={{ padding: '3rem', borderRadius: '16px', overflow: 'hidden' }}>
      {bannerFile && (
        <div style={{ 
          margin: '-3rem -3rem 2rem -3rem', 
          position: 'relative', 
          height: '200px',
          overflow: 'hidden'
        }}>
          <Image
            src={`/images/banners/${bannerFile}`}
            alt="Page banner"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
          />
        </div>
      )}
      <MarkdownRenderer content={doc.content} />
    </article>
  );
}
