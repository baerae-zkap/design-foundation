/**
 * ContentBadge Component (React Native)
 *
 * @description 콘텐츠의 상태, 카테고리, 라벨을 표시하는 비인터랙티브 요소입니다.
 * @see docs/components/ContentBadge.md - AI용 상세 가이드
 *
 * @example
 * <ContentBadge color="brandDefault">NEW</ContentBadge>
 * <ContentBadge color="errorDefault" variant="outlined">품절</ContentBadge>
 * <ContentBadge color="successDefault" dot>진행중</ContentBadge>
 */

import React, { forwardRef, type ReactNode } from 'react';
import {
  View,
  Text,
  type ViewProps,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { colors, palette } from '../tokens/colors';
import { spacing } from '../tokens/spacing';
import { radius } from '../tokens/radius';
import { typography } from '../tokens/typography';

export type ContentBadgeVariant = 'filled' | 'outlined' | 'subtle';
export type ContentBadgeColor = 'brandDefault' | 'baseDefault' | 'successDefault' | 'errorDefault' | 'warningDefault' | 'infoDefault';
export type ContentBadgeSize = 'small' | 'medium' | 'large';

export interface ContentBadgeProps extends Omit<ViewProps, 'style'> {
  /** 스타일 변형 - filled(채움), outlined(테두리), subtle(연한 배경) */
  variant?: ContentBadgeVariant;
  /** 색상 테마 */
  color?: ContentBadgeColor;
  /** 크기 */
  size?: ContentBadgeSize;
  /** 상태 점 표시 */
  dot?: boolean;
  /** 좌측 아이콘 */
  leftIcon?: ReactNode;
  /** Badge 텍스트 */
  children?: ReactNode;
  /** 커스텀 스타일 */
  style?: ViewStyle;
  /** 테스트 식별자 */
  testID?: string;
  /** 접근성 라벨 */
  accessibilityLabel?: string;
}

// Size configurations
const sizeConfig: Record<ContentBadgeSize, { height: number; fontSize: number; paddingX: number; dotSize: number; iconSize: number }> = {
  small: { height: 18, fontSize: typography.fontSize['3xs'], paddingX: spacing.primitive[2], dotSize: 4, iconSize: 10 }, // paddingX: 8px (was 6)
  medium: { height: 22, fontSize: typography.fontSize.xs, paddingX: spacing.primitive[2], dotSize: 6, iconSize: 12 }, // 8px
  large: { height: 26, fontSize: typography.fontSize.sm, paddingX: spacing.primitive[3], dotSize: 6, iconSize: 14 }, // paddingX: 12px (was 10)
};

// Color configurations
const colorConfig: Record<ContentBadgeColor, {
  filled: { bg: string; text: string };
  outlined: { bg: string; border: string; text: string };
  subtle: { bg: string; text: string };
}> = {
  brandDefault: {
    filled: {
      bg: colors.surface.brand.default,      // palette.blue[50] = '#0066ff'
      text: colors.content.base.onColor,     // palette.static.white = '#ffffff'
    },
    outlined: {
      bg: 'transparent',
      border: colors.border.brand.default,   // palette.blue[50] = '#0066ff'
      text: colors.content.brand.default,    // palette.blue[50] = '#0066ff'
    },
    subtle: {
      bg: colors.surface.brand.secondary,    // palette.blue[95] = '#e3ecff'
      text: palette.blue[40],                // More saturated blue
    },
  },
  baseDefault: {
    filled: {
      bg: palette.grey[50],                  // colors.content.base.secondary = '#68707a'
      text: colors.content.base.onColor,     // palette.static.white = '#ffffff'
    },
    outlined: {
      bg: 'transparent',
      border: colors.border.secondary.default, // palette.grey[90] = '#bcc1c7'
      text: palette.grey[40],                // Medium grey
    },
    subtle: {
      bg: colors.surface.base.container,     // palette.grey[97] = '#eaebed'
      text: colors.content.base.default,     // palette.grey[30] = '#3e4651'
    },
  },
  successDefault: {
    filled: {
      bg: palette.green[50],                 // colors.content.success.default = '#14b66b'
      text: colors.content.base.onColor,     // palette.static.white = '#ffffff'
    },
    outlined: {
      bg: 'transparent',
      border: colors.border.success.default, // palette.green[50] = '#14b66b'
      text: colors.content.success.default,  // palette.green[50] = '#14b66b'
    },
    subtle: {
      bg: colors.surface.success.default,    // palette.green[95] = '#dff8ef'
      text: palette.green[30],               // Dark green
    },
  },
  errorDefault: {
    filled: {
      bg: palette.red[50],                   // colors.content.error.default = '#dc2f2f'
      text: colors.content.base.onColor,     // palette.static.white = '#ffffff'
    },
    outlined: {
      bg: 'transparent',
      border: colors.border.error.default,   // palette.red[50] = '#dc2f2f'
      text: colors.content.error.default,    // palette.red[50] = '#dc2f2f'
    },
    subtle: {
      bg: colors.surface.error.default,      // palette.red[95] = '#fce8e8'
      text: palette.red[30],                 // Dark red
    },
  },
  warningDefault: {
    filled: {
      bg: palette.orange[40],                // Darker orange for filled
      text: colors.content.base.onColor,     // palette.static.white = '#ffffff'
    },
    outlined: {
      bg: 'transparent',
      border: palette.orange[50],            // colors.content.warning.default = '#ff9900'
      text: colors.content.warning.default,  // palette.orange[50] = '#ff9900'
    },
    subtle: {
      bg: colors.surface.warning.default,    // palette.orange[95] = '#fff2e3'
      text: palette.orange[30],              // Dark orange
    },
  },
  infoDefault: {
    filled: {
      bg: palette.cyan[40],                  // Darker cyan for filled
      text: colors.content.base.onColor,     // palette.static.white = '#ffffff'
    },
    outlined: {
      bg: 'transparent',
      border: palette.cyan[50],              // Light cyan
      text: colors.content.info.default,     // palette.teal[50] = '#14b6a8'
    },
    subtle: {
      bg: colors.surface.info.default,       // palette.blue[99] = '#f7f9ff'
      text: palette.cyan[30],                // Dark cyan
    },
  },
};

export const ContentBadge = forwardRef<View, ContentBadgeProps>(
  (
    {
      variant = 'filled',
      color = 'baseDefault',
      size = 'medium',
      dot = false,
      leftIcon,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const sizeStyle = sizeConfig[size];
    const colorStyle = colorConfig[color][variant];

    const containerStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.primitive[1], // 4px
      height: sizeStyle.height,
      paddingHorizontal: sizeStyle.paddingX,
      backgroundColor: colorStyle.bg,
      borderRadius: radius.component.badge.default, // 4px
      ...(variant === 'outlined' && {
        borderWidth: 1,
        borderColor: (colorStyle as { border: string }).border,
      }),
    };

    const textStyle: TextStyle = {
      fontFamily: typography.fontFamily.base,
      fontSize: sizeStyle.fontSize,
      fontWeight: typography.fontWeight.semibold,
      color: colorStyle.text,
    };

    const dotStyle: ViewStyle = {
      width: sizeStyle.dotSize,
      height: sizeStyle.dotSize,
      borderRadius: sizeStyle.dotSize / 2,
      backgroundColor: colorStyle.text,
    };

    return (
      <View ref={ref} style={[containerStyle, style]} {...props}>
        {/* Status Dot */}
        {dot && <View style={dotStyle} />}

        {/* Left Icon */}
        {leftIcon && !dot && (
          <View style={{ width: sizeStyle.iconSize, height: sizeStyle.iconSize }}>
            {React.isValidElement(leftIcon)
              ? React.cloneElement(leftIcon as React.ReactElement<{ color?: string; size?: number }>, {
                  color: colorStyle.text,
                  size: sizeStyle.iconSize,
                })
              : leftIcon}
          </View>
        )}

        {/* Label */}
        {typeof children === 'string' ? (
          <Text style={textStyle}>{children}</Text>
        ) : (
          children
        )}
      </View>
    );
  }
);

ContentBadge.displayName = 'ContentBadge';
