export type CdlTokens = ReadonlyArray<string>;

export type CdlVariantAxis = Record<string, string[]>;

export interface CdlVariantDef {
  base?: string[];
  variants?: Record<string, CdlVariantAxis>;
  defaultVariants?: Record<string, string>;
  source?: string;
}

/**
 * Map layout:
 * - namespace: usually a file stem (e.g. "button", "grid")
 * - exportName: the exported variant definition inside that file (e.g. "buttonVariants")
 */
export type CdlVariantsMap = Record<string, Record<string, CdlVariantDef>>;

export type CdlVariantSelection = Record<string, string | undefined>;


