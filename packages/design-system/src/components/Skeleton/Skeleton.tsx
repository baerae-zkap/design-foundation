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

type SkeletonAnimationStyle = React.CSSProperties & {
  '--skeleton-base'?: string;
  '--skeleton-highlight'?: string;
};

function ensureSkeletonKeyframes() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(KEYFRAME_ID)) return;

  const style = document.createElement('style');
  style.id = KEYFRAME_ID;
  style.textContent = `
    @keyframes _zkap_sk_shimmer {
      0% { background-position: 100% 0; }
      100% { background-position: 0% 0; }
    }

    @keyframes _zkap_sk_pulse {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 1; }
    }
  `;
  document.head.appendChild(style);
}

// base: fill-alternative (~12% opacity gray) — renders as light gray over white bg
// highlight: surface.base.default (white in light / grey-15 in dark) — lighter than base in both modes
const SKELETON_BASE_COLOR = 'var(--fill-alternative)';
const SKELETON_HIGHLIGHT_COLOR = cssVarColors.surface.base.default;

function buildAnimationStyle(animation: SkeletonAnimation): SkeletonAnimationStyle {
  if (animation === 'none') {
    return {
      backgroundColor: SKELETON_BASE_COLOR,
    };
  }

  if (animation === 'pulse') {
    return {
      backgroundColor: SKELETON_BASE_COLOR,
      animation: '_zkap_sk_pulse 2s ease-in-out infinite',
    };
  }

  // backgroundSize: 300% makes the gradient 3× the element width.
  // The element always shows only the CENTER third of the gradient, so the
  // fade zones (base→highlight transitions) are always outside the visible area.
  // No backgroundColor layer — the gradient itself covers the element entirely,
  // avoiding color stacking artifacts from semi-transparent fill-alternative.
  return {
    '--skeleton-base': SKELETON_BASE_COLOR,
    '--skeleton-highlight': SKELETON_HIGHLIGHT_COLOR,
    backgroundImage: 'linear-gradient(90deg, var(--skeleton-base) 40%, var(--skeleton-highlight) 50%, var(--skeleton-base) 60%)',
    backgroundSize: '300% 100%',
    backgroundRepeat: 'no-repeat',
    animation: '_zkap_sk_shimmer 1.5s ease-in-out infinite',
  };
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

  const animationStyle = buildAnimationStyle(animation);

  return (
    <span
      role="img"
      aria-label={ariaLabel}
      className={className}
      style={{
        display: 'block',
        width: resolvedWidth,
        height: resolvedHeight,
        borderRadius: resolvedBorderRadius,
        flexShrink: 0,
        ...animationStyle,
        ...style,
      }}
    />
  );
}
