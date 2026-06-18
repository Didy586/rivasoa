import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs   from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dir = path.dirname(fileURLToPath(import.meta.url))

// Plugin qui génère un module virtuel listant les médias de public/
const mediaPlugin = () => ({
  name: 'media-manifest',
  resolveId(id) {
    if (id === 'virtual:media') return '\0virtual:media'
  },
  load(id) {
    if (id !== '\0virtual:media') return
    const list = folder => {
      const dir = path.join(__dir, 'public', folder)
      if (!fs.existsSync(dir)) return []
      return fs.readdirSync(dir)
        .filter(f => !f.startsWith('.') && fs.statSync(path.join(dir, f)).isFile())
        .map(f => ({ name: f.replace(/\.[^.]+$/, ''), file: `/${folder}/${encodeURIComponent(f)}` }))
    }
    return `
export const images = ${JSON.stringify(list('images'))};
export const videos = ${JSON.stringify(list('videos'))};
export const audio  = ${JSON.stringify(list('audio'))};
`
  }
})

export default defineConfig({
  plugins: [react(), mediaPlugin()],
})
