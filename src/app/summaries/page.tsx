import type { Metadata } from 'next';
import Link from 'next/link';
import { BOOK_SUMMARIES } from '@/data/bookSummaries';
import { getBannerForSlug } from '@/lib/banners';
import { SITE_URL, SITE_NAME, withBasePath } from '@/lib/config';
import tStyles from '@/components/Techniques.module.css';
import styles from '@/components/BookSummaries.module.css';

export const metadata: Metadata = {
  title: "Neville Goddard Book Summaries",
  description:
    "Clear, source-linked summaries of Neville Goddard's books — key ideas, chapter-by-chapter guides, and essential quotes, each linked to the full text in the vault.",
  alternates: { canonical: `${SITE_URL}/summaries/` },
  openGraph: {
    title: 'Neville Goddard Book Summaries',
    description:
      "Key ideas, chapter-by-chapter guides, and essential quotes from Neville Goddard's books — every claim linked to the full text.",
    url: `${SITE_URL}/summaries/`,
    siteName: SITE_NAME,
    type: 'website',
  },
};

export default function SummariesIndexPage() {
  return (
    <article className="glass animate-fade-in" style={{ padding: '3rem', borderRadius: '16px', overflow: 'hidden' }}>
      <h1 className={tStyles.pageTitle}>Book Summaries</h1>
      <p className={tStyles.tagline}>
        Each book in three minutes: the core ideas, a chapter-by-chapter map, and the essential
        quotes — every one linked to the full text, free in this vault.
      </p>

      <p className={tStyles.intro}>
        A summary is a map, not the territory: use these to choose your next book, to review one
        you&apos;ve read, or to find the exact chapter that answers today&apos;s question. When a
        summary earns your attention, the complete book is one click away.
      </p>

      <div className={styles.grid}>
        {BOOK_SUMMARIES.map(book => {
          const banner = getBannerForSlug(book.bookHref.split('/').filter(Boolean));
          return (
            <Link key={book.slug} href={`/summaries/${book.slug}`} className={styles.card}>
              {banner && (
                <div className={styles.cardBanner}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={withBasePath(`/images/banners/${banner}`)} alt={`${book.title} banner`} loading="lazy" />
                </div>
              )}
              <div className={styles.cardBody}>
                <span className={styles.cardYear}>{book.year}</span>
                <span className={styles.cardTitle}>{book.title}</span>
                <span className={styles.cardOneLiner}>{book.oneLiner}</span>
                <span className={styles.cardCta}>Read the summary →</span>
              </div>
            </Link>
          );
        })}
      </div>

      <p className={tStyles.note}>
        Six more summaries are on the way (Your Faith is Your Fortune, Freedom for All, Prayer,
        Seedtime and Harvest, The Search, and the Radio Lectures). Summaries are original to this
        site; the books themselves are in the public domain and hosted in full in the vault.
      </p>
    </article>
  );
}
