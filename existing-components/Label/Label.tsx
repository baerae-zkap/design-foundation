import * as Slot from '@rn-primitives/slot';
import { ComponentProps, ComponentPropsWithRef, ElementRef, forwardRef } from 'react';
import { Pressable } from 'react-native';
import type {
  PressableRef,
  SlottablePressableProps,
  SlottableTextProps,
} from '@rn-primitives/types';
import type { ViewStyle } from 'react-native';
import { Layout } from '@/design-system/components/Layout/Layout';
import * as styles from '@/design-system/components/Label/Label.css';
import { useTheme } from '@/design-system/providers/ThemeProvider/ThemeProvider';
import { Typography } from '@/design-system/components/Typography/Typography';

type RootProps = Omit<SlottablePressableProps, 'children' | 'hitSlop' | 'style'> & {
  children: React.ReactNode;
  style?: ViewStyle;
};

export const Root = forwardRef<PressableRef, RootProps>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.Pressable : Pressable;

  return <Component ref={ref} {...props} />;
});

Root.displayName = 'Label.Root';

type TextProps = SlottableTextProps & {
  nativeID?: string;
  htmlFor?: string;
};

export const Text = forwardRef<
  ElementRef<typeof Typography>,
  TextProps & ComponentProps<typeof Typography>
>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.Text : Typography;

  return <Component ref={ref} {...props} />;
});

Text.displayName = 'Label.Text';

const LabelPrimitive = forwardRef<
  ElementRef<typeof Typography>,
  ComponentPropsWithRef<typeof Typography> & styles.LabelVariants
>(({ layout, disabled, ...props }, ref) => {
  const { tokens } = useTheme();

  return (
    <Root aria-disabled={disabled}>
      <Typography ref={ref} layout={layout} style={styles.label({ tokens, disabled })} {...props} />
    </Root>
  );
});

LabelPrimitive.displayName = 'LabelPrimitive';

export const Label = forwardRef<
  ElementRef<typeof LabelPrimitive>,
  ComponentProps<typeof LabelPrimitive> & ComponentProps<typeof Layout>
>(({ layout = 'hug', ...props }, ref) => {
  return (
    <Layout layout={layout}>
      <LabelPrimitive ref={ref} layout={layout} {...props} />
    </Layout>
  );
});

Label.displayName = 'Label';
