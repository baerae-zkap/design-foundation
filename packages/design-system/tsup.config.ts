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
    external: [
      'react',
      'react-native',
      'react-native-safe-area-context',
      'react-native-linear-gradient',
      'react-native-reanimated',
      '@react-native-community/datetimepicker',
      'react-native-svg',
      'lucide-react-native',
    ],
    outDir: 'dist/native',
  },
]);
