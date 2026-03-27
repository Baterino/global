import { useCallback, useState } from 'react'
import Cropper, { type Area } from 'react-easy-crop'
import {
  FEATURED_IMAGE_ASPECT,
  FEATURED_IMAGE_HEIGHT,
  FEATURED_IMAGE_WIDTH,
  featuredCropToFile,
  renderCroppedFeaturedJpeg,
  type PixelCrop,
} from '../lib/cropFeaturedImage'

type Props = {
  imageSrc: string
  originalName: string
  onCancel: () => void
  onComplete: (file: File) => void
}

export function AdminFeaturedImageCropModal({ imageSrc, originalName, onCancel, onComplete }: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<PixelCrop | null>(null)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  const onCropComplete = useCallback((_croppedArea: Area, croppedPixels: Area) => {
    setCroppedAreaPixels({
      x: croppedPixels.x,
      y: croppedPixels.y,
      width: croppedPixels.width,
      height: croppedPixels.height,
    })
  }, [])

  async function apply() {
    if (!croppedAreaPixels) {
      setErr('Adjust the crop, then try again.')
      return
    }
    setBusy(true)
    setErr(null)
    try {
      const blob = await renderCroppedFeaturedJpeg(imageSrc, croppedAreaPixels)
      onComplete(featuredCropToFile(blob, originalName))
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Could not crop image')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="featured-crop-title"
    >
      <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl bg-white shadow-xl">
        <div className="border-b border-neutral-200 px-4 py-3 sm:px-5">
          <h2 id="featured-crop-title" className="font-publicSans text-lg font-semibold text-neutral-900">
            Crop featured image
          </h2>
          <p className="mt-1 text-body-xs text-neutral-600">
            Output size: {FEATURED_IMAGE_WIDTH} × {FEATURED_IMAGE_HEIGHT} px (JPEG). Drag and zoom to frame the
            shot.
          </p>
        </div>
        <div className="relative min-h-[280px] flex-1 bg-neutral-900 sm:min-h-[360px]">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={FEATURED_IMAGE_ASPECT}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
        <div className="space-y-3 border-t border-neutral-200 px-4 py-3 sm:px-5">
          <label className="flex items-center gap-3 text-body-sm text-neutral-700">
            <span className="shrink-0 font-medium">Zoom</span>
            <input
              type="range"
              min={1}
              max={3}
              step={0.01}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="min-w-0 flex-1"
            />
          </label>
          {err ? <p className="text-body-sm text-red-600">{err}</p> : null}
          <div className="flex flex-wrap justify-end gap-2">
            <button
              type="button"
              onClick={onCancel}
              disabled={busy}
              className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-body-sm font-medium text-neutral-800 hover:bg-neutral-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => void apply()}
              disabled={busy}
              className="rounded-lg bg-neutral-900 px-4 py-2 text-body-sm font-semibold text-white hover:bg-neutral-800 disabled:opacity-50"
            >
              {busy ? 'Processing…' : 'Apply crop'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
