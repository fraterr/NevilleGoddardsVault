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
      <h1 className={styles.pageTitle}>Neville Goddard Success Stories</h1>
      <p className={styles.tagline}>
        Hundreds of first-hand reports from the r/NevilleGoddard community — organized by goal,
        technique, and how long it took, so you can find the stories that speak to your situation.
      </p>

      <p className={styles.intro}>
        Browse personal accounts of applying Neville&apos;s teachings to relationships, work,
        money and everyday life. Open the original Reddit post to read the author&apos;s full
        account, comments and any follow-ups. The collection is a starting point for study;
        the reports have not been independently verified.
      </p>

      <nav className={styles.cardsGrid} aria-label="Stories by practice">
        <Link className={styles.card} href="/success-stories/sats/">
          <span className={styles.cardTitle}>SATS success stories</span>
          <span className={styles.cardTagline}>Accounts mentioning imaginal scenes and the state akin to sleep, with a reading guide.</span>
        </Link>
        <Link className={styles.card} href="/success-stories/revision/">
          <span className={styles.cardTitle}>Revision success stories</span>
          <span className={styles.cardTagline}>Accounts of revisiting events in imagination, with questions to help compare the reports.</span>
        </Link>
      </nav>

      <h2 className={styles.sectionTitle}>Browse all stories</h2>

      <SuccessStoriesBrowser />

      <h2 className={styles.sectionTitle}>What can you learn from a success story?</h2>
      <p className={styles.intro}>
        Look for what the author actually practised: the scene, inner conversation or revised event.
        Separate the time spent practising from the time until the reported outcome.
        If details are missing, leave them unknown. Votes and vivid descriptions do not establish
        what caused an outcome, and this collection cannot tell you how often a technique works.
      </p>
      <p className={styles.intro}>
        To explore a practice yourself, read the <Link href="/techniques/sats/">SATS guide</Link>,{' '}
        <Link href="/techniques/revision/">revision guide</Link> or{' '}
        <Link href="/techniques/living-in-the-end/">living in the end guide</Link>.
        The <Link href="/test-the-law/">Test the Law journal</Link> gives you somewhere to record
        your own observations, including misses and uncertain results.
      </p>

      <p className={styles.note}>
        These are self-reported experiences by anonymous Reddit users, indexed here as-is for
        study and encouragement: they are not verified, and they are not promises of outcomes.
        Categories, techniques, and timeframes are detected automatically from each post&apos;s
        text and may occasionally be imprecise. All links open the original thread on reddit.com.
      </p>
    </article>
  );
}
