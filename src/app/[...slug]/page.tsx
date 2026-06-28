import { getDocumentBySlug, getVaultTree, VaultNode } from '@/lib/markdown';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateStaticParams() {
  const tree = getVaultTree();
  const paths: { slug: string[] }[] = [];

  function traverse(nodes: VaultNode[]) {
    for (const node of nodes) {
      if (node.type === 'file') {
        paths.push({ slug: node.slug });
      }
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

  return (
    <article className="glass animate-fade-in" style={{ padding: '3rem', borderRadius: '16px' }}>
      <MarkdownRenderer content={doc.content} />
    </article>
  );
}
