import fs from 'node:fs'
import path from 'node:path'

const repoRoot = process.cwd()

function normalize(p) {
  return p.replaceAll('\\', '/')
}

function main() {
  const inputRel = '.project/cdl/variants.generated.json'
  const inputPath = path.join(repoRoot, inputRel)
  if (!fs.existsSync(inputPath)) {
    throw new Error(`Missing: ${inputRel}\nRun: bun run cdl:extract`)
  }

  const json = JSON.parse(fs.readFileSync(inputPath, 'utf8'))
  const map = json?.map
  if (!map || typeof map !== 'object') {
    throw new Error(`Invalid input: ${inputRel} missing .map`)
  }

  const outDir = path.join(repoRoot, 'src', 'cdl')
  fs.mkdirSync(outDir, { recursive: true })

  const outRel = 'src/cdl/variants.generated.ts'
  const outPath = path.join(repoRoot, outRel)

  const header = `/* eslint-disable */
/**
 * AUTO-GENERATED FILE.
 * Source: ${inputRel}
 * Generated at: ${json.generatedAt ?? new Date().toISOString()}
 *
 * Do not edit by hand. Run:
 * - bun run cdl:extract
 * - bun run cdl:emit:ts
 */
import type { CdlVariantsMap } from "./types";

export const cdlVariantsGenerated: CdlVariantsMap = `

  const body = JSON.stringify(map, null, 2) + ';\n'
  fs.writeFileSync(outPath, header + body)

  console.log(`Wrote: ${normalize(outRel)}`)
}

main()


