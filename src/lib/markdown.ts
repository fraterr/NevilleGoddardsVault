import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { slugify, slugifyParts } from './slug';

export { slugify, slugifyParts };

const contentDirectory = path.join(process.cwd(), 'content');
const metadataPath = path.join(process.cwd(), 'src', 'data', 'metadata.json');

// Internal folders/files (PublishKit and Obsidian leftovers) that must never be
// published as pages, listed by their top-level name inside content/.
const EXCLUDED_TOP_LEVEL = new Set(['kitrc.md', 'Context', 'Template', 'Handles']);

export interface VaultNode {
  name: string;
  type: 'file' | 'directory';
  path: string;
  slug: string[];
  children?: VaultNode[];
}

export interface MarkdownDocument {
  content: string;
  frontmatter: Record<string, unknown>;
  slug: string[];
  isDirectory: boolean;
}

export interface DocMetadata {
  title: string;
  slug: string[];
  book?: string | null;
  chapter?: string | null;
  type?: string;
  bible_ref?: string[];
  tags?: string[];
  topics?: string[];
  keywords?: string[];
}

// Load metadata safely
let cachedMetadata: DocMetadata[] = [];
try {
  if (fs.existsSync(metadataPath)) {
    cachedMetadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
  }
} catch (e) {
  console.error('Error reading metadata.json:', e);
}

export function getMetadata(): DocMetadata[] {
  return cachedMetadata;
}

/** Look up the document metadata entry matching a slugified route. */
export function getDocMetaBySlug(slug: string[]): DocMetadata | null {
  const target = slug.map(slugify).join('/');
  return (
    cachedMetadata.find(doc => doc.slug.map(slugify).join('/') === target) ?? null
  );
}

// Helper to resolve a slugified route back to the actual filesystem path
interface ResolvedPathInfo {
  fsPath: string;
  isDir: boolean;
}

function isExcluded(fsPath: string): boolean {
  const rel = path.relative(contentDirectory, fsPath);
  if (!rel || rel.startsWith('..')) return false;
  const topLevel = rel.split(path.sep)[0];
  return EXCLUDED_TOP_LEVEL.has(topLevel);
}

function resolveSlugToPath(slug: string[]): ResolvedPathInfo | null {
  let currentPath = contentDirectory;

  for (const slugPart of slug) {
    if (!fs.existsSync(currentPath)) return null;

    const entries = fs.readdirSync(currentPath);
    let found = false;

    for (const entry of entries) {
      if (entry.startsWith('.')) continue;

      const nameWithoutExt = entry.endsWith('.md') ? entry.slice(0, -3) : entry;
      if (slugify(nameWithoutExt) === slugPart) {
        currentPath = path.join(currentPath, entry);
        found = true;
        break;
      }
    }

    if (!found) return null;
  }

  if (isExcluded(currentPath)) return null;

  const isDir = fs.statSync(currentPath).isDirectory();
  return { fsPath: currentPath, isDir };
}

function buildVaultTree(dir: string, currentSlug: string[] = []): VaultNode[] {
  if (!fs.existsSync(dir)) return [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const nodes: VaultNode[] = [];

  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue; // skip hidden files like .DS_Store

    const fullPath = path.join(dir, entry.name);
    if (isExcluded(fullPath)) continue;

    const isDirectory = entry.isDirectory();
    const nameWithoutExt = entry.name.replace(/\.md$/, '');
    const nodeSlug = [...currentSlug, slugify(nameWithoutExt)];

    if (isDirectory) {
      const children = buildVaultTree(fullPath, nodeSlug);

      // Filter out duplicate folder note files from children list
      const filteredChildren = children.filter(child => {
        return !(child.type === 'file' && child.name === entry.name);
      });

      nodes.push({
        name: entry.name,
        type: 'directory',
        path: fullPath,
        slug: nodeSlug,
        children: filteredChildren,
      });
    } else if (entry.name.endsWith('.md')) {
      nodes.push({
        name: nameWithoutExt,
        type: 'file',
        path: fullPath,
        slug: nodeSlug,
      });
    }
  }

  // Sort: directories first, then alphabetically
  return nodes.sort((a, b) => {
    if (a.type !== b.type) return a.type === 'directory' ? -1 : 1;
    return a.name.localeCompare(b.name);
  });
}

let cachedTree: VaultNode[] | null = null;

export function getVaultTree(): VaultNode[] {
  if (!cachedTree) {
    cachedTree = buildVaultTree(contentDirectory);
  }
  return cachedTree;
}

/**
 * Depth-first list of all file nodes in reading order (as displayed in the
 * tree). Used to compute previous/next navigation between chapters/lectures.
 */
export interface AdjacentDocs {
  prev: { title: string; slug: string[] } | null;
  next: { title: string; slug: string[] } | null;
}

