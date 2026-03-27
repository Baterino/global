/** Featured article image: fixed aspect and output size (matches Insights cards). */
export const FEATURED_IMAGE_WIDTH = 900
export const FEATURED_IMAGE_HEIGHT = 400
export const FEATURED_IMAGE_ASPECT = FEATURED_IMAGE_WIDTH / FEATURED_IMAGE_HEIGHT

export type PixelCrop = { x: number; y: number; width: number; height: number }

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('Could not load image'))
    img.src = src
  })
}

/**
 * Crop the given image region and scale to exact featured dimensions (JPEG).
 */
export async function renderCroppedFeaturedJpeg(
  imageSrc: string,
  pixelCrop: PixelCrop,
  quality = 0.92,
): Promise<Blob> {
  const image = await loadImage(imageSrc)
  const canvas = document.createElement('canvas')
  canvas.width = FEATURED_IMAGE_WIDTH
  canvas.height = FEATURED_IMAGE_HEIGHT
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas not supported')

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    FEATURED_IMAGE_WIDTH,
    FEATURED_IMAGE_HEIGHT,
  )

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob)
        else reject(new Error('Could not encode image'))
      },
      'image/jpeg',
      quality,
    )
  })
}

export function featuredCropToFile(blob: Blob, originalName: string): File {
  const base = (originalName.replace(/\.[^.]+$/, '') || 'featured').replace(/[^a-zA-Z0-9._-]/g, '_')
  return new File([blob], `${base}-900x400.jpg`, { type: 'image/jpeg' })
}
