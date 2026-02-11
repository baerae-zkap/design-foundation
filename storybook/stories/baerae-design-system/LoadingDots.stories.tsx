import type { Meta, StoryObj } from '@storybook/react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { LoadingDots } from '@baerae-zkap/design-system/native';

const meta = {
  title: '@baerae-zkap/Loading/Loading dots',
  component: LoadingDots,
  argTypes: {
    size: {
      control: { type: 'number', min: 2, max: 16, step: 1 },
      description: 'Dot size (diameter)',
    },
    color: {
      control: { type: 'color' },
      description: 'Dot color',
    },
    gap: {
      control: { type: 'number', min: 2, max: 16, step: 1 },
      description: 'Gap between dots',
    },
    style: {
      table: { disable: true },
      description: 'Custom style',
    },
    testID: {
      table: { disable: true },
      description: 'Test ID',
    },
  },
  args: {
    size: 6,
    color: '#ffffff',
    gap: 6,
  },
} satisfies Meta<typeof LoadingDots>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <View style={styles.container}>
      <LoadingDots {...args} />
    </View>
  ),
};

export const Sizes: Story = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.column}>
        <View style={styles.item}>
          <LoadingDots size={4} color="#2563eb" />
          <Text style={styles.label}>Small (4px)</Text>
        </View>
        <View style={styles.item}>
          <LoadingDots size={6} color="#2563eb" />
          <Text style={styles.label}>Medium (6px)</Text>
        </View>
        <View style={styles.item}>
          <LoadingDots size={8} color="#2563eb" />
          <Text style={styles.label}>Large (8px)</Text>
        </View>
        <View style={styles.item}>
          <LoadingDots size={10} color="#2563eb" />
          <Text style={styles.label}>Extra Large (10px)</Text>
        </View>
      </View>
    </View>
  ),
};

export const Colors: Story = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.column}>
        <View style={styles.item}>
          <LoadingDots size={6} color="#2563eb" />
          <Text style={styles.label}>Brand Blue</Text>
        </View>
        <View style={styles.item}>
          <LoadingDots size={6} color="#334155" />
          <Text style={styles.label}>Base Dark</Text>
        </View>
        <View style={styles.item}>
          <LoadingDots size={6} color="#64748b" />
          <Text style={styles.label}>Subtle Gray</Text>
        </View>
      </View>
    </View>
  ),
};

export const OnDarkBackground: Story = {
  render: () => (
    <View style={[styles.container, styles.darkBackground]}>
      <View style={styles.column}>
        <View style={styles.item}>
          <LoadingDots size={6} color="#ffffff" />
          <Text style={styles.labelWhite}>White</Text>
        </View>
        <View style={styles.item}>
          <LoadingDots size={6} color="#e2e8f0" />
          <Text style={styles.labelWhite}>Light Gray</Text>
        </View>
        <View style={styles.item}>
          <LoadingDots size={6} color="#94a3b8" />
          <Text style={styles.labelWhite}>Medium Gray</Text>
        </View>
      </View>
    </View>
  ),
};

export const CustomGap: Story = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.column}>
        <View style={styles.item}>
          <LoadingDots size={6} color="#2563eb" gap={4} />
          <Text style={styles.label}>Gap: 4px</Text>
        </View>
        <View style={styles.item}>
          <LoadingDots size={6} color="#2563eb" gap={6} />
          <Text style={styles.label}>Gap: 6px (default)</Text>
        </View>
        <View style={styles.item}>
          <LoadingDots size={6} color="#2563eb" gap={8} />
          <Text style={styles.label}>Gap: 8px</Text>
        </View>
        <View style={styles.item}>
          <LoadingDots size={6} color="#2563eb" gap={12} />
          <Text style={styles.label}>Gap: 12px</Text>
        </View>
      </View>
    </View>
  ),
};

export const InButton: Story = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.column}>
        <Pressable style={[styles.button, styles.buttonBrand]}>
          <Text style={styles.buttonText}>Sending</Text>
          <LoadingDots size={4} color="#ffffff" gap={4} />
        </Pressable>
        <Pressable style={[styles.button, styles.buttonBase]}>
          <Text style={styles.buttonTextBase}>Processing</Text>
          <LoadingDots size={4} color="#334155" gap={4} />
        </Pressable>
        <Pressable style={[styles.button, styles.buttonSuccess]}>
          <Text style={styles.buttonText}>Uploading</Text>
          <LoadingDots size={4} color="#ffffff" gap={4} />
        </Pressable>
      </View>
    </View>
  ),
};

export const ChatIndicator: Story = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.column}>
        <View style={styles.chatBubble}>
          <LoadingDots size={6} color="#64748b" gap={6} />
        </View>
        <View style={[styles.chatBubble, styles.chatBubbleDark]}>
          <LoadingDots size={6} color="#ffffff" gap={6} />
        </View>
        <View style={[styles.chatBubble, styles.chatBubbleBrand]}>
          <LoadingDots size={6} color="#ffffff" gap={6} />
        </View>
      </View>
    </View>
  ),
};

export const InlineText: Story = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.column}>
        <View style={styles.inlineContainer}>
          <Text style={styles.inlineText}>Loading content</Text>
          <LoadingDots size={4} color="#64748b" gap={4} />
        </View>
        <View style={styles.inlineContainer}>
          <Text style={styles.inlineText}>Typing</Text>
          <LoadingDots size={4} color="#2563eb" gap={4} />
        </View>
        <View style={styles.inlineContainer}>
          <Text style={styles.inlineText}>Please wait</Text>
          <LoadingDots size={4} color="#334155" gap={4} />
        </View>
      </View>
    </View>
  ),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  darkBackground: {
    backgroundColor: '#1a2026',
  },
  column: {
    gap: 24,
    alignItems: 'center',
  },
  item: {
    alignItems: 'center',
    gap: 12,
  },
  label: {
    fontSize: 13,
    color: '#68707a',
    fontWeight: '500',
  },
  labelWhite: {
    fontSize: 13,
    color: '#ffffff',
    fontWeight: '500',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonBrand: {
    backgroundColor: '#2563eb',
  },
  buttonBase: {
    backgroundColor: '#f1f5f9',
  },
  buttonSuccess: {
    backgroundColor: '#22c55e',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
  },
  buttonTextBase: {
    fontSize: 15,
    fontWeight: '600',
    color: '#334155',
  },
  chatBubble: {
    padding: 12,
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  chatBubbleDark: {
    backgroundColor: '#334155',
  },
  chatBubbleBrand: {
    backgroundColor: '#2563eb',
  },
  inlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  inlineText: {
    fontSize: 14,
    color: '#334155',
    fontWeight: '500',
  },
});
