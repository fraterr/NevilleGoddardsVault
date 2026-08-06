// Validates every internal href in the editorial data files (techniques,
// start-here path, book summaries) against the generated vault tree, so guide
// links can never point at a missing document. Runs in prebuild after data
// generation.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const tree = JSON.parse(fs.readFileSync(path.join(root, 'public', 'tree.json'), 'utf8'));

// Collect all valid vault routes
const validRoutes = new Set(['/', '/start-here', '/techniques', '/random', '/summaries', '/success-stories']);

function walk(nodes) {
  for (const node of nodes) {
    validRoutes.add('/' + node.slug.join('/'));
    if (node.children) walk(node.children);
  }
}
walk(tree);

function readData(name) {
  return fs.readFileSync(path.join(root, 'src', 'data', name), 'utf8');
}

// Editorial routes are valid targets too (top-level slug: entries per file)
const techniquesSource = readData('techniques.ts');
for (const match of techniquesSource.matchAll(/slug:\s*'([a-z0-9-]+)'/g)) {
  validRoutes.add('/techniques/' + match[1]);
}
const summariesSource = readData('bookSummaries.ts');
for (const match of summariesSource.matchAll(/slug:\s*'([a-z0-9-]+)'/g)) {
  validRoutes.add('/summaries/' + match[1]);
}

// Extract every internal href from the data files
const startHereSource = readData('startHere.ts');
const sources = [
  ['techniques.ts', techniquesSource],
  ['startHere.ts', startHereSource],
  ['bookSummaries.ts', summariesSource],
];

let errors = 0;
let checked = 0;

function check(name, href) {
  if (!href.startsWith('/')) return;
  const route = href.split('#')[0].replace(/\/$/, '') || '/';
  checked++;
  if (!validRoutes.has(route)) {
    console.error(`BROKEN LINK in ${name}: ${href}`);
    errors++;
  }
}

for (const [name, source] of sources) {
  // Literal hrefs
  for (const match of source.matchAll(/href:\s*'([^']+)'/g)) {
    check(name, match[1]);
  }

  // Helper-generated hrefs: `const poa = (n: number) => `/books/...-chapter-${n}`;`
  // expanded at each `href: poa(4)` call site
  const helpers = new Map();
  for (const def of source.matchAll(/const (\w+) = \(n: number\) => `([^`]*)\$\{n\}([^`]*)`/g)) {
    helpers.set(def[1], [def[2], def[3]]);
  }
  for (const call of source.matchAll(/href:\s*(\w+)\((\d+)\)/g)) {
    const helper = helpers.get(call[1]);
    if (helper) check(name, `${helper[0]}${call[2]}${helper[1]}`);
  }
}

if (errors > 0) {
  console.error(`\n${errors} broken link(s) found.`);
  process.exit(1);
}
console.log(`validate-links: all ${checked} internal links are valid`);
