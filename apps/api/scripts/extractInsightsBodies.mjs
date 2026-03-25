import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
const articlePath = path.join(root, 'apps/web/src/pages/Article.tsx')
const s = fs.readFileSync(articlePath, 'utf8')

const ids = ['global-delivery-framework', 'baterino-roles-in-every-market', 'request-to-operation']
const bodies = {}
for (const id of ids) {
  const re = new RegExp(
    `id: '${id}'[\\s\\S]*?content: \`([\\s\\S]*?)\`\\s*,\\s*\\}`,
    'm',
  )
  const m = s.match(re)
  if (!m) {
    console.error('No match for', id)
    process.exit(1)
  }
  bodies[id] = m[1].replace(/^\n/, '')
}

const header = `/** Bodies match static fallbacks in apps/web/src/pages/Article.tsx — re-run: node apps/api/scripts/extractInsightsBodies.mjs */\n`
const body = `export const insightsFallbackBodies = ${JSON.stringify(bodies, null, 2)} as const
export type InsightsFallbackSlug = keyof typeof insightsFallbackBodies
`
const outPath = path.join(root, 'apps/api/src/data/insightsFallbackBodies.ts')
fs.mkdirSync(path.dirname(outPath), { recursive: true })
fs.writeFileSync(outPath, header + body, 'utf8')
console.log('Wrote', outPath, Object.keys(bodies))
