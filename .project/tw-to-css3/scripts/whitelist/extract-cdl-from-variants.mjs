// .project/tw-to-css3/scripts/whitelist/extract-cdl-from-variants.mjs
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

function splitTokens(str) {
  return str.trim().split(/\s+/).filter(Boolean)
}

function isCvaCall(node) {
  return node?.type === 'CallExpression' && node.callee?.type === 'Identifier' && node.callee.name === 'cva'
}

function literalKey(keyNode) {
  if (!keyNode) return null
  if (keyNode.type === 'Identifier') return keyNode.name
  if (keyNode.type === 'StringLiteral') return keyNode.value
  if (keyNode.type === 'NumericLiteral') return String(keyNode.value)
  return null
}

function getObjectProp(objExpr, propName) {
  if (!objExpr || objExpr.type !== 'ObjectExpression') return null
  for (const prop of objExpr.properties) {
    if (prop.type !== 'ObjectProperty') continue
    const key = literalKey(prop.key)
    if (key === propName) return prop.value
  }
  return null
}

function parseVariantObject(objExpr) {
  // { axis: { option: "token token" } }
  const axes = {}
  if (!objExpr || objExpr.type !== 'ObjectExpression') return axes

  for (const axisProp of objExpr.properties) {
    if (axisProp.type !== 'ObjectProperty') continue
    const axisName = literalKey(axisProp.key)
    if (!axisName) continue
    if (axisProp.value.type !== 'ObjectExpression') continue

    const options = {}
    for (const optProp of axisProp.value.properties) {
      if (optProp.type !== 'ObjectProperty') continue
      const optName = literalKey(optProp.key)
      if (!optName) continue
      if (optProp.value.type !== 'StringLiteral') continue
      options[optName] = splitTokens(optProp.value.value)
    }

    axes[axisName] = options
  }

  return axes
}

function scanFile(relPath) {
  const abs = path.resolve(repoRoot, relPath)
  const source = fs.readFileSync(abs, 'utf8')
  const ast = parse(source, {
    sourceType: 'module',
    plugins: ['typescript', 'jsx'],
    sourceFilename: abs,
  })

  const exports = []

  traverse(ast, {
    ExportNamedDeclaration(p) {
      const decl = p.node.declaration
      if (!decl || decl.type !== 'VariableDeclaration') return
      for (const d of decl.declarations) {
        if (d.type !== 'VariableDeclarator') continue
        if (d.id.type !== 'Identifier') continue
        const exportName = d.id.name
        const init = d.init
        if (!isCvaCall(init)) continue

        const baseArg = init.arguments[0]
        const optionsArg = init.arguments[1]

        const baseTokens = baseArg?.type === 'StringLiteral' ? splitTokens(baseArg.value) : []
        const variantsValue = getObjectProp(optionsArg, 'variants')
        const defaultVariantsValue = getObjectProp(optionsArg, 'defaultVariants')

        const variants = parseVariantObject(variantsValue)
        const defaultVariants = {}
        if (defaultVariantsValue && defaultVariantsValue.type === 'ObjectExpression') {
          for (const prop of defaultVariantsValue.properties) {
            if (prop.type !== 'ObjectProperty') continue
            const k = literalKey(prop.key)
            if (!k) continue
            if (prop.value.type === 'StringLiteral') defaultVariants[k] = prop.value.value
            if (prop.value.type === 'NumericLiteral') defaultVariants[k] = String(prop.value.value)
          }
        }

        exports.push({
          exportName,
          baseTokens,
          variants,
          defaultVariants,
          source: relPath,
        })
      }
    },
  })

  return exports
}

function main() {
  const outDir = path.join(repoRoot, '.project', 'cdl')
  fs.mkdirSync(outDir, { recursive: true })

  const absRoot = path.join(repoRoot, 'src', 'variants')
  const absFiles = []
  walkDir(absRoot, absFiles)

  const tsFiles = absFiles
    .filter((p) => (p.endsWith('.ts') || p.endsWith('.tsx')) && !p.endsWith(path.join('variants', 'index.ts')))
    .map((p) => normalize(path.relative(repoRoot, p)))

  const items = []
  for (const f of tsFiles) items.push(...scanFile(f))

  // Build a CDL-ish map keyed by "namespace" (file stem) then exportName.
  const map = {}
  for (const it of items) {
    const stem = path.basename(it.source).replace(/\.(ts|tsx)$/, '')
    map[stem] ??= {}
    map[stem][it.exportName] = {
      base: it.baseTokens,
      variants: it.variants,
      defaultVariants: it.defaultVariants,
      source: it.source,
    }
  }

  const outPath = path.join(outDir, 'variants.generated.json')
  fs.writeFileSync(outPath, JSON.stringify({ generatedAt: new Date().toISOString(), map }, null, 2))
  console.log(`Generated: ${normalize(path.relative(repoRoot, outPath))}`)
}

main()


