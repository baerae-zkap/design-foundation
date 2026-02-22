'use client';

import React, { type CSSProperties } from 'react';
import { cssVarColors } from '../../tokens/colors';
import { radius } from '../../tokens/radius';
import { easing } from '../../tokens/motion';

// ─── Types ───────────────────────────────────────────────────────────

export type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded';

export interface SkeletonProps {
  /** Visual shape @default 'rectangular' */
  variant?: SkeletonVariant;
  /** Width (px number or CSS string like '100%') */
  width?: number | string;
  /** Height (px number or CSS string) */
  height?: number | string;
  /** Border radius override */
  borderRadius?: number | string;
  /** Custom className */
  className?: string;
  /** Additional inline style */
  style?: CSSProperties;
  /** Whether animation is active @default true */
  animate?: boolean;
}

// ─── Style injection ─────────────────────────────────────────────────

const STYLE_ID = 'skeleton-shimmer-keyframes';

function injectShimmerKeyframes(): void {
  if (typeof document === 'undefined') return;
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
@keyframes skeleton-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
@media (prefers-reduced-motion: reduce) {
  [aria-busy="true"] {
    animation-duration: 0s !important;
  }
}
  `.trim();
  document.head.appendChild(style);
}

// ─── Variant border radius map ────────────────────────────────────────

function getVariantRadius(variant: SkeletonVariant): number | string {
  switch (variant) {
    case 'text':
      return radius.component.skeleton.text; // 4px
    case 'circular':
      return radius.primitive.full; // 9999px
    case 'rectangular':
      return radius.primitive.none; // 0
    case 'rounded':
      return radius.primitive.md; // 12px
  }
}

// ─── Component ───────────────────────────────────────────────────────

export const Skeleton = React.forwardRef<HTMLSpanElement, SkeletonProps>(
  function Skeleton(props, ref) {
    const {
      variant = 'rectangular',
      width,
      height,
      borderRadius: borderRadiusProp,
      className,
      style,
      animate = true,
    } = props;

    // Inject keyframes once on first render
    React.useEffect(() => {
      injectShimmerKeyframes();
    }, []);

    // Default sizes per variant
    const defaultWidth: number | string | undefined =
      variant === 'circular' ? 40 : undefined;
    const defaultHeight: number | string | undefined =
      variant === 'text' ? '1em' : variant === 'circular' ? 40 : undefined;

    const resolvedWidth = width ?? defaultWidth;
    const resolvedHeight = height ?? defaultHeight;

    const resolvedBorderRadius =
      borderRadiusProp !== undefined
        ? borderRadiusProp
        : getVariantRadius(variant);

    const baseStyle: CSSProperties = {
      display: 'block',
      width: typeof resolvedWidth === 'number' ? resolvedWidth : resolvedWidth,
      height: typeof resolvedHeight === 'number' ? resolvedHeight : resolvedHeight,
      borderRadius: resolvedBorderRadius,
      overflow: 'hidden',
      flexShrink: 0,
    };

    if (animate) {
      baseStyle.backgroundImage = `linear-gradient(90deg, ${cssVarColors.surface.base.alternative} 25%, ${cssVarColors.surface.base.default} 50%, ${cssVarColors.surface.base.alternative} 75%)`;
      baseStyle.backgroundSize = '200% 100%';
      baseStyle.animation = `skeleton-shimmer 3.5s ${easing.easeInOut} infinite`;
    } else {
      baseStyle.backgroundColor = cssVarColors.surface.base.alternative;
    }

    return (
      <span
        ref={ref}
        role="status"
        aria-busy="true"
        aria-label="로딩 중"
        className={className}
        style={{ ...baseStyle, ...style }}
      />
    );
  },
);

Skeleton.displayName = 'Skeleton';
