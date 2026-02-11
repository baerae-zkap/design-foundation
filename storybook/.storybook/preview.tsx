import React from 'react';
import type { Preview } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './global.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <SafeAreaProvider>
        <View style={{ flex: 1, backgroundColor: '#f8fafc' }}>
          <Story />
        </View>
      </SafeAreaProvider>
    ),
  ],
  tags: ['autodocs'],
};

export default preview;
