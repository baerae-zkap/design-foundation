/**
 * TextButton Component (React Native)
 *
 * @description 텍스트 기반의 가벼운 액션 버튼입니다.
 * @see docs/components/TextButton.md - AI용 상세 가이드
 *
 * @example
 * <TextButton
 *   variant="clear"
 *   color="primary"
 *   size="medium"
 *   onPress={() => {}}
 * >
 *   더보기
 * </TextButton>
 */

import React, { forwardRef, useRef, useCallback, type ReactNode } from 'react';
import {
  Pressable,
  Text,
  View,
  Animated,
  StyleSheet,
  type PressableProps,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { ArrowRight } from 'lucide-react-native';
import { LoadingDots } from './LoadingDots';
import { colors } from '../tokens/colors';
import { spacing } from '../tokens/spacing';
import { radius } from '../tokens/radius';
import { typography } from '../tokens/typography';

export type TextButtonVariant = 'clear' | 'underline' | 'arrow';
export type TextButtonColor = 'primary' | 'secondary' | 'danger';
export type TextButtonSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge';

export interface TextButtonProps extends Omit<PressableProps, 'style'> {
  /** 버튼 스타일 - clear(기본), underline(밑줄), arrow(화살표) */
  variant?: TextButtonVariant;
  /** 색상 테마 */
  color?: TextButtonColor;
  /** 텍스트 크기 */
  size?: TextButtonSize;
  /** 로딩 상태 */
  loading?: boolean;
  /** 선행 아이콘 (Montage anatomy) */
  leadingIcon?: ReactNode;
  /** 커스텀 컨텐츠 색상 - 텍스트와 아이콘 색상을 함께 오버라이드 (Montage Customize) */
  contentColor?: string;
  /** 버튼 텍스트 */
  children?: ReactNode;
  /** 커스텀 스타일 */
  style?: ViewStyle;
  /** 테스트 ID */
  testID?: string;
  /** 접근성 라벨 */
  accessibilityLabel?: string;
}

const sizeConfig: Record<TextButtonSize, { fontSize: number; lineHeight: number; iconSize: number }> = {
  xsmall: { fontSize: typography.fontSize.xs, lineHeight: typography.lineHeight.xs, iconSize: 14 },
  small: { fontSize: typography.fontSize.sm, lineHeight: typography.lineHeight.sm, iconSize: 16 },
  medium: { fontSize: typography.fontSize.md, lineHeight: typography.lineHeight.md, iconSize: 18 },
  large: { fontSize: typography.fontSize.lg, lineHeight: typography.lineHeight.lg, iconSize: 20 },
  xlarge: { fontSize: typography.fontSize.xl, lineHeight: typography.lineHeight.xl, iconSize: 22 },
  xxlarge: { fontSize: typography.fontSize['2xl'], lineHeight: typography.lineHeight['2xl'], iconSize: 24 },
};

const colorConfig: Record<TextButtonColor, { default: string; pressed: string; pressedBg: string }> = {
  primary: {
    default: colors.content.brand.default,
    pressed: colors.surface.brand.defaultPressed,
    pressedBg: colors.surface.brand.secondary,          // light blue
  },
  secondary: {
    default: colors.content.base.default,
    pressed: colors.content.base.strong,
    pressedBg: colors.surface.base.alternative,          // light gray
  },
  danger: {
    default: colors.content.error.default,
    pressed: colors.border.error.defaultPressed,
    pressedBg: colors.surface.error.default,             // light red
  },
};

export const TextButton = forwardRef<View, TextButtonProps>(
  (
    {
      variant = 'clear',
      color = 'primary',
      size = 'medium',
      disabled = false,
      loading = false,
      leadingIcon,
      contentColor,
      children,
      style,
      testID,
      accessibilityLabel,
      ...props
    },
    ref
  ) => {
    const sizeStyle = sizeConfig[size];
    const colorStyle = colorConfig[color];
    const pressAnim = useRef(new Animated.Value(0)).current;

    const handlePressIn = useCallback(() => {
      Animated.timing(pressAnim, {
        toValue: 1,
        duration: 120,
        useNativeDriver: false,
      }).start();
    }, [pressAnim]);

    const handlePressOut = useCallback(() => {
      Animated.timing(pressAnim, {
        toValue: 0,
        duration: 180,
        useNativeDriver: false,
      }).start();
    }, [pressAnim]);

    const animatedScale = pressAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.97],
    });

    return (
      <Pressable
        ref={ref}
        disabled={disabled || loading}
        testID={testID}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        accessibilityState={{ disabled: !!(disabled || loading), busy: !!loading }}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={style}
        {...props}
      >
        {({ pressed }) => (
          <Animated.View
            style={{
              flexDirection: 'row' as const,
              alignItems: 'center' as const,
              gap: spacing.primitive[1],
              paddingVertical: spacing.primitive[1],
              paddingHorizontal: spacing.primitive[2],
              borderRadius: radius.primitive.sm,
              overflow: 'hidden' as const,
              transform: [{ scale: disabled ? 1 : animatedScale }],
            }}
          >
            {/* Background layer with opacity animation */}
            <Animated.View
              style={{
                ...StyleSheet.absoluteFillObject,
                backgroundColor: colorStyle.pressedBg,
                opacity: disabled ? 0 : pressAnim,
              }}
            />
        {(() => {
          const resolvedColor = disabled
            ? colors.content.disabled.default
            : contentColor
            ? contentColor
            : (pressed ? colorStyle.pressed : colorStyle.default);

          return (
            <>
              {loading ? (
                <LoadingDots
                  color={contentColor || colorStyle.default}
                  size={sizeStyle.fontSize * 0.3}
                  gap={sizeStyle.fontSize * 0.2}
                />
              ) : (
                <>
                  {leadingIcon && (
                    React.isValidElement(leadingIcon)
                      ? React.cloneElement(leadingIcon as React.ReactElement<{ color?: string; size?: number }>, {
                          color: resolvedColor,
                          size: sizeStyle.iconSize,
                        })
                      : leadingIcon
                  )}
                  {typeof children === 'string' ? (
                    <Text
                      style={{
                        fontSize: sizeStyle.fontSize,
                        lineHeight: sizeStyle.lineHeight,
                        fontWeight: typography.fontWeight.medium,
                        fontFamily: typography.fontFamily.base,
                        color: resolvedColor,
                        textDecorationLine: variant === 'underline' ? 'underline' : 'none',
                      }}
                    >
                      {children}
                    </Text>
                  ) : (
                    children
                  )}
                  {variant === 'arrow' && (
                    <ArrowRight
                      size={sizeStyle.fontSize * 0.875}
                      color={resolvedColor}
                      strokeWidth={2}
                    />
                  )}
                </>
              )}
            </>
          );
        })()}
          </Animated.View>
        )}
      </Pressable>
    );
  }
);

TextButton.displayName = 'TextButton';
