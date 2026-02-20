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

// base: fill-alternative (~12% gray, renders as a soft gray over white)
// highlight: surface.base.default (white in light / grey-15 in dark)
const SKELETON_BASE_COLOR = 'var(--fill-alternative)';
const SKELETON_HIGHLIGHT_COLOR = cssVarColors.surface.base.default;

function ensureSkeletonKeyframes() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(KEYFRAME_ID)) return;

  const style = document.createElement('style');
  style.id = KEYFRAME_ID;
  // ::after pseudo-element sweeps a gradient stripe through the skeleton.
  // translateX(-100%)→(200%) moves from off-left to off-right, clipped by
  // the parent's overflow:hidden. This way the base color is always static
  // and only the stripe moves — not the whole element background.
  style.textContent = `
    ._zkap_sk_shimmer::after {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background-image: linear-gradient(
        to right,
        var(--skeleton-base) 0%,
        var(--skeleton-highlight) 50%,
        var(--skeleton-base) 100%
      );
      animation: _zkap_sk_shimmer 1.5s ease-in-out infinite;
      animation-fill-mode: backwards;
    }

    @keyframes _zkap_sk_shimmer {
      0%   { transform: translateX(-100%); }
      100% { transform: translateX(200%); }
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
        backgroundColor: SKELETON_BASE_COLOR,
        '--skeleton-base': SKELETON_BASE_COLOR,
        '--skeleton-highlight': SKELETON_HIGHLIGHT_COLOR,
        ...(animation === 'pulse' && {
          animation: '_zkap_sk_pulse 2s ease-in-out infinite',
        }),
        ...style,
      } as React.CSSProperties & { '--skeleton-base': string; '--skeleton-highlight': string }}
    />
  );
}
