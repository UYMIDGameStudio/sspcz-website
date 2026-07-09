# ADR-003: Design System Maturation

## 1. Status

- **Status**: Proposed (finalized for sign-off)
- **Decision Makers**: SSPCZ secretariat / repository owner (executive rulings Q1–Q6 incorporated)
- **Date**: 2026-07-09
- **Charter basis**: `docs/000-VISION.md` … `docs/400-GOVERNANCE.md`
- **Supersedes / refines**: ADR-002 §2 (brand lockup emphasis reversed — see §3.1) and ADR-002's three-layout taxonomy (extended to four — see §3.2). Builds on ADR-001 (architecture) and EDR-001 (theme translation). No change to the content model, Astro Collections, routing, i18n, or the zero-JS baseline.

---

## 2. Context

### Why the current design system cannot support SSPCZ as a long-term academic institution

The platform is architecturally sound but its **visual grammar is implicit and short-termist**. Four specific failures prevent it from carrying SSPCZ as a durable institution rather than a single event:

1. **The identity is inverted.** The running header presents the acronym `SSPCZ` as the visible wordmark while the institution's actual name (`浙江中学生哲学大会`) is buried inside a raster logo. A serious institution leads with its name; a startup leads with a compressed monogram. The current treatment reads as the latter.

2. **Surfaces carry no meaning.** The interface uses four near-identical greys (`#f2f4f5`, `#f7f9fa`, `#eef2f4`, `#fff`) chosen ad hoc. Physical academic publishing (Oxford University Press, MIT Press, academic yearbooks) uses paper stock and tint deliberately — to mark chapter transitions, section hierarchy, and contextual emphasis. Our greys encode nothing, so hierarchy leans entirely on lines and size.

3. **Type has no semantic contract.** Sizes are picked per component from a raw numeric scale, so "a page title" or "an edition numeral" has no single definition. Without semantic roles, hierarchy drifts as the site grows and cannot be reasoned about institutionally.

4. **The homepage and covers behave like a portal, not a cover.** The homepage currently dumps About + current issue + full archive through the same layout as text-heavy org pages. An institution's front door should be a **ceremonial cover** (an academic yearbook cover), not an information dashboard.

Left unaddressed, every future edition compounds these into drift toward commercial/event aesthetics. This ADR fixes a **permanent grammar** so the institution's character is legible and future work is constrained from drifting.

---

## 3. Decision

The following incorporates executive rulings Q1–Q6 exactly.

### 3.1 Brand Lockup Hierarchy & the SVG Brand System (Q1)

The institution's name is the primary entity; the acronym is a secondary identifier. The formal lockup hierarchy is fixed:

1. `[Logo Symbol]`
2. **浙江中学生哲学大会** — Institution Wordmark (primary)
3. Secondary School Philosophy Conference of Zhejiang — full English name (secondary)
4. `SSPCZ` — abbreviation (tertiary; an identifier, never dominant)

**Ruling (Q1):** Retain the current complete **JPG** logo for the short term, but establish a formal **SVG Brand System** as the approved long-term architecture:

```
public/brand/
  logo-symbol.svg     ── the symbol/mark alone (no baked-in text)
  logo-lockup.svg     ── full composed lockup (symbol + wordmarks)
  wordmark.svg        ── typographic wordmark
```

**Header application:** do **not** compress the existing JPG into a small icon. The visual lockup conceptually separates:

```
[Logo Symbol]  +  Institution Wordmark  +  SSPCZ Abbreviation
```

Long-term migration toward a pure SVG brand system is **approved**; the JPG is an interim asset. Until the SVG symbol exists, the header renders the name-primary lockup with the acronym as a subordinate tertiary tag, and the full four-level lockup anchors the colophon and the LandingLayout cover.

### 3.2 Layout Taxonomy & Anti-Proliferation

**Binding governance rule:** the layout set is **closed at four**. *Adding or removing a layout requires a new ADR.* Within a layout, variation is expressed through **components and reading-mode classes only** — never by forking a new layout. Reviewers must reject any PR that adds a `*Layout.astro` without an approving ADR.

| Layout | Purpose | Serves |
|--------|---------|--------|
| `InstitutionLayout` | Text-heavy organizational pages | **About** (§3.5), Archive listing |
| `PublicationLayout` | Academic reading | CFP, Policies, Guidelines |
| `DataLayout` | Dense data scanning | Schedule, Resources, Committee, Register |
| **`LandingLayout`** *(new)* | Homepage & edition covers | Institutional Cover (`/`), edition covers (`/issue-00X/`) |

