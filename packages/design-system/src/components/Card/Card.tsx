/**
 * Card Component (Web)
 *
 * @description 콘텐츠를 담는 카드 컨테이너입니다.
 * @see docs/components/Card.md - AI용 상세 가이드
 *
 * @example
 * <Card
 *   variant="elevated"
 *   padding="medium"
 *   onClick={() => {}}
 * >
 *   <h3>Card Title</h3>
 *   <p>Card content...</p>
 * </Card>
 */

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { colors } from '../../tokens/colors';
import { shadow } from '../../tokens/shadow';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { usePressable } from '../../utils/usePressable';
import { transitions } from '../../utils/styles';

export type CardVariant = 'elevated' | 'outlined' | 'filled';
export type CardPadding = 'none' | 'small' | 'medium' | 'large';

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** 카드 스타일 - elevated(그림자), outlined(테두리), filled(채워진 배경) */
  variant?: CardVariant;
  /** 내부 패딩 크기 */
  padding?: CardPadding;
  /** 자식 요소 */
  children: ReactNode;
  /** 클릭 가능한 카드 */
  onClick?: () => void;
  /** 비활성화 상태 */
  disabled?: boolean;
}

const paddingStyles: Record<CardPadding, number> = {
  none: 0,
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
  elevated: {
    bg: colors.surface.base.default,
    bgPressed: colors.surface.base.alternative,
    shadow: shadow.semantic.card.elevated,
  },
  outlined: {
    bg: colors.surface.base.default,
    bgPressed: colors.surface.base.alternative,
    border: colors.border.base.default,
  },
  filled: {
    bg: colors.surface.base.alternative,
    bgPressed: colors.surface.base.containerPressed,
  },
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'elevated',
      padding = 'medium',
      disabled = false,
      onClick,
      children,
      style,
      onMouseDown,
      onMouseUp,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const isClickable = !!onClick && !disabled;
    const { isPressed, handlers } = usePressable<HTMLDivElement>({
      disabled: !isClickable,
      onMouseDown,
      onMouseUp,
      onMouseLeave,
    });

    const variantStyle = variantStyles[variant];
    const backgroundColor = isPressed && isClickable ? variantStyle.bgPressed : variantStyle.bg;

    const cardStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      borderRadius: radius.component.card.sm,
      backgroundColor,
      padding: paddingStyles[padding],
      border: variant === 'outlined' ? `1px solid ${variantStyle.border}` : 'none',
      boxShadow: variant === 'elevated' ? variantStyle.shadow : 'none',
      cursor: isClickable ? 'pointer' : 'default',
      opacity: disabled ? 0.5 : 1,
      transition: transitions.all,
      ...style,
    };

    const handleClick = () => {
      if (isClickable) onClick();
    };

    return (
      <div
        ref={ref}
        style={cardStyle}
        onClick={isClickable ? handleClick : undefined}
        {...handlers}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
