import { ComponentProps } from 'react';
import { Text } from 'react-native';
import { useTheme } from '@/design-system/providers/ThemeProvider/ThemeProvider';
import * as TabsPrimitive from '@rn-primitives/tabs';
import * as styles from '@/design-system/components/TempTab/TempTab.css';

export const Root = ({ style, ...props }: ComponentProps<typeof TabsPrimitive.Root>) => {
  return <TabsPrimitive.Root style={[styles.root(), style]} {...props} />;
};

export const List = ({ style, ...props }: ComponentProps<typeof TabsPrimitive.List>) => {
  const { tokens } = useTheme();

  return <TabsPrimitive.List style={[styles.list({ tokens }), style]} {...props} />;
};

export const Trigger = ({
  value,
  children,
  disabled,
  onPress,
  style,
  ...props
}: ComponentProps<typeof TabsPrimitive.Trigger>) => {
  const { tokens } = useTheme();
  const { value: rootValue } = TabsPrimitive.useRootContext();
  const isFocused = rootValue === value;

  return (
    <TabsPrimitive.Trigger
      value={value}
      disabled={disabled}
      onPress={onPress}
      style={[styles.trigger({ tokens, isFocused }), style]}
      {...props}
    >
      {typeof children === 'string' ? (
        <Text style={styles.triggerText({ tokens, isFocused })}>{children}</Text>
      ) : (
        children
      )}
    </TabsPrimitive.Trigger>
  );
};

export const Content = ({ style, ...props }: ComponentProps<typeof TabsPrimitive.Content>) => {
  return <TabsPrimitive.Content style={[styles.content(), style]} {...props} />;
};

Content.displayName = 'TempTab.Content';
