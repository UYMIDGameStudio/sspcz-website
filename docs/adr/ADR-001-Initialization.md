# ADR-001: Initialization — Migrating the Legacy Static Site to an Astro-Based Hybrid Content Publication System

- **Status**: Proposed — awaiting approval (no existing code will be modified before an explicit "Approve")
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
| F6 | Lighthouse ≥95 ×4 | Unmeasured; render-blocking Google Fonts CSS and 1,000+ inline styles make budget compliance unlikely without restructuring. | — | Unknown |

### 1.2 RFC-100 (Content Model) — violations

- **§3 Routing principle**: all business text — the committee letter, CFP
  terms, policies, schedule entries, committee lists — is hardcoded inside
  page markup (or inside a JS literal, for the schedule). Nothing is
  retrievable as content.
- **§1 Issue paradigm**: the site models only "the 3rd session" as a
  perpetual present. Sessions I and II exist as prose fragments; there is no
  `2026/` issue structure and no archive route.
- **§2 Hybrid architecture**: schedule/committee/speakers (matrix-like data
  → should be YAML) and CFP/theme letter/policies (editorial documents →
  should be MDX) are all fused into HTML.

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
  archival URLs; when Issue IV arrives, "third session" content has no
  stable `/archive/2026/…` home. Migration must define the permanent URL
  scheme now and preserve legacy inbound links via redirect stubs.

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
  formalized (CSS counters; a true margin track carrying metadata) rather
  than discarded.
- **§2.4 Running header**: the current sticky bar is generic site nav; no
  persistent publication metadata (`SSPCZ | Issue III | 2026`).

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

### 2.1 Target structure

```
/
├─ CLAUDE.md  .ai/context.md  docs/            # charter + ADRs (this file)
├─ astro.config.mjs                            # site URL; i18n: zh (default, root), en (/en/)
├─ package.json
├─ src/
│  ├─ content.config.ts                        # Zod schemas per collection
│  ├─ content/conference/2026/                 # Issue III — editorial documents (RFC-100 §2.1)
│  │   ├─ cfp.{zh,en}.mdx
│  │   ├─ theme-letter.{zh,en}.mdx             # 组委寄语, with citation frontmatter
│  │   ├─ policies.{zh,en}.mdx
│  │   └─ about.{zh,en}.mdx
│  ├─ data/2026/                               # structured data (RFC-100 §2.2)
│  │   ├─ schedule.yaml                        # days → sessions {time, kind, title, abstract}, bilingual fields
│  │   ├─ committee.yaml                       # hosts / co-organizers / academic support / societies / org chart
│  │   └─ speakers.yaml
│  ├─ styles/
│  │   ├─ tokens.css                           # the ONLY place colors/spacing/type live (RFC-400 §3)
│  │   └─ global.css
│  ├─ patterns/                                # cross-page motifs (RFC-400 §2)
│  │   ├─ RunningHeader.astro                  # `SSPCZ | 第三届 · Issue III | 2026` persistent frame
│  │   ├─ Marginalia.astro                     # asymmetric grid w/ metadata margin track
│  │   ├─ SectionCounter.astro                 # CSS-counter §-numbering
│  │   └─ Dialectic.astro                      # voice-shifted alignment for letter/quotes
│  ├─ layouts/
│  │   ├─ EditorialLayout.astro                # document flow + margin grid
│  │   └─ BaseLayout.astro                     # head, fonts, hreflang, running header, footer
│  ├─ components/                              # stateless, scoped: SessionRow, KeyValue, PersonMark…
│  ├─ i18n/{zh,en}.ts                          # UI micro-copy dictionaries + t() helper
│  └─ pages/                                   # thin wrappers ONLY (RFC-100 §3)
│      ├─ index.astro                          # renders the *current* issue (re-export of 2026)
│      ├─ 2026/{index,cfp,program,committee,register,policies}.astro
│      └─ en/…                                 # same templates, locale param — no duplicated markup
├─ public/                                     # logo, robots.txt, self-hosted font subsets
└─ legacy/                                     # the current 14 pages, moved verbatim, kept until parity sign-off
```

### 2.2 How each red line is satisfied

- **Zero inline styles / tokens**: all styling in scoped component CSS
  drawing exclusively on `tokens.css` custom properties (the existing cold
  palette — ink `#122736`, accent `#3e7ca6`, paper `#f2f4f5` — survives *as
  tokens*; the palette itself was never the violation). CI stylelint rule
  rejects `style=` attributes and raw hex outside `tokens.css`.
- **DRY i18n**: one template per page; per-locale MDX bodies + YAML
  bilingual fields + UI dictionaries. Adding a locale = adding content
  files, not markup.
- **Zero-JS baseline**:
  - *Program*: rendered fully server-side. Recommendation (Q2): drop the
    tab interaction entirely and render all four days sequentially under
    §-numbered day headings — RFC-300 §3 "meaning over interaction";
    fallback option is CSS-only `:target` day anchors. Either way the
    program is complete in plain HTML.
  - *Registration*: a real `<form method="post" action={ENDPOINT}>` with
    native `<input type="radio">` chips styled via `:checked` — functional
    with JS disabled; JS only adds inline validation and async submit.
  - *Language*: `<a>` switcher + `hreflang` alternates (server-rendered);
    the first-visit modal and cookie auto-redirect remain a progressive
    enhancement, no longer load-bearing.
