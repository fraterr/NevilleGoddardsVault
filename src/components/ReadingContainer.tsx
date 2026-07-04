'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './ReadingContainer.module.css';

interface ReadingContainerProps {
  children: React.ReactNode;
}

export default function ReadingContainer({ children }: ReadingContainerProps) {
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large' | 'xlarge'>('medium');
  const [fontFamily, setFontFamily] = useState<'serif' | 'sans'>('serif');
  const [isOpen, setIsOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const scrolled = (window.scrollY / totalHeight) * 100;
        setProgress(scrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
                  onClick={() => setFontFamily('serif')}
                  className={`${styles.toggleBtn} ${fontFamily === 'serif' ? styles.activeBtn : ''}`}
                >
                  Serif
                </button>
                <button
                  onClick={() => setFontFamily('sans')}
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
                  onClick={() => setFontSize('small')}
                  className={`${styles.toggleBtn} ${fontSize === 'small' ? styles.activeBtn : ''}`}
                  title="Small text"
                >
                  A-
                </button>
                <button
                  onClick={() => setFontSize('medium')}
                  className={`${styles.toggleBtn} ${fontSize === 'medium' ? styles.activeBtn : ''}`}
                  title="Medium text"
                >
                  A
                </button>
                <button
                  onClick={() => setFontSize('large')}
                  className={`${styles.toggleBtn} ${fontSize === 'large' ? styles.activeBtn : ''}`}
                  title="Large text"
                >
                  A+
                </button>
                <button
                  onClick={() => setFontSize('xlarge')}
                  className={`${styles.toggleBtn} ${fontSize === 'xlarge' ? styles.activeBtn : ''}`}
                  title="Extra large text"
                >
                  A++
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Article Content Area */}
      <div className={`${styles.contentArea} ${fontClass} ${sizeClass}`}>
        {children}
      </div>
    </div>
  );
}
