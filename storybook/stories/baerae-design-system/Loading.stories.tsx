import type { Meta, StoryObj } from '@storybook/react';
import { View, Text, StyleSheet } from 'react-native';
import { Loading } from '@baerae-zkap/design-system/native';

const meta = {
  title: '@baerae-zkap/Loading/Loading',
  component: Loading,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size variant',
    },
    color: {
      control: { type: 'select' },
      options: ['brand', 'base', 'onColor', 'inherit'],
      description: 'Color variant',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
  args: {
    size: 'medium',
    color: 'brand',
    disabled: false,
  },
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <View style={styles.container}>
      <Loading {...args} />
    </View>
  ),
};

export const Sizes: Story = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.item}>
          <Loading size="small" color="brand" />
          <Text style={styles.label}>Small (20px)</Text>
        </View>
        <View style={styles.item}>
          <Loading size="medium" color="brand" />
          <Text style={styles.label}>Medium (32px)</Text>
        </View>
        <View style={styles.item}>
          <Loading size="large" color="brand" />
          <Text style={styles.label}>Large (48px)</Text>
        </View>
      </View>
    </View>
  ),
};

export const Colors: Story = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.item}>
          <Loading size="medium" color="brand" />
          <Text style={styles.label}>Brand</Text>
        </View>
        <View style={styles.item}>
          <Loading size="medium" color="base" />
          <Text style={styles.label}>Base</Text>
        </View>
      </View>
    </View>
  ),
};

export const CustomSize: Story = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.item}>
          <Loading size={16} color="brand" />
          <Text style={styles.label}>16px</Text>
        </View>
        <View style={styles.item}>
          <Loading size={24} color="brand" />
          <Text style={styles.label}>24px</Text>
        </View>
        <View style={styles.item}>
          <Loading size={40} color="brand" />
          <Text style={styles.label}>40px</Text>
        </View>
        <View style={styles.item}>
          <Loading size={64} color="brand" />
          <Text style={styles.label}>64px</Text>
        </View>
      </View>
    </View>
  ),
};

export const InButton: Story = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={[styles.button, styles.buttonBrand]}>
          <Loading size="small" color="onColor" />
          <Text style={styles.buttonText}>Loading...</Text>
        </View>
        <View style={[styles.button, styles.buttonBase]}>
          <Loading size="small" color="base" />
          <Text style={styles.buttonTextBase}>Processing</Text>
        </View>
      </View>
    </View>
  ),
};

export const OnDarkBackground: Story = {
  render: () => (
    <View style={[styles.container, styles.darkBackground]}>
      <View style={styles.row}>
        <View style={styles.item}>
          <Loading size="small" color="onColor" />
          <Text style={styles.labelWhite}>Small</Text>
        </View>
        <View style={styles.item}>
          <Loading size="medium" color="onColor" />
          <Text style={styles.labelWhite}>Medium</Text>
        </View>
        <View style={styles.item}>
          <Loading size="large" color="onColor" />
          <Text style={styles.labelWhite}>Large</Text>
        </View>
      </View>
    </View>
  ),
};

export const DisabledState: Story = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.item}>
          <Loading size="medium" color="brand" disabled={false} />
          <Text style={styles.label}>Enabled</Text>
        </View>
        <View style={styles.item}>
          <Loading size="medium" color="brand" disabled={true} />
          <Text style={styles.label}>Disabled</Text>
        </View>
      </View>
    </View>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.item}>
          <Loading size="small" color="brand" label="Loading..." />
        </View>
        <View style={styles.item}>
          <Loading size="medium" color="brand" label="Please wait" />
        </View>
        <View style={styles.item}>
          <Loading size="large" color="brand" label="Processing" />
        </View>
      </View>
    </View>
  ),
};

export const FadeInDelay: Story = {
  name: 'Fade-in Delay',
  render: () => {
    const [showInstant, setShowInstant] = React.useState(false);
    const [showDelayed, setShowDelayed] = React.useState(false);

    return (
      <View style={[styles.container, { flexDirection: 'column', gap: 32 }]}>
        <View style={{ alignItems: 'center', gap: 16 }}>
          <Text style={styles.label}>Instant (no delay)</Text>
          {showInstant ? (
            <Loading size="medium" color="brand" label="Loading..." fadeInDelay={0} />
          ) : (
            <View
              style={{
                paddingHorizontal: 24,
                paddingVertical: 12,
                backgroundColor: '#0066ff',
                borderRadius: 8,
              }}
              onTouchEnd={() => setShowInstant(true)}
            >
              <Text style={{ color: '#ffffff', fontWeight: '600' }}>Show Instant</Text>
            </View>
          )}
        </View>

        <View style={{ alignItems: 'center', gap: 16 }}>
          <Text style={styles.label}>Delayed (700ms) - Prevents flash</Text>
          {showDelayed ? (
            <Loading size="medium" color="brand" label="Loading..." fadeInDelay={700} />
          ) : (
            <View
              style={{
                paddingHorizontal: 24,
                paddingVertical: 12,
                backgroundColor: '#0066ff',
                borderRadius: 8,
              }}
              onTouchEnd={() => setShowDelayed(true)}
            >
              <Text style={{ color: '#ffffff', fontWeight: '600' }}>Show Delayed</Text>
            </View>
          )}
        </View>

        {(showInstant || showDelayed) && (
          <View
            style={{
              paddingHorizontal: 24,
              paddingVertical: 12,
              backgroundColor: '#f1f5f9',
              borderRadius: 8,
              alignSelf: 'center',
            }}
            onTouchEnd={() => {
              setShowInstant(false);
              setShowDelayed(false);
            }}
          >
            <Text style={{ color: '#334155', fontWeight: '600' }}>Reset</Text>
          </View>
        )}
      </View>
    );
  },
};

export const OverlayMode: Story = {
  render: () => {
    const [showOverlay, setShowOverlay] = React.useState(false);

    return (
      <View style={[styles.container, { position: 'relative', height: 400 }]}>
        <View style={{ alignItems: 'center', gap: 16 }}>
          <Text style={styles.label}>Click button to show overlay loading</Text>
          <View
            style={{
              paddingHorizontal: 24,
              paddingVertical: 12,
              backgroundColor: '#0066ff',
              borderRadius: 8,
            }}
            onTouchEnd={() => setShowOverlay(true)}
          >
            <Text style={{ color: '#ffffff', fontWeight: '600' }}>Show Overlay</Text>
          </View>
        </View>

        {showOverlay && (
          <Loading
            size="large"
            color="onColor"
            label="Loading content..."
            overlay
          />
        )}

        {showOverlay && (
          <View
            style={{
              position: 'absolute',
              bottom: 20,
              left: 0,
              right: 0,
              alignItems: 'center',
              zIndex: 10000,
            }}
          >
            <View
              style={{
                paddingHorizontal: 24,
                paddingVertical: 12,
                backgroundColor: '#ffffff',
                borderRadius: 8,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
              onTouchEnd={() => setShowOverlay(false)}
            >
              <Text style={{ color: '#334155', fontWeight: '600' }}>Hide Overlay</Text>
            </View>
          </View>
        )}
      </View>
    );
  },
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
  row: {
    flexDirection: 'row',
    gap: 32,
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
    backgroundColor: '#0066ff',
  },
  buttonBase: {
    backgroundColor: '#eaebed',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
  },
  buttonTextBase: {
    fontSize: 15,
    fontWeight: '600',
    color: '#3e4651',
  },
});

// Need React import for stateful stories
import React from 'react';
