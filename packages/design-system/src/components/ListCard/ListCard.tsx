/**
 * ListCard Component (Web)
 *
 * @description 리스트 형태의 카드 컴포넌트입니다. 썸네일, 콘텐츠, 액션 영역으로 구성됩니다.
 * Toss-style minimal layout: content-first, no decorative chrome.
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
export type ListCardSize = 'sm' | 'md' | 'lg';

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

// ---------------------------------------------------------------------------
// Variant base styles
// ---------------------------------------------------------------------------

const variantStyles: Record<ListCardVariant, React.CSSProperties> = {
  filled: {
    backgroundColor: 'transparent',
    border: 'none',
  },
  outlined: {
    backgroundColor: cssVarColors.surface.base.default,
    border: `${borderWidth.default}px solid ${cssVarColors.border.base.default}`,
    borderRadius: radius.component.card.sm,
  },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

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
    const isInteractive = !!onClick;

    const { isPressed, isHovered, handlers } = usePressable<HTMLDivElement>({
      disabled: !isInteractive,
      onMouseDown,
      onMouseUp,
      onMouseLeave,
      onMouseEnter,
    });

    const [isFocusVisible, setIsFocusVisible] = useState(false);

    // -----------------------------------------------------------------------
    // Interactive background — both hover and pressed use the lightest tint
    // -----------------------------------------------------------------------
    const getInteractiveBackground = (): string | undefined => {
      if (!isInteractive) return undefined;
      if (isPressed || isHovered) return cssVarColors.surface.base.alternative;
      return undefined;
    };

    const interactiveBg = getInteractiveBackground();

    // -----------------------------------------------------------------------
    // Styles
    // -----------------------------------------------------------------------

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: spacing.primitive[3],                          // 12px between thumbnail and content
      padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, // 12px vertical, 16px horizontal
      borderRadius: variant === 'filled' ? radius.primitive.sm : undefined, // 8px subtle rounding for hover area
      cursor: isInteractive ? 'pointer' : 'default',
      userSelect: isInteractive ? 'none' : undefined,
      outline: isFocusVisible && isInteractive
        ? `${borderWidth.strong}px solid ${cssVarColors.content.brand.default}`
        : 'none',
      outlineOffset: 2,
      transition: transitions.background,
      ...variantStyles[variant],
      ...(interactiveBg ? { backgroundColor: interactiveBg } : {}),
      ...style,
    };

    // Thumbnail — clean rounded square, no heavy background
    const thumbnailContainerStyle: React.CSSProperties = {
      width: spacing.component.listCard.thumbnailSize.md,  // 80px
      height: spacing.component.listCard.thumbnailSize.md,
      borderRadius: radius.primitive.sm,                    // 8px rounded square
      overflow: 'hidden',
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: cssVarColors.surface.base.alternative, // very light fallback, not container
    };

    // Content column — fills space between thumbnail and action
    const contentStyle: React.CSSProperties = {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: spacing.primitive[0],                            // tight 0 gap, controlled by margins
    };

    // Badges row — small inline, tight to title
    const badgesStyle: React.CSSProperties = {
      display: 'flex',
      flexWrap: 'wrap',
      gap: spacing.primitive[1],                            // 4px between badges
      marginBottom: spacing.primitive[1],                   // 4px below badges before title
    };

    // Title — 16px semibold, single line ellipsis for Toss-clean look
    const titleStyle: React.CSSProperties = {
      fontSize: typography.fontSize.md,                     // 16
      fontWeight: typography.fontWeight.semibold,            // 600
      color: cssVarColors.content.base.default,
      lineHeight: 1.4,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      margin: 0,
    };

    // Subtitle — 14px regular, secondary, single line
    const subtitleStyle: React.CSSProperties = {
      fontSize: typography.fontSize.sm,                     // 14
      fontWeight: typography.fontWeight.regular,             // 400
      color: cssVarColors.content.base.secondary,
      lineHeight: 1.4,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      marginTop: spacing.primitive[1],                      // 4px gap from title
    };

    // Meta — 14px bold for prices, below subtitle
    const metaStyle: React.CSSProperties = {
      fontSize: typography.fontSize.sm,                     // 14
      fontWeight: typography.fontWeight.bold,                // 700
      color: cssVarColors.content.base.default,
      lineHeight: 1.4,
      marginTop: spacing.primitive[1],                      // 4px gap from subtitle
    };

    // Trailing action — right-aligned, vertically centered
    const trailingStyle: React.CSSProperties = {
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      marginLeft: spacing.primitive[1],                     // 4px extra gap from content
    };

    // -----------------------------------------------------------------------
    // Event handlers
    // -----------------------------------------------------------------------

    const handleClick = () => {
      if (isInteractive) {
        onClick();
      }
    };

    // -----------------------------------------------------------------------
    // Render
    // -----------------------------------------------------------------------

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
          try {
            if (e.target.matches(':focus-visible')) {
              setIsFocusVisible(true);
            }
          } catch {
            // Fallback: don't show focus ring (safe default for older browsers)
          }
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
        {/* Thumbnail — rounded square, no heavy background */}
        {thumbnail && (
          <div style={thumbnailContainerStyle}>
            {thumbnail}
          </div>
        )}

        {/* Content — badges above title, subtitle and meta below */}
        <div style={contentStyle}>
          {badges && <div style={badgesStyle}>{badges}</div>}
          <div style={titleStyle}>{title}</div>
          {subtitle && <div style={subtitleStyle}>{subtitle}</div>}
          {meta && <div style={metaStyle}>{meta}</div>}
        </div>

        {/* Action — anchored right, vertically centered */}
        {action && (
          <div style={trailingStyle}>
            {action}
          </div>
        )}
      </div>
    );
  }
);

ListCard.displayName = 'ListCard';