function flattenFiles(nodes: VaultNode[], acc: VaultNode[] = []): VaultNode[] {
  for (const node of nodes) {
    if (node.type === 'file') acc.push(node);
    if (node.children) flattenFiles(node.children, acc);
  }
  return acc;
}

export function getAdjacentDocs(slug: string[]): AdjacentDocs {
  const target = slug.map(slugify).join('/');
  const files = flattenFiles(getVaultTree());
  const index = files.findIndex(f => f.slug.join('/') === target);
  if (index === -1) return { prev: null, next: null };

  // Only link within the same section (same top-level folder) so a book's
  // last chapter doesn't point into an unrelated area.
  const section = files[index].slug[0];
  const prevNode = index > 0 && files[index - 1].slug[0] === section ? files[index - 1] : null;
  const nextNode =
    index < files.length - 1 && files[index + 1].slug[0] === section ? files[index + 1] : null;

  return {
    prev: prevNode ? { title: prevNode.name, slug: prevNode.slug } : null,
    next: nextNode ? { title: nextNode.name, slug: nextNode.slug } : null,
  };
}

function evaluateDataviewQuery(queryText: string): string {
  // Parse Dataview query
  const tableMatch = queryText.match(/TABLE\s+([\s\S]+?)(?:FROM|WHERE|SORT|$)/i);
  const fromMatch = queryText.match(/FROM\s+"([^"]+)"/i);
  const whereMatch = queryText.match(/WHERE\s+([\s\S]+?)(?:SORT|$)/i);
  const sortMatch = queryText.match(/SORT\s+([a-zA-Z_]+)\s+(ASC|DESC)/i);

  const columns: { field: string; header: string }[] = [];
  if (tableMatch) {
    const colParts = tableMatch[1].split(',');
    for (const part of colParts) {
      const cleanPart = part.trim();
      if (!cleanPart) continue;

      const asMatch = cleanPart.match(/^([a-zA-Z_]+)\s+AS\s+"([^"]+)"$/i);
      if (asMatch) {
        columns.push({ field: asMatch[1].toLowerCase(), header: asMatch[2] });
      } else {
        columns.push({ field: cleanPart.toLowerCase(), header: cleanPart.charAt(0).toUpperCase() + cleanPart.slice(1) });
      }
    }
  }

  const fromVal = fromMatch ? fromMatch[1].toLowerCase() : null;
  const whereClause = whereMatch ? whereMatch[1].trim() : null;
  const sort = sortMatch ? { field: sortMatch[1].toLowerCase(), order: sortMatch[2].toUpperCase() } : null;

  // Filter documents
  const filtered = cachedMetadata.filter(doc => {
    // FROM filter
    if (fromVal) {
      const hasFrom = doc.slug.map(slugify).some(s => s === fromVal);
      if (!hasFrom) return false;
    }

    // WHERE filter
    if (whereClause) {
      // 1. contains(field, "value")
      const containsMatch = whereClause.match(/contains\s*\(\s*([a-zA-Z_]+)\s*,\s*"([^"]+)"\s*\)/i);
      if (containsMatch) {
        const field = containsMatch[1].toLowerCase();
        const value = containsMatch[2].toLowerCase();
        const docVal = doc[field as keyof DocMetadata];
        if (Array.isArray(docVal)) {
          return docVal.some((v: string) => v.toLowerCase().includes(value));
        }
        if (typeof docVal === 'string') {
          return docVal.toLowerCase().includes(value);
        }
        return false;
      }

      // 2. field != null
      const notNullMatch = whereClause.match(/^([a-zA-Z_]+)\s*!=\s*null$/i);
      if (notNullMatch) {
        const field = notNullMatch[1].toLowerCase();
        const docVal = doc[field as keyof DocMetadata];
        if (Array.isArray(docVal)) return docVal.length > 0;
        return docVal !== null && docVal !== undefined && docVal !== '';
      }
    }

    return true;
  });

  // Sort documents
  if (sort) {
    filtered.sort((a, b) => {
      const field = sort.field as keyof DocMetadata;
      const aVal = String(a[field] || '');
      const bVal = String(b[field] || '');
      return sort.order === 'ASC' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    });
  } else {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  }

  if (filtered.length === 0) {
    return '_No matches found._';
  }

  // Generate Markdown Table
  const headers = ['Page', ...columns.map(c => c.header)];
  const separators = headers.map(() => '---');

  const rows: string[] = [];
  for (const doc of filtered) {
    const pageLink = `[${doc.title}](/${doc.slug.map(slugify).join('/')})`;
    const rowValues = [pageLink];

    for (const col of columns) {
      const field = col.field as keyof DocMetadata;
      const val = doc[field];
      if (Array.isArray(val)) {
        rowValues.push(val.join(', '));
      } else {
        rowValues.push(String(val || ''));
      }
    }
    rows.push(`| ${rowValues.join(' | ')} |`);
  }

  return `| ${headers.join(' | ')} |\n| ${separators.join(' | ')} |\n${rows.join('\n')}`;
}

