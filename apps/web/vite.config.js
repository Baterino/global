/// <reference types="vitest/config" />
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
/** Mirrors src/lib/assetUrl.ts + src/config/seo.ts absoluteUrl for /images/ paths (OG crawlers read index.html before JS). */
var defaultOgImagePath = '/images/og-images/og-home.jpg';
function defaultOgImageAbsoluteUrl(siteUrl, assetBaseUrl) {
    var base = (assetBaseUrl !== null && assetBaseUrl !== void 0 ? assetBaseUrl : '').trim().replace(/\/+$/, '');
    var pathPart = defaultOgImagePath;
    if (base && pathPart.startsWith('/images/')) {
        return "".concat(base).concat(pathPart);
    }
    return "".concat(siteUrl.replace(/\/$/, '')).concat(pathPart);
}
export default defineConfig(function (_a) {
    var mode = _a.mode;
    var root = __dirname;
    var env = loadEnv(mode, root, '');
    var defaultOgImage = defaultOgImageAbsoluteUrl(env.VITE_SITE_URL || 'https://example.com', env.VITE_ASSET_BASE_URL);
    return {
        plugins: [
            react(),
            {
                name: 'html-default-og-image',
                transformIndexHtml: function (html) {
                    return html.replace(/%DEFAULT_OG_IMAGE%/g, defaultOgImage);
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
    };
});
