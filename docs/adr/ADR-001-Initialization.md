# ADR-001: Initialization — Migrating the Legacy Static Site to an Astro-Based Hybrid Content Publication System

- **Status**: **Accepted** (amended per design review, 2026-07-08)
- **Date**: 2026-07-08
- **Deciders**: SSPCZ secretariat / repository owner
- **Charter basis**: `docs/000-VISION.md` … `docs/400-GOVERNANCE.md`, `.ai/context.md`

---

## 1. Context: Audit of the Legacy Site

The repository root currently holds a hand-written bilingual static site:
14 HTML pages (7 Chinese at root, 7 English under `en/`), one shared
stylesheet (`assets/style.css`), one language script (`assets/lang.js`),
`sitemap.xml`, `robots.txt`. No build step. It was produced from Claude
Design prototypes before this charter existed. The audit below measures it
against each RFC.

### 1.1 RFC-400 (Engineering Governance) — red-line violations

| # | Red line | Finding | Evidence | Severity |
|---|----------|---------|----------|----------|
| F1 | Zero inline styles | Violated systemically. Styling lives almost entirely in `style="…"` attributes. | **1,032** inline `style=` attributes across 14 pages | Blocking |
| F2 | No hardcoded magic numbers / design tokens | Violated. No CSS variables; colors and spacing are literals repeated everywhere. | **35 distinct hex colors** in markup; `#122736` alone appears **233 times** | Blocking |
| F3 | DRY i18n — zero duplicated markup | Violated by construction. Every page exists twice as parallel hand-maintained HTML. | zh pages 1,109 lines; en pages 1,109 lines — a 100% duplicated structural tree | Blocking |
| F4 | Zero-JS baseline | Violated in the two content-critical places: ① `schedule.html` renders the *entire program* via JS (`DAYS` object → `innerHTML`) — with JS disabled the program is **empty**; ② `register.html` has **no `<form>` element at all** — chips and submission are synthetic `div`+JS, so registration is impossible without JS. The language modal/redirect is also JS-only (tolerable as enhancement, since header language links are real `<a>`). | `grep '<form' register.html` → 0 matches | Blocking (①②), Minor (modal) |
| F5 | Semantic class names | Partially met. Class names exist (`.site-header`, `.kv-row`) but are layout-utility flavored (`.cards-3`, `.grid-2`) rather than meaning-bearing (`.editorial-quote`). | — | Moderate |
| F6 | Lighthouse ≥95 ×4 | Unmeasured; render-blocking third-party font CSS and 1,000+ inline styles make budget compliance unlikely without restructuring. | — | Unknown |

### 1.2 RFC-100 (Content Model) — violations

- **§3 Routing principle**: all business text — the committee letter, CFP
  terms, policies, schedule entries, committee lists — is hardcoded inside
  page markup (or inside a JS literal, for the schedule). Nothing is
  retrievable as content.
- **§1 Issue paradigm**: the site models only "the 3rd session" as a
  perpetual present. Sessions I and II exist as prose fragments; there is no
  issue structure and no archive route.
- **§2 Hybrid architecture**: schedule/committee/speakers (matrix-like data
  → should be YAML) and CFP/theme letter/policies (editorial documents →
  should be Markdown/MDX) are all fused into HTML.

### 1.3 RFC-200 (Editorial) — findings

- **Naming**: the theme is rendered "Change & the Unchanging" site-wide;
  RFC-200 cites "Change and Permanence" as the canonical capitalization
  example. Needs an editorial ruling (open question Q1) — whichever wins
  must become a single content-layer constant.
- **Punctuation**: mixed conventions — zh pages alternate between 「」 and
  curly quotes; en pages mix straight and typographic quotes (some inside JS
  string literals).
- **Citations**: the Su Shi quotation (前赤壁赋) and the committee letter's
  references (Heraclitus, Parmenides, the *Book of Changes*) carry no
  citation apparatus.
