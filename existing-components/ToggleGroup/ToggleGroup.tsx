'use client';

import * as ToggleGroupPrimitive from '@rn-primitives/toggle-group';
import {
  ComponentPropsWithoutRef,
  createContext,
  ComponentRef,
  forwardRef,
  useContext,
  useMemo,
} from 'react';
import * as styles from '@/design-system/components/ToggleGroup/ToggleGroup.css';
import { Text } from 'react-native';
import { Layout } from '@/design-system/components/Layout/Layout';
import { useTheme } from '@/design-system/providers/ThemeProvider/ThemeProvider';

const Context = createContext<styles.ItemVariants>({});

export const Root = forwardRef<
  ComponentRef<typeof ToggleGroupPrimitive.Root>,
  ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> & styles.ItemVariants
>(({ size = 'small', layout, children, ...props }, ref) => {
  const value = useMemo(() => ({ size, layout }), [size, layout]);

  return (
    <ToggleGroupPrimitive.Root ref={ref} style={styles.root({ layout })} {...props}>
      <Layout layout={layout}>
        <Context.Provider value={value}>{children}</Context.Provider>
      </Layout>
    </ToggleGroupPrimitive.Root>
  );
});

Root.displayName = ToggleGroupPrimitive.Root.displayName;

export const Item = forwardRef<
  ComponentRef<typeof ToggleGroupPrimitive.Item>,
  ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> & styles.ItemVariants
>(({ children, ...props }, ref) => {
  const { tokens } = useTheme();
  const context = useContext(Context);
  const { value } = ToggleGroupPrimitive.useRootContext();
  const isSelected = ToggleGroupPrimitive.utils.getIsSelected(value, props.value);

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      style={styles.item({ ...context, tokens, isSelected })}
      {...props}
    >
      {typeof children === 'string' ? (
        <Text style={styles.text({ tokens, isSelected })}>{children}</Text>
      ) : (
        children
      )}
    </ToggleGroupPrimitive.Item>
  );
});

Item.displayName = ToggleGroupPrimitive.Item.displayName;
