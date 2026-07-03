import { getDocumentBySlug } from '@/lib/markdown';
import MarkdownRenderer from '@/components/MarkdownRenderer';

export default function Home() {
  const indexDoc = getDocumentBySlug(['index']);
  
  if (!indexDoc) {
    return (
      <div className="glass" style={{ padding: '2rem', borderRadius: '12px' }}>
        <h1>Welcome to Neville Goddard's Vault</h1>
        <p>Could not find the Index.md file. Please make sure it exists in the vault.</p>
      </div>
    );
  }

  return (
    <article className="glass animate-fade-in" style={{ padding: '3rem', borderRadius: '16px', overflow: 'hidden' }}>
      <div style={{ 
        margin: '-3rem -3rem 2rem -3rem', 
        position: 'relative', 
        height: '200px',
        overflow: 'hidden'
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/NevilleGoddardsVault/images/banners/banner-index.png`}
          alt="Page banner"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
      </div>
      <MarkdownRenderer content={indexDoc.content} />
    </article>
  );
}

