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

We are moving UI8Kit styling to a declarative system driven by the CDL utility-props map:
- **CDL map**: `src/cdl/utility-props.map.ts` - the single source of truth for all allowed Tailwind utility prefixes and their values
- **Runtime resolver**: `src/lib/utility-props.ts` - fast utility props -> className conversion
- **CVA variants**: `src/variants/` - structured variant definitions for multi-class combinations (grid, button, badge, card, image)
- **Semantic map**: app-specific semantic names mapped to whitelisted utilities

### Rules

- **CDL-first**: any new utility prop must be defined in `src/cdl/utility-props.map.ts`
- **No modifiers in CDL**: CDL map must not contain `md:`, `hover:`, `focus:`, `dark:`, etc.
- **No arbitrary values**: forbid bracket syntax like `w-[...]`, `min-h-[...]`, `aspect-[...]` in CDL map.
- **Responsive is structural**: represent responsive behavior as a rule list, not via `md:` strings.
- **Single-token only**: CDL map contains only single Tailwind classes (one class per prop-value combination)

### Utility props (CDL single-token map)

The **CDL utility-props map** (`src/cdl/utility-props.map.ts`) contains all allowed Tailwind utility prefixes and their values.

- **Map location**: `src/cdl/utility-props.map.ts`
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
- Runtime validation is minimal (fast key lookup in map).
- If a component needs many utility props, it is a signal to create a structured CVA variant.
- Only 5 core components still use CVA variants: Grid, Button, Badge, Card, Image.

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

### Component Layer Rules

#### Primitive Components (`src/components/ui/**`)
- **No styles**: Never hardcode Tailwind utility strings in `className`
- **No logic**: No state, effects, or business logic
- **CDL props only**: Use `resolveUtilityClassName()` and default `ux()` calls
- **CVA variants**: Only for multi-class combinations (grid, button, badge, card, image)
- **JIT-ready**: All classes must be statically analyzable for Tailwind JIT

#### Composite Components (`src/components/**`)
- **Full control**: Logic, state, styling, and custom classes allowed
- **CDL foundation**: Build on primitives with utility props
- **CVA variants**: Use for complex styling combinations
- **Application-level**: Can include business logic and custom styling

### Styling Enforcement

The classname policy is enforced by:
- `scripts/classname-policy-guard.mjs`
- command: `bun run test:guard`

To scan the entire components tree:
- `bun run test:policy:all`

### Coverage rule (strict for changed components)

Changes to `src/components/**` require:
- A matching test file in `tests/components/`
- **100% coverage** (lines/statements/functions/branches) for the changed file

This rule is enforced by:
- `scripts/coverage-guard.mjs`
- command: `bun run test:guard`

Example:
- Changing `src/components/ui/Button.tsx` requires `tests/components/Button.test.tsx` with 100% coverage
- Changing `src/components/Card.tsx` requires `tests/components/Card.test.tsx` with 100% coverage

Note: Both primitive (`ui/`) and composite (`components/`) components follow the same testing requirements.

## Coverage artifacts

Running `bun run test:coverage` generates the `coverage/` folder:
- `coverage/index.html`: HTML report
- `coverage/coverage-summary.json`: machine-readable summary (used by coverage guard)


