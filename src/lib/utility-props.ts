import { cn } from "./utils";
import { utilityProps } from "./utility-props.generated";

export type UtilityPropPrefix = keyof typeof utilityProps;

export type UtilityPropBag = Partial<Record<UtilityPropPrefix, string | number | boolean | null | undefined>>;

export type UtilityPropValue<P extends UtilityPropPrefix> =
  | (typeof utilityProps)[P][number]
  | string
  | number
  | boolean
  | null
  | undefined;

function toValueString(v: string | number | boolean | null | undefined): string {
  if (v === null || v === undefined) return "";
  if (typeof v === "boolean") return v ? "" : "";
  return String(v);
}

function isAllowed(prefix: string, value: string) {
  const allowed = (utilityProps as any)[prefix] as readonly string[] | undefined;
  if (!allowed) return false;
  return allowed.includes(value);
}

/**
 * Builds Tailwind class tokens from "utility prop" values derived from CDL scan.
 *
 * Rule:
 * - prefix = first segment before '-'
 * - value = everything after first '-'
 * - class = value ? `${prefix}-${value}` : prefix
 *
 * Example:
 * - u({ p: "4", mx: "12", row: "start-1", auto: "rows-auto" })
 *   => "p-4 mx-12 row-start-1 auto-rows-auto"
 */
export function u(props: UtilityPropBag): string {
  const tokens: string[] = [];

  for (const [k, raw] of Object.entries(props)) {
    const value = toValueString(raw as any);
    if (raw === false) continue;

    // Support "bare" token props like { block: true } → "block"
    if (raw === true) {
      if (isAllowed(k, "")) tokens.push(k);
      continue;
    }

    // Normal form: { p: "4" } -> "p-4"
    if (isAllowed(k, value)) {
      tokens.push(value ? `${k}-${value}` : k);
    }
  }

  return tokens.join(" ");
}

/**
 * cn(...) + u(...) helper (most common usage in components).
 */
export function ucn(props: UtilityPropBag, ...rest: Parameters<typeof cn>) {
  return cn(u(props), ...rest);
}

/**
 * Fast utility props -> className resolver (NO runtime validation).
 *
 * Use this when whitelist checks are enforced by scripts/guards and you want
 * the runtime to be as cheap as simple `cn(...)`.
 */
export function ux(props: UtilityPropBag): string {
  const tokens: string[] = [];

  for (const [k, raw] of Object.entries(props)) {
    if (raw === null || raw === undefined || raw === false) continue;

    if (raw === true) {
      tokens.push(k);
      continue;
    }

    const value = String(raw).trim();
    if (!value) {
      tokens.push(k);
      continue;
    }

    tokens.push(`${k}-${value}`);
  }

  return tokens.join(" ");
}

export function uxcn(props: UtilityPropBag, ...rest: Parameters<typeof cn>) {
  return cn(ux(props), ...rest);
}

/**
 * Split any props object into:
 * - `utility`: keys that match the generated `utilityProps` map
 * - `rest`: everything else (safe to spread on DOM elements)
 *
 * This allows components to support `grid="cols-12"` / `gap="2"` etc. without
 * listing keys manually per component.
 *
 * Note: this function does NOT validate values at runtime. Whitelist validation
 * is expected to be enforced by scripts/guards in the workflow.
 */
export function splitUtilityProps<T extends Record<string, any>>(props: T): {
  utility: UtilityPropBag;
  rest: Omit<T, UtilityPropPrefix>;
} {
  const utility: UtilityPropBag = {};
  const rest: Record<string, any> = {};

  for (const [k, v] of Object.entries(props)) {
    if (k in utilityProps) {
      (utility as any)[k] = v;
      continue;
    }
    rest[k] = v;
  }

  return { utility, rest: rest as any };
}

export function resolveUtilityClassName<T extends Record<string, any>>(props: T): {
  utilityClassName: string;
  rest: Omit<T, UtilityPropPrefix>;
} {
  const { utility, rest } = splitUtilityProps(props);
  return { utilityClassName: ux(utility), rest };
}

export { utilityProps };

// =============================================================================
// MISSING UTILITY CLASSES (to be added to CDL whitelist)
// =============================================================================
// These classes were discovered during component refactoring but are not yet
// in the utility-props.generated.ts map. Add them to CDL whitelist and regenerate.
//
// FOUND IN Group.tsx:
// - min-w-0 (for preventGrowOverflow prop - now always enabled by default)
//
// FOUND HARDCODED VARIANTS (need proper CDL variants):
// - Icon.tsx: size variants (xs, sm, md, lg, xl) - currently hardcoded sizeProps object
// - Image.tsx: fit variants (contain, cover, fill, none, scale-down) - currently hardcoded fitProps object
// - Image.tsx: position variants (bottom, center, left, left-bottom, etc.) - currently hardcoded positionProps object
// - Image.tsx: aspect variants (auto, square, video) - currently hardcoded aspectProps object
// - Text.tsx: typography variants (size, weight, align, leading, tracking, modifiers) - currently removed, use utility props
// - Title.tsx: typography variants (size, weight, align, leading, tracking, truncate) - currently removed, use utility props
//
// SOLUTION: Create CDL variant generation for component-specific variants
// 1. Add variant definitions to .project/cdl/variants.json:
//    {
//      "icon": {
//        "size": {
//          "xs": { "w": "3", "h": "3" },
//          "sm": { "w": "4", "h": "4" },
//          ...
//        }
//      },
//      "image": {
//        "fit": { "contain": { "object": "contain" }, ... },
//        "position": { "center": { "object": "center" }, ... },
//        "aspect": { "square": { "aspect": "square" }, ... }
//      }
//    }
// 2. Generate variant functions via scripts/cdl-emit-component-variants.mjs
// 3. Replace hardcoded objects with generated functions:
//    const sizeClasses = iconVariants({ size });
//    const fitClasses = imageVariants({ fit });
//
// POTENTIAL FUTURE NEEDS (anticipate based on common UI patterns):
// - min-w-full, min-w-max, min-w-min, min-w-fit
// - max-w-0, max-w-none, max-w-xs, max-w-sm, max-w-md, etc.
// - flex-auto, flex-initial, flex-none
// - grow-0, shrink-0, shrink
// - basis-auto, basis-full, basis-0
// - aspect-square, aspect-video, aspect-auto
// - object-contain, object-cover, object-fill, object-none, object-scale-down
// - mix-blend-multiply, mix-blend-screen, etc.
// - backdrop-blur, backdrop-brightness, backdrop-contrast, etc.
//
// ADD TO CDL WHITELIST: scripts/cdl-whitelist.mjs or .project/cdl/whitelist.json
// THEN REGENERATE: bun run cdl:utilities:emit
// =============================================================================


