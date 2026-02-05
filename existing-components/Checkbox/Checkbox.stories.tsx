import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Checkbox } from '@/design-system/components/Checkbox/Checkbox';

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  argTypes: {},
  args: {
    disabled: false,
  },
};

export default meta;

export const Default: StoryObj<typeof Checkbox> = {
  render: (args) => <Checkbox {...args} />,
};
