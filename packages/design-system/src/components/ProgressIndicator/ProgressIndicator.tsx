'use client';

import { type CSSProperties } from 'react';
import { cssVarColors } from '../../tokens/colors';
import { radius } from '../../tokens/radius';
import { transitions } from '../../utils/styles';
import { duration, easing } from '../../tokens/motion';

export type ProgressIndicatorSize = 'sm' | 'md' | 'lg';
export type ProgressIndicatorColor =
  | 'primary'
  | 'neutral'
  | 'success'
  | 'error'
  | 'warning';

export interface ProgressIndicatorProps {
  /** 0.0 ~ 1.0 */
  progress: number;
  /** Height preset (default: 'md') */
  size?: ProgressIndicatorSize;
  /** Indicator color (default: 'primary') */
  color?: ProgressIndicatorColor;
  /** Smooth width transition (default: true) */
  animate?: boolean;
  className?: string;
  'aria-label'?: string;
}

const sizeHeights: Record<ProgressIndicatorSize, number> = {
  sm: 2,
  md: 4,
  lg: 6,
};

const indicatorColors: Record<ProgressIndicatorColor, string> = {
  primary: cssVarColors.surface.brand.default,
  neutral: cssVarColors.content.base.default,
  success: cssVarColors.content.success.default,
  error: cssVarColors.content.error.default,
  warning: cssVarColors.content.warning.default,
};

function clampProgress(progress: number): number {
  if (!Number.isFinite(progress)) return 0;
  return Math.min(Math.max(progress, 0), 1);
}

export function ProgressIndicator({
  progress,
  size = 'md',
  color = 'primary',
  animate = true,
  className,
  'aria-label': ariaLabel,
}: ProgressIndicatorProps) {
  const normalizedProgress = clampProgress(progress);
  const progressPercent = normalizedProgress * 100;

  const trackStyle: CSSProperties = {
    width: '100%',
    height: sizeHeights[size],
    position: 'relative',
    overflow: 'hidden',
    borderRadius: radius.primitive.full,
    backgroundColor: cssVarColors.fill.alternative,
  };

  const indicatorStyle: CSSProperties = {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: `${progressPercent}%`,
    borderRadius: radius.primitive.full,
    backgroundColor: indicatorColors[color],
    transition: animate ? `width ${duration.normal}ms ${easing.easeOut}, ${transitions.all}` : 'none',
  };

  return (
    <div
      className={className}
      style={trackStyle}
      role="progressbar"
      aria-label={ariaLabel ?? '진행률'}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progressPercent)}
    >
      <div style={indicatorStyle} />
    </div>
  );
}
