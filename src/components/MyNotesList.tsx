'use client';

import { useMemo, useRef, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import {
  Annotation,
  loadAnnotations,
  saveAnnotations,
  exportAnnotationsJson,
  importAnnotationsJson,
} from '@/lib/annotations';
import styles from './MyNotesList.module.css';

const noopSubscribe = () => () => {};
function useHydrated(): boolean {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}

export default function MyNotesList() {
  const hydrated = useHydrated();
  const [stored, setStored] = useState<Annotation[]>(() =>
    typeof window === 'undefined' ? [] : loadAnnotations()
  );
  const [message, setMessage] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const annotations = useMemo(() => (hydrated ? stored : []), [hydrated, stored]);

  const groups = useMemo(() => {
    const bySlug = new Map<string, { docTitle: string; items: Annotation[] }>();
    for (const ann of annotations) {
      let group = bySlug.get(ann.slug);
      if (!group) {
        group = { docTitle: ann.docTitle || ann.slug, items: [] };
        bySlug.set(ann.slug, group);
      }
      group.items.push(ann);
    }
    for (const group of bySlug.values()) {
      group.items.sort((a, b) => b.created - a.created);
    }
    return [...bySlug.entries()].sort(
      (a, b) => Math.max(...b[1].items.map(i => i.created)) - Math.max(...a[1].items.map(i => i.created))
    );
  }, [annotations]);

  const remove = (id: string) => {
    const next = loadAnnotations().filter(a => a.id !== id);
    saveAnnotations(next);
    setStored(next);
  };

  const doExport = () => {
    const blob = new Blob([exportAnnotationsJson()], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'neville-vault-notes-backup.json';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const doImport = async (file: File) => {
    try {
      const { added, total } = importAnnotationsJson(await file.text());
      setStored(loadAnnotations());
      setMessage(`Imported ${added} new ${added === 1 ? 'annotation' : 'annotations'} (${total} total).`);
    } catch {
      setMessage('That file does not look like a notes backup.');
    }
  };

  return (
    <div>
      <div className={styles.actions}>
        <button className={styles.actionBtn} onClick={doExport} disabled={annotations.length === 0}>
          Export backup
        </button>
        <button className={styles.actionBtn} onClick={() => fileRef.current?.click()}>
          Import backup
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          hidden
          onChange={e => {
            const f = e.target.files?.[0];
            if (f) doImport(f);
            e.target.value = '';
          }}
        />
        <span className={styles.count} suppressHydrationWarning>
          {annotations.length} {annotations.length === 1 ? 'annotation' : 'annotations'}
        </span>
      </div>

      {message && <p className={styles.message} aria-live="polite">{message}</p>}

      {hydrated && annotations.length === 0 && (
        <div className={styles.empty}>
          <p>No notes yet.</p>
          <p>
            Open a <Link href="/books">book</Link> or <Link href="/lectures">lecture</Link>, select a
            passage that speaks to you, and press <strong>Highlight</strong> — it will appear here.
          </p>
        </div>
      )}

      {groups.map(([slug, group]) => (
        <section key={slug} className={styles.group}>
          <h2 className={styles.groupTitle}>
            <Link href={slug}>{group.docTitle}</Link>
            <span className={styles.groupCount}>{group.items.length}</span>
          </h2>
          <ul className={styles.list}>
            {group.items.map(ann => (
              <li key={ann.id} className={styles.item}>
                <blockquote className={styles.quote}>&ldquo;{ann.exact}&rdquo;</blockquote>
                {ann.note.trim() && <p className={styles.noteText}>{ann.note}</p>}
                <div className={styles.itemMeta}>
                  <span className={styles.date} suppressHydrationWarning>
                    {new Date(ann.created).toLocaleDateString()}
                  </span>
                  <span className={styles.itemActions}>
                    <Link href={`${ann.slug}?ann=${ann.id}`} className={styles.openLink}>
                      Open in text →
                    </Link>
                    <button className={styles.removeBtn} onClick={() => remove(ann.id)}>
                      Remove
                    </button>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
