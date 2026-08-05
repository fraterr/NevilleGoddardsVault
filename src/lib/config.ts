// Central site configuration. Every hardcoded path/URL in the app should come from here.

// Custom domain (GitHub Pages serves the site at the domain root).
// The old fraterr.github.io/NevilleGoddardsVault URLs redirect here automatically.
export const BASE_PATH = '';

export const SITE_ORIGIN = 'https://nevillegoddardvault.com';

export const SITE_URL = `${SITE_ORIGIN}${BASE_PATH}`;

export const SITE_NAME = "Neville Goddard's Vault";

export const SITE_DESCRIPTION =
  'A comprehensive, beautifully designed vault containing the books, lectures, and radio broadcasts of Neville Goddard.';

/** Prefix a public asset path (e.g. /images/logo.png) with the base path. */
export function withBasePath(assetPath: string): string {
  return `${BASE_PATH}${assetPath}`;
}
