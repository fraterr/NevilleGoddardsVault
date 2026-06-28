import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');
const metadataPath = path.join(process.cwd(), 'src', 'data', 'metadata.json');

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

interface DocMetadata {
  title: string;
  slug: string[];
  book?: string;
  chapter?: string;
  type?: string;
  bible_ref?: string[];
  tags?: string[];
  topics?: string[];
  keywords?: string[];
}

// Slugify utility
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

// Helper to convert path parts to slugified URL path
export function slugifyParts(parts: string[]): string[] {
  return parts.map(slugify);
}

// Load metadata safely
let cachedMetadata: DocMetadata[] = [];
try {
  if (fs.existsSync(metadataPath)) {
    cachedMetadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
  }
} catch (e) {
  console.error("Error reading metadata.json:", e);
}

// Helper to resolve a slugified route back to the actual filesystem path
interface ResolvedPathInfo {
  fsPath: string;
  isDir: boolean;
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
  
  const isDir = fs.statSync(currentPath).isDirectory();
  return { fsPath: currentPath, isDir };
}

function buildVaultTree(dir: string, currentSlug: string[] = []): VaultNode[] {
  if (!fs.existsSync(dir)) return [];
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const nodes: VaultNode[] = [];

  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue; // skip hidden files like .DS_Store
    
    // Filter root level to only crucial pages
    if (currentSlug.length === 0) {
      const allowedRootItems = ['Index.md', 'Glossary.md', 'Books', 'Lectures'];
      if (!allowedRootItems.includes(entry.name)) {
        continue;
      }
    }
    
    const fullPath = path.join(dir, entry.name);
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
        children: filteredChildren
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

export function getVaultTree(): VaultNode[] {
  return buildVaultTree(contentDirectory);
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
  let filtered = cachedMetadata.filter(doc => {
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
  let frontmatter: Record<string, any> = {};

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
  const target = linkName.split('|')[0];
  const allFiles = getAllFiles(contentDirectory);
  const found = allFiles.find(f => f.endsWith(target + '.md'));
  
  if (found) {
    const relPath = path.relative(contentDirectory, found);
    const parts = relPath.replace(/\.md$/, '').split(path.sep);
    return `/${parts.map(slugify).join('/')}`;
  }
  
  return `/${slugify(target)}`;
}
