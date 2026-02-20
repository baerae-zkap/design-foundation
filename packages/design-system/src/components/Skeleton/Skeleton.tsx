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

// Both tokens are OPAQUE — no stacking artifacts when used together.
// surface.base.alternative: grey-99 (light) / grey-10 (dark)
// surface.base.default:     white (light) / grey-15 (dark)
const SKELETON_BASE = cssVarColors.surface.base.alternative;
const SKELETON_HIGHLIGHT = cssVarColors.surface.base.default;

function ensureSkeletonKeyframes() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(KEYFRAME_ID)) return;

  const style = document.createElement('style');
  style.id = KEYFRAME_ID;
  // ::after is 300% wide, centered at left:-100%.
  // The element (overflow:hidden) always shows only the MIDDLE third
  // of the ::after. The gradient's fade zones (base→highlight) live in
  // the outer thirds — outside the visible area — so they never appear
  // cut off at the element edges.
  // translateX(-100%→+100%) moves the ::after by its own width (3× element),
  // sweeping the highlight from far-left to far-right of the element.
  style.textContent = `
    ._zkap_sk_shimmer::after {
      content: '';
      position: absolute;
      top: 0; bottom: 0;
      left: -100%;
      width: 300%;
      background-image: linear-gradient(
        to right,
        var(--skeleton-base)      35%,
        var(--skeleton-highlight) 50%,
        var(--skeleton-base)      65%
      );
      animation: _zkap_sk_shimmer 1.5s ease-in-out infinite;
      animation-fill-mode: backwards;
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
        backgroundColor: SKELETON_BASE,
        '--skeleton-base': SKELETON_BASE,
        '--skeleton-highlight': SKELETON_HIGHLIGHT,
        ...(animation === 'pulse' && {
          animation: '_zkap_sk_pulse 2s ease-in-out infinite',
        }),
        ...style,
      } as React.CSSProperties & { '--skeleton-base': string; '--skeleton-highlight': string }}
    />
  );
}
