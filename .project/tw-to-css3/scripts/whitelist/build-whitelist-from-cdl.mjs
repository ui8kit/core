// .project/tw-to-css3/scripts/whitelist/build-whitelist-from-cdl.mjs
import fs from 'node:fs'
import path from 'node:path'

const repoRoot = process.cwd()

function normalize(p) {
  return p.replaceAll('\\', '/')
}

function walk(obj, visit) {
  if (Array.isArray(obj)) {
    for (const v of obj) walk(v, visit)
    return
  }
  if (obj && typeof obj === 'object') {
    visit(obj)
    for (const v of Object.values(obj)) walk(v, visit)
  }
}

function isToken(x) {
  return typeof x === 'string' && x.length > 0
}

function main() {
  const inputRel = '.project/cdl/variants.generated.json'
  const inputPath = path.join(repoRoot, inputRel)

  if (!fs.existsSync(inputPath)) {
    throw new Error(`Missing: ${inputRel}\nRun: bun run cdl:extract`)
  }

  const json = JSON.parse(fs.readFileSync(inputPath, 'utf8'))
  const tokens = new Set()

  // Convention: in our generated map, base/variants/* values are arrays of tokens.
  walk(json, (node) => {
    if (node && typeof node === 'object') {
      if (Array.isArray(node.base)) {
        for (const t of node.base) if (isToken(t)) tokens.add(t)
      }
      if (node.variants && typeof node.variants === 'object') {
        for (const axis of Object.values(node.variants)) {
          if (!axis || typeof axis !== 'object') continue
          for (const opt of Object.values(axis)) {
            if (Array.isArray(opt)) {
              for (const t of opt) if (isToken(t)) tokens.add(t)
            }
          }
        }
      }
    }
  })

  const list = [...tokens].sort()

  const out = {
    classes: list,
    count: list.length,
    generatedFrom: inputRel,
    timestamp: new Date().toISOString(),
  }

  const outPath = path.join(repoRoot, '.project', 'core-classes.json')
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2))
  console.log(`Wrote: ${normalize(path.relative(repoRoot, outPath))} (${out.count} classes)`)
}

main()


