import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './config/vitest/setup_tests.ts',
    css: true,
    include: ['./tests/**/*.test.{ts,tsx}'],
  },
})
