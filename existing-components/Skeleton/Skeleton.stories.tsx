import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Skeleton } from '@/design-system/components/Skeleton/Skeleton';

const meta: Meta<typeof Skeleton> = {
  component: Skeleton,
  argTypes: {
    layout: {
      control: 'radio',
      options: ['fillWidth', 'fillHeight', 'fill', 'hug'],
    },
    shape: {
      control: 'radio',
      options: ['undefined', 'rectangle', 'circle'],
    },
    width: {
      control: 'number',
      description: 'layout 보다 우선순위가 높다.',
    },
    height: {
      control: 'number',
      description: 'layout 보다 우선순위가 높다.',
    },
    delay: {
      description: 'ms',
    },
  },
  args: {
    layout: 'fill',
    shape: 'rectangle',
    width: 100,
    height: 100,
    delay: 1000,
  },
};

export default meta;

export const Default: StoryObj<typeof Skeleton> = {
  render: (args) => <Skeleton {...args} />,
};
