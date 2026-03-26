/**
 * Converts cabinet product shots to PNG with web-safe filenames.
 * Run: pnpm --filter web optimize:industrial-products
 */
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dir = path.join(__dirname, '../public/images/products/industrial')

const jobs = [
  { from: 'LT Ultra 60.png', to: 'lithtech-60kwh.png' },
  { from: 'LT 204 Air.jpeg', to: 'lt-204-air.png' },
  { from: 'LT 215 Liquid.jpeg', to: 'lt-215-liquid.png' },
]

for (const { from, to } of jobs) {
  const input = path.join(dir, from)
  const output = path.join(dir, to)
  await sharp(input).png({ compressionLevel: 9, effort: 7 }).toFile(output)
  console.log('Wrote', to)
}