- **§3 Archival permalinks**: flat filenames (`third-session.html`) are not
  archival URLs; when Issue IV arrives, Issue III content has no stable
  permanent home. Migration must define the permanent URL scheme now and
  preserve legacy inbound links via redirect stubs.

### 1.4 RFC-300 (Design Language) — findings

- **Core Axiom violations**: the hero's giant **Φ watermark** and the
  **ΦΙΛΟΣΟΦΙΑ ticker tape** derive from Greek-alphabet iconography — exactly
  the "clichés of philosophical history" the axiom forbids. The favicon
  (Φ glyph) shares the problem.
- **Marketing grammar** (conflicts with RFC-000 §3): hero CTA pairs
  ("立即报名"), ticker marquee, "NOW" badge cards — landing-page vocabulary,
  not publication vocabulary.
- **Latent compliance worth preserving**: the numbered section labels
  (`01 — THEME`) already gesture toward §2.2 *Numbering as Structure*; the
  340px left label column gestures toward §2.1 *Marginalia*. Both should be
  formalized rather than discarded.
- **§2.4 Running header**: the current sticky bar is generic site nav; no
  persistent publication metadata.

### 1.5 RFC-000 (Vision) — overall stance

The legacy site *is* an event website: it sells attendance. The vision
demands a publication platform: each session an Issue, the interface "a
desk with an open, annotated book." This is a reframing of information
architecture, not just a reskin.

---

## 2. Decision

Rebuild as an **Astro (v5, fully static output) hybrid content publication
system**, migrating all content out of markup first, then reconstructing
pages from shared bilingual templates under the RFC-300 visual grammar.

### 2.1 Content keys: logical session IDs, not years

Issues are keyed by **logical session ID** (`issue-003`), never by
chronological year. The year (2026) is demoted to frontmatter metadata
(`year: 2026`), decoupling the event sequence from chronological anomalies
(postponements, split years, multiple events in one year). RFC-200 §3's
`/archive/2025/cfp` is read as an *illustrative* permalink example; its
normative content — permanence and immutability — is satisfied by
session-ID permalinks, with chronology surfaced through metadata (e.g. in
the running publication header).

### 2.2 Target structure

```
/
├─ CLAUDE.md  .ai/context.md  docs/            # charter + ADRs (this file)
├─ astro.config.mjs                            # i18n: zh (default, root), en (/en/)
├─ package.json
├─ src/
│  ├─ content.config.ts                        # Zod schemas per collection
│  ├─ content/conference/issue-003/            # editorial documents (RFC-100 §2.1); year in frontmatter
│  │   ├─ cfp.{zh,en}.md
│  │   ├─ theme-letter.{zh,en}.md
│  │   ├─ policies.{zh,en}.md
│  │   └─ about.{zh,en}.md
│  ├─ data/issue-003/                          # structured data (RFC-100 §2.2)
│  │   ├─ schedule.yaml
│  │   ├─ committee.yaml
│  │   └─ speakers.yaml
│  ├─ styles/
│  │   ├─ tokens.css                           # the ONLY place colors/spacing/type live (RFC-400 §3)
│  │   └─ global.css
│  ├─ patterns/                                # layout-level structural abstractions ONLY
│  │                                           #   (e.g. EditorialGrid, Marginalia, RunningHeader)
│  ├─ layouts/                                 # document flow and grid definitions
│  ├─ components/                              # semantic, stateless, scoped UI elements
│  │                                           #   (e.g. Dialectic, SectionCounter)
│  ├─ i18n/{zh,en}.ts                          # UI micro-copy dictionaries + helper
│  └─ pages/                                   # thin routing wrappers ONLY (RFC-100 §3)
│      ├─ index.astro                          # current-issue front door (thin re-export)
│      ├─ issue-003/…                          # permanent issue routes
│      └─ en/…                                 # mirrored thin routes — zero duplicated markup
└─ public/
```

