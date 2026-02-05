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

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

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

const colorStyles: Record<TextButtonColor, { default: string; hover: string; pressed: string }> = {
  brandDefault: { default: '#2563eb', hover: '#1d4ed8', pressed: '#1e40af' },
  baseDefault: { default: '#334155', hover: '#1e293b', pressed: '#0f172a' },
  errorDefault: { default: '#ef4444', hover: '#dc2626', pressed: '#b91c1c' },
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
      ...props
    },
    ref
  ) => {
    const fontSize = sizeStyles[size];
    const colorStyle = colorStyles[color];

    const buttonStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      padding: '4px 8px',
      fontSize,
      fontWeight: 500,
      color: disabled ? '#94a3b8' : colorStyle.default,
      background: 'transparent',
      border: 'none',
      borderRadius: 6,
      cursor: disabled ? 'not-allowed' : 'pointer',
      textDecoration: variant === 'underline' ? 'underline' : 'none',
      transition: 'color 150ms ease',
      ...style,
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        aria-disabled={disabled}
        style={buttonStyle}
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
