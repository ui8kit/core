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

function writeFile(relPath, content) {
  const abs = path.resolve(repoRoot, relPath);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, content);
}

function toStringLiteral(s) {
  return JSON.stringify(s);
}

function joinTokens(tokens) {
  if (!tokens?.length) return "";
  return tokens.join(" ");
}

function emitDefObject(def) {
  const base = joinTokens(def.base ?? []);
  const variants = def.variants ?? {};
  const defaultVariants = def.defaultVariants ?? {};

  const variantsLines = [];
  for (const axisName of Object.keys(variants)) {
    const axis = variants[axisName] ?? {};
    const optLines = [];
    for (const optName of Object.keys(axis)) {
      optLines.push(`      ${toStringLiteral(optName)}: ${toStringLiteral(joinTokens(axis[optName] ?? []))},`);
    }
    variantsLines.push(`    ${toStringLiteral(axisName)}: {\n${optLines.join("\n")}\n    },`);
  }

  const defaultLines = [];
  for (const k of Object.keys(defaultVariants)) {
    defaultLines.push(`    ${toStringLiteral(k)}: ${toStringLiteral(defaultVariants[k])},`);
  }

  return `{
  variants: {
${variantsLines.join("\n")}
  },
  defaultVariants: {
${defaultLines.join("\n")}
  }
}`;
}

function main() {
  const gen = readJson(".project/cdl/variants.generated.json");
  const map = gen?.map ?? {};

  // Generate a CVA-based compat layer from the extracted CDL map.
  // This allows gradual migration: components/apps can keep calling old `*Variants({ ... })` functions.
  const out = [];
  out.push(`import { cva } from "class-variance-authority";`);
  out.push(`\n// Auto-generated compatibility layer.`);
  out.push(`// Source: .project/cdl/variants.generated.json`);
  out.push(`// Do not edit by hand.\n`);

  for (const nsName of Object.keys(map)) {
    const ns = map[nsName] ?? {};
    for (const exportName of Object.keys(ns)) {
      const def = ns[exportName];
      if (!def) continue;

      const base = joinTokens(def.base ?? []);
      const obj = emitDefObject(def);
      out.push(`export const ${exportName} = cva(${toStringLiteral(base)}, ${obj});`);
    }
  }

  const outPath = "src/cdl/compat/variants.generated.ts";
  writeFile(outPath, out.join("\n") + "\n");
  console.log(`Generated: ${normalize(outPath)}`);
}

main();


