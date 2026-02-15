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
import { cssVarColors } from '../../tokens/colors';
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
  small: { height: spacing.component.badge.height.sm, fontSize: typography.fontSize.xs, paddingX: spacing.component.badge.paddingX.sm, dotSize: spacing.component.badge.dotSize.sm, iconSize: spacing.component.badge.iconSize.sm },
  medium: { height: spacing.component.badge.height.md, fontSize: typography.fontSize.xs, paddingX: spacing.component.badge.paddingX.md, dotSize: spacing.component.badge.dotSize.md, iconSize: spacing.component.badge.iconSize.md },
  large: { height: spacing.component.badge.height.lg, fontSize: typography.fontSize.sm, paddingX: spacing.component.badge.paddingX.lg, dotSize: spacing.component.badge.dotSize.lg, iconSize: spacing.component.badge.iconSize.lg },
};

// Color configurations
const colorConfig: Record<ContentBadgeColor, {
  filled: { bg: string; text: string };
  outlined: { bg: string; border: string; text: string };
  subtle: { bg: string; text: string };
}> = {
  brandDefault: {
    filled: {
      bg: cssVarColors.surface.brand.default,
      text: cssVarColors.content.base.onColor,
    },
    outlined: {
      bg: 'transparent',
      border: cssVarColors.border.brand.default,
      text: cssVarColors.content.brand.default,
    },
    subtle: {
      bg: cssVarColors.surface.brand.secondary,
      text: cssVarColors.content.brand.default,
    },
  },
  baseDefault: {
    filled: {
      bg: cssVarColors.content.base.secondary,
      text: cssVarColors.content.base.onColor,
    },
    outlined: {
      bg: 'transparent',
      border: cssVarColors.border.secondary.default,
      text: cssVarColors.content.base.secondary,
    },
    subtle: {
      bg: cssVarColors.surface.base.container,
      text: cssVarColors.content.base.default,
    },
  },
  successDefault: {
    filled: {
      bg: cssVarColors.surface.success.solid,
      text: cssVarColors.content.base.onColor,
    },
    outlined: {
      bg: 'transparent',
      border: cssVarColors.border.success.default,
      text: cssVarColors.content.success.default,
    },
    subtle: {
      bg: cssVarColors.surface.success.default,
      text: cssVarColors.content.success.strong,
    },
  },
  errorDefault: {
    filled: {
      bg: cssVarColors.surface.error.solid,
      text: cssVarColors.content.base.onColor,
    },
    outlined: {
      bg: 'transparent',
      border: cssVarColors.border.error.default,
      text: cssVarColors.content.error.default,
    },
    subtle: {
      bg: cssVarColors.surface.error.default,
      text: cssVarColors.content.error.default,
    },
  },
  warningDefault: {
    filled: {
      bg: cssVarColors.content.warning.default,
      text: cssVarColors.content.base.onColor,
    },
    outlined: {
      bg: 'transparent',
      border: cssVarColors.status.cautionary.border,
      text: cssVarColors.content.warning.default,
    },
    subtle: {
      bg: cssVarColors.status.cautionary.surface,
      text: cssVarColors.content.warning.strong,
    },
  },
  infoDefault: {
    filled: {
      bg: cssVarColors.content.info.default,
      text: cssVarColors.content.base.onColor,
    },
    outlined: {
      bg: 'transparent',
      border: cssVarColors.border.info.default,
      text: cssVarColors.content.info.default,
    },
    subtle: {
      bg: cssVarColors.surface.info.default,
      text: cssVarColors.content.info.strong,
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
