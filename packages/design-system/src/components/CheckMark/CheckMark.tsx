'use client';

import React, { useState, useCallback, useId, type ReactNode, type CSSProperties } from 'react';
import { cssVarColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';
import { opacity } from '../../tokens/general';
import { transitions } from '../../tokens/motion';

// ─── Types ───────────────────────────────────────────────────────────

export type CheckMarkSize = 'small' | 'medium';

export interface CheckMarkProps {
  /** Checked state (controlled) */
  checked?: boolean;
  /** Initial checked state (uncontrolled) */
  defaultChecked?: boolean;
  /** Change callback */
  onChange?: (checked: boolean) => void;
  /** Label text */
  label?: ReactNode;
  /** Description text below label */
  description?: ReactNode;
  /** Size @default 'medium' */
  size?: CheckMarkSize;
  /** Disabled */
  disabled?: boolean;
  /** Validation error */
  invalid?: boolean;
  /** Accessibility label (required when no label) */
  'aria-label'?: string;
  /** Custom id */
  id?: string;
}

// ─── Size config ─────────────────────────────────────────────────────

const SIZE_CONFIG: Record<CheckMarkSize, {
  iconWidth: number;
  iconHeight: number;
}> = {
  small:  { iconWidth: 14, iconHeight: 11 },
  medium: { iconWidth: 18, iconHeight: 14 },
};

// ─── Icon ────────────────────────────────────────────────────────────

function CheckIcon({ size }: { size: CheckMarkSize }) {
  const { iconWidth, iconHeight } = SIZE_CONFIG[size];
  return (
    <svg
      width={iconWidth}
      height={iconHeight}
      viewBox="0 0 18 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1.5 7L6.5 12L16.5 1.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Component ───────────────────────────────────────────────────────

export const CheckMark = React.forwardRef<HTMLLabelElement, CheckMarkProps>(
  function CheckMark(props, ref) {
    const {
      checked: checkedProp,
      defaultChecked = false,
      onChange,
      label,
      description,
      size = 'medium',
      disabled = false,
      invalid = false,
      'aria-label': ariaLabel,
      id: idProp,
    } = props;

    const autoId = useId();
    const inputId = idProp ?? autoId;

    // ── Controlled / Uncontrolled ────────────────────────────────────
    const isControlled = checkedProp !== undefined;
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const isChecked = isControlled ? checkedProp : internalChecked;

    // ── Hover / Press state ──────────────────────────────────────────
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

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

    // ── Visual config ────────────────────────────────────────────────
    // CheckMark = icon only, no box/circle container
    const iconColor = isChecked
      ? cssVarColors.content.brand.default
      : invalid
        ? cssVarColors.content.error.default
        : cssVarColors.content.base.secondary;

    const controlStyle: CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: iconColor,
      opacity: isPressed ? 0.6 : isHovered ? 0.8 : 1,
      transition: transitions.all,
      flexShrink: 0,
    };

    const labelStyle: CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: spacing.primitive[2],
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? opacity.disabled : 1,
      WebkitTapHighlightColor: 'transparent',
      userSelect: 'none',
    };

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

    return (
      <label
        ref={ref}
        style={labelStyle}
        onMouseEnter={() => !disabled && setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsPressed(false);
        }}
        onMouseDown={() => !disabled && setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
      >
        {/* Hidden native input for a11y */}
        <input
          type="checkbox"
          id={inputId}
          checked={isChecked}
          disabled={disabled}
          onChange={handleChange}
          aria-label={!label ? ariaLabel : undefined}
          aria-invalid={invalid || undefined}
          style={hiddenInputStyle}
        />

        {/* Visual control — icon only, no container */}
        <span aria-hidden="true" style={controlStyle}>
          <CheckIcon size={size} />
        </span>

        {/* Label + Description */}
        {(label || description) && (
          <span
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: spacing.primitive[1],
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

CheckMark.displayName = 'CheckMark';
