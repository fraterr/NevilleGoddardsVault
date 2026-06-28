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
              const finalHref = hashPart ? `${slugifiedPath}#${hashPart}` : slugifiedPath;
              return <Link href={finalHref}>{children}</Link>;
            }
            
            // Check if it's a Bible Gateway link to inject an ID for scrolling
            let idAttr = undefined;
            if (href && href.includes('biblegateway.com')) {
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
              <a href={href} id={idAttr} target="_blank" rel="noopener noreferrer" {...props}>
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
