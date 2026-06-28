import Link from 'next/link';
import Image from 'next/image';
import { getVaultTree, VaultNode } from '@/lib/markdown';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  const allTree = getVaultTree();
  
  // Only show crucial pages in the root of the sidebar
  const allowedRootItems = ['Index', 'Glossary', 'Books', 'Lectures'];
  const tree = allTree.filter(node => allowedRootItems.includes(node.name));

  return (
    <aside className={`${styles.sidebar} glass`}>
      <div className={styles.header}>
        <h1 className={styles.title}>Neville Goddard's Vault</h1>
        <p className={styles.subtitle}>Awaken Your Imagination</p>
        <div className={styles.logoContainer}>
          <Image 
            src="/images/logo.png" 
            alt="Neville Goddard" 
            width={120} 
            height={120} 
            className={styles.logo}
            priority
          />
        </div>
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
        <ul className={styles.treeList}>
          {tree.map(node => (
            <TreeNode key={node.path} node={node} />
          ))}
        </ul>
      </nav>
    </aside>
  );
}

function TreeNode({ node, depth = 0 }: { node: VaultNode; depth?: number }) {
  const isDir = node.type === 'directory';
  const paddingLeft = `${depth * 1}rem`;

  if (isDir) {
    const href = `/${node.slug.join('/')}`;
    return (
      <li className={styles.dirNode}>
        <details className={styles.detailsGroup}>
          <summary className={styles.dirLabel} style={{ paddingLeft }}>
            <div className={styles.dirLink}>
              <span className={styles.folderIcon}>📁</span> {node.name}
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

  const href = `/${node.slug.join('/')}`;
  
  return (
    <li className={styles.fileNode} style={{ paddingLeft }}>
      <Link href={href} className={styles.fileLink}>
        <span className={styles.fileIcon}>📄</span> {node.name}
      </Link>
    </li>
  );
}
