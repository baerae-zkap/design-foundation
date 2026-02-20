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
      from { background-position: -200px 0; }
      to { background-position: calc(200px + 100%) 0; }
    }

    @keyframes _zkap_sk_pulse {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 1; }
    }
  `;
  document.head.appendChild(style);
}

function buildAnimationStyle(animation: SkeletonAnimation): SkeletonAnimationStyle {
  if (animation === 'none') {
    return {
      backgroundColor: cssVarColors.surface.base.alternative,
    };
  }

  if (animation === 'pulse') {
    return {
      backgroundColor: cssVarColors.surface.base.alternative,
      animation: '_zkap_sk_pulse 2s ease-in-out infinite',
    };
  }

  return {
    '--skeleton-base': cssVarColors.surface.base.alternative,
    '--skeleton-highlight': cssVarColors.surface.base.default,
    backgroundImage: 'linear-gradient(90deg, var(--skeleton-base) 25%, var(--skeleton-highlight) 50%, var(--skeleton-base) 75%)',
    backgroundSize: '400px 100%',
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
