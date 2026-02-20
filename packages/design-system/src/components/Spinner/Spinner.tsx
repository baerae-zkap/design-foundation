'use client';

import { cssVarColors } from '../../tokens';

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SpinnerColor = 'primary' | 'neutral' | 'inverse' | 'inherit';

export interface SpinnerProps {
  size?: SpinnerSize;
  color?: SpinnerColor;
  'aria-label'?: string;
  className?: string;
  style?: React.CSSProperties;
}

const KEYFRAME_ID = '__zkap_spin';

const sizeMap: Record<SpinnerSize, number> = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 40,
};

const strokeMap: Record<SpinnerSize, number> = {
  xs: 2,
  sm: 2,
  md: 2,
  lg: 3,
  xl: 3,
};

const colorMap: Record<SpinnerColor, string> = {
  primary: cssVarColors.content.brand.default,
  neutral: cssVarColors.content.base.secondary,
  inverse: cssVarColors.inverse.content.default,
  inherit: 'currentColor',
};

function ensureSpinKeyframe() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(KEYFRAME_ID)) return;

  const style = document.createElement('style');
  style.id = KEYFRAME_ID;
  style.textContent = `@keyframes _zkap_spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;
  document.head.appendChild(style);
}

export function Spinner({
  size = 'md',
  color = 'primary',
  'aria-label': ariaLabel = '로딩 중',
  className,
  style,
}: SpinnerProps) {
  ensureSpinKeyframe();

  const spinnerSize = sizeMap[size];
  const strokeWidth = strokeMap[size];
  const colorValue = colorMap[color];
  const trackColor = 'var(--fill-alternative)';

  return (
    <span
      role="status"
      aria-label={ariaLabel}
      aria-live="polite"
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: spinnerSize,
        height: spinnerSize,
        flexShrink: 0,
        ...style,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          display: 'block',
          width: spinnerSize,
          height: spinnerSize,
          borderRadius: '50%',
          borderWidth: strokeWidth,
          borderStyle: 'solid',
          borderColor: trackColor,
          borderTopColor: colorValue,
          animation: '_zkap_spin 0.75s linear infinite',
          boxSizing: 'border-box',
        }}
      />
    </span>
  );
}
