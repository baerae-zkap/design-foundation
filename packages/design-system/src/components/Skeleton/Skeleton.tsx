'use client';

import { cssVarColors } from '../../tokens';

export type SkeletonVariant = 'text' | 'rectangle' | 'circle';
export type SkeletonAnimation = 'shimmer' | 'pulse' | 'none';

export interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: number | string;
  height?: number | string;
  borderRadius?: number | string;
  animation?: SkeletonAnimation;
  style?: React.CSSProperties;
  className?: string;
  'aria-label'?: string;
}

const KEYFRAME_ID = '__zkap_skeleton_keyframes';

// Skeleton color design (all tokens are OPAQUE — no stacking issues):
//
// BASE  = surface.base.container
//   light: grey-97 (L≈92%) — visible gray against white page
//   dark:  grey-20 (L≈16%) — raised surface against grey-15 page
//
// SHINE (light) = surface.base.default  → white (L=100%) > grey-97 ✓
// SHINE (dark)  = surface.base.containerPressed → grey-23 (L≈21%) > grey-20 ✓
//
// Theme-aware: injected CSS sets --_sk-shine per prefers-color-scheme.
// The ::after gradient uses the SAME --_sk-base as the element's backgroundColor,
// so the base zones of the gradient are invisible against the host — no seam.

const BASE  = cssVarColors.surface.base.container;
const SHINE_LIGHT = cssVarColors.surface.base.default;
const SHINE_DARK  = cssVarColors.surface.base.containerPressed;

function ensureSkeletonKeyframes() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(KEYFRAME_ID)) return;

  const style = document.createElement('style');
  style.id = KEYFRAME_ID;

  // --_sk-base:  element background AND the solid portions of the ::after gradient.
  //              Same token → gradient base zones are visually invisible against host.
  // --_sk-shine: the bright stripe peak; differs per theme.
  //
  // ::after is 300% wide, anchored at left: -100%.
  // Without transform: spans x = [-parent, +2parent].
  //
  // @keyframes move the ::after by ±100% of its OWN width (= ±3×parent):
  //   start (translateX(-100%)): left edge at -4×parent → fully off left
  //   end   (translateX(+100%)): left edge at +2×parent → fully off right
  //
  // Gradient stop positions 45%/50%/55% create a narrow shine band:
  //   shine band width = 10% of 300% = 30% of parent — clearly a stripe, not a glow.
  //   Base zones (0-45% and 55-100%) match the host backgroundColor exactly → no seam.

  style.textContent = `
    :root {
      --_sk-base:  ${BASE};
      --_sk-shine: ${SHINE_LIGHT};
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --_sk-base:  ${BASE};
        --_sk-shine: ${SHINE_DARK};
      }
    }

    ._zkap_sk_shimmer::after {
      content: '';
      position: absolute;
      top: 0; bottom: 0;
      left: -100%;
      width: 300%;
      background-image: linear-gradient(
        to right,
        var(--_sk-base)  45%,
        var(--_sk-shine) 50%,
        var(--_sk-base)  55%
      );
      animation: _zkap_sk_shimmer 1.6s linear infinite;
      will-change: transform;
    }

    @keyframes _zkap_sk_shimmer {
      0%   { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }

    @keyframes _zkap_sk_pulse {
      0%, 100% { opacity: 0.5; }
      50%       { opacity: 1; }
    }
  `;
  document.head.appendChild(style);
}

export function Skeleton({
  variant = 'rectangle',
  width,
  height,
  borderRadius,
  animation = 'shimmer',
  style,
  className,
  'aria-label': ariaLabel = '로딩 중',
}: SkeletonProps) {
  ensureSkeletonKeyframes();

  const resolvedWidth = width ?? (variant === 'circle' ? (height ?? 40) : '100%');
  const resolvedHeight = height ?? (variant === 'text' ? 14 : variant === 'circle' ? (width ?? 40) : 80);
  const resolvedBorderRadius = borderRadius ?? (variant === 'text' ? 4 : variant === 'circle' ? '50%' : 8);

  const shimmerClass = '_zkap_sk_shimmer';
  const combinedClass = animation === 'shimmer'
    ? (className ? `${shimmerClass} ${className}` : shimmerClass)
    : className;

  return (
    <span
      role="img"
      aria-label={ariaLabel}
      className={combinedClass}
      style={{
        display: 'block',
        width: resolvedWidth,
        height: resolvedHeight,
        borderRadius: resolvedBorderRadius,
        flexShrink: 0,
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: BASE,
        ...(animation === 'pulse' && {
          animation: '_zkap_sk_pulse 2s ease-in-out infinite',
        }),
        ...style,
      }}
    />
  );
}
