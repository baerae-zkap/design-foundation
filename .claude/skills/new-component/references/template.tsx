/**
 * ComponentName (Web)
 *
 * @description Brief description of what the component does.
 *
 * @example
 * <ComponentName variant="filled" color="primary" size="md" onClick={() => {}}>
 *   Label
 * </ComponentName>
 */

"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cssVarColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { typography } from '../../tokens/typography';
import { opacity } from '../../tokens/general';
import { usePressable } from '../../utils/usePressable';
import { transitions } from '../../utils/styles';

// -- Types --

export type ComponentNameVariant = 'filled' | 'weak';
export type ComponentNameColor = 'primary' | 'neutral' | 'error';
export type ComponentNameSize = 'sm' | 'md' | 'lg';

export interface ComponentNameProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  /** Visual style variant */
  variant?: ComponentNameVariant;
  /** Color theme */
  color?: ComponentNameColor;
  /** Component size */
  size?: ComponentNameSize;
  /** Disabled state */
  disabled?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Content */
  children: ReactNode;
  /** Additional CSS class */
  className?: string;
}

// -- Size Styles --

const sizeStyles: Record<ComponentNameSize, {
  height: number;
  fontSize: number;
  padding: string;
}> = {
  sm: {
    height: 36,
    fontSize: typography.fontSize.sm,
    padding: `0 ${spacing.semantic.inset.sm}px`,
  },
  md: {
    height: 40,
    fontSize: typography.fontSize.sm,
    padding: `0 ${spacing.semantic.inset.sm}px`,
  },
  lg: {
    height: 44,
    fontSize: typography.fontSize.md,
    padding: `0 ${spacing.semantic.inset.md}px`,
  },
};

// -- Color Styles --
// Map each color to variant-specific token values.
// Always use cssVarColors.* -- never raw hex.

const colorStyles: Record<ComponentNameColor, {
  filled: { bg: string; bgPressed: string; text: string };
  weak: { bg: string; bgPressed: string; text: string };
}> = {
  primary: {
    filled: {
      bg: cssVarColors.surface.brand.default,
      bgPressed: cssVarColors.surface.brand.defaultPressed,
      text: cssVarColors.content.base.onColor,
    },
    weak: {
      bg: cssVarColors.surface.brand.secondary,
      bgPressed: cssVarColors.surface.brand.secondaryPressed,
      text: cssVarColors.content.brand.default,
    },
  },
  neutral: {
    filled: {
      bg: cssVarColors.surface.base.container,
      bgPressed: cssVarColors.surface.base.containerPressed,
      text: cssVarColors.content.base.default,
    },
    weak: {
      bg: cssVarColors.surface.base.container,
      bgPressed: cssVarColors.surface.base.containerPressed,
      text: cssVarColors.content.base.default,
    },
  },
  error: {
    filled: {
      bg: cssVarColors.surface.error.solid,
      bgPressed: cssVarColors.surface.error.solidPressed,
      text: cssVarColors.content.base.onColor,
    },
    weak: {
      bg: cssVarColors.surface.error.default,
      bgPressed: cssVarColors.surface.error.defaultPressed,
      text: cssVarColors.content.error.default,
    },
  },
};

// -- Component --

export const ComponentName = forwardRef<HTMLButtonElement, ComponentNameProps>(
  (
    {
      variant = 'filled',
      color = 'primary',
      size = 'md',
      disabled = false,
      children,
      className,
      style,
      onMouseDown,
      onMouseUp,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const { isPressed, handlers } = usePressable<HTMLButtonElement>({
      disabled,
      onMouseDown,
      onMouseUp,
      onMouseLeave,
    });

    const sizeStyle = sizeStyles[size];
    const colorStyle = colorStyles[color][variant];

    const componentStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: sizeStyle.height,
      padding: sizeStyle.padding,
      fontSize: sizeStyle.fontSize,
      fontWeight: typography.fontWeight.semibold,
      borderRadius: radius.component.button.sm,
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: transitions.background,
      opacity: disabled ? opacity.disabled : 1,
      background: disabled
        ? cssVarColors.surface.disabled.default
        : isPressed
          ? colorStyle.bgPressed
          : colorStyle.bg,
      color: disabled
        ? cssVarColors.content.disabled.default
        : colorStyle.text,
      border: 'none',
      ...style,
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        aria-disabled={disabled}
        className={className}
        style={componentStyle}
        {...handlers}
        {...props}
      >
        {children}
      </button>
    );
  }
);

ComponentName.displayName = 'ComponentName';
