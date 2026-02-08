/// <reference types="vite/client" />
/// <reference types="vitest/config" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string
  readonly VITE_API_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
