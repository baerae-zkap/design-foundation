import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { PaginationDots } from '@baerae-zkap/design-system/native';

const meta = {
  title: '@baerae-zkap/Navigations/PaginationDots',
  component: PaginationDots,
  argTypes: {
    total: {
      control: { type: 'number', min: 1, max: 20 },
      description: '전체 페이지 수',
    },
    current: {
      control: { type: 'number', min: 0, max: 19 },
      description: '현재 페이지 인덱스 (0-based)',
    },
    variant: {
      control: 'select',
      options: ['normal', 'white'],
      description: '색상 변형',
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
      description: '크기',
    },
    maxDots: {
      control: { type: 'number', min: 3, max: 10 },
      description: '최대 표시 점 개수',
    },
    onDotPress: { table: { disable: true } },
    style: { table: { disable: true } },
    testID: { table: { disable: true } },
  },
  args: {
    total: 5,
    current: 0,
    variant: 'normal',
    size: 'small',
    maxDots: 5,
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 24, backgroundColor: '#fafbfc', minHeight: 100 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof PaginationDots>;

export default meta;

type Story = StoryObj<typeof meta>;

// 1. Default - Interactive
export const Default: Story = {
  render: (args) => {
    const [current, setCurrent] = useState(args.current);

    return (
      <View style={{ alignItems: 'center', gap: 16 }}>
        <PaginationDots
          {...args}
          current={current}
          onDotPress={(index) => setCurrent(index)}
        />
        <Text style={{ fontSize: 14, color: '#6b7280', marginTop: 8 }}>
          현재 페이지: {current + 1} / {args.total}
        </Text>
      </View>
    );
  },
};

// 2. Variants - Normal vs White
export const Variants: Story = {
  render: () => (
    <View style={{ gap: 32 }}>
      {/* Normal */}
      <View style={{ alignItems: 'center', gap: 12 }}>
        <Text style={{ fontSize: 14, fontWeight: '600', color: '#111827' }}>Normal</Text>
        <View style={{ padding: 20, backgroundColor: '#ffffff', borderRadius: 12 }}>
          <PaginationDots total={5} current={2} variant="normal" />
        </View>
      </View>

      {/* White - Dark Background */}
      <View style={{ alignItems: 'center', gap: 12 }}>
        <Text style={{ fontSize: 14, fontWeight: '600', color: '#111827' }}>White (on dark)</Text>
        <View
          style={{
            padding: 20,
            backgroundColor: '#1f2937',
            borderRadius: 12,
          }}
        >
          <PaginationDots total={5} current={2} variant="white" />
        </View>
      </View>
    </View>
  ),
};

// 3. Sizes - Small vs Medium
export const Sizes: Story = {
  render: () => (
    <View style={{ gap: 32 }}>
      {/* Small */}
      <View style={{ alignItems: 'center', gap: 12 }}>
        <Text style={{ fontSize: 14, fontWeight: '600', color: '#111827' }}>Small (6px)</Text>
        <PaginationDots total={5} current={2} size="small" />
      </View>

      {/* Medium */}
      <View style={{ alignItems: 'center', gap: 12 }}>
        <Text style={{ fontSize: 14, fontWeight: '600', color: '#111827' }}>Medium (8px)</Text>
        <PaginationDots total={5} current={2} size="medium" />
      </View>
    </View>
  ),
};

// 4. ManyDots - Sliding Window
export const ManyDots: Story = {
  render: () => {
    const [current, setCurrent] = useState(0);

    return (
      <View style={{ alignItems: 'center', gap: 16 }}>
        <PaginationDots
          total={10}
          current={current}
          maxDots={5}
          onDotPress={(index) => setCurrent(index)}
        />
        <Text style={{ fontSize: 14, color: '#6b7280', marginTop: 8 }}>
          현재 페이지: {current + 1} / 10 (최대 5개 표시)
        </Text>
        <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}>
          <Pressable
            onPress={() => setCurrent(Math.max(0, current - 1))}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              backgroundColor: '#e5e7eb',
              borderRadius: 8,
            }}
          >
            <Text style={{ fontSize: 14, color: '#374151' }}>이전</Text>
          </Pressable>
          <Pressable
            onPress={() => setCurrent(Math.min(9, current + 1))}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              backgroundColor: '#e5e7eb',
              borderRadius: 8,
            }}
          >
            <Text style={{ fontSize: 14, color: '#374151' }}>다음</Text>
          </Pressable>
        </View>
      </View>
    );
  },
};

// 5. OnDarkBackground - Image Background Simulation
export const OnDarkBackground: Story = {
  render: () => {
    const [current, setCurrent] = useState(2);

    return (
      <View
        style={{
          padding: 24,
          backgroundColor: '#1f2937',
          borderRadius: 12,
          alignItems: 'center',
          gap: 16,
        }}
      >
        <Text style={{ fontSize: 14, color: '#ffffff', marginBottom: 8 }}>
          이미지 배경 위 슬라이더 (White variant)
        </Text>
        <PaginationDots
          total={7}
          current={current}
          variant="white"
          size="medium"
          onDotPress={(index) => setCurrent(index)}
        />
        <Text style={{ fontSize: 12, color: '#9ca3af', marginTop: 8 }}>
          {current + 1} / 7
        </Text>
      </View>
    );
  },
};
