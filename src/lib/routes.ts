import type { Locale } from './issueData';

export type RouteKey =
  | 'home'
  | 'resources'
  | 'issue'
  | 'cfp'
  | 'program'
  | 'committee'
  | 'policies'
  | 'register';

/** Base-path aware prefix (deployment base is set in astro.config). */
const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

/**
 * `home` is the institutional root; every other key lives inside an
 * edition, addressed by its logical session ID (ADR-001 §2.1/2.5).
 */
export function path(locale: Locale, key: RouteKey, issueId?: string): string {
  const prefix = `${BASE}${locale === 'en' ? '/en' : ''}`;
  if (key === 'home') return `${prefix}/`;
  if (key === 'resources') return `${prefix}/resources/`;
  if (!issueId) throw new Error(`Route "${key}" requires an edition ID`);
  if (key === 'issue') return `${prefix}/${issueId}/`;
  return `${prefix}/${issueId}/${key}/`;
}

/** Prefix site-absolute asset URLs with the deployment base path. */
export function withBase(url: string): string {
  return url.startsWith('/') ? `${BASE}${url}` : url;
}

export function switchLocale(locale: Locale, key: RouteKey, issueId?: string): string {
  return path(locale === 'zh' ? 'en' : 'zh', key, issueId);
}
