import type { Metadata } from 'next';
import Link from 'next/link';
import { TECHNIQUES } from '@/data/techniques';
import { SITE_URL, SITE_NAME } from '@/lib/config';
import styles from '@/components/Techniques.module.css';

export const metadata: Metadata = {
  title: "Neville Goddard's Techniques — Practical Guides",
  description:
    "Step-by-step guides to Neville Goddard's techniques — SATS, Revision, Living in the End, Mental Diet, I AM, EIYPO, Affirmations, Visualization, Scripting, and Letting Go — with every claim linked to the original texts.",
  alternates: { canonical: `${SITE_URL}/techniques/` },
  openGraph: {
    title: "Neville Goddard's Techniques — Practical Guides",
    description:
      "Step-by-step guides to Neville Goddard's core techniques, with every claim anchored to the original books and lectures.",
    url: `${SITE_URL}/techniques/`,
    siteName: SITE_NAME,
    type: 'website',
  },
};

export default function TechniquesIndexPage() {
  return (
    <article className="glass animate-fade-in" style={{ padding: '3rem', borderRadius: '16px', overflow: 'hidden' }}>
      <h1 className={styles.pageTitle}>The Techniques</h1>
      <p className={styles.tagline}>
        Practical, step-by-step guides to Neville Goddard&apos;s methods — written so you can start
        tonight, with every claim anchored to the exact passage in his books and lectures.
      </p>

      <p className={styles.intro}>
        Neville&apos;s teaching is not theory to admire but a discipline to practice: assume the
        feeling of the wish fulfilled, and persist until the assumption hardens into fact. These ten
        guides cover the complete toolkit — the nightly scene, the evening revision, the all-day
        state, the inner-speech diet, the release that follows the work, and the foundation of them
        all, I AM. Each guide ends with the source texts, so you can always go deeper than any
        summary.
      </p>

      <div className={styles.cardsGrid}>
        {TECHNIQUES.map(t => (
          <Link key={t.slug} href={`/techniques/${t.slug}`} className={styles.card}>
            <span className={styles.cardTitle}>{t.shortTitle}</span>
            <span className={styles.cardTagline}>{t.tagline}</span>
          </Link>
        ))}
      </div>

      <p className={styles.note}>
        New to Neville? The <Link href="/start-here" style={{ color: 'var(--accent-gold)' }}>Start Here path</Link> walks
        you through the essential readings and practices in order, over 21 days. And if what you
        lack is confidence rather than technique, run the{' '}
        <Link href="/test-the-law" style={{ color: 'var(--accent-gold)' }}>Test the Law experiments</Link> —
        seven low-stakes proofs, starting with Neville&apos;s famous ladder.
      </p>
    </article>
  );
}
