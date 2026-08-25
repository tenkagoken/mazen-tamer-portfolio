import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { assertPortfolioIntegrity } from './src/data/portfolio.ts'
import { siteConfig } from './src/config/site.ts'

export default defineConfig(() => {
  assertPortfolioIntegrity()
  return {
    plugins: [
      react(),
      {
        name: 'known-site-metadata',
        transformIndexHtml(html: string) {
          return html
            .replaceAll('__SITE_CANONICAL_URL__', siteConfig.canonicalUrl)
            .replaceAll('__SITE_SOCIAL_IMAGE__', `${siteConfig.canonicalUrl}og-placeholder.svg`)
        },
      },
    ],
    base: siteConfig.base,
  }
})
