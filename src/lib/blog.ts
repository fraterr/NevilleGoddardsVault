// Blog posts: markdown files in /blog with frontmatter, authored via the
// /admin panel (Sveltia CMS) or directly in the repo.

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getReadingTimeMinutes } from './markdown';

const blogDirectory = path.join(process.cwd(), 'blog');

export interface BlogPost {
  slug: string;
  title: string;
  date: string; // ISO
  description: string;
  tags: string[];
  content: string;
  readingTime: number;
}

let cachedPosts: BlogPost[] | null = null;

export function getBlogPosts(): BlogPost[] {
  if (cachedPosts) return cachedPosts;
  if (!fs.existsSync(blogDirectory)) {
    cachedPosts = [];
    return cachedPosts;
  }

  const posts: BlogPost[] = [];
  for (const file of fs.readdirSync(blogDirectory)) {
    if (!file.endsWith('.md')) continue;
    try {
      const raw = fs.readFileSync(path.join(blogDirectory, file), 'utf8');
      const { data, content } = matter(raw);
      if (data.draft === true) continue;

      const slug = file.replace(/\.md$/, '');
      posts.push({
        slug,
        title: typeof data.title === 'string' && data.title ? data.title : slug,
        date: data.date ? new Date(data.date).toISOString() : new Date(0).toISOString(),
        description: typeof data.description === 'string' ? data.description : '',
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        content,
        readingTime: getReadingTimeMinutes(content),
      });
    } catch (e) {
      console.error(`Error reading blog post ${file}:`, e);
    }
  }

  posts.sort((a, b) => b.date.localeCompare(a.date));
  cachedPosts = posts;
  return posts;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return getBlogPosts().find(p => p.slug === slug);
}

export function formatPostDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
