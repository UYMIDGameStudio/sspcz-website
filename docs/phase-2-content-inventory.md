# Phase 2 Content Inventory — Legacy → Content Layer Mapping

Per ADR-001 §4 Phase 2. The Chinese legacy text is the authoritative SSOT;
English extractions align with its structural schema. English theme name
follows **EDR-001: "Change & Invariance"** everywhere.

## Destinations

| Kind | Destination |
|------|-------------|
| Editorial narrative | `src/content/conference/issue-003/*.{zh,en}.md` |
| Matrix/timeline data | `src/data/issue-003/*.yaml` (atomic units, zero HTML) |
| Interface micro-copy | `src/i18n/{zh,en}.ts` |

## Page-by-page mapping

### index.html / en/index.html (首页)

| Legacy section | Destination |
|----------------|-------------|
| Hero title/subtitle | derived: `i18n.siteName*` + `issue.yaml` (theme, dates) |
| Hero lead paragraph | `i18n.home.heroLead` |
| Hero CTAs | `i18n.actions.*` |
| Ticker marquee | **retired** (marketing grammar + Greek iconography; Q3/RFC-000 §3) |
| 关于大会 two paragraphs | `about.{zh,en}.md` ¶1–2 |
| 历届大会 cards I/II | `committee.yaml → pastSessions[].summary` |
| 历届大会 card III (NOW badge) | copy → `i18n.home.currentIssueCard`; NOW badge **retired** |
| 版块入口 descriptions | derived from `issue.yaml` (cfp dates, pillars) + `i18n.nav` |
| Footer | `i18n.closing.copyright`; ΦΙΛΟΣΟΦΙΑ mark **retired** (Q3) |

### third-session.html (第三届大会)

| Legacy section | Destination |
|----------------|-------------|
| Hero lead | `i18n.currentIssue.heroLead` (same text as `about.md` ¶3) |
| Φ watermark | **retired** (Q3) |
| Info band (dates/venue/audience) | `issue.yaml → dates, location, audience` |
| 大会主题 + 组委寄语 (full letter, Su Shi quote) | `theme-letter.{zh,en}.md`; citation apparatus added per RFC-200 §2 |
| 三大板块 | `issue.yaml → pillars[]` |
| 与会者类别 | `issue.yaml → participantCategories[]` |
| 主办与支持 rows | `committee.yaml → hosts/coOrganizers/academicSupport/supportingSocieties` |
| 往届回顾 paragraph | merged into `about.{zh,en}.md` ¶2 (near-duplicate of index 关于大会 ¶2) |
| CTA band (与我们一起…/Sapere aude) | `i18n.closing.motto*` (Phase 3 decides usage) |

### cfp.html (征稿启事)

| Legacy section | Destination |
|----------------|-------------|
| Intro, 征稿对象, 大会主题, 评审标准, 奖项, 原创性, AI 政策, 投稿方式 | `cfp.{zh,en}.md` |
| Timeline (投稿开通/截止/大会讲演) | `issue.yaml → cfp` (dates externalized; narrative no longer hardcodes them) |
| Contact email | `issue.yaml → contact.email` |

### schedule.html (日程安排)

| Legacy section | Destination |
|----------------|-------------|
| All 12 sessions (formerly a JS literal) | `schedule.yaml` — atomic `timeStart`/`timeEnd`/`kind`/`kindLabel`/`title`/`abstract`, grouped by `day`+`date` |
| Lead + provisional footnote | `i18n.program.*` |

### committee.html (组委会)

| Legacy section | Destination |
|----------------|-------------|
| 本届组织 rows (主办/协办/学术支持/组织架构/联合社团支持) | `committee.yaml`; fused school+society strings split into atomic `school` + `society` units |
| 历届组织 I/II | `committee.yaml → pastSessions[]` (hosts/coOrganizers/supporters as atomic name records) |
| 往届嘉宾 chips | `speakers.yaml → pastSpeakers[]` (atomic `familyName`/`givenName`/`honorific`) |
| 合作联络 | `committee.yaml → partnership` |

### register.html (注册报名)

| Legacy section | Destination |
|----------------|-------------|
| Intro + CFP box | `i18n.register.lead / cfpNote` (dates externalized to `issue.yaml`) |
| Form labels/placeholders/options/messages | `i18n.register.*` |

### policies.html (会议政策)

| Legacy section | Destination |
|----------------|-------------|
| 关于审核 (10) + 关于学术不端 (3) + provenance notes | `policies.{zh,en}.md` |

## Normalizations applied (RFC-200 §2)

- zh quotation marks normalized to 「」（inner 『』 unused so far); en uses
  typographic quotes.
- The Su Shi quotation now carries a citation (苏轼《赤壁赋》 / Su Shi,
  *First Ode on the Red Cliffs*).
- Dates/quotas live in exactly one place: dates in `issue.yaml`; the 2+4
  paper quotas remain in the CFP narrative only.

## Intentionally retired (not extracted)

Ticker marquee text, Φ watermark, Φ favicon, ΦΙΛΟΣΟΦΙΑ footer mark, "NOW"
badge — retired under Q3 (Greek-alphabet iconography) and RFC-000 §3
(marketing grammar). Recorded here so the omission is auditable.
