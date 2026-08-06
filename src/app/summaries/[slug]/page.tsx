import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BOOK_SUMMARIES, getBookSummaryBySlug } from '@/data/bookSummaries';
import { getBannerForSlug } from '@/lib/banners';
import { SITE_URL, SITE_NAME, withBasePath } from '@/lib/config';
import tStyles from '@/components/Techniques.module.css';
import styles from '@/components/BookSummaries.module.css';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BOOK_SUMMARIES.map(b => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const book = getBookSummaryBySlug(slug);
  if (!book) return {};

  const canonical = `${SITE_URL}/summaries/${book.slug}/`;
  const title = `${book.title} — Summary`;
  const description = `${book.title} (${book.year}) by Neville Goddard, summarized: ${book.oneLiner} Key ideas, chapter guide, and quotes linked to the full text.`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description: book.oneLiner,
      url: canonical,
      siteName: SITE_NAME,
      type: 'article',
    },
    twitter: { card: 'summary', title, description: book.oneLiner },
  };
}

export default async function SummaryPage({ params }: PageProps) {
  const { slug } = await params;
  const book = getBookSummaryBySlug(slug);
  if (!book) notFound();

  const canonical = `${SITE_URL}/summaries/${book.slug}/`;
  const banner = getBannerForSlug(book.bookHref.split('/').filter(Boolean));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${book.title} — Summary`,
    about: {
      '@type': 'Book',
      name: book.title,
      author: { '@type': 'Person', name: 'Neville Goddard' },
      datePublished: String(book.year),
    },
    url: canonical,
    publisher: { '@type': 'Organization', name: SITE_NAME },
    ...(banner ? { image: `${SITE_URL}/images/banners/${banner}` } : {}),
  };

  return (
    <article className="glass animate-fade-in" style={{ padding: '3rem', borderRadius: '16px', overflow: 'hidden' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {banner && (
        <div className={styles.hero}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={withBasePath(`/images/banners/${banner}`)} alt={`${book.title} banner`} />
          <div className={styles.heroOverlay} />
        </div>
      )}

      <nav aria-label="Breadcrumb" style={{ marginBottom: '1.25rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
        <Link href="/summaries" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
          Book Summaries
        </Link>
        <span style={{ margin: '0 0.4rem', opacity: 0.5 }}>/</span>
        <span style={{ color: 'var(--text-primary)' }}>{book.title}</span>
      </nav>

      <p className={styles.year}>{book.year} · Neville Goddard</p>
      <h1 className={tStyles.pageTitle}>{book.title}</h1>
      <p className={tStyles.tagline}>{book.oneLiner}</p>

      <Link href={book.bookHref} className={styles.readFullTop}>
        📖 Read the full book — free in the vault
      </Link>

      {book.intro.map((paragraph, i) => (
        <p key={i} className={tStyles.intro} style={{ marginTop: i === 0 ? '1.75rem' : undefined }}>
          {paragraph}
        </p>
      ))}

      <h2 className={tStyles.sectionTitle}>Key ideas</h2>
      <div className={styles.ideasGrid}>
        {book.keyIdeas.map((idea, i) => (
          <div key={i} className={styles.idea}>
            <div className={styles.ideaTitle}>{idea.title}</div>
            <div className={styles.ideaDetail}>{idea.detail}</div>
          </div>
        ))}
      </div>

      {(book.chapters.length > 0 || book.chaptersNote) && (
        <>
          <h2 className={tStyles.sectionTitle}>Chapter by chapter</h2>
          {book.chaptersNote && <p className={tStyles.sectionIntro}>{book.chaptersNote}</p>}
          {book.chapters.length > 0 && (
            <ul className={styles.chapterList}>
              {book.chapters.map((chapter, i) => (
                <li key={i} className={styles.chapterRow}>
                  <span className={styles.chapterLabel}>
                    <Link href={chapter.href}>{chapter.label}</Link>
                  </span>
                  <span className={styles.chapterGist}>{chapter.gist}</span>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      <h2 className={tStyles.sectionTitle}>Essential quotes</h2>
      {book.quotes.map((quote, i) => (
        <blockquote key={i} className={tStyles.quote}>
          <p className={tStyles.quoteText}>&ldquo;{quote.text}&rdquo;</p>
          <cite className={tStyles.quoteSource}>
            — <Link href={quote.href}>{quote.source}</Link>
          </cite>
        </blockquote>
      ))}

      <h2 className={tStyles.sectionTitle}>Practice what it teaches</h2>
      <ul className={tStyles.relatedList}>
        {book.relatedTechniques.map((t, i) => (
          <li key={i}>
            <Link href={t.href} className={tStyles.relatedLink}>
              {t.title}
            </Link>
          </li>
        ))}
      </ul>

      <div className={styles.whoFor}>
        <strong>Who this book is for:</strong> {book.whoFor}
      </div>

      <div className={styles.bottomCta}>
        <Link href={book.bookHref} className={styles.ctaPrimary}>
          <span className={styles.ctaLabel}>Read next</span>
          <span className={styles.ctaTitle}>{book.title} — full text</span>
          <span className={styles.ctaWhy}>The complete book, free in the vault. The summary is the map; this is the territory.</span>
        </Link>
        <Link href={book.nextRead.href} className={styles.ctaSecondary}>
          <span className={styles.ctaLabel}>Then continue with</span>
          <span className={styles.ctaTitle}>{book.nextRead.title}</span>
          <span className={styles.ctaWhy}>{book.nextRead.why}</span>
        </Link>
      </div>
    </article>
  );
}
