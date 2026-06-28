import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export interface VaultNode {
  name: string;
  type: 'file' | 'directory';
  path: string;
  slug: string[];
  children?: VaultNode[];
}

export interface MarkdownDocument {
  content: string;
  frontmatter: Record<string, any>;
  slug: string[];
}

function buildVaultTree(dir: string, currentSlug: string[] = []): VaultNode[] {
  if (!fs.existsSync(dir)) return [];
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const nodes: VaultNode[] = [];

  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue; // skip hidden files like .DS_Store
    
    const fullPath = path.join(dir, entry.name);
    const isDirectory = entry.isDirectory();
    
    if (isDirectory) {
      nodes.push({
        name: entry.name,
        type: 'directory',
        path: fullPath,
        slug: [...currentSlug, entry.name],
        children: buildVaultTree(fullPath, [...currentSlug, entry.name])
      });
    } else if (entry.name.endsWith('.md')) {
      const nameWithoutExt = entry.name.replace(/\.md$/, '');
      nodes.push({
        name: nameWithoutExt,
        type: 'file',
        path: fullPath,
        slug: [...currentSlug, nameWithoutExt],
      });
    }
  }

  // Sort: directories first, then alphabetically
  return nodes.sort((a, b) => {
    if (a.type !== b.type) return a.type === 'directory' ? -1 : 1;
    return a.name.localeCompare(b.name);
  });
}

export function getVaultTree(): VaultNode[] {
  return buildVaultTree(contentDirectory);
}

export function getDocumentBySlug(slug: string[]): MarkdownDocument | null {
  // First, try exact file path
  let fullPath = path.join(contentDirectory, ...slug) + '.md';
  
  if (!fs.existsSync(fullPath)) {
    // Also check if it corresponds to an index or exact name inside a folder if needed
    // In obsidian vaults, wikilinks often don't have folders attached.
    // E.g., [[Awakened Imagination]] could be anywhere.
    // For now we'll rely on the exact path or a global search if we want to handle flat wikilinks.
    const allFiles = getAllFiles(contentDirectory);
    const targetName = slug[slug.length - 1] + '.md';
    const foundFile = allFiles.find(f => f.endsWith(targetName));
    if (foundFile) {
      fullPath = foundFile;
    } else {
      return null;
    }
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    content,
    frontmatter: data,
    slug,
  };
}

function getAllFiles(dir: string, fileList: string[] = []): string[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getAllFiles(fullPath, fileList);
    } else if (entry.name.endsWith('.md')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

export function resolveWikilink(linkName: string): string {
  // A simple resolver for wikilinks
  // If the link contains a pipe [[Link|Alias]], extract the first part
  const target = linkName.split('|')[0];
  
  // Find the file in the vault to build a proper URL
  const allFiles = getAllFiles(contentDirectory);
  const found = allFiles.find(f => f.endsWith(target + '.md'));
  
  if (found) {
    const relPath = path.relative(contentDirectory, found);
    const slugPath = relPath.replace(/\.md$/, '').replace(/\\/g, '/');
    return `/${slugPath}`;
  }
  
  return `/${target.replace(/\s+/g, '-')}`;
}
