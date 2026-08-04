// One-off utility: converts the PNG banners in public/images/banners to WebP.
// Usage: node scripts/convert-banners.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const bannersDir = path.join(root, 'public', 'images', 'banners');

const pngs = fs.readdirSync(bannersDir).filter(f => f.endsWith('.png'));

let before = 0;
let after = 0;

for (const file of pngs) {
  const srcPath = path.join(bannersDir, file);
  const outPath = srcPath.replace(/\.png$/, '.webp');
  const { size: srcSize } = fs.statSync(srcPath);

  await sharp(srcPath).webp({ quality: 82 }).toFile(outPath);

  const { size: outSize } = fs.statSync(outPath);
  before += srcSize;
  after += outSize;
  console.log(`${file}: ${(srcSize / 1024).toFixed(0)} KB -> ${(outSize / 1024).toFixed(0)} KB`);
}

console.log(
  `\nTotal: ${(before / 1024).toFixed(0)} KB -> ${(after / 1024).toFixed(0)} KB (${(
    (1 - after / before) * 100
  ).toFixed(0)}% smaller)`
);
