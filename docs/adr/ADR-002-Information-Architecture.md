# ADR-002: Information Architecture & Visual Hierarchy Revision

- **Status**: Proposed — awaiting approval (no code or layout changes before an explicit "Approve")
- **Date**: 2026-07-09
- **Deciders**: SSPCZ secretariat / repository owner
- **Charter basis**: `docs/000-VISION.md` … `docs/400-GOVERNANCE.md`
- **Relationship to prior decisions**: Refines ADR-001 §2.2–2.4. ADR-001 established a *single* universal layout (`EditorialLayout`) over the `Marginalia` grid; this ADR specializes that into three contextual layouts over a **shared chrome**, and formalizes a three-tier navigation. The content model (ADR-001 §2.1), edition-keying, zero-JS baseline, i18n, and token discipline are unchanged and remain binding.

---

## Context

After Phases 1–5 the platform is a stable, content-driven Astro system: zero-JS, Astro Collections (`conference`, `documents`, `media`), the CSS-Grid editorial margin, full i18n, token-only styling, and a Lighthouse ≥95×4 budget. What it does **not** yet express is that SSPCZ is a *continuing institution with multiple editions* rather than one conference. Every page currently renders through one universal layout and a flat navigation, so an edition landing, a long-form policy, and a dense schedule all read at the same visual altitude.

This revision is **information architecture and visual hierarchy only**. No framework migration, no content-model rewrite, no new runtime.

---

## Decision Summary

1. Navigation gains three explicit tiers: **Institution**, **Current Issue**, **Actions**.
2. The header becomes one cohesive **brand lockup** (mark + wordmark), responsive.
3. Templates are consolidated onto **three contextual layouts** — `InstitutionLayout`, `PublicationLayout`, `DataLayout` — sharing a single extracted chrome.
4. Visual hierarchy is strengthened with a **display type scale** (thematic titles, large edition numerals) and **structural rhythm** (dividers, grid alignment, negative space) — all token-driven, no decoration.
5. Strict constraints are preserved and enumerated.

---

## 1. Institutional Identity Hierarchy (three-tier navigation)

The flat nav (`Home / This Session / CFP / Program / Committee / Policies / Resources / Register / EN`) is regrouped into three logical levels. Current `RouteKey`s map as follows:

| Level | Meaning | Routes (existing `RouteKey`) | Visual treatment |
|-------|---------|------------------------------|------------------|
| **L1 — Institution** | SSPCZ as a continuing organization | `home` (About SSPCZ), `archive` *(new, see Q2)*, `resources` | Primary text cluster, left |
| **L2 — Current Issue** | The active edition | `issue` (Theme), `program`, `cfp`, `committee`, `policies` | Secondary text cluster, divider-separated |
| **L3 — Actions** | High-priority tasks | `register`, `submit` (Submit Paper) *(see Q4)* | Distinct button(s), right |

**Zero-JS mechanism.** Tiering is achieved purely with CSS grouping in the existing sticky running header — three flex clusters separated by rule dividers, with L3 rendered as bordered/solid buttons. **No dropdowns, no hamburger, no JS menu.** On narrow viewports the clusters wrap in place (L3 buttons stay visually distinct). The language switch remains a real `<a>` beside L3.

This changes only how `navItems` are grouped and styled in the shared chrome; every destination already exists.

## 2. Brand Lockup Revision

The current header places the logo image beside an `aria-hidden` "SSPCZ" wordmark; the logo asset itself already contains the full bilingual name, producing two competing identities at different weights.

**Decision.** Consolidate into one cohesive lockup:

- **Keep the existing logo asset** (`public/logo.jpg`); the brand is not redesigned.
- Fix optical balance: align the mark and wordmark on a shared optical baseline/centre, consistent cap-height and spacing, single accessible name.
- **Responsive variants** (pure CSS, no JS): full lockup (mark + short wordmark) on desktop; **mark + "SSPCZ" only** on mobile. The wordmark text stays the short institutional acronym so it never competes with the name inside the mark.

Accessibility parity from Phase 5 is retained: the link keeps a single discernible name across breakpoints.

## 3. Layout System Revision & Consolidation

**Engineering reconciliation (the key structural decision).** To consolidate to exactly three layouts *without* duplicating the header/nav/colophon/hreflang logic across them (which would breach RFC-400 §3 DRY and RFC-400 §2 boundaries), the shared chrome now in `EditorialLayout` is **extracted once** into a shared shell (a `layouts/`-level base composing `BaseLayout` + `EditorialGrid` + running-header nav + colophon + `hreflang`/canonical). The three contextual layouts wrap that shell and differ **only in their `<main>` reading-mode treatment**. `EditorialLayout` is retired (its role split into the shell + the three layouts). `Marginalia`, `RunningHeader`, `EditorialGrid`, `SectionCounter`, `Dialectic` remain the shared vocabulary these layouts compose.

The three core layouts (per the instruction, these exact filenames):

