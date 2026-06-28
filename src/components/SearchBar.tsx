'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from './SearchBar.module.css';

interface SearchEntry {
  title: string;
  slug: string[];
  book?: string;
  type?: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchEntry[]>([]);
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
    if (!query.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const q = query.toLowerCase();
    const filtered = allEntries.filter(entry => {
      const titleMatch = entry.title.toLowerCase().includes(q);
      const bookMatch = entry.book?.toLowerCase().includes(q);
      return titleMatch || bookMatch;
    }).slice(0, 12);

    setResults(filtered);
    setIsOpen(filtered.length > 0);
    setSelectedIndex(-1);
  }, [query, allEntries]);

  const navigateTo = (entry: SearchEntry) => {
    const href = '/' + entry.slug.map(slugify).join('/');
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
          {results.map((entry, i) => (
            <div
              key={entry.slug.join('/')}
              className={`${styles.resultItem} ${i === selectedIndex ? styles.resultItemActive : ''}`}
              onMouseDown={() => navigateTo(entry)}
              onMouseEnter={() => setSelectedIndex(i)}
            >
              <span className={styles.resultTitle}>{entry.title}</span>
              {entry.book && (
                <span className={styles.resultMeta}>{entry.book}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
