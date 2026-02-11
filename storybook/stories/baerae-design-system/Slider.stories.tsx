import { Slider } from '@baerae-zkap/design-system/native';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View, Text } from 'react-native';
import { useState } from 'react';

/**
 * Slider 컴포넌트
 *
 * - **size**: small(track 4px, thumb 20px) / medium(track 6px, thumb 24px) / large(track 8px, thumb 28px)
 * - **value**: 현재 값
 * - **minimumValue/maximumValue**: 최소/최대 값
 * - **step**: 증가 단위
 * - **showTooltip**: 드래그 시 값 툴팁 표시 (TDS-inspired)
 * - **tooltipContent**: 커스텀 툴팁 포맷터
 * - **labels**: min/max/mid 라벨 표시 (TDS-inspired)
 * - **trackColor/trackBgColor**: 트랙 색상 커스터마이징
 */
const meta = {
  title: '@baerae-zkap/Selection and input/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    disabled: { control: 'boolean' },
    showTooltip: { control: 'boolean' },
    minimumValue: { control: 'number' },
    maximumValue: { control: 'number' },
    step: { control: 'number' },
    trackColor: { table: { disable: true } },
    trackBgColor: { table: { disable: true } },
    value: { table: { disable: true } },
    onValueChange: { table: { disable: true } },
    onSlidingStart: { table: { disable: true } },
    onSlidingComplete: { table: { disable: true } },
    tooltipContent: { table: { disable: true } },
    labels: { table: { disable: true } },
    style: { table: { disable: true } },
    testID: { table: { disable: true } },
    accessibilityLabel: { table: { disable: true } },
  },
  decorators: [
    (Story) => (
      <View style={{ width: 375, padding: 20, backgroundColor: '#f8fafc' }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 (Controls로 조정 가능)
export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value ?? 50);
    return (
      <View style={{ gap: 12 }}>
        <Slider
          {...args}
          value={value}
          onValueChange={setValue}
        />
        <Text style={{ fontSize: 14, color: '#64748b', textAlign: 'center' }}>
          Value: {Math.round(value)}
        </Text>
      </View>
    );
  },
  args: {
    value: 50,
    minimumValue: 0,
    maximumValue: 100,
    step: 1,
    size: 'medium',
    disabled: false,
    showTooltip: false,
  },
};

// 사이즈 비교
export const Sizes: Story = {
  render: () => {
    const [small, setSmall] = useState(30);
    const [medium, setMedium] = useState(50);
    const [large, setLarge] = useState(70);

    return (
      <View style={{ gap: 24 }}>
        <View>
          <Text style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>
            Small (track 4px, thumb 20px)
          </Text>
          <Slider
            size="small"
            value={small}
            onValueChange={setSmall}
            minimumValue={0}
            maximumValue={100}
          />
        </View>
        <View>
          <Text style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>
            Medium (track 6px, thumb 24px)
          </Text>
          <Slider
            size="medium"
            value={medium}
            onValueChange={setMedium}
            minimumValue={0}
            maximumValue={100}
          />
        </View>
        <View>
          <Text style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>
            Large (track 8px, thumb 28px)
          </Text>
          <Slider
            size="large"
            value={large}
            onValueChange={setLarge}
            minimumValue={0}
            maximumValue={100}
          />
        </View>
      </View>
    );
  },
};

// 값 라벨 표시
export const WithValueLabel: Story = {
  render: () => {
    const [value, setValue] = useState(65);

    return (
      <View style={{ gap: 12 }}>
        <Slider
          size="medium"
          value={value}
          onValueChange={setValue}
          minimumValue={0}
          maximumValue={100}
          showValue
        />
        <Text style={{ fontSize: 14, color: '#64748b', textAlign: 'center' }}>
          Drag to see value label
        </Text>
      </View>
    );
  },
};

// Step 단위
export const WithStep: Story = {
  render: () => {
    const [value, setValue] = useState(50);

    return (
      <View style={{ gap: 12 }}>
        <Slider
          size="medium"
          value={value}
          onValueChange={setValue}
          minimumValue={0}
          maximumValue={100}
          step={10}
          showValue
        />
        <Text style={{ fontSize: 14, color: '#64748b', textAlign: 'center' }}>
          Step: 10 (snaps to 0, 10, 20, ..., 100)
        </Text>
      </View>
    );
  },
};

// 범위 변경
export const CustomRange: Story = {
  render: () => {
    const [value, setValue] = useState(50);

    return (
      <View style={{ gap: 12 }}>
        <Slider
          size="medium"
          value={value}
          onValueChange={setValue}
          minimumValue={-100}
          maximumValue={100}
          step={5}
          showValue
        />
        <Text style={{ fontSize: 14, color: '#64748b', textAlign: 'center' }}>
          Range: -100 to 100, Step: 5
        </Text>
      </View>
    );
  },
};

// 상태
export const States: Story = {
  render: () => {
    const [normalValue, setNormalValue] = useState(50);
    const [disabledValue] = useState(50);

    return (
      <View style={{ gap: 20 }}>
        <View>
          <Text style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>
            Normal
          </Text>
          <Slider
            size="medium"
            value={normalValue}
            onValueChange={setNormalValue}
            minimumValue={0}
            maximumValue={100}
          />
        </View>
        <View>
          <Text style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>
            Disabled
          </Text>
          <Slider
            size="medium"
            value={disabledValue}
            onValueChange={() => {}}
            minimumValue={0}
            maximumValue={100}
            disabled
          />
        </View>
      </View>
    );
  },
};

