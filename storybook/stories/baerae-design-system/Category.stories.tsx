import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Category } from '@baerae-zkap/design-system/native';
import { SlidersHorizontal } from 'lucide-react-native';

const defaultItems = [
  { label: '전체' },
  { label: '입금' },
  { label: '출금' },
  { label: '매수' },
  { label: '매도' },
];

const meta: Meta<typeof Category> = {
  title: '@baerae-zkap/Navigations/Category',
  component: Category,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outlined'],
      name: '변형',
      table: { disable: false },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'xlarge'],
      name: '크기',
      table: { disable: false },
    },
    horizontalPadding: {
      control: 'boolean',
      name: '좌우 패딩',
      table: { disable: false },
    },
    verticalPadding: {
      control: 'boolean',
      name: '상하 패딩',
      table: { disable: false },
    },
    items: { table: { disable: true } },
    selectedIndex: { table: { disable: true } },
    onSelect: { table: { disable: true } },
    iconButton: { table: { disable: true } },
    style: { table: { disable: true } },
    testID: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Category>;

/**
 * Controls 패널에서 variant, size, padding 옵션을 변경해보세요.
 */
export const Default: Story = {
  args: {
    variant: 'solid',
    size: 'medium',
    horizontalPadding: false,
    verticalPadding: false,
  },
  render: (args) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    return (
      <View style={styles.container}>
        <Category
          {...args}
          items={defaultItems}
          selectedIndex={selectedIndex}
          onSelect={setSelectedIndex}
        />
      </View>
    );
  },
};

/**
 * Outlined 변형 (섹션 레벨)
 */
export const Outlined: Story = {
  args: {
    variant: 'outlined',
    size: 'medium',
    horizontalPadding: false,
    verticalPadding: false,
  },
  render: (args) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    return (
      <View style={styles.container}>
        <Category
          {...args}
          items={defaultItems}
          selectedIndex={selectedIndex}
          onSelect={setSelectedIndex}
        />
      </View>
    );
  },
};

/**
 * 사이즈 비교 (small, medium, large, xlarge)
 */
export const Sizes: Story = {
  render: () => {
    const [s1, set1] = useState(1);
    const [s2, set2] = useState(1);
    const [s3, set3] = useState(1);
    const [s4, set4] = useState(1);
    const items = [
      { label: '전체' },
      { label: '입금' },
      { label: '출금' },
      { label: '송금' },
    ];
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Small</Text>
        <Category items={items} selectedIndex={s1} onSelect={set1} size="small" />
        <View style={styles.spacer} />
        <Text style={styles.label}>Medium (기본)</Text>
        <Category items={items} selectedIndex={s2} onSelect={set2} size="medium" />
        <View style={styles.spacer} />
        <Text style={styles.label}>Large</Text>
        <Category items={items} selectedIndex={s3} onSelect={set3} size="large" />
        <View style={styles.spacer} />
        <Text style={styles.label}>Xlarge</Text>
        <Category items={items} selectedIndex={s4} onSelect={set4} size="xlarge" />
      </View>
    );
  },
};

/**
 * 아이콘 버튼 포함
 */
export const WithIconButton: Story = {
  args: {
    variant: 'solid',
    size: 'medium',
    horizontalPadding: true,
  },
  render: (args) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    return (
      <View style={styles.container}>
        <Category
          {...args}
          items={[
            { label: '전체' },
            { label: '입금' },
            { label: '출금' },
            { label: '매수' },
            { label: '매도' },
            { label: '스왑' },
          ]}
          selectedIndex={selectedIndex}
          onSelect={setSelectedIndex}
          iconButton={<SlidersHorizontal size={20} color="#666" />}
        />
      </View>
    );
  },
};

/**
 * 많은 아이템 (횡스크롤)
 */
export const ManyItems: Story = {
  args: {
    variant: 'solid',
    size: 'medium',
    horizontalPadding: true,
  },
  render: (args) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    return (
      <View style={styles.container}>
        <Category
          {...args}
          items={[
            { label: '전체' },
            { label: '입금' },
            { label: '출금' },
            { label: '매수' },
            { label: '매도' },
            { label: '스왑' },
            { label: '스테이킹' },
            { label: '에어드랍' },
            { label: '이자' },
            { label: '수수료' },
            { label: '보상' },
            { label: '기타' },
          ]}
          selectedIndex={selectedIndex}
          onSelect={setSelectedIndex}
        />
      </View>
    );
  },
};

/**
 * 비활성화 아이템 포함
 */
export const WithDisabledItems: Story = {
  args: {
    variant: 'solid',
    size: 'medium',
  },
  render: (args) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    return (
      <View style={styles.container}>
        <Category
          {...args}
          items={[
            { label: '전체' },
            { label: '입금' },
            { label: '출금' },
            { label: '브릿지', disabled: true },
            { label: 'NFT', disabled: true },
            { label: '매수' },
          ]}
          selectedIndex={selectedIndex}
          onSelect={setSelectedIndex}
        />
      </View>
    );
  },
};

/**
 * Solid vs Outlined 비교
 */
export const VariantComparison: Story = {
  render: () => {
    const [s1, set1] = useState(1);
    const [s2, set2] = useState(1);
    const items = [
      { label: '전체' },
      { label: '코인' },
      { label: '은행' },
      { label: 'CEX' },
    ];
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Solid (최상단 카테고리)</Text>
        <Category items={items} selectedIndex={s1} onSelect={set1} variant="solid" />
        <View style={styles.spacer} />
        <Text style={styles.label}>Outlined (섹션 카테고리)</Text>
        <Category items={items} selectedIndex={s2} onSelect={set2} variant="outlined" />
      </View>
    );
  },
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    backgroundColor: '#ffffff',
  },
  spacer: {
    height: 16,
  },
  label: {
    fontSize: 12,
    color: '#666',
    marginLeft: 16,
    marginBottom: 4,
  },
});
