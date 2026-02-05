import { ComponentProps, ElementType } from 'react';
import * as styles from '@/design-system/components/Typography/Typography.css';
import { Text } from 'react-native';
import { useTheme } from '@/design-system/providers/ThemeProvider/ThemeProvider';
import { PolymorphicComponentProps } from '@/design-system/types/utility';
import { Layout } from '@/design-system/components/Layout/Layout';

const elements = {
  text: Text,
} as const;

type CustomElement = keyof typeof elements;

export const TypographyPrimitive = <T extends CustomElement = 'text'>({
  as,
  layout = 'hug',
  typography = 'regular',
  color = 'baseDefault',
  isUnderline,
  isStrikeThrough,
  textAlign,
  size = 'base',
  style,
  ref,
  ...props
}: PolymorphicComponentProps<typeof elements, T> & styles.TypographyVariants) => {
  const Element = elements[as ?? 'text'] as ElementType;
  const { tokens } = useTheme();

  return (
    <Element
      ref={ref}
      style={[
        styles.typography({
          tokens,
          layout,
          typography,
          color,
          isUnderline,
          isStrikeThrough,
          textAlign,
          size,
        }),
        style,
      ]}
      {...props}
    />
  );
};

export function Typography<T extends CustomElement = 'text'>({
  layout = 'hug',
  ...props
}: ComponentProps<typeof TypographyPrimitive<T>> & ComponentProps<typeof Layout>) {
  return (
    <Layout layout={layout}>
      <TypographyPrimitive layout={layout} {...props} />
    </Layout>
  );
}
