'use client';

import { useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { START_HERE_WEEKS, START_HERE_TOTAL_DAYS } from '@/data/startHere';
import styles from './StartHerePath.module.css';

// true after hydration on the client, false during prerender — lets us render
// progress-dependent UI without a server/client HTML mismatch.
const noopSubscribe = () => () => {};
function useHydrated(): boolean {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}

const STORAGE_KEY = 'ngv-start-here-progress';

function loadProgress(): number[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed.filter(n => typeof n === 'number');
  } catch {
    // corrupted or unavailable storage: start fresh
  }
  return [];
}

export default function StartHerePath() {
  const hydrated = useHydrated();
  const [stored, setCompleted] = useState<number[]>(() =>
    typeof window === 'undefined' ? [] : loadProgress()
  );
  // Until hydration completes, render as if nothing were checked so the HTML
  // matches the prerendered page; the real progress appears immediately after.
  const completed = hydrated ? stored : [];

  const toggleDay = (day: number) => {
    setCompleted(prev => {
      const next = prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // storage full or unavailable: keep in-memory state
      }
      return next;
    });
  };

  const resetProgress = () => {
    setCompleted([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const done = completed.length;
  const pct = Math.round((done / START_HERE_TOTAL_DAYS) * 100);
  const nextDay = (() => {
    for (const week of START_HERE_WEEKS) {
      for (const d of week.days) {
        if (!completed.includes(d.day)) return d.day;
      }
    }
    return null;
  })();

  return (
    <div>
      {/* Progress header */}
      <div className={styles.progressHeader} suppressHydrationWarning>
        <div className={styles.progressTrack} role="progressbar" aria-valuenow={done} aria-valuemin={0} aria-valuemax={START_HERE_TOTAL_DAYS} aria-label="Path progress">
          <div className={styles.progressFill} style={{ width: `${pct}%` }} />
        </div>
        <div className={styles.progressMeta}>
          <span>
            {hydrated && done > 0
              ? done >= START_HERE_TOTAL_DAYS
                ? 'Path complete — now it’s a practice.'
                : `${done} of ${START_HERE_TOTAL_DAYS} days completed`
              : `${START_HERE_TOTAL_DAYS} days`}
          </span>
          {hydrated && done > 0 && (
            <button onClick={resetProgress} className={styles.resetButton}>
              Reset progress
            </button>
          )}
        </div>
      </div>

      {START_HERE_WEEKS.map(week => (
        <section key={week.title} className={styles.week}>
          <h2 className={styles.weekTitle}>{week.title}</h2>
          <p className={styles.weekSubtitle}>{week.subtitle}</p>

          <ol className={styles.dayList}>
            {week.days.map(d => {
              const isDone = completed.includes(d.day);
              const isNext = hydrated && d.day === nextDay;
              return (
                <li
                  key={d.day}
                  className={`${styles.day} ${isDone ? styles.dayDone : ''} ${isNext ? styles.dayNext : ''}`}
                  suppressHydrationWarning
                >
                  <button
                    className={styles.dayCheck}
                    onClick={() => toggleDay(d.day)}
                    aria-pressed={isDone}
                    aria-label={`Mark day ${d.day} as ${isDone ? 'not completed' : 'completed'}`}
                    suppressHydrationWarning
                  >
                    {isDone ? '✓' : d.day}
                  </button>
                  <div className={styles.dayBody}>
                    <div className={styles.dayTitle}>
                      {d.title}
                      {isNext && <span className={styles.nextBadge}>up next</span>}
                    </div>
                    <div className={styles.dayReading}>
                      <span className={styles.dayLabel}>Read:</span>{' '}
                      <Link href={d.reading.href}>{d.reading.title}</Link>
                    </div>
                    <div className={styles.dayPractice}>
                      <span className={styles.dayLabel}>Practice:</span> {d.practice}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
      ))}
    </div>
  );
}
