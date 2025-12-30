import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();

function normalize(p) {
  return p.replaceAll("\\", "/");
}

function readJson(relPath) {
  const abs = path.resolve(repoRoot, relPath);
  return JSON.parse(fs.readFileSync(abs, "utf8"));
}

function writeJson(relPath, value) {
  const abs = path.resolve(repoRoot, relPath);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, JSON.stringify(value, null, 2));
}

function uniq(arr) {
  return Array.from(new Set(arr));
}

function flattenTokens(def) {
  const out = [];
  for (const t of def.base ?? []) out.push(t);
  const variants = def.variants ?? {};
  for (const axisName of Object.keys(variants)) {
    const axis = variants[axisName] ?? {};
    for (const optName of Object.keys(axis)) {
      const toks = axis[optName] ?? [];
      for (const t of toks) out.push(t);
    }
  }
  return out;
}

function axisOptionTokenCounts(axis) {
  const counts = {};
  for (const optName of Object.keys(axis ?? {})) {
    counts[optName] = (axis?.[optName] ?? []).length;
  }
  return counts;
}

function isUtilityAxis(axis) {
  // Heuristic:
  // - every option resolves to exactly ONE token (or empty token),
  // - and the non-empty tokens look like a single Tailwind utility token (no whitespace possible here).
  // This means it can be represented as a direct prop table mapping instead of CVA.
  const optionNames = Object.keys(axis ?? {});
  if (optionNames.length === 0) return false;

  let hasAnyNonEmpty = false;
  for (const optName of optionNames) {
    const toks = axis?.[optName] ?? [];
    if (toks.length > 1) return false;
    if (toks.length === 1) {
      hasAnyNonEmpty = true;
      const t = toks[0];
      if (typeof t !== "string" || !t.trim()) return false;
      // allow slash tokens like "bg-muted/50", forbid modifiers like "md:" (CDL rule)
      if (t.includes(":")) return false;
      // still allow arbitrary values here? we only classify, not validate.
    }
  }

  return hasAnyNonEmpty;
}

function estimateAxisKind(axis) {
  if (isUtilityAxis(axis)) return "utility";
  return "variant";
}

function main() {
  const gen = readJson(".project/cdl/variants.generated.json");
  const map = gen?.map ?? {};

  const report = {
    generatedAt: new Date().toISOString(),
    source: ".project/cdl/variants.generated.json",
    namespaces: {},
    summary: {
      totalVariantDefs: 0,
      totalAxes: 0,
      axesUtility: 0,
      axesVariant: 0,
      uniqueTokens: 0,
    },
  };

  const allTokens = [];

  for (const nsName of Object.keys(map)) {
    const ns = map[nsName] ?? {};
    const nsOut = {};

    for (const exportName of Object.keys(ns)) {
      const def = ns[exportName];
      if (!def) continue;

      report.summary.totalVariantDefs += 1;
      for (const t of flattenTokens(def)) allTokens.push(t);

      const axes = def.variants ?? {};
      const axesOut = {};
      for (const axisName of Object.keys(axes)) {
        report.summary.totalAxes += 1;
        const axis = axes[axisName] ?? {};
        const kind = estimateAxisKind(axis);
        if (kind === "utility") report.summary.axesUtility += 1;
        else report.summary.axesVariant += 1;

        axesOut[axisName] = {
          kind,
          optionCount: Object.keys(axis).length,
          optionTokenCounts: axisOptionTokenCounts(axis),
        };
      }

      nsOut[exportName] = {
        source: def.source,
        baseTokenCount: (def.base ?? []).length,
        axes: axesOut,
      };
    }

    report.namespaces[nsName] = nsOut;
  }

  report.summary.uniqueTokens = uniq(allTokens).length;

  const outPath = ".project/reports/cdl-revision-report.json";
  writeJson(outPath, report);
  console.log(`Generated: ${normalize(outPath)}`);
}

main();


