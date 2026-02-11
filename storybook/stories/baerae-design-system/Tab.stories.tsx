import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TabList } from '@baerae-zkap/design-system/native';

const defaultTabs = [
  { label: '전체' },
  { label: '입금' },
  { label: '출금' },
  { label: '매수' },
];

const meta: Meta<typeof TabList> = {
  title: '@baerae-zkap/Navigations/Tab',
  component: TabList,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <View style={{ backgroundColor: '#fff' }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    mode: {
      control: 'select',
      options: ['scroll', 'fluid'],
      name: '리사이즈',
      table: { disable: false },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      name: '크기',
      table: { disable: false },
    },
    horizontalPadding: {
      control: 'boolean',
      name: '좌우 여백',
      table: { disable: false },
    },
    children: { table: { disable: true } },
    selectedIndex: { table: { disable: true } },
    onSelect: { table: { disable: true } },
    itemGap: { table: { disable: true } },
    style: { table: { disable: true } },
    testID: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof TabList>;

/**
 * Controls 패널에서 리사이즈, 크기, 좌우 여백을 조절해보세요.
 */
export const Default: Story = {
  args: {
    mode: 'scroll',
    size: 'large',
    horizontalPadding: true,
  },
  render: (args) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    return (
      <TabList
        {...args}
        selectedIndex={selectedIndex}
        onSelect={setSelectedIndex}
      >
        {defaultTabs}
      </TabList>
    );
  },
};

/**
 * 리사이즈 비교: Hug (scroll) vs Fill (fluid)
 */
export const Resize: Story = {
  render: () => {
    const [idx1, setIdx1] = useState(0);
    const [idx2, setIdx2] = useState(0);
    return (
      <View style={styles.stack}>
        <View style={styles.item}>
          <Text style={styles.sectionTitle}>Hug (scroll)</Text>
          <TabList selectedIndex={idx1} onSelect={setIdx1} mode="scroll">
            {defaultTabs}
          </TabList>
        </View>
        <View style={styles.item}>
          <Text style={styles.sectionTitle}>Fill (fluid)</Text>
          <TabList selectedIndex={idx2} onSelect={setIdx2} mode="fluid">
            {defaultTabs}
          </TabList>
        </View>
      </View>
    );
  },
};

/**
 * 크기 비교: Small (36px) / Medium (40px) / Large (48px)
 */
export const Sizes: Story = {
  render: () => {
    const [idx1, setIdx1] = useState(0);
    const [idx2, setIdx2] = useState(0);
    const [idx3, setIdx3] = useState(0);
    return (
      <View style={styles.stack}>
        <View style={styles.item}>
          <Text style={styles.label}>Small</Text>
          <TabList selectedIndex={idx1} onSelect={setIdx1} size="small">
            {defaultTabs}
          </TabList>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Medium</Text>
          <TabList selectedIndex={idx2} onSelect={setIdx2} size="medium">
            {defaultTabs}
          </TabList>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Large</Text>
          <TabList selectedIndex={idx3} onSelect={setIdx3} size="large">
            {defaultTabs}
          </TabList>
        </View>
      </View>
    );
  },
};

/**
 * 좌우 여백 on/off
 */
export const HorizontalPadding: Story = {
  render: () => {
    const [idx1, setIdx1] = useState(0);
    const [idx2, setIdx2] = useState(0);
    return (
      <View style={styles.stack}>
        <View style={styles.item}>
          <Text style={styles.label}>여백 있음</Text>
          <TabList
            selectedIndex={idx1}
            onSelect={setIdx1}
            horizontalPadding
          >
            {defaultTabs}
          </TabList>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>여백 없음</Text>
          <TabList
            selectedIndex={idx2}
            onSelect={setIdx2}
            horizontalPadding={false}
          >
            {defaultTabs}
          </TabList>
        </View>
      </View>
    );
  },
};

/**
 * 뱃지 + 알림 도트
 */
export const WithBadge: Story = {
  render: () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    return (
      <TabList selectedIndex={selectedIndex} onSelect={setSelectedIndex}>
        {[
          { label: '메시지', badge: 5 },
          { label: '알림', badge: 12, showDot: true },
          { label: '요청', badge: 100 },
          { label: '보관함' },
        ]}
      </TabList>
    );
  },
};

/**
 * 비활성화 탭
 */
export const WithDisabled: Story = {
  render: () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    return (
      <TabList selectedIndex={selectedIndex} onSelect={setSelectedIndex}>
        {[
          { label: '사용가능' },
          { label: '비활성화', disabled: true },
          { label: '활성화' },
          { label: '잠금', disabled: true },
        ]}
      </TabList>
    );
  },
};

/**
 * 스크롤 가능한 많은 탭
 */
export const ManyTabs: Story = {
  render: () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    return (
      <TabList selectedIndex={selectedIndex} onSelect={setSelectedIndex}>
        {[
          { label: '트렌딩' },
          { label: '기술' },
          { label: '비즈니스' },
          { label: '엔터테인먼트' },
          { label: '스포츠' },
          { label: '건강' },
          { label: '과학' },
          { label: 'DeFi' },
        ]}
      </TabList>
    );
  },
};

const styles = StyleSheet.create({
  stack: {
    gap: 24,
  },
  item: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    paddingHorizontal: 12,
  },
  label: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    paddingHorizontal: 12,
  },
});
