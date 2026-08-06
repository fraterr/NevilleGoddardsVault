import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, SITE_NAME } from '@/lib/config';
import StartHerePath from '@/components/StartHerePath';
import styles from '@/components/Techniques.module.css';

export const metadata: Metadata = {
  title: 'Start Here — A 21-Day Path into Neville Goddard',
  description:
    'New to Neville Goddard? A guided 21-day path: the essential readings in the right order, each paired with a concrete daily practice. Free, with progress tracking.',
  alternates: { canonical: `${SITE_URL}/start-here/` },
  openGraph: {
    title: 'Start Here — A 21-Day Path into Neville Goddard',
    description:
      'The essential readings in the right order, each paired with a concrete daily practice.',
    url: `${SITE_URL}/start-here/`,
    siteName: SITE_NAME,
    type: 'website',
  },
};

export default function StartHerePage() {
  return (
    <article className="glass animate-fade-in" style={{ padding: '3rem', borderRadius: '16px', overflow: 'hidden' }}>
      <h1 className={styles.pageTitle}>Start Here</h1>
      <p className={styles.tagline}>
        A 21-day path through the vault: the essential readings in the right order, each paired
        with one concrete practice for the day.
      </p>

      <p className={styles.intro}>
        A library of 369 documents is a gift — and a maze. This path walks you in: week one lays
        the foundation (I AM, feeling, the state akin to sleep), week two puts the law in motion
        (assumption, thinking from the end, revision), and week three turns it into a way of life
        (the mental diet, other people, the full daily protocol). Most readings take 10–20 minutes;
        every practice can be done the same day.
      </p>

      <p className={styles.sectionIntro}>
        Your progress is saved privately in this browser — nothing is uploaded anywhere. Check off
        each day as you complete it. Struggling to believe any of this can work? Run the{' '}
        <Link href="/test-the-law" style={{ color: 'var(--accent-gold)' }}>Test the Law experiments</Link>{' '}
        first — they build the faith this path then puts to work.
      </p>

      <StartHerePath />

      <p className={styles.note}>
        There is no account and no tracking: progress lives only in your browser&apos;s local
        storage, so it will reset if you clear site data or switch devices. The pace is yours —
        &ldquo;21 days&rdquo; is a rhythm, not a rule.
      </p>
    </article>
  );
}
