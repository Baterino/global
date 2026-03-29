/// <reference types="vitest/config" />
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

/** Mirrors src/lib/assetUrl.ts + src/config/seo.ts absoluteUrl for /images/ paths (OG crawlers read index.html before JS). */
const defaultOgImagePath = '/images/og-images/og-home.jpg'

function defaultOgImageAbsoluteUrl(siteUrl: string, assetBaseUrl: string | undefined): string {
  const base = (assetBaseUrl ?? '').trim().replace(/\/+$/, '')
  const pathPart = defaultOgImagePath
  if (base && pathPart.startsWith('/images/')) {
    return `${base}${pathPart}`
  }
  return `${siteUrl.replace(/\/$/, '')}${pathPart}`
}

export default defineConfig(({ mode }) => {
  const root = __dirname
  const fileEnv = loadEnv(mode, root, '')
  /** Prefer process.env so Vercel/CI vars apply even without a checked-in .env file */
  const siteUrl = process.env.VITE_SITE_URL || fileEnv.VITE_SITE_URL || 'https://example.com'
  const assetBaseUrl = process.env.VITE_ASSET_BASE_URL || fileEnv.VITE_ASSET_BASE_URL
  const defaultOgImage = defaultOgImageAbsoluteUrl(siteUrl, assetBaseUrl)

  return {
    plugins: [
      react(),
      {
        name: 'html-default-og-image',
        transformIndexHtml(html) {
          return html.replace(/%DEFAULT_OG_IMAGE%/g, defaultOgImage)
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@api-insights': path.resolve(__dirname, '../api/src/data/insightsFallbackBodies.ts'),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
        },
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      include: ['src/**/*.{test,spec}.{ts,tsx}'],
    },
  }
})
