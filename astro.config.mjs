// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import yaml from '@rollup/plugin-yaml';

// Canonical origin + base path. The custom domain serves from the root;
// BASE stays '' unless the site ever moves back under a sub-path.
const SITE = 'https://sspcz.org';
const BASE = '';

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
      // The /b/ bookmark landing pages are noindex print companions.
      filter: (page) => !page.includes('/b/'),
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
