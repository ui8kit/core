# UI8Kit CDL Migration Plan (Modular, Constants-First)

## Goal

Split styling into **two distinct systems**:

- **Design variants**: curated multi-token style bundles used by components (e.g. `Button.variant`, `Button.size`, `Card.variant`). These remain a "design layer".
- **Utility props**: direct 1-token Tailwind mappings where the prop name represents the utility group (e.g. `bg="primary" → "bg-primary"`, `w="full" → "w-full"`). These are a "layout/utility layer".

In development we can keep ergonomic CVA functions for authoring. In production we target **CDL constants** (maps), so no runtime CVA is required.

## Why this split

- CVA is great for **real variants** (multi-token bundles, defaults, component semantics).
- CVA is unnecessary for **single-token utilities** (mapping tables are smaller, faster, and easier to validate/compile).
- This reduces maintenance cost and makes validation/compilation deterministic for cross-platform adapters.

## Phased plan

### Phase 0 — Audit current state (no component changes)

- Generate a revision report from extracted CVA defs:
  - classify each axis as `utility` vs `variant`
  - show option counts and token counts per option

Command:
- `bun run cdl:revise:report`

Artifact:
- `.project/reports/cdl-revision-report.json`

### Phase 1 — Define the new CDL source-of-truth

Create **modular** TypeScript constants under `src/cdl/**`:

- `src/cdl/variants/*`: component design variants (multi-token bundles)
- `src/cdl/utilities/*`: utility-prop maps (single-token, normalized)
- `src/cdl/semantic/*` (optional, app-level): semantic aliases that map to whitelisted utilities

Rules:
- No responsive modifiers in core CDL (`md:`, `lg:`, `hover:`, `dark:` are forbidden).
- No arbitrary values in core CDL (`w-[...]`, `min-h-[...]` are forbidden).
- Slash tokens are allowed (e.g. `bg-muted/50`).

### Phase 2 — Migration buffer (backward compatibility)

Provide temporary compatibility layers so old apps/components can migrate gradually:

- **Compat (CVA)**: generate CVA functions from extracted CDL maps so existing code can keep calling `*Variants({ ... })` while the source-of-truth moves to constants.

Command:
- `bun run cdl:emit:compat`

Output:
- `src/cdl/compat/variants.generated.ts` (generated file)

### Phase 3 — Rewrite variants (your step)

Rewrite `src/variants/**` to reflect the new split:

- Keep only **real design variants** as authoring modules.
- Move single-token axes into the **utilities tables** (CDL constants), not CVA.

Output expectation:
- fewer CVA axes
- clearer component semantics
- deterministic token sets for whitelisting

### Phase 4 — Migrate components incrementally

Migration rule:
- Components may continue using existing `src/variants/**` during transition.
- New/updated components should prefer:
  - design variants via CDL constants
  - utilities via utility-prop maps (compiled to tokens)

Keep `bun run test:guard` green at every step (coverage + policy).

## Tooling added

- `cdl:revise:report`: produces a revision report (utility vs variant classification).
- `cdl:emit:compat`: emits a CVA compatibility layer from extracted CDL.


