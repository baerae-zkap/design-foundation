import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Label } from '@/design-system/components/Label/Label';

const meta: Meta<typeof Label> = {
  component: Label,
  argTypes: {
    layout: {
      control: 'radio',
      options: ['hug', 'fillWidth'],
    },
  },
  args: {
    layout: 'hug',
    disabled: false,
    children: 'Renders an accessible label associated with controls',
  },
};

export default meta;

export const Default: StoryObj<typeof Label> = {
  render: (args) => <Label {...args} />,
};
