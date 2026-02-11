import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FramedStyle } from '@baerae-zkap/design-system/native';

const meta: Meta<typeof FramedStyle> = {
  title: '@baerae-zkap/Selection and input/Framed style',
  component: FramedStyle,
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
    children: { table: { disable: true } },
    variant: { table: { disable: true } },
    selected: { table: { disable: true } },
    size: { table: { disable: true } },
    padding: { table: { disable: true } },
    borderRadius: { table: { disable: true } },
    disabled: { table: { disable: true } },
    onPress: { table: { disable: true } },
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
  contentText: {
    fontSize: 15,
    color: '#334155',
    lineHeight: 22,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  descText: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optionDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#cbd5e1',
  },
  optionDotSelected: {
    borderColor: '#2563eb',
    backgroundColor: '#2563eb',
  },
  optionDotInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  optionText: {
    fontSize: 15,
    color: '#334155',
  },
  richContentRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  richContentRowLast: {
    borderBottomWidth: 0,
  },
});

// Default - Interactive Controls panel
export const Default: Story = {
  argTypes: {
    variant: {
      control: 'select',
      options: ['normal', 'negative'],
      name: '변형',
      table: { disable: false },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'xlarge'],
      name: '크기',
      table: { disable: false },
    },
    selected: {
      control: 'boolean',
      name: '선택됨',
      table: { disable: false },
    },
    disabled: {
      control: 'boolean',
      name: '비활성화',
      table: { disable: false },
    },
  },
  args: {
    variant: 'normal',
    size: 'medium',
    selected: false,
    disabled: false,
  },
  render: (args) => {
    return (
      <FramedStyle
        variant={args.variant as 'normal' | 'negative'}
        size={args.size as 'small' | 'medium' | 'large' | 'xlarge'}
        selected={args.selected as boolean}
        disabled={args.disabled as boolean}
      >
        <Text style={styles.contentText}>프레임 안에 들어가는 콘텐츠입니다</Text>
      </FramedStyle>
    );
  },
};

// Variants - Compare Normal vs Negative
export const Variants: Story = {
  render: () => {
    return (
      <View style={styles.row}>
        <View style={styles.item}>
          <FramedStyle variant="normal" selected={true}>
            <Text style={styles.contentText}>Normal 변형</Text>
          </FramedStyle>
          <Text style={styles.label}>Normal (Brand)</Text>
        </View>
        <View style={styles.item}>
          <FramedStyle variant="negative" selected={true}>
            <Text style={styles.contentText}>Negative 변형</Text>
          </FramedStyle>
          <Text style={styles.label}>Negative (Error)</Text>
        </View>
      </View>
    );
  },
};

// Sizes - Compare all sizes
export const Sizes: Story = {
  render: () => {
    return (
      <View style={styles.stack}>
        <View style={styles.item}>
          <FramedStyle size="small">
            <Text style={styles.contentText}>소형 프레임</Text>
          </FramedStyle>
          <Text style={styles.label}>Small</Text>
        </View>
        <View style={styles.item}>
          <FramedStyle size="medium">
            <Text style={styles.contentText}>중형 프레임</Text>
          </FramedStyle>
          <Text style={styles.label}>Medium</Text>
        </View>
        <View style={styles.item}>
          <FramedStyle size="large">
            <Text style={styles.contentText}>대형 프레임</Text>
          </FramedStyle>
          <Text style={styles.label}>Large</Text>
        </View>
        <View style={styles.item}>
          <FramedStyle size="xlarge">
            <Text style={styles.contentText}>특대형 프레임</Text>
          </FramedStyle>
          <Text style={styles.label}>XLarge</Text>
        </View>
      </View>
    );
  },
};

// States - Default, Selected, Disabled
export const States: Story = {
  render: () => {
    return (
      <View style={styles.stack}>
        <View style={styles.item}>
          <FramedStyle selected={false}>
            <Text style={styles.contentText}>기본 상태</Text>
          </FramedStyle>
          <Text style={styles.label}>Default (Unselected)</Text>
        </View>
        <View style={styles.item}>
          <FramedStyle selected={true}>
            <Text style={styles.contentText}>선택된 상태</Text>
          </FramedStyle>
          <Text style={styles.label}>Selected (Brand Border + Shadow)</Text>
        </View>
        <View style={styles.item}>
          <FramedStyle disabled={true}>
            <Text style={styles.contentText}>비활성화 상태</Text>
          </FramedStyle>
          <Text style={styles.label}>Disabled</Text>
        </View>
      </View>
    );
  },
};

// SelectionList - Interactive radio-like selection
export const SelectionList: Story = {
  render: () => {
    const [selectedId, setSelectedId] = useState<number | null>(1);

    const options = [
      { id: 1, label: '옵션 1' },
      { id: 2, label: '옵션 2' },
      { id: 3, label: '옵션 3' },
    ];

    return (
      <View style={styles.stack}>
        {options.map((option) => (
          <FramedStyle
            key={option.id}
            selected={selectedId === option.id}
            onPress={() => setSelectedId(option.id)}
          >
            <View style={styles.optionRow}>
              <View
                style={[
                  styles.optionDot,
                  selectedId === option.id && styles.optionDotSelected,
                ]}
              >
                {selectedId === option.id && (
                  <View
                    style={[
                      styles.optionDotInner,
                      { alignSelf: 'center', marginTop: 4 },
                    ]}
                  />
                )}
              </View>
              <Text style={styles.optionText}>{option.label}</Text>
            </View>
          </FramedStyle>
        ))}
      </View>
    );
  },
};

// WithContent - Real-world usage with rich content
export const WithContent: Story = {
  render: () => {
    const [selected1, setSelected1] = useState(false);
    const [selected2, setSelected2] = useState(true);

    return (
      <View style={styles.stack}>
        <View style={styles.item}>
          <FramedStyle
            selected={selected1}
            onPress={() => setSelected1(!selected1)}
          >
            <Text style={styles.titleText}>결제 정보</Text>
            <Text style={styles.descText}>
              신용카드로 간편하게 결제하세요
            </Text>
          </FramedStyle>
          <Text style={styles.label}>Title + Description</Text>
        </View>

        <View style={styles.item}>
          <FramedStyle
            selected={selected2}
            onPress={() => setSelected2(!selected2)}
          >
            <View style={styles.richContentRow}>
              <Text style={styles.titleText}>출금 주소</Text>
              <Text style={styles.descText}>서울시 강남구 테헤란로 123</Text>
            </View>
            <View style={styles.richContentRow}>
              <Text style={styles.titleText}>연락처</Text>
              <Text style={styles.descText}>010-1234-5678</Text>
            </View>
            <View style={[styles.richContentRow, styles.richContentRowLast]}>
              <Text style={styles.titleText}>메모 (선택)</Text>
              <Text style={styles.descText}>문 앞에 놓아주세요</Text>
            </View>
          </FramedStyle>
          <Text style={styles.label}>Multiple Rows (List-like)</Text>
        </View>
      </View>
    );
  },
};
