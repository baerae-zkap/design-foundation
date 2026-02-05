import { defineConfig } from 'tsup';

export default defineConfig([
  // Web build
  {
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    sourcemap: true,
    clean: true,
    external: ['react', 'react-dom', 'react-native'],
    outDir: 'dist',
  },
  // React Native build
  {
    entry: ['src/native/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    sourcemap: true,
    external: ['react', 'react-native'],
    outDir: 'dist/native',
  },
]);
