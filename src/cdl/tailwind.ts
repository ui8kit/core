import type { CdlVariantDef, CdlVariantSelection } from "./types";

export interface CompileTailwindOptions {
  /**
   * If true, invalid variant options throw (recommended for dev & tests).
   * If false, invalid options are ignored.
   */
  strict?: boolean;
}

export function compileCdlToTailwind(
  def: CdlVariantDef,
  selection: CdlVariantSelection = {},
  options: CompileTailwindOptions = {}
): string {
  const strict = options.strict ?? true;
  const out: string[] = [];

  if (def.base?.length) out.push(...def.base);

  const variants = def.variants ?? {};
  const defaults = def.defaultVariants ?? {};

  for (const axisName of Object.keys(variants)) {
    const axis = variants[axisName];
    const chosen = selection[axisName] ?? defaults[axisName];
    if (!chosen) continue;

    const tokens = axis[chosen];
    if (!tokens) {
      if (strict) {
        const known = Object.keys(axis).sort().join(", ");
        throw new Error(
          `Unknown variant option: ${axisName}=${chosen}. Known: ${known}`
        );
      }
      continue;
    }

    out.push(...tokens);
  }

  return out.join(" ").trim();
}


