'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { hrefForSlug } from '@/lib/slug';
import {
  loadSearchIndex,
  searchEntries,
  extractSnippets,
  SearchEntry,
} from '@/lib/searchClient';
import styles from './SearchResults.module.css';

const PAGE_SIZE = 20;

export default function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlQuery = searchParams.get('q') ?? '';

  const [input, setInput] = useState(urlQuery);
  const [entries, setEntries] = useState<SearchEntry[] | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Keep the input in sync when the URL changes (back/forward, new search):
  // state adjustment during render, per the React docs pattern.
  const [prevUrlQuery, setPrevUrlQuery] = useState(urlQuery);
  if (prevUrlQuery !== urlQuery) {
    setPrevUrlQuery(urlQuery);
    setInput(urlQuery);
    setVisibleCount(PAGE_SIZE);
  }

  useEffect(() => {
    let cancelled = false;
    loadSearchIndex().then(data => {
      if (!cancelled) setEntries(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const results = useMemo(() => {
    if (!entries || urlQuery.trim().length < 2) return [];
    return searchEntries(entries, urlQuery);
  }, [entries, urlQuery]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = input.trim();
    if (q.length >= 2) {
      router.push(`/search/results?q=${encodeURIComponent(q)}`);
    }
  };

  const visible = results.slice(0, visibleCount);
  const isLoading = entries === null;

  return (
    <div>
      <h1 className={styles.title}>Search the Vault</h1>
      <p className={styles.subtitle}>
        Full-text search across every book and lecture. Ask what Neville said about anything.
      </p>

      <form onSubmit={submit} className={styles.form} role="search">
        <input
          type="search"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder='Try "revision", "faith", "imagination creates reality"…'
          className={styles.input}
          aria-label="Search query"
        />
        <button type="submit" className={styles.submit}>
          Search
        </button>
      </form>

      {urlQuery.trim().length >= 2 && (
        <p className={styles.summary} aria-live="polite">
          {isLoading
            ? 'Searching…'
            : results.length === 0
              ? <>No results for <strong>&ldquo;{urlQuery}&rdquo;</strong>. Try a shorter or different phrase.</>
              : <><strong>{results.length}</strong> {results.length === 1 ? 'document mentions' : 'documents mention'} <strong>&ldquo;{urlQuery}&rdquo;</strong></>}
        </p>
      )}

      <ol className={styles.resultList}>
        {visible.map(res => {
          const snippets = extractSnippets(res.entry, urlQuery);
          return (
            <li key={res.entry.slug.join('/')} className={styles.result}>
              <div className={styles.resultHeader}>
                <Link href={hrefForSlug(res.entry.slug)} className={styles.resultTitle}>
                  {res.entry.title}
                </Link>
                <span className={styles.resultMeta}>
                  {res.entry.book ? `${res.entry.book} · ` : ''}
                  {res.entry.type === 'lecture' ? 'Lecture' : res.entry.type === 'chapter' ? 'Chapter' : 'Document'}
                  {res.occurrences > 0 && ` · ${res.occurrences} ${res.occurrences === 1 ? 'match' : 'matches'}`}
                </span>
              </div>
              {snippets.map((s, i) => (
                <p key={i} className={styles.snippet}>
                  {s.before}
                  <mark className={styles.mark}>{s.match}</mark>
                  {s.after}
                </p>
              ))}
            </li>
          );
        })}
      </ol>

      {results.length > visibleCount && (
        <button
          className={styles.loadMore}
          onClick={() => setVisibleCount(c => c + PAGE_SIZE)}
        >
          Show more results ({results.length - visibleCount} remaining)
        </button>
      )}
    </div>
  );
}
