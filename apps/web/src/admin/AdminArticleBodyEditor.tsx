import { useMemo } from 'react'
import JoditEditor from 'jodit-react'
import { adminUploadMedia, getAdminToken } from '../lib/adminApi'
import {
  ARTICLE_BODY_IMAGE_MAX_H,
  ARTICLE_BODY_IMAGE_MAX_W,
  fitArticleBodyImage,
} from '../lib/resizeArticleBodyImage'

type Props = {
  value: string
  onChange: (html: string) => void
  disabled?: boolean
  /** Remount editor when switching articles or initial load completes. */
  instanceKey: string
  /** Required for body image uploads (resize + admin media). Omit on “new article” until saved. */
  articleId: string | null
}

function filesFromFormData(fd: FormData): File[] {
  const out: File[] = []
  for (const [, v] of fd.entries()) {
    if (v instanceof File) out.push(v)
  }
  return out
}

/**
 * WYSIWYG + source mode for long-form HTML (custom classes like `article-rich` are kept where Jodit allows).
 * Use the **&lt;/&gt; Source** toolbar button for raw HTML when the visual mode alters layout.
 */
export function AdminArticleBodyEditor({ value, onChange, disabled, instanceKey, articleId }: Props) {
  const config = useMemo(
    () => ({
      readonly: Boolean(disabled),
      height: 520,
      hidePoweredByJodit: true,
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
      iframe: false,
      toolbarAdaptive: true,
      askBeforePasteHTML: false,
      askBeforePasteFromWord: false,
      defaultActionOnPaste: 'insert_as_html' as const,
      cleanHTML: {
        removeEmptyElements: false,
        fillEmptyParagraph: false,
        replaceOldTags: false as const,
      },
      uploader: {
        insertImageAsBase64URI: false,
        imagesExtensions: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif'],
        customUploadFunction: async (requestData: FormData, showProgress: (n: number) => void) => {
          const time = new Date().toISOString()
          const fail = (messages: string[]) => ({
            success: false as const,
            time,
            data: { files: [] as string[], baseurl: '', messages },
          })
          if (!articleId) {
            return fail([
              'Save the article first, then you can upload images in the body (up to ' +
                `${ARTICLE_BODY_IMAGE_MAX_W}×${ARTICLE_BODY_IMAGE_MAX_H} px, aspect preserved).`,
            ])
          }
          if (!getAdminToken()) return fail(['Not signed in.'])

          const files = filesFromFormData(requestData).filter((f) => f.type.startsWith('image/'))
          if (!files.length) return fail(['No image file in upload.'])

          showProgress(15)
          let toUpload: File
          try {
            toUpload = await fitArticleBodyImage(files[0])
          } catch {
            toUpload = files[0]
          }
          showProgress(45)

          try {
            const { url } = await adminUploadMedia({ kind: 'article', entityId: articleId, file: toUpload })
            showProgress(100)
            return {
              success: true as const,
              time,
              data: {
                files: [url],
                baseurl: '',
                isImages: [true] as boolean[],
              },
            }
          } catch (e) {
            const msg = e instanceof Error ? e.message : 'Upload failed'
            return fail([msg])
          }
        },
      },
    }),
    [disabled, articleId],
  )

  return (
    <div className="admin-article-jodit [&_.jodit-container]:rounded-lg [&_.jodit-container]:border [&_.jodit-container]:border-neutral-200">
      <JoditEditor key={instanceKey} value={value} config={config} onChange={onChange} />
    </div>
  )
}
