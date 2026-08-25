import type { Metadata } from 'next';
import Link from 'next/link';
import { getBlogPosts, formatPostDate } from '@/lib/blog';
import { SITE_URL, SITE_NAME } from '@/lib/config';
import tStyles from '@/components/Techniques.module.css';
import styles from '@/components/Blog.module.css';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Articles, study notes, and updates from the Neville Goddard Vault — on the teaching, the practice, and this archive.',
  alternates: { canonical: `${SITE_URL}/blog/` },
  openGraph: {
    title: `Blog | ${SITE_NAME}`,
    description: 'Articles, study notes, and updates from the Neville Goddard Vault.',
    url: `${SITE_URL}/blog/`,
    siteName: SITE_NAME,
    type: 'website',
  },
};

export default function BlogIndexPage() {
  const posts = getBlogPosts();

  return (
    <article className="glass animate-fade-in" style={{ padding: '3rem', borderRadius: '16px', overflow: 'hidden' }}>
      <h1 className={tStyles.pageTitle}>Blog</h1>
      <p className={tStyles.tagline}>
        Articles and study notes on the teaching, the practice, and this archive.
      </p>

      {posts.length === 0 && (
        <p className={tStyles.sectionIntro}>No articles yet — the first one is on its way.</p>
      )}

      <ul className={styles.postList}>
        {posts.map(post => (
          <li key={post.slug} className={styles.postCard}>
            <Link href={`/blog/${post.slug}`} className={styles.postLink}>
              <span className={styles.postMeta}>
                {formatPostDate(post.date)} · {post.readingTime} min read
              </span>
              <span className={styles.postTitle}>{post.title}</span>
              {post.description && <span className={styles.postDescription}>{post.description}</span>}
              {post.tags.length > 0 && (
                <span className={styles.postTags}>
                  {post.tags.map(tag => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>

      <p className={tStyles.note}>
        Follow along via the <a href={`${SITE_URL}/feed.xml`} style={{ color: 'var(--accent-gold)' }}>RSS feed</a>.
      </p>
    </article>
  );
}
