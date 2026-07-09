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

/**
 * Permanent institutional assets (Phase 5) — paper guidelines, templates,
 * policies, codes of conduct. Markdown entries; the body is the document
 * itself for `type: md`, otherwise frontmatter points at the file.
 */
const documents = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/documents',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z
    .object({
      title: z.string(),
      description: z.string(),
      lang: z.enum(['zh', 'en']),
      type: z.enum(['pdf', 'docx', 'md', 'link']),
      fileUrl: z.string().optional(),
      version: z.string(),
      updatedDate: z.coerce.date(),
      order: z.number().default(0),
    })
    .refine((d) => d.type === 'md' || Boolean(d.fileUrl), {
      message: 'fileUrl is required unless type is "md"',
    }),
});

/**
 * Exhibition media (Phase 5) — images, videos, slides tied to an edition
 * via issueRef. Data-first entities, so entries are YAML (RFC-100 §2.2).
 */
const media = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/media' }),
  schema: z.object({
    type: z.enum(['image', 'video', 'slide']),
    src: z.string(),
    caption: z.object({ zh: z.string(), en: z.string() }),
    credit: z.object({ zh: z.string(), en: z.string() }),
    date: z.coerce.date(),
    issueRef: z.string().regex(/^issue-\d{3}$/),
  }),
});

export const collections = { conference, documents, media };
