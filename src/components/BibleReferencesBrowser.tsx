'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import metadata from '@/data/metadata.json';
import { slugify } from '@/lib/slug';
import styles from './BibleReferencesBrowser.module.css';

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

interface BibleRefOccurrence {
  verse: string;
  doc: DocEntry;
}

interface BookGroup {
  name: string;
  chapters: Record<number, BibleRefOccurrence[]>;
}

// Regex to parse Bible references: e.g. "1 Corinthians 15:47", "John 3:16", "Genesis 1:1-3"
const BIBLE_REF_REGEX = /^(\d?\s*[A-Za-z\s]+)\s+(\d+):(\d+[-–]?\d*)/;

export default function BibleReferencesBrowser() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedBooks, setExpandedBooks] = useState<Record<string, boolean>>({});

  // 1. Process metadata to group by Bible Book and Chapter
  const { bibleData, allBooks } = useMemo(() => {
    const booksMap: Record<string, BookGroup> = {};

    (metadata as DocEntry[]).forEach(doc => {
      if (doc.bible_ref && Array.isArray(doc.bible_ref)) {
        doc.bible_ref.forEach(ref => {
          const match = ref.match(BIBLE_REF_REGEX);
          let bookName = 'Other';
          let chapterNum = 1;
          let verseNum = ref;

          if (match) {
            bookName = match[1].trim();
            chapterNum = parseInt(match[2], 10);
            verseNum = match[3];
          } else {
            // Fallback for custom or unparsed strings
            const parts = ref.split(' ');
            if (parts.length > 1) {
              const lastPart = parts[parts.length - 1];
              if (lastPart.includes(':')) {
                bookName = parts.slice(0, -1).join(' ').trim();
                const vParts = lastPart.split(':');
                chapterNum = parseInt(vParts[0], 10) || 1;
                verseNum = vParts[1];
              }
            }
          }

          if (!booksMap[bookName]) {
            booksMap[bookName] = {
              name: bookName,
              chapters: {}
            };
          }

          if (!booksMap[bookName].chapters[chapterNum]) {
            booksMap[bookName].chapters[chapterNum] = [];
          }

          // Avoid duplicate document links for the exact same verse in a chapter
          const alreadyExists = booksMap[bookName].chapters[chapterNum].some(
            occ => occ.verse === verseNum && occ.doc.title === doc.title
          );

          if (!alreadyExists) {
            booksMap[bookName].chapters[chapterNum].push({
              verse: verseNum,
              doc
            });
          }
        });
      }
    });

    // Sort verses inside each chapter
    Object.keys(booksMap).forEach(bName => {
      const book = booksMap[bName];
      Object.keys(book.chapters).forEach(ch => {
        const chNum = parseInt(ch, 10);
        book.chapters[chNum].sort((a, b) => {
          const aV = parseInt(a.verse.split('-')[0], 10) || 0;
          const bV = parseInt(b.verse.split('-')[0], 10) || 0;
          return aV - bV;
        });
      });
    });

    const sortedBooks = Object.keys(booksMap).sort((a, b) => a.localeCompare(b));
    return { bibleData: booksMap, allBooks: sortedBooks };
  }, []);

  // 2. Filter data based on search query
  const filteredBooks = useMemo(() => {
    if (!searchQuery.trim()) return allBooks;
    const query = searchQuery.toLowerCase();

    return allBooks.filter(bookName => {
      // Check if book name matches
      if (bookName.toLowerCase().includes(query)) return true;

      // Check if any verse or document in this book matches
      const book = bibleData[bookName];
      return Object.keys(book.chapters).some(ch => {
        const occurrences = book.chapters[parseInt(ch, 10)];
        return occurrences.some(occ => 
          occ.verse.includes(query) || 
          occ.doc.title.toLowerCase().includes(query)
        );
      });
    });
  }, [allBooks, bibleData, searchQuery]);

  const toggleBook = (bookName: string) => {
    setExpandedBooks(prev => ({
      ...prev,
      [bookName]: !prev[bookName]
    }));
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
        <h1 className={styles.title}>Bible References Index</h1>
        <p className={styles.subtitle}>
          Browse all scripture passages referenced, quoted, and revised in Neville Goddard&apos;s teachings.
        </p>
      </header>

      {/* Search Field */}
      <div className={styles.searchWrapper}>
        <div className={styles.searchBar}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search books, verses or text (e.g. Genesis, John 3:16...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className={styles.clearButton} onClick={() => setSearchQuery('')}>
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Quick navigation alphabet jump links */}
      {!searchQuery && allBooks.length > 0 && (
        <nav className={styles.bookNav}>
          {allBooks.map(bookName => (
            <a key={bookName} href={`#book-${slugify(bookName)}`} className={styles.bookNavLink}>
              {bookName}
            </a>
          ))}
        </nav>
      )}

      {/* Results grid list */}
      <div className={styles.listContainer}>
        {filteredBooks.length === 0 ? (
          <div className={styles.noResults}>
            <p>No Bible references found matching &quot;{searchQuery}&quot;</p>
            <button className={styles.resetButton} onClick={() => setSearchQuery('')}>
              Clear Search
            </button>
          </div>
        ) : (
          filteredBooks.map(bookName => {
            const book = bibleData[bookName];
            const isExpanded = !!expandedBooks[bookName] || !!searchQuery;
            const bookId = `book-${slugify(bookName)}`;
            const sortedChapters = Object.keys(book.chapters)
              .map(Number)
              .sort((a, b) => a - b);

            return (
              <div 
                key={bookName} 
                id={bookId} 
                className={`${styles.bookCard} ${isExpanded ? styles.bookCardExpanded : ''}`}
              >
                <button 
                  className={styles.bookTrigger} 
                  onClick={() => toggleBook(bookName)}
                  aria-expanded={isExpanded}
                >
                  <div className={styles.bookHeaderInfo}>
                    <span className={styles.bookName}>{bookName}</span>
                    <span className={styles.chapterCount}>
                      {sortedChapters.length} {sortedChapters.length === 1 ? 'chapter' : 'chapters'} referenced
                    </span>
                  </div>
                  <span className={`${styles.chevron} ${isExpanded ? styles.chevronOpen : ''}`}>
                    ▼
                  </span>
                </button>

                {isExpanded && (
                  <div className={styles.bookContent}>
                    {sortedChapters.map(chapterNum => {
                      const occurrences = book.chapters[chapterNum];
                      return (
                        <div key={chapterNum} className={styles.chapterGroup}>
                          <h3 className={styles.chapterTitle}>Chapter {chapterNum}</h3>
                          <ul className={styles.occurrenceList}>
                            {occurrences.map((occ, idx) => {
                              const slugPath = occ.doc.slug.map(slugify).join('/');
                              const href = slugPath === 'index' ? '/' : `/${slugPath}#${slugify(`${bookName} ${chapterNum}:${occ.verse}`)}`;
                              
                              return (
                                <li key={idx} className={styles.occurrenceItem}>
                                  <Link href={href} className={styles.docLink}>
                                    <div className={styles.occurrenceDetails}>
                                      <span className={styles.verseLabel}>
                                        {bookName} {chapterNum}:{occ.verse}
                                      </span>
                                      <span className={styles.docTitle}>
                                        {occ.doc.title}
                                      </span>
                                    </div>
                                    {getTypeBadge(occ.doc.type)}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
