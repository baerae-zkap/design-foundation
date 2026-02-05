/**
 * TextButton Component (Web)
 *
 * @description 텍스트 기반의 가벼운 액션 버튼입니다.
 * @see docs/components/TextButton.md - AI용 상세 가이드
 *
 * @example
 * <TextButton
 *   variant="clear"
 *   color="brandDefault"
 *   size="medium"
 *   onClick={() => {}}
 * >
 *   더보기
 * </TextButton>
 */

import { forwardRef, useState, type ButtonHTMLAttributes, type ReactNode } from 'react';

export type TextButtonVariant = 'clear' | 'underline' | 'arrow';
export type TextButtonColor = 'brandDefault' | 'baseDefault' | 'errorDefault';
export type TextButtonSize = 'xSmall' | 'small' | 'medium' | 'large' | 'xLarge';

export interface TextButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  /** 버튼 스타일 - clear(기본), underline(밑줄), arrow(화살표) */
  variant?: TextButtonVariant;
  /** 색상 테마 */
  color?: TextButtonColor;
  /** 텍스트 크기 */
  size?: TextButtonSize;
  /** 버튼 텍스트 */
  children?: ReactNode;
}

const sizeStyles: Record<TextButtonSize, number> = {
  xSmall: 12,
  small: 14,
  medium: 16,
  large: 18,
  xLarge: 20,
};

const colorStyles: Record<TextButtonColor, { default: string; pressed: string; pressedBg: string }> = {
  brandDefault: {
    default: '#2563eb', // content.brand.default (palette.blue.50)
    pressed: '#1e40af', // content.brand.default pressed (palette.blue.45)
    pressedBg: 'rgba(0, 0, 0, 0.06)' // surface overlay for pressed state
  },
  baseDefault: {
    default: '#334155', // content.base.default (palette.grey.30)
    pressed: '#1e293b', // content.base.strong (palette.grey.15)
    pressedBg: 'rgba(0, 0, 0, 0.06)' // surface overlay for pressed state
  },
  errorDefault: {
    default: '#ef4444', // content.error.default (palette.red.50)
    pressed: '#b91c1c', // content.error.default pressed (palette.red.45)
    pressedBg: 'rgba(0, 0, 0, 0.06)' // surface overlay for pressed state
  },
};

export const TextButton = forwardRef<HTMLButtonElement, TextButtonProps>(
  (
    {
      variant = 'clear',
      color = 'brandDefault',
      size = 'medium',
      disabled = false,
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
    const fontSize = sizeStyles[size];
    const colorStyle = colorStyles[color];

    const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
      setIsPressed(true);
      onMouseDown?.(e);
    };

    const handleMouseUp = (e: React.MouseEvent<HTMLButtonElement>) => {
      setIsPressed(false);
      onMouseUp?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      setIsPressed(false);
      onMouseLeave?.(e);
    };

    const buttonStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4, // spacing.primitive.1
      padding: '4px 8px', // spacing.primitive.1 and spacing.primitive.2
      fontSize,
      fontWeight: 500,
      color: disabled ? '#94a3b8' /* content.disabled.default (palette.grey.80) */ : (isPressed ? colorStyle.pressed : colorStyle.default),
      background: isPressed && !disabled ? colorStyle.pressedBg : 'transparent',
      border: 'none',
      borderRadius: 8, // radius.primitive.sm
      cursor: disabled ? 'not-allowed' : 'pointer',
      textDecoration: variant === 'underline' ? 'underline' : 'none',
      transition: 'color 150ms ease, background-color 150ms ease',
      ...style,
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        aria-disabled={disabled}
        style={buttonStyle}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
        {variant === 'arrow' && (
          <svg
            width={fontSize * 0.875}
            height={fontSize * 0.875}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        )}
      </button>
    );
  }
);

TextButton.displayName = 'TextButton';
