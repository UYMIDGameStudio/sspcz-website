import type { Locale } from './issueData';

export type RouteKey =
  | 'home'
  | 'issue'
  | 'cfp'
  | 'program'
  | 'committee'
  | 'policies'
  | 'register';

/** Permanent issue permalinks are keyed by logical session ID (ADR-001 §2.1/2.5). */
const ISSUE_BASE = '/issue-003';

export function path(locale: Locale, key: RouteKey): string {
  const prefix = locale === 'en' ? '/en' : '';
  if (key === 'home') return `${prefix}/`;
  if (key === 'issue') return `${prefix}${ISSUE_BASE}/`;
  return `${prefix}${ISSUE_BASE}/${key}/`;
}

export function switchLocale(locale: Locale, key: RouteKey): string {
  return path(locale === 'zh' ? 'en' : 'zh', key);
}