export function getDocumentBySlug(slug: string[]): MarkdownDocument | null {
  const resolved = resolveSlugToPath(slug);
  if (!resolved) return null;

  const { fsPath, isDir } = resolved;
  let content = '';
  let frontmatter: Record<string, unknown> = {};

  if (isDir) {
    const folderName = path.basename(fsPath);
    const folderNotePath = path.join(fsPath, folderName + '.md');
    if (fs.existsSync(folderNotePath)) {
      const fileContents = fs.readFileSync(folderNotePath, 'utf8');
      const parsed = matter(fileContents);
      content = parsed.content;
      frontmatter = parsed.data;
    } else {
      content = `# ${folderName}`;
    }

    // Build directory Table of Contents
    const entries = fs.readdirSync(fsPath, { withFileTypes: true });
    const links: string[] = [];

    for (const entry of entries) {
      if (entry.name.startsWith('.')) continue;
      if (entry.name === folderName + '.md') continue;
      if (isExcluded(path.join(fsPath, entry.name))) continue;

      const nameWithoutExt = entry.name.replace(/\.md$/, '');
      const itemSlug = [...slug, slugify(nameWithoutExt)];

      if (entry.isDirectory()) {
        links.push(`- 📁 **[${nameWithoutExt}](/${itemSlug.join('/')})**`);
      } else if (entry.name.endsWith('.md')) {
        links.push(`- 📄 [${nameWithoutExt}](/${itemSlug.join('/')})`);
      }
    }

    // Sort links: directories first, then files
    links.sort((a, b) => {
      const aIsDir = a.includes('📁');
      const bIsDir = b.includes('📁');
      if (aIsDir !== bIsDir) return aIsDir ? -1 : 1;
      return a.localeCompare(b);
    });

    if (links.length > 0) {
      content = content.replace(/```dataview[\s\S]*?```/g, '');
      content = content.trim() + '\n\n## Content\n' + links.join('\n');
    }
  } else {
    const fileContents = fs.readFileSync(fsPath, 'utf8');
    const parsed = matter(fileContents);
    content = parsed.content;
    frontmatter = parsed.data;
  }

  // Parse and replace Dataview blocks dynamically
  content = content.replace(/```dataview([\s\S]*?)```/g, (match, query) => {
    return evaluateDataviewQuery(query);
  });

  return {
    content,
    frontmatter,
    slug,
    isDirectory: isDir,
  };
}

/** Display names (from actual folder/file names) for each prefix of a slug route. */
export function getBreadcrumbNames(slug: string[]): string[] {
  const names: string[] = [];
  let nodes = getVaultTree();

  for (const part of slug) {
    const match = nodes.find(n => n.slug[n.slug.length - 1] === part);
    if (!match) {
      names.push(part);
      nodes = [];
      continue;
    }
    names.push(match.name);
    nodes = match.children ?? [];
  }

  return names;
}

/** Strip markdown syntax to obtain plain text (for excerpts and search). */
export function markdownToPlainText(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ') // code blocks
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ') // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // links -> text
    .replace(/<[^>]+>/g, ' ') // html tags
    .replace(/[#>*_`~|-]+/g, ' ') // md punctuation
    .replace(/\s+/g, ' ')
    .trim();
}

/** First ~160 chars of readable text, for meta descriptions. */
export function getExcerpt(markdown: string, maxLength = 160): string {
  const plain = markdownToPlainText(markdown);
  if (plain.length <= maxLength) return plain;
  const cut = plain.slice(0, maxLength);
  return cut.slice(0, cut.lastIndexOf(' ')) + '…';
}

/** Estimated reading time in minutes (~220 words per minute). */
export function getReadingTimeMinutes(markdown: string): number {
  const words = markdownToPlainText(markdown).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

let cachedAllFiles: string[] | null = null;

function getAllFiles(dir: string, fileList: string[] = []): string[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    const fullPath = path.join(dir, entry.name);
    if (isExcluded(fullPath)) continue;
    if (entry.isDirectory()) {
      getAllFiles(fullPath, fileList);
    } else if (entry.name.endsWith('.md')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

export function resolveWikilink(linkName: string): string {
  const target = linkName.split('|')[0];
  if (!cachedAllFiles) {
    cachedAllFiles = getAllFiles(contentDirectory);
  }
  const found = cachedAllFiles.find(f => f.endsWith(target + '.md'));

  if (found) {
    const relPath = path.relative(contentDirectory, found);
    let parts = relPath.replace(/\.md$/, '').split(path.sep);
    if (parts.length >= 2 && parts[parts.length - 1].toLowerCase() === parts[parts.length - 2].toLowerCase()) {
      parts = parts.slice(0, -1);
    }
    return `/${parts.map(slugify).join('/')}`;
  }

  return `/${slugify(target)}`;
}
