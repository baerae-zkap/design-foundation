/**
 * IconButton Component (Web)
 *
 * @description 아이콘만으로 구성된 원형 버튼입니다.
 * @see docs/components/IconButton.md - AI용 상세 가이드
 *
 * @example
 * <IconButton
 *   variant="filled"
 *   color="primary"
 *   size="medium"
 *   onClick={() => {}}
 * >
 *   <PlusIcon />
 * </IconButton>
 */

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cssVarColors } from '../../tokens/colors';
import { radius } from '../../tokens/radius';
import { spacing } from '../../tokens/spacing';
import { opacity } from '../../tokens/general';
import { transitions } from '../../utils/styles';
import { usePressable } from '../../utils/usePressable';

export type IconButtonVariant = 'filled' | 'ghost' | 'weak';
export type IconButtonColor = 'primary' | 'neutral' | 'error';
export type IconButtonSize = 'small' | 'medium' | 'large';

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  /** 버튼 스타일 - filled(채워진), ghost(투명), weak(연한 배경) */
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
  weak: { bg: string; bgPressed: string; color: string };
}> = {
  primary: {
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
    weak: {
      bg: cssVarColors.surface.brand.secondary,
      bgPressed: cssVarColors.surface.brand.secondaryPressed,
      color: cssVarColors.content.brand.default,
    },
  },
  neutral: {
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
    weak: {
      bg: cssVarColors.surface.base.container,
      bgPressed: cssVarColors.surface.base.containerPressed,
      color: cssVarColors.content.base.default,
    },
  },
  error: {
    filled: {
      bg: cssVarColors.surface.error.solid,
      bgPressed: cssVarColors.surface.error.solidPressed,
      color: cssVarColors.content.base.onColor
    },
    ghost: {
      bg: 'transparent',
      bgHover: cssVarColors.surface.error.default,
      bgPressed: cssVarColors.surface.error.default,
      color: cssVarColors.content.error.default,
      colorPressed: cssVarColors.surface.error.solidPressed
    },
    weak: {
      bg: cssVarColors.surface.error.default,
      bgPressed: cssVarColors.surface.error.defaultPressed,
      color: cssVarColors.content.error.default,
    },
  },
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      variant = 'ghost',
      color = 'neutral',
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
    const { isPressed, isHovered, handlers } = usePressable<HTMLButtonElement>({
      disabled,
      onMouseDown,
      onMouseUp,
      onMouseLeave,
      onMouseEnter,
    });

    const sizeStyle = sizeStyles[size];
    const colorStyle = colorStyles[color][variant];

    // Determine background color based on state
    const getBackgroundColor = (): string => {
      if (variant === 'ghost') {
        const s = colorStyle as typeof colorStyles.primary.ghost;
        return isPressed ? s.bgPressed : isHovered ? s.bgHover : s.bg;
      }
      const s = colorStyle as typeof colorStyles.primary[typeof variant];
      return isPressed ? s.bgPressed : s.bg;
    };

    // Determine icon color
    const getIconColor = (): string => {
      if (variant === 'ghost') {
        const s = colorStyle as typeof colorStyles.primary.ghost;
        return isPressed ? s.colorPressed : s.color;
      }
      return (colorStyle as typeof colorStyles.primary.filled).color;
    };

    const buttonStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: sizeStyle.size,
      height: sizeStyle.size,
      borderRadius: radius.primitive.lg,
      border: 'none',
      backgroundColor: getBackgroundColor(),
      color: getIconColor(),
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
        {...handlers}
        {...props}
      >
        <span style={iconWrapperStyle}>{children}</span>
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
