import fs from "node:fs";
import path from "node:path";

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function isTailwindToken(token) {
  if (typeof token !== "string") return false;
  const t = token.trim();
  if (!t) return false;
  // "one token" in our pipeline is a single class string, no whitespace.
  return !/\s/.test(t);
}

function flattenVariantMap(map) {
  /** @type {Array<{namespace: string, variantName: string, base: string[], variants: any, defaultVariants: any, source?: string}>} */
  const defs = [];

  for (const [namespace, namespaceMap] of Object.entries(map ?? {})) {
    if (!namespaceMap || typeof namespaceMap !== "object") continue;
    for (const [variantName, def] of Object.entries(namespaceMap)) {
      if (!def || typeof def !== "object") continue;
      defs.push({
        namespace,
        variantName,
        base: Array.isArray(def.base) ? def.base : [],
        variants: def.variants ?? {},
        defaultVariants: def.defaultVariants ?? {},
        source: typeof def.source === "string" ? def.source : undefined,
      });
    }
  }

  return defs;
}

function scan(map) {
  const multiToken = [];
  const singleToken = [];

  const defs = flattenVariantMap(map);
  for (const def of defs) {
    const variants = def.variants ?? {};
    for (const [axisName, axis] of Object.entries(variants)) {
      if (!axis || typeof axis !== "object") continue;

      for (const [optionName, value] of Object.entries(axis)) {
        const tokens = Array.isArray(value) ? value : [];
        const normalized = tokens.map((t) => (typeof t === "string" ? t.trim() : "")).filter(Boolean);
        const tokenCount = normalized.length;

        const record = {
          namespace: def.namespace,
          variant: def.variantName,
          axis: axisName,
          option: optionName,
          tokenCount,
          tokens: normalized,
          source: def.source,
        };

        if (tokenCount >= 3) {
          multiToken.push(record);
        }

        if (tokenCount === 1 && isTailwindToken(normalized[0])) {
          singleToken.push(record);
        }
      }
    }
  }

  // Deterministic ordering for diffs
  const byKey = (a, b) =>
    `${a.namespace}.${a.variant}.${a.axis}.${a.option}`.localeCompare(
      `${b.namespace}.${b.variant}.${b.axis}.${b.option}`,
    );

  multiToken.sort(byKey);
  singleToken.sort(byKey);

  return { multiToken, singleToken };
}

function main() {
  const root = process.cwd();
  const inputPath =
    process.env.CDL_VARIANTS_JSON ??
    path.join(root, ".project", "cdl", "variants.generated.json");

  if (!fs.existsSync(inputPath)) {
    console.error(
      `[scan-variant-token-complexity] Missing input: ${inputPath}\n` +
        `Run: bun run cdl:extract (or set CDL_VARIANTS_JSON=/path/to/file)`,
    );
    process.exit(1);
  }

  const json = readJson(inputPath);
  const map = json?.map ?? json; // tolerate either { map } or direct map

  const { multiToken, singleToken } = scan(map);

  const outDir = path.join(root, ".project", "reports");
  ensureDir(outDir);

  const outMulti = path.join(outDir, "variants.multi-token.json");
  const outSingle = path.join(outDir, "variants.single-token.json");

  fs.writeFileSync(
    outMulti,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        input: path.relative(root, inputPath),
        rule: "Includes any axis option whose value expands to 3+ Tailwind tokens.",
        count: multiToken.length,
        items: multiToken,
      },
      null,
      2,
    ) + "\n",
    "utf8",
  );

  fs.writeFileSync(
    outSingle,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        input: path.relative(root, inputPath),
        rule: "Includes axis options whose value expands to exactly 1 Tailwind token.",
        count: singleToken.length,
        items: singleToken,
      },
      null,
      2,
    ) + "\n",
    "utf8",
  );

  console.log(
    [
      "[scan-variant-token-complexity] Done.",
      `multi-token(3+): ${multiToken.length} -> ${path.relative(root, outMulti)}`,
      `single-token(1): ${singleToken.length} -> ${path.relative(root, outSingle)}`,
    ].join("\n"),
  );
}

main();


