# Neville Goddard's Vault

A static website collecting the books, lectures, and radio broadcasts of [Neville Goddard](https://en.wikipedia.org/wiki/Neville_Goddard) (1905–1972), with per-document summaries, a full-text search, a glossary, and topic/keyword/Bible-reference browsers.

**Live site:** https://nevillegoddardvault.com/

## Tech stack

- [Next.js](https://nextjs.org) (App Router, static export via `output: "export"`)
- React 19, TypeScript, CSS Modules
- Markdown content rendered with `react-markdown` (+ GFM, raw HTML, heading slugs)
- Deployed to GitHub Pages via GitHub Actions ([.github/workflows/deploy.yml](.github/workflows/deploy.yml))

## Project structure

```
content/            The vault: Markdown documents exported from Obsidian
  Books/            Neville's published books, one folder per book
  Lectures/         Lecture transcripts (incl. Radio Lectures/)
  Search/           Hub pages for the browsers
  Glossary.md       Term definitions, one "## Term" section each
src/
  app/              Next.js routes (catch-all [...slug] renders any document)
  components/       Sidebar, SearchBar, browsers, reading UI
  lib/              config.ts (site URL/base path), slug.ts, markdown.ts
  data/metadata.json  Per-document metadata (title, type, topics, keywords…)
scripts/
  generate-static-data.mjs  Generates public/tree.json + public/search-index.json
  convert-banners.mjs       One-off PNG -> WebP banner conversion
  legacy/                   Historical one-off Python content-cleanup scripts
```

`public/tree.json` (sidebar tree) and `public/search-index.json` (full-text search index) are **generated at build time** by `scripts/generate-static-data.mjs`, wired to the `predev`/`prebuild` npm hooks. They are not committed.

`src/data/metadata.json` is a committed artifact: it holds per-document metadata (topics, keywords, Bible references) originally extracted from the Obsidian vault's frontmatter, which the exported files in `content/` no longer carry. Edit it directly when adding new documents.

## Development

```bash
npm ci
npm run dev        # generates data files, then starts the dev server
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm run build      # generates data files, then static export to out/
```

The site is served at the root of the custom domain `nevillegoddardvault.com` (GitHub Pages, `public/CNAME`). The base path and site URL live in [src/lib/config.ts](src/lib/config.ts); the old `fraterr.github.io/NevilleGoddardsVault` URLs redirect automatically.

## Adding content

1. Drop the Markdown file into the right folder under `content/` (a folder's own note, e.g. `Books/Books.md`, acts as that folder's landing page).
2. Add a matching entry to `src/data/metadata.json` (title, slug, type, topics, keywords) so the document appears in the Topics/Keywords/Glossary browsers.
3. Internal links use site-absolute paths like `/Lectures/A-Divine-Event` and are slugified automatically.

The top-level entries `kitrc.md`, `Context/`, `Template/`, and `Handles/` are publishing leftovers and are excluded from the site (see `EXCLUDED_TOP_LEVEL` in [src/lib/markdown.ts](src/lib/markdown.ts) and its mirror in `scripts/generate-static-data.mjs`).

## SEO notes

Every document page gets its own title, meta description, canonical URL, Open Graph tags, and JSON-LD `Article` markup. `sitemap.xml` and `robots.txt` are generated at the domain root.

## Copyright

Neville Goddard died in 1972; his books were published between 1939 and 1966 and his lectures were delivered publicly. The texts collected here are widely reproduced as public-domain material. This project is a non-commercial educational archive; if you hold rights to any included text and believe it is not in the public domain, please open an issue and it will be removed.
