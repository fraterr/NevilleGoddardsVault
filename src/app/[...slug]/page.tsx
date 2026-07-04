import { getDocumentBySlug, getVaultTree, VaultNode } from '@/lib/markdown';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import TopicsBrowser from '@/components/TopicsBrowser';
import BibleReferencesBrowser from '@/components/BibleReferencesBrowser';
import GlossaryBrowser from '@/components/GlossaryBrowser';
import KeywordsBrowser from '@/components/KeywordsBrowser';
import ReadingContainer from '@/components/ReadingContainer';
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
  
  const isSearchTopics = resolvedParams.slug.length === 2 && 
                         resolvedParams.slug[0].toLowerCase() === 'search' && 
                         resolvedParams.slug[1].toLowerCase() === 'topics';

  if (isSearchTopics) {
    return (
      <article className="glass animate-fade-in" style={{ padding: '3rem', borderRadius: '16px', overflow: 'hidden' }}>
        <TopicsBrowser />
      </article>
    );
  }

  const isBibleRef = resolvedParams.slug.length === 2 && 
                     resolvedParams.slug[0].toLowerCase() === 'search' && 
                     resolvedParams.slug[1].toLowerCase() === 'bible-references';

  if (isBibleRef) {
    return (
      <article className="glass animate-fade-in" style={{ padding: '3rem', borderRadius: '16px', overflow: 'hidden' }}>
        <BibleReferencesBrowser />
      </article>
    );
  }

  const isKeywords = resolvedParams.slug.length === 2 && 
                     resolvedParams.slug[0].toLowerCase() === 'search' && 
                     resolvedParams.slug[1].toLowerCase() === 'keywords';

  if (isKeywords) {
    return (
      <article className="glass animate-fade-in" style={{ padding: '3rem', borderRadius: '16px', overflow: 'hidden' }}>
        <KeywordsBrowser />
      </article>
    );
  }

  const isGlossary = resolvedParams.slug.length === 1 && 
                     resolvedParams.slug[0].toLowerCase() === 'glossary';

  if (isGlossary) {
    const doc = getDocumentBySlug(resolvedParams.slug);
    if (!doc) {
      notFound();
    }
    return (
      <article className="glass animate-fade-in" style={{ padding: '3rem', borderRadius: '16px', overflow: 'hidden' }}>
        <GlossaryBrowser content={doc.content} />
      </article>
    );
  }

  const doc = getDocumentBySlug(resolvedParams.slug);

  if (!doc) {
    notFound();
  }

  return (
    <article className="glass animate-fade-in" style={{ padding: '3rem', borderRadius: '16px', overflow: 'hidden' }}>
      <ReadingContainer>
        <MarkdownRenderer content={doc.content} />
      </ReadingContainer>
    </article>
  );
}
