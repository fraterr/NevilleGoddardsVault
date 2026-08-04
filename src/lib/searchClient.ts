// Client-side search over the build-time index (public/search-index.json).
// Shared by the SearchBar dropdown and the full results page.

import { BASE_PATH } from './config';

export interface SearchEntry {
  title: string;
  slug: string[];
  book?: string;
  type?: string;
  /** Plain document text, original case (for snippets). */
  text: string;
}

export interface SearchMatch {
  entry: SearchEntry;
  occurrences: number;
  inTitle: boolean;
  score: number;
}

export interface Snippet {
  before: string;
  match: string;
  after: string;
}

// The index weighs a few MB, so it is fetched lazily and cached at module
// level for the lifetime of the page.
let indexPromise: Promise<SearchEntry[]> | null = null;

// Lowercased text cache, built lazily per entry on first search.
const lowerCache = new WeakMap<SearchEntry, string>();

export function loadSearchIndex(): Promise<SearchEntry[]> {
  if (!indexPromise) {
    indexPromise = fetch(`${BASE_PATH}/search-index.json`)
      .then(res => (res.ok ? res.json() : []))
      .catch(() => []);
  }
  return indexPromise;
}

function lowerTextOf(entry: SearchEntry): string {
  let lower = lowerCache.get(entry);
  if (lower === undefined) {
    lower = entry.text.toLowerCase();
    lowerCache.set(entry, lower);
  }
  return lower;
}

function countOccurrences(haystack: string, needle: string): number {
  let count = 0;
  let pos = haystack.indexOf(needle);
  while (pos !== -1) {
    count++;
    pos = haystack.indexOf(needle, pos + needle.length);
  }
  return count;
}

/** Search all entries for a query (case-insensitive substring match). */
export function searchEntries(entries: SearchEntry[], rawQuery: string): SearchMatch[] {
  const q = rawQuery.trim().toLowerCase();
  if (q.length < 2) return [];

  const matches: SearchMatch[] = [];
  for (const entry of entries) {
    const inTitle = entry.title.toLowerCase().includes(q);
    const occurrences = entry.text ? countOccurrences(lowerTextOf(entry), q) : 0;

    if (inTitle || occurrences > 0) {
      matches.push({
        entry,
        occurrences,
        inTitle,
        score: occurrences + (inTitle ? 100 : 0),
      });
    }
  }

  matches.sort((a, b) => b.score - a.score);
  return matches;
}

/** Extract up to `max` context snippets around matches, for the results page. */
export function extractSnippets(entry: SearchEntry, rawQuery: string, max = 3, context = 80): Snippet[] {
  const q = rawQuery.trim().toLowerCase();
  if (q.length < 2 || !entry.text) return [];

  const lower = lowerTextOf(entry);
  const snippets: Snippet[] = [];
  let pos = lower.indexOf(q);
  let lastEnd = -1;

  while (pos !== -1 && snippets.length < max) {
    // Skip matches that fall inside the previous snippet's window
    if (pos > lastEnd) {
      const start = Math.max(0, pos - context);
      const end = Math.min(entry.text.length, pos + q.length + context);
      snippets.push({
        before: (start > 0 ? '…' : '') + entry.text.slice(start, pos),
        match: entry.text.slice(pos, pos + q.length),
        after: entry.text.slice(pos + q.length, end) + (end < entry.text.length ? '…' : ''),
      });
      lastEnd = end;
    }
    pos = lower.indexOf(q, pos + q.length);
  }

  return snippets;
}
