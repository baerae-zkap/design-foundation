/**
 * Slider Component (Web)
 *
 * @description 값 범위를 선택하는 슬라이더 컴포넌트입니다.
 * @see docs/components/Slider.md - AI용 상세 가이드
 *
 * @example
 * <Slider
 *   value={50}
 *   onValueChange={(value) => console.log(value)}
 *   minimumValue={0}
 *   maximumValue={100}
 *   size="medium"
 * />
 */

import { forwardRef, useState, useRef, useEffect, type HTMLAttributes } from 'react';
import { colors } from '../../tokens/colors';
import { shadow } from '../../tokens/shadow';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { typography } from '../../tokens/typography';

export type SliderSize = 'small' | 'medium' | 'large';

export interface SliderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Current value */
  value: number;
  /** Change handler */
  onValueChange: (value: number) => void;
  /** Minimum value */
  minimumValue?: number;
  /** Maximum value */
  maximumValue?: number;
  /** Step increment */
  step?: number;
  /** Show value label (deprecated - use showTooltip) */
  showValue?: boolean;
  /** Show tooltip above thumb */
  showTooltip?: boolean;
  /** Custom tooltip formatter */
  tooltipContent?: (value: number) => string;
  /** Labels for min/max/mid positions */
  labels?: {
    min?: string;
    max?: string;
    mid?: string;
  };
  /** Track filled color */
  trackColor?: string;
  /** Track background color */
  trackBgColor?: string;
  /** Disabled */
  disabled?: boolean;
  /** Size */
  size?: SliderSize;
  accessibilityLabel?: string;
}

const sizeConfig: Record<SliderSize, {
  trackHeight: number;
  thumbSize: number;
}> = {
  small: {
    trackHeight: 3,
    thumbSize: 20,
  },
  medium: {
    trackHeight: 5,
    thumbSize: 24,
  },
  large: {
    trackHeight: 6,
    thumbSize: 28,
  },
};

export const Slider = forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      value,
      onValueChange,
      minimumValue = 0,
      maximumValue = 100,
      step = 1,
      showValue = false,
      showTooltip = false,
      tooltipContent,
      labels,
      trackColor,
      trackBgColor,
      disabled = false,
      size = 'medium',
      accessibilityLabel,
      style,
      ...props
    },
    ref
  ) => {
    const config = sizeConfig[size];
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Calculate percentage from value
    const percentage = ((value - minimumValue) / (maximumValue - minimumValue)) * 100;

    // Show tooltip or use legacy showValue
    const shouldShowTooltip = showTooltip || showValue;
    const formatTooltip = tooltipContent || ((v: number) => Math.round(v).toString());

    const handleValueChange = (newValue: number) => {
      if (disabled) return;

      // Apply step
      const steppedValue = Math.round(newValue / step) * step;

      // Clamp value
      const clampedValue = Math.max(minimumValue, Math.min(maximumValue, steppedValue));

      onValueChange(clampedValue);
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;

      setIsDragging(true);
      updateValueFromMouse(e);

      const handleMouseMove = (moveEvent: MouseEvent) => {
        updateValueFromMouse(moveEvent as any);
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    const updateValueFromMouse = (e: React.MouseEvent | MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const locationX = (e as MouseEvent).clientX - rect.left;
      const newPercentage = Math.max(0, Math.min(100, (locationX / rect.width) * 100));
      const newValue = minimumValue + (newPercentage / 100) * (maximumValue - minimumValue);
      handleValueChange(newValue);
    };

    const containerStyle: React.CSSProperties = {
      width: '100%',
      paddingTop: spacing.primitive[3],
      paddingBottom: spacing.primitive[3],
      ...style,
    };

    const trackContainerStyle: React.CSSProperties = {
      position: 'relative',
      height: config.trackHeight,
      borderRadius: radius.primitive.full,
      backgroundColor: disabled
        ? colors.content.disabled.default
        : trackBgColor || colors.border.base.default,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
    };

    const fillStyle: React.CSSProperties = {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: `${percentage}%`,
      backgroundColor: trackColor || colors.surface.brand.default,
      borderRadius: radius.primitive.full,
    };

    const thumbContainerStyle: React.CSSProperties = {
      position: 'absolute',
      top: -((config.thumbSize - config.trackHeight) / 2),
      left: `${percentage}%`,
      marginLeft: -(config.thumbSize / 2),
      width: config.thumbSize,
      height: config.thumbSize,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    };

    const thumbStyle: React.CSSProperties = {
      width: config.thumbSize,
      height: config.thumbSize,
      borderRadius: radius.primitive.full,
      backgroundColor: colors.surface.base.default,
      boxShadow: shadow.semantic.button.elevated,
    };

    const tooltipStyle: React.CSSProperties = {
      position: 'absolute',
      top: -(config.thumbSize + spacing.primitive[3] + 8),
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: colors.inverse.surface.default,
      paddingLeft: spacing.primitive[2],
      paddingRight: spacing.primitive[2],
      paddingTop: spacing.primitive[1],
      paddingBottom: spacing.primitive[1],
      borderRadius: radius.primitive.sm,
      minWidth: 32,
      textAlign: 'center',
      opacity: isDragging && shouldShowTooltip ? 1 : 0,
      transition: 'opacity 150ms',
      pointerEvents: 'none',
    };

    const tooltipTextStyle: React.CSSProperties = {
      fontSize: typography.fontSize.xs,
      fontWeight: typography.fontWeight.semibold,
      fontFamily: typography.fontFamily.base,
      color: colors.content.base.onColor,
      whiteSpace: 'nowrap',
    };

    const tooltipArrowStyle: React.CSSProperties = {
      position: 'absolute',
      bottom: -4,
      left: '50%',
      marginLeft: -4,
      width: 0,
      height: 0,
      borderLeft: '4px solid transparent',
      borderRight: '4px solid transparent',
      borderTop: `4px solid ${colors.inverse.surface.default}`,
    };

    const trackLabelStyle: React.CSSProperties = {
      fontSize: typography.fontSize.xs,
      fontWeight: typography.fontWeight.regular,
      fontFamily: typography.fontFamily.base,
      color: colors.content.base.secondary,
      marginTop: spacing.primitive[2],
    };

    return (
      <div
        ref={ref}
        style={containerStyle}
        role="slider"
        aria-label={accessibilityLabel}
        aria-valuemin={minimumValue}
        aria-valuemax={maximumValue}
        aria-valuenow={value}
        {...props}
      >
        <div
          ref={containerRef}
          style={trackContainerStyle}
          onMouseDown={handleMouseDown}
        >
          <div style={fillStyle} />
          <div style={thumbContainerStyle}>
            <div style={thumbStyle} />
            {shouldShowTooltip && (
              <div style={tooltipStyle}>
                <span style={tooltipTextStyle}>{formatTooltip(value)}</span>
                <div style={tooltipArrowStyle} />
              </div>
            )}
          </div>
        </div>

        {/* Track labels */}
        {labels && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: spacing.primitive[2], position: 'relative' }}>
            {labels.min && <span style={trackLabelStyle}>{labels.min}</span>}
            {labels.mid && (
              <span style={{ ...trackLabelStyle, position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
                {labels.mid}
              </span>
            )}
            {labels.max && <span style={trackLabelStyle}>{labels.max}</span>}
          </div>
        )}
      </div>
    );
  }
);

Slider.displayName = 'Slider';
