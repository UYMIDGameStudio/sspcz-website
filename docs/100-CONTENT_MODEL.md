# RFC-100: Content Model and Ontology

## 1. The "Issue-Based" Paradigm
Treat every conference edition as a distinct, archivable publication (an "Issue"). 
The file structure must reflect this timeline (e.g., `src/content/conference/2026/`).

## 2. Hybrid Content Architecture
Content is the first citizen. Do not force documents into databases, and do not force structured data into Markdown.

### 2.1 Editorial Documents (Markdown/MDX)
Used for continuous, narrative-driven texts that require reading flow and future editorial updates by the secretariat.
- **Examples**: Call for Papers (CFP), Opening Remarks, Theme Introductions, History/Archive summaries.
- **Tech Stack**: Astro Content Collections (`.md` / `.mdx`) with strict Zod Schema validation for frontmatter.

### 2.2 Structured Data (YAML)
Used for data-first entities that form matrices, timelines, or relational grids.
- **Examples**: Schedules, Committee Member Lists, Speaker Profiles.
- **Tech Stack**: YAML files parsed statically. YAML is preferred over JSON for its superior human-readability by non-technical contributors.

## 3. Routing Principle
`src/pages/` must act solely as thin routing wrappers. They retrieve the content via Astro Content Collections or YAML imports, inject it into templates, and handle i18n URL resolutions. Business text must never be hardcoded in pages or components.