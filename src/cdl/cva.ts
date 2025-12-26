import { cva, type VariantProps } from "class-variance-authority";
import type { CdlVariantDef } from "./types";

function joinTokens(tokens?: string[]): string {
  if (!tokens?.length) return "";
  return tokens.join(" ");
}

export function cdlToCva(def: CdlVariantDef) {
  const variants: Record<string, Record<string, string>> = {};

  const srcVariants = def.variants ?? {};
  for (const axisName of Object.keys(srcVariants)) {
    const axis = srcVariants[axisName];
    const outAxis: Record<string, string> = {};
    for (const optName of Object.keys(axis)) {
      outAxis[optName] = joinTokens(axis[optName]);
    }
    variants[axisName] = outAxis;
  }

  return cva(joinTokens(def.base), {
    variants,
    defaultVariants: def.defaultVariants,
  });
}

export type CdlCvaProps<T extends (...args: any) => any> = VariantProps<T>;


