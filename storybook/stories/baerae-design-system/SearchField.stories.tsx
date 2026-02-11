import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SearchField } from '@baerae-zkap/design-system/native';

const meta: Meta<typeof SearchField> = {
  title: '@baerae-zkap/Selection and input/Search field',
  component: SearchField,
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
    value: { table: { disable: true } },
    onChangeText: { table: { disable: true } },
    onSearch: { table: { disable: true } },
    placeholder: { table: { disable: true } },
    showClearButton: { table: { disable: true } },
    onClear: { table: { disable: true } },
    onDeleteClick: { table: { disable: true } },
    disabled: { table: { disable: true } },
    size: { table: { disable: true } },
    autoFocus: { table: { disable: true } },
    fixed: { table: { disable: true } },
    takeSpace: { table: { disable: true } },
    showCancelButton: { table: { disable: true } },
    onCancel: { table: { disable: true } },
    leftIcon: { table: { disable: true } },
    testID: { table: { disable: true } },
    style: { table: { disable: true } },
    accessibilityLabel: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const styles = StyleSheet.create({
  stack: { gap: 24 },
  item: { gap: 8 },
  row: { flexDirection: 'row', gap: 12, alignItems: 'center', flexWrap: 'wrap' },
  label: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    paddingHorizontal: 4,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
  },
  chipText: {
    fontSize: 14,
    color: '#333',
  },
  scrollContent: {
    padding: 20,
    gap: 12,
  },
  dummyText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
  },
});

export const Default: Story = {
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium'],
      name: '크기',
      table: { disable: false },
    },
    disabled: {
      control: 'boolean',
      name: '비활성화',
      table: { disable: false },
    },
    showCancelButton: {
      control: 'boolean',
      name: '취소 버튼',
      table: { disable: false },
    },
    showClearButton: {
      control: 'boolean',
      name: '지우기 버튼',
      table: { disable: false },
    },
  },
  args: {
    size: 'medium',
    disabled: false,
    showCancelButton: false,
    showClearButton: true,
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <SearchField
        size={args.size}
        disabled={args.disabled}
        showCancelButton={args.showCancelButton}
        showClearButton={args.showClearButton}
        value={value}
        onChangeText={setValue}
        placeholder="검색어를 입력하세요"
      />
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [smallValue, setSmallValue] = useState('');
    const [mediumValue, setMediumValue] = useState('');

    return (
      <View style={styles.stack}>
        <View style={styles.item}>
          <Text style={styles.label}>Small</Text>
          <SearchField
            size="small"
            value={smallValue}
            onChangeText={setSmallValue}
            placeholder="Small 검색 필드"
          />
        </View>

        <View style={styles.item}>
          <Text style={styles.label}>Medium</Text>
          <SearchField
            size="medium"
            value={mediumValue}
            onChangeText={setMediumValue}
            placeholder="Medium 검색 필드"
          />
        </View>
      </View>
    );
  },
};

export const States: Story = {
  render: () => {
    const [normalValue, setNormalValue] = useState('');
    const [withValue, setWithValue] = useState('디자인 시스템');
    const [disabledValue] = useState('비활성화된 상태');

    return (
      <View style={styles.stack}>
        <View style={styles.item}>
          <Text style={styles.label}>Normal</Text>
          <SearchField
            value={normalValue}
            onChangeText={setNormalValue}
            placeholder="검색어를 입력하세요"
          />
        </View>

        <View style={styles.item}>
          <Text style={styles.label}>With Value</Text>
          <SearchField
            value={withValue}
            onChangeText={setWithValue}
            placeholder="검색어를 입력하세요"
          />
        </View>

        <View style={styles.item}>
          <Text style={styles.label}>Disabled</Text>
          <SearchField
            value={disabledValue}
            onChangeText={() => {}}
            disabled={true}
            placeholder="검색어를 입력하세요"
          />
        </View>
      </View>
    );
  },
};

export const WithCancelButton: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <View style={styles.item}>
        <Text style={styles.label}>포커스하면 취소 버튼이 나타납니다</Text>
        <SearchField
          value={value}
          onChangeText={setValue}
          showCancelButton={true}
          onCancel={() => setValue('')}
          placeholder="검색어를 입력하세요"
        />
      </View>
    );
  },
};

export const Fixed: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <View style={{ height: 500 }}>
        <SearchField
          fixed={true}
          value={value}
          onChangeText={setValue}
          placeholder="스크롤해도 고정됩니다"
        />
        <ScrollView style={{ marginTop: 60 }}>
          <View style={styles.scrollContent}>
            <Text style={styles.dummyText}>
              Fixed 속성이 활성화되면 SearchField가 상단에 고정됩니다.
            </Text>
            <Text style={styles.dummyText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
            <Text style={styles.dummyText}>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Text>
            <Text style={styles.dummyText}>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </Text>
            <Text style={styles.dummyText}>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
            <Text style={styles.dummyText}>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
            </Text>
            <Text style={styles.dummyText}>
              Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </Text>
            <Text style={styles.dummyText}>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  },
};

export const SearchWithHistory: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const historyItems = ['최근 검색어 1', '디자인 시스템', 'React Native'];

    return (
      <View style={styles.stack}>
        <SearchField
          value={value}
          onChangeText={setValue}
          placeholder="검색어를 입력하세요"
        />

        <View style={styles.item}>
          <Text style={styles.label}>최근 검색어</Text>
          <View style={styles.row}>
            {historyItems.map((item, index) => (
              <Pressable
                key={index}
                style={styles.chip}
                onPress={() => setValue(item)}
              >
                <Text style={styles.chipText}>{item}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    );
  },
};
