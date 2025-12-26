import fs from 'node:fs'
import path from 'node:path'

import { parse } from '@babel/parser'
import traverseModule from '@babel/traverse'

const traverse = traverseModule?.default ?? traverseModule
const repoRoot = process.cwd()

function normalize(p) {
  return p.replaceAll('\\', '/')
}

function walkDir(dirAbs, out) {
  const entries = fs.readdirSync(dirAbs, { withFileTypes: true })
  for (const e of entries) {
    const abs = path.join(dirAbs, e.name)
    if (e.isDirectory()) walkDir(abs, out)
    else out.push(abs)
  }
}

function getLine(source, line) {
  const lines = source.split(/\r?\n/)
  return lines[line - 1] ?? ''
}

function isCleanToken(token) {
  // "Clean" means only words/digits and hyphens.
  // Anything else (':', '/', '[', ']', '&', '.', etc.) is a modifier/arbitrary/complex selector.
  return /^[a-z0-9-]+$/.test(token)
}

function splitTokens(classString) {
  return classString.trim().split(/\s+/).filter(Boolean)
}

function findWeirdTokens(classString) {
  const tokens = splitTokens(classString)
  const weird = tokens.filter((t) => !isCleanToken(t))
  return weird
}

function stringifyPath(parts) {
  return parts.filter(Boolean).join('.')
}

function isCvaCall(node) {
  if (!node || node.type !== 'CallExpression') return false
  const callee = node.callee
  return callee?.type === 'Identifier' && callee.name === 'cva'
}

function extractVariantValues(objExpr, pathParts, results, source) {
  if (!objExpr || objExpr.type !== 'ObjectExpression') return

  for (const prop of objExpr.properties) {
    if (prop.type !== 'ObjectProperty') continue
    if (prop.key.type !== 'Identifier' && prop.key.type !== 'StringLiteral' && prop.key.type !== 'NumericLiteral') continue

    const key =
      prop.key.type === 'Identifier'
        ? prop.key.name
        : prop.key.type === 'StringLiteral'
          ? prop.key.value
          : String(prop.key.value)

    const value = prop.value

    if (value.type === 'StringLiteral') {
      const weird = findWeirdTokens(value.value)
      if (weird.length > 0) {
        const loc = value.loc?.start
        results.push({
          kind: 'variant-value',
          path: stringifyPath([...pathParts, key]),
          weird,
          line: loc?.line ?? 0,
          column: loc?.column ?? 0,
          codeLine: loc?.line ? getLine(source, loc.line).trim() : '',
          raw: value.value,
        })
      }
    } else if (value.type === 'ObjectExpression') {
      extractVariantValues(value, [...pathParts, key], results, source)
    }
  }
}

function scanFile(relPath) {
  const abs = path.resolve(repoRoot, relPath)
  const source = fs.readFileSync(abs, 'utf8')
  const ast = parse(source, {
    sourceType: 'module',
    plugins: ['typescript', 'jsx'],
    sourceFilename: abs,
    errorRecovery: false,
  })

  const findings = []

  traverse(ast, {
    CallExpression(p) {
      const node = p.node
      if (!isCvaCall(node)) return

      // 1) base classes: cva("...", {...})
      const first = node.arguments[0]
      if (first && first.type === 'StringLiteral') {
        const weird = findWeirdTokens(first.value)
        if (weird.length > 0) {
          const loc = first.loc?.start
          findings.push({
            kind: 'base',
            path: '<base>',
            weird,
            line: loc?.line ?? 0,
            column: loc?.column ?? 0,
            codeLine: loc?.line ? getLine(source, loc.line).trim() : '',
            raw: first.value,
          })
        }
      }

      // 2) variants: cva(..., { variants: { ... } })
      const second = node.arguments[1]
      if (second && second.type === 'ObjectExpression') {
        const variantsProp = second.properties.find(
          (prop) =>
            prop.type === 'ObjectProperty' &&
            ((prop.key.type === 'Identifier' && prop.key.name === 'variants') ||
              (prop.key.type === 'StringLiteral' && prop.key.value === 'variants')) &&
            prop.value.type === 'ObjectExpression'
        )

        if (variantsProp && variantsProp.type === 'ObjectProperty' && variantsProp.value.type === 'ObjectExpression') {
          extractVariantValues(variantsProp.value, ['variants'], findings, source)
        }
      }
    },
  })

  return findings.map((f) => ({ ...f, file: relPath }))
}

function main() {
  const targetDir = process.argv.includes('--dir')
    ? process.argv[process.argv.indexOf('--dir') + 1]
    : 'src/cdl'

  const absTarget = path.resolve(repoRoot, targetDir)
  const absFiles = []
  walkDir(absTarget, absFiles)

  const tsFiles = absFiles
    .filter((p) => p.endsWith('.ts') || p.endsWith('.tsx'))
    .map((p) => normalize(path.relative(repoRoot, p)))

  const all = []
  for (const f of tsFiles) {
    if (f.endsWith('/index.ts')) continue
    if (f.endsWith('/variants.generated.ts')) continue
    all.push(...scanFile(f))
  }

  if (process.argv.includes('--json')) {
    console.log(JSON.stringify({ targetDir, count: all.length, findings: all }, null, 2))
    return
  }

  if (all.length === 0) {
    console.log(`✅ No modifiers/arbitrary/complex tokens found in ${targetDir}`)
    return
  }

  // Human-readable output
  const byFile = new Map()
  for (const f of all) {
    const arr = byFile.get(f.file) ?? []
    arr.push(f)
    byFile.set(f.file, arr)
  }

  for (const [file, items] of [...byFile.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    console.log(`\n${file}`)
    for (const it of items.sort((a, b) => (a.line ?? 0) - (b.line ?? 0))) {
      const loc = it.line ? `${it.line}:${it.column}` : ''
      console.log(`- ${loc} ${it.kind} ${it.path}`)
      console.log(`  weird: ${it.weird.join(' ')}`)
      if (it.codeLine) console.log(`  ${it.codeLine}`)
    }
  }

  console.log(`\nTotal findings: ${all.length}`)
  console.log(`\nTip: run with --json for machine output.`)
}

main()


