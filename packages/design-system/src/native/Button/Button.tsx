/**
 * Button Component (React Native)
 *
 * @description 작업을 수행하는데 사용되는 탭 가능한 요소입니다.
 * @see docs/components/Button.md - AI용 상세 가이드
 *
 * @example
 * <Button
 *   variant="solid"
 *   color="primary"
 *   size="medium"
 *   onPress={() => {}}
 * >
 *   확인
 * </Button>
 */

import React, { forwardRef, useRef, useCallback, type ReactNode } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  type PressableProps,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { LoadingDots } from '../LoadingDots/LoadingDots';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { typography } from '../../tokens/typography';

export type ButtonVariant = 'solid' | 'outlined' | 'weak';
export type ButtonColor = 'primary' | 'secondary' | 'assistive' | 'success' | 'danger';
export type ButtonSize = 'small' | 'medium' | 'large' | 'xlarge';
export type ButtonDisplay = 'inline' | 'block' | 'full';

export interface ButtonProps extends Omit<PressableProps, 'style'> {
  /** 버튼 변형 - solid(채움), outlined(테두리), weak(약한/반투명) */
  variant?: ButtonVariant;
  /** 색상 테마 */
  color?: ButtonColor;
  /** 버튼 크기 */
  size?: ButtonSize;
  /** 표시 방식 - inline(내용맞춤), block(줄바꿈 확장), full(부모 전체 너비) */
  display?: ButtonDisplay;
  /** 로딩 상태 */
  loading?: boolean;
  /** 선행 아이콘 (라벨 왼쪽) */
  leadingIcon?: ReactNode;
  /** 후행 아이콘 (라벨 오른쪽) */
  trailingIcon?: ReactNode;
  /** 아이콘 전용 모드 (정사각 버튼) */
  iconOnly?: boolean;
  /** 버튼 라벨 */
  children?: ReactNode;
  /** 커스텀 텍스트/아이콘 색상 (Montage customize) */
  contentColor?: string;
  /** 커스텀 배경색 */
  backgroundColor?: string;
  /** 커스텀 테두리 색상 (outlined에서만 적용) */
  borderColor?: string;
  /** 커스텀 스타일 */
  style?: ViewStyle;
  /** 테스트 ID */
  testID?: string;
  /** 접근성 라벨 */
  accessibilityLabel?: string;
}

interface SizeConfig {
  height: number;
  fontSize: number;
  paddingHorizontal: number;
  iconSize: number;
  borderRadius: number;
}

const sizeConfig: Record<ButtonSize, SizeConfig> = {
  small: {
    height: 36,
    fontSize: typography.fontSize.xs,
    paddingHorizontal: spacing.component.button.paddingX.xs,
    iconSize: 16,
    borderRadius: radius.component.button.sm,
  },
  medium: {
    height: 40,
    fontSize: typography.fontSize.sm,
    paddingHorizontal: spacing.component.button.paddingX.xs,
    iconSize: 18,
    borderRadius: radius.component.button.sm,
  },
  large: {
    height: 48,
    fontSize: typography.fontSize.sm,
    paddingHorizontal: spacing.component.button.paddingX.sm,
    iconSize: 20,
    borderRadius: radius.component.button.lg,
  },
  xlarge: {
    height: 52,
    fontSize: typography.fontSize.md,
    paddingHorizontal: spacing.component.button.paddingX.md,
    iconSize: 22,
    borderRadius: radius.component.button.lg,
  },
};

interface ColorConfigItem {
  background: string;
  backgroundPressed: string;
  text: string;
  border?: string;
}

const colorConfig: Record<ButtonVariant, Record<ButtonColor, ColorConfigItem>> = {
  solid: {
    primary: {
      background: colors.surface.brand.default,
      backgroundPressed: colors.surface.brand.defaultPressed,
      text: colors.content.base.onColor,
    },
    secondary: {
      background: colors.surface.brand.secondary,
      backgroundPressed: colors.surface.brand.secondaryPressed,
      text: colors.content.brand.default,
    },
    assistive: {
      background: colors.surface.base.container,
      backgroundPressed: colors.surface.base.containerPressed,
      text: colors.content.base.default,
    },
    success: {
      background: colors.surface.success.default,
      backgroundPressed: colors.surface.success.defaultPressed,
      text: colors.content.base.onColor,
    },
    danger: {
      background: colors.surface.error.default,
      backgroundPressed: colors.surface.error.defaultPressed,
      text: colors.content.base.onColor,
    },
  },
  outlined: {
    primary: {
      background: colors.surface.base.default,
      backgroundPressed: colors.surface.brand.secondary,
      text: colors.content.brand.default,
      border: colors.border.brand.default,
    },
    secondary: {
      background: colors.surface.base.default,
      backgroundPressed: colors.surface.brand.secondary,
      text: colors.content.brand.default,
      border: colors.border.brand.default,
    },
    assistive: {
      background: colors.surface.base.default,
      backgroundPressed: colors.surface.base.alternative,
      text: colors.content.base.default,
      border: colors.border.base.default,
    },
    success: {
      background: colors.surface.base.default,
      backgroundPressed: colors.surface.success.default,
      text: colors.content.success.default,
      border: colors.border.success.default,
    },
    danger: {
      background: colors.surface.base.default,
      backgroundPressed: colors.surface.error.default,
      text: colors.content.error.default,
      border: colors.border.error.default,
    },
  },
  weak: {
    primary: {
      background: 'rgba(0, 102, 255, 0.08)',
      backgroundPressed: 'rgba(0, 102, 255, 0.15)',
      text: colors.content.brand.default,
    },
    secondary: {
      background: 'rgba(0, 102, 255, 0.06)',
      backgroundPressed: 'rgba(0, 102, 255, 0.12)',
      text: colors.content.brand.default,
    },
    assistive: {
      background: colors.surface.base.alternative,
      backgroundPressed: colors.surface.base.container,
      text: colors.content.base.default,
    },
    success: {
      background: 'rgba(20, 182, 107, 0.08)',
      backgroundPressed: 'rgba(20, 182, 107, 0.15)',
      text: colors.content.success.default,
    },
    danger: {
      background: 'rgba(220, 47, 47, 0.08)',
      backgroundPressed: 'rgba(220, 47, 47, 0.15)',
      text: colors.content.error.default,
    },
  },
};

