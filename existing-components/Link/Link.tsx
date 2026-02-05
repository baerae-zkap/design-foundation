import { ComponentProps } from 'react';
import { Link as LinkPrimitive } from 'expo-router';
import { Pressable } from 'react-native';
import * as styles from '@/design-system/components/Link/Link.css';
import { Layout } from '@/design-system/components/Layout/Layout';

export function Link({
  children,
  asChild,
  layout = 'hug',
  ...props
}: ComponentProps<typeof LinkPrimitive> &
  ComponentProps<typeof Layout> &
  styles.PressableVariants) {
  return (
    <LinkPrimitive asChild {...props}>
      {asChild ? (
        children
      ) : (
        <Pressable style={styles.pressable()}>
          <Layout layout={layout}>{children}</Layout>
        </Pressable>
      )}
    </LinkPrimitive>
  );
}