- **Component boundaries**: patterns/layouts/components split as above.
- **QA**: GitHub Actions — `astro build`, `astro check`, stylelint,
  html-validate, linkinator, Lighthouse CI with a ≥95×4 budget. PR template
  quoting the RFC-400 red lines.

### 2.3 Visual grammar migration (RFC-300)

Removed: Φ watermark, ΦΙΛΟΣΟΦΙΑ ticker, Φ favicon, "NOW" badge, marketing
CTA pairing. Introduced: running header with publication metadata;
marginalia track carrying section metadata (dates, reading context, cross
references); CSS-counter section numbering (`§1`, `§1.1`) as the primary
decoration; dialectic alignment for the committee letter and quotations
(with proper citations per RFC-200 §2). Favicon becomes a neutral
ink-square wordmark ("哲" or "S3") pending a design decision.

### 2.4 URL & archive strategy (RFC-200 §3)

- Permanent issue URLs: `/2026/cfp/`, `/en/2026/program/`, … — never to
  change after publication.
- `/` renders the current issue via a thin re-export, so "the current
  session" has a stable front door while permalinks stay archival.
- Legacy flat URLs (`/third-session.html`, `/en/cfp.html`, …) receive
  static redirect stubs to their new homes so existing inbound links and
  the deployed GitHub Pages site never 404.
- When Issue IV begins, `2026/` freezes as read-only archive with visual
  integrity retained (its templates and tokens are versioned in git).

### 2.5 Typography & CN accessibility

Latin serif: system Times New Roman stack (already decided; zero network
cost). CJK: Noto Serif/Sans SC moved from Google Fonts CDN to **self-hosted
subset files** in `public/fonts/` (subset to the site's actual character
inventory at build time), eliminating the mainland-China font failure mode
and the render-blocking third-party request.

---

## 3. Alternatives considered

| Option | Verdict | Reason |
|--------|---------|--------|
| A. Keep hand-written HTML, extract shared CSS only | Rejected | Cannot satisfy DRY i18n or the content model; every edit stays ×2 |
| B. Eleventy | Viable, rejected | Astro's Content Collections + Zod give the schema validation RFC-100 §2.1 explicitly demands, with built-in i18n routing and first-class MDX |
| C. Next.js / Nuxt | Rejected | Runtime framework contradicts the Zero-JS baseline; SSR hosting complexity buys nothing for a static publication |
| D. Headless CMS | Deferred | Git-versioned MD/YAML *is* the editorial trail at secretariat scale; revisit if non-technical editing becomes a bottleneck |

## 4. Migration plan (phased; each phase = one reviewable PR)

- **Phase 0 — this ADR** (docs only, no code changes). Exit: "Approve".
- **Phase 1 — Scaffold**: Astro init, `tokens.css`, BaseLayout/patterns
  skeleton, CI pipeline. Legacy untouched and still deployed. Exit: empty
  shell passes all QA gates.
- **Phase 2 — Content extraction**: hoist 100% of business text from the
  14 legacy pages into MDX/YAML/dictionaries against a per-page inventory
  checklist (zh authoritative; en aligned; theme-name ruling Q1 applied).
  Exit: no business text remains only in legacy HTML.
- **Phase 3 — Reconstruction**: build the 7 routes × 2 locales from shared
  templates under the new visual grammar; side-by-side review against
  legacy screenshots — parity where legacy was compliant, documented
  divergence where it was not.
- **Phase 4 — Cutover**: redirect stubs, regenerated sitemap/hreflang,
  deploy pipeline (GitHub Actions build → Pages), README rewrite; legacy
  moves to `/legacy/` and is deleted after sign-off.

## 5. Consequences

**Positive**: single-source bilingual content with schema validation;
issues become archivable folders; every visual decision traceable to a
token; the reading experience works with JS off; CN-reliable typography;
CI-enforced governance instead of good intentions.

**Negative / accepted costs**: a build step enters the workflow (Node
required for contributors; Pages deploys via Actions); one-time migration
effort across four PRs; the decorative layer is *redesigned*, not ported —
requires taste review at Phase 3.

**Risks & mitigations**: redesign scope creep → phase gates + screenshot
review; content drift during migration → freeze legacy edits once Phase 2
starts; registration backend undecided → form `action` is a single
constant, decidable independently (Q3).

## 6. Open questions for the secretariat

1. **Q1 — English theme name**: "Change & the Unchanging" (live site) vs
   "Change and Permanence" (RFC-200's example). One must become canonical.
2. **Q2 — Program presentation**: sequential all-days rendering (recommended;
   structure over interaction) vs CSS-only day anchors. Tabs-with-JS is off
   the table either way.
3. **Q3 — Registration backend**: Formspree-class relay vs CN cloud
   function; decides the form `action` URL and data custody.
4. **Q4 — Motif replacement sign-off**: confirm removal of Φ/ΦΙΛΟΣΟΦΙΑ and
   the proposed running-header/marginalia/counter grammar.
5. **Q5 — Root URL semantics**: `/` renders current issue (proposed) vs
   `/` redirects to `/2026/`.
