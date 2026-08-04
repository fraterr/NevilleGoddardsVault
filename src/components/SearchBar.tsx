'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { hrefForSlug } from '@/lib/slug';
import { loadSearchIndex, searchEntries, SearchEntry, SearchMatch } from '@/lib/searchClient';
import styles from './SearchBar.module.css';

const MAX_DROPDOWN_RESULTS = 12;

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

  const { results, totalMatches } = useMemo(() => {
    if (!allEntries) return { results: [] as SearchMatch[], totalMatches: 0 };
    const all = searchEntries(allEntries, debouncedQuery);
    return { results: all.slice(0, MAX_DROPDOWN_RESULTS), totalMatches: all.length };
  }, [debouncedQuery, allEntries]);

  // Derived UI state: the dropdown is open whenever there are results and the
  // user hasn't dismissed it; the selection is clamped to the result count.
  const isOpen = !dismissed && results.length > 0;
  const selectedIndex = Math.min(rawSelectedIndex, results.length - 1);

  const goToAllResults = () => {
    if (query.trim().length < 2) return;
    router.push(`/search/results?q=${encodeURIComponent(query.trim())}`);
    setDismissed(true);
    inputRef.current?.blur();
  };

  const navigateTo = (result: SearchMatch) => {
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
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0) {
        navigateTo(results[selectedIndex]);
      } else {
        goToAllResults();
      }
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
          <div
            className={styles.allResultsRow}
            role="option"
            aria-selected={false}
            onMouseDown={goToAllResults}
          >
            See all {totalMatches} {totalMatches === 1 ? 'result' : 'results'} with excerpts ↵
          </div>
        </div>
      )}
    </div>
  );
}
