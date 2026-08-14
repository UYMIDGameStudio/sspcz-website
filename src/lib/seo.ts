import type { Locale, IssueBundle } from './issueData';
import { pick } from './issueData';
import { dateRange, issueTitle } from './format';
import type { RouteKey } from './routes';

const SITE = 'https://sspcz.org';

export const SEO_IDS = {
  organization: `${SITE}/#organization`,
  website: `${SITE}/#website`,
  image: `${SITE}/#primaryimage`,
} as const;

export const DEFAULT_SHARE_IMAGE = {
  url: `${SITE}/brand/logo-symbol.png`,
  width: 224,
  height: 224,
  alt: {
    zh: '浙江中学生哲学大会官方标识',
    en: 'Official identity of the Secondary School Philosophy Conference of Zhejiang',
  },
} as const;

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface StructuredDataOptions {
  locale: Locale;
  route: RouteKey;
  bundle: IssueBundle;
  pageUrl: string;
  title: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
  creativeWork?: CreativeWorkMetadata;
  faqItems?: FaqItem[];
}

export interface CreativeWorkMetadata {
  name: string;
  description: string;
  version: string;
  dateModified: string;
  fileUrl?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

const absolute = (pathname: string): string => new URL(pathname, SITE).href;

/**
 * Build one connected JSON-LD graph for every canonical page. The stable
 * @ids keep SSPCZ, the website and each event from fragmenting into duplicate
 * entities when a crawler encounters the bilingual pages independently.
 */
export function buildStructuredData({
  locale,
  route,
  bundle,
  pageUrl,
  title,
  description,
  breadcrumbs,
  creativeWork,
  faqItems,
}: StructuredDataOptions) {
  const language = locale === 'zh' ? 'zh-CN' : 'en';
  const organizationName = '浙江中学生哲学大会';
  const organizationEnglishName = 'Secondary School Philosophy Conference of Zhejiang';
  const isInstitutionRoute = ['home', 'about', 'archive', 'resources'].includes(route);
  const eventId = `${SITE}/${bundle.id}/#event`;
  const issueUrl = absolute(locale === 'zh' ? `/${bundle.id}/` : `/en/${bundle.id}/`);

  const organization = {
    '@type': 'Organization',
    '@id': SEO_IDS.organization,
    name: organizationName,
    alternateName: [organizationEnglishName, 'SSPCZ'],
    url: `${SITE}/`,
    foundingDate: '2022',
    logo: { '@id': SEO_IDS.image },
    email: bundle.issue.contact.email,
    areaServed: {
      '@type': 'AdministrativeArea',
      name: locale === 'zh' ? '中国浙江省' : 'Zhejiang, China',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'conference enquiries',
      email: bundle.issue.contact.email,
      availableLanguage: ['zh-CN', 'en'],
    },
    subjectOf: [
      'https://www.sohu.com/a/918851833_121627717',
      'https://www.bilibili.com/video/BV1eT4y187FM/',
      'https://www.jingsailian.com/sheke/162812.html',
    ].map((url) => ({ '@type': 'CreativeWork', url })),
  };

  const website = {
    '@type': 'WebSite',
    '@id': SEO_IDS.website,
    url: `${SITE}/`,
    name: organizationName,
    alternateName: ['SSPCZ', organizationEnglishName],
    publisher: { '@id': SEO_IDS.organization },
    inLanguage: ['zh-CN', 'en'],
  };

  const image = {
    '@type': 'ImageObject',
    '@id': SEO_IDS.image,
    contentUrl: DEFAULT_SHARE_IMAGE.url,
    url: DEFAULT_SHARE_IMAGE.url,
    width: DEFAULT_SHARE_IMAGE.width,
    height: DEFAULT_SHARE_IMAGE.height,
    caption: DEFAULT_SHARE_IMAGE.alt[locale],
    representativeOfPage: true,
    copyrightHolder: { '@id': SEO_IDS.organization },
  };

  const breadcrumbId = `${pageUrl}#breadcrumb`;
  const breadcrumb = {
    '@type': 'BreadcrumbList',
    '@id': breadcrumbId,
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  const page = {
    '@type':
      route === 'about'
        ? 'AboutPage'
        : route === 'archive' || (route === 'resources' && !creativeWork)
          ? 'CollectionPage'
          : 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: title,
    description,
    inLanguage: language,
    isPartOf: { '@id': SEO_IDS.website },
    publisher: { '@id': SEO_IDS.organization },
    primaryImageOfPage: { '@id': SEO_IDS.image },
    breadcrumb: { '@id': breadcrumbId },
    about: { '@id': isInstitutionRoute ? SEO_IDS.organization : eventId },
  };

  const graph: Record<string, unknown>[] = [organization, website, image, breadcrumb, page];

  if (!isInstitutionRoute) {
    const event = {
      '@type': 'Event',
      '@id': eventId,
      name: `${issueTitle(bundle.issue.issue, locale, organizationName)} · ${pick(locale, bundle.issue.theme)}`,
      description: `${dateRange(bundle.issue.dates.start, bundle.issue.dates.end, locale)} · ${description}`,
      url: issueUrl,
      startDate: bundle.issue.dates.start.toISOString().slice(0, 10),
      endDate: bundle.issue.dates.end.toISOString().slice(0, 10),
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      inLanguage: ['zh-CN', 'en'],
      image: { '@id': SEO_IDS.image },
      location: {
        '@type': 'Place',
        name: `${pick(locale, bundle.issue.location.city)} · ${pick(locale, bundle.issue.location.venue.note)}`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: pick(locale, bundle.issue.location.city),
          addressRegion: locale === 'zh' ? '浙江省' : 'Zhejiang',
          addressCountry: 'CN',
        },
      },
      organizer: { '@id': SEO_IDS.organization },
      audience: {
        '@type': 'Audience',
        audienceType: pick(locale, bundle.issue.audience.primary),
      },
      ...(bundle.issue.registration && {
        sameAs: bundle.issue.registration.page,
        offers: {
          '@type': 'Offer',
          url: bundle.issue.registration.page,
          availability: 'https://schema.org/InStock',
        },
      }),
    };

    graph.push(event);
    Object.assign(page, { mainEntity: { '@id': eventId } });
  }

  if (creativeWork) {
    const creativeWorkId = `${pageUrl}#creativework`;
    graph.push({
      '@type': 'CreativeWork',
      '@id': creativeWorkId,
      url: pageUrl,
      name: creativeWork.name,
      description: creativeWork.description,
      inLanguage: language,
      version: creativeWork.version,
      dateModified: creativeWork.dateModified,
      author: { '@id': SEO_IDS.organization },
      publisher: { '@id': SEO_IDS.organization },
      copyrightHolder: { '@id': SEO_IDS.organization },
      isPartOf: { '@id': SEO_IDS.website },
      ...(creativeWork.fileUrl && {
        encoding: {
          '@type': 'MediaObject',
          contentUrl: absolute(creativeWork.fileUrl),
        },
      }),
    });
    Object.assign(page, { mainEntity: { '@id': creativeWorkId } });
  }

  if (faqItems?.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      url: pageUrl,
      inLanguage: language,
      isPartOf: { '@id': `${pageUrl}#webpage` },
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

/** Escape the only sequence that can break out of an HTML script element. */
export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