/**
 * Apply rgba(0, 0, 0, 0.1) overlay for custom color pressed state
 */
function applyPressedOverlay(color: string): string {
  // Simple darkening - in production, you'd parse the color properly
  return color;
}

export const Button = forwardRef<View, ButtonProps>(
  (
    {
      variant = 'solid',
      color = 'primary',
      size = 'medium',
      display = 'inline',
      loading = false,
      disabled = false,
      leadingIcon,
      trailingIcon,
      iconOnly = false,
      children,
      contentColor,
      backgroundColor,
      borderColor,
      style,
      testID,
      accessibilityLabel,
      ...props
    },
    ref
  ) => {
    const sizeStyle = sizeConfig[size];
    const colorStyle = colorConfig[variant][color];
    const isInteractive = !disabled && !loading;

    const pressAnim = useRef(new Animated.Value(0)).current;

    const handlePressIn = useCallback(() => {
      if (!isInteractive) return;
      Animated.timing(pressAnim, {
        toValue: 1,
        duration: 120,
        useNativeDriver: false,
      }).start();
    }, [isInteractive, pressAnim]);

    const handlePressOut = useCallback(() => {
      if (!isInteractive) return;
      Animated.timing(pressAnim, {
        toValue: 0,
        duration: 180,
        useNativeDriver: false,
      }).start();
    }, [isInteractive, pressAnim]);

    const animatedScale = pressAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.97],
    });

    const getContainerStyle = (pressed: boolean): ViewStyle => {
      const baseStyle: ViewStyle = {
        height: sizeStyle.height,
        borderRadius: sizeStyle.borderRadius,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.component.button.gap,
        overflow: 'hidden',
      };

      // Display mode: sizing handled on outer Pressable via getPressableStyle()
      // Inner container always fills its parent

      // Icon-only mode: square button
      if (iconOnly) {
        baseStyle.width = sizeStyle.height;
        baseStyle.paddingHorizontal = 0;
      } else {
        baseStyle.paddingHorizontal = sizeStyle.paddingHorizontal;
      }

      // Background color: disabled → gray, loading → keep original color
      if (disabled) {
        baseStyle.backgroundColor = colors.surface.disabled.default;
      } else if (backgroundColor) {
        baseStyle.backgroundColor = backgroundColor;
      } else {
        baseStyle.backgroundColor = colorStyle.background;
      }

      // Border (outlined variant)
      if (variant === 'outlined') {
        baseStyle.borderWidth = 1;
        if (disabled) {
          baseStyle.borderColor = colors.border.disabled.default;
        } else if (borderColor) {
          baseStyle.borderColor = borderColor;
        } else {
          baseStyle.borderColor = colorStyle.border;
        }
      }

      return baseStyle;
    };

    const getPressedBg = (): string => {
      if (backgroundColor) {
        return applyPressedOverlay(backgroundColor);
      }
      return colorStyle.backgroundPressed;
    };

    const textStyle: TextStyle = {
      fontSize: sizeStyle.fontSize,
      fontWeight: typography.fontWeight.semibold,
      fontFamily: typography.fontFamily.base,
      lineHeight: sizeStyle.fontSize * 1.25,
    };

    // Letter spacing for large/xlarge
    if (size === 'large' || size === 'xlarge') {
      textStyle.letterSpacing = -0.2;
    }

    // Text color: disabled → gray, loading/normal → original color
    if (disabled) {
      textStyle.color = colors.content.disabled.default;
    } else if (contentColor) {
      textStyle.color = contentColor;
    } else {
      textStyle.color = colorStyle.text;
    }

    const loadingDotsColor = contentColor || colorStyle.text;

    // Display mode sizing on outer Pressable (so user style can override)
    const pressableDisplayStyle: ViewStyle | undefined =
      display === 'inline'
        ? { alignSelf: 'flex-start' }
        : display === 'block' || display === 'full'
        ? { width: '100%' }
        : undefined;

    return (
      <Pressable
        ref={ref}
        disabled={!isInteractive}
        testID={testID}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        accessibilityState={{ disabled: !isInteractive, busy: loading }}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[pressableDisplayStyle, style]}
        {...props}
      >
        <Animated.View
          style={[
            getContainerStyle(false),
            {
              transform: [{ scale: isInteractive ? animatedScale : 1 }],
            },
          ]}
        >
          {/* Pressed background overlay */}
          <Animated.View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: getPressedBg(),
              opacity: isInteractive ? pressAnim : 0,
            }}
          />
          {loading ? (
            <LoadingDots color={loadingDotsColor} size={6} gap={6} />
          ) : (
            <>
              {leadingIcon}
              {!iconOnly && (
                typeof children === 'string' ? (
                  <Text style={textStyle}>{children}</Text>
                ) : (
                  children
                )
              )}
              {trailingIcon}
            </>
          )}
        </Animated.View>
      </Pressable>
    );
  }
);

Button.displayName = 'Button';
