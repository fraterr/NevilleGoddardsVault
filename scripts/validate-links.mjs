// Validates every internal href in src/data/techniques.ts and
// src/data/startHere.ts against the generated vault tree, so guide links can
// never point at a missing document. Runs in prebuild after data generation.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const tree = JSON.parse(fs.readFileSync(path.join(root, 'public', 'tree.json'), 'utf8'));

// Collect all valid vault routes
const validRoutes = new Set(['/', '/start-here', '/techniques', '/random']);

function walk(nodes) {
  for (const node of nodes) {
    validRoutes.add('/' + node.slug.join('/'));
    if (node.children) walk(node.children);
  }
}
walk(tree);

// Technique guide routes are valid targets too
const techniquesSource = fs.readFileSync(path.join(root, 'src', 'data', 'techniques.ts'), 'utf8');
for (const match of techniquesSource.matchAll(/slug:\s*'([a-z0-9-]+)'/g)) {
  validRoutes.add('/techniques/' + match[1]);
}

// Extract every internal href from the two data files
const startHereSource = fs.readFileSync(path.join(root, 'src', 'data', 'startHere.ts'), 'utf8');
const sources = [
  ['techniques.ts', techniquesSource],
  ['startHere.ts', startHereSource],
];

let errors = 0;
let checked = 0;

for (const [name, source] of sources) {
  for (const match of source.matchAll(/href:\s*'([^']+)'/g)) {
    const href = match[1];
    if (!href.startsWith('/')) continue;
    const route = href.split('#')[0].replace(/\/$/, '') || '/';
    checked++;
    if (!validRoutes.has(route)) {
      console.error(`BROKEN LINK in ${name}: ${href}`);
      errors++;
    }
  }
}

if (errors > 0) {
  console.error(`\n${errors} broken link(s) found.`);
  process.exit(1);
}
console.log(`validate-links: all ${checked} internal links are valid`);
