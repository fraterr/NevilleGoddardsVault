'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import metadata from '@/data/metadata.json';
import { slugify } from '@/lib/slug';
import styles from './GlossaryBrowser.module.css';

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

interface GlossaryTerm {
  name: string;
  definition: string;
  references: DocEntry[];
}

interface GlossaryBrowserProps {
  content: string;
}

export default function GlossaryBrowser({ content }: GlossaryBrowserProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTerms, setExpandedTerms] = useState<Record<string, boolean>>({});
  const [highlightedTerm, setHighlightedTerm] = useState<string | null>(null);

  // 1. Parse Glossary markdown content and match references from metadata
  const { glossaryTerms, alphabet } = useMemo(() => {
    const terms: GlossaryTerm[] = [];
    
    // Parse markdown sections: split by '## '
    const sections = content.split(/\n## /);
    
    sections.forEach((sec, idx) => {
      if (idx === 0) return; // Skip the initial title/intro before the first ##

      const lines = sec.split('\n');
      const termName = lines[0].trim();
      
      // Reassemble the definition lines, filtering out empty ones or dividers
      const definitionLines = lines.slice(1).filter(line => {
        const clean = line.trim();
        return clean !== '---' && clean !== '';
      });
      const termDefinition = definitionLines.join('\n\n').trim();

      if (termName && termDefinition) {
        // Find associated documents in metadata by checking keywords
        const termLower = termName.toLowerCase();
        const docReferences = (metadata as DocEntry[]).filter(doc => {
          if (doc.keywords && Array.isArray(doc.keywords)) {
            return doc.keywords.some(kw => kw.toLowerCase() === termLower);
          }
          return false;
        });

        terms.push({
          name: termName,
          definition: termDefinition,
          references: docReferences
        });
      }
    });

    // Sort terms alphabetically
    terms.sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }));

    // Extract first letters for quick jump nav
    const alpha = Array.from(new Set(terms.map(t => t.name.charAt(0).toUpperCase())))
      .filter(char => /[A-Z0-9]/.test(char))
      .sort();

    return { glossaryTerms: terms, alphabet: alpha };
  }, [content]);

  // Handle scrolling to and highlighting a term when URL hash changes or on initial mount
  React.useEffect(() => {
    const handleHashChange = () => {
      let hash = window.location.hash.slice(1).toLowerCase().trim();
      if (!hash) return;

      // Robust fallback if the URL still ends up with duplicate hashes like #state#state
      if (hash.includes('#')) {
        hash = hash.split('#')[0];
      }

      const matchedTerm = glossaryTerms.find(t => slugify(t.name) === hash);
      if (matchedTerm) {
        // Expand its documents
        setExpandedTerms(prev => ({
          ...prev,
          [matchedTerm.name]: true
        }));
        
        // Highlight it
        setHighlightedTerm(matchedTerm.name);

        // Scroll to it
        setTimeout(() => {
          const el = document.getElementById(`term-card-${hash}`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 150);
      }
    };

    if (glossaryTerms.length > 0) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [glossaryTerms]);

  // 2. Filter terms by search query
  const filteredTerms = useMemo(() => {
    if (!searchQuery.trim()) return glossaryTerms;
    const query = searchQuery.toLowerCase();

    return glossaryTerms.filter(term => 
      term.name.toLowerCase().includes(query) || 
      term.definition.toLowerCase().includes(query)
    );
  }, [glossaryTerms, searchQuery]);

  // Group terms by letter
  const groupedTerms = useMemo(() => {
    const groups: Record<string, GlossaryTerm[]> = {};
    filteredTerms.forEach(term => {
      const firstLetter = term.name.charAt(0).toUpperCase();
      const groupKey = /[A-Z0-9]/.test(firstLetter) ? firstLetter : '#';
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(term);
    });
    return groups;
  }, [filteredTerms]);

  const toggleTerm = (termName: string) => {
    setExpandedTerms(prev => ({
      ...prev,
      [termName]: !prev[termName]
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
        <h1 className={styles.title}>Glossary of Terms</h1>
        <p className={styles.subtitle}>
          Explore the metaphysical concepts and terminology core to the teachings of Neville Goddard.
        </p>
      </header>

      {/* Search Input */}
      <div className={styles.searchWrapper}>
        <div className={styles.searchBar}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search glossary terms or definitions (e.g. SATS, Revision...)"
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

      {/* A-Z Index Links */}
      {!searchQuery && alphabet.length > 0 && (
        <nav className={styles.alphaNav}>
          {alphabet.map(letter => (
            <a key={letter} href={`#term-${letter}`} className={styles.alphaLink}>
              {letter}
            </a>
          ))}
        </nav>
      )}

      {/* Glossary list */}
      <div className={styles.listContainer}>
        {filteredTerms.length === 0 ? (
          <div className={styles.noResults}>
            <p>No glossary terms found matching &quot;{searchQuery}&quot;</p>
            <button className={styles.resetButton} onClick={() => setSearchQuery('')}>
              Reset Filter
            </button>
          </div>
        ) : (
          Object.keys(groupedTerms)
            .sort()
            .map(letter => (
              <section key={letter} id={`term-${letter}`} className={styles.letterSection}>
                {!searchQuery && <h2 className={styles.letterHeader}>{letter}</h2>}
                <div className={styles.termsGrid}>
                  {groupedTerms[letter].map(term => {
                    const isExpanded = !!expandedTerms[term.name];
                    const isHighlighted = highlightedTerm === term.name;
                    const cardId = `term-card-${slugify(term.name)}`;

                    return (
                      <div 
                        key={term.name} 
                        id={cardId}
                        className={`${styles.termCard} ${isExpanded ? styles.termCardExpanded : ''} ${isHighlighted ? styles.termCardHighlighted : ''}`}
                        onClick={() => {
                          if (isHighlighted) {
                            setHighlightedTerm(null);
                          }
                        }}
                      >
                        <div className={styles.termMain}>
                          <h3 className={styles.termName}>{term.name}</h3>
                          <div className={styles.termDefinition}>
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{term.definition}</ReactMarkdown>
                          </div>
                        </div>

                        {term.references.length > 0 && (
                          <div className={styles.referencesWrapper}>
                            <button
                              className={styles.refTrigger}
                              onClick={() => toggleTerm(term.name)}
                              aria-expanded={isExpanded}
                            >
                              <span className={styles.refTriggerText}>
                                {isExpanded ? 'Hide' : 'Show'} {term.references.length} Related {term.references.length === 1 ? 'Document' : 'Documents'}
                              </span>
                              <span className={`${styles.chevron} ${isExpanded ? styles.chevronOpen : ''}`}>
                                ▼
                              </span>
                            </button>

                            {isExpanded && (
                              <div className={styles.referencesContent}>
                                <ul className={styles.docList}>
                                  {term.references.map(doc => {
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
