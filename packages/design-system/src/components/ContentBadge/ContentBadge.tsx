/**
 * ContentBadge Component (Web)
 *
 * @description 콘텐츠의 상태, 카테고리, 라벨을 표시하는 비인터랙티브 요소입니다.
 * @see docs/components/ContentBadge.md - AI용 상세 가이드
 *
 * @example
 * <ContentBadge color="brandDefault">NEW</ContentBadge>
 * <ContentBadge color="errorDefault" variant="outlined">품절</ContentBadge>
 * <ContentBadge color="successDefault" dot>진행중</ContentBadge>
 */

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { typography } from '../../tokens/typography';

export type ContentBadgeVariant = 'filled' | 'outlined' | 'subtle';
export type ContentBadgeColor = 'brandDefault' | 'baseDefault' | 'successDefault' | 'errorDefault' | 'warningDefault' | 'infoDefault';
export type ContentBadgeSize = 'small' | 'medium' | 'large';

export interface ContentBadgeProps extends HTMLAttributes<HTMLSpanElement> {
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
}

// Size configurations
const sizeConfig: Record<ContentBadgeSize, { height: number; fontSize: number; paddingX: number; dotSize: number; iconSize: number }> = {
  small: { height: 18, fontSize: typography.fontSize.xs, paddingX: 6, dotSize: 4, iconSize: 10 },
  medium: { height: 22, fontSize: typography.fontSize.xs, paddingX: spacing.primitive[2], dotSize: 6, iconSize: 12 },
  large: { height: 26, fontSize: typography.fontSize.sm, paddingX: 10, dotSize: 6, iconSize: 14 },
};

// Color configurations
const colorConfig: Record<ContentBadgeColor, {
  filled: { bg: string; text: string };
  outlined: { bg: string; border: string; text: string };
  subtle: { bg: string; text: string };
}> = {
  brandDefault: {
    filled: {
      bg: colors.surface.brand.default,
      text: colors.content.base.onColor,
    },
    outlined: {
      bg: 'transparent',
      border: colors.border.brand.default,
      text: colors.content.brand.default,
    },
    subtle: {
      bg: colors.surface.brand.secondary,
      text: colors.content.brand.default,
    },
  },
  baseDefault: {
    filled: {
      bg: colors.content.base.secondary,
      text: colors.content.base.onColor,
    },
    outlined: {
      bg: 'transparent',
      border: colors.border.secondary.default,
      text: colors.content.base.secondary,
    },
    subtle: {
      bg: colors.surface.base.container,
      text: colors.content.base.default,
    },
  },
  successDefault: {
    filled: {
      bg: colors.surface.success.solid,
      text: colors.content.base.onColor,
    },
    outlined: {
      bg: 'transparent',
      border: colors.border.success.default,
      text: colors.content.success.default,
    },
    subtle: {
      bg: colors.surface.success.default,
      text: colors.content.success.strong,
    },
  },
  errorDefault: {
    filled: {
      bg: colors.surface.error.solid,
      text: colors.content.base.onColor,
    },
    outlined: {
      bg: 'transparent',
      border: colors.border.error.default,
      text: colors.content.error.default,
    },
    subtle: {
      bg: colors.surface.error.default,
      text: colors.content.error.default,
    },
  },
  warningDefault: {
    filled: {
      bg: colors.content.warning.default,
      text: colors.content.base.onColor,
    },
    outlined: {
      bg: 'transparent',
      border: colors.status.cautionary.border,
      text: colors.content.warning.default,
    },
    subtle: {
      bg: colors.status.cautionary.surface,
      text: colors.content.warning.strong,
    },
  },
  infoDefault: {
    filled: {
      bg: colors.content.info.default,
      text: colors.content.base.onColor,
    },
    outlined: {
      bg: 'transparent',
      border: colors.content.info.default,
      text: colors.content.info.default,
    },
    subtle: {
      bg: colors.surface.info.default,
      text: colors.content.info.strong,
    },
  },
};

export const ContentBadge = forwardRef<HTMLSpanElement, ContentBadgeProps>(
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

    const badgeStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.primitive[1],
      height: sizeStyle.height,
      padding: `0 ${sizeStyle.paddingX}px`,
      fontSize: sizeStyle.fontSize,
      fontWeight: typography.fontWeight.semibold,
      lineHeight: 1,
      color: colorStyle.text,
      backgroundColor: colorStyle.bg,
      border: variant === 'outlined'
        ? `1px solid ${(colorStyle as { border: string }).border}`
        : 'none',
      borderRadius: radius.primitive.xs,
      whiteSpace: 'nowrap',
      ...style,
    };

    // Dot color - same as text color
    const dotStyle: React.CSSProperties = {
      width: sizeStyle.dotSize,
      height: sizeStyle.dotSize,
      borderRadius: '50%',
      backgroundColor: colorStyle.text,
      flexShrink: 0,
    };

    return (
      <span ref={ref} style={badgeStyle} {...props}>
        {/* Status Dot */}
        {dot && <span style={dotStyle} />}

        {/* Left Icon */}
        {leftIcon && !dot && (
          <span style={{
            width: sizeStyle.iconSize,
            height: sizeStyle.iconSize,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            {leftIcon}
          </span>
        )}

        {/* Label */}
        {children}
      </span>
    );
  }
);

ContentBadge.displayName = 'ContentBadge';
