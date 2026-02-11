import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Radio, FramedStyle } from '@baerae-zkap/design-system/native';

const meta: Meta<typeof Radio> = {
  title: '@baerae-zkap/Selection and input/Radio',
  component: Radio,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <View style={{ padding: 20, backgroundColor: '#fff' }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    // Hide all real props from controls
    selected: { table: { disable: true } },
    onPress: { table: { disable: true } },
    label: { table: { disable: true } },
    size: { table: { disable: true } },
    tight: { table: { disable: true } },
    disabled: { table: { disable: true } },
    style: { table: { disable: true } },
    testID: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const styles = StyleSheet.create({
  stack: { gap: 24 },
  item: { gap: 8 },
  row: { flexDirection: 'row', gap: 24, alignItems: 'center' },
  label: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    paddingHorizontal: 4,
  },
  grid: { gap: 16 },
  gridRow: { flexDirection: 'row', gap: 16 },
  gridCell: { flex: 1, alignItems: 'center', gap: 4 },
  cellLabel: { fontSize: 11, color: '#999' },
  groupStack: { gap: 12 },
  framedLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  framedDescription: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 4,
  },
});

// Default - Interactive Controls panel (Montage-style)
export const Default: Story = {
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium'],
      name: '크기',
      table: { disable: false },
    },
    tight: {
      control: 'boolean',
      name: '촘촘하게',
      table: { disable: false },
    },
    disabled: {
      control: 'boolean',
      name: '비활성화',
      table: { disable: false },
    },
  },
  args: {
    size: 'medium',
    tight: false,
    disabled: false,
  },
  render: (args) => {
    const [selectedOption, setSelectedOption] = useState('option1');

    return (
      <View style={styles.groupStack}>
        <Radio
          size={args.size as 'small' | 'medium'}
          tight={args.tight as boolean}
          disabled={args.disabled as boolean}
          selected={selectedOption === 'option1'}
          onPress={() => setSelectedOption('option1')}
          label="옵션 1"
        />
        <Radio
          size={args.size as 'small' | 'medium'}
          tight={args.tight as boolean}
          disabled={args.disabled as boolean}
          selected={selectedOption === 'option2'}
          onPress={() => setSelectedOption('option2')}
          label="옵션 2"
        />
        <Radio
          size={args.size as 'small' | 'medium'}
          tight={args.tight as boolean}
          disabled={args.disabled as boolean}
          selected={selectedOption === 'option3'}
          onPress={() => setSelectedOption('option3')}
          label="옵션 3"
        />
      </View>
    );
  },
};

// Sizes - Compare Small vs Medium
export const Sizes: Story = {
  render: () => {
    const [smallSelected, setSmallSelected] = useState(true);
    const [mediumSelected, setMediumSelected] = useState(true);

    return (
      <View style={styles.stack}>
        <View style={styles.item}>
          <Radio
            size="small"
            selected={smallSelected}
            onPress={() => setSmallSelected(!smallSelected)}
            label="소형 라디오"
          />
          <Text style={styles.label}>Small</Text>
        </View>
        <View style={styles.item}>
          <Radio
            size="medium"
            selected={mediumSelected}
            onPress={() => setMediumSelected(!mediumSelected)}
            label="중형 라디오"
          />
          <Text style={styles.label}>Medium</Text>
        </View>
      </View>
    );
  },
};

// Tight - Compare normal vs tight spacing
export const Tight: Story = {
  render: () => {
    const [normalSelected, setNormalSelected] = useState(true);
    const [tightSelected, setTightSelected] = useState(true);

    return (
      <View style={styles.row}>
        <View style={styles.item}>
          <Radio
            selected={normalSelected}
            onPress={() => setNormalSelected(!normalSelected)}
            label="일반 간격"
          />
          <Text style={styles.label}>Normal</Text>
        </View>
        <View style={styles.item}>
          <Radio
            tight
            selected={tightSelected}
            onPress={() => setTightSelected(!tightSelected)}
            label="촘촘한 간격"
          />
          <Text style={styles.label}>Tight</Text>
        </View>
      </View>
    );
  },
};

