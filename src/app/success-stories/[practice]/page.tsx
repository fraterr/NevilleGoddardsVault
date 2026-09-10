import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SuccessStoriesBrowser from '@/components/SuccessStoriesBrowser';
import { SITE_URL } from '@/lib/config';
import styles from '@/components/Techniques.module.css';

const practices = {
  sats: {
    label: 'SATS',
    title: 'SATS Success Stories from the Neville Goddard Community',
    description: 'Read Reddit accounts mentioning SATS. Compare imaginal scenes, practice routines and reported timeframes, then explore the linked technique guide.',
    intro: 'SATS means state akin to sleep. In this collection, the label groups accounts mentioning the relaxed, drowsy practice associated with imagining a fulfilled desire. Some authors also describe affirmations or other practices, so a SATS label does not mean SATS was the only technique used.',
    question: 'What scene did the author imagine?',
    guidance: 'Look for a specific moment that represents the desired outcome, whether the author describes experiencing it from their own point of view, and how they approached repetition. A report may say that someone visualized without describing drowsiness or bedtime practice. Read the original post before treating it as a detailed SATS example.',
    comparison: 'Separate the length of each session, the number of nights of practice and the wait until the reported event. Those are three different intervals. An automatically detected timeframe can refer to something else in the story.',
  },
  revision: {
    label: 'Revision',
    title: 'Revision Success Stories from the Neville Goddard Community',
    description: 'Explore Reddit revision accounts: what readers imagined differently, what they reported afterwards, and how to compare stories with Neville’s revision teaching.',
    intro: 'Revision is the practice of returning to an event in imagination and experiencing it as you would have preferred it to unfold. These Reddit accounts are grouped by mentions of revision; they may also discuss SATS, inner conversations or other practices.',
    question: 'What did the author revise, and what changed afterwards?',
    guidance: 'Distinguish the original event, the imagined alternative and the later observation. An author may describe a different feeling about a memory, a change in a relationship, or a later external event. These are different kinds of reports and should not be treated as interchangeable.',
    comparison: 'Check whether the author gives a follow-up, identifies the interval between practice and observation, and mentions other actions taken. A later event alone does not demonstrate that the historical event changed. Preserve the distinction between what the author observed and how they interpreted it.',
  },
} as const;

type Props = { params: Promise<{ practice: string }> };
const getPractice = (slug: string) => practices[slug as keyof typeof practices];
export function generateStaticParams() { return Object.keys(practices).map(practice => ({ practice })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { practice } = await params;
  const data = getPractice(practice);
  if (!data) return {};
  const url = `${SITE_URL}/success-stories/${practice}/`;
  return { title: { absolute: data.title }, description: data.description, alternates: { canonical: url },
    openGraph: { title: data.title, description: data.description, url, type: 'website' } };
}

export default async function PracticeStoriesPage({ params }: Props) {
  const { practice } = await params;
  const data = getPractice(practice);
  if (!data) notFound();
  return <article className="glass" style={{ padding: '3rem', borderRadius: '16px' }}>
    <p><Link href="/success-stories/">All success stories</Link></p>
    <h1 className={styles.pageTitle}>{data.title}</h1>
    <p className={styles.intro}>{data.intro}</p>
    <h2 className={styles.sectionTitle}>{data.question}</h2>
    <p className={styles.intro}>{data.guidance}</p>
    <p className={styles.intro}>{data.comparison}</p>
    <p className={styles.intro}>Read the <Link href={`/techniques/${practice}/`}>{data.label} technique guide and source passages</Link> alongside these accounts.</p>
    <h2 className={styles.sectionTitle}>Browse {data.label} accounts</h2>
    <p className={styles.note}>These are unverified personal reports. Technique labels and timeframes are detected automatically and can be inaccurate. Open each source to check the details.</p>
    <SuccessStoriesBrowser techniqueScope={data.label} />
    <p className={styles.intro}>Keep your own observations in <Link href="/test-the-law/">Test the Law</Link>, or explore <Link href="/books/">Neville&apos;s books</Link> and <Link href="/summaries/">book summaries</Link>.</p>
  </article>;
}
