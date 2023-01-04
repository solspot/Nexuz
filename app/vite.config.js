/* eslint-disable no-undef */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import alias from '@rollup/plugin-alias';
import GlobalPolyFills from '@esbuild-plugins/node-globals-polyfill';
import crypto from 'crypto-browserify';

export default defineConfig({
  plugins: [
    react(),
    alias({
      entries: [
        { find: '@', replacement: path.resolve(__dirname, 'src') },
        { find: 'pages', replacement: path.resolve(__dirname, 'src/pages') },
        { find: 'theme', replacement: path.resolve(__dirname, 'src/theme') },
        { find: 'components', replacement: path.resolve(__dirname, 'src/components') },
        { find: 'assets', replacement: path.resolve(__dirname, 'src/assets') },
        { find: 'services', replacement: path.resolve(__dirname, 'src/services') },
        { find: 'context', replacement: path.resolve(__dirname, 'src/context') }
      ]
    })
  ],
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis'
      },
      plugins: [
        GlobalPolyFills({
          process: true,
          Buffer: true
        })
      ]
    }
  },
  resolve: {
    alias: {
      process: 'process/browser',
      stream: 'stream-browserify',
      zlib: 'browserify-zlib',
      crypto: 'crypto-browserify'
    }
  },
  define: {
    'process.env': {}
  },
  server: {
    port: '3000'
  }
});
