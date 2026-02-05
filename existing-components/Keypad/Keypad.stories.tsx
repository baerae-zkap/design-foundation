import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import * as Keypad from '@/design-system/components/Keypad/Keypad';
import { ComponentProps, useState } from 'react';
import { View } from 'react-native';

const meta: Meta<typeof Keypad.Provider> = {
  component: Keypad.Provider,
  argTypes: {
    maxLength: {
      control: 'number',
    },
  },
  args: {
    maxLength: 4,
  },
};

export default meta;

const DefaultExample = (args: ComponentProps<typeof Keypad.Provider>) => {
  const [value, setValue] = useState('');

  return (
    <Keypad.Provider value={value} onValueChange={setValue} {...args}>
      <View>
        <Keypad.PasswordIndicator />
        <Keypad.NumberKeypad spareKeyValue="." isShuffle />
      </View>
    </Keypad.Provider>
  );
};

export const Default: StoryObj<typeof Keypad.Provider> = {
  render: (args) => <DefaultExample {...args} />,
};
