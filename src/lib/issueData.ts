/**
 * Typed, schema-validated access to the issue-003 structured data
 * (RFC-100 §2.2). The build fails if any YAML drifts from its schema —
 * the same guarantee content collections give editorial documents.
 */
import { z } from 'astro/zod';
import rawIssue from '../data/issue-003/issue.yaml';
import rawSchedule from '../data/issue-003/schedule.yaml';
import rawCommittee from '../data/issue-003/committee.yaml';
import rawSpeakers from '../data/issue-003/speakers.yaml';

const localized = z.object({ zh: z.string(), en: z.string() });
export type Localized = z.infer<typeof localized>;
export type Locale = keyof Localized;

export const pick = (locale: Locale, value: Localized): string => value[locale];

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

export const issue = issueSchema.parse(rawIssue);
export const schedule = scheduleSchema.parse(rawSchedule);
export const committee = committeeSchema.parse(rawCommittee);
export const speakers = speakersSchema.parse(rawSpeakers);

export type Session = z.infer<typeof sessionSchema>;
export type Speaker = z.infer<typeof speakerSchema>;

export function speakerName(locale: Locale, s: Speaker): string {
  if (locale === 'zh') {
    const honorific = s.honorific ? ` ${s.honorific.zh}` : '';
    return `${s.familyName.zh}${s.givenName.zh}${honorific}`;
  }
  const honorific = s.honorific ? `${s.honorific.en} ` : '';
  return `${honorific}${s.familyName.en} ${s.givenName.en}`;
}
