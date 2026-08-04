'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { BASE_PATH } from '@/lib/config';
import { hrefForSlug } from '@/lib/slug';
import styles from './SearchBar.module.css';

interface SearchEntry {
  title: string;
  slug: string[];
  book?: string;
  type?: string;
  /** Plain, lowercased document text (see scripts/generate-static-data.mjs) */
  text: string;
}

interface SearchResult {
  entry: SearchEntry;
  occurrences: number;
  score: number;
}

// The index weighs a few MB, so it is fetched lazily on first focus and
// cached at module level for the lifetime of the page.
let indexPromise: Promise<SearchEntry[]> | null = null;

function loadSearchIndex(): Promise<SearchEntry[]> {
  if (!indexPromise) {
    indexPromise = fetch(`${BASE_PATH}/search-index.json`)
      .then(res => (res.ok ? res.json() : []))
      .catch(() => []);
  }
  return indexPromise;
}

function countOccurrences(haystack: string, needle: string): number {
  let count = 0;
  let pos = haystack.indexOf(needle);
  while (pos !== -1) {
    count++;
    pos = haystack.indexOf(needle, pos + needle.length);
  }
  return count;
}

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [dismissed, setDismissed] = useState(false);
  const [rawSelectedIndex, setRawSelectedIndex] = useState(-1);
  const [allEntries, setAllEntries] = useState<SearchEntry[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const ensureIndex = () => {
    if (allEntries || isLoading) return;
    setIsLoading(true);
    loadSearchIndex().then(data => {
      setAllEntries(data);
      setIsLoading(false);
    });
  };

  // Debounce the query so we don't scan the whole index on every keystroke
  useEffect(() => {
    const handle = setTimeout(() => setDebouncedQuery(query), 150);
    return () => clearTimeout(handle);
  }, [query]);

  const results = useMemo<SearchResult[]>(() => {
    const q = debouncedQuery.trim().toLowerCase();
    if (q.length < 2 || !allEntries) return [];

    const matches: SearchResult[] = [];
    for (const entry of allEntries) {
      const inTitle = entry.title.toLowerCase().includes(q);
      const occurrences = entry.text ? countOccurrences(entry.text, q) : 0;

      if (inTitle || occurrences > 0) {
        matches.push({
          entry,
          occurrences,
          // Heavy weight for title matches, keep raw count for display
          score: occurrences + (inTitle ? 100 : 0),
        });
      }
    }

    matches.sort((a, b) => b.score - a.score);
    return matches.slice(0, 15);
  }, [debouncedQuery, allEntries]);

  // Derived UI state: the dropdown is open whenever there are results and the
  // user hasn't dismissed it; the selection is clamped to the result count.
  const isOpen = !dismissed && results.length > 0;
  const selectedIndex = Math.min(rawSelectedIndex, results.length - 1);

  const navigateTo = (result: SearchResult) => {
    router.push(hrefForSlug(result.entry.slug));
    setQuery('');
    setDismissed(true);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setRawSelectedIndex(Math.min(selectedIndex + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setRawSelectedIndex(Math.max(selectedIndex - 1, -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      navigateTo(results[selectedIndex]);
    } else if (e.key === 'Escape') {
      setDismissed(true);
      inputRef.current?.blur();
    }
  };

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && resultsRef.current) {
      const items = resultsRef.current.querySelectorAll(`.${styles.resultItem}`);
      items[selectedIndex]?.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  return (
    <div className={styles.searchContainer}>
      <div className={styles.inputWrapper}>
        <span className={styles.searchIcon} aria-hidden="true">🔍</span>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search texts..."
          value={query}
          onChange={e => {
            setQuery(e.target.value);
            setDismissed(false);
            setRawSelectedIndex(-1);
          }}
          onFocus={() => {
            ensureIndex();
            setDismissed(false);
          }}
          onBlur={() => setTimeout(() => setDismissed(true), 200)}
          onKeyDown={handleKeyDown}
          className={styles.searchInput}
          role="combobox"
          aria-expanded={isOpen}
          aria-controls="search-results-listbox"
          aria-autocomplete="list"
          aria-activedescendant={selectedIndex >= 0 ? `search-result-${selectedIndex}` : undefined}
          aria-label="Search texts"
        />
        {query && (
          <button
            className={styles.clearButton}
            onClick={() => { setQuery(''); setDismissed(true); }}
            tabIndex={-1}
            aria-label="Clear search"
          >
            <span aria-hidden="true">✕</span>
          </button>
        )}
      </div>
      {isOpen && (
        <div
          className={styles.resultsDropdown}
          ref={resultsRef}
          id="search-results-listbox"
          role="listbox"
          aria-label="Search results"
        >
          {results.map((res, i) => (
            <div
              key={res.entry.slug.join('/')}
              id={`search-result-${i}`}
              role="option"
              aria-selected={i === selectedIndex}
              className={`${styles.resultItem} ${i === selectedIndex ? styles.resultItemActive : ''}`}
              onMouseDown={() => navigateTo(res)}
              onMouseEnter={() => setRawSelectedIndex(i)}
            >
              <div className={styles.resultTitleRow}>
                <span className={styles.resultTitle}>{res.entry.title}</span>
                {res.occurrences > 0 && (
                  <span className={styles.occurrenceBadge}>
                    {res.occurrences} {res.occurrences === 1 ? 'match' : 'matches'}
                  </span>
                )}
              </div>
              {res.entry.book && (
                <span className={styles.resultMeta}>{res.entry.book}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
