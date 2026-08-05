import stories from '@/data/successStories.json';
import styles from './SuccessStoriesStats.module.css';

interface Story {
  score: number;
  category: string;
  techniques: string[];
  timeBucket: string | null;
}

const ALL = stories as Story[];

const CATEGORY_LABELS: Record<string, string> = {
  'sp-love': 'Love & SP',
  'money': 'Money',
  'job-career': 'Job & Career',
  'health': 'Health',
  'education': 'Exams & Study',
  'home-life': 'Home & Life',
};

const BUCKETS: { key: string; label: string }[] = [
  { key: 'days', label: 'Within days' },
  { key: 'weeks', label: 'Weeks' },
  { key: 'months', label: 'Months' },
  { key: 'years', label: 'A year or more' },
];

export default function SuccessStoriesStats() {
  // Timeframe distribution (only stories whose author states a timeframe)
  const bucketCounts = BUCKETS.map(b => ({
    ...b,
    count: ALL.filter(s => s.timeBucket === b.key).length,
  }));
  const withTime = bucketCounts.reduce((n, b) => n + b.count, 0);
  const maxBucket = Math.max(...bucketCounts.map(b => b.count));

  // Technique frequency, overall and per category
  const techCounts = new Map<string, number>();
  for (const s of ALL) {
    for (const t of s.techniques) techCounts.set(t, (techCounts.get(t) ?? 0) + 1);
  }
  const topTech = [...techCounts.entries()].sort((a, b) => b[1] - a[1])[0];

  const topTechsByCategory = Object.entries(CATEGORY_LABELS).map(([cat, label]) => {
    const counts = new Map<string, number>();
    for (const s of ALL) {
      if (s.category !== cat) continue;
      for (const t of s.techniques) counts.set(t, (counts.get(t) ?? 0) + 1);
    }
    const top = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 2);
    return { label, top };
  });

  const medianScore = [...ALL.map(s => s.score)].sort((a, b) => a - b)[Math.floor(ALL.length / 2)];

  return (
    <section className={styles.panel} aria-label="Statistics about the indexed stories">
      <h2 className={styles.heading}>What the numbers say</h2>

      {/* Stat tiles */}
      <div className={styles.tiles}>
        <div className={styles.tile}>
          <span className={styles.tileValue}>{ALL.length}</span>
          <span className={styles.tileLabel}>stories indexed</span>
        </div>
        <div className={styles.tile}>
          <span className={styles.tileValue}>{withTime}</span>
          <span className={styles.tileLabel}>state how long it took</span>
        </div>
        <div className={styles.tile}>
          <span className={styles.tileValue}>{topTech[0]}</span>
          <span className={styles.tileLabel}>most-cited technique ({topTech[1]} stories)</span>
        </div>
        <div className={styles.tile}>
          <span className={styles.tileValue}>{medianScore}</span>
          <span className={styles.tileLabel}>median upvotes per story</span>
        </div>
      </div>

      {/* Timeframe distribution */}
      <h3 className={styles.subheading}>
        How long it took, as reported by the {withTime} stories that say
      </h3>
      <div className={styles.chart} role="img" aria-label={`Timeframe distribution: ${bucketCounts.map(b => `${b.label} ${b.count}`).join(', ')}`}>
        {bucketCounts.map(b => {
          const pct = Math.round((b.count / withTime) * 100);
          return (
            <div key={b.key} className={styles.barRow}>
              <span className={styles.barLabel}>{b.label}</span>
              <div className={styles.barTrack}>
                <div
                  className={styles.bar}
                  style={{ width: `${Math.max(2, (b.count / maxBucket) * 100)}%` }}
                />
              </div>
              <span className={styles.barValue}>{b.count} · {pct}%</span>
            </div>
          );
        })}
      </div>

      {/* Techniques by goal */}
      <h3 className={styles.subheading}>Most-used techniques by goal</h3>
      <div className={styles.techGrid}>
        {topTechsByCategory.map(({ label, top }) => (
          <div key={label} className={styles.techRow}>
            <span className={styles.techCat}>{label}</span>
            <span className={styles.techList}>
              {top.map(([tech, count]) => (
                <span key={tech} className={styles.techChip}>
                  {tech} <span className={styles.techCount}>{count}</span>
                </span>
              ))}
            </span>
          </div>
        ))}
      </div>

      <p className={styles.caveat}>
        These figures describe the stories people chose to share — not a success rate. Nobody
        posts the week nothing happened. Read them as a map of how this community practices,
        not as a promise of timing.
      </p>
    </section>
  );
}
