/// <reference types="vite/client" />
/// <reference types="vitest/config" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string
  readonly VITE_API_URL?: string
  /** Facebook page URL (optional; defaults to baterino.com until set) */
  readonly VITE_SOCIAL_FACEBOOK_URL?: string
  /** LinkedIn company/profile URL (optional; defaults to baterino.com until set) */
  readonly VITE_SOCIAL_LINKEDIN_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
