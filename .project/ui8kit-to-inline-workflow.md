# UI8Kit → CDL → Styles Adapters (Tailwind / head CSS / inline)

## What we build

We turn UI8Kit into a **declarative, scriptable design system** where:
- **Source of truth lives in React** (variants + CDL maps).
- We can output styles as:
  - **Pure Tailwind classes** (normal UI8Kit usage)
  - **Inline styles** (Tailwind-free rendering)
  - **`<style>`/head CSS** (Tailwind-free rendering with shared CSS)
  - Any other target via adapters (Go, Python, Rust, etc.)

## What to consider (constraints)

- **Minimal UI/UX baseline**: UI8Kit core is a clean prototype layer (no brand decorations).
  - No gradients, complex shadows, animations, fancy effects by default.
  - Brand styling happens in the next layer (theme/adapters).
- **Tailwind classes never inside component bodies**: only in **variants**.
- **Tokens via shadcn**: colors/radius/fonts/etc should be driven by token variables, not Tailwind’s default palette.
- **Scoped support**: start with the exact set of classes actually used by variants (whitelist), not “all Tailwind”.

## Artifacts (deliverables)

These five artifacts are the core of the system:

- **1) Whitelist (single source of truth)**: allowed utility class tokens (+ allowed patterns, if any).
- **2) `class → CSS` map**: direct mapping from whitelisted classes to CSS declarations.
- **3) CDL variants map**: structured component variant definitions (no modifiers, no arbitrary values).
- **4) Semantic map (app-specific)**: `semanticKey → [utility classes...]` (must be whitelisted).
- **5) Validator**: verifies that all classes used by CDL/semantic maps are whitelisted and mappable.

Optional exports (for prototyping):
- HTML with **semantic classes**
- HTML with **utility classes**
- HTML with **inline styles** (Tailwind-free)

## Plan (tasks)

## React (source of truth)

### 1) Refactor UI8Kit: “variants only”
- Move all Tailwind utility strings out of JSX and into variant files.
- Enforce rule: components consume variant props; no ad-hoc class strings in bodies.
- Result: components = logic/structure, variants = styling.

### 2) Create CDL variants map (structured, modifiers-free)
- Define a minimal CDL schema that describes:
  - component name
  - variant axes + options (each option value must be a single utility token)
  - default variants
  - optional compound rules (still one token per field)
- Add a separate structured form for **responsive rules** (no `md:` in strings):
  - Example: `cols: [{ bp: "base", value: 1 }, { bp: "lg", value: 4 }]`
- Result: a stable machine-readable style contract for generation and validation.

### 3) Build the whitelist (single source of truth)
- Scan current variants → extract all class tokens used in core.
- Normalize tokens:
  - keep `/` tokens (e.g. `bg-muted/50`)
  - remove modifiers (`md:`, `hover:`, etc.) from CDL/core maps
  - remove arbitrary values (`*-\\[...\\]`) and replace with clean tokens
- Save as a whitelist file (e.g. `.project/core-classes.json`).
- Result: the only allowed class surface area for maps and compilers.

### 4) Build the `class → CSS` map for the whitelist
- Ensure every whitelisted token has a deterministic CSS mapping.
- Prefer **1 token → 1 CSS property**. Allow small composites only when unavoidable (e.g. `truncate`).
- Result: deterministic conversion for inline/head CSS modes.

### 5) Build semantic map (app-specific)
- Define semantic keys that represent UI intent:
  - `button.primary`, `card.surface`, `text.muted`, etc.
- Values are coordinated sets of **whitelisted** utility tokens.
- Result: semantic-first UI composition without losing the whitelist guarantees.

### 6) Add validator (maps vs whitelist)
- Validate:
  - every class used in CDL variants map is in the whitelist
  - every class used in semantic map is in the whitelist
  - every whitelisted class has a `class → CSS` mapping
- Result: guaranteed consistency across the system.

### 7) Export static HTML5 prototypes (optional)
- Render components to static HTML in 2 modes:
  - **semantic mode**: semantic classes only (portable prototypes)
  - **utility mode**: expanded utility classes (Tailwind-compatible)
- Optional third mode:
  - **inline mode**: compile utility classes → inline styles (Tailwind-free)
- Result: reusable prototypes that can be displayed with Tailwind or without Tailwind.

## Adapters (Go + any other language)

### 7) Define adapter contract (language-agnostic)
Inputs:
- semantic classes OR utility classes
- semantic map + class whitelist + class→CSS map

Outputs (choose per target):
- utility classes (Tailwind mode)
- inline style string/object
- head CSS (deduplicated) + class names

### 8) Implement adapters per language/framework
- Go adapter is just one implementation:
  - semantic → utilities → inline/head CSS
- Repeat for any language:
  - Python/Rust/Java/… (HTML generation + styles)
- Result: same CDL/maps, multiple runtimes.

## LLM workflow (optional accelerator)

### 9) Use prototypes as prompt input
- Take exported HTML prototypes as input to LLM requests:
  - generate templates/layout in target language
  - keep class/semantic naming stable
- Validate output against the whitelist/maps.

## Success criteria (simple)
- 0 Tailwind classes inside component bodies (variants-only rule).
- 100% of variant classes present in whitelist.
- 100% of whitelist classes mapped in `class → CSS`.
- Prototypes render correctly in:
  - Tailwind mode (utility classes)
  - Tailwind-free mode (inline or head CSS)
