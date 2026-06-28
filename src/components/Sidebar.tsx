import Link from 'next/link';
import { getVaultTree, VaultNode } from '@/lib/markdown';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  const tree = getVaultTree();

  return (
    <aside className={`${styles.sidebar} glass`}>
      <div className={styles.header}>
        <h1 className={styles.title}>Neville Goddard's Vault</h1>
        <p className={styles.subtitle}>Awaken Your Imagination</p>
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
    return (
      <li className={styles.dirNode}>
        <div className={styles.dirLabel} style={{ paddingLeft }}>
          <span className={styles.folderIcon}>📁</span> {node.name}
        </div>
        {node.children && node.children.length > 0 && (
          <ul className={styles.treeList}>
            {node.children.map(child => (
              <TreeNode key={child.path} node={child} depth={depth + 1} />
            ))}
          </ul>
        )}
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
