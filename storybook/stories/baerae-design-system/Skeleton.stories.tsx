import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Skeleton } from '@baerae-zkap/design-system/native';

const meta = {
  title: '@baerae-zkap/Loading/Skeleton',
  component: Skeleton,
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'rectangle', 'circle'],
      description: 'Skeleton variant type',
    },
    width: {
      control: 'text',
      description: 'Width (number or string like "100%")',
    },
    height: {
      control: 'number',
      description: 'Height in pixels',
    },
    lines: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Number of lines (text variant only)',
    },
    lineHeight: {
      control: 'number',
      description: 'Line height for text variant',
    },
    lineGap: {
      control: 'number',
      description: 'Gap between lines',
    },
    align: {
      control: 'select',
      options: ['leading', 'center', 'trailing'],
      description: 'Text alignment',
    },
    borderRadius: {
      control: 'number',
      description: 'Border radius override',
    },
    color: { table: { disable: true } },
    style: { table: { disable: true } },
    testID: { table: { disable: true } },
    animated: {
      control: 'boolean',
      description: 'Enable pulse animation',
    },
  },
  args: {
    variant: 'text',
    animated: true,
  },
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'text',
    width: '100%',
    height: 14,
    animated: true,
  },
  render: (args) => (
    <View style={{ padding: 20 }}>
      <Skeleton {...args} />
    </View>
  ),
};

export const Variants: Story = {
  render: () => (
    <View style={{ padding: 20, gap: 24 }}>
      <View>
        <View style={{ marginBottom: 8, fontSize: 12, color: '#6b7280' }}>Text</View>
        <Skeleton variant="text" width="100%" height={14} />
      </View>

      <View>
        <View style={{ marginBottom: 8, fontSize: 12, color: '#6b7280' }}>Rectangle</View>
        <Skeleton variant="rectangle" width="100%" height={100} />
      </View>

      <View>
        <View style={{ marginBottom: 8, fontSize: 12, color: '#6b7280' }}>Circle</View>
        <Skeleton variant="circle" width={48} height={48} />
      </View>
    </View>
  ),
};

export const TextLines: Story = {
  render: () => (
    <View style={{ padding: 20, gap: 24 }}>
      <View>
        <View style={{ marginBottom: 8, fontSize: 12, color: '#6b7280' }}>Single Line</View>
        <Skeleton variant="text" lines={1} width="100%" />
      </View>

      <View>
        <View style={{ marginBottom: 8, fontSize: 12, color: '#6b7280' }}>Three Lines</View>
        <Skeleton variant="text" lines={3} width="100%" />
      </View>

      <View>
        <View style={{ marginBottom: 8, fontSize: 12, color: '#6b7280' }}>Five Lines</View>
        <Skeleton variant="text" lines={5} width="100%" />
      </View>
    </View>
  ),
};

export const TextAlignment: Story = {
  render: () => (
    <View style={{ padding: 20, gap: 24 }}>
      <View>
        <View style={{ marginBottom: 8, fontSize: 12, color: '#6b7280' }}>Leading (Default)</View>
        <Skeleton variant="text" lines={3} align="leading" width="100%" />
      </View>

      <View>
        <View style={{ marginBottom: 8, fontSize: 12, color: '#6b7280' }}>Center</View>
        <Skeleton variant="text" lines={3} align="center" width="100%" />
      </View>

      <View>
        <View style={{ marginBottom: 8, fontSize: 12, color: '#6b7280' }}>Trailing</View>
        <Skeleton variant="text" lines={3} align="trailing" width="100%" />
      </View>
    </View>
  ),
};

export const Sizes: Story = {
  render: () => (
    <View style={{ padding: 20, gap: 24 }}>
      <View>
        <View style={{ marginBottom: 8, fontSize: 12, color: '#6b7280' }}>Small Circle (32px)</View>
        <Skeleton variant="circle" width={32} height={32} />
      </View>

      <View>
        <View style={{ marginBottom: 8, fontSize: 12, color: '#6b7280' }}>Medium Circle (48px)</View>
        <Skeleton variant="circle" width={48} height={48} />
      </View>

      <View>
        <View style={{ marginBottom: 8, fontSize: 12, color: '#6b7280' }}>Large Circle (64px)</View>
        <Skeleton variant="circle" width={64} height={64} />
      </View>

      <View>
        <View style={{ marginBottom: 8, fontSize: 12, color: '#6b7280' }}>Rectangle - Short (80px)</View>
        <Skeleton variant="rectangle" width="100%" height={80} />
      </View>

      <View>
        <View style={{ marginBottom: 8, fontSize: 12, color: '#6b7280' }}>Rectangle - Medium (120px)</View>
        <Skeleton variant="rectangle" width="100%" height={120} />
      </View>

      <View>
        <View style={{ marginBottom: 8, fontSize: 12, color: '#6b7280' }}>Rectangle - Tall (200px)</View>
        <Skeleton variant="rectangle" width="100%" height={200} />
      </View>
    </View>
  ),
};

