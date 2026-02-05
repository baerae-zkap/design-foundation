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
  small: { height: 36, fontSize: 14, padding: '0 16px' }, // button.paddingX.sm (spacing.component.button.paddingX.sm)
  medium: { height: 40, fontSize: 14, padding: '0 16px' }, // button.paddingX.sm (spacing.component.button.paddingX.sm)
  large: { height: 44, fontSize: 14, padding: '0 20px' }, // button.paddingX.md (spacing.component.button.paddingX.md)
  xLarge: { height: 48, fontSize: 16, padding: '0 24px' }, // button.paddingX.lg (spacing.component.button.paddingX.lg)
};

const colorStyles: Record<ButtonColor, {
  filled: { bg: string; bgPressed: string; color: string };
  outlined: { bg: string; bgPressed: string; color: string; border: string };
}> = {
  brandDefault: {
    filled: {
      bg: '#2563eb', // surface.brand.default (palette.blue.50)
      bgPressed: '#1d4ed8', // surface.brand.defaultPressed (palette.blue.45)
      color: 'white' // content.base.onColor (palette.static.white)
    },
    outlined: {
      bg: 'white', // surface.base.default (palette.static.white)
      bgPressed: '#eff6ff', // surface.brand.secondary light hover (palette.blue.98)
      color: '#2563eb', // content.brand.default (palette.blue.50)
      border: '#2563eb' // border.brand.default (palette.blue.50)
    },
  },
  brandSecondary: {
    filled: {
      bg: '#dbeafe', // surface.brand.secondary (palette.blue.95)
      bgPressed: '#bfdbfe', // surface.brand.secondaryPressed (palette.blue.90)
      color: '#2563eb' // content.brand.default (palette.blue.50)
    },
    outlined: {
      bg: 'white', // surface.base.default (palette.static.white)
      bgPressed: '#eff6ff', // surface.brand.secondary light hover (palette.blue.98)
      color: '#2563eb', // content.brand.default (palette.blue.50)
      border: '#93c5fd' // palette.blue.80
    },
  },
  baseContainer: {
    filled: {
      bg: '#f1f5f9', // surface.base.container (palette.grey.97)
      bgPressed: '#e2e8f0', // surface.base.containerPressed (palette.grey.95)
      color: '#334155' // content.base.default (palette.grey.30)
    },
    outlined: {
      bg: 'white', // surface.base.default (palette.static.white)
      bgPressed: '#f8fafc', // palette.grey.99
      color: '#334155', // content.base.default (palette.grey.30)
      border: '#cbd5e1' // palette.grey.90
    },
  },
  successDefault: {
    filled: {
      bg: '#22c55e', // palette.green.50
      bgPressed: '#16a34a', // palette.green.45
      color: 'white' // content.base.onColor (palette.static.white)
    },
    outlined: {
      bg: 'white', // surface.base.default (palette.static.white)
      bgPressed: '#f0fdf4', // palette.green.98
      color: '#16a34a', // palette.green.45
      border: '#22c55e' // palette.green.50
    },
  },
  errorDefault: {
    filled: {
      bg: '#ef4444', // palette.red.50
      bgPressed: '#dc2626', // palette.red.45
      color: 'white' // content.base.onColor (palette.static.white)
    },
    outlined: {
      bg: 'white', // surface.base.default (palette.static.white)
      bgPressed: '#fef2f2', // palette.red.98
      color: '#dc2626', // palette.red.45
      border: '#ef4444' // palette.red.50
    },
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

    // radius.semantic.button.sm = 8px (small, medium), radius.semantic.button.lg = 12px (large, xLarge)
    const borderRadius = size === 'large' || size === 'xLarge' ? 12 : 8;

    const buttonStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8, // spacing.component.button.gap (spacing.primitive.2)
      height: sizeStyle.height,
      padding: sizeStyle.padding,
      fontSize: sizeStyle.fontSize,
      fontWeight: 600,
      borderRadius,
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      transition: 'background-color 150ms ease',
      width: layout === 'fillWidth' ? '100%' : 'auto',
      opacity: isDisabled ? 0.5 : 1,
      background: isDisabled
        ? '#e2e8f0' // surface.disabled.default (palette.grey.95)
        : (isPressed ? colorStyle.bgPressed : colorStyle.bg),
      color: isDisabled ? '#94a3b8' : colorStyle.color, // content.disabled.default (palette.grey.80)
      border: buttonType === 'outlined'
        ? `1px solid ${isDisabled ? '#e2e8f0' : (colorStyle as { border: string }).border}` // border.disabled.default (palette.grey.95)
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
