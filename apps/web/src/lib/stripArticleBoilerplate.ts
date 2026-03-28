/**
 * Removes duplicate end-of-article chrome now covered by ArticleBlogTemplate footer / contact CTA.
 */
export function stripArticleBoilerplate(html: string): string {
  try {
    const doc = new DOMParser().parseFromString(html.trim(), 'text/html')
    const root = doc.body.firstElementChild
    if (!root) return html

    root.querySelectorAll('.closing-box, .article-footer').forEach((el) => el.remove())
    root.querySelectorAll('a.btn-primary').forEach((el) => {
      const href = (el.getAttribute('href') || '').toLowerCase()
      if (href.includes('contact')) el.remove()
    })

    return root.outerHTML
  } catch {
    return html
  }
}