export const CardSkeleton: Story = {
  name: 'Card Skeleton (Composition)',
  render: () => (
    <View style={{ padding: 20 }}>
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 16,
          padding: 20,
          gap: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 2,
        }}
      >
        {/* Header: Circle avatar + Text */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Skeleton variant="circle" width={40} height={40} />
          <View style={{ flex: 1, gap: 8 }}>
            <Skeleton variant="text" width="60%" height={14} />
            <Skeleton variant="text" width="40%" height={12} />
          </View>
        </View>

        {/* Image placeholder */}
        <Skeleton variant="rectangle" width="100%" height={180} />

        {/* Text content */}
        <View style={{ gap: 8 }}>
          <Skeleton variant="text" lines={3} width="100%" />
        </View>
      </View>
    </View>
  ),
};

export const ListSkeleton: Story = {
  name: 'List Skeleton (Composition)',
  render: () => (
    <View style={{ padding: 20, gap: 12 }}>
      {Array.from({ length: 5 }).map((_, index) => (
        <View
          key={index}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            padding: 16,
            backgroundColor: 'white',
            borderRadius: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.03,
            shadowRadius: 4,
            elevation: 1,
          }}
        >
          <Skeleton variant="circle" width={48} height={48} />
          <View style={{ flex: 1, gap: 8 }}>
            <Skeleton variant="text" width="70%" height={14} />
            <Skeleton variant="text" width="50%" height={12} />
          </View>
        </View>
      ))}
    </View>
  ),
};

export const AnimatedVsStatic: Story = {
  render: () => (
    <View style={{ padding: 20, gap: 24 }}>
      <View>
        <View style={{ marginBottom: 8, fontSize: 12, color: '#6b7280' }}>Animated (Default)</View>
        <Skeleton variant="text" lines={3} width="100%" animated={true} />
      </View>

      <View>
        <View style={{ marginBottom: 8, fontSize: 12, color: '#6b7280' }}>Static (No Animation)</View>
        <Skeleton variant="text" lines={3} width="100%" animated={false} />
      </View>
    </View>
  ),
};

export const CustomColors: Story = {
  render: () => (
    <View style={{ padding: 20, gap: 24 }}>
      <View>
        <View style={{ marginBottom: 8, fontSize: 12, color: '#6b7280' }}>Default Color (#eaebed)</View>
        <Skeleton variant="rectangle" width="100%" height={80} />
      </View>

      <View>
        <View style={{ marginBottom: 8, fontSize: 12, color: '#6b7280' }}>Custom Color (#d6d9dd)</View>
        <Skeleton variant="rectangle" width="100%" height={80} color="#d6d9dd" />
      </View>

      <View>
        <View style={{ marginBottom: 8, fontSize: 12, color: '#6b7280' }}>Light Color (#f5f6f7)</View>
        <Skeleton variant="rectangle" width="100%" height={80} color="#f5f6f7" />
      </View>
    </View>
  ),
};

export const CustomBorderRadius: Story = {
  render: () => (
    <View style={{ padding: 20, gap: 24 }}>
      <View>
        <View style={{ marginBottom: 8, fontSize: 12, color: '#6b7280' }}>No Radius (0px)</View>
        <Skeleton variant="rectangle" width="100%" height={80} borderRadius={0} />
      </View>

      <View>
        <View style={{ marginBottom: 8, fontSize: 12, color: '#6b7280' }}>Small Radius (4px)</View>
        <Skeleton variant="rectangle" width="100%" height={80} borderRadius={4} />
      </View>

      <View>
        <View style={{ marginBottom: 8, fontSize: 12, color: '#6b7280' }}>Large Radius (20px)</View>
        <Skeleton variant="rectangle" width="100%" height={80} borderRadius={20} />
      </View>
    </View>
  ),
};
