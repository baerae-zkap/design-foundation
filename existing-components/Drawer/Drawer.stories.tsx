import * as Drawer from '@/design-system/components/Drawer/Drawer';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { ComponentProps, useRef } from 'react';
import { Text, Pressable } from 'react-native';

const meta: Meta<typeof Drawer.Root> = {
  component: Drawer.Root,
  argTypes: {},
  args: {},
};

export default meta;

const DefaultExample = (args: ComponentProps<typeof Drawer.Root>) => {
  return (
    <Drawer.Root {...args}>
      <Drawer.Trigger asChild>
        <Pressable>
          <Text>Open</Text>
        </Pressable>
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Box>
          <Text>Content</Text>
          <Drawer.Close asChild>
            <Pressable>
              <Text>Close</Text>
            </Pressable>
          </Drawer.Close>
        </Drawer.Box>
      </Drawer.Content>
    </Drawer.Root>
  );
};

export const Default: StoryObj<typeof Drawer.Root> = {
  render: (args) => <DefaultExample {...args} />,
};

const RefExample = (args: ComponentProps<typeof Drawer.Root>) => {
  const drawerRef = useRef<BottomSheetModal>(null);

  return (
    <Drawer.Root ref={drawerRef} {...args}>
      <Drawer.Trigger asChild>
        <Pressable>
          <Text>Open</Text>
        </Pressable>
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Box>
          Content
          <Drawer.Close asChild>
            <Pressable>
              <Text>Close</Text>
            </Pressable>
          </Drawer.Close>
        </Drawer.Box>
      </Drawer.Content>
    </Drawer.Root>
  );
};

export const Ref: StoryObj<typeof Drawer.Root> = {
  render: (args) => <RefExample {...args} />,
};
