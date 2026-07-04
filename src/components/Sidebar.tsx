import Link from 'next/link';
import { getVaultTree, VaultNode } from '@/lib/markdown';
import SearchBar from './SearchBar';
import styles from './Sidebar.module.css';

// Premium SVG Icons inheriting currentColor
const HomeIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const FolderIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
  </svg>
);

const FileIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
  </svg>
);

const BibleIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
    <path d="M6 6h10" />
    <path d="M6 10h10" />
    <path d="M6 14h10" />
  </svg>
);

const TopicsIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="9" rx="1" />
    <rect x="14" y="3" width="7" height="5" rx="1" />
    <rect x="14" y="12" width="7" height="9" rx="1" />
    <rect x="3" y="16" width="7" height="5" rx="1" />
  </svg>
);

const KeywordsIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2H2v10l9.29 9.29c.39.39 1.02.39 1.41 0l7.59-7.59c.39-.39.39-1.02 0-1.41L12 2Z" />
    <path d="M7 7h.01" />
  </svg>
);

const GlossaryIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
    <path d="M10 6v10" />
    <path d="M7 10h6" />
  </svg>
);

export default function Sidebar() {
  const allTree = getVaultTree();
  
  const booksNode = allTree.find(node => node.name === 'Books');
  const lecturesNode = allTree.find(node => node.name === 'Lectures');
  const glossaryNode = allTree.find(node => node.name === 'Glossary');

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
          ☕ Buy me a tea
        </a>
      </div>
      
      <nav className={styles.nav}>
        {/* Section 1: Main Overview */}
        <div className={styles.section}>
          <h3 className={styles.sectionHeader}>Main</h3>
          <ul className={styles.sectionList}>
            <li className={styles.fileNode}>
              <Link href="/" className={styles.fileLink}>
                <span className={styles.fileIcon}>{HomeIcon}</span> Home
              </Link>
            </li>
          </ul>
        </div>

        {/* Section 2: Vault Contents */}
        <div className={styles.section}>
          <h3 className={styles.sectionHeader}>Library</h3>
          <ul className={styles.sectionList}>
            {booksNode && <TreeNode node={booksNode} />}
            {lecturesNode && <TreeNode node={lecturesNode} />}
          </ul>
        </div>

        {/* Section 3: Index Browsers */}
        <div className={styles.section}>
          <h3 className={styles.sectionHeader}>Explore</h3>
          <ul className={styles.sectionList}>
            <li className={styles.fileNode}>
              <Link href="/search/bible-references" className={styles.fileLink}>
                <span className={styles.fileIcon}>{BibleIcon}</span> Bible References
              </Link>
            </li>
            <li className={styles.fileNode}>
              <Link href="/search/topics" className={styles.fileLink}>
                <span className={styles.fileIcon}>{TopicsIcon}</span> Topics
              </Link>
            </li>
            <li className={styles.fileNode}>
              <Link href="/search/keywords" className={styles.fileLink}>
                <span className={styles.fileIcon}>{KeywordsIcon}</span> Keywords
              </Link>
            </li>
            {glossaryNode && (
              <li className={styles.fileNode}>
                <Link href="/glossary" className={styles.fileLink}>
                  <span className={styles.fileIcon}>{GlossaryIcon}</span> Glossary
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </aside>
  );
}

function TreeNode({ node, depth = 0 }: { node: VaultNode; depth?: number }) {
  const isDir = node.type === 'directory';
  const paddingLeft = `${depth * 0.75}rem`;

  if (isDir) {
    return (
      <li className={styles.dirNode}>
        <details className={styles.detailsGroup}>
          <summary className={styles.dirLabel} style={{ paddingLeft }}>
            <div className={styles.dirLink}>
              <span className={styles.folderIcon}>{FolderIcon}</span> {node.name}
            </div>
          </summary>
          {node.children && node.children.length > 0 && (
            <ul className={styles.treeList}>
              {node.children.map(child => (
                <TreeNode key={child.path} node={child} depth={depth + 1} />
              ))}
            </ul>
          )}
        </details>
      </li>
    );
  }

  const slugPath = node.slug.join('/').toLowerCase();
  const href = slugPath === 'index' ? '/' : `/${node.slug.join('/')}`;
  
  return (
    <li className={styles.fileNode} style={{ paddingLeft }}>
      <Link href={href} className={styles.fileLink}>
        <span className={styles.fileIcon}>{FileIcon}</span> {node.name}
      </Link>
    </li>
  );
}
