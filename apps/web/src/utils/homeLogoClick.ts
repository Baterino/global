import type { MouseEvent } from 'react'

const SCROLL_EPS = 2

/**
 * If we're already on the locale home route and the window is scrolled,
 * scroll to top (smooth) and prevent the default Link navigation (same URL = no scroll reset).
 */
export function handleHomeLogoLinkClick(
  e: MouseEvent<HTMLAnchorElement>,
  pathname: string,
  homePath: string,
): void {
  if (pathname !== homePath) return
  if (window.scrollY <= SCROLL_EPS) return
  e.preventDefault()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
