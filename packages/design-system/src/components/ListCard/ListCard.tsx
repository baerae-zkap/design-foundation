/**
 * ListCard Component (Web)
 *
 * @description 리스트 형태의 카드 컴포넌트입니다. 썸네일, 콘텐츠, 액션 영역으로 구성됩니다.
 * @see docs/components/ListCard.md - AI용 상세 가이드
 *
 * @example
 * <ListCard
 *   thumbnail={<img src="product.jpg" />}
 *   title="상품명"
 *   subtitle="상품 설명"
 *   meta="₩59,000"
 *   onClick={() => {}}
 * />
 */

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { colors, palette } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { typography } from '../../tokens/typography';
import { usePressable } from '../../utils/usePressable';
import { transitions } from '../../utils/styles';

export type ListCardSize = 'small' | 'medium' | 'large';
export type ListCardVariant = 'elevated' | 'outlined' | 'filled';

export interface ListCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** 카드 스타일 */
  variant?: ListCardVariant;
  /** 크기 */
  size?: ListCardSize;
  /** 좌측 썸네일 영역 */
  thumbnail?: ReactNode;
  /** 메인 타이틀 */
  title: ReactNode;
  /** 서브타이틀 */
  subtitle?: ReactNode;
  /** 메타 정보 (가격, 날짜 등) */
  meta?: ReactNode;
  /** 우측 액션 영역 */
  action?: ReactNode;
  /** 상단 뱃지 영역 */
  badges?: ReactNode;
  /** 클릭 핸들러 */
  onClick?: () => void;
  /** 비활성화 */
  disabled?: boolean;
}

// Size configurations
const sizeConfig: Record<ListCardSize, {
  padding: number;
  thumbnailSize: number;
  gap: number;
  titleSize: number;
  subtitleSize: number;
  metaSize: number;
}> = {
  small: {
    padding: spacing.primitive[3],
    thumbnailSize: 56,
    gap: spacing.primitive[3],
    titleSize: typography.fontSize.sm,
    subtitleSize: 12,
    metaSize: 13,
  },
  medium: {
    padding: spacing.primitive[4],
    thumbnailSize: 80,
    gap: spacing.primitive[3],
    titleSize: typography.fontSize.md,
    subtitleSize: 13,
    metaSize: typography.fontSize.sm,
  },
  large: {
    padding: spacing.primitive[4],
    thumbnailSize: 100,
    gap: spacing.primitive[4],
    titleSize: typography.fontSize.md,
    subtitleSize: typography.fontSize.sm,
    metaSize: typography.fontSize.md,
  },
};

// Variant styles
const variantStyles: Record<ListCardVariant, React.CSSProperties> = {
  elevated: {
    backgroundColor: colors.surface.base.default,
    boxShadow: '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',
    border: 'none',
  },
  outlined: {
    backgroundColor: colors.surface.base.default,
    boxShadow: 'none',
    border: `1px solid ${colors.border.base.default}`,
  },
  filled: {
    backgroundColor: colors.surface.base.alternative,
    boxShadow: 'none',
    border: 'none',
  },
};

export const ListCard = forwardRef<HTMLDivElement, ListCardProps>(
  (
    {
      variant = 'elevated',
      size = 'medium',
      thumbnail,
      title,
      subtitle,
      meta,
      action,
      badges,
      onClick,
      disabled = false,
      style,
      ...props
    },
    ref
  ) => {
    const sizeStyle = sizeConfig[size];
    const variantStyle = variantStyles[variant];
    const isInteractive = !!onClick && !disabled;

    const { isPressed, handlers } = usePressable<HTMLDivElement>({
      disabled: !isInteractive,
      onMouseDown: undefined,
      onMouseUp: undefined,
      onMouseLeave: undefined,
    });

    const getPressedBackground = () => {
      if (variant === 'filled') {
        return colors.surface.base.container;
      } else {
        return palette.grey[99];
      }
    };

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'flex-start',
      gap: sizeStyle.gap,
      padding: sizeStyle.padding,
      borderRadius: radius.component.card.sm,
      cursor: isInteractive ? 'pointer' : 'default',
      opacity: disabled ? 0.5 : 1,
      transition: transitions.background,
      ...variantStyle,
      ...(isPressed && isInteractive ? { backgroundColor: getPressedBackground() } : {}),
      ...style,
    };

    const thumbnailContainerStyle: React.CSSProperties = {
      width: sizeStyle.thumbnailSize,
      height: sizeStyle.thumbnailSize,
      borderRadius: radius.primitive.sm,
      overflow: 'hidden',
      flexShrink: 0,
      backgroundColor: colors.surface.base.container,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };

    const contentStyle: React.CSSProperties = {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: spacing.primitive[1],
    };

    const titleStyle: React.CSSProperties = {
      fontSize: sizeStyle.titleSize,
      fontWeight: typography.fontWeight.semibold,
      color: colors.content.base.default,
      lineHeight: 1.4,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
    };

    const subtitleStyle: React.CSSProperties = {
      fontSize: sizeStyle.subtitleSize,
      fontWeight: typography.fontWeight.regular,
      color: colors.content.base.secondary,
      lineHeight: 1.4,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    };

    const metaStyle: React.CSSProperties = {
      fontSize: sizeStyle.metaSize,
      fontWeight: typography.fontWeight.bold,
      color: colors.content.base.default,
      marginTop: spacing.primitive[1],
    };

    const handleClick = () => {
      if (isInteractive) {
        onClick();
      }
    };

    return (
      <div
        ref={ref}
        role={isInteractive ? 'button' : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick();
          }
        }}
        style={containerStyle}
        {...handlers}
        {...props}
      >
        {/* Thumbnail */}
        {thumbnail && (
          <div style={thumbnailContainerStyle}>
            {thumbnail}
          </div>
        )}

        {/* Content */}
        <div style={contentStyle}>
          {/* Badges */}
          {badges && (
            <div style={{ display: 'flex', gap: spacing.primitive[1], marginBottom: spacing.primitive[1] }}>
              {badges}
            </div>
          )}

          <div style={titleStyle}>{title}</div>
          {subtitle && <div style={subtitleStyle}>{subtitle}</div>}
          {meta && <div style={metaStyle}>{meta}</div>}
        </div>

        {/* Action */}
        {action && (
          <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
            {action}
          </div>
        )}
      </div>
    );
  }
);

ListCard.displayName = 'ListCard';
