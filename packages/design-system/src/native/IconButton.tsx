/**
 * IconButton Component (React Native)
 *
 * @description 아이콘만으로 구성된 원형 버튼입니다.
 * @see docs/components/IconButton.md - AI용 상세 가이드
 *
 * @example
 * <IconButton
 *   variant="solid"
 *   color="primary"
 *   size="medium"
 *   onPress={() => {}}
 *   testID="my-icon-button"
 *   accessibilityLabel="Add item"
 * >
 *   <PlusIcon />
 * </IconButton>
 */

import React, { forwardRef, useRef, useCallback, type ReactNode } from 'react';
import { Pressable, View, Animated, StyleSheet, type PressableProps, type ViewStyle } from 'react-native';
import { colors } from '../tokens/colors';
import { radius } from '../tokens/radius';
import { spacing } from '../tokens/spacing';

export type IconButtonVariant = 'ghost' | 'solid' | 'outlined';
export type IconButtonColor = 'primary' | 'secondary' | 'danger';
export type IconButtonSize = 'small' | 'medium' | 'large';

export interface IconButtonProps extends Omit<PressableProps, 'children' | 'style'> {
  /** 버튼 스타일 - ghost(투명), solid(채워진), outlined(테두리) */
  variant?: IconButtonVariant;
  /** 색상 테마 */
  color?: IconButtonColor;
  /** 버튼 크기 */
  size?: IconButtonSize;
  /** 커스텀 아이콘 색상 (Montage Customize) */
  iconColor?: string;
  /** 커스텀 배경 색상 (Montage Customize) */
  backgroundColor?: string;
  /** 커스텀 테두리 색상 (Montage Customize) - outlined variant용 */
  borderColor?: string;
  /** 커스텀 아이콘 크기 (Toss pattern) */
  iconSize?: number;
  /** 아이콘 콘텐츠 */
  children: ReactNode;
  /** 커스텀 스타일 */
  style?: ViewStyle;
  /** 테스트 ID */
  testID?: string;
  /** 접근성 라벨 */
  accessibilityLabel?: string;
}

// Size: button size, icon size, border radius
const sizeStyles: Record<IconButtonSize, { size: number; iconSize: number; borderRadius: number }> = {
  small: { size: 32, iconSize: 18, borderRadius: radius.primitive.sm },   // 8px
  medium: { size: 40, iconSize: 22, borderRadius: radius.primitive.md },  // 12px
  large: { size: 48, iconSize: 26, borderRadius: radius.primitive.lg },   // 16px
};

const colorStyles: Record<IconButtonColor, {
  solid: { bg: string; bgPressed: string; color: string };
  ghost: { bg: string; bgPressed: string; color: string; colorPressed: string };
  outlined: { bg: string; bgPressed: string; color: string; border: string };
}> = {
  primary: {
    solid: {
      bg: colors.surface.brand.default,
      bgPressed: colors.surface.brand.defaultPressed,
      color: colors.content.base.onColor,
    },
    ghost: {
      bg: 'transparent',
      bgPressed: colors.fill.alternative, // grey.50 + 12% opacity
      color: colors.content.brand.default,
      colorPressed: colors.surface.brand.defaultPressed,
    },
    outlined: {
      bg: colors.surface.base.default,
      bgPressed: colors.surface.brand.secondary,
      color: colors.content.brand.default,
      border: colors.border.brand.default,
    },
  },
  secondary: {
    solid: {
      bg: colors.content.base.default,
      bgPressed: colors.content.base.strong,
      color: colors.content.base.onColor,
    },
    ghost: {
      bg: 'transparent',
      bgPressed: colors.fill.alternative, // grey.50 + 12% opacity
      color: colors.content.base.default,
      colorPressed: colors.content.base.strong,
    },
    outlined: {
      bg: colors.surface.base.default,
      bgPressed: colors.surface.base.alternative,
      color: colors.content.base.default,
      border: colors.border.base.default,
    },
  },
  danger: {
    solid: {
      bg: colors.content.error.default,
      bgPressed: colors.border.error.defaultPressed,
      color: colors.content.base.onColor,
    },
    ghost: {
      bg: 'transparent',
      bgPressed: colors.fill.alternative, // grey.50 + 12% opacity
      color: colors.content.error.default,
      colorPressed: colors.border.error.defaultPressed,
    },
    outlined: {
      bg: colors.surface.base.default,
      bgPressed: colors.surface.error.default,
      color: colors.content.error.default,
      border: colors.border.error.default,
    },
  },
};

// Helper to darken a color for pressed state
function darkenColor(color: string, amount: number = 0.1): string {
  // Simple darkening for pressed custom backgrounds
  // For hex colors, reduce RGB by amount
  if (color.startsWith('#')) {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const darkenValue = (val: number) => Math.max(0, Math.floor(val * (1 - amount)));

    const newR = darkenValue(r).toString(16).padStart(2, '0');
    const newG = darkenValue(g).toString(16).padStart(2, '0');
    const newB = darkenValue(b).toString(16).padStart(2, '0');

    return `#${newR}${newG}${newB}`;
  }
  return color;
}

