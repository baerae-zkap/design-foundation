/**
 * PushBadge Component (React Native)
 *
 * @description 알림, 새 메시지 등을 표시하는 작은 원형 뱃지입니다. 점만 표시하거나 숫자를 포함할 수 있습니다.
 * @see docs/components/PushBadge.md - AI용 상세 가이드
 *
 * @example
 * // Dot mode
 * <PushBadge />
 * <PushBadge size="large" color="blue" />
 *
 * // Count mode
 * <PushBadge count={5} />
 * <PushBadge count={99} color="green" />
 * <PushBadge count={150} maxCount={99} />
 */

import React, { forwardRef } from 'react';
import {
  View,
  Text,
  type ViewProps,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { colors, typography, radius } from '../../tokens';

export type PushBadgeSize = 'small' | 'medium' | 'large';
export type PushBadgeColor = 'danger' | 'primary' | 'success';

export interface PushBadgeProps extends Omit<ViewProps, 'style'> {
  /** 표시할 숫자 (제공 시 count 모드, 미제공 시 dot 모드) */
  count?: number;
  /** 크기 - dot 모드에만 적용 */
  size?: PushBadgeSize;
  /** 색상 테마 */
  color?: PushBadgeColor;
  /** 최대 표시 숫자 (이상일 경우 "99+" 등으로 표시) */
  maxCount?: number;
  /** 커스텀 배경 색상 (Montage Customize) */
  backgroundColor?: string;
  /** 커스텀 텍스트 색상 (Montage Customize) */
  typographyColor?: string;
  /** 오프셋 위치 조정 (Montage Customize) - 부모 요소 대비 배치용 */
  offset?: { x: number; y: number };
  /** 커스텀 스타일 */
  style?: ViewStyle;
  /** 테스트 ID */
  testID?: string;
  /** 접근성 라벨 */
  accessibilityLabel?: string;
}

// Size configurations (dot mode only)
const dotSizeConfig: Record<PushBadgeSize, number> = {
  small: 6,
  medium: 8,
  large: 10,
};

// Color configurations (Semantic Foundation tokens)
const colorConfig: Record<PushBadgeColor, string> = {
  danger: colors.content.error.default,
  primary: colors.content.brand.default,
  success: colors.content.success.default,
};

// Count mode: auto-sizing based on digit count
const getCountSize = (displayText: string): { size: number; fontSize: number; paddingX: number } => {
  const length = displayText.length;
  if (length === 1) {
    return { size: 16, fontSize: typography.fontSize['3xs'], paddingX: 0 }; // Perfect circle for single digit
  } else if (length === 2) {
    return { size: 18, fontSize: typography.fontSize['3xs'], paddingX: 4 }; // Slightly wider for two digits
  } else {
    return { size: 20, fontSize: typography.fontSize['3xs'] - 1, paddingX: 4 }; // "99+" format (9px)
  }
};

export const PushBadge = forwardRef<View, PushBadgeProps>(
  (
    {
      count,
      size = 'medium',
      color = 'danger',
      maxCount = 99,
      backgroundColor,
      typographyColor,
      offset,
      style,
      testID,
      accessibilityLabel,
      ...props
    },
    ref
  ) => {
    const bgColor = backgroundColor || colorConfig[color];
    const textColor = typographyColor || colors.content.base.onColor;
    const isDotMode = count === undefined;

    // Dot mode
    if (isDotMode) {
      const dotSize = dotSizeConfig[size];
      const dotStyle: ViewStyle = {
        width: dotSize,
        height: dotSize,
        borderRadius: radius.primitive.full, // 9999px (perfect circle)
        backgroundColor: bgColor,
        ...(offset && {
          position: 'absolute',
          top: offset.y,
          right: -offset.x,
        }),
      };

      return (
        <View
          ref={ref}
          testID={testID}
          accessibilityLabel={accessibilityLabel || 'notification indicator'}
          style={[dotStyle, style]}
          {...props}
        />
      );
    }

    // Count mode
    const displayText = count > maxCount ? `${maxCount}+` : count.toString();
    const countSizeConfig = getCountSize(displayText);

    const containerStyle: ViewStyle = {
      minWidth: countSizeConfig.size,
      height: countSizeConfig.size,
      paddingHorizontal: countSizeConfig.paddingX,
      borderRadius: radius.primitive.full, // 9999px (perfect circle)
      backgroundColor: bgColor,
      justifyContent: 'center',
      alignItems: 'center',
      ...(offset && {
        position: 'absolute',
        top: offset.y,
        right: -offset.x,
      }),
    };

    const textStyle: TextStyle = {
      fontFamily: typography.fontFamily.numeric, // Spoqa Han Sans Neo for numbers
      fontSize: countSizeConfig.fontSize,
      fontWeight: typography.fontWeight.bold,
      lineHeight: countSizeConfig.size,
      color: textColor,
      textAlign: 'center',
    };

    return (
      <View
        ref={ref}
        testID={testID}
        accessibilityLabel={accessibilityLabel || `${displayText} notifications`}
        style={[containerStyle, style]}
        {...props}
      >
        <Text style={textStyle}>{displayText}</Text>
      </View>
    );
  }
);

PushBadge.displayName = 'PushBadge';
