# SSPCZ Development Instructions

This repository follows the architectural specifications located in `docs/`.

Before making any code changes, you MUST read, in order:

- `.ai/context.md` — AI bootstrap context
- `docs/000-VISION.md` — Vision and Narrative
- `docs/100-CONTENT_MODEL.md` — Content Model and Ontology
- `docs/200-EDITORIAL.md` — Editorial Principles
- `docs/300-DESIGN_LANGUAGE.md` — Design Language and Visual Grammar
- `docs/400-GOVERNANCE.md` — Engineering Governance & Success Criteria

Never violate these documents.

If a conflict exists, ask for clarification instead of making assumptions.

Do not start implementation until architecture has been approved.
Architecture decisions are recorded as ADRs in `docs/adr/`; an ADR must be
approved by the repository owner before the changes it describes are made.

Note: the legacy static site currently at the repository root predates this
charter and is under migration — see `docs/adr/ADR-001-Initialization.md`.
