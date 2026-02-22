'use client';

import React, { useState, useCallback, useId, type CSSProperties } from 'react';
import { cssVarColors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';
import { spacing } from '../../tokens/spacing';
import { duration, easing, transitions } from '../../tokens/motion';
import { cssVarShadow } from '../../tokens/shadow';
import { opacity } from '../../tokens/general';
import { radius } from '../../tokens/radius';

// ─── Types ───────────────────────────────────────────────────────────

export interface SliderProps {
  /** Current value (controlled) */
  value?: number;
  /** Initial value (uncontrolled) @default min */
  defaultValue?: number;
  /** Change callback */
  onChange?: (value: number) => void;
  /** Minimum value @default 0 */
  min?: number;
  /** Maximum value @default 100 */
  max?: number;
  /** Step increment @default 1 */
  step?: number;
  /** Disabled state @default false */
  disabled?: boolean;
  /** Show current value label @default false */
  showValue?: boolean;
  /** Accessibility label */
  'aria-label'?: string;
  /** Custom id */
  id?: string;
  style?: CSSProperties;
}

// ─── Component ───────────────────────────────────────────────────────

export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  function Slider(props, ref) {
    const {
      value: valueProp,
      defaultValue,
      onChange,
      min = 0,
      max = 100,
      step = 1,
      disabled = false,
      showValue = false,
      'aria-label': ariaLabel,
      id: idProp,
      style,
    } = props;

    const autoId = useId();
    const inputId = idProp ?? autoId;

    const isControlled = valueProp !== undefined;
    const [internalValue, setInternalValue] = useState(defaultValue ?? min);
    const currentValue = isControlled ? valueProp! : internalValue;

    const pct = ((currentValue - min) / (max - min)) * 100;

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled) return;
        const next = Number(e.target.value);
        if (!isControlled) {
          setInternalValue(next);
        }
        onChange?.(next);
      },
      [disabled, isControlled, onChange],
    );

    const containerStyle: CSSProperties = {
      display: 'inline-flex',
      flexDirection: 'column',
      gap: spacing.primitive[2],
      width: '100%',
      opacity: disabled ? opacity.disabled : 1,
      cursor: disabled ? 'not-allowed' : undefined,
      ...style,
    };

    const trackWrapStyle: CSSProperties = {
      position: 'relative',
      height: 20,
      display: 'flex',
      alignItems: 'center',
    };

    // We use a CSS custom property trick to paint the filled track.
    // The native range input is styled with -webkit-appearance: none and
    // a gradient that updates via inline style.
    const trackVisualStyle: CSSProperties = {
      position: 'absolute',
      top: '50%',
      left: 0,
      right: 0,
      height: 4,
      borderRadius: radius.primitive.full,
      transform: 'translateY(-50%)',
      background: `linear-gradient(to right, ${cssVarColors.surface.brand.default} 0%, ${cssVarColors.surface.brand.default} ${pct}%, ${cssVarColors.fill.normal} ${pct}%, ${cssVarColors.fill.normal} 100%)`,
      transition: transitions.background,
      pointerEvents: 'none',
    };

    const inputStyle: CSSProperties = {
      WebkitAppearance: 'none',
      appearance: 'none',
      width: '100%',
      height: 20,
      outline: 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      background: 'transparent',
      border: 'none',
      padding: 0,
      margin: 0,
      position: 'relative',
      zIndex: 1,
    };

    // Compose the focus ring using the semantic input focus shadow token.
    // The thumb already has the elevation shadow; on focus we append the ring.
    const thumbElevation = cssVarShadow.primitive.sm;
    const thumbFocusRing = cssVarShadow.semantic.input.focus;

    return (
      <div ref={ref} style={containerStyle}>
        {showValue && (
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            fontSize: typography.fontSize.compact,
            fontWeight: typography.fontWeight.medium,
            color: cssVarColors.content.base.secondary,
          }}>
            {currentValue}
          </div>
        )}
        <div style={trackWrapStyle}>
          <div style={trackVisualStyle} />
          <style>{`
            input[type=range].zkap-slider::-webkit-slider-thumb {
              -webkit-appearance: none;
              appearance: none;
              width: 20px;
              height: 20px;
              border-radius: ${radius.primitive.full}px;
              background: white;
              border: none;
              box-shadow: ${thumbElevation};
              cursor: pointer;
              margin-top: -${spacing.primitive[2]}px;
              transition: transform ${duration.fast}ms ${easing.easeOut}, box-shadow ${duration.fast}ms ${easing.easeOut};
            }
            input[type=range].zkap-slider:not(:disabled)::-webkit-slider-thumb:hover {
              transform: scale(1.1);
            }
            input[type=range].zkap-slider:focus-visible::-webkit-slider-thumb {
              box-shadow: ${thumbElevation}, ${thumbFocusRing};
            }
            input[type=range].zkap-slider::-moz-range-thumb {
              width: 20px;
              height: 20px;
              border-radius: ${radius.primitive.full}px;
              background: white;
              border: none;
              box-shadow: ${thumbElevation};
              cursor: pointer;
              transition: transform ${duration.fast}ms ${easing.easeOut}, box-shadow ${duration.fast}ms ${easing.easeOut};
            }
            input[type=range].zkap-slider:not(:disabled)::-moz-range-thumb:hover {
              transform: scale(1.1);
            }
            input[type=range].zkap-slider:focus-visible::-moz-range-thumb {
              box-shadow: ${thumbElevation}, ${thumbFocusRing};
            }
            input[type=range].zkap-slider::-webkit-slider-runnable-track {
              -webkit-appearance: none;
              height: 4px;
              border-radius: ${radius.primitive.full}px;
              background: transparent;
            }
            input[type=range].zkap-slider::-moz-range-track {
              height: 4px;
              border-radius: ${radius.primitive.full}px;
              background: transparent;
            }
          `}</style>
          <input
            type="range"
            id={inputId}
            className="zkap-slider"
            min={min}
            max={max}
            step={step}
            value={currentValue}
            disabled={disabled}
            onChange={handleChange}
            aria-label={ariaLabel}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={currentValue}
            style={inputStyle}
          />
        </div>
      </div>
    );
  },
);

Slider.displayName = 'Slider';
