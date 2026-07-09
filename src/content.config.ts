import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Editorial documents (RFC-100 §2.1) — narrative texts per issue.
 * Directory keys are logical session IDs (issue-003); chronology is
 * frontmatter metadata (ADR-001 §2.1).
 */
const conference = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/conference',
    // Deterministic IDs: the file path minus extension (`issue-003/cfp.en`),
    // instead of the default slugger which strips the locale dot.
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    lang: z.enum(['zh', 'en']),
    issue: z.number().int().positive(),
    year: z.number().int(),
    kind: z.enum(['cfp', 'theme-letter', 'policies', 'about']),
    order: z.number().default(0),
  }),
});

export const collections = { conference };
