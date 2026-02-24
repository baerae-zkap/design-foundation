'use client';

import React, { type CSSProperties } from 'react';
import { cssVarColors } from '../../tokens/colors';
import { radius } from '../../tokens/radius';
import { skeleton as skeletonMotion } from '../../tokens/motion';

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

    const spanRef = React.useRef<HTMLSpanElement>(null);

    const mergedRef = React.useCallback(
      (node: HTMLSpanElement | null) => {
        (spanRef as React.MutableRefObject<HTMLSpanElement | null>).current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLSpanElement | null>).current = node;
      },
      [ref],
    );

    // Pure JS opacity animation via requestAnimationFrame — no CSS @keyframes needed
    React.useEffect(() => {
      const el = spanRef.current;
      if (!animate || !el) return;

      let raf: number;
      let startTime: number | null = null;
      const { duration, opacityMin, opacityMax } = skeletonMotion.pulse;
      const mid = (opacityMin + opacityMax) / 2;   // 0.8
      const amp = (opacityMax - opacityMin) / 2;   // 0.2

      function tick(time: number) {
        if (startTime === null) startTime = time;
        const elapsed = (time - startTime) % duration;
        const progress = elapsed / duration;
        // Pulse: max → min → max using cosine wave
        const opacity = mid + amp * Math.cos(progress * Math.PI * 2);
        el!.style.opacity = String(opacity);
        raf = requestAnimationFrame(tick);
      }

      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }, [animate]);

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
      width: resolvedWidth,
      height: resolvedHeight,
      borderRadius: resolvedBorderRadius,
      overflow: 'hidden',
      flexShrink: 0,
      backgroundColor: cssVarColors.fill.alternative,
    };

    return (
      <span
        ref={mergedRef}
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