// States - Grid of all states
export const States: Story = {
  render: () => {
    return (
      <View style={styles.grid}>
        {/* Unselected Row */}
        <View style={styles.gridRow}>
          <View style={styles.gridCell}>
            <Radio selected={false} onPress={() => {}} label="" />
            <Text style={styles.cellLabel}>Unselected</Text>
          </View>
          <View style={styles.gridCell}>
            <Radio selected={false} onPress={() => {}} label="" />
            <Text style={styles.cellLabel}>Pressed</Text>
          </View>
          <View style={styles.gridCell}>
            <Radio selected={false} disabled onPress={() => {}} label="" />
            <Text style={styles.cellLabel}>Disabled</Text>
          </View>
        </View>

        {/* Selected Row */}
        <View style={styles.gridRow}>
          <View style={styles.gridCell}>
            <Radio selected={true} onPress={() => {}} label="" />
            <Text style={styles.cellLabel}>Selected</Text>
          </View>
          <View style={styles.gridCell}>
            <Radio selected={true} onPress={() => {}} label="" />
            <Text style={styles.cellLabel}>Pressed</Text>
          </View>
          <View style={styles.gridCell}>
            <Radio selected={true} disabled onPress={() => {}} label="" />
            <Text style={styles.cellLabel}>Disabled</Text>
          </View>
        </View>
      </View>
    );
  },
};

// RadioGroup - Interactive real-world example
export const RadioGroup: Story = {
  render: () => {
    const [selectedDelivery, setSelectedDelivery] = useState('standard');

    const deliveryOptions = [
      { value: 'standard', label: '일반 전송', description: '10-30분 소요' },
      { value: 'pickup', label: '매장 픽업', description: '오늘 오후 3시 이후' },
      { value: 'express', label: '빠른 전송', description: '1-5분 소요 (가스비 추가)' },
    ];

    return (
      <View style={styles.stack}>
        <Text style={{ fontSize: 16, fontWeight: '600', color: '#1e293b', marginBottom: 8 }}>
          전송 방식 선택
        </Text>
        <View style={styles.groupStack}>
          {deliveryOptions.map((option) => (
            <View key={option.value}>
              <Radio
                size="medium"
                selected={selectedDelivery === option.value}
                onPress={() => setSelectedDelivery(option.value)}
                label={option.label}
              />
              <Text style={{ fontSize: 13, color: '#64748b', marginTop: 4, marginLeft: 32 }}>
                {option.description}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  },
};

// WithFramedStyle - Usage example with FramedStyle frames
export const WithFramedStyle: Story = {
  render: () => {
    const [selectedPlan, setSelectedPlan] = useState('basic');

    const planOptions = [
      { value: 'basic', title: '베이직 플랜', price: '무료', description: '기본 기능 제공' },
      { value: 'pro', title: '프로 플랜', price: '9,900원/월', description: '모든 기능 + 우선 지원' },
      { value: 'enterprise', title: '엔터프라이즈', price: '문의', description: '맞춤형 솔루션' },
    ];

    return (
      <View style={styles.stack}>
        <Text style={{ fontSize: 16, fontWeight: '600', color: '#1e293b', marginBottom: 8 }}>
          플랜 선택
        </Text>
        {planOptions.map((option) => (
          <FramedStyle
            key={option.value}
            selected={selectedPlan === option.value}
            onPress={() => setSelectedPlan(option.value)}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <Radio
                size="medium"
                selected={selectedPlan === option.value}
                onPress={() => setSelectedPlan(option.value)}
                label=""
              />
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={styles.framedLabel}>{option.title}</Text>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: '#2563eb' }}>
                    {option.price}
                  </Text>
                </View>
                <Text style={[styles.framedDescription, { marginTop: 2, marginLeft: 0 }]}>
                  {option.description}
                </Text>
              </View>
            </View>
          </FramedStyle>
        ))}
      </View>
    );
  },
};
