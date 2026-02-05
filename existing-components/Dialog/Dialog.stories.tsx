import * as Dialog from '@/design-system/components/Dialog/Dialog';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Pressable, Text } from 'react-native';

const meta: Meta<typeof Dialog.Root> = {
  component: Dialog.Root,
  argTypes: {},
  args: {
    isHideOverlay: false,
  },
};

export default meta;

export const Default: StoryObj<typeof Dialog.Root> = {
  render: (args) => (
    <Dialog.Root {...args}>
      <Dialog.Trigger asChild>
        <Pressable>
          <Text>Show Dialog</Text>
        </Pressable>
      </Dialog.Trigger>
      <Dialog.Content size="medium">
        <Dialog.Header>
          <Dialog.Title>Title</Dialog.Title>
        </Dialog.Header>
        <Dialog.Body>
          <Dialog.Description>Description</Dialog.Description>
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.Close asChild>
            <Pressable>
              <Text>Close</Text>
            </Pressable>
          </Dialog.Close>
          <Pressable>
            <Text>OK</Text>
          </Pressable>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  ),
};
