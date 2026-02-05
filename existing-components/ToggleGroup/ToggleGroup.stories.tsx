import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import * as ToggleGroup from '@/design-system/components/ToggleGroup/ToggleGroup';
import { ComponentProps, useState } from 'react';

const meta: Meta<typeof ToggleGroup.Root> = {
  component: ToggleGroup.Root,
  argTypes: {
    type: { control: 'radio', options: ['single', 'multiple'] },
    size: {
      control: 'radio',
      options: ['small'],
    },
  },
  args: {
    type: 'single',
    size: 'small',
  },
};

export default meta;

type ExampleValue = 'a' | 'b' | 'c';

const DefaultExample = (args: ComponentProps<typeof ToggleGroup.Root>) => {
  const [value, setValue] = useState<ExampleValue>('a');

  return (
    <ToggleGroup.Root
      {...args}
      type="single"
      value={value}
      onValueChange={(value?: string) => setValue((value as ExampleValue) ?? 'a')}
    >
      <ToggleGroup.Item value="a">SOL</ToggleGroup.Item>
      <ToggleGroup.Item value="b">ETH</ToggleGroup.Item>
      <ToggleGroup.Item value="c">USD</ToggleGroup.Item>
    </ToggleGroup.Root>
  );
};

export const Default: StoryObj<typeof ToggleGroup.Root> = {
  render: (args) => <DefaultExample {...args} />,
};
