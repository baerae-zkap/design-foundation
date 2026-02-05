import { View } from 'react-native';
import * as styles from '@/design-system/components/Layout/Layout.css';
import { PropsWithChildren } from 'react';

export function Layout({
  children,
  layout,
  position,
  pointerEvents,
}: PropsWithChildren & styles.LayoutVariants) {
  return <View style={styles.layout({ layout, position, pointerEvents })}>{children}</View>;
}
