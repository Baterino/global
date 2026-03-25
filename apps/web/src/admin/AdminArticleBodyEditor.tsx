import { useMemo } from 'react'
import JoditEditor from 'jodit-react'

type Props = {
  value: string
  onChange: (html: string) => void
  disabled?: boolean
  /** Remount editor when switching articles or initial load completes. */
  instanceKey: string
}

/**
 * WYSIWYG + source mode for long-form HTML (custom classes like `article-rich` are kept where Jodit allows).
 * Use the **&lt;/&gt; Source** toolbar button for raw HTML when the visual mode alters layout.
 */
export function AdminArticleBodyEditor({ value, onChange, disabled, instanceKey }: Props) {
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
      uploader: { insertImageAsBase64URI: false },
    }),
    [disabled],
  )

  return (
    <div className="admin-article-jodit [&_.jodit-container]:rounded-lg [&_.jodit-container]:border [&_.jodit-container]:border-neutral-200">
      <JoditEditor key={instanceKey} value={value} config={config} onChange={onChange} />
    </div>
  )
}
