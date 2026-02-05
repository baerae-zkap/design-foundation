import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import * as Tabs from '@/design-system/components/Tabs/Tabs';
import { Text } from 'react-native';

const meta: Meta<typeof Tabs.Root> = {
  component: Tabs.Root,
  argTypes: {},
  args: {},
};

export default meta;

export const Default: StoryObj<typeof Tabs.Root> = {
  render: (args) => (
    <Tabs.Root {...args}>
      <Tabs.List>
        <Tabs.Trigger value="tabA">Tab A</Tabs.Trigger>
        <Tabs.Trigger value="tabB">Tab B</Tabs.Trigger>
        <Tabs.Trigger value="tabC" disabled>
          Tab C
        </Tabs.Trigger>
        <Tabs.Trigger value="tabD">Tab D</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tabA">
        <Text>Content A</Text>
      </Tabs.Content>
      <Tabs.Content value="tabB">
        <Text>Content B</Text>
      </Tabs.Content>
      <Tabs.Content value="tabC">
        <Text>Content C</Text>
      </Tabs.Content>
      <Tabs.Content value="tabD">
        <Text>Content D</Text>
      </Tabs.Content>
    </Tabs.Root>
  ),
};
