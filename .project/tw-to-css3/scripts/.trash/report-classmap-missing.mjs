import fs from 'node:fs'
import path from 'node:path'

const repoRoot = process.cwd()

function normalize(p) {
  return p.replaceAll('\\', '/')
}

function readFile(rel) {
  const abs = path.join(repoRoot, rel)
  if (!fs.existsSync(abs)) throw new Error(`Missing: ${rel}`)
  return fs.readFileSync(abs, 'utf8')
}

function parseObjectLiteralKeys(source) {
  // Extract keys like: 'foo-bar': ... OR "foo": ... OR foo: ...
  // Used for map-like files: core.ts, sr.ts, transforms.ts, squareBracket.ts
  const keys = new Set()
  const re = /(^|\n)\s*(?:'([^']+)'|"([^"]+)"|([A-Za-z0-9_-]+))\s*:/g
  let m
  while ((m = re.exec(source))) {
    const k = m[2] ?? m[3] ?? m[4]
    if (k) keys.add(k)
  }
  return keys
}

function parseSimpleStringMap(source, exportName) {
  // Parse a flat object exported as `export const <name> = { ... }`
  // Returns key->value as strings.
  const start = source.indexOf(`export const ${exportName}`)
  if (start === -1) return {}
  const slice = source.slice(start)
  const open = slice.indexOf('{')
  const close = slice.indexOf('};')
  if (open === -1 || close === -1) return {}
  const body = slice.slice(open, close + 1)

  const map = {}
  const re = /'([^']+)'\s*:\s*'([^']*)'|"([^"]+)"\s*:\s*"([^"]*)"|'([^']+)'\s*:\s*`[\s\S]*?`/g
  let m
  while ((m = re.exec(body))) {
    const k = m[1] ?? m[3] ?? m[5]
    // We only need keys for generating combinations; values are optional.
    if (k) map[k] = true
  }
  return map
}

function buildMappedClassSet() {
  const mapped = new Set()

  // 1) core.ts (explicit map)
  for (const k of parseObjectLiteralKeys(readFile('.project/classes/core.ts'))) mapped.add(k)

  // 2) sr.ts, transforms.ts (explicit maps)
  for (const k of parseObjectLiteralKeys(readFile('.project/classes/sr.ts'))) mapped.add(k)
  for (const k of parseObjectLiteralKeys(readFile('.project/classes/transforms.ts'))) mapped.add(k)

  // 3) spacing.ts generates combinations: `${entryKey}-${tokenKey}`
  const spacingSrc = readFile('.project/classes/spacing.ts')
  const sizeTokens = Object.keys(parseSimpleStringMap(spacingSrc, 'sizeTokens'))
  const sizedEntries = Object.keys(parseSimpleStringMap(spacingSrc, 'sizedEntries'))
  for (const e of sizedEntries) {
    for (const t of sizeTokens) mapped.add(`${e}-${t}`)
  }

  // 4) color.ts generates combinations: `${entryKey}-${tokenKey}`
  const colorSrc = readFile('.project/classes/color.ts')
  const colorTokens = Object.keys(parseSimpleStringMap(colorSrc, 'colorTokens'))
  const coloredEntries = Object.keys(parseSimpleStringMap(colorSrc, 'coloredEntries'))
  for (const e of coloredEntries) {
    for (const t of colorTokens) mapped.add(`${e}-${t}`)
  }

  // 5) squareBracket.ts is pattern-based; include its base keys for reporting.
  // (If we decide to forbid arbitrary values, we can ignore this later.)
  for (const k of parseObjectLiteralKeys(readFile('.project/classes/squareBracket.ts'))) mapped.add(k)

  return mapped
}

function main() {
  const whitelistPath = path.join(repoRoot, '.project', 'core-classes.json')
  if (!fs.existsSync(whitelistPath)) {
    throw new Error('Missing .project/core-classes.json. Run: bun run cdl:whitelist')
  }

  const whitelist = JSON.parse(fs.readFileSync(whitelistPath, 'utf8'))
  const classes = new Set(whitelist.classes || [])

  const mapped = buildMappedClassSet()
  const missing = [...classes].filter((c) => !mapped.has(c)).sort()

  const out = {
    whitelistCount: classes.size,
    mappedCount: mapped.size,
    missingCount: missing.length,
    missing,
    timestamp: new Date().toISOString(),
  }

  const outPath = path.join(repoRoot, '.project', 'reports', 'classmap-missing.json')
  fs.mkdirSync(path.dirname(outPath), { recursive: true })
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2))

  console.log(`Wrote: ${normalize(path.relative(repoRoot, outPath))}`)
  console.log(`Whitelist: ${out.whitelistCount}`)
  console.log(`Mapped:    ${out.mappedCount}`)
  console.log(`Missing:   ${out.missingCount}`)
  if (missing.length > 0) {
    console.log('\nFirst 30 missing:')
    console.log(missing.slice(0, 30).join('\n'))
  }
}

main()


