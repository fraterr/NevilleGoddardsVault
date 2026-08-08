import type { Metadata } from 'next';
import MyNotesList from '@/components/MyNotesList';
import styles from '@/components/Techniques.module.css';

export const metadata: Metadata = {
  title: 'My Notes',
  description: 'Your private highlights and notes on the vault texts — stored only in this browser.',
  robots: { index: false },
};

export default function MyNotesPage() {
  return (
    <article className="glass animate-fade-in" style={{ padding: '3rem', borderRadius: '16px', overflow: 'hidden' }}>
      <h1 className={styles.pageTitle}>My Notes</h1>
      <p className={styles.tagline}>
        Every passage you highlight and every note you write, collected here — your private study
        notebook on the vault.
      </p>

      <p className={styles.sectionIntro}>
        To annotate: open any book or lecture, select a passage, and choose <strong>Highlight</strong> or{' '}
        <strong>Note</strong>. Click a highlighted passage to edit or remove it.
      </p>

      <MyNotesList />

      <p className={styles.note}>
        Notes are saved only in this browser&apos;s local storage — they never leave your device.
        That also means clearing site data (or switching browser/device) loses them: use{' '}
        <strong>Export backup</strong> regularly, and Import to restore or move your notes.
      </p>
    </article>
  );
}
