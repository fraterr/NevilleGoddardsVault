'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import metadata from '@/data/metadata.json';
import { slugify } from '@/lib/slug';
import styles from './TopicsBrowser.module.css';

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

export default function TopicsBrowser() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  // 1. Group documents by topic
  const { topicsMap, allTopics, popularTopics, alphabet } = useMemo(() => {
    const map: Record<string, DocEntry[]> = {};
    
    (metadata as DocEntry[]).forEach(doc => {
      if (doc.topics && Array.isArray(doc.topics)) {
        doc.topics.forEach(topic => {
          const cleanTopic = topic.trim();
          if (cleanTopic) {
            if (!map[cleanTopic]) {
              map[cleanTopic] = [];
            }
            // Avoid duplicate documents in the same topic
            if (!map[cleanTopic].some(d => d.title === doc.title)) {
              map[cleanTopic].push(doc);
            }
          }
        });
      }
    });

    const all = Object.keys(map).sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));

    // Popular topics: topics with at least 3 documents, sorted by frequency
    const popular = [...all]
      .filter(t => map[t].length >= 3)
      .sort((a, b) => map[b].length - map[a].length)
      .slice(0, 15);

    // Alphabet array for existing first letters
    const alpha = Array.from(new Set(all.map(t => t.charAt(0).toUpperCase())))
      .filter(char => /[A-Z0-9]/.test(char))
      .sort();

    return { topicsMap: map, allTopics: all, popularTopics: popular, alphabet: alpha };
  }, []);

  // 2. Filter topics based on search query
  const filteredTopics = useMemo(() => {
    if (!searchQuery.trim()) return allTopics;
    const query = searchQuery.toLowerCase();
    return allTopics.filter(topic => topic.toLowerCase().includes(query));
  }, [allTopics, searchQuery]);

  // Group filtered topics by starting letter
  const groupedTopics = useMemo(() => {
    const groups: Record<string, string[]> = {};
    filteredTopics.forEach(topic => {
      const firstLetter = topic.charAt(0).toUpperCase();
      const groupKey = /[A-Z0-9]/.test(firstLetter) ? firstLetter : '#';
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(topic);
    });
    return groups;
  }, [filteredTopics]);

  const toggleTopic = (topic: string) => {
    setExpandedTopics(prev => ({
      ...prev,
      [topic]: !prev[topic]
    }));
  };

  // Helper to format document type labels/badges
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
        <h1 className={styles.title}>Browse Vault by Topic</h1>
        <p className={styles.subtitle}>
          Explore Neville Goddard&apos;s teachings organized across {allTopics.length} distinct subjects.
        </p>
      </header>

      {/* Search Section */}
      <div className={styles.searchWrapper}>
        <div className={styles.searchBar}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search topics (e.g. Imagination, Faith, Consciousness...)"
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

      {/* Popular Themes Section */}
      {!searchQuery && popularTopics.length > 0 && (
        <section className={styles.popularSection}>
          <h2 className={styles.sectionTitle}>Popular Themes</h2>
          <div className={styles.popularGrid}>
            {popularTopics.map(topic => (
              <button
                key={topic}
                onClick={() => {
                  toggleTopic(topic);
                  const el = document.getElementById(`topic-${slugify(topic)}`);
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }}
                className={`${styles.popularCard} ${expandedTopics[topic] ? styles.popularCardActive : ''}`}
              >
                <span className={styles.popularName}>{topic}</span>
                <span className={styles.popularCount}>{topicsMap[topic].length} references</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* A-Z Jump Navigation */}
      {!searchQuery && (
        <nav className={styles.alphabetNav}>
          {alphabet.map(letter => (
            <a key={letter} href={`#letter-${letter}`} className={styles.alphaLink}>
              {letter}
            </a>
          ))}
        </nav>
      )}

      {/* Topics List */}
      <div className={styles.listContainer}>
        {filteredTopics.length === 0 ? (
          <div className={styles.noResults}>
            <p>No topics found matching &quot;{searchQuery}&quot;</p>
            <button className={styles.resetButton} onClick={() => setSearchQuery('')}>
              Show all topics
            </button>
          </div>
        ) : (
          Object.keys(groupedTopics)
            .sort()
            .map(letter => (
              <section key={letter} id={`letter-${letter}`} className={styles.letterSection}>
                {!searchQuery && <h2 className={styles.letterHeader}>{letter}</h2>}
                <div className={styles.topicsGrid}>
                  {groupedTopics[letter].map(topic => {
                    const docs = topicsMap[topic];
                    const isExpanded = !!expandedTopics[topic];
                    const topicId = `topic-${slugify(topic)}`;

                    return (
                      <div
                        key={topic}
                        id={topicId}
                        className={`${styles.topicCard} ${isExpanded ? styles.topicCardExpanded : ''}`}
                      >
                        <button
                          className={styles.topicTrigger}
                          onClick={() => toggleTopic(topic)}
                          aria-expanded={isExpanded}
                        >
                          <div className={styles.topicInfo}>
                            <span className={styles.topicName}>{topic}</span>
                            <span className={styles.docCount}>
                              {docs.length} {docs.length === 1 ? 'document' : 'documents'}
                            </span>
                          </div>
                          <span className={`${styles.chevron} ${isExpanded ? styles.chevronOpen : ''}`}>
                            ▼
                          </span>
                        </button>

                        {isExpanded && (
                          <div className={styles.topicContent}>
                            <ul className={styles.docList}>
                              {docs.map(doc => {
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
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            ))
        )}
      </div>
    </div>
  );
}
