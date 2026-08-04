import Link from 'next/link';
import styles from './DocNav.module.css';

export interface Crumb {
  label: string;
  href: string | null; // null for the current page
}

export default function Breadcrumb({ crumbs, readingTime }: { crumbs: Crumb[]; readingTime?: number }) {
  if (crumbs.length === 0) return null;

  return (
    <div className={styles.metaRow}>
      <nav aria-label="Breadcrumb">
        <ol className={styles.breadcrumb}>
          <li className={styles.breadcrumbItem}>
            <Link href="/" className={styles.breadcrumbLink}>Home</Link>
            <span className={styles.separator} aria-hidden="true">/</span>
          </li>
          {crumbs.map((crumb, i) => {
            const isLast = i === crumbs.length - 1;
            return (
              <li key={i} className={styles.breadcrumbItem}>
                {isLast || !crumb.href ? (
                  <span className={styles.breadcrumbCurrent} aria-current="page">{crumb.label}</span>
                ) : (
                  <>
                    <Link href={crumb.href} className={styles.breadcrumbLink}>{crumb.label}</Link>
                    <span className={styles.separator} aria-hidden="true">/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      {readingTime !== undefined && (
        <span className={styles.readingTime}>{readingTime} min read</span>
      )}
    </div>
  );
}
