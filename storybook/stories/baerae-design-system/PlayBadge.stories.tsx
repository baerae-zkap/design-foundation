import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { PlayBadge } from '@baerae-zkap/design-system/native';

const meta = {
  title: '@baerae-zkap/Contents/Play badge',
  component: PlayBadge,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['normal', 'alternative'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
  args: {
    variant: 'normal',
    size: 'medium',
    disabled: false,
  },
} satisfies Meta<typeof PlayBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'normal',
    size: 'medium',
    onPress: () => console.log('Play pressed'),
  },
};

export const Variants: Story = {
  render: () => {
    const [pressed, setPressed] = useState<string | null>(null);

    return (
      <View style={{ gap: 24 }}>
        <View>
          <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 12, color: '#3e4651' }}>
            Normal (Dark background with white icon)
          </Text>
          <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
            <PlayBadge
              variant="normal"
              size="medium"
              onPress={() => setPressed('normal')}
            />
            {pressed === 'normal' && (
              <Text style={{ fontSize: 13, color: '#6b7280' }}>Pressed!</Text>
            )}
          </View>
        </View>

        <View>
          <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 12, color: '#3e4651' }}>
            Alternative (White background with dark icon)
          </Text>
          <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
            <PlayBadge
              variant="alternative"
              size="medium"
              onPress={() => setPressed('alternative')}
            />
            {pressed === 'alternative' && (
              <Text style={{ fontSize: 13, color: '#6b7280' }}>Pressed!</Text>
            )}
          </View>
        </View>
      </View>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      <View>
        <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 12, color: '#3e4651' }}>
          Normal Variant
        </Text>
        <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
          <View style={{ alignItems: 'center', gap: 8 }}>
            <PlayBadge variant="normal" size="small" onPress={() => {}} />
            <Text style={{ fontSize: 12, color: '#6b7280' }}>Small (32px)</Text>
          </View>
          <View style={{ alignItems: 'center', gap: 8 }}>
            <PlayBadge variant="normal" size="medium" onPress={() => {}} />
            <Text style={{ fontSize: 12, color: '#6b7280' }}>Medium (48px)</Text>
          </View>
          <View style={{ alignItems: 'center', gap: 8 }}>
            <PlayBadge variant="normal" size="large" onPress={() => {}} />
            <Text style={{ fontSize: 12, color: '#6b7280' }}>Large (64px)</Text>
          </View>
        </View>
      </View>

      <View>
        <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 12, color: '#3e4651' }}>
          Alternative Variant
        </Text>
        <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
          <View style={{ alignItems: 'center', gap: 8 }}>
            <PlayBadge variant="alternative" size="small" onPress={() => {}} />
            <Text style={{ fontSize: 12, color: '#6b7280' }}>Small (32px)</Text>
          </View>
          <View style={{ alignItems: 'center', gap: 8 }}>
            <PlayBadge variant="alternative" size="medium" onPress={() => {}} />
            <Text style={{ fontSize: 12, color: '#6b7280' }}>Medium (48px)</Text>
          </View>
          <View style={{ alignItems: 'center', gap: 8 }}>
            <PlayBadge variant="alternative" size="large" onPress={() => {}} />
            <Text style={{ fontSize: 12, color: '#6b7280' }}>Large (64px)</Text>
          </View>
        </View>
      </View>
    </View>
  ),
};

export const States: Story = {
  render: () => {
    const [activeState, setActiveState] = useState<string | null>(null);

    return (
      <View style={{ gap: 24 }}>
        <View>
          <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 12, color: '#3e4651' }}>
            Default (Click to test pressed state - badge fades out)
          </Text>
          <PlayBadge
            variant="normal"
            size="medium"
            onPress={() => setActiveState('pressed')}
          />
          {activeState === 'pressed' && (
            <Text style={{ fontSize: 13, color: '#6b7280', marginTop: 8 }}>
              Badge faded out on press
            </Text>
          )}
        </View>

        <View>
          <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 12, color: '#3e4651' }}>
            Disabled (No interaction)
          </Text>
          <PlayBadge variant="normal" size="medium" disabled />
        </View>
      </View>
    );
  },
};

export const OnThumbnail: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      <View>
        <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 12, color: '#3e4651' }}>
          Normal variant on thumbnail
        </Text>
        <View
          style={{
            width: 200,
            height: 120,
            backgroundColor: '#a7adb5',
            borderRadius: 12,
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <PlayBadge variant="normal" size="medium" onPress={() => console.log('Play')} />
        </View>
      </View>

      <View>
        <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 12, color: '#3e4651' }}>
          Alternative variant on thumbnail
        </Text>
        <View
          style={{
            width: 200,
            height: 120,
            backgroundColor: '#eaebed',
            borderRadius: 12,
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <PlayBadge variant="alternative" size="medium" onPress={() => console.log('Play')} />
        </View>
      </View>

      <View>
        <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 12, color: '#3e4651' }}>
          Multiple sizes on thumbnails
        </Text>
        <View style={{ flexDirection: 'row', gap: 16 }}>
          <View
            style={{
              width: 120,
              height: 90,
              backgroundColor: '#a7adb5',
              borderRadius: 12,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <PlayBadge variant="normal" size="small" onPress={() => {}} />
          </View>
          <View
            style={{
              width: 160,
              height: 120,
              backgroundColor: '#a7adb5',
              borderRadius: 12,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <PlayBadge variant="normal" size="medium" onPress={() => {}} />
          </View>
          <View
            style={{
              width: 200,
              height: 150,
              backgroundColor: '#a7adb5',
              borderRadius: 12,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <PlayBadge variant="normal" size="large" onPress={() => {}} />
          </View>
        </View>
      </View>
    </View>
  ),
};
