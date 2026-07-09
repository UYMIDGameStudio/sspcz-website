# ADR-003: Design System Maturation

- **Status**: Proposed — awaiting approval (no code before an explicit "Approve")
- **Date**: 2026-07-09
- **Deciders**: SSPCZ secretariat / repository owner
- **Charter basis**: `docs/000-VISION.md` … `docs/400-GOVERNANCE.md`
- **Relationship to prior decisions**: Builds on ADR-001 (architecture), ADR-002 (IA & the three contextual layouts), EDR-001 (theme translation). This ADR does **not** change the content model, collections, routing, i18n, or the zero-JS baseline. It establishes the long-term *visual grammar*: brand lockup, a fixed layout taxonomy with a fourth layout, a strictly semantic component inventory, a semantic typography scale, a surface-token color system, and enforced material constraints.

---

## Context

The platform is architecturally mature but its visual grammar is still implicit: type sizes are chosen per component from a raw numeric scale, "surfaces" are an ad-hoc mix of four near-identical greys, the header presents the acronym (`SSPCZ`) more prominently than the institution's name, and the homepage/edition covers share the same layout as text-heavy org pages. SSPCZ's identity is a **serious academic institution** — the reference points are an Oxford faculty page or a scholarly journal cover, not a startup landing page. This ADR fixes a durable grammar so that identity is legible and so future work cannot drift toward marketing patterns.

**Non-negotiable framing:** this is *not* modernization or beautification. Every decision below encodes hierarchy and meaning; nothing is added for visual novelty.

---

## 1. Brand Lockup Hierarchy

**Constraint.** The institution's name is the primary entity; the acronym is a secondary identifier. This **reverses ADR-002's** header treatment, which (for space) made `SSPCZ` the visible wordmark. ADR-002 §2 is superseded on this point.

**Decision.** Define one formal Brand Lockup with a fixed visual hierarchy:

1. `[Logo Mark]`
2. **浙江中学生哲学大会** — Primary (display/heading type, ink)
3. Secondary School Philosophy Conference of Zhejiang — Secondary (metadata type, muted)
4. `SSPCZ` — Tertiary (metadata/marginalia type, faint; an identifier, never dominant)

**Placement.** The *full* four-level lockup is a journal-masthead element: it appears in the **colophon** and on **LandingLayout covers**. The **running header** carries a **compact lockup** — `[mark] + 浙江中学生哲学大会` (primary), with `SSPCZ` only as a small tertiary tag — so the name leads even in the constrained bar. No context may render the acronym larger or heavier than the name.

**Asset caveat (Open Q1).** The current `public/logo.jpg` is a raster *horizontal lockup* that already bakes in mark + Chinese + English. A typographic lockup needs a **mark-only** asset to avoid duplicating the name. Resolution options are in Open Questions.

## 2. Layout Taxonomy & Anti-Proliferation

**Constraint (binding governance rule).** The layout set is **closed at four**. *Adding or removing a layout requires a new ADR.* Within a layout, express variation through **components and reading-mode classes**, never by forking a new layout. Reviewers must reject PRs that add a `*Layout.astro` without an approving ADR.

**Decision.** Exactly four layouts:

| Layout | Purpose | Serves (templates) | Change from today |
|--------|---------|--------------------|-------------------|
| `InstitutionLayout` | Text-heavy organizational pages | Archive listing; About *(if promoted, Q5)* | Loses the homepage & edition cover |
| `PublicationLayout` | Academic reading | CFP, Policies, Guidelines | unchanged |
| `DataLayout` | Dense data scanning | Schedule, Resources, Committee, Register | unchanged |
| **`LandingLayout`** *(new)* | Homepage & edition covers | `InstitutionHome` (`/`), `IssueHome` (`/issue-XXX/`) | **split out** of InstitutionLayout |

**`LandingLayout` critical rule.** It MUST read as a **scholarly journal cover**, not a marketing landing page. Explicitly:
- **No** oversized marketing hero; the cover is a composed masthead (lockup + edition card + theme), sized like a journal cover plate, not a full-viewport banner.
- **No** conversion-oriented patterns, urgency, or repeated/emphasized CTAs. Actions remain quiet inline links, subordinate to the masthead and content.
- Restraint over persuasion: the cover states what the edition *is*, and lets the reader descend into the content.

All four layouts continue to wrap the single shared `PageShell` chrome (ADR-002 §3); LandingLayout is a fourth specialization, not a second chrome.

