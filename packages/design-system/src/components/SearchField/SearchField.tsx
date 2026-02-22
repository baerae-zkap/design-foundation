'use client';

import React, { useState, useCallback, useId, type CSSProperties } from 'react';
import { cssVarColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { typography } from '../../tokens/typography';
import { opacity, borderWidth } from '../../tokens/general';
import { transitions } from '../../tokens/motion';

// ─── Types ───────────────────────────────────────────────────────────

export interface SearchFieldProps {
  /** Label text displayed above the input */
  label?: string;
  /** Placeholder text @default "검색" */
  placeholder?: string;
  /** Controlled value */
  value?: string;
  /** Initial value (uncontrolled) */
  defaultValue?: string;
  /** Change callback — receives the string value */
  onChange?: (value: string) => void;
  /** Blur event handler */
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  /** Called when the user presses Enter or the search icon button */
  onSearch?: (value: string) => void;
  /** Called when the clear button is pressed (after internal state is reset) */
  onClear?: () => void;
  /** Disabled state @default false */
  disabled?: boolean;
  /** Accessibility label (required when no label prop) */
  'aria-label'?: string;
  /** Custom id — auto-generated when omitted */
  id?: string;
  /** Additional container styles */
  style?: React.CSSProperties;
}

// ─── SVG Icons ───────────────────────────────────────────────────────

const SearchIcon = ({ color }: { color: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const ClearIcon = ({ color }: { color: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="m15 9-6 6M9 9l6 6" />
  </svg>
);

// ─── Component ───────────────────────────────────────────────────────

export const SearchField = React.forwardRef<HTMLInputElement, SearchFieldProps>(
  function SearchField(props, ref) {
    const {
      label,
      placeholder = '검색',
      value: valueProp,
      defaultValue,
      onChange,
      onBlur,
      onSearch,
      onClear,
      disabled = false,
      'aria-label': ariaLabel,
      id: idProp,
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
      (e: React.ChangeEvent<HTMLInputElement>) => {
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
      (e: React.FocusEvent<HTMLInputElement>) => {
        setFocused(false);
        onBlur?.(e);
      },
      [onBlur],
    );

    const handleClear = useCallback(() => {
      if (!isControlled) {
        setInternalValue('');
      }
      onChange?.('');
      onClear?.();
    }, [isControlled, onChange, onClear]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
          onSearch?.(currentValue);
        } else if (e.key === 'Escape') {
          handleClear();
          (e.target as HTMLInputElement).blur();
        }
      },
      [currentValue, onSearch, handleClear],
    );

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

    const borderColor = focused
      ? cssVarColors.border.brand.default
      : hovered
      ? cssVarColors.border.secondary.default
      : cssVarColors.border.base.default;

    const inputWrapperStyle: CSSProperties = {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      height: 48,
      borderRadius: radius.component.input.default,
      border: `${borderWidth.medium}px solid ${borderColor}`,
      backgroundColor: disabled
        ? cssVarColors.surface.base.alternative
        : cssVarColors.surface.base.default,
      transition: transitions.all,
      boxSizing: 'border-box',
      opacity: disabled ? opacity.disabled : 1,
    };

    const searchIconWrapperStyle: CSSProperties = {
      position: 'absolute',
      left: spacing.primitive[3],
      top: '50%',
      transform: 'translateY(-50%)',
      display: 'flex',
      alignItems: 'center',
      pointerEvents: 'none',
      flexShrink: 0,
    };

    const inputStyle: CSSProperties = {
      flex: 1,
      height: '100%',
      paddingLeft: spacing.primitive[10], // 40px — room for search icon
      paddingRight: currentValue.length > 0 && !disabled
        ? spacing.primitive[10]  // 40px — room for clear button
        : spacing.primitive[4],  // 16px — standard padding
      fontSize: typography.fontSize.md,
      lineHeight: 1.5,
      fontFamily: 'inherit',
      color: cssVarColors.content.base.default,
      backgroundColor: 'transparent',
      border: 'none',
      outline: 'none',
      cursor: disabled ? 'not-allowed' : undefined,
      boxSizing: 'border-box',
      width: '100%',
    };

    const clearButtonStyle: CSSProperties = {
      position: 'absolute',
      right: spacing.primitive[3],
      top: '50%',
      transform: 'translateY(-50%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 24,
      height: 24,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 0,
      color: cssVarColors.content.base.secondary,
      flexShrink: 0,
      borderRadius: radius.primitive.full,
    };

    const iconColor = cssVarColors.content.base.secondary;

    return (
      <div role="search" style={containerStyle}>
        {label && (
          <label htmlFor={inputId} style={labelStyle}>
            {label}
          </label>
        )}

        <div
          style={inputWrapperStyle}
          onMouseEnter={() => !disabled && setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Search icon */}
          <span style={searchIconWrapperStyle}>
            <SearchIcon color={iconColor} />
          </span>

          {/* Input */}
          <input
            ref={ref}
            id={inputId}
            type="search"
            value={currentValue}
            placeholder={placeholder}
            disabled={disabled}
            aria-label={!label ? (ariaLabel ?? placeholder) : undefined}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            style={inputStyle}
          />

          {/* Clear button — only when there is a value and not disabled */}
          {currentValue.length > 0 && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="검색어 지우기"
              tabIndex={0}
              style={clearButtonStyle}
            >
              <ClearIcon color={iconColor} />
            </button>
          )}
        </div>
      </div>
    );
  },
);

SearchField.displayName = 'SearchField';
