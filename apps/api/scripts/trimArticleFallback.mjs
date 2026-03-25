import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
const p = path.join(root, 'apps/web/src/pages/Article.tsx')
let s = fs.readFileSync(p, 'utf8')
const start = s.indexOf('const FALLBACK_ARTICLES')
const end = s.indexOf('export function Article')
if (start === -1 || end === -1) throw new Error('markers not found')

const replacement = `const FALLBACK_ARTICLES: ArticleData[] = [
  {
    id: 'global-delivery-framework',
    slug: 'global-delivery-framework',
    title: '',
    author: '',
    date: '',
    location: '',
    category: 'insights.categoryCompany',
    image: '/images/blog/global-delivery-framework.jpg',
    content: insightsFallbackBodies['global-delivery-framework'],
  },
  {
    id: 'baterino-roles-in-every-market',
    slug: 'baterino-roles-in-every-market',
    title: '',
    author: '',
    date: '',
    location: '',
    category: 'insights.categoryCompany',
    image: '/images/about-baterino.jpg',
    content: insightsFallbackBodies['baterino-roles-in-every-market'],
  },
  {
    id: 'request-to-operation',
    slug: 'request-to-operation',
    title: '',
    author: '',
    date: '',
    location: '',
    category: 'insights.categoryCompany',
    image: '/images/blog/how-baterino-assess-a-project.jpg',
    content: insightsFallbackBodies['request-to-operation'],
  },
]
`

s = s.slice(0, start) + replacement + '\n\n' + s.slice(end)
fs.writeFileSync(p, s)
console.log('trimmed Article.tsx fallback block')
