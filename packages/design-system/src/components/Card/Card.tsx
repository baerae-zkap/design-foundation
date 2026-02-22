/**
 * Card Component (Web)
 *
 * @description 콘텐츠를 담는 클릭 가능한 카드 컨테이너입니다.
 * @see docs/components/Card.md - AI용 상세 가이드
 *
 * @example
 * // Slot mode (structured)
 * <Card
 *   thumbnail={<img src="/image.jpg" alt="..." style={{ width: '100%', height: 200, objectFit: 'cover' }} />}
 *   heading="Card Title"
 *   caption="Card description text"
 *   onClick={() => {}}
 * />
 *
 * // Children mode (free-form)
 * <Card variant="outlined" padding="medium" onClick={() => {}}>
 *   <h3>Custom Content</h3>
 *   <p>Any content here...</p>
 * </Card>
 */

import { forwardRef, type HTMLAttributes, type KeyboardEvent, type ReactNode } from 'react';
import { cssVarColors } from '../../tokens/colors';
import { cssVarShadow } from '../../tokens/shadow';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { usePressable } from '../../utils/usePressable';
import { transitions } from '../../utils/styles';
import { borderWidth } from '../../tokens/general';
import { typography } from '../../tokens/typography';

export type CardVariant = 'filled' | 'elevated' | 'outlined';
export type CardPadding = 'small' | 'medium' | 'large';

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** 카드 스타일 - filled(기본/흰색), elevated(그림자), outlined(테두리) */
  variant?: CardVariant;
  /** 내부 패딩 크기 */
  padding?: CardPadding;
  /** 자식 요소 (children 사용 시 slot props 무시) */
  children?: ReactNode;
  /** 썸네일 영역 (이미지, Thumbnail 컴포넌트 등) */
  thumbnail?: ReactNode;
  /** 제목 */
  heading?: ReactNode;
  /** 설명 텍스트 */
  caption?: ReactNode;
  /** 클릭 핸들러 */
  onClick: () => void;
}

const paddingStyles: Record<CardPadding, number> = {
  small: spacing.primitive[3],
  medium: spacing.semantic.inset.md,
  large: spacing.semantic.inset.lg,
};

const variantStyles: Record<CardVariant, {
  bg: string;
  bgPressed: string;
  border?: string;
  shadow?: string;
}> = {
  filled: {
    bg: cssVarColors.surface.base.default,
    bgPressed: cssVarColors.surface.base.defaultPressed,
  },
  elevated: {
    bg: cssVarColors.surface.base.default,
    bgPressed: cssVarColors.surface.base.defaultPressed,
    shadow: cssVarShadow.semantic.card.elevated,
  },
  outlined: {
    bg: cssVarColors.surface.base.default,
    bgPressed: cssVarColors.surface.base.defaultPressed,
    border: cssVarColors.border.base.default,
  },
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'filled',
      padding = 'medium',
      onClick,
      children,
      thumbnail,
      heading,
      caption,
      style,
      onMouseDown,
      onMouseUp,
      onMouseLeave,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const useSlotMode = !children && (!!thumbnail || !!heading || !!caption);
    const { isPressed, isHovered, handlers } = usePressable<HTMLDivElement>({
      disabled: false,
      onMouseDown,
      onMouseUp,
      onMouseLeave,
    });

    const variantStyle = variantStyles[variant];
    const backgroundColor = (isPressed || isHovered) ? variantStyle.bgPressed : variantStyle.bg;
    const borderRadiusValue = radius.component.card.sm;

    const cardStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      borderRadius: borderRadiusValue,
      backgroundColor,
      padding: useSlotMode ? 0 : paddingStyles[padding],
      border: variant === 'outlined' ? `${borderWidth.default}px solid ${variantStyle.border}` : 'none',
      boxShadow: variant === 'elevated' ? variantStyle.shadow : 'none',
      cursor: 'pointer',
      transition: 'background-color 150ms ease, transform 150ms ease',
      transform: isPressed ? 'scale(0.98)' : undefined,
      overflow: 'hidden',
      ...style,
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick();
      }
      onKeyDown?.(e);
    };

    return (
      <div
        ref={ref}
        role="button"
        tabIndex={0}
        style={cardStyle}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        {...handlers}
        {...props}
      >
        {useSlotMode ? (
          <>
            {thumbnail && (
              <div style={{
                borderRadius: `${borderRadiusValue}px ${borderRadiusValue}px 0 0`,
                overflow: 'hidden',
              }}>
                {thumbnail}
              </div>
            )}
            <div style={{
              padding: paddingStyles[padding],
              display: 'flex',
              flexDirection: 'column',
              gap: spacing.primitive[1],
            }}>
              {heading && (typeof heading === 'string'
                ? <span style={{ fontSize: typography.fontSize.md, fontWeight: typography.fontWeight.semibold, color: cssVarColors.content.base.strong }}>{heading}</span>
                : heading)}
              {caption && (typeof caption === 'string'
                ? <span style={{ fontSize: typography.fontSize.sm, color: cssVarColors.content.base.secondary, lineHeight: 1.5 }}>{caption}</span>
                : caption)}
            </div>
          </>
        ) : (
          children
        )}
      </div>
    );
  }
);

Card.displayName = 'Card';
