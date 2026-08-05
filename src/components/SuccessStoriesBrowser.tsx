'use client';

import { useMemo, useState } from 'react';
import stories from '@/data/successStories.json';
import styles from './SuccessStoriesBrowser.module.css';

interface Story {
  id: string;
  title: string;
  url: string;
  score: number;
  comments: number;
  year: number;
  category: string;
  techniques: string[];
  timeframe: string | null;
  timeBucket: string | null;
}

const ALL_STORIES = stories as Story[];

const CATEGORY_LABELS: Record<string, string> = {
  'sp-love': 'Love & SP',
  'money': 'Money',
  'job-career': 'Job & Career',
  'health': 'Health',
  'education': 'Exams & Study',
  'home-life': 'Home & Life',
  'appearance': 'Appearance',
  'other': 'Other',
};

const CATEGORY_ORDER = ['sp-love', 'money', 'job-career', 'health', 'education', 'home-life', 'appearance', 'other'];

const TIME_LABELS: Record<string, string> = {
  days: 'Within days',
  weeks: 'Weeks',
  months: 'Months',
  years: 'A year or more',
};

const PAGE_SIZE = 30;

export default function SuccessStoriesBrowser() {
  const [category, setCategory] = useState<string>('all');
  const [technique, setTechnique] = useState<string>('all');
  const [timeBucket, setTimeBucket] = useState<string>('all');
  const [sort, setSort] = useState<'top' | 'new'>('top');
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const allTechniques = useMemo(() => {
    const set = new Set<string>();
    for (const s of ALL_STORIES) s.techniques.forEach(t => set.add(t));
    return [...set].sort();
  }, []);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const s of ALL_STORIES) counts[s.category] = (counts[s.category] ?? 0) + 1;
    return counts;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = ALL_STORIES.filter(s => {
      if (category !== 'all' && s.category !== category) return false;
      if (technique !== 'all' && !s.techniques.includes(technique)) return false;
      if (timeBucket !== 'all' && s.timeBucket !== timeBucket) return false;
      if (q && !s.title.toLowerCase().includes(q)) return false;
      return true;
    });
    result.sort((a, b) => (sort === 'top' ? b.score - a.score : b.year - a.year || b.score - a.score));
    return result;
  }, [category, technique, timeBucket, sort, query]);

  const applyFilter = (setter: (v: string) => void) => (value: string) => {
    setter(value);
    setVisibleCount(PAGE_SIZE);
  };

  const setCat = applyFilter(setCategory);
  const visible = filtered.slice(0, visibleCount);

  return (
    <div>
      {/* Category tabs */}
      <div className={styles.tabs} role="tablist" aria-label="Story categories">
        <button
          role="tab"
          aria-selected={category === 'all'}
          className={`${styles.tab} ${category === 'all' ? styles.tabActive : ''}`}
          onClick={() => setCat('all')}
        >
          All <span className={styles.count}>{ALL_STORIES.length}</span>
        </button>
        {CATEGORY_ORDER.map(cat => (
          <button
            key={cat}
            role="tab"
            aria-selected={category === cat}
            className={`${styles.tab} ${category === cat ? styles.tabActive : ''}`}
            onClick={() => setCat(cat)}
          >
            {CATEGORY_LABELS[cat]} <span className={styles.count}>{categoryCounts[cat] ?? 0}</span>
          </button>
        ))}
      </div>

      {/* Secondary filters */}
      <div className={styles.filters}>
        <input
          type="search"
          value={query}
          onChange={e => { setQuery(e.target.value); setVisibleCount(PAGE_SIZE); }}
          placeholder="Filter by title…"
          className={styles.search}
          aria-label="Filter stories by title"
        />
        <select
          value={technique}
          onChange={e => { setTechnique(e.target.value); setVisibleCount(PAGE_SIZE); }}
          className={styles.select}
          aria-label="Filter by technique"
        >
          <option value="all">Any technique</option>
          {allTechniques.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <select
          value={timeBucket}
          onChange={e => { setTimeBucket(e.target.value); setVisibleCount(PAGE_SIZE); }}
          className={styles.select}
          aria-label="Filter by time taken"
        >
          <option value="all">Any timeframe</option>
          {Object.entries(TIME_LABELS).map(([k, label]) => (
            <option key={k} value={k}>{label}</option>
          ))}
        </select>
        <select
          value={sort}
          onChange={e => setSort(e.target.value as 'top' | 'new')}
          className={styles.select}
          aria-label="Sort stories"
        >
          <option value="top">Most upvoted</option>
          <option value="new">Newest first</option>
        </select>
      </div>

      <p className={styles.summary} aria-live="polite">
        {filtered.length} {filtered.length === 1 ? 'story' : 'stories'}
        {category !== 'all' ? ` in ${CATEGORY_LABELS[category]}` : ''}
      </p>

      {/* Story cards */}
      <ul className={styles.list}>
        {visible.map(story => (
          <li key={story.id} className={styles.card}>
            <a href={story.url} target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
              <span className={styles.cardTitle}>
                {story.title} <span className={styles.ext} aria-hidden="true">↗</span>
              </span>
            </a>
            <div className={styles.meta}>
              <span className={styles.badge}>{CATEGORY_LABELS[story.category]}</span>
              {story.timeframe && <span className={`${styles.badge} ${styles.timeBadge}`}>⏱ {story.timeframe}</span>}
              {story.techniques.map(t => (
                <span key={t} className={`${styles.badge} ${styles.techBadge}`}>{t}</span>
              ))}
              <span className={styles.stats}>
                ▲ {story.score.toLocaleString()} · {story.comments.toLocaleString()} comments · {story.year}
              </span>
            </div>
          </li>
        ))}
      </ul>

      {filtered.length > visibleCount && (
        <button className={styles.loadMore} onClick={() => setVisibleCount(c => c + PAGE_SIZE)}>
          Show more stories ({filtered.length - visibleCount} remaining)
        </button>
      )}
    </div>
  );
}
