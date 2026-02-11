import type { StorybookConfig } from '@storybook/react-native-web-vite';
import path from 'path';

const config: StorybookConfig = {
  stories: [
    './*.mdx',
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [],
  framework: {
    name: '@storybook/react-native-web-vite',
    options: {},
  },
  async viteFinal(config) {
    config.optimizeDeps = {
      ...config.optimizeDeps,
      esbuildOptions: {
        ...config.optimizeDeps?.esbuildOptions,
        loader: {
          '.js': 'jsx',
          '.mjs': 'jsx',
        },
      },
    };

    const nodeModules = path.resolve(__dirname, '../node_modules');

    // Alias for @baerae-zkap/design-system dependencies
    // Forces resolution from storybook's node_modules, not design-system's nested ones
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        'react-native-linear-gradient': path.resolve(__dirname, './linear-gradient-shim.ts'),
        'react-native-web': path.resolve(nodeModules, 'react-native-web/dist/index.js'),
        'react-native': path.resolve(nodeModules, 'react-native-web/dist/index.js'),
        'lucide-react-native': path.resolve(nodeModules, 'lucide-react'),
        'react-native-safe-area-context': path.resolve(nodeModules, 'react-native-safe-area-context'),
        'react-native-reanimated': path.resolve(nodeModules, 'react-native-reanimated'),
        'react-native-svg': path.resolve(nodeModules, 'react-native-svg'),
      },
      // Ensure linked packages resolve deps from storybook's node_modules
      dedupe: ['react', 'react-dom', 'react-native-web'],
    };

    return config;
  },
};

export default config;
