'use client';

import { useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { EXPERIMENTS, TEST_THE_LAW_TOTAL } from '@/data/testTheLaw';
import styles from './TestTheLawPath.module.css';

const STORAGE_KEY = 'ngv-test-the-law';

interface Progress {
  done: string[];
  notes: Record<string, string>;
}

const EMPTY: Progress = { done: [], notes: {} };

// true after hydration on the client, false during prerender — lets us render
// progress-dependent UI without a server/client HTML mismatch.
const noopSubscribe = () => () => {};
function useHydrated(): boolean {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}

function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw);
    return {
      done: Array.isArray(parsed.done) ? parsed.done.filter((x: unknown) => typeof x === 'string') : [],
      notes: parsed.notes && typeof parsed.notes === 'object' ? parsed.notes : {},
    };
  } catch {
    return EMPTY;
  }
}

function saveProgress(p: Progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {
    // storage unavailable: keep in-memory state
  }
}

export default function TestTheLawPath() {
  const hydrated = useHydrated();
  const [stored, setStored] = useState<Progress>(() =>
    typeof window === 'undefined' ? EMPTY : loadProgress()
  );
  const progress = hydrated ? stored : EMPTY;

  const update = (updater: (prev: Progress) => Progress) => {
    setStored(prev => {
      const next = updater(prev);
      saveProgress(next);
      return next;
    });
  };

  const toggleDone = (id: string) => {
    update(prev => ({
      ...prev,
      done: prev.done.includes(id) ? prev.done.filter(d => d !== id) : [...prev.done, id],
    }));
  };

  const setNote = (id: string, value: string) => {
    update(prev => ({ ...prev, notes: { ...prev.notes, [id]: value } }));
  };

  const resetAll = () => {
    update(() => EMPTY);
  };

  const doneCount = progress.done.length;
  const pct = Math.round((doneCount / TEST_THE_LAW_TOTAL) * 100);
  const nextId = EXPERIMENTS.find(e => !progress.done.includes(e.id))?.id ?? null;

  return (
    <div>
      {/* Progress header */}
      <div className={styles.progressHeader}>
        <div
          className={styles.progressTrack}
          role="progressbar"
          aria-valuenow={doneCount}
          aria-valuemin={0}
          aria-valuemax={TEST_THE_LAW_TOTAL}
          aria-label="Experiments completed"
        >
          <div className={styles.progressFill} style={{ width: `${pct}%` }} />
        </div>
        <div className={styles.progressMeta}>
          <span suppressHydrationWarning>
            {doneCount > 0
              ? doneCount >= TEST_THE_LAW_TOTAL
                ? 'All seven experiments logged — the evidence is yours now.'
                : `${doneCount} of ${TEST_THE_LAW_TOTAL} experiments completed`
              : `${TEST_THE_LAW_TOTAL} experiments · about 4 weeks`}
          </span>
          {hydrated && doneCount > 0 && (
            <button onClick={resetAll} className={styles.resetButton}>
              Reset everything
            </button>
          )}
        </div>
      </div>

      <ol className={styles.list}>
        {EXPERIMENTS.map(exp => {
          const isDone = progress.done.includes(exp.id);
          const isNext = hydrated && exp.id === nextId;
          return (
            <li
              key={exp.id}
              className={`${styles.card} ${isDone ? styles.cardDone : ''} ${isNext ? styles.cardNext : ''}`}
              suppressHydrationWarning
            >
              <div className={styles.cardHeader}>
                <button
                  className={styles.check}
                  onClick={() => toggleDone(exp.id)}
                  aria-pressed={isDone}
                  aria-label={`Mark experiment ${exp.number} as ${isDone ? 'not completed' : 'completed'}`}
                  suppressHydrationWarning
                >
                  {isDone ? '✓' : exp.number}
                </button>
                <div className={styles.headerText}>
                  <h2 className={styles.title}>
                    {exp.title}
                    {isNext && <span className={styles.nextBadge}>up next</span>}
                  </h2>
                  <p className={styles.timing}>
                    {exp.timing} · <em>{exp.trains}</em>
                  </p>
                </div>
              </div>

              <p className={styles.claim}>
                <span className={styles.label}>The claim under test:</span> {exp.claim}
              </p>

              <div className={styles.protocol}>
                <span className={styles.label}>Protocol</span>
                <ol className={styles.protocolList}>
                  {exp.protocol.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>

              <p className={styles.counts}>
                <span className={styles.label}>What counts as a result:</span> {exp.counts}
              </p>

              <blockquote className={styles.quote}>
                <p>&ldquo;{exp.quote.text}&rdquo;</p>
                <cite>
                  — <Link href={exp.quote.href}>{exp.quote.source}</Link>
                </cite>
              </blockquote>

              {exp.note && <p className={styles.note}>{exp.note}</p>}

              <details className={styles.journal} open={isDone || undefined}>
                <summary className={styles.journalSummary}>
                  Your lab notes {progress.notes[exp.id]?.trim() ? '· saved' : ''}
                </summary>
                <textarea
                  className={styles.journalInput}
                  placeholder="What you imagined, the dates, and what actually happened — written for the you of six months from now."
                  value={progress.notes[exp.id] ?? ''}
                  onChange={e => setNote(exp.id, e.target.value)}
                  rows={4}
                  suppressHydrationWarning
                />
              </details>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
