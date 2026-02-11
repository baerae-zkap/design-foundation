import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Tooltip, IconButton, Button } from '@baerae-zkap/design-system/native';
import { Info, Save, Settings, HelpCircle } from 'lucide-react-native';

const meta = {
  title: '@baerae-zkap/Presentation/Tooltip',
  component: Tooltip,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 }}>
        <Story />
      </View>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '특정 UI 요소 위에서 해당 요소에 대한 간략한 레이블이나 추가적인 정보를 제공합니다.',
      },
    },
  },
  argTypes: {
    children: { table: { disable: true } },
    message: { table: { disable: true } },
    shortcut: { table: { disable: true } },
    size: { table: { disable: true } },
    placement: { table: { disable: true } },
    visible: { table: { disable: true } },
    onVisibleChange: { table: { disable: true } },
    defaultVisible: { table: { disable: true } },
    dismissible: { table: { disable: true } },
    autoFlip: { table: { disable: true } },
    offset: { table: { disable: true } },
    maxWidth: { table: { disable: true } },
    hasArrow: { table: { disable: true } },
    arrowAlign: { table: { disable: true } },
    style: { table: { disable: true } },
    testID: { table: { disable: true } },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: '아이콘 버튼의 역할을 안내합니다.',
    size: 'medium',
    placement: 'bottom',
    hasArrow: true,
    dismissible: true,
    offset: 8,
  },
  argTypes: {
    message: {
      control: 'text',
      name: '메시지',
      table: { disable: false },
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
      name: '크기',
      table: { disable: false },
    },
    placement: {
      control: 'select',
      options: ['top', 'bottom'],
      name: '위치',
      table: { disable: false },
    },
    shortcut: {
      control: 'text',
      name: '단축키',
      table: { disable: false },
    },
    hasArrow: {
      control: 'boolean',
      name: '화살표',
      table: { disable: false },
    },
    dismissible: {
      control: 'boolean',
      name: '닫기',
      table: { disable: false },
    },
    offset: {
      control: 'number',
      name: '간격',
      table: { disable: false },
    },
    arrowAlign: {
      control: 'select',
      options: ['start', 'center', 'end'],
      name: '화살표 정렬',
      table: { disable: false },
    },
    children: { table: { disable: true } },
    visible: { table: { disable: true } },
    onVisibleChange: { table: { disable: true } },
    defaultVisible: { table: { disable: true } },
    autoFlip: { table: { disable: true } },
    maxWidth: { table: { disable: true } },
    style: { table: { disable: true } },
    testID: { table: { disable: true } },
  },
  render: (args) => (
    <Tooltip {...args}>
      <IconButton variant="ghost" color="secondary" size="small">
        <Info />
      </IconButton>
    </Tooltip>
  ),
};

export const Sizes: Story = {
  render: () => (
    <View style={styles.row}>
      <View style={styles.column}>
        <Tooltip message="작은 툴팁" size="small" visible={true}>
          <IconButton variant="ghost" color="secondary" size="small">
            <Info />
          </IconButton>
        </Tooltip>
        <Text style={styles.label}>Small</Text>
      </View>
      <View style={styles.column}>
        <Tooltip message="기본 크기 툴팁입니다" size="medium" visible={true}>
          <IconButton variant="ghost" color="secondary" size="small">
            <Info />
          </IconButton>
        </Tooltip>
        <Text style={styles.label}>Medium</Text>
      </View>
    </View>
  ),
};

export const Placements: Story = {
  render: () => (
    <View style={styles.row}>
      <View style={styles.column}>
        <Tooltip message="위쪽에 표시됩니다" placement="top" visible={true}>
          <IconButton variant="ghost" color="secondary" size="small">
            <Info />
          </IconButton>
        </Tooltip>
        <Text style={styles.label}>Top</Text>
      </View>
      <View style={styles.column}>
        <Tooltip message="아래쪽에 표시됩니다" placement="bottom" visible={true}>
          <IconButton variant="ghost" color="secondary" size="small">
            <Info />
          </IconButton>
        </Tooltip>
        <Text style={styles.label}>Bottom</Text>
      </View>
    </View>
  ),
};

