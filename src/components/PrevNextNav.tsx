import Link from 'next/link';
import { hrefForSlug } from '@/lib/slug';
import type { AdjacentDocs } from '@/lib/markdown';
import styles from './DocNav.module.css';

export default function PrevNextNav({ prev, next }: AdjacentDocs) {
  if (!prev && !next) return null;

  return (
    <nav className={styles.prevNext} aria-label="Previous and next document">
      {prev && (
        <Link href={hrefForSlug(prev.slug)} className={styles.navLink} rel="prev">
          <span className={styles.navLabel}>← Previous</span>
          <span className={styles.navTitle}>{prev.title}</span>
        </Link>
      )}
      {next && (
        <Link href={hrefForSlug(next.slug)} className={`${styles.navLink} ${styles.navLinkNext}`} rel="next">
          <span className={styles.navLabel}>Next →</span>
          <span className={styles.navTitle}>{next.title}</span>
        </Link>
      )}
    </nav>
  );
}