// 실전 예제: 볼륨 조절
export const VolumeControl: Story = {
  render: () => {
    const [volume, setVolume] = useState(75);

    return (
      <View style={{
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 12,
        gap: 16,
      }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#334155' }}>
            Volume
          </Text>
          <Text style={{ fontSize: 16, fontWeight: '700', color: '#2563eb' }}>
            {Math.round(volume)}%
          </Text>
        </View>
        <Slider
          size="medium"
          value={volume}
          onValueChange={setVolume}
          minimumValue={0}
          maximumValue={100}
          step={1}
        />
      </View>
    );
  },
};

// 실전 예제: 가격 범위
export const PriceRange: Story = {
  render: () => {
    const [price, setPrice] = useState(50000);

    return (
      <View style={{
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 12,
        gap: 16,
      }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#334155' }}>
            Max Price
          </Text>
          <Text style={{ fontSize: 16, fontWeight: '700', color: '#334155' }}>
            ₩{price.toLocaleString()}
          </Text>
        </View>
        <Slider
          size="large"
          value={price}
          onValueChange={setPrice}
          minimumValue={0}
          maximumValue={100000}
          step={5000}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 12, color: '#94a3b8' }}>₩0</Text>
          <Text style={{ fontSize: 12, color: '#94a3b8' }}>₩100,000</Text>
        </View>
      </View>
    );
  },
};

// With Tooltip (TDS-inspired)
export const WithTooltip: Story = {
  render: () => {
    const [value, setValue] = useState(65);

    return (
      <View style={{ gap: 12 }}>
        <Text style={{ fontSize: 14, color: '#334155', marginBottom: 8 }}>
          Drag to see tooltip above thumb
        </Text>
        <Slider
          size="medium"
          value={value}
          onValueChange={setValue}
          minimumValue={0}
          maximumValue={100}
          showTooltip
        />
        <Text style={{ fontSize: 14, color: '#64748b', textAlign: 'center' }}>
          Current Value: {Math.round(value)}
        </Text>
      </View>
    );
  },
};

// With Labels (TDS-inspired)
export const WithLabels: Story = {
  render: () => {
    const [value, setValue] = useState(50);

    return (
      <View style={{ gap: 16 }}>
        <Text style={{ fontSize: 14, fontWeight: '600', color: '#334155' }}>
          Price Range Filter
        </Text>
        <Slider
          size="medium"
          value={value}
          onValueChange={setValue}
          minimumValue={0}
          maximumValue={100}
          showTooltip
          tooltipContent={(v) => `₩${Math.round(v)}K`}
          labels={{
            min: '₩0',
            max: '₩100K',
            mid: '₩50K',
          }}
        />
      </View>
    );
  },
};

// Custom Colors (TDS-inspired)
export const CustomColors: Story = {
  render: () => {
    const [value1, setValue1] = useState(30);
    const [value2, setValue2] = useState(60);
    const [value3, setValue3] = useState(80);

    return (
      <View style={{ gap: 24 }}>
        <View>
          <Text style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>
            Success (Green)
          </Text>
          <Slider
            size="medium"
            value={value1}
            onValueChange={setValue1}
            minimumValue={0}
            maximumValue={100}
            trackColor="#22c55e"
            trackBgColor="#dcfce7"
          />
        </View>
        <View>
          <Text style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>
            Warning (Orange)
          </Text>
          <Slider
            size="medium"
            value={value2}
            onValueChange={setValue2}
            minimumValue={0}
            maximumValue={100}
            trackColor="#f97316"
            trackBgColor="#ffedd5"
          />
        </View>
        <View>
          <Text style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>
            Error (Red)
          </Text>
          <Slider
            size="medium"
            value={value3}
            onValueChange={setValue3}
            minimumValue={0}
            maximumValue={100}
            trackColor="#ef4444"
            trackBgColor="#fee2e2"
          />
        </View>
      </View>
    );
  },
};

// Custom Formatter (TDS-inspired)
export const CustomFormatter: Story = {
  render: () => {
    const [percentage, setPercentage] = useState(75);
    const [temperature, setTemperature] = useState(22);
    const [distance, setDistance] = useState(5);

    return (
      <View style={{ gap: 24 }}>
        <View>
          <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 8, color: '#334155' }}>
            Percentage
          </Text>
          <Slider
            size="medium"
            value={percentage}
            onValueChange={setPercentage}
            minimumValue={0}
            maximumValue={100}
            showTooltip
            tooltipContent={(v) => `${Math.round(v)}%`}
            labels={{ min: '0%', max: '100%' }}
          />
        </View>
        <View>
          <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 8, color: '#334155' }}>
            Temperature
          </Text>
          <Slider
            size="medium"
            value={temperature}
            onValueChange={setTemperature}
            minimumValue={16}
            maximumValue={30}
            step={0.5}
            showTooltip
            tooltipContent={(v) => `${v.toFixed(1)}°C`}
            labels={{ min: '16°C', max: '30°C' }}
          />
        </View>
        <View>
          <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 8, color: '#334155' }}>
            Distance
          </Text>
          <Slider
            size="medium"
            value={distance}
            onValueChange={setDistance}
            minimumValue={0}
            maximumValue={10}
            step={0.5}
            showTooltip
            tooltipContent={(v) => `${v.toFixed(1)}km`}
            labels={{ min: '0km', max: '10km' }}
          />
        </View>
      </View>
    );
  },
};
