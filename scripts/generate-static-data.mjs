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
    // Original case is kept so the client can show snippets; the client
    // lowercases (and caches) per entry for matching.
    const text = markdownToPlainText(stripFrontmatter(raw));
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
// Build the related-documents map (TF-IDF cosine similarity over full text).
// Written to src/data/related.json and read server-side at build time.
// ---------------------------------------------------------------------------

const STOPWORDS = new Set(
  ('the and for that you your not with this are was but all have has had they them their what when where which who whom '
    + 'from into upon then than can could would should will shall may might must been being were his her him she our out '
    + 'now one two three there here because about just like only also very more most much many some any every each other '
    + 'these those said says say does did doing done how why yes not too own same such over under again once through '
    + 'against between himself herself itself themselves yourself myself man men day today let get got make made take took '
    + 'know knew see saw seen come came went going want wanted tell told think thought feel felt look looked back well '
    + 'even ever never always still yet within without before after while until during first last new old great little').split(' ')
);

function buildRelatedMap(indexEntries) {
  const N = indexEntries.length;

  // Term frequencies per doc + document frequency per term
  const docTerms = [];
  const df = new Map();
  for (const entry of indexEntries) {
    const tf = new Map();
    const words = entry.text.toLowerCase().match(/[a-z]{3,}/g) ?? [];
    for (const w of words) {
      if (STOPWORDS.has(w)) continue;
      tf.set(w, (tf.get(w) ?? 0) + 1);
    }
    for (const term of tf.keys()) df.set(term, (df.get(term) ?? 0) + 1);
    docTerms.push(tf);
  }

  // Keep the top 60 tf-idf terms per doc, drop ubiquitous/singleton terms
  const vectors = docTerms.map(tf => {
    const weighted = [];
    for (const [term, count] of tf) {
      const d = df.get(term);
      if (d < 2 || d > N * 0.5) continue;
      weighted.push([term, count * Math.log(N / d)]);
    }
    weighted.sort((a, b) => b[1] - a[1]);
    const top = weighted.slice(0, 60);
    const norm = Math.sqrt(top.reduce((s, [, w]) => s + w * w, 0)) || 1;
    return new Map(top.map(([term, w]) => [term, w / norm]));
  });

  // Inverted index for sparse dot products
  const inverted = new Map();
  vectors.forEach((vec, i) => {
    for (const [term, w] of vec) {
      let postings = inverted.get(term);
      if (!postings) inverted.set(term, (postings = []));
      postings.push([i, w]);
    }
  });

  const related = {};
  for (let i = 0; i < N; i++) {
    const scores = new Map();
    for (const [term, w] of vectors[i]) {
      for (const [j, wj] of inverted.get(term)) {
        if (j !== i) scores.set(j, (scores.get(j) ?? 0) + w * wj);
      }
    }

    const ranked = [...scores.entries()].sort((a, b) => b[1] - a[1]);
    const picks = [];
    const perBook = new Map();
    for (const [j, score] of ranked) {
      if (score < 0.05 || picks.length >= 5) break;
      const cand = indexEntries[j];
      // Cap same-book results so chapters don't only point at their neighbors
      // (which prev/next already covers)
      if (cand.book) {
        const used = perBook.get(cand.book) ?? 0;
        if (used >= 2) continue;
        perBook.set(cand.book, used + 1);
      }
      picks.push({ title: cand.title, slug: cand.slug, book: cand.book ?? null, type: cand.type ?? null });
    }
    if (picks.length > 0) related[indexEntries[i].slug.join('/')] = picks;
  }

  return related;
}

// ---------------------------------------------------------------------------

fs.mkdirSync(publicDir, { recursive: true });

const tree = buildTree(contentDir);
fs.writeFileSync(path.join(publicDir, 'tree.json'), JSON.stringify(tree));

const searchIndex = buildSearchIndex();
fs.writeFileSync(path.join(publicDir, 'search-index.json'), JSON.stringify(searchIndex));

const relatedMap = buildRelatedMap(searchIndex);
fs.writeFileSync(path.join(root, 'src', 'data', 'related.json'), JSON.stringify(relatedMap));

const treeSize = fs.statSync(path.join(publicDir, 'tree.json')).size;
const indexSize = fs.statSync(path.join(publicDir, 'search-index.json')).size;
console.log(
  `Generated tree.json (${(treeSize / 1024).toFixed(0)} KB), search-index.json (${(
    indexSize / 1024 / 1024
  ).toFixed(1)} MB) and related.json (${Object.keys(relatedMap).length} docs)`
);
