import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // ✅ React plugin
    react({
      babel: {
        plugins: ['babel-plugin-react-compiler'], // only Babel plugin
      },
    }),
    // ✅ Tailwind plugin
    tailwindcss(),
  ],
})
