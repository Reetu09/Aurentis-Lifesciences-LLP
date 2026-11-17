import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { HOME_DESCRIPTION, HOME_TITLE, SITE_URL } from './src/site.js'

const siteOrigin = SITE_URL.replace(/\/$/, '')

function seoHtml() {
  const tokens = {
    __SITE_URL__: siteOrigin,
    __HOME_TITLE__: HOME_TITLE,
    __HOME_DESCRIPTION__: HOME_DESCRIPTION,
  }
  return {
    name: 'seo-html',
    transformIndexHtml(html) {
      return Object.entries(tokens).reduce(
        (result, [token, value]) => result.replaceAll(token, value),
        html,
      )
    },
  }
}

export default defineConfig({
  plugins: [react(), seoHtml()],
  build: {
    outDir: 'dist'
  }
})
