// Check the actual static export, not just the metadata source code.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'out');
const sitemap = fs.readFileSync(path.join(out, 'sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
const errors = [];
const warnings = [];
const titles = new Map();
const attrs = tag => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map(m => [m[1], m[2]]));
const fileFor = url => path.join(out, decodeURIComponent(new URL(url).pathname), 'index.html');
if (new Set(urls).size !== urls.length) errors.push('Duplicate sitemap URLs');
for (const url of urls) {
  const file = fileFor(url);
  if (!fs.existsSync(file)) { errors.push(`Missing export: ${url}`); continue; }
  const html = fs.readFileSync(file, 'utf8');
  const links = [...html.matchAll(/<link\b[^>]*>/g)].map(m => attrs(m[0]));
  const meta = [...html.matchAll(/<meta\b[^>]*>/g)].map(m => attrs(m[0]));
  const canonical = links.filter(link => link.rel === 'canonical');
  if (canonical.length !== 1 || canonical[0].href !== url) errors.push(`Canonical mismatch: ${url}`);
  if (meta.some(m => m.name === 'robots' && m.content?.includes('noindex'))) errors.push(`Noindex in sitemap: ${url}`);
  if (!meta.some(m => m.name === 'description' && m.content?.trim())) errors.push(`Missing description: ${url}`);
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  if (!title) errors.push(`Missing title: ${url}`);
  else if (titles.has(title)) warnings.push(`Duplicate title: ${url} and ${titles.get(title)}`);
  else titles.set(title, url);
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] || '';
  if (!/<h1\b/.test(main)) warnings.push(`No main H1: ${url}`);
  for (const match of main.matchAll(/<a\b[^>]*>/g)) {
    const href = attrs(match[0]).href;
    if (!href || /^(mailto:|tel:|#)/.test(href)) continue;
    const target = new URL(href.replaceAll('&amp;', '&'), url);
    if (target.origin !== new URL(url).origin) continue;
    const targetPath = path.join(out, decodeURIComponent(target.pathname));
    if (!fs.existsSync(targetPath) && !fs.existsSync(`${targetPath}.html`)) {
      warnings.push(`Broken internal link: ${url} -> ${target.pathname}`);
    }
  }
  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(match[1]); } catch { errors.push(`Invalid JSON-LD: ${url}`); }
  }
}
const aliasFile = path.join(out, 'index', 'index.html');
if (fs.existsSync(aliasFile)) {
  const alias = fs.readFileSync(aliasFile, 'utf8');
  if (!alias.includes(`rel="canonical" href="${new URL('/', urls[0]).href}"`)) errors.push('Home alias has wrong canonical');
}
const report = { pages: urls.length, errors, warnings: [...new Set(warnings)] };
fs.mkdirSync(path.join(root, 'reports'), { recursive: true });
fs.writeFileSync(path.join(root, 'reports', 'seo-audit.json'), JSON.stringify(report, null, 2) + '\n');
console.log(`SEO audit: ${report.pages} sitemap pages, ${errors.length} errors, ${report.warnings.length} warnings. See reports/seo-audit.json.`);
errors.forEach(error => console.error(error));
if (errors.length) process.exitCode = 1;
