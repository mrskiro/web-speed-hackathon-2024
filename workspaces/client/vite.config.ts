import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import inject from '@rollup/plugin-inject';
import react from '@vitejs/plugin-react';
import { polyfillNode } from 'esbuild-plugin-polyfill-node';
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import bp from 'vite-plugin-node-stdlib-browser';

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.txt'],

  build: {
    rollupOptions: {
      input: {
        admin: './src/admin.tsx',
        main: './src/index.tsx',
      },
      output: {
        assetFileNames: `assets/[name].[ext]`,
        chunkFileNames: `assets/[name].js`,
        entryFileNames: 'assets/[name].js',
      },
      plugins: [rollupNodePolyFill(), inject({ Buffer: ['buffer', 'Buffer'] })],
    },
  },
  define: {
    global: 'window',
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
          process: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      'node:buffer': 'rollup-plugin-node-polyfills/polyfills/buffer-es6',
    },
  },
});
