/** Max box for in-body images: scale down proportionally to fit (object-contain), never upscale. */
export const ARTICLE_BODY_IMAGE_MAX_W = 1200
export const ARTICLE_BODY_IMAGE_MAX_H = 400

/**
 * Returns a JPEG whose width ≤ maxW and height ≤ maxH, preserving aspect ratio.
 * Non-image inputs are returned unchanged.
 */
export async function fitArticleBodyImage(file: File): Promise<File> {
  if (!file.type.startsWith('image/')) return file

  let bitmap: ImageBitmap
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' })
  } catch {
    bitmap = await createImageBitmap(file)
  }

  const w = bitmap.width
  const h = bitmap.height
  if (w < 1 || h < 1) {
    bitmap.close()
    return file
  }

  const scale = Math.min(ARTICLE_BODY_IMAGE_MAX_W / w, ARTICLE_BODY_IMAGE_MAX_H / h, 1)
  if (scale >= 1) {
    bitmap.close()
    return file
  }

  const tw = Math.max(1, Math.round(w * scale))
  const th = Math.max(1, Math.round(h * scale))
  const canvas = document.createElement('canvas')
  canvas.width = tw
  canvas.height = th
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    bitmap.close()
    return file
  }
  ctx.drawImage(bitmap, 0, 0, tw, th)
  bitmap.close()

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob((b) => resolve(b), 'image/jpeg', 0.9)
  })
  if (!blob) return file

  const base = file.name.replace(/\.[^.]+$/, '') || 'image'
  return new File([blob], `${base}-body.jpg`, { type: 'image/jpeg' })
}
