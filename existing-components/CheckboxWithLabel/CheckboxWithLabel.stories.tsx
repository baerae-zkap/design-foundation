import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { CheckboxWithLabel } from '@/design-system/components/CheckboxWithLabel/CheckboxWithLabel';

const meta: Meta<typeof CheckboxWithLabel> = {
  component: CheckboxWithLabel,
  argTypes: {},
  args: {
    disabled: false,
  },
};

export default meta;

export const Default: StoryObj<typeof CheckboxWithLabel> = {
  render: (args) => <CheckboxWithLabel {...args}>Checkbox With Label</CheckboxWithLabel>,
};
