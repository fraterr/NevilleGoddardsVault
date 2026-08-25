import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPosts, getBlogPostBySlug, formatPostDate } from '@/lib/blog';
import { SITE_URL, SITE_NAME } from '@/lib/config';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import ReadingContainer from '@/components/ReadingContainer';
import Annotator from '@/components/Annotator';
import tStyles from '@/components/Techniques.module.css';
import styles from '@/components/Blog.module.css';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getBlogPosts().map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  const canonical = `${SITE_URL}/blog/${post.slug}/`;
  return {
    title: post.title,
    description: post.description || undefined,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.description || undefined,
      url: canonical,
      siteName: SITE_NAME,
      type: 'article',
      publishedTime: post.date,
    },
    twitter: { card: 'summary', title: post.title, description: post.description || undefined },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const canonical = `${SITE_URL}/blog/${post.slug}/`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description || undefined,
    datePublished: post.date,
    url: canonical,
    publisher: { '@type': 'Organization', name: SITE_NAME },
  };

  return (
    <article className="glass animate-fade-in" style={{ padding: '3rem', borderRadius: '16px', overflow: 'hidden' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav aria-label="Breadcrumb" style={{ marginBottom: '1.5rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
        <Link href="/blog" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Blog</Link>
        <span style={{ margin: '0 0.4rem', opacity: 0.5 }}>/</span>
        <span style={{ color: 'var(--text-primary)' }}>{post.title}</span>
      </nav>

      <h1 className={tStyles.pageTitle}>{post.title}</h1>
      <p className={styles.articleMeta}>
        {formatPostDate(post.date)} · {post.readingTime} min read
        {post.tags.length > 0 && (
          <> · {post.tags.map(tag => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}</>
        )}
      </p>

      <ReadingContainer>
        <Annotator slug={`/blog/${post.slug}`} docTitle={post.title}>
          <MarkdownRenderer content={post.content} />
        </Annotator>
      </ReadingContainer>
    </article>
  );
}
