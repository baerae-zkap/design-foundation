import * as Tooltip from '@/design-system/components/Tooltip/Tooltip';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Text } from 'react-native';

const meta: Meta<typeof Tooltip.Content> = {
  component: Tooltip.Content,
  argTypes: {
    color: {
      control: 'radio',
      options: ['brandDefault', 'baseDefault', 'dangerDefault'],
    },
    side: {
      control: 'radio',
      options: ['top', 'bottom', 'left', 'right'],
    },
  },
  args: {
    color: 'baseDefault',
    side: 'bottom',
  },
};

export default meta;

export const Default: StoryObj<typeof Tooltip.Content> = {
  render: (args) => (
    <Tooltip.Root>
      <Tooltip.Trigger>
        <Text>Default tooltip trigger</Text>
      </Tooltip.Trigger>
      <Tooltip.Content {...args}>
        <Text>Default tooltip</Text>
      </Tooltip.Content>
    </Tooltip.Root>
  ),
};

export const StaticContent: StoryObj<typeof Tooltip.StaticContent> = {
  render: (args) => (
    <Tooltip.StaticContent {...args}>
      <Text>Static tooltip</Text>
    </Tooltip.StaticContent>
  ),
};
