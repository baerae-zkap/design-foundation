import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProgressIndicator, Button } from '@baerae-zkap/design-system/native';

const meta: Meta<typeof ProgressIndicator> = {
  title: '@baerae-zkap/Navigations/ProgressIndicator',
  component: ProgressIndicator,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <View style={{ padding: 24 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    progress: {
      control: { type: 'number', min: 0, max: 1, step: 0.1 },
      name: '진행률',
      table: { disable: false },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      name: '크기',
      table: { disable: false },
    },
    animate: {
      control: 'boolean',
      name: '애니메이션',
      table: { disable: false },
    },
    color: { table: { disable: true } },
    trackColor: { table: { disable: true } },
    style: { table: { disable: true } },
    testID: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressIndicator>;

/**
 * Controls 패널에서 progress, size, animate를 조절해보세요.
 */
export const Default: Story = {
  args: {
    progress: 0.5,
    size: 'medium',
    animate: true,
  },
  render: (args) => <ProgressIndicator {...args} />,
};

/**
 * 사이즈 비교 (Small 2px, Medium 4px, Large 6px)
 */
export const Sizes: Story = {
  render: () => (
    <View style={styles.stack}>
      <View style={styles.item}>
        <Text style={styles.label}>Small (2px)</Text>
        <ProgressIndicator progress={0.6} size="small" />
      </View>
      <View style={styles.item}>
        <Text style={styles.label}>Medium (4px)</Text>
        <ProgressIndicator progress={0.6} size="medium" />
      </View>
      <View style={styles.item}>
        <Text style={styles.label}>Large (6px)</Text>
        <ProgressIndicator progress={0.6} size="large" />
      </View>
    </View>
  ),
};

/**
 * 진행 단계별 표시 (0% ~ 100%)
 */
export const ProgressSteps: Story = {
  render: () => (
    <View style={styles.stack}>
      {[0, 0.25, 0.5, 0.75, 1.0].map((val) => (
        <View style={styles.item} key={val}>
          <Text style={styles.label}>{Math.round(val * 100)}%</Text>
          <ProgressIndicator progress={val} size="medium" />
        </View>
      ))}
    </View>
  ),
};

/**
 * 커스텀 색상
 */
export const CustomColors: Story = {
  render: () => (
    <View style={styles.stack}>
      <View style={styles.item}>
        <Text style={styles.label}>Brand (기본)</Text>
        <ProgressIndicator progress={0.6} size="medium" />
      </View>
      <View style={styles.item}>
        <Text style={styles.label}>Success</Text>
        <ProgressIndicator progress={0.6} size="medium" color="#14b66b" />
      </View>
      <View style={styles.item}>
        <Text style={styles.label}>Error</Text>
        <ProgressIndicator progress={0.6} size="medium" color="#dc2f2f" />
      </View>
      <View style={styles.item}>
        <Text style={styles.label}>Custom</Text>
        <ProgressIndicator progress={0.6} size="medium" color="#8428e8" />
      </View>
    </View>
  ),
};

/**
 * 애니메이션 토글
 */
export const Animated: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);
    return (
      <View style={styles.stack}>
        <ProgressIndicator progress={progress} size="large" animate />
        <Button
          variant="solid"
          color="primary"
          size="small"
          onPress={() => setProgress(progress === 0 ? 1 : 0)}
        >
          {progress === 0 ? '시작' : '리셋'}
        </Button>
      </View>
    );
  },
};

const styles = StyleSheet.create({
  stack: {
    gap: 20,
  },
  item: {
    gap: 8,
  },
  label: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
});
