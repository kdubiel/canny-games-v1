import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./setupTests.ts'],
    globals: true,
    reporters: 'verbose',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'cobertura'],
      all: true,
      include: ['**/*.tsx'],
    },
  },
  optimizeDeps: {
    include: ['@canny-games/common'],
  },
  build: {
    commonjsOptions: {
      include: [/common/, /node_modules/],
    },
  },
  server: {
    proxy: {
      '/api': {
        target: process.env.FRONTEND_BASE_API_URL,
        changeOrigin: true,
        secure: false,
      },
      '/socket.io/': {
        target: process.env.FRONTEND_BASE_API_URL,
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
    watch: {
      usePolling: true,
    },
  },
  preview: {
    proxy: {
      '/api': {
        target: process.env.FRONTEND_BASE_API_URL,
        changeOrigin: true,
        secure: false,
      },
      '/socket.io/': {
        target: process.env.FRONTEND_BASE_API_URL,
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
});
