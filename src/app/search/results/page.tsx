import type { Metadata } from 'next';
import { Suspense } from 'react';
import SearchResults from '@/components/SearchResults';

export const metadata: Metadata = {
  title: 'Search the Vault',
  description: "Full-text search across all of Neville Goddard's books and lectures, with excerpts.",
  robots: { index: false },
};

export default function SearchResultsPage() {
  return (
    <article className="glass animate-fade-in" style={{ padding: '3rem', borderRadius: '16px', overflow: 'hidden' }}>
      <Suspense>
        <SearchResults />
      </Suspense>
    </article>
  );
}
