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

// Load metadata safely
let cachedMetadata: DocMetadata[] = [];
try {
  if (fs.existsSync(metadataPath)) {
    cachedMetadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
  }
} catch (e) {
  console.error("Error reading metadata.json:", e);
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
      const children = buildVaultTree(fullPath, [...currentSlug, entry.name]);
      
      // Filter out duplicate folder note files from children list
      const filteredChildren = children.filter(child => {
        return !(child.type === 'file' && child.name === entry.name);
      });

      nodes.push({
        name: entry.name,
        type: 'directory',
        path: fullPath,
        slug: [...currentSlug, entry.name],
        children: filteredChildren
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
      const hasFrom = doc.slug.some(s => s.toLowerCase() === fromVal);
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
    // Default alphabetical sort
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
    const pageLink = `[${doc.title}](/${doc.slug.join('/')})`;
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
  const dirPath = path.join(contentDirectory, ...slug);
  const isDir = fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
  
  let content = '';
  let frontmatter: Record<string, any> = {};
  let resolvedPath = '';

  if (isDir) {
    // First check for a folder note matching folder name (e.g. Feeling is the Secret.md)
    const folderNotePath = path.join(dirPath, slug[slug.length - 1] + '.md');
    if (fs.existsSync(folderNotePath)) {
      const fileContents = fs.readFileSync(folderNotePath, 'utf8');
      const parsed = matter(fileContents);
      content = parsed.content;
      frontmatter = parsed.data;
      resolvedPath = folderNotePath;
    } else {
      // Default TOC if no folder note
      content = `# ${slug[slug.length - 1]}`;
    }

    // Build directory Table of Contents
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    const links: string[] = [];
    
    for (const entry of entries) {
      if (entry.name.startsWith('.')) continue;
      // Skip the folder note file itself
      if (entry.name === slug[slug.length - 1] + '.md') continue;
      
      const nameWithoutExt = entry.name.replace(/\.md$/, '');
      if (entry.isDirectory()) {
        links.push(`- 📁 **[${nameWithoutExt}](/${slug.join('/')}/${nameWithoutExt})**`);
      } else if (entry.name.endsWith('.md')) {
        links.push(`- 📄 [${nameWithoutExt}](/${slug.join('/')}/${nameWithoutExt})`);
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
      // Replace dataview blocks with empty space if they exist in the folder note
      content = content.replace(/```dataview[\s\S]*?```/g, '');
      content = content.trim() + '\n\n## Content\n' + links.join('\n');
    }
  } else {
    // Try exact file path
    let fileFullPath = path.join(contentDirectory, ...slug) + '.md';
    if (!fs.existsSync(fileFullPath)) {
      const allFiles = getAllFiles(contentDirectory);
      const targetName = slug[slug.length - 1] + '.md';
      const foundFile = allFiles.find(f => f.endsWith(targetName));
      if (foundFile) {
        fileFullPath = foundFile;
      } else {
        return null;
      }
    }
    
    const fileContents = fs.readFileSync(fileFullPath, 'utf8');
    const parsed = matter(fileContents);
    content = parsed.content;
    frontmatter = parsed.data;
    resolvedPath = fileFullPath;
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
    const slugPath = relPath.replace(/\.md$/, '').replace(/\\/g, '/');
    return `/${slugPath}`;
  }
  
  return `/${target.replace(/\s+/g, '-')}`;
}
