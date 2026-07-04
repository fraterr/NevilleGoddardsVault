'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import metadata from '@/data/metadata.json';
import styles from './KeywordsBrowser.module.css';

interface DocEntry {
  title: string;
  slug: string[];
  book: string | null;
  chapter: string | null;
  type: string;
  bible_ref: string[];
  tags: string[];
  topics: string[];
  keywords: string[];
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export default function KeywordsBrowser() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);

  // 1. Process metadata to count keyword frequencies and map documents
  const { keywordsMap, sortedKeywords, maxFreq, minFreq } = useMemo(() => {
    const map: Record<string, DocEntry[]> = {};
    
    (metadata as DocEntry[]).forEach(doc => {
      if (doc.keywords && Array.isArray(doc.keywords)) {
        doc.keywords.forEach(kw => {
          const cleanKw = kw.trim();
          if (cleanKw) {
            // Standardize case for mapping (store actual casing but group together)
            if (!map[cleanKw]) {
              map[cleanKw] = [];
            }
            if (!map[cleanKw].some(d => d.title === doc.title)) {
              map[cleanKw].push(doc);
            }
          }
        });
      }
    });

    const list = Object.keys(map).sort((a, b) => a.localeCompare(b));
    
    let max = 1;
    let min = 1;
    if (list.length > 0) {
      const counts = list.map(k => map[k].length);
      max = Math.max(...counts);
      min = Math.min(...counts);
    }

    return { keywordsMap: map, sortedKeywords: list, maxFreq: max, minFreq: min };
  }, []);

  // 2. Filter keywords by search query
  const filteredKeywords = useMemo(() => {
    if (!searchQuery.trim()) return sortedKeywords;
    const query = searchQuery.toLowerCase();
    return sortedKeywords.filter(kw => kw.toLowerCase().includes(query));
  }, [sortedKeywords, searchQuery]);

  // Helper to calculate tag cloud font size
  const getTagSize = (freq: number) => {
    if (maxFreq === minFreq) return '1rem';
    // Map frequency range linearly to rem sizes between 0.85rem and 1.8rem
    const minSize = 0.85;
    const maxSize = 1.8;
    const size = minSize + ((freq - minFreq) / (maxFreq - minFreq)) * (maxSize - minSize);
    return `${size}rem`;
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'book':
      case 'book_chapter':
        return <span className={`${styles.badge} ${styles.badgeBook}`}>Book</span>;
      case 'lecture':
        return <span className={`${styles.badge} ${styles.badgeLecture}`}>Lecture</span>;
      case 'radio_lecture':
        return <span className={`${styles.badge} ${styles.badgeRadio}`}>Radio Broadcast</span>;
      default:
        return <span className={`${styles.badge} ${styles.badgeOther}`}>Text</span>;
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Keyword Index</h1>
        <p className={styles.subtitle}>
          Explore the Neville Goddard Vault through a visual keyword cloud and filter documents.
        </p>
      </header>

      {/* Search Input */}
      <div className={styles.searchWrapper}>
        <div className={styles.searchBar}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search keywords (e.g. Assumption, Meditation, Belief...)"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              // Clear selected keyword if searching to refresh view
              setSelectedKeyword(null);
            }}
          />
          {searchQuery && (
            <button className={styles.clearButton} onClick={() => {
              setSearchQuery('');
              setSelectedKeyword(null);
            }}>
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Keywords Tag Cloud */}
      <div className={styles.cloudCard}>
        <h2 className={styles.cardTitle}>Keyword Cloud</h2>
        {filteredKeywords.length === 0 ? (
          <p className={styles.noKeywords}>No keywords match your search.</p>
        ) : (
          <div className={styles.cloudGrid}>
            {filteredKeywords.map(kw => {
              const freq = keywordsMap[kw].length;
              const isSelected = selectedKeyword === kw;
              const fontSize = getTagSize(freq);

              return (
                <button
                  key={kw}
                  onClick={() => setSelectedKeyword(isSelected ? null : kw)}
                  className={`${styles.tagButton} ${isSelected ? styles.tagButtonActive : ''}`}
                  style={{ fontSize }}
                  title={`${freq} ${freq === 1 ? 'document' : 'documents'}`}
                >
                  {kw}
                  <span className={styles.tagCount}>{freq}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Document References List */}
      {selectedKeyword && keywordsMap[selectedKeyword] && (
        <section className={styles.resultsSection}>
          <div className={styles.resultsHeader}>
            <h2 className={styles.resultsTitle}>
              Documents Tagged with: <span className={styles.keywordHighlight}>{selectedKeyword}</span>
            </h2>
            <button className={styles.closeResults} onClick={() => setSelectedKeyword(null)}>
              Clear Filter
            </button>
          </div>

          <ul className={styles.docList}>
            {keywordsMap[selectedKeyword].map(doc => {
              const slugPath = doc.slug.map(slugify).join('/');
              const href = slugPath === 'index' ? '/' : `/${slugPath}`;

              return (
                <li key={doc.title} className={styles.docItem}>
                  <Link href={href} className={styles.docLink}>
                    <div className={styles.docDetails}>
                      <span className={styles.docTitle}>{doc.title}</span>
                      {doc.book && doc.chapter && (
                        <span className={styles.docContext}>
                          In {doc.book}
                        </span>
                      )}
                    </div>
                    {getTypeBadge(doc.type)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
}
