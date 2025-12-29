# CDL (Component Definition Language)

This folder contains the language-agnostic style contracts used to build UI8Kit:

- **Whitelist**: the single source of truth for allowed utility tokens
- **class → CSS map**: converts whitelisted tokens to CSS declarations
- **CDL variants map**: structured component variants (no modifiers, no arbitrary values)
- **Semantic map**: app-specific semantic names mapped to whitelisted tokens

## Rules

- No modifiers in CDL (`md:`, `hover:`, `focus:`, `dark:` ...).
- No arbitrary values in CDL (`*-\\[...\\]`).
- Tokens are stored as arrays (no space-joined strings). Example:

```json
{ "tokens": ["bg-primary", "text-primary-foreground"] }
```

## Responsive (structural)

Responsive behavior must be structural. Example (Grid columns):

```json
{
  "cols": [
    { "bp": "base", "value": 1 },
    { "bp": "md", "value": 2 },
    { "bp": "lg", "value": 3 },
    { "bp": "xl", "value": 4 }
  ]
}
```

## Utility Props (single-token map)

UI8Kit builds a **single source of truth** for safe Tailwind-like props from the
variant scan:

- `src/lib/utility-props.generated.ts` - generated map of allowed utility prefixes
  and values (pure data, constants-first).

### Runtime rules

When a component opts into "utility props", the mapping is:

- `undefined | null | false` -> skipped
- `true` -> **bare token**: `prefix`
- `""` (empty string) -> **bare token**: `prefix`
- `"value"` / `number` -> `prefix-value`

Examples:

- `grid="cols-12"` -> `grid-cols-12`
- `gap="2"` -> `gap-2`
- `border` / `border=""` -> `border`
- `grow={0}` -> `grow-0`

### Why it exists

- Design stays in **variants** (structured packs of tokens).
- Utility props allow **small, explicit, whitelisted adjustments** without
  leaking arbitrary class strings into `className`.
- Overuse is a signal: if a component needs many utility props, it should grow a
  proper design variant instead.

### Dev runtime vs emitted templates

UI8Kit is designed to support two modes:

- **Dev/runtime**: components may compute class strings from props to improve developer experience.
- **Emit/build**: the same CDL maps can be used to generate "pure" templates for other engines
  (React/Vue/Svelte/HBS/Liquid/etc) where the output is a final token string, semantic directive,
  or head CSS rule set.


