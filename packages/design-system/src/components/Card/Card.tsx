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

import { forwardRef, useState, type HTMLAttributes, type ReactNode } from 'react';

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
  small: 12,   // primitive.3
  medium: 20,  // card.padding.md
  large: 24,   // card.padding.lg
};

const variantStyles: Record<CardVariant, {
  bg: string;
  bgPressed: string;
  border?: string;
  shadow?: string;
}> = {
  elevated: {
    bg: 'white', // surface.base.default (static.white)
    bgPressed: '#f8fafc', // surface.base.alternative (palette.grey.99)
    shadow: '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)', // card.shadow.default
  },
  outlined: {
    bg: 'white', // surface.base.default (static.white)
    bgPressed: '#f8fafc', // surface.base.alternative (palette.grey.99)
    border: '#e2e8f0', // border.base.default (palette.grey.95)
  },
  filled: {
    bg: '#f8fafc', // surface.base.alternative (palette.grey.99)
    bgPressed: '#e2e8f0', // border.base.default (palette.grey.95) - pressed state darker
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
    const [isPressed, setIsPressed] = useState(false);

    const isClickable = !!onClick && !disabled;

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      if (isClickable) setIsPressed(true);
      onMouseDown?.(e);
    };

    const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
      setIsPressed(false);
      onMouseUp?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      setIsPressed(false);
      onMouseLeave?.(e);
    };

    const handleClick = () => {
      if (isClickable) onClick();
    };

    const variantStyle = variantStyles[variant];
    const backgroundColor = isPressed && isClickable ? variantStyle.bgPressed : variantStyle.bg;

    const cardStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 12, // card.sm (radius.semantic.card.sm)
      backgroundColor,
      padding: paddingStyles[padding],
      border: variant === 'outlined' ? `1px solid ${variantStyle.border}` : 'none',
      boxShadow: variant === 'elevated' ? variantStyle.shadow : 'none',
      cursor: isClickable ? 'pointer' : 'default',
      opacity: disabled ? 0.5 : 1,
      transition: 'background-color 0.15s ease, box-shadow 0.15s ease',
      ...style,
    };

    return (
      <div
        ref={ref}
        style={cardStyle}
        onMouseDown={isClickable ? handleMouseDown : undefined}
        onMouseUp={isClickable ? handleMouseUp : undefined}
        onMouseLeave={isClickable ? handleMouseLeave : undefined}
        onClick={isClickable ? handleClick : undefined}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
