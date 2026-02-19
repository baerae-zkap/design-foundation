/**
 * ListCard Component (Web)
 *
 * @description 리스트 형태의 카드 컴포넌트입니다. 썸네일, 콘텐츠, 액션 영역으로 구성됩니다.
 * @see docs/components/ListCard.md - AI용 상세 가이드
 *
 * @example
 * <ListCard
 *   thumbnail={<img src="product.jpg" alt="상품 이미지" />}
 *   title="상품명"
 *   subtitle="상품 설명"
 *   meta="₩59,000"
 *   onClick={() => {}}
 * />
 */

import { useState, forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cssVarColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { typography } from '../../tokens/typography';
import { borderWidth } from '../../tokens/general';
import { usePressable } from '../../utils/usePressable';
import { transitions } from '../../utils/styles';

export type ListCardVariant = 'filled' | 'outlined';

export interface ListCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** 카드 스타일 */
  variant?: ListCardVariant;
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
  /** 상단 배지 영역 */
  badges?: ReactNode;
  /** 클릭 핸들러 */
  onClick?: () => void;
}

// Variant styles
const variantStyles: Record<ListCardVariant, React.CSSProperties> = {
  outlined: {
    backgroundColor: cssVarColors.surface.base.default,
    boxShadow: 'none',
    border: `${borderWidth.default}px solid ${cssVarColors.border.base.default}`,
  },
  filled: {
    backgroundColor: cssVarColors.surface.base.default,
    boxShadow: 'none',
    border: 'none',
  },
};

export const ListCard = forwardRef<HTMLDivElement, ListCardProps>(
  (
    {
      variant = 'filled',
      thumbnail,
      title,
      subtitle,
      meta,
      action,
      badges,
      onClick,
      style,
      onMouseDown,
      onMouseUp,
      onMouseLeave,
      onMouseEnter,
      onFocus,
      onBlur,
      onKeyDown: externalKeyDown,
      onKeyUp: externalKeyUp,
      ...props
    },
    ref
  ) => {
    const variantStyle = variantStyles[variant];
    const isInteractive = !!onClick;

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
      padding: spacing.primitive[4],
      borderRadius: radius.component.card.sm,
      cursor: isInteractive ? 'pointer' : 'default',
      outline: isFocusVisible && isInteractive ? `2px solid var(--content-brand-default)` : 'none',
      outlineOffset: 2,
      transition: transitions.background,
      ...variantStyle,
      ...(isPressed && isInteractive ? { backgroundColor: getPressedBackground() } : {}),
      ...style,
    };

    const thumbnailContainerStyle: React.CSSProperties = {
      width: spacing.component.listCard.thumbnailSize.md,
      height: spacing.component.listCard.thumbnailSize.md,
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
      fontSize: typography.fontSize.md,
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
      fontSize: typography.fontSize.compact,
      fontWeight: typography.fontWeight.regular,
      color: cssVarColors.content.base.secondary,
      lineHeight: 1.4,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    };

    const metaStyle: React.CSSProperties = {
      fontSize: typography.fontSize.sm,
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
            onClick!();
          }
          if (isInteractive && e.key === ' ') {
            e.preventDefault();
          }
          externalKeyDown?.(e);
        }}
        onKeyUp={(e) => {
          if (isInteractive && e.key === ' ') {
            onClick!();
          }
          externalKeyUp?.(e);
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
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: spacing.primitive[4] }}>
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

      </div>
    );
  }
);

ListCard.displayName = 'ListCard';
