import { ComponentProps, ElementRef, forwardRef } from 'react';
import * as styles from '@/design-system/components/Badge/Badge.css';
import { Text, View } from 'react-native';
import { Layout } from '@/design-system/components/Layout/Layout';
import { useTheme } from '@/design-system/providers/ThemeProvider/ThemeProvider';

const BadgePrimitive = forwardRef<View, ComponentProps<typeof View> & styles.BadgeVariants>(
  (
    { children, layout, color, size, shape = 'square', badgeType = 'filled', align, ...props },
    ref,
  ) => {
    const { tokens } = useTheme();

    return (
      <View
        ref={ref}
        style={styles.badge({ tokens, layout, color, size, shape, badgeType, align })}
        {...props}
      >
        {shape !== 'dot' && typeof children === 'string' && (
          <Text
            style={styles.text({
              tokens,
              size,
              color,
            })}
          >
            {children}
          </Text>
        )}
        {shape !== 'dot' && typeof children !== 'string' && children}
      </View>
    );
  },
);

BadgePrimitive.displayName = 'BadgePrimitive';

export const Badge = forwardRef<
  ElementRef<typeof BadgePrimitive>,
  ComponentProps<typeof BadgePrimitive> & ComponentProps<typeof Layout>
>(({ layout = 'hug', ...props }, ref) => {
  return (
    <Layout layout={layout}>
      <BadgePrimitive ref={ref} layout={layout} {...props} />
    </Layout>
  );
});

Badge.displayName = 'Badge';
