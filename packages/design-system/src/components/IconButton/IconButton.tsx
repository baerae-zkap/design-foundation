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
import { colors, palette } from '../../tokens/colors';
import { radius } from '../../tokens/radius';
import { transitions } from '../../utils/styles';

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
    filled: {
      bg: colors.surface.brand.default,
      bgPressed: colors.surface.brand.defaultPressed,
      color: colors.content.base.onColor
    },
    ghost: {
      bg: 'transparent',
      bgHover: 'rgba(37, 99, 235, 0.08)',
      bgPressed: 'rgba(37, 99, 235, 0.12)',
      color: colors.content.brand.default,
      colorPressed: colors.surface.brand.defaultPressed
    },
    outlined: {
      bg: colors.surface.base.default,
      bgPressed: palette.blue[98],
      color: colors.content.brand.default,
      border: colors.border.brand.default
    },
  },
  baseDefault: {
    filled: {
      bg: colors.content.base.default,
      bgPressed: palette.grey[20],
      color: colors.content.base.onColor
    },
    ghost: {
      bg: 'transparent',
      bgHover: 'rgba(0, 0, 0, 0.04)',
      bgPressed: 'rgba(0, 0, 0, 0.08)',
      color: colors.content.base.default,
      colorPressed: palette.grey[20]
    },
    outlined: {
      bg: colors.surface.base.default,
      bgPressed: colors.surface.base.alternative,
      color: colors.content.base.default,
      border: colors.border.secondary.default
    },
  },
  errorDefault: {
    filled: {
      bg: colors.surface.error.solid,
      bgPressed: colors.surface.error.solidPressed,
      color: colors.content.base.onColor
    },
    ghost: {
      bg: 'transparent',
      bgHover: 'rgba(239, 68, 68, 0.08)',
      bgPressed: 'rgba(239, 68, 68, 0.12)',
      color: colors.content.error.default,
      colorPressed: colors.surface.error.solidPressed
    },
    outlined: {
      bg: colors.surface.base.default,
      bgPressed: palette.red[98],
      color: palette.red[45],
      border: colors.border.error.default
    },
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
      borderRadius: radius.primitive.full,
      border: variant === 'outlined' ? `1px solid ${(colorStyle as typeof colorStyles.brandDefault.outlined).border}` : 'none',
      backgroundColor,
      color: iconColor,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      transition: transitions.all,
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