export const WithShortcut: Story = {
  render: () => (
    <View style={styles.row}>
      <Tooltip message="저장" shortcut="⌘S">
        <IconButton variant="ghost" color="secondary" size="small">
          <Save />
        </IconButton>
      </Tooltip>
      <Tooltip message="설정" shortcut="⌘,">
        <IconButton variant="ghost" color="secondary" size="small">
          <Settings />
        </IconButton>
      </Tooltip>
      <Tooltip message="도움말" shortcut="⌘?">
        <IconButton variant="ghost" color="secondary" size="small">
          <HelpCircle />
        </IconButton>
      </Tooltip>
    </View>
  ),
};

export const AlwaysOn: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    return (
      <View style={styles.column}>
        <Tooltip
          message="이 툴팁은 항상 표시됩니다"
          visible={visible}
          onVisibleChange={setVisible}
        >
          <IconButton variant="ghost" color="secondary" size="small">
            <Info />
          </IconButton>
        </Tooltip>
        <Button
          variant="ghost"
          color="secondary"
          size="small"
          onPress={() => setVisible(!visible)}
          style={{ marginTop: 80 }}
        >
          툴팁 {visible ? '숨기기' : '표시'}
        </Button>
      </View>
    );
  },
};

export const LongText: Story = {
  render: () => (
    <View style={styles.column}>
      <Tooltip
        message="이것은 긴 툴팁 메시지입니다. 최대 너비인 280px를 초과하면 텍스트가 자동으로 줄바꿈됩니다."
        visible={true}
      >
        <IconButton variant="ghost" color="secondary" size="small">
          <Info />
        </IconButton>
      </Tooltip>
      <View style={{ height: 100 }} />
      <Tooltip
        message="이것은 긴 툴팁 메시지입니다. 최대 너비인 280px를 초과하면 텍스트가 자동으로 줄바꿈됩니다."
        shortcut="⌘K"
        visible={true}
      >
        <IconButton variant="ghost" color="secondary" size="small">
          <HelpCircle />
        </IconButton>
      </Tooltip>
    </View>
  ),
};

export const WithoutArrow: Story = {
  render: () => (
    <View style={styles.row}>
      <View style={styles.column}>
        <Tooltip message="화살표 있음" hasArrow={true} visible={true}>
          <IconButton variant="ghost" color="secondary" size="small">
            <Info />
          </IconButton>
        </Tooltip>
        <Text style={styles.label}>With Arrow</Text>
      </View>
      <View style={styles.column}>
        <Tooltip message="화살표 없음" hasArrow={false} visible={true}>
          <IconButton variant="ghost" color="secondary" size="small">
            <Info />
          </IconButton>
        </Tooltip>
        <Text style={styles.label}>Without Arrow</Text>
      </View>
    </View>
  ),
};

export const ArrowAlign: Story = {
  render: () => (
    <View style={styles.row}>
      <View style={styles.column}>
        <Tooltip message="좌측 정렬" arrowAlign="start" visible={true}>
          <IconButton variant="ghost" color="secondary" size="small">
            <Info />
          </IconButton>
        </Tooltip>
        <Text style={styles.label}>Start</Text>
      </View>
      <View style={styles.column}>
        <Tooltip message="중앙 정렬" arrowAlign="center" visible={true}>
          <IconButton variant="ghost" color="secondary" size="small">
            <Info />
          </IconButton>
        </Tooltip>
        <Text style={styles.label}>Center</Text>
      </View>
      <View style={styles.column}>
        <Tooltip message="우측 정렬" arrowAlign="end" visible={true}>
          <IconButton variant="ghost" color="secondary" size="small">
            <Info />
          </IconButton>
        </Tooltip>
        <Text style={styles.label}>End</Text>
      </View>
    </View>
  ),
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 32,
  },
  column: {
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
  },
});
