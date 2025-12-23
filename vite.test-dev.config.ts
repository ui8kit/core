import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Конфигурация для тестовой среды разработки
export default defineConfig({
  root: 'tests',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@ui8kit/core': path.resolve(__dirname, './src/index'),
      '@tests': path.resolve(__dirname, './tests'),
      '@tests/*': path.resolve(__dirname, './tests/*'),
    },
  },
  css: {
    postcss: './tests/config/postcss.config.js',
  },
  server: {
    port: 5174,
    host: true,
  },
});
