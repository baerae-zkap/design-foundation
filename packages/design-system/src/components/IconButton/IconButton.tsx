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
import { cssVarColors } from '../../tokens/colors';
import { radius } from '../../tokens/radius';
import { spacing } from '../../tokens/spacing';
import { opacity } from '../../tokens/general';
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
  small: { size: spacing.component.iconButton.size.sm, iconSize: spacing.component.iconButton.iconSize.sm },
  medium: { size: spacing.component.iconButton.size.md, iconSize: spacing.component.iconButton.iconSize.md },
  large: { size: spacing.component.iconButton.size.lg, iconSize: spacing.component.iconButton.iconSize.lg },
};

const colorStyles: Record<IconButtonColor, {
  filled: { bg: string; bgPressed: string; color: string };
  ghost: { bg: string; bgHover: string; bgPressed: string; color: string; colorPressed: string };
  outlined: { bg: string; bgPressed: string; color: string; border: string };
}> = {
  brandDefault: {
    filled: {
      bg: cssVarColors.surface.brand.default,
      bgPressed: cssVarColors.surface.brand.defaultPressed,
      color: cssVarColors.content.base.onColor
    },
    ghost: {
      bg: 'transparent',
      bgHover: cssVarColors.fill.alternative,
      bgPressed: cssVarColors.fill.normal,
      color: cssVarColors.content.brand.default,
      colorPressed: cssVarColors.surface.brand.defaultPressed
    },
    outlined: {
      bg: cssVarColors.surface.base.default,
      bgPressed: cssVarColors.surface.brand.secondary,
      color: cssVarColors.content.brand.default,
      border: cssVarColors.border.brand.default
    },
  },
  baseDefault: {
    filled: {
      bg: cssVarColors.content.base.default,
      bgPressed: cssVarColors.inverse.surface.default,
      color: cssVarColors.content.base.onColor
    },
    ghost: {
      bg: 'transparent',
      bgHover: cssVarColors.fill.alternative,
      bgPressed: cssVarColors.fill.normal,
      color: cssVarColors.content.base.default,
      colorPressed: cssVarColors.inverse.surface.default
    },
    outlined: {
      bg: cssVarColors.surface.base.default,
      bgPressed: cssVarColors.surface.base.alternative,
      color: cssVarColors.content.base.default,
      border: cssVarColors.border.secondary.default
    },
  },
  errorDefault: {
    filled: {
      bg: cssVarColors.surface.error.solid,
      bgPressed: cssVarColors.surface.error.solidPressed,
      color: cssVarColors.content.base.onColor
    },
    ghost: {
      bg: 'transparent',
      bgHover: cssVarColors.status.negative.surface,
      bgPressed: cssVarColors.status.negative.surface,
      color: cssVarColors.content.error.default,
      colorPressed: cssVarColors.surface.error.solidPressed
    },
    outlined: {
      bg: cssVarColors.surface.base.default,
      bgPressed: cssVarColors.surface.error.default,
      color: cssVarColors.content.error.default,
      border: cssVarColors.border.error.default
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
      opacity: disabled ? opacity.disabled : 1,
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
