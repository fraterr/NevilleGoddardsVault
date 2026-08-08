'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Annotation,
  loadAnnotations,
  saveAnnotations,
  makeId,
  selectionOffsets,
  fullText,
  describeAnchor,
  findAnchor,
  wrapOffsets,
  unwrapMarks,
} from '@/lib/annotations';
import styles from './Annotator.module.css';

interface AnnotatorProps {
  slug: string;
  docTitle: string;
  children: React.ReactNode;
}

interface ToolbarState {
  x: number;
  y: number;
}

interface PopoverState {
  annId: string;
  x: number;
  y: number;
  draft: string;
}

interface PendingSelection {
  start: number;
  end: number;
}

/** Popover width must match .popover in the CSS module. */
function popoverWidth(): number {
  return Math.min(340, window.innerWidth * 0.85);
}

/** Clamp an x position so a box of `width` stays inside the wrapper. */
function clampX(x: number, width: number, root: HTMLElement): number {
  return Math.max(8, Math.min(x, root.clientWidth - width - 8));
}

export default function Annotator({ slug, docTitle, children }: AnnotatorProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pendingRef = useRef<PendingSelection | null>(null);
  // Lazy-initialized from localStorage; never rendered during SSR (the list is
  // only consumed by the DOM effect below), so no hydration mismatch.
  const [docAnnotations, setDocAnnotations] = useState<Annotation[]>(() =>
    typeof window === 'undefined' ? [] : loadAnnotations().filter(a => a.slug === slug)
  );
  const [toolbar, setToolbar] = useState<ToolbarState | null>(null);
  const [popover, setPopover] = useState<PopoverState | null>(null);

  // (Re)apply highlights whenever the set changes
  useEffect(() => {
    const root = wrapperRef.current;
    if (!root) return;

    unwrapMarks(root);
    const text = fullText(root);
    for (const ann of docAnnotations) {
      const start = findAnchor(text, ann.exact, ann.prefix, ann.suffix);
      if (start !== -1) {
        const cls = ann.note.trim() ? `${styles.highlight} ${styles.hasNote}` : styles.highlight;
        wrapOffsets(root, start, start + ann.exact.length, cls, ann.id);
      }
    }

    // Deep link from My Notes: ?ann=<id>
    const params = new URLSearchParams(window.location.search);
    const target = params.get('ann');
    if (target) {
      const mark = root.querySelector(`mark[data-ann="${target}"]`);
      if (mark) {
        mark.classList.add(styles.flash);
        // Defer the scroll until layout has settled
        setTimeout(() => mark.scrollIntoView({ block: 'center', behavior: 'smooth' }), 120);
      }
    }
  }, [docAnnotations]);

  const persist = useCallback((updater: (all: Annotation[]) => Annotation[]) => {
    const next = updater(loadAnnotations());
    saveAnnotations(next);
    setDocAnnotations(next.filter(a => a.slug === slug));
  }, [slug]);

  // ---- selection toolbar -------------------------------------------------

  const handleSelectionEnd = useCallback(() => {
    // Let the browser finalize the selection first
    setTimeout(() => {
      const root = wrapperRef.current;
      if (!root) return;
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed || sel.rangeCount === 0) {
        setToolbar(null);
        return;
      }
      const range = sel.getRangeAt(0);
      const offsets = selectionOffsets(root, range);
      if (!offsets || offsets.end - offsets.start < 3 || offsets.end - offsets.start > 2000) {
        setToolbar(null);
        return;
      }
      pendingRef.current = offsets;

      const rect = range.getBoundingClientRect();
      const wrapRect = root.getBoundingClientRect();
      setPopover(null);
      // The toolbar is centered on x (translateX -50%), so clamp its center
      // half a toolbar-width away from either edge
      const toolbarHalf = 110;
      setToolbar({
        x: Math.max(toolbarHalf, Math.min(rect.left - wrapRect.left + rect.width / 2, root.clientWidth - toolbarHalf)),
        y: rect.top - wrapRect.top,
      });
    }, 10);
  }, []);

  const createAnnotation = useCallback((withNote: boolean) => {
    const root = wrapperRef.current;
    const pending = pendingRef.current;
    if (!root || !pending) return;

    const text = fullText(root);
    const anchor = describeAnchor(text, pending.start, pending.end);
    const ann: Annotation = {
      id: makeId(),
      slug,
      docTitle,
      ...anchor,
      note: '',
      created: Date.now(),
    };
    persist(all => [...all, ann]);
    window.getSelection()?.removeAllRanges();
    setToolbar(null);
    pendingRef.current = null;

    if (withNote) {
      // Open the note editor where the toolbar was
      setPopover(prev => prev);
      requestAnimationFrame(() => {
        const mark = root.querySelector(`mark[data-ann="${ann.id}"]`);
        const wrapRect = root.getBoundingClientRect();
        const rect = mark ? mark.getBoundingClientRect() : wrapRect;
        setPopover({
          annId: ann.id,
          x: clampX(rect.left - wrapRect.left, popoverWidth(), root),
          y: rect.bottom - wrapRect.top + 6,
          draft: '',
        });
      });
    }
  }, [slug, docTitle, persist]);

  // ---- click on an existing highlight ------------------------------------

  const handleClick = useCallback((e: React.MouseEvent) => {
    const root = wrapperRef.current;
    if (!root) return;
    const mark = (e.target as HTMLElement).closest?.('mark[data-ann]');
    if (!mark || !root.contains(mark)) return;

    const id = mark.getAttribute('data-ann')!;
    const ann = loadAnnotations().find(a => a.id === id);
    if (!ann) return;

    const wrapRect = root.getBoundingClientRect();
    const rect = mark.getBoundingClientRect();
    setToolbar(null);
    setPopover({
      annId: id,
      x: clampX(rect.left - wrapRect.left, popoverWidth(), root),
      y: rect.bottom - wrapRect.top + 6,
      draft: ann.note,
    });
  }, []);

  const savePopoverNote = useCallback(() => {
    if (!popover) return;
    persist(all => all.map(a => (a.id === popover.annId ? { ...a, note: popover.draft } : a)));
    setPopover(null);
  }, [popover, persist]);

  const deleteAnnotation = useCallback(() => {
    if (!popover) return;
    persist(all => all.filter(a => a.id !== popover.annId));
    setPopover(null);
  }, [popover, persist]);

  return (
    <div
      ref={wrapperRef}
      className={styles.wrapper}
      onMouseUp={handleSelectionEnd}
      onTouchEnd={handleSelectionEnd}
      onClick={handleClick}
    >
      {children}

      {toolbar && (
        <div className={styles.toolbar} style={{ left: toolbar.x, top: toolbar.y }} role="toolbar" aria-label="Annotate selection">
          <button className={styles.toolbarBtn} onMouseDown={e => { e.preventDefault(); createAnnotation(false); }}>
            <span aria-hidden="true">🖊</span> Highlight
          </button>
          <button className={styles.toolbarBtn} onMouseDown={e => { e.preventDefault(); createAnnotation(true); }}>
            <span aria-hidden="true">📝</span> Note
          </button>
        </div>
      )}

      {popover && (
        <div className={styles.popover} style={{ left: popover.x, top: popover.y }} role="dialog" aria-label="Annotation note">
          <textarea
            className={styles.noteInput}
            placeholder="Your note on this passage… (saved only in this browser)"
            value={popover.draft}
            onChange={e => setPopover(p => (p ? { ...p, draft: e.target.value } : p))}
            rows={3}
            autoFocus
          />
          <div className={styles.popoverActions}>
            <button className={styles.deleteBtn} onClick={deleteAnnotation}>
              Remove
            </button>
            <div className={styles.popoverRight}>
              <button className={styles.cancelBtn} onClick={() => setPopover(null)}>
                Close
              </button>
              <button className={styles.saveBtn} onClick={savePopoverNote}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
