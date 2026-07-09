// @ts-check
import { defineConfig } from 'astro/config';
import yaml from '@rollup/plugin-yaml';

// Deployment provider (site/base URLs) is a non-goal of ADR-001 §6 and is
// configured at Phase 4 cutover.
export default defineConfig({
  output: 'static',
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
  },
  vite: {
    plugins: [yaml()],
  },
});
