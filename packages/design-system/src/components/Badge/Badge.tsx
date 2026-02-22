'use client';

import React, { type CSSProperties } from 'react';
import { cssVarColors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';
import { radius } from '../../tokens/radius';
import { borderWidth } from '../../tokens/general';
import { spacing } from '../../tokens/spacing';

// ─── Types ───────────────────────────────────────────────────────────

export type BadgeColor = 'neutral' | 'primary' | 'success' | 'error' | 'warning' | 'info';
export type BadgeVariant = 'filled' | 'weak' | 'outline';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
  children: React.ReactNode;
  /** Color theme @default 'neutral' */
  color?: BadgeColor;
  /** Style variant @default 'filled' */
  variant?: BadgeVariant;
  /** Size @default 'md' */
  size?: BadgeSize;
  /** Leading icon */
  leadingIcon?: React.ReactNode;
  style?: CSSProperties;
}

// ─── Color Config ─────────────────────────────────────────────────────

const colorConfig: Record<BadgeColor, Record<BadgeVariant, { bg: string; text: string; border?: string }>> = {
  neutral: {
    filled: {
      bg: cssVarColors.fill.normal,
      text: cssVarColors.content.base.secondary,
    },
    weak: {
      bg: cssVarColors.surface.base.alternative,
      text: cssVarColors.content.base.secondary,
    },
    outline: {
      bg: 'transparent',
      text: cssVarColors.content.base.secondary,
      border: 'var(--border-base-default, var(--divider))',
    },
  },
  primary: {
    filled: {
      bg: cssVarColors.surface.brand.default,
      text: cssVarColors.content.base.onColor,
    },
    weak: {
      bg: cssVarColors.surface.brand.secondary,
      text: cssVarColors.content.brand.default,
    },
    outline: {
      bg: 'transparent',
      text: cssVarColors.content.brand.default,
      border: cssVarColors.surface.brand.default,
    },
  },
  success: {
    filled: {
      bg: cssVarColors.surface.success.default,
      text: cssVarColors.content.base.onColor,
    },
    weak: {
      // fallback pattern: subtle tokens not yet in cssVarColors
      bg: 'var(--surface-success-subtle, var(--surface-success-default))',
      text: cssVarColors.content.success.default,
    },
    outline: {
      bg: 'transparent',
      text: cssVarColors.content.success.default,
      border: cssVarColors.surface.success.default,
    },
  },
  error: {
    filled: {
      bg: cssVarColors.surface.error.default,
      text: cssVarColors.content.base.onColor,
    },
    weak: {
      // fallback pattern: subtle tokens not yet in cssVarColors
      bg: 'var(--surface-error-subtle, var(--surface-error-default))',
      text: cssVarColors.content.error.default,
    },
    outline: {
      bg: 'transparent',
      text: cssVarColors.content.error.default,
      border: cssVarColors.surface.error.default,
    },
  },
  warning: {
    filled: {
      bg: cssVarColors.surface.warning.default,
      text: cssVarColors.content.base.onColor,
    },
    weak: {
      // fallback pattern: subtle tokens not yet in cssVarColors
      bg: 'var(--surface-warning-subtle, var(--surface-warning-default))',
      text: cssVarColors.content.warning.default,
    },
    outline: {
      bg: 'transparent',
      text: cssVarColors.content.warning.default,
      border: cssVarColors.surface.warning.default,
    },
  },
  info: {
    filled: {
      bg: cssVarColors.surface.info.default,
      text: cssVarColors.content.base.onColor,
    },
    weak: {
      // fallback pattern: subtle tokens not yet in cssVarColors
      bg: 'var(--surface-info-subtle, var(--surface-info-default))',
      text: cssVarColors.content.info.default,
    },
    outline: {
      bg: 'transparent',
      text: cssVarColors.content.info.default,
      border: cssVarColors.surface.info.default,
    },
  },
};

// ─── Size Config ──────────────────────────────────────────────────────

const sizeConfig: Record<BadgeSize, { height: number; paddingX: number; fontSize: number; iconSize: number }> = {
  sm: { height: spacing.component.badge.height.sm, paddingX: spacing.component.badge.paddingX.sm, fontSize: typography.fontSize.xs, iconSize: spacing.component.badge.iconSize.sm },
  md: { height: spacing.component.badge.height.md, paddingX: spacing.component.badge.paddingX.md, fontSize: typography.fontSize.xs, iconSize: spacing.component.badge.iconSize.md },
};

// ─── Component ────────────────────────────────────────────────────────

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  function Badge(props, ref) {
    const {
      children,
      color = 'neutral',
      variant = 'filled',
      size = 'md',
      leadingIcon,
      style,
    } = props;

    const colors = colorConfig[color][variant];
    const sizes = sizeConfig[size];

    const badgeStyle: CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.primitive[1],
      height: sizes.height,
      padding: `0 ${sizes.paddingX}px`,
      fontSize: sizes.fontSize,
      fontWeight: typography.fontWeight.medium,
      lineHeight: 1,
      color: colors.text,
      backgroundColor: colors.bg,
      borderRadius: radius.primitive.full,
      whiteSpace: 'nowrap',
      border: colors.border ? `${borderWidth.default}px solid ${colors.border}` : 'none',
      boxSizing: 'border-box',
      ...style,
    };

    return (
      <span ref={ref} style={badgeStyle}>
        {leadingIcon && (
          <span style={{
            width: sizes.iconSize,
            height: sizes.iconSize,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            {leadingIcon}
          </span>
        )}
        {children}
      </span>
    );
  },
);

Badge.displayName = 'Badge';
