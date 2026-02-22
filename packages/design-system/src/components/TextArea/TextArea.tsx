'use client';

import React, { useState, useCallback, useId, type CSSProperties } from 'react';
import { cssVarColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { typography } from '../../tokens/typography';
import { opacity, borderWidth } from '../../tokens/general';
import { transitions } from '../../tokens/motion';

// ─── Types ───────────────────────────────────────────────────────────

export interface TextAreaProps {
  /** Label text displayed above the textarea */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Controlled value */
  value?: string;
  /** Initial value (uncontrolled) */
  defaultValue?: string;
  /** Change callback — receives the string value */
  onChange?: (value: string) => void;
  /** Blur event handler */
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
  /** Error message shown below the textarea */
  error?: string;
  /** Helper text shown below the textarea (only when no error) */
  helperText?: string;
  /** Disabled state @default false */
  disabled?: boolean;
  /** Marks the field as required */
  required?: boolean;
  /** Maximum character count */
  maxLength?: number;
  /** Show character count when maxLength is set @default false */
  showCount?: boolean;
  /** Number of visible text rows @default 4 */
  rows?: number;
  /** Resize behaviour @default 'vertical' */
  resize?: 'none' | 'vertical' | 'both';
  /** Accessibility label (required when no label prop) */
  'aria-label'?: string;
  /** Custom id — auto-generated when omitted */
  id?: string;
  /** Input name for forms */
  name?: string;
  /** Additional container styles */
  style?: React.CSSProperties;
}

// ─── Component ───────────────────────────────────────────────────────

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea(props, ref) {
    const {
      label,
      placeholder,
      value: valueProp,
      defaultValue,
      onChange,
      onBlur,
      error,
      helperText,
      disabled = false,
      required = false,
      maxLength,
      showCount = false,
      rows = 4,
      resize = 'vertical',
      'aria-label': ariaLabel,
      id: idProp,
      name,
      style,
    } = props;

    const autoId = useId();
    const inputId = idProp ?? autoId;

    // ── Controlled / Uncontrolled ────────────────────────────────────
    const isControlled = valueProp !== undefined;
    const [internalValue, setInternalValue] = useState(defaultValue ?? '');
    const currentValue = isControlled ? valueProp : internalValue;

    const [focused, setFocused] = useState(false);
    const [hovered, setHovered] = useState(false);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const next = e.target.value;
        if (!isControlled) {
          setInternalValue(next);
        }
        onChange?.(next);
      },
      [isControlled, onChange],
    );

    const handleFocus = useCallback(() => setFocused(true), []);

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLTextAreaElement>) => {
        setFocused(false);
        onBlur?.(e);
      },
      [onBlur],
    );

    // ── Derived state ────────────────────────────────────────────────
    const hasError = Boolean(error);
    const showCharCount = showCount && maxLength !== undefined;

    // ── Styles ───────────────────────────────────────────────────────
    const containerStyle: CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: spacing.primitive[1],
      width: '100%',
      ...style,
    };

    const labelStyle: CSSProperties = {
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.medium,
      color: disabled
        ? cssVarColors.content.disabled.default
        : cssVarColors.content.base.default,
      lineHeight: 1.4,
    };

    const borderColor = hasError
      ? cssVarColors.border.error.default
      : focused
      ? cssVarColors.border.brand.default
      : hovered
      ? cssVarColors.border.secondary.default
      : cssVarColors.border.base.default;

    const inputWrapperStyle: CSSProperties = {
      position: 'relative',
      borderRadius: radius.component.input.default,
      border: `${borderWidth.medium}px solid ${borderColor}`,
      backgroundColor: disabled
        ? cssVarColors.surface.base.alternative
        : cssVarColors.surface.base.default,
      transition: transitions.all,
      boxSizing: 'border-box',
      opacity: disabled ? opacity.disabled : 1,
    };

    const textareaStyle: CSSProperties = {
      display: 'block',
      width: '100%',
      padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`,
      fontSize: typography.fontSize.md,
      lineHeight: 1.6,
      fontFamily: 'inherit',
      color: cssVarColors.content.base.default,
      backgroundColor: 'transparent',
      border: 'none',
      outline: 'none',
      resize,
      boxSizing: 'border-box',
      cursor: disabled ? 'not-allowed' : undefined,
    };

    const footerStyle: CSSProperties = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: spacing.primitive[2],
      minHeight: (hasError || helperText || showCharCount) ? undefined : 0,
    };

    const helperTextStyle: CSSProperties = {
      fontSize: typography.fontSize.compact,
      lineHeight: 1.4,
      margin: 0,
      color: hasError
        ? cssVarColors.content.error.default
        : cssVarColors.content.base.secondary,
    };

    const charCountStyle: CSSProperties = {
      fontSize: typography.fontSize.compact,
      lineHeight: 1.4,
      margin: 0,
      marginLeft: 'auto',
      flexShrink: 0,
      color: cssVarColors.content.base.secondary,
    };

    return (
      <div style={containerStyle}>
        {label && (
          <label htmlFor={inputId} style={labelStyle}>
            {label}
            {required && (
              <span
                aria-hidden="true"
                style={{ color: cssVarColors.content.error.default, marginLeft: 2 }}
              >
                *
              </span>
            )}
          </label>
        )}

        <div
          style={inputWrapperStyle}
          onMouseEnter={() => !disabled && setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <textarea
            ref={ref}
            id={inputId}
            name={name}
            rows={rows}
            value={currentValue}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            maxLength={maxLength}
            aria-label={!label ? ariaLabel : undefined}
            aria-invalid={hasError || undefined}
            aria-describedby={
              hasError ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={textareaStyle}
          />
        </div>

        {(hasError || helperText || showCharCount) && (
          <div style={footerStyle}>
            {(hasError || helperText) && (
              <p
                id={hasError ? `${inputId}-error` : `${inputId}-helper`}
                role={hasError ? 'alert' : undefined}
                style={helperTextStyle}
              >
                {error || helperText}
              </p>
            )}
            {showCharCount && (
              <p style={charCountStyle} aria-live="polite">
                {currentValue.length}/{maxLength}
              </p>
            )}
          </div>
        )}
      </div>
    );
  },
);

TextArea.displayName = 'TextArea';
