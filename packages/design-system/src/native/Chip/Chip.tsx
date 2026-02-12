/**
 * Chip Component (React Native)
 *
 * @description 입력, 속성, 액션을 나타내는 컴팩트한 인터랙티브 요소입니다.
 * @see docs/components/Chip.md - AI용 상세 가이드
 *
 * @example
 * <Chip
 *   color="primary"
 *   selected={isSelected}
 *   onPress={() => toggleFilter()}
 * >
 *   전자제품
 * </Chip>
 */

import React, { forwardRef, type ReactNode } from 'react';
import {
  Pressable,
  Text,
  View,
  type PressableProps,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { Check, X } from 'lucide-react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { typography } from '../../tokens/typography';

export type ChipVariant = 'solid' | 'outlined';
export type ChipColor = 'primary' | 'secondary' | 'success' | 'danger';
export type ChipSize = 'small' | 'medium' | 'large';

export interface ChipProps extends Omit<PressableProps, 'style'> {
  /** 스타일 변형 - solid(채움), outlined(테두리) */
  variant?: ChipVariant;
  /** 색상 테마 */
  color?: ChipColor;
  /** 크기 */
  size?: ChipSize;
  /** 선택 상태 - 체크 아이콘 표시 (onClose가 없을 때) */
  selected?: boolean;
  /** 왼쪽 아이콘 (Leading icon) */
  leadingIcon?: ReactNode;
  /** 아바타 (leadingIcon과 배타적) */
  avatar?: ReactNode;
  /** 닫기 버튼 핸들러 - 제공 시 X 버튼 표시 */
  onClose?: () => void;
  /** 닫기 아이콘 커스텀 */
  closeIcon?: ReactNode;
  /** 커스텀 텍스트/아이콘 색상 (Montage Customize) */
  contentColor?: string;
  /** 커스텀 배경 색상 (Montage Customize) */
  backgroundColor?: string;
  /** 커스텀 선택/활성 배경 색상 (Montage Customize) */
  activeColor?: string;
  /** Chip 텍스트 */
  children?: ReactNode;
  /** 커스텀 스타일 */
  style?: ViewStyle;
  /** Test ID for testing */
  testID?: string;
  /** Accessibility label */
  accessibilityLabel?: string;
}

// Size configurations
const sizeConfig: Record<ChipSize, { height: number; fontSize: number; paddingX: number; iconSize: number }> = {
  small: { height: 30, fontSize: typography.fontSize.xs, paddingX: 10, iconSize: 14 },
  medium: { height: 34, fontSize: typography.fontSize.sm, paddingX: 12, iconSize: 18 },
  large: { height: 38, fontSize: typography.fontSize.md, paddingX: 16, iconSize: 22 },
};

// Color configurations - using Foundation tokens
const colorConfig: Record<ChipColor, {
  solid: { bg: string; bgPressed: string; bgSelected: string; text: string; textSelected: string };
  outlined: { bg: string; bgPressed: string; bgSelected: string; border: string; text: string; textSelected: string };
}> = {
  primary: {
    solid: {
      bg: colors.surface.brand.secondary, // #e3ecff (palette.blue.95)
      bgPressed: colors.surface.brand.secondaryPressed, // #c7dbff (palette.blue.90)
      bgSelected: colors.surface.brand.default, // #0066ff (palette.blue.50)
      text: colors.content.brand.default, // #0066ff (palette.blue.50)
      textSelected: colors.content.base.onColor, // #ffffff
    },
    outlined: {
      bg: 'transparent',
      bgPressed: 'rgba(0, 102, 255, 0.06)', // subtle brand pressed overlay
      bgSelected: colors.surface.brand.default, // #0066ff
      border: colors.border.solid.alternative, // lighter border
      text: colors.content.brand.default, // #0066ff
      textSelected: colors.content.base.onColor, // #ffffff
    },
  },
  secondary: {
    solid: {
      bg: colors.surface.base.container, // #eaebed (palette.grey.97)
      bgPressed: colors.surface.base.containerPressed, // #d6d9dd (palette.grey.95)
      bgSelected: colors.content.base.default, // #3e4651 (palette.grey.30)
      text: colors.content.base.default, // #3e4651
      textSelected: colors.content.base.onColor, // #ffffff
    },
    outlined: {
      bg: 'transparent',
      bgPressed: 'rgba(0, 0, 0, 0.04)', // base pressed overlay
      bgSelected: colors.content.base.default, // #3e4651
      border: colors.border.solid.alternative, // lighter border
      text: colors.content.base.default, // #3e4651
      textSelected: colors.content.base.onColor, // #ffffff
    },
  },
  success: {
    solid: {
      bg: colors.surface.success.default, // #dff8ef (palette.green.95)
      bgPressed: colors.surface.success.defaultPressed, // #b8f0da (palette.green.90)
      bgSelected: colors.content.success.default, // #14b66b (palette.green.50)
      text: colors.content.success.default, // #14b66b
      textSelected: colors.content.base.onColor, // #ffffff
    },
    outlined: {
      bg: 'transparent',
      bgPressed: 'rgba(20, 182, 107, 0.08)', // success pressed overlay
      bgSelected: colors.content.success.default, // #14b66b
      border: colors.border.success.default, // #14b66b (palette.green.50)
      text: colors.content.success.default, // #14b66b
      textSelected: colors.content.base.onColor, // #ffffff
    },
  },
  danger: {
    solid: {
      bg: colors.surface.error.default, // #fce8e8 (palette.red.95)
      bgPressed: colors.surface.error.defaultPressed, // #f8d1d1 (palette.red.90)
      bgSelected: colors.content.error.default, // #dc2f2f (palette.red.50)
      text: colors.content.error.default, // #dc2f2f
      textSelected: colors.content.base.onColor, // #ffffff
    },
    outlined: {
      bg: 'transparent',
      bgPressed: 'rgba(220, 47, 47, 0.08)', // error pressed overlay
      bgSelected: colors.content.error.default, // #dc2f2f
      border: colors.border.error.default, // #dc2f2f (palette.red.50)
      text: colors.content.error.default, // #dc2f2f
      textSelected: colors.content.base.onColor, // #ffffff
    },
  },
};

export const Chip = forwardRef<View, ChipProps>(
  (
    {
      variant = 'solid',
      color = 'secondary',
      size = 'medium',
      selected = false,
      disabled = false,
      leadingIcon,
      avatar,
      onClose,
      closeIcon,
      contentColor,
      backgroundColor: customBackgroundColor,
      activeColor,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const sizeStyle = sizeConfig[size];
    const colorStyle = colorConfig[color][variant];
    const isDisabled = disabled;

    const getContainerStyle = (pressed: boolean): ViewStyle => {
      let backgroundColor: string;

      // Custom color logic
      if (customBackgroundColor && !selected) {
        backgroundColor = customBackgroundColor;
      } else if (activeColor && selected) {
        backgroundColor = activeColor;
      } else if (selected) {
        backgroundColor = colorStyle.bgSelected;
      } else if (pressed && !isDisabled) {
        backgroundColor = colorStyle.bgPressed;
      } else {
        backgroundColor = colorStyle.bg;
      }

      return {
        height: sizeStyle.height,
        paddingHorizontal: sizeStyle.paddingX,
        borderRadius: radius.component.chip.pill, // 9999 for pill shape
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.primitive[1], // 4px
        backgroundColor,
        ...(variant === 'outlined' && !selected && {
          borderWidth: 1,
          borderColor: isDisabled ? colors.border.disabled.default : (colorStyle as { border: string }).border,
        }),
        opacity: isDisabled ? 0.5 : 1,
      };
    };

    const getTextStyle = (): TextStyle => ({
      fontSize: sizeStyle.fontSize,
      fontWeight: typography.fontWeight.medium,
      fontFamily: typography.fontFamily.base,
      color: contentColor || (isDisabled
        ? colors.content.disabled.default // palette.grey.80 (#a7adb5)
        : (selected ? colorStyle.textSelected : colorStyle.text)),
    });

    const getIconColor = (): string => {
      if (contentColor) return contentColor;
      if (isDisabled) return colors.content.disabled.default; // palette.grey.80 (#a7adb5)
      return selected ? colorStyle.textSelected : colorStyle.text;
    };

    return (
      <Pressable
        ref={ref}
        disabled={isDisabled}
        testID={props.testID}
        accessibilityRole="button"
        accessibilityLabel={props.accessibilityLabel}
        accessibilityState={{ disabled: isDisabled ?? undefined, selected: selected ? true : undefined }}
        style={({ pressed }) => [getContainerStyle(pressed), style]}
        {...props}
      >
        {/* Avatar or Leading Icon */}
        {avatar && (
          <View style={{ marginLeft: -spacing.primitive[1] }}>
            {avatar}
          </View>
        )}
        {!avatar && leadingIcon && (
          <View style={{ width: sizeStyle.iconSize, height: sizeStyle.iconSize }}>
            {React.isValidElement(leadingIcon)
              ? React.cloneElement(leadingIcon as React.ReactElement<{ color?: string; size?: number }>, {
                  color: getIconColor(),
                  size: sizeStyle.iconSize,
                })
              : leadingIcon}
          </View>
        )}

        {/* Label */}
        {typeof children === 'string' ? (
          <Text style={getTextStyle()}>{children}</Text>
        ) : (
          children
        )}

        {/* Selected Check Icon (for filter type) */}
        {selected && !onClose && (
          <Check size={sizeStyle.iconSize * 0.8} color={getIconColor()} strokeWidth={2.5} />
        )}

        {/* Close Button (for input type) */}
        {onClose && (
          <Pressable
            onPress={(e) => {
              e.stopPropagation();
              onClose();
            }}
            hitSlop={{
              top: spacing.primitive[2],
              bottom: spacing.primitive[2],
              left: spacing.primitive[1],
              right: spacing.primitive[2]
            }}
            style={{ marginRight: -spacing.primitive[1] }}
          >
            {closeIcon || (
              <X size={sizeStyle.iconSize * 0.7} color={getIconColor()} strokeWidth={2.5} />
            )}
          </Pressable>
        )}
      </Pressable>
    );
  }
);

Chip.displayName = 'Chip';
