import { getDocumentBySlug } from '@/lib/markdown';
import MarkdownRenderer from '@/components/MarkdownRenderer';

export default function Home() {
  const indexDoc = getDocumentBySlug(['Index']);
  
  if (!indexDoc) {
    return (
      <div className="glass" style={{ padding: '2rem', borderRadius: '12px' }}>
        <h1>Welcome to Neville Goddard's Vault</h1>
        <p>Could not find the Index.md file. Please make sure it exists in the vault.</p>
      </div>
    );
  }

  return (
    <article className="glass" style={{ padding: '3rem', borderRadius: '16px', borderTop: '4px solid var(--accent-gold)' }}>
      <MarkdownRenderer content={indexDoc.content} />
    </article>
  );
}
