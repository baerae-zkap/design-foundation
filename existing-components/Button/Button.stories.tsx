import { Button } from '@/design-system/components/Button/Button';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { fn } from 'storybook/test';

const meta = {
  component: Button,
  argTypes: {
    layout: {
      control: 'radio',
      options: ['hug', 'fill', 'fillWidth', 'fillHeight'],
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large', 'xLarge'],
    },
    color: {
      control: 'radio',
      options: [
        'brandDefault',
        'brandSecondary',
        'baseContainer',
        'successDefault',
        'dangerDefault',
      ],
    },
    buttonType: {
      control: 'radio',
      options: ['filled', 'outlined', 'plain'],
    },
  },
  args: {
    onPress: fn(),
    isLoading: false,
    disabled: false,
    layout: 'hug',
    size: 'medium',
    color: 'brandDefault',
    buttonType: 'filled',
    children: 'Button',
  },
  decorators: [
    (Story) => (
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 200,
          height: 200,
          backgroundColor: 'gray',
        }}
      >
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Button>;

export default meta;

export const Default: StoryObj<typeof Button> = {
  args: {
    layout: 'fillWidth',
  },

  render: ({ children, ...args }) => <Button {...args}>{children}</Button>,
};
