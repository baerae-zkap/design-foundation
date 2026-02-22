'use client';

import React, { useState, useCallback, useId, type ReactNode, type CSSProperties } from 'react';
import { cssVarColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { typography } from '../../tokens/typography';
import { opacity, borderWidth } from '../../tokens/general';
import { transitions } from '../../tokens/motion';

// ─── Types ───────────────────────────────────────────────────────────

export type CheckboxSize = 'small' | 'medium';

export interface CheckboxProps {
  /** 체크 상태 (제어 모드) */
  checked?: boolean;
  /** 초기 체크 상태 (비제어 모드) */
  defaultChecked?: boolean;
  /** 상태 변경 콜백 */
  onChange?: (checked: boolean) => void;
  /** 레이블 */
  label?: ReactNode;
  /** 레이블 아래 설명 */
  description?: ReactNode;
  /** 크기 @default 'medium' */
  size?: CheckboxSize;
  /** 비활성화 */
  disabled?: boolean;
  /** 유효성 오류 */
  invalid?: boolean;
  /** 반결정 상태 (부모 선택 패턴) */
  indeterminate?: boolean;
  /** 반결정 상태 커스텀 아이콘 */
  indeterminateIcon?: ReactNode;
  /** aria-label (label 없을 때 필수) */
  'aria-label'?: string;
  id?: string;
}

// ─── Size config ─────────────────────────────────────────────────────

const SIZE_CONFIG: Record<CheckboxSize, {
  controlSize: number;
  checkIconWidth: number;
  checkIconHeight: number;
  indeterminateIconWidth: number;
  indeterminateIconHeight: number;
}> = {
  small: {
    controlSize: 20,
    checkIconWidth: 10,
    checkIconHeight: 7,
    indeterminateIconWidth: 8,
    indeterminateIconHeight: 2,
  },
  medium: {
    controlSize: 24,
    checkIconWidth: 12,
    checkIconHeight: 9,
    indeterminateIconWidth: 10,
    indeterminateIconHeight: 2,
  },
};

// ─── Icons ───────────────────────────────────────────────────────────

function CheckIcon({ size }: { size: CheckboxSize }) {
  const { checkIconWidth, checkIconHeight } = SIZE_CONFIG[size];
  return (
    <svg
      width={checkIconWidth}
      height={checkIconHeight}
      viewBox="0 0 12 9"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1 4L4.5 7.5L11 1"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IndeterminateIcon({ size }: { size: CheckboxSize }) {
  const { indeterminateIconWidth, indeterminateIconHeight } = SIZE_CONFIG[size];
  return (
    <svg
      width={indeterminateIconWidth}
      height={indeterminateIconHeight}
      viewBox="0 0 10 2"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1 1H9"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ─── Component ───────────────────────────────────────────────────────

export const Checkbox = React.forwardRef<HTMLLabelElement, CheckboxProps>(
  function Checkbox(props, ref) {
    const {
      checked: checkedProp,
      defaultChecked = false,
      onChange,
      label,
      description,
      size = 'medium',
      disabled = false,
      invalid = false,
      indeterminate = false,
      indeterminateIcon: indeterminateIconProp,
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
    const { controlSize } = SIZE_CONFIG[size];
    const isActive = isChecked || indeterminate;

    const controlBg = isActive
      ? cssVarColors.surface.brand.default
      : (isPressed || isHovered)
        ? cssVarColors.surface.base.defaultPressed
        : cssVarColors.surface.base.default;

    const controlBorder = invalid && !isActive
      ? `${borderWidth.medium}px solid ${cssVarColors.border.error.default}`
      : isActive
        ? 'none'
        : `${borderWidth.medium}px solid ${cssVarColors.border.base.default}`;

    const controlStyle: CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: controlSize,
      height: controlSize,
      borderRadius: radius.component.segmentedControl.segment, // 6px per spec
      border: controlBorder,
      backgroundColor: controlBg,
      color: cssVarColors.inverse.content.default,
      transition: transitions.all,
      flexShrink: 0,
      boxSizing: 'border-box',
    };

    const labelStyle: CSSProperties = {
      display: 'inline-flex',
      alignItems: 'flex-start',
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
          aria-checked={indeterminate ? 'mixed' : isChecked}
          ref={(el) => {
            if (el) {
              el.indeterminate = indeterminate;
            }
          }}
          style={hiddenInputStyle}
        />

        {/* Visual control */}
        <span aria-hidden="true" style={controlStyle}>
          {isActive && (
            indeterminate
              ? (indeterminateIconProp ?? <IndeterminateIcon size={size} />)
              : <CheckIcon size={size} />
          )}
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

Checkbox.displayName = 'Checkbox';
