import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/harvard-cafe-site/',
  plugins: [react()],
})