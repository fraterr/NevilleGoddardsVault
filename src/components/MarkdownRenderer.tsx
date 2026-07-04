import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import Link from 'next/link';
import { slugify } from '@/lib/markdown';
import styles from './MarkdownRenderer.module.css';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className={styles.markdownBody}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSlug]}
        components={{
          // Overwrite link component to use Next.js Link for internal links
          a: ({ node, href, children, ...props }) => {
            if (href?.startsWith('/')) {
              // Extract hash if present to preserve it
              const [pathPart, hashPart] = href.split('#');
              const slugifiedPath = pathPart.split('/').map(slugify).join('/');
              
              if (hashPart) {
                // Return a standard <a> tag with base path prepended to bypass Next.js Link basePath hash bug
                const finalHref = `/NevilleGoddardsVault${slugifiedPath}#${hashPart}`;
                return <a href={finalHref} {...props}>{children}</a>;
              } else {
                return <Link href={slugifiedPath}>{children}</Link>;
              }
            }
            
            // Check if it's a Bible Gateway link to inject an ID for scrolling
            let idAttr = undefined;
            const isBibleLink = href?.includes('biblegateway.com');
            if (href && isBibleLink) {
              try {
                const urlObj = new URL(href);
                const searchParam = urlObj.searchParams.get('search');
                if (searchParam) {
                  idAttr = slugify(searchParam);
                }
              } catch (e) {
                // Ignore invalid URLs
              }
            }

            return (
              <a 
                href={href} 
                id={idAttr} 
                className={isBibleLink ? styles.bibleLink : undefined} 
                target="_blank" 
                rel="noopener noreferrer" 
                {...props}
              >
                {children}
              </a>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
