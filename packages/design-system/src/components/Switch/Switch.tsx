'use client';

import React, { useState, useCallback, useId, type CSSProperties } from 'react';
import { cssVarColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { typography } from '../../tokens/typography';
import { opacity } from '../../tokens/general';
import { transitions } from '../../tokens/motion';

// ─── Types ───────────────────────────────────────────────────────────

export type SwitchSize = 'small' | 'medium';

export interface SwitchProps {
  /** Checked state (controlled) */
  checked?: boolean;
  /** Initial checked state (uncontrolled) @default false */
  defaultChecked?: boolean;
  /** Change callback */
  onChange?: (checked: boolean) => void;
  /** Label text */
  label?: React.ReactNode;
  /** Description text below label */
  description?: React.ReactNode;
  /** Size @default 'medium' */
  size?: SwitchSize;
  /** Disabled @default false */
  disabled?: boolean;
  /** Accessibility label (required when no label) */
  'aria-label'?: string;
  /** Custom id */
  id?: string;
}

// ─── Size config ─────────────────────────────────────────────────────

const SIZE_CONFIG: Record<SwitchSize, {
  trackWidth: number;
  trackHeight: number;
  thumbSize: number;
  thumbOffset: number;
}> = {
  small: {
    trackWidth: 36,
    trackHeight: 20,
    thumbSize: 14,
    thumbOffset: 3,
  },
  medium: {
    trackWidth: 44,
    trackHeight: 24,
    thumbSize: 18,
    thumbOffset: 3,
  },
};

// ─── Component ───────────────────────────────────────────────────────

export const Switch = React.forwardRef<HTMLLabelElement, SwitchProps>(
  function Switch(props, ref) {
    const {
      checked: checkedProp,
      defaultChecked = false,
      onChange,
      label,
      description,
      size = 'medium',
      disabled = false,
      'aria-label': ariaLabel,
      id: idProp,
    } = props;

    const autoId = useId();
    const inputId = idProp ?? autoId;

    // ── Controlled / Uncontrolled ────────────────────────────────────
    const isControlled = checkedProp !== undefined;
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const isChecked = isControlled ? checkedProp : internalChecked;
    const [isHovered, setIsHovered] = useState(false);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled) return;
        const next = e.target.checked;
        if (!isControlled) {
          setInternalChecked(next);
        }
        onChange?.(next);
      },
      [disabled, isControlled, onChange],
    );

    // ── Size config ──────────────────────────────────────────────────
    const { trackWidth, trackHeight, thumbSize, thumbOffset } = SIZE_CONFIG[size];
    const thumbTravel = trackWidth - thumbSize - thumbOffset * 2;

    // ── Styles ───────────────────────────────────────────────────────
    const hiddenInputStyle: CSSProperties = {
      position: 'absolute',
      width: 1,
      height: 1,
      opacity: 0,
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      clip: 'rect(0 0 0 0)',
      whiteSpace: 'nowrap',
      border: 0,
    };

    const labelStyle: CSSProperties = {
      display: 'inline-flex',
      alignItems: 'flex-start',
      gap: spacing.primitive[3],
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? opacity.disabled : 1,
      WebkitTapHighlightColor: 'transparent',
      userSelect: 'none',
    };

    const trackBg = isChecked
      ? isHovered
        ? cssVarColors.surface.brand.defaultPressed
        : cssVarColors.surface.brand.default
      : isHovered
        ? cssVarColors.surface.base.alternative
        : cssVarColors.fill.normal;

    const trackStyle: CSSProperties = {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      width: trackWidth,
      height: trackHeight,
      borderRadius: radius.primitive.full,
      backgroundColor: trackBg,
      transition: transitions.all,
      flexShrink: 0,
      boxSizing: 'border-box',
    };

    const thumbStyle: CSSProperties = {
      position: 'absolute',
      left: thumbOffset,
      width: thumbSize,
      height: thumbSize,
      borderRadius: radius.primitive.full,
      backgroundColor: cssVarColors.content.base.onColor,
      transform: isChecked ? `translateX(${thumbTravel}px)` : 'translateX(0)',
      transition: `${transitions.all}, ${transitions.transform}`,
    };

    return (
      <label
        ref={ref}
        style={labelStyle}
        onMouseEnter={() => !disabled && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Hidden native input for a11y */}
        <input
          type="checkbox"
          role="switch"
          id={inputId}
          checked={isChecked}
          disabled={disabled}
          onChange={handleChange}
          aria-label={!label ? ariaLabel : undefined}
          aria-checked={isChecked}
          style={hiddenInputStyle}
        />

        {/* Visual track + thumb */}
        <span aria-hidden="true" style={trackStyle}>
          <span style={thumbStyle} />
        </span>

        {/* Label + Description */}
        {(label || description) && (
          <span
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: spacing.primitive[1],
              paddingTop: size === 'medium' ? 2 : 0,
            }}
          >
            {label && (
              <span
                style={{
                  fontSize: typography.fontSize.md,
                  fontWeight: typography.fontWeight.regular,
                  color: cssVarColors.content.base.default,
                  lineHeight: 1.4,
                }}
              >
                {label}
              </span>
            )}
            {description && (
              <span
                style={{
                  fontSize: typography.fontSize.sm,
                  fontWeight: typography.fontWeight.regular,
                  color: cssVarColors.content.base.secondary,
                  lineHeight: 1.5,
                }}
              >
                {description}
              </span>
            )}
          </span>
        )}
      </label>
    );
  },
);

Switch.displayName = 'Switch';
