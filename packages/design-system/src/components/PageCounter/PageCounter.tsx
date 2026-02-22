'use client';

import { type CSSProperties } from 'react';
import { cssVarColors } from '../../tokens/colors';
import { radius } from '../../tokens/radius';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';
import { opacity } from '../../tokens/general';

export type PageCounterVariant = 'normal' | 'alternative';
export type PageCounterSize = 'small' | 'medium';

export interface PageCounterProps {
  /** 1-indexed current page */
  current: number;
  /** Total number of pages */
  total: number;
  /** Visual style variant (default: 'normal') */
  variant?: PageCounterVariant;
  /** Size of the pill badge (default: 'small') */
  size?: PageCounterSize;
  className?: string;
}

interface SizeStyle {
  height: number;
  paddingX: number;
  fontSize: number;
  lineHeight: number;
  gap: number;
}

const sizeStyles: Record<PageCounterSize, SizeStyle> = {
  small: {
    height: spacing.primitive[6],
    paddingX: spacing.primitive[3],
    fontSize: typography.fontSize.compact,
    lineHeight: typography.lineHeight.compact,
    gap: spacing.primitive[1],
  },
  medium: {
    height: spacing.primitive[8],
    paddingX: spacing.primitive[4],
    fontSize: typography.fontSize.sm,
    lineHeight: typography.lineHeight.sm,
    gap: spacing.primitive[1],
  },
};

export function PageCounter({
  current,
  total,
  variant = 'normal',
  size = 'small',
  className,
}: PageCounterProps) {
  const safeTotal = Number.isFinite(total) ? Math.max(1, Math.floor(total)) : 1;
  const activePage = Number.isFinite(current)
    ? Math.min(Math.max(1, Math.floor(current)), safeTotal)
    : 1;

  const s = sizeStyles[size];

  // normal: subtle container surface, default text
  // alternative: inverted — content.base.default bg (dark in light mode), surface.base.default text (light)
  const bgColor =
    variant === 'alternative'
      ? cssVarColors.content.base.default
      : cssVarColors.surface.base.container;

  const textColor =
    variant === 'alternative'
      ? cssVarColors.surface.base.default
      : cssVarColors.content.base.default;

  const pillStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: s.height,
    paddingInline: s.paddingX,
    borderRadius: radius.primitive.full,
    backgroundColor: bgColor,
    color: textColor,
    fontSize: s.fontSize,
    lineHeight: `${s.lineHeight}px`,
    fontWeight: typography.fontWeight.medium,
    fontVariantNumeric: 'tabular-nums',
    whiteSpace: 'nowrap',
    userSelect: 'none',
  };

  const separatorStyle: CSSProperties = {
    display: 'inline-block',
    marginInline: s.gap,
    opacity: opacity.disabled,
  };

  return (
    <div
      className={className}
      style={pillStyle}
      role="status"
      aria-label={`${activePage} / ${safeTotal} 페이지`}
    >
      <span>{activePage}</span>
      <span style={separatorStyle}>/</span>
      <span>{safeTotal}</span>
    </div>
  );
}
