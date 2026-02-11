import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Checkbox } from '@baerae-zkap/design-system/native';

const meta: Meta<typeof Checkbox> = {
  title: '@baerae-zkap/Selection and input/Checkbox',
  component: Checkbox,
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
    checked: { table: { disable: true } },
    indeterminate: { table: { disable: true } },
    onPress: { table: { disable: true } },
    label: { table: { disable: true } },
    size: { table: { disable: true } },
    tight: { table: { disable: true } },
    bold: { table: { disable: true } },
    disabled: { table: { disable: true } },
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
    bold: {
      control: 'boolean',
      name: '굵게',
      table: { disable: false },
    },
    state: {
      control: 'select',
      options: ['unchecked', 'checked', 'indeterminate'],
      name: '상태',
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
    bold: false,
    state: 'checked',
    disabled: false,
  },
  render: (args) => {
    const [internalState, setInternalState] = useState(args.state);

    const checked = internalState === 'checked' || internalState === 'indeterminate';
    const indeterminate = internalState === 'indeterminate';

    const handlePress = () => {
      if (internalState === 'unchecked') {
        setInternalState('checked');
      } else if (internalState === 'checked') {
        setInternalState('unchecked');
      } else {
        setInternalState('unchecked');
      }
    };

    return (
      <Checkbox
        size={args.size as 'small' | 'medium'}
        tight={args.tight as boolean}
        bold={args.bold as boolean}
        checked={checked}
        indeterminate={indeterminate}
        disabled={args.disabled as boolean}
        onPress={handlePress}
        label="이용약관에 동의합니다"
      />
    );
  },
};

// Sizes - Compare Small vs Medium
export const Sizes: Story = {
  render: () => {
    const [smallChecked, setSmallChecked] = useState(true);
    const [mediumChecked, setMediumChecked] = useState(true);

    return (
      <View style={styles.stack}>
        <View style={styles.item}>
          <Checkbox
            size="small"
            checked={smallChecked}
            onPress={() => setSmallChecked(!smallChecked)}
            label="소형 체크박스"
          />
          <Text style={styles.label}>Small</Text>
        </View>
        <View style={styles.item}>
          <Checkbox
            size="medium"
            checked={mediumChecked}
            onPress={() => setMediumChecked(!mediumChecked)}
            label="중형 체크박스"
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
    const [normalChecked, setNormalChecked] = useState(true);
    const [tightChecked, setTightChecked] = useState(true);

    return (
      <View style={styles.row}>
        <View style={styles.item}>
          <Checkbox
            checked={normalChecked}
            onPress={() => setNormalChecked(!normalChecked)}
            label="일반 간격"
          />
          <Text style={styles.label}>Normal</Text>
        </View>
        <View style={styles.item}>
          <Checkbox
            tight
            checked={tightChecked}
            onPress={() => setTightChecked(!tightChecked)}
            label="촘촘한 간격"
          />
          <Text style={styles.label}>Tight</Text>
        </View>
      </View>
    );
  },
};

// Bold - Compare normal vs bold label
export const Bold: Story = {
  render: () => {
    const [normalChecked, setNormalChecked] = useState(true);
    const [boldChecked, setBoldChecked] = useState(true);

    return (
      <View style={styles.row}>
        <View style={styles.item}>
          <Checkbox
            checked={normalChecked}
            onPress={() => setNormalChecked(!normalChecked)}
            label="일반 텍스트"
          />
          <Text style={styles.label}>Normal</Text>
        </View>
        <View style={styles.item}>
          <Checkbox
            bold
            checked={boldChecked}
            onPress={() => setBoldChecked(!boldChecked)}
            label="굵은 텍스트"
          />
          <Text style={styles.label}>Bold</Text>
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
        {/* Unchecked Row */}
        <View style={styles.gridRow}>
          <View style={styles.gridCell}>
            <Checkbox checked={false} onPress={() => {}} label="" />
            <Text style={styles.cellLabel}>Unchecked</Text>
          </View>
          <View style={styles.gridCell}>
            <Checkbox checked={false} onPress={() => {}} label="" />
            <Text style={styles.cellLabel}>Pressed</Text>
          </View>
          <View style={styles.gridCell}>
            <Checkbox checked={false} disabled onPress={() => {}} label="" />
            <Text style={styles.cellLabel}>Disabled</Text>
          </View>
        </View>

        {/* Checked Row */}
        <View style={styles.gridRow}>
          <View style={styles.gridCell}>
            <Checkbox checked={true} onPress={() => {}} label="" />
            <Text style={styles.cellLabel}>Checked</Text>
          </View>
          <View style={styles.gridCell}>
            <Checkbox checked={true} onPress={() => {}} label="" />
            <Text style={styles.cellLabel}>Pressed</Text>
          </View>
          <View style={styles.gridCell}>
            <Checkbox checked={true} disabled onPress={() => {}} label="" />
            <Text style={styles.cellLabel}>Disabled</Text>
          </View>
        </View>

        {/* Indeterminate Row */}
        <View style={styles.gridRow}>
          <View style={styles.gridCell}>
            <Checkbox checked={false} indeterminate onPress={() => {}} label="" />
            <Text style={styles.cellLabel}>Indeterminate</Text>
          </View>
          <View style={styles.gridCell}>
            <Checkbox checked={false} indeterminate onPress={() => {}} label="" />
            <Text style={styles.cellLabel}>Pressed</Text>
          </View>
          <View style={styles.gridCell}>
            <Checkbox checked={false} indeterminate disabled onPress={() => {}} label="" />
            <Text style={styles.cellLabel}>Disabled</Text>
          </View>
        </View>
      </View>
    );
  },
};

// Hierarchy - Parent-child checkbox pattern
export const Hierarchy: Story = {
  render: () => {
    const [children, setChildren] = useState([
      { id: 1, label: '이용약관 동의', checked: false },
      { id: 2, label: '개인정보 수집 동의', checked: false },
      { id: 3, label: '마케팅 수신 동의', checked: false },
    ]);

    const allChecked = children.every((child) => child.checked);
    const someChecked = children.some((child) => child.checked) && !allChecked;

    const handleParentPress = () => {
      const newState = !allChecked;
      setChildren(children.map((child) => ({ ...child, checked: newState })));
    };

    const handleChildPress = (id: number) => {
      setChildren(
        children.map((child) =>
          child.id === id ? { ...child, checked: !child.checked } : child
        )
      );
    };

    return (
      <View style={styles.stack}>
        <Checkbox
          size="medium"
          checked={allChecked}
          indeterminate={someChecked}
          onPress={handleParentPress}
          label="전체 동의"
        />
        <View style={{ paddingLeft: 20, gap: 12 }}>
          {children.map((child) => (
            <Checkbox
              key={child.id}
              size="small"
              checked={child.checked}
              onPress={() => handleChildPress(child.id)}
              label={child.label}
            />
          ))}
        </View>
      </View>
    );
  },
};
