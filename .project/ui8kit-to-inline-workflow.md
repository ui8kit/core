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

- **A. UI8Kit variants**: the only place where utility classes are written.
- **B. CDL maps**: declarative component/variant definitions for code generation.
- **C. Tailwind class inventory**: exact whitelist extracted from variants.
- **D. `class → CSS` map**: mapping for the whitelist (atomic when possible).
- **E. Semantic map**: `semanticName → [tailwindLikeClasses...]`.
- **F. Prototype exports**:
  - HTML with **semantic classes**
  - HTML with **utility classes**
  - (optionally) HTML with **inline styles**

## Plan (tasks)

## React (source of truth)

### 1) Refactor UI8Kit: “variants only”
- Move all Tailwind utility strings out of JSX and into variant files.
- Enforce rule: components consume variant props; no ad-hoc class strings in bodies.
- Result: components = logic/structure, variants = styling.

### 2) Create CDL maps (declarative component definitions)
- Define a CDL schema (YAML/JSON/TS) that describes:
  - component name
  - variant axes + options
  - default variants
  - compound variants (if needed)
- Add scripts to generate/validate CDL output.
- Result: a stable machine-readable description for generation.

### 3) Audit real Tailwind usage (whitelist)
- Scan all variant definitions → extract unique class tokens.
- Save to a single whitelist (e.g. `.project/core-classes.json`).
- Result: exact class surface area that UI8Kit core supports.

### 4) Build `class → CSS3 properties` map for the whitelist
- Create/maintain a map where:
  - key = class name
  - value = CSS declarations (prefer **1 class = 1 property**; allow small composites like `truncate`)
- Include generators for tokenized classes (spacing, etc.) where it’s safe.
- Result: deterministic conversion to inline CSS or head CSS.

### 5) Build semantic design system map
- Define semantic keys that represent UI intent:
  - `button.primary`, `card.surface`, `text.muted`, etc.
- Values are **coordinated sets** of tailwind-like utilities (from the whitelist).
- Add validation scripts that ensure:
  - only whitelisted utilities are used
  - no forbidden “decorative” classes slip into the core layer
- Result: semantic-first UI building blocks.

### 6) Export static HTML5 prototypes (render static markup)
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
