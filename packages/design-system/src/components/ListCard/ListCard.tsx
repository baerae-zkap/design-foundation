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

import { useState, forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cssVarColors } from '../../tokens/colors';
import { cssVarShadow } from '../../tokens/shadow';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { typography } from '../../tokens/typography';
import { opacity, borderWidth } from '../../tokens/general';
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
  /** 썸네일 왼쪽 인디케이터 (선택, 상태 등) */
  leadingContent?: ReactNode;
  /** 카드 하단 자유 영역 (진행률 바, 추가 정보 등) */
  bottomContent?: ReactNode;
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
    thumbnailSize: spacing.component.listCard.thumbnailSize.sm,
    gap: spacing.primitive[3],
    titleSize: typography.fontSize.sm,
    subtitleSize: typography.fontSize.xs,
    metaSize: typography.fontSize.compact,
  },
  medium: {
    padding: spacing.primitive[4],
    thumbnailSize: spacing.component.listCard.thumbnailSize.md,
    gap: spacing.primitive[3],
    titleSize: typography.fontSize.md,
    subtitleSize: typography.fontSize.compact,
    metaSize: typography.fontSize.sm,
  },
  large: {
    padding: spacing.primitive[4],
    thumbnailSize: spacing.component.listCard.thumbnailSize.lg,
    gap: spacing.primitive[4],
    titleSize: typography.fontSize.md,
    subtitleSize: typography.fontSize.sm,
    metaSize: typography.fontSize.md,
  },
};

// Variant styles
const variantStyles: Record<ListCardVariant, React.CSSProperties> = {
  elevated: {
    backgroundColor: cssVarColors.surface.base.default,
    boxShadow: cssVarShadow.semantic.card.elevated,
    border: 'none',
  },
  outlined: {
    backgroundColor: cssVarColors.surface.base.default,
    boxShadow: 'none',
    border: `${borderWidth.default}px solid ${cssVarColors.border.base.default}`,
  },
  filled: {
    backgroundColor: cssVarColors.surface.base.default,
    boxShadow: cssVarShadow.semantic.card.default,
    border: 'none',
  },
};

export const ListCard = forwardRef<HTMLDivElement, ListCardProps>(
  (
    {
      variant = 'filled',
      size = 'medium',
      thumbnail,
      title,
      subtitle,
      meta,
      action,
      badges,
      leadingContent,
      bottomContent,
      onClick,
      disabled = false,
      style,
      onMouseDown,
      onMouseUp,
      onMouseLeave,
      onMouseEnter,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const sizeStyle = sizeConfig[size];
    const variantStyle = variantStyles[variant];
    const isInteractive = !!onClick && !disabled;

    const { isPressed, handlers } = usePressable<HTMLDivElement>({
      disabled: !isInteractive,
      onMouseDown,
      onMouseUp,
      onMouseLeave,
      onMouseEnter,
    });

    const getPressedBackground = () => {
      if (variant === 'filled') {
        return cssVarColors.surface.base.container;
      } else {
        return cssVarColors.surface.base.alternative;
      }
    };

    const [isFocusVisible, setIsFocusVisible] = useState(false);

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      padding: sizeStyle.padding,
      borderRadius: radius.component.card.sm,
      cursor: isInteractive ? 'pointer' : 'default',
      opacity: disabled ? opacity.disabled : 1,
      outline: isFocusVisible && isInteractive ? `2px solid var(--content-brand-default)` : 'none',
      outlineOffset: 2,
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
      backgroundColor: cssVarColors.surface.base.container,
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
      color: cssVarColors.content.base.default,
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
      color: cssVarColors.content.base.secondary,
      lineHeight: 1.4,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    };

    const metaStyle: React.CSSProperties = {
      fontSize: sizeStyle.metaSize,
      fontWeight: typography.fontWeight.bold,
      color: cssVarColors.content.base.default,
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
          if (isInteractive && e.key === 'Enter') {
            e.preventDefault();
            onClick();
          }
          if (isInteractive && e.key === ' ') {
            e.preventDefault();
          }
        }}
        onKeyUp={(e) => {
          if (isInteractive && e.key === ' ') {
            onClick();
          }
        }}
        onFocus={(e) => {
          setIsFocusVisible(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocusVisible(false);
          onBlur?.(e);
        }}
        style={containerStyle}
        {...handlers}
        {...props}
      >
        {/* Main row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: sizeStyle.gap }}>
          {/* Leading Content */}
          {leadingContent && (
            <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', alignSelf: 'center' }}>
              {leadingContent}
            </div>
          )}

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

        {/* Bottom Content */}
        {bottomContent && (
          <div style={{ marginTop: spacing.primitive[2] }}>
            {bottomContent}
          </div>
        )}
      </div>
    );
  }
);

ListCard.displayName = 'ListCard';
