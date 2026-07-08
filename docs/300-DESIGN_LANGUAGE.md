# RFC-300: Design Language and Visual Grammar

## 1. The Core Axiom
The visual motifs of SSPCZ MUST NOT derive from the clichés of philosophical history (e.g., Greek columns, classical arches, quills, or statues of Plato). 
They MUST derive from the **ACTIONS of philosophical practice**: Reading, Annotating, Questioning, Responding, Structuring, and Dialoguing.

## 2. Recurring Visual Motifs (The Grammar)

### 2.1 Marginalia & Annotation (批注系统)
- **Concept**: Philosophy happens in the margins.
- **Implementation**: Utilize an asymmetrical CSS Grid. Dedicate a prominent margin track for metadata, themes, reading times, and contextual notes. Do not use tooltip popups.

### 2.2 Numbering as Structure (逻辑树序号)
- **Concept**: The rigorous progression of logic.
- **Implementation**: Replace standard UI cards and bullet points with CSS Counters (e.g., `I, II, III` or `§1, §2, §1.1`). Structure is the primary decoration.

### 2.3 The Dialectic Layout (辩证与对话)
- **Concept**: Thesis and Antithesis.
- **Implementation**: Use spatial tension, left/right alignment shifts, and indentation to represent different voices (e.g., Speaker vs. Discussant) instead of chat bubbles or flat text walls.

### 2.4 Running Headers (运行页眉)
- **Concept**: The physical manifestation of a continuous publication.
- **Implementation**: Use sticky publication metadata (e.g., `SSPCZ | Issue 03 | 2026`) that persists across scrolls, framing the viewport like a physical journal page.

## 3. Tone
- Prefer **clarity** over decoration.
- Prefer **restraint** over novelty.
- Prefer **hierarchy** over visual effects.
- Prefer **meaning** over interaction.