import { ComponentProps, ElementRef, ElementType, forwardRef, LegacyRef, Ref } from 'react';
import * as styles from '@/design-system/components/Box/Box.css';
import { ScrollView, StyleProp, View, ViewStyle } from 'react-native';
import { SafeAreaView } from '@/design-system/components/Box/SafeAreaView';
import { useTheme } from '@/design-system/providers/ThemeProvider/ThemeProvider';
import { PolymorphicComponentProps } from '@/design-system/types/utility';
import { Layout } from '@/design-system/components/Layout/Layout';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const elements = {
  view: View,
  scrollView: ScrollView,
  safeAreaView: SafeAreaView,
} as const;

type CustomElement = keyof typeof elements;

type BoxRef<T extends CustomElement> = ElementRef<(typeof elements)[T]>;

const BoxPrimitive = forwardRef(function BoxPrimitive<T extends CustomElement = 'view'>(
  {
    as,
    layout = 'hug',
    orientation = 'horizontal',
    gap,
    sideGap,
    paddingTop,
    paddingBottom,
    color,
    align,
    opacity,
    border,
    borderRadius,
    style,
    ...props
  }: PolymorphicComponentProps<typeof elements, T> & styles.BoxVariants,
  ref?: Ref<BoxRef<T>>,
) {
  const Element = elements[as ?? 'view'] as ElementType;
  const { tokens } = useTheme();
  const safeArea = useSafeAreaInsets();
  const isContentStyle = as === 'scrollView';

  const combinedStyle = [
    styles.box({
      tokens,
      safeArea,
      layout: isContentStyle && layout === 'fill' ? 'scrollViewFill' : layout,
      orientation,
      gap,
      sideGap,
      paddingTop,
      paddingBottom,
      color,
      align,
      opacity,
      border,
      borderRadius,
    }),
    style,
  ] satisfies StyleProp<ViewStyle>;

  return (
    <Element
      ref={ref}
      {...(isContentStyle ? { contentContainerStyle: combinedStyle } : { style: combinedStyle })}
      {...props}
    />
  );
});

export type BoxPrimitiveProps<T extends CustomElement = 'view'> = PolymorphicComponentProps<
  typeof elements,
  T
> &
  styles.BoxVariants;

export type BoxProps<T extends CustomElement = 'view'> = (T extends 'scrollView'
  ? BoxPrimitiveProps<'scrollView'>
  : T extends 'view'
    ? BoxPrimitiveProps<'view'>
    : T extends 'safeAreaView'
      ? BoxPrimitiveProps<'safeAreaView'>
      : BoxPrimitiveProps<T>) &
  ComponentProps<typeof Layout> & {
    isPrimitive?: boolean;
  };

export const Box = forwardRef(function Box<T extends CustomElement = 'view'>(
  { isPrimitive, layout = 'hug', position, ...props }: BoxProps<T>,
  ref?: LegacyRef<View | ScrollView>,
) {
  if (isPrimitive) {
    return <BoxPrimitive ref={ref} layout={layout} {...props} />;
  }

  return (
    <Layout layout={layout} position={position}>
      <BoxPrimitive ref={ref} layout={layout} {...props} />
    </Layout>
  );
});

// Export for testing
export const _BoxPrimitiveForTesting = BoxPrimitive;
