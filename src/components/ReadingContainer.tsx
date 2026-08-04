'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './ReadingContainer.module.css';

interface ReadingContainerProps {
  children: React.ReactNode;
}

type FontSize = 'small' | 'medium' | 'large' | 'xlarge';
type FontFamily = 'serif' | 'sans';
type Theme = 'dark' | 'sepia';

const STORAGE_KEYS = {
  fontSize: 'ngv-font-size',
  fontFamily: 'ngv-font-family',
  theme: 'ngv-theme',
} as const;

function readPref<T extends string>(key: string, valid: readonly T[], fallback: T): T {
  try {
    const value = localStorage.getItem(key);
    if (value && (valid as readonly string[]).includes(value)) return value as T;
  } catch {
    // localStorage unavailable (private mode etc.)
  }
  return fallback;
}

function savePref(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // ignore
  }
}

export default function ReadingContainer({ children }: ReadingContainerProps) {
  // Lazy initializers read the persisted preferences on the client; during
  // prerendering (no localStorage) they fall back to the defaults, and the
  // resulting class mismatch is suppressed on the content wrapper below.
  const isServer = typeof window === 'undefined';
  const [fontSize, setFontSize] = useState<FontSize>(() =>
    isServer ? 'medium' : readPref(STORAGE_KEYS.fontSize, ['small', 'medium', 'large', 'xlarge'] as const, 'medium')
  );
  const [fontFamily, setFontFamily] = useState<FontFamily>(() =>
    isServer ? 'serif' : readPref(STORAGE_KEYS.fontFamily, ['serif', 'sans'] as const, 'serif')
  );
  const [theme, setTheme] = useState<Theme>(() =>
    isServer ? 'dark' : readPref(STORAGE_KEYS.theme, ['dark', 'sepia'] as const, 'dark')
  );
  const [isOpen, setIsOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const changeFontSize = (value: FontSize) => {
    setFontSize(value);
    savePref(STORAGE_KEYS.fontSize, value);
  };

  const changeFontFamily = (value: FontFamily) => {
    setFontFamily(value);
    savePref(STORAGE_KEYS.fontFamily, value);
  };

  const changeTheme = (value: Theme) => {
    setTheme(value);
    savePref(STORAGE_KEYS.theme, value);
    if (value === 'sepia') {
      document.documentElement.dataset.theme = 'sepia';
    } else {
      delete document.documentElement.dataset.theme;
    }
  };

  // Track scroll progress
  useEffect(() => {
    let rafId = 0;
    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
          setProgress((window.scrollY / totalHeight) * 100);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Close formatting panel on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const fontClass = fontFamily === 'serif' ? styles.fontSerif : styles.fontSans;

  let sizeClass = styles.sizeMedium;
  if (fontSize === 'small') sizeClass = styles.sizeSmall;
  if (fontSize === 'large') sizeClass = styles.sizeLarge;
  if (fontSize === 'xlarge') sizeClass = styles.sizeXlarge;

  return (
    <div ref={containerRef} className={styles.wrapper}>
      {/* Scroll Progress Bar */}
      <div
        className={styles.progressBar}
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />

      {/* Floating Controls Button */}
      <div className={styles.controlsWrapper} ref={menuRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={styles.triggerButton}
          title="Reading preferences"
          aria-expanded={isOpen}
        >
          Aa
        </button>

        {isOpen && (
          <div className={styles.popover}>
            <h4 className={styles.popoverTitle}>Reading Mode</h4>

            {/* Font Family Selection */}
            <div className={styles.controlGroup}>
              <span className={styles.groupLabel}>Font</span>
              <div className={styles.buttonRow}>
                <button
                  onClick={() => changeFontFamily('serif')}
                  className={`${styles.toggleBtn} ${fontFamily === 'serif' ? styles.activeBtn : ''}`}
                >
                  Serif
                </button>
                <button
                  onClick={() => changeFontFamily('sans')}
                  className={`${styles.toggleBtn} ${fontFamily === 'sans' ? styles.activeBtn : ''}`}
                >
                  Sans
                </button>
              </div>
            </div>

            {/* Font Size Selection */}
            <div className={styles.controlGroup}>
              <span className={styles.groupLabel}>Size</span>
              <div className={styles.buttonRow}>
                <button
                  onClick={() => changeFontSize('small')}
                  className={`${styles.toggleBtn} ${fontSize === 'small' ? styles.activeBtn : ''}`}
                  title="Small text"
                >
                  A-
                </button>
                <button
                  onClick={() => changeFontSize('medium')}
                  className={`${styles.toggleBtn} ${fontSize === 'medium' ? styles.activeBtn : ''}`}
                  title="Medium text"
                >
                  A
                </button>
                <button
                  onClick={() => changeFontSize('large')}
                  className={`${styles.toggleBtn} ${fontSize === 'large' ? styles.activeBtn : ''}`}
                  title="Large text"
                >
                  A+
                </button>
                <button
                  onClick={() => changeFontSize('xlarge')}
                  className={`${styles.toggleBtn} ${fontSize === 'xlarge' ? styles.activeBtn : ''}`}
                  title="Extra large text"
                >
                  A++
                </button>
              </div>
            </div>

            {/* Theme Selection */}
            <div className={styles.controlGroup}>
              <span className={styles.groupLabel}>Theme</span>
              <div className={styles.buttonRow}>
                <button
                  onClick={() => changeTheme('dark')}
                  className={`${styles.toggleBtn} ${theme === 'dark' ? styles.activeBtn : ''}`}
                  title="Dark theme"
                >
                  Dark
                </button>
                <button
                  onClick={() => changeTheme('sepia')}
                  className={`${styles.toggleBtn} ${theme === 'sepia' ? styles.activeBtn : ''}`}
                  title="Sepia reading theme"
                >
                  Sepia
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Article Content Area */}
      <div className={`${styles.contentArea} ${fontClass} ${sizeClass}`} suppressHydrationWarning>
        {children}
      </div>
    </div>
  );
}
