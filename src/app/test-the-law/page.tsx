import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, SITE_NAME } from '@/lib/config';
import TestTheLawPath from '@/components/TestTheLawPath';
import styles from '@/components/Techniques.module.css';

export const metadata: Metadata = {
  title: 'Test the Law — 7 Experiments to Build Faith in the Practice',
  description:
    "Build first-hand confidence in Neville Goddard's law before applying it to what matters: seven graduated, low-stakes experiments — starting with the famous ladder exercise — with a private results journal.",
  alternates: { canonical: `${SITE_URL}/test-the-law/` },
  openGraph: {
    title: 'Test the Law — 7 Experiments to Build Faith in the Practice',
    description:
      'Seven graduated, verifiable experiments — starting with the famous ladder exercise — to build faith through your own evidence.',
    url: `${SITE_URL}/test-the-law/`,
    siteName: SITE_NAME,
    type: 'website',
  },
};

export default function TestTheLawPage() {
  return (
    <article className="glass animate-fade-in" style={{ padding: '3rem', borderRadius: '16px', overflow: 'hidden' }}>
      <h1 className={styles.pageTitle}>Test the Law</h1>
      <p className={styles.tagline}>
        Seven graduated experiments — starting with Neville&apos;s famous ladder — to build faith
        in the practice the only way it can honestly be built: on your own evidence.
      </p>

      <p className={styles.intro}>
        The single biggest obstacle in this practice is not technique — it is confidence. Almost
        everyone makes the same mistake: they test the law for the first time on the thing they
        want most. Maximum attachment, maximum desperation, zero accumulated faith — and then the
        doubt that follows feels like proof against the law, when it was only bad experimental
        design.
      </p>

      <p className={styles.intro}>
        Neville&apos;s own advice was the opposite: <em>test</em> it — deliberately, on targets
        that cost you nothing. &ldquo;Prove me now herewith&rdquo; was his favorite challenge from
        scripture, and he opened his 1948 class with an experiment designed exactly for skeptics:
        the ladder. This path takes you from that first proof to a full day of living in the end,
        one low-stakes experiment at a time. Stakes rise only as your evidence accumulates.
      </p>

      <p className={styles.sectionIntro}>
        Define what counts as a result <em>before</em> each experiment — like a real experimenter —
        and log the outcome in your lab notes. Everything is saved privately in this browser only;
        nothing is uploaded. Six months from now, on a doubting day, those notes are what you will
        reread.
      </p>

      <TestTheLawPath />

      <h2 className={styles.sectionTitle}>After the seventh experiment</h2>
      <p className={styles.intro}>
        You now have seven results of your own — not ours, not Reddit&apos;s, yours. This is the
        capital the practice runs on. Spend it: choose the first desire that actually matters and
        bring the full toolkit to it — the <Link href="/start-here" style={{ color: 'var(--accent-gold)' }}>21-day path</Link> if
        you want structure, or go straight to the <Link href="/techniques" style={{ color: 'var(--accent-gold)' }}>technique guides</Link> and
        the <Link href="/success-stories" style={{ color: 'var(--accent-gold)' }}>stories</Link> of
        those who did it before you.
      </p>

      <p className={styles.note}>
        The ladder experiment&apos;s two-part design (imagine climbing, while consciously writing
        &ldquo;I will not climb a ladder&rdquo;) comes from the closing assignment of
        Neville&apos;s 1948 lesson series; the imaginal act itself is described in Out of this
        World, Chapter 1. These experiments build conviction through experience — they are
        exercises, not scientific proof, and the honest log is what keeps them meaningful.
      </p>
    </article>
  );
}
