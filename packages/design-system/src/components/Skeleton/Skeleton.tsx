'use client';

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

// --_sk-base and --_sk-shine are injected globally with dark-mode overrides.
// The element sets backgroundColor: var(--_sk-base) so it always matches
// the ::after gradient's base zones — zero visible seam regardless of theme.
//
// Light mode:
//   --_sk-base  = surface.base.containerPressed (grey-95, L≈86%) — clearly visible gray
//   --_sk-shine = surface.base.default          (white, L=100%)  — lighter stripe ✓
//
// Dark mode:
//   --_sk-base  = surface.base.container        (grey-20, L≈16%) — raised surface
//   --_sk-shine = surface.base.containerPressed (grey-23, L≈21%) — lighter stripe ✓
//
// Gradient stops at 45%/50%/55%: shine band = 10% of 300%-wide ::after = 30% of parent.
// Clearly a narrow stripe, not a full-element glow.

function ensureSkeletonKeyframes() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(KEYFRAME_ID)) return;

  const style = document.createElement('style');
  style.id = KEYFRAME_ID;
  style.textContent = `
    :root {
      --_sk-base:  var(--surface-base-containerPressed);
      --_sk-shine: var(--surface-base-default);
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --_sk-base:  var(--surface-base-container);
        --_sk-shine: var(--surface-base-containerPressed);
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
        backgroundColor: 'var(--_sk-base)',
        ...(animation === 'pulse' && {
          animation: '_zkap_sk_pulse 2s ease-in-out infinite',
        }),
        ...style,
      }}
    />
  );
}
