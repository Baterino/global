/// <reference types="vite/client" />
/// <reference types="vitest/config" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string
  readonly VITE_API_URL?: string
  /** Facebook page URL (optional; defaults to Baterino Global page) */
  readonly VITE_SOCIAL_FACEBOOK_URL?: string
  /** LinkedIn company URL (optional; defaults to Baterino Global company page) */
  readonly VITE_SOCIAL_LINKEDIN_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
