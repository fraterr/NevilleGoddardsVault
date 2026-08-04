import type { Metadata } from 'next';
import {
  getDocumentBySlug,
  getVaultTree,
  getDocMetaBySlug,
  getAdjacentDocs,
  getBreadcrumbNames,
  getExcerpt,
  getReadingTimeMinutes,
  getRelatedDocs,
  VaultNode,
} from '@/lib/markdown';
import { getBannerForSlug } from '@/lib/banners';
import { SITE_URL, SITE_NAME, withBasePath } from '@/lib/config';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import TopicsBrowser from '@/components/TopicsBrowser';
import BibleReferencesBrowser from '@/components/BibleReferencesBrowser';
import GlossaryBrowser from '@/components/GlossaryBrowser';
import KeywordsBrowser from '@/components/KeywordsBrowser';
import ReadingContainer from '@/components/ReadingContainer';
import Breadcrumb, { Crumb } from '@/components/Breadcrumb';
import PrevNextNav from '@/components/PrevNextNav';
import RelatedDocs from '@/components/RelatedDocs';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

// Titles for the special browser pages that don't map to a single document
const SPECIAL_PAGES: Record<string, { title: string; description: string }> = {
  'search/topics': {
    title: 'Browse by Topic',
    description: "Explore Neville Goddard's teachings organized by topic and theme.",
  },
  'search/bible-references': {
    title: 'Bible References',
    description: 'Browse every Bible verse referenced across Neville Goddard\'s books and lectures.',
  },
  'search/keywords': {
    title: 'Browse by Keyword',
    description: "Explore Neville Goddard's teachings through the key terms of his vocabulary.",
  },
  'glossary': {
    title: 'Glossary of Terms',
    description: 'Definitions of the metaphysical concepts and terminology core to the teachings of Neville Goddard.',
  },
};

export async function generateStaticParams() {
  const tree = getVaultTree();
  const paths: { slug: string[] }[] = [];

  function traverse(nodes: VaultNode[]) {
    for (const node of nodes) {
      paths.push({ slug: node.slug });
      if (node.children) {
        traverse(node.children);
      }
    }
  }

  traverse(tree);
  return paths;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const slugPath = slug.join('/').toLowerCase();
  const canonical = `${SITE_URL}/${slugPath}/`;

  const special = SPECIAL_PAGES[slugPath];
  if (special) {
    return {
      title: special.title,
      description: special.description,
      alternates: { canonical },
      openGraph: {
        title: special.title,
        description: special.description,
        url: canonical,
        siteName: SITE_NAME,
        type: 'website',
      },
    };
  }

  const doc = getDocumentBySlug(slug);
  if (!doc) return {};

  const meta = getDocMetaBySlug(slug);
  const breadcrumbNames = getBreadcrumbNames(slug);
  const title = meta?.title || breadcrumbNames[breadcrumbNames.length - 1] || slug[slug.length - 1];
  const description = getExcerpt(doc.content) || `${title} — ${SITE_NAME}`;
  const banner = getBannerForSlug(slug);

  return {
    title:
      meta?.book && !title.toLowerCase().includes(meta.book.toLowerCase())
        ? `${title} – ${meta.book}`
        : title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type: 'article',
      images: banner ? [{ url: `${SITE_URL}/images/banners/${banner}` }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function DocumentPage({ params }: PageProps) {
  const resolvedParams = await params;

  const isSearchTopics = resolvedParams.slug.length === 2 &&
                         resolvedParams.slug[0].toLowerCase() === 'search' &&
                         resolvedParams.slug[1].toLowerCase() === 'topics';

  if (isSearchTopics) {
    return (
      <article className="glass animate-fade-in" style={{ padding: '3rem', borderRadius: '16px', overflow: 'hidden' }}>
        <TopicsBrowser />
      </article>
    );
  }

  const isBibleRef = resolvedParams.slug.length === 2 &&
                     resolvedParams.slug[0].toLowerCase() === 'search' &&
                     resolvedParams.slug[1].toLowerCase() === 'bible-references';

  if (isBibleRef) {
    return (
      <article className="glass animate-fade-in" style={{ padding: '3rem', borderRadius: '16px', overflow: 'hidden' }}>
        <BibleReferencesBrowser />
      </article>
    );
  }

  const isKeywords = resolvedParams.slug.length === 2 &&
                     resolvedParams.slug[0].toLowerCase() === 'search' &&
                     resolvedParams.slug[1].toLowerCase() === 'keywords';

  if (isKeywords) {
    return (
      <article className="glass animate-fade-in" style={{ padding: '3rem', borderRadius: '16px', overflow: 'hidden' }}>
        <KeywordsBrowser />
      </article>
    );
  }

  const isGlossary = resolvedParams.slug.length === 1 &&
                     resolvedParams.slug[0].toLowerCase() === 'glossary';

  if (isGlossary) {
    const doc = getDocumentBySlug(resolvedParams.slug);
    if (!doc) {
      notFound();
    }
    return (
      <article className="glass animate-fade-in" style={{ padding: '3rem', borderRadius: '16px', overflow: 'hidden' }}>
        <GlossaryBrowser content={doc.content} />
      </article>
    );
  }

  const doc = getDocumentBySlug(resolvedParams.slug);

  if (!doc) {
    notFound();
  }

  const bannerFile = getBannerForSlug(resolvedParams.slug);
  const meta = getDocMetaBySlug(resolvedParams.slug);
  const breadcrumbNames = getBreadcrumbNames(resolvedParams.slug);
  const title = meta?.title || breadcrumbNames[breadcrumbNames.length - 1];

  const crumbs: Crumb[] = breadcrumbNames.map((name, i) => ({
    label: name,
    href: i < breadcrumbNames.length - 1
      ? `/${resolvedParams.slug.slice(0, i + 1).join('/')}`
      : null,
  }));

  const isDocument = !doc.isDirectory;
  const readingTime = isDocument ? getReadingTimeMinutes(doc.content) : undefined;
  const adjacent = isDocument ? getAdjacentDocs(resolvedParams.slug) : { prev: null, next: null };
  const related = isDocument ? getRelatedDocs(resolvedParams.slug) : [];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    author: { '@type': 'Person', name: 'Neville Goddard' },
    publisher: { '@type': 'Organization', name: SITE_NAME },
    url: `${SITE_URL}/${resolvedParams.slug.join('/').toLowerCase()}/`,
    ...(bannerFile ? { image: `${SITE_URL}/images/banners/${bannerFile}` } : {}),
    ...(meta?.book ? { isPartOf: { '@type': 'Book', name: meta.book } } : {}),
  };

  return (
    <article className="glass animate-fade-in" style={{ padding: '3rem', borderRadius: '16px', overflow: 'hidden' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {bannerFile && (
        <div style={{
          margin: '-3rem -3rem 2rem -3rem',
          position: 'relative',
          height: '200px',
          overflow: 'hidden'
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={withBasePath(`/images/banners/${bannerFile}`)}
            alt={`${breadcrumbNames[breadcrumbNames.length - 1]} banner`}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
      )}
      <Breadcrumb crumbs={crumbs} readingTime={readingTime} />
      <ReadingContainer>
        <MarkdownRenderer content={doc.content} />
      </ReadingContainer>
      <PrevNextNav prev={adjacent.prev} next={adjacent.next} />
      <RelatedDocs docs={related} />
    </article>
  );
}
