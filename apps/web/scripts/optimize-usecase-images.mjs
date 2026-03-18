#!/usr/bin/env node
/**
 * Optimize images in public/images/usecases/
 * - Resizes images wider than 1920px (maintains aspect ratio)
 * - Compresses JPGs with quality 82 (good balance of size/quality)
 * - Overwrites originals in place
 */
import sharp from 'sharp'
import { readdir, stat, rename, mkdir, rm } from 'fs/promises'
import { join, extname } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __dirname = dirname(fileURLToPath(import.meta.url))
const USECASES_DIR = join(__dirname, '../public/images/usecases')
const TEMP_DIR = join(USECASES_DIR, '.optimize-temp')
const MAX_WIDTH = 1920
const JPG_QUALITY = 82

async function getAllImages(dir, files = []) {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    if (entry.name === '.optimize-temp') continue
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      await getAllImages(fullPath, files)
    } else if (/\.(jpg|jpeg|png)$/i.test(entry.name)) {
      files.push(fullPath)
    }
  }
  return files
}

async function optimizeImage(filePath) {
  const ext = extname(filePath).toLowerCase()
  const isJpg = /\.(jpg|jpeg)$/.test(ext)
  const tempPath = join(TEMP_DIR, `optimize-${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`)

  const { width } = await sharp(filePath).metadata()
  let pipeline = sharp(filePath)

  if (width > MAX_WIDTH) {
    pipeline = pipeline.resize(MAX_WIDTH, null, { withoutEnlargement: true })
  }

  if (isJpg) {
    pipeline = pipeline.jpeg({
      quality: JPG_QUALITY,
      mozjpeg: true,
    })
  } else if (ext === '.png') {
    pipeline = pipeline.png({
      quality: 85,
      compressionLevel: 9,
    })
  }

  const before = (await stat(filePath)).size
  await pipeline.toFile(tempPath)
  const after = (await stat(tempPath)).size
  await rename(tempPath, filePath)

  const saved = before > 0 ? ((before - after) / before * 100).toFixed(1) : '0'
  return { before, after, saved }
}

async function main() {
  await mkdir(TEMP_DIR, { recursive: true })
  console.log('Finding images in usecases folder...')
  const images = await getAllImages(USECASES_DIR)
  console.log(`Found ${images.length} images\n`)

  let totalBefore = 0
  let totalAfter = 0

  for (const img of images) {
    const rel = img.replace(USECASES_DIR + '\\', '').replace(USECASES_DIR + '/', '')
    try {
      const { before, after, saved } = await optimizeImage(img)
      totalBefore += before
      totalAfter += after
      console.log(`${rel}: ${(before/1024).toFixed(1)} KB → ${(after/1024).toFixed(1)} KB (${saved}% saved)`)
    } catch (err) {
      console.error(`Error: ${rel}`, err.message)
    }
  }

  const totalSaved = totalBefore > 0 ? ((totalBefore - totalAfter) / totalBefore * 100).toFixed(1) : '0'
  console.log(`\nDone. Total: ${(totalBefore/1024/1024).toFixed(2)} MB → ${(totalAfter/1024/1024).toFixed(2)} MB (${totalSaved}% saved)`)
  await rm(TEMP_DIR, { recursive: true, force: true })
}

main().catch(console.error)
