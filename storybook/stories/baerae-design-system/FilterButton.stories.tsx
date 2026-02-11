import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { FilterButton } from '@baerae-zkap/design-system/native';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

/**
 * FilterButton 컴포넌트
 *
 * 드롭다운 메뉴가 내장된 필터 버튼입니다.
 * - **variant**: 'solid' (filled) | 'outlined'
 * - **size**: 'xsmall'(28) | 'small'(32) | 'medium'(36) | 'large'(40)
 * - **items**: 드롭다운 메뉴 아이템 배열
 * - **selectionMode**: 'single' | 'multiple'
 * - **selectedIds**: 선택된 아이템 ID 배열
 * - **onSelectionChange**: 선택 변경 콜백
 */
const meta = {
  title: '@baerae-zkap/Selection and input/Filter button',
  component: FilterButton,
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
      options: ['xsmall', 'small', 'medium', 'large'],
      name: '크기',
      table: { disable: false },
    },
    disabled: {
      control: 'boolean',
      name: '비활성화',
      table: { disable: false },
    },
    label: { table: { disable: true } },
    items: { table: { disable: true } },
    selectionMode: { table: { disable: true } },
    selectedIds: { table: { disable: true } },
    onSelectionChange: { table: { disable: true } },
    onPress: { table: { disable: true } },
    style: { table: { disable: true } },
    testID: { table: { disable: true } },
  },
  args: {
    variant: 'outlined',
    size: 'medium',
    disabled: false,
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 20, backgroundColor: '#fff' }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof FilterButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Default (Controls)
export const Default: Story = {
  render: function Render(args) {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const items = [
      { id: '1', label: 'Menu item 1' },
      { id: '2', label: 'Menu item 2' },
      { id: '3', label: 'Menu item 3' },
    ];

    return (
      <FilterButton
        {...args}
        label="Filter"
        items={items}
        selectionMode="single"
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
      />
    );
  },
};

// 2. Variants
export const Variants: Story = {
  render: function Render() {
    const [solidSelected, setSolidSelected] = useState<string[]>([]);
    const [outlinedSelected, setOutlinedSelected] = useState<string[]>([]);

    const items = [
      { id: '1', label: '항목 1' },
      { id: '2', label: '항목 2' },
      { id: '3', label: '항목 3' },
    ];

    return (
      <View style={styles.stack}>
        <FilterButton
          variant="solid"
          label="Solid"
          items={items}
          selectionMode="single"
          selectedIds={solidSelected}
          onSelectionChange={setSolidSelected}
        />
        <FilterButton
          variant="outlined"
          label="Outlined"
          items={items}
          selectionMode="single"
          selectedIds={outlinedSelected}
          onSelectionChange={setOutlinedSelected}
        />
      </View>
    );
  },
};

// 3. Sizes
export const Sizes: Story = {
  render: function Render() {
    const items = [
      { id: '1', label: '항목 1' },
      { id: '2', label: '항목 2' },
    ];

    return (
      <View style={{ gap: 16 }}>
        <FilterButton
          size="xsmall"
          label="XSmall (28px)"
          items={items}
          selectionMode="single"
        />
        <FilterButton
          size="small"
          label="Small (32px)"
          items={items}
          selectionMode="single"
        />
        <FilterButton
          size="medium"
          label="Medium (36px)"
          items={items}
          selectionMode="single"
        />
        <FilterButton
          size="large"
          label="Large (40px)"
          items={items}
          selectionMode="single"
        />
      </View>
    );
  },
};

// 4. States
export const States: Story = {
  render: function Render() {
    const [selectedIds, setSelectedIds] = useState<string[]>(['1']);

    const items = [
      { id: '1', label: '선택된 항목' },
      { id: '2', label: '항목 2' },
    ];

    return (
      <View style={styles.stack}>
        <FilterButton
          label="Default"
          items={items}
          selectionMode="single"
        />
        <FilterButton
          label="선택된 항목"
          items={items}
          selectionMode="single"
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
        />
        <FilterButton
          label="Disabled"
          items={items}
          selectionMode="single"
          disabled
        />
      </View>
    );
  },
};

// 5. SelectionModes
export const SelectionModes: Story = {
  render: function Render() {
    const [singleSelected, setSingleSelected] = useState<string[]>([]);
    const [multipleSelected, setMultipleSelected] = useState<string[]>([]);

    const singleItems = [
      { id: '1', label: '항목 1' },
      { id: '2', label: '항목 2' },
      { id: '3', label: '항목 3' },
    ];

    const multipleItems = [
      { id: 'terms', label: '이용약관' },
      { id: 'privacy', label: '개인정보' },
      { id: 'marketing', label: '마케팅' },
    ];

    return (
      <View style={{ gap: 20 }}>
        <View>
          <FilterButton
            label="Single Select"
            items={singleItems}
            selectionMode="single"
            selectedIds={singleSelected}
            onSelectionChange={setSingleSelected}
          />
        </View>
        <View>
          <FilterButton
            label="Multiple Select"
            items={multipleItems}
            selectionMode="multiple"
            selectedIds={multipleSelected}
            onSelectionChange={setMultipleSelected}
          />
        </View>
      </View>
    );
  },
};

// 6. FilterBar (real-world example)
export const FilterBar: Story = {
  render: function Render() {
    const [sortSelected, setSortSelected] = useState<string[]>([]);
    const [categorySelected, setCategorySelected] = useState<string[]>([]);
    const [priceSelected, setPriceSelected] = useState<string[]>([]);

    const sortItems = [
      { id: 'latest', label: '최신순' },
      { id: 'popular', label: '인기순' },
      { id: 'price', label: '가격순' },
    ];

    const categoryItems = [
      { id: 'all', label: '전체' },
      { id: 'clothing', label: '의류' },
      { id: 'electronics', label: '전자기기' },
      { id: 'food', label: '식품' },
    ];

    const priceItems = [
      { id: 'under10k', label: '~1만원' },
      { id: '10k-50k', label: '1~5만원' },
      { id: '50k-100k', label: '5~10만원' },
      { id: 'over100k', label: '10만원~' },
    ];

    return (
      <View style={{ gap: 12 }}>
        <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
          <FilterButton
            variant="outlined"
            label="정렬"
            items={sortItems}
            selectionMode="single"
            selectedIds={sortSelected}
            onSelectionChange={setSortSelected}
          />
          <FilterButton
            variant="outlined"
            label="카테고리"
            items={categoryItems}
            selectionMode="single"
            selectedIds={categorySelected}
            onSelectionChange={setCategorySelected}
          />
          <FilterButton
            variant="outlined"
            label="가격대"
            items={priceItems}
            selectionMode="multiple"
            selectedIds={priceSelected}
            onSelectionChange={setPriceSelected}
          />
        </View>
      </View>
    );
  },
};

const styles = StyleSheet.create({
  stack: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
});
