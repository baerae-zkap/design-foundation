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

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

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

const colorStyles: Record<ButtonColor, { filled: Record<string, string>; outlined: Record<string, string> }> = {
  brandDefault: {
    filled: { background: '#2563eb', color: 'white', border: 'none' },
    outlined: { background: 'white', color: '#2563eb', border: '1px solid #2563eb' },
  },
  brandSecondary: {
    filled: { background: '#dbeafe', color: '#2563eb', border: 'none' },
    outlined: { background: 'white', color: '#2563eb', border: '1px solid #93c5fd' },
  },
  baseContainer: {
    filled: { background: '#f1f5f9', color: '#334155', border: 'none' },
    outlined: { background: 'white', color: '#334155', border: '1px solid #cbd5e1' },
  },
  successDefault: {
    filled: { background: '#22c55e', color: 'white', border: 'none' },
    outlined: { background: 'white', color: '#16a34a', border: '1px solid #22c55e' },
  },
  errorDefault: {
    filled: { background: '#ef4444', color: 'white', border: 'none' },
    outlined: { background: 'white', color: '#dc2626', border: '1px solid #ef4444' },
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
      ...props
    },
    ref
  ) => {
    const sizeStyle = sizeStyles[size];
    const colorStyle = colorStyles[color][buttonType];
    const isDisabled = disabled || isLoading;

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
      transition: 'all 150ms ease',
      width: layout === 'fillWidth' ? '100%' : 'auto',
      opacity: isDisabled ? 0.5 : 1,
      ...colorStyle,
      ...(isDisabled && {
        background: '#e2e8f0',
        color: '#94a3b8',
        border: buttonType === 'outlined' ? '1px solid #e2e8f0' : 'none',
      }),
      ...style,
    };

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-busy={isLoading}
        aria-disabled={isDisabled}
        style={buttonStyle}
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
