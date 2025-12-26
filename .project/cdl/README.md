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


