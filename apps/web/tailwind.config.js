/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      maxWidth: {
        site: '1200px',
        content: '1200px',
      },
      fontFamily: {
        sans: ["'Inter'", 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ["'Inter'", 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ["'Inter'", 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ["'Inter'", 'ui-sans-serif', 'system-ui', 'sans-serif'],
        label: ["'Inter'", 'ui-sans-serif', 'system-ui', 'sans-serif'],
        nunito: ["'Nunito Sans'", 'ui-sans-serif', 'system-ui', 'sans-serif'],
        publicSans: ["'Public Sans'", 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-lg': ['3.75rem', { lineHeight: '1.1' }],
        'display-md': ['3rem', { lineHeight: '1.15' }],
        'display-sm': ['2.25rem', { lineHeight: '1.2' }],
        'section-title': ['1.75rem', { lineHeight: '2.25rem' }],
        'heading-lg': ['1.5rem', { lineHeight: '1.35' }],
        'heading-md': ['1.25rem', { lineHeight: '1.4' }],
        'heading-sm': ['1.125rem', { lineHeight: '1.4' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body-md': ['1rem', { lineHeight: '1.5' }],
        'body-sm': ['0.875rem', { lineHeight: '1.45' }],
        'label': ['0.875rem', { lineHeight: '1.4' }],
        'caption': ['0.75rem', { lineHeight: '1.35' }],
      },
    },
  },
  plugins: [],
}
