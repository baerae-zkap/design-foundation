import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProgressTracker } from '@baerae-zkap/design-system/native';

const defaultSteps = [
  { label: '본인인증' },
  { label: '계좌연동' },
  { label: '자산확인' },
];

const stepsWithBadges = [
  { label: '본인인증', badge: 'KYC' },
  { label: '계좌연동', badge: '필수' },
  { label: '자산확인', badge: '선택' },
];

const stepsWithContent = [
  {
    label: '신원확인',
    badge: 'KYC',
    content: (
      <View style={{ height: 32, backgroundColor: '#e8e4f0', borderRadius: 6, opacity: 0.6 }} />
    ),
  },
  {
    label: '계좌연동',
    badge: '필수',
    content: (
      <View style={{ height: 32, backgroundColor: '#e8e4f0', borderRadius: 6, opacity: 0.6 }} />
    ),
  },
  {
    label: '자산확인',
    badge: '선택',
    content: (
      <View style={{ height: 32, backgroundColor: '#e8e4f0', borderRadius: 6, opacity: 0.6 }} />
    ),
  },
];

const meta: Meta<typeof ProgressTracker> = {
  title: '@baerae-zkap/Navigations/ProgressTracker',
  component: ProgressTracker,
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
    currentStep: {
      control: { type: 'number', min: 0, max: 2 },
      name: '현재 단계',
      table: { disable: false },
    },
    variant: {
      control: 'select',
      options: ['horizontal', 'vertical', 'stepper'],
      name: '변형',
      table: { disable: false },
    },
    showLabel: {
      control: 'boolean',
      name: '라벨 표시',
      table: { disable: false },
    },
    labelContents: {
      control: 'select',
      options: ['badge', 'label'],
      name: '라벨 콘텐츠',
      table: { disable: false },
    },
    steps: { table: { disable: true } },
    style: { table: { disable: true } },
    testID: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressTracker>;

/**
 * Controls 패널에서 변형, 현재 단계, 라벨 표시를 조절해보세요.
 */
export const Default: Story = {
  args: {
    steps: stepsWithBadges,
    currentStep: 0,
    variant: 'horizontal',
    showLabel: true,
    labelContents: 'badge',
  },
  render: (args) => <ProgressTracker {...args} />,
};

/**
 * 3가지 변형 비교: Normal horizontal, Normal vertical, Stepper
 */
export const Variants: Story = {
  render: () => (
    <View style={styles.stack}>
      <View style={styles.item}>
        <Text style={styles.sectionTitle}>Normal horizontal</Text>
        <ProgressTracker
          steps={defaultSteps}
          currentStep={0}
          variant="horizontal"
        />
      </View>
      <View style={styles.item}>
        <Text style={styles.sectionTitle}>Normal vertical</Text>
        <ProgressTracker
          steps={stepsWithBadges}
          currentStep={0}
          variant="vertical"
        />
      </View>
      <View style={styles.item}>
        <Text style={styles.sectionTitle}>Stepper</Text>
        <ProgressTracker
          steps={defaultSteps}
          currentStep={0}
          variant="stepper"
        />
      </View>
    </View>
  ),
};

/**
 * 진행 상태별 표시 (Horizontal)
 */
export const ProgressStates: Story = {
  render: () => (
    <View style={styles.stack}>
      {[0, 1, 2].map((step) => (
        <View style={styles.item} key={step}>
          <Text style={styles.label}>
            Step {step + 1} / 3
          </Text>
          <ProgressTracker
            steps={defaultSteps}
            currentStep={step}
            variant="horizontal"
          />
        </View>
      ))}
    </View>
  ),
};

/**
 * Stepper 변형 + 라벨 on/off
 */
export const Stepper: Story = {
  render: () => (
    <View style={styles.stack}>
      <View style={styles.item}>
        <Text style={styles.label}>라벨 있음</Text>
        <ProgressTracker
          steps={defaultSteps}
          currentStep={0}
          variant="stepper"
          showLabel
        />
      </View>
      <View style={styles.item}>
        <Text style={styles.label}>라벨 없음</Text>
        <ProgressTracker
          steps={defaultSteps}
          currentStep={0}
          variant="stepper"
          showLabel={false}
        />
      </View>
    </View>
  ),
};

/**
 * Vertical + 뱃지 텍스트
 */
export const VerticalWithBadges: Story = {
  render: () => (
    <View style={styles.stack}>
      <View style={styles.item}>
        <Text style={styles.label}>라벨 + 뱃지</Text>
        <ProgressTracker
          steps={stepsWithBadges}
          currentStep={1}
          variant="vertical"
        />
      </View>
      <View style={styles.item}>
        <Text style={styles.label}>뱃지만 (라벨 숨김)</Text>
        <ProgressTracker
          steps={stepsWithBadges}
          currentStep={1}
          variant="vertical"
          showLabel={false}
        />
      </View>
    </View>
  ),
};

/**
 * Vertical + 콘텐츠 영역 (라벨 아래 커스텀 콘텐츠)
 */
export const VerticalWithContent: Story = {
  render: () => (
    <ProgressTracker
      steps={stepsWithContent}
      currentStep={1}
      variant="vertical"
    />
  ),
};

/**
 * 라벨 콘텐츠 비교: Badge (칩) vs Label (텍스트)
 */
export const LabelContents: Story = {
  render: () => (
    <View style={styles.stack}>
      <View style={styles.item}>
        <Text style={styles.sectionTitle}>Badge (칩 스타일)</Text>
        <ProgressTracker
          steps={stepsWithBadges}
          currentStep={1}
          variant="vertical"
          labelContents="badge"
        />
      </View>
      <View style={styles.item}>
        <Text style={styles.sectionTitle}>Label (텍스트 스타일)</Text>
        <ProgressTracker
          steps={stepsWithBadges}
          currentStep={1}
          variant="vertical"
          labelContents="label"
        />
      </View>
    </View>
  ),
};

/**
 * 라벨 표시 / 숨김 비교 (Horizontal)
 */
export const LabelToggle: Story = {
  render: () => (
    <View style={styles.stack}>
      <View style={styles.item}>
        <Text style={styles.label}>라벨 있음</Text>
        <ProgressTracker
          steps={defaultSteps}
          currentStep={1}
          variant="horizontal"
          showLabel
        />
      </View>
      <View style={styles.item}>
        <Text style={styles.label}>라벨 없음</Text>
        <ProgressTracker
          steps={defaultSteps}
          currentStep={1}
          variant="horizontal"
          showLabel={false}
        />
      </View>
    </View>
  ),
};

const styles = StyleSheet.create({
  stack: {
    gap: 32,
  },
  item: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  label: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
});
