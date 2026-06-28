'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from './SearchBar.module.css';

interface SearchEntry {
  title: string;
  slug: string[];
  book?: string;
  type?: string;
  content: string;
}

interface SearchResult {
  entry: SearchEntry;
  count: number;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [allEntries, setAllEntries] = useState<SearchEntry[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    // Load metadata for search index
    fetch('/NevilleGoddardsVault/search-index.json')
      .then(res => res.json())
      .then((data: SearchEntry[]) => setAllEntries(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const q = query.toLowerCase();
    const matches: SearchResult[] = [];

    for (const entry of allEntries) {
      // Find all matches in title
      const inTitle = entry.title.toLowerCase().includes(q);
      
      // Count occurrences in content
      let count = 0;
      if (entry.content) {
        let pos = entry.content.toLowerCase().indexOf(q);
        while (pos !== -1) {
          count++;
          pos = entry.content.toLowerCase().indexOf(q, pos + q.length);
        }
      }

      if (inTitle || count > 0) {
        matches.push({
          entry,
          count: count + (inTitle ? 5 : 0) // weight title matches
        });
      }
    }

    // Sort by occurrence count descending
    matches.sort((a, b) => b.count - a.count);

    const limited = matches.slice(0, 15);
    setResults(limited);
    setIsOpen(limited.length > 0);
    setSelectedIndex(-1);
  }, [query, allEntries]);

  const navigateTo = (result: SearchResult) => {
    const href = '/' + result.entry.slug.map(slugify).join('/');
    router.push(href);
    setQuery('');
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      navigateTo(results[selectedIndex]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
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
        <span className={styles.searchIcon}>🔍</span>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search texts..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => { if (results.length > 0) setIsOpen(true); }}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          onKeyDown={handleKeyDown}
          className={styles.searchInput}
        />
        {query && (
          <button 
            className={styles.clearButton} 
            onClick={() => { setQuery(''); setIsOpen(false); }}
            tabIndex={-1}
          >
            ✕
          </button>
        )}
      </div>
      {isOpen && (
        <div className={styles.resultsDropdown} ref={resultsRef}>
          {results.map((res, i) => (
            <div
              key={res.entry.slug.join('/')}
              className={`${styles.resultItem} ${i === selectedIndex ? styles.resultItemActive : ''}`}
              onMouseDown={() => navigateTo(res)}
              onMouseEnter={() => setSelectedIndex(i)}
            >
              <div className={styles.resultTitleRow}>
                <span className={styles.resultTitle}>{res.entry.title}</span>
                {res.count > 0 && (
                  <span className={styles.occurrenceBadge}>
                    {res.count} {res.count === 1 ? 'match' : 'matches'}
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