**`LandingLayout` critical rule:** it MUST read as a **scholarly journal / yearbook cover**, never a marketing landing page — no oversized hero, no conversion patterns, no CTA emphasis. It composes a masthead (lockup + edition card + theme) sized like a cover plate. All four layouts continue to wrap the single shared `PageShell` chrome (ADR-002 §3).

### 3.3 Component Inventory (strictly semantic)

**Binding governance rule (component gate):** a component may exist **only if all three hold** — (1) it appears more than twice, (2) it represents a meaningful content type, (3) it improves content authoring. Decoration-named components (`ElegantBox`, `FancyDivider`, …) are prohibited.

Formalized zero-JS semantic components:

- **`EditionCard`** — an edition's archival identity: edition numeral (`03`), full title, theme, year. Used on the cover, the homepage current-issue entry, and every Archive row. Absorbs the ad-hoc `EditionNumeral`.
- **`Timeline`** — the Schedule as a semantic, pure-CSS node list (§3.4). Replaces plain-text schedule lists.
- **`StatementBlock`** — institutional manifestos and cited quotations (the theme letter's Su Shi passage, committee statements).

**`Dialectic` (Q3):** **Retained as a semantic component — it is NOT a layout system.** Dialectic exists because SSPCZ is a philosophical institution.
- **Allowed:** Speaker vs Discussant, Thesis vs Antithesis, debate sessions, philosophical dialogue.
- **Forbidden:** standard schedule entries, generic paper presentations, ordinary speaker profiles.
- Consequence: the Schedule's per-session abstract voicing (a generic use) moves out of `Dialectic` into `Timeline`; `Dialectic` is reserved for genuine dialogical constructs.

### 3.4 Timeline System (Q4)

**Approved: a hybrid pure-CSS timeline.** Semantic structure:

```
<ol class="timeline">
  <li> … <time> … </time> … </li>
```

Each node is drawn with **`border-left` + pseudo-elements (`::before`)** and semantic `<time>` elements. Requirements:

- **Zero JavaScript.**
- **Desktop:** preserve metadata density (time/kind held as a metadata column beside the node rule).
- **Mobile:** elegant vertical stacking.

The timeline replaces plain-text schedule lists.

### 3.5 About Route Promotion & Information Architecture (Q5)

**Promote About into a standalone institutional route.** The IA cleanly separates **institution identity** from **individual conference issues**:

```
/            Institutional Cover (LandingLayout)
/about/      Institution history, mission, organization (InstitutionLayout)
/archive/    Past editions (InstitutionLayout)
/issue-00X/  Specific conference editions (LandingLayout cover + edition pages)
```

### 3.6 Homepage Positioning (Q6)

**The Homepage must become an Institutional Cover.** It is **not** a web portal, an encyclopedia, or a content dashboard; it resembles an **academic yearbook cover**.

Required content, and only this:
- SSPCZ brand lockup
- Founding year
- Current issue entry
- Large thematic typography
- Minimal navigation to Archive and About

Conceptual hierarchy:

```
SSPCZ
Since 2024

Current Issue
CHANGE & INVARIANCE
Explore →

Archive   About
```

**Constraint:** prevent information dumping. The homepage remains **sparse and ceremonial**. (The full About prose and archive listing live on their own routes per §3.5, not on the cover.)

### 3.7 Typography System (the core asset)

Typography — not color or decoration — creates hierarchy. Components consume **semantic type roles**, not raw sizes. Semantic roles layer over the existing raw scale (raw `--text-*` values remain the palette; roles reference them):

| Role | Use |
|------|-----|
| **Display** | Institutional identity, edition numerals (`03`), theme titles |
| **Heading** | Page titles, structural section headings |
| **Body** | Long-form academic reading, held to a **65–75 character measure** |
| **Metadata** | Dates, locations, credits, kickers |
| **Marginalia** | Annotations and archival info in the 340px margin track |

Bilingual rule retained (CJK serif for Chinese, Latin serif for English, selected per role via `:lang()`).

### 3.8 Color Token Semantics — the "Paper System" (Q2)

**Approved as a "Paper System", NOT a global blue theme.** The system imitates physical academic publishing (Oxford University Press, MIT Press, academic yearbooks): surfaces represent **chapter transitions, section hierarchy, and contextual emphasis** — never decorative backgrounds.

```
--surface-primary:   #FFFFFF   /* main paper canvas */
--surface-secondary: #D0E7F5   /* ice-blue contextual paper */
--surface-tertiary:  <reserved>  /* citation blocks, metadata, marginalia */
```

Allowed palette, total: **White · Ice Blue · one tertiary surface · black / dark-navy typography.** No gradients. No excessive color systems.

**Application rules:**
- `--surface-secondary` is used only for contextual paper (Marginalia backgrounds, StatementBlock, preview panels) or spatial rhythm (alternating sections / chapter transitions). Never a decorative global background.
- `--surface-tertiary` is reserved for citation blocks, metadata panels, and marginalia; its exact value is set during Phase 7.1 within the allowed palette (a single additional paper tint), not invented ad hoc.
- **Contrast guard (required):** on `--surface-secondary`/`--surface-tertiary`, body text uses the dark ink token, not muted grey (muted drops below AA on the tinted paper). The Lighthouse budget enforces this.

The page canvas moves from today's grey to `--surface-primary (#FFFFFF)`; existing greyish insets consolidate onto the two/three paper tints above. Ink, accent, and line tokens are unchanged; **no new accent colors** are introduced.

---

## 4. Design Constraints (permanent boundaries)

### Technical (must preserve)
- Zero JavaScript baseline (hover/`:focus`/`:target` state changes are CSS and allowed).
- Astro static architecture.
- Existing content collections.
- Existing schema compatibility.

### Visual — Forbidden
- Gradients.
- Drop shadows / `box-shadow`.
- Glassmorphism (`backdrop-filter`).
- Decorative animations (`@keyframes` / `animation`).
- SaaS-style dashboard cards.

### Visual — Allowed
- Typography hierarchy.
- CSS Grid.
- CSS borders.
- Negative space.
- Editorial layouts.
- Paper-like surfaces.

**CI enforcement (new):** stylelint rules make the forbidden list mechanical, not conventional — `declaration-property-value-disallowed-list` forbids gradient functions in `background`/`background-image`, non-`none` `box-shadow`, and `backdrop-filter`; `at-rule-disallowed-list` forbids `keyframes`. These run in the existing `lint:css` CI gate beside the tokens-only-color and BEM rules.

---

## 5. Migration Impact

Implementation proceeds only after approval, in phased, individually reviewable PRs; every phase keeps the full QA suite green (inline-style red line, stylelint incl. the new constraint rules, `astro check`, build, and the 18-URL Lighthouse ≥95×4 budget).

- **Phase 7.1 — Tokens & Paper System.** Add semantic typography roles and the surface tokens; migrate components off raw sizes onto roles; apply the Paper System (canvas → `--surface-primary`, insets → `--surface-secondary`/`--surface-tertiary`) with the contrast guard; add the CI constraint rules. Carries the visible palette shift — reviewed on screenshots.
- **Phase 7.2 — Brand lockup.** Name-primary compact lockup in the header; full four-level lockup in the colophon. Establish `public/brand/` and begin the JPG→SVG path (interim JPG retained until `logo-symbol.svg` exists).
- **Phase 7.3 — LandingLayout & IA.** Introduce the fourth layout; rebuild `/` as the sparse Institutional Cover (Q6) and `/issue-00X/` as edition covers; promote **About** to `/about/` (Q5); document the anti-proliferation and component-gate rules in `CLAUDE.md`.
- **Phase 7.4 — Components.** `EditionCard`, `Timeline`, `StatementBlock`; absorb `EditionNumeral`; move the schedule's generic voicing into `Timeline` and reserve `Dialectic` for dialogical use (Q3). Content and authoring are unchanged — components read the same collection data.

Ordering rationale: tokens first (everything references them), then identity, then the cover/IA that showcases it, then the components that consume the finished grammar.

---

## 6. Non-goals

This ADR explicitly does **not**:

- redesign the entire website immediately (it defines a grammar and a phased migration, not a big-bang rewrite);
- introduce JavaScript or any JS/UI framework (the zero-JS baseline is preserved);
- replace or alter Astro Collections or their schemas;
- create commercial / SaaS dashboard aesthetics (dashboard cards, shadows, gradients, glassmorphism are forbidden);
- optimize for event-marketing style (no conversion-oriented heroes or CTA emphasis);
- introduce new accent colors or an expanded color system (the Paper System is white + ice-blue + one tertiary paper tint + ink);
- finalize the SVG brand assets themselves (the architecture is approved; producing `logo-symbol.svg` etc. is future work);
- change deployment, the registration backend, analytics, or font self-hosting (out of scope per ADR-001 §6 / ADR-002).

---

*Implementation may begin only after explicit approval of this finalized ADR.*