**Component boundaries (RFC-400 §2, clarified)**: `patterns/` strictly
contains layout-level structural abstractions — grid frames, margin tracks,
running publication headers. Semantic UI elements — dialogical
presentation, sectional counters — belong in `components/`, stateless and
scoped. `layouts/` composes patterns into document flows.

### 2.3 How each red line is satisfied

- **Zero inline styles / tokens**: all styling in scoped component CSS
  drawing exclusively on `tokens.css` custom properties (the existing cold
  palette — ink, accent, paper — survives *as tokens*; the palette itself
  was never the violation). CI lint rejects `style=` attributes and raw hex
  outside `tokens.css`.
- **DRY i18n**: one template per page; per-locale Markdown bodies + YAML
  bilingual fields + UI dictionaries. Adding a locale = adding content
  files, not markup.
- **Zero-JS baseline**:
  - *Program*: rendered fully server-side. Recommendation (Q2): drop the
    tab interaction entirely and render all days sequentially under
    numbered day headings — RFC-300 §3 "meaning over interaction"; fallback
    option is CSS-only `:target` day anchors. Either way the program is
    complete in plain HTML.
  - *Registration*: a real `<form method="post">` with native
    `<input type="radio">` choices styled via `:checked` — functional with
    JS disabled; JS only adds inline validation and async submit. (The
    backend the form posts to is a non-goal of this ADR; see §6.)
  - *Language*: real link switcher + `hreflang` alternates
    (server-rendered); the first-visit modal and cookie auto-redirect remain
    a progressive enhancement, no longer load-bearing.
- **QA**: CI — build, type/content-schema check, style lint, HTML
  validation, link check; a Lighthouse CI budget (≥95 ×4) is wired once
  real pages exist (Phase 3) and gates every PR thereafter.

### 2.4 Visual grammar: architectural capabilities

This ADR fixes *capabilities*, not component inventories. The system shall
expose reusable, token-driven patterns supporting:

1. **Marginal annotation** — an asymmetric grid with a dedicated margin
   track for metadata and contextual notes (no tooltips);
2. **Running publication metadata** — a persistent header framing the
   viewport like a journal page (publication, issue, year — the year drawn
   from issue frontmatter per §2.1);
3. **Counter-based sectional numbering** — CSS-counter structure as the
   primary decoration, replacing card/bullet UI;
4. **Dialogical presentation** — voice-shifted alignment and indentation
   for distinct voices and quotations, with citation apparatus per RFC-200.

At reconstruction, motifs derived from Greek iconography (Φ watermark,
ΦΙΛΟΣΟΦΙΑ ticker, Φ favicon) and marketing grammar (CTA pairs, badges,
marquees) are retired. Concrete component names, file layout within the
boundaries of §2.2, and all visual specifics are implementation decisions
reviewed at Phase 3 — not fixed here.

### 2.5 URL & archive strategy (RFC-200 §3)

- Permanent issue URLs keyed by session ID: `/issue-003/cfp/`,
  `/en/issue-003/program/`, … — never to change after publication.
- `/` renders the current issue via a thin re-export, so "the current
  session" has a stable front door while permalinks stay archival (open
  question Q4).
- Legacy flat URLs (`/third-session.html`, `/en/cfp.html`, …) receive
  static redirect stubs to their new homes so existing inbound links never
  404.
- When Issue IV begins, `issue-003/` freezes as a read-only archive with
  visual integrity retained (its templates and tokens are versioned in
  git).

### 2.6 Typography

Latin serif: system Times New Roman stack (existing decision; zero network
cost), recorded as a design token. CJK font *loading strategy* (self-hosting,
subsetting, fallbacks) is explicitly out of scope here — see §6 Non-goals —
and will be decided in a dedicated ADR when performance work begins; until
then the token references the Noto Serif/Sans SC families with system
fallbacks.

---

## 3. Alternatives considered

