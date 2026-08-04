'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BASE_PATH } from '@/lib/config';
import SearchBar from './SearchBar';
import styles from './Sidebar.module.css';

// Slim tree node shape produced by scripts/generate-static-data.mjs
interface TreeNodeData {
  name: string;
  type: 'file' | 'directory';
  slug: string[];
  children?: TreeNodeData[];
}

// Module-level cache: the tree is fetched once per hard page load, and the
// sidebar lives in the root layout so it survives client-side navigation.
let treePromise: Promise<TreeNodeData[]> | null = null;

function loadTree(): Promise<TreeNodeData[]> {
  if (!treePromise) {
    treePromise = fetch(`${BASE_PATH}/tree.json`)
      .then(res => (res.ok ? res.json() : []))
      .catch(() => []);
  }
  return treePromise;
}

// Premium SVG Icons inheriting currentColor
const HomeIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const FolderIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
  </svg>
);

const FileIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
  </svg>
);

const BibleIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
    <path d="M6 6h10" />
    <path d="M6 10h10" />
    <path d="M6 14h10" />
  </svg>
);

const TopicsIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="7" height="9" rx="1" />
    <rect x="14" y="3" width="7" height="5" rx="1" />
    <rect x="14" y="12" width="7" height="9" rx="1" />
    <rect x="3" y="16" width="7" height="5" rx="1" />
  </svg>
);

const KeywordsIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2H2v10l9.29 9.29c.39.39 1.02.39 1.41 0l7.59-7.59c.39-.39.39-1.02 0-1.41L12 2Z" />
    <path d="M7 7h.01" />
  </svg>
);

const GlossaryIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
    <path d="M10 6v10" />
    <path d="M7 10h6" />
  </svg>
);

const DiceIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M8 8h.01" />
    <path d="M16 8h.01" />
    <path d="M8 16h.01" />
    <path d="M16 16h.01" />
    <path d="M12 12h.01" />
  </svg>
);

/** Normalize a pathname for comparison: no trailing slash, lowercase. */
function normalizePath(p: string): string {
  const noTrailing = p.length > 1 && p.endsWith('/') ? p.slice(0, -1) : p;
  return noTrailing.toLowerCase() || '/';
}

export default function Sidebar() {
  const [tree, setTree] = useState<TreeNodeData[]>([]);
  const pathname = normalizePath(usePathname() || '/');

  useEffect(() => {
    let cancelled = false;
    loadTree().then(data => {
      if (!cancelled) setTree(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const booksNode = tree.find(node => node.name === 'Books');
  const lecturesNode = tree.find(node => node.name === 'Lectures');

  const linkClass = (href: string) =>
    `${styles.fileLink} ${pathname === normalizePath(href) ? styles.activeLink : ''}`;

  return (
    <aside className={`${styles.sidebar} glass`}>
      <div className={styles.header}>
        <Link href="/" className={styles.titleLink}>
          <h1 className={styles.title}>Neville Goddard&apos;s Vault</h1>
        </Link>
        <SearchBar />
        <a
          href="https://buymeacoffee.com/practicalhumanism"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.teaButton}
        >
          <span aria-hidden="true">☕</span> Buy me a tea
        </a>
      </div>

      <nav className={styles.nav} aria-label="Vault navigation">
        {/* Section 1: Main Overview */}
        <div className={styles.section}>
          <h3 className={styles.sectionHeader}>Main</h3>
          <ul className={styles.sectionList}>
            <li className={styles.fileNode}>
              <Link href="/" className={linkClass('/')}>
                <span className={styles.fileIcon}>{HomeIcon}</span> Home
              </Link>
            </li>
          </ul>
        </div>

        {/* Section 2: Vault Contents */}
        <div className={styles.section}>
          <h3 className={styles.sectionHeader}>Library</h3>
          <ul className={styles.sectionList}>
            {booksNode && <TreeNode node={booksNode} pathname={pathname} />}
            {lecturesNode && <TreeNode node={lecturesNode} pathname={pathname} />}
          </ul>
        </div>

        {/* Section 3: Index Browsers */}
        <div className={styles.section}>
          <h3 className={styles.sectionHeader}>Explore</h3>
          <ul className={styles.sectionList}>
            <li className={styles.fileNode}>
              <Link href="/search/bible-references" className={linkClass('/search/bible-references')}>
                <span className={styles.fileIcon}>{BibleIcon}</span> Bible References
              </Link>
            </li>
            <li className={styles.fileNode}>
              <Link href="/search/topics" className={linkClass('/search/topics')}>
                <span className={styles.fileIcon}>{TopicsIcon}</span> Topics
              </Link>
            </li>
            <li className={styles.fileNode}>
              <Link href="/search/keywords" className={linkClass('/search/keywords')}>
                <span className={styles.fileIcon}>{KeywordsIcon}</span> Keywords
              </Link>
            </li>
            <li className={styles.fileNode}>
              <Link href="/glossary" className={linkClass('/glossary')}>
                <span className={styles.fileIcon}>{GlossaryIcon}</span> Glossary
              </Link>
            </li>
            <li className={styles.fileNode}>
              <Link href="/random" className={linkClass('/random')}>
                <span className={styles.fileIcon}>{DiceIcon}</span> Random Lecture
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
}

function TreeNode({ node, pathname, depth = 0 }: { node: TreeNodeData; pathname: string; depth?: number }) {
  const isDir = node.type === 'directory';
  const paddingLeft = `${depth * 0.75}rem`;

  const slugPath = node.slug.join('/').toLowerCase();
  const href = slugPath === 'index' ? '/' : `/${node.slug.join('/')}`;
  const isActive = pathname === normalizePath(href);
  const containsActive = pathname === `/${slugPath}` || pathname.startsWith(`/${slugPath}/`);

  if (isDir) {
    return (
      <li className={styles.dirNode}>
        <details className={styles.detailsGroup} open={containsActive || undefined}>
          <summary className={styles.dirLabel} style={{ paddingLeft }}>
            <div className={styles.dirLink}>
              <span className={styles.folderIcon}>{FolderIcon}</span> {node.name}
            </div>
          </summary>
          {node.children && node.children.length > 0 && (
            <ul className={styles.treeList}>
              {node.children.map(child => (
                <TreeNode key={child.slug.join('/')} node={child} pathname={pathname} depth={depth + 1} />
              ))}
            </ul>
          )}
        </details>
      </li>
    );
  }

  return (
    <li className={styles.fileNode} style={{ paddingLeft }}>
      <Link
        href={href}
        className={`${styles.fileLink} ${isActive ? styles.activeLink : ''}`}
        aria-current={isActive ? 'page' : undefined}
      >
        <span className={styles.fileIcon}>{FileIcon}</span> {node.name}
      </Link>
    </li>
  );
}
