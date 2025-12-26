import fs from "node:fs";
import path from "node:path";

import { cdlVariants } from "../src/cdl/variants";

function normalize(p: string) {
  return p.replaceAll("\\", "/");
}

function main() {
  const repoRoot = process.cwd();
  const outPath = path.join(repoRoot, ".project", "cdl", "variants.trace.json");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });

  const payload = {
    generatedAt: new Date().toISOString(),
    source: "src/cdl/variants.ts",
    map: cdlVariants,
  };

  fs.writeFileSync(outPath, JSON.stringify(payload, null, 2));
  console.log(`Wrote: ${normalize(path.relative(repoRoot, outPath))}`);
}

main();


