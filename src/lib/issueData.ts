/**
 * Typed, schema-validated access to institutional configuration and
 * per-edition structured data (RFC-100 §2.2). Editions are DISCOVERED from
 * the filesystem via import.meta.glob — adding `src/data/issue-XXX/` makes
 * a new edition exist with zero code changes (ADR-001 Phase 3.5). The
 * build fails if any YAML drifts from its schema.
 */
import { z } from 'astro/zod';
import rawInstitution from '../data/institution.yaml';

const localized = z.object({ zh: z.string(), en: z.string() });
export type Localized = z.infer<typeof localized>;
export type Locale = keyof Localized;

export const pick = (locale: Locale, value: Localized): string => value[locale];

/* ---------- institution ---------- */

const institutionSchema = z.object({
  currentIssue: z.string().regex(/^issue-\d{3}$/),
  founded: z.number().int(),
});

export const institution = institutionSchema.parse(rawInstitution);

/* ---------- per-edition schemas ---------- */

const issueSchema = z.object({
  issue: z.number().int().positive(),
  year: z.number().int(),
  theme: localized,
  dates: z.object({
    start: z.coerce.date(),
    end: z.coerce.date(),
    durationDays: z.number().int(),
  }),
  location: z.object({
    city: localized,
    venue: z.object({ status: z.string(), note: localized }),
  }),
  audience: z.object({ primary: localized, auditors: localized }),
  contact: z.object({ email: z.string().email() }),
  cfp: z.object({
    open: z.object({ year: z.number().int(), month: z.number().int() }),
    deadline: z.object({ year: z.number().int(), month: z.number().int() }),
    presentations: z.object({ start: z.coerce.date(), end: z.coerce.date() }),
  }),
  pillars: z.array(
    z.object({ id: z.string(), kicker: localized, name: localized, summary: localized }),
  ),
  participantCategories: z.array(
    z.object({ id: z.string(), name: localized, description: localized }),
  ),
});

const sessionSchema = z.object({
  timeStart: z.string().regex(/^\d{2}:\d{2}$/),
  timeEnd: z.string().regex(/^\d{2}:\d{2}$/),
  kind: z.enum([
    'opening',
    'papers',
    'lecture',
    'briefing',
    'hackathon',
    'demo',
    'awards',
    'closing',
  ]),
  kindLabel: localized,
  title: localized,
  abstract: localized,
});

const scheduleSchema = z.object({
  issue: z.number().int().positive(),
  provisional: z.boolean(),
  days: z.array(
    z.object({
      day: z.number().int().positive(),
      date: z.coerce.date(),
      sessions: z.array(sessionSchema),
    }),
  ),
});

const orgName = z.object({ name: localized });

const committeeSchema = z.object({
  issue: z.number().int().positive(),
  hosts: z.array(orgName),
  coOrganizers: z.array(orgName),
  coOrganizersPending: z.boolean(),
  academicSupport: z.array(orgName),
  structure: z.object({
    secretariat: localized,
    teams: z.array(orgName),
    teamNote: localized,
  }),
  supportingSocieties: z.array(
    z.object({ school: localized.optional(), society: localized }),
  ),
  pastSessions: z.array(
    z.object({
      session: z.number().int().positive(),
      summary: localized,
      hosts: z.array(orgName),
      coOrganizers: z.array(orgName).optional(),
      supporters: z.array(orgName),
    }),
  ),
  partnership: z.object({ email: z.string().email(), invitation: localized }),
});

const speakerSchema = z.object({
  familyName: localized,
  givenName: localized,
  honorific: localized.optional(),
});

const speakersSchema = z.object({
  issue: z.number().int().positive(),
  currentSpeakers: z.array(speakerSchema),
  pastSpeakers: z.array(speakerSchema),
  pastSpeakersNote: localized,
});

export type Issue = z.infer<typeof issueSchema>;
export type Schedule = z.infer<typeof scheduleSchema>;
export type Committee = z.infer<typeof committeeSchema>;
export type Speakers = z.infer<typeof speakersSchema>;
export type Session = z.infer<typeof sessionSchema>;
export type Speaker = z.infer<typeof speakerSchema>;

export interface IssueBundle {
  id: string;
  issue: Issue;
  schedule: Schedule;
  committee: Committee;
  speakers: Speakers;
}

/* ---------- edition discovery ---------- */

const yamlFiles = import.meta.glob('../data/issue-*/*.yaml', {
  eager: true,
  import: 'default',
});

const rawByEdition = new Map<string, Record<string, unknown>>();
for (const [file, raw] of Object.entries(yamlFiles)) {
  const match = file.match(/(issue-\d{3})\/([a-z]+)\.yaml$/);
  if (!match) continue;
  const [, editionId, name] = match;
  const bucket = rawByEdition.get(editionId) ?? {};
  bucket[name] = raw;
  rawByEdition.set(editionId, bucket);
}

const bundles = new Map<string, IssueBundle>();
for (const [id, raw] of rawByEdition) {
  for (const required of ['issue', 'schedule', 'committee', 'speakers']) {
    if (!(required in raw)) {
      throw new Error(`Edition ${id} is missing src/data/${id}/${required}.yaml`);
    }
  }
  bundles.set(id, {
    id,
    issue: issueSchema.parse(raw.issue),
    schedule: scheduleSchema.parse(raw.schedule),
    committee: committeeSchema.parse(raw.committee),
    speakers: speakersSchema.parse(raw.speakers),
  });
}

/** Edition IDs, newest first. */
export const issueIds: string[] = [...bundles.keys()].sort().reverse();

export function getIssueBundle(id: string): IssueBundle {
  const bundle = bundles.get(id);
  if (!bundle) throw new Error(`Unknown edition: ${id} (have: ${issueIds.join(', ')})`);
  return bundle;
}

export const currentIssueId = institution.currentIssue;
export const currentIssue = getIssueBundle(currentIssueId);

export function issueIdFor(n: number): string {
  return `issue-${String(n).padStart(3, '0')}`;
}

/** Shared getStaticPaths for the dynamic [issue] routes. */
export function issueStaticPaths() {
  return issueIds.map((issue) => ({ params: { issue } }));
}

export function speakerName(locale: Locale, s: Speaker): string {
  if (locale === 'zh') {
    const honorific = s.honorific ? ` ${s.honorific.zh}` : '';
    return `${s.familyName.zh}${s.givenName.zh}${honorific}`;
  }
  const honorific = s.honorific ? `${s.honorific.en} ` : '';
  return `${honorific}${s.familyName.en} ${s.givenName.en}`;
}
