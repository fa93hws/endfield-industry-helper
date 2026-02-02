import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@ui': path.resolve(__dirname, './src/ui'),
      '@data': path.resolve(__dirname, './src/data'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split React and ReactDOM into separate chunk
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'react-vendor';
          }
          // Split Material-UI into separate chunk
          if (id.includes('node_modules/@mui/')) {
            return 'mui-vendor';
          }
          // Split Emotion into separate chunk
          if (id.includes('node_modules/@emotion/')) {
            return 'emotion-vendor';
          }
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './config/vitest/setup_tests.ts',
    css: true,
    include: ['./tests/**/*.test.{ts,tsx}'],
  },
});
