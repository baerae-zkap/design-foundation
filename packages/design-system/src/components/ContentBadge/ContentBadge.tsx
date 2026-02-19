/**
 * ContentBadge Component (Web)
 *
 * @description 콘텐츠의 상태, 카테고리, 라벨을 표시하는 비인터랙티브 요소입니다.
 * @see docs/components/ContentBadge.md - AI용 상세 가이드
 *
 * @example
 * <ContentBadge color="primary">NEW</ContentBadge>
 * <ContentBadge color="error" variant="weak">품절</ContentBadge>
 */

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cssVarColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { typography } from '../../tokens/typography';

export type ContentBadgeVariant = 'filled' | 'weak';
export type ContentBadgeColor = 'primary' | 'neutral' | 'success' | 'error' | 'warning' | 'info';
export type ContentBadgeSize = 'small' | 'medium' | 'large';

export type ContentBadgeProps = HTMLAttributes<HTMLSpanElement> & {
  /** 스타일 변형 - filled(채움), weak(연한 배경) */
  variant?: ContentBadgeVariant;
  /** 색상 테마 */
  color?: ContentBadgeColor;
  /** 크기 */
  size?: ContentBadgeSize;
  /** 좌측 아이콘 */
  leftIcon?: ReactNode;
  /** Badge 텍스트 */
  children?: ReactNode;
};

// Size configurations
const sizeConfig: Record<ContentBadgeSize, { height: number; fontSize: number; paddingX: number; iconSize: number }> = {
  small: { height: spacing.component.badge.height.sm, fontSize: typography.fontSize.xs, paddingX: spacing.component.badge.paddingX.sm, iconSize: spacing.component.badge.iconSize.sm },
  medium: { height: spacing.component.badge.height.md, fontSize: typography.fontSize.xs, paddingX: spacing.component.badge.paddingX.md, iconSize: spacing.component.badge.iconSize.md },
  large: { height: spacing.component.badge.height.lg, fontSize: typography.fontSize.sm, paddingX: spacing.component.badge.paddingX.lg, iconSize: spacing.component.badge.iconSize.lg },
};

// Color configurations
const colorConfig: Record<ContentBadgeColor, {
  filled: { bg: string; text: string };
  weak: { bg: string; text: string };
}> = {
  primary: {
    filled: {
      bg: cssVarColors.surface.brand.default,
      text: cssVarColors.content.base.onColor,
    },
    weak: {
      bg: cssVarColors.surface.brand.secondary,
      text: cssVarColors.content.brand.default,
    },
  },
  neutral: {
    filled: {
      bg: cssVarColors.content.base.secondary,
      text: cssVarColors.content.base.onColor,
    },
    weak: {
      bg: cssVarColors.surface.base.container,
      text: cssVarColors.content.base.default,
    },
  },
  success: {
    filled: {
      bg: cssVarColors.surface.success.solid,
      text: cssVarColors.content.base.onColor,
    },
    weak: {
      bg: cssVarColors.surface.success.default,
      text: cssVarColors.content.success.strong,
    },
  },
  error: {
    filled: {
      bg: cssVarColors.surface.error.solid,
      text: cssVarColors.content.base.onColor,
    },
    weak: {
      bg: cssVarColors.surface.error.default,
      text: cssVarColors.content.error.default,
    },
  },
  warning: {
    filled: {
      bg: cssVarColors.content.warning.default,
      text: cssVarColors.content.base.onColor,
    },
    weak: {
      bg: cssVarColors.surface.warning.default,
      text: cssVarColors.content.warning.strong,
    },
  },
  info: {
    filled: {
      bg: cssVarColors.content.info.default,
      text: cssVarColors.content.base.onColor,
    },
    weak: {
      bg: cssVarColors.surface.info.default,
      text: cssVarColors.content.info.strong,
    },
  },
};

export const ContentBadge = forwardRef<HTMLSpanElement, ContentBadgeProps>(
  (
    {
      variant = 'filled',
      color = 'neutral',
      size = 'medium',
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
      borderRadius: radius.primitive.xs,
      whiteSpace: 'nowrap',
      ...style,
    };

    return (
      <span ref={ref} style={badgeStyle} {...props}>
        {/* Left Icon */}
        {leftIcon && (
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
