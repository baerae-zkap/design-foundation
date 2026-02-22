'use client';

import React, { useState, useId, type CSSProperties } from 'react';
import { cssVarColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { typography } from '../../tokens/typography';
import { opacity, borderWidth } from '../../tokens/general';
import { transitions } from '../../tokens/motion';

// ─── Types ───────────────────────────────────────────────────────────

export interface TextFieldProps {
  /** Label displayed above the input */
  label?: string;
  /** Placeholder text shown when empty */
  placeholder?: string;
  /** Controlled value */
  value?: string;
  /** Uncontrolled initial value */
  defaultValue?: string;
  /** Change callback — receives the string value directly */
  onChange?: (value: string) => void;
  /** Blur event handler */
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  /** Focus event handler */
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  /** HTML input type @default 'text' */
  type?: string;
  /** Error message — triggers error styling when set */
  error?: string;
  /** Helper text shown below the input (hidden when error is set) */
  helperText?: string;
  /** Disables the input @default false */
  disabled?: boolean;
  /** Marks field as required — adds asterisk to label @default false */
  required?: boolean;
  /** Icon element rendered on the left inside the input container */
  leadingIcon?: React.ReactNode;
  /** Icon element rendered on the right inside the input container */
  trailingIcon?: React.ReactNode;
  /** Accessible label when no visible label is provided */
  'aria-label'?: string;
  /** Input id — auto-generated if not provided */
  id?: string;
  /** Input name attribute */
  name?: string;
  /** HTML autocomplete attribute */
  autoComplete?: string;
  /** Maximum character length */
  maxLength?: number;
  /** Makes the input read-only */
  readOnly?: boolean;
  /** Custom inline styles on the outer wrapper */
  style?: CSSProperties;
  /** Additional class names on the outer wrapper */
  className?: string;
}

// ─── Component ───────────────────────────────────────────────────────

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(props, ref) {
    const {
      label,
      placeholder,
      value,
      defaultValue,
      onChange,
      onBlur,
      onFocus,
      type = 'text',
      error,
      helperText,
      disabled = false,
      required = false,
      leadingIcon,
      trailingIcon,
      'aria-label': ariaLabel,
      id: idProp,
      name,
      autoComplete,
      maxLength,
      readOnly = false,
      style,
      className,
    } = props;

    const autoId = useId();
    const inputId = idProp ?? autoId;
    const helperId = `${inputId}-helper`;

    const [focused, setFocused] = useState(false);
    const [hovered, setHovered] = useState(false);

    const hasError = Boolean(error);
    const hasHelper = Boolean(error || helperText);

    // ── Border color ─────────────────────────────────────────────────
    let borderColor: string;
    if (hasError) {
      borderColor = cssVarColors.border.error.default;
    } else if (focused) {
      borderColor = cssVarColors.border.brand.default;
    } else if (hovered) {
      borderColor = cssVarColors.border.secondary.default;
    } else {
      borderColor = cssVarColors.border.base.default;
    }

    // ── Label color ──────────────────────────────────────────────────
    let labelColor: string;
    if (disabled) {
      labelColor = cssVarColors.content.disabled.default;
    } else if (hasError) {
      labelColor = cssVarColors.content.error.default;
    } else if (focused) {
      labelColor = cssVarColors.content.brand.default;
    } else {
      labelColor = cssVarColors.content.base.secondary;
    }

    // ── Styles ───────────────────────────────────────────────────────
    const wrapperStyle: CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: spacing.primitive[1],
      width: '100%',
      ...style,
    };

    const labelStyle: CSSProperties = {
      fontSize: typography.fontSize.compact,
      fontWeight: typography.fontWeight.medium,
      color: labelColor,
      transition: transitions.all,
      lineHeight: 1.4,
    };

    const containerStyle: CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: spacing.primitive[2],
      padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`,
      borderRadius: radius.component.input.default,
      border: `${borderWidth.medium}px solid ${borderColor}`,
      backgroundColor: disabled
        ? cssVarColors.surface.base.alternative
        : cssVarColors.surface.base.default,
      transition: transitions.all,
      opacity: disabled ? opacity.disabled : 1,
      boxSizing: 'border-box' as const,
      // Focus ring via box-shadow when focused
      boxShadow: focused && !hasError
        ? `0 0 0 3px ${cssVarColors.surface.brand.secondary}`
        : 'none',
    };

    const inputStyle: CSSProperties = {
      flex: 1,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontSize: typography.fontSize.md,
      fontWeight: typography.fontWeight.regular,
      color: cssVarColors.content.base.default,
      fontFamily: 'inherit',
      minWidth: 0,
      cursor: disabled ? 'not-allowed' : readOnly ? 'default' : 'text',
    };

    const iconStyle: CSSProperties = {
      color: cssVarColors.content.base.secondary,
      display: 'flex',
      alignItems: 'center',
      flexShrink: 0,
    };

    const helperStyle: CSSProperties = {
      fontSize: typography.fontSize.compact,
      color: hasError
        ? cssVarColors.content.error.default
        : cssVarColors.content.base.secondary,
      lineHeight: 1.5,
    };

    // ── Event handlers ───────────────────────────────────────────────
    const handleFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
      setFocused(true);
      onFocus?.(e);
    };

    const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
      setFocused(false);
      onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
    };

    return (
      <div style={wrapperStyle} className={className}>
        {label && (
          <label
            htmlFor={inputId}
            style={labelStyle}
          >
            {label}
            {required && (
              <span
                aria-hidden="true"
                style={{
                  color: cssVarColors.content.error.default,
                  marginLeft: spacing.primitive[0] + 2,
                }}
              >
                *
              </span>
            )}
          </label>
        )}

        <div
          style={containerStyle}
          onMouseEnter={() => !disabled && setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {leadingIcon && (
            <span aria-hidden="true" style={iconStyle}>
              {leadingIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            type={type}
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            readOnly={readOnly}
            name={name}
            autoComplete={autoComplete}
            maxLength={maxLength}
            aria-label={!label ? ariaLabel : undefined}
            aria-invalid={hasError || undefined}
            aria-describedby={hasHelper ? helperId : undefined}
            aria-disabled={disabled || undefined}
            style={inputStyle}
          />

          {trailingIcon && (
            <span aria-hidden="true" style={iconStyle}>
              {trailingIcon}
            </span>
          )}
        </div>

        {hasHelper && (
          <span id={helperId} style={helperStyle}>
            {error || helperText}
          </span>
        )}
      </div>
    );
  },
);

TextField.displayName = 'TextField';
