import Link from 'next/link';
import { hrefForSlug } from '@/lib/slug';
import type { RelatedDoc } from '@/lib/markdown';
import styles from './RelatedDocs.module.css';

export default function RelatedDocs({ docs }: { docs: RelatedDoc[] }) {
  if (docs.length === 0) return null;

  return (
    <aside className={styles.wrapper} aria-label="Related documents">
      <h2 className={styles.heading}>Related in the vault</h2>
      <ul className={styles.list}>
        {docs.map(doc => (
          <li key={doc.slug.join('/')}>
            <Link href={hrefForSlug(doc.slug)} className={styles.card}>
              <span className={styles.cardTitle}>{doc.title}</span>
              <span className={styles.cardMeta}>
                {doc.book ? doc.book : doc.type === 'lecture' ? 'Lecture' : 'Document'}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
