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

### Styling rule (variants-only in components)

In `src/components/**`:
- Do not hardcode Tailwind utility class groups in component bodies (e.g. `'flex flex-col ...'`).
- Move those class strings into `src/variants/**` and compose them in the component via variant functions.

This rule is enforced by:
- `scripts/coverage-guard.mjs` (checks changed files)
- policy tests in `tests/components/` (checks key components)

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


