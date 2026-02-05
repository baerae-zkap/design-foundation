import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import * as TooltipPrimitive from '@rn-primitives/tooltip';
import * as styles from '@/design-system/components/Tooltip/Tooltip.css';
import { View, Text } from 'react-native';
import { useTheme } from '@/design-system/providers/ThemeProvider/ThemeProvider';

export const Root = forwardRef<
  ElementRef<typeof TooltipPrimitive.Root>,
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Root>
>(({ ...props }, ref) => {
  return <TooltipPrimitive.Root ref={ref} {...props} />;
});

Root.displayName = 'Tooltip.Root';

export const Trigger = forwardRef<
  ElementRef<typeof TooltipPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger>
>(({ ...props }, ref) => {
  return <TooltipPrimitive.Trigger ref={ref} {...props} />;
});

Trigger.displayName = 'Tooltip.Trigger';

export const Content = forwardRef<
  ElementRef<typeof TooltipPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> &
    styles.ContentVariants &
    styles.TextVariants
>(({ children, color = 'baseDefault', side = 'bottom', sideOffset = 12, ...props }, ref) => {
  const { tokens } = useTheme();

  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content ref={ref} side={side} sideOffset={sideOffset} {...props}>
        <View style={styles.content({ tokens, color })}>
          {typeof children === 'string' ? (
            <Text style={styles.text({ tokens, color })}>{children}</Text>
          ) : (
            children
          )}
        </View>
        <Arrow color={color} side={side} />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
});

Content.displayName = 'Tooltip.Content';

export const StaticContent = forwardRef<
  ElementRef<typeof View>,
  ComponentPropsWithoutRef<typeof View> & styles.ArrowWrapperVariants & styles.TextVariants
>(({ children, color = 'baseDefault', side = 'bottom', ...props }, ref) => {
  const { tokens } = useTheme();

  return (
    <View ref={ref} {...props}>
      <View style={styles.content({ tokens, color })}>
        {typeof children === 'string' ? (
          <Text style={styles.text({ tokens, color })}>{children}</Text>
        ) : (
          children
        )}
      </View>
      <Arrow color={color} side={side} />
    </View>
  );
});

StaticContent.displayName = 'Tooltip.StaticContent';

export const Arrow = forwardRef<
  ElementRef<typeof View>,
  ComponentPropsWithoutRef<typeof View> & styles.ContentVariants & styles.ArrowWrapperVariants
>(({ color = 'baseDefault', side = 'top', ...props }, ref) => {
  const { tokens } = useTheme();

  const arrowSides = {
    bottom: 'top',
    top: 'bottom',
    left: 'right',
    right: 'left',
  } satisfies Record<
    NonNullable<styles.ArrowWrapperVariants['side']>,
    styles.ArrowWrapperVariants['side']
  >;

  const arrowSide = arrowSides[side];

  return (
    <View ref={ref} style={styles.arrowWrapper({ side: arrowSide })} {...props}>
      <View style={styles.arrow({ tokens, color })} />
    </View>
  );
});

Arrow.displayName = 'Tooltip.Arrow';
