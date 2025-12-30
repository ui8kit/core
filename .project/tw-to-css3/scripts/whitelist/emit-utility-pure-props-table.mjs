// .project/tw-to-css3/scripts/whitelist/emit-utility-pure-props-table.mjs
import fs from "node:fs";
import path from "node:path";

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function splitToken(token) {
  const t = String(token ?? "").trim();
  const i = t.indexOf("-");
  if (i === -1) return { prefix: t, value: "" };
  return { prefix: t.slice(0, i), value: t.slice(i + 1) };
}

function stableKey(item) {
  return `${item.namespace}.${item.variant}.${item.axis}.${item.option}`;
}

function main() {
  const root = process.cwd();
  const inputPath =
    process.env.SINGLE_TOKEN_REPORT ??
    path.join(root, ".project", "reports", "variants.single-token.json");

  if (!fs.existsSync(inputPath)) {
    console.error(
      `[emit-utility-pure-props-table] Missing input: ${inputPath}\n` +
        `Run first: bun run scan:variants:token-complexity`,
    );
    process.exit(1);
  }

  const json = readJson(inputPath);
  const items = Array.isArray(json?.items) ? json.items : [];

  /** @type {Record<string, {values: Set<string>, tokens: Set<string>, examples: Array<any>}>} */
  const byPrefix = Object.create(null);

  for (const it of items) {
    const token = Array.isArray(it?.tokens) ? it.tokens[0] : undefined;
    if (typeof token !== "string") continue;
    const { prefix, value } = splitToken(token);
    if (!prefix) continue;

    const entry =
      byPrefix[prefix] ??
      (byPrefix[prefix] = {
        values: new Set(),
        tokens: new Set(),
        //`examples: [],
      });

    entry.values.add(value);
    entry.tokens.add(token);

    // keep a few stable examples for debugging / traceability
    /*if (entry.examples.length < 10) {
      entry.examples.push({
        key: stableKey(it),
        token,
        value,
        source: it.source,
      });
    }*/
  }

  const prefixes = Object.keys(byPrefix).sort((a, b) => a.localeCompare(b));
  const table = {};

  for (const prefix of prefixes) {
    const entry = byPrefix[prefix];
    const values = Array.from(entry.values).sort((a, b) => a.localeCompare(b));
    const tokens = Array.from(entry.tokens).sort((a, b) => a.localeCompare(b));

    table[prefix] = {
      count: tokens.length,
      values,
      // Reconstruct rule: `${prefix}-${value}` (value may be "")
      // examples: entry.examples.sort((a, b) => a.key.localeCompare(b.key)),
    };
  }

  const outDir = path.join(root, ".project", "reports");
  ensureDir(outDir);

  const outPath = path.join(outDir, "utilities.pure.by-prefix.json");
  fs.writeFileSync(
    outPath,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        input: path.relative(root, inputPath),
        groupingRule: 'prefix = token.split("-", 1)[0]; value = token.slice(prefix.length + 1)',
        reconstructionRule: 'tailwindClass = value ? `${prefix}-${value}` : prefix',
        prefixCount: prefixes.length,
        // Note: this counts unique Tailwind tokens in the single-token report
        totalUniqueTokens: prefixes.reduce((sum, p) => sum + table[p].count, 0),
        table,
      },
      null,
      2,
    ) + "\n",
    "utf8",
  );

  console.log(
    [
      "[emit-utility-pure-props-table] Done.",
      `prefixes: ${prefixes.length}`,
      `output: ${path.relative(root, outPath)}`,
    ].join("\n"),
  );
}

main();


