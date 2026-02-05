/**
 * Button Component (React Native)
 *
 * @description 작업을 수행하는데 사용되는 탭 가능한 요소입니다.
 * @see docs/components/Button.md - AI용 상세 가이드
 *
 * @example
 * <Button
 *   buttonType="filled"
 *   color="brandDefault"
 *   size="medium"
 *   onPress={() => {}}
 * >
 *   확인
 * </Button>
 */

import React, { forwardRef, type ReactNode } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  type TouchableOpacityProps,
  type ViewStyle,
  type TextStyle,
} from 'react-native';

export type ButtonType = 'filled' | 'outlined';
export type ButtonColor =
  | 'brandDefault'
  | 'brandSecondary'
  | 'baseContainer'
  | 'successDefault'
  | 'errorDefault';
export type ButtonSize = 'small' | 'medium' | 'large' | 'xLarge';
export type ButtonLayout = 'hug' | 'fillWidth';

export interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  /** 버튼 스타일 - filled(채워진) 또는 outlined(테두리) */
  buttonType?: ButtonType;
  /** 색상 테마 */
  color?: ButtonColor;
  /** 버튼 크기 */
  size?: ButtonSize;
  /** 레이아웃 모드 - hug(내용에 맞춤) 또는 fillWidth(전체 너비) */
  layout?: ButtonLayout;
  /** 로딩 상태 */
  isLoading?: boolean;
  /** 좌측 콘텐츠 (아이콘 등) */
  leftContent?: ReactNode;
  /** 우측 콘텐츠 (아이콘 등) */
  rightContent?: ReactNode;
  /** 버튼 텍스트 */
  children?: ReactNode;
  /** 커스텀 스타일 */
  style?: ViewStyle;
}

const sizeConfig: Record<ButtonSize, { height: number; fontSize: number; paddingHorizontal: number }> = {
  small: { height: 36, fontSize: 14, paddingHorizontal: 16 },
  medium: { height: 40, fontSize: 14, paddingHorizontal: 16 },
  large: { height: 44, fontSize: 14, paddingHorizontal: 20 },
  xLarge: { height: 48, fontSize: 16, paddingHorizontal: 24 },
};

const colorConfig: Record<ButtonColor, { filled: { bg: string; text: string }; outlined: { bg: string; text: string; border: string } }> = {
  brandDefault: {
    filled: { bg: '#2563eb', text: '#ffffff' },
    outlined: { bg: '#ffffff', text: '#2563eb', border: '#2563eb' },
  },
  brandSecondary: {
    filled: { bg: '#dbeafe', text: '#2563eb' },
    outlined: { bg: '#ffffff', text: '#2563eb', border: '#93c5fd' },
  },
  baseContainer: {
    filled: { bg: '#f1f5f9', text: '#334155' },
    outlined: { bg: '#ffffff', text: '#334155', border: '#cbd5e1' },
  },
  successDefault: {
    filled: { bg: '#22c55e', text: '#ffffff' },
    outlined: { bg: '#ffffff', text: '#16a34a', border: '#22c55e' },
  },
  errorDefault: {
    filled: { bg: '#ef4444', text: '#ffffff' },
    outlined: { bg: '#ffffff', text: '#dc2626', border: '#ef4444' },
  },
};

export const Button = forwardRef<View, ButtonProps>(
  (
    {
      buttonType = 'filled',
      color = 'brandDefault',
      size = 'medium',
      layout = 'hug',
      isLoading = false,
      disabled = false,
      leftContent,
      rightContent,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const sizeStyle = sizeConfig[size];
    const colorStyle = colorConfig[color][buttonType];
    const isDisabled = disabled || isLoading;

    const containerStyle: ViewStyle = {
      height: sizeStyle.height,
      paddingHorizontal: sizeStyle.paddingHorizontal,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      backgroundColor: isDisabled ? '#e2e8f0' : colorStyle.bg,
      ...(buttonType === 'outlined' && {
        borderWidth: 1,
        borderColor: isDisabled ? '#e2e8f0' : (colorStyle as { border: string }).border,
      }),
      ...(layout === 'fillWidth' && { width: '100%' }),
      opacity: isDisabled ? 0.5 : 1,
    };

    const textStyle: TextStyle = {
      fontSize: sizeStyle.fontSize,
      fontWeight: '600',
      color: isDisabled ? '#94a3b8' : colorStyle.text,
    };

    return (
      <TouchableOpacity
        ref={ref}
        disabled={isDisabled}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityState={{ disabled: isDisabled, busy: isLoading }}
        style={[containerStyle, style]}
        {...props}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color={colorStyle.text} />
        ) : (
          <>
            {leftContent}
            {typeof children === 'string' ? (
              <Text style={textStyle}>{children}</Text>
            ) : (
              children
            )}
            {rightContent}
          </>
        )}
      </TouchableOpacity>
    );
  }
);

Button.displayName = 'Button';
