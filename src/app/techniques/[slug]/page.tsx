import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { TECHNIQUES, getTechniqueBySlug } from '@/data/techniques';
import { SITE_URL, SITE_NAME } from '@/lib/config';
import styles from '@/components/Techniques.module.css';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return TECHNIQUES.map(t => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const technique = getTechniqueBySlug(slug);
  if (!technique) return {};

  const canonical = `${SITE_URL}/techniques/${technique.slug}/`;
  return {
    title: technique.title,
    description: technique.description,
    alternates: { canonical },
    openGraph: {
      title: technique.title,
      description: technique.description,
      url: canonical,
      siteName: SITE_NAME,
      type: 'article',
    },
    twitter: {
      card: 'summary',
      title: technique.title,
      description: technique.description,
    },
  };
}

export default async function TechniquePage({ params }: PageProps) {
  const { slug } = await params;
  const technique = getTechniqueBySlug(slug);
  if (!technique) notFound();

  const canonical = `${SITE_URL}/techniques/${technique.slug}/`;

  // HowTo structured data for the steps, FAQPage for the questions
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: technique.title,
      description: technique.description,
      url: canonical,
      step: technique.steps.map((s, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name: s.title,
        text: s.detail,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: technique.faq.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ];

  return (
    <article className="glass animate-fade-in" style={{ padding: '3rem', borderRadius: '16px', overflow: 'hidden' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav aria-label="Breadcrumb" style={{ marginBottom: '1.5rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
        <Link href="/techniques" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
          Techniques
        </Link>
        <span style={{ margin: '0 0.4rem', opacity: 0.5 }}>/</span>
        <span style={{ color: 'var(--text-primary)' }}>{technique.shortTitle}</span>
      </nav>

      <h1 className={styles.pageTitle}>{technique.title}</h1>
      <p className={styles.tagline}>{technique.tagline}</p>

      {technique.intro.map((paragraph, i) => (
        <p key={i} className={styles.intro} dangerouslySetInnerHTML={{ __html: formatInline(paragraph) }} />
      ))}

      <h2 className={styles.sectionTitle}>How to practice it</h2>
      {technique.stepsIntro && <p className={styles.sectionIntro}>{technique.stepsIntro}</p>}
      <ol className={styles.stepsList}>
        {technique.steps.map((step, i) => (
          <li key={i} className={styles.step}>
            <div className={styles.stepTitle}>{step.title}</div>
            <div className={styles.stepDetail} dangerouslySetInnerHTML={{ __html: formatInline(step.detail) }} />
          </li>
        ))}
      </ol>

      <h2 className={styles.sectionTitle}>In Neville&apos;s words</h2>
      <p className={styles.sectionIntro}>
        Every quote below is verbatim from the vault — click the source to read it in context.
      </p>
      {technique.quotes.map((quote, i) => (
        <blockquote key={i} className={styles.quote}>
          <p className={styles.quoteText}>&ldquo;{quote.text}&rdquo;</p>
          <cite className={styles.quoteSource}>
            — <Link href={quote.href}>{quote.source}</Link>
          </cite>
        </blockquote>
      ))}

      <h2 className={styles.sectionTitle}>Common mistakes</h2>
      {technique.mistakes.map((mistake, i) => (
        <div key={i} className={styles.itemBlock}>
          <div className={styles.itemTitle}>{mistake.title}</div>
          <div className={styles.itemDetail}>{mistake.detail}</div>
        </div>
      ))}

      <h2 className={styles.sectionTitle}>Frequently asked</h2>
      {technique.faq.map((item, i) => (
        <details key={i} className={styles.faqItem}>
          <summary className={styles.faqQuestion}>{item.q}</summary>
          <div className={styles.faqAnswer}>{item.a}</div>
        </details>
      ))}

      <h2 className={styles.sectionTitle}>Go to the sources</h2>
      <ul className={styles.relatedList}>
        {technique.related.map((link, i) => (
          <li key={i}>
            <Link href={link.href} className={styles.relatedLink}>
              {link.title}
            </Link>
          </li>
        ))}
      </ul>

      <p className={styles.note}>
        These guides describe Neville Goddard&apos;s teaching as he presented it; they are an
        educational companion to the original texts, not a promise of outcomes. The practice is
        free, private, and entirely yours.
      </p>
    </article>
  );
}

/** Minimal inline markdown: **bold** and *italic* only (content is our own data file). */
function formatInline(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
}
