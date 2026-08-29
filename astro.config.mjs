// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import yaml from '@rollup/plugin-yaml';

// Canonical origin + base path. The custom domain serves from the root;
// BASE stays '' unless the site ever moves back under a sub-path.
const SITE = 'https://sspcz.org';
const BASE = '';

// Page-specific editorial dates. These are intentionally content dates, not
// build dates: a deploy must not make every URL look newly revised.
const LASTMOD_BY_PATH = new Map([
  ['/', '2026-08-14'],
  ['/en/', '2026-08-14'],
  ['/about/', '2026-08-14'],
  ['/en/about/', '2026-08-14'],
  ['/archive/', '2026-08-14'],
  ['/en/archive/', '2026-08-14'],
  ['/resources/', '2026-08-29'],
  ['/en/resources/', '2026-08-29'],
  ['/resources/academic-ethics-declaration/', '2026-08-29'],
  ['/en/resources/academic-ethics-declaration/', '2026-08-29'],
  ['/resources/paper-guidelines/', '2026-02-01'],
  ['/en/resources/paper-guidelines/', '2026-02-01'],
  ['/resources/paper-template/', '2026-07-11'],
  ['/en/resources/paper-template/', '2026-07-11'],
  ['/resources/paper-sample/', '2026-07-11'],
  ['/en/resources/paper-sample/', '2026-07-11'],
  ['/resources/code-of-conduct/', '2026-02-05'],
  ['/en/resources/code-of-conduct/', '2026-02-05'],
  ['/resources/theme-explanation/', '2026-04-19'],
  ['/resources/phil-hackathon/', '2026-04-19'],
  ['/issue-003/', '2026-08-14'],
  ['/en/issue-003/', '2026-08-14'],
  ['/issue-003/cfp/', '2026-08-29'],
  ['/en/issue-003/cfp/', '2026-08-29'],
  ['/issue-003/policies/', '2026-08-29'],
  ['/en/issue-003/policies/', '2026-08-29'],
]);

/** Legacy static-site URLs → permanent archival homes (ADR-001 Phase 4).
 *  These map to issue-003 specifically (not "current"): the legacy pages
 *  WERE the third session, so the mapping never changes. */
const LEGACY_REDIRECTS = Object.fromEntries(
  Object.entries({
    '/third-session.html': '/issue-003/',
    '/cfp.html': '/issue-003/cfp/',
    '/schedule.html': '/issue-003/program/',
    '/committee.html': '/issue-003/committee/',
    '/policies.html': '/issue-003/policies/',
    '/register.html': '/issue-003/register/',
    '/en/third-session.html': '/en/issue-003/',
    '/en/cfp.html': '/en/issue-003/cfp/',
    '/en/schedule.html': '/en/issue-003/program/',
    '/en/committee.html': '/en/issue-003/committee/',
    '/en/policies.html': '/en/issue-003/policies/',
    '/en/register.html': '/en/issue-003/register/',
  }).map(([from, to]) => [from, `${BASE}${to}`]),
);

export default defineConfig({
  site: SITE,
  base: BASE || '/',
  output: 'static',
  trailingSlash: 'ignore',
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
  },
  redirects: LEGACY_REDIRECTS,
  integrations: [
    sitemap({
      // Bookmark print companions and the legacy /cfp/ redirect are noindex;
      // neither belongs in a sitemap of canonical pages.
      filter: (page) => {
        const pathname = new URL(page).pathname;
        return !pathname.startsWith('/b/') && pathname !== '/cfp/';
      },
      serialize: (item) => {
        const lastmod = LASTMOD_BY_PATH.get(new URL(item.url).pathname);
        return lastmod ? { ...item, lastmod } : item;
      },
      i18n: {
        defaultLocale: 'zh',
        locales: { zh: 'zh-CN', en: 'en' },
      },
    }),
  ],
  vite: {
    plugins: [yaml()],
  },
});
