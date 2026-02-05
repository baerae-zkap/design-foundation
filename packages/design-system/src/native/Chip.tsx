/**
 * Chip Component (React Native)
 *
 * @description 입력, 속성, 액션을 나타내는 컴팩트한 인터랙티브 요소입니다.
 * @see docs/components/Chip.md - AI용 상세 가이드
 *
 * @example
 * <Chip
 *   color="brandDefault"
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

export type ChipVariant = 'filled' | 'outlined';
export type ChipColor = 'brandDefault' | 'baseDefault' | 'successDefault' | 'errorDefault' | 'warningDefault';
export type ChipSize = 'small' | 'medium' | 'large';

export interface ChipProps extends Omit<PressableProps, 'style'> {
  /** 스타일 변형 - filled(채움), outlined(테두리) */
  variant?: ChipVariant;
  /** 색상 테마 */
  color?: ChipColor;
  /** 크기 */
  size?: ChipSize;
  /** 선택 상태 - 체크 아이콘 표시 (onClose가 없을 때) */
  selected?: boolean;
  /** 왼쪽 아이콘 */
  leftIcon?: ReactNode;
  /** 아바타 (leftIcon과 배타적) */
  avatar?: ReactNode;
  /** 닫기 버튼 핸들러 - 제공 시 X 버튼 표시 */
  onClose?: () => void;
  /** 닫기 아이콘 커스텀 */
  closeIcon?: ReactNode;
  /** Chip 텍스트 */
  children?: ReactNode;
  /** 커스텀 스타일 */
  style?: ViewStyle;
}

// Size configurations
const sizeConfig: Record<ChipSize, { height: number; fontSize: number; paddingX: number; iconSize: number }> = {
  small: { height: 24, fontSize: 12, paddingX: 8, iconSize: 14 },
  medium: { height: 32, fontSize: 14, paddingX: 12, iconSize: 18 },
  large: { height: 40, fontSize: 16, paddingX: 16, iconSize: 22 },
};

// Color configurations
const colorConfig: Record<ChipColor, {
  filled: { bg: string; bgPressed: string; bgSelected: string; text: string; textSelected: string };
  outlined: { bg: string; bgPressed: string; bgSelected: string; border: string; text: string; textSelected: string };
}> = {
  brandDefault: {
    filled: {
      bg: '#dbeafe',
      bgPressed: '#bfdbfe',
      bgSelected: '#2563eb',
      text: '#1e40af',
      textSelected: '#ffffff',
    },
    outlined: {
      bg: 'transparent',
      bgPressed: 'rgba(37, 99, 235, 0.08)',
      bgSelected: '#2563eb',
      border: '#2563eb',
      text: '#2563eb',
      textSelected: '#ffffff',
    },
  },
  baseDefault: {
    filled: {
      bg: '#f1f5f9',
      bgPressed: '#e2e8f0',
      bgSelected: '#334155',
      text: '#334155',
      textSelected: '#ffffff',
    },
    outlined: {
      bg: 'transparent',
      bgPressed: 'rgba(0, 0, 0, 0.04)',
      bgSelected: '#334155',
      border: '#cbd5e1',
      text: '#334155',
      textSelected: '#ffffff',
    },
  },
  successDefault: {
    filled: {
      bg: '#dcfce7',
      bgPressed: '#bbf7d0',
      bgSelected: '#16a34a',
      text: '#166534',
      textSelected: '#ffffff',
    },
    outlined: {
      bg: 'transparent',
      bgPressed: 'rgba(34, 197, 94, 0.08)',
      bgSelected: '#16a34a',
      border: '#22c55e',
      text: '#166534',
      textSelected: '#ffffff',
    },
  },
  errorDefault: {
    filled: {
      bg: '#fee2e2',
      bgPressed: '#fecaca',
      bgSelected: '#dc2626',
      text: '#991b1b',
      textSelected: '#ffffff',
    },
    outlined: {
      bg: 'transparent',
      bgPressed: 'rgba(239, 68, 68, 0.08)',
      bgSelected: '#dc2626',
      border: '#ef4444',
      text: '#991b1b',
      textSelected: '#ffffff',
    },
  },
  warningDefault: {
    filled: {
      bg: '#fef9c3',
      bgPressed: '#fef08a',
      bgSelected: '#ca8a04',
      text: '#854d0e',
      textSelected: '#ffffff',
    },
    outlined: {
      bg: 'transparent',
      bgPressed: 'rgba(234, 179, 8, 0.08)',
      bgSelected: '#ca8a04',
      border: '#eab308',
      text: '#854d0e',
      textSelected: '#ffffff',
    },
  },
};

export const Chip = forwardRef<View, ChipProps>(
  (
    {
      variant = 'filled',
      color = 'baseDefault',
      size = 'medium',
      selected = false,
      disabled = false,
      leftIcon,
      avatar,
      onClose,
      closeIcon,
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

      if (selected) {
        backgroundColor = colorStyle.bgSelected;
      } else if (pressed && !isDisabled) {
        backgroundColor = colorStyle.bgPressed;
      } else {
        backgroundColor = colorStyle.bg;
      }

      return {
        height: sizeStyle.height,
        paddingHorizontal: sizeStyle.paddingX,
        borderRadius: sizeStyle.height / 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        backgroundColor,
        ...(variant === 'outlined' && !selected && {
          borderWidth: 1,
          borderColor: isDisabled ? '#cbd5e1' : (colorStyle as { border: string }).border,
        }),
        opacity: isDisabled ? 0.5 : 1,
      };
    };

    const getTextStyle = (): TextStyle => ({
      fontSize: sizeStyle.fontSize,
      fontWeight: '500',
      color: isDisabled
        ? '#94a3b8'
        : (selected ? colorStyle.textSelected : colorStyle.text),
    });

    const getIconColor = (): string => {
      if (isDisabled) return '#94a3b8';
      return selected ? colorStyle.textSelected : colorStyle.text;
    };

    return (
      <Pressable
        ref={ref}
        disabled={isDisabled}
        accessibilityRole="button"
        accessibilityState={{ disabled: isDisabled ?? undefined, selected: selected ? true : undefined }}
        style={({ pressed }) => [getContainerStyle(pressed), style]}
        {...props}
      >
        {/* Avatar or Left Icon */}
        {avatar && (
          <View style={{ marginLeft: -4 }}>
            {avatar}
          </View>
        )}
        {!avatar && leftIcon && (
          <View style={{ width: sizeStyle.iconSize, height: sizeStyle.iconSize }}>
            {React.isValidElement(leftIcon)
              ? React.cloneElement(leftIcon as React.ReactElement<{ color?: string; size?: number }>, {
                  color: getIconColor(),
                  size: sizeStyle.iconSize,
                })
              : leftIcon}
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
          <View style={{ width: sizeStyle.iconSize, height: sizeStyle.iconSize, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: getIconColor(), fontSize: sizeStyle.iconSize * 0.8 }}>✓</Text>
          </View>
        )}

        {/* Close Button (for input type) */}
        {onClose && (
          <Pressable
            onPress={(e) => {
              e.stopPropagation();
              onClose();
            }}
            hitSlop={{ top: 8, bottom: 8, left: 4, right: 8 }}
            style={{ marginRight: -4 }}
          >
            {closeIcon || (
              <View style={{
                width: sizeStyle.iconSize,
                height: sizeStyle.iconSize,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Text style={{ color: getIconColor(), fontSize: sizeStyle.iconSize * 0.7 }}>✕</Text>
              </View>
            )}
          </Pressable>
        )}
      </Pressable>
    );
  }
);

Chip.displayName = 'Chip';
