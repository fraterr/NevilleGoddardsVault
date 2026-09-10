# SEO work and measurement

The site currently serves English content. The targets below describe relevant search intents, not measured search volumes or guaranteed rankings.

| Intent | Existing destination | Content to maintain |
| --- | --- | --- |
| Neville Goddard | `/` | Clear introduction, reading choices and navigation to the collection |
| Neville Goddard books, read online | `/books/` and book indexes | Complete chapter links, edition/source information where available |
| Neville Goddard lectures | `/lectures/` | Titles, provenance where available, related readings |
| Neville Goddard book summaries | `/summaries/` and individual guides | Accurate chapter coverage and links to the underlying text |
| SATS, revision, living in the end | `/techniques/` and individual guides | Practical explanations, source passages, limitations and common questions |
| Neville Goddard success stories | `/success-stories/` | Original Reddit links, useful filters and clear labelling of self-reported accounts |
| Neville Goddard ladder exercise | `/test-the-law/` | Exercise instructions, source attribution and a useful observation journal |

## Checks before publishing

Run `npm run lint`, `npm run build`, then `npm run audit:seo`. The export audit checks sitemap destinations, canonicals, indexability, descriptions, titles, main headings, internal link destinations and JSON-LD syntax. It does not test fragment targets, external links, rankings or Google's indexing decisions. Results are written to `reports/seo-audit.json`.

The deployment workflow runs the audit before uploading the site. Sitemap dates are not refreshed merely because a build runs. Search results, random navigation and personal notes remain excluded from indexing.

## Next editorial work

1. Record edition or recording provenance for texts where it can be established. Do not invent author credentials, dates or citations.
2. Check summary chapter coverage against each hosted book. Keep summaries distinguishable from Neville's words.
3. Use Search Console queries to identify actual unanswered questions. Extend the most relevant existing page before creating overlapping articles.
4. Consider dedicated success-story category pages only if each offers useful original context and accessible source entries. Filter combinations alone do not warrant new indexed pages.

## Measuring progress

Establish a Search Console baseline: previous 28 days versus the preceding 28 days, segmented by query, page, country and device. Save clicks, impressions, CTR and average position. Separate searches for the site's name from general Neville Goddard searches. These data have not been accessed during this code audit.

After deployment, inspect the homepage and a few representative updated pages with URL Inspection. Check the existing sitemap at `https://nevillegoddardvault.com/sitemap.xml`. Request indexing for a few important changed pages where appropriate; repeated requests do not guarantee faster indexing.

Compare equivalent periods after Google has recrawled the changes. Look for more relevant non-brand clicks and impressions across the target pages. Account for traffic spikes caused by Reddit posts. An overall average position alone is not enough to judge progress.

Search Console Core Web Vitals and a separate mobile performance audit remain useful follow-up checks; this export audit does not measure field performance.

## References

- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Title links](https://developers.google.com/search/docs/appearance/title-link)
