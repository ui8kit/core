## Setup commands

- Install deps: `bun install`
- Run browser playground: `bun run test:dev`
- Run TDD loop: `bun run test:watch`
- Run tests once: `bun run test:run`
- Run coverage report: `bun run test:coverage`
- Enforce TDD + coverage policy for changed components: `bun run test:guard`

## Code style

- TypeScript strict mode
- Keep code minimal (UI8Kit core is a baseline layer)
- All code comments must be written in English

## Testing policy (TDD-first)

### What TDD means in this repo

For any change in `src/components/**` (including `src/components/ui/**`):
- Write/adjust a test first under `tests/components/`
- Then change the component implementation under `src/`
- Keep tests green at all times

### Styling rule (strict, variants-only in UI components)

In `src/components/ui/**`:
- Do not hardcode any Tailwind utility strings in `className` (no string/template literals).
- Compose styles via variant functions from `src/variants/**` and merge with `cn(...)`.

This rule is enforced by:
- `scripts/classname-policy-guard.mjs`
- command: `bun run test:guard`

To scan the entire components tree (not only changed files), run:
- `bun run test:policy:all`

Note:
- `src/components/` contains composite components where custom `className` usage can be allowed by the application.

### Coverage rule (strict for changed components)

Changes to `src/components/**` are allowed only if:
- there is a matching test file in `tests/components/`
- the changed component file has **100% coverage** (lines/statements/functions/branches)

This rule is enforced by:
- `scripts/coverage-guard.mjs`
- command: `bun run test:guard`

Example:
- Changing `src/components/ui/Badge.tsx` requires `tests/components/Badge.test.tsx`
  and 100% coverage for that file.

## Coverage artifacts

Running `bun run test:coverage` generates the `coverage/` folder:
- `coverage/index.html`: HTML report
- `coverage/coverage-summary.json`: machine-readable summary (used by coverage guard)


