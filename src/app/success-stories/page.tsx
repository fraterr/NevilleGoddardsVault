import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, SITE_NAME } from '@/lib/config';
import SuccessStoriesBrowser from '@/components/SuccessStoriesBrowser';
import styles from '@/components/Techniques.module.css';

export const metadata: Metadata = {
  title: 'Success Stories — Neville Goddard Techniques in Practice',
  description:
    'A curated, browsable index of hundreds of success stories from the Neville Goddard community on Reddit — filterable by goal, technique used, and time taken.',
  alternates: { canonical: `${SITE_URL}/success-stories/` },
  openGraph: {
    title: 'Success Stories — Neville Goddard Techniques in Practice',
    description:
      'Hundreds of community success stories, organized by goal, technique, and timeframe.',
    url: `${SITE_URL}/success-stories/`,
    siteName: SITE_NAME,
    type: 'website',
  },
};

export default function SuccessStoriesPage() {
  return (
    <article className="glass animate-fade-in" style={{ padding: '3rem', borderRadius: '16px', overflow: 'hidden' }}>
      <h1 className={styles.pageTitle}>Success Stories</h1>
      <p className={styles.tagline}>
        Hundreds of first-hand reports from the r/NevilleGoddard community — organized by goal,
        technique, and how long it took, so you can find the stories that speak to your situation.
      </p>

      <p className={styles.intro}>
        Nothing builds faith in the practice like the testimony of people who did it. Every entry
        below links to the original post on Reddit (with its comments and follow-ups), labeled with
        the community&apos;s own &ldquo;Success Story&rdquo; flair. Read a few from your category —
        then open the <Link href="/techniques" style={{ color: 'var(--accent-gold)' }}>technique guides</Link> and
        write your own.
      </p>

      <SuccessStoriesBrowser />

      <p className={styles.note}>
        These are self-reported experiences by anonymous Reddit users, indexed here as-is for
        study and encouragement: they are not verified, and they are not promises of outcomes.
        Categories, techniques, and timeframes are detected automatically from each post&apos;s
        text and may occasionally be imprecise. All links open the original thread on reddit.com.
      </p>
    </article>
  );
}
