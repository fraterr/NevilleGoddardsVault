// Generates the build-time data files consumed by the client:
//   public/tree.json         - slim vault tree for the sidebar
//   public/search-index.json - plain-text search index
// Runs automatically via the `predev` / `prebuild` npm scripts.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = path.join(root, 'content');
const publicDir = path.join(root, 'public');
const metadataPath = path.join(root, 'src', 'data', 'metadata.json');

// Must stay in sync with EXCLUDED_TOP_LEVEL in src/lib/markdown.ts
const EXCLUDED_TOP_LEVEL = new Set(['kitrc.md', 'Context', 'Template', 'Handles']);

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

function stripFrontmatter(markdown) {
  return markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
}

function markdownToPlainText(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_`~|]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// ---------------------------------------------------------------------------
// Build the vault tree
// ---------------------------------------------------------------------------

function buildTree(dir, currentSlug = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const nodes = [];

  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    if (currentSlug.length === 0 && EXCLUDED_TOP_LEVEL.has(entry.name)) continue;

    const nameWithoutExt = entry.name.replace(/\.md$/, '');
    const nodeSlug = [...currentSlug, slugify(nameWithoutExt)];

    if (entry.isDirectory()) {
      const children = buildTree(path.join(dir, entry.name), nodeSlug).filter(
        child => !(child.type === 'file' && child.name === nameWithoutExt)
      );
      nodes.push({ name: entry.name, type: 'directory', slug: nodeSlug, children });
    } else if (entry.name.endsWith('.md')) {
      nodes.push({ name: nameWithoutExt, type: 'file', slug: nodeSlug });
    }
  }

  return nodes.sort((a, b) => {
    if (a.type !== b.type) return a.type === 'directory' ? -1 : 1;
    return a.name.localeCompare(b.name);
  });
}

// ---------------------------------------------------------------------------
// Build the search index
// ---------------------------------------------------------------------------

function loadMetadataMap() {
  const map = new Map();
  try {
    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
    for (const doc of metadata) {
      map.set(doc.slug.map(slugify).join('/'), doc);
    }
  } catch {
    console.warn('metadata.json not found or invalid; titles fall back to filenames');
  }
  return map;
}

function collectFiles(dir, currentSlug = [], acc = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    if (currentSlug.length === 0 && EXCLUDED_TOP_LEVEL.has(entry.name)) continue;

    const nameWithoutExt = entry.name.replace(/\.md$/, '');
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      collectFiles(fullPath, [...currentSlug, slugify(nameWithoutExt)], acc);
    } else if (entry.name.endsWith('.md')) {
      // A folder note (Books/Books.md) is indexed under the folder slug
      const parentName = path.basename(dir);
      const isFolderNote = nameWithoutExt === parentName;
      const slug = isFolderNote ? currentSlug : [...currentSlug, slugify(nameWithoutExt)];
      acc.push({ fullPath, name: nameWithoutExt, slug });
    }
  }
  return acc;
}

function buildSearchIndex() {
  const metadataMap = loadMetadataMap();
  const files = collectFiles(contentDir);
  const index = [];

  for (const file of files) {
    const raw = fs.readFileSync(file.fullPath, 'utf8');
    const text = markdownToPlainText(stripFrontmatter(raw)).toLowerCase();
    const meta = metadataMap.get(file.slug.join('/'));

    index.push({
      title: meta?.title || file.name,
      slug: file.slug,
      book: meta?.book || undefined,
      type: meta?.type || undefined,
      text,
    });
  }

  return index;
}

// ---------------------------------------------------------------------------

fs.mkdirSync(publicDir, { recursive: true });

const tree = buildTree(contentDir);
fs.writeFileSync(path.join(publicDir, 'tree.json'), JSON.stringify(tree));

const searchIndex = buildSearchIndex();
fs.writeFileSync(path.join(publicDir, 'search-index.json'), JSON.stringify(searchIndex));

const treeSize = fs.statSync(path.join(publicDir, 'tree.json')).size;
const indexSize = fs.statSync(path.join(publicDir, 'search-index.json')).size;
console.log(
  `Generated tree.json (${(treeSize / 1024).toFixed(0)} KB) and search-index.json (${(
    indexSize / 1024 / 1024
  ).toFixed(1)} MB) with ${searchIndex.length} documents`
);
