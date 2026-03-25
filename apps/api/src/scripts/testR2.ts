/**
 * Verifies Cloudflare R2 credentials and upload path.
 * Run: pnpm --filter api test:r2
 */
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'
import { isR2Configured, publicUrlForKey, uploadPublicImage } from '../storage/r2.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '../../.env') })

// 1×1 transparent PNG
const TINY_PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
  'base64',
)

async function main() {
  if (!isR2Configured()) {
    console.error(
      'R2 is not fully configured. Set in apps/api/.env (or env):',
      'R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, R2_PUBLIC_URL',
    )
    process.exit(1)
  }

  const stamp = Date.now()
  const key = `__r2-health-check/${stamp}.png`

  try {
    await uploadPublicImage(key, TINY_PNG, 'image/png')
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    console.error('PutObject failed:', msg)
    if (msg.includes('bucket name is not valid') || msg.includes('Bucket name')) {
      console.error('')
      console.error('Hints:')
      console.error('  • R2_BUCKET_NAME = exact bucket name from R2 → Buckets (e.g. my-bucket).')
      console.error('  • Use lowercase; do not paste a URL, Account ID, or endpoint hostname.')
      console.error('  • If it still fails, double-check spelling in the Cloudflare dashboard.')
    }
    if (msg.includes('does not exist') || msg.includes('NoSuchBucket')) {
      console.error('')
      console.error('Hints:')
      console.error('  • Create the bucket in Cloudflare → R2 → Buckets (name must match R2_BUCKET_NAME exactly).')
      console.error('  • R2_ACCOUNT_ID + API token must be for the same Cloudflare account as that bucket.')
      console.error('  • Token needs Object Read & Write on this bucket (or the account).')
    }
    process.exit(1)
  }

  const url = publicUrlForKey(key)
  console.log('Upload OK.')
  console.log('Public URL:', url)
  console.log('')
  console.log('Open that URL in a browser. If it loads the tiny image, R2 + public access are working.')
  console.log('(You can delete __r2-health-check/ objects in the R2 bucket later.)')
}

main()
