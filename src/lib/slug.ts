// Pure slug utilities, safe to import from both server and client components.

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export function slugifyParts(parts: string[]): string[] {
  return parts.map(slugify);
}

/** Build the app-internal href for a document slug ('index' maps to home). */
export function hrefForSlug(slugParts: string[]): string {
  const slugPath = slugifyParts(slugParts).join('/');
  return slugPath === 'index' ? '/' : `/${slugPath}`;
}