export const IconButton = forwardRef<View, IconButtonProps>(
  (
    {
      variant = 'ghost',
      color = 'secondary',
      size = 'medium',
      disabled = false,
      iconColor: customIconColor,
      backgroundColor: customBackgroundColor,
      borderColor: customBorderColor,
      iconSize: customIconSize,
      children,
      style,
      testID,
      accessibilityLabel,
      ...props
    },
    ref
  ) => {
    const sizeStyle = sizeStyles[size];
    const colorStyle = colorStyles[color][variant];

    // Animation value for pressed state
    const pressAnim = useRef(new Animated.Value(0)).current;

    // Animated scale interpolation (1 → 0.97)
    const animatedScale = pressAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.97],
    });

    const handlePressIn = useCallback(() => {
      if (!disabled) {
        Animated.timing(pressAnim, {
          toValue: 1,
          duration: 120,
          useNativeDriver: false,
        }).start();
      }
    }, [disabled, pressAnim]);

    const handlePressOut = useCallback(() => {
      if (!disabled) {
        Animated.timing(pressAnim, {
          toValue: 0,
          duration: 180,
          useNativeDriver: false,
        }).start();
      }
    }, [disabled, pressAnim]);

    return (
      <Pressable
        ref={ref}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityState={{ disabled: !!disabled }}
        accessibilityLabel={accessibilityLabel}
        testID={testID}
        hitSlop={spacing.primitive[2]} // 8px
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={style}
        {...props}
      >
        {({ pressed }) => {
          // Determine base background color (non-pressed)
          let baseBgColor: string;
          let pressedBgColor: string;

          if (customBackgroundColor) {
            // Custom background
            baseBgColor = customBackgroundColor;
            pressedBgColor = darkenColor(customBackgroundColor);
          } else if (disabled) {
            // Disabled state
            if (variant === 'ghost') {
              baseBgColor = 'transparent';
              pressedBgColor = 'transparent';
            } else {
              baseBgColor = colors.surface.disabled.default;
              pressedBgColor = colors.surface.disabled.default;
            }
          } else if (variant === 'ghost') {
            const ghostStyle = colorStyle as typeof colorStyles.primary.ghost;
            baseBgColor = ghostStyle.bg;
            pressedBgColor = ghostStyle.bgPressed;
          } else if (variant === 'solid') {
            const solidStyle = colorStyle as typeof colorStyles.primary.solid;
            baseBgColor = solidStyle.bg;
            pressedBgColor = solidStyle.bgPressed;
          } else {
            const outlinedStyle = colorStyle as typeof colorStyles.primary.outlined;
            baseBgColor = outlinedStyle.bg;
            pressedBgColor = outlinedStyle.bgPressed;
          }

          const borderStyle = variant === 'outlined'
            ? {
                borderWidth: 1,
                borderColor: customBorderColor || (colorStyle as typeof colorStyles.primary.outlined).border
              }
            : {};

          const baseContainerStyle = {
            width: sizeStyle.size,
            height: sizeStyle.size,
            borderRadius: sizeStyle.borderRadius,
            backgroundColor: baseBgColor,
            alignItems: 'center' as const,
            justifyContent: 'center' as const,
            ...borderStyle,
          };

          // Determine icon color based on state
          let resolvedIconColor: string;

          if (customIconColor) {
            // Custom icon color
            resolvedIconColor = customIconColor;
          } else if (disabled) {
            // Disabled state
            resolvedIconColor = colors.content.disabled.default;
          } else if (variant === 'ghost' && pressed) {
            // Ghost pressed state
            const ghostStyle = colorStyle as typeof colorStyles.primary.ghost;
            resolvedIconColor = ghostStyle.colorPressed;
          } else {
            // Normal state
            resolvedIconColor = (colorStyle as typeof colorStyles.primary.solid).color;
          }

          const resolvedIconSize = customIconSize || sizeStyle.iconSize;

          return (
            <Animated.View
              style={[
                baseContainerStyle,
                {
                  transform: [{ scale: !disabled ? animatedScale : 1 }],
                  overflow: 'hidden',
                },
              ]}
            >
              {/* Pressed background overlay */}
              <Animated.View
                style={{
                  ...StyleSheet.absoluteFillObject,
                  backgroundColor: pressedBgColor,
                  opacity: !disabled ? pressAnim : 0,
                }}
              />

              {/* Icon */}
              <View
                style={{
                  width: resolvedIconSize,
                  height: resolvedIconSize,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {React.isValidElement(children)
                  ? React.cloneElement(children as React.ReactElement<{ color?: string; size?: number }>, {
                      color: resolvedIconColor,
                      size: resolvedIconSize,
                    })
                  : children}
              </View>
            </Animated.View>
          );
        }}
      </Pressable>
    );
  }
);

IconButton.displayName = 'IconButton';
