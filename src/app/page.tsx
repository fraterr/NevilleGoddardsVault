import { getDocumentBySlug } from '@/lib/markdown';
import { withBasePath } from '@/lib/config';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/lib/config';

export const metadata: Metadata = {
  title: { absolute: 'Neville Goddard: Books, Lectures & Practical Guides' },
  description: SITE_DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    title: 'Neville Goddard: Books, Lectures & Practical Guides',
    description: SITE_DESCRIPTION,
    url: `${SITE_URL}/`,
    siteName: SITE_NAME,
    type: 'website',
    images: [{ url: `${SITE_URL}/images/banners/banner-index.webp` }],
  },
};

export default function Home() {
  const indexDoc = getDocumentBySlug(['index']);

  if (!indexDoc) {
    return (
      <div className="glass" style={{ padding: '2rem', borderRadius: '12px' }}>
        <h1>Welcome to Neville Goddard&apos;s Vault</h1>
        <p>Could not find the Index.md file. Please make sure it exists in the vault.</p>
      </div>
    );
  }

  return (
    <article className="glass animate-fade-in" style={{ padding: '3rem', borderRadius: '16px', overflow: 'hidden' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`, name: SITE_NAME,
        alternateName: 'Neville Goddard Vault', url: `${SITE_URL}/`,
        description: SITE_DESCRIPTION, inLanguage: 'en',
      }) }} />
      <div style={{
        margin: '-3rem -3rem 2rem -3rem',
        position: 'relative',
        height: '200px',
        overflow: 'hidden'
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={withBasePath('/images/banners/banner-index.webp')}
          alt="Neville Goddard's Vault banner"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
      </div>
      <MarkdownRenderer content={indexDoc.content} />
    </article>
  );
}