| Layout | Reading mode | Characteristics | Templates it serves |
|--------|--------------|-----------------|---------------------|
| **`InstitutionLayout.astro`** | Cover / overview | Strong hero, large edition numeral, year-based/visual history rhythm | Institution homepage, About, Archive; **edition landing (`IssueHome`)** *(see Q1)* |
| **`PublicationLayout.astro`** | Long-form reading | Narrow measure (65–75 ch), section numbering, editorial marginalia | CFP, Policies, Paper Guidelines |
| **`DataLayout.astro`** | Scanning | Timeline/grid oriented, dense metadata separated from content | Program (schedule), Resources; **Committee, Register** *(see Q1)* |

Templates keep their current data wiring (`getIssueBundle`, `getCollection`, i18n) — only the layout they import and their in-`main` composition change. No template gains business text or hardcoding.

## 4. Visual Language Enhancement

Strengthen structure without decoration; everything traces to `tokens.css` (RFC-400 §3).

- **Typography — extreme contrast.** Add a **display scale** above the current `--text-hero`: a thematic-title size and a **large edition-numeral** treatment (e.g. a set "03" drawn from `issue.issue`, zero-padded via existing helpers). Formalize a clear H1→H4 hierarchy per layout (InstitutionLayout largest; PublicationLayout restrained). New tokens only — **no new colors**; the cold palette is unchanged.
- **Spatial rhythm.** Stark section dividers (promote the existing 1px rule into a rhythm token), strict grid alignment to the margin track, and controlled negative space between sections. The edition numeral and thematic title anchor the InstitutionLayout hero; PublicationLayout leads with `§`-numbering; DataLayout leads with aligned metadata columns.

No drop-shadows, gradients (the existing hero gradient excepted only if retained — flagged Q5), glassmorphism, or animation. Dividers/scale exist to encode hierarchy, satisfying RFC-400's "traceable to a token / semantic purpose" rule.

## 5. Strict Constraints (restated, binding)

- **MUST KEEP:** Zero-JS baseline; Astro Collections content model (no schema changes); CSS-Grid editorial margin (`Marginalia`); i18n structure (dictionaries + `[locale]` routing); permanent edition URLs; the zero-code-change edition rule (ADR-001 Phase 3.5).
- **MUST NOT INTRODUCE:** UI frameworks (Tailwind, etc.), animation/JS libraries, drop-shadows, glassmorphism, or any decorative CSS without explicit semantic purpose.
- **QA unchanged:** inline-style red-line, stylelint (tokens-only colors, BEM), `astro check`, build, and Lighthouse ≥95×4 across all pages must stay green at every phase.

---

## Migration Plan (phased; each phase one reviewable PR; behaviour-preserving first)

- **Phase 6.0 — this ADR** (docs only). Exit: approval + answers to the open questions.
- **Phase 6.1 — Chrome extraction (no visual change).** Extract the shared shell from `EditorialLayout`; introduce the three layout files as thin specializations that, at first, render identically to today. Repoint every template. Exit: byte-comparable output, all QA green.
- **Phase 6.2 — Navigation & brand lockup.** Regroup nav into L1/L2/L3 with CSS grouping + action buttons; refine the lockup with responsive variants. Exit: three-tier header, a11y parity, Lighthouse green.
- **Phase 6.3 — Visual hierarchy.** Add display/numeral/divider tokens; apply per-layout hero, measure, and data treatments. Exit: hierarchy visibly differentiated across the three reading modes; screenshot review; budget green.

## Consequences

**Positive:** the interface finally distinguishes institution from edition; reading modes get appropriate altitude; hierarchy is legible; all still zero-JS and token-traceable; adding an edition/asset stays content-only.

**Negative / accepted:** one-time refactor of layout wiring across ~8 templates; a short-lived `EditorialLayout`→shell rename; the visual layer is re-tuned and needs taste review at 6.3.

**Risks & mitigations:** chrome duplication → single extracted shell enforced by review; scope creep into decoration → RFC-400 token/semantic gate + no-decoration constraint; a11y regressions from denser nav → re-run the 16-URL budget each phase (as in Phase 5).

## Open Questions (please rule before Phase 6.1)

1. **Layout assignment for pages the ADR didn't place explicitly.** Proposed: **`IssueHome` (edition landing) → InstitutionLayout** (it is the edition's hero/cover); **Committee → DataLayout** (organizational registers); **Register → DataLayout** (structured form). Confirm or reassign.
2. **Archive as a route.** The ADR lists "Archive" as L1 nav, but today the archive is a section on the homepage. Proposed: a standalone institutional route (`/archive/`, `/en/archive/`) rendered from `getCollection('conference')` — still content-only to extend. Accept, or keep Archive as a homepage anchor?
3. **"About SSPCZ" as L1.** About text currently lives per-edition (`issue-XXX/about`) and appears as a homepage section. For a standalone institution-level About, do we (a) promote an edition-independent about document, or (b) keep About as a homepage section and drop it from top nav? Proposed: (b) for now to avoid a content-model change; revisit if an institutional charter page is wanted.
4. **"Submit Paper" L3 action.** Its target: a `mailto:` to the submission address, or a deep link to the CFP page's submission section? Proposed: link to CFP (single source for submission terms); no new content.
5. **Edition hero gradient.** ADR-001 retired the Φ watermark but the edition hero still uses a dark gradient. Under "no decorative CSS without semantic purpose," keep the gradient as the edition-cover signal, or flatten to a solid ink field? Proposed: flatten to solid for consistency with the no-decoration rule.
