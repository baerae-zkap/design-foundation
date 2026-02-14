/**
 * Switch Component (Web)
 *
 * @description On/Off 토글 스위치 컴포넌트입니다.
 * @see docs/components/Switch.md - AI용 상세 가이드
 *
 * @example
 * <Switch
 *   value={isEnabled}
 *   onValueChange={setIsEnabled}
 *   size="medium"
 * />
 */

import { forwardRef, useState, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { typography } from '../../tokens/typography';
import { usePressable } from '../../utils/usePressable';
import { transitions } from '../../utils/styles';

export type SwitchSize = 'small' | 'medium' | 'large';

export interface SwitchProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value' | 'onChange'> {
  /** On/Off 상태 */
  value: boolean;
  /** 상태 변경 핸들러 */
  onValueChange: (value: boolean) => void;
  /** 라벨 텍스트 */
  label?: string;
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 크기 변형 */
  size?: SwitchSize;
  /** 접근성 라벨 */
  accessibilityLabel?: string;
  /** 터치 피드백 표시 여부 (기본: true) */
  hasTouchEffect?: boolean;
  /** On 상태 트랙 색상 (기본: brandDefault) */
  onColor?: string;
  /** Off 상태 트랙 색상 (기본: border.base.default) */
  offColor?: string;
  /** 로딩 상태 */
  loading?: boolean;
}

// Size configuration based on RN specs
const sizeConfig: Record<SwitchSize, {
  trackWidth: number;
  trackHeight: number;
  thumbSize: number;
  thumbOffset: number;
}> = {
  small: {
    trackWidth: 40,
    trackHeight: 24,
    thumbSize: 18,
    thumbOffset: 3,
  },
  medium: {
    trackWidth: 52,
    trackHeight: 32,
    thumbSize: 24,
    thumbOffset: 4,
  },
  large: {
    trackWidth: 60,
    trackHeight: 36,
    thumbSize: 28,
    thumbOffset: 4,
  },
};

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      value,
      onValueChange,
      label,
      disabled = false,
      size = 'medium',
      accessibilityLabel,
      style,
      hasTouchEffect = true,
      onColor,
      offColor,
      loading = false,
      onClick,
      ...props
    },
    ref
  ) => {
    const config = sizeConfig[size];
    const isDisabled = disabled || loading;

    const { isPressed, handlers } = usePressable<HTMLButtonElement>({
      disabled: isDisabled,
      onMouseDown: (e) => {
        if (!isDisabled) {
          onValueChange(!value);
        }
      },
    });

    const trackBackgroundColor = isDisabled
      ? colors.surface.disabled.default
      : value
      ? (onColor || colors.surface.brand.default)
      : (offColor || colors.border.base.default);

    const thumbTranslateX = value
      ? config.trackWidth - config.thumbSize - config.thumbOffset
      : config.thumbOffset;

    const containerStyle: React.CSSProperties = {
      display: 'inline-flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.primitive[3],
      ...style,
    };

    const trackStyle: React.CSSProperties = {
      position: 'relative',
      width: config.trackWidth,
      height: config.trackHeight,
      borderRadius: radius.primitive.full,
      backgroundColor: trackBackgroundColor,
      border: 'none',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      opacity: isDisabled ? 0.38 : 1,
      transition: transitions.background,
      display: 'flex',
      alignItems: 'center',
      padding: 0,
      transform: isPressed && hasTouchEffect ? 'scale(0.95)' : 'scale(1)',
    };

    const thumbStyle: React.CSSProperties = {
      position: 'absolute',
      width: config.thumbSize,
      height: config.thumbSize,
      borderRadius: radius.primitive.full,
      backgroundColor: colors.surface.base.default,
      boxShadow: `0 1px 3px ${colors.fill.normal}`,
      transition: 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1)',
      transform: `translateX(${thumbTranslateX}px)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };

    const labelStyle: React.CSSProperties = {
      fontSize: size === 'large' ? typography.fontSize.md : typography.fontSize.sm,
      fontWeight: typography.fontWeight.medium,
      color: isDisabled ? colors.content.disabled.default : colors.content.base.default,
    };

    return (
      <div style={containerStyle}>
        <button
          ref={ref}
          type="button"
          role="switch"
          aria-checked={value}
          aria-label={accessibilityLabel || label}
          aria-disabled={isDisabled}
          disabled={isDisabled}
          style={trackStyle}
          {...handlers}
          {...props}
        >
          <div style={thumbStyle}>
            {loading && <LoadingSpinner size={config.thumbSize * 0.5} />}
          </div>
        </button>
        {label && <span style={labelStyle}>{label}</span>}
      </div>
    );
  }
);

Switch.displayName = 'Switch';

function LoadingSpinner({ size }: { size: number }) {
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: radius.primitive.full,
        border: `2px solid ${colors.border.base.default}`,
        borderTopColor: 'transparent',
        animation: 'spin 1s linear infinite',
      }}
    />
  );
}