## 3. Component Inventory (strictly semantic)

**Constraint (binding governance rule).** A component may exist **only if all three hold**: (1) it appears more than twice, (2) it represents a meaningful content type, (3) it improves content authoring. Decoration-named components (`ElegantBox`, `FancyDivider`, …) are prohibited. This restates RFC-400 §2 and ADR-001's boundaries as an inventory gate.

**Decision.** Introduce/formalize three zero-JS semantic components, and reconcile existing ones against the gate:

- **`EditionCard`** — an edition's archival identity: edition numeral (`03`), full title, theme, year. Appears on the LandingLayout cover, the homepage "current conference" block, and every Archive row (>2×). **Absorbs** the current ad-hoc `EditionNumeral` + hand-built archive/current-issue markup into one authored unit.
- **`Timeline`** — the Schedule as pure-CSS node markers on a vertical rule (dots via `::before`, no images, no JS), replacing today's plain grid rows. Time/kind stay as a metadata column so scanning density is preserved (reconciles §2 DataLayout "dense scanning" with §3 "timeline" — see Q4).
- **`StatementBlock`** — institutional manifestos and cited quotations (the theme letter's Su Shi passage, committee statements). Meaningful content type, appears in the theme letter and covers (>2×).

**Reconciliation of existing components.** `SectionCounter`, `RecordRow`, `PublicationCard`, `Marginalia`, `Exhibition`, `SessionEntry` all pass the gate and remain. `EditionNumeral` is **absorbed** into `EditionCard`. `Dialectic` (currently doing double duty: schedule-abstract voicing *and* the theme quotation) is **split**: the quotation role moves to `StatementBlock`; the schedule voicing moves into `Timeline`. Whether `Dialectic` is then retired or retained for a genuine thesis/antithesis construct is Open Q3.

## 4. Typography System (the core asset)

**Constraint.** Typography — not color or decoration — creates hierarchy. Components must consume **semantic type roles**, not raw sizes.

**Decision.** Add a layer of **semantic role tokens** over the existing raw scale (raw `--text-*` values stay as the palette; roles reference them, and components use only roles):

| Role | Use | Character |
|------|-----|-----------|
| **Display** | Institutional identity, edition numerals (`03`), theme titles | Largest; serif; tight leading/tracking |
| **Heading** | Page titles, structural section headings | Serif; clear H1→H4 steps |
| **Body** | Long-form academic reading | Set to a **65–75 character measure**; loose leading |
| **Metadata** | Dates, locations, credits, kickers | Small; Latin serif; wide tracking; muted |
| **Marginalia** | Annotations, archival notes in the margin track | Smallest; muted; sits in the 340px track |

Bilingual rule retained: CJK serif for Chinese, Latin serif (Times) for English, chosen per role via the existing `:lang()` mechanism. Body measure is enforced structurally (the `--measure` token), satisfying the 65–75ch requirement.

## 5. Color Token Semantics (surfaces)

**Constraint.** A surface color is a **semantic layer**, not a hue. `#D0E7F5` means "contextual paper," not "blue."

**Decision.** Establish a surface-token system:

- `--surface-primary: #FFFFFF;` — the default academic paper (the page canvas).
- `--surface-secondary: #D0E7F5;` — muted ice-blue **contextual paper**.

**Application rule (strict).** `--surface-secondary` is used **only** for (a) contextual paper layers — Marginalia backgrounds, StatementBlock, document-preview panels — or (b) spatial rhythm via alternating sections. It is **never** a decorative global background.

**Reconciliation & consequences (visible; Open Q2).**
- The page canvas moves from today's grey `--color-paper (#f2f4f5)` to `--surface-primary (#FFFFFF)` — a whiter, more journal-like field. The existing `--color-surface (#fff)` merges into `--surface-primary`.
- `--surface-secondary (#D0E7F5)` replaces the current near-grey insets (`--color-paper-inset #eef2f4`, `--color-paper-raised #f7f9fa`) — a more saturated ice-blue than today.
- **Contrast guard (required):** on `--surface-secondary`, body text must use `--color-text (#40505f)` (ratio ≈ 6.2:1, AA-pass), **not** `--color-text-muted` (≈ 3.8:1, fails small text). The migration must audit every muted-on-secondary pairing; the Lighthouse budget enforces it.
- Ink, accent, and line tokens are unchanged. No new *accent* colors are introduced — only the surface layer is formalized.

## 6. Absolute Constraints (binding, CI-enforced)

- **Zero JavaScript** preserved (no exceptions; hover/`:focus`/`:target` state changes are CSS and allowed).
- **Content schemas & Astro Collections** unchanged.
- **No gradients.** **No** `box-shadow` / drop-shadows. **No** glassmorphism (`backdrop-filter`). **No** decorative CSS animations (`@keyframes`/`animation`); plain state changes on hover/focus are fine.

**Enforcement (new).** Add stylelint rules so these are mechanically rejected, not just conventions:
- `declaration-property-value-disallowed-list`: forbid `linear-gradient`/`radial-gradient`/`conic-gradient` in `background`/`background-image`; forbid non-`none` `box-shadow`; forbid `backdrop-filter`.
- `at-rule-disallowed-list`: forbid `keyframes`.
These run in the existing CI `lint:css` gate alongside the tokens-only-color and BEM rules.

---

## Migration Plan (phased; each phase one reviewable PR; QA green at every step)

- **Phase 7.0 — this ADR** (docs only). Exit: approval + answers to open questions.
- **Phase 7.1 — Tokens.** Add semantic typography roles and the surface tokens; migrate components to roles; apply the surface system (canvas → `--surface-primary`, insets → `--surface-secondary`) with the contrast guard; add the CI constraint rules. This phase carries the visible color shift (Q2) and is reviewed on screenshots.
- **Phase 7.2 — Brand lockup.** Compact name-primary lockup in the header; full four-level lockup in the colophon and (7.3) the cover. Requires the mark asset decision (Q1).
- **Phase 7.3 — LandingLayout.** Introduce the fourth layout; move `InstitutionHome` and `IssueHome` onto it as journal covers; document the anti-proliferation rule in `CLAUDE.md`.
- **Phase 7.4 — Components.** `EditionCard`, `Timeline`, `StatementBlock`; absorb `EditionNumeral`, split `Dialectic`. Content/authoring unchanged (components read the same collection data).

## Consequences

**Positive:** a durable, documented grammar; the institution's name leads; four layers of hierarchy come from type before color; surfaces carry meaning; covers read as journal plates, not marketing; material constraints are CI-enforced so drift is impossible; adding editions/assets stays content-only.

**Negative / accepted:** a visible palette shift (grey canvas → white, greyish insets → ice-blue) needs a taste sign-off at 7.1; a one-time component refactor (EditionCard/Timeline/StatementBlock) touching the schedule, covers, and archive; dependence on a mark-only logo asset for the ideal lockup.

**Risks & mitigations:** contrast regressions from `#D0E7F5` → the mandated contrast guard + the 18-URL Lighthouse budget each phase; layout proliferation → the ADR-gated rule enforced in review; scope creep into decoration → the CI "NO" rules + the semantic-component gate.

## Open Questions (please rule before Phase 7.1)

1. **Logo mark asset.** Is a **mark-only** logo (no baked-in text) available? If yes, we build the true typographic lockup. If no, options: (a) I extract/trim the mark from the existing raster, (b) you supply a mark-only file later and we ship an interim compact lockup using the full image with the name *not* duplicated, or (c) treat the current full-lockup image as the mark on covers and set only a tertiary `SSPCZ` tag. Which?
2. **Surface shift confirmation.** Adopt `--surface-primary #FFFFFF` as the global canvas (today it's `#f2f4f5`) and `--surface-secondary #D0E7F5` for all contextual layers (today `#eef2f4`)? This is a real, site-wide visual change — confirm the whiter canvas + ice-blue contextual paper is intended.
3. **`Dialectic` disposition.** After moving quotations to `StatementBlock` and schedule voicing to `Timeline`, retire `Dialectic`, or retain it for a genuine thesis/antithesis pairing (e.g., speaker vs. discussant)?
4. **Timeline vs. density.** DataLayout is "dense scanning," yet §3 asks the Schedule to become a timeline. Proposed: a left vertical rule with CSS node markers, keeping time/kind as a metadata column so density is preserved. Accept, or keep the current tabular rows and add nodes only as a marginal marker?
5. **About page.** Now that InstitutionLayout is freed from covers, promote **About** to a standalone institutional route (rendering the edition-independent about text), or keep About as a homepage section (ADR-002 Q3 default)?