| Option | Verdict | Reason |
|--------|---------|--------|
| A. Keep hand-written HTML, extract shared CSS only | Rejected | Cannot satisfy DRY i18n or the content model; every edit stays ×2 |
| B. Eleventy | Viable, rejected | Astro's Content Collections + Zod give the schema validation RFC-100 §2.1 explicitly demands, with built-in i18n routing and first-class Markdown/MDX |
| C. Next.js / Nuxt | Rejected | Runtime framework contradicts the Zero-JS baseline; SSR hosting complexity buys nothing for a static publication |
| D. Headless CMS | Deferred | Git-versioned MD/YAML *is* the editorial trail at secretariat scale; revisit if non-technical editing becomes a bottleneck |

## 4. Migration plan (phased; each phase = one reviewable unit)

- **Phase 0 — this ADR** (docs only). Exit: approval. ✅ approved with
  amendments.
- **Phase 1 — Scaffold**: Astro init, `tokens.css`, layout/pattern/component
  skeleton, i18n dictionaries, content schema, CI pipeline. Legacy files
  untouched and still deployed. Exit: empty shell passes all existing QA
  gates.
- **Phase 2 — Content extraction**: hoist 100% of business text from the
  14 legacy pages into Markdown/YAML/dictionaries under `issue-003/`
  against a per-page inventory checklist (zh authoritative; en aligned;
  theme-name ruling Q1 applied). Exit: no business text remains only in
  legacy HTML.
- **Phase 3 — Reconstruction**: build the routes × 2 locales from shared
  templates under the new visual grammar; side-by-side review against
  legacy screenshots — parity where legacy was compliant, documented
  divergence where it was not. Lighthouse budget gate activated.
- **Phase 4 — Cutover**: redirect stubs, regenerated sitemap/hreflang,
  deploy docs, README rewrite. The legacy HTML/CSS/JS is then **completely
  deleted** in the same change, after tagging the last commit containing it
  as **`legacy-static-site`** — Git is the archive; no `legacy/` directory
  is kept.

## 5. Consequences

**Positive**: single-source bilingual content with schema validation;
issues become archivable folders keyed by stable session IDs; every visual
decision traceable to a token; the reading experience works with JS off;
CI-enforced governance instead of good intentions.

**Negative / accepted costs**: a build step enters the workflow (Node
required for contributors); one-time migration effort across four phases;
the decorative layer is *redesigned*, not ported — requires taste review at
Phase 3.

**Risks & mitigations**: redesign scope creep → phase gates + screenshot
review; content drift during migration → freeze legacy edits once Phase 2
starts; deleted legacy needed later → `legacy-static-site` git tag
guarantees byte-exact retrieval.

## 6. Non-goals

ADR-001 deliberately does **not** decide:

1. **Final visual design** — concrete spacing, type scale values, component
   aesthetics (Phase 3 review + future ADRs as needed);
2. **Typography optimization** — font self-hosting, subsetting, loading
   strategy;
3. **Deployment provider** — GitHub Pages vs alternatives, CDN, custom
   domain and ICP concerns;
4. **Registration backend** — the form's `action` endpoint and data
   custody;
5. **Analytics** — measurement of any kind.

Each becomes its own decision (ADR or reviewed PR) when its phase arrives.

## 7. Open questions for the secretariat

1. **Q1 — English theme name**: "Change & the Unchanging" (live site) vs
   "Change and Permanence" (RFC-200's example). One must become canonical
   before Phase 2 content extraction.
2. **Q2 — Program presentation**: sequential all-days rendering
   (recommended; structure over interaction) vs CSS-only day anchors.
   Tabs-with-JS is off the table either way.
3. **Q3 — Motif retirement sign-off**: confirm removal of Φ/ΦΙΛΟΣΟΦΙΑ in
   favor of the §2.4 capabilities (affects Phase 3 review criteria).
4. **Q4 — Root URL semantics**: `/` renders current issue (proposed) vs
   `/` redirects to `/issue-003/`.
