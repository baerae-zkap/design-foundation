import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Badge } from '@/design-system/components/Badge/Badge';

const meta: Meta<typeof Badge> = {
  component: Badge,
  argTypes: {
    layout: {
      control: 'radio',
      options: ['fill', 'hug', 'fillWidth', 'fillHeight'],
    },
    size: {
      control: 'radio',
      options: ['medium'],
    },
    shape: {
      control: 'radio',
      options: ['square', 'round', 'dot'],
    },
    color: {
      control: 'radio',
      options: ['successDefault', 'dangerDefault'],
    },
    badgeType: {
      control: 'radio',
      options: ['filled', 'outline'],
    },
    align: {
      control: 'radio',
      options: ['center', 'spaceBetween'],
    },
  },
  args: {
    layout: 'hug',
    size: 'medium',
    shape: 'square',
    color: 'successDefault',
    badgeType: 'filled',
    align: 'center',
  },
  decorators: (Story) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '200px',
        height: '200px',
        background: 'gray',
      }}
    >
      <Story />
    </div>
  ),
};

export default meta;

export const Default: StoryObj<typeof Badge> = {
  render: (args) => <Badge {...args}>Badge</Badge>,
};
