import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PageCounter } from '@baerae-zkap/design-system/native';

const meta: Meta<typeof PageCounter> = {
  title: '@baerae-zkap/Navigations/PageCounter',
  component: PageCounter,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    current: {
      control: { type: 'number', min: 1, max: 20 },
      name: '현재 페이지',
      table: { disable: false },
    },
    total: {
      control: { type: 'number', min: 1, max: 20 },
      name: '전체 페이지',
      table: { disable: false },
    },
    variant: {
      control: 'select',
      options: ['normal', 'alternative'],
      name: '변형',
      table: { disable: false },
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
      name: '크기',
      table: { disable: false },
    },
    style: { table: { disable: true } },
    testID: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof PageCounter>;

export const Default: Story = {
  args: {
    current: 1,
    total: 5,
    variant: 'normal',
    size: 'small',
  },
  render: (args) => (
    <View style={styles.darkBg}>
      <PageCounter {...args} />
    </View>
  ),
};

export const Variants: Story = {
  render: () => (
    <View style={styles.row}>
      <View style={styles.column}>
        <View style={styles.darkBg}>
          <PageCounter current={2} total={8} variant="normal" size="small" />
        </View>
        <Text style={styles.label}>Normal (Frosted Glass)</Text>
      </View>
      <View style={styles.column}>
        <View style={styles.darkBg}>
          <PageCounter current={2} total={8} variant="alternative" size="small" />
        </View>
        <Text style={styles.label}>Alternative (Solid)</Text>
      </View>
    </View>
  ),
};

export const Sizes: Story = {
  render: () => (
    <View style={styles.row}>
      <View style={styles.column}>
        <View style={styles.darkBg}>
          <PageCounter current={3} total={10} variant="normal" size="small" />
        </View>
        <Text style={styles.label}>Small</Text>
      </View>
      <View style={styles.column}>
        <View style={styles.darkBg}>
          <PageCounter current={3} total={10} variant="normal" size="medium" />
        </View>
        <Text style={styles.label}>Medium</Text>
      </View>
    </View>
  ),
};

export const OnImageOverlay: Story = {
  render: () => (
    <View style={styles.imageBox}>
      <PageCounter
        current={1}
        total={5}
        variant="normal"
        size="small"
        style={{
          position: 'absolute',
          bottom: 16,
          right: 16,
        }}
      />
    </View>
  ),
};

export const Positions: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
      {/* Top row */}
      <View style={styles.column}>
        <View style={styles.imageBox}>
          <PageCounter
            current={1}
            total={5}
            variant="normal"
            size="small"
            style={{ position: 'absolute', top: 16, left: 16 }}
          />
        </View>
        <Text style={styles.label}>Top Left</Text>
      </View>
      <View style={styles.column}>
        <View style={styles.imageBox}>
          <PageCounter
            current={2}
            total={5}
            variant="normal"
            size="small"
            style={{ position: 'absolute', top: 16, alignSelf: 'center' }}
          />
        </View>
        <Text style={styles.label}>Top Center</Text>
      </View>
      <View style={styles.column}>
        <View style={styles.imageBox}>
          <PageCounter
            current={3}
            total={5}
            variant="normal"
            size="small"
            style={{ position: 'absolute', top: 16, right: 16 }}
          />
        </View>
        <Text style={styles.label}>Top Right</Text>
      </View>
      {/* Bottom row */}
      <View style={styles.column}>
        <View style={styles.imageBox}>
          <PageCounter
            current={4}
            total={5}
            variant="normal"
            size="small"
            style={{ position: 'absolute', bottom: 16, left: 16 }}
          />
        </View>
        <Text style={styles.label}>Bottom Left</Text>
      </View>
      <View style={styles.column}>
        <View style={styles.imageBox}>
          <PageCounter
            current={5}
            total={5}
            variant="normal"
            size="small"
            style={{ position: 'absolute', bottom: 16, alignSelf: 'center' }}
          />
        </View>
        <Text style={styles.label}>Bottom Center</Text>
      </View>
      <View style={styles.column}>
        <View style={styles.imageBox}>
          <PageCounter
            current={1}
            total={5}
            variant="normal"
            size="small"
            style={{ position: 'absolute', bottom: 16, right: 16 }}
          />
        </View>
        <Text style={styles.label}>Bottom Right</Text>
      </View>
    </View>
  ),
};

const styles = StyleSheet.create({
  darkBg: {
    padding: 24,
    backgroundColor: '#e0e0e0',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    gap: 24,
    alignItems: 'center',
  },
  column: {
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  imageBox: {
    width: 280,
    height: 180,
    backgroundColor: '#c0c0c0',
    borderRadius: 12,
    position: 'relative',
  },
});
