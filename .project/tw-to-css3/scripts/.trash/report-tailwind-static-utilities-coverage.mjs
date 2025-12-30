import fs from "node:fs";
import path from "node:path";

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function uniqSorted(list) {
  return Array.from(new Set(list)).sort();
}

function parseStaticUtilityClassNames(sourceText) {
  // We only want lines like:
  // staticUtility('float-start', ...)
  // staticUtility("float-start", ...)
  // and ignore anything dynamic/non-literal.
  const re = /staticUtility\(\s*(['"])([^'"]+)\1\s*,/g;
  const out = [];
  let m;
  while ((m = re.exec(sourceText)) !== null) {
    out.push(m[2]);
  }
  return out;
}

const repoRoot = process.cwd();
const utilitiesTsPath = path.join(repoRoot, ".project", "utilities.ts");
const whitelistPath = path.join(repoRoot, ".project", "core-classes.json");
const outDir = path.join(repoRoot, ".project", "reports");
const outPath = path.join(outDir, "tailwind-static-utilities-coverage.json");

if (!fs.existsSync(utilitiesTsPath)) {
  throw new Error(`Missing file: ${utilitiesTsPath}`);
}
if (!fs.existsSync(whitelistPath)) {
  throw new Error(`Missing file: ${whitelistPath}`);
}

fs.mkdirSync(outDir, { recursive: true });

const utilitiesSource = readText(utilitiesTsPath);
const staticUtilityClassNames = uniqSorted(parseStaticUtilityClassNames(utilitiesSource));

const whitelistJson = readJson(whitelistPath);
const whitelistClasses = Array.isArray(whitelistJson?.classes) ? whitelistJson.classes : [];
if (!Array.isArray(whitelistClasses)) {
  throw new Error(`Invalid whitelist format. Expected { "classes": string[] } in ${whitelistPath}`);
}

const whitelistSet = new Set(whitelistClasses);
const staticSet = new Set(staticUtilityClassNames);

// Only those whitelist classes that are present as staticUtility('CLASS', ...)
const present = uniqSorted(whitelistClasses.filter((c) => staticSet.has(c)));
const missing = uniqSorted(whitelistClasses.filter((c) => !staticSet.has(c)));

// Useful for debugging / future expansion (functional utilities etc.)
const result = {
  generatedAt: new Date().toISOString(),
  inputs: {
    utilitiesTsPath: path.relative(repoRoot, utilitiesTsPath),
    whitelistPath: path.relative(repoRoot, whitelistPath),
  },
  counts: {
    whitelist: whitelistClasses.length,
    staticUtilitiesFoundInUtilitiesTs: staticUtilityClassNames.length,
    whitelistPresentInStaticUtilities: present.length,
    whitelistMissingFromStaticUtilities: missing.length,
  },
  present,
  missing,
};

fs.writeFileSync(outPath, JSON.stringify(result, null, 2) + "\n", "utf8");
console.log(`Wrote: ${path.relative(repoRoot, outPath)}`);
console.log(
  `Whitelist classes: ${result.counts.whitelist}; present: ${result.counts.whitelistPresentInStaticUtilities}; missing: ${result.counts.whitelistMissingFromStaticUtilities}`,
);


