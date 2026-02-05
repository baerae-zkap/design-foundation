/**
 * IconButton Component (Web)
 *
 * @description 아이콘만으로 구성된 원형 버튼입니다.
 * @see docs/components/IconButton.md - AI용 상세 가이드
 *
 * @example
 * <IconButton
 *   variant="filled"
 *   color="brandDefault"
 *   size="medium"
 *   onClick={() => {}}
 * >
 *   <PlusIcon />
 * </IconButton>
 */

import { forwardRef, useState, type ButtonHTMLAttributes, type ReactNode } from 'react';

export type IconButtonVariant = 'filled' | 'ghost' | 'outlined';
export type IconButtonColor = 'brandDefault' | 'baseDefault' | 'errorDefault';
export type IconButtonSize = 'small' | 'medium' | 'large';

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  /** 버튼 스타일 - filled(채워진), ghost(투명), outlined(테두리) */
  variant?: IconButtonVariant;
  /** 색상 테마 */
  color?: IconButtonColor;
  /** 버튼 크기 */
  size?: IconButtonSize;
  /** 아이콘 콘텐츠 */
  children: ReactNode;
}

// Size: button size, icon size
const sizeStyles: Record<IconButtonSize, { size: number; iconSize: number }> = {
  small: { size: 32, iconSize: 18 },
  medium: { size: 40, iconSize: 22 },
  large: { size: 48, iconSize: 26 },
};

const colorStyles: Record<IconButtonColor, {
  filled: { bg: string; bgPressed: string; color: string };
  ghost: { bg: string; bgHover: string; bgPressed: string; color: string; colorPressed: string };
  outlined: { bg: string; bgPressed: string; color: string; border: string };
}> = {
  brandDefault: {
    filled: { bg: '#2563eb', bgPressed: '#1d4ed8', color: 'white' },
    ghost: { bg: 'transparent', bgHover: 'rgba(37, 99, 235, 0.08)', bgPressed: 'rgba(37, 99, 235, 0.12)', color: '#2563eb', colorPressed: '#1d4ed8' },
    outlined: { bg: 'white', bgPressed: '#eff6ff', color: '#2563eb', border: '#2563eb' },
  },
  baseDefault: {
    filled: { bg: '#334155', bgPressed: '#1e293b', color: 'white' },
    ghost: { bg: 'transparent', bgHover: 'rgba(0, 0, 0, 0.04)', bgPressed: 'rgba(0, 0, 0, 0.08)', color: '#334155', colorPressed: '#1e293b' },
    outlined: { bg: 'white', bgPressed: '#f8fafc', color: '#334155', border: '#cbd5e1' },
  },
  errorDefault: {
    filled: { bg: '#ef4444', bgPressed: '#dc2626', color: 'white' },
    ghost: { bg: 'transparent', bgHover: 'rgba(239, 68, 68, 0.08)', bgPressed: 'rgba(239, 68, 68, 0.12)', color: '#ef4444', colorPressed: '#dc2626' },
    outlined: { bg: 'white', bgPressed: '#fef2f2', color: '#dc2626', border: '#ef4444' },
  },
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      variant = 'ghost',
      color = 'baseDefault',
      size = 'medium',
      disabled = false,
      children,
      style,
      onMouseDown,
      onMouseUp,
      onMouseLeave,
      onMouseEnter,
      ...props
    },
    ref
  ) => {
    const [isPressed, setIsPressed] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const sizeStyle = sizeStyles[size];
    const colorStyle = colorStyles[color][variant];

    const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled) setIsPressed(true);
      onMouseDown?.(e);
    };

    const handleMouseUp = (e: React.MouseEvent<HTMLButtonElement>) => {
      setIsPressed(false);
      onMouseUp?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      setIsPressed(false);
      setIsHovered(false);
      onMouseLeave?.(e);
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled) setIsHovered(true);
      onMouseEnter?.(e);
    };

    // Determine background color based on state
    let backgroundColor: string;
    if (variant === 'ghost') {
      const ghostStyle = colorStyle as typeof colorStyles.brandDefault.ghost;
      backgroundColor = isPressed ? ghostStyle.bgPressed : isHovered ? ghostStyle.bgHover : ghostStyle.bg;
    } else if (variant === 'filled') {
      const filledStyle = colorStyle as typeof colorStyles.brandDefault.filled;
      backgroundColor = isPressed ? filledStyle.bgPressed : filledStyle.bg;
    } else {
      const outlinedStyle = colorStyle as typeof colorStyles.brandDefault.outlined;
      backgroundColor = isPressed ? outlinedStyle.bgPressed : outlinedStyle.bg;
    }

    // Determine text/icon color
    let iconColor: string;
    if (variant === 'ghost') {
      const ghostStyle = colorStyle as typeof colorStyles.brandDefault.ghost;
      iconColor = isPressed ? ghostStyle.colorPressed : ghostStyle.color;
    } else {
      iconColor = (colorStyle as typeof colorStyles.brandDefault.filled).color;
    }

    const buttonStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: sizeStyle.size,
      height: sizeStyle.size,
      borderRadius: 9999,
      border: variant === 'outlined' ? `1px solid ${(colorStyle as typeof colorStyles.brandDefault.outlined).border}` : 'none',
      backgroundColor,
      color: iconColor,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      transition: 'background-color 0.15s ease, color 0.15s ease',
      padding: 0,
      outline: 'none',
      ...style,
    };

    const iconWrapperStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: sizeStyle.iconSize,
      height: sizeStyle.iconSize,
    };

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        style={buttonStyle}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        {...props}
      >
        <span style={iconWrapperStyle}>{children}</span>
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
