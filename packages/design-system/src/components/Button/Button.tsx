/**
 * Button Component (Web)
 *
 * @description 작업을 수행하는데 사용되는 클릭 가능한 요소입니다.
 * @see docs/components/Button.md - AI용 상세 가이드
 *
 * @example
 * <Button
 *   buttonType="filled"
 *   color="brandDefault"
 *   size="medium"
 *   onClick={() => {}}
 * >
 *   확인
 * </Button>
 */

import { forwardRef, useState, type ButtonHTMLAttributes, type ReactNode } from 'react';

export type ButtonType = 'filled' | 'outlined';
export type ButtonColor =
  | 'brandDefault'
  | 'brandSecondary'
  | 'baseContainer'
  | 'successDefault'
  | 'errorDefault';
export type ButtonSize = 'small' | 'medium' | 'large' | 'xLarge';
export type ButtonLayout = 'hug' | 'fillWidth';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  /** 버튼 스타일 - filled(채워진) 또는 outlined(테두리) */
  buttonType?: ButtonType;
  /** 색상 테마 */
  color?: ButtonColor;
  /** 버튼 크기 */
  size?: ButtonSize;
  /** 레이아웃 모드 - hug(내용에 맞춤) 또는 fillWidth(전체 너비) */
  layout?: ButtonLayout;
  /** 로딩 상태 */
  isLoading?: boolean;
  /** 좌측 콘텐츠 (아이콘 등) */
  leftContent?: ReactNode;
  /** 우측 콘텐츠 (아이콘 등) */
  rightContent?: ReactNode;
  /** 버튼 텍스트 또는 콘텐츠 */
  children?: ReactNode;
}

const sizeStyles: Record<ButtonSize, { height: number; fontSize: number; padding: string }> = {
  small: { height: 36, fontSize: 14, padding: '0 16px' },
  medium: { height: 40, fontSize: 14, padding: '0 16px' },
  large: { height: 44, fontSize: 14, padding: '0 20px' },
  xLarge: { height: 48, fontSize: 16, padding: '0 24px' },
};

const colorStyles: Record<ButtonColor, {
  filled: { bg: string; bgPressed: string; color: string };
  outlined: { bg: string; bgPressed: string; color: string; border: string };
}> = {
  brandDefault: {
    filled: { bg: '#2563eb', bgPressed: '#1d4ed8', color: 'white' },
    outlined: { bg: 'white', bgPressed: '#eff6ff', color: '#2563eb', border: '#2563eb' },
  },
  brandSecondary: {
    filled: { bg: '#dbeafe', bgPressed: '#bfdbfe', color: '#2563eb' },
    outlined: { bg: 'white', bgPressed: '#eff6ff', color: '#2563eb', border: '#93c5fd' },
  },
  baseContainer: {
    filled: { bg: '#f1f5f9', bgPressed: '#e2e8f0', color: '#334155' },
    outlined: { bg: 'white', bgPressed: '#f8fafc', color: '#334155', border: '#cbd5e1' },
  },
  successDefault: {
    filled: { bg: '#22c55e', bgPressed: '#16a34a', color: 'white' },
    outlined: { bg: 'white', bgPressed: '#f0fdf4', color: '#16a34a', border: '#22c55e' },
  },
  errorDefault: {
    filled: { bg: '#ef4444', bgPressed: '#dc2626', color: 'white' },
    outlined: { bg: 'white', bgPressed: '#fef2f2', color: '#dc2626', border: '#ef4444' },
  },
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      buttonType = 'filled',
      color = 'brandDefault',
      size = 'medium',
      layout = 'hug',
      isLoading = false,
      disabled = false,
      leftContent,
      rightContent,
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
    const sizeStyle = sizeStyles[size];
    const colorStyle = colorStyles[color][buttonType];
    const isDisabled = disabled || isLoading;

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
      justifyContent: 'center',
      gap: 8,
      height: sizeStyle.height,
      padding: sizeStyle.padding,
      fontSize: sizeStyle.fontSize,
      fontWeight: 600,
      borderRadius: 8,
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      transition: 'background-color 150ms ease',
      width: layout === 'fillWidth' ? '100%' : 'auto',
      opacity: isDisabled ? 0.5 : 1,
      background: isDisabled
        ? '#e2e8f0'
        : (isPressed ? colorStyle.bgPressed : colorStyle.bg),
      color: isDisabled ? '#94a3b8' : colorStyle.color,
      border: buttonType === 'outlined'
        ? `1px solid ${isDisabled ? '#e2e8f0' : (colorStyle as { border: string }).border}`
        : 'none',
      ...style,
    };

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-busy={isLoading}
        aria-disabled={isDisabled}
        style={buttonStyle}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {isLoading ? (
          <LoadingDots />
        ) : (
          <>
            {leftContent}
            {children}
            {rightContent}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

function LoadingDots() {
  return (
    <span style={{ display: 'flex', gap: 4 }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            backgroundColor: 'currentColor',
            animation: `pulse 1.2s ease-in-out infinite`,
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </span>
  );
}
