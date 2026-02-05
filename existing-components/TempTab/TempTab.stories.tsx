import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import * as TempTab from '@/design-system/components/TempTab/TempTab';
import { Text } from 'react-native';
import { ComponentProps, useState } from 'react';

const meta: Meta<typeof TempTab.Root> = {
  component: TempTab.Root,
  argTypes: {},
  args: {},
};

export default meta;

const DefaultExample = (args: ComponentProps<typeof TempTab.Root>) => {
  const [tabValue, setTabValue] = useState('tabA');

  return (
    <TempTab.Root {...args} value={tabValue} onValueChange={setTabValue}>
      <TempTab.List>
        <TempTab.Trigger value="tabA">Tab A</TempTab.Trigger>
        <TempTab.Trigger value="tabB">Tab B</TempTab.Trigger>
        <TempTab.Trigger value="tabC" disabled>
          Tab C
        </TempTab.Trigger>
        <TempTab.Trigger value="tabD">Tab D</TempTab.Trigger>
      </TempTab.List>
      <TempTab.Content value="tabA">
        <Text>Content A</Text>
      </TempTab.Content>
      <TempTab.Content value="tabB">
        <Text>Content B</Text>
      </TempTab.Content>
      <TempTab.Content value="tabC">
        <Text>Content C</Text>
      </TempTab.Content>
      <TempTab.Content value="tabD">
        <Text>Content D</Text>
      </TempTab.Content>
    </TempTab.Root>
  );
};

export const Default: StoryObj<typeof TempTab.Root> = {
  render: (args) => <DefaultExample {...args} />,
};
