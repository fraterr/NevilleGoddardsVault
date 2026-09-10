import type { Metadata } from 'next';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { SITE_URL } from '@/lib/config';

export const metadata: Metadata = {
  title: 'About the Vault and Its Sources',
  description: 'How to use the Neville Goddard Vault: original texts, editorial summaries, Reddit accounts, source limitations and reporting corrections.',
  alternates: { canonical: `${SITE_URL}/about/` },
  openGraph: { title: 'About the Vault and Its Sources', url: `${SITE_URL}/about/`, type: 'website' },
};

const content = `# About the Vault and its sources

Neville Goddard's Vault is an independent reader resource. It brings books and lecture transcripts together with summaries, practical guides and tools for keeping notes.

## Texts and editorial material

The [books](/books/) and [lectures](/lectures/) contain the texts available in this collection. Transcription, punctuation and chapter divisions can differ between editions. The collection does not yet provide a complete edition history for every entry. For a quotation you plan to publish, compare the passage with the edition or recording you are citing.

[Book summaries](/summaries/), technique guides, blog articles and summary sections accompanying the texts are editorial material. Read them alongside the linked passages. A practice explained in a guide may be an interpretation of his teaching.

## Success stories

The [success stories](/success-stories/) are self-reported Reddit accounts. Follow the source link to see the author's wording, comments and any updates. The Vault has not independently verified these experiences. Votes reflect Reddit engagement, not verification or a technique's success rate.

Categories, techniques and timeframes are extracted automatically and may be wrong or incomplete. A missing timeframe means it was not identified; it does not mean the result was immediate. This collection is not an exhaustive archive of the subreddit.

## Reading notes

Your reading notes are stored in your browser. Export anything you want to keep before clearing browser data or moving devices.

## Corrections and questions

If you find a transcription error, a misleading summary or a broken link, use the [feedback page](/feedback/). Include the page URL, the passage and a source for the correction where available. You can also [view the project repository](https://github.com/fraterr/NevilleGoddardsVault).
`;

export default function AboutPage() {
  return <article className="glass" style={{ padding: '3rem', borderRadius: '16px' }}><MarkdownRenderer content={content} /></article>;
}
