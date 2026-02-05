import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Lottie } from '@/design-system/components/Lottie/Lottie';

const meta: Meta<typeof Lottie> = {
  component: Lottie,
  args: {
    asset: 'loading',
  },
};

export default meta;

export const Default: StoryObj<typeof Lottie> = {
  render: (args) => <Lottie {...args} />,
};
