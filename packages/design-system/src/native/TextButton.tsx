/**
 * TextButton Component (React Native)
 *
 * @description 텍스트 기반의 가벼운 액션 버튼입니다.
 * @see docs/components/TextButton.md - AI용 상세 가이드
 *
 * @example
 * <TextButton
 *   variant="clear"
 *   color="brandDefault"
 *   size="medium"
 *   onPress={() => {}}
 * >
 *   더보기
 * </TextButton>
 */

import React, { forwardRef, type ReactNode } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  type TouchableOpacityProps,
  type ViewStyle,
  type TextStyle,
} from 'react-native';

export type TextButtonVariant = 'clear' | 'underline' | 'arrow';
export type TextButtonColor = 'brandDefault' | 'baseDefault' | 'errorDefault';
export type TextButtonSize = 'xSmall' | 'small' | 'medium' | 'large' | 'xLarge';

export interface TextButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  /** 버튼 스타일 - clear(기본), underline(밑줄), arrow(화살표) */
  variant?: TextButtonVariant;
  /** 색상 테마 */
  color?: TextButtonColor;
  /** 텍스트 크기 */
  size?: TextButtonSize;
  /** 버튼 텍스트 */
  children?: ReactNode;
  /** 커스텀 스타일 */
  style?: ViewStyle;
}

const sizeConfig: Record<TextButtonSize, number> = {
  xSmall: 12,
  small: 14,
  medium: 16,
  large: 18,
  xLarge: 20,
};

const colorConfig: Record<TextButtonColor, string> = {
  brandDefault: '#2563eb',
  baseDefault: '#334155',
  errorDefault: '#ef4444',
};

export const TextButton = forwardRef<View, TextButtonProps>(
  (
    {
      variant = 'clear',
      color = 'brandDefault',
      size = 'medium',
      disabled = false,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const fontSize = sizeConfig[size];
    const textColor = disabled ? '#94a3b8' : colorConfig[color];

    const containerStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      paddingVertical: 4,
      paddingHorizontal: 8,
    };

    const textStyle: TextStyle = {
      fontSize,
      fontWeight: '500',
      color: textColor,
      textDecorationLine: variant === 'underline' ? 'underline' : 'none',
    };

    return (
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityState={{ disabled }}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        style={[containerStyle, style]}
        {...props}
      >
        {typeof children === 'string' ? (
          <Text style={textStyle}>{children}</Text>
        ) : (
          children
        )}
        {variant === 'arrow' && (
          <ArrowIcon size={fontSize * 0.875} color={textColor} />
        )}
      </TouchableOpacity>
    );
  }
);

TextButton.displayName = 'TextButton';

// Simple arrow icon component
function ArrowIcon({ size, color }: { size: number; color: string }) {
  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: size, color, fontWeight: '300' }}>→</Text>
    </View>
  );
}
