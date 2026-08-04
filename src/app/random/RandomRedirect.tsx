'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BASE_PATH } from '@/lib/config';

interface TreeNodeData {
  name: string;
  type: 'file' | 'directory';
  slug: string[];
  children?: TreeNodeData[];
}

function collectFiles(nodes: TreeNodeData[], acc: TreeNodeData[] = []): TreeNodeData[] {
  for (const node of nodes) {
    if (node.type === 'file') acc.push(node);
    if (node.children) collectFiles(node.children, acc);
  }
  return acc;
}

export default function RandomRedirect() {
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;

    fetch(`${BASE_PATH}/tree.json`)
      .then(res => res.json())
      .then((tree: TreeNodeData[]) => {
        if (cancelled) return;
        const lecturesNode = tree.find(n => n.name === 'Lectures');
        const pool = lecturesNode ? collectFiles(lecturesNode.children ?? []) : [];
        if (pool.length === 0) {
          router.replace('/lectures');
          return;
        }
        const pick = pool[Math.floor(Math.random() * pool.length)];
        router.replace(`/${pick.slug.join('/')}`);
      })
      .catch(() => router.replace('/lectures'));

    return () => {
      cancelled = true;
    };
  }, [router]);

  return (
    <div className="glass animate-fade-in" style={{ padding: '3rem', borderRadius: '16px', textAlign: 'center' }}>
      <h1 style={{ fontFamily: 'var(--font-reading)', color: 'var(--accent-gold)', marginBottom: '0.75rem' }}>
        Opening a random lecture…
      </h1>
      <p style={{ color: 'var(--text-secondary)' }}>Let the vault choose for you.</p>
    </div>
  );
}
