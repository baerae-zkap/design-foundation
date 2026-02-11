import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DatePicker } from '@baerae-zkap/design-system/native';

const meta: Meta<typeof DatePicker> = {
  title: '@baerae-zkap/Selection and input/Date picker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <View style={{ padding: 20, backgroundColor: '#fff', alignItems: 'center' }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    value: { table: { disable: true } },
    onChange: { table: { disable: true } },
    variant: { table: { disable: true } },
    minimumDate: { table: { disable: true } },
    maximumDate: { table: { disable: true } },
    actionArea: { table: { disable: true } },
    actionAreaLeading: { table: { disable: true } },
    disabled: { table: { disable: true } },
    size: { table: { disable: true } },
    testID: { table: { disable: true } },
    style: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  argTypes: {
    variant: {
      control: 'select',
      options: ['date', 'month'],
      name: '변형',
      table: { disable: false },
    },
    actionArea: {
      control: 'boolean',
      name: '액션 영역',
      table: { disable: false },
    },
    disabled: {
      control: 'boolean',
      name: '비활성화',
      table: { disable: false },
    },
  },
  args: {
    variant: 'date',
    actionArea: false,
    disabled: false,
  },
  render: (args) => {
    const [value, setValue] = useState<Date | null>(null);

    return (
      <DatePicker
        value={value}
        onChange={setValue}
        variant={args.variant}
        actionArea={args.actionArea}
        disabled={args.disabled}
      />
    );
  },
};

export const Variants: Story = {
  render: () => {
    const [dateValue, setDateValue] = useState<Date | null>(null);
    const [monthValue, setMonthValue] = useState<Date | null>(null);

    return (
      <View style={styles.stack}>
        <View style={styles.item}>
          <Text style={styles.label}>날짜 선택 (YYYY.MM.DD)</Text>
          <DatePicker
            value={dateValue}
            onChange={setDateValue}
            variant="date"
          />
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>월 선택 (YYYY.MM)</Text>
          <DatePicker
            value={monthValue}
            onChange={setMonthValue}
            variant="month"
          />
        </View>
      </View>
    );
  },
};

export const ActionArea: Story = {
  render: () => {
    const [value1, setValue1] = useState<Date | null>(null);
    const [value2, setValue2] = useState<Date | null>(null);

    return (
      <View style={styles.stack}>
        <View style={styles.item}>
          <Text style={styles.label}>액션 영역 없음</Text>
          <DatePicker
            value={value1}
            onChange={setValue1}
            actionArea={false}
          />
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>액션 영역 있음</Text>
          <DatePicker
            value={value2}
            onChange={setValue2}
            actionArea={true}
          />
        </View>
      </View>
    );
  },
};

export const States: Story = {
  render: () => {
    const [normalValue, setNormalValue] = useState<Date | null>(null);
    const [disabledValue] = useState<Date | null>(new Date(2025, 2, 15));

    return (
      <View style={styles.stack}>
        <View style={styles.item}>
          <Text style={styles.label}>정상 상태</Text>
          <DatePicker
            value={normalValue}
            onChange={setNormalValue}
          />
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>비활성화 상태</Text>
          <DatePicker
            value={disabledValue}
            onChange={() => {}}
            disabled={true}
          />
        </View>
      </View>
    );
  },
};

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = useState<Date | null>(new Date(2025, 2, 15));

    return (
      <View style={styles.item}>
        <Text style={styles.label}>사전 선택된 날짜</Text>
        <DatePicker
          value={value}
          onChange={setValue}
        />
      </View>
    );
  },
};

export const DateRange: Story = {
  render: () => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    return (
      <View style={styles.stack}>
        <View style={styles.item}>
          <Text style={styles.label}>시작일</Text>
          <DatePicker
            value={startDate}
            onChange={setStartDate}
          />
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>종료일</Text>
          <DatePicker
            value={endDate}
            onChange={setEndDate}
            minimumDate={startDate || undefined}
          />
        </View>
      </View>
    );
  },
};

const styles = StyleSheet.create({
  stack: { gap: 24, width: '100%', maxWidth: 400 },
  item: { gap: 8 },
  label: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    paddingHorizontal: 4,
  },
});
