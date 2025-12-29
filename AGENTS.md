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

## CDL (Component Definition Language) workflow

### Goal

We are moving UI8Kit styling to a declarative system driven by a whitelist:
- **Whitelist**: the single source of truth for allowed utility classes
- **class → CSS map**: converts whitelisted classes to CSS declarations
- **CDL variants map**: structured variant definitions (no class modifiers)
- **Semantic map**: app-specific semantic names mapped to whitelisted utilities

### Rules

- **Whitelist-first**: any new class must be added to the whitelist and mapped in `class → CSS`.
- **No modifiers in CDL**: CDL and core variant maps must not contain `md:`, `hover:`, `focus:`, `dark:`, etc.
- **No arbitrary values**: forbid bracket syntax like `w-[...]`, `min-h-[...]`, `aspect-[...]` in CDL/core variants.
- **Responsive is structural**: represent responsive behavior as a rule list, not via `md:` strings.

### Utility props (CDL single-token map)

We also maintain a **single-token utility-props map** generated from the current variants scan.

- **Generated map**: `src/lib/utility-props.generated.ts`
- **Runtime resolver**: `src/lib/utility-props.ts`

The intent is to support **Tailwind-like props**:
- prop name = token prefix before the first `-`
- prop value = everything after the first `-`
- `true` or `""` means a **bare token** (e.g. `border` / `border=""` -> `border`)
- `undefined | null | false` is skipped

Example:

```tsx
<Card grid="cols-12" gap="2" p="4" bg="card" rounded="lg" border>
  Content
</Card>
```

Notes:
- Whitelist enforcement should happen via scripts/guards (not heavy runtime validation).
- If a component needs many utility props, it is a signal to create a structured variant or semantic mapping.

Example (Grid columns responsive rules):

```ts
cols: [
  { bp: "base", value: 1 },
  { bp: "md", value: 2 },
  { bp: "lg", value: 3 },
  { bp: "xl", value: 4 }
]
```

Compilers can turn this into:
- Tailwind classes (`grid-cols-1 md:grid-cols-2 ...`) for web
- `@media` CSS rules (`grid-template-columns: repeat(...)`) for head CSS output

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


