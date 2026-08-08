// Client-side annotations: highlights and notes on vault documents, stored in
// localStorage only. Anchoring uses the selected text plus surrounding context
// (the approach used by web-annotation systems): documents are static, so
// re-anchoring by text search is reliable.

export interface Annotation {
  id: string;
  /** Route path of the document, e.g. "/books/five-lessons/five-lessons-lesson-1" */
  slug: string;
  docTitle: string;
  /** The selected text */
  exact: string;
  /** Up to CONTEXT_LEN chars before/after the selection, for re-anchoring */
  prefix: string;
  suffix: string;
  /** User note; empty string means a pure highlight */
  note: string;
  created: number;
}

const STORAGE_KEY = 'ngv-annotations';
const CONTEXT_LEN = 40;

export function makeId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return 'ann-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
  }
}

export function loadAnnotations(): Annotation[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (a: unknown): a is Annotation =>
        !!a && typeof a === 'object' &&
        typeof (a as Annotation).id === 'string' &&
        typeof (a as Annotation).slug === 'string' &&
        typeof (a as Annotation).exact === 'string'
    );
  } catch {
    return [];
  }
}

export function saveAnnotations(list: Annotation[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // storage full or unavailable: annotations stay in memory for the session
  }
}

export function exportAnnotationsJson(): string {
  return JSON.stringify({ app: 'nevillegoddardvault', kind: 'annotations', exported: Date.now(), annotations: loadAnnotations() }, null, 2);
}

export function importAnnotationsJson(json: string): { added: number; total: number } {
  const parsed = JSON.parse(json);
  const incoming: unknown = Array.isArray(parsed) ? parsed : parsed?.annotations;
  if (!Array.isArray(incoming)) throw new Error('Not a notes backup file');

  const current = loadAnnotations();
  const seen = new Set(current.map(a => a.id));
  let added = 0;
  for (const a of incoming) {
    if (
      a && typeof a === 'object' &&
      typeof a.id === 'string' && typeof a.slug === 'string' &&
      typeof a.exact === 'string' && !seen.has(a.id)
    ) {
      current.push({
        id: a.id,
        slug: a.slug,
        docTitle: typeof a.docTitle === 'string' ? a.docTitle : a.slug,
        exact: a.exact,
        prefix: typeof a.prefix === 'string' ? a.prefix : '',
        suffix: typeof a.suffix === 'string' ? a.suffix : '',
        note: typeof a.note === 'string' ? a.note : '',
        created: typeof a.created === 'number' ? a.created : Date.now(),
      });
      seen.add(a.id);
      added++;
    }
  }
  saveAnnotations(current);
  return { added, total: current.length };
}

// ---------------------------------------------------------------------------
// DOM anchoring
// ---------------------------------------------------------------------------

/**
 * Character offsets of a selection Range within root, consistent with the
 * concatenated text-node content of root (Range.toString semantics).
 */
export function selectionOffsets(root: HTMLElement, range: Range): { start: number; end: number } | null {
  if (!root.contains(range.commonAncestorContainer)) return null;
  const pre = document.createRange();
  pre.selectNodeContents(root);
  pre.setEnd(range.startContainer, range.startOffset);
  const start = pre.toString().length;
  const length = range.toString().length;
  if (length === 0) return null;
  return { start, end: start + length };
}

export function fullText(root: HTMLElement): string {
  const r = document.createRange();
  r.selectNodeContents(root);
  return r.toString();
}

/** Build the anchor descriptor for a selection at [start, end). */
export function describeAnchor(text: string, start: number, end: number): { exact: string; prefix: string; suffix: string } {
  return {
    exact: text.slice(start, end),
    prefix: text.slice(Math.max(0, start - CONTEXT_LEN), start),
    suffix: text.slice(end, end + CONTEXT_LEN),
  };
}

/**
 * Re-anchor: find the best occurrence of `exact` in `text`, scored by how much
 * of the stored prefix/suffix matches around it. Returns -1 if not found.
 */
export function findAnchor(text: string, exact: string, prefix: string, suffix: string): number {
  if (!exact) return -1;
  const candidates: number[] = [];
  let idx = text.indexOf(exact);
  while (idx !== -1 && candidates.length < 200) {
    candidates.push(idx);
    idx = text.indexOf(exact, idx + 1);
  }
  if (candidates.length === 0) return -1;
  if (candidates.length === 1) return candidates[0];

  const overlap = (a: string, b: string, fromEnd: boolean): number => {
    const max = Math.min(a.length, b.length);
    let n = 0;
    for (let i = 0; i < max; i++) {
      const ca = fromEnd ? a[a.length - 1 - i] : a[i];
      const cb = fromEnd ? b[b.length - 1 - i] : b[i];
      if (ca === cb) n++;
      else break;
    }
    return n;
  };

  let best = candidates[0];
  let bestScore = -1;
  for (const c of candidates) {
    const before = text.slice(Math.max(0, c - CONTEXT_LEN), c);
    const after = text.slice(c + exact.length, c + exact.length + CONTEXT_LEN);
    const score = overlap(prefix, before, true) + overlap(suffix, after, false);
    if (score > bestScore) {
      bestScore = score;
      best = c;
    }
  }
  return best;
}

/**
 * Wrap the character range [start, end) of root's text content in <mark>
 * elements (one per intersected text node).
 */
export function wrapOffsets(root: HTMLElement, start: number, end: number, className: string, annId: string): boolean {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let pos = 0;
  const targets: { node: Text; local0: number; local1: number }[] = [];

  let node = walker.nextNode() as Text | null;
  while (node) {
    const len = node.data.length;
    const nodeStart = pos;
    const nodeEnd = pos + len;
    if (nodeEnd > start && nodeStart < end && len > 0) {
      targets.push({
        node,
        local0: Math.max(0, start - nodeStart),
        local1: Math.min(len, end - nodeStart),
      });
    }
    pos = nodeEnd;
    if (pos >= end) break;
    node = walker.nextNode() as Text | null;
  }

  if (targets.length === 0) return false;

  for (const t of targets) {
    // Skip zero-length segments and nodes already inside one of our marks
    if (t.local1 <= t.local0) continue;
    if ((t.node.parentElement)?.closest('mark[data-ann]')) continue;

    let target = t.node;
    if (t.local0 > 0) target = target.splitText(t.local0);
    if (t.local1 - t.local0 < target.data.length) target.splitText(t.local1 - t.local0);

    const mark = document.createElement('mark');
    mark.className = className;
    mark.setAttribute('data-ann', annId);
    target.parentNode?.insertBefore(mark, target);
    mark.appendChild(target);
  }
  return true;
}

/** Remove every annotation mark (all of them, or just one id) under root. */
export function unwrapMarks(root: HTMLElement, annId?: string): void {
  const selector = annId ? `mark[data-ann="${annId}"]` : 'mark[data-ann]';
  root.querySelectorAll(selector).forEach(mark => {
    const parent = mark.parentNode;
    if (!parent) return;
    while (mark.firstChild) parent.insertBefore(mark.firstChild, mark);
    parent.removeChild(mark);
  });
  root.normalize();
}
