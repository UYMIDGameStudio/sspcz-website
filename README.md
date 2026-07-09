# SSPCZ Digital Publication Platform · 浙江中学生哲学大会

The publication platform of the **Secondary School Philosophy Conference of
Zhejiang (SSPCZ)** — an ongoing student-organized academic institution. Each
conference edition is an archivable *Issue*; the site is built with Astro as
a fully static, zero-JS publication.

Governance: `docs/` (RFC-000…400) · decisions: `docs/adr/`, `docs/edr/` ·
AI context: `.ai/context.md` · the legacy static site lives at the git tag
**`legacy-static-site`**.

## Architecture (3 tiers)

```
Institution  /            src/data/institution.yaml (currentIssue pointer)
Editions     /issue-XXX/  src/content/conference/issue-XXX/ + src/data/issue-XXX/
Design       tokens.css → patterns/ → layouts/ → components/ → templates/
```

- `src/pages/` contains only hollow routing wrappers; `[issue]` routes are
  generated from the editions discovered on disk.
- Both locales (zh at root, en under `/en/`) render through the same
  templates — no duplicated markup anywhere.
- The institutional homepage resolves the current conference through the
  `currentIssue` pointer and derives the archive from
  `getCollection('conference')` automatically.

### Layouts & navigation (ADR-002)

- **One shared chrome** (`layouts/PageShell.astro`) owns the running header,
  three-tier navigation, hreflang and colophon — single-source, never
  duplicated per page.
- **Three contextual layouts** wrap the shell by reading mode:
  `InstitutionLayout` (homepage, Archive, edition landing — display hero +
  edition numeral), `PublicationLayout` (CFP, Policies — narrow measure,
  §-numbering), `DataLayout` (Program, Resources, Committee, Register —
  dense scanning). Reading-mode CSS keys off a `page--{mode}` class.
- **Navigation is three tiers**: Institution (About/Archive/Resources),
  Current Issue (This Session/Program/CFP/Committee/Policies), Actions
  (Submit Paper → CFP, Register) — grouped and styled purely with CSS, no
  JavaScript. The standalone Archive route (`/archive/`) is derived from the
  collection, so new editions appear with no code change.

## Knowledge assets (institution-level)

Two collections hold permanent assets that outlive any single edition,
surfaced at `/resources/` (and `/en/resources/`):

- **`documents`** (`src/content/documents/*.{zh,en}.md`) — paper
  guidelines, templates, review policy, code of conduct. Each entry's
  `type` (`pdf` / `docx` / `md` / `link`) drives `<PublicationCard>`: PDFs
  get a zero-JS `<details>`/`<iframe>` inline preview plus a direct
  download; `md` entries preview their rendered body; `docx` offers
  download; `link` opens its target. Files referenced by `fileUrl` live in
  `public/documents/`.
- **`media`** (`src/content/media/*.yaml`) — exhibition images/videos/slides
  tied to an edition via `issueRef`, rendered by `<Exhibition>` on a pure
  CSS Grid with captions in the 340px margin track. Assets live in
  `public/media/`.

Adding an asset is a content-only change (a new `.md`/`.yaml` entry, plus
its file under `public/`); no template edits.

## Publishing a new conference edition

> **Never modify templates when adding a new conference edition. A new
> edition only requires: 1. creating `src/content/conference/issue-XXX/`,
> 2. updating the `currentIssue` pointer, 3. running `astro build`.**

Concretely, for Issue IV:

1. Create `src/content/conference/issue-004/` with the eight editorial
   documents (`about`/`cfp`/`theme-letter`/`policies` × `zh`/`en`) and
   `src/data/issue-004/` with the four data files
   (`issue`/`schedule`/`committee`/`speakers` `.yaml`) — copy the
   `issue-003` files as the schema reference.
2. Set `currentIssue: issue-004` in `src/data/institution.yaml`.
3. `npm run build`.

The homepage, navigation, archive list, routes and sitemap all update
themselves. `issue-003` remains frozen at its permanent URLs. Schema
validation (Zod) fails the build if any file drifts from the content model.

## Commands

```bash
npm run dev        # local dev server
npm run build      # static build to dist/
npm run check      # types + content schemas
npm run lint:css   # stylelint (tokens-only colors, BEM class names)
npm run qa:lh      # Lighthouse CI budget (>=95 x4)
```

CI (`.github/workflows/qa.yml`) enforces all of the above plus the
zero-inline-style red line on every push and pull request.

## Deployment

`astro.config.mjs` sets `site`/`base` for GitHub Pages
(`https://uymidgamestudio.github.io/sspcz-website/`). When a custom domain
is adopted: change `SITE`, set `BASE` to `''`, and update
`public/robots.txt`. Legacy URLs (`/third-session.html`, …) are preserved
by redirect stubs. The registration form posts to `/api/register`; the
backend behind it is a separate decision (ADR-001 §6 non-goals).
