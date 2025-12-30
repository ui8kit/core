// .project/tw-to-css3/scripts/whitelist/emit-utility-props-ts.mjs
import fs from "node:fs";
import path from "node:path";

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function main() {
  const root = process.cwd();
  const inputPath =
    process.env.UTILITIES_PURE_JSON ??
    path.join(root, ".project", "reports", "utilities.pure.by-prefix.json");

  if (!fs.existsSync(inputPath)) {
    console.error(
      `[emit-utility-props-ts] Missing input: ${inputPath}\n` +
        `Run first: bun run cdl:utilities:pure:emit`,
    );
    process.exit(1);
  }

  const json = readJson(inputPath);
  const table = json?.table ?? {};

  const prefixes = Object.keys(table).sort((a, b) => a.localeCompare(b));
  /** @type {Record<string, readonly string[]>} */
  const out = {};

  for (const prefix of prefixes) {
    const values = Array.isArray(table?.[prefix]?.values) ? table[prefix].values : [];
    out[prefix] = values
      .map((v) => (typeof v === "string" ? v : ""))
      .filter((v) => v !== "__INVALID__")
      .sort((a, b) => a.localeCompare(b));
  }

  const outDir = path.join(root, "src", "cdl", "compat");
  ensureDir(outDir);
  const outPath = path.join(outDir, "variants.generated.ts");

  const header = `/* eslint-disable */
/**
 * AUTO-GENERATED FILE.
 * Source: ${path.relative(root, inputPath).replaceAll("\\\\", "/")}
 *
 * Do not edit by hand. Run:
 * - bun run cdl:utilities:pure:emit
 * - bun run cdl:utilities:emit:ts
 */
`;

  fs.writeFileSync(
    outPath,
    header +
      `export const utilityProps = ${JSON.stringify(out, null, 2)} as const;\n`,
    "utf8",
  );

  console.log(
    [
      "[emit-utility-props-ts] Done.",
      `prefixes: ${prefixes.length}`,
      `output: ${path.relative(root, outPath)}`,
    ].join("\n"),
  );
}

main();


