// Map slugs to banner image filenames (under /images/banners/).

export const BANNER_MAP: Record<string, string> = {
  'index': 'banner-index.webp',
  'books': 'banner-books.webp',
  'lectures': 'banner-lectures.webp',
  'feedback': 'banner-feedback.webp',
  'buy-me-a-tea': 'banner-buy-me-a-tea.webp',
  'updates-and-changelog': 'banner-updates-and-changelog.webp',
  'search/bible-references': 'banner-bible-references.webp',
  'books/awakened-imagination': 'banner-awakened-imagination.webp',
  'books/feeling-is-the-secret': 'banner-feeling-is-the-secret.webp',
  'books/freedom-for-all': 'banner-freedom-for-all.webp',
  'books/out-of-this-world': 'banner-out-of-this-world.webp',
  'books/the-law-and-the-promise': 'banner-the-law-and-the-promise.webp',
  'books/the-power-of-awareness': 'banner-the-power-of-awareness.webp',
  'books/the-search': 'banner-the-search.webp',
  'books/your-faith-is-your-fortune': 'banner-your-faith-is-your-fortune.webp',
  'books/at-your-command': 'banner-at-your-command.webp',
  'books/prayer-the-art-of-believing': 'banner-prayer-art-of-believing.webp',
  'books/seedtime-and-harvest': 'banner-seedtime-and-harvest.webp',
  'lectures/radio-lectures': 'banner-radio-lectures.webp',
};

/**
 * Resolve the banner for a slugified route: exact match first, then the
 * parent (book) banner for chapter pages.
 */
export function getBannerForSlug(slugParts: string[]): string | null {
  const slugPath = slugParts.join('/').toLowerCase();

  if (BANNER_MAP[slugPath]) {
    return BANNER_MAP[slugPath];
  }

  if (slugParts.length >= 2) {
    const parentSlug = slugParts.slice(0, -1).join('/').toLowerCase();
    if (BANNER_MAP[parentSlug]) {
      return BANNER_MAP[parentSlug];
    }
  }

  return null;
}
