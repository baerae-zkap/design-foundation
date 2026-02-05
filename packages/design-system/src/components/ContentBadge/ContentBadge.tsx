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
  small: { height: 18, fontSize: 10, paddingX: 6, dotSize: 4, iconSize: 10 }, // primitive.2 (8px) padding, chip.height.sm style
  medium: { height: 22, fontSize: 12, paddingX: 8, dotSize: 6, iconSize: 12 }, // primitive.2 (8px) padding
  large: { height: 26, fontSize: 14, paddingX: 10, dotSize: 6, iconSize: 14 }, // primitive.2.5 (10px) padding
};

// Color configurations
const colorConfig: Record<ContentBadgeColor, {
  filled: { bg: string; text: string };
  outlined: { bg: string; border: string; text: string };
  subtle: { bg: string; text: string };
}> = {
  brandDefault: {
    filled: {
      bg: '#2563eb', // surface.brand.default (palette.blue.50)
      text: '#ffffff', // content.base.onColor (palette.static.white)
    },
    outlined: {
      bg: 'transparent',
      border: '#2563eb', // border.brand.default (palette.blue.50)
      text: '#2563eb', // content.brand.default (palette.blue.50)
    },
    subtle: {
      bg: '#dbeafe', // surface.brand.secondary (palette.blue.95)
      text: '#1e40af', // content.brand.strong (palette.blue.40)
    },
  },
  baseDefault: {
    filled: {
      bg: '#64748b', // surface.base.strong (palette.grey.50)
      text: '#ffffff', // content.base.onColor (palette.static.white)
    },
    outlined: {
      bg: 'transparent',
      border: '#94a3b8', // border.base.secondary (palette.grey.70)
      text: '#475569', // content.base.secondary (palette.grey.40)
    },
    subtle: {
      bg: '#f1f5f9', // surface.base.container (palette.grey.97)
      text: '#334155', // content.base.default (palette.grey.30)
    },
  },
  successDefault: {
    filled: {
      bg: '#16a34a', // surface.success.strong (palette.green.45)
      text: '#ffffff', // content.base.onColor (palette.static.white)
    },
    outlined: {
      bg: 'transparent',
      border: '#22c55e', // border.success.default (palette.green.50)
      text: '#16a34a', // content.success.default (palette.green.45)
    },
    subtle: {
      bg: '#dcfce7', // surface.success.secondary (palette.green.95)
      text: '#166534', // content.success.strong (palette.green.30)
    },
  },
  errorDefault: {
    filled: {
      bg: '#dc2626', // surface.error.strong (palette.red.45)
      text: '#ffffff', // content.base.onColor (palette.static.white)
    },
    outlined: {
      bg: 'transparent',
      border: '#ef4444', // border.error.default (palette.red.50)
      text: '#dc2626', // content.error.default (palette.red.45)
    },
    subtle: {
      bg: '#fee2e2', // surface.error.secondary (palette.red.95)
      text: '#991b1b', // content.error.strong (palette.red.30)
    },
  },
  warningDefault: {
    filled: {
      bg: '#d97706', // surface.warning.strong (palette.orange.45)
      text: '#ffffff', // content.base.onColor (palette.static.white)
    },
    outlined: {
      bg: 'transparent',
      border: '#f59e0b', // border.warning.default (palette.orange.50)
      text: '#d97706', // content.warning.default (palette.orange.45)
    },
    subtle: {
      bg: '#fef3c7', // surface.warning.secondary (palette.orange.95)
      text: '#92400e', // content.warning.strong (palette.orange.30)
    },
  },
  infoDefault: {
    filled: {
      bg: '#0891b2', // surface.info.strong (palette.cyan.45)
      text: '#ffffff', // content.base.onColor (palette.static.white)
    },
    outlined: {
      bg: 'transparent',
      border: '#06b6d4', // border.info.default (palette.cyan.50)
      text: '#0891b2', // content.info.default (palette.cyan.45)
    },
    subtle: {
      bg: '#cffafe', // surface.info.secondary (palette.cyan.95)
      text: '#155e75', // content.info.strong (palette.cyan.30)
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
      gap: 4, // spacing.primitive.1 (4px)
      height: sizeStyle.height,
      padding: `0 ${sizeStyle.paddingX}px`,
      fontSize: sizeStyle.fontSize,
      fontWeight: 600,
      lineHeight: 1,
      color: colorStyle.text,
      backgroundColor: colorStyle.bg,
      border: variant === 'outlined'
        ? `1px solid ${(colorStyle as { border: string }).border}`
        : 'none',
      borderRadius: 4, // radius.primitive.xs (4px)
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
